import type { Config } from "@wasm-fmt/sql_fmt";
import init, { format } from "@wasm-fmt/sql_fmt";
import { Formatter } from "../interface";

export class SQLFormatter extends Formatter {
  protected config: Config = {
    indent_style: "space",
    indent_width: 4,
    lines_between_queries: 2,
    uppercase: true,
  };

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "query.sql", this.config);
  }

  setConfig(config: Config): void {
    this.config = config;
  }
}
