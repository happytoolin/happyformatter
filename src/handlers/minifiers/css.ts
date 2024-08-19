import initLightningCSS, { transform } from "lightningcss-wasm";
import { Minifier } from "../formatter";

export class CSSMiniFier extends Minifier {
  async minifyCode(code: string): Promise<string> {
    await initLightningCSS();
    const { code: minifiedCode } = transform({
      filename: "style.css",
      code: new TextEncoder().encode(code),
      minify: true,
      ...this.config,
    });
    return new TextDecoder().decode(minifiedCode);
  }
}
