import {
  type BundledLanguage,
  createHighlighter,
  createJavaScriptRegexEngine,
  type Highlighter,
  type LanguageInput,
  type SpecialLanguage,
} from "shiki";

const jsEngine = createJavaScriptRegexEngine();

export const loadHighlighter = async (
  language: string,
): Promise<Highlighter> => {
  try {
    const hl = await createHighlighter({
      langs: [language],
      themes: Object.values(themes),
      engine: jsEngine,
    });

    await hl.loadLanguage(language as BundledLanguage | LanguageInput | SpecialLanguage);

    await hl.loadLanguage(
      language as BundledLanguage | LanguageInput | SpecialLanguage,
    );

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
  return loadHighlighter(language);
}
