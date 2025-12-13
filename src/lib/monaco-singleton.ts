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

const skeletonContent = `//`;

initialFiles["welcome.txt"] = skeletonContent;

supportedLanguages.forEach((lang) => {
  const fileName = `example.${languageExtensions[lang as keyof typeof languageExtensions]}`;
  const code = getInitialCode(lang);
  initialFiles[fileName] = code;
  if (lang === "json") {
    console.log("JSON initial code:", code.substring(0, 100));
  }
});

function showEditor() {
  console.log("showEditor() called");
  const monacoEditor = document.getElementById("monaco-editor");
  const skeletonLoader = document.getElementById("skeleton-loader");

  console.log("monacoEditor:", monacoEditor);
  console.log("skeletonLoader:", skeletonLoader);

  if (monacoEditor && skeletonLoader) {
    skeletonLoader.style.opacity = "0";
    skeletonLoader.style.visibility = "hidden";
    monacoEditor.style.opacity = "1";
    monacoEditor.style.visibility = "visible";
    console.log("Editor visibility set to visible");
  } else {
    console.error("Missing monacoEditor or skeletonLoader elements");
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
  if (window.__MONACO_PLAYGROUND__) {
    return window.__MONACO_PLAYGROUND__;
  }

  window.__MONACO_PLAYGROUND__ = {
    workspace: null,
    isInitialized: false,
    isTransitioning: false,
    initPromise: null,

    async ensureInitialized() {
      if (this.initPromise) {
        return this.initPromise;
      }

      if (this.isInitialized && this.workspace) {
        const monaco = await (this.workspace as any)._monaco.promise;
        if (monaco?.editor) {
          monaco.editor.setTheme("vitesse-dark");
        }
        return;
      }

      const path = window.location.pathname;
      const pathMatch = path.match(/\/([^.]+)(?:\.astro)?$/);
      const language = pathMatch ? pathMatch[1] : "welcome";

      console.log("Language detection - Path:", path, "Language:", language);

      // Set the correct entry file based on language
      const entryFile = language && language !== "welcome"
        ? `example.${languageExtensions[language as keyof typeof languageExtensions] || language}`
        : "welcome.txt";
      console.log("Setting entryFile to:", entryFile);

      this.initPromise = (async () => {
        try {
          console.log("Starting Monaco workspace creation...");
          this.workspace = new Workspace({
            name: "formatter-workspace",
            initialFiles: initialFiles,
            entryFile: entryFile,
            browserHistory: false,
          });

          console.log("Calling lazy() to initialize Monaco...");
          await lazy({
            workspace: this.workspace!,
            theme: "vitesse-dark",
            langs: supportedLanguages,
          });

          console.log("Monaco lazy initialization completed");

          const monaco = await (this.workspace! as any)._monaco.promise;
          if (monaco?.editor) {
            monaco.editor.setTheme("vitesse-dark");

            setTimeout(() => {
              const monacoEditorElement = document.getElementById(
                "monaco-editor",
              ) as any;
              const editors = monaco.editor.getEditors();

              if (editors.length > 0 && monacoEditorElement) {
                const editor = editors[0];
                editor.layout();
                monaco.editor.setTheme("vitesse-dark");
              }
            }, 100);
          }

          this.isInitialized = true;
          console.log("Monaco initialization completed, language:", language);

          if (language && language !== "welcome") {
            console.log("Will call switchToLanguage for:", language, "in 100ms");
            setTimeout(async () => {
              console.log("Now calling switchToLanguage for:", language);
              await this.switchToLanguage(language);
            }, 100);
          } else {
            console.log("Language is welcome or not set, calling showEditor()");
            showEditor();
          }
        } catch (error) {
          console.error("Monaco initialization failed:", error);
          showEditor();
          this.initPromise = null;
        }
      })();

      return this.initPromise;
    },

    async switchToLanguage(language: string) {
      console.log("switchToLanguage called with:", language);
      if (!this.workspace || this.isTransitioning) {
        console.log(
          "switchToLanguage returning early - workspace:",
          !!this.workspace,
          "isTransitioning:",
          this.isTransitioning,
        );
        return;
      }

      this.isTransitioning = true;

      try {
        const fileName = `example.${language}`;
        console.log("switchToLanguage: fileName =", fileName, "for language:", language);
        console.log("Getting Monaco instance...");
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

        console.log("Getting editors...");
        let editors = monaco.editor.getEditors();
        let editor: any;

        if (editors.length === 0) {
          console.log("Creating new editor");
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
        monaco.editor.setTheme("vitesse-dark");

        const modelUri = monaco.Uri.parse(`file:///${fileName}`);

        let model = monaco.editor.getModel(modelUri);

        if (!model) {
          let content: string;
          try {
            content = await this.workspace!.fs.readTextFile(fileName);
            console.log("Read content from workspace:", content.substring(0, 50));
          } catch {
            content = getInitialCode(language);
            console.log("Using getInitialCode for", language, ":", content.substring(0, 50));
          }

          model = monaco.editor.createModel(content, language, modelUri);
          console.log("Created model for", language, "with content length:", content.length);
        }

        editor.setModel(model);

        monaco.editor.setTheme("vitesse-dark");
        editor.layout();

        console.log("switchToLanguage completed, calling showEditor");
        showEditor();
      } catch (error) {
        console.error("switchToLanguage failed:", error);
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
  const monacoPlayground = window.__MONACO_PLAYGROUND__;
  if (!monacoPlayground) {
    return;
  }

  (window as any).MonacoPlayground = {
    async getCurrentContent(_playgroundElement: HTMLElement): Promise<string> {
      if (!window.__MONACO_PLAYGROUND__?.workspace || !window.__MONACO_PLAYGROUND__.isInitialized) {
        return "";
      }

      try {
        await new Promise(resolve => setTimeout(resolve, 100));

        const monaco = await (monacoPlayground.workspace as any)._monaco.promise;
        const editors = monaco.editor.getEditors();
        if (editors.length === 0) {
          return "";
        }

        const editor = editors[0];
        const model = editor.getModel();
        if (!model) {
          return "";
        }

        return model.getValue();
      } catch (error) {
        return "";
      }
    },

    async updateContent(
      _playgroundElement: HTMLElement,
      newContent: string,
    ): Promise<void> {
      if (!window.__MONACO_PLAYGROUND__?.workspace || !window.__MONACO_PLAYGROUND__.isInitialized) {
        return;
      }

      try {
        await new Promise(resolve => setTimeout(resolve, 100));

        const monaco = await (monacoPlayground.workspace as any)._monaco.promise;
        const editors = monaco.editor.getEditors();
        if (editors.length === 0) {
          return;
        }

        const editor = editors[0];
        const model = editor.getModel();
        if (!model) {
          return;
        }

        model.setValue(newContent);
      } catch (error) {
      }
    },
  };
}

// Initialize event listeners for SPA navigation
export function setupEventListeners() {
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
          monaco.editor.setTheme("vitesse-dark");

          const editors = monaco.editor.getEditors();
          editors.forEach((editor: any) => {
            editor.layout();
          });
        }
      } catch (error) {
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
      showEditor();
    }
  });
}
