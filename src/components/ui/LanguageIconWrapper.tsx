import { LanguageIcon } from "./LanguageIcon";

interface LanguageIconWrapperProps {
  language: string;
}

export function LanguageIconWrapper({ language }: LanguageIconWrapperProps) {
  // Convert URL format to icon key (e.g., "minify-html" -> "html")
  const iconName = language.replace(/\//g, "-").replace(/^minify-/, "");

  return <LanguageIcon icon={iconName} size={24} />;
}
