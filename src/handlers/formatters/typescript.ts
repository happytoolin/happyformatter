import type { Options } from "prettier";
import { Formatter } from "../formatter";

export class TypescriptFormatter extends Formatter {
  protected config: Options = {
    semi: true,
    singleQuote: false,
    tabWidth: 2,
    useTabs: false,
  };

  async formatCode(code: string): Promise<string> {
    const prettier = await import("prettier/standalone");
    const parserTypescript = await import("prettier/parser-typescript");
    const pluginEstree = (await import("prettier/plugins/estree")).default;

    return prettier.format(code, {
      ...this.config,
      parser: "typescript",
      plugins: [parserTypescript, pluginEstree],
    });
  }

  setConfig(config: Options): void {
    this.config = config;
  }
}
