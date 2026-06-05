import type { Options } from "@wasm-fmt/taplo_fmt";
import init, { format } from "@wasm-fmt/taplo_fmt/vite";
import { Formatter } from "../interface";

export class TomlFormatter extends Formatter {
  protected config: Options = {
    align_entries: true,
    column_width: 80,
    indent_string: "  ",
    trailing_newline: true,
  };

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, this.config);
  }

  setConfig(config: Options): void {
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
