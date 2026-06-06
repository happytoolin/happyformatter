import { getFormatter, getMinifier } from "@/handlers";
import { getInitialCode } from "@/lib/initialCode";
import { LANGUAGES } from "@/lib/languages";
import { Check, Copy, FileText, Minimize2 } from "lucide-react";
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

function formatLanguageName(language: string) {
  return LANGUAGES[language]?.name || language
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function ActionButton({
  children,
  onClick,
  disabled,
  variant = "secondary",
  label,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  label: string;
}) {
  const classes = variant === "primary"
    ? "border-foreground bg-primary text-primary-foreground hover:opacity-90"
    : "border-border bg-card text-foreground hover:border-foreground hover:bg-secondary";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-10 min-w-28 items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors active:translate-y-px disabled:pointer-events-none disabled:opacity-50 ${classes}`}
      aria-label={label}
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
  isProcessing,
  minifier,
  lastAction,
}: {
  onFormat: () => void;
  onMinify: () => void;
  onCopy: () => void;
  isProcessing: boolean;
  minifier: boolean;
  lastAction: ActionStatus | null;
}) {
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
          label="Minify code"
        >
          {minifyComplete
            ? <Check size={16} strokeWidth={1.75} aria-hidden="true" />
            : <Minimize2 size={16} strokeWidth={1.75} aria-hidden="true" />}
          <span>{minifyComplete ? "Minified" : "Minify"}</span>
        </ActionButton>
      )}

      <ActionButton
        onClick={onFormat}
        disabled={isProcessing}
        variant="primary"
        label="Format code"
      >
        {formatComplete
          ? <Check size={16} strokeWidth={1.75} aria-hidden="true" />
          : <FileText size={16} strokeWidth={1.75} aria-hidden="true" />}
        <span>
          {formatComplete ? "Formatted" : isProcessing ? "Working" : "Format"}
        </span>
      </ActionButton>

      <button
        onClick={onCopy}
        className={`inline-flex h-10 min-w-24 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors active:translate-y-px ${
          copyComplete
            ? "border-foreground bg-foreground text-background"
            : copyFailed
            ? "border-destructive bg-card text-destructive"
            : "border-border bg-card text-foreground hover:border-foreground hover:bg-secondary"
        }`}
        aria-label={copyComplete ? "Code copied" : copyFailed ? "Copy failed" : "Copy code"}
        title={copyComplete ? "Code copied" : copyFailed ? "Copy failed" : "Copy code"}
      >
        {copyComplete
          ? <Check size={16} strokeWidth={1.75} aria-hidden="true" />
          : <Copy size={16} strokeWidth={1.75} aria-hidden="true" />}
        <span>{copyComplete ? "Copied" : copyFailed ? "Failed" : "Copy"}</span>
      </button>
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastAction, setLastAction] = useState<ActionStatus | null>(null);
  const initialCode = useMemo(() => getInitialCode(language), [language]);
  const activeCode = storeLanguage === language ? code : initialCode;

  useEffect(() => {
    setLanguage(language);
    initializeCode(language);
  }, [language, setLanguage, initializeCode]);

  const handleAction = useCallback(async (type: "format" | "minify") => {
    setIsProcessing(true);
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
      setIsProcessing(false);
      setTimeout(() => setLastAction(null), 1500);
    }
  }, [language, activeCode, setCode]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setLastAction("copied");
    } catch {
      setLastAction("copy_failed");
    }
    setTimeout(() => setLastAction(null), 1500);
  }, [activeCode]);

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
        isProcessing={isProcessing}
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
  isProcessing,
  lastAction,
  onFormat,
  onMinify,
  onCopy,
  minifier,
}: {
  code: string;
  language: string;
  isProcessing: boolean;
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

  const issueMessage = lastAction === "minifier_unavailable"
    ? "Minifier unavailable"
    : lastAction === "execution_failed"
    ? "Format failed"
    : lastAction === "copy_failed"
    ? "Copy failed"
    : "";

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
              className="min-h-5 font-mono text-xs uppercase text-destructive"
              aria-live="polite"
            >
              {issueMessage}
            </div>

            <FormatButtons
              onFormat={onFormat}
              onMinify={onMinify}
              onCopy={onCopy}
              isProcessing={isProcessing}
              minifier={minifier}
              lastAction={lastAction}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
