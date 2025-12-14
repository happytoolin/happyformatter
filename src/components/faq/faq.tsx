import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { accordionData } from "./data";

export function FAQ({ language }: { language: string }): JSX.Element {
  const data = accordionData[language] || [];

  return (
    <div className="w-full bg-muted/30 py-16 border-t border-foreground">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-10 flex items-end justify-between border-b-2 border-primary pb-4">
          <h2 className="font-display text-4xl font-black uppercase text-foreground">
            Troubleshooting{" "}
            <span className="block text-lg font-mono font-normal tracking-tight text-muted-foreground mt-2">
              COMMON INQUIRIES & LOGS
            </span>
          </h2>
          <span className="hidden md:block font-mono text-xs font-bold bg-primary text-black px-2 py-1">
            FAQ-SYS-v3
          </span>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {data.map((item, index) => {
            const num = (index + 1).toString().padStart(2, "0");
            return (
              <AccordionItem
                key={item.title}
                value={item.title}
                className="border-2 border-foreground bg-background transition-all data-[state=open]:shadow-[6px_6px_0px_0px_var(--color-primary)]"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 hover:no-underline font-mono text-left">
                  <div className="flex items-start gap-4">
                    <span className="font-bold text-primary text-lg">#{num}</span>
                    <span className="font-bold text-foreground uppercase tracking-tight">{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="pl-10 text-base text-muted-foreground font-sans border-l-2 border-muted ml-2">
                    {item.content}
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
