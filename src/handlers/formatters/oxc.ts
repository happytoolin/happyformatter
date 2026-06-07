import init, { format } from "@wasm-fmt/oxc_fmt/vite";
import { Formatter } from "../interface";

type Config = NonNullable<Parameters<typeof format>[2]>;

abstract class OxcFormatter extends Formatter {
  protected config: Config = {
    indentWidth: 2,
    lineWidth: 80,
  };

  protected abstract filename: string;

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, this.filename, this.config);
  }

  setConfig(config: Config): void {
    this.config = config;
  }

  async validateCode(code: string): Promise<boolean> {
    try {
      await this.formatCode(code);
      return true;
    } catch {
      return false;
    }
  }
}

export class JavaScriptOxcFormatter extends OxcFormatter {
  protected filename = "index.js";
}

export class TypeScriptOxcFormatter extends OxcFormatter {
  protected filename = "index.ts";
}
