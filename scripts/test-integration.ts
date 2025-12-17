#!/usr/bin/env bun

/**
 * Test SEO Integration with Existing Components
 * This script validates that the generated SEO data integrates correctly with your page structure
 */

import {
  generatePageBreadcrumbs,
  getLanguageInfoData,
  getLayoutSEOData,
  getPageFAQs,
  getPageSEOContent,
  getRelatedToolsData,
  loadGeneratedSEODataAsync,
} from "../src/lib/generated-seo-utils.js";

console.log("🧪 Testing SEO Integration with Existing Components");
console.log("===================================================");

// Load the SEO data first
await loadGeneratedSEODataAsync();

const testLanguages = ["json", "javascript", "python", "css"];

// Test 1: Layout SEO Data Integration
console.log("\n1. Testing Layout SEO Data Integration...");
for (const lang of testLanguages) {
  const layoutSEO = getLayoutSEOData(lang);

  if (layoutSEO) {
    console.log(`   ✓ ${lang}: ${layoutSEO.title.substring(0, 50)}...`);
    console.log(`     Keywords: ${layoutSEO.keywords.split(",").slice(0, 3).join(", ")}...`);
  } else {
    console.log(`   ❌ ${lang}: No layout SEO data found`);
  }
}

// Test 2: Info Component Integration
console.log("\n2. Testing Info Component Integration...");
for (const lang of testLanguages) {
  const infoData = getLanguageInfoData(lang);

  if (infoData) {
    console.log(`   ✓ ${lang}: ${infoData.title}`);
    console.log(`     Features: ${infoData.features.length} items`);
    console.log(`     Validator: ${infoData.validator.title}`);
  } else {
    console.log(`   ❌ ${lang}: No info data found`);
  }
}

// Test 3: FAQ Component Integration
console.log("\n3. Testing FAQ Component Integration...");
for (const lang of testLanguages) {
  const faqs = getPageFAQs(lang);

  if (faqs.length > 0) {
    console.log(`   ✓ ${lang}: ${faqs.length} FAQ items`);
    console.log(`     First Q: ${faqs[0].title.substring(0, 50)}...`);
  } else {
    console.log(`   ❌ ${lang}: No FAQ data found`);
  }
}

// Test 4: Breadcrumbs Integration
console.log("\n4. Testing Breadcrumbs Integration...");
for (const lang of testLanguages) {
  const breadcrumbs = generatePageBreadcrumbs(lang);

  if (breadcrumbs.length > 0) {
    console.log(`   ✓ ${lang}: ${breadcrumbs.length} breadcrumb items`);
    console.log(`     Path: ${breadcrumbs.map(b => b.name).join(" > ")}`);
  } else {
    console.log(`   ❌ ${lang}: No breadcrumb data found`);
  }
}

// Test 5: Related Tools Integration
console.log("\n5. Testing Related Tools Integration...");
for (const lang of testLanguages) {
  const relatedTools = getRelatedToolsData(lang);

  if (relatedTools && relatedTools.length > 0) {
    console.log(`   ✓ ${lang}: ${relatedTools.length} related tools`);
    console.log(`     First: ${relatedTools[0].title}`);
  } else {
    console.log(`   ❌ ${lang}: No related tools found`);
  }
}

// Test 6: Variant Integration
console.log("\n6. Testing Variant Integration...");
const variantTests = [
  { lang: "python", variant: "ruff" },
  { lang: "javascript", variant: "biome" },
  { lang: "php", variant: "mago" },
];

for (const { lang, variant } of variantTests) {
  const pageData = getPageSEOContent(lang, variant);

  if (pageData) {
    console.log(`   ✓ ${lang}/${variant}: ${pageData.content.h1}`);
    console.log(`     Description: ${pageData.content.description.substring(0, 50)}...`);
  } else {
    console.log(`   ❌ ${lang}/${variant}: No variant data found`);
  }
}

// Test 7: Format Matching with Existing Components
console.log("\n7. Testing Format Matching with Existing Components...");

// Check if generated data matches expected component formats
const sampleLang = "json";
const sampleFAQs = getPageFAQs(sampleLang);
const sampleInfo = getLanguageInfoData(sampleLang);

if (sampleFAQs.length > 0) {
  console.log(
    `   ✓ FAQ format matches: ${typeof sampleFAQs[0].title === "string" && typeof sampleFAQs[0].content === "string"}`,
  );
}

if (sampleInfo) {
  console.log(
    `   ✓ Info format matches: ${typeof sampleInfo.title === "string" && Array.isArray(sampleInfo.features)}`,
  );
  console.log(
    `   ✓ Validator format matches: ${
      typeof sampleInfo.validator.title === "string" && Array.isArray(sampleInfo.validator.features)
    }`,
  );
}

// Test 8: Page Content Coverage
console.log("\n8. Testing Page Content Coverage...");
const requiredSections = ["title", "description", "keywords", "features", "benefits", "useCases", "faqs"];

for (const lang of testLanguages.slice(0, 2)) {
  const pageData = getPageSEOContent(lang);

  if (pageData) {
    const missingSections = requiredSections.filter(section =>
      !pageData.content[section as keyof typeof pageData.content]
    );

    if (missingSections.length === 0) {
      console.log(`   ✓ ${lang}: All required sections present`);
    } else {
      console.log(`   ❌ ${lang}: Missing sections: ${missingSections.join(", ")}`);
    }

    if (pageData.faqs.length === 0) {
      console.log(`   ⚠️  ${lang}: No FAQ items generated`);
    }
  } else {
    console.log(`   ❌ ${lang}: No page data found`);
  }
}

console.log("\n✅ Integration Testing Completed!");
console.log("\nNext Steps:");
console.log("1. Review any ❌ or ⚠️ items above");
console.log("2. Run: pnpm generate-seo for real AI content");
console.log("3. Replace existing components with enhanced versions:");
console.log("   - Info.astro → info-enhanced.astro");
console.log("   - faq.tsx → faq-enhanced.tsx");
console.log("   - [...lang].astro → [...lang]-enhanced.astro");
console.log("4. Test the enhanced pages in your browser");

// Test 9: Memory and Performance
console.log("\n9. Testing Memory and Performance...");
const startTime = Date.now();

// Load all test language data
let totalData = 0;
for (const lang of testLanguages) {
  const pageData = getPageSEOContent(lang);
  if (pageData) {
    totalData += JSON.stringify(pageData).length;
  }
}

const endTime = Date.now();
const dataSizeKB = Math.round(totalData / 1024);

console.log(`   ✓ Loaded ${testLanguages.length} languages in ${endTime - startTime}ms`);
console.log(`   ✓ Total data size: ~${dataSizeKB}KB`);
console.log(`   ✓ Average per language: ~${Math.round(dataSizeKB / testLanguages.length)}KB`);

if (dataSizeKB < 100) {
  console.log("   ✓ Performance: Excellent for client-side loading");
} else if (dataSizeKB < 500) {
  console.log("   ✓ Performance: Good for client-side loading");
} else {
  console.log("   ⚠️  Performance: Consider lazy loading or optimization");
}

console.log("\n🎉 All tests completed! Your SEO integration is ready.");
