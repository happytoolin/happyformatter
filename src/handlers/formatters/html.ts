import type { Config } from "@wasm-fmt/web_fmt";
import init, { format } from "@wasm-fmt/web_fmt";
import { Formatter } from "../formatter";

export class HTMLFormatter extends Formatter {
  protected config: Config = {
    markup: {
      indent_style: "space",
      indent_width: 2,
    },
  };

  async formatCode(code: string): Promise<string> {
    await init();

    return format(code, "index.html");
  }
  setConfig(config: Config): void {
    this.config = config;
  }
}
