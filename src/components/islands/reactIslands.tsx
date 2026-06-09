import "@vitejs/plugin-react/preamble";

import type { ComponentType } from "react";
import type { Root } from "react-dom/client";

type IslandKind = "formatter" | "faq" | "faq-enhanced" | "utility-tool";
type HydrationStrategy = "load" | "visible" | "idle" | "interaction";

interface FormatterIslandProps {
  language: string;
  minifier: boolean;
}

interface FAQIslandProps {
  language: string;
  minify?: boolean;
  variant?: string | null;
  variantData?: { h1?: string } | null;
}

interface UtilityToolIslandProps {
  toolId: string;
}

type IslandElement = HTMLElement & {
  __happyFormatterRoot?: Root;
  __happyFormatterMounting?: boolean;
};

type IslandComponent = ComponentType<Record<string, unknown>>;

const islandLoaders = {
  formatter: () =>
    import("@/components/playground/Formatter").then(module => module.default as unknown as IslandComponent),
  "utility-tool": () =>
    import("@/components/tools/UtilityTool").then(module => module.default as unknown as IslandComponent),
  "faq-enhanced": () =>
    import("@/components/faq/faq-enhanced").then(module => module.FAQ as unknown as IslandComponent),
  faq: () => import("@/components/faq/faq").then(module => module.FAQ as unknown as IslandComponent),
} satisfies Record<IslandKind, () => Promise<IslandComponent>>;

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

function normalizeProps(kind: IslandKind, props: Record<string, unknown>) {
  switch (kind) {
    case "formatter":
      return props as unknown as FormatterIslandProps;
    case "utility-tool":
      return props as unknown as UtilityToolIslandProps;
    case "faq-enhanced":
    case "faq":
      return props as unknown as FAQIslandProps;
  }
}

async function mountIsland(element: IslandElement) {
  const kind = element.dataset.hfReactIsland as IslandKind | undefined;
  if (!kind || element.__happyFormatterMounting) {
    return;
  }

  element.__happyFormatterMounting = true;
  const [{ createElement }, { createRoot }, Component] = await Promise.all([
    import("react"),
    import("react-dom/client"),
    islandLoaders[kind](),
  ]);
  const root = element.__happyFormatterRoot ?? createRoot(element);
  element.__happyFormatterRoot = root;
  root.render(
    createElement(Component, normalizeProps(kind, parseProps(element)) as unknown as Record<string, unknown>),
  );
  element.__happyFormatterMounting = false;
}

function getHydrationStrategy(element: HTMLElement, kind: IslandKind): HydrationStrategy {
  const strategy = element.dataset.hfHydrate;
  if (strategy === "load" || strategy === "visible" || strategy === "idle" || strategy === "interaction") {
    return strategy;
  }

  return kind === "faq" || kind === "faq-enhanced" ? "visible" : "load";
}

function mountWhenIdle(element: IslandElement) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      void mountIsland(element);
    }, { timeout: 1800 });
    return;
  }

  globalThis.setTimeout(() => {
    void mountIsland(element);
  }, 1);
}

function mountWhenVisible(element: IslandElement) {
  if (!("IntersectionObserver" in window)) {
    mountWhenIdle(element);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some(entry => entry.isIntersecting)) {
      return;
    }

    observer.disconnect();
    void mountIsland(element);
  }, {
    rootMargin: "360px 0px",
  });

  observer.observe(element);
}

function mountWhenInteracted(element: IslandElement) {
  const events = ["pointerdown", "focusin", "keydown"] as const;
  const mount = () => {
    for (const eventName of events) {
      element.removeEventListener(eventName, mount);
    }

    void mountIsland(element);
  };

  for (const eventName of events) {
    element.addEventListener(eventName, mount, { once: true });
  }
}

export function mountHappyFormatterReactIslands() {
  document
    .querySelectorAll<IslandElement>("[data-hf-react-island]")
    .forEach((element) => {
      const kind = element.dataset.hfReactIsland as IslandKind | undefined;
      if (!kind || element.__happyFormatterRoot || element.__happyFormatterMounting) {
        return;
      }

      const strategy = getHydrationStrategy(element, kind);
      if (strategy === "interaction") {
        mountWhenInteracted(element);
      } else if (strategy === "visible") {
        mountWhenVisible(element);
      } else if (strategy === "idle") {
        mountWhenIdle(element);
      } else {
        void mountIsland(element);
      }
    });
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
