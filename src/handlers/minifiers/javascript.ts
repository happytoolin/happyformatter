import type { JsMinifyOptions } from "@swc/wasm-web";
import initSwc, { transformSync } from "@swc/wasm-web";
import { Minifier } from "../interface";

export class JavascriptMinifier extends Minifier {
  protected config: JsMinifyOptions = {
    compress: true,
    ecma: 2020,
  };

  async init(): Promise<void> {
    await initSwc();
  }

  async minifyCode(code: string): Promise<string> {
    const minified = transformSync(code, {
      minify: true,
      jsc: {
        target: "es2020",
      },
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

  async init(): Promise<void> {
    await initSwc();
  }

  async minifyCode(code: string): Promise<string> {
    const minified = transformSync(code, {
      jsc: {
        parser: {
          syntax: "typescript",
        },
        target: "es2020",
      },
      minify: true,
    });

    return minified.code;
  }

  setConfig(config: JsMinifyOptions): void {
    this.config = config;
  }
}
