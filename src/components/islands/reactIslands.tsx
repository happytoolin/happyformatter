import "@vitejs/plugin-react/preamble";

import { FAQ as BasicFAQ } from "@/components/faq/faq";
import { FAQ as EnhancedFAQ } from "@/components/faq/faq-enhanced";
import Formatter from "@/components/playground/Formatter";
import { createElement } from "react";
import { createRoot, type Root } from "react-dom/client";

type IslandKind = "formatter" | "faq" | "faq-enhanced";

interface FormatterIslandProps {
  language: string;
  minifier: boolean;
}

interface FAQIslandProps {
  language: string;
  variant?: string | null;
  variantData?: { h1?: string } | null;
}

type IslandElement = HTMLElement & {
  __happyFormatterRoot?: Root;
};

function parseProps(element: HTMLElement) {
  const serializedProps = element.dataset.hfReactProps;
  if (!serializedProps) {
    return {};
  }

  try {
    return JSON.parse(serializedProps) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function renderIsland(kind: IslandKind, props: Record<string, unknown>) {
  switch (kind) {
    case "formatter":
      return createElement(Formatter, props as unknown as FormatterIslandProps);
    case "faq-enhanced":
      return createElement(EnhancedFAQ, props as unknown as FAQIslandProps);
    case "faq":
      return createElement(BasicFAQ, props as unknown as FAQIslandProps);
  }
}

function mountIsland(element: IslandElement) {
  const kind = element.dataset.hfReactIsland as IslandKind | undefined;
  if (!kind) {
    return;
  }

  const root = element.__happyFormatterRoot ?? createRoot(element);
  element.__happyFormatterRoot = root;
  root.render(renderIsland(kind, parseProps(element)));
}

export function mountHappyFormatterReactIslands() {
  document
    .querySelectorAll<IslandElement>("[data-hf-react-island]")
    .forEach(mountIsland);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountHappyFormatterReactIslands, {
    once: true,
  });
} else {
  mountHappyFormatterReactIslands();
}

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    mountHappyFormatterReactIslands();
  });
}
