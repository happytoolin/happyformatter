import type { JsMinifyOptions } from "@swc/wasm-web";
import { Minifier } from "../formatter";

export class JavascriptMinifier extends Minifier {
  protected config: JsMinifyOptions = {
    compress: true,
    ecma: 2020,
  };

  async minifyCode(code: string): Promise<string> {
    const swc = await import("@swc/wasm-web");
    await swc.default();

    const minified = swc.minifySync(code, {
      compress: true,
    });

    return minified.code;
  }

  setConfig(config: JsMinifyOptions): void {
    this.config = config;
  }
}

export class TypescriptMinifier extends Minifier {
  protected config: JsMinifyOptions = {
    compress: true,
    ecma: 2020,
  };

  async minifyCode(code: string): Promise<string> {
    const swc = await import("@swc/wasm-web");
    await swc.default();

    const minified = swc.minifySync(code, {
      compress: true,
    });

    return minified.code;
  }

  setConfig(config: JsMinifyOptions): void {
    this.config = config;
  }
}
