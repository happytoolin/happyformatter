import { createFromBuffer, type Formatter as DprintFormatter } from "@dprint/formatter";
import markdownWasmUrl from "@dprint/markdown/plugin.wasm?url";
import { Formatter } from "../interface";

export class MarkdownFormatter extends Formatter {
  protected config: Record<string, unknown> = {
    indentWidth: 2,
    lineWidth: 80,
  };

  #markdownFormatter: DprintFormatter | null = null;
  #initPromise: Promise<void> | null = null;

  async init(): Promise<void> {
    this.#initPromise ??= (async () => {
      const response = await fetch(markdownWasmUrl);

      if (!response.ok) {
        throw new Error(`Could not load Markdown formatter (${response.status})`);
      }

      const wasmModule = await response.arrayBuffer();
      this.#markdownFormatter = createFromBuffer(wasmModule);
      this.#markdownFormatter.setConfig(this.config, {});
    })();

    await this.#initPromise;
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
