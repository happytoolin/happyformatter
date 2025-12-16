import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { JSX } from "react";
import { accordionData } from "./data";

export function FAQ({ language }: { language: string }): JSX.Element {
  const data = accordionData[language] || [];

  return (
    <div className="w-full bg-foreground text-background py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex items-end justify-between border-b border-background/20 pb-8 mb-12">
          <h2
            className="font-display text-5xl md:text-7xl uppercase tracking-tighter text-transparent stroke-text"
            style={{ WebkitTextStroke: "1px var(--background)" }}
          >
            Troubleshoot
          </h2>
          <span className="font-mono text-xs text-accent uppercase tracking-widest hidden md:block">
            Database // {language}
          </span>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-0 border-t border-background/20">
          {data.map((item, index) => {
            const num = (index + 1).toString().padStart(2, "0");
            return (
              <AccordionItem
                key={item.title}
                value={item.title}
                className="border-b border-background/20 transition-all hover:bg-background/5"
              >
                <AccordionTrigger className="px-0 py-6 hover:no-underline hover:text-primary transition-colors">
                  <div className="flex items-start gap-6 text-left">
                    <span className="font-mono text-sm opacity-50 pt-1">/{num}</span>
                    <span className="font-display text-xl md:text-2xl uppercase leading-tight">{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pt-2">
                  <div className="pl-12 md:pl-16 pr-4">
                    <p className="font-serif text-lg leading-relaxed text-background/80 max-w-2xl">
                      {item.content}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
