import init, { format } from "@wasm-fmt/web_fmt/web";
import { Formatter } from "../interface";

type Config = NonNullable<Parameters<typeof format>[2]>;

export class JavascriptFormatter extends Formatter {
  protected config: Config = {
    indentStyle: "space",
  };

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "index.js", this.config);
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
    return format(code, "index.ts", this.config);
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
