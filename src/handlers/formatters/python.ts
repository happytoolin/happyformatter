import type { Config } from "@wasm-fmt/ruff_fmt";
import init, { format } from "@wasm-fmt/ruff_fmt";
import { Formatter } from "../interface";

export class PythonFormatter extends Formatter {
  protected config: Config = {
    indent_style: "tab",
    indent_width: 4,
    line_ending: "lf",
    line_width: 80,
  };

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "", this.config);
  }

  setConfig(config: Config): void {
    this.config = config;
  }
}
