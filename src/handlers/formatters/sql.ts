import type { Config } from "@wasm-fmt/sql_fmt";
import { Formatter } from "../formatter";

export class SQLFormatter extends Formatter {
  protected config: Config = {
    indent_style: "space",
    indent_width: 4,
    lines_between_queries: 2,
    uppercase: true,
  };

  async formatCode(code: string): Promise<string> {
    const { default: init, format } = await import("@wasm-fmt/sql_fmt");

    await init();
    return format(code, "query.sql", this.config);
  }

  setConfig(config: Config): void {
    this.config = config;
  }
}
