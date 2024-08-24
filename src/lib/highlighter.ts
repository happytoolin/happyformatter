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
  themes: { [key: string]: string },
): Promise<Highlighter | null> => {
  const defaultTheme = "everforest-light";
  if (currentLanguage === language && currentTheme === defaultTheme) {
    return highlighterCache.get(language) || null;
  }

  disposeHighlighter();

  try {
    const hl = await createHighlighter({
      langs: [language],
      themes: Object.values(themes),
    });
    await hl.loadLanguage(
      language as BundledLanguage | LanguageInput | SpecialLanguage,
    );
    highlighterCache.set(language, hl);
    currentLanguage = language;
    currentTheme = defaultTheme;
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
  themes: { [key: string]: string },
  id?: string,
): string => {
  if (hl) {
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
  }
  return code;
};

export async function initializeHighlighter(
  language: string,
  themes: { [key: string]: string },
): Promise<Highlighter> {
  try {
    const highlighter = await loadHighlighter(language, themes);

    if (!highlighter) {
      throw new Error("Failed to load highlighter");
    }

    return highlighter;
  } catch (error) {
    console.error("Failed to load highlighter:", error);
    throw error;
  }
}
