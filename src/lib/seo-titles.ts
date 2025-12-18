import { LANGUAGES } from "./languages";

export function generatePageTitle(
  language: string,
  variant?: string | null,
  minify = false,
): string {
  if (!language) {
    return "Online Code Formatter & Minifier - 22+ Languages | Free HAPPYFMT";
  }

  // Get proper language name from configuration
  const languageConfig = LANGUAGES[language];
  const languageName = languageConfig
    ? languageConfig.name
    : language.charAt(0).toUpperCase() + language.slice(1).replace("/", " ");

  if (minify) {
    return `${languageName} Code Minifier Online | Free HAPPYFMT Tool`;
  }

  if (variant) {
    return `${languageName} ${variant} Formatter Online | Free HAPPYFMT Tool`;
  }

  return `${languageName} Code Formatter & Minifier Online | Free HAPPYFMT Tool`;
}
