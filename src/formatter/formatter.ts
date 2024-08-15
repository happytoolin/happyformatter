import * as parserBabel from "prettier/parser-babel";
import pluginEstree from "prettier/plugins/estree";
import * as prettier from "prettier/standalone";

// Define a type for the supported languages
export type SupportedLanguage = "json" | "javascript";

// Mapping of languages to their respective parsers and plugins
const languageConfig: Record<
  SupportedLanguage,
  { parser: string; plugins: any[] }
> = {
  json: {
    parser: "json",
    plugins: [parserBabel, pluginEstree],
  },
  javascript: {
    parser: "babel",
    plugins: [parserBabel],
  },
  // Add more languages and their configurations as needed
};

export async function formatCode<T extends SupportedLanguage>(
  input: string,
  language: T,
): Promise<string> {
  const config = languageConfig[language];

  if (!config) {
    throw new Error(`Unsupported language: ${language}`);
  }

  try {
    return await prettier.format(input, {
      parser: config.parser,
      plugins: config.plugins,
      tabWidth: 2,
    });
  } catch (error) {
    console.error(`Invalid ${language} code:`, error);
    throw error;
  }
}
