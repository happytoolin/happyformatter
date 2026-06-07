import { Formatter } from "../interface";

export class RustFormatter extends Formatter {
  protected config: Record<string, unknown> = {
    tabWidth: 4,
    useTabs: false,
  };

  private prettier: any;
  private rustPlugin: any;

  async init(): Promise<void> {
    const [{ default: prettier }, rustPluginModule] = await Promise.all([
      import("prettier2/standalone"),
      import("prettier-plugin-rust"),
    ]);

    this.prettier = prettier;
    this.rustPlugin = rustPluginModule.default ?? rustPluginModule;
  }

  async formatCode(code: string): Promise<string> {
    if (!this.prettier || !this.rustPlugin) {
      await this.init();
    }

    return this.prettier.format(code, {
      parser: "jinx-rust",
      plugins: [this.rustPlugin],
      ...this.config,
    });
  }

  setConfig(config: Record<string, unknown>): void {
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
