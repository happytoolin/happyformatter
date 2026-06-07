import initLightningCSS, { transform } from "lightningcss-wasm";
import { Minifier } from "../interface";

export class CSSMiniFier extends Minifier {
  protected filename = "style.css";

  async init(): Promise<void> {
    await initLightningCSS();
  }

  async minifyCode(code: string): Promise<string> {
    const { code: minifiedCode } = transform({
      filename: this.filename,
      code: new TextEncoder().encode(code),
      minify: true,
      ...this.config,
    });

    return new TextDecoder().decode(minifiedCode);
  }
}

export class SCSSMinifier extends CSSMiniFier {
  protected filename = "style.scss";
}
