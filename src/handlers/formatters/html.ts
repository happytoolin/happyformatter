import type { Config } from "@wasm-fmt/web_fmt";
import init, { format } from "@wasm-fmt/web_fmt";
import { Formatter } from "../interface";

export class HTMLFormatter extends Formatter {
  protected config: Config = {
    markup: {
      indent_style: "space",
      indent_width: 2,
    },
  };

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "index.html");
  }

  setConfig(config: Config): void {
    this.config = config;
  }

  async validateCode(code: string): Promise<boolean> {
    try {
      await this.formatCode(code);
      return true;
    } catch (error) {
      return false;
    }
  }
}
