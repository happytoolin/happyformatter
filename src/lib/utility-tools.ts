export type UtilityToolCategoryId =
  | "json"
  | "web"
  | "converters"
  | "security"
  | "colors"
  | "markup"
  | "text"
  | "time"
  | "css";

export interface UtilityToolCategory {
  id: UtilityToolCategoryId;
  name: string;
  slug: string;
  shortName: string;
  title: string;
  description: string;
  keywords: string;
}

export interface UtilityTool {
  id: string;
  slug: string;
  name: string;
  category: UtilityToolCategoryId;
  title: string;
  description: string;
  keywords: string;
  inputLabel: string;
  secondaryInputLabel?: string;
  outputLabel: string;
  primaryAction: string;
  secondaryAction?: string;
  sampleInput: string;
  sampleSecondaryInput?: string;
  privacyNote: string;
  features: string[];
  useCases: string[];
}

export const UTILITY_CATEGORIES: UtilityToolCategory[] = [
  {
    id: "json",
    name: "JSON Tools",
    slug: "json",
    shortName: "JSON",
    title: "Private JSON Tools - No Upload | HappyFormatter",
    description:
      "Use private JSON tools for viewing, sorting, diffing, CSV export, and YAML conversion in your browser with no upload.",
    keywords:
      "private json tools, json viewer, json diff, json to csv, json to yaml, json sort keys, browser json tools",
  },
  {
    id: "web",
    name: "Web Encoding Tools",
    slug: "web",
    shortName: "Web",
    title: "Private Web Encoding Tools - No Upload | HappyFormatter",
    description:
      "Encode URLs, decode Base64, and test regular expressions locally in your browser without sending text to a server.",
    keywords: "url encoder, url decoder, base64 encoder, base64 decoder, regex tester, browser web tools",
  },
  {
    id: "converters",
    name: "Data Converters",
    slug: "converters",
    shortName: "Converters",
    title: "Private Data Converters - No Upload | HappyFormatter",
    description:
      "Convert JSON, YAML, XML, and CSV-friendly data locally in your browser. No upload and no account required.",
    keywords: "data converter, json to yaml, yaml to json, json to csv, xml to json, private converter",
  },
  {
    id: "security",
    name: "Security Utilities",
    slug: "security",
    shortName: "Security",
    title: "Private Security Utilities - No Upload | HappyFormatter",
    description:
      "Decode JWTs, generate hashes, and inspect encoded text locally in your browser. HappyFormatter does not upload your input.",
    keywords: "jwt decoder, hash generator, sha256 generator, base64 decoder, private security tools",
  },
  {
    id: "colors",
    name: "Color Tools",
    slug: "colors",
    shortName: "Colors",
    title: "Private Color Tools - No Upload | HappyFormatter",
    description: "Convert HEX, RGB, and HSL colors locally in your browser with a privacy-friendly color converter.",
    keywords: "color converter, hex to rgb, rgb to hsl, hsl to hex, private color tool",
  },
  {
    id: "markup",
    name: "Markup Tools",
    slug: "markup",
    shortName: "Markup",
    title: "Private Markdown HTML And SVG Tools - No Upload | HappyFormatter",
    description:
      "Preview Markdown, convert Markdown to HTML, encode HTML entities, and clean SVG text locally in your browser.",
    keywords: "markdown preview, markdown to html, html entity encoder, svg optimizer, private markup tools",
  },
  {
    id: "text",
    name: "Text Utilities",
    slug: "text",
    shortName: "Text",
    title: "Private Text Utilities - No Upload | HappyFormatter",
    description:
      "Convert text case, escape strings, parse query strings, and inspect HTTP headers locally in your browser.",
    keywords: "text case converter, string escape, query string parser, http header parser, private text tools",
  },
  {
    id: "time",
    name: "Time Utilities",
    slug: "time",
    shortName: "Time",
    title: "Private Time Utilities - No Upload | HappyFormatter",
    description: "Convert Unix timestamps and explain cron expressions locally in your browser with no upload.",
    keywords: "unix timestamp converter, cron expression explainer, private time tools",
  },
  {
    id: "css",
    name: "CSS Utilities",
    slug: "css",
    shortName: "CSS",
    title: "Private CSS Utilities - No Upload | HappyFormatter",
    description:
      "Convert CSS units and inspect CSS-friendly values locally in your browser without uploading snippets.",
    keywords: "css unit converter, px to rem, rem to px, private css tools",
  },
];

export const UTILITY_TOOLS: UtilityTool[] = [
  {
    id: "json-viewer",
    slug: "json-viewer",
    name: "JSON Viewer",
    category: "json",
    title: "Private JSON Viewer - No Upload | HappyFormatter",
    description:
      "View, check, and pretty-print JSON locally in your browser. Paste JSON and inspect the formatted output without uploading data.",
    keywords: "private json viewer, json viewer online, json pretty print, no upload json viewer",
    inputLabel: "JSON input",
    outputLabel: "Formatted JSON",
    primaryAction: "View JSON",
    sampleInput: "{\"user\":{\"id\":42,\"name\":\"Ada\"},\"roles\":[\"admin\",\"editor\"],\"active\":true}",
    privacyNote: "JSON parsing runs in your browser. Your input is not uploaded.",
    features: [
      "Pretty-print JSON with two-space indentation.",
      "Check JSON syntax before copying it into a config, API client, or editor.",
      "Show a compact structure summary for arrays and objects.",
    ],
    useCases: [
      "Inspect API responses",
      "Check config files",
      "Clean pasted JSON",
    ],
  },
  {
    id: "json-sort",
    slug: "json-sort-keys",
    name: "JSON Sort Keys",
    category: "json",
    title: "Private JSON Sort Keys Tool - No Upload | HappyFormatter",
    description:
      "Sort JSON object keys recursively in your browser for stable snapshots, readable config files, and easier diffs.",
    keywords: "json sort keys, sort json alphabetically, json key sorter, private json tool",
    inputLabel: "JSON input",
    outputLabel: "Sorted JSON",
    primaryAction: "Sort Keys",
    sampleInput:
      "{\"z\":1,\"a\":{\"beta\":2,\"alpha\":1},\"items\":[{\"id\":2,\"name\":\"B\"},{\"name\":\"A\",\"id\":1}]}",
    privacyNote: "Sorting happens locally in the browser tab. No JSON leaves your device.",
    features: [
      "Sort object keys recursively while preserving array order.",
      "Create stable JSON output for reviews and generated files.",
      "Format the sorted output with readable indentation.",
    ],
    useCases: ["Snapshot fixtures", "Config cleanup", "Stable diffs"],
  },
  {
    id: "json-diff",
    slug: "json-diff",
    name: "JSON Diff",
    category: "json",
    title: "Private JSON Diff Tool - No Upload | HappyFormatter",
    description:
      "Compare two JSON documents in your browser and see added, removed, and changed paths without uploading either document.",
    keywords: "json diff, compare json, json difference tool, private json comparison",
    inputLabel: "Original JSON",
    secondaryInputLabel: "Updated JSON",
    outputLabel: "Diff summary",
    primaryAction: "Compare JSON",
    sampleInput: "{\"name\":\"Ada\",\"roles\":[\"admin\"],\"active\":true}",
    sampleSecondaryInput: "{\"name\":\"Ada\",\"roles\":[\"admin\",\"editor\"],\"active\":false,\"team\":\"platform\"}",
    privacyNote: "Both JSON documents are compared locally. Nothing is sent to a server.",
    features: [
      "Compare parsed JSON values by path instead of plain text.",
      "Spot changed booleans, strings, numbers, arrays, and nested fields.",
      "Get a concise text summary that is easy to paste into an issue.",
    ],
    useCases: ["API response changes", "Config reviews", "Fixture updates"],
  },
  {
    id: "json-to-yaml",
    slug: "json-to-yaml",
    name: "JSON to YAML",
    category: "converters",
    title: "Private JSON to YAML Converter - No Upload | HappyFormatter",
    description:
      "Convert JSON to readable YAML locally in your browser for config files, docs, and infrastructure snippets.",
    keywords: "json to yaml, convert json to yaml, private yaml converter, no upload json converter",
    inputLabel: "JSON input",
    outputLabel: "YAML output",
    primaryAction: "Convert to YAML",
    sampleInput: "{\"service\":\"api\",\"replicas\":2,\"ports\":[80,443],\"secure\":true}",
    privacyNote: "Conversion runs entirely in the browser. Your JSON is not uploaded.",
    features: [
      "Convert objects, arrays, strings, numbers, booleans, and null values.",
      "Create readable YAML for configuration and documentation.",
      "Keep sensitive snippets on your device while converting.",
    ],
    useCases: ["Config conversion", "Docs snippets", "Infrastructure notes"],
  },
  {
    id: "yaml-to-json",
    slug: "yaml-to-json",
    name: "YAML to JSON",
    category: "converters",
    title: "Private YAML to JSON Converter - No Upload | HappyFormatter",
    description:
      "Convert simple YAML documents to JSON in your browser. Useful for config snippets, examples, and structured notes.",
    keywords: "yaml to json, convert yaml to json, private json converter, no upload yaml converter",
    inputLabel: "YAML input",
    outputLabel: "JSON output",
    primaryAction: "Convert to JSON",
    sampleInput: "service: api\nreplicas: 2\nsecure: true\nports:\n  - 80\n  - 443",
    privacyNote: "YAML parsing runs in this browser tab. HappyFormatter does not upload the text.",
    features: [
      "Convert common mappings, arrays, strings, numbers, booleans, and null values.",
      "Pretty-print the JSON result for API clients and editors.",
      "Keep private config snippets local while converting.",
    ],
    useCases: ["Config snippets", "API examples", "YAML cleanup"],
  },
  {
    id: "json-to-csv",
    slug: "json-to-csv",
    name: "JSON to CSV",
    category: "converters",
    title: "Private JSON to CSV Converter - No Upload | HappyFormatter",
    description:
      "Convert arrays of JSON objects to CSV locally in your browser for spreadsheets, reports, and quick exports.",
    keywords: "json to csv, convert json to csv, private csv converter, browser json csv",
    inputLabel: "JSON array input",
    outputLabel: "CSV output",
    primaryAction: "Convert to CSV",
    sampleInput:
      "[{\"id\":1,\"name\":\"Ada\",\"team\":\"Platform\"},{\"id\":2,\"name\":\"Linus\",\"team\":\"Kernel\"}]",
    privacyNote: "CSV conversion is browser-only. Your rows are not uploaded.",
    features: [
      "Convert arrays of objects into a header row plus CSV records.",
      "Quote commas, quotes, and line breaks correctly.",
      "Flatten nested values as JSON strings when needed.",
    ],
    useCases: ["Spreadsheet exports", "API data checks", "Report drafts"],
  },
  {
    id: "xml-to-json",
    slug: "xml-to-json",
    name: "XML to JSON",
    category: "converters",
    title: "Private XML to JSON Converter - No Upload | HappyFormatter",
    description:
      "Convert XML documents to JSON locally in your browser for quick inspection, API work, and migration notes.",
    keywords: "xml to json, convert xml to json, private xml converter, no upload xml tool",
    inputLabel: "XML input",
    outputLabel: "JSON output",
    primaryAction: "Convert XML",
    sampleInput: "<user id=\"42\"><name>Ada</name><roles><role>admin</role><role>editor</role></roles></user>",
    privacyNote: "XML parsing uses your browser. The XML is not uploaded.",
    features: [
      "Convert elements, attributes, text nodes, and repeated children.",
      "Pretty-print converted XML as JSON for inspection.",
      "Keep private XML samples local while exploring structure.",
    ],
    useCases: ["Legacy XML inspection", "API migration", "Payload debugging"],
  },
  {
    id: "jwt-decoder",
    slug: "jwt-decoder",
    name: "JWT Decoder",
    category: "security",
    title: "Private JWT Decoder - No Upload | HappyFormatter",
    description:
      "Decode JWT headers and payloads locally in your browser. Inspect token claims without uploading the token.",
    keywords: "jwt decoder, decode jwt, private jwt decoder, jwt claims viewer, no upload jwt",
    inputLabel: "JWT input",
    outputLabel: "Decoded token",
    primaryAction: "Decode JWT",
    sampleInput:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MiIsIm5hbWUiOiJBZGEiLCJpYXQiOjE3MDAwMDAwMDB9.signature",
    privacyNote: "The token is decoded locally and is not verified or uploaded.",
    features: [
      "Decode JWT header and payload JSON.",
      "Inspect claims without sending tokens to a third-party endpoint.",
      "Show signature length and a reminder that decoding is not verification.",
    ],
    useCases: ["Claim inspection", "Auth debugging", "Token education"],
  },
  {
    id: "base64",
    slug: "base64-encode-decode",
    name: "Base64 Encode/Decode",
    category: "web",
    title: "Private Base64 Encoder Decoder - No Upload | HappyFormatter",
    description: "Encode and decode Base64 text locally in your browser with UTF-8 support and no server upload.",
    keywords: "base64 encode, base64 decode, private base64 tool, base64 encoder decoder",
    inputLabel: "Text or Base64 input",
    outputLabel: "Result",
    primaryAction: "Encode Base64",
    secondaryAction: "Decode Base64",
    sampleInput: "HappyFormatter keeps text local.",
    privacyNote: "Encoding and decoding run in your browser. Your text stays on this device.",
    features: [
      "Encode UTF-8 text to Base64.",
      "Decode Base64 back to readable UTF-8 text.",
      "Avoid pasting sensitive strings into remote encoders.",
    ],
    useCases: ["Header checks", "Small payloads", "Encoding cleanup"],
  },
  {
    id: "regex-tester",
    slug: "regex-tester",
    name: "Regex Tester",
    category: "web",
    title: "Private Regex Tester - No Upload | HappyFormatter",
    description:
      "Test JavaScript regular expressions locally in your browser and inspect matches without uploading sample text.",
    keywords: "regex tester, regular expression tester, private regex tool, javascript regex tester",
    inputLabel: "Test text",
    secondaryInputLabel: "Pattern",
    outputLabel: "Matches",
    primaryAction: "Test Regex",
    sampleInput: "Order #A-102 shipped\nOrder #B-204 pending\nTicket #T-991 open",
    sampleSecondaryInput: "#[A-Z]-\\d+",
    privacyNote: "The pattern and test text stay in your browser.",
    features: [
      "Test JavaScript-compatible regular expressions.",
      "Use flags such as g, i, m, s, u, and y.",
      "List match indexes and captured groups.",
    ],
    useCases: ["Parser drafts", "Log checks", "Validation patterns"],
  },
  {
    id: "url-encoder",
    slug: "url-encoder-decoder",
    name: "URL Encoder/Decoder",
    category: "web",
    title: "Private URL Encoder Decoder - No Upload | HappyFormatter",
    description: "Encode and decode URL components locally in your browser for query strings, paths, and copied links.",
    keywords: "url encoder, url decoder, percent encode, decode url, private url tool",
    inputLabel: "URL text",
    outputLabel: "Result",
    primaryAction: "Encode URL",
    secondaryAction: "Decode URL",
    sampleInput: "name=Ada Lovelace&redirect=/tools/json viewer",
    privacyNote: "URL encoding and decoding run locally. Your links are not uploaded.",
    features: [
      "Percent-encode text for query strings and paths.",
      "Decode encoded URLs into readable text.",
      "Keep private callback URLs and query values local.",
    ],
    useCases: ["Query strings", "Callback URLs", "Link cleanup"],
  },
  {
    id: "hash-generator",
    slug: "hash-generator",
    name: "Hash Generator",
    category: "security",
    title: "Private Hash Generator - No Upload | HappyFormatter",
    description: "Generate SHA-256, SHA-1, SHA-384, and SHA-512 hashes locally in your browser with no upload.",
    keywords: "hash generator, sha256 generator, sha512 hash, sha1 hash, private hash tool",
    inputLabel: "Text input",
    outputLabel: "Hashes",
    primaryAction: "Generate Hashes",
    sampleInput: "HappyFormatter",
    privacyNote: "Hashing uses the browser Web Crypto API. Your text is not uploaded.",
    features: [
      "Generate SHA-1, SHA-256, SHA-384, and SHA-512 digests.",
      "Use browser-native cryptography for local text hashing.",
      "Copy the generated hashes for checksums and notes.",
    ],
    useCases: ["Checksums", "Token notes", "Digest comparisons"],
  },
  {
    id: "color-converter",
    slug: "color-converter",
    name: "Color Converter",
    category: "colors",
    title: "Private Color Converter - No Upload | HappyFormatter",
    description: "Convert HEX, RGB, and HSL colors locally in your browser for CSS, design systems, and quick checks.",
    keywords: "color converter, hex to rgb, rgb to hsl, hsl to rgb, private color converter",
    inputLabel: "Color input",
    outputLabel: "Converted colors",
    primaryAction: "Convert Color",
    sampleInput: "#336699",
    privacyNote: "Color conversion runs locally in your browser.",
    features: [
      "Convert between HEX, RGB, and HSL formats.",
      "Preview the parsed color while copying CSS-ready values.",
      "Handle common CSS color input formats.",
    ],
    useCases: ["CSS cleanup", "Design tokens", "Theme checks"],
  },
  {
    id: "csv-to-json",
    slug: "csv-to-json",
    name: "CSV to JSON",
    category: "converters",
    title: "Private CSV to JSON Converter - No Upload | HappyFormatter",
    description:
      "Convert CSV rows to JSON arrays locally in your browser. No upload, no account, and no server storage.",
    keywords: "csv to json, private csv converter, no upload csv to json",
    inputLabel: "CSV input",
    outputLabel: "JSON output",
    primaryAction: "Convert to JSON",
    sampleInput: "id,name,team\n1,Ada,Platform\n2,Linus,Kernel",
    privacyNote: "CSV parsing runs in your browser. Your rows are not uploaded.",
    features: [
      "Convert a header row plus CSV records into JSON objects.",
      "Handle quoted commas, quotes, and line breaks in CSV cells.",
      "Pretty-print JSON output for API clients and editors.",
    ],
    useCases: ["Spreadsheet imports", "API payload drafts", "Report cleanup"],
  },
  {
    id: "csv-tsv",
    slug: "csv-tsv-converter",
    name: "CSV TSV Converter",
    category: "converters",
    title: "Private CSV TSV Converter - No Upload | HappyFormatter",
    description: "Convert CSV to TSV or TSV to CSV locally in your browser without uploading tabular text.",
    keywords: "csv to tsv, tsv to csv, private csv tsv converter",
    inputLabel: "CSV or TSV input",
    outputLabel: "Converted table",
    primaryAction: "CSV to TSV",
    secondaryAction: "TSV to CSV",
    sampleInput: "id,name\n1,Ada Lovelace\n2,Linus Torvalds",
    privacyNote: "Table conversion stays inside the browser tab.",
    features: [
      "Convert comma-separated text to tab-separated text.",
      "Convert TSV back to CSV with proper value escaping.",
      "Keep copied spreadsheet snippets local.",
    ],
    useCases: ["Spreadsheet cleanup", "Terminal-friendly tables", "Report exports"],
  },
  {
    id: "toml-to-json",
    slug: "toml-to-json",
    name: "TOML to JSON",
    category: "converters",
    title: "Private TOML to JSON Converter - No Upload | HappyFormatter",
    description: "Convert TOML config snippets to JSON locally in your browser for quick inspection.",
    keywords: "toml to json, private toml converter, no upload toml to json",
    inputLabel: "TOML input",
    outputLabel: "JSON output",
    primaryAction: "Convert to JSON",
    sampleInput: "name = \"api\"\nreplicas = 2\nsecure = true\n\n[server]\nport = 8080",
    privacyNote: "TOML conversion runs locally. HappyFormatter does not upload config text.",
    features: [
      "Parse common TOML strings, numbers, booleans, arrays, and sections.",
      "Pretty-print the JSON result for inspection.",
      "Keep config snippets private while checking structure.",
    ],
    useCases: ["Config inspection", "Docs examples", "Migration notes"],
  },
  {
    id: "json-to-toml",
    slug: "json-to-toml",
    name: "JSON to TOML",
    category: "converters",
    title: "Private JSON to TOML Converter - No Upload | HappyFormatter",
    description: "Convert simple JSON objects to TOML locally in your browser with no upload.",
    keywords: "json to toml, private toml converter, no upload json to toml",
    inputLabel: "JSON input",
    outputLabel: "TOML output",
    primaryAction: "Convert to TOML",
    sampleInput: "{\"name\":\"api\",\"replicas\":2,\"secure\":true,\"server\":{\"port\":8080}}",
    privacyNote: "JSON to TOML conversion happens in your browser.",
    features: [
      "Convert flat values and nested objects into TOML sections.",
      "Quote strings and arrays for config-friendly output.",
      "Avoid uploading private config while converting.",
    ],
    useCases: ["Config conversion", "TOML examples", "Project setup notes"],
  },
  {
    id: "markdown-preview",
    slug: "markdown-preview",
    name: "Markdown Preview",
    category: "markup",
    title: "Private Markdown Preview - No Upload | HappyFormatter",
    description: "Preview Markdown as HTML locally in your browser without uploading notes, docs, or snippets.",
    keywords: "markdown preview, private markdown preview, no upload markdown",
    inputLabel: "Markdown input",
    outputLabel: "HTML preview source",
    primaryAction: "Preview Markdown",
    sampleInput: "# Release notes\n\n- Added private tools\n- Kept snippets local\n\n`no upload`",
    privacyNote: "Markdown rendering runs in the browser tab.",
    features: [
      "Render headings, lists, paragraphs, inline code, emphasis, and links.",
      "Show generated HTML source in Monaco output.",
      "Keep drafts and internal notes local.",
    ],
    useCases: ["Docs drafts", "README snippets", "Release notes"],
  },
  {
    id: "markdown-to-html",
    slug: "markdown-to-html",
    name: "Markdown to HTML",
    category: "markup",
    title: "Private Markdown to HTML Converter - No Upload | HappyFormatter",
    description: "Convert Markdown snippets to HTML locally in your browser with no upload.",
    keywords: "markdown to html, private markdown converter, no upload markdown html",
    inputLabel: "Markdown input",
    outputLabel: "HTML output",
    primaryAction: "Convert to HTML",
    sampleInput: "## Status\n\nBuild is **green**.\n\n[Open tools](/tools)",
    privacyNote: "Markdown to HTML conversion is local to your browser.",
    features: [
      "Convert common Markdown syntax into HTML.",
      "Escape unsafe raw text before rendering.",
      "Copy HTML output for docs and CMS snippets.",
    ],
    useCases: ["Docs snippets", "CMS drafts", "Email fragments"],
  },
  {
    id: "html-entities",
    slug: "html-entity-encode-decode",
    name: "HTML Entity Encode Decode",
    category: "markup",
    title: "Private HTML Entity Encoder Decoder - No Upload | HappyFormatter",
    description: "Encode and decode HTML entities locally in your browser for safe snippets and readable output.",
    keywords: "html entity encode, html entity decode, private html entities",
    inputLabel: "HTML text",
    outputLabel: "Result",
    primaryAction: "Encode Entities",
    secondaryAction: "Decode Entities",
    sampleInput: "<button aria-label=\"Save\">Save & close</button>",
    privacyNote: "Entity encoding and decoding stay inside the browser.",
    features: [
      "Encode special HTML characters like <, >, &, quotes, and apostrophes.",
      "Decode named and numeric entities back to readable text.",
      "Avoid uploading template snippets.",
    ],
    useCases: ["Template snippets", "Docs examples", "Escaped HTML cleanup"],
  },
  {
    id: "unix-timestamp",
    slug: "unix-timestamp-converter",
    name: "Unix Timestamp Converter",
    category: "time",
    title: "Private Unix Timestamp Converter - No Upload | HappyFormatter",
    description: "Convert Unix timestamps to readable dates and dates to timestamps locally in your browser.",
    keywords: "unix timestamp converter, epoch converter, private timestamp tool",
    inputLabel: "Timestamp or date",
    outputLabel: "Converted time",
    primaryAction: "Convert Time",
    sampleInput: "1700000000",
    privacyNote: "Timestamp conversion runs locally in the browser.",
    features: [
      "Convert seconds or milliseconds since Unix epoch.",
      "Convert parseable date text back to epoch values.",
      "Show local time, UTC time, and ISO output.",
    ],
    useCases: ["Log debugging", "API timestamps", "Scheduled jobs"],
  },
  {
    id: "uuid-generator",
    slug: "uuid-generator",
    name: "UUID Generator",
    category: "text",
    title: "Private UUID Generator - No Upload | HappyFormatter",
    description: "Generate random UUIDs locally in your browser without a server request.",
    keywords: "uuid generator, random uuid, private uuid generator",
    inputLabel: "Count",
    outputLabel: "UUIDs",
    primaryAction: "Generate UUIDs",
    sampleInput: "5",
    privacyNote: "UUIDs are generated in the browser using Web Crypto where available.",
    features: [
      "Generate one or more UUID v4 values.",
      "Use browser-native randomness.",
      "Copy IDs for fixtures, examples, and tests.",
    ],
    useCases: ["Test data", "Fixture IDs", "API examples"],
  },
  {
    id: "text-case",
    slug: "text-case-converter",
    name: "Text Case Converter",
    category: "text",
    title: "Private Text Case Converter - No Upload | HappyFormatter",
    description: "Convert text to title, camel, snake, kebab, upper, and lower case locally in your browser.",
    keywords: "text case converter, camel case, snake case, private text tool",
    inputLabel: "Text input",
    outputLabel: "Case variants",
    primaryAction: "Convert Case",
    sampleInput: "private developer tools",
    privacyNote: "Case conversion runs locally and does not upload text.",
    features: [
      "Generate common identifier and display text cases.",
      "Create camelCase, snake_case, kebab-case, title case, and uppercase.",
      "Keep naming drafts local.",
    ],
    useCases: ["Variable names", "Slug drafts", "Heading cleanup"],
  },
  {
    id: "string-escape",
    slug: "string-escape-unescape",
    name: "String Escape Unescape",
    category: "text",
    title: "Private String Escape Unescape Tool - No Upload | HappyFormatter",
    description: "Escape strings for JSON-style literals or unescape them locally in your browser.",
    keywords: "string escape, string unescape, json escape string, private string tool",
    inputLabel: "String input",
    outputLabel: "Result",
    primaryAction: "Escape String",
    secondaryAction: "Unescape String",
    sampleInput: "Line 1\nLine 2 \"quoted\"",
    privacyNote: "String escaping happens locally in your browser.",
    features: [
      "Escape line breaks, tabs, quotes, and backslashes.",
      "Unescape JSON-style string literal content.",
      "Prepare safe snippets for config and code examples.",
    ],
    useCases: ["JSON strings", "Regex notes", "Config snippets"],
  },
  {
    id: "query-string-parser",
    slug: "query-string-parser",
    name: "Query String Parser",
    category: "text",
    title: "Private Query String Parser - No Upload | HappyFormatter",
    description: "Parse query strings and URLs into JSON locally in your browser without uploading links.",
    keywords: "query string parser, url params parser, private query parser",
    inputLabel: "URL or query string",
    outputLabel: "Parsed parameters",
    primaryAction: "Parse Query",
    sampleInput: "https://example.com/search?q=formatter&tag=json&tag=private",
    privacyNote: "URL and query parsing stay inside the browser tab.",
    features: [
      "Parse full URLs or raw query strings.",
      "Group repeated parameters into arrays.",
      "Decode percent-encoded values for inspection.",
    ],
    useCases: ["Callback URLs", "Analytics links", "API debugging"],
  },
  {
    id: "http-header-parser",
    slug: "http-header-parser",
    name: "HTTP Header Parser",
    category: "text",
    title: "Private HTTP Header Parser - No Upload | HappyFormatter",
    description: "Parse copied HTTP headers into JSON locally in your browser with no upload.",
    keywords: "http header parser, parse headers, private header parser",
    inputLabel: "HTTP headers",
    outputLabel: "Parsed headers",
    primaryAction: "Parse Headers",
    sampleInput: "Content-Type: application/json\nCache-Control: max-age=3600\nX-Request-ID: abc-123",
    privacyNote: "Header parsing runs locally. Copied request data is not uploaded.",
    features: [
      "Parse colon-separated header lines into JSON.",
      "Preserve repeated headers as arrays.",
      "Inspect request or response headers without a server roundtrip.",
    ],
    useCases: ["API debugging", "Cache checks", "Support notes"],
  },
  {
    id: "cron-explainer",
    slug: "cron-expression-explainer",
    name: "Cron Expression Explainer",
    category: "time",
    title: "Private Cron Expression Explainer - No Upload | HappyFormatter",
    description: "Explain common five-field cron expressions locally in your browser.",
    keywords: "cron expression explainer, cron parser, private cron tool",
    inputLabel: "Cron expression",
    outputLabel: "Explanation",
    primaryAction: "Explain Cron",
    sampleInput: "*/15 9-17 * * 1-5",
    privacyNote: "Cron explanation runs locally in the browser.",
    features: [
      "Explain minute, hour, day-of-month, month, and weekday fields.",
      "Recognize wildcards, ranges, steps, and lists.",
      "Create readable notes for schedules.",
    ],
    useCases: ["Scheduled jobs", "CI workflows", "Monitoring checks"],
  },
  {
    id: "css-unit-converter",
    slug: "css-unit-converter",
    name: "CSS Unit Converter",
    category: "css",
    title: "Private CSS Unit Converter - No Upload | HappyFormatter",
    description: "Convert px, rem, and em values locally in your browser with a configurable base size.",
    keywords: "css unit converter, px to rem, rem to px, private css tool",
    inputLabel: "CSS value",
    outputLabel: "Converted units",
    primaryAction: "Convert Units",
    sampleInput: "24px\nbase: 16px",
    privacyNote: "CSS unit conversion is local to your browser.",
    features: [
      "Convert px to rem/em and rem/em back to px.",
      "Use a base font size from the input when provided.",
      "Keep design token calculations quick and local.",
    ],
    useCases: ["Design tokens", "Responsive CSS", "Spacing calculations"],
  },
  {
    id: "svg-optimizer",
    slug: "svg-optimizer-pretty-printer",
    name: "SVG Optimizer Pretty Printer",
    category: "markup",
    title: "Private SVG Optimizer Pretty Printer - No Upload | HappyFormatter",
    description: "Clean and pretty-print SVG markup locally in your browser without uploading vector assets.",
    keywords: "svg optimizer, svg pretty printer, private svg tool",
    inputLabel: "SVG input",
    outputLabel: "SVG output",
    primaryAction: "Optimize SVG",
    secondaryAction: "Pretty Print SVG",
    sampleInput: "<svg width=\"24\" height=\"24\"><path d=\"M4 12h16\" /></svg>",
    privacyNote: "SVG cleanup runs locally. Markup is not uploaded.",
    features: [
      "Remove comments and whitespace between SVG tags.",
      "Pretty-print SVG tags for easier inspection.",
      "Keep icon and illustration markup local.",
    ],
    useCases: ["Icon cleanup", "SVG inspection", "Docs snippets"],
  },
];

export const getUtilityToolBySlug = (slug: string) => UTILITY_TOOLS.find(tool => tool.slug === slug);

export const getUtilityToolById = (id: string) => UTILITY_TOOLS.find(tool => tool.id === id);

export const getUtilityCategoryBySlug = (slug: string) => UTILITY_CATEGORIES.find(category => category.slug === slug);

export const getUtilityCategoryById = (id: UtilityToolCategoryId) =>
  UTILITY_CATEGORIES.find(category => category.id === id);

export const getUtilityToolsByCategory = (categoryId: UtilityToolCategoryId) =>
  UTILITY_TOOLS.filter(tool => tool.category === categoryId);

export const getUtilityToolBreadcrumbs = (tool: UtilityTool) => {
  const category = getUtilityCategoryById(tool.category);
  return [
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    ...(category ? [{ name: category.shortName, url: `/tools/${category.slug}` }] : []),
    { name: tool.name, url: `/tools/${tool.slug}` },
  ];
};

export const getUtilityCategoryBreadcrumbs = (category: UtilityToolCategory) => [
  { name: "Home", url: "/" },
  { name: "Tools", url: "/tools" },
  { name: category.shortName, url: `/tools/${category.slug}` },
];

export const getUtilityToolFAQ = (tool: UtilityTool) => [
  {
    title: `Is the ${tool.name} private?`,
    content: tool.privacyNote,
  },
  {
    title: `What can I use the ${tool.name} for?`,
    content: `${
      tool.useCases.join(", ")
    } are common uses. The tool runs in your browser so it is suitable for quick checks and sensitive snippets.`,
  },
  {
    title: `Does HappyFormatter store ${tool.name} input?`,
    content:
      "No. HappyFormatter's utility tools process pasted input in the browser tab and do not store it on a server.",
  },
];
