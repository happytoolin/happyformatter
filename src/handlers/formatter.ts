export abstract class Formatter {
  protected config: any = {};

  abstract formatCode(code: string): Promise<string>;

  setConfig(config: any): void {
    this.config = { ...this.config, ...config };
  }
}

export abstract class Minifier {
  protected config: any = {};

  abstract minifyCode(code: string): Promise<string>;

  setConfig(config: any): void {
    this.config = { ...this.config, ...config };
  }
}
