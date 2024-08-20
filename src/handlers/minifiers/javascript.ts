import type { JsMinifyOptions } from "@swc/wasm-web";
import initSwc, { transformSync } from "@swc/wasm-web";
import { Minifier } from "../interface";

export class JavascriptMinifier extends Minifier {
  protected config: JsMinifyOptions = {
    compress: true,
    ecma: 2020,
  };

  async minifyCode(code: string): Promise<string> {
    await initSwc();

    const minified = transformSync(code, {
      minify: true,
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
    await initSwc();

    const minified = transformSync(code, {
      jsc: {
        parser: {
          syntax: "typescript",
        },
        target: "es2020",
        minify: {
          compress: this.config.compress,
        },
      },
      minify: true,
    });

    return minified.code;
  }

  setConfig(config: JsMinifyOptions): void {
    this.config = config;
  }
}
