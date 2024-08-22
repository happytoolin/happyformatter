export abstract class Formatter {
  protected config: any = {};

  abstract init(): void;

  abstract formatCode(code: string): Promise<string>;

  setConfig(config: any): void {
    this.config = { ...this.config, ...config };
  }
}

export abstract class Minifier {
  protected config: any = {};

  init(): void {}

  abstract minifyCode(code: string): Promise<string>;

  setConfig(config: any): void {
    this.config = { ...this.config, ...config };
  }
}
