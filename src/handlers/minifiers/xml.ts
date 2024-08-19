import minifyXML from "minify-xml";
import { Minifier } from "../formatter";

export class XMLMinifier extends Minifier {
  async minifyCode(code: string): Promise<string> {
    return minifyXML(code, this.config);
  }
}
