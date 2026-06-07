import { LANGUAGES } from "@/lib/languages";
import { SEO_CONTENT_PAGES } from "@/lib/seo-content";
import { UTILITY_CATEGORIES, UTILITY_TOOLS } from "@/lib/utility-tools";
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? "https://happyformatter.com";
  const lines = [
    "# HappyFormatter Full Tool Index",
    "",
    "HappyFormatter provides privacy-first developer tools that run in the browser with no upload and no account requirement.",
    "",
    "## Formatter Pages",
    ...Object.values(LANGUAGES).flatMap(language => [
      `### ${language.name} Formatter`,
      `URL: ${origin}/${language.id}`,
      `Description: ${language.description}`,
      ...(language.minify ? [`Minifier: ${origin}/minify/${language.id}`] : []),
      "",
    ]),
    "## Utility Categories",
    ...UTILITY_CATEGORIES.flatMap(category => [
      `### ${category.name}`,
      `URL: ${origin}/tools/${category.slug}`,
      category.description,
      "",
    ]),
    "## Utility Tools",
    ...UTILITY_TOOLS.flatMap(tool => [
      `### ${tool.name}`,
      `URL: ${origin}/tools/${tool.slug}`,
      tool.description,
      `Privacy: ${tool.privacyNote}`,
      `Features: ${tool.features.join(" ")}`,
      "",
    ]),
    "## Comparison, Error, And Guide Pages",
    ...SEO_CONTENT_PAGES.flatMap(page => [
      `### ${page.h1}`,
      `URL: ${origin}${page.canonicalPath}`,
      page.summary,
      `Related: ${page.relatedLinks.map(link => `${link.title} (${origin}${link.href})`).join("; ")}`,
      "",
    ]),
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
