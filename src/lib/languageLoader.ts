import type { Extension } from "@codemirror/state";

interface LanguageLoader {
  (): Promise<Extension | null>;
}

interface LanguageCache {
  [key: string]: {
    extension: Extension | null;
    loading: Promise<Extension | null> | null;
    error: Error | null;
  };
}

class LanguageLoaderManager {
  private cache: LanguageCache = {};
  private supportedLanguages: Set<string>;

  constructor() {
    this.supportedLanguages = new Set([
      "javascript",
      "typescript",
      "json",
      "python",
      "html",
      "css",
      "cpp",
      "c",
      "java",
      "php",
      "rust",
      "sql",
      "xml",
      "yaml",
      "markdown",
      "go",
      "lua",
      "protobuf",
      "scss",
      "csharp",
      "javascript-biome",
      "typescript-biome",
      "python-ruff",
      "php-mago",
    ]);
  }

  isLanguageSupported(language: string): boolean {
    return this.supportedLanguages.has(language);
  }

  async getLanguageExtension(language: string): Promise<Extension | null> {
    if (this.cache[language]) {
      const cached = this.cache[language];

      if (cached.loading) {
        return cached.loading;
      }

      if (cached.error) {
        throw cached.error;
      }

      return cached.extension;
    }

    this.cache[language] = {
      extension: null,
      loading: null,
      error: null,
    };

    const loadingPromise = this.loadLanguageExtension(language);
    this.cache[language].loading = loadingPromise;

    try {
      const extension = await loadingPromise;
      this.cache[language].extension = extension;
      this.cache[language].loading = null;
      return extension;
    } catch (error) {
      const err = error instanceof Error
        ? error
        : new Error(`Failed to load ${language}`);
      this.cache[language].error = err;
      this.cache[language].loading = null;
      throw err;
    }
  }

  /**
   * Load language extension dynamically
   */
  private async loadLanguageExtension(
    language: string,
  ): Promise<Extension | null> {
    try {
      switch (language) {
        case "javascript":
        case "typescript": {
          const { javascript } = await import("@codemirror/lang-javascript");
          return javascript({ typescript: language === "typescript" });
        }

        case "json": {
          const { json } = await import("@codemirror/lang-json");
          return json();
        }

        case "python": {
          const { python } = await import("@codemirror/lang-python");
          return python();
        }

        case "html": {
          const { html } = await import("@codemirror/lang-html");
          return html();
        }

        case "css": {
          const { css } = await import("@codemirror/lang-css");
          return css();
        }

        case "cpp":
        case "c": {
          const { cpp } = await import("@codemirror/lang-cpp");
          return cpp();
        }

        case "java": {
          const { java } = await import("@codemirror/lang-java");
          return java();
        }

        case "php": {
          const { php } = await import("@codemirror/lang-php");
          return php();
        }

        case "rust": {
          const { rust } = await import("@codemirror/lang-rust");
          return rust();
        }

        case "sql": {
          const { sql } = await import("@codemirror/lang-sql");
          return sql();
        }

        case "xml": {
          const { xml } = await import("@codemirror/lang-xml");
          return xml();
        }

        case "yaml": {
          const { yaml } = await import("@codemirror/lang-yaml");
          return yaml();
        }

        case "markdown": {
          const { markdown } = await import("@codemirror/lang-markdown");
          const { languages } = await import("@codemirror/language-data");
          return markdown({ codeLanguages: languages });
        }

        case "go": {
          const { go } = await import("@codemirror/lang-go");
          return go();
        }

        case "lua": {
          const { StreamLanguage } = await import("@codemirror/language");
          const { lua } = await import("@codemirror/legacy-modes/mode/lua");
          return StreamLanguage.define(lua);
        }

        case "protobuf": {
          const { StreamLanguage } = await import("@codemirror/language");
          const { protobuf } = await import("@codemirror/legacy-modes/mode/protobuf");
          return StreamLanguage.define(protobuf);
        }

        case "scss": {
          const { StreamLanguage } = await import("@codemirror/language");
          const { sass } = await import("@codemirror/legacy-modes/mode/sass");
          return StreamLanguage.define(sass);
        }

        case "csharp": {
          const { StreamLanguage } = await import("@codemirror/language");
          const { csharp } = await import("@codemirror/legacy-modes/mode/clike");
          return StreamLanguage.define(csharp);
        }

        case "javascript-biome": {
          const { javascript } = await import("@codemirror/lang-javascript");
          return javascript({ typescript: false });
        }

        case "typescript-biome": {
          const { javascript } = await import("@codemirror/lang-javascript");
          return javascript({ typescript: true });
        }

        case "python-ruff": {
          const { python } = await import("@codemirror/lang-python");
          return python();
        }

        case "php-mago": {
          const { php } = await import("@codemirror/lang-php");
          return php();
        }

        default:
          return null;
      }
    } catch (error) {
      return null;
    }
  }

  async preloadLanguages(languages: string[]): Promise<void> {
    const promises = languages
      .filter((lang) => this.isLanguageSupported(lang))
      .map((lang) => this.getLanguageExtension(lang).catch(() => null));

    await Promise.all(promises);
  }

  clearCache(): void {
    this.cache = {};
  }

  getCacheStatus(): { [key: string]: boolean | "loading" | "error" } {
    const status: { [key: string]: boolean | "loading" | "error" } = {};

    for (const [lang, cached] of Object.entries(this.cache)) {
      if (cached.loading) {
        status[lang] = "loading";
      } else if (cached.error) {
        status[lang] = "error";
      } else {
        status[lang] = !!cached.extension;
      }
    }

    return status;
  }
}

export const languageLoader = new LanguageLoaderManager();

export type { LanguageCache, LanguageLoader };
