import { createStreaming, type Formatter as DprintFormatter } from "@dprint/formatter";
import { Formatter } from "../interface";

export class JavaScriptDprintFormatter extends Formatter {
  protected config: Record<string, unknown> = {
    indentWidth: 2,
    lineWidth: 80,
    useTabs: false,
    semiColons: "prefer",
  };

  #wasmUrl = "https://plugins.dprint.dev/typescript-0.95.13.wasm";
  #jsFormatter: DprintFormatter | null = null;

  async init(): Promise<void> {
    const response = await fetch(this.#wasmUrl);
    this.#jsFormatter = await createStreaming(response);
    this.#jsFormatter.setConfig(this.config, {});
  }

  async formatCode(code: string): Promise<string> {
    if (!this.#jsFormatter) {
      await this.init();
    }

    return this.#jsFormatter!.formatText({
      filePath: "file.js",
      fileText: code,
      overrideConfig: this.config,
    });
  }

  setConfig(config: Record<string, unknown>): void {
    this.config = config;
    if (this.#jsFormatter) {
      this.#jsFormatter.setConfig(this.config, {});
    }
  }

  getLanguageName(): string {
    return "javascript-dprint";
  }
}

export class JavaScriptJSXFormatter extends Formatter {
  protected config: Record<string, unknown> = {
    indentWidth: 2,
    lineWidth: 80,
    useTabs: false,
    semiColons: "prefer",
  };

  #wasmUrl = "https://plugins.dprint.dev/typescript-0.95.13.wasm";
  #jsxFormatter: DprintFormatter | null = null;

  async init(): Promise<void> {
    const response = await fetch(this.#wasmUrl);
    this.#jsxFormatter = await createStreaming(response);
    this.#jsxFormatter.setConfig(this.config, {});
  }

  async formatCode(code: string): Promise<string> {
    if (!this.#jsxFormatter) {
      await this.init();
    }

    return this.#jsxFormatter!.formatText({
      filePath: "file.jsx",
      fileText: code,
      overrideConfig: this.config,
    });
  }

  setConfig(config: Record<string, unknown>): void {
    this.config = config;
    if (this.#jsxFormatter) {
      this.#jsxFormatter.setConfig(this.config, {});
    }
  }

  getLanguageName(): string {
    return "jsx";
  }
}
