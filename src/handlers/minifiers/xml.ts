import xmlFormat, { type XMLFormatterOptions } from "xml-formatter";
import { Minifier } from "../interface";

export class XMLMinifier extends Minifier {
  async minifyCode(code: string): Promise<string> {
    const data = xmlFormat.minify(code, {
      filter: (node) => node.type !== "Comment",
      collapseContent: true,
      ...this.config,
    });
    return data;
  }

  protected config: XMLFormatterOptions = {
    indentation: "  ",
    collapseContent: true,
    lineSeparator: "\n",
  };

  setConfig(config: XMLFormatterOptions): void {
    this.config = config;
  }
}
