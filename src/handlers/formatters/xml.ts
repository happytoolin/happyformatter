import type { XMLFormatterOptions } from "xml-formatter";
import { Formatter } from "../formatter";

export class XMLFormatter extends Formatter {
  protected config: XMLFormatterOptions = {
    indentation: "  ",
    collapseContent: true,
    lineSeparator: "\n",
  };

  async formatCode(code: string): Promise<string> {
    const { default: formatXML } = await import("xml-formatter");
    return formatXML(code, this.config);
  }

  setConfig(config: XMLFormatterOptions): void {
    this.config = config;
  }
}
