import type { FormatOptions } from "@wasm-fmt/shfmt";
import init, { format } from "@wasm-fmt/shfmt/vite";
import { Formatter } from "../interface";

export class ShellFormatter extends Formatter {
  protected config: FormatOptions = {
    indent: 2,
    simplify: true,
  };

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "script.sh", this.config);
  }

  setConfig(config: FormatOptions): void {
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
