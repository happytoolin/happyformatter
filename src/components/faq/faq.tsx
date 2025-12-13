import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { JSX } from "react";
import { accordionData } from "./data";

export function FAQ({ language }: { language: string }): JSX.Element {
  const data = accordionData[language];

  return (
    <div className="w-full border-t border-border/40 bg-muted/10">
      <div className="w-full max-w-4xl mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Common questions about the {language} formatter</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {data.map((item, index) => (
            <AccordionItem
              key={item.title}
              value={item.title}
              className="border border-border rounded-lg bg-card px-4 shadow-xs"
            >
              <AccordionTrigger
                className="hover:no-underline py-4 text-base font-medium"
                aria-expanded={index === 0 ? "true" : "false"}
              >
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 text-base leading-relaxed">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
