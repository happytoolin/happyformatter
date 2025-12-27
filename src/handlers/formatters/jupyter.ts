import { createStreaming, type Formatter as DprintFormatter } from "@dprint/formatter";
import { Formatter } from "../interface";

export class JupyterFormatter extends Formatter {
  protected config: Record<string, unknown> = {
    indentWidth: 2,
    lineWidth: 80,
  };

  #wasmUrl = "https://plugins.dprint.dev/jupyter-0.2.1.wasm";
  #jupyterFormatter: DprintFormatter | null = null;

  async init(): Promise<void> {
    const response = await fetch(this.#wasmUrl);
    this.#jupyterFormatter = await createStreaming(response);
    this.#jupyterFormatter.setConfig(this.config, {});
  }

  async formatCode(code: string): Promise<string> {
    if (!this.#jupyterFormatter) {
      await this.init();
    }

    return this.#jupyterFormatter!.formatText({
      filePath: "notebook.ipynb",
      fileText: code,
      overrideConfig: this.config,
    });
  }

  setConfig(config: Record<string, unknown>): void {
    this.config = config;
    if (this.#jupyterFormatter) {
      this.#jupyterFormatter.setConfig(this.config, {});
    }
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
