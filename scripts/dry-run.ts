#!/usr/bin/env bun

/**
 * Dry run script for SEO content generation
 * This generates mock content without making API calls
 */

import { generateMockPageData, saveMockData } from "./utils/dry-run.js";

console.log("🔬 SEO Content Generator - Dry Run Mode");
console.log("========================================");
console.log("This script generates mock SEO content without API calls");
console.log("Perfect for testing the structure and integration.\n");

try {
  // Generate mock page data
  console.log("📝 Generating mock SEO content...");
  const mockPages = generateMockPageData();

  console.log(`   ✓ Generated content for ${mockPages.length} pages`);
  console.log(`   ✓ Main pages: ${mockPages.filter(p => !p.variant).length}`);
  console.log(`   ✓ Variant pages: ${mockPages.filter(p => p.variant).length}`);

  // Show sample content
  console.log("\n📋 Sample generated content:");
  const samplePage = mockPages[0];
  console.log(`\n   Page: ${samplePage.pageId}`);
  console.log(`   Title: ${samplePage.content.title}`);
  console.log(`   Description: ${samplePage.content.description.substring(0, 100)}...`);
  console.log(`   Keywords: ${samplePage.content.keywords.slice(0, 5).join(", ")}...`);
  console.log(`   Features: ${samplePage.content.features.length} items`);
  console.log(`   FAQs: ${samplePage.faqs.length} items`);

  // Show sample FAQ
  if (samplePage.faqs.length > 0) {
    const sampleFAQ = samplePage.faqs[0];
    console.log(`\n   Sample FAQ:`);
    console.log(`   Q: ${sampleFAQ.question}`);
    console.log(`   A: ${sampleFAQ.answer.substring(0, 100)}...`);
  }

  // Save mock data
  console.log("\n💾 Saving mock data...");
  saveMockData();

  console.log("\n✅ Dry run completed successfully!");
  console.log("\nNext steps:");
  console.log("1. Review the mock data in src/lib/mock-seo-data.json");
  console.log("2. Test integration with your components");
  console.log("3. When ready, run with real API: bun scripts/generate-seo-content.ts");
  console.log("\nTo generate real content:");
  console.log("1. Set OPENROUTER_API_KEY in your .env file");
  console.log("2. Run: bun scripts/generate-seo-content.ts");
} catch (error) {
  console.error("\n❌ Dry run failed:", error);
  process.exit(1);
}
