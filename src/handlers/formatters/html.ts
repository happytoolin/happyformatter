import init, { format } from "@wasm-fmt/web_fmt/web";
import { Formatter } from "../interface";

type Config = NonNullable<Parameters<typeof format>[2]>;

export class HTMLFormatter extends Formatter {
  protected config: Config = {
    markup: {
      indentStyle: "space",
      indentWidth: 2,
    },
  };

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "index.html", this.config);
  }

  setConfig(config: Config): void {
    this.config = config;
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
