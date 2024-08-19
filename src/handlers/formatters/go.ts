import { Formatter } from "../interface";

export class GoFormatter extends Formatter {
  async formatCode(code: string): Promise<string> {
    const { default: init, format } = await import("@wasm-fmt/gofmt");

    await init();
    return format(code);
  }
}
