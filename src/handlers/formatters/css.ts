import initLightningCSS, { transform } from "lightningcss-wasm";
import type { Options } from "prettier";
import { Formatter } from "../interface";

export class CSSFormatter extends Formatter {
  protected config: Options = {
    tabWidth: 2,
    useTabs: false,
  };

  async init(): Promise<void> {
    await initLightningCSS();
  }

  async formatCode(code: string): Promise<string> {
    try {
      const { code: formattedCode } = transform({
        filename: "style.css",
        code: new TextEncoder().encode(code),
        minify: false,
        ...this.config,
      });

      return new TextDecoder().decode(formattedCode);
    } catch (error) {
      console.error("Error formatting CSS code:", error);
      throw error;
    }
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

  async init(): Promise<void> {
    await initLightningCSS();
  }

  async formatCode(code: string): Promise<string> {
    const { code: formattedCode } = transform({
      filename: "style.scss",
      code: new TextEncoder().encode(code),
      minify: false,
      ...this.config,
    });

    return new TextDecoder().decode(formattedCode);
  }

  setConfig(config: Options): void {
    this.config = config;
  }
}
