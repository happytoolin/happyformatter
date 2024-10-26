import { createStreaming, type Formatter as DprintFormatter } from "@dprint/formatter";
import { Formatter } from "../interface";

export class MarkdownFormatter extends Formatter {
  protected config: Record<string, unknown> = {
    indentWidth: 2,
    lineWidth: 80,
  };

  #wasmUrl = "https://cdn.jsdelivr.net/npm/@dprint/markdown/plugin.wasm";
  #markdownFormatter: DprintFormatter | null = null;

  async init(): Promise<void> {
    const response = await fetch(this.#wasmUrl);
    this.#markdownFormatter = await createStreaming(response);
    this.#markdownFormatter.setConfig(this.config, {});
  }

  async formatCode(code: string): Promise<string> {
    if (!this.#markdownFormatter) {
      await this.init();
    }

    return this.#markdownFormatter!.formatText({
      filePath: "file.md",
      fileText: code,
      overrideConfig: this.config,
    });
  }

  setConfig(config: Record<string, unknown>): void {
    this.config = config;
    if (this.#markdownFormatter) {
      this.#markdownFormatter.setConfig(this.config, {});
    }
  }
}
