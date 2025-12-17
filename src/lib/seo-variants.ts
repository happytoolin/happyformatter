export interface SEOVariant {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  content?: {
    benefits?: string[];
    features?: string[];
    useCases?: string[];
  };
}

export interface LanguageVariants {
  [variantSlug: string]: SEOVariant;
}

export const languageVariants: Record<string, LanguageVariants> = {
  javascript: {
    "free": {
      slug: "free",
      title: "Free JavaScript Formatter - Format JS Code Online Free",
      description:
        "Free JavaScript formatter and beautifier tool. Format and beautify your JavaScript code online at no cost. No registration required, instant formatting.",
      keywords: [
        "free javascript formatter",
        "free js formatter",
        "free javascript beautifier",
        "free javascript code formatter",
        "free js prettifier",
        "no cost javascript formatter",
        "free online javascript formatter",
        "free javascript tool",
        "open source javascript formatter",
      ],
      h1: "Free JavaScript Formatter",
    },
    "online": {
      slug: "online",
      title: "Online JavaScript Formatter - Format JavaScript Code in Browser",
      description:
        "Online JavaScript formatter that works directly in your browser. Format, validate, and beautify JavaScript code instantly without downloading software.",
      keywords: [
        "online javascript formatter",
        "online js formatter",
        "javascript formatter online",
        "js formatter online",
        "browser javascript formatter",
        "web javascript formatter",
        "javascript online tool",
        "format javascript online",
        "online javascript beautifier",
      ],
      h1: "Online JavaScript Formatter",
    },
    "secure": {
      slug: "secure",
      title: "Secure JavaScript Formatter - Privacy-Focused JS Code Formatting",
      description:
        "Secure JavaScript formatter with client-side processing. Your JavaScript code never leaves your browser. Complete privacy and security for sensitive code.",
      keywords: [
        "secure javascript formatter",
        "private javascript formatter",
        "privacy javascript formatter",
        "secure js formatter",
        "client-side javascript formatter",
        "offline javascript formatter",
        "javascript formatter privacy",
        "secure code formatting",
        "private js beautifier",
      ],
      h1: "Secure JavaScript Formatter",
    },
    "beautifier": {
      slug: "beautifier",
      title: "JavaScript Beautifier - Pretty Print and Format JavaScript Code",
      description:
        "JavaScript beautifier to format and pretty print your code. Transform minified JavaScript into readable, properly formatted code with indentation.",
      keywords: [
        "javascript beautifier",
        "js beautifier",
        "javascript pretty printer",
        "javascript prettifier",
        "format minified javascript",
        "javascript code cleaner",
        "javascript formatter prettier",
        "make javascript readable",
        "javascript indentation",
        "js code beautifier",
      ],
      h1: "JavaScript Beautifier",
    },
    "validator": {
      slug: "validator",
      title: "JavaScript Validator - Validate and Format JavaScript Code",
      description:
        "JavaScript validator to check syntax errors and format your code. Instant validation with detailed error reporting and automatic code formatting.",
      keywords: [
        "javascript validator",
        "js validator",
        "javascript syntax validator",
        "javascript code checker",
        "validate javascript online",
        "javascript syntax checker",
        "js lint tool",
        "javascript error detection",
        "code validation javascript",
      ],
      h1: "JavaScript Validator",
    },
  },

  typescript: {
    "free": {
      slug: "free",
      title: "Free TypeScript Formatter - Format TS Code Online Free",
      description:
        "Free TypeScript formatter and beautifier tool. Format TypeScript code online at no cost with type checking support. No registration required.",
      keywords: [
        "free typescript formatter",
        "free ts formatter",
        "free typescript beautifier",
        "free typescript code formatter",
        "free ts prettifier",
        "no cost typescript formatter",
        "free online typescript formatter",
        "free typescript tool",
      ],
      h1: "Free TypeScript Formatter",
    },
    "online": {
      slug: "online",
      title: "Online TypeScript Formatter - Format TypeScript Code in Browser",
      description:
        "Online TypeScript formatter that works directly in your browser. Format, validate, and beautify TypeScript code instantly with type safety.",
      keywords: [
        "online typescript formatter",
        "online ts formatter",
        "typescript formatter online",
        "ts formatter online",
        "browser typescript formatter",
        "web typescript formatter",
        "typescript online tool",
        "format typescript online",
      ],
      h1: "Online TypeScript Formatter",
    },
    "secure": {
      slug: "secure",
      title: "Secure TypeScript Formatter - Privacy-Focused TS Code Formatting",
      description:
        "Secure TypeScript formatter with client-side processing. Your TypeScript code never leaves your browser. Complete privacy for sensitive code.",
      keywords: [
        "secure typescript formatter",
        "private typescript formatter",
        "privacy typescript formatter",
        "secure ts formatter",
        "client-side typescript formatter",
        "offline typescript formatter",
        "typescript formatter privacy",
        "secure code formatting",
        "private ts beautifier",
      ],
      h1: "Secure TypeScript Formatter",
    },
    "beautifier": {
      slug: "beautifier",
      title: "TypeScript Beautifier - Pretty Print and Format TypeScript Code",
      description:
        "TypeScript beautifier to format and pretty print your code. Transform minified TypeScript into readable, properly formatted code with type annotations.",
      keywords: [
        "typescript beautifier",
        "ts beautifier",
        "typescript pretty printer",
        "typescript prettifier",
        "format minified typescript",
        "typescript code cleaner",
        "typescript formatter prettier",
        "make typescript readable",
        "typescript indentation",
        "ts code beautifier",
      ],
      h1: "TypeScript Beautifier",
    },
  },

  python: {
    "free": {
      slug: "free",
      title: "Free Python Formatter - Format Python Code Online Free",
      description:
        "Free Python formatter and beautifier tool. Format Python code online at no cost with PEP 8 compliance. No registration required.",
      keywords: [
        "free python formatter",
        "free python beautifier",
        "free python code formatter",
        "free python prettifier",
        "no cost python formatter",
        "free online python formatter",
        "free python tool",
        "open source python formatter",
        "free pep8 formatter",
      ],
      h1: "Free Python Formatter",
    },
    "online": {
      slug: "online",
      title: "Online Python Formatter - Format Python Code in Browser",
      description:
        "Online Python formatter that works directly in your browser. Format Python code instantly with PEP 8 standards compliance.",
      keywords: [
        "online python formatter",
        "python formatter online",
        "browser python formatter",
        "web python formatter",
        "python online tool",
        "format python online",
        "online python beautifier",
        "python prettifier online",
      ],
      h1: "Online Python Formatter",
    },
    "secure": {
      slug: "secure",
      title: "Secure Python Formatter - Privacy-Focused Python Code Formatting",
      description:
        "Secure Python formatter with client-side processing. Your Python code never leaves your browser. Complete privacy for sensitive code.",
      keywords: [
        "secure python formatter",
        "private python formatter",
        "privacy python formatter",
        "client-side python formatter",
        "offline python formatter",
        "python formatter privacy",
        "secure code formatting",
        "private python beautifier",
      ],
      h1: "Secure Python Formatter",
    },
    "pep8": {
      slug: "pep8",
      title: "PEP 8 Python Formatter - Format Python Code PEP 8 Compliant",
      description:
        "PEP 8 Python formatter to ensure your code follows Python style guidelines. Automatic PEP 8 compliance with proper formatting.",
      keywords: [
        "pep8 formatter",
        "python pep8 formatter",
        "pep 8 formatter",
        "python style formatter",
        "python code style formatter",
        "pep8 compliance formatter",
        "python pep8 tool",
        "format python pep8",
        "pep8 code formatter",
      ],
      h1: "PEP 8 Python Formatter",
    },
  },

  json: {
    "free": {
      slug: "free",
      title: "Free JSON Formatter - Format JSON Code Online Free",
      description:
        "Free JSON formatter and beautifier tool. Format JSON data online at no cost with validation. No registration required.",
      keywords: [
        "free json formatter",
        "free json beautifier",
        "free json validator",
        "free json prettifier",
        "no cost json formatter",
        "free online json formatter",
        "free json tool",
        "open source json formatter",
        "free json pretty print",
      ],
      h1: "Free JSON Formatter",
    },
    "online": {
      slug: "online",
      title: "Online JSON Formatter - Format JSON Code in Browser",
      description:
        "Online JSON formatter that works directly in your browser. Format, validate, and beautify JSON data instantly.",
      keywords: [
        "online json formatter",
        "json formatter online",
        "browser json formatter",
        "web json formatter",
        "json online tool",
        "format json online",
        "online json beautifier",
        "json prettifier online",
        "json validator online",
      ],
      h1: "Online JSON Formatter",
    },
    "validator": {
      slug: "validator",
      title: "JSON Validator - Validate and Format JSON Code",
      description:
        "JSON validator to check syntax errors and format your JSON data. Instant validation with detailed error reporting and automatic formatting.",
      keywords: [
        "json validator",
        "json syntax validator",
        "validate json online",
        "json checker",
        "json validation tool",
        "json syntax checker",
        "json error detection",
        "json format validator",
        "online json validator",
      ],
      h1: "JSON Validator",
    },
    "pretty": {
      slug: "pretty",
      title: "JSON Pretty Print - Format and Beautify JSON Data",
      description:
        "JSON pretty print tool to format and beautify your JSON data. Transform compact JSON into readable, properly formatted output.",
      keywords: [
        "json pretty print",
        "json beautifier",
        "json formatter pretty",
        "pretty json",
        "format json pretty",
        "json indentation",
        "json readable format",
        "json prettifier",
        "make json readable",
        "json tree view",
      ],
      h1: "JSON Pretty Print",
    },
    "minify": {
      slug: "minify",
      title: "JSON Minifier - Compress and Minify JSON Data",
      description:
        "JSON minifier to compress and reduce JSON file size. Remove whitespace and optimize your JSON data for faster loading.",
      keywords: [
        "json minifier",
        "minify json",
        "compress json",
        "json compressor",
        "reduce json size",
        "optimize json",
        "json size reducer",
        "minify json online",
        "json compression tool",
      ],
      h1: "JSON Minifier",
    },
  },

  html: {
    "free": {
      slug: "free",
      title: "Free HTML Formatter - Format HTML Code Online Free",
      description:
        "Free HTML formatter and beautifier tool. Format HTML code online at no cost with proper indentation. No registration required.",
      keywords: [
        "free html formatter",
        "free html beautifier",
        "free html prettifier",
        "free html code formatter",
        "no cost html formatter",
        "free online html formatter",
        "free html tool",
        "open source html formatter",
      ],
      h1: "Free HTML Formatter",
    },
    "online": {
      slug: "online",
      title: "Online HTML Formatter - Format HTML Code in Browser",
      description:
        "Online HTML formatter that works directly in your browser. Format, validate, and beautify HTML code instantly.",
      keywords: [
        "online html formatter",
        "html formatter online",
        "browser html formatter",
        "web html formatter",
        "html online tool",
        "format html online",
        "online html beautifier",
        "html prettifier online",
      ],
      h1: "Online HTML Formatter",
    },
    "beautifier": {
      slug: "beautifier",
      title: "HTML Beautifier - Pretty Print and Format HTML Code",
      description:
        "HTML beautifier to format and pretty print your code. Transform minified HTML into readable, properly formatted markup.",
      keywords: [
        "html beautifier",
        "html pretty printer",
        "html prettifier",
        "format minified html",
        "html code cleaner",
        "html formatter prettier",
        "make html readable",
        "html indentation",
        "html code beautifier",
      ],
      h1: "HTML Beautifier",
    },
    "validator": {
      slug: "validator",
      title: "HTML Validator - Validate and Format HTML Code",
      description:
        "HTML validator to check syntax errors and format your markup. Instant validation with detailed error reporting.",
      keywords: [
        "html validator",
        "html syntax validator",
        "validate html online",
        "html checker",
        "html validation tool",
        "html syntax checker",
        "html error detection",
        "w3c html validator",
        "online html validator",
      ],
      h1: "HTML Validator",
    },
  },

  css: {
    "free": {
      slug: "free",
      title: "Free CSS Formatter - Format CSS Code Online Free",
      description:
        "Free CSS formatter and beautifier tool. Format CSS code online at no cost with proper indentation. No registration required.",
      keywords: [
        "free css formatter",
        "free css beautifier",
        "free css prettifier",
        "free css code formatter",
        "no cost css formatter",
        "free online css formatter",
        "free css tool",
        "open source css formatter",
      ],
      h1: "Free CSS Formatter",
    },
    "online": {
      slug: "online",
      title: "Online CSS Formatter - Format CSS Code in Browser",
      description:
        "Online CSS formatter that works directly in your browser. Format, validate, and beautify CSS code instantly.",
      keywords: [
        "online css formatter",
        "css formatter online",
        "browser css formatter",
        "web css formatter",
        "css online tool",
        "format css online",
        "online css beautifier",
        "css prettifier online",
      ],
      h1: "Online CSS Formatter",
    },
    "beautifier": {
      slug: "beautifier",
      title: "CSS Beautifier - Pretty Print and Format CSS Code",
      description:
        "CSS beautifier to format and pretty print your stylesheets. Transform minified CSS into readable, properly formatted code.",
      keywords: [
        "css beautifier",
        "css pretty printer",
        "css prettifier",
        "format minified css",
        "css code cleaner",
        "css formatter prettier",
        "make css readable",
        "css indentation",
        "css code beautifier",
      ],
      h1: "CSS Beautifier",
    },
    "minify": {
      slug: "minify",
      title: "CSS Minifier - Compress and Minify CSS Code",
      description:
        "CSS minifier to compress and reduce CSS file size. Remove whitespace and optimize your stylesheets for faster loading.",
      keywords: [
        "css minifier",
        "minify css",
        "compress css",
        "css compressor",
        "reduce css size",
        "optimize css",
        "css size reducer",
        "minify css online",
        "css compression tool",
      ],
      h1: "CSS Minifier",
    },
  },

  go: {
    "free": {
      slug: "free",
      title: "Free Go Formatter - Format Go Code Online Free",
      description:
        "Free Go formatter and beautifier tool. Format Go code online at no cost with gofmt standards. No registration required.",
      keywords: [
        "free go formatter",
        "free golang formatter",
        "free go beautifier",
        "free gofmt online",
        "no cost go formatter",
        "free online go formatter",
        "free go tool",
        "open source go formatter",
      ],
      h1: "Free Go Formatter",
    },
    "online": {
      slug: "online",
      title: "Online Go Formatter - Format Go Code in Browser",
      description:
        "Online Go formatter that works directly in your browser. Format Go code instantly using gofmt standards.",
      keywords: [
        "online go formatter",
        "go formatter online",
        "golang formatter online",
        "browser go formatter",
        "web go formatter",
        "gofmt online",
        "format go online",
        "online go beautifier",
        "golang prettifier online",
      ],
      h1: "Online Go Formatter",
    },
    "secure": {
      slug: "secure",
      title: "Secure Go Formatter - Privacy-Focused Go Code Formatting",
      description:
        "Secure Go formatter with client-side processing. Your Go code never leaves your browser. Complete privacy for sensitive code.",
      keywords: [
        "secure go formatter",
        "private go formatter",
        "privacy go formatter",
        "client-side go formatter",
        "offline go formatter",
        "go formatter privacy",
        "secure code formatting",
        "private go beautifier",
      ],
      h1: "Secure Go Formatter",
    },
    "gofmt": {
      slug: "gofmt",
      title: "Go Gofmt Online - Go Format Tool in Browser",
      description:
        "Online gofmt tool to format Go code according to Go standards. Format your code directly in your browser with gofmt.",
      keywords: [
        "gofmt online",
        "go fmt tool",
        "golang gofmt",
        "format go gofmt",
        "gofmt browser",
        "online gofmt",
        "go code formatter",
        "golang formatter tool",
      ],
      h1: "Go Gofmt Online",
    },
  },

  sql: {
    "free": {
      slug: "free",
      title: "Free SQL Formatter - Format SQL Queries Online Free",
      description:
        "Free SQL formatter and beautifier tool. Format SQL queries online at no cost with proper indentation. No registration required.",
      keywords: [
        "free sql formatter",
        "free sql beautifier",
        "free sql prettifier",
        "free sql code formatter",
        "no cost sql formatter",
        "free online sql formatter",
        "free sql tool",
        "free query formatter",
      ],
      h1: "Free SQL Formatter",
    },
    "online": {
      slug: "online",
      title: "Online SQL Formatter - Format SQL Queries in Browser",
      description:
        "Online SQL formatter that works directly in your browser. Format SQL queries instantly with proper indentation.",
      keywords: [
        "online sql formatter",
        "sql formatter online",
        "browser sql formatter",
        "web sql formatter",
        "sql online tool",
        "format sql online",
        "online sql beautifier",
        "sql prettifier online",
      ],
      h1: "Online SQL Formatter",
    },
    "beautifier": {
      slug: "beautifier",
      title: "SQL Beautifier - Pretty Print and Format SQL Queries",
      description:
        "SQL beautifier to format and pretty print your queries. Transform compact SQL into readable, properly formatted statements.",
      keywords: [
        "sql beautifier",
        "sql pretty printer",
        "sql prettifier",
        "format compact sql",
        "sql query cleaner",
        "sql formatter prettier",
        "make sql readable",
        "sql indentation",
        "sql query beautifier",
      ],
      h1: "SQL Beautifier",
    },
    "formatter": {
      slug: "formatter",
      title: "SQL Query Formatter - Format Database Queries",
      description:
        "SQL query formatter to organize and format your database queries. Improve readability of complex SQL statements.",
      keywords: [
        "sql query formatter",
        "format sql queries",
        "database query formatter",
        "sql statement formatter",
        "format database queries",
        "query formatting tool",
        "sql readability tool",
        "query organizer",
      ],
      h1: "SQL Query Formatter",
    },
  },

  yaml: {
    "free": {
      slug: "free",
      title: "Free YAML Formatter - Format YAML Code Online Free",
      description:
        "Free YAML formatter and beautifier tool. Format YAML files online at no cost with proper indentation. No registration required.",
      keywords: [
        "free yaml formatter",
        "free yml formatter",
        "free yaml beautifier",
        "free yaml prettifier",
        "no cost yaml formatter",
        "free online yaml formatter",
        "free yaml tool",
        "open source yaml formatter",
      ],
      h1: "Free YAML Formatter",
    },
    "online": {
      slug: "online",
      title: "Online YAML Formatter - Format YAML Code in Browser",
      description:
        "Online YAML formatter that works directly in your browser. Format YAML files instantly with proper indentation.",
      keywords: [
        "online yaml formatter",
        "yaml formatter online",
        "browser yaml formatter",
        "web yaml formatter",
        "yaml online tool",
        "format yaml online",
        "online yaml beautifier",
        "yaml prettifier online",
        "yml formatter online",
      ],
      h1: "Online YAML Formatter",
    },
    "validator": {
      slug: "validator",
      title: "YAML Validator - Validate and Format YAML Code",
      description:
        "YAML validator to check syntax errors and format your YAML files. Instant validation with detailed error reporting.",
      keywords: [
        "yaml validator",
        "yml validator",
        "validate yaml online",
        "yaml checker",
        "yaml validation tool",
        "yaml syntax checker",
        "yaml error detection",
        "online yaml validator",
        "yaml format validator",
      ],
      h1: "YAML Validator",
    },
    "pretty": {
      slug: "pretty",
      title: "YAML Pretty Print - Format and Beautify YAML Files",
      description:
        "YAML pretty print tool to format and beautify your configuration files. Transform compact YAML into readable format.",
      keywords: [
        "yaml pretty print",
        "yaml beautifier",
        "yaml formatter pretty",
        "pretty yaml",
        "format yaml pretty",
        "yaml indentation",
        "yaml readable format",
        "yaml prettifier",
        "make yaml readable",
        "yml pretty print",
      ],
      h1: "YAML Pretty Print",
    },
  },

  // Add variants for all missing languages
  c: {
    "free": {
      slug: "free",
      title: "Free C Formatter - Format C Code Online Free",
      description:
        "Free C formatter and beautifier tool. Format C code online at no cost with proper indentation. No registration required.",
      keywords: [
        "free c formatter",
        "free c beautifier",
        "free c prettifier",
        "free c code formatter",
        "no cost c formatter",
        "free online c formatter",
        "free c tool",
        "clang format online free",
      ],
      h1: "Free C Formatter",
    },
    "online": {
      slug: "online",
      title: "Online C Formatter - Format C Code in Browser",
      description:
        "Online C formatter that works directly in your browser. Format C code instantly with clang standards.",
      keywords: [
        "online c formatter",
        "c formatter online",
        "browser c formatter",
        "clang format online",
        "c clang formatter",
        "format c online",
        "online c beautifier",
        "c code formatter online",
      ],
      h1: "Online C Formatter",
    },
    "clang": {
      slug: "clang",
      title: "Clang C Formatter - Format C with Clang Online",
      description:
        "Online clang formatter to format C code according to LLVM standards. Format your code directly in your browser.",
      keywords: [
        "clang formatter",
        "clang format online",
        "llvm c formatter",
        "c clang format",
        "format c clang",
        "clang code formatter",
        "c clang tool",
      ],
      h1: "Clang C Formatter",
    },
  },

  cpp: {
    "free": {
      slug: "free",
      title: "Free C++ Formatter - Format C++ Code Online Free",
      description:
        "Free C++ formatter and beautifier tool. Format C++ code online at no cost with proper indentation. No registration required.",
      keywords: [
        "free cpp formatter",
        "free c++ formatter",
        "free cpp beautifier",
        "free c++ prettifier",
        "no cost cpp formatter",
        "free online cpp formatter",
        "free c++ tool",
        "clang format c++ free",
      ],
      h1: "Free C++ Formatter",
    },
    "online": {
      slug: "online",
      title: "Online C++ Formatter - Format C++ Code in Browser",
      description:
        "Online C++ formatter that works directly in your browser. Format C++ code instantly with clang standards.",
      keywords: [
        "online cpp formatter",
        "c++ formatter online",
        "browser c++ formatter",
        "clang format c++ online",
        "cpp clang formatter",
        "format c++ online",
        "online c++ beautifier",
        "c++ code formatter online",
      ],
      h1: "Online C++ Formatter",
    },
    "clang": {
      slug: "clang",
      title: "Clang C++ Formatter - Format C++ with Clang Online",
      description:
        "Online clang formatter to format C++ code according to LLVM standards. Format your code directly in your browser.",
      keywords: [
        "clang formatter c++",
        "clang format c++ online",
        "llvm c++ formatter",
        "format c++ clang",
        "clang c++ tool",
        "c++ clang formatter online",
      ],
      h1: "Clang C++ Formatter",
    },
  },

  csharp: {
    "free": {
      slug: "free",
      title: "Free C# Formatter - Format C# Code Online Free",
      description:
        "Free C# formatter and beautifier tool. Format C# code online at no cost with proper indentation. No registration required.",
      keywords: [
        "free c# formatter",
        "free csharp formatter",
        "free c# beautifier",
        "free c# prettifier",
        "no cost c# formatter",
        "free online c# formatter",
        "free c# tool",
        "dotnet formatter free",
      ],
      h1: "Free C# Formatter",
    },
    "online": {
      slug: "online",
      title: "Online C# Formatter - Format C# Code in Browser",
      description:
        "Online C# formatter that works directly in your browser. Format C# code instantly with .NET standards.",
      keywords: [
        "online c# formatter",
        "c# formatter online",
        "browser c# formatter",
        "dotnet formatter online",
        "csharp online formatter",
        "format c# online",
        "online c# beautifier",
        "c# code formatter online",
      ],
      h1: "Online C# Formatter",
    },
    "dotnet": {
      slug: "dotnet",
      title: ".NET C# Formatter - Format C# with .NET Standards",
      description:
        "Online .NET C# formatter to format C# code according to Microsoft standards. Format your code directly in your browser.",
      keywords: [
        ".net c# formatter",
        "dotnet formatter online",
        "microsoft c# formatter",
        "c# dotnet format",
        ".net code formatter",
        "c# microsoft formatter",
        "csharp dotnet tool",
      ],
      h1: ".NET C# Formatter",
    },
  },

  scss: {
    "free": {
      slug: "free",
      title: "Free SCSS Formatter - Format SCSS Code Online Free",
      description:
        "Free SCSS formatter and beautifier tool. Format SCSS code online at no cost with proper indentation. No registration required.",
      keywords: [
        "free scss formatter",
        "free sass formatter",
        "free scss beautifier",
        "free scss prettifier",
        "no cost scss formatter",
        "free online scss formatter",
        "free scss tool",
        "scss compiler free",
      ],
      h1: "Free SCSS Formatter",
    },
    "online": {
      slug: "online",
      title: "Online SCSS Formatter - Format SCSS Code in Browser",
      description:
        "Online SCSS formatter that works directly in your browser. Format SCSS code instantly with proper nesting.",
      keywords: [
        "online scss formatter",
        "scss formatter online",
        "browser scss formatter",
        "sass formatter online",
        "scss to css online",
        "format scss online",
        "online scss beautifier",
        "scss code formatter online",
      ],
      h1: "Online SCSS Formatter",
    },
    "compiler": {
      slug: "compiler",
      title: "SCSS Compiler - Compile and Format SCSS to CSS",
      description:
        "SCSS compiler to compile and format SCSS code to CSS. Transform SCSS stylesheets to browser-ready CSS.",
      keywords: [
        "scss compiler",
        "sass compiler",
        "scss to css",
        "sass to css",
        "compile scss online",
        "scss to css converter",
        "sass css compiler",
        "online scss compiler",
      ],
      h1: "SCSS Compiler",
    },
  },

  dart: {
    "free": {
      slug: "free",
      title: "Free Dart Formatter - Format Dart Code Online Free",
      description:
        "Free Dart formatter and beautifier tool. Format Dart code online at no cost with proper indentation. No registration required.",
      keywords: [
        "free dart formatter",
        "free dart beautifier",
        "free dart prettifier",
        "free dart code formatter",
        "no cost dart formatter",
        "free online dart formatter",
        "free dart tool",
        "flutter formatter free",
      ],
      h1: "Free Dart Formatter",
    },
    "online": {
      slug: "online",
      title: "Online Dart Formatter - Format Dart Code in Browser",
      description:
        "Online Dart formatter that works directly in your browser. Format Dart code instantly with Dart standards.",
      keywords: [
        "online dart formatter",
        "dart formatter online",
        "browser dart formatter",
        "flutter formatter online",
        "dart online tool",
        "format dart online",
        "online dart beautifier",
        "dart code formatter online",
      ],
      h1: "Online Dart Formatter",
    },
    "flutter": {
      slug: "flutter",
      title: "Flutter Dart Formatter - Format Flutter Dart Code",
      description:
        "Flutter Dart formatter to format Dart code used in Flutter development. Ensure your Flutter code follows Dart formatting standards.",
      keywords: [
        "flutter dart formatter",
        "dart flutter formatter",
        "flutter code formatter",
        "dart flutter tool",
        "format dart flutter",
        "flutter dart online",
        "flutter code formatter",
      ],
      h1: "Flutter Dart Formatter",
    },
  },

  java: {
    "free": {
      slug: "free",
      title: "Free Java Formatter - Format Java Code Online Free",
      description:
        "Free Java formatter and beautifier tool. Format Java code online at no cost with proper indentation. No registration required.",
      keywords: [
        "free java formatter",
        "free java beautifier",
        "free java prettifier",
        "free java code formatter",
        "no cost java formatter",
        "free online java formatter",
        "free java tool",
        "java google formatter free",
      ],
      h1: "Free Java Formatter",
    },
    "online": {
      slug: "online",
      title: "Online Java Formatter - Format Java Code in Browser",
      description:
        "Online Java formatter that works directly in your browser. Format Java code instantly with Java conventions.",
      keywords: [
        "online java formatter",
        "java formatter online",
        "browser java formatter",
        "web java formatter",
        "java online tool",
        "format java online",
        "online java beautifier",
        "java code formatter online",
      ],
      h1: "Online Java Formatter",
    },
    "google": {
      slug: "google",
      title: "Google Java Formatter - Format Java with Google Style",
      description:
        "Online Google Java formatter to format Java code according to Google's Java Style Guide. Professional code formatting.",
      keywords: [
        "google java formatter",
        "java google format",
        "google java style",
        "java style formatter",
        "google java style guide",
        "format java google",
        "java code formatter google",
      ],
      h1: "Google Java Formatter",
    },
  },

  lua: {
    "free": {
      slug: "free",
      title: "Free Lua Formatter - Format Lua Code Online Free",
      description:
        "Free Lua formatter and beautifier tool. Format Lua code online at no cost with proper indentation. No registration required.",
      keywords: [
        "free lua formatter",
        "free lua beautifier",
        "free lua prettifier",
        "free lua code formatter",
        "no cost lua formatter",
        "free online lua formatter",
        "free lua tool",
        "lua script formatter free",
      ],
      h1: "Free Lua Formatter",
    },
    "online": {
      slug: "online",
      title: "Online Lua Formatter - Format Lua Code in Browser",
      description:
        "Online Lua formatter that works directly in your browser. Format Lua code instantly with proper syntax.",
      keywords: [
        "online lua formatter",
        "lua formatter online",
        "browser lua formatter",
        "web lua formatter",
        "lua online tool",
        "format lua online",
        "online lua beautifier",
        "lua code formatter online",
      ],
      h1: "Online Lua Formatter",
    },
    "beautifier": {
      slug: "beautifier",
      title: "Lua Beautifier - Pretty Print and Format Lua Scripts",
      description:
        "Lua beautifier to format and pretty print your scripts. Transform minified Lua into readable, properly formatted code.",
      keywords: [
        "lua beautifier",
        "lua pretty printer",
        "lua prettifier",
        "format minified lua",
        "lua script cleaner",
        "lua formatter prettier",
        "make lua readable",
        "lua indentation",
        "lua code beautifier",
      ],
      h1: "Lua Beautifier",
    },
  },

  markdown: {
    "free": {
      slug: "free",
      title: "Free Markdown Formatter - Format Markdown Online Free",
      description:
        "Free Markdown formatter and beautifier tool. Format Markdown files online at no cost with proper formatting. No registration required.",
      keywords: [
        "free markdown formatter",
        "free md formatter",
        "free markdown beautifier",
        "free markdown prettifier",
        "no cost markdown formatter",
        "free online markdown formatter",
        "free markdown tool",
      ],
      h1: "Free Markdown Formatter",
    },
    "online": {
      slug: "online",
      title: "Online Markdown Formatter - Format Markdown in Browser",
      description:
        "Online Markdown formatter that works directly in your browser. Format Markdown files instantly with proper syntax.",
      keywords: [
        "online markdown formatter",
        "markdown formatter online",
        "browser markdown formatter",
        "web markdown formatter",
        "markdown online tool",
        "format markdown online",
        "online markdown beautifier",
        "markdown formatter online",
      ],
      h1: "Online Markdown Formatter",
    },
    "beautifier": {
      slug: "beautifier",
      title: "Markdown Beautifier - Pretty Print and Format Markdown",
      description:
        "Markdown beautifier to format and pretty print your documents. Transform messy Markdown into properly formatted text.",
      keywords: [
        "markdown beautifier",
        "md beautifier",
        "markdown pretty printer",
        "markdown prettifier",
        "format messy markdown",
        "markdown document cleaner",
        "make markdown readable",
      ],
      h1: "Markdown Beautifier",
    },
  },

  php: {
    "free": {
      slug: "free",
      title: "Free PHP Formatter - Format PHP Code Online Free",
      description:
        "Free PHP formatter and beautifier tool. Format PHP code online at no cost with proper indentation. No registration required.",
      keywords: [
        "free php formatter",
        "free php beautifier",
        "free php prettifier",
        "free php code formatter",
        "no cost php formatter",
        "free online php formatter",
        "free php tool",
        "php cs fixer free",
      ],
      h1: "Free PHP Formatter",
    },
    "online": {
      slug: "online",
      title: "Online PHP Formatter - Format PHP Code in Browser",
      description:
        "Online PHP formatter that works directly in your browser. Format PHP code instantly with PHP standards.",
      keywords: [
        "online php formatter",
        "php formatter online",
        "browser php formatter",
        "web php formatter",
        "php online tool",
        "format php online",
        "online php beautifier",
        "php code formatter online",
      ],
      h1: "Online PHP Formatter",
    },
    "beautifier": {
      slug: "beautifier",
      title: "PHP Beautifier - Pretty Print and Format PHP Code",
      description:
        "PHP beautifier to format and pretty print your code. Transform minified PHP into readable, properly formatted scripts.",
      keywords: [
        "php beautifier",
        "php pretty printer",
        "php prettifier",
        "format minified php",
        "php script cleaner",
        "php formatter prettier",
        "make php readable",
        "php indentation",
        "php code beautifier",
      ],
      h1: "PHP Beautifier",
    },
  },

  proto: {
    "free": {
      slug: "free",
      title: "Free Protocol Buffers Formatter - Format Proto Files Online Free",
      description:
        "Free Protocol Buffers formatter and beautifier tool. Format .proto files online at no cost. No registration required.",
      keywords: [
        "free proto formatter",
        "free protobuf formatter",
        "free protocol buffers formatter",
        "no cost proto formatter",
        "free online proto formatter",
        "free proto tool",
        "protobuf formatter free",
      ],
      h1: "Free Protocol Buffers Formatter",
    },
    "online": {
      slug: "online",
      title: "Online Protocol Buffers Formatter - Format Proto in Browser",
      description:
        "Online Protocol Buffers formatter that works directly in your browser. Format .proto files instantly.",
      keywords: [
        "online proto formatter",
        "proto formatter online",
        "browser proto formatter",
        "protobuf formatter online",
        "proto online tool",
        "format proto online",
        "online protobuf beautifier",
        "proto file formatter",
      ],
      h1: "Online Protocol Buffers Formatter",
    },
    "beautifier": {
      slug: "beautifier",
      title: "Protocol Buffers Beautifier - Pretty Print Proto Files",
      description:
        "Protocol Buffers beautifier to format and pretty print your .proto files. Transform compact proto into readable format.",
      keywords: [
        "proto beautifier",
        "protobuf beautifier",
        "proto pretty printer",
        "proto prettifier",
        "format proto pretty",
        "proto indentation",
        "protobuf readable format",
        "make proto readable",
      ],
      h1: "Protocol Buffers Beautifier",
    },
  },

  rust: {
    "free": {
      slug: "free",
      title: "Free Rust Formatter - Format Rust Code Online Free",
      description:
        "Free Rust formatter and beautifier tool. Format Rust code online at no cost with rustfmt. No registration required.",
      keywords: [
        "free rust formatter",
        "free rustfmt online",
        "free rust beautifier",
        "free rust prettifier",
        "no cost rust formatter",
        "free online rust formatter",
        "free rust tool",
        "rustfmt free",
      ],
      h1: "Free Rust Formatter",
    },
    "online": {
      slug: "online",
      title: "Online Rust Formatter - Format Rust Code in Browser",
      description:
        "Online Rust formatter that works directly in your browser. Format Rust code instantly using rustfmt.",
      keywords: [
        "online rust formatter",
        "rust formatter online",
        "browser rust formatter",
        "rustfmt online",
        "rust online tool",
        "format rust online",
        "online rust beautifier",
        "rust code formatter online",
      ],
      h1: "Online Rust Formatter",
    },
    "rustfmt": {
      slug: "rustfmt",
      title: "Rustfmt Online - Format Rust with rustfmt Tool",
      description:
        "Online rustfmt tool to format Rust code according to Rust standards. Format your code directly in your browser.",
      keywords: [
        "rustfmt online",
        "rust fmt tool",
        "rust rustfmt",
        "format rust rustfmt",
        "rustfmt browser",
        "online rustfmt",
        "rust code formatter",
      ],
      h1: "Rustfmt Online",
    },
  },

  xml: {
    "free": {
      slug: "free",
      title: "Free XML Formatter - Format XML Code Online Free",
      description:
        "Free XML formatter and beautifier tool. Format XML code online at no cost with proper indentation. No registration required.",
      keywords: [
        "free xml formatter",
        "free xml beautifier",
        "free xml prettifier",
        "free xml code formatter",
        "no cost xml formatter",
        "free online xml formatter",
        "free xml tool",
        "xml formatter free",
      ],
      h1: "Free XML Formatter",
    },
    "online": {
      slug: "online",
      title: "Online XML Formatter - Format XML Code in Browser",
      description:
        "Online XML formatter that works directly in your browser. Format XML code instantly with proper syntax.",
      keywords: [
        "online xml formatter",
        "xml formatter online",
        "browser xml formatter",
        "web xml formatter",
        "xml online tool",
        "format xml online",
        "online xml beautifier",
        "xml code formatter online",
      ],
      h1: "Online XML Formatter",
    },
    "beautifier": {
      slug: "beautifier",
      title: "XML Beautifier - Pretty Print and Format XML Code",
      description:
        "XML beautifier to format and pretty print your markup. Transform minified XML into readable, properly formatted code.",
      keywords: [
        "xml beautifier",
        "xml pretty printer",
        "xml prettifier",
        "format minified xml",
        "xml code cleaner",
        "xml formatter prettier",
        "make xml readable",
        "xml indentation",
        "xml code beautifier",
      ],
      h1: "XML Beautifier",
    },
    "validator": {
      slug: "validator",
      title: "XML Validator - Validate and Format XML Code",
      description:
        "XML validator to check syntax errors and format your markup. Instant validation with detailed error reporting.",
      keywords: [
        "xml validator",
        "xml syntax validator",
        "validate xml online",
        "xml checker",
        "xml validation tool",
        "xml syntax checker",
        "xml error detection",
        "w3c xml validator",
        "online xml validator",
      ],
      h1: "XML Validator",
    },
  },

  zig: {
    "free": {
      slug: "free",
      title: "Free Zig Formatter - Format Zig Code Online Free",
      description:
        "Free Zig formatter and beautifier tool. Format Zig code online at no cost with proper indentation. No registration required.",
      keywords: [
        "free zig formatter",
        "free zig beautifier",
        "free zig prettifier",
        "free zig code formatter",
        "no cost zig formatter",
        "free online zig formatter",
        "free zig tool",
        "zig fmt free",
      ],
      h1: "Free Zig Formatter",
    },
    "online": {
      slug: "online",
      title: "Online Zig Formatter - Format Zig Code in Browser",
      description: "Online Zig formatter that works directly in your browser. Format Zig code instantly using zig fmt.",
      keywords: [
        "online zig formatter",
        "zig formatter online",
        "browser zig formatter",
        "zig fmt online",
        "zig online tool",
        "format zig online",
        "online zig beautifier",
        "zig code formatter online",
      ],
      h1: "Online Zig Formatter",
    },
    "zig-fmt": {
      slug: "zig-fmt",
      title: "Zig fmt Online - Format Zig with zig fmt Tool",
      description:
        "Online zig fmt tool to format Zig code according to Zig standards. Format your code directly in your browser.",
      keywords: [
        "zig fmt online",
        "zig format tool",
        "zig zigfmt",
        "format zig zig-fmt",
        "zig fmt browser",
        "online zig fmt",
        "zig code formatter",
      ],
      h1: "Zig fmt Online",
    },
  },

  // Special tool variants
  "javascript-biome": {
    "free": {
      slug: "free",
      title: "Free JavaScript Biome Formatter - Format JS with Biome Online Free",
      description:
        "Free JavaScript Biome formatter tool. Format JavaScript code using Biome online at no cost. No registration required.",
      keywords: [
        "free javascript biome formatter",
        "free js biome formatter",
        "javascript biome free",
        "biome formatter free",
        "no cost javascript biome",
        "free online biome formatter",
      ],
      h1: "Free JavaScript Biome Formatter",
    },
    "online": {
      slug: "online",
      title: "Online JavaScript Biome Formatter - Format JS with Biome",
      description:
        "Online JavaScript Biome formatter that works directly in your browser. Format JavaScript code using Biome standards.",
      keywords: [
        "online javascript biome formatter",
        "javascript biome online",
        "browser js biome formatter",
        "biome online tool",
        "format javascript biome",
        "js biome online",
      ],
      h1: "Online JavaScript Biome Formatter",
    },
    "biome": {
      slug: "biome",
      title: "JavaScript Biome Formatter - Format JS with Biome Tool",
      description:
        "JavaScript Biome formatter to format code using Biome's fast formatter. Professional JavaScript formatting with Biome.",
      keywords: [
        "javascript biome",
        "biome formatter",
        "biome js formatter",
        "javascript biome tool",
        "format javascript biome",
        "biome code formatter",
      ],
      h1: "JavaScript Biome Formatter",
    },
  },

  "typescript-biome": {
    "free": {
      slug: "free",
      title: "Free TypeScript Biome Formatter - Format TS with Biome Online Free",
      description:
        "Free TypeScript Biome formatter tool. Format TypeScript code using Biome online at no cost. No registration required.",
      keywords: [
        "free typescript biome formatter",
        "free ts biome formatter",
        "typescript biome free",
        "biome formatter free",
        "no cost typescript biome",
        "free online biome ts formatter",
      ],
      h1: "Free TypeScript Biome Formatter",
    },
    "online": {
      slug: "online",
      title: "Online TypeScript Biome Formatter - Format TS with Biome",
      description:
        "Online TypeScript Biome formatter that works directly in your browser. Format TypeScript code using Biome standards.",
      keywords: [
        "online typescript biome formatter",
        "typescript biome online",
        "browser ts biome formatter",
        "biome ts online",
        "format typescript biome",
        "ts biome online",
      ],
      h1: "Online TypeScript Biome Formatter",
    },
    "biome": {
      slug: "biome",
      title: "TypeScript Biome Formatter - Format TS with Biome Tool",
      description:
        "TypeScript Biome formatter to format code using Biome's fast formatter. Professional TypeScript formatting with Biome.",
      keywords: [
        "typescript biome",
        "biome formatter",
        "biome ts formatter",
        "typescript biome tool",
        "format typescript biome",
        "biome code formatter",
      ],
      h1: "TypeScript Biome Formatter",
    },
  },

  "php-mago": {
    "free": {
      slug: "free",
      title: "Free PHP Mago Formatter - Format PHP with Mago Online Free",
      description:
        "Free PHP Mago formatter tool. Format PHP code using Mago online at no cost. No registration required.",
      keywords: [
        "free php mago formatter",
        "free mago formatter",
        "php mago free",
        "mago formatter free",
        "no cost php mago",
        "free online mago formatter",
      ],
      h1: "Free PHP Mago Formatter",
    },
    "online": {
      slug: "online",
      title: "Online PHP Mago Formatter - Format PHP with Mago",
      description:
        "Online PHP Mago formatter that works directly in your browser. Format PHP code using Mago standards.",
      keywords: [
        "online php mago formatter",
        "php mago online",
        "browser mago formatter",
        "mago php online",
        "format php mago",
        "mago formatter online",
      ],
      h1: "Online PHP Mago Formatter",
    },
    "mago": {
      slug: "mago",
      title: "PHP Mago Formatter - Format PHP with Mago Tool",
      description: "PHP Mago formatter to format code using Mago's formatter. Professional PHP formatting with Mago.",
      keywords: [
        "php mago",
        "mago formatter",
        "mago php formatter",
        "php mago tool",
        "format php mago",
        "mago code formatter",
      ],
      h1: "PHP Mago Formatter",
    },
  },

  "python-ruff": {
    "free": {
      slug: "free",
      title: "Free Python Ruff Formatter - Format Python with Ruff Online Free",
      description:
        "Free Python Ruff formatter tool. Format Python code using Ruff online at no cost. No registration required.",
      keywords: [
        "free python ruff formatter",
        "free ruff formatter",
        "python ruff free",
        "ruff formatter free",
        "no cost python ruff",
        "free online ruff formatter",
      ],
      h1: "Free Python Ruff Formatter",
    },
    "online": {
      slug: "online",
      title: "Online Python Ruff Formatter - Format Python with Ruff",
      description:
        "Online Python Ruff formatter that works directly in your browser. Format Python code using Ruff standards.",
      keywords: [
        "online python ruff formatter",
        "python ruff online",
        "browser ruff formatter",
        "ruff python online",
        "format python ruff",
        "ruff formatter online",
      ],
      h1: "Online Python Ruff Formatter",
    },
    "ruff": {
      slug: "ruff",
      title: "Python Ruff Formatter - Format Python with Ruff Tool",
      description:
        "Python Ruff formatter to format code using Ruff's fast formatter. Professional Python formatting with Ruff.",
      keywords: [
        "python ruff",
        "ruff formatter",
        "ruff python formatter",
        "python ruff tool",
        "format python ruff",
        "ruff code formatter",
      ],
      h1: "Python Ruff Formatter",
    },
    "linter": {
      slug: "linter",
      title: "Python Ruff Linter - Lint and Format Python Code",
      description: "Python Ruff linter to lint and format Python code. Fast Python linting and formatting with Ruff.",
      keywords: [
        "python ruff linter",
        "ruff linter",
        "python linter",
        "ruff lint tool",
        "format lint python",
        "ruff lint formatter",
      ],
      h1: "Python Ruff Linter",
    },
  },
};

// Helper function to get variant data
export function getLanguageVariant(language: string, variant: string): SEOVariant | null {
  // Safety checks
  if (!language || !variant) return null;

  const variants = languageVariants[language];
  if (!variants) return null;

  return variants[variant] || null;
}

// Helper function to get all variants for a language
export function getLanguageVariants(language: string): SEOVariant[] {
  // Safety check - return empty array if language is undefined
  if (!language) return [];

  const variants = languageVariants[language];
  if (!variants) return [];

  return Object.values(variants);
}

// Helper function to generate all variant paths
export function generateVariantPaths(): Array<{ params: { lang: string[] } }> {
  const paths: Array<{ params: { lang: string[] } }> = [];

  Object.entries(languageVariants).forEach(([language, variants]) => {
    Object.keys(variants).forEach(variant => {
      paths.push({
        params: { lang: [language, variant] },
      });
    });
  });

  return paths;
}

// Helper function to check if a path is a variant
export function isVariantPath(pathSegments: string[]): boolean {
  if (!pathSegments || pathSegments.length !== 2) return false;

  const [language, variant] = pathSegments;
  if (!language || !variant) return false;

  const variants = languageVariants[language];

  return !!(variants && variants[variant]);
}
