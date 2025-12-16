import { format } from "@prisma/prisma-fmt-wasm";
import { Formatter } from "../interface";

export class PrismaFormatter extends Formatter {
  protected config: any = {};

  async init(): Promise<void> {
    // Prisma doesn't need initialization
  }

  async formatCode(code: string): Promise<string> {
    return format(code, this.config);
  }

  setConfig(config: any): void {
    this.config = { ...this.config, ...config };
  }

  getLanguageName(): string {
    return "prisma";
  }
}
