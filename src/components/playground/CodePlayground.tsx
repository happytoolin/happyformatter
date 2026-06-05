import { languageLoader } from "@/lib/languageLoader";
import { LANGUAGES } from "@/lib/languages";
import type { Extension } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { material } from "@uiw/codemirror-theme-material";
import { nord } from "@uiw/codemirror-theme-nord";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import CodeMirror from "@uiw/react-codemirror";
import { vitesseDark } from "codemirror-theme-vitesse";
import { AlertTriangle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";

interface CodePlaygroundProps {
  inputCode: string;
  language: string;
  onCodeChange?: (code: string) => void;
}

function formatLanguageName(language: string) {
  return LANGUAGES[language]?.name || language
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function CodePlayground({ inputCode, language, onCodeChange }: CodePlaygroundProps) {
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentTheme, ready } = useTheme();
  const languageName = formatLanguageName(language);

  const getTheme = useCallback(() => {
    switch (currentTheme) {
      case "github-light":
        return githubLight;
      case "github-dark":
        return githubDark;
      case "dracula":
        return dracula;
      case "nord":
        return nord;
      case "material-theme-palenight":
        return material;
      case "one-dark-pro":
        return oneDark;
      case "monokai":
        return okaidia;
      case "atom-one-dark":
        return oneDark;
      case "atom-one-light":
        return githubLight;
      case "vscode-dark":
        return oneDark;
      case "solarized-dark":
        return dracula;
      case "solarized-light":
        return githubLight;
      case "vitesse-dark":
        return vitesseDark;
      case "vitesse-light":
        return githubLight;
      case "catppuccin-mocha":
        return dracula;
      case "catppuccin-latte":
        return githubLight;
      default:
        return okaidia;
    }
  }, [currentTheme]);

  const getLanguageExtension = useCallback(async (lang: string) => {
    try {
      return await languageLoader.getLanguageExtension(lang);
    } catch (error) {
      return null;
    }
  }, []);

  useEffect(() => {
    const updateExtensions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const langExtension = await getLanguageExtension(language);
        const exts: Extension[] = [];

        if (langExtension) {
          exts.push(langExtension);
        }

        const { EditorView } = await import("@codemirror/view");
        exts.push(EditorView.lineWrapping);

        const { keymap } = await import("@codemirror/view");
        const { insertTab } = await import("@codemirror/commands");

        exts.push(keymap.of([
          { key: "Tab", run: insertTab },
          {
            key: "Escape",
            run: () => {
              (document.activeElement as HTMLElement)?.blur();
              return true;
            },
          },
        ]));

        setExtensions(exts);
      } catch (error) {
        setError(`Could not load the editor for ${languageName}`);
      } finally {
        setIsLoading(false);
      }
    };

    updateExtensions();
  }, [language, languageName, getLanguageExtension]);

  return (
    <div
      className="w-full h-full bg-transparent overflow-hidden relative"
      data-language={language}
      role="application"
      aria-label={`Code editor for ${languageName}`}
    >
      {/* Loading state */}
      {isLoading && (
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
            <p className="text-sm text-destructive mb-2">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-md border border-border px-3 py-2 text-sm text-foreground transition-colors hover:border-foreground hover:bg-secondary"
              aria-label="Reload page to retry"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Code editor */}
      {ready
        ? (
          <div className={(isLoading || error ? "opacity-50 pointer-events-none" : "") + " h-full"}>
            <CodeMirror
              value={inputCode}
              height="100%"
              theme={getTheme()}
              extensions={extensions}
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                highlightSpecialChars: true,
                history: true,
                foldGutter: true,
                drawSelection: true,
                dropCursor: true,
                allowMultipleSelections: true,
                indentOnInput: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: true,
                highlightSelectionMatches: true,
                searchKeymap: true,
              }}
              editable={!isLoading && !error}
              onChange={(value) => {
                onCodeChange?.(value);
              }}
              onCreateEditor={(view) => {
                const editorElement = view.dom;
                editorElement.setAttribute("role", "textbox");
                editorElement.setAttribute("aria-multiline", "true");
                editorElement.setAttribute("aria-label", `Code editor for ${languageName}`);

                const announcer = document.createElement("div");
                announcer.setAttribute("aria-live", "polite");
                announcer.setAttribute("aria-atomic", "true");
                announcer.className = "sr-only";
                document.body.appendChild(announcer);

                announcer.textContent = `Editor ready for ${languageName}`;

                setTimeout(() => {
                  document.body.removeChild(announcer);
                }, 1000);
              }}
            />
          </div>
        )
        : <div className="h-full bg-card" aria-hidden="true" />}

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Editor ready for {languageName}.
        {isLoading && " Loading editor..."}
        {error && ` Error: ${error}`}
      </div>
    </div>
  );
}
