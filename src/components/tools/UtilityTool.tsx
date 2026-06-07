import CodePlayground from "@/components/playground/CodePlayground";
import EditorThemeSelector from "@/components/playground/EditorThemeSelector";
import { ThemeProvider } from "@/components/playground/ThemeContext";
import { Button } from "@/components/ui/button";
import { getUtilityToolById } from "@/lib/utility-tools";
import { createTwoFilesPatch } from "diff";
import { Clipboard, Play, RotateCcw, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Diff, type FileData, Hunk, isDelete, isInsert, parseDiff } from "react-diff-view";
import "react-diff-view/style/index.css";

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
    case "json-to-toml":
      return "json";
    case "yaml-to-json":
      return "yaml";
    case "xml-to-json":
      return "xml";
    case "color-converter":
    case "css-unit-converter":
      return "css";
    case "toml-to-json":
      return "toml";
    case "markdown-preview":
    case "markdown-to-html":
      return "markdown";
    case "html-entities":
    case "svg-optimizer":
      return "html";
    case "csv-to-json":
    case "csv-tsv":
      return "csv";
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
    case "csv-to-json":
    case "toml-to-json":
    case "query-string-parser":
    case "http-header-parser":
      return "json";
    case "json-to-yaml":
      return "yaml";
    case "json-to-toml":
      return "toml";
    case "markdown-preview":
    case "markdown-to-html":
    case "html-entities":
      return "html";
    case "svg-optimizer":
      return "xml";
    default:
      return "plaintext";
  }
}

function EditorPanel({
  ariaLabel,
  headerAction,
  heightClass = "h-[320px]",
  language,
  label,
  onChange,
  readOnly = false,
  value,
}: {
  ariaLabel: string;
  headerAction?: ReactNode;
  heightClass?: string;
  language: string;
  label: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  value: string;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
        <h3 className="text-sm font-medium text-foreground">
          {label}
        </h3>
        {headerAction}
      </div>
      <div className={heightClass}>
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

interface SplitDiffResult {
  additions: number;
  files: FileData[];
  leftLineCount: number;
  removals: number;
  rightLineCount: number;
}

function formatJsonForDiff(input: string) {
  return `${JSON.stringify(parseJson(input), null, 2)}\n`;
}

function countDiffLines(source: string) {
  const normalized = source.endsWith("\n") ? source.slice(0, -1) : source;
  return normalized ? normalized.split(/\r?\n/).length : 0;
}

function createGitDiffPatch(leftSource: string, rightSource: string) {
  const patch = createTwoFilesPatch(
    "a/original.json",
    "b/changed.json",
    leftSource,
    rightSource,
    undefined,
    undefined,
    { context: 3 },
  );

  return `diff --git a/original.json b/changed.json
index 0000000..1111111 100644
${patch.replace(/^={67}\r?\n/m, "")}`;
}

function createJsonSplitDiff(leftInput: string, rightInput: string): SplitDiffResult {
  const leftSource = formatJsonForDiff(leftInput);
  const rightSource = formatJsonForDiff(rightInput);
  const files = parseDiff(createGitDiffPatch(leftSource, rightSource), {
    nearbySequences: "zip",
  });

  let additions = 0;
  let removals = 0;

  for (const file of files) {
    for (const hunk of file.hunks) {
      for (const change of hunk.changes) {
        if (isInsert(change)) {
          additions += 1;
        }
        if (isDelete(change)) {
          removals += 1;
        }
      }
    }
  }

  return {
    additions,
    files,
    leftLineCount: countDiffLines(leftSource),
    removals,
    rightLineCount: countDiffLines(rightSource),
  };
}

function formatJsonDiffSummary(result: SplitDiffResult) {
  const lines = result.files.flatMap(file =>
    file.hunks.flatMap(hunk =>
      hunk.changes.flatMap(change => {
        if (isInsert(change)) {
          return [`+ ${change.content}`];
        }
        if (isDelete(change)) {
          return [`- ${change.content}`];
        }
        return [];
      })
    )
  );

  return lines.length ? lines.join("\n") : "No JSON differences found.";
}

function SplitDiffViewer({
  error,
  result,
}: {
  error: string;
  result: SplitDiffResult | null;
}) {
  const hasChanges = result ? result.additions + result.removals > 0 : false;

  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 px-4 py-3">
        <p className="text-base font-semibold text-foreground">
          JSON diff
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 text-red-700">
            <span className="h-2.5 w-2.5 rounded-full border border-red-600" aria-hidden="true" />
            {result?.removals ?? 0} removals
          </span>
          <span className="inline-flex items-center gap-1.5 text-emerald-700">
            <span className="h-2.5 w-2.5 rounded-full border border-emerald-600 bg-emerald-500/20" aria-hidden="true" />
            {result?.additions ?? 0} additions
          </span>
        </div>
      </div>

      <div className="grid border-b border-border bg-background text-xs font-medium text-muted-foreground lg:grid-cols-2">
        <div className="flex items-center justify-between border-b border-border px-4 py-2 lg:border-b-0 lg:border-r">
          <span>Original</span>
          <span>{result?.leftLineCount ?? 0} lines</span>
        </div>
        <div className="flex items-center justify-between px-4 py-2">
          <span>Changed</span>
          <span>{result?.rightLineCount ?? 0} lines</span>
        </div>
      </div>

      <div
        aria-label="JSON diff"
        className="min-h-[360px] bg-background"
        role="region"
        tabIndex={0}
      >
        {error
          ? (
            <div className="m-3 rounded-md border border-destructive/40 bg-destructive/10 p-4 font-mono text-sm leading-6 text-destructive">
              {error}
            </div>
          )
          : result
          ? hasChanges
            ? (
              <div className="hf-json-diff overflow-auto p-3">
                {result.files.map((file, index) => (
                  file.hunks.length
                    ? (
                      <Diff
                        key={`${file.oldPath}-${file.newPath}-${index}`}
                        diffType={file.type}
                        hunks={file.hunks}
                        optimizeSelection
                        viewType="split"
                      >
                        {hunks => hunks.map(hunk => <Hunk key={hunk.content} hunk={hunk} />)}
                      </Diff>
                    )
                    : null
                ))}
              </div>
            )
            : (
              <div className="flex min-h-[360px] items-center justify-center text-sm text-muted-foreground">
                No JSON differences found.
              </div>
            )
          : (
            <div className="flex min-h-[360px] items-center justify-center text-sm text-muted-foreground">
              Run Find difference to compare both JSON documents.
            </div>
          )}
      </div>

      <div
        aria-hidden="true"
        className="grid h-1 grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
      >
        <div className="bg-red-500/20" />
        <div className="bg-emerald-500/20" />
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

function parseDelimitedRows(input: string, delimiter: "," | "\t"): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    const next = input[index + 1];

    if (character === "\"") {
      if (inQuotes && next === "\"") {
        cell += "\"";
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && character === delimiter) {
      row.push(cell);
      cell = "";
      continue;
    }

    if (!inQuotes && (character === "\n" || character === "\r")) {
      if (character === "\r" && next === "\n") {
        index += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += character;
  }

  row.push(cell);
  rows.push(row);
  return rows.filter(item => item.some(value => value.trim().length > 0));
}

function csvToJson(input: string): string {
  const rows = parseDelimitedRows(input, ",");
  if (rows.length < 2) {
    throw new Error("CSV needs a header row and at least one data row.");
  }

  const headers = rows[0].map(header => header.trim());
  const data = rows.slice(1).map(row =>
    headers.reduce<Record<string, string>>((record, header, index) => {
      record[header || `column_${index + 1}`] = row[index] ?? "";
      return record;
    }, {})
  );

  return JSON.stringify(data, null, 2);
}

function escapeDelimited(value: string, delimiter: "," | "\t") {
  const mustQuote = delimiter === ","
    ? /[",\n\r]/.test(value)
    : /["\t\n\r]/.test(value);
  return mustQuote ? `"${value.replace(/"/g, "\"\"")}"` : value;
}

function convertDelimited(input: string, from: "," | "\t", to: "," | "\t") {
  return parseDelimitedRows(input, from)
    .map(row => row.map(value => escapeDelimited(value, to)).join(to))
    .join("\n");
}

function parseTomlScalar(value: string): JsonValue {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const body = trimmed.slice(1, -1).trim();
    return body
      ? body.split(",").map(item => parseTomlScalar(item))
      : [];
  }
  if (
    (trimmed.startsWith("\"") && trimmed.endsWith("\""))
    || (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function tomlToJson(input: string): string {
  const root: Record<string, JsonValue> = {};
  let target = root;

  for (const rawLine of input.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const section = line.match(/^\[([A-Za-z0-9_.-]+)\]$/);
    if (section) {
      target = root;
      for (const part of section[1].split(".")) {
        const current = target[part];
        if (!current || typeof current !== "object" || Array.isArray(current)) {
          target[part] = {};
        }
        target = target[part] as Record<string, JsonValue>;
      }
      continue;
    }

    const assignment = line.match(/^([A-Za-z0-9_.-]+)\s*=\s*(.+)$/);
    if (!assignment) {
      throw new Error("This converter supports simple TOML assignments and sections.");
    }

    target[assignment[1]] = parseTomlScalar(assignment[2]);
  }

  return JSON.stringify(root, null, 2);
}

function tomlScalar(value: JsonValue): string {
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value === null) return "\"\"";
  if (Array.isArray(value)) return `[${value.map(tomlScalar).join(", ")}]`;
  return JSON.stringify(value);
}

function jsonToTomlObject(value: JsonValue, section = ""): string {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("JSON to TOML expects an object.");
  }

  const object = value as Record<string, JsonValue>;
  const lines: string[] = [];
  const childSections: Array<[string, JsonValue]> = [];

  for (const [key, item] of Object.entries(object)) {
    if (item && typeof item === "object" && !Array.isArray(item)) {
      childSections.push([key, item]);
    } else {
      lines.push(`${key} = ${tomlScalar(item)}`);
    }
  }

  for (const [key, item] of childSections) {
    const nextSection = section ? `${section}.${key}` : key;
    if (lines.length > 0) lines.push("");
    lines.push(`[${nextSection}]`);
    lines.push(jsonToTomlObject(item, nextSection));
  }

  return lines.join("\n").trim();
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function decodeHtmlEntities(input: string) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = input;
  return textarea.value;
}

function inlineMarkdown(input: string) {
  return escapeHtml(input)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href=\"$2\">$1</a>");
}

function markdownToHtml(input: string) {
  const lines = input.split(/\r?\n/);
  const html: string[] = [];
  let listOpen = false;

  const closeList = () => {
    if (listOpen) {
      html.push("</ul>");
      listOpen = false;
    }
  };

  for (const line of lines) {
    if (!line.trim()) {
      closeList();
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const listItem = line.match(/^\s*[-*]\s+(.+)$/);
    if (listItem) {
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`  <li>${inlineMarkdown(listItem[1])}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${inlineMarkdown(line)}</p>`);
  }

  closeList();
  return html.join("\n");
}

function convertTimestamp(input: string): string {
  const trimmed = input.trim();
  const numeric = Number(trimmed);
  const date = Number.isFinite(numeric)
    ? new Date(Math.abs(numeric) < 10_000_000_000 ? numeric * 1000 : numeric)
    : new Date(trimmed);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Enter a Unix timestamp, millisecond timestamp, or parseable date.");
  }

  return [
    `ISO: ${date.toISOString()}`,
    `UTC: ${date.toUTCString()}`,
    `Local: ${date.toString()}`,
    `Unix seconds: ${Math.floor(date.getTime() / 1000)}`,
    `Unix milliseconds: ${date.getTime()}`,
  ].join("\n");
}

function generateUuidList(input: string) {
  const count = Math.min(100, Math.max(1, Number.parseInt(input.trim(), 10) || 1));
  return Array.from({ length: count }, () =>
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, character =>
        (
          Number(character)
          ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(character) / 4
        ).toString(16))).join("\n");
}

function words(input: string) {
  return input.trim().split(/[^A-Za-z0-9]+/).filter(Boolean);
}

function titleWord(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function convertTextCase(input: string) {
  const parts = words(input);
  const pascal = parts.map(titleWord).join("");
  const camel = pascal ? pascal.charAt(0).toLowerCase() + pascal.slice(1) : "";
  return [
    `lower: ${input.toLowerCase()}`,
    `upper: ${input.toUpperCase()}`,
    `title: ${parts.map(titleWord).join(" ")}`,
    `camel: ${camel}`,
    `pascal: ${pascal}`,
    `snake: ${parts.map(part => part.toLowerCase()).join("_")}`,
    `kebab: ${parts.map(part => part.toLowerCase()).join("-")}`,
  ].join("\n");
}

function unescapeString(input: string) {
  const trimmed = input.trim();
  const literal = trimmed.startsWith("\"") && trimmed.endsWith("\"")
    ? trimmed
    : `"${trimmed.replace(/"/g, "\\\"")}"`;
  return JSON.parse(literal) as string;
}

function parseQueryString(input: string) {
  const query = input.includes("?")
    ? new URL(input).search
    : input.startsWith("?")
    ? input
    : `?${input}`;
  const params = new URLSearchParams(query);
  const parsed: Record<string, string | string[]> = {};

  for (const [key, value] of params.entries()) {
    const existing = parsed[key];
    if (existing === undefined) {
      parsed[key] = value;
    } else if (Array.isArray(existing)) {
      existing.push(value);
    } else {
      parsed[key] = [existing, value];
    }
  }

  return JSON.stringify(parsed, null, 2);
}

function parseHeaders(input: string) {
  const parsed: Record<string, string | string[]> = {};
  for (const line of input.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const separator = line.indexOf(":");
    if (separator === -1) {
      throw new Error("Each header line must use Name: value format.");
    }
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    const existing = parsed[key];
    if (existing === undefined) {
      parsed[key] = value;
    } else if (Array.isArray(existing)) {
      existing.push(value);
    } else {
      parsed[key] = [existing, value];
    }
  }
  return JSON.stringify(parsed, null, 2);
}

function explainCronField(value: string, label: string) {
  if (value === "*") return `${label}: every value`;
  if (value.includes("/")) {
    const [base, step] = value.split("/");
    return `${label}: every ${step} values ${base === "*" ? "" : `from ${base}`}`.trim();
  }
  if (value.includes("-")) return `${label}: range ${value}`;
  if (value.includes(",")) return `${label}: one of ${value.split(",").join(", ")}`;
  return `${label}: ${value}`;
}

function explainCron(input: string) {
  const parts = input.trim().split(/\s+/);
  if (parts.length !== 5) {
    throw new Error("Enter a five-field cron expression: minute hour day-of-month month weekday.");
  }
  return [
    explainCronField(parts[0], "Minute"),
    explainCronField(parts[1], "Hour"),
    explainCronField(parts[2], "Day of month"),
    explainCronField(parts[3], "Month"),
    explainCronField(parts[4], "Weekday"),
    "Note: timezone depends on the scheduler running this cron expression.",
  ].join("\n");
}

function convertCssUnits(input: string) {
  const baseMatch = input.match(/base:\s*(\d+(?:\.\d+)?)px/i);
  const base = baseMatch ? Number(baseMatch[1]) : 16;
  const valueMatch = input.match(/(-?\d+(?:\.\d+)?)(px|rem|em)\b/i);
  if (!valueMatch) {
    throw new Error("Enter a value such as 24px, 1.5rem, or 2em. Optional: base: 16px");
  }

  const amount = Number(valueMatch[1]);
  const unit = valueMatch[2].toLowerCase();
  const px = unit === "px" ? amount : amount * base;
  const relative = unit === "px" ? amount / base : amount;

  return [
    `Base: ${base}px`,
    `px: ${Number(px.toFixed(4))}px`,
    `rem: ${Number(relative.toFixed(4))}rem`,
    `em: ${Number(relative.toFixed(4))}em`,
  ].join("\n");
}

function optimizeSvg(input: string) {
  return input
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function prettySvg(input: string) {
  const compact = optimizeSvg(input);
  let depth = 0;
  return compact
    .replace(/></g, ">\n<")
    .split("\n")
    .map(line => {
      if (/^<\//.test(line)) depth = Math.max(0, depth - 1);
      const padded = `${"  ".repeat(depth)}${line}`;
      if (/^<[^!?/][^>]*[^/]>/.test(line) && !line.includes("</")) depth += 1;
      return padded;
    })
    .join("\n");
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
          result = formatJsonDiffSummary(createJsonSplitDiff(input, secondaryInput));
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
        case "csv-to-json":
          result = csvToJson(input);
          break;
        case "csv-tsv":
          result = action === "secondary"
            ? convertDelimited(input, "\t", ",")
            : convertDelimited(input, ",", "\t");
          break;
        case "toml-to-json":
          result = tomlToJson(input);
          break;
        case "json-to-toml":
          result = jsonToTomlObject(parseJson(input));
          break;
        case "markdown-preview":
        case "markdown-to-html":
          result = markdownToHtml(input);
          break;
        case "html-entities":
          result = action === "secondary" ? decodeHtmlEntities(input) : escapeHtml(input);
          break;
        case "unix-timestamp":
          result = convertTimestamp(input);
          break;
        case "uuid-generator":
          result = generateUuidList(input);
          break;
        case "text-case":
          result = convertTextCase(input);
          break;
        case "string-escape":
          result = action === "secondary"
            ? unescapeString(input)
            : JSON.stringify(input).slice(1, -1);
          break;
        case "query-string-parser":
          result = parseQueryString(input);
          break;
        case "http-header-parser":
          result = parseHeaders(input);
          break;
        case "cron-explainer":
          result = explainCron(input);
          break;
        case "css-unit-converter":
          result = convertCssUnits(input);
          break;
        case "svg-optimizer":
          result = action === "secondary" ? prettySvg(input) : optimizeSvg(input);
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
  const splitDiffResult = tool.id === "json-diff" && output && !error
    ? (() => {
      try {
        return createJsonSplitDiff(input, secondaryInput);
      } catch {
        return null;
      }
    })()
    : null;

  if (tool.id === "json-diff") {
    return (
      <ThemeProvider>
        <section className="border-b border-border bg-background py-6 sm:py-8">
          <div className="mx-auto max-w-[1600px] space-y-5 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-xs uppercase text-muted-foreground">
                  Private browser tool
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Compare two JSON documents side by side.
                </p>
              </div>
              <EditorThemeSelector />
            </div>

            <SplitDiffViewer error={error} result={splitDiffResult} />

            <div className="grid gap-4 lg:grid-cols-2">
              <EditorPanel
                ariaLabel={`${tool.name} original text`}
                heightClass="h-[260px]"
                label="Original text"
                language="json"
                onChange={setInput}
                value={input}
              />

              <EditorPanel
                ariaLabel={`${tool.name} changed text`}
                heightClass="h-[260px]"
                label="Changed text"
                language="json"
                onChange={setSecondaryInput}
                value={secondaryInput}
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button onClick={() => void runTool("primary")} isLoading={isRunning}>
                  <Play className="h-4 w-4" aria-hidden="true" />
                  Find difference
                </Button>
                <Button type="button" variant="outline" onClick={copyOutput} disabled={!output}>
                  <Clipboard className="h-4 w-4" aria-hidden="true" />
                  Copy summary
                </Button>
                <Button type="button" variant="ghost" onClick={resetInput}>
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Reset
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
                <span>{stats}</span>
                {output && <span>{outputLineCount} summary lines</span>}
                {status && <span>{status}</span>}
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  No upload
                </span>
              </div>
            </div>
          </div>
        </section>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <section className="border-b border-border bg-background py-10 sm:py-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-xs uppercase text-muted-foreground">
                  Private browser tool
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Paste input, run the action, then review the result.
                </p>
              </div>
              <EditorThemeSelector />
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <div className="space-y-4">
                <EditorPanel
                  ariaLabel={`${tool.name} ${tool.inputLabel}`}
                  heightClass="h-[360px] lg:h-[420px]"
                  label={tool.inputLabel}
                  language={getPrimaryLanguage(tool.id)}
                  onChange={setInput}
                  value={input}
                />

                {tool.secondaryInputLabel && (
                  <EditorPanel
                    ariaLabel={`${tool.name} ${tool.secondaryInputLabel}`}
                    heightClass="h-[260px] lg:h-[320px]"
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
              </div>

              <div className="space-y-4">
                {error
                  ? (
                    <div className="min-h-[360px] rounded-md border border-destructive/40 bg-destructive/10 p-4 font-mono text-sm leading-6 text-destructive lg:min-h-[420px]">
                      {error}
                    </div>
                  )
                  : (
                    <EditorPanel
                      ariaLabel={`${tool.name} ${tool.outputLabel}`}
                      headerAction={colorPreview
                        ? (
                          <span
                            className="h-7 w-10 rounded-md border border-border"
                            style={{ backgroundColor: colorPreview }}
                            aria-label={`Color preview ${colorPreview}`}
                          />
                        )
                        : null}
                      heightClass="h-[360px] lg:h-[420px]"
                      label={tool.outputLabel}
                      language={getOutputLanguage(tool.id)}
                      readOnly
                      value={output || `Run ${tool.primaryAction} to see the result.`}
                    />
                  )}
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-border pt-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
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

              <div className="max-w-xl rounded-md border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-foreground" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Private / no upload
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {tool.privacyNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
}
