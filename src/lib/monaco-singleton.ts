// Global Monaco playground singleton that persists across SPA navigation
import { getInitialCode } from "@/lib/initialCode";
import type { MonacoPlayground } from "@/types/monaco";

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
    // If the theme is not a shiki theme (e.g. "dark" or "light" from system/toggle),
    // we should map it to a shiki theme or return a default.
    // Assuming "data-theme" contains values from our ThemeSelector (shiki themes)
    // AND potentially "dark"/"light" from ThemeToggle if they conflict.
    // The ThemeSelector sets data-theme. The ThemeToggle sets class="dark".
    // We should prioritize data-theme if it matches a known shiki theme.
    if (theme) return theme;
  }
  return "vitesse-dark"; // Default modern dark theme
}

// Lazy load Monaco modules
let monacoPromise: Promise<any> | null = null;

async function loadMonaco() {
  if (monacoPromise) return monacoPromise;

  monacoPromise = import("modern-monaco").then(({ Workspace, lazy }) => ({
    Workspace,
    lazy,
  }));
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
      console.warn(
        `[Monaco] Attempt ${attempt} failed, retrying in ${delay}ms:`,
        error,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

// Map our language names to Monaco language IDs
function getMonacoLanguageId(language: string): string {
  const monacoMapping: Record<string, string> = {
    javascript: "javascript",
    typescript: "typescript",
    json: "json",
    html: "html",
    css: "css",
    scss: "scss",
    xml: "xml",
    yaml: "yaml",
    markdown: "markdown",
    go: "go",
    python: "python",
    sql: "sql",
    rust: "rust",
    dart: "dart",
    lua: "lua",
    c: "c",
    cpp: "cpp",
    java: "java",
    csharp: "csharp",
    php: "php",
    proto: "protobuf",
    zig: "zig",
    toml: "toml",
  };

  return monacoMapping[language] || language;
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
  const initialCode = getInitialCode(lang);
  initialFiles[fileName] = initialCode;
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
          const currentTheme = getMonacoTheme();
          // Ensure theme is applied on re-init check
          monaco.editor.setTheme(currentTheme);
        }
        return;
      }

      const path = window.location.pathname;
      const pathMatch = path.match(/\/([^.]+)(?:\.astro)?$/);
      const language = pathMatch ? pathMatch[1] : "welcome";

      console.log("=== MONACO INITIALIZATION ===");
      console.log("Path:", path);
      console.log("Language match:", pathMatch);
      console.log("Detected language:", language);

      const entryFile =
        language && language !== "welcome"
          ? `example.${languageExtensions[language as keyof typeof languageExtensions] || language}`
          : "welcome.txt";

      console.log("Entry file:", entryFile);

      this.initPromise = (async () => {
        perf.start("monaco-initialization");

        try {
          // Lazy load Monaco
          const { Workspace, lazy } = await retryWithBackoff(() =>
            loadMonaco(),
          );

          perf.start("workspace-creation");
          console.log("=== CREATING WORKSPACE ===");
          console.log("Entry file:", entryFile);
          console.log(
            "Available files in initialFiles:",
            Object.keys(initialFiles),
          );

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
            }),
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
              console.warn(
                `[Monaco] Failed to set theme ${currentTheme}, will retry...`,
              );
              // Retry after a short delay
              setTimeout(() => {
                try {
                  const retryTheme = getMonacoTheme();
                  monaco.editor.setTheme(retryTheme);
                } catch (retryError) {
                  console.error(
                    "[Monaco] Theme setting failed completely:",
                    retryError,
                  );
                }
              }, 300);
            }

            // Layout immediately without delay
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
          }

          this.isInitialized = true;

          if (language && language !== "welcome") {
            console.log(
              "=== INITIALIZATION: SWITCHING TO LANGUAGE ===",
              language,
            );
            // Switch language immediately - Monaco should be ready
            try {
              // Allow language switching during initialization
              await this.switchToLanguage(language, true);
            } catch (error) {
              console.error(
                "[Monaco] Failed to switch language after init:",
                error,
              );
              showEditor(); // Show editor even if language switch fails
            }
          } else {
            console.log("=== INITIALIZATION: SHOWING WELCOME SCREEN ===");
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

    async switchToLanguage(
      language: string,
      allowDuringReload: boolean = false,
    ): Promise<void> {
      if (!this.workspace || (this.isTransitioning && !allowDuringReload)) {
        console.log(
          "Monaco singleton: Workspace not available or already transitioning",
          {
            workspace: !!this.workspace,
            isTransitioning: this.isTransitioning,
            allowDuringReload,
          },
        );
        return;
      }

      const wasTransitioning = this.isTransitioning;
      if (!wasTransitioning) {
        this.isTransitioning = true;
      }

      try {
        const extension =
          languageExtensions[language as keyof typeof languageExtensions];
        const fileName = `example.${extension || language}`;
        console.log(
          `=== MONACO SINGLETON: SWITCHING TO ${language} file: ${fileName} ===`,
        );
        console.log("Language extension mapping:", { language, extension });

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
        console.log("=== MODEL CREATION DEBUG ===");
        console.log("Looking for model with URI:", modelUri.toString());
        console.log("Available models in workspace:");

        // List all available models
        monaco.editor.getModels().forEach((model: any, index: number) => {
          console.log(
            `  ${index}: URI=${model.uri.toString()}, Language=${model.getLanguageId()}, Content Preview=${model.getValue().substring(0, 50)}...`,
          );
        });

        let model = monaco.editor.getModel(modelUri);

        // Always get fresh content when switching languages
        let content: string;
        try {
          content = await this.workspace!.fs.readTextFile(fileName);
          console.log(
            "Content read from workspace file:",
            content.substring(0, 100) + "...",
          );
        } catch {
          content = getInitialCode(language);
          console.log(
            "Using initial code for language:",
            language,
            content.substring(0, 100) + "...",
          );

          // Ensure the file exists in workspace for future reads
          try {
            await this.workspace!.fs.writeFile(fileName, content);
            console.log("Wrote initial content to workspace file:", fileName);
          } catch (writeError) {
            console.warn("Failed to write to workspace file:", writeError);
          }
        }

        const monacoLanguageId = getMonacoLanguageId(language);
        console.log(
          "Using Monaco language ID:",
          monacoLanguageId,
          "for language:",
          language,
        );

        if (!model) {
          console.log("Model not found, creating new model for:", fileName);
          model = monaco.editor.createModel(
            content,
            monacoLanguageId,
            modelUri,
          );
          console.log(
            "New model created with content:",
            content.substring(0, 50) + "...",
          );
        } else {
          console.log(
            "Found existing model with language:",
            model.getLanguageId(),
          );
          console.log(
            "Current model content:",
            model.getValue().substring(0, 50) + "...",
          );
          console.log(
            "New content should be:",
            content.substring(0, 50) + "...",
          );

          // Always update content when switching languages
          if (model.getValue() !== content) {
            console.log("Updating model content for language switch");
            model.setValue(content);
          }

          // Update the language if needed
          if (model.getLanguageId() !== monacoLanguageId) {
            console.log(
              "Updating model language from",
              model.getLanguageId(),
              "to",
              monacoLanguageId,
            );
            monaco.editor.setModelLanguage(model, monacoLanguageId);
          }
        }

        console.log("Setting model on editor...");
        editor.setModel(model);
        monaco.editor.setTheme(getMonacoTheme());
        editor.layout();

        console.log("=== LANGUAGE SWITCH SUCCESS ===", { language, fileName });
        showEditor();
        perf.end("language-switch");
      } catch (error) {
        perf.end("language-switch");
        console.error("[Monaco] Language switch failed:", error);
        showEditor();
      } finally {
        if (!wasTransitioning) {
          console.log("=== RESETTING TRANSITION STATE ===");
          this.isTransitioning = false;
        } else {
          console.log(
            "=== KEEPING TRANSITION STATE (was already transitioning) ===",
          );
        }
      }
    },
  };

  return window.__MONACO_PLAYGROUND__;
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

      if (
        !window.__MONACO_PLAYGROUND__?.workspace ||
        !window.__MONACO_PLAYGROUND__.isInitialized
      ) {
        console.warn("[Monaco] Attempted to get content before initialization");
        perf.end("get-current-content");
        return "";
      }

      try {
        // Small delay to ensure Monaco is ready (reduced for faster response)
        await new Promise((resolve) => setTimeout(resolve, 50));

        const monaco = await (monacoPlayground.workspace as any)._monaco
          .promise;
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

      if (
        !window.__MONACO_PLAYGROUND__?.workspace ||
        !window.__MONACO_PLAYGROUND__.isInitialized
      ) {
        console.warn(
          "[Monaco] Attempted to update content before initialization",
        );
        perf.end("update-content");
        return;
      }

      if (newContent === undefined || newContent === null) {
        console.warn(
          "[Monaco] Attempted to update with null/undefined content",
        );
        perf.end("update-content");
        return;
      }

      try {
        // Small delay to ensure Monaco is ready (reduced for faster response)
        await new Promise((resolve) => setTimeout(resolve, 50));

        const monaco = await (monacoPlayground.workspace as any)._monaco
          .promise;
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

// Track if event listeners have been set up
let eventListenersSetup = false;

// Initialize event listeners for SPA navigation
export function setupEventListeners() {
  // Prevent duplicate setup
  if (eventListenersSetup || typeof document === "undefined") {
    return;
  }

  eventListenersSetup = true;

  // Theme changes are handled by ThemeSelector component
  // which shows a reload button for the user to click

  document.addEventListener("astro:before-swap", () => {});

  document.addEventListener("astro:after-preparation", async () => {});

  document.addEventListener("visibilitychange", async () => {
    const monacoPlayground = window.__MONACO_PLAYGROUND__;
    if (
      !document.hidden &&
      monacoPlayground?.workspace &&
      monacoPlayground.isInitialized
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
              console.warn(
                "[Monaco] Theme setting failed on visibility change:",
                themeError,
              );
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
    console.log("=== astro:after-swap triggered ===");

    const monacoPlayground = window.__MONACO_PLAYGROUND__;
    if (!monacoPlayground) {
      console.error("Monaco playground singleton not found");
      return;
    }

    // Wait a bit for DOM to be fully ready after swap
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Ensure monaco-editor element exists and is ready
    const monacoEditorElement = document.getElementById("monaco-editor");
    if (!monacoEditorElement) {
      console.error("Monaco editor element not found after swap");
      return;
    }

    // Always derive language from URL to be more reliable
    const path = window.location.pathname;
    const pathMatch = path.match(/\/([^.]+)(?:\.astro)?$/);
    const newLanguage = pathMatch ? pathMatch[1] : null;

    console.log("URL:", path);
    console.log("Derived language:", newLanguage);

    if (!newLanguage || !monacoPlayground.isInitialized) {
      console.log(
        "Skipping language switch - language:",
        newLanguage,
        "initialized:",
        monacoPlayground.isInitialized,
      );
      return;
    }

    try {
      console.log("Switching to language:", newLanguage);

      // Force the editor to be visible and properly attached before switching
      hideEditor();

      // Give the DOM time to render the skeleton
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Allow language switching during navigation/reload
      await monacoPlayground.switchToLanguage(newLanguage, true);
    } catch (error) {
      console.error("[Monaco] After swap language switch failed:", error);
      showEditor();
    }
  });
}
