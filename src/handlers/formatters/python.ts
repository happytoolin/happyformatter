import type { Config } from "@wasm-fmt/ruff_fmt";
import { Formatter } from "../formatter";

export class PythonFormatter extends Formatter {
  protected config: Config = {
    indent_style: "tab",
    indent_width: 4,
    line_ending: "lf",
    line_width: 80,
  };

  async formatCode(code: string): Promise<string> {
    const { default: init, format } = await import("@wasm-fmt/ruff_fmt");

    await init();
    return format(code, "", this.config);
  }

  setConfig(config: Config): void {
    this.config = config;
  }
}
