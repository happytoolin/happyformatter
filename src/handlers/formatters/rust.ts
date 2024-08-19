import type { Options } from "dprint-node/options";
import { Formatter } from "../interface";

export class RustFormatter extends Formatter {
  protected config: Options = {
    indentWidth: 4,
    useTabs: false,
    newLineKind: "auto",
  };

  async formatCode(code: string): Promise<string> {
    const dprint = await import("dprint-node");
    return dprint.format("file.rs", code, this.config);
  }

  setConfig(config: Options): void {
    this.config = config;
  }
}
