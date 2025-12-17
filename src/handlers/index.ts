export async function getFormatter(language: string) {
  switch (language) {
    case "javascript":
      const { JavascriptFormatter } = await import(
        "@/handlers/formatters/javascript"
      );
      const jsFormatter = new JavascriptFormatter();
      await jsFormatter.init();
      return jsFormatter;
    case "typescript":
      const { TypescriptFormatter } = await import(
        "@/handlers/formatters/javascript"
      );
      const tsFormatter = new TypescriptFormatter();
      await tsFormatter.init();
      return tsFormatter;
    case "css":
      const { CSSFormatter } = await import("@/handlers/formatters/css");
      const cssFormatter = new CSSFormatter();
      await cssFormatter.init();
      return cssFormatter;
    case "scss":
      const { CSSFormatter: SCSSFormatter } = await import("@/handlers/formatters/css");
      const scssFormatter = new SCSSFormatter();
      await scssFormatter.init();
      return scssFormatter;
    case "html":
      const { HTMLFormatter } = await import("@/handlers/formatters/html");
      const htmlFormatter = new HTMLFormatter();
      await htmlFormatter.init();
      return htmlFormatter;
    case "json":
      const { JSONFormatter } = await import("@/handlers/formatters/json");
      const jsonFormatter = new JSONFormatter();
      await jsonFormatter.init();
      return jsonFormatter;
    case "dart":
      const { DartFormatter } = await import("@/handlers/formatters/dart");
      const dartFormatter = new DartFormatter();
      await dartFormatter.init();
      return dartFormatter;
    case "lua":
      const { LuaFormatter } = await import("@/handlers/formatters/lua");
      const luaFormatter = new LuaFormatter();
      await luaFormatter.init();
      return luaFormatter;
    case "xml":
      const { XMLFormatter } = await import("@/handlers/formatters/xml");
      const xmlFormatter = new XMLFormatter();
      await xmlFormatter.init();
      return xmlFormatter;
    case "go":
      const { GoFormatter } = await import("@/handlers/formatters/go");
      const goFormatter = new GoFormatter();
      await goFormatter.init();
      return goFormatter;
    case "java":
      const { JavaFormatter } = await import("@/handlers/formatters/clang");
      const javaFormatter = new JavaFormatter();
      await javaFormatter.init();
      return javaFormatter;
    case "csharp":
      const { CSharpFormatter } = await import("@/handlers/formatters/clang");
      const csFormatter = new CSharpFormatter();
      await csFormatter.init();
      return csFormatter;
    case "cpp":
      const { CppFormatter } = await import("@/handlers/formatters/clang");
      const cppFormatter = new CppFormatter();
      await cppFormatter.init();
      return cppFormatter;
    case "c":
      const { CFormatter } = await import("@/handlers/formatters/clang");
      const cFormatter = new CFormatter();
      await cFormatter.init();
      return cFormatter;
    case "m":
      const { ObjectiveCFormatter } = await import(
        "@/handlers/formatters/clang"
      );
      const objcFormatter = new ObjectiveCFormatter();
      await objcFormatter.init();
      return objcFormatter;
    case "mm":
      const { ObjectiveCppFormatter } = await import(
        "@/handlers/formatters/clang"
      );
      const objcCppFormatter = new ObjectiveCppFormatter();
      await objcCppFormatter.init();
      return objcCppFormatter;
    case "proto":
      const { ProtoFormatter } = await import("@/handlers/formatters/clang");
      const protoFormatter = new ProtoFormatter();
      await protoFormatter.init();
      return protoFormatter;
    case "markdown":
      const { MarkdownFormatter } = await import(
        "@/handlers/formatters/markdown"
      );
      const markdownFormatter = new MarkdownFormatter();
      await markdownFormatter.init();
      return markdownFormatter;
    case "python":
      const { PythonFormatter } = await import("@/handlers/formatters/python");
      const pythonFormatter = new PythonFormatter();
      await pythonFormatter.init();
      return pythonFormatter;
    case "sql":
      const { SQLFormatter } = await import("@/handlers/formatters/sql");
      const sqlFormatter = new SQLFormatter();
      await sqlFormatter.init();
      return sqlFormatter;
    case "php":
      const { PHPFormatter } = await import("@/handlers/formatters/php");
      const phpFormatter = new PHPFormatter();
      await phpFormatter.init();
      return phpFormatter;
    case "zig":
      const { ZigFormatter } = await import("@/handlers/formatters/zig");
      const zigFormatter = new ZigFormatter();
      await zigFormatter.init();
      return zigFormatter;
    case "yaml":
      const { YamlFormatter } = await import("@/handlers/formatters/yaml");
      const yamlFormatter = new YamlFormatter();
      await yamlFormatter.init();
      return yamlFormatter;
      // Alternative formatters
    case "python-ruff":
      const { PythonRuffFormatter } = await import("@/handlers/formatters/python-ruff");
      const pythonRuffFormatter = new PythonRuffFormatter();
      await pythonRuffFormatter.init();
      return pythonRuffFormatter;
    case "javascript-biome":
      const { JavaScriptBiomeFormatter } = await import("@/handlers/formatters/javascript-biome");
      const jsBiomeFormatter = new JavaScriptBiomeFormatter();
      await jsBiomeFormatter.init();
      return jsBiomeFormatter;
    case "typescript-biome":
      const { TypeScriptBiomeFormatter } = await import("@/handlers/formatters/typescript-biome");
      const tsBiomeFormatter = new TypeScriptBiomeFormatter();
      await tsBiomeFormatter.init();
      return tsBiomeFormatter;
    case "php-mago":
      const { PHPMagoFormatter } = await import("@/handlers/formatters/php-mago");
      const phpMagoFormatter = new PHPMagoFormatter();
      await phpMagoFormatter.init();
      return phpMagoFormatter;
    // case "toml":
    //   const { TomlFormatter } = await import("@/handlers/formatters/toml");
    //   const tomlFormatter = new TomlFormatter();
    //   await tomlFormatter.init();
    //   return tomlFormatter;
    default:
      throw new Error(`No formatter available for language: ${language}`);
  }
}

export async function getMinifier(language: string) {
  switch (language) {
    case "js":
    case "javascript":
    case "javascript-biome":
      const { JavascriptMinifier } = await import(
        "@/handlers/minifiers/javascript"
      );
      const jsMinifier = new JavascriptMinifier();
      await jsMinifier.init();
      return jsMinifier;
    case "ts":
    case "typescript":
    case "typescript-biome":
      const { TypescriptMinifier } = await import(
        "@/handlers/minifiers/javascript"
      );
      const tsMinifier = new TypescriptMinifier();
      await tsMinifier.init();
      return tsMinifier;
    case "css":
      const { CSSMiniFier } = await import("@/handlers/minifiers/css");
      const cssMinifier = new CSSMiniFier();
      await cssMinifier.init();
      return cssMinifier;
    case "scss":
      const { CSSMiniFier: SCSSMinifier } = await import("@/handlers/minifiers/css");
      const scssMinifier = new SCSSMinifier();
      await scssMinifier.init();
      return scssMinifier;
    // case "html":
    //   const { HTMLMinifier } = await import("@/handlers/minifiers/html");
    //   const htmlMinifier = new HTMLMinifier();
    //   htmlMinifier.init();
    //   return htmlMinifier;
    case "json":
      const { JSONMinifier } = await import("@/handlers/minifiers/json");
      const jsonMinifier = new JSONMinifier();
      jsonMinifier.init();
      return jsonMinifier;
    case "xml":
      const { XMLMinifier } = await import("@/handlers/minifiers/xml");
      const xmlMinifier = new XMLMinifier();
      return xmlMinifier;
    default:
      return null; // Return null if no minifier is available for the language
  }
}
