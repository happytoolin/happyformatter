export async function getFormatter(language: string) {
  switch (language) {
    case "js":
      const { JavascriptFormatter } = await import(
        "@/handlers/formatters/javascript"
      );
      return new JavascriptFormatter();
    case "ts":
      const { TypescriptFormatter } = await import(
        "@/handlers/formatters/javascript"
      );
      return new TypescriptFormatter();
    case "css":
      const { CSSFormatter } = await import("@/handlers/formatters/css");
      return new CSSFormatter();
    case "html":
      const { HTMLFormatter } = await import("@/handlers/formatters/html");
      return new HTMLFormatter();
    case "json":
      const { JSONFormatter } = await import("@/handlers/formatters/json");
      return new JSONFormatter();
    case "xml":
      const { XMLFormatter } = await import("@/handlers/formatters/xml");
      return new XMLFormatter();
    case "go":
      const { GoFormatter } = await import("@/handlers/formatters/go");
      return new GoFormatter();
    case "java":
      const { JavaFormatter } = await import("@/handlers/formatters/clang");
      return new JavaFormatter();
    case "cs":
      const { CSharpFormatter } = await import("@/handlers/formatters/clang");
      return new CSharpFormatter();
    case "cpp":
      const { CppFormatter } = await import("@/handlers/formatters/clang");
      return new CppFormatter();
    case "c":
      const { CFormatter } = await import("@/handlers/formatters/clang");
      return new CFormatter();
    case "m":
      const { ObjectiveCFormatter } = await import(
        "@/handlers/formatters/clang"
      );
      return new ObjectiveCFormatter();
    case "mm":
      const { ObjectiveCppFormatter } = await import(
        "@/handlers/formatters/clang"
      );
      return new ObjectiveCppFormatter();
    case "proto":
      const { ProtoFormatter } = await import("@/handlers/formatters/clang");
      return new ProtoFormatter();
    default:
      throw new Error(`No formatter available for language: ${language}`);
  }
}

export async function getMinifier(language: string) {
  switch (language) {
    case "js":
      const { JavascriptMinifier } = await import(
        "@/handlers/minifiers/javascript"
      );
      return new JavascriptMinifier();
    case "ts":
      const { TypescriptMinifier } = await import(
        "@/handlers/minifiers/javascript"
      );
      return new TypescriptMinifier();
    case "css":
      const { CSSMiniFier } = await import("@/handlers/minifiers/css");
      return new CSSMiniFier();
    case "html":
      const { HTMLMinifier } = await import("@/handlers/minifiers/html");
      return new HTMLMinifier();
    case "json":
      const { JSONMinifier } = await import("@/handlers/minifiers/json");
      return new JSONMinifier();
    case "xml":
      const { XMLMinifier } = await import("@/handlers/minifiers/xml");
      return new XMLMinifier();
    default:
      return null; // Return null if no minifier is available for the language
  }
}
