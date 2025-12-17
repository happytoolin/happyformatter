import { default as init, format } from "@wasm-fmt/biome_fmt";
import { Formatter } from "../interface";

export class TypeScriptBiomeFormatter extends Formatter {
  protected config: any = {};

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "main.ts", this.config);
  }

  setConfig(config: any): void {
    this.config = { ...this.config, ...config };
  }

  getLanguageName(): string {
    return "typescript-biome";
  }
}
