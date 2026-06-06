import { LANGUAGES } from "@/lib/languages";
import { AlertTriangle } from "lucide-react";
import type { InitOptions } from "modern-monaco/core";
import type * as Monaco from "modern-monaco/editor-core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeContext";

interface CodePlaygroundProps {
  inputCode: string;
  language: string;
  onCodeChange?: (code: string) => void;
}

type MonacoApi = typeof Monaco;
type MonacoEditor = Monaco.editor.IStandaloneCodeEditor;
type MonacoModel = Monaco.editor.ITextModel;
type MonacoDisposable = Monaco.IDisposable;
type MonacoLanguageInput = NonNullable<InitOptions["langs"]>[number];
type MonacoThemeInput = NonNullable<InitOptions["themes"]>[number];

type MonacoLanguage = {
  id: string;
  loader: MonacoLanguageInput | null;
};

const themeLoaders: MonacoThemeInput[] = [
  () => import("@shikijs/themes/github-light"),
  () => import("@shikijs/themes/solarized-light"),
  () => import("@shikijs/themes/vitesse-light"),
  () => import("@shikijs/themes/catppuccin-latte"),
  () => import("@shikijs/themes/one-dark-pro"),
  () => import("@shikijs/themes/nord"),
  () => import("@shikijs/themes/material-theme-palenight"),
  () => import("@shikijs/themes/dracula"),
  () => import("@shikijs/themes/solarized-dark"),
  () => import("@shikijs/themes/monokai"),
  () => import("@shikijs/themes/dark-plus"),
  () => import("@shikijs/themes/vitesse-dark"),
  () => import("@shikijs/themes/catppuccin-mocha"),
];

const editorThemeToMonacoTheme: Record<string, string> = {
  "github-light": "github-light",
  "solarized-light": "solarized-light",
  "atom-one-light": "github-light",
  "vitesse-light": "vitesse-light",
  "catppuccin-latte": "catppuccin-latte",
  "github-dark": "github-dark",
  "one-dark-pro": "one-dark-pro",
  "nord": "nord",
  "material-theme-palenight": "material-theme-palenight",
  "dracula": "dracula",
  "solarized-dark": "solarized-dark",
  "monokai": "monokai",
  "atom-one-dark": "one-dark-pro",
  "vscode-dark": "dark-plus",
  "vitesse-dark": "vitesse-dark",
  "catppuccin-mocha": "catppuccin-mocha",
};

const languageLoaders: Record<string, MonacoLanguage> = {
  c: { id: "c", loader: () => import("@shikijs/langs/c") },
  cpp: { id: "cpp", loader: () => import("@shikijs/langs/cpp") },
  objectivec: { id: "objective-c", loader: () => import("@shikijs/langs/objective-c") },
  objectivecpp: { id: "objective-cpp", loader: () => import("@shikijs/langs/objective-cpp") },
  csharp: { id: "csharp", loader: () => import("@shikijs/langs/csharp") },
  css: { id: "css", loader: () => import("@shikijs/langs/css") },
  scss: { id: "scss", loader: () => import("@shikijs/langs/scss") },
  dart: { id: "dart", loader: () => import("@shikijs/langs/dart") },
  go: { id: "go", loader: () => import("@shikijs/langs/go") },
  html: { id: "html", loader: () => import("@shikijs/langs/html") },
  java: { id: "java", loader: () => import("@shikijs/langs/java") },
  javascript: { id: "javascript", loader: () => import("@shikijs/langs/javascript") },
  json: { id: "json", loader: () => import("@shikijs/langs/json") },
  lua: { id: "lua", loader: () => import("@shikijs/langs/lua") },
  markdown: { id: "markdown", loader: () => import("@shikijs/langs/markdown") },
  php: { id: "php", loader: () => import("@shikijs/langs/php") },
  proto: { id: "proto", loader: () => import("@shikijs/langs/proto") },
  python: { id: "python", loader: () => import("@shikijs/langs/python") },
  rust: { id: "rust", loader: () => import("@shikijs/langs/rust") },
  sql: { id: "sql", loader: () => import("@shikijs/langs/sql") },
  typescript: { id: "typescript", loader: () => import("@shikijs/langs/typescript") },
  toml: { id: "toml", loader: () => import("@shikijs/langs/toml") },
  xml: { id: "xml", loader: () => import("@shikijs/langs/xml") },
  yaml: { id: "yaml", loader: () => import("@shikijs/langs/yaml") },
  zig: { id: "zig", loader: () => import("@shikijs/langs/zig") },
};

let monacoPromise: Promise<MonacoApi> | null = null;
let initializedLanguageId: string | null = null;

function formatLanguageName(language: string) {
  return LANGUAGES[language]?.name || language
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getMonacoTheme(theme: string) {
  return editorThemeToMonacoTheme[theme] ?? "github-dark";
}

function getMonacoLanguage(language: string): MonacoLanguage {
  return languageLoaders[language] ?? { id: "plaintext", loader: null };
}

async function getMonaco(language: MonacoLanguage) {
  if (!monacoPromise || initializedLanguageId !== language.id) {
    initializedLanguageId = language.id;
    monacoPromise = import("modern-monaco/core").then(({ init }) =>
      init({
        defaultTheme: () => import("@shikijs/themes/github-dark"),
        themes: themeLoaders,
        langs: language.loader ? [language.loader] : [],
      })
    );
  }

  return monacoPromise;
}

function announceEditorReady(languageName: string) {
  const announcer = document.createElement("div");
  announcer.setAttribute("aria-live", "polite");
  announcer.setAttribute("aria-atomic", "true");
  announcer.className = "sr-only";
  document.body.appendChild(announcer);
  announcer.textContent = `Editor ready for ${languageName}`;

  window.setTimeout(() => {
    announcer.remove();
  }, 1000);
}

export default function CodePlayground({ inputCode, language, onCodeChange }: CodePlaygroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const monacoRef = useRef<MonacoApi | null>(null);
  const editorRef = useRef<MonacoEditor | null>(null);
  const modelRef = useRef<MonacoModel | null>(null);
  const changeListenerRef = useRef<MonacoDisposable | null>(null);
  const inputCodeRef = useRef(inputCode);
  const onCodeChangeRef = useRef(onCodeChange);
  const applyingExternalValueRef = useRef(false);
  const { currentTheme, ready } = useTheme();
  const languageName = formatLanguageName(language);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    inputCodeRef.current = inputCode;

    const model = modelRef.current;
    if (!model || model.getValue() === inputCode) {
      return;
    }

    applyingExternalValueRef.current = true;
    try {
      model.setValue(inputCode);
    } finally {
      applyingExternalValueRef.current = false;
    }
  }, [inputCode]);

  useEffect(() => {
    onCodeChangeRef.current = onCodeChange;
  }, [onCodeChange]);

  useEffect(() => {
    monacoRef.current?.editor.setTheme(getMonacoTheme(currentTheme));
  }, [currentTheme]);

  const reloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    let cancelled = false;
    const monacoLanguage = getMonacoLanguage(language);

    async function bootEditor() {
      setIsLoading(true);
      setError(null);

      try {
        const monaco = await getMonaco(monacoLanguage);

        if (cancelled || !containerRef.current) {
          return;
        }

        const extension = LANGUAGES[language]?.extensions[0] ?? "txt";
        const model = monaco.editor.createModel(
          inputCodeRef.current,
          monacoLanguage.id,
          monaco.Uri.parse(`inmemory://happyformatter/input-${Date.now()}.${extension}`),
        );
        const editor = monaco.editor.create(containerRef.current, {
          model,
          ariaLabel: `Code editor for ${languageName}`,
          automaticLayout: true,
          contextmenu: false,
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

        editor.addCommand(monaco.KeyCode.Escape, () => {
          editor.getDomNode()?.blur();
        });

        monaco.editor.setTheme(getMonacoTheme(currentTheme));
        changeListenerRef.current = editor.onDidChangeModelContent(() => {
          if (!applyingExternalValueRef.current) {
            onCodeChangeRef.current?.(editor.getValue());
          }
        });

        monacoRef.current = monaco;
        modelRef.current = model;
        editorRef.current = editor;
        announceEditorReady(languageName);
      } catch (editorError) {
        console.error(`Could not load modern-monaco for ${languageName}`, editorError);
        if (!cancelled) {
          setError(`Could not load the editor for ${languageName}`);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
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
  }, [currentTheme, language, languageName, ready]);

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-transparent"
      data-language={language}
      role="application"
      aria-label={`Code editor for ${languageName}`}
    >
      {(isLoading || !ready) && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center bg-card/95"
          role="status"
          aria-live="polite"
        >
          <div className="w-full max-w-sm space-y-3 px-6">
            <div className="h-3 w-40 rounded-sm bg-muted" aria-hidden="true" />
            <div className="h-2 w-full rounded-sm bg-muted" aria-hidden="true" />
            <div className="h-2 w-4/5 rounded-sm bg-muted" aria-hidden="true" />
            <span className="block text-sm text-muted-foreground">
              Loading editor
            </span>
          </div>
        </div>
      )}

      {error && !isLoading && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center bg-card/95"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-sm rounded-lg border border-border bg-background p-5 text-center">
            <AlertTriangle
              className="mx-auto mb-3 h-8 w-8 text-destructive"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <p className="mb-2 text-sm text-destructive">
              {error}
            </p>
            <button
              type="button"
              onClick={reloadPage}
              className="rounded-md border border-border px-3 py-2 text-sm text-foreground transition-colors hover:border-foreground hover:bg-secondary"
              aria-label="Reload page to retry"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <div className={(isLoading || error ? "pointer-events-none opacity-50" : "") + " h-full"}>
        <div ref={containerRef} className="h-full w-full" />
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Editor ready for {languageName}.
        {(isLoading || !ready) && " Loading editor..."}
        {error && ` Error: ${error}`}
      </div>
    </div>
  );
}
