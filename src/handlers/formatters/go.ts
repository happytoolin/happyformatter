import init, { format } from "@wasm-fmt/gofmt";
import { Formatter } from "../interface";

export class GoFormatter extends Formatter {
  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code);
  }
}
