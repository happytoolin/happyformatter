export abstract class Formatter {
  protected config: object = {};

  abstract formatCode(code: string): Promise<string>;

  setConfig(config: object): void {
    this.config = { ...this.config, ...config };
  }
}

export abstract class Minifier {
  protected config: object = {};

  abstract minifyCode(code: string): Promise<string>;

  setConfig(config: object): void {
    this.config = { ...this.config, ...config };
  }
}
