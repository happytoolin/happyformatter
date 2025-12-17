import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getPageFAQs } from "@/lib/generated-seo-utils.js";
import type { JSX } from "react";
import { accordionData } from "./data";

export function FAQ({ language, variant, variantData, seoData }: {
  language: string;
  variant?: string | null;
  variantData?: any;
  seoData?: any;
}): JSX.Element {
  // Try to get generated FAQs first
  let data = getPageFAQs(language, variant, seoData);

  // Fall back to existing accordionData if no generated data
  if (data.length === 0) {
    data = accordionData[language] || [];
  }

  // Inject variant-specific questions at the beginning (keep existing logic)
  if (variant && variantData) {
    const variantQuestions = getVariantQuestions(variant, language, variantData);
    data = [...variantQuestions, ...data];
  }

  // Helper function to get variant-specific questions (keep existing logic)
  function getVariantQuestions(
    variantType: string,
    lang: string,
    _data: any,
  ): Array<{ title: string; content: string }> {
    const questions = [];
    const langName = lang.charAt(0).toUpperCase() + lang.slice(1);

    switch (variantType) {
      case "free":
        questions.push({
          title: `Is this ${langName} formatter really free?`,
          content:
            `Yes, this ${langName} formatter is completely free to use. There are no hidden costs, premium features, or usage limits. You can format as much ${langName} code as you need without paying anything or creating an account.`,
        });
        questions.push({
          title: `Do I need to register to use the free ${langName} formatter?`,
          content:
            `No registration required! You can start formatting your ${langName} code immediately. Just paste your code and format it instantly without any signup process or personal information.`,
        });
        break;

      case "online":
        questions.push({
          title: `How does the online ${langName} formatter work?`,
          content:
            `This ${langName} formatter works entirely in your web browser. Your code is processed locally on your device using advanced JavaScript libraries, so you don't need to install any software or wait for server processing.`,
        });
        questions.push({
          title: `Can I use this ${langName} formatter on mobile devices?`,
          content:
            `Yes! Since this is an online ${langName} formatter, it works on any device with a web browser - desktop, tablet, or mobile. The interface is responsive and adapts to your screen size.`,
        });
        break;

      case "secure":
      case "private":
        questions.push({
          title: `How is this ${langName} formatter more secure than others?`,
          content:
            `Unlike server-side formatters, this tool processes your ${langName} code entirely within your browser. Your code never leaves your device, is never sent to our servers, and is never stored anywhere. This makes it completely secure for sensitive or proprietary code.`,
        });
        questions.push({
          title: `Is my ${langName} code safe from prying eyes?`,
          content:
            `Absolutely! Since all processing happens client-side in your browser, nobody else can access your ${langName} code - not us, not third parties, not anyone. Your privacy is completely protected.`,
        });
        questions.push({
          title: `Can I use this formatter offline?`,
          content:
            `Once the page is loaded, you can continue using this ${langName} formatter offline. The formatting libraries are cached in your browser, allowing you to format code without an internet connection.`,
        });
        break;

      // Keep all your existing variant cases...
      case "beautifier":
        questions.push({
          title: `What makes this a good ${langName} beautifier?`,
          content:
            `This ${langName} beautifier uses intelligent algorithms to transform minified or poorly formatted code into readable, properly indented code. It preserves functionality while dramatically improving readability with consistent formatting rules.`,
        });
        questions.push({
          title: `Can this beautifier handle minified ${langName} code?`,
          content:
            `Yes! This ${langName} beautifier excels at transforming minified code into beautifully formatted, readable code. It automatically detects structure and applies appropriate indentation, spacing, and line breaks.`,
        });
        break;

      case "validator":
        questions.push({
          title: `What errors can this ${langName} validator detect?`,
          content:
            `This ${langName} validator can detect syntax errors, structural problems, missing semicolons, unmatched brackets, and many other code issues. It provides detailed error messages with line and column numbers to help you quickly fix problems.`,
        });
        questions.push({
          title: `Does this ${langName} validator check for best practices?`,
          content:
            `While primarily focused on syntax validation, this tool also identifies common issues that might affect code quality. However, for comprehensive linting and best practices checking, consider using specialized linting tools.`,
        });
        break;

      case "minify":
        questions.push({
          title: `How much can this ${langName} minifier reduce file size?`,
          content:
            `The size reduction depends on your code structure, but typically you can expect 20-60% reduction in file size. This ${langName} minifier removes unnecessary whitespace, comments, and optimizes the code without changing functionality.`,
        });
        questions.push({
          title: `Will minifying my ${langName} code affect performance?`,
          content:
            `Minified ${langName} code actually improves performance by reducing download size and parse time. This minifier preserves all functionality while making your code more efficient for production use.`,
        });
        break;

      case "biome":
        questions.push({
          title: `What is Biome for ${langName} formatting?`,
          content:
            `Biome is a fast, modern toolchain for ${langName} development. It provides extremely fast formatting, linting, and bundling. This formatter uses Biome's standards to ensure your code follows best practices and consistent style.`,
        });
        break;

      case "ruff":
        questions.push({
          title: `What is Ruff for ${langName} formatting?`,
          content:
            `Ruff is an extremely fast Python linter and formatter written in Rust. When used as a ${langName} formatter, it applies consistent formatting rules and can also catch linting issues, making it a comprehensive code quality tool.`,
        });
        break;

      case "mago":
        questions.push({
          title: `What is Mago for ${langName} formatting?`,
          content:
            `Mago is a modern PHP formatter that focuses on code consistency and readability. This ${langName} formatter uses Mago's rules to ensure your PHP code follows modern formatting standards and best practices.`,
        });
        break;
    }

    return questions;
  }

  return (
    <div className="w-full bg-foreground text-background py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-background/20 pb-8 mb-12">
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl uppercase tracking-tighter text-transparent stroke-text break-words"
            style={{ WebkitTextStroke: "1px var(--background)" }}
          >
            {data.length > 0 && getPageFAQs(language, variant).length > 0
              ? "Frequently Asked Questions"
              : "Troubleshoot"}
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
                    <span className="font-display text-lg md:text-xl lg:text-2xl uppercase leading-tight break-words">
                      {item.title}
                    </span>
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
