// @/lib/monaco.ts
import { getInitialCode } from "@/lib/initialCode";
import { lazy, Workspace } from "modern-monaco";

// --- Type Definitions ---

declare global {
  interface Window {
    MonacoPlayground: {
      getCurrentContent(playgroundElement?: HTMLElement): Promise<string>;
      updateContent(
        playgroundElement: HTMLElement,
        newContent: string,
      ): Promise<void>;
      switchLanguage(language: string): Promise<void>;
    };
  }
}

// --- Configuration ---

const languageExtensions: Record<string, string> = {
  javascript: "js",
  typescript: "ts",
  json: "json",
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
};

const supportedLanguages = Object.keys(languageExtensions);

// --- State ---

let workspace: Workspace | null = null;
let isInitialized = false;

// --- Helpers ---

function getFilename(lang: string): string {
  const ext = languageExtensions[lang] || "txt";
  return `example.${ext}`;
}

function getTheme(): string {
  if (typeof document === "undefined") return "vitesse-dark";
  return document.documentElement.getAttribute("data-theme") || "vitesse-dark";
}

function toggleLoader(showEditor: boolean) {
  const editorEl = document.getElementById("monaco-editor");
  const skeletonEl = document.getElementById("skeleton-loader");

  if (editorEl) {
    editorEl.style.opacity = showEditor ? "1" : "0";
    editorEl.style.visibility = showEditor ? "visible" : "hidden";
  }
  if (skeletonEl) {
    skeletonEl.style.opacity = showEditor ? "0" : "1";
    skeletonEl.style.visibility = showEditor ? "visible" : "hidden";
  }
}

// --- Main Logic ---

export async function initMonaco() {
  const container = document.getElementById("monaco-editor");
  if (!container) return;

  // 1. Determine Language from URL
  const path = window.location.pathname;
  const pathMatch = path.match(/\/([^.]+)(?:\.astro)?$/);
  const lang =
    pathMatch && supportedLanguages.includes(pathMatch[1])
      ? pathMatch[1]
      : "javascript";

  const filename = getFilename(lang);

  // 2. Setup Workspace (Singleton)
  if (!workspace) {
    // Inject custom element for lazy mode
    container.innerHTML = `<monaco-editor style="width:100%; height:100%; display:block;"></monaco-editor>`;

    workspace = new Workspace({
      name: "playground",
      initialFiles: {
        [filename]: getInitialCode(lang),
      },
      entryFile: filename,
    });

    isInitialized = true;

    // 3. Initialize Lazy Mode
    try {
      await lazy({
        workspace,
        theme: getTheme(),
        langs: supportedLanguages,
      });
      toggleLoader(true);
    } catch (e) {
      console.error("Monaco initialization failed", e);
    }
  } else {
    // 4. Handle Navigation (Workspace exists)
    // If DOM was wiped (Astro swap), re-inject
    if (!container.querySelector("monaco-editor")) {
      container.innerHTML = `<monaco-editor style="width:100%; height:100%; display:block;"></monaco-editor>`;
      // Re-attach logic
      await lazy({ workspace, theme: getTheme() });
    }

    await switchToLanguage(lang);
    toggleLoader(true);
  }
}

export async function switchToLanguage(lang: string) {
  if (!workspace || !isInitialized) return;

  const filename = getFilename(lang);

  // Create file if missing
  const exists = await workspace.fs.stat(filename).catch(() => false);
  if (!exists) {
    await workspace.fs.writeFile(filename, getInitialCode(lang));
  }

  workspace.openTextDocument(filename);
}

// --- Public API ---

export function exposeMonacoAPI() {
  window.MonacoPlayground = {
    async getCurrentContent() {
      if (!workspace) return "";
      const monaco = await (workspace as any)._monaco.promise;
      const model = monaco?.editor?.getEditors()[0]?.getModel();
      return model ? model.getValue() : "";
    },

    async updateContent(_, newContent) {
      if (!workspace) return;
      const monaco = await (workspace as any)._monaco.promise;
      const model = monaco?.editor?.getEditors()[0]?.getModel();
      if (model) model.setValue(newContent);
    },

    async switchLanguage(lang: string) {
      await switchToLanguage(lang);
    },
  };
}

// --- Event Listeners ---

export function setupEventListeners() {
  if (typeof document !== "undefined") {
    initMonaco();
    exposeMonacoAPI();
  }

  document.addEventListener("astro:after-swap", async () => {
    toggleLoader(false);
    await initMonaco();
  });

  document.addEventListener("visibilitychange", async () => {
    if (!document.hidden && workspace) {
      const monaco = await (workspace as any)._monaco.promise;
      monaco?.editor?.setTheme(getTheme());
    }
  });
}
