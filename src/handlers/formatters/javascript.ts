import type { Config } from "@wasm-fmt/web_fmt";
import init, { format } from "@wasm-fmt/web_fmt";
import { Formatter } from "../interface";

export class JavascriptFormatter extends Formatter {
  protected config: Config = {
    indent_style: "space",
  };

  async formatCode(code: string): Promise<string> {
    await init();

    return format(code, "index.js");
  }

  setConfig(config: Config): void {
    this.config = config;
  }
}

export class TypescriptFormatter extends Formatter {
  protected config: Config = {};

  async formatCode(code: string): Promise<string> {
    await init();

    return format(code, "index.ts");
  }

  setConfig(config: Config): void {
    this.config = config;
  }
}
