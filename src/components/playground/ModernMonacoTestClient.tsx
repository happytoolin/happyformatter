import { createElement } from "react";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("modern-monaco-test-root");

function renderMountError(message: string) {
  if (!rootElement) {
    return;
  }

  rootElement.innerHTML = `<section class="border-b border-border bg-background">
    <div class="mx-auto max-w-350 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div class="rounded-lg border border-border bg-card p-5 text-sm text-foreground">
        <p class="font-medium text-destructive">Modern Monaco playground failed to load.</p>
        <pre data-modern-monaco-error class="mt-3 max-h-48 overflow-auto whitespace-pre-wrap rounded-md bg-secondary p-3 font-mono text-xs"></pre>
      </div>
    </div>
  </section>`;

  rootElement.querySelector("[data-modern-monaco-error]")!.textContent = message;
}

async function mountModernMonacoTest() {
  if (!rootElement) {
    return;
  }

  rootElement.dataset.modernMonacoClient = "loading";

  try {
    if (import.meta.env.DEV) {
      await import("@vitejs/plugin-react/preamble");
    }

    const { default: ModernMonacoTest } = await import("./ModernMonacoTest");
    rootElement.dataset.modernMonacoClient = "ready";
    createRoot(rootElement).render(createElement(ModernMonacoTest));
  } catch (caught) {
    rootElement.dataset.modernMonacoClient = "error";
    renderMountError(caught instanceof Error ? caught.message : "Unknown error");
  }
}

void mountModernMonacoTest();
