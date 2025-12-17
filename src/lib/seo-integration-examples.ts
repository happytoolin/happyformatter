/**
 * Complete Integration Examples for HappyFormatter SEO Content
 *
 * This file shows exactly how to integrate the generated SEO content with your existing page structure.
 * Each example matches the specific components and sections shown in your current page.
 */

import {
  generatePageBreadcrumbs,
  getLanguageInfoData,
  getLayoutSEOData,
  getPageFAQs,
  getRelatedToolsData,
  getVariantLinks,
} from "./generated-seo-utils.js";

import { getLanguageSEOData } from "./seo-utils.js";

/**
 * Example 1: Update your main page layout ([...lang].astro)
 *
 * This shows how to integrate SEO content with your existing Layout component
 */
export function integrateWithLayout(
  language: string,
  variant?: string | null,
  minify?: boolean,
) {
  // Get generated SEO data
  const generatedSEO = getLayoutSEOData(language, variant, minify);

  // Fall back to existing SEO logic if no generated data
  const fallbackSEO = getLanguageSEOData(language, minify);

  const seoData = generatedSEO || fallbackSEO;

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: generatedSEO?.keywords || fallbackSEO.keywords,
    category: generatedSEO?.category || fallbackSEO.category,
  };
}

/**
 * Example 2: Update Info component with generated content
 *
 * This shows how to enhance your Info.astro component with AI-generated content
 */
export function integrateWithInfoComponent(
  language: string,
  variant?: string | null,
) {
  // Get generated language info data
  const generatedInfo = getLanguageInfoData(language, variant);

  if (generatedInfo) {
    return generatedInfo;
  }

  // Fall back to existing data.ts logic
  // This would replace your current languageInfoData import
  return null;
}

/**
 * Example 3: Update FAQ component with generated questions
 *
 * This shows how to integrate generated FAQs with your FAQ component
 */
export function integrateWithFAQComponent(
  language: string,
  variant?: string | null,
) {
  // Get generated FAQs
  const generatedFAQs = getPageFAQs(language, variant);

  if (generatedFAQs.length > 0) {
    return {
      useGenerated: true,
      faqs: generatedFAQs,
      title: "Frequently Asked Questions",
    };
  }

  // Fall back to existing accordionData logic
  return {
    useGenerated: false,
    faqs: [], // Your existing accordionData[language] logic
    title: "Troubleshoot",
  };
}

/**
 * Example 4: Update breadcrumbs with generated data
 *
 * This shows how to integrate generated breadcrumbs
 */
export function integrateWithBreadcrumbs(
  language: string,
  variant?: string | null,
  minify?: boolean,
) {
  const generatedBreadcrumbs = generatePageBreadcrumbs(
    language,
    variant,
    minify,
  );

  if (generatedBreadcrumbs.length > 0) {
    return generatedBreadcrumbs;
  }

  // Fall back to existing generateBreadcrumbs logic
  // This would replace your existing generateBreadcrumbs function
  return [];
}

/**
 * Example 5: Update RelatedTools component with generated data
 *
 * This shows how to generate related tools suggestions
 */
export function integrateWithRelatedTools(
  language: string,
  variant?: string | null,
) {
  const generatedRelatedTools = getRelatedToolsData(language, variant);

  if (generatedRelatedTools && generatedRelatedTools.length > 0) {
    return generatedRelatedTools;
  }

  // Fall back to your existing RelatedTools logic
  return [];
}

/**
 * Example 6: Update VariantLinks component with generated data
 *
 * This shows how to generate variant links dynamically
 */
export function integrateWithVariantLinks(language: string) {
  const generatedVariants = getVariantLinks(language);

  if (generatedVariants.length > 0) {
    return {
      title: `${language.charAt(0).toUpperCase() + language.slice(1)} Formatter Variants`,
      description: "Looking for specific formatting features? Try these specialized tools:",
      variants: generatedVariants,
    };
  }

  // Fall back to your existing variant logic
  return null;
}

/**
 * Complete Integration Example for your [...lang].astro page
 *
 * This shows how to update your main page to use all generated content
 */
export function completePageIntegration(
  language: string,
  languageConfig: any,
  variant?: string | null,
) {
  // 1. SEO Data for Layout
  const layoutSEO = integrateWithLayout(
    language,
    variant,
    languageConfig.minify,
  );

  // 2. Info Component Data
  const infoData = integrateWithInfoComponent(language, variant);

  // 3. FAQ Component Data
  const faqData = integrateWithFAQComponent(language, variant);

  // 4. Breadcrumbs
  const breadcrumbs = integrateWithBreadcrumbs(
    language,
    variant,
    languageConfig.minify,
  );

  // 5. Related Tools
  const relatedTools = integrateWithRelatedTools(language, variant);

  // 6. Variant Links
  const variantLinks = integrateWithVariantLinks(language);

  return {
    layout: layoutSEO,
    info: infoData,
    faq: faqData,
    breadcrumbs,
    relatedTools,
    variantLinks,
  };
}

/**
 * Component Integration Example
 *
 * This shows exactly how to update your existing components
 */
export const componentExamples = {
  // Update your Info.astro component
  infoComponent: `
---
import { getLanguageInfoData } from "../lib/generated-seo-utils.js";
import { languageInfoData } from "./data.js";

const { language, variant } = Astro.props;

// Try to get generated data first
const generatedInfo = getLanguageInfoData(language, variant);

// Use generated data if available, otherwise fall back to existing
const info = generatedInfo || languageInfoData[language] || languageInfoData["default"];
---

<!-- Your existing Info.astro component with enhanced data -->
<section class="py-24 bg-background relative overflow-hidden">
  <!-- Your existing component structure -->
  <div class="container mx-auto px-4 relative z-10 max-w-6xl">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-0 border-2 border-foreground">
      <!-- Title Block -->
      <div class="col-span-12 lg:col-span-4 p-8 border-b-2 lg:border-b-0 lg:border-r-2 border-foreground bg-primary text-primary-foreground">
        <span class="font-mono text-xs font-bold uppercase tracking-widest block mb-4">
          Spec Sheet // 001
        </span>
        <h2 class="font-display text-3xl md:text-5xl uppercase leading-[0.9] mb-6">
          {info.title}
        </h2>
        <p class="font-serif text-xl leading-relaxed opacity-90">
          {info.description}
        </p>
      </div>

      <!-- Features Grid -->
      <div class="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2">
        {/* Validator Module */}
        <div class="p-8 border-b-2 md:border-b-0 md:border-r-2 border-foreground bg-card">
          <div class="flex items-center gap-2 mb-6">
            <span class="w-2 h-2 border-2 border-accent"></span>
            <h3 class="font-display text-xl uppercase">
              {info.validator.title}
            </h3>
          </div>
          <p class="font-mono text-sm text-muted-foreground mb-6 leading-relaxed">
            {info.validator.description}
          </p>
          <ul class="space-y-3">
            {info.validator.features.slice(0, 3).map(f => (
              <li class="flex items-start gap-3 text-sm font-medium">
                <span class="text-primary mt-1">→</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Capabilities */}
        <div class="p-8 bg-secondary/20">
          <div class="flex items-center gap-2 mb-6">
            <span class="w-2 h-2 bg-foreground"></span>
            <h3 class="font-display text-xl uppercase">Capabilities</h3>
          </div>
          <ul class="space-y-4 font-mono text-xs">
            {info.features.slice(0, 5).map((feature, i) => (
              <li class="border-b border-foreground/10 pb-2">
                <span class="text-muted-foreground mr-2">0{i + 1}</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
  `,

  // Update your FAQ component
  faqComponent: `
---
import { getPageFAQs } from "../lib/generated-seo-utils.js";
import { accordionData } from "./data.js";
import FAQ from "../faq/faq.jsx";

const { language, variant } = Astro.props;

// Try to get generated FAQs first
const generatedFAQs = getPageFAQs(language, variant);

// Use generated FAQs if available, otherwise fall back to existing
const faqData = generatedFAQs.length > 0 ? generatedFAQs : accordionData[language] || [];
---

<FAQ
  questions={faqData}
  language={language}
  variant={variant}
/>
  `,

  // Update your main page layout
  pageLayout: `
---
import Layout from "@/components/layout/layout.astro";
import Formatter from "@/components/playground/Formatter";
import Info from "@/components/info/info.astro";
import FAQ from "@/components/faq/faq.jsx";
import { completePageIntegration } from "@/lib/seo-integration-examples.js";

const { language, languageConfig, variant } = Astro.props;

// Get all integrated SEO data
const integratedData = completePageIntegration(language, languageConfig, variant);

// Use generated data for layout
const layoutSEO = integratedData.layout;
const breadcrumbs = integratedData.breadcrumbs;
---

<Layout
  title={layoutSEO.title}
  description={layoutSEO.description}
  language={language}
  minify={languageConfig.minify}
  keywords={layoutSEO.keywords}
  category={layoutSEO.category}
  currentVariant={variant}
  breadcrumbs={breadcrumbs}
>
  <Formatter
    client:load
    minifier={languageConfig.minify}
    language={language}
  />

  <Info
    language={language}
    variant={variant}
  />

  <FAQ
    language={language}
    variant={variant}
    client:idle
  />
</Layout>
  `,
};

/**
 * Migration Strategy
 *
 * Step-by-step approach to integrate generated SEO content
 */
export const migrationStrategy = {
  step1: "Run the SEO generator: pnpm generate-seo:dry-run",
  step2: "Review generated mock data in src/lib/mock-seo-data.json",
  step3: "Update Layout component to use getLayoutSEOData()",
  step4: "Update Info component to use getLanguageInfoData()",
  step5: "Update FAQ component to use getPageFAQs()",
  step6: "Test with dry-run data first",
  step7: "Generate real AI content: pnpm generate-seo",
  step8: "Review and deploy with real content",
};
