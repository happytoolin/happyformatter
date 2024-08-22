import type { Config } from "@wasm-fmt/web_fmt";
import init, { format } from "@wasm-fmt/web_fmt";
import { Formatter } from "../interface";

export class JavascriptFormatter extends Formatter {
  protected config: Config = {
    indent_style: "space",
  };

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "index.js");
  }

  setConfig(config: Config): void {
    this.config = config;
  }
}

export class TypescriptFormatter extends Formatter {
  protected config: Config = {};

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "index.ts");
  }

  setConfig(config: Config): void {
    this.config = config;
  }
}
