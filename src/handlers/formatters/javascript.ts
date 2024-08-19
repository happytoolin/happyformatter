import type { Options } from "prettier";
import { Formatter } from "../interface";

export class JavascriptFormatter extends Formatter {
  protected config: Options = {
    semi: true,
    singleQuote: false,
    tabWidth: 2,
    useTabs: false,
  };

  async formatCode(code: string): Promise<string> {
    const prettier = await import("prettier/standalone");
    const parserBabel = await import("prettier/parser-babel");
    const pluginEstree = (await import("prettier/plugins/estree")).default;

    return prettier.format(code, {
      ...this.config,
      parser: "babel",
      plugins: [parserBabel, pluginEstree],
    });
  }

  setConfig(config: Options): void {
    this.config = config;
  }
}

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
