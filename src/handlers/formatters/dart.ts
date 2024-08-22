import type { LayoutConfig } from "@wasm-fmt/dart_fmt";
import init, { format } from "@wasm-fmt/dart_fmt";
import { Formatter } from "../interface";

export class DartFormatter extends Formatter {
  protected config: LayoutConfig = {
    line_ending: "crlf",
    line_width: 80,
  };

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "main.dart", this.config);
  }
  setConfig(config: LayoutConfig): void {
    this.config = config;
  }
}
