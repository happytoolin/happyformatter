// Global Monaco playground singleton that persists across SPA navigation
import { getInitialCode } from "@/lib/initialCode";
import { lazy, Workspace } from "modern-monaco";

declare global {
  interface Window {
    __MONACO_PLAYGROUND__?: {
      workspace: Workspace | null;
      isInitialized: boolean;
      isTransitioning: boolean;
      initPromise: Promise<void> | null;
      ensureInitialized(): Promise<void>;
      switchToLanguage(language: string): Promise<void>;
    };
  }
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

// Add a minimal skeleton placeholder as the default entry
const skeletonContent = `//`;

initialFiles["welcome.txt"] = skeletonContent;

// Add all language files
supportedLanguages.forEach((lang) => {
  const fileName = `example.${languageExtensions[lang as keyof typeof languageExtensions]}`;
  initialFiles[fileName] = getInitialCode(lang);
});

console.log("Monaco singleton: Initial files created");

function showEditor() {
  const monacoEditor = document.getElementById("monaco-editor");
  const skeletonLoader = document.getElementById("skeleton-loader");

  if (monacoEditor && skeletonLoader) {
    // Fade out skeleton
    skeletonLoader.style.opacity = "0";
    skeletonLoader.style.visibility = "hidden";

    // Fade in editor
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

export function createMonacoSingleton() {
  // Only create if it doesn't exist
  if (window.__MONACO_PLAYGROUND__) {
    console.log("Monaco singleton already exists, reusing");
    return window.__MONACO_PLAYGROUND__;
  }

  console.log("Creating new Monaco singleton");

  window.__MONACO_PLAYGROUND__ = {
    workspace: null,
    isInitialized: false,
    isTransitioning: false,
    initPromise: null,

    async ensureInitialized() {
      // Return existing promise if initialization is already in progress
      if (this.initPromise) {
        return this.initPromise;
      }

      // If already initialized, just ensure theme is applied
      if (this.isInitialized && this.workspace) {
        try {
          const monaco = await (this.workspace as any)._monaco.promise;
          if (monaco?.editor) {
            monaco.editor.setTheme("vitesse-dark");
          }
        } catch (error) {
          console.warn("Failed to re-apply theme:", error);
        }
        return;
      }

      console.log("Starting Monaco initialization");

      // Get language from URL
      const path = window.location.pathname;
      const pathMatch = path.match(/\/([^.]+)(?:\.astro)?$/);
      const language = pathMatch ? pathMatch[1] : "welcome";

      // Create initialization promise
      this.initPromise = (async () => {
        try {
          this.workspace = new Workspace({
            name: "formatter-workspace",
            initialFiles: initialFiles,
            entryFile: "welcome.txt",
            browserHistory: false,
          });

          // Initialize the editor with all supported languages and theme
          await lazy({
            workspace: this.workspace!,
            theme: "vitesse-dark",
            langs: supportedLanguages,
          });

          // Single theme setting after everything is loaded
          try {
            const monaco = await (this.workspace! as any)._monaco.promise;
            if (monaco?.editor) {
              monaco.editor.setTheme("vitesse-dark");
              console.log("Monaco singleton: Theme set: vitesse-dark");

              // Ensure the editor is properly attached to DOM and sized
              setTimeout(() => {
                const monacoEditorElement = document.getElementById(
                  "monaco-editor",
                ) as any;
                const editors = monaco.editor.getEditors();

                if (editors.length > 0 && monacoEditorElement) {
                  const editor = editors[0];
                  // Force a layout to ensure proper rendering
                  editor.layout();
                  // Re-attach theme after DOM is ready
                  monaco.editor.setTheme("vitesse-dark");
                }
              }, 100);
            }
          } catch (themeError) {
            console.warn("Failed to set theme:", themeError);
          }

          this.isInitialized = true;
          console.log("Monaco singleton: Workspace initialized successfully");

          // If we're on a language page, switch to that language after initialization
          if (language && language !== "welcome") {
            setTimeout(async () => {
              console.log(
                `Monaco singleton: Post-initialization switch to ${language}`,
              );
              await this.switchToLanguage(language);
            }, 100);
          } else {
            showEditor();
          }
        } catch (error) {
          console.error("Monaco singleton: Failed to initialize:", error);
          showEditor();
          this.initPromise = null; // Reset promise on error
        }
      })();

      return this.initPromise;
    },

    async switchToLanguage(language: string) {
      if (!this.workspace || this.isTransitioning) {
        console.error(
          "Monaco singleton: Workspace not available or already transitioning",
        );
        return;
      }

      this.isTransitioning = true;

      try {
        const fileName = `example.${language}`;
        console.log(
          `=== MONACO SINGLETON: SWITCHING TO ${language} file: ${fileName} ===`,
        );

        // Get the Monaco instance from workspace
        const monaco = await (this.workspace as any)._monaco.promise;

        if (!monaco) {
          throw new Error("Monaco instance not available");
        }

        // Get the monaco-editor element from DOM
        const monacoEditorElement = document.getElementById(
          "monaco-editor",
        ) as any;
        if (!monacoEditorElement) {
          throw new Error("Monaco editor element not found in DOM");
        }

        // Get or create the editor instance
        let editors = monaco.editor.getEditors();
        let editor: any;

        if (editors.length === 0) {
          console.log("Creating new Monaco editor instance");
          // Create new editor if none exists
          editor = monaco.editor.create(monacoEditorElement);
        } else {
          editor = editors[0];
          // If editor exists but might be detached from DOM, reattach it
          if (
            editor.getContainerDomNode()?.parentElement !== monacoEditorElement
          ) {
            console.log("Reattaching Monaco editor to DOM");
            // Clear the monaco-editor element and reattach
            monacoEditorElement.innerHTML = "";
            monaco.editor.attach(editor, monacoEditorElement);
          }
        }

        // Ensure the editor is properly sized and themed
        editor.layout();
        try {
          monaco.editor.setTheme("vitesse-dark");
        } catch (themeError) {
          console.warn("Failed to set theme:", themeError);
        }

        const currentModel = editor.getModel();
        console.log(
          "Editor found, current model:",
          currentModel?.getLanguageId(),
        );

        const modelUri = monaco.Uri.parse(`file:///${fileName}`);

        // Check if model already exists and reuse it
        let model = monaco.editor.getModel(modelUri);

        if (!model) {
          // Create new model only if it doesn't exist
          let content: string;
          try {
            content = await this.workspace!.fs.readTextFile(fileName);
            console.log(
              `Read ${content.length} chars from workspace file: ${fileName}`,
            );
          } catch {
            console.warn(
              `File ${fileName} not found in workspace, using initial code`,
            );
            content = getInitialCode(language);
            console.log(
              `Using initial code for ${language}: ${content.length} chars`,
            );
          }

          model = monaco.editor.createModel(content, language, modelUri);
          console.log(
            `Created new model for ${fileName} with language: ${language}`,
          );
        } else {
          console.log(`Reusing existing model for ${fileName}`);
        }

        // Set the model on the editor - this switches the displayed content and language
        editor.setModel(model);

        // Minimal theme and layout refresh
        try {
          monaco.editor.setTheme("vitesse-dark");
          editor.layout();
        } catch (themeError) {
          console.warn("Failed to refresh editor:", themeError);
        }

        // Smooth transition: show editor immediately since content is ready
        showEditor();

        // Verify the switch
        const finalModel = editor.getModel();
        const finalLanguage = finalModel ? finalModel.getLanguageId() : "none";
        const finalContent = finalModel
          ? finalModel.getValue().substring(0, 50) + "..."
          : "empty";

        console.log(`=== MONACO SINGLETON: SWITCH COMPLETED ===`);
        console.log(`Target: ${language}`);
        console.log(`Actual language: ${finalLanguage}`);
        console.log(`Content preview: ${finalContent}`);
        console.log(`Model matches target: ${finalLanguage === language}`);
      } catch (error) {
        console.error(
          `Monaco singleton: Failed to switch to ${language} file:`,
          error,
        );
        showEditor();
      } finally {
        this.isTransitioning = false;
      }
    },
  };

  return window.__MONACO_PLAYGROUND__;
}

// Expose API globally for the formatter component
export function exposeMonacoAPI() {
  const monacoPlayground = window.__MONACO_PLAYGROUND;
  if (!monacoPlayground) {
    console.error("Monaco playground singleton not found");
    return;
  }

  (window as any).MonacoPlayground = {
    async getCurrentContent(_playgroundElement: HTMLElement): Promise<string> {
      if (!monacoPlayground.workspace) {
        console.error("Workspace not available");
        return "";
      }

      try {
        const monaco = await (monacoPlayground.workspace as any)._monaco
          .promise;
        const editors = monaco.editor.getEditors();
        if (editors.length === 0) return "";

        const editor = editors[0];
        const model = editor.getModel();
        return model ? model.getValue() : "";
      } catch (error) {
        console.error("Failed to get current content:", error);
        return "";
      }
    },

    async updateContent(
      _playgroundElement: HTMLElement,
      newContent: string,
    ): Promise<void> {
      if (!monacoPlayground.workspace) {
        console.error("Workspace not available");
        return;
      }

      try {
        const monaco = await (monacoPlayground.workspace as any)._monaco
          .promise;
        const editors = monaco.editor.getEditors();
        if (editors.length === 0) return;

        const editor = editors[0];
        const model = editor.getModel();
        if (model) {
          model.setValue(newContent);
        }
      } catch (error) {
        console.error("Failed to update content:", error);
      }
    },
  };
}

// Initialize event listeners for SPA navigation
export function setupEventListeners() {
  console.log("Setting up Monaco SPA navigation listeners");

  // Listen for Astro's SPA navigation events
  document.addEventListener("astro:before-swap", () => {
    console.log("astro:before-swap detected - preserving Monaco editor state");
  });

  // Use multiple event listeners to catch the right timing
  document.addEventListener("astro:after-preparation", async () => {
    console.log("astro:after-preparation triggered");
  });

  // Also listen for page visibility changes to re-apply theme if needed
  document.addEventListener("visibilitychange", async () => {
    const monacoPlayground = window.__MONACO_PLAYGROUND__;
    if (
      !document.hidden &&
      monacoPlayground?.workspace &&
      monacoPlayground.isInitialized
    ) {
      console.log("Page became visible, ensuring theme is applied");
      try {
        const monaco = await (monacoPlayground.workspace as any)._monaco
          .promise;
        if (monaco) {
          monaco.editor.setTheme("vitesse-dark");

          // Refresh all editors
          const editors = monaco.editor.getEditors();
          editors.forEach((editor: any) => {
            editor.layout();
          });
        }
      } catch (error) {
        console.warn("Failed to re-apply theme on visibility change:", error);
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

      await monacoPlayground.switchToLanguage(newLanguage);
    } catch (error) {
      console.error("Error switching language:", error);
      showEditor();
    }
  });
}
