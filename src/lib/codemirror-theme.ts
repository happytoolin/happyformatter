import type { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { getShikiHighlighter, getThemeForSystem } from "./shiki-config";

// Base theme configuration for CodeMirror (editor appearance, not syntax highlighting)
export const baseTheme = EditorView.theme({
  "&": {
    height: "100%",
    fontSize: "14px",
    fontFamily: "'Space Mono', monospace",
  },
  ".cm-content": {
    fontFamily: "'Space Mono', monospace",
    padding: "16px",
  },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftWidth: "2px",
  },
  ".cm-gutters": {
    backgroundColor: "transparent",
    borderRight: "none",
    paddingRight: "10px",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "transparent",
    fontWeight: "bold",
  },
  ".cm-activeLine": {
    backgroundColor: "rgba(0,0,0,0.03)",
  },
}, { dark: false });

// Function to create theme extension with shiki syntax highlighting
export async function createShikiThemeExtension(
  language: string,
  theme?: string,
  isDark: boolean = false,
): Promise<Extension[]> {
  try {
    // Dynamically import codemirror-shiki
    const { default: shikiExtension } = await import("codemirror-shiki");

    // Get the shiki highlighter
    const highlighter = await getShikiHighlighter();

    // Determine which theme to use
    const selectedTheme = theme || getThemeForSystem(isDark);

    // Map language names to shiki language identifiers
    const languageMap: Record<string, string> = {
      javascript: "javascript",
      typescript: "typescript",
      json: "json",
      python: "python",
      html: "html",
      css: "css",
      markdown: "markdown",
      sql: "sql",
      xml: "xml",
      yaml: "yaml",
      php: "php",
      rust: "rust",
      cpp: "cpp",
      java: "java",
    };

    const shikiLang = languageMap[language] || language;

    return [
      baseTheme,
      shikiExtension({
        highlighter,
        language: shikiLang,
        theme: selectedTheme,
      }),
    ];
  } catch (error) {
    console.error("Failed to load shiki theme:", error);
    // Fallback to base theme only
    return [baseTheme];
  }
}

// Legacy export for backward compatibility
export const industrialThemeExtension = [baseTheme];
