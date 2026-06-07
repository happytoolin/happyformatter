import { LANGUAGES } from "./languages";

export function generatePageTitle(
  language: string,
  variant?: string | null,
  minify = false,
): string {
  if (!language) {
    return "Browser Code Formatter & Minifier - 22+ Languages | HappyFormatter";
  }

  // Get proper language name from configuration
  const languageConfig = LANGUAGES[language];
  const languageName = languageConfig
    ? languageConfig.name
    : language.charAt(0).toUpperCase() + language.slice(1).replace("/", " ");

  if (minify) {
    return `${languageName} Code Minifier in Browser | HappyFormatter`;
  }

  if (variant) {
    return `${languageName} ${variant} Formatter in Browser | HappyFormatter`;
  }

  return `${languageName} Code Formatter in Browser | HappyFormatter`;
}
