import { createStreaming, type Formatter as DprintFormatter } from "@dprint/formatter";
import { Formatter } from "../interface";

export class DockerfileFormatter extends Formatter {
  protected config: Record<string, unknown> = {
    indentWidth: 2,
    lineWidth: 80,
  };

  #wasmUrl = "https://plugins.dprint.dev/dockerfile-0.3.3.wasm";
  #dockerfileFormatter: DprintFormatter | null = null;

  async init(): Promise<void> {
    const response = await fetch(this.#wasmUrl);
    this.#dockerfileFormatter = await createStreaming(response);
    this.#dockerfileFormatter.setConfig(this.config, {});
  }

  async formatCode(code: string): Promise<string> {
    if (!this.#dockerfileFormatter) {
      await this.init();
    }

    return this.#dockerfileFormatter!.formatText({
      filePath: "Dockerfile",
      fileText: code,
      overrideConfig: this.config,
    });
  }

  setConfig(config: Record<string, unknown>): void {
    this.config = config;
    if (this.#dockerfileFormatter) {
      this.#dockerfileFormatter.setConfig(this.config, {});
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
