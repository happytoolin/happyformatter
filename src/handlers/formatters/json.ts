import { Formatter } from "../interface";

import init, { format_json, type JsonConfig } from "@wasm-fmt/web_fmt";

export class JSONFormatter extends Formatter {
  protected config: JsonConfig = {
    indent_style: "space",
    indent_width: 2,
  };

  async formatCode(code: string): Promise<string> {
    await init();

    return format_json(code, this.config);
  }

  setConfig(config: JsonConfig): void {
    this.config = config;
  }
}
