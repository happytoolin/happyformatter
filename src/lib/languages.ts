export interface LanguageConfig {
  id: string;
  name: string;
  title: string;
  description: string;
  minify: boolean;
  extensions: string[];
}

// Centralized language configuration
export const LANGUAGES: Record<string, LanguageConfig> = {
  c: {
    id: "c",
    name: "C",
    title: "C Formatter and Minifier",
    description: "C code formatter that formats C source code, locally in your browser",
    minify: false,
    extensions: ["c", "h"],
  },
  cpp: {
    id: "cpp",
    name: "C++",
    title: "C++ Formatter and Minifier",
    description: "C++ code formatter that formats C++ source code, locally in your browser",
    minify: false,
    extensions: ["cpp", "cxx", "cc", "hpp", "hxx", "hh"],
  },
  csharp: {
    id: "csharp",
    name: "C#",
    title: "C# Formatter and Minifier",
    description: "C# code formatter that formats C# source code, locally in your browser",
    minify: false,
    extensions: ["cs"],
  },
  css: {
    id: "css",
    name: "CSS",
    title: "CSS Formatter and Minifier",
    description: "CSS formatter that formats CSS stylesheets, locally in your browser",
    minify: true,
    extensions: ["css"],
  },
  scss: {
    id: "scss",
    name: "SCSS",
    title: "SCSS Formatter and Minifier",
    description: "SCSS formatter that formats SCSS stylesheets, locally in your browser",
    minify: true,
    extensions: ["scss", "sass"],
  },
  dart: {
    id: "dart",
    name: "Dart",
    title: "Dart Formatter and Minifier",
    description: "Dart code formatter that formats Dart source code, locally in your browser",
    minify: false,
    extensions: ["dart"],
  },
  go: {
    id: "go",
    name: "Go",
    title: "Go Formatter and Minifier",
    description: "Go code formatter that formats Go source code, locally in your browser",
    minify: false,
    extensions: ["go"],
  },
  html: {
    id: "html",
    name: "HTML",
    title: "HTML Formatter and Minifier",
    description: "HTML formatter that formats HTML markup, locally in your browser",
    minify: false,
    extensions: ["html", "htm"],
  },
  java: {
    id: "java",
    name: "Java",
    title: "Java Formatter and Minifier",
    description: "Java code formatter that formats Java source code, locally in your browser",
    minify: false,
    extensions: ["java"],
  },
  javascript: {
    id: "javascript",
    name: "JavaScript",
    title: "JavaScript Formatter and Minifier",
    description: "JavaScript formatter that formats JavaScript code, locally in your browser",
    minify: true,
    extensions: ["js", "jsx", "mjs"],
  },
  json: {
    id: "json",
    name: "JSON",
    title: "JSON Formatter and Minifier",
    description: "JSON formatter that formats JSON data, locally in your browser",
    minify: true,
    extensions: ["json"],
  },
  lua: {
    id: "lua",
    name: "Lua",
    title: "Lua Formatter and Minifier",
    description: "Lua code formatter that formats Lua source code, locally in your browser",
    minify: false,
    extensions: ["lua"],
  },
  markdown: {
    id: "markdown",
    name: "Markdown",
    title: "Markdown Formatter and Minifier",
    description: "Markdown formatter that formats Markdown documents, locally in your browser",
    minify: false,
    extensions: ["md", "markdown"],
  },
  php: {
    id: "php",
    name: "PHP",
    title: "PHP Formatter and Minifier",
    description: "PHP code formatter that formats PHP source code, locally in your browser",
    minify: false,
    extensions: ["php"],
  },
  proto: {
    id: "proto",
    name: "Protocol Buffers",
    title: "Protocol Buffers Formatter and Minifier",
    description: "Protocol Buffers formatter that formats .proto files, locally in your browser",
    minify: false,
    extensions: ["proto"],
  },
  python: {
    id: "python",
    name: "Python",
    title: "Python Formatter and Minifier",
    description: "Python code formatter that formats Python source code, locally in your browser",
    minify: false,
    extensions: ["py", "pyw"],
  },
  rust: {
    id: "rust",
    name: "Rust",
    title: "Rust Formatter and Minifier",
    description: "Rust code formatter that formats Rust source code, locally in your browser",
    minify: false,
    extensions: ["rs"],
  },
  sql: {
    id: "sql",
    name: "SQL",
    title: "SQL Formatter and Minifier",
    description: "SQL formatter that formats SQL queries, locally in your browser",
    minify: false,
    extensions: ["sql"],
  },
  typescript: {
    id: "typescript",
    name: "TypeScript",
    title: "TypeScript Formatter and Minifier",
    description: "TypeScript formatter that formats TypeScript code, locally in your browser",
    minify: true,
    extensions: ["ts", "tsx"],
  },
  "javascript-dprint": {
    id: "javascript-dprint",
    name: "JavaScript dprint",
    title: "JavaScript dprint Formatter",
    description: "JavaScript formatter using dprint that formats JavaScript code, locally in your browser",
    minify: false,
    extensions: ["js", "mjs"],
  },
  "typescript-dprint": {
    id: "typescript-dprint",
    name: "TypeScript dprint",
    title: "TypeScript dprint Formatter",
    description: "TypeScript formatter using dprint that formats TypeScript code, locally in your browser",
    minify: false,
    extensions: ["ts"],
  },
  jsx: {
    id: "jsx",
    name: "JSX",
    title: "JSX Formatter",
    description: "JSX formatter that formats React JSX code, locally in your browser",
    minify: false,
    extensions: ["jsx"],
  },
  tsx: {
    id: "tsx",
    name: "TSX",
    title: "TSX Formatter",
    description: "TSX formatter that formats React TypeScript code, locally in your browser",
    minify: false,
    extensions: ["tsx"],
  },
  xml: {
    id: "xml",
    name: "XML",
    title: "XML Formatter and Minifier",
    description: "XML formatter that formats XML data, locally in your browser",
    minify: true,
    extensions: ["xml"],
  },
  yaml: {
    id: "yaml",
    name: "YAML",
    title: "YAML Formatter and Minifier",
    description: "YAML formatter that formats YAML data, locally in your browser",
    minify: false,
    extensions: ["yaml", "yml"],
  },
  zig: {
    id: "zig",
    name: "Zig",
    title: "Zig Formatter and Minifier",
    description: "Zig code formatter that formats Zig source code, locally in your browser",
    minify: false,
    extensions: ["zig"],
  },
  dockerfile: {
    id: "dockerfile",
    name: "Dockerfile",
    title: "Dockerfile Formatter",
    description: "Dockerfile formatter that formats Docker configuration files, locally in your browser",
    minify: false,
    extensions: ["dockerfile", "Dockerfile"],
  },
  graphql: {
    id: "graphql",
    name: "GraphQL",
    title: "GraphQL Formatter",
    description: "GraphQL formatter that formats GraphQL schemas and queries, locally in your browser",
    minify: false,
    extensions: ["graphql", "gql"],
  },
  jupyter: {
    id: "jupyter",
    name: "Jupyter",
    title: "Jupyter Notebook Formatter",
    description: "Jupyter notebook formatter that formats .ipynb files, locally in your browser",
    minify: false,
    extensions: ["ipynb"],
  },
};

// Helper function to get language config by id
export function getLanguageConfig(id: string): LanguageConfig | undefined {
  return LANGUAGES[id];
}

// Helper function to get all languages
export function getAllLanguages(): LanguageConfig[] {
  return Object.values(LANGUAGES);
}

// Helper function to get language by file extension
export function getLanguageByExtension(
  extension: string,
): LanguageConfig | undefined {
  return Object.values(LANGUAGES).find((lang) => lang.extensions.includes(extension.toLowerCase()));
}
