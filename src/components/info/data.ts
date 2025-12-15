import type { LanguageInfo } from "./types";

export const languageInfoData: LanguageInfo = {
  "json": {
    "title": "JSON Formatter",
    "description":
      "JavaScript Object Notation processor. Validates, formats, and optimizes JSON data structures with zero-latency client-side execution.",
    "features": [
      "Schema Validation: RFC 8259 compliance checking with detailed error telemetry.",
      "Data Optimization: Intelligent minification removes redundant whitespace without breaking structure.",
      "Syntax Correction: Auto-repair for common JSON formatting errors and missing delimiters.",
      "Secure Processing: Browser-based execution prevents data exposure to external servers.",
      "Performance Metrics: Real-time file size reduction analysis and compression ratios.",
    ],
    "additional_info": [
      "JSON is the universal data interchange protocol for web APIs and configuration files.",
      "Supports hierarchical data structures using key-value pairs and typed arrays.",
      "Language-agnostic format with native parsing support in virtually all programming languages.",
      "Essential for modern web services, IoT configuration, and NoSQL database storage.",
    ],
    "tools": [
      "JSON Formatter & Minifier",
      "JSON Schema Validator",
      "JSON to XML/CSV Converter",
      "JSON Path Evaluator",
    ],
    "validator": {
      "title": "JSON Integrity Checker",
      "description": "RFC-compliant validation engine for JSON data structures.",
      "features": [
        "Parse Error Detection: Pinpoints exact location of syntax violations.",
        "Character Encoding Analysis: Validates UTF-8 and escape sequence compliance.",
        "Structure Verification: Ensures proper object and array nesting patterns.",
        "Performance Analysis: Benchmarks parsing speed and memory efficiency.",
      ],
    },
  },
  "javascript": {
    "title": "JavaScript Formatter",
    "description":
      "ECMAScript code processor. Optimizes, validates, and formats JavaScript/TypeScript with ES6+ syntax support and real-time error detection.",
    "features": [
      "ES6+ Compliance: Full support for modern JavaScript syntax including async/await and destructuring.",
      "Code Optimization: Intelligent minification preserves functionality while reducing payload size.",
      "Syntax Analysis: Real-time detection of undefined variables, missing semicolons, and structural errors.",
      "WASM-Powered: WebAssembly engine provides instant formatting without server dependency.",
      "Configurable Standards: Configurable indentation, brace style, and quote preferences.",
    ],
    "additional_info": [
      "JavaScript (ECMAScript) is the universal client-side scripting language for web browsers.",
      "Enables dynamic content manipulation, event handling, and asynchronous data operations.",
      "Runtime-agnostic language compatible with Node.js, Deno, and browser environments.",
      "Foundation for modern frameworks including React, Vue, Angular, and Express.js.",
    ],
    "tools": [
      "JavaScript Formatter & Minifier",
      "ES6+ Syntax Validator",
      "TypeScript Converter",
      "JavaScript Obfuscator",
    ],
    "validator": {
      "title": "ECMAScript Compliance Engine",
      "description": "Validates JavaScript against ECMAScript specifications with comprehensive error reporting.",
      "features": [
        "Syntax Error Detection: Identifies parsing errors with line and column precision.",
        "Variable Scope Analysis: Detects undeclared variables and scope violations.",
        "ESLint Integration: Applies industry-standard linting rules and best practices.",
        "Performance Profiling: Analyzes potential bottlenecks and optimization opportunities.",
      ],
    },
  },
  "typescript": {
    "title": "TypeScript Formatter",
    "description":
      "Happy Formatter's TypeScript Formatter and TypeScript Validator help to auto format TypeScript code and validate your TypeScript text.",
    "features": [
      "TypeScript formatter online is the best tool to format TypeScript data.",
      "TypeScript minifier online is the best tool to minify TypeScript data.",
      "It helps to validate TypeScript online with error messages.",
      "It's also a TypeScript Beautifier that supports indentation levels: 2 spaces, 3 spaces, and 4 spaces.",
      "Supports printing of TypeScript data.",
      "Stores data locally for the last TypeScript formatted in the browser's local storage. This can be used as a Notepad++, Sublime, or VSCode alternative for TypeScript beautification.",
      "This TypeScript online formatter can also work as TypeScript Lint.",
      "Use the auto switch to turn auto-update on or off for beautification.",
      "It uses WebAssembly (WASM) to beautify TypeScript, making it easy for a human to read and analyze.",
      "Download TypeScript once it's created or modified, and it can be opened in Notepad++, Sublime, or VSCode alternative.",
      "TypeScript Format Checker helps to fix the missing quotes; click the setting icon which looks like a screwdriver on the left side of the editor to fix the format.",
    ],
    "additional_info": [
      "TypeScript is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript, and adds optional static typing to the language.",
      "TypeScript is designed for the development of large applications and transpiles to JavaScript, making it compatible with all browsers and environments.",
      "TypeScript is a statically typed language, which means that the type of a variable is known at compile time, helping to catch errors before runtime.",
      "TypeScript is an open-source language, allowing developers to use it freely and contribute to its development.",
    ],
    "tools": [
      "Online TypeScript Formatter and Online TypeScript Validator provide TypeScript converter tools to convert TypeScript to XML, TypeScript to CSV, and TypeScript to YAML. Also includes TypeScript Editor, TypeScriptLint, TypeScript Checker, and TypeScript Cleaner.",
      "Free TypeScript Formatting Online and TypeScript Validator work well in Windows, Mac, Linux, Chrome, Firefox, Safari, and Edge.",
    ],
    "validator": {
      "title": "TypeScript Validator",
      "description":
        "TypeScript Validator Online checks the integrity/syntax of the TypeScript data based on JavaScript Object Notation (JSON) Data Interchange Format Specifications (RFC).",
      "features": [
        "It's super easy to find the error when line numbers are highlighted with an in-detail error description.",
        "Use the format button as a TypeScript Fixer to repair the error.",
        "To validate TypeScript you just need internet and no need to install any software.",
        "Your TypeScript data gets validated in the browser itself.",
      ],
    },
  },
  "css": {
    "title": "CSS Formatter",
    "description":
      "Cascading Style Sheets formatting utility. Organizes layout rules, standardizes property sorting, and compresses stylesheets for production.",
    "features": [
      "Style Standardization: Uniform indentation for selectors and declarations.",
      "CSS Minification: Removes whitespace/comments to minimize network payload.",
      "Syntax Verification: Validates against CSS3 specifications.",
      "Safe Processing: 100% Client-side execution via WebAssembly.",
      "Auto-Repair: Fixes missing semicolons and braces automatically.",
    ],
    "additional_info": [
      "CSS (Cascading Style Sheets) dictates the visual presentation of XML/HTML documents.",
      "Separates content structure from visual design (layout, colors, fonts).",
      "Minification is essential for improving First Contentful Paint (FCP) metrics.",
    ],
    "tools": [
      "CSS Formatter",
      "CSS Minifier",
      "SCSS/SASS Preprocessor Support",
      "CSS Validator",
    ],
    "validator": {
      "title": "CSS Validator",
      "description": "Checks stylesheets for syntax errors and deprecated properties.",
      "features": [
        "Identifies malformed selectors and invalid property values.",
        "Real-time feedback loop for rapid style debugging.",
        "Supports modern CSS variables and flexbox/grid syntax.",
      ],
    },
  },
  "html": {
    "title": "HTML Formatter",
    "description":
      "A high-performance formatting engine for HyperText Markup Language. Standardizes indentation, corrects syntax topology, and optimizes DOM structure for production environments.",
    "features": [
      "Native Formatting Engine: Instantly standardizes HTML structure with configurable indentation (2/4 spaces, tabs).",
      "Payload Compression: Integrated Minifier Module reduces file size for faster load times.",
      "Syntax Integrity: Real-time validation detects unclosed tags and malformed elements.",
      "Local Persistence: Browser-based LocalStorage ensures work is never lost during session refreshes.",
      "WASM Architecture: Powered by WebAssembly for zero-latency processing without server-side data transfer.",
      "Linting Protocol: Auto-detects and flags syntax errors before deployment.",
      "Clipboard Integration: One-click export to clipboard or raw file download.",
    ],
    "additional_info": [
      "HTML (HyperText Markup Language) is the standard structural protocol for web interfaces.",
      "It defines content hierarchy using semantic elements (headers, articles, media streams).",
      "Proper formatting ensures cross-browser compatibility and maintainability for development teams.",
      "Semantic HTML is critical for Accessibility (a11y) and Search Engine Optimization (SEO).",
    ],
    "tools": [
      "HTML Formatter & Minifier",
      "HTML Validator (W3C Standard)",
      "HTML to JSX Converter",
      "HTML Sanitizer",
    ],
    "validator": {
      "title": "HTML Validator",
      "description": "A compliance engine that checks your markup against standard HTML specifications.",
      "features": [
        "Precision Debugging: Error telemetry highlights specific line numbers.",
        "Auto-Fix Protocol: The 'Format' action automatically repairs common syntax deviations.",
        "Client-Side execution: Validate sensitive code without network requests.",
        "Strict mode adherence for HTML5 standards.",
      ],
    },
  },
  "markdown": {
    "title": "Markdown Formatter",
    "description":
      "Happy Formatter's Markdown Formatter and Markdown Validator help to auto format Markdown text and validate your Markdown syntax.",
    "features": [
      "Markdown formatter online is the best tool to format Markdown data.",
      "Markdown validator online is the best tool to validate Markdown data.",
      "It helps to validate Markdown online with error messages.",
      "It's also a Markdown Beautifier that supports various indentation levels.",
      "Supports printing of Markdown data.",
      "Stores data locally for the last Markdown formatted in the browser's local storage. This can be used as a Notepad++, Sublime, or VSCode alternative for Markdown beautification.",
      "This Markdown online formatter can also work as Markdown Lint.",
      "Use the auto switch to turn auto-update on or off for beautification.",
      "It uses WebAssembly (WASM) to beautify Markdown, making it easy for a human to read and analyze.",
      "Download Markdown once it's created or modified, and it can be opened in Notepad++, Sublime, or VSCode alternative.",
      "Markdown Format Checker helps to fix the missing quotes; click the setting icon which looks like a screwdriver on the left side of the editor to fix the format.",
    ],
    "additional_info": [
      "Markdown is a lightweight markup language with plain text formatting syntax designed so that it can be converted to HTML and many other formats using a tool by the same name.",
      "Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.",
      "Markdown is a software tool that allows you to write content in a format that can be converted to HTML, PDF, or other formats.",
    ],
    "tools": [
      "Online Markdown Formatter and Online Markdown Validator provide Markdown converter tools to convert Markdown to HTML, Markdown to PDF, and Markdown to DOCX. Also includes Markdown Editor, MarkdownLint, Markdown Checker, and Markdown Cleaner.",
      "Free Markdown Formatting Online and Markdown Validator work well in Windows, Mac, Linux, Chrome, Firefox, Safari, and Edge.",
    ],
    "validator": {
      "title": "Markdown Validator",
      "description":
        "Markdown Validator Online checks the integrity/syntax of the Markdown data based on Markdown Specifications.",
      "features": [
        "It's super easy to find the error when line numbers are highlighted with an in-detail error description.",
        "Use the format button as a Markdown Fixer to repair the error.",
        "To validate Markdown you just need internet and no need to install any software.",
        "Your Markdown data gets validated in the browser itself.",
      ],
    },
  },
  "java": {
    "title": "Java Formatter",
    "description":
      "Happy Formatter's Java Formatter and Java Validator help to auto format Java code and validate your Java syntax.",
    "features": [
      "Java formatter online is the best tool to format Java data.",
      "Java validator online is the best tool to validate Java data.",
      "It helps to validate Java online with error messages.",
      "It's also a Java Beautifier that supports indentation levels: 2 spaces, 3 spaces, and 4 spaces.",
      "Supports printing of Java data.",
      "Stores data locally for the last Java formatted in the browser's local storage. This can be used as a Notepad++, Sublime, or VSCode alternative for Java beautification.",
      "This Java online formatter can also work as Java Lint.",
      "Use the auto switch to turn auto-update on or off for beautification.",
      "It uses WebAssembly (WASM) to beautify Java, making it easy for a human to read and analyze.",
      "Download Java once it's created or modified, and it can be opened in Notepad++, Sublime, or VSCode alternative.",
      "Java Format Checker helps to fix the missing quotes; click the setting icon which looks like a screwdriver on the left side of the editor to fix the format.",
    ],
    "additional_info": [
      "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
      "It is a general-purpose programming language intended to let application developers write once, run anywhere (WORA), meaning that compiled Java code can run on all platforms that support Java without the need for recompilation.",
      "Java applications are typically compiled to bytecode that can run on any Java virtual machine (JVM) regardless of the underlying computer architecture.",
      "The syntax of Java is similar to C and C++, but has fewer low-level facilities than either of them.",
    ],
    "tools": [
      "Online Java Formatter and Online Java Validator provide Java formatting and validation services.",
      "Free Java Formatting Online and Java Validator work well in Windows, Mac, Linux, Chrome, Firefox, Safari, and Edge.",
    ],
    "validator": {
      "title": "Java Validator",
      "description": "Java Validator Online checks the integrity/syntax of the Java data based on Java Specifications.",
      "features": [
        "It's super easy to find the error when line numbers are highlighted with an in-detail error description.",
        "Use the format button as a Java Fixer to repair the error.",
        "To validate Java you just need internet and no need to install any software.",
        "Your Java data gets validated in the browser itself.",
      ],
    },
  },
  "dart": {
    "title": "Dart Formatter",
    "description": "Dart Formatter that formats Dart data, locally in your browser",
    "features": [
      "Dart formatter online is the best tool to format Dart data.",
      "Dart validator online is the best tool to validate Dart data.",
      "It helps to validate Dart online with error messages.",
      "It's also a Dart Beautifier that supports indentation levels: 2 spaces, 3 spaces, and 4 spaces.",
      "Supports printing of Dart data.",
    ],
    "additional_info": [
      "Dart is a programming language designed for client development, such as for mobile apps and games.",
      "Dart is developed by Google and is used to develop applications for the Google Dart SDK.",
      "Dart is a statically typed language, which means that the type of a variable is known at compile time.",
      "Dart is a compiled language, which means that the code is converted to machine code before it is run.",
      "Dart is a server-side language, which means that the code is executed on the server.",
      "Dart is a mobile-first language, which means that the code is designed to run on mobile devices.",
    ],
    "tools": [
      "Online Dart Formatter and Online Dart Validator provide Dart formatting and validation services.",
      "Free Dart Formatting Online and Dart Validator work well in Windows, Mac, Linux, Chrome, Firefox, Safari, and Edge.",
    ],
    "validator": {
      "title": "Dart Validator",
      "description": "Dart Validator Online checks the integrity/syntax of the Dart data based on Dart Specifications.",
      "features": [
        "It's super easy to find the error when line numbers are highlighted with an in-detail error description.",
        "Use the format button as a Dart Fixer to repair the error.",
        "To validate Dart you just need internet and no need to install any software.",
        "Your Dart data gets validated in the browser itself.",
      ],
    },
  },
  "go": {
    "title": "Go Formatter",
    "description": "Go Formatter that formats Go data, locally in your browser",
    "features": [
      "Go formatter online is the best tool to format Go data.",
      "Go validator online is the best tool to validate Go data.",
      "It helps to validate Go online with error messages.",
      "It's also a Go Beautifier that supports indentation levels: 2 spaces, 3 spaces, and 4 spaces.",
      "Supports printing of Go data.",
    ],
    "additional_info": [
      "Go is a statically typed, compiled programming language designed at Google.",
      "Go is a compiled language, which means that the code is converted to machine code before it is run.",
      "Go is a server-side language, which means that the code is executed on the server.",
      "Go is a mobile-first language, which means that the code is designed to run on mobile devices.",
    ],
    "tools": [
      "Online Go Formatter and Online Go Validator provide Go formatting and validation services.",
      "Free Go Formatting Online and Go Validator work well in Windows, Mac, Linux, Chrome, Firefox, Safari, and Edge.",
    ],
    "validator": {
      "title": "Go Validator",
      "description": "Go Validator Online checks the integrity/syntax of the Go data based on Go Specifications.",
      "features": [
        "It's super easy to find the error when line numbers are highlighted with an in-detail error description.",
        "Use the format button as a Go Fixer to repair the error.",
        "To validate Go you just need internet and no need to install any software.",
        "Your Go data gets validated in the browser itself.",
      ],
    },
  },
  "lua": {
    "title": "Lua Formatter",
    "description": "Lua Formatter that formats Lua data, locally in your browser",
    "features": [
      "Lua formatter online is the best tool to format Lua data.",
      "Lua validator online is the best tool to validate Lua data.",
      "It helps to validate Lua online with error messages.",
      "It's also a Lua Beautifier that supports indentation levels: 2 spaces, 3 spaces, and 4 spaces.",
      "Supports printing of Lua data.",
    ],
    "additional_info": [
      "Lua is a powerful, efficient, embeddable scripting language.",
      "Lua is a lightweight, high-level, dynamically typed and interpreted language.",
      "Lua is a client-side language, which means that the code is executed in the browser.",
      "Lua is an object-oriented language with a focus on modern web development.",
    ],
    "tools": [
      "Online Lua Formatter and Online Lua Validator provide Lua formatting and validation services.",
      "Free Lua Formatting Online and Lua Validator work well in Windows, Mac, Linux, Chrome, Firefox, Safari, and Edge.",
    ],
    "validator": {
      "title": "Lua Validator",
      "description": "Lua Validator Online checks the integrity/syntax of the Lua data based on Lua Specifications.",
      "features": [
        "It's super easy to find the error when line numbers are highlighted with an in-detail error description.",
        "Use the format button as a Lua Fixer to repair the error.",
        "To validate Lua you just need internet and no need to install any software.",
        "Your Lua data gets validated in the browser itself.",
      ],
    },
  },
  "python": {
    "title": "Python Formatter",
    "description": "Python Formatter that formats Python data, locally in your browser",
    "features": [
      "Python formatter online is the best tool to format Python data.",
      "Python validator online is the best tool to validate Python data.",
      "It helps to validate Python online with error messages.",
      "It's also a Python Beautifier that supports indentation levels: 2 spaces, 3 spaces, and 4 spaces.",
      "Supports printing of Python data.",
      "It uses Ruff to format Python code.",
    ],
    "additional_info": [
      "Python is an interpreted, high-level, general-purpose programming language.",
      "Python is dynamically typed and garbage-collected.",
      "Python is a multi-paradigm programming language.",
      "Python is an object-oriented language with a focus on modern web development.",
    ],
    "tools": [
      "Online Python Formatter and Online Python Validator provide Python formatting and validation services.",
      "Free Python Formatting Online and Python Validator work well in Windows, Mac, Linux, Chrome, Firefox, Safari, and Edge.",
    ],
    "validator": {
      "title": "Python Validator",
      "description":
        "Python Validator Online checks the integrity/syntax of the Python data based on Python Specifications.",
      "features": [
        "It's super easy to find the error when line numbers are highlighted with an in-detail error description.",
        "Use the format button as a Python Fixer to repair the error.",
        "To validate Python you just need internet and no need to install any software.",
        "Your Python data gets validated in the browser itself.",
      ],
    },
  },
  "sql": {
    "title": "SQL Formatter",
    "description": "SQL Formatter that formats SQL data, locally in your browser",
    "features": [
      "SQL formatter online is the best tool to format SQL data.",
      "SQL validator online is the best tool to validate SQL data.",
      "It helps to validate SQL online with error messages.",
      "It's also a SQL Beautifier that supports indentation levels: 2 spaces, 3 spaces, and 4 spaces.",
      "Supports printing of SQL data.",
    ],
    "additional_info": [
      "SQL is a domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS) or other database systems.",
      "SQL is a standard language for storing, manipulating and retrieving data in databases.",
      "SQL is a declarative language, which means that you only need to specify what you want to retrieve, and the database system will figure out how to do it.",
    ],
    "tools": [
      "Online SQL Formatter and Online SQL Validator provide SQL formatting and validation services.",
      "Free SQL Formatting Online and SQL Validator work well in Windows, Mac, Linux, Chrome, Firefox, Safari, and Edge.",
    ],
    "validator": {
      "title": "SQL Validator",
      "description": "SQL Validator Online checks the integrity/syntax of the SQL data based on SQL Specifications.",
      "features": [
        "It's super easy to find the error when line numbers are highlighted with an in-detail error description.",
        "Use the format button as a SQL Fixer to repair the error.",
        "To validate SQL you just need internet and no need to install any software.",
        "Your SQL data gets validated in the browser itself.",
      ],
    },
  },
  "csharp": {
    "title": "C# Formatter",
    "description": "C# Formatter that formats C# data, locally in your browser",
    "features": [
      "C# formatter online is the best tool to format C# data.",
      "C# validator online is the best tool to validate C# data.",
      "It helps to validate C# online with error messages.",
      "It's also a C# Beautifier that supports indentation levels: 2 spaces, 3 spaces, and 4 spaces.",
      "Supports printing of C# data.",
    ],
    "additional_info": [
      "C# is a programming language developed by Microsoft that runs on the .NET Framework.",
      "C# is used to develop web applications, desktop applications, mobile applications, games, and more.",
      "C# is a statically typed language, which means that the type of a variable is known at compile time.",
      "C# is a strongly typed language, which means that the type of a variable is known at compile time.",
      "C# is a case-sensitive language, which means that the case of a variable is important.",
      "C# is a managed language, which means that the memory is managed by the runtime.",
      "C# is a garbage-collected language, which means that the memory is automatically reclaimed when it is no longer needed.",
      "C# is a high-level language, which means that it is easier to read and write than low-level languages.",
    ],
    "tools": [
      "Online C# Formatter and Online C# Validator provide C# formatting and validation services.",
      "Free C# Formatting Online and C# Validator work well in Windows, Mac, Linux, Chrome, Firefox, Safari, and Edge.",
    ],
    "validator": {
      "title": "C# Validator",
      "description": "C# Validator Online checks the integrity/syntax of the C# data based on C# Specifications.",
      "features": [
        "It's super easy to find the error when line numbers are highlighted with an in-detail error description.",
        "Use the format button as a C# Fixer to repair the error.",
        "To validate C# you just need internet and no need to install any software.",
        "Your C# data gets validated in the browser itself.",
      ],
    },
  },
  "c": {
    "title": "C Formatter",
    "description": "C Formatter that formats C data, locally in your browser",
    "features": [
      "C formatter online is the best tool to format C data.",
      "C validator online is the best tool to validate C data.",
      "It helps to validate C online with error messages.",
      "It's also a C Beautifier that supports indentation levels: 2 spaces, 3 spaces, and 4 spaces.",
      "Supports printing of C data.",
    ],
    "additional_info": [
      "C is a programming language developed by Dennis Ritchie at AT&T's Bell Labs in 1972.",
      "C is a low-level language, which means that it is closer to the hardware than high-level languages.",
      "C is a statically typed language, which means that the type of a variable is known at compile time.",
      "C is a strongly typed language, which means that the type of a variable is known at compile time.",
      "C is a case-sensitive language, which means that the case of a variable is important.",
      "C is a managed language, which means that the memory is managed by the runtime.",
      "C is a garbage-collected language, which means that the memory is automatically reclaimed when it is no longer needed.",
      "C is a high-level language, which means that it is easier to read and write than low-level languages.",
    ],
    "tools": [
      "Online C Formatter and Online C Validator provide C formatting and validation services.",
      "Free C Formatting Online and C Validator work well in Windows, Mac, Linux, Chrome, Firefox, Safari, and Edge.",
    ],
    "validator": {
      "title": "C Validator",
      "description": "C Validator Online checks the integrity/syntax of the C data based on C Specifications.",
      "features": [
        "It's super easy to find the error when line numbers are highlighted with an in-detail error description.",
        "Use the format button as a C Fixer to repair the error.",
        "To validate C you just need internet and no need to install any software.",
        "Your C data gets validated in the browser itself.",
      ],
    },
  },
  "cpp": {
    "title": "C++ Formatter",
    "description": "C++ Formatter that formats C++ data, locally in your browser",
    "features": [
      "C++ formatter online is the best tool to format C++ data.",
      "C++ validator online is the best tool to validate C++ data.",
      "It helps to validate C++ online with error messages.",
      "It's also a C++ Beautifier that supports indentation levels: 2 spaces, 3 spaces, and 4 spaces.",
      "Supports printing of C++ data.",
    ],
    "additional_info": [
      "C++ is a programming language developed by Bjarne Stroustrup at AT&T's Bell Labs in 1979.",
      "C++ is a statically typed language, which means that the type of a variable is known at compile time.",
      "C++ is a strongly typed language, which means that the type of a variable is known at compile time.",
      "C++ is a case-sensitive language, which means that the case of a variable is important.",
      "C++ is a managed language, which means that the memory is managed by the runtime.",
      "C++ is a garbage-collected language, which means that the memory is automatically reclaimed when it is no longer needed.",
      "C++ is a high-level language, which means that it is easier to read and write than low-level languages.",
    ],
    "tools": [
      "Online C++ Formatter and Online C++ Validator provide C++ formatting and validation services.",
      "Free C++ Formatting Online and C++ Validator work well in Windows, Mac, Linux, Chrome, Firefox, Safari, and Edge.",
    ],
    "validator": {
      "title": "C++ Validator",
      "description": "C++ Validator Online checks the integrity/syntax of the C++ data based on C++ Specifications.",
      "features": [
        "It's super easy to find the error when line numbers are highlighted with an in-detail error description.",
        "Use the format button as a C++ Fixer to repair the error.",
        "To validate C++ you just need internet and no need to install any software.",
        "Your C++ data gets validated in the browser itself.",
      ],
    },
  },
  "proto": {
    "title": "Proto Formatter",
    "description": "Proto Formatter that formats Proto data, locally in your browser",
    "features": [
      "Proto formatter online is the best tool to format Proto data.",
      "Proto validator online is the best tool to validate Proto data.",
      "It helps to validate Proto online with error messages.",
      "It's also a Proto Beautifier that supports indentation levels: 2 spaces, 3 spaces, and 4 spaces.",
      "Supports printing of Proto data.",
    ],
    "additional_info": [
      "Protocol Buffers (Protobuf) is a method of serializing structured data in a compact, efficient binary format.",
      "Protobuf is used for data interchange between systems, particularly in distributed systems and microservices architecture.",
      "Protobuf is a language-neutral, platform-neutral, extensible format for serializing structured data.",
      "Protobuf is a binary format, which means it is more efficient in terms of both space and time compared to text-based formats like JSON.",
      "Protobuf is a schema-based format, which means that a schema is defined for the data, and the data is serialized according to that schema.",
      "Protobuf is a self-describing format, which means that the data can be read without knowing the schema beforehand.",
      "Protobuf is a language-neutral format, which means that it can be used with any programming language.",
      "Protobuf is a platform-neutral format, which means that it can be used on any platform.",
    ],
    "tools": [
      "Online Proto Formatter and Online Proto Validator provide Proto formatting and validation services.",
      "Free Proto Formatting Online and Proto Validator work well in Windows, Mac, Linux, Chrome, Firefox, Safari, and Edge.",
    ],
    "validator": {
      "title": "Proto Validator",
      "description":
        "Proto Validator Online checks the integrity/syntax of the Proto data based on Proto Specifications.",
      "features": [
        "It's super easy to find the error when line numbers are highlighted with an in-detail error description.",
        "Use the format button as a Proto Fixer to repair the error.",
        "To validate Proto you just need internet and no need to install any software.",
        "Your Proto data gets validated in the browser itself.",
      ],
    },
  },
  "zig": {
    "title": "Zig Formatter",
    "description": "Zig Formatter that formats Zig data, locally in your browser",
    "features": [
      "Zig formatter online is the best tool to format Zig data.",
      "Zig validator online is the best tool to validate Zig data.",
      "It helps to validate Zig online with error messages.",
      "It's also a Zig Beautifier that supports indentation levels: 2 spaces, 3 spaces, and 4 spaces.",
      "Supports printing of Zig data.",
    ],
    "additional_info": [
      "Zig is a general-purpose programming language designed for performance and safety.",
      "Zig is a statically typed language, which means that the type of a variable is known at compile time.",
      "Zig is a strongly typed language, which means that the type of a variable is known at compile time.",
    ],
    "tools": [
      "Online Zig Formatter and Online Zig Validator provide Zig formatting and validation services.",
      "Free Zig Formatting Online and Zig Validator work well in Windows, Mac, Linux, Chrome, Firefox, Safari, and Edge.",
    ],
    "validator": {
      "title": "Zig Validator",
      "description": "Zig Validator Online checks the integrity/syntax of the Zig data based on Zig Specifications.",
      "features": [
        "It's super easy to find the error when line numbers are highlighted with an in-detail error description.",
        "Use the format button as a Zig Fixer to repair the error.",
        "To validate Zig you just need internet and no need to install any software.",
        "Your Zig data gets validated in the browser itself.",
      ],
    },
  },
  "default": {
    "title": "Formatter",
    "description": "Formatter that formats data, locally in your browser",
    "features": [
      "Formatter online is the best tool to format data.",
      "Validator online is the best tool to validate data.",
      "It helps to validate data online with error messages.",
      "It's also a data Beautifier that supports indentation levels: 2 spaces, 3 spaces, and 4 spaces.",
      "Supports printing of data.",
    ],
    "additional_info": [
      "How to Create Data File?",
      "Data Full Form",
      "What is Data?",
      "Data Example with all data types including Data Array.",
      "Python Pretty Print Data",
      "Read Data File Using Python",
      "Validate Data using PHP",
      "Python Load Data From File",
    ],
    "tools": [
      "Online Data Formatter and Online Data Validator provide Data formatting and validation services.",
      "Free Data Formatting Online and Data Validator work well in Windows, Mac, Linux, Chrome, Firefox, Safari, and Edge.",
    ],
    "validator": {
      "title": "Validator",
      "description": "Validator that validates data, locally in your browser",
      "features": [
        "It's super easy to find the error when line numbers are highlighted with an in-detail error description.",
        "Use the format button as a Data Fixer to repair the error.",
        "To validate Data you just need internet and no need to install any software.",
        "Your Data data gets validated in the browser itself.",
      ],
    },
  },
};
