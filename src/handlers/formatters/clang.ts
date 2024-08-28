import type { Style } from "@wasm-fmt/clang-format";
import init, { format } from "@wasm-fmt/clang-format";
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
    return format(code, "file.c");
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
    return format(code, "file.cc");
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
    return format(code, "file.java");
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
    return format(code, "file.cs");
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
    return format(code, "file.m");
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
    return format(code, "file.mm");
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
    return format(code, "file.proto");
  }

  setConfig(config: Style): void {
    this.config = config;
  }
}
