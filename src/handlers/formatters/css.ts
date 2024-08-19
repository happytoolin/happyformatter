import type { Options } from "prettier";
import { Formatter } from "../interface";

export class CSSFormatter extends Formatter {
  protected config: Options = {
    tabWidth: 2,
    useTabs: false,
  };

  async formatCode(code: string): Promise<string> {
    const prettier = await import("prettier/standalone");
    const parserPostCSS = await import("prettier/parser-postcss");
    return prettier.format(code, {
      ...this.config,
      parser: "css",
      plugins: [parserPostCSS],
    });
  }

  setConfig(config: Options): void {
    this.config = config;
  }
}

export class SCSSFormatter extends Formatter {
  protected config: Options = {
    tabWidth: 2,
    useTabs: false,
  };

  async formatCode(code: string): Promise<string> {
    const prettier = await import("prettier/standalone");
    const parserPostCSS = await import("prettier/parser-postcss");
    return prettier.format(code, {
      ...this.config,
      parser: "scss",
      plugins: [parserPostCSS],
    });
  }

  setConfig(config: Options): void {
    this.config = config;
  }
}
