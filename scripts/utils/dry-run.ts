/**
 * Dry run utilities for SEO content generation
 * Useful for testing without making API calls
 */

import { LANGUAGES } from "../../src/lib/languages.js";
import type { FAQItem, PageSEOData, SEOContent } from "../generate-seo-content.js";

/**
 * Generate mock SEO content for testing
 */
export function generateMockSEOContent(languageId: string, variant?: string | null): SEOContent {
  const language = LANGUAGES[languageId];
  if (!language) {
    throw new Error(`Language ${languageId} not found`);
  }

  const variantSuffix = variant ? ` with ${variant}` : "";
  const toolType = language.minify ? "Minifier" : "Formatter";

  return {
    title: `${language.name} ${toolType}${variantSuffix} - Format ${language.name} Code Online`,
    description:
      `Free online ${language.name.toLowerCase()} ${toolType.toLowerCase()}${variantSuffix}. Format, validate, and beautify your ${language.name.toLowerCase()} code with syntax highlighting. Privacy-focused, client-side processing.`,
    keywords: [
      `${language.name.toLowerCase()} formatter`,
      `${language.name.toLowerCase()} beautifier`,
      `${language.name.toLowerCase()} prettifier`,
      `${language.name.toLowerCase()} validator`,
      `${language.name.toLowerCase()} code formatter`,
      `${language.name.toLowerCase()} syntax checker`,
      `${language.name.toLowerCase()} formatter online`,
      `free ${language.name.toLowerCase()} formatter`,
      `${language.name.toLowerCase()} code formatter online`,
      `${language.name.toLowerCase()} code beautifier`,
    ],
    category: `${toolType}, ${language.name}, Development Tools`,
    h1: `${language.name} ${toolType}${variantSuffix}`,
    introduction:
      `Format your ${language.name.toLowerCase()} code with our free online ${toolType.toLowerCase()}${variantSuffix}. Process your code securely in the browser with no server-side processing.`,
    features: [
      `Client-side ${toolType.toLowerCase()}`,
      `Privacy-focused processing`,
      `Syntax highlighting`,
      `Error detection`,
      `Multiple ${language.name} versions supported`,
      `No registration required`,
    ],
    benefits: [
      `Improved code readability`,
      `Consistent formatting`,
      `Better maintainability`,
      `Enhanced developer experience`,
      `No data sent to servers`,
      `Instant formatting`,
    ],
    useCases: [
      `Code reviews`,
      `Preparing code for commits`,
      `Debugging formatting issues`,
      `Educational purposes`,
      `Code sharing`,
      `Documentation preparation`,
    ],
  };
}

/**
 * Generate mock FAQ content for testing
 */
export function generateMockFAQContent(languageId: string, variant?: string | null): FAQItem[] {
  const language = LANGUAGES[languageId];
  if (!language) {
    throw new Error(`Language ${languageId} not found`);
  }

  const variantText = variant ? ` using ${variant}` : "";
  const toolType = language.minify ? "minifier" : "formatter";

  return [
    {
      question: `How does the ${language.name} ${toolType}${variantText} work?`,
      answer:
        `Our ${language.name.toLowerCase()} ${toolType} processes your code entirely in the browser using WebAssembly technology. This means your code never leaves your device, ensuring complete privacy and security. The ${toolType} applies industry-standard formatting rules${variantText} to make your code more readable and consistent.`,
    },
    {
      question: `Is my ${language.name} code secure when using this ${toolType}?`,
      answer:
        `Yes, absolutely! Your ${language.name} code is processed entirely within your browser using WebAssembly. No code is ever sent to our servers, ensuring your intellectual property and sensitive data remain completely private. We cannot see, store, or access your code in any way.`,
    },
    {
      question: `What ${language.name} file formats are supported?`,
      answer: `Our ${toolType} supports the following ${language.name} file extensions: ${
        language.extensions.join(", ")
      }. You can either paste your code directly into the editor or upload files with these extensions for formatting.`,
    },
    {
      question: `Can I use this ${language.name} ${toolType} for large projects?`,
      answer:
        `While our ${toolType} is optimized for performance, it's best suited for individual files or moderate-sized code snippets. For very large projects, we recommend processing files individually or integrating a ${toolType} into your development workflow through IDE extensions or build tools.`,
    },
    {
      question: `Is this ${language.name} ${toolType} free to use?`,
      answer:
        `Yes! Our ${language.name} ${toolType} is completely free to use with no limitations. There's no registration required, no premium tiers, and no hidden costs. You can format as much code as you need, whenever you need it.`,
    },
    {
      question: `Can I customize the ${language.name} formatting rules?`,
      answer:
        `Currently, our ${toolType} uses standard formatting rules${variantText}. However, we're working on adding customizable formatting options in future updates. If you have specific formatting requirements, please let us know through our feedback system.`,
    },
    {
      question: `Does this work offline?`,
      answer:
        `Yes! Once the page is loaded, the ${toolType} can work completely offline. The WebAssembly module is cached in your browser, so you can continue formatting ${language.name} code even without an internet connection.`,
    },
  ];
}

/**
 * Generate mock page data for all languages
 */
export function generateMockPageData(): PageSEOData[] {
  const pages: PageSEOData[] = [];
  const knownVariants = {
    "python": ["ruff"],
    "javascript": ["biome"],
    "typescript": ["biome"],
    "php": ["mago"],
  };

  // Generate main language pages
  for (const [languageId, languageConfig] of Object.entries(LANGUAGES)) {
    const content = generateMockSEOContent(languageId);
    const faqs = generateMockFAQContent(languageId);

    pages.push({
      pageId: languageId,
      language: languageId,
      minify: languageConfig.minify,
      content,
      faqs,
    });

    // Generate variant pages
    if (knownVariants[languageId as keyof typeof knownVariants]) {
      const variants = knownVariants[languageId as keyof typeof knownVariants];
      for (const variant of variants) {
        const variantContent = generateMockSEOContent(languageId, variant);
        const variantFAQs = generateMockFAQContent(languageId, variant);

        pages.push({
          pageId: `${languageId}/${variant}`,
          language: languageId,
          variant: variant,
          minify: languageConfig.minify,
          content: variantContent,
          faqs: variantFAQs,
        });
      }
    }
  }

  return pages;
}

/**
 * Save mock data for testing
 */
export function saveMockData(outputPath: string = "src/lib/mock-seo-data.json"): void {
  const { Bun } = globalThis as any;

  const mockData = {
    generatedAt: new Date().toISOString(),
    version: "1.0.0-mock",
    pages: generateMockPageData(),
  };

  try {
    if (typeof Bun !== "undefined" && Bun.write) {
      Bun.write(outputPath, JSON.stringify(mockData, null, 2));
    } else {
      // Fallback for environments without Bun
      console.log("Mock data preview (first 2 pages):");
      console.log(JSON.stringify(mockData.pages.slice(0, 2), null, 2));
    }
    console.log(`✅ Mock data saved to: ${outputPath}`);
  } catch (error) {
    console.error("❌ Failed to save mock data:", error);
    throw error;
  }
}
