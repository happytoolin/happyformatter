import init, { format } from "@wasm-fmt/malva_fmt/vite";
import { Formatter } from "../interface";

type Config = NonNullable<Parameters<typeof format>[2]>;

abstract class MalvaFormatter extends Formatter {
  protected config: Config = {
    indentWidth: 2,
    lineWidth: 80,
  };

  protected abstract filename: string;

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, this.filename, this.config);
  }

  setConfig(config: Config): void {
    this.config = config;
  }

  async validateCode(code: string): Promise<boolean> {
    try {
      await this.formatCode(code);
      return true;
    } catch {
      return false;
    }
  }
}

export class SCSSMalvaFormatter extends MalvaFormatter {
  protected filename = "style.scss";
}

export class SassFormatter extends MalvaFormatter {
  protected filename = "style.sass";
}

export class LessFormatter extends MalvaFormatter {
  protected filename = "style.less";
}
