import type { Options } from "prettier";
import { Formatter } from "../interface";

export class JSONFormatter extends Formatter {
  protected config: Options = {
    tabWidth: 2,
    useTabs: false,
  };

  async formatCode(code: string): Promise<string> {
    const prettier = await import("prettier/standalone");
    const parserBabel = await import("prettier/parser-babel");
    const pluginEstree = (await import("prettier/plugins/estree")).default;

    return prettier.format(code, {
      ...this.config,
      parser: "json",
      plugins: [parserBabel, pluginEstree],
    });
  }

  setConfig(config: Options): void {
    this.config = config;
  }
}
