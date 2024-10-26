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

  async validateCode(code: string): Promise<boolean> {
    try {
      new Function(code);
      return true;
    } catch (error) {
      return false;
    }
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

  async validateCode(code: string): Promise<boolean> {
    // import typescript from 'typescript';
    const typescript = await import("typescript");
    try {
      const res = typescript.transpileModule(code, {});
      const jscode = res.outputText;
      new Function(jscode);
      return true;
    } catch (error) {
      return false;
    }
  }
}
