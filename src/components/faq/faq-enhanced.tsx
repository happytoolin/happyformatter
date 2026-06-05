import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { JSX } from "react";

interface VariantData {
  h1?: string;
}

const languageNames: Record<string, string> = {
  c: "C",
  cpp: "C++",
  csharp: "C#",
  css: "CSS",
  dart: "Dart",
  go: "Go",
  html: "HTML",
  java: "Java",
  javascript: "JavaScript",
  "javascript-biome": "JavaScript Biome",
  json: "JSON",
  lua: "Lua",
  markdown: "Markdown",
  objectivec: "Objective-C",
  objectivecpp: "Objective-C++",
  php: "PHP",
  "php-mago": "PHP Mago",
  proto: "Protocol Buffers",
  python: "Python",
  "python-ruff": "Python Ruff",
  rust: "Rust",
  scss: "SCSS",
  sql: "SQL",
  swift: "Swift",
  toml: "TOML",
  typescript: "TypeScript",
  "typescript-biome": "TypeScript Biome",
  xml: "XML",
  yaml: "YAML",
  zig: "Zig",
};

const modeNames: Record<string, string> = {
  beautifier: "beautifier",
  biome: "Biome formatting pass",
  free: "formatter",
  minify: "minifier",
  online: "formatter",
  pretty: "pretty printer",
  prettify: "pretty printer",
  private: "private formatter",
  ruff: "Ruff formatting pass",
  secure: "private formatter",
  validator: "validator",
};

const getLanguageName = (value: string) => {
  if (languageNames[value]) {
    return languageNames[value];
  }

  return value
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const getModeName = (
  variant: string | null | undefined,
  variantData: VariantData | null | undefined,
) => {
  if (variant && modeNames[variant]) {
    return modeNames[variant];
  }

  if (variantData?.h1) {
    return variantData.h1.replace(/online|free/gi, "").trim()
      || "formatter";
  }

  return "formatter";
};

const getQuestions = (languageName: string, modeName: string) => [
  {
    tag: "Privacy",
    title: "Is my code uploaded?",
    content:
      `No. The ${languageName} formatter runs in your browser. Still, do not paste secrets into any online tool.`,
  },
  {
    tag: "Changes",
    title: `What does the ${modeName} change?`,
    content: "It cleans indentation, spacing, and line breaks. It does not rewrite program logic.",
  },
  {
    tag: "Errors",
    title: "What if Format fails?",
    content: "Fix the highlighted syntax issue, then run Format again.",
  },
  {
    tag: "Access",
    title: "Do I need to sign in?",
    content: "No. Open the page, paste code, format, and copy the result.",
  },
];

export function FAQ({
  language,
  variant = null,
  variantData = null,
}: {
  language: string;
  variant?: string | null;
  variantData?: VariantData | null;
  seoData?: unknown;
}): JSX.Element {
  const languageName = getLanguageName(language);
  const modeName = getModeName(variant, variantData);
  const questions = getQuestions(languageName, modeName);

  return (
    <section className="w-full border-b border-border bg-background py-16 sm:py-20">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(240px,0.28fr)_minmax(0,1fr)] lg:px-8">
        <aside className="border-y border-border py-6 lg:py-7">
          <p className="font-mono text-xs uppercase text-muted-foreground">
            Troubleshoot
          </p>
          <h2 className="mt-5 max-w-sm text-4xl font-semibold leading-none text-foreground md:text-5xl">
            Quick answers.
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
            Common questions about the {languageName} formatter.
          </p>
        </aside>

        <Accordion
          type="single"
          collapsible
          className="divide-y divide-border border-y border-border"
        >
          {questions.map((item, index) => (
            <AccordionItem
              key={item.title}
              value={item.title}
              className="border-0"
            >
              <AccordionTrigger className="gap-4 px-0 py-5 text-left hover:no-underline">
                <div className="grid flex-1 grid-cols-[48px_82px_1fr] items-baseline gap-3 pr-4 max-sm:grid-cols-[42px_1fr]">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs uppercase text-muted-foreground max-sm:hidden">
                    {item.tag}
                  </span>
                  <span className="text-base font-semibold leading-tight text-foreground sm:text-lg">
                    {item.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-0">
                <p className="max-w-3xl pl-[143px] text-sm leading-6 text-muted-foreground max-sm:pl-[54px]">
                  {item.content}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
