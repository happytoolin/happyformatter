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
  markdown: "dprint",
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

/** Google truncates titles near 60 characters and descriptions near 160.
 * Only decorate when the result stays inside the limit. */
const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 160;
const DESCRIPTION_MIN = 70;

function fitsWithin(length: number, addition: number) {
  return length + addition <= TITLE_LIMIT;
}

function withBrand(title: string) {
  if (title.includes(brandName)) {
    return title;
  }

  return fitsWithin(title.length, brandName.length + 3)
    ? `${title} | ${brandName}`
    : title;
}

function withPrivacyTitle(title: string) {
  const strippedTitle = sanitizeTitle(title);
  let privateTitle = strippedTitle;

  if (!/^private\b/i.test(strippedTitle) && fitsWithin(strippedTitle.length, 8)) {
    privateTitle = `Private ${strippedTitle}`;
  }

  if (!/no upload/i.test(privateTitle) && fitsWithin(privateTitle.length, 12)) {
    privateTitle = `${privateTitle} - No Upload`;
  }

  return privateTitle;
}

function clampDescription(description: string) {
  const trimmed = description.replace(/\s+/g, " ").trim();

  if (trimmed.length > DESCRIPTION_LIMIT) {
    const clipped = trimmed.slice(0, DESCRIPTION_LIMIT + 1);
    const sentenceEnd = clipped.lastIndexOf(".");
    if (sentenceEnd >= DESCRIPTION_MIN) {
      return clipped.slice(0, sentenceEnd + 1).trim();
    }
    const wordEnd = clipped.lastIndexOf(" ");
    return `${clipped.slice(0, wordEnd > 0 ? wordEnd : DESCRIPTION_LIMIT).trim()}.`;
  }

  if (trimmed.length < DESCRIPTION_MIN) {
    return clampDescription(
      `${trimmed} Free, private, and instant — no sign-up and no upload.`,
    );
  }

  return trimmed;
}

/** Final safety clamp used by <Head> so every page stays inside the SERP
 * display limits, regardless of where its title or description came from. */
export function clampSEOTitle(title: string) {
  const trimmed = title.replace(/\s+/g, " ").trim();
  if (trimmed.length <= TITLE_LIMIT) {
    return trimmed;
  }

  // Prefer dropping a trailing "| Brand" segment when it alone frees space.
  const brandSplit = trimmed.split(/\s+\|\s+/);
  if (brandSplit.length > 1 && brandSplit[0].trim().length <= TITLE_LIMIT) {
    return brandSplit[0].trim();
  }

  const clipped = trimmed.slice(0, TITLE_LIMIT + 1);
  const wordEnd = clipped.lastIndexOf(" ");
  return clipped.slice(0, wordEnd > 0 ? wordEnd : TITLE_LIMIT).trim();
}

export function clampSEODescription(description: string) {
  const trimmed = description.replace(/\s+/g, " ").trim();
  if (trimmed.length <= DESCRIPTION_LIMIT) {
    return trimmed;
  }

  return clampDescription(trimmed);
}

function withPrivacyDescription(description: string) {
  const sanitizedDescription = sanitizeSEODescription(description);
  if (
    /\b(no upload|not uploaded|stays on this device|runs in your browser|local processing)\b/i.test(
      sanitizedDescription,
    )
  ) {
    return clampDescription(sanitizedDescription);
  }

  return clampDescription(
    `${sanitizedDescription} It runs in your browser, and your input stays on this device.`,
  );
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

// Query-targeted copy for the pages that earn real impressions. Applied to
// main language pages only (variants keep their generated copy).
const languageDescriptionOverrides: Record<string, string> = {
  lua: "Format and beautify Lua and Luau in your browser for Roblox, Love2D, and Neovim.",
  dart: "Format Dart in your browser with dart-style rules: 2-space indent, trailing commas, 80 columns.",
};

function buildDescription(
  language: string,
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

  const override = languageDescriptionOverrides[language];
  if (override && !variant) {
    return withPrivacyDescription(override);
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
  const browserSuffix = " in Browser";
  const wantsBrowser = minify
    || variant === "minify"
    || (description.includes("browser") && !h1.includes("Browser"));
  const browserTitle = wantsBrowser && fitsWithin(h1.length, browserSuffix.length)
    ? `${h1}${browserSuffix}`
    : h1;

  return withBrand(withPrivacyTitle(browserTitle));
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
  const description = buildDescription(
    language,
    languageName,
    minify,
    variant,
    variantData,
  );
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
