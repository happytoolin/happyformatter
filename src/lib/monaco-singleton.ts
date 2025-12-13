// Global Monaco playground singleton that persists across SPA navigation
import { getInitialCode } from "@/lib/initialCode";
import type { MonacoPlayground, MonacoPlaygroundAPI } from "@/types/monaco";

// Performance monitoring utilities
const perf = {
  start: (name: string) => {
    if (typeof window !== "undefined" && window.performance?.mark) {
      window.performance.mark(`${name}-start`);
    }
  },
  end: (name: string) => {
    if (typeof window !== "undefined" && window.performance?.measure) {
      window.performance.mark(`${name}-end`);
      window.performance.measure(name, `${name}-start`, `${name}-end`);

      const measure = window.performance.getEntriesByName(name)[0];
      console.debug(`[Monaco] ${name}: ${measure?.duration?.toFixed(2)}ms`);

      // Send to analytics if available
      if (typeof gtag !== "undefined") {
        gtag("event", "monaco_performance", {
          metric_name: name,
          metric_value: Math.round(measure?.duration || 0),
          custom_map: { metric_value: "dimension_1" },
        });
      }
    }
  },
};

// Always use dark theme for Monaco
function getMonacoTheme(): string {
  if (typeof document !== "undefined") {
    const theme = document.documentElement.getAttribute("data-theme");
    if (theme) return theme;
  }
  return "vitesse-dark"; // Default modern dark theme
}

// Lazy load Monaco modules
let monacoPromise: Promise<any> | null = null;
let availableThemes: string[] = [];

async function loadMonaco() {
  if (monacoPromise) return monacoPromise;

  monacoPromise = import("modern-monaco").then(({ Workspace, lazy }) => ({ Workspace, lazy }));
  return monacoPromise;
}

// Retry mechanism with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000,
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) break;

      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.warn(`[Monaco] Attempt ${attempt} failed, retrying in ${delay}ms:`, error);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

// Get all supported languages and their initial code
const supportedLanguages = [
  "json",
  "javascript",
  "typescript",
  "html",
  "css",
  "scss",
  "xml",
  "go",
  "java",
  "csharp",
  "c",
  "cpp",
  "python",
  "sql",
  "rust",
  "dart",
  "lua",
  "markdown",
  "yaml",
  "toml",
  "zig",
  "proto",
  "php",
];

const languageExtensions = {
  json: "json",
  javascript: "js",
  typescript: "ts",
  html: "html",
  css: "css",
  scss: "scss",
  xml: "xml",
  go: "go",
  java: "java",
  csharp: "cs",
  c: "c",
  cpp: "cpp",
  python: "py",
  sql: "sql",
  rust: "rs",
  dart: "dart",
  lua: "lua",
  markdown: "md",
  yaml: "yaml",
  toml: "toml",
  zig: "zig",
  proto: "proto",
  php: "php",
} as const;

const initialFiles: Record<string, string> = {};

const skeletonContent = `//`;

initialFiles["welcome.txt"] = skeletonContent;

supportedLanguages.forEach((lang) => {
  const fileName = `example.${languageExtensions[lang as keyof typeof languageExtensions]}`;
  initialFiles[fileName] = getInitialCode(lang);
});

function showEditor() {
  const monacoEditor = document.getElementById("monaco-editor");
  const skeletonLoader = document.getElementById("skeleton-loader");

  if (monacoEditor && skeletonLoader) {
    skeletonLoader.style.opacity = "0";
    skeletonLoader.style.visibility = "hidden";
    monacoEditor.style.opacity = "1";
    monacoEditor.style.visibility = "visible";
  }
}

function hideEditor() {
  const monacoEditor = document.getElementById("monaco-editor");
  const skeletonLoader = document.getElementById("skeleton-loader");

  if (monacoEditor && skeletonLoader) {
    // Fade out editor
    monacoEditor.style.opacity = "0";
    monacoEditor.style.visibility = "hidden";

    // Fade in skeleton
    skeletonLoader.style.opacity = "1";
    skeletonLoader.style.visibility = "visible";
  }
}

export function createMonacoSingleton(): MonacoPlayground {
  if (window.__MONACO_PLAYGROUND__) {
    return window.__MONACO_PLAYGROUND__;
  }

  window.__MONACO_PLAYGROUND__ = {
    workspace: null,
    isInitialized: false,
    isTransitioning: false,
    initPromise: null,

    async ensureInitialized(): Promise<void> {
      if (this.initPromise) {
        return this.initPromise;
      }

      if (this.isInitialized && this.workspace) {
        const monaco = await (this.workspace as any)._monaco.promise;
        if (monaco?.editor) {
          monaco.editor.setTheme(getMonacoTheme());
        }
        return;
      }

      const path = window.location.pathname;
      const pathMatch = path.match(/\/([^.]+)(?:\.astro)?$/);
      const language = pathMatch ? pathMatch[1] : "welcome";

      const entryFile = language && language !== "welcome"
        ? `example.${languageExtensions[language as keyof typeof languageExtensions] || language}`
        : "welcome.txt";

      this.initPromise = (async () => {
        perf.start("monaco-initialization");

        try {
          // Lazy load Monaco
          const { Workspace, lazy } = await retryWithBackoff(() => loadMonaco());

          perf.start("workspace-creation");
          this.workspace = new Workspace({
            name: "formatter-workspace",
            initialFiles: initialFiles,
            entryFile: entryFile,
            browserHistory: false,
          });
          perf.end("workspace-creation");

          perf.start("monaco-lazy-load");
          const theme = getMonacoTheme();

          await retryWithBackoff(() =>
            lazy({
              workspace: this.workspace!,
              theme: theme,
              langs: supportedLanguages,
            })
          );
          perf.end("monaco-lazy-load");

          const monaco = await (this.workspace! as any)._monaco.promise;
          if (monaco?.editor) {
            perf.start("theme-setup");
            // Set the theme after Monaco is ready
            const currentTheme = getMonacoTheme();
            try {
              monaco.editor.setTheme(currentTheme);
            } catch (error) {
              console.warn(`[Monaco] Failed to set theme ${currentTheme}, will retry...`);
              // Retry after a short delay
              setTimeout(() => {
                try {
                  const retryTheme = getMonacoTheme();
                  monaco.editor.setTheme(retryTheme);
                } catch (retryError) {
                  console.error("[Monaco] Theme setting failed completely:", retryError);
                }
              }, 500);
            }

            setTimeout(() => {
              const monacoEditorElement = document.getElementById(
                "monaco-editor",
              ) as any;
              const editors = monaco.editor.getEditors();

              if (editors.length > 0 && monacoEditorElement) {
                const editor = editors[0];
                editor.layout();
                monaco.editor.setTheme(getMonacoTheme());
              }
              perf.end("theme-setup");
            }, 100);
          }

          this.isInitialized = true;

          if (language && language !== "welcome") {
            setTimeout(async () => {
              await this.switchToLanguage(language);
            }, 100);
          } else {
            showEditor();
          }

          perf.end("monaco-initialization");
        } catch (error) {
          perf.end("monaco-initialization");
          console.error("[Monaco] Initialization failed:", error);

          // Show error boundary
          if (window.MonacoErrorBoundary) {
            window.MonacoErrorBoundary.show(error as Error);
          }

          this.initPromise = null;
          throw error;
        }
      })();

      return this.initPromise;
    },

    async switchToLanguage(language: string): Promise<void> {
      if (!this.workspace || this.isTransitioning) {
        return;
      }

      this.isTransitioning = true;

      try {
        const fileName = `example.${languageExtensions[language as keyof typeof languageExtensions] || language}`;
        const monaco = await (this.workspace as any)._monaco.promise;

        if (!monaco) {
          throw new Error("Monaco instance not available");
        }

        const monacoEditorElement = document.getElementById(
          "monaco-editor",
        ) as any;
        if (!monacoEditorElement) {
          throw new Error("Monaco editor element not found in DOM");
        }

        perf.start("language-switch");
        let editors = monaco.editor.getEditors();
        let editor: any;

        if (editors.length === 0) {
          editor = monaco.editor.create(monacoEditorElement);
        } else {
          editor = editors[0];
          if (
            editor.getContainerDomNode()?.parentElement !== monacoEditorElement
          ) {
            monacoEditorElement.innerHTML = "";
            monaco.editor.attach(editor, monacoEditorElement);
          }
        }

        editor.layout();
        monaco.editor.setTheme(getMonacoTheme());

        const modelUri = monaco.Uri.parse(`file:///${fileName}`);

        let model = monaco.editor.getModel(modelUri);

        if (!model) {
          let content: string;
          try {
            content = await this.workspace!.fs.readTextFile(fileName);
          } catch {
            content = getInitialCode(language);
          }

          model = monaco.editor.createModel(content, language, modelUri);
        }

        editor.setModel(model);
        monaco.editor.setTheme(getMonacoTheme());
        editor.layout();

        showEditor();
        perf.end("language-switch");
      } catch (error) {
        perf.end("language-switch");
        console.error("[Monaco] Language switch failed:", error);
        showEditor();
      } finally {
        this.isTransitioning = false;
      }
    },
  };

  return window.__MONACO_PLAYGROUND__;
}

// Helper function to wait for Monaco initialization
async function waitForMonacoReady(maxRetries = 20, delay = 100): Promise<any> {
  for (let i = 0; i < maxRetries; i++) {
    const monacoPlayground = window.__MONACO_PLAYGROUND__;
    if (monacoPlayground?.workspace && monacoPlayground.isInitialized) {
      try {
        const monaco = await monacoPlayground.workspace._monaco.promise;
        if (monaco?.editor?.getEditors && monaco.editor.getEditors().length > 0) {
          return monaco;
        }
      } catch {
        // Continue trying
      }
    }
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  return null;
}

// Expose API globally for the formatter component
export function exposeMonacoAPI(): void {
  const monacoPlayground = window.__MONACO_PLAYGROUND__;
  if (!monacoPlayground) {
    console.warn("[Monaco] Playground not initialized");
    return;
  }

  window.MonacoPlayground = {
    async getCurrentContent(_playgroundElement: HTMLElement): Promise<string> {
      perf.start("get-current-content");

      if (!window.__MONACO_PLAYGROUND__?.workspace || !window.__MONACO_PLAYGROUND__.isInitialized) {
        console.warn("[Monaco] Attempted to get content before initialization");
        perf.end("get-current-content");
        return "";
      }

      try {
        // Small delay to ensure Monaco is ready
        await new Promise(resolve => setTimeout(resolve, 100));

        const monaco = await (monacoPlayground.workspace as any)._monaco.promise;
        const editors = monaco.editor.getEditors();
        if (editors.length === 0) {
          console.warn("[Monaco] No editors found");
          perf.end("get-current-content");
          return "";
        }

        const editor = editors[0];
        const model = editor.getModel();
        if (!model) {
          console.warn("[Monaco] No model found");
          perf.end("get-current-content");
          return "";
        }

        const content = model.getValue();
        perf.end("get-current-content");
        return content;
      } catch (error) {
        console.error("[Monaco] Failed to get current content:", error);
        perf.end("get-current-content");
        return "";
      }
    },

    async updateContent(
      _playgroundElement: HTMLElement,
      newContent: string,
    ): Promise<void> {
      perf.start("update-content");

      if (!window.__MONACO_PLAYGROUND__?.workspace || !window.__MONACO_PLAYGROUND__.isInitialized) {
        console.warn("[Monaco] Attempted to update content before initialization");
        perf.end("update-content");
        return;
      }

      if (newContent === undefined || newContent === null) {
        console.warn("[Monaco] Attempted to update with null/undefined content");
        perf.end("update-content");
        return;
      }

      try {
        // Small delay to ensure Monaco is ready
        await new Promise(resolve => setTimeout(resolve, 100));

        const monaco = await (monacoPlayground.workspace as any)._monaco.promise;
        const editors = monaco.editor.getEditors();
        if (editors.length === 0) {
          console.warn("[Monaco] No editors found for update");
          perf.end("update-content");
          return;
        }

        const editor = editors[0];
        const model = editor.getModel();
        if (!model) {
          console.warn("[Monaco] No model found for update");
          perf.end("update-content");
          return;
        }

        model.setValue(newContent);
        perf.end("update-content");
      } catch (error) {
        console.error("[Monaco] Failed to update content:", error);
        perf.end("update-content");
      }
    },

    async switchLanguage(language: string): Promise<void> {
      if (!window.__MONACO_PLAYGROUND__) {
        console.warn("[Monaco] Playground not initialized");
        return;
      }

      await window.__MONACO_PLAYGROUND__.switchToLanguage(language);
    },
  };
}

// Initialize event listeners for SPA navigation
export function setupEventListeners() {
  // Listen for theme changes
  if (typeof document !== "undefined") {
    const observer = new MutationObserver(async (mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes"
          && mutation.attributeName === "data-theme"
        ) {
          const monacoPlayground = window.__MONACO_PLAYGROUND__;
          if (
            monacoPlayground?.workspace
            && monacoPlayground.isInitialized
          ) {
            try {
              const monaco = await (monacoPlayground.workspace as any)._monaco
                .promise;
              if (monaco?.editor) {
                const newTheme = getMonacoTheme();
                console.debug(`[Monaco] Switching theme to: ${newTheme}`);
                monaco.editor.setTheme(newTheme);
              }
            } catch (error) {
              console.warn("[Monaco] Failed to update theme:", error);
            }
          }
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }

  document.addEventListener("astro:before-swap", () => {
  });

  document.addEventListener("astro:after-preparation", async () => {
  });

  document.addEventListener("visibilitychange", async () => {
    const monacoPlayground = window.__MONACO_PLAYGROUND__;
    if (
      !document.hidden
      && monacoPlayground?.workspace
      && monacoPlayground.isInitialized
    ) {
      try {
        const monaco = await (monacoPlayground.workspace as any)._monaco
          .promise;
        if (monaco) {
          const currentTheme = getMonacoTheme();
          // Wait a bit for the editor to be ready
          setTimeout(() => {
            try {
              monaco.editor.setTheme(currentTheme);
            } catch (themeError) {
              console.warn("[Monaco] Theme setting failed on visibility change:", themeError);
            }
          }, 100);

          const editors = monaco.editor.getEditors();
          editors.forEach((editor: any) => {
            editor.layout();
          });
        }
      } catch (error) {
        console.error("[Monaco] Visibility change failed:", error);
      }
    }
  });

  document.addEventListener("astro:after-swap", async () => {
    const monacoPlayground = window.__MONACO_PLAYGROUND__;
    if (!monacoPlayground) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 50));

    const monacoEditorElement = document.getElementById("monaco-editor");
    if (!monacoEditorElement) {
      return;
    }

    const path = window.location.pathname;
    const pathMatch = path.match(/\/([^.]+)(?:\.astro)?$/);
    const newLanguage = pathMatch ? pathMatch[1] : null;

    if (!newLanguage || !monacoPlayground.isInitialized) {
      return;
    }

    try {
      hideEditor();
      await new Promise((resolve) => setTimeout(resolve, 50));
      await monacoPlayground.switchToLanguage(newLanguage);
    } catch (error) {
      console.error("[Monaco] After swap language switch failed:", error);
      showEditor();
    }
  });
}
