interface AccordionItem {
  title: string;
  content: string;
}
export const accordionData: Record<string, AccordionItem[]> = {
  javascript: [
    {
      title: "How does HappyFormatter ensure my JavaScript code remains private?",
      content:
        "HappyFormatter processes all code locally using WebAssembly (WASM), ensuring that your code never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use a JavaScript formatter?",
      content:
        "Using a JavaScript formatter helps to ensure that your code is properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format JavaScript code?",
      content:
        "To format JavaScript code, you can use an online JavaScript formatter tool. Simply paste your code into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for minifying JavaScript?",
      content:
        "Yes, HappyFormatter can also be used to minify JavaScript code, reducing its size and improving load times for web applications.",
    },
    {
      title: "Is login required to use the JavaScript formatter?",
      content:
        "No, login is not required to use the JavaScript formatter. You can format your JavaScript code directly from the tool without needing to create an account or log in.",
    },
  ],
  typescript: [
    {
      title: "How does HappyFormatter ensure my TypeScript code remains private?",
      content:
        "HappyFormatter processes all code locally using WebAssembly (WASM), ensuring that your code never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use a TypeScript formatter?",
      content:
        "Using a TypeScript formatter helps to ensure that your code is properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format TypeScript code?",
      content:
        "To format TypeScript code, you can use an online TypeScript formatter tool. Simply paste your code into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for converting TypeScript to JavaScript?",
      content:
        "Yes, HappyFormatter can also be used to convert TypeScript code to JavaScript, making it easier to deploy your applications.",
    },
    {
      title: "Is login required to use the TypeScript formatter?",
      content:
        "No, login is not required to use the TypeScript formatter. You can format your TypeScript code directly from the tool without needing to create an account or log in.",
    },
  ],
  json: [
    {
      title: "How does HappyFormatter ensure my JSON data remains private?",
      content:
        "HappyFormatter processes all JSON data locally using WebAssembly (WASM), ensuring that your data never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use a JSON formatter?",
      content:
        "Using a JSON formatter helps to ensure that your JSON data is properly structured and easy to read. It also allows you to validate and edit JSON data without the need for additional software.",
    },
    {
      title: "How do I format a JSON file?",
      content:
        "To format a JSON file, you can use an online JSON formatter tool. Simply paste your JSON data into the tool, and it will automatically format it for you.",
    },
    {
      title: "How to use JSON formatter with URL?",
      content:
        "To use a JSON formatter with a URL, you can paste the URL containing the JSON data into the formatter tool. The tool will fetch the JSON data from the URL and format it for you.",
    },
    {
      title: "Is login required to save JSON data?",
      content:
        "No, login is not required to save JSON data. You can save your formatted JSON data directly from the tool without needing to create an account or log in.",
    },
  ],
  css: [
    {
      title: "How does HappyFormatter ensure my CSS code remains private?",
      content:
        "HappyFormatter processes all CSS code locally using WebAssembly (WASM), ensuring that your code never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use a CSS formatter?",
      content:
        "Using a CSS formatter helps to ensure that your CSS code is properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format CSS code?",
      content:
        "To format CSS code, you can use an online CSS formatter tool. Simply paste your code into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for minifying CSS?",
      content:
        "Yes, HappyFormatter can also be used to minify CSS code, reducing its size and improving load times for web applications.",
    },
    {
      title: "Is login required to use the CSS formatter?",
      content:
        "No, login is not required to use the CSS formatter. You can format your CSS code directly from the tool without needing to create an account or log in.",
    },
  ],
  java: [
    {
      title: "How does HappyFormatter ensure my Java code remains private?",
      content:
        "HappyFormatter processes all Java code locally using WebAssembly (WASM), ensuring that your code never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use a Java formatter?",
      content:
        "Using a Java formatter helps to ensure that your Java code is properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format Java code?",
      content:
        "To format Java code, you can use an online Java formatter tool. Simply paste your code into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for optimizing Java code?",
      content: "Yes, HappyFormatter can also be used to optimize Java code, improving its performance and readability.",
    },
    {
      title: "Is login required to use the Java formatter?",
      content:
        "No, login is not required to use the Java formatter. You can format your Java code directly from the tool without needing to create an account or log in.",
    },
  ],
  dart: [
    {
      title: "How does HappyFormatter ensure my Dart code remains private?",
      content:
        "HappyFormatter processes all Dart code locally using WebAssembly (WASM), ensuring that your code never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use a Dart formatter?",
      content:
        "Using a Dart formatter helps to ensure that your Dart code is properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format Dart code?",
      content:
        "To format Dart code, you can use an online Dart formatter tool. Simply paste your code into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for compiling Dart to JavaScript?",
      content:
        "Yes, HappyFormatter can also be used to compile Dart code to JavaScript, making it easier to integrate Dart applications into web environments.",
    },
    {
      title: "Is login required to use the Dart formatter?",
      content:
        "No, login is not required to use the Dart formatter. You can format your Dart code directly from the tool without needing to create an account or log in.",
    },
  ],
  go: [
    {
      title: "How does HappyFormatter ensure my Go code remains private?",
      content:
        "HappyFormatter processes all Go code locally using WebAssembly (WASM), ensuring that your code never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use a Go formatter?",
      content:
        "Using a Go formatter helps to ensure that your Go code is properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format Go code?",
      content:
        "To format Go code, you can use an online Go formatter tool. Simply paste your code into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for generating Go documentation?",
      content:
        "Yes, HappyFormatter can also be used to generate Go documentation, making it easier to understand and maintain your code.",
    },
    {
      title: "Is login required to use the Go formatter?",
      content:
        "No, login is not required to use the Go formatter. You can format your Go code directly from the tool without needing to create an account or log in.",
    },
  ],
  rust: [
    {
      title: "How does HappyFormatter ensure my Rust code remains private?",
      content:
        "HappyFormatter processes all Rust code locally using WebAssembly (WASM), ensuring that your code never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use a Rust formatter?",
      content:
        "Using a Rust formatter helps to ensure that your Rust code is properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format Rust code?",
      content:
        "To format Rust code, you can use an online Rust formatter tool. Simply paste your code into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for optimizing Rust code?",
      content: "Yes, HappyFormatter can also be used to optimize Rust code, improving its performance and readability.",
    },
    {
      title: "Is login required to use the Rust formatter?",
      content:
        "No, login is not required to use the Rust formatter. You can format your Rust code directly from the tool without needing to create an account or log in.",
    },
  ],
  html: [
    {
      title: "How does HappyFormatter ensure my HTML code remains private?",
      content:
        "HappyFormatter processes all HTML code locally using WebAssembly (WASM), ensuring that your code never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use an HTML formatter?",
      content:
        "Using an HTML formatter helps to ensure that your HTML code is properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format HTML code?",
      content:
        "To format HTML code, you can use an online HTML formatter tool. Simply paste your code into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for validating HTML?",
      content: "Yes, HappyFormatter can also be used to validate HTML code, ensuring it adheres to web standards.",
    },
    {
      title: "Is login required to use the HTML formatter?",
      content:
        "No, login is not required to use the HTML formatter. You can format your HTML code directly from the tool without needing to create an account or log in.",
    },
  ],
  lua: [
    {
      title: "How does HappyFormatter ensure my Lua code remains private?",
      content:
        "HappyFormatter processes all Lua code locally using WebAssembly (WASM), ensuring that your code never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use a Lua formatter?",
      content:
        "Using a Lua formatter helps to ensure that your Lua code is properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format Lua code?",
      content:
        "To format Lua code, you can use an online Lua formatter tool. Simply paste your code into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for running Lua scripts?",
      content:
        "Yes, HappyFormatter can also be used to run Lua scripts, providing immediate feedback on your code execution.",
    },
    {
      title: "Is login required to use the Lua formatter?",
      content:
        "No, login is not required to use the Lua formatter. You can format your Lua code directly from the tool without needing to create an account or log in.",
    },
  ],
  python: [
    {
      title: "How does HappyFormatter ensure my Python code remains private?",
      content:
        "HappyFormatter processes all Python code locally using WebAssembly (WASM), ensuring that your code never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use a Python formatter?",
      content:
        "Using a Python formatter helps to ensure that your Python code is properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format Python code?",
      content:
        "To format Python code, you can use an online Python formatter tool. Simply paste your code into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for linting Python code?",
      content:
        "Yes, HappyFormatter can also be used to lint Python code, identifying potential issues and enforcing coding standards.",
    },
    {
      title: "Is login required to use the Python formatter?",
      content:
        "No, login is not required to use the Python formatter. You can format your Python code directly from the tool without needing to create an account or log in.",
    },
  ],
  sql: [
    {
      title: "How does HappyFormatter ensure my SQL code remains private?",
      content:
        "HappyFormatter processes all SQL code locally using WebAssembly (WASM), ensuring that your code never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use an SQL formatter?",
      content:
        "Using an SQL formatter helps to ensure that your SQL code is properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format SQL code?",
      content:
        "To format SQL code, you can use an online SQL formatter tool. Simply paste your code into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for optimizing SQL queries?",
      content:
        "Yes, HappyFormatter can also be used to optimize SQL queries, improving their performance and readability.",
    },
    {
      title: "Is login required to use the SQL formatter?",
      content:
        "No, login is not required to use the SQL formatter. You can format your SQL code directly from the tool without needing to create an account or log in.",
    },
  ],
  xml: [
    {
      title: "How does HappyFormatter ensure my XML data remains private?",
      content:
        "HappyFormatter processes all XML data locally using WebAssembly (WASM), ensuring that your data never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use an XML formatter?",
      content:
        "Using an XML formatter helps to ensure that your XML data is properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format XML data?",
      content:
        "To format XML data, you can use an online XML formatter tool. Simply paste your data into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for validating XML?",
      content: "Yes, HappyFormatter can also be used to validate XML data, ensuring it adheres to web standards.",
    },
    {
      title: "Is login required to use the XML formatter?",
      content:
        "No, login is not required to use the XML formatter. You can format your XML data directly from the tool without needing to create an account or log in.",
    },
  ],
  yaml: [
    {
      title: "How does HappyFormatter ensure my YAML data remains private?",
      content:
        "HappyFormatter processes all YAML data locally using WebAssembly (WASM), ensuring that your data never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use a YAML formatter?",
      content:
        "Using a YAML formatter helps to ensure that your YAML data is properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format YAML data?",
      content:
        "To format YAML data, you can use an online YAML formatter tool. Simply paste your data into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for converting YAML to JSON?",
      content:
        "Yes, HappyFormatter can also be used to convert YAML data to JSON, making it easier to integrate with various applications.",
    },
    {
      title: "Is login required to use the YAML formatter?",
      content:
        "No, login is not required to use the YAML formatter. You can format your YAML data directly from the tool without needing to create an account or log in.",
    },
  ],
  c: [
    {
      title: "How does HappyFormatter ensure my C code remains private?",
      content:
        "HappyFormatter processes all C code locally using WebAssembly (WASM), ensuring that your code never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use a C formatter?",
      content:
        "Using a C formatter helps to ensure that your C code is properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format C code?",
      content:
        "To format C code, you can use an online C formatter tool. Simply paste your code into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for optimizing C code?",
      content: "Yes, HappyFormatter can also be used to optimize C code, improving its performance and readability.",
    },
    {
      title: "Is login required to use the C formatter?",
      content:
        "No, login is not required to use the C formatter. You can format your C code directly from the tool without needing to create an account or log in.",
    },
  ],
  cplusplus: [
    {
      title: "How does HappyFormatter ensure my C++ code remains private?",
      content:
        "HappyFormatter processes all C++ code locally using WebAssembly (WASM), ensuring that your code never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use a C++ formatter?",
      content:
        "Using a C++ formatter helps to ensure that your C++ code is properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format C++ code?",
      content:
        "To format C++ code, you can use an online C++ formatter tool. Simply paste your code into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for optimizing C++ code?",
      content: "Yes, HappyFormatter can also be used to optimize C++ code, improving its performance and readability.",
    },
    {
      title: "Is login required to use the C++ formatter?",
      content:
        "No, login is not required to use the C++ formatter. You can format your C++ code directly from the tool without needing to create an account or log in.",
    },
  ],
  csharp: [
    {
      title: "How does HappyFormatter ensure my C# code remains private?",
      content:
        "HappyFormatter processes all C# code locally using WebAssembly (WASM), ensuring that your code never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use a C# formatter?",
      content:
        "Using a C# formatter helps to ensure that your C# code is properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format C# code?",
      content:
        "To format C# code, you can use an online C# formatter tool. Simply paste your code into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for optimizing C# code?",
      content: "Yes, HappyFormatter can also be used to optimize C# code, improving its performance and readability.",
    },
    {
      title: "Is login required to use the C# formatter?",
      content:
        "No, login is not required to use the C# formatter. You can format your C# code directly from the tool without needing to create an account or log in.",
    },
  ],
  objectivec: [
    {
      title: "How does HappyFormatter ensure my Objective-C code remains private?",
      content:
        "HappyFormatter processes all Objective-C code locally using WebAssembly (WASM), ensuring that your code never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use an Objective-C formatter?",
      content:
        "Using an Objective-C formatter helps to ensure that your Objective-C code is properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format Objective-C code?",
      content:
        "To format Objective-C code, you can use an online Objective-C formatter tool. Simply paste your code into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for optimizing Objective-C code?",
      content:
        "Yes, HappyFormatter can also be used to optimize Objective-C code, improving its performance and readability.",
    },
    {
      title: "Is login required to use the Objective-C formatter?",
      content:
        "No, login is not required to use the Objective-C formatter. You can format your Objective-C code directly from the tool without needing to create an account or log in.",
    },
  ],
  objectivecpp: [
    {
      title: "How does HappyFormatter ensure my Objective-C++ code remains private?",
      content:
        "HappyFormatter processes all Objective-C++ code locally using WebAssembly (WASM), ensuring that your code never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use an Objective-C++ formatter?",
      content:
        "Using an Objective-C++ formatter helps to ensure that your Objective-C++ code is properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format Objective-C++ code?",
      content:
        "To format Objective-C++ code, you can use an online Objective-C++ formatter tool. Simply paste your code into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for optimizing Objective-C++ code?",
      content:
        "Yes, HappyFormatter can also be used to optimize Objective-C++ code, improving its performance and readability.",
    },
    {
      title: "Is login required to use the Objective-C++ formatter?",
      content:
        "No, login is not required to use the Objective-C++ formatter. You can format your Objective-C++ code directly from the tool without needing to create an account or log in.",
    },
  ],
  proto: [
    {
      title: "How does HappyFormatter ensure my Protocol Buffers (proto) code remains private?",
      content:
        "HappyFormatter processes all Protocol Buffers (proto) code locally using WebAssembly (WASM), ensuring that your code never leaves your device. This guarantees maximum privacy and security.",
    },
    {
      title: "Why use a Protocol Buffers formatter?",
      content:
        "Using a Protocol Buffers formatter helps to ensure that your proto files are properly structured and easy to read. It also helps in maintaining a consistent coding style across your projects.",
    },
    {
      title: "How do I format Protocol Buffers code?",
      content:
        "To format Protocol Buffers code, you can use an online proto formatter tool. Simply paste your code into the tool, and it will automatically format it for you.",
    },
    {
      title: "Can I use HappyFormatter for validating Protocol Buffers?",
      content:
        "Yes, HappyFormatter can also be used to validate Protocol Buffers, ensuring they adhere to the correct syntax and structure.",
    },
    {
      title: "Is login required to use the Protocol Buffers formatter?",
      content:
        "No, login is not required to use the Protocol Buffers formatter. You can format your proto files directly from the tool without needing to create an account or log in.",
    },
  ],
};
