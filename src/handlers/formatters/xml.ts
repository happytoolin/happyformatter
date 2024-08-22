import type { XMLFormatterOptions } from "xml-formatter";
import formatXML from "xml-formatter";
import { Formatter } from "../interface";

export class XMLFormatter extends Formatter {
  protected config: XMLFormatterOptions = {
    indentation: "  ",
    collapseContent: true,
    lineSeparator: "\n",
  };

  async init(): Promise<void> {
    // No initialization needed
  }

  async formatCode(code: string): Promise<string> {
    return formatXML(code, this.config);
  }

  setConfig(config: XMLFormatterOptions): void {
    this.config = config;
  }
}
