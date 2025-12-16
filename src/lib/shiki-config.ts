import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

// Import common languages that your formatter supports
const languageImports = [
  import("@shikijs/langs/javascript"),
  import("@shikijs/langs/typescript"),
  import("@shikijs/langs/json"),
  import("@shikijs/langs/python"),
  import("@shikijs/langs/html"),
  import("@shikijs/langs/css"),
  import("@shikijs/langs/markdown"),
  import("@shikijs/langs/sql"),
  import("@shikijs/langs/xml"),
  import("@shikijs/langs/yaml"),
  import("@shikijs/langs/php"),
  import("@shikijs/langs/rust"),
  import("@shikijs/langs/cpp"),
  import("@shikijs/langs/java"),
  import("@shikijs/langs/dart"),
];

// Import themes - using a mix of popular themes
const themeImports = [
  import("@shikijs/themes/github-dark"),
  import("@shikijs/themes/github-light"),
  import("@shikijs/themes/one-dark-pro"),
  import("@shikijs/themes/nord"),
  import("@shikijs/themes/material-theme-palenight"),
  import("@shikijs/themes/dracula"),
  import("@shikijs/themes/solarized-dark"),
  import("@shikijs/themes/solarized-light"),
  import("@shikijs/themes/monokai"),
  import("@shikijs/themes/vitesse-dark"),
  import("@shikijs/themes/vitesse-light"),
  import("@shikijs/themes/catppuccin-latte"),
];

let highlighter: any = null;
let highlighterPromise: Promise<any> | null = null;

export async function getShikiHighlighter(): Promise<any> {
  if (highlighter) return highlighter;
  if (highlighterPromise) return highlighterPromise;

  highlighterPromise = createHighlighterCore({
    langs: languageImports,
    themes: themeImports,
    engine: createOnigurumaEngine(import("shiki/wasm")),
  });

  highlighter = await highlighterPromise;
  return highlighter;
}

// Helper function to get appropriate theme based on system preference
export function getThemeForSystem(isDark: boolean = false): string {
  const themes = {
    dark: [
      "one-dark-pro",
      "github-dark",
      "material-theme-palenight",
      "dracula",
      "nord",
    ],
    light: ["github-light", "nord"],
  };

  return isDark ? themes.dark[0] : themes.light[0];
}

// Export available themes for UI selection
export const availableThemes = [
  { name: "GitHub Light", id: "github-light", type: "light" },
  { name: "GitHub Dark", id: "github-dark", type: "dark" },
  { name: "One Dark Pro", id: "one-dark-pro", type: "dark" },
  { name: "Nord", id: "nord", type: "both" },
  {
    name: "Material Theme Palenight",
    id: "material-theme-palenight",
    type: "dark",
  },
  { name: "Dracula", id: "dracula", type: "dark" },
  { name: "Solarized Dark", id: "solarized-dark", type: "dark" },
  { name: "Solarized Light", id: "solarized-light", type: "light" },
  { name: "Monokai", id: "monokai", type: "dark" },
  { name: "Atom One Dark", id: "atom-one-dark", type: "dark" },
  { name: "Atom One Light", id: "atom-one-light", type: "light" },
  { name: "VS Code Dark", id: "vscode-dark", type: "dark" },
  { name: "Vitesse Dark", id: "vitesse-dark", type: "dark" },
  { name: "Vitesse Light", id: "vitesse-light", type: "light" },
  { name: "Catppuccin Latte", id: "catppuccin-latte", type: "light" },
  { name: "Catppuccin Mocha", id: "catppuccin-mocha", type: "dark" },
] as const;
