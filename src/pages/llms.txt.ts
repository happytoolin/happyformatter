import { LANGUAGES } from "@/lib/languages";
import { SEO_CONTENT_PAGES } from "@/lib/seo-content";
import { UTILITY_TOOLS } from "@/lib/utility-tools";
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? "https://happyformatter.com";
  const markdownLink = (label: string, href: string) => `- [${label}](${href})`;
  const lines = [
    "# HappyFormatter",
    "",
    "Private browser formatter, minifier, converter, decoder, parser, and generator tools. Tools are designed for no-upload local browser processing.",
    "",
    "## Core Tools",
    ...Object.values(LANGUAGES).map(language => markdownLink(`${language.name} Formatter`, `${origin}/${language.id}`)),
    "",
    "## Utility Tools",
    ...UTILITY_TOOLS.map(tool => markdownLink(tool.name, `${origin}/tools/${tool.slug}`)),
    "",
    "## SEO Guides",
    ...SEO_CONTENT_PAGES.map(page => markdownLink(page.h1, `${origin}${page.canonicalPath}`)),
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
