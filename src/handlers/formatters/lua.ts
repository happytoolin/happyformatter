import type { Config } from "@wasm-fmt/lua_fmt";
import init, { format } from "@wasm-fmt/lua_fmt";
import { Formatter } from "../interface";

export class LuaFormatter extends Formatter {
  protected config: Config = {
    indent_style: "space",
    line_width: 80,
    line_ending: "lf",
  };
  async init(): Promise<void> {
    await init();
  }
  async formatCode(code: string): Promise<string> {
    return format(code, "file.lua", this.config);
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
