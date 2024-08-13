import { createHighlighter, type Highlighter } from "shiki";

export const loadHighlighter = async (): Promise<Highlighter | null> => {
  try {
    const hl = await createHighlighter({
      langs: ["json"],
      themes: ["everforest-light"],
    });
    await hl.loadLanguage("json");
    return hl;
  } catch (error) {
    console.error("Error loading highlighter:", error);
    return null;
  }
};

export const highlightJson = (
  json: string,
  hl: Highlighter | null,
  id?: string,
): string => {
  if (hl) {
    return hl.codeToHtml(json, {
      lang: "json",
      theme: "everforest-light",
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
  return json;
};

export async function initializeHighlighter(): Promise<Highlighter> {
  try {
    const highliter = await loadHighlighter();

    if (!highliter) {
      throw new Error("Failed to load highlighter");
    }

    return highliter;
  } catch (error) {
    console.error("Failed to load highlighter:", error);
    throw error;
  }
}
