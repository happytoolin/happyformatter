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
}): JSX.Element {
  const languageName = getLanguageName(language);
  const modeName = getModeName(variant, variantData);
  const questions = getQuestions(languageName, modeName);

  return (
    <section className="w-full border-b border-border bg-card py-10 sm:py-12">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(220px,0.3fr)_minmax(0,1fr)] lg:px-8">
        <aside className="max-w-md">
          <p className="text-sm font-medium text-muted-foreground">
            Questions
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
            Quick answers for interrupted runs.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Privacy, output changes, syntax errors, and access stay close to the editor.
          </p>
        </aside>

        <Accordion
          type="single"
          collapsible
          className="overflow-hidden rounded-lg border border-border bg-background"
        >
          {questions.map((item) => (
            <AccordionItem
              key={item.title}
              value={item.title}
              className="border-0"
            >
              <AccordionTrigger className="gap-4 rounded-none border-b border-border px-4 py-4 text-left transition-colors hover:bg-secondary data-[state=open]:bg-secondary">
                <div className="grid flex-1 gap-1 pr-4 sm:grid-cols-[120px_1fr] sm:items-baseline sm:gap-5">
                  <span className="text-sm text-muted-foreground">
                    {item.tag}
                  </span>
                  <span className="text-base font-semibold leading-tight text-foreground">
                    {item.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-b border-border bg-background px-4 pb-5 pt-0">
                <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:pl-[140px]">
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
