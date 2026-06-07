import { getFormatter, getMinifier } from "@/handlers";
import { getInitialCode } from "@/lib/initialCode";
import { LANGUAGES } from "@/lib/languages";
import { Check, Copy, FileText, Loader2, Minimize2 } from "lucide-react";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import CodePlayground from "./CodePlayground";
import EditorThemeSelector from "./EditorThemeSelector";
import { useFormatterStore } from "./formatterStore";
import { ThemeProvider } from "./ThemeContext";

interface FormatterProps {
  minifier: boolean;
  language: string;
}

type ActionStatus =
  | "format_success"
  | "minify_success"
  | "minifier_unavailable"
  | "execution_failed"
  | "copied"
  | "copy_failed";
type ProcessingAction = "format" | "minify" | null;
type ButtonState = "idle" | "success" | "error";

function formatLanguageName(language: string) {
  if (LANGUAGES[language]?.name) {
    return LANGUAGES[language].name;
  }

  const [baseLanguage, ...variantParts] = language.split("-");
  const baseName = LANGUAGES[baseLanguage]?.name
    || baseLanguage.charAt(0).toUpperCase() + baseLanguage.slice(1);
  const variantName = variantParts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return variantName ? `${baseName} ${variantName}` : baseName;
}

async function copyTextToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.width = "1px";
    textarea.style.height = "1px";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.appendChild(textarea);
    textarea.focus({ preventScroll: true });
    textarea.select();
    textarea.setSelectionRange(0, text.length);

    const clipboardDocument = document as unknown as {
      execCommand(commandId: string): boolean;
    };
    const copied = clipboardDocument.execCommand("copy");
    textarea.remove();

    if (!copied) {
      throw new Error("Clipboard write failed");
    }
  }
}

function ActionButton({
  children,
  onClick,
  disabled,
  variant = "secondary",
  state = "idle",
  busy = false,
  label,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  state?: ButtonState;
  busy?: boolean;
  label: string;
}) {
  const toneClasses = variant === "primary"
    ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
    : "border-border bg-card text-foreground hover:border-foreground hover:bg-secondary";
  const stateClasses = state === "success"
    ? "border-foreground bg-foreground text-background hover:bg-foreground/90"
    : state === "error"
    ? "border-destructive bg-card text-destructive hover:bg-destructive/10"
    : toneClasses;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-10 min-w-28 select-none items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium outline-none transition-[background-color,border-color,color,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 motion-reduce:transition-none ${stateClasses}`}
      aria-label={label}
      aria-busy={busy || undefined}
      title={label}
    >
      {children}
    </button>
  );
}

function FormatButtons({
  onFormat,
  onMinify,
  onCopy,
  processingAction,
  minifier,
  lastAction,
}: {
  onFormat: () => void;
  onMinify: () => void;
  onCopy: () => void;
  processingAction: ProcessingAction;
  minifier: boolean;
  lastAction: ActionStatus | null;
}) {
  const isProcessing = processingAction !== null;
  const isFormatting = processingAction === "format";
  const isMinifying = processingAction === "minify";
  const formatComplete = lastAction === "format_success";
  const minifyComplete = lastAction === "minify_success";
  const copyComplete = lastAction === "copied";
  const copyFailed = lastAction === "copy_failed";

  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:justify-end">
      {minifier && (
        <ActionButton
          onClick={onMinify}
          disabled={isProcessing}
          busy={isMinifying}
          state={minifyComplete ? "success" : "idle"}
          label="Minify code"
        >
          {isMinifying
            ? (
              <Loader2
                size={16}
                className="animate-spin motion-reduce:animate-none"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            )
            : minifyComplete
            ? <Check size={16} strokeWidth={1.75} aria-hidden="true" />
            : <Minimize2 size={16} strokeWidth={1.75} aria-hidden="true" />}
          <span>Minify code</span>
        </ActionButton>
      )}

      <ActionButton
        onClick={onFormat}
        disabled={isProcessing}
        busy={isFormatting}
        variant="primary"
        state={formatComplete ? "success" : "idle"}
        label="Format code"
      >
        {isFormatting
          ? (
            <Loader2
              size={16}
              className="animate-spin motion-reduce:animate-none"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          )
          : formatComplete
          ? <Check size={16} strokeWidth={1.75} aria-hidden="true" />
          : <FileText size={16} strokeWidth={1.75} aria-hidden="true" />}
        <span>Format code</span>
      </ActionButton>

      <ActionButton
        onClick={onCopy}
        disabled={isProcessing}
        state={copyComplete ? "success" : copyFailed ? "error" : "idle"}
        label="Copy code"
      >
        {copyComplete
          ? <Check size={16} strokeWidth={1.75} aria-hidden="true" />
          : <Copy size={16} strokeWidth={1.75} aria-hidden="true" />}
        <span>Copy code</span>
      </ActionButton>
    </div>
  );
}

function ToolStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-2.5 font-mono text-xs">
      <span className="uppercase text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

export default function Formatter({ minifier, language }: FormatterProps) {
  const { code, language: storeLanguage, setCode, initializeCode, setLanguage } = useFormatterStore();
  const [processingAction, setProcessingAction] = useState<ProcessingAction>(null);
  const [lastAction, setLastAction] = useState<ActionStatus | null>(null);
  const initialCode = useMemo(() => getInitialCode(language), [language]);
  const activeCode = storeLanguage === language ? code : initialCode;

  useEffect(() => {
    setLanguage(language);
    initializeCode(language);
  }, [language, setLanguage, initializeCode]);

  const handleAction = useCallback(async (type: "format" | "minify") => {
    if (processingAction !== null) {
      return;
    }

    setProcessingAction(type);
    setLastAction(null);
    try {
      if (type === "format") {
        const formatter = await getFormatter(language);
        const result = await formatter.formatCode(activeCode);
        setCode(result);
        setLastAction("format_success");
      } else {
        const minifierTool = await getMinifier(language);
        if (minifierTool) {
          const result = await minifierTool.minifyCode(activeCode);
          setCode(result);
          setLastAction("minify_success");
        } else {
          setLastAction("minifier_unavailable");
        }
      }
    } catch (e) {
      console.error(e);
      setLastAction("execution_failed");
    } finally {
      setProcessingAction(null);
    }
  }, [language, activeCode, processingAction, setCode]);

  const copyToClipboard = useCallback(async () => {
    try {
      await copyTextToClipboard(activeCode);
      setLastAction("copied");
    } catch {
      setLastAction("copy_failed");
    }
  }, [activeCode]);

  useEffect(() => {
    if (!lastAction) {
      return;
    }

    const timeoutId = window.setTimeout(() => setLastAction(null), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [lastAction]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.contentEditable === "true") {
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "f") {
        event.preventDefault();
        handleAction("format");
      } else if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "m") {
        event.preventDefault();
        handleAction("minify");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleAction]);

  return (
    <ThemeProvider>
      <FormatterContent
        code={activeCode}
        language={language}
        processingAction={processingAction}
        lastAction={lastAction}
        onFormat={() => handleAction("format")}
        onMinify={() => handleAction("minify")}
        onCopy={copyToClipboard}
        minifier={minifier}
      />
    </ThemeProvider>
  );
}

function FormatterContent({
  code,
  language,
  processingAction,
  lastAction,
  onFormat,
  onMinify,
  onCopy,
  minifier,
}: {
  code: string;
  language: string;
  processingAction: ProcessingAction;
  lastAction: ActionStatus | null;
  onFormat: () => void;
  onMinify: () => void;
  onCopy: () => void;
  minifier: boolean;
}) {
  const { setCode } = useFormatterStore();
  const languageName = formatLanguageName(language);
  const lineCount = useMemo(() => code.split(/\r\n|\r|\n/).length, [code]);
  const charCount = code.length;

  const statusMessage = lastAction === "minifier_unavailable"
    ? `${languageName} minifier is unavailable`
    : lastAction === "execution_failed"
    ? `Could not process ${languageName}`
    : lastAction === "copy_failed"
    ? "Could not copy code"
    : lastAction === "format_success"
    ? `Formatted ${languageName}`
    : lastAction === "minify_success"
    ? `Minified ${languageName}`
    : lastAction === "copied"
    ? "Copied code"
    : "";
  const statusTone = lastAction === "minifier_unavailable"
      || lastAction === "execution_failed"
      || lastAction === "copy_failed"
    ? "text-destructive"
    : "text-muted-foreground";

  return (
    <section className="border-b border-border bg-background" id="workspace">
      <div className="mx-auto max-w-350 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="grid gap-4 border-b border-border px-4 py-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase text-muted-foreground">
                Editor
              </p>
              <h2 className="mt-1 truncate text-2xl font-semibold leading-tight text-foreground">
                {languageName}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <ToolStat label="Lines" value={lineCount.toLocaleString()} />
              <ToolStat label="Chars" value={charCount.toLocaleString()} />
              <EditorThemeSelector />
            </div>
          </div>

          <div className="relative h-105 w-full bg-card md:h-130">
            <CodePlayground
              inputCode={code}
              language={language}
              onCodeChange={setCode}
            />
          </div>

          <div className="flex flex-col gap-4 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div
              id="formatter-status"
              className={`min-h-5 font-mono text-xs ${statusTone}`}
              aria-live="polite"
              aria-atomic="true"
            >
              {statusMessage}
            </div>

            <FormatButtons
              onFormat={onFormat}
              onMinify={onMinify}
              onCopy={onCopy}
              processingAction={processingAction}
              minifier={minifier}
              lastAction={lastAction}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
