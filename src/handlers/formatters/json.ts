import { Formatter } from "../interface";

import init, { format } from "@wasm-fmt/web_fmt/web";

type JsonConfig = NonNullable<NonNullable<Parameters<typeof format>[2]>["json"]>;

export class JSONFormatter extends Formatter {
  protected config: JsonConfig = {
    indentStyle: "space",
    indentWidth: 2,
  };

  constructor() {
    super();
  }

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "index.json", { json: this.config });
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
