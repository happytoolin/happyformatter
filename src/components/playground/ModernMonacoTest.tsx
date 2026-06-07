import { AlertTriangle, Check, Loader2, RefreshCw } from "lucide-react";
import type * as Monaco from "modern-monaco/editor-core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type MonacoApi = typeof Monaco;
type MonacoEditor = Monaco.editor.IStandaloneCodeEditor;
type MonacoModel = Monaco.editor.ITextModel;
type MonacoDisposable = Monaco.IDisposable;

const sampleCode = `type FormatterResult = {
  language: string;
  output: string;
  changed: boolean;
};

export function summarize(result: FormatterResult) {
  return result.changed
    ? \`\${result.language} formatted successfully\`
    : "No changes needed";
}
`;

const themeOptions = [
  { id: "github-dark", label: "GitHub Dark" },
  { id: "github-light", label: "GitHub Light" },
] as const;

type TestTheme = typeof themeOptions[number]["id"];
type LoadState = "idle" | "loading" | "ready" | "error";

export default function ModernMonacoTest() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const monacoRef = useRef<MonacoApi | null>(null);
  const editorRef = useRef<MonacoEditor | null>(null);
  const modelRef = useRef<MonacoModel | null>(null);
  const changeListenerRef = useRef<MonacoDisposable | null>(null);
  const themeRef = useRef<TestTheme>("github-dark");
  const codeRef = useRef<string>(sampleCode);

  const [theme, setTheme] = useState<TestTheme>("github-dark");
  const [code, setCode] = useState<string>(sampleCode);
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [loadMs, setLoadMs] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function bootEditor() {
      setLoadState("loading");
      setError(null);
      const startedAt = performance.now();

      try {
        const { init } = await import("modern-monaco/core");
        const monaco = await init({
          defaultTheme: () => import("@shikijs/themes/github-dark"),
          themes: [
            () => import("@shikijs/themes/github-light"),
          ],
          langs: [
            () => import("@shikijs/langs/typescript"),
          ],
        });

        if (cancelled || !containerRef.current) {
          return;
        }

        const model = monaco.editor.createModel(codeRef.current, "typescript");
        const editor = monaco.editor.create(containerRef.current, {
          model,
          automaticLayout: true,
          fontFamily: "\"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 14,
          lineHeight: 22,
          lineNumbers: "on",
          minimap: { enabled: false },
          padding: { top: 16, bottom: 16 },
          renderLineHighlight: "line",
          scrollBeyondLastLine: false,
          tabSize: 2,
          wordWrap: "on",
        });

        monaco.editor.setTheme(themeRef.current);
        monacoRef.current = monaco;
        modelRef.current = model;
        editorRef.current = editor;
        changeListenerRef.current = editor.onDidChangeModelContent(() => {
          const nextCode = editor.getValue();
          codeRef.current = nextCode;
          setCode(nextCode);
        });

        setLoadMs(Math.round(performance.now() - startedAt));
        setLoadState("ready");
      } catch (caught) {
        if (cancelled) {
          return;
        }

        setError(caught instanceof Error ? caught.message : "modern-monaco failed to load.");
        setLoadState("error");
      }
    }

    bootEditor();

    return () => {
      cancelled = true;
      changeListenerRef.current?.dispose();
      editorRef.current?.dispose();
      modelRef.current?.dispose();
      changeListenerRef.current = null;
      editorRef.current = null;
      modelRef.current = null;
      monacoRef.current = null;
    };
  }, []);

  useEffect(() => {
    themeRef.current = theme;
    monacoRef.current?.editor.setTheme(theme);
  }, [theme]);

  const resetSample = useCallback(() => {
    codeRef.current = sampleCode;
    setCode(sampleCode);
    modelRef.current?.setValue(sampleCode);
  }, []);

  const stats = useMemo(() => {
    return {
      chars: code.length.toLocaleString(),
      lines: code.split(/\r\n|\r|\n/).length.toLocaleString(),
    };
  }, [code]);

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-350 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="grid gap-4 border-b border-border px-4 py-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase text-muted-foreground">
                Experimental editor
              </p>
              <h1 className="mt-1 truncate text-2xl font-semibold leading-tight text-foreground">
                Modern Monaco
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex h-9 items-center rounded-md border border-border bg-background px-2.5 text-sm text-muted-foreground">
                TypeScript only
              </div>

              <label className="sr-only" htmlFor="modern-monaco-theme">
                Theme
              </label>
              <select
                id="modern-monaco-theme"
                value={theme}
                onChange={(event) => setTheme(event.currentTarget.value as TestTheme)}
                className="h-9 rounded-md border border-border bg-background px-2.5 text-sm text-foreground"
              >
                {themeOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={resetSample}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground transition-[background-color,border-color,transform] duration-150 ease-out hover:border-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:translate-y-px motion-reduce:transition-none"
              >
                <RefreshCw size={15} strokeWidth={1.75} aria-hidden="true" />
                Reset
              </button>
            </div>
          </div>

          <div className="grid gap-px border-b border-border bg-border sm:grid-cols-4">
            <StatusCell label="State" value={loadState} />
            <StatusCell label="Load" value={loadMs === null ? "..." : `${loadMs}ms`} />
            <StatusCell label="Lines" value={stats.lines} />
            <StatusCell label="Chars" value={stats.chars} />
          </div>

          <div className="relative h-105 bg-card md:h-130">
            <div ref={containerRef} className="h-full w-full" />

            {loadState === "loading" && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-card/95">
                <div className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground">
                  <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                  Loading modern-monaco
                </div>
              </div>
            )}

            {loadState === "ready" && (
              <div className="pointer-events-none absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs text-muted-foreground">
                <Check size={13} strokeWidth={1.75} aria-hidden="true" />
                Ready
              </div>
            )}

            {loadState === "error" && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-card/95 p-4">
                <div className="max-w-lg rounded-lg border border-border bg-background p-5 text-sm text-foreground">
                  <AlertTriangle className="mb-3 h-7 w-7 text-destructive" aria-hidden="true" />
                  <p className="font-medium text-destructive">modern-monaco failed</p>
                  <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap rounded-md bg-secondary p-3 font-mono text-xs text-foreground">
                    {error}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card px-4 py-3">
      <p className="font-mono text-[11px] uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 truncate text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
