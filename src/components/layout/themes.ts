import { availableThemes } from "@/lib/shiki-config";

// CodeMirror editor themes
export const codeMirrorThemes = availableThemes.map((theme) => ({
  name: theme.name,
  value: theme.id,
  type: theme.type,
}));
