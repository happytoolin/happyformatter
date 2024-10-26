import init, { format } from "@wasm-fmt/gofmt";
import { Formatter } from "../interface";

export class GoFormatter extends Formatter {
  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code);
  }

  async validateCode(code: string): Promise<boolean> {
    try {
      await this.formatCode(code);
      return true;
    } catch (error) {
      return false;
    }
  }
}
