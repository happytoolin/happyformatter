import { LANGUAGES } from "@/lib/languages";
import { SEO_CONTENT_PAGES } from "@/lib/seo-content";
import { getLanguageVariants } from "@/lib/seo-variants";
import { UTILITY_CATEGORIES, UTILITY_TOOLS } from "@/lib/utility-tools";
import type { APIRoute } from "astro";

const languages = Object.values(LANGUAGES);
const variantPaths = Object.keys(LANGUAGES).flatMap(language =>
  getLanguageVariants(language)
    .filter(variant => variant.slug !== "minify")
    .map(variant => `${language}-${variant.slug}`)
);

export function getStaticPaths() {
  const paths = [
    "home",
    "tools",
    "tools/formatters",
    "tools/minifiers",
    "tools/private",
    "compare",
    "errors",
    "guides",
    ...languages.map(language => language.id),
    ...variantPaths,
    ...languages.filter(language => language.minify).map(language => `minify/${language.id}`),
    ...UTILITY_CATEGORIES.map(category => `tools/${category.slug}`),
    ...UTILITY_TOOLS.map(tool => `tools/${tool.slug}`),
    ...SEO_CONTENT_PAGES.map(page => page.canonicalPath.replace(/^\//, "")),
  ];

  return paths.map(slug => ({
    params: { slug },
  }));
}

const escapeSvg = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const titleFromSlug = (slug: string) => {
  const withoutExtension = slug.replace(/\.svg$/, "");
  const parts = withoutExtension.split("/").filter(Boolean);
  const last = parts.at(-1) ?? "private tools";
  const family = parts.length > 1 ? parts[0] : "tool";
  const title = last
    .replace(/-/g, " ")
    .replace(/\b\w/g, character => character.toUpperCase());
  return {
    eyebrow: family === "og" ? "Private browser tools" : `${family} / no upload`,
    title,
  };
};

export const GET: APIRoute = ({ params }) => {
  const { eyebrow, title } = titleFromSlug(params.slug ?? "private-tools");
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${
      escapeSvg(title)
    }">
  <rect width="1200" height="630" fill="#f6f7f7"/>
  <rect x="64" y="64" width="1072" height="502" rx="18" fill="#ffffff" stroke="#1f2923" stroke-width="2"/>
  <path d="M64 152h1072" stroke="#1f2923" stroke-width="2"/>
  <circle cx="112" cy="108" r="12" fill="#ef4444"/>
  <circle cx="152" cy="108" r="12" fill="#f59e0b"/>
  <circle cx="192" cy="108" r="12" fill="#22c55e"/>
  <text x="96" y="226" fill="#5b655e" font-family="IBM Plex Sans, Arial, sans-serif" font-size="30" font-weight="600" letter-spacing="0">${
      escapeSvg(eyebrow.toUpperCase())
    }</text>
  <text x="96" y="334" fill="#111513" font-family="IBM Plex Sans, Arial, sans-serif" font-size="78" font-weight="700" letter-spacing="0">${
      escapeSvg(title)
    }</text>
  <text x="96" y="430" fill="#2f3a33" font-family="IBM Plex Sans, Arial, sans-serif" font-size="34" font-weight="500" letter-spacing="0">Runs in your browser. No upload. No account.</text>
  <text x="96" y="512" fill="#111513" font-family="JetBrains Mono, monospace" font-size="30" font-weight="600" letter-spacing="0">HappyFormatter</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
