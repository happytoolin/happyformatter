import CodePlayground from "@/components/playground/CodePlayground";
import EditorThemeSelector from "@/components/playground/EditorThemeSelector";
import { ThemeProvider } from "@/components/playground/ThemeContext";
import { Button } from "@/components/ui/button";
import { getUtilityToolById } from "@/lib/utility-tools";
import { Clipboard, Play, RotateCcw, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

interface UtilityToolProps {
  toolId: string;
}

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

const hashAlgorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;

function getPrimaryLanguage(toolId: string) {
  switch (toolId) {
    case "json-viewer":
    case "json-sort":
    case "json-diff":
    case "json-to-yaml":
    case "json-to-csv":
      return "json";
    case "yaml-to-json":
      return "yaml";
    case "xml-to-json":
      return "xml";
    case "color-converter":
      return "css";
    default:
      return "plaintext";
  }
}

function getSecondaryLanguage(toolId: string) {
  return toolId === "json-diff" ? "json" : "plaintext";
}

function getOutputLanguage(toolId: string) {
  switch (toolId) {
    case "json-viewer":
    case "json-sort":
    case "yaml-to-json":
    case "xml-to-json":
    case "jwt-decoder":
    case "regex-tester":
      return "json";
    case "json-to-yaml":
      return "yaml";
    default:
      return "plaintext";
  }
}

function EditorPanel({
  ariaLabel,
  language,
  label,
  onChange,
  readOnly = false,
  value,
}: {
  ariaLabel: string;
  language: string;
  label: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  value: string;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <div className="border-b border-border px-3 py-2">
        <h3 className="text-sm font-medium text-foreground">
          {label}
        </h3>
      </div>
      <div className="h-[320px]">
        <CodePlayground
          ariaLabel={ariaLabel}
          inputCode={value}
          language={language}
          onCodeChange={onChange}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
}

function parseJson(input: string): JsonValue {
  return JSON.parse(input) as JsonValue;
}

function sortJsonKeys(value: JsonValue): JsonValue {
  if (Array.isArray(value)) {
    return value.map(sortJsonKeys);
  }

  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort((a, b) => a.localeCompare(b))
      .reduce<Record<string, JsonValue>>((sorted, key) => {
        sorted[key] = sortJsonKeys(value[key]);
        return sorted;
      }, {});
  }

  return value;
}

function describeJson(value: JsonValue): string {
  if (Array.isArray(value)) {
    return `array with ${value.length} item${value.length === 1 ? "" : "s"}`;
  }

  if (value && typeof value === "object") {
    const keyCount = Object.keys(value).length;
    return `object with ${keyCount} key${keyCount === 1 ? "" : "s"}`;
  }

  return `${typeof value} value`;
}

function jsonDiff(left: JsonValue, right: JsonValue, path = "$"): string[] {
  if (Object.is(left, right)) {
    return [];
  }

  if (Array.isArray(left) || Array.isArray(right)) {
    if (!Array.isArray(left) || !Array.isArray(right)) {
      return [`~ ${path}: ${JSON.stringify(left)} -> ${JSON.stringify(right)}`];
    }

    const length = Math.max(left.length, right.length);
    return Array.from({ length }, (_, index) => {
      if (index >= left.length) {
        return [`+ ${path}[${index}]: ${JSON.stringify(right[index])}`];
      }
      if (index >= right.length) {
        return [`- ${path}[${index}]: ${JSON.stringify(left[index])}`];
      }
      return jsonDiff(left[index], right[index], `${path}[${index}]`);
    }).flat();
  }

  if (
    left && right && typeof left === "object" && typeof right === "object"
  ) {
    const keys = Array.from(
      new Set([...Object.keys(left), ...Object.keys(right)]),
    ).sort((a, b) => a.localeCompare(b));

    return keys.flatMap((key) => {
      const nextPath = `${path}.${key}`;
      if (!(key in left)) {
        return [`+ ${nextPath}: ${JSON.stringify(right[key])}`];
      }
      if (!(key in right)) {
        return [`- ${nextPath}: ${JSON.stringify(left[key])}`];
      }
      return jsonDiff(left[key], right[key], nextPath);
    });
  }

  return [`~ ${path}: ${JSON.stringify(left)} -> ${JSON.stringify(right)}`];
}

function scalarToYaml(value: JsonValue): string {
  if (value === null) return "null";
  if (typeof value === "string") {
    return /^[a-zA-Z0-9_./:@ -]+$/.test(value)
      ? value
      : JSON.stringify(value);
  }
  return String(value);
}

function jsonToYaml(value: JsonValue, indent = 0): string {
  const pad = " ".repeat(indent);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return value.map((item) => {
      if (item && typeof item === "object") {
        return `${pad}-\n${jsonToYaml(item, indent + 2)}`;
      }
      return `${pad}- ${scalarToYaml(item)}`;
    }).join("\n");
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0) return "{}";
    return entries.map(([key, item]) => {
      if (item && typeof item === "object") {
        return `${pad}${key}:\n${jsonToYaml(item, indent + 2)}`;
      }
      return `${pad}${key}: ${scalarToYaml(item)}`;
    }).join("\n");
  }

  return `${pad}${scalarToYaml(value)}`;
}

function parseYamlScalar(value: string): JsonValue {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null" || trimmed === "~") return null;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if (
    (trimmed.startsWith("\"") && trimmed.endsWith("\""))
    || (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function simpleYamlToJson(input: string): JsonValue {
  const root: Record<string, JsonValue> = {};
  const lines = input.split(/\r?\n/).filter(line => line.trim() && !line.trim().startsWith("#"));
  let activeArrayKey: string | null = null;

  for (const line of lines) {
    const listMatch = line.match(/^\s*-\s+(.*)$/);
    if (listMatch && activeArrayKey) {
      const current = root[activeArrayKey];
      if (!Array.isArray(current)) {
        throw new Error(`Expected "${activeArrayKey}" to be a list`);
      }
      current.push(parseYamlScalar(listMatch[1]));
      continue;
    }

    const keyMatch = line.match(/^([A-Za-z0-9_.-]+):(?:\s*(.*))?$/);
    if (!keyMatch) {
      throw new Error("This converter supports simple YAML maps and lists.");
    }

    const [, key, rawValue = ""] = keyMatch;
    if (!rawValue.trim()) {
      root[key] = [];
      activeArrayKey = key;
      continue;
    }

    root[key] = parseYamlScalar(rawValue);
    activeArrayKey = null;
  }

  return root;
}

function jsonToCsv(input: JsonValue): string {
  if (!Array.isArray(input)) {
    throw new Error("JSON to CSV expects an array of objects.");
  }

  const rows = input.map((row) => {
    if (!row || typeof row !== "object" || Array.isArray(row)) {
      throw new Error("Every row must be a JSON object.");
    }
    return row;
  });

  const headers = Array.from(
    new Set(rows.flatMap(row => Object.keys(row))),
  );
  const escapeCsv = (value: JsonValue) => {
    const text = value && typeof value === "object"
      ? JSON.stringify(value)
      : String(value ?? "");
    return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, "\"\"")}"` : text;
  };

  return [
    headers.map(escapeCsv).join(","),
    ...rows.map(row => headers.map(header => escapeCsv(row[header])).join(",")),
  ].join("\n");
}

function xmlElementToJson(element: Element): JsonValue {
  const result: Record<string, JsonValue> = {};
  if (element.attributes.length > 0) {
    result["@attributes"] = Array.from(element.attributes).reduce<
      Record<string, JsonValue>
    >((attributes, attribute) => {
      attributes[attribute.name] = attribute.value;
      return attributes;
    }, {});
  }

  const childElements = Array.from(element.children);
  const text = Array.from(element.childNodes)
    .filter(node => node.nodeType === Node.TEXT_NODE)
    .map(node => node.textContent?.trim() ?? "")
    .filter(Boolean)
    .join(" ");

  if (childElements.length === 0) {
    return Object.keys(result).length > 0 && text
      ? { ...result, "#text": text }
      : text || result;
  }

  for (const child of childElements) {
    const value = xmlElementToJson(child);
    const existing = result[child.tagName];
    if (existing === undefined) {
      result[child.tagName] = value;
    } else if (Array.isArray(existing)) {
      existing.push(value);
    } else {
      result[child.tagName] = [existing, value];
    }
  }

  if (text) {
    result["#text"] = text;
  }

  return result;
}

function xmlToJson(input: string): JsonValue {
  const document = new DOMParser().parseFromString(input, "application/xml");
  if (document.querySelector("parsererror")) {
    throw new Error("Invalid XML input.");
  }

  const root = document.documentElement;
  return { [root.tagName]: xmlElementToJson(root) };
}

function encodeBase64(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function decodeBase64(input: string): string {
  const binary = atob(input.trim());
  const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function decodeJwt(input: string): string {
  const parts = input.trim().split(".");
  if (parts.length < 2) {
    throw new Error("A JWT must contain at least header and payload segments.");
  }

  const decodeSegment = (segment: string) => {
    const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - base64.length % 4) % 4), "=");
    return JSON.parse(decodeBase64(padded)) as JsonValue;
  };

  return JSON.stringify(
    {
      header: decodeSegment(parts[0]),
      payload: decodeSegment(parts[1]),
      signature: {
        present: Boolean(parts[2]),
        length: parts[2]?.length ?? 0,
      },
      warning: "Decoded only. Signature verification is not performed.",
    },
    null,
    2,
  );
}

function testRegex(input: string, pattern: string, flags: string): string {
  const uniqueFlags = Array.from(new Set(flags.split(""))).join("");
  const regex = new RegExp(pattern, uniqueFlags.includes("g") ? uniqueFlags : `${uniqueFlags}g`);
  const matches = Array.from(input.matchAll(regex)).map((match, index) => ({
    index: index + 1,
    match: match[0],
    start: match.index ?? 0,
    groups: match.slice(1),
  }));

  return matches.length
    ? JSON.stringify(matches, null, 2)
    : "No matches found.";
}

async function generateHashes(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(input);
  const lines = await Promise.all(hashAlgorithms.map(async (algorithm) => {
    const digest = await crypto.subtle.digest(algorithm, bytes);
    const hex = Array.from(new Uint8Array(digest))
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");
    return `${algorithm}: ${hex}`;
  }));
  return lines.join("\n");
}

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

function clampChannel(value: number) {
  return Math.min(255, Math.max(0, Math.round(value)));
}

function parseColor(input: string): RgbColor {
  const value = input.trim();
  const hex = value.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const raw = hex[1].length === 3
      ? hex[1].split("").map(character => character + character).join("")
      : hex[1];
    return {
      r: Number.parseInt(raw.slice(0, 2), 16),
      g: Number.parseInt(raw.slice(2, 4), 16),
      b: Number.parseInt(raw.slice(4, 6), 16),
    };
  }

  const rgb = value.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (rgb) {
    return {
      r: clampChannel(Number(rgb[1])),
      g: clampChannel(Number(rgb[2])),
      b: clampChannel(Number(rgb[3])),
    };
  }

  const hsl = value.match(/^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/i);
  if (!hsl) {
    throw new Error("Use HEX, rgb(r, g, b), or hsl(h, s%, l%).");
  }

  const h = Number(hsl[1]) / 360;
  const s = Number(hsl[2]) / 100;
  const l = Number(hsl[3]) / 100;
  if (s === 0) {
    const channel = clampChannel(l * 255);
    return { r: channel, g: channel, b: channel };
  }

  const hueToRgb = (p: number, q: number, t: number) => {
    let hue = t;
    if (hue < 0) hue += 1;
    if (hue > 1) hue -= 1;
    if (hue < 1 / 6) return p + (q - p) * 6 * hue;
    if (hue < 1 / 2) return q;
    if (hue < 2 / 3) return p + (q - p) * (2 / 3 - hue) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: clampChannel(hueToRgb(p, q, h + 1 / 3) * 255),
    g: clampChannel(hueToRgb(p, q, h) * 255),
    b: clampChannel(hueToRgb(p, q, h - 1 / 3) * 255),
  };
}

function rgbToHsl({ r, g, b }: RgbColor) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: Math.round(lightness * 100) };
  }

  const delta = max - min;
  const saturation = lightness > 0.5
    ? delta / (2 - max - min)
    : delta / (max + min);
  const hue = max === red
    ? (green - blue) / delta + (green < blue ? 6 : 0)
    : max === green
    ? (blue - red) / delta + 2
    : (red - green) / delta + 4;

  return {
    h: Math.round((hue / 6) * 360),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
}

function convertColor(input: string): string {
  const rgb = parseColor(input);
  const hex = `#${[rgb.r, rgb.g, rgb.b].map(channel => channel.toString(16).padStart(2, "0")).join("")}`;
  const hsl = rgbToHsl(rgb);
  return [
    `HEX: ${hex}`,
    `RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    `HSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
  ].join("\n");
}

export default function UtilityTool({ toolId }: UtilityToolProps) {
  const tool = getUtilityToolById(toolId);
  const [input, setInput] = useState(tool?.sampleInput ?? "");
  const [secondaryInput, setSecondaryInput] = useState(
    tool?.sampleSecondaryInput ?? "",
  );
  const [flags, setFlags] = useState("gim");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const stats = useMemo(() => {
    const bytes = new TextEncoder().encode(input).length;
    return `${input.length} characters, ${bytes} bytes`;
  }, [input]);

  if (!tool) {
    return null;
  }

  const runTool = async (action: "primary" | "secondary" = "primary") => {
    setIsRunning(true);
    setError("");
    setStatus("");

    try {
      let result = "";
      switch (tool.id) {
        case "json-viewer": {
          const parsed = parseJson(input);
          result = `${JSON.stringify(parsed, null, 2)}\n\nSummary: ${describeJson(parsed)}`;
          break;
        }
        case "json-sort":
          result = JSON.stringify(sortJsonKeys(parseJson(input)), null, 2);
          break;
        case "json-diff": {
          const diff = jsonDiff(parseJson(input), parseJson(secondaryInput));
          result = diff.length ? diff.join("\n") : "No JSON differences found.";
          break;
        }
        case "json-to-yaml":
          result = jsonToYaml(parseJson(input));
          break;
        case "yaml-to-json":
          result = JSON.stringify(simpleYamlToJson(input), null, 2);
          break;
        case "json-to-csv":
          result = jsonToCsv(parseJson(input));
          break;
        case "xml-to-json":
          result = JSON.stringify(xmlToJson(input), null, 2);
          break;
        case "jwt-decoder":
          result = decodeJwt(input);
          break;
        case "base64":
          result = action === "secondary" ? decodeBase64(input) : encodeBase64(input);
          break;
        case "regex-tester":
          result = testRegex(input, secondaryInput, flags);
          break;
        case "url-encoder":
          result = action === "secondary"
            ? decodeURIComponent(input)
            : encodeURIComponent(input);
          break;
        case "hash-generator":
          result = await generateHashes(input);
          break;
        case "color-converter":
          result = convertColor(input);
          break;
      }

      setOutput(result);
      setStatus("Done");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Could not process input.");
      setOutput("");
    } finally {
      setIsRunning(false);
    }
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setStatus("Copied");
  };

  const resetInput = () => {
    setInput(tool.sampleInput);
    setSecondaryInput(tool.sampleSecondaryInput ?? "");
    setOutput("");
    setError("");
    setStatus("");
  };

  const outputLineCount = output ? output.split(/\r?\n/).length : 0;
  const colorPreview = tool.id === "color-converter" && output
    ? output.match(/HEX: (#[0-9a-f]{6})/i)?.[1]
    : null;

  return (
    <ThemeProvider>
      <section className="border-b border-border bg-background py-10 sm:py-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.44fr)]">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-xs uppercase text-muted-foreground">
                  Monaco editor
                </p>
                <EditorThemeSelector />
              </div>

              <EditorPanel
                ariaLabel={`${tool.name} ${tool.inputLabel}`}
                label={tool.inputLabel}
                language={getPrimaryLanguage(tool.id)}
                onChange={setInput}
                value={input}
              />

              {tool.secondaryInputLabel && (
                <EditorPanel
                  ariaLabel={`${tool.name} ${tool.secondaryInputLabel}`}
                  label={tool.secondaryInputLabel}
                  language={getSecondaryLanguage(tool.id)}
                  onChange={setSecondaryInput}
                  value={secondaryInput}
                />
              )}

              {tool.id === "regex-tester" && (
                <div className="max-w-xs space-y-2">
                  <label htmlFor={`${tool.id}-flags`} className="text-sm font-medium text-foreground">
                    Flags
                  </label>
                  <input
                    id={`${tool.id}-flags`}
                    value={flags}
                    onChange={event => setFlags(event.target.value.replace(/[^dgimsuvy]/g, ""))}
                    className="h-10 w-full rounded-md border border-border bg-card px-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-foreground focus:ring-2 focus:ring-ring"
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2">
                <Button onClick={() => void runTool("primary")} isLoading={isRunning}>
                  <Play className="h-4 w-4" aria-hidden="true" />
                  {tool.primaryAction}
                </Button>
                {tool.secondaryAction && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => void runTool("secondary")}
                    disabled={isRunning}
                  >
                    <Play className="h-4 w-4" aria-hidden="true" />
                    {tool.secondaryAction}
                  </Button>
                )}
                <Button type="button" variant="outline" onClick={copyOutput} disabled={!output}>
                  <Clipboard className="h-4 w-4" aria-hidden="true" />
                  Copy
                </Button>
                <Button type="button" variant="ghost" onClick={resetInput}>
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Reset
                </Button>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span>{stats}</span>
                {output && <span>{outputLineCount} output lines</span>}
                {status && <span>{status}</span>}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-md border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-foreground" aria-hidden="true" />
                  <p className="text-sm leading-6 text-muted-foreground">
                    {tool.privacyNote}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-medium text-foreground">
                    {tool.outputLabel}
                  </h2>
                  {colorPreview && (
                    <span
                      className="h-7 w-10 rounded-md border border-border"
                      style={{ backgroundColor: colorPreview }}
                      aria-label={`Color preview ${colorPreview}`}
                    />
                  )}
                </div>
                {error
                  ? (
                    <div className="min-h-[320px] rounded-md border border-destructive/40 bg-destructive/10 p-4 font-mono text-sm leading-6 text-destructive">
                      {error}
                    </div>
                  )
                  : (
                    <EditorPanel
                      ariaLabel={`${tool.name} ${tool.outputLabel}`}
                      label={tool.outputLabel}
                      language={getOutputLanguage(tool.id)}
                      readOnly
                      value={output || "Output appears here."}
                    />
                  )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
}
