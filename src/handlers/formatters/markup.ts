import init, { format } from "@wasm-fmt/markup_fmt/vite";
import { Formatter } from "../interface";

type Config = NonNullable<Parameters<typeof format>[2]>;

abstract class MarkupFormatter extends Formatter {
  protected config: Config = {
    scriptIndent: true,
    styleIndent: true,
  };

  protected abstract filename: string;

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, this.filename, this.config);
  }

  setConfig(config: Config): void {
    this.config = config;
  }

  async validateCode(code: string): Promise<boolean> {
    try {
      await this.formatCode(code);
      return true;
    } catch {
      return false;
    }
  }
}

export class VueFormatter extends MarkupFormatter {
  protected filename = "component.vue";
}

export class SvelteFormatter extends MarkupFormatter {
  protected filename = "component.svelte";
}

export class AstroFormatter extends MarkupFormatter {
  protected filename = "page.astro";
}

export class JinjaFormatter extends MarkupFormatter {
  protected filename = "template.jinja";
}

export class TwigFormatter extends MarkupFormatter {
  protected filename = "template.twig";
}
