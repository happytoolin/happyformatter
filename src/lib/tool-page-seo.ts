import type { LanguageConfig } from "./languages";
import { LANGUAGES } from "./languages";
import { languageSEOData } from "./seo-utils";
import type { SEOVariant } from "./seo-variants";

export interface ToolFAQItem {
  tag?: string;
  title: string;
  content: string;
}

export interface ToolPageSEO {
  breadcrumbs: Array<{ name: string; url: string }>;
  canonicalPath: string;
  category: string;
  description: string;
  faqItems: ToolFAQItem[];
  h1: string;
  keywords: string;
  schemaDescription: string;
  schemaName: string;
  title: string;
}

interface BuildToolPageSEOInput {
  language: string;
  languageConfig: LanguageConfig;
  minify?: boolean;
  variant?: string | null;
  variantData?: SEOVariant | null;
}

const brandName = "HappyFormatter";

const unsupportedKeywordPattern =
  /\b(validator|validation|syntax checker|code checker|type checker|linter|lint tool|obfuscator)\b/i;

const minifierLanguageIds = new Set([
  "css",
  "graphql",
  "html",
  "scss",
  "javascript",
  "json",
  "shell",
  "typescript",
  "xml",
]);

const privateVariantIds = new Set(["private", "secure"]);
const prettyVariantIds = new Set(["beautifier", "pretty", "prettify"]);

const variantLabels: Record<string, string> = {
  beautifier: "Beautifier",
  biome: "Biome Formatter",
  clang: "Clang Formatter",
  compiler: "SCSS Formatter",
  dotnet: ".NET Formatter",
  flutter: "Flutter Formatter",
  formatter: "Query Formatter",
  free: "Free Formatter",
  gofmt: "Gofmt Formatter",
  google: "Google Style Formatter",
  mago: "Mago Formatter",
  minify: "Minifier",
  online: "Online Formatter",
  oxc: "OXC Formatter",
  pep8: "PEP 8 Formatter",
  pretty: "Pretty Printer",
  prettify: "Pretty Printer",
  private: "Private Formatter",
  ruff: "Ruff Formatter",
  rustfmt: "Rustfmt Formatter",
  secure: "Private Formatter",
  "zig-fmt": "Zig fmt Formatter",
};

const formatterEngines: Record<string, string> = {
  c: "clang-format",
  cpp: "clang-format",
  csharp: "clang-format",
  css: "Lightning CSS",
  dart: "dart format",
  angular: "Prettier",
  astro: "markup_fmt",
  go: "gofmt",
  graphql: "pretty_graphql",
  handlebars: "Prettier",
  html: "web_fmt",
  java: "clang-format",
  javascript: "web_fmt",
  jinja: "markup_fmt",
  json: "JSON parser",
  json5: "Prettier",
  jsonc: "Prettier",
  less: "Malva",
  lua: "lua-fmt",
  markdown: "Prettier",
  mdx: "Prettier",
  objectivec: "clang-format",
  objectivecpp: "clang-format",
  php: "Mago",
  proto: "clang-format",
  python: "Ruff formatter",
  rust: "rustfmt",
  sass: "Malva",
  scss: "Malva",
  shell: "shfmt",
  sql: "sql_fmt",
  svelte: "markup_fmt",
  toml: "Taplo",
  twig: "markup_fmt",
  typescript: "web_fmt",
  vue: "markup_fmt",
  xml: "xml-formatter",
  yaml: "yamlfmt",
  zig: "zig fmt",
};

const minifierEngines: Record<string, string> = {
  css: "Lightning CSS",
  graphql: "graphql-js",
  html: "html-minifier-terser",
  javascript: "SWC",
  json: "JSON.stringify",
  scss: "Lightning CSS",
  shell: "shfmt",
  typescript: "SWC",
  xml: "xml-formatter",
};

function toCanonicalPath(path: string) {
  if (path === "/") {
    return path;
  }

  return path.endsWith("/") ? path : `${path}/`;
}

function titleCaseSlug(value: string) {
  return value
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getLanguageDisplayName(
  language: string,
  languageConfig?: LanguageConfig,
) {
  const configuredName = languageConfig?.name || LANGUAGES[language]?.name;
  if (configuredName) {
    return configuredName;
  }

  return titleCaseSlug(language);
}

function getVariantLabel(variant?: string | null) {
  if (!variant) {
    return "Formatter";
  }

  return variantLabels[variant] || titleCaseSlug(variant);
}

export function getToolModeName(
  minify: boolean,
  variant?: string | null,
  variantData?: { h1?: string } | null,
) {
  if (minify || variant === "minify") {
    return "Minifier";
  }

  if (variantData?.h1) {
    return variantData.h1
      .replace(/\bonline\b/gi, "")
      .replace(/\bfree\b/gi, "")
      .trim() || getVariantLabel(variant);
  }

  return getVariantLabel(variant);
}

export function getFormatterEngineName(
  language: string,
  minify = false,
  variant?: string | null,
) {
  if (minify || variant === "minify") {
    return minifierEngines[language] || "browser-side minifier";
  }

  switch (variant) {
    case "biome":
      return "Biome";
    case "clang":
      return "clang-format";
    case "gofmt":
      return "gofmt";
    case "mago":
      return "Mago";
    case "oxc":
      return "OXC";
    case "pep8":
    case "ruff":
      return "Ruff formatter";
    case "rustfmt":
      return "rustfmt";
    case "zig-fmt":
      return "zig fmt";
    default:
      return formatterEngines[language] || "browser-side formatter";
  }
}

export function formatExtensions(languageConfig: LanguageConfig) {
  return languageConfig.extensions
    .map(extension => `.${extension}`)
    .join(", ");
}

export function sanitizeSEODescription(value: string) {
  return value
    .replace(/\bFormat,\s*validate,\s*and beautify\b/gi, "Format and beautify")
    .replace(/\bformat,\s*validate,\s*and beautify\b/gi, "format and beautify")
    .replace(/\b,\s*validate\b/gi, "")
    .replace(/\bvalidation\b/gi, "formatting")
    .replace(/\bwith type checking support\b/gi, "with readable output")
    .replace(/\bwith type safety\b/gi, "with readable output")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function sanitizeTitle(value: string) {
  return sanitizeSEODescription(value)
    .replace(/\s+\|\s+HappyFormatter$/i, "")
    .trim();
}

export function sanitizeSEOKeywords(keywords: string[] | string) {
  const keywordList = Array.isArray(keywords) ? keywords : keywords.split(",");

  return keywordList
    .map(keyword => keyword.trim())
    .filter(keyword => keyword && !unsupportedKeywordPattern.test(keyword))
    .join(", ");
}

function withBrand(title: string) {
  return title.includes(brandName) ? title : `${title} | ${brandName}`;
}

function withPrivacyTitle(title: string) {
  const strippedTitle = sanitizeTitle(title);
  const privateTitle = /^private\b/i.test(strippedTitle)
    ? strippedTitle
    : `Private ${strippedTitle}`;

  return /no upload/i.test(privateTitle)
    ? privateTitle
    : `${privateTitle} - No Upload`;
}

function withPrivacyDescription(description: string) {
  const sanitizedDescription = sanitizeSEODescription(description);
  if (
    /\b(no upload|not uploaded|stays on this device|runs in your browser|local processing)\b/i.test(
      sanitizedDescription,
    )
  ) {
    return sanitizedDescription;
  }

  return `${sanitizedDescription} It runs in your browser, and your input stays on this device.`;
}

function buildBaseKeywords(
  languageName: string,
  language: string,
  minify: boolean,
  variant?: string | null,
) {
  const normalizedLanguage = languageName.toLowerCase();

  if (minify || variant === "minify") {
    return [
      `${normalizedLanguage} minifier`,
      `minify ${normalizedLanguage}`,
      `${normalizedLanguage} compressor`,
      `${normalizedLanguage} minifier online`,
      `browser ${normalizedLanguage} minifier`,
      `free ${normalizedLanguage} minifier`,
    ];
  }

  const variantLabel = getVariantLabel(variant).toLowerCase();
  const base = [
    `${normalizedLanguage} formatter`,
    `${normalizedLanguage} code formatter`,
    `${normalizedLanguage} formatter online`,
    `browser ${normalizedLanguage} formatter`,
    `free ${normalizedLanguage} formatter`,
  ];

  if (variant && variantLabel !== "formatter") {
    base.unshift(`${normalizedLanguage} ${variantLabel.toLowerCase()}`);
  }

  const configuredKeywords = languageSEOData[language]?.keywords || [];
  return [...base, ...configuredKeywords];
}

function buildCanonicalPath(
  language: string,
  languageConfig: LanguageConfig,
  minify: boolean,
  variant?: string | null,
) {
  if (minify) {
    return toCanonicalPath(
      variant && variant !== "minify"
        ? `/minify/${language}-${variant}`
        : `/minify/${language}`,
    );
  }

  if (variant === "minify" && languageConfig.minify) {
    return toCanonicalPath(`/minify/${language}`);
  }

  return toCanonicalPath(variant ? `/${language}-${variant}` : `/${language}`);
}

function buildH1(
  languageName: string,
  minify: boolean,
  variant?: string | null,
  variantData?: SEOVariant | null,
) {
  if (minify || variant === "minify") {
    if (variant && variant !== "minify") {
      if (variant === "free") {
        return `Free ${languageName} Minifier`;
      }
      if (variant === "online") {
        return `Online ${languageName} Minifier`;
      }
      if (privateVariantIds.has(variant)) {
        return `Private ${languageName} Minifier`;
      }
    }

    return `${languageName} Minifier`;
  }

  if (variantData?.h1) {
    return sanitizeTitle(variantData.h1);
  }

  if (!variant) {
    return `${languageName} Formatter`;
  }

  if (prettyVariantIds.has(variant)) {
    return `${languageName} Beautifier`;
  }

  return `${languageName} ${getVariantLabel(variant)}`;
}

function buildDescription(
  languageName: string,
  minify: boolean,
  variant?: string | null,
  variantData?: SEOVariant | null,
) {
  if (minify || variant === "minify") {
    return withPrivacyDescription(
      `Minify ${languageName} code in your browser. Paste code, run the minifier, and copy the compact result. Your input stays on this device.`,
    );
  }

  if (variantData?.description) {
    return withPrivacyDescription(variantData.description);
  }

  if (privateVariantIds.has(variant || "")) {
    return withPrivacyDescription(
      `Format ${languageName} code in your browser with local processing. Your input stays on this device while you work.`,
    );
  }

  if (prettyVariantIds.has(variant || "")) {
    return withPrivacyDescription(
      `Make ${languageName} code easier to read with browser-side formatting, indentation, spacing, and line breaks.`,
    );
  }

  return withPrivacyDescription(
    `Format ${languageName} code in your browser. Paste code, run the formatter, and copy the result. Your input stays on this device.`,
  );
}

function buildTitle(
  h1: string,
  description: string,
  minify: boolean,
  variant?: string | null,
) {
  const browserTitle = h1.includes("Browser") ? h1 : `${h1} in Browser`;
  const title = minify || variant === "minify"
    ? browserTitle
    : description.includes("browser")
    ? browserTitle
    : h1;

  return withBrand(withPrivacyTitle(title));
}

export function buildToolFAQItems({
  languageName,
  minify,
  modeName,
}: {
  languageName: string;
  minify: boolean;
  modeName: string;
}): ToolFAQItem[] {
  const actionVerb = minify ? "minify" : "format";
  const actionNoun = minify ? "minifier" : "formatter";
  const outputDescription = minify
    ? "It removes supported whitespace and comments where the minifier can do so without changing the parsed result."
    : "It cleans indentation, spacing, and line breaks. It does not rewrite program logic.";

  return [
    {
      tag: "Privacy",
      title: `Is my ${languageName} code uploaded?`,
      content:
        `No. The ${languageName} ${actionNoun} runs in your browser. Still, do not paste secrets into any online tool.`,
    },
    {
      tag: "Output",
      title: `What does the ${modeName.toLowerCase()} change?`,
      content: outputDescription,
    },
    {
      tag: "Errors",
      title: `What if ${actionVerb} fails?`,
      content: `Fix the highlighted syntax or parsing issue, then run ${actionVerb} again.`,
    },
    {
      tag: "Access",
      title: "Do I need to sign in?",
      content: `No. Open the page, paste ${languageName} code, ${actionVerb}, and copy the result.`,
    },
  ];
}

export function buildToolPageSEO({
  language,
  languageConfig,
  minify = false,
  variant = null,
  variantData = null,
}: BuildToolPageSEOInput): ToolPageSEO {
  const languageName = getLanguageDisplayName(language, languageConfig);
  const routeIsMinifier = minify || variant === "minify";
  const h1 = buildH1(languageName, minify, variant, variantData);
  const description = buildDescription(languageName, minify, variant, variantData);
  const title = buildTitle(h1, description, minify, variant);
  const canonicalPath = buildCanonicalPath(
    language,
    languageConfig,
    minify,
    variant,
  );
  const modeName = getToolModeName(minify, variant, variantData);
  const category = languageSEOData[language]?.category
    || "Developer Tool, Technology, Development Tools, Programming";
  const keywords = sanitizeSEOKeywords(
    variantData?.keywords?.length
      ? variantData.keywords
      : buildBaseKeywords(languageName, language, minify, variant),
  );
  const basePath = toCanonicalPath(`/${language}`);
  const breadcrumbs = routeIsMinifier
    ? [
      { name: "Home", url: "/" },
      { name: `${languageName} Formatter`, url: basePath },
      { name: h1, url: canonicalPath },
    ]
    : variant
    ? [
      { name: "Home", url: "/" },
      { name: `${languageName} Formatter`, url: basePath },
      { name: h1, url: canonicalPath },
    ]
    : [
      { name: "Home", url: "/" },
      { name: h1, url: canonicalPath },
    ];

  return {
    breadcrumbs,
    canonicalPath,
    category,
    description,
    faqItems: buildToolFAQItems({
      languageName,
      minify: routeIsMinifier,
      modeName,
    }),
    h1,
    keywords,
    schemaDescription: description,
    schemaName: h1,
    title,
  };
}

export function hasDedicatedMinifierRoute(language: string) {
  return minifierLanguageIds.has(language);
}
