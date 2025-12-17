#!/usr/bin/env bun

/**
 * Test script to validate SEO script structure without API calls
 */

import { LANGUAGES } from "../src/lib/languages.js";

console.log("🧪 Testing SEO Script Structure");
console.log("==============================\n");

// Test 1: Check if languages are loaded correctly
console.log("1. Testing language configuration...");
const languageCount = Object.keys(LANGUAGES).length;
console.log(`   ✓ Loaded ${languageCount} languages`);

// Test 2: Check for known variants
console.log("\n2. Testing variant detection...");
const knownVariants = {
  "python": ["ruff"],
  "javascript": ["biome"],
  "typescript": ["biome"],
  "php": ["mago"],
};

for (const [lang, variants] of Object.entries(knownVariants)) {
  if (LANGUAGES[lang]) {
    console.log(`   ✓ ${lang} has ${variants.length} variants: ${variants.join(", ")}`);
  } else {
    console.log(`   ❌ Language ${lang} not found`);
  }
}

// Test 3: Check language properties
console.log("\n3. Testing language properties...");
const requiredProps = ["id", "name", "title", "description", "minify", "extensions"];

for (const [langId, config] of Object.entries(LANGUAGES)) {
  const missingProps = requiredProps.filter(prop => !(prop in config));
  if (missingProps.length === 0) {
    console.log(`   ✓ ${config.name} has all required properties`);
  } else {
    console.log(`   ❌ ${config.name} missing: ${missingProps.join(", ")}`);
  }
}

// Test 4: Generate sample page structure
console.log("\n4. Testing page structure generation...");
const samplePages: string[] = [];

for (const [langId, config] of Object.entries(LANGUAGES)) {
  // Main page
  samplePages.push(langId);

  // Variant pages
  if (knownVariants[langId]) {
    for (const variant of knownVariants[langId]) {
      samplePages.push(`${langId}/${variant}`);
    }
  }
}

console.log(`   ✓ Generated structure for ${samplePages.length} pages`);

// Test 5: Show sample pages
console.log("\n5. Sample page structure:");
console.log("   Main pages:");
for (const [langId, config] of Object.entries(LANGUAGES).slice(0, 5)) {
  console.log(`     - ${langId}: ${config.name} (${config.minify ? "minifier" : "formatter"})`);
}
if (Object.keys(LANGUAGES).length > 5) {
  console.log(`     ... and ${Object.keys(LANGUAGES).length - 5} more`);
}

console.log("\n   Variant pages:");
for (const [langId, variants] of Object.entries(knownVariants)) {
  for (const variant of variants) {
    console.log(`     - ${langId}/${variant}: ${LANGUAGES[langId]?.name} with ${variant}`);
  }
}

console.log("\n✅ Structure validation completed!");
console.log("\nNext steps:");
console.log("1. Set up your OPENROUTER_API_KEY in .env");
console.log("2. Run: bun scripts/generate-seo-content.ts");
console.log("3. Review the generated content");

console.log("\nEstimated API calls:");
console.log(`- Content generation: ${samplePages.length} calls`);
console.log(`- FAQ generation: ${samplePages.length} calls`);
console.log(`- Total: ${samplePages.length * 2} API calls`);
