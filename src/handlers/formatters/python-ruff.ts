import type { Config } from "@wasm-fmt/ruff_fmt";
import { default as init, format } from "@wasm-fmt/ruff_fmt";
import { Formatter } from "../interface";

export class PythonRuffFormatter extends Formatter {
  protected config: Config = {
    indent_style: "space",
    indent_width: 4,
    line_ending: "lf",
    line_width: 88,
  };

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "main.py", this.config);
  }

  setConfig(config: Config): void {
    this.config = config;
  }

  getLanguageName(): string {
    return "python-ruff";
  }
}
