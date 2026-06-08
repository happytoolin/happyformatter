export type ColorMode = "light" | "dark";
export type ThemePreference = ColorMode | "system";

export type EditorThemeOption = {
  id: string;
  name: string;
  type: ColorMode;
};

export const themeStorageKey = "theme";
export const themePreferenceStorageKey = "theme-preference";
export const editorThemeStorageKey = "codemirror-theme";

export const editorThemeModeStorageKey = (mode: ColorMode) => `codemirror-theme-${mode}`;

export const defaultEditorThemeByMode = {
  light: "github-light",
  dark: "github-dark",
} as const satisfies Record<ColorMode, string>;

export const editorThemes = [
  { id: "github-light", name: "GitHub Light", type: "light" },
  { id: "solarized-light", name: "Solarized Light", type: "light" },
  { id: "atom-one-light", name: "Atom One Light", type: "light" },
  { id: "vitesse-light", name: "Vitesse Light", type: "light" },
  { id: "catppuccin-latte", name: "Catppuccin Latte", type: "light" },
  { id: "github-dark", name: "GitHub Dark", type: "dark" },
  { id: "one-dark-pro", name: "One Dark Pro", type: "dark" },
  { id: "nord", name: "Nord", type: "dark" },
  { id: "material-theme-palenight", name: "Palenight", type: "dark" },
  { id: "dracula", name: "Dracula", type: "dark" },
  { id: "solarized-dark", name: "Solarized Dark", type: "dark" },
  { id: "monokai", name: "Monokai", type: "dark" },
  { id: "atom-one-dark", name: "Atom One Dark", type: "dark" },
  { id: "vscode-dark", name: "VS Code Dark", type: "dark" },
  { id: "vitesse-dark", name: "Vitesse Dark", type: "dark" },
  { id: "catppuccin-mocha", name: "Catppuccin Mocha", type: "dark" },
] as const satisfies readonly EditorThemeOption[];

export function isColorMode(value: unknown): value is ColorMode {
  return value === "light" || value === "dark";
}

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "system" || isColorMode(value);
}

export function getEditorThemesForMode(mode: ColorMode) {
  return editorThemes.filter((theme) => theme.type === mode);
}

export function getEditorThemeType(themeId: string) {
  return editorThemes.find((theme) => theme.id === themeId)?.type ?? null;
}

export function isEditorThemeForMode(
  themeId: string | null | undefined,
  mode: ColorMode,
): themeId is string {
  return Boolean(themeId && getEditorThemeType(themeId) === mode);
}

export function getDefaultEditorTheme(mode: ColorMode) {
  return defaultEditorThemeByMode[mode];
}

export function getSafeEditorTheme(
  themeId: string | null | undefined,
  mode: ColorMode,
) {
  return isEditorThemeForMode(themeId, mode)
    ? themeId
    : getDefaultEditorTheme(mode);
}
