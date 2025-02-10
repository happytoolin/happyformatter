import { shikiThemes } from "@/components/layout/themes";
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

// Create a single shared highlighter instance for all languages
let sharedHighlighter: Highlighter | null = null;

export const loadHighlighter = async (
  language: string,
): Promise<Highlighter> => {
  if (highlighterCache.has(language)) {
    return highlighterCache.get(language)!;
  }

  try {
    // Initialize shared highlighter if not exists
    if (!sharedHighlighter) {
      sharedHighlighter = await createHighlighter({
        langs: [],
        themes: Object.values(shikiThemes),
        engine: jsEngine,
      });
    }

    // Load the language into shared highlighter if not already loaded
    if (!sharedHighlighter.getLoadedLanguages().includes(language as any)) {
      await sharedHighlighter.loadLanguage(language as BundledLanguage | LanguageInput | SpecialLanguage);
    }

    // Store the shared highlighter in the cache
    highlighterCache.set(language, sharedHighlighter);

    return sharedHighlighter;
  } catch (error) {
    console.error("Error loading highlighter:", error);
    throw error;
  }
};

export const highlightCode = (
  code: string,
  hl: Highlighter,
  language: string,
  id?: string,
): string => {
  return hl.codeToHtml(code, {
    lang: language.toString(),
    themes: shikiThemes,
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
): Promise<Highlighter> {
  return loadHighlighter(language);
}
