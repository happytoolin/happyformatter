import { Formatter } from "../interface";

export class PHPFormatter extends Formatter {
  protected config = {};
  private prettier: any;
  private phpPlugin: any;

  async init(): Promise<void> {
    // Dynamically import prettier and php plugin to avoid cycle
    const [{ default: prettier }, { default: phpPlugin }] = await Promise.all([
      import("prettier/standalone"),
      // @ts-ignore
      import("@prettier/plugin-php/standalone"),
    ]);

    this.prettier = prettier;
    this.phpPlugin = phpPlugin;
  }

  async formatCode(code: string): Promise<string> {
    if (!this.prettier || !this.phpPlugin) {
      await this.init();
    }

    return this.prettier.format(code, {
      plugins: [this.phpPlugin],
      parser: "php",
      ...this.config,
    });
  }

  setConfig(config: any): void {
    this.config = config;
  }

  async validateCode(code: string): Promise<boolean> {
    try {
      await this.formatCode(code);
      return true;
    } catch (error) {
      return false;
    }
  }
}
