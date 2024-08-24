import { createStreaming, type GlobalConfiguration } from "@dprint/formatter";
import { Formatter } from "../interface";

export class MarkdownFormatter extends Formatter {
  protected config: GlobalConfiguration = {
    indentWidth: 2,
    lineWidth: 80,
  };

  #wasmUrl = "https://plugins.dprint.dev/markdown-0.17.6.wasm";
  #markdownFormatter: any;

  async init(): Promise<void> {
    const response = await fetch(this.#wasmUrl, {
      headers: {
        "Cache-Control": "max-age=31536000, immutable",
      },
    });
    this.#markdownFormatter = await createStreaming(response);
    this.#markdownFormatter.setConfig(this.config, {});
  }

  async formatCode(code: string): Promise<string> {
    if (!this.#markdownFormatter) {
      await this.init();
    }

    return this.#markdownFormatter.formatText({
      filePath: "file.md",
      fileText: code,
    });
  }

  setConfig(config: GlobalConfiguration): void {
    this.config = config;
    if (this.#markdownFormatter) {
      this.#markdownFormatter.setConfig(this.config, {});
    }
  }
}
