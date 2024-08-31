import {
  type BundledLanguage,
  createHighlighter,
  createJavaScriptRegexEngine,
  type Highlighter,
  type LanguageInput,
  type SpecialLanguage,
} from "shiki";

// Check if window is available and attach highlighterCache to it
const highlighterCache: Map<string, Highlighter> = typeof window !== "undefined"
  ? (window.highlighterCache = window.highlighterCache || new Map())
  : new Map();

const jsEngine = createJavaScriptRegexEngine();

export const loadHighlighter = async (
  language: string,
  themes: { [key: string]: string },
): Promise<Highlighter> => {
  if (highlighterCache.has(language)) {
    return highlighterCache.get(language)!;
  }

  highlighterCache.clear();

  try {
    const hl = await createHighlighter({
      langs: [],
      themes: Object.values(themes),
      engine: jsEngine,
    });

    await hl.loadLanguage(language as BundledLanguage | LanguageInput | SpecialLanguage);

    await hl.loadLanguage(
      language as BundledLanguage | LanguageInput | SpecialLanguage,
    );
    highlighterCache.set(language, hl);

    return hl;
  } catch (error) {
    console.error("Error loading highlighter:", error);
    throw error;
  }
};

export const highlightCode = (
  code: string,
  hl: Highlighter,
  language: string,
  themes: { [key: string]: string },
  id?: string,
): string => {
  return hl.codeToHtml(code, {
    lang: language.toString(),
    themes,
    transformers: [
      {
        pre(node) {
          node.properties.class = Array.isArray(node.properties.class)
            ? node.properties.class.concat("code").concat("shiki")
            : ["code" as string, "shiki" as string];
          node.properties.id = id ? id : "";
        },
      },
    ],
  });
};

export async function initializeHighlighter(
  language: string,
  themes: { [key: string]: string },
): Promise<Highlighter> {
  return loadHighlighter(language, themes);
}
