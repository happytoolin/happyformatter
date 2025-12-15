import type { Extension } from "@codemirror/state";
import { languageLoader } from "@/lib/languageLoader";
import { oneDark } from "@codemirror/theme-one-dark";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { material } from "@uiw/codemirror-theme-material";
import { nord } from "@uiw/codemirror-theme-nord";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import CodeMirror from "@uiw/react-codemirror";
import { vitesseDark } from "codemirror-theme-vitesse";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";

interface CodePlaygroundProps {
  inputCode: string;
  language: string;
  onCodeChange?: (code: string) => void;
}

export default function CodePlayground({ inputCode, language, onCodeChange }: CodePlaygroundProps) {
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentTheme } = useTheme();

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
        setError(`Failed to load language support for ${language}`);
      } finally {
        setIsLoading(false);
      }
    };

    updateExtensions();
  }, [language, getLanguageExtension]);

  return (
    <div
      className="w-full h-full bg-transparent overflow-hidden relative"
      data-language={language}
      role="application"
      aria-label={`Code editor for ${language}`}
    >
      {/* Loading state */}
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-background/80 z-10"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"
              aria-hidden="true"
            />
            <span className="text-sm text-muted-foreground">
              Loading {language} support...
            </span>
          </div>
        </div>
      )}

      {error && !isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-background/80 z-10"
          role="alert"
          aria-live="assertive"
        >
          <div className="text-center p-4">
            <div
              className="w-12 h-12 mx-auto mb-2 text-destructive"
              aria-hidden="true"
            >
              ⚠️
            </div>
            <p className="text-sm text-destructive mb-2">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-sm text-primary hover:underline"
              aria-label="Reload page to retry"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Code editor */}
      <div className={isLoading || error ? "opacity-50 pointer-events-none" : ""}>
        <CodeMirror
          value={inputCode}
          height="600px"
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
            editorElement.setAttribute("aria-label", `Code editor for ${language}`);

            const announcer = document.createElement("div");
            announcer.setAttribute("aria-live", "polite");
            announcer.setAttribute("aria-atomic", "true");
            announcer.className = "sr-only";
            document.body.appendChild(announcer);

            announcer.textContent = `Language changed to ${language}`;

            setTimeout(() => {
              document.body.removeChild(announcer);
            }, 1000);
          }}
        />
      </div>

            <div className="sr-only" aria-live="polite" aria-atomic="true">
        Editor currently loaded with {language} language support.
        {isLoading && " Loading language features..."}
        {error && ` Error: ${error}`}
      </div>
    </div>
  );
}
