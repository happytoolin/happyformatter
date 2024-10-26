import type { Config } from "@wasm-fmt/yamlfmt";
import init, { format } from "@wasm-fmt/yamlfmt";
import { Formatter } from "../interface";

export class YamlFormatter extends Formatter {
  protected config: Config = {
    indent_style: "space",
    indent_width: 2,
    line_ending: "crlf",
    line_width: 80,
  };

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "sample.yaml", this.config);
  }

  setConfig(config: Config): void {
    this.config = config;
  }

  async validateCode(code: string): Promise<boolean> {
    // do a formatting and see if its returning error or not
    try {
      await this.formatCode(code);
      return true;
    } catch (error) {
      return false;
    }
  }
}
