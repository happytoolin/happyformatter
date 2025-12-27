import * as prettierPluginBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import * as prettierPluginGraphql from "prettier/plugins/graphql";
import * as prettierPluginHtml from "prettier/plugins/html";
import * as prettierPluginMarkdown from "prettier/plugins/markdown";
import * as prettierPluginPostcss from "prettier/plugins/postcss";
import * as prettierPluginYaml from "prettier/plugins/yaml";
import prettier from "prettier/standalone";
import { Formatter } from "../interface";

interface PrettierFormatOptions {
  semi?: boolean;
  singleQuote?: boolean;
  tabWidth?: number;
  useTabs?: boolean;
  trailingComma?: "none" | "es5" | "all";
  printWidth?: number;
  [key: string]: any;
}

/**
 * Base Prettier formatter class for all languages
 * Using Prettier standalone browser build for client-side formatting
 * NOTE: While marketed as "oxfmt", we use Prettier which is Prettier-compatible
 * and runs in the browser (oxfmt requires Node.js native bindings)
 */
abstract class OxfmtFormatter extends Formatter {
  protected config: PrettierFormatOptions = {
    semi: true,
    singleQuote: false,
    tabWidth: 2,
    useTabs: false,
    trailingComma: "es5",
    printWidth: 80,
  };
  protected abstract getParser(): string;
  protected abstract getPlugins(): any[];

  async init(): Promise<void> {
    // No initialization needed for Prettier standalone
  }

  async formatCode(code: string): Promise<string> {
    try {
      const formattedCode = await prettier.format(code, {
        parser: this.getParser(),
        plugins: this.getPlugins(),
        ...this.config,
      });

      return formattedCode;
    } catch (error) {
      console.error("Error formatting code with Prettier:", error);
      throw error;
    }
  }

  setConfig(config: PrettierFormatOptions): void {
    this.config = { ...this.config, ...config };
  }
}

// JavaScript formatters
export class JavaScriptOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "index.js";
  }

  async validateCode(code: string): Promise<boolean> {
    try {
      new Function(code);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export class JSXOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "component.jsx";
  }
}

// TypeScript formatters
export class TypeScriptOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "index.ts";
  }

  async validateCode(code: string): Promise<boolean> {
    const typescript = await import("typescript");
    try {
      const res = typescript.transpileModule(code, {});
      const jscode = res.outputText;
      new Function(jscode);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export class TSXOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "component.tsx";
  }
}

// JSON formatters
export class JSONOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "data.json";
  }

  async validateCode(code: string): Promise<boolean> {
    try {
      JSON.parse(code);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export class JSONCOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "data.jsonc";
  }
}

export class JSON5OxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "data.json5";
  }
}

// YAML formatter
export class YAMLOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "config.yaml";
  }
}

// HTML formatters
export class HTMLOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "index.html";
  }
}

export class AngularOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "component.component.html";
  }
}

export class VueOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "Component.vue";
  }
}

export class MJMLOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "email.mjml";
  }
}

// Template formatters
export class EmberOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "template.hbs";
  }
}

export class HandlebarsOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "template.handlebars";
  }
}

// CSS formatters
export class CSSOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "style.css";
  }
}

export class SCSSFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "style.scss";
  }
}

export class LessOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "style.less";
  }
}

// GraphQL formatter
export class GraphQLOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "schema.graphql";
  }
}

// Markdown formatters
export class MarkdownOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "document.md";
  }
}

export class MDXOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "document.mdx";
  }
}

// TOML formatter
export class TOMLOxfmtFormatter extends OxfmtFormatter {
  protected getFileName(): string {
    return "config.toml";
  }
}
