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
    <section className="w-full border-b border-border bg-card py-10 sm:py-12">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(220px,0.3fr)_minmax(0,1fr)] lg:px-8">
        <aside className="max-w-md">
          <p className="text-sm font-medium text-muted-foreground">
            Questions
          </p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground">
            Quick answers while {actionGerund}.
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
