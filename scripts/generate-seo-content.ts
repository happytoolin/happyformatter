#!/usr/bin/env bun

/**
 * SEO Content Generator Script
 *
 * This script generates SEO-optimized content for all pages in the HappyFormatter application
 * including titles, descriptions, FAQs, and metadata using Vercel AI SDK with OpenRouter.
 *
 * Usage: bun scripts/generate-seo-content.ts
 */

import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { z } from "zod";
import { type LanguageConfig, LANGUAGES } from "../src/lib/languages.js";

// Configure OpenRouter
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
});

// Schema for generated SEO content
const SEOContentSchema = z.object({
  title: z.string().describe("SEO-optimized page title (50-60 characters)"),
  description: z.string().describe("Meta description (150-160 characters)"),
  keywords: z.array(z.string()).describe("Array of SEO keywords"),
  category: z.string().describe("Content category"),
  h1: z.string().describe("Main H1 heading"),
  introduction: z.string().describe("Brief introduction paragraph"),
  features: z
    .array(z.string())
    .describe("Key features of this formatter/minifier"),
  benefits: z.array(z.string()).describe("Benefits of using this tool"),
  useCases: z.array(z.string()).describe("Common use cases"),
});

const FAQSchema = z.object({
  question: z.string().describe("FAQ question"),
  answer: z.string().describe("Detailed answer to the question"),
});

const PageSEODataSchema = z.object({
  pageId: z.string(),
  language: z.string(),
  variant: z.string().optional(),
  minify: z.boolean(),
  content: SEOContentSchema,
  faqs: z.array(FAQSchema).describe("5-7 relevant FAQ items"),
});

// Schema for the complete output
const CompleteSEODataSchema = z.object({
  generatedAt: z.string(),
  version: z.string(),
  pages: z.array(PageSEODataSchema),
  inProgress: z.boolean().optional(),
  progress: z.string().optional(),
});

// Types
type SEOContent = z.infer<typeof SEOContentSchema>;
type FAQItem = z.infer<typeof FAQSchema>;
type PageSEOData = z.infer<typeof PageSEODataSchema>;
type CompleteSEOData = z.infer<typeof CompleteSEODataSchema>;

// Configuration
const CONFIG = {
  outputFile: "src/lib/generated-seo-data.json",
  version: "1.0.0",
  model: "moonshotai/kimi-k2-0905", // You can change this to other models
  maxRetries: 3,
};

/**
 * Generate SEO content for a specific language/variant combination
 */
async function generateSEOContent(
  languageConfig: LanguageConfig,
  variant: string | null = null,
): Promise<SEOContent> {
  const isMinifier = languageConfig.minify;
  const isVariant = !!variant;
  const languageName = languageConfig.name;

  const systemPrompt =
    `You are an expert SEO content strategist specializing in developer tools and code formatting utilities.
Your task is to create compelling, SEO-optimized content for a code formatter/minifier tool.

Key guidelines:
- Write for developers and programmers
- Focus on benefits like privacy, speed, and ease of use
- Include relevant technical keywords naturally
- Emphasize client-side processing and data privacy
- Use clear, action-oriented language
- Keep content specific to the programming language mentioned
- For variants, mention the specific formatter being used

The tool processes code entirely in the browser using WebAssembly for maximum privacy and performance.`;

  const userPrompt = `Generate SEO content for the following:

Language: ${languageName}
Tool Type: ${isMinifier ? "Minifier" : "Formatter"}
${isVariant ? `Variant: ${variant}` : ""}
File Extensions: ${languageConfig.extensions.join(", ")}

Current description: ${languageConfig.description}

Please generate comprehensive SEO content including:
- A compelling title optimized for search
- A meta description that drives clicks
- Relevant keywords developers would search for
- An appropriate category
- A strong H1 heading
- An engaging introduction
- Key features of the tool
- Benefits for developers
- Common use cases

Focus on what makes this tool valuable: privacy, speed, ease of use, and client-side processing.`;

  try {
    const result = await generateObject({
      model: openrouter.chat(CONFIG.model),
      system: systemPrompt,
      prompt: userPrompt,
      schema: SEOContentSchema,
      maxRetries: CONFIG.maxRetries,
    });

    return result.object;
  } catch (error) {
    console.error(
      `Error generating SEO content for ${languageConfig.id}:`,
      error,
    );
    throw error;
  }
}

/**
 * Generate FAQ content for a specific language/variant combination
 */
async function generateFAQContent(
  languageConfig: LanguageConfig,
  variant: string | null = null,
): Promise<FAQItem[]> {
  const languageName = languageConfig.name;
  const isMinifier = languageConfig.minify;
  const isVariant = !!variant;

  const systemPrompt =
    `You are an expert technical writer and SEO specialist who creates FAQ content for developer tools.
Your FAQs should be helpful, technically accurate, and optimized for search engines.

Guidelines:
- Write from the perspective of helping developers
- Include questions about privacy, security, and browser-based processing
- Cover common use cases and technical details
- Answer questions about file formats and compatibility
- Include questions about performance and speed
- For variants, include questions specific to that formatter
- Make answers comprehensive but concise
- Use natural language that developers would search for`;

  const userPrompt = `Generate 5-7 FAQ items for a ${languageName} ${isMinifier ? "minifier" : "formatter"} tool.
${isVariant ? `This is the ${variant} variant.` : ""}

The tool:
- Works entirely in the browser using WebAssembly
- Supports file extensions: ${languageConfig.extensions.join(", ")}
- Processes code client-side for maximum privacy
- Free to use with no registration required

Create FAQ questions and answers that developers would commonly search for. Include questions about:
- How the tool works
- Privacy and security aspects
- Supported features and file types
- Performance and benefits
- Technical details and compatibility
- Common use cases and workflows

Make both questions and answers SEO-friendly with natural language.`;

  try {
    const result = await generateObject({
      model: openrouter.chat(CONFIG.model),
      system: systemPrompt,
      prompt: userPrompt,
      schema: z.object({
        faqs: z.array(FAQSchema),
      }),
      maxRetries: CONFIG.maxRetries,
    });

    return result.object.faqs;
  } catch (error) {
    console.error(
      `Error generating FAQ content for ${languageConfig.id}:`,
      error,
    );
    throw error;
  }
}

/**
 * Generate all variants for a language
 */
async function generateVariantsForLanguage(
  languageId: string,
): Promise<Array<{ slug: string; name: string }>> {
  // Known variants mapping
  const variantMap: Record<string, Array<{ slug: string; name: string }>> = {
    python: [{ slug: "ruff", name: "Ruff" }],
    javascript: [{ slug: "biome", name: "Biome" }],
    typescript: [{ slug: "biome", name: "Biome" }],
    php: [{ slug: "mago", name: "Mago" }],
  };

  return variantMap[languageId] || [];
}

/**
 * Save progress to file
 */
function saveProgress(pages: PageSEOData[], totalExpected: number): void {
  const outputPath = join(process.cwd(), CONFIG.outputFile);

  try {
    const progressData = {
      generatedAt: new Date().toISOString(),
      version: CONFIG.version,
      inProgress: pages.length < totalExpected,
      progress: `${pages.length}/${totalExpected} pages completed`,
      pages,
    };

    writeFileSync(outputPath, JSON.stringify(progressData, null, 2), "utf-8");
    console.log(`💾 Progress saved: ${pages.length}/${totalExpected} pages`);
  } catch (error) {
    console.error("❌ Failed to save progress:", error);
  }
}

/**
 * Process a single language and its variants
 */
async function processLanguage(
  languageId: string,
  languageConfig: LanguageConfig,
): Promise<PageSEOData[]> {
  const pages: PageSEOData[] = [];

  try {
    // Generate content for main language page
    console.log(`   Generating content for ${languageId}...`);
    const content = await generateSEOContent(languageConfig);
    const faqs = await generateFAQContent(languageConfig);

    pages.push({
      pageId: languageId,
      language: languageId,
      minify: languageConfig.minify,
      content,
      faqs,
    });

    // Generate content for variants if they exist
    const variants = await generateVariantsForLanguage(languageId);
    for (const variant of variants) {
      console.log(`     Generating content for ${languageId}/${variant.slug} variant...`);

      const variantContent = await generateSEOContent(languageConfig, variant.slug);
      const variantFAQs = await generateFAQContent(languageConfig, variant.slug);

      pages.push({
        pageId: `${languageId}/${variant.slug}`,
        language: languageId,
        variant: variant.slug,
        minify: languageConfig.minify,
        content: variantContent,
        faqs: variantFAQs,
      });
    }

    console.log(`   ✅ Completed ${languageConfig.name}`);
    return pages;
  } catch (error) {
    console.error(`   ❌ Failed to generate content for ${languageId}:`, error);
    return pages; // Return empty array for failed language
  }
}

/**
 * Process languages in parallel batches
 */
async function processLanguagesInBatches(
  languageEntries: Array<[string, LanguageConfig]>,
  batchSize: number = 5,
  onProgress?: (processed: number, total: number, pages: PageSEOData[]) => void,
): Promise<PageSEOData[]> {
  const allPages: PageSEOData[] = [];
  const totalLanguages = languageEntries.length;
  let processedLanguages = 0;

  // Process in batches
  for (let i = 0; i < languageEntries.length; i += batchSize) {
    const batch = languageEntries.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(languageEntries.length / batchSize);

    console.log(
      `\n🔄 Processing Batch ${batchNumber}/${totalBatches} (${batch.length} languages)...`,
    );

    // Process current batch in parallel
    const batchPromises = batch.map(([languageId, languageConfig]) => processLanguage(languageId, languageConfig));

    const batchResults = await Promise.allSettled(batchPromises);

    // Collect successful results
    let batchPages: PageSEOData[] = [];
    batchResults.forEach((result, index) => {
      if (result.status === "fulfilled") {
        batchPages.push(...result.value);
      } else {
        const [languageId] = batch[index];
        console.error(`   ❌ Batch failed for ${languageId}:`, result.reason);
      }
    });

    // Add batch pages to total
    allPages.push(...batchPages);
    processedLanguages += batch.length;

    // Save progress after each batch
    if (onProgress) {
      onProgress(processedLanguages, totalLanguages, allPages);
    } else {
      saveProgress(allPages, 30); // 30 total pages expected
    }

    console.log(
      `   📊 Batch ${batchNumber} completed: ${batchPages.length} pages generated`,
    );

    // Small delay between batches to avoid rate limiting
    if (i + batchSize < languageEntries.length) {
      console.log(`   ⏳ Waiting 2 seconds before next batch...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  return allPages;
}

/**
 * Process all languages and generate SEO content
 */
async function generateAllSEOContent(): Promise<CompleteSEOData> {
  console.log("🚀 Starting SEO content generation...");
  console.log("📊 Processing in parallel batches of 5 languages...");

  const languageEntries = Object.entries(LANGUAGES);
  const pages = await processLanguagesInBatches(languageEntries, 5);

  return {
    generatedAt: new Date().toISOString(),
    version: CONFIG.version,
    pages,
  };
}

/**
 * Save generated content to file
 */
function saveSEOContent(data: CompleteSEOData): void {
  const outputPath = join(process.cwd(), CONFIG.outputFile);

  try {
    writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`\n✅ SEO content saved to: ${outputPath}`);
    console.log(`📊 Generated content for ${data.pages.length} pages`);
  } catch (error) {
    console.error("❌ Failed to save SEO content:", error);
    throw error;
  }
}

/**
 * Load existing SEO content if it exists
 */
function loadExistingSEOContent(): CompleteSEOData | null {
  const outputPath = join(process.cwd(), CONFIG.outputFile);

  if (!existsSync(outputPath)) {
    return null;
  }

  try {
    const content = readFileSync(outputPath, "utf-8");
    return JSON.parse(content) as CompleteSEOData;
  } catch (error) {
    console.warn("⚠️  Warning: Could not load existing SEO content:", error);
    return null;
  }
}

/**
 * Ask user for confirmation to overwrite existing file
 */
async function askForOverwriteConfirmation(existingContent: CompleteSEOData | null): Promise<boolean> {
  if (!existingContent) {
    return true; // No existing file, proceed
  }

  console.log("\n⚠️  Existing SEO content found!");
  console.log(`📅 Generated: ${new Date(existingContent.generatedAt).toLocaleDateString()}`);
  console.log(`📄 Pages: ${existingContent.pages.length}`);

  // Check if it's in progress
  if (existingContent.inProgress) {
    console.log(`🔄 Status: In progress (${existingContent.progress})`);
  } else {
    console.log(`✅ Status: Complete`);
  }

  console.log("\nChoose an option:");
  console.log("1. Continue and overwrite existing content");
  console.log("2. Resume from existing progress");
  console.log("3. Exit (no changes made)");

  // For non-interactive environments, default to overwrite
  if (!process.stdin.isTTY) {
    console.log("🤖 Non-interactive environment detected - defaulting to overwrite");
    return true;
  }

  const readline = await import("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("\nEnter your choice (1-3): ", (answer) => {
      rl.close();
      switch (answer.trim()) {
        case "1":
          resolve(true);
          break;
        case "2":
          resolve(false);
          break;
        case "3":
          console.log("👋 Exiting without changes.");
          process.exit(0);
        default:
          console.log("❌ Invalid choice. Exiting.");
          process.exit(1);
      }
    });
  });
}

/**
 * Resume from existing progress
 */
function resumeFromExisting(existingContent: CompleteSEOData): PageSEOData[] {
  console.log(`🔄 Resuming from ${existingContent.pages.length} completed pages`);
  return existingContent.pages;
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  console.log("🎯 HappyFormatter SEO Content Generator");
  console.log("=====================================");

  // Check for API key
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("❌ Error: No API key found!");
    console.error(
      "Please set OPENROUTER_API_KEY or OPENAI_API_KEY environment variable",
    );
    process.exit(1);
  }

  // Check for existing content
  const existingContent = loadExistingSEOContent();
  const shouldOverwrite = await askForOverwriteConfirmation(existingContent);

  try {
    let seoData: CompleteSEOData;

    if (!shouldOverwrite && existingContent) {
      // Resume from existing progress
      const existingPages = resumeFromExisting(existingContent);
      console.log(`\n📝 Resuming generation from page ${existingPages.length + 1}...`);

      // Generate remaining content
      const newPages = await generateRemainingContent(existingPages);

      seoData = {
        generatedAt: new Date().toISOString(),
        version: CONFIG.version,
        pages: [...existingPages, ...newPages],
      };
    } else {
      // Generate all SEO content fresh
      seoData = await generateAllSEOContent();
    }

    // Save final content
    saveSEOContent(seoData);

    console.log("\n🎉 SEO content generation completed successfully!");
    console.log(`📊 Total pages: ${seoData.pages.length}`);
    console.log("\nNext steps:");
    console.log("1. Review the generated content");
    console.log("2. Update your components to use the generated data");
    console.log("3. Run your build process to ensure everything works");
    console.log("4. Test with: pnpm test-seo:integration");
  } catch (error) {
    console.error("\n❌ SEO content generation failed:", error);
    process.exit(1);
  }
}

/**
 * Generate content for remaining pages (resuming with batches)
 */
async function generateRemainingContent(existingPages: PageSEOData[]): Promise<PageSEOData[]> {
  console.log("🔄 Resuming generation in parallel batches of 5 languages...");

  const existingPageIds = new Set(existingPages.map(p => p.pageId));
  const languageEntries = Object.entries(LANGUAGES).filter(
    ([languageId]) => !existingPageIds.has(languageId),
  );

  // Progress callback for resuming
  const onResumeProgress = (_processed: number, _total: number, pages: PageSEOData[]) => {
    saveProgress([...existingPages, ...pages], 30);
  };

  const newPages = await processLanguagesInBatches(languageEntries, 5, onResumeProgress);

  // Also process any missing variants for languages that were completed
  const allNewPages = [...newPages];
  const processedLanguageIds = new Set(existingPages.map(p => p.language));

  for (const [languageId, languageConfig] of Object.entries(LANGUAGES)) {
    if (processedLanguageIds.has(languageId)) {
      // Check if this language has missing variants
      const variants = await generateVariantsForLanguage(languageId);

      for (const variant of variants) {
        const variantPageId = `${languageId}/${variant.slug}`;

        if (!existingPageIds.has(variantPageId)) {
          console.log(`   Generating missing variant ${variantPageId}...`);

          try {
            const variantContent = await generateSEOContent(languageConfig, variant.slug);
            const variantFAQs = await generateFAQContent(languageConfig, variant.slug);

            allNewPages.push({
              pageId: variantPageId,
              language: languageId,
              variant: variant.slug,
              minify: languageConfig.minify,
              content: variantContent,
              faqs: variantFAQs,
            });

            console.log(`   ✅ Completed ${variantPageId}`);
          } catch (error) {
            console.error(`   ❌ Failed to generate content for ${variantPageId}:`, error);
          }
        }
      }
    }
  }

  return allNewPages;
}

// Run the script
if (import.meta.main) {
  main().catch(console.error);
}

export {
  type CompleteSEOData,
  type FAQItem,
  generateAllSEOContent,
  generateFAQContent,
  generateSEOContent,
  type PageSEOData,
  type SEOContent,
};
