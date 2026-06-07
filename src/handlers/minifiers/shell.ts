import type { FormatOptions } from "@wasm-fmt/shfmt";
import init, { format } from "@wasm-fmt/shfmt/vite";
import { Minifier } from "../interface";

export class ShellMinifier extends Minifier {
  protected config: FormatOptions = {
    minify: true,
    simplify: true,
  };

  async init(): Promise<void> {
    await init();
  }

  async minifyCode(code: string): Promise<string> {
    return format(code, "script.sh", this.config);
  }

  setConfig(config: FormatOptions): void {
    this.config = { ...this.config, ...config };
  }
}
