import { createStreaming, type Formatter as DprintFormatter } from "@dprint/formatter";
import { Formatter } from "../interface";

export class GraphQLFormatter extends Formatter {
  protected config: Record<string, unknown> = {
    indentWidth: 2,
    lineWidth: 80,
  };

  #wasmUrl = "https://plugins.dprint.dev/g-plane/pretty_graphql-v0.2.1.wasm";
  #graphqlFormatter: DprintFormatter | null = null;

  async init(): Promise<void> {
    const response = await fetch(this.#wasmUrl);
    this.#graphqlFormatter = await createStreaming(response);
    this.#graphqlFormatter.setConfig(this.config, {});
  }

  async formatCode(code: string): Promise<string> {
    if (!this.#graphqlFormatter) {
      await this.init();
    }

    return this.#graphqlFormatter!.formatText({
      filePath: "schema.graphql",
      fileText: code,
      overrideConfig: this.config,
    });
  }

  setConfig(config: Record<string, unknown>): void {
    this.config = config;
    if (this.#graphqlFormatter) {
      this.#graphqlFormatter.setConfig(this.config, {});
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
