import type { Config } from "@wasm-fmt/yamlfmt";
import { Formatter } from "../interface";

export class YamlFormatter extends Formatter {
  protected config: Config = {
    indent_style: "space",
    indent_width: 2,
    line_ending: "crlf",
    line_width: 80,
  };

  async formatCode(code: string): Promise<string> {
    const { default: init, format } = await import("@wasm-fmt/yamlfmt");

    await init();
    return format(code, "sample.yaml", this.config);
  }

  setConfig(config: Config): void {
    this.config = config;
  }
}
