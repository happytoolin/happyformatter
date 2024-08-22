import dprint from "dprint-node";
import type { Options } from "dprint-node/options";
import { Formatter } from "../interface";

export class RustFormatter extends Formatter {
  protected config: Options = {
    indentWidth: 4,
    useTabs: false,
    newLineKind: "auto",
  };

  async init(): Promise<void> {
    dprint.format("file.rs", "", this.config);
  }

  async formatCode(code: string): Promise<string> {
    return dprint.format("file.rs", code, this.config);
  }

  setConfig(config: Options): void {
    this.config = config;
  }
}
