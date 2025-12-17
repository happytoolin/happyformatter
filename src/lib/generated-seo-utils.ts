/**
 * Utilities for consuming generated SEO data
 * This file provides helper functions to use the AI-generated SEO content with existing HappyFormatter components
 */

import { type CompleteSEOData, type PageSEOData } from "./seo-types.js";

// Cache for the loaded SEO data
let seoDataCache: CompleteSEOData | null = null;

/**
 * Load and cache the generated SEO data from JSON file
 */
export function loadGeneratedSEOData(): CompleteSEOData | null {
  if (seoDataCache !== null) {
    return seoDataCache;
  }

  try {
    // For browser environment, we'll need to use a different approach
    // For now, return null and the components will fall back to existing data
    if (typeof window !== "undefined") {
      return null;
    }

    // For Node.js environment (build time)
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(process.cwd(), "src/lib/generated-seo-data.json");

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      seoDataCache = JSON.parse(content);
      return seoDataCache;
    }

    // Fallback to mock data for testing
    const mockFilePath = path.join(process.cwd(), "src/lib/mock-seo-data.json");
    if (fs.existsSync(mockFilePath)) {
      const content = fs.readFileSync(mockFilePath, "utf-8");
      seoDataCache = JSON.parse(content);
      return seoDataCache;
    }

    return null;
  } catch (error) {
    console.warn("Failed to load generated SEO data:", error);
    return null;
  }
}

/**
 * Load generated SEO data asynchronously for build-time operations
 */
export async function loadGeneratedSEODataAsync(): Promise<CompleteSEOData | null> {
  if (seoDataCache !== null) {
    return seoDataCache;
  }

  try {
    // For browser environment, return null
    if (typeof window !== "undefined") {
      return null;
    }

    // For Node.js environment (build time)
    const fs = await import("fs/promises");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "src/lib/generated-seo-data.json");

    try {
      const content = await fs.readFile(filePath, "utf-8");
      seoDataCache = JSON.parse(content);
      return seoDataCache;
    } catch (error) {
      // Fallback to mock data for testing
      const mockFilePath = path.join(process.cwd(), "src/lib/mock-seo-data.json");
      try {
        const content = await fs.readFile(mockFilePath, "utf-8");
        seoDataCache = JSON.parse(content);
        return seoDataCache;
      } catch (mockError) {
        return null;
      }
    }
  } catch (error) {
    console.warn("Failed to load generated SEO data:", error);
    return null;
  }
}

/**
 * Get SEO content for a specific page
 */
export function getPageSEOContent(
  pageId: string,
  variant?: string | null,
  preloadedData?: CompleteSEOData,
): PageSEOData | null {
  const seoData = preloadedData || loadGeneratedSEOData();

  if (!seoData) {
    return null;
  }

  // Try to find exact match first (for variant pages)
  if (variant) {
    const variantPageId = `${pageId}/${variant}`;
    const variantPage = seoData.pages.find((page: PageSEOData) => page.pageId === variantPageId);
    if (variantPage) {
      return variantPage;
    }
  }

  // Find the main language page
  const mainPage = seoData.pages.find((page: PageSEOData) => page.pageId === pageId);
  return mainPage || null;
}

/**
 * Get all FAQ items for a page in the format expected by FAQ component
 */
export function getPageFAQs(
  pageId: string,
  variant?: string | null,
  preloadedData?: CompleteSEOData,
): Array<{ title: string; content: string }> {
  const pageData = getPageSEOContent(pageId, variant, preloadedData);

  if (!pageData || !pageData.faqs) {
    return [];
  }

  // Convert generated FAQ format to component format
  return pageData.faqs.map((faq: any) => ({
    title: faq.question,
    content: faq.answer,
  }));
}

/**
 * Get language info data in the format expected by Info component
 */
export function getLanguageInfoData(language: string, variant?: string | null, preloadedData?: CompleteSEOData) {
  const pageData = getPageSEOContent(language, variant, preloadedData);

  if (!pageData) {
    return null;
  }

  const languageName = language.charAt(0).toUpperCase() + language.slice(1);
  const variantSuffix = variant ? ` ${variant.charAt(0).toUpperCase() + variant.slice(1)}` : "";

  return {
    title: pageData.content.h1 || `${languageName} Formatter${variantSuffix}`,
    description: pageData.content.introduction || pageData.content.description,
    features: [
      ...pageData.content.features.slice(0, 3).map((feature: string) => `${feature}.`),
      ...pageData.content.benefits.slice(0, 2).map((benefit: string) => `Benefit: ${benefit}.`),
    ],
    validator: {
      title: `${languageName} Integrity Checker`,
      description:
        `Comprehensive validation engine for ${languageName.toLowerCase()} data structures with real-time error detection.`,
      features: [
        "Parse Error Detection: Pinpoints exact location of syntax violations.",
        "Character Encoding Analysis: Validates proper character encoding compliance.",
        "Structure Verification: Ensures proper nesting patterns and syntax compliance.",
        "Performance Analysis: Benchmarks processing speed and memory efficiency.",
      ],
    },
  };
}

/**
 * Get SEO data in the format expected by Layout component
 */
export function getLayoutSEOData(
  language: string,
  variant?: string | null,
  _minify?: boolean,
  preloadedData?: CompleteSEOData,
) {
  const pageData = getPageSEOContent(language, variant, preloadedData);

  if (!pageData) {
    return null;
  }

  return {
    title: pageData.content.title,
    description: pageData.content.description,
    keywords: pageData.content.keywords.join(", "),
    category: pageData.content.category,
  };
}

/**
 * Get breadcrumbs for a page
 */
export function generatePageBreadcrumbs(
  language: string,
  variant?: string | null,
  _minify?: boolean,
  preloadedData?: CompleteSEOData,
): Array<{ name: string; url: string }> {
  const pageData = getPageSEOContent(language, variant, preloadedData);

  if (!pageData) {
    // Fallback to simple breadcrumbs
    const basePath = `/${language}`;
    const languageName = language.charAt(0).toUpperCase() + language.slice(1);

    if (variant) {
      return [
        { name: "Home", url: "/" },
        { name: `${languageName} Formatter`, url: basePath },
        { name: variant.charAt(0).toUpperCase() + variant.slice(1), url: `${basePath}/${variant}` },
      ];
    } else {
      return [
        { name: "Home", url: "/" },
        { name: `${languageName} Formatter`, url: basePath },
      ];
    }
  }

  const basePath = `/${language}`;
  const languageName = pageData.content.h1 || pageData.language;

  if (variant && pageData.variant) {
    return [
      { name: "Home", url: "/" },
      { name: languageName, url: basePath },
      { name: variant.charAt(0).toUpperCase() + variant.slice(1), url: `${basePath}/${variant}` },
    ];
  } else {
    return [
      { name: "Home", url: "/" },
      { name: languageName, url: basePath },
    ];
  }
}

/**
 * Get related tools data for a page
 */
export function getRelatedToolsData(language: string, variant?: string | null) {
  const pageData = getPageSEOContent(language, variant);

  if (!pageData) {
    return null;
  }

  // Convert use cases to related tools suggestions
  const relatedTools = pageData.content.useCases.slice(0, 4).map((useCase: string, _index: number) => ({
    title: useCase,
    description: `Optimized for ${useCase.toLowerCase()} workflows`,
    category: "Data Processing",
  }));

  return relatedTools;
}

/**
 * Get variant links for a language
 */
export function getVariantLinks(language: string) {
  const seoData = loadGeneratedSEOData();

  if (!seoData) {
    return [];
  }

  // Find all variants for this language
  const variants = seoData.pages
    .filter((page: PageSEOData) => page.language === language && page.variant)
    .map((page: PageSEOData) => ({
      slug: page.variant!,
      title: page.content.h1
        || `${language.charAt(0).toUpperCase() + language.slice(1)} ${
          page.variant ? page.variant.charAt(0).toUpperCase() + page.variant.slice(1) : ""
        }`,
      description: page.content.description,
    }));

  return variants;
}

/**
 * Check if a page has generated content
 */
export function hasGeneratedContent(pageId: string, variant?: string | null): boolean {
  const pageData = getPageSEOContent(pageId, variant);
  return pageData !== null;
}

/**
 * Refresh the SEO data cache (useful for development)
 */
export function refreshSEODataCache(): void {
  seoDataCache = null;
}

/**
 * Get all pages that have generated content
 */
export function getAllPagesWithGeneratedContent(): string[] {
  const seoData = loadGeneratedSEOData();

  if (!seoData) {
    return [];
  }

  return seoData.pages.map((page: PageSEOData) => page.pageId);
}
