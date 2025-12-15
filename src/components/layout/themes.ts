import { availableThemes } from "@/lib/shiki-config";

export const shikiThemes = {
  light: "catppuccin-latte",
  dark: "vitesse-dark",
};

// CodeMirror editor themes
export const codeMirrorThemes = availableThemes.map(theme => ({
  name: theme.name,
  value: theme.id,
  type: theme.type,
}));
