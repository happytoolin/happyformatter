import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LANGUAGES } from "@/lib/languages";
import { buildToolFAQItems, getLanguageDisplayName, getToolModeName } from "@/lib/tool-page-seo";
import type { JSX } from "react";

interface VariantData {
  h1?: string;
}

export function FAQ({
  language,
  minify = false,
  variant = null,
  variantData = null,
}: {
  language: string;
  minify?: boolean;
  variant?: string | null;
  variantData?: VariantData | null;
}): JSX.Element {
  const isMinifier = minify || variant === "minify";
  const languageName = getLanguageDisplayName(language, LANGUAGES[language]);
  const modeName = getToolModeName(isMinifier, variant, variantData);
  const actionGerund = isMinifier ? "minifying" : "formatting";
  const questions = buildToolFAQItems({
    languageName,
    minify: isMinifier,
    modeName,
  });

  return (
    <section className="w-full border-b border-border bg-background py-16 sm:py-20">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(240px,0.28fr)_minmax(0,1fr)] lg:px-8">
        <aside className="border-y border-border py-6 lg:py-7">
          <p className="text-sm font-medium text-muted-foreground">
            Questions
          </p>
          <h2 className="mt-4 max-w-sm text-3xl font-semibold leading-tight text-foreground md:text-4xl">
            Answers while {actionGerund}.
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
            Short answers for the cases that interrupt the current run.
          </p>
        </aside>

        <Accordion
          type="single"
          collapsible
          className="divide-y divide-border border-y border-border"
        >
          {questions.map((item) => (
            <AccordionItem
              key={item.title}
              value={item.title}
              className="border-0"
            >
              <AccordionTrigger className="gap-4 px-0 py-5 text-left">
                <div className="grid flex-1 gap-1 pr-4 sm:grid-cols-[140px_1fr] sm:items-baseline sm:gap-5">
                  <span className="text-sm text-muted-foreground">
                    {item.tag}
                  </span>
                  <span className="text-base font-semibold leading-tight text-foreground sm:text-lg">
                    {item.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-0">
                <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:pl-[160px]">
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
