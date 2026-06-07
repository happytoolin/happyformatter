import init, { format } from "@wasm-fmt/graphql_fmt/vite";
import { Formatter } from "../interface";

type Config = NonNullable<Parameters<typeof format>[1]>;

export class GraphQLFormatter extends Formatter {
  protected config: Config = {
    indentWidth: 2,
    printWidth: 80,
  };

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, this.config);
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
