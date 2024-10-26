import { Formatter } from "../interface";

import init, { format_json, type JsonConfig } from "@wasm-fmt/web_fmt";

export class JSONFormatter extends Formatter {
  protected config: JsonConfig = {
    indent_style: "space",
    indent_width: 2,
  };

  constructor() {
    super();
  }

  async init(): Promise<void> {
    try {
      await init();
    } catch (err) {
      console.error("err", err);
    }
  }

  async formatCode(code: string): Promise<string> {
    return format_json(code, this.config);
  }

  setConfig(config: JsonConfig): void {
    this.config = config;
  }

  async validateCode(code: string): Promise<boolean> {
    try {
      JSON.parse(code);
      return true;
    } catch (error) {
      return false;
    }
  }
}
