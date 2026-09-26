export interface DeepDiveSection {
  heading: string;
  paragraphs: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  list?: string[];
}

export interface DeepDive {
  intro: string;
  sections: DeepDiveSection[];
  faqs: Array<{ question: string; answer: string }>;
}

export const languageDeepDives: Record<string, DeepDive> = {
  lua: {
    intro:
      "Lua ships inside Roblox, Love2D, Neovim, OpenResty, and thousands of game engines - and almost every one of those communities formats Lua differently. This page runs a WebAssembly build of a real Lua parser, so formatting happens locally: your code never leaves the tab.",
    sections: [
      {
        heading: "How the Lua formatter works",
        paragraphs: [
          "The formatter parses your file into a syntax tree, then reprints it with consistent rules: uniform indentation, normalized spacing around operators, one statement per line, and balanced block keywords. Parsing first means broken files stop with a clear error instead of printing mangled code.",
          "You can switch between 2, 3, and 4 spaces or tabs before every run. Lua itself is whitespace-insensitive, so the choice is purely team style - pick one and let the tool apply it everywhere.",
        ],
        table: {
          headers: ["Ecosystem", "Common style", "Notes"],
          rows: [
            [
              "Roblox / Luau",
              "StyLua defaults",
              "Luau adds type annotations and compound assignments; a Luau-aware parser keeps them intact.",
            ],
            [
              "Love2D",
              "2 or 4 spaces",
              "Most Love2D projects follow the Lua-users style guide.",
            ],
            [
              "Neovim config",
              "2 spaces, stylua",
              "Neovim's own codebase and most plugin authors use StyLua.",
            ],
            [
              "OpenResty / nginx",
              "4 spaces",
              "Match the nginx C style that most OpenResty modules follow.",
            ],
          ],
        },
      },
      {
        heading: "Formatting Lua in your editor",
        paragraphs: [
          "For day-to-day work, format on save. In VS Code, install the StyLua extension and set it as the default formatter for Lua. In Neovim, conform.nvim and null-ls both expose StyLua as a formatter source.",
          "Use this page when the code is not on your machine: pasting a snippet from a chat, cleaning a script from a Roblox model, or checking how a formatter treats a file before adding one to a project.",
        ],
        list: [
          "VS Code: StyLua extension, format on save.",
          "Neovim: conform.nvim with the stylua source.",
          "CLI: stylua . in a terminal for whole projects.",
          "This page: paste, format, copy - nothing is uploaded.",
        ],
      },
      {
        heading: "Lua style decisions worth knowing",
        paragraphs: [
          "Two decisions cause most Lua formatting debates: tabs versus spaces, and how wide a line may run before wrapping. StyLua made 2 spaces and an 80-column wrap the community default, which is why most Roblox and Neovim code now looks the same.",
          "The formatter does not rename variables or reorder functions. It only changes whitespace and layout, so a formatted file parses to the same tree and runs identically.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does this formatter support Luau?",
        answer:
          "Yes. Luau syntax - type annotations, compound assignment operators, and string interpolation - parses and formats the same way standard Lua 5.4 does.",
      },
      {
        question: "What is the difference between a Lua formatter and a beautifier?",
        answer:
          "Nothing in practice. Both reprint parsed code with consistent layout. Tools called beautifiers usually only re-indent; this tool fully reprints from the syntax tree.",
      },
      {
        question: "Is my Lua code uploaded anywhere?",
        answer:
          "No. Parsing and formatting run in WebAssembly inside your browser tab. Closing the page discards everything.",
      },
    ],
  },
  dart: {
    intro:
      "Dart is unusual: the language ships with an official formatter, dart style, and the community follows it almost universally. This page runs a WebAssembly build of the same rule set, so results match dart format - in your browser, with no upload.",
    sections: [
      {
        heading: "The rules dart format applies",
        paragraphs: [
          "The formatter uses a greedy line-splitting algorithm over the parsed tree. The visible outcomes are stable: 2-space indentation, spaces inside braces, 80-column target width, and trailing commas added wherever a construct would otherwise split.",
          "Because formatting starts from a parse, the output is canonical: two developers formatting the same file always get identical text. That is why Dart teams simply commit the output and skip style review.",
        ],
        table: {
          headers: ["Rule", "Value", "Effect"],
          rows: [
            ["Indentation", "2 spaces", "Never tabs."],
            ["Page width", "80 columns", "Constructs that do not fit split onto lines."],
            ["Trailing commas", "Added automatically", "Forces a split for lists, maps, and argument lists."],
            ["String style", "Preserved", "Quotes and interpolation are not rewritten."],
          ],
        },
      },
      {
        heading: "Formatting Dart in your editor and CLI",
        paragraphs: [
          "The Dart and Flutter VS Code extensions format on save once formatOnSave is enabled - there is nothing extra to install. On the command line, dart format . rewrites every file under the current directory.",
          "Use this page for code that lives outside a package: snippets from issues, samples from documentation, or quick checks on generated code.",
        ],
        list: [
          "VS Code: Dart extension, format on save, dart-style rules by default.",
          "Flutter: flutter format . or dart format . from the project root.",
          "CI: run dart format --output=none --set-exit-if-changed . to fail unformatted diffs.",
          "This page: paste, format, copy - nothing is uploaded.",
        ],
      },
      {
        heading: "Why trailing commas matter in Dart",
        paragraphs: [
          "In Dart, a trailing comma is a formatting instruction. When a list of arguments or collection elements ends with a comma, the formatter always splits it one item per line; without the comma, it keeps items on one line when they fit.",
          "Teams that want vertical widget trees in Flutter add the comma; teams that prefer compact calls remove it and let the width rule decide. The formatter never removes your trailing commas - it only adds them where a split already happened.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does this produce the same output as dart format?",
        answer:
          "Yes. The formatter applies the same dart-style rule set: 2-space indent, 80-column width, automatic trailing commas, and canonical argument layout.",
      },
      {
        question: "Does it format Flutter code?",
        answer: "Flutter code is standard Dart, so widget trees, builders, and spread operators all format normally.",
      },
      {
        question: "Can I change the line length?",
        answer:
          "The page follows the dart-style default of 80 columns. In the CLI you can pass --line-length; here the canonical default keeps output identical to dart format.",
      },
    ],
  },
};

export function getLanguageDeepDive(language: string): DeepDive | undefined {
  return languageDeepDives[language];
}
