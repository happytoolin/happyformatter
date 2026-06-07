/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "happyformatter:modern-monaco-runtime" {
  export const modernMonacoEditorCoreUrl: string;
}

declare module "prettier2/standalone" {
  const prettier: {
    format: (code: string, options: Record<string, unknown>) => string;
  };
  export default prettier;
}

declare module "html-minifier-terser/dist/htmlminifier.esm.bundle" {
  export { minify } from "html-minifier-terser";
}

declare module "@wasm-fmt/graphql_fmt/vite" {
  export * from "@wasm-fmt/graphql_fmt";
  export default function init(): Promise<unknown>;
}

declare module "@wasm-fmt/malva_fmt/vite" {
  export * from "@wasm-fmt/malva_fmt";
  export default function init(): Promise<unknown>;
}

declare module "@wasm-fmt/markup_fmt/vite" {
  export * from "@wasm-fmt/markup_fmt";
  export default function init(): Promise<unknown>;
}

declare module "@wasm-fmt/oxc_fmt/vite" {
  export * from "@wasm-fmt/oxc_fmt";
  export default function init(): Promise<unknown>;
}
