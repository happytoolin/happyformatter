import type { Style } from "@wasm-fmt/clang-format";
import { Formatter } from "../formatter";

export class CFormatter extends Formatter {
  protected config: Style = JSON.stringify({
    BasedOnStyle: "Chromium",
    IndentWidth: 4,
    ColumnLimit: 80,
  });
  async formatCode(code: string): Promise<string> {
    const { default: init, format } = await import("@wasm-fmt/clang-format");

    await init();
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
  async formatCode(code: string): Promise<string> {
    const { default: init, format } = await import("@wasm-fmt/clang-format");

    await init();
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
  async formatCode(code: string): Promise<string> {
    const { default: init, format } = await import("@wasm-fmt/clang-format");

    await init();
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
  async formatCode(code: string): Promise<string> {
    const { default: init, format } = await import("@wasm-fmt/clang-format");

    await init();
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
  async formatCode(code: string): Promise<string> {
    const { default: init, format } = await import("@wasm-fmt/clang-format");

    await init();
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
  async formatCode(code: string): Promise<string> {
    const { default: init, format } = await import("@wasm-fmt/clang-format");

    await init();
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
  async formatCode(code: string): Promise<string> {
    const { default: init, format } = await import("@wasm-fmt/clang-format");

    await init();
    return format(code, "file.proto");
  }

  setConfig(config: Style): void {
    this.config = config;
  }
}
