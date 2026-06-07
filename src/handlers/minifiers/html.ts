import type { Options } from "html-minifier-terser";
import { Minifier } from "../interface";

type HTMLMinifierBundle = {
  minify: (code: string, config: Options) => Promise<string>;
};

let htmlMinifierBundlePromise: Promise<HTMLMinifierBundle> | null = null;

function loadHTMLMinifierBundle() {
  htmlMinifierBundlePromise ??= import("html-minifier-terser/dist/htmlminifier.esm.bundle")
    .then(bundle => bundle as HTMLMinifierBundle);

  return htmlMinifierBundlePromise;
}

export class HTMLMinifier extends Minifier {
  protected config: Options = {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    decodeEntities: true,
    minifyCSS: true,
    minifyJS: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
  };

  async minifyCode(code: string): Promise<string> {
    const { minify } = await loadHTMLMinifierBundle();
    return minify(code, this.config);
  }

  setConfig(config: Options): void {
    this.config = { ...this.config, ...config };
  }
}
