import minifyXML from "minify-xml";
import { Minifier } from "../interface";

export class XMLMinifier extends Minifier {
  async minifyCode(code: string): Promise<string> {
    return minifyXML(code, this.config);
  }
}
