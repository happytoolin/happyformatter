/**
 * Example integration of generated SEO data with existing components
 * This file shows how to use the generated SEO content in your pages
 */

import type { GetStaticPaths } from "astro";
import { generatePageBreadcrumbs, getPageFAQs, getPageSEOContent } from "../lib/generated-seo-utils.js";
import { LANGUAGES } from "../lib/languages.js";

/**
 * Example of how to update your getStaticPaths function
 * to include variant-specific SEO data
 */
export const getStaticPaths: GetStaticPaths = (async () => {
  const paths: any[] = [];

  // Add main language pages
  Object.entries(LANGUAGES).forEach(([langId, langConfig]) => {
    // Get generated SEO data for this language
    const generatedSEO = getPageSEOContent(langId);

    paths.push({
      params: { lang: langId },
      props: {
        languageConfig: langConfig,
        language: langId,
        variant: null,
        lang: langId,
        generatedSEO, // Add generated SEO data
      },
    });
  });

  // Add variant pages
  const variants = {
    "python": ["ruff"],
    "javascript": ["biome"],
    "typescript": ["biome"],
    "php": ["mago"],
  };

  for (const [langId, variantList] of Object.entries(variants)) {
    const langConfig = LANGUAGES[langId];

    variantList.forEach(variant => {
      // Get generated SEO data for this variant
      const generatedSEO = getPageSEOContent(langId, variant);

      paths.push({
        params: { lang: `${langId}/${variant}` },
        props: {
          languageConfig: langConfig,
          language: langId,
          variant: variant,
          variantData: { slug: variant }, // Your existing variant data structure
          lang: `${langId}/${variant}`,
          generatedSEO, // Add generated SEO data
        },
      });
    });
  }

  return paths;
}) satisfies GetStaticPaths;

/**
 * Example of how to use the generated data in a page component
 */
export function useGeneratedSEO(
  language: string,
  variant?: string | null,
  fallbackSEO?: any,
) {
  // Try to get generated SEO data
  const generatedSEO = getPageSEOContent(language, variant);

  if (generatedSEO) {
    return {
      title: generatedSEO.content.title,
      description: generatedSEO.content.description,
      keywords: generatedSEO.content.keywords,
      category: generatedSEO.content.category,
      h1: generatedSEO.content.h1,
      introduction: generatedSEO.content.introduction,
      features: generatedSEO.content.features,
      benefits: generatedSEO.content.benefits,
      useCases: generatedSEO.content.useCases,
    };
  }

  // Fall back to existing SEO logic
  return fallbackSEO;
}

/**
 * Example of how to generate FAQ data for pages
 */
export function useGeneratedFAQs(
  language: string,
  variant?: string | null,
  fallbackFAQs?: any[],
) {
  // Try to get generated FAQs
  const generatedFAQs = getPageFAQs(language, variant);

  if (generatedFAQs.length > 0) {
    return generatedFAQs;
  }

  // Fall back to existing FAQ logic
  return fallbackFAQs || [];
}

/**
 * Example of how to generate breadcrumbs
 */
export function useGeneratedBreadcrumbs(
  language: string,
  variant?: string | null,
  minify?: boolean,
) {
  // Try to use generated breadcrumbs
  const generatedBreadcrumbs = generatePageBreadcrumbs(language, variant);

  if (generatedBreadcrumbs.length > 0) {
    return generatedBreadcrumbs;
  }

  // Fall back to existing breadcrumb logic
  // (You can import your existing generateBreadcrumbs function here)
  return [];
}

/**
 * Example usage in an Astro page:
 *
 * ```astro
 * ---
 * import { getStaticPaths } from './example-integration';
 * import { useGeneratedSEO, useGeneratedFAQs, useGeneratedBreadcrumbs } from './example-integration';
 * import { getLanguageSEOData } from '../lib/seo-utils';
 *
 * // Use the getStaticPaths from above
 * export { getStaticPaths };
 *
 * const { language, languageConfig, variant, generatedSEO } = Astro.props;
 *
 * // Use generated SEO with fallback
 * const seoData = useGeneratedSEO(
 *   language,
 *   variant,
 *   getLanguageSEOData(language, languageConfig.minify)
 * );
 *
 * // Use generated FAQs with fallback
 * const faqs = useGeneratedFAQs(language, variant);
 *
 * // Use generated breadcrumbs with fallback
 * const breadcrumbs = useGeneratedBreadcrumbs(language, variant, languageConfig.minify);
 * ---
 *
 * <Layout
 *   title={seoData.title}
 *   description={seoData.description}
 *   language={language}
 *   minify={languageConfig.minify}
 *   keywords={seoData.keywords}
 *   category={seoData.category}
 *   currentVariant={variant}
 * >
 *   <h1>{seoData.h1}</h1>
 *   <p>{seoData.introduction}</p>
 *
 *   <!-- Your existing formatter component -->
 *   <Formatter language={language} />
 *
 *   <!-- Use generated features and benefits -->
 *   <section>
 *     <h2>Features</h2>
 *     <ul>
 *       {seoData.features.map(feature => <li>{feature}</li>)}
 *     </ul>
 *   </section>
 *
 *   <!-- Use generated FAQs -->
 *   <FAQ questions={faqs} language={language} />
 * </Layout>
 * ```
 */
