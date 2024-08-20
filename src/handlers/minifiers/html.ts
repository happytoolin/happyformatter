import { minify } from "@minify-html/wasm";
import { Minifier } from "../interface";

export class HTMLMinifier extends Minifier {
  async minifyCode(code: string): Promise<string> {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const minified = minify(encoder.encode(code), this.config);
    return decoder.decode(minified);
  }
}
