import type { Style } from "@wasm-fmt/clang-format";
import init, { format } from "@wasm-fmt/clang-format/web";
import { Formatter } from "../interface";

export class CFormatter extends Formatter {
  protected config: Style = JSON.stringify({
    BasedOnStyle: "Chromium",
    IndentWidth: 4,
    ColumnLimit: 80,
  });

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "file.c", this.config);
  }

  setConfig(config: Style): void {
    this.config = config;
  }
}

export class CppFormatter extends Formatter {
  protected config: Style = JSON.stringify({
    BasedOnStyle: "Chromium",
    IndentWidth: 4,
    ColumnLimit: 80,
  });

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "file.cc", this.config);
  }

  setConfig(config: Style): void {
    this.config = config;
  }
}

export class JavaFormatter extends Formatter {
  protected config: Style = JSON.stringify({
    BasedOnStyle: "Chromium",
    IndentWidth: 4,
    ColumnLimit: 80,
  });

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "file.java", this.config);
  }

  setConfig(config: Style): void {
    this.config = config;
  }
}

export class CSharpFormatter extends Formatter {
  protected config: Style = JSON.stringify({
    BasedOnStyle: "Chromium",
    IndentWidth: 4,
    ColumnLimit: 80,
  });

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "file.cs", this.config);
  }

  setConfig(config: Style): void {
    this.config = config;
  }
}

export class ObjectiveCFormatter extends Formatter {
  protected config: Style = JSON.stringify({
    BasedOnStyle: "Chromium",
    IndentWidth: 4,
    ColumnLimit: 80,
  });

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "file.m", this.config);
  }

  setConfig(config: Style): void {
    this.config = config;
  }
}

export class ObjectiveCppFormatter extends Formatter {
  protected config: Style = JSON.stringify({
    BasedOnStyle: "Chromium",
    IndentWidth: 4,
    ColumnLimit: 80,
  });

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "file.mm", this.config);
  }

  setConfig(config: Style): void {
    this.config = config;
  }
}

export class ProtoFormatter extends Formatter {
  protected config: Style = JSON.stringify({
    BasedOnStyle: "Chromium",
    IndentWidth: 4,
    ColumnLimit: 80,
  });

  async init(): Promise<void> {
    await init();
  }

  async formatCode(code: string): Promise<string> {
    return format(code, "file.proto", this.config);
  }

  setConfig(config: Style): void {
    this.config = config;
  }
}
