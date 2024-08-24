import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { accordionData } from "./data";

export function FAQ({ language }: { language: string }): JSX.Element {
  const data = accordionData[language];

  return (
    <div className="w-full bg-secondary">
      <div className="w-full max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {data.map((item, index) => (
            <AccordionItem key={item.title} value={item.title}>
              <AccordionTrigger aria-expanded={index === 0 ? "true" : "false"}>{item.title}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
