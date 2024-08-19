import type { Config } from "@wasm-fmt/lua_fmt";
import { Formatter } from "../interface";

export class LuaFormatter extends Formatter {
  protected config: Config = {
    indent_style: "space",
    line_width: 80,
    line_ending: "lf",
  };

  async formatCode(code: string): Promise<string> {
    const { default: init, format } = await import("@wasm-fmt/lua_fmt");

    await init();
    return format(code, "file.lua", this.config);
  }

  setConfig(config: Config): void {
    this.config = config;
  }
}
