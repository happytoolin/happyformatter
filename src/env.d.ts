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
