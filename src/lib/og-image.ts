import { LANGUAGES } from "@/lib/languages";
import { SEO_CONTENT_PAGES, SEO_HUBS } from "@/lib/seo-content";
import { getLanguageVariants } from "@/lib/seo-variants";
import { UTILITY_CATEGORIES, UTILITY_TOOLS } from "@/lib/utility-tools";

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_TYPE = "image/png";

type OgTone = "blue" | "green" | "slate" | "violet";

export interface OgImageCard {
  description: string;
  eyebrow: string;
  slug: string;
  title: string;
  tone: OgTone;
}

const defaultDescription = "Runs locally in your browser. No upload. No account.";

const tones: Record<OgTone, {
  accent: string;
  accentSoft: string;
  accentText: string;
}> = {
  blue: {
    accent: "#2563eb",
    accentSoft: "#eff6ff",
    accentText: "#1d4ed8",
  },
  green: {
    accent: "#168a42",
    accentSoft: "#eefbf3",
    accentText: "#126b34",
  },
  slate: {
    accent: "#475569",
    accentSoft: "#f1f5f9",
    accentText: "#334155",
  },
  violet: {
    accent: "#6755d8",
    accentSoft: "#f4f1ff",
    accentText: "#5b45c7",
  },
};

const utilityDescription = (name: string) => `${name} runs locally in your browser. No upload required.`;

const titleCaseSlug = (slug: string) =>
  slug
    .split("/")
    .at(-1)
    ?.replace(/\.(png|svg)$/i, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, character => character.toUpperCase())
    ?? "Private browser tools";

const pathToSlug = (path: string) => path.replace(/^\//, "").replace(/\/$/, "") || "home";

const cleanSlug = (slug: string) => slug.replace(/\.(png|svg)$/i, "").replace(/^\/+|\/+$/g, "") || "home";

const getToneForIndex = (index: number): OgTone => (["blue", "green", "slate", "violet"] as const)[index % 4];

const getCards = () => {
  const cards = new Map<string, OgImageCard>();

  const setCard = (slug: string, card: Omit<OgImageCard, "slug">) => {
    cards.set(cleanSlug(slug), {
      slug: cleanSlug(slug),
      ...card,
    });
  };

  setCard("home", {
    title: "Private browser code tools",
    eyebrow: "HappyFormatter",
    description: "Format, minify, convert, decode, and inspect snippets locally.",
    tone: "green",
  });

  setCard("tools", {
    title: "Private developer tools",
    eyebrow: "Tool directory",
    description: "Open local tools for formatter, minifier, and data workflows.",
    tone: "blue",
  });

  setCard("tools/formatters", {
    title: "Private code formatters",
    eyebrow: "Formatter directory",
    description: "Format code locally in your browser with no upload and no account.",
    tone: "green",
  });

  setCard("tools/minifiers", {
    title: "Private code minifiers",
    eyebrow: "Minifier directory",
    description: "Minify JSON, JavaScript, CSS, XML, and more without sending source code away.",
    tone: "violet",
  });

  setCard("tools/private", {
    title: "No-upload developer tools",
    eyebrow: "Private browser workflows",
    description: "Work with snippets on your device, then copy the result back to your editor.",
    tone: "slate",
  });

  Object.entries(SEO_HUBS).forEach(([family, hub], index) => {
    setCard(family, {
      title: hub.h1,
      eyebrow: family === "compare"
        ? "Tool comparisons"
        : family === "errors"
        ? "Error fixes"
        : "Practical guides",
      description: "Find the workflow, then use private browser tools locally.",
      tone: getToneForIndex(index),
    });
  });

  Object.values(LANGUAGES).forEach((language, index) => {
    setCard(language.id, {
      title: `Private ${language.name} Formatter`,
      eyebrow: "Browser formatter",
      description: `Format ${language.name} locally in your browser. Your code stays on this device.`,
      tone: getToneForIndex(index),
    });

    if (language.minify) {
      setCard(`minify/${language.id}`, {
        title: `Private ${language.name} Minifier`,
        eyebrow: "Browser minifier",
        description: `Minify ${language.name} locally in your browser. Your source stays private.`,
        tone: getToneForIndex(index + 1),
      });
    }

    getLanguageVariants(language.id)
      .filter(variant => variant.slug !== "minify")
      .forEach((variant, variantIndex) => {
        const variantSlug = `${language.id}-${variant.slug}`;
        setCard(variantSlug, {
          title: variant.h1,
          eyebrow: "Browser formatter",
          description: `Format ${language.name} locally with HappyFormatter. No upload required.`,
          tone: getToneForIndex(index + variantIndex),
        });

        if (language.minify && variant.slug === "oxc") {
          setCard(`minify/${variantSlug}`, {
            title: `Private ${language.name} OXC Minifier`,
            eyebrow: "Browser minifier",
            description: `Minify ${language.name} with OXC locally in your browser.`,
            tone: getToneForIndex(index + variantIndex + 1),
          });
        }
      });
  });

  UTILITY_CATEGORIES.forEach((category, index) => {
    setCard(`tools/${category.slug}`, {
      title: category.name,
      eyebrow: "Private utility suite",
      description: utilityDescription(category.name),
      tone: getToneForIndex(index),
    });
  });

  UTILITY_TOOLS.forEach((tool, index) => {
    const category = UTILITY_CATEGORIES.find(category => category.id === tool.category);
    setCard(`tools/${tool.slug}`, {
      title: tool.name,
      eyebrow: category?.name ?? "Private browser utility",
      description: utilityDescription(tool.name),
      tone: getToneForIndex(index),
    });
  });

  SEO_CONTENT_PAGES.forEach((page, index) => {
    setCard(pathToSlug(page.canonicalPath), {
      title: page.h1,
      eyebrow: page.family === "compare"
        ? "Tool comparison"
        : page.family === "errors"
        ? "Error fix guide"
        : "Browser workflow guide",
      description: page.family === "compare"
        ? "Compare options, then use private browser tools locally."
        : page.family === "errors"
        ? "Fix the issue with examples and a no-upload browser tool."
        : "Follow the workflow with local browser tools.",
      tone: getToneForIndex(index),
    });
  });

  return cards;
};

const cards = getCards();

export const getOgImageStaticPaths = () =>
  Array.from(cards.keys()).map(slug => ({
    params: { slug },
  }));

export const getOgImageCard = (slug: string): OgImageCard => {
  const normalizedSlug = cleanSlug(slug);
  const card = cards.get(normalizedSlug);

  if (card) {
    return card;
  }

  return {
    slug: normalizedSlug,
    title: titleCaseSlug(normalizedSlug),
    eyebrow: "HappyFormatter",
    description: defaultDescription,
    tone: "slate",
  };
};

const escapeSvg = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const wrapText = (value: string, maxChars: number, maxLines: number) => {
  const words = value.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];

  for (const word of words) {
    const currentLine = lines.at(-1);
    if (!currentLine) {
      lines.push(word);
      continue;
    }

    if (`${currentLine} ${word}`.length <= maxChars) {
      lines[lines.length - 1] = `${currentLine} ${word}`;
      continue;
    }

    if (lines.length < maxLines) {
      lines.push(word);
    } else {
      lines[lines.length - 1] = `${currentLine}...`;
      break;
    }
  }

  return lines;
};

const renderTextLines = (
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
) =>
  lines
    .map((line, index) => `<tspan x="${x}" y="${y + (index * lineHeight)}">${escapeSvg(line)}</tspan>`)
    .join("");

const renderCodeLine = (index: number, x: number, y: number, width: number, color: string) =>
  `<rect x="${x}" y="${y}" width="${width}" height="10" rx="5" fill="${color}" opacity="${
    index % 2 === 0 ? "0.16" : "0.1"
  }"/>`;

export const renderOgImageSvg = (card: OgImageCard) => {
  const tone = tones[card.tone];
  const titleLines = wrapText(card.title, 20, 3);
  const descriptionLines = wrapText(card.description, 44, 2);
  const titleFontSize = titleLines.length === 1 ? 76 : titleLines.length === 2 ? 66 : 55;
  const titleLineHeight = titleLines.length === 1 ? 82 : titleLines.length === 2 ? 72 : 60;
  const titleStartY = titleLines.length === 3 ? 248 : titleLines.length === 2 ? 276 : 324;
  const descriptionStartY = titleStartY + (titleLines.length * titleLineHeight) + 24;
  const descriptionLineHeight = 34;
  const footerY = 538;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" viewBox="0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}" role="img" aria-label="${
    escapeSvg(card.title)
  }">
  <defs>
    <radialGradient id="wash" cx="74%" cy="28%" r="70%">
      <stop offset="0%" stop-color="${tone.accent}" stop-opacity="0.13"/>
      <stop offset="46%" stop-color="${tone.accent}" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#f7f5ef" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#f7f5ef"/>
  <rect width="1200" height="630" fill="url(#wash)"/>
  <rect x="52" y="52" width="1096" height="526" rx="30" fill="#fffdf8" stroke="#121411" stroke-opacity="0.14" stroke-width="1.5"/>
  <circle cx="96" cy="98" r="7" fill="${tone.accent}"/>
  <text x="116" y="107" fill="#121411" font-family="Geist, Arial, Helvetica, sans-serif" font-size="25" font-weight="720" letter-spacing="0">HappyFormatter</text>
  <text x="910" y="106" fill="#50564f" font-family="Geist, Arial, Helvetica, sans-serif" font-size="20" font-weight="650" letter-spacing="0">private browser tools</text>
  <path d="M96 134h1008" stroke="#121411" stroke-opacity="0.12" stroke-width="1.5"/>

  <text x="96" y="205" fill="${tone.accentText}" font-family="Geist, Arial, Helvetica, sans-serif" font-size="23" font-weight="720" letter-spacing="0">${
    escapeSvg(card.eyebrow)
  }</text>
  <text x="96" y="${titleStartY}" fill="#121411" font-family="Geist, Arial, Helvetica, sans-serif" font-size="${titleFontSize}" font-weight="780" letter-spacing="0">${
    renderTextLines(titleLines, 96, titleStartY, titleLineHeight)
  }</text>
  <text x="98" y="${descriptionStartY}" fill="#4a5049" font-family="Geist, Arial, Helvetica, sans-serif" font-size="27" font-weight="500" letter-spacing="0">${
    renderTextLines(descriptionLines, 98, descriptionStartY, descriptionLineHeight)
  }</text>

  <path d="M96 ${footerY - 36}h542" stroke="#121411" stroke-opacity="0.13" stroke-width="1.5"/>
  <text x="96" y="${footerY}" fill="#121411" font-family="Geist, Arial, Helvetica, sans-serif" font-size="24" font-weight="720" letter-spacing="0">Runs locally</text>
  <text x="262" y="${footerY}" fill="#80867e" font-family="Geist, Arial, Helvetica, sans-serif" font-size="24" font-weight="720" letter-spacing="0">/</text>
  <text x="292" y="${footerY}" fill="#121411" font-family="Geist, Arial, Helvetica, sans-serif" font-size="24" font-weight="720" letter-spacing="0">No upload</text>
  <text x="432" y="${footerY}" fill="#80867e" font-family="Geist, Arial, Helvetica, sans-serif" font-size="24" font-weight="720" letter-spacing="0">/</text>
  <text x="462" y="${footerY}" fill="#121411" font-family="Geist, Arial, Helvetica, sans-serif" font-size="24" font-weight="720" letter-spacing="0">No account</text>

  <rect x="812" y="184" width="260" height="308" rx="28" fill="${tone.accentSoft}" stroke="#121411" stroke-opacity="0.09" stroke-width="1.5"/>
  <rect x="842" y="222" width="68" height="8" rx="4" fill="${tone.accent}" opacity="0.9"/>
  ${renderCodeLine(0, 842, 268, 164, "#121411")}
  ${renderCodeLine(1, 842, 306, 196, "#121411")}
  ${renderCodeLine(2, 842, 344, 138, "#121411")}
  ${renderCodeLine(3, 842, 382, 210, "#121411")}
  <path d="M842 434h174" stroke="#121411" stroke-opacity="0.16" stroke-width="1.5"/>
  <text x="812" y="548" fill="#121411" font-family="Geist, Arial, Helvetica, sans-serif" font-size="22" font-weight="760" letter-spacing="0">HappyFormatter.com</text>
</svg>`;
};
