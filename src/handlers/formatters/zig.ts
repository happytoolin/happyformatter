import init, { format } from "@wasm-fmt/zig_fmt";
import { Formatter } from "../interface";

export class ZigFormatter extends Formatter {
  protected config = {};

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code);
  }
  setConfig(config: any): void {
    this.config = config;
  }
}
