import type { Config } from "@wasm-fmt/dart_fmt";
import init, { format } from "@wasm-fmt/dart_fmt/web";
import { Formatter } from "../interface";

export class DartFormatter extends Formatter {
  protected config: Config = {
    line_ending: "crlf",
    line_width: 80,
  };

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "main.dart", this.config);
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
