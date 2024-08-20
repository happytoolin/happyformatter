import {
  type BundledLanguage,
  createHighlighter,
  type Highlighter,
  type LanguageInput,
  type SpecialLanguage,
} from "shiki";

const highlighterCache: Map<string, Highlighter> = new Map();
let currentLanguage: string | null = null;
let currentTheme: string | null = null;

const disposeHighlighter = () => {
  if (currentLanguage) {
    const highlighter = highlighterCache.get(currentLanguage);
    if (highlighter) {
      highlighter.dispose();
      highlighterCache.delete(currentLanguage);
    }
  }
};

export const loadHighlighter = async (
  language: string,
  theme: string,
): Promise<Highlighter | null> => {
  if (currentLanguage === language && currentTheme === theme) {
    return highlighterCache.get(language) || null;
  }

  disposeHighlighter();

  try {
    const hl = await createHighlighter({
      langs: [language],
      themes: [theme],
    });
    await hl.loadLanguage(
      language as BundledLanguage | LanguageInput | SpecialLanguage,
    );
    highlighterCache.set(language, hl);
    currentLanguage = language;
    currentTheme = theme;
    return hl;
  } catch (error) {
    console.error("Error loading highlighter:", error);
    return null;
  }
};

export const highlightCode = (
  code: string,
  hl: Highlighter | null,
  language: string,
  theme: string,
  id?: string,
): string => {
  if (hl) {
    return hl.codeToHtml(code, {
      lang: language.toString(),
      theme,
      transformers: [
        {
          pre(node) {
            node.properties.class = Array.isArray(node.properties.class)
              ? node.properties.class.concat("code")
              : ["code"];
            node.properties.id = id ? id : "";
          },
        },
      ],
    });
  }
  return code;
};

export async function initializeHighlighter(
  language: string,
  theme: string,
): Promise<Highlighter> {
  try {
    const highlighter = await loadHighlighter(language, theme);

    if (!highlighter) {
      throw new Error("Failed to load highlighter");
    }

    return highlighter;
  } catch (error) {
    console.error("Failed to load highlighter:", error);
    throw error;
  }
}
