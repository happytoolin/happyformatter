import type { LayoutConfig } from "@wasm-fmt/dart_fmt";
import { Formatter } from "../formatter";

export class DartFormatter extends Formatter {
  protected config: LayoutConfig = {
    line_ending: "crlf",
    line_width: 80,
  };

  async formatCode(code: string): Promise<string> {
    const { default: init, format } = await import("@wasm-fmt/dart_fmt");

    await init();
    return format(code, "main.dart", this.config);
  }
  setConfig(config: LayoutConfig): void {
    this.config = config;
  }
}
