import { defaultEditorThemeByMode, editorThemes, getEditorThemesForMode } from "@/lib/theme";

export const codeMirrorThemes = editorThemes.map((theme) => ({
  name: theme.name,
  value: theme.id,
  type: theme.type,
}));

export { defaultEditorThemeByMode, getEditorThemesForMode };
