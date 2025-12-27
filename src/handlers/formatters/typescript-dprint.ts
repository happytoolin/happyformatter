import { createStreaming, type Formatter as DprintFormatter } from "@dprint/formatter";
import { Formatter } from "../interface";

export class TypeScriptDprintFormatter extends Formatter {
  protected config: Record<string, unknown> = {
    indentWidth: 2,
    lineWidth: 80,
    useTabs: false,
    semiColons: "prefer",
  };

  #wasmUrl = "https://plugins.dprint.dev/typescript-0.95.13.wasm";
  #tsFormatter: DprintFormatter | null = null;

  async init(): Promise<void> {
    const response = await fetch(this.#wasmUrl);
    this.#tsFormatter = await createStreaming(response);
    this.#tsFormatter.setConfig(this.config, {});
  }

  async formatCode(code: string): Promise<string> {
    if (!this.#tsFormatter) {
      await this.init();
    }

    return this.#tsFormatter!.formatText({
      filePath: "file.ts",
      fileText: code,
      overrideConfig: this.config,
    });
  }

  setConfig(config: Record<string, unknown>): void {
    this.config = config;
    if (this.#tsFormatter) {
      this.#tsFormatter.setConfig(this.config, {});
    }
  }

  getLanguageName(): string {
    return "typescript-dprint";
  }
}

export class TypeScriptTSXFormatter extends Formatter {
  protected config: Record<string, unknown> = {
    indentWidth: 2,
    lineWidth: 80,
    useTabs: false,
    semiColons: "prefer",
  };

  #wasmUrl = "https://plugins.dprint.dev/typescript-0.95.13.wasm";
  #tsxFormatter: DprintFormatter | null = null;

  async init(): Promise<void> {
    const response = await fetch(this.#wasmUrl);
    this.#tsxFormatter = await createStreaming(response);
    this.#tsxFormatter.setConfig(this.config, {});
  }

  async formatCode(code: string): Promise<string> {
    if (!this.#tsxFormatter) {
      await this.init();
    }

    return this.#tsxFormatter!.formatText({
      filePath: "file.tsx",
      fileText: code,
      overrideConfig: this.config,
    });
  }

  setConfig(config: Record<string, unknown>): void {
    this.config = config;
    if (this.#tsxFormatter) {
      this.#tsxFormatter.setConfig(this.config, {});
    }
  }

  getLanguageName(): string {
    return "tsx";
  }
}
