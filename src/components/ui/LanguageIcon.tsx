import type { SimpleIcon } from "simple-icons";
import {
  siBiome,
  siC,
  siCplusplus,
  siCss,
  siDart,
  siDocker,
  siGo,
  siGraphql,
  siHtml5,
  siJavascript,
  siJson,
  siJupyter,
  siLua,
  siMarkdown,
  siOpenjdk,
  siPhp,
  siPython,
  siReact,
  siRust,
  siSass,
  siSharp,
  siSqlite,
  siTypescript,
  siXml,
  siYaml,
  siZig,
} from "simple-icons";

interface LanguageIconProps {
  icon: string;
  className?: string;
  size?: number;
  grayscale?: boolean;
  showColorOnHover?: boolean;
}

// Icon mapping with fallback
const iconMap: Record<string, SimpleIcon> = {
  c: siC,
  cpp: siCplusplus,
  csharp: siSharp,
  css: siCss,
  dart: siDart,
  dockerfile: siDocker,
  go: siGo,
  graphql: siGraphql,
  html: siHtml5,
  java: siOpenjdk,
  javascript: siJavascript,
  "javascript-biome": siBiome,
  "javascript-dprint": siJavascript, // dprint doesn't have a specific icon
  json: siJson,
  jsx: siReact,
  jupyter: siJupyter,
  lua: siLua,
  markdown: siMarkdown,
  php: siPhp,
  "php-mago": siPhp,
  proto: siJavascript, // Using JS as fallback for proto
  python: siPython,
  "python-ruff": siPython,
  rust: siRust,
  scss: siSass,
  sql: siSqlite,
  tsx: siReact,
  typescript: siTypescript,
  "typescript-biome": siBiome,
  "typescript-dprint": siTypescript,
  xml: siXml,
  yaml: siYaml,
  zig: siZig,
};

// Fallback mapping for alternative formatters to base language icons
const fallbackMap: Record<string, string> = {
  "javascript-minify": "javascript",
  "typescript-minify": "typescript",
  "css-minify": "css",
  "scss-minify": "scss",
  "json-minify": "json",
  "xml-minify": "xml",
};

export function LanguageIcon({
  icon,
  className = "",
  size = 32,
  grayscale = false,
  showColorOnHover = false,
}: LanguageIconProps) {
  // Apply fallback mapping
  const iconKey = fallbackMap[icon] || icon;

  // Get the icon from the map, fallback to JavaScript icon
  const simpleIcon = iconMap[iconKey] || iconMap.javascript;

  const baseClasses = className;

  // For grayscale mode, we'll use CSS to override the fill color
  const colorClass = grayscale ? "text-zinc-400 dark:text-zinc-500" : "";

  const combinedClasses = [baseClasses, colorClass]
    .filter(Boolean)
    .join(" ");

  // Use a unique class name for hover styling
  const iconId = `icon-${icon}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <>
      {showColorOnHover && grayscale && (
        <style>
          {`
          .group:hover .${iconId} {
            fill: #${simpleIcon.hex} !important;
          }
        `}
        </style>
      )}
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        className={`${combinedClasses} ${showColorOnHover ? iconId : ""}`}
        fill={grayscale ? "currentColor" : `#${simpleIcon.hex}`}
        aria-label={simpleIcon.title}
        style={{ transition: "fill 0.2s ease-in-out" }}
      >
        <title>{simpleIcon.title}</title>
        <path d={simpleIcon.path} />
      </svg>
    </>
  );
}
