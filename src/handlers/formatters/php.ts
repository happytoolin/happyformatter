// @ts-ignore
import phpPlugin from "@prettier/plugin-php/standalone";
import type { Options } from "prettier";
import prettier from "prettier/standalone";
import { Formatter } from "../interface";

export class PHPFormatter extends Formatter {
  protected config: Options = {};

  async init(): Promise<void> {
    return;
  }

  async formatCode(code: string): Promise<string> {
    return prettier.format(code, {
      plugins: [phpPlugin],
      parser: "php",
    });
  }

  setConfig(config: Options): void {
    this.config = config;
  }
}
