import { createStreaming, type Formatter as DprintFormatter } from "@dprint/formatter";
import { Formatter } from "../interface";

export class RoslynCSharpFormatter extends Formatter {
  protected config: Record<string, unknown> = {
    indentWidth: 4,
    lineWidth: 120,
  };

  #wasmUrl = "https://plugins.dprint.dev/roslyn-0.19.1.json";
  #roslynFormatter: DprintFormatter | null = null;

  async init(): Promise<void> {
    const response = await fetch(this.#wasmUrl);
    this.#roslynFormatter = await createStreaming(response);
    this.#roslynFormatter.setConfig(this.config, {});
  }

  async formatCode(code: string): Promise<string> {
    if (!this.#roslynFormatter) {
      await this.init();
    }

    return this.#roslynFormatter!.formatText({
      filePath: "Program.cs",
      fileText: code,
      overrideConfig: this.config,
    });
  }

  setConfig(config: Record<string, unknown>): void {
    this.config = config;
    if (this.#roslynFormatter) {
      this.#roslynFormatter.setConfig(this.config, {});
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
