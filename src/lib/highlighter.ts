import {
  type BundledLanguage,
  createHighlighter,
  type Highlighter,
  type LanguageInput,
  type SpecialLanguage,
} from "shiki";

// Check if window is available and attach highlighterCache to it
const highlighterCache: Map<string, Highlighter> = typeof window !== "undefined"
  ? (window.highlighterCache = window.highlighterCache || new Map())
  : new Map();

// const jsEngine = createJavaScriptRegexEngine();

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

const themes = {
  light: "rose-pine-dawn",
  dark: "rose-pine-moon",
  everforest_light: "everforest-light",
  everforest_dark: "everforest-dark",
  nord_light: "nord",
  nord_dark: "nord",
  github_light: "github-light",
  github_dark: "github-dark",
  material_light: "material-theme-lighter",
  material_dark: "material-theme",
  rose_pine_light: "rose-pine-dawn",
  rose_pine_dark: "rose-pine-moon",
  night_owl_light: "night-owl",
  night_owl_dark: "night-owl",
  catppuccin_light: "catppuccin-latte",
  catppuccin_dark: "catppuccin-mocha",
  solarized_light: "solarized-light",
  solarized_dark: "solarized-dark",
};

export const highlightCode = (
  code: string,
  hl: Highlighter,
  language: string,
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
): Promise<Highlighter> {
  return loadHighlighter(language, themes);
}
