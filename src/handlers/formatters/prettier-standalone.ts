import type { Options } from "prettier";
import * as prettier from "prettier/standalone";
import { Formatter } from "../interface";

type StandaloneParser = "angular" | "glimmer" | "json5" | "jsonc" | "mdx";

async function loadPlugins(parser: StandaloneParser): Promise<unknown[]> {
  switch (parser) {
    case "angular": {
      const [angular, html, babel, estree] = await Promise.all([
        import("prettier/plugins/angular"),
        import("prettier/plugins/html"),
        import("prettier/plugins/babel"),
        import("prettier/plugins/estree"),
      ]);
      return [angular, html, babel, estree];
    }
    case "glimmer": {
      const glimmer = await import("prettier/plugins/glimmer");
      return [glimmer];
    }
    case "json5":
    case "jsonc": {
      const [babel, estree] = await Promise.all([
        import("prettier/plugins/babel"),
        import("prettier/plugins/estree"),
      ]);
      return [babel, estree];
    }
    case "mdx": {
      const [markdown, html, babel, estree] = await Promise.all([
        import("prettier/plugins/markdown"),
        import("prettier/plugins/html"),
        import("prettier/plugins/babel"),
        import("prettier/plugins/estree"),
      ]);
      return [markdown, html, babel, estree];
    }
  }
}

abstract class PrettierStandaloneFormatter extends Formatter {
  protected config: Options = {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
  };

  protected abstract parser: StandaloneParser;
  #plugins: unknown[] = [];

  async init(): Promise<void> {
    this.#plugins = await loadPlugins(this.parser);
  }

  async formatCode(code: string): Promise<string> {
    if (this.#plugins.length === 0) {
      await this.init();
    }

    return prettier.format(code, {
      ...this.config,
      parser: this.parser,
      plugins: this.#plugins as Options["plugins"],
    });
  }

  setConfig(config: Options): void {
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

export class JSONCFormatter extends PrettierStandaloneFormatter {
  protected parser: StandaloneParser = "jsonc";
}

export class JSON5Formatter extends PrettierStandaloneFormatter {
  protected parser: StandaloneParser = "json5";
}

export class MDXFormatter extends PrettierStandaloneFormatter {
  protected parser: StandaloneParser = "mdx";
}

export class AngularFormatter extends PrettierStandaloneFormatter {
  protected parser: StandaloneParser = "angular";
}

export class HandlebarsFormatter extends PrettierStandaloneFormatter {
  protected parser: StandaloneParser = "glimmer";
}
