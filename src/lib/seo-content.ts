import type { ToolFAQItem } from "@/lib/tool-page-seo";

export type SeoContentFamily = "compare" | "errors" | "guides";

export interface ToolExample {
  input: string;
  output: string;
  language: string;
  label: string;
  description: string;
}

export interface RelatedLink {
  title: string;
  href: string;
  description: string;
  group: string;
}

export interface SeoContentPage {
  slug: string;
  family: SeoContentFamily;
  title: string;
  description: string;
  h1: string;
  summary: string;
  examples: ToolExample[];
  faqs: ToolFAQItem[];
  relatedLinks: RelatedLink[];
  canonicalPath: string;
  keywords: string;
}

export interface ComparisonPage extends SeoContentPage {
  family: "compare";
  left: string;
  right: string;
  bestFor: string[];
  differences: string[];
  recommendedToolSlug: string;
}

export interface ErrorGuidePage extends SeoContentPage {
  family: "errors";
  errorName: string;
  symptoms: string[];
  badExample: ToolExample;
  fixedExample: ToolExample;
  fixSteps: string[];
  toolSlug: string;
}

export interface GuidePage extends SeoContentPage {
  family: "guides";
  task: string;
  steps: string[];
  exampleBefore: ToolExample;
  exampleAfter: ToolExample;
  toolSlug: string;
}

export type AnySeoContentPage = ComparisonPage | ErrorGuidePage | GuidePage;

const privateFaq = (toolName: string): ToolFAQItem => ({
  title: `Is this ${toolName} workflow private?`,
  content:
    "Yes. The linked HappyFormatter tool runs in your browser and is designed for no-upload processing, so pasted snippets stay on your device.",
});

const faq = (title: string, content: string): ToolFAQItem => ({ title, content });

const related = (
  title: string,
  href: string,
  description: string,
  group = "Related tool",
): RelatedLink => ({ title, href, description, group });

const baseExample = (
  label: string,
  language: string,
  input: string,
  output: string,
  description: string,
): ToolExample => ({ label, language, input, output, description });

export const COMPARISON_PAGES: ComparisonPage[] = [
  {
    slug: "python-ruff-vs-black",
    family: "compare",
    left: "Ruff formatter",
    right: "Black",
    recommendedToolSlug: "python-ruff",
    title: "Private Ruff vs Black Python Formatter Comparison - No Upload | HappyFormatter",
    description:
      "Compare Ruff and Black for Python formatting, then try a private Ruff formatter that runs locally in your browser with no upload.",
    h1: "Ruff vs Black for Python formatting",
    summary:
      "Ruff and Black both produce consistent Python style. Ruff is usually chosen when teams want one fast tool for linting and formatting, while Black remains the familiar dedicated formatter.",
    keywords: "ruff vs black, python formatter comparison, private python ruff formatter, no upload python formatter",
    canonicalPath: "/compare/python-ruff-vs-black",
    bestFor: [
      "Use Ruff when you want fast local formatting plus the option to align lint rules later.",
      "Use Black when your project already standardizes on Black output and wants minimal tooling change.",
      "Use HappyFormatter for quick browser checks before committing a snippet.",
    ],
    differences: [
      "Ruff focuses on speed and an integrated Python toolchain.",
      "Black focuses on stable, opinionated formatting with broad ecosystem adoption.",
      "Both are formatter choices; neither replaces type checking or tests.",
    ],
    examples: [
      baseExample(
        "Messy function",
        "python",
        "def greet(name):\n print(  f\"Hello, {name}\" )",
        "def greet(name):\n    print(f\"Hello, {name}\")",
        "A browser Ruff formatter fixes indentation and spacing without uploading code.",
      ),
    ],
    faqs: [
      privateFaq("Python formatter"),
      faq(
        "Should I switch from Black to Ruff?",
        "Switch only if speed, a smaller toolchain, or Ruff lint alignment matters to your team. Otherwise Black is still a reliable default.",
      ),
      faq(
        "Does the browser tool install Ruff?",
        "No. The formatter runs client-side in the browser using the bundled formatter runtime.",
      ),
    ],
    relatedLinks: [
      related("Private Python Ruff Formatter", "/python-ruff", "Format Python with Ruff in the browser."),
      related("Python Formatter", "/python", "Use the canonical Python formatter page."),
      related(
        "Format Python File Guide",
        "/guides/format-python-file",
        "See a practical file-formatting workflow.",
        "Guide",
      ),
    ],
  },
  {
    slug: "javascript-biome-vs-prettier",
    family: "compare",
    left: "Biome",
    right: "Prettier",
    recommendedToolSlug: "javascript-biome",
    title: "Private Biome vs Prettier JavaScript Formatter - No Upload | HappyFormatter",
    description:
      "Compare Biome and Prettier for JavaScript formatting, with a private browser Biome formatter that keeps code local.",
    h1: "Biome vs Prettier for JavaScript",
    summary:
      "Prettier is the established formatter for many JavaScript projects. Biome is attractive when teams want fast formatting and linting from one toolchain.",
    keywords: "biome vs prettier javascript, javascript formatter comparison, private biome formatter",
    canonicalPath: "/compare/javascript-biome-vs-prettier",
    bestFor: [
      "Biome for fast integrated tooling.",
      "Prettier for maximum ecosystem familiarity.",
      "HappyFormatter for quick no-upload snippet cleanup.",
    ],
    differences: [
      "Biome can combine formatter and linter workflows.",
      "Prettier has broad plugin and editor adoption.",
      "Project conventions matter more than personal preference.",
    ],
    examples: [
      baseExample(
        "Messy JavaScript",
        "javascript",
        "const user={name:'Ada',roles:['admin','editor']};",
        "const user = { name: \"Ada\", roles: [\"admin\", \"editor\"] };",
        "Biome-style formatting makes object and array spacing easier to read.",
      ),
    ],
    faqs: [
      privateFaq("JavaScript formatter"),
      faq(
        "Is Biome a Prettier replacement?",
        "It can be for many projects, but migration should be tested against your project style and CI rules.",
      ),
      faq("Can I format code without uploading it?", "Yes. Use the linked private browser formatter."),
    ],
    relatedLinks: [
      related("JavaScript Biome Formatter", "/javascript-biome", "Format JavaScript with Biome locally."),
      related("JavaScript Minifier", "/minify/javascript", "Minify JavaScript after formatting."),
      related(
        "TypeScript Biome vs Prettier",
        "/compare/typescript-biome-vs-prettier",
        "Compare the TypeScript workflow.",
        "Comparison",
      ),
    ],
  },
  {
    slug: "typescript-biome-vs-prettier",
    family: "compare",
    left: "Biome",
    right: "Prettier",
    recommendedToolSlug: "typescript-biome",
    title: "Private Biome vs Prettier TypeScript Formatter - No Upload | HappyFormatter",
    description:
      "Compare Biome and Prettier for TypeScript, then format TypeScript privately in your browser with no upload.",
    h1: "Biome vs Prettier for TypeScript",
    summary:
      "Biome gives TypeScript projects a fast formatter path. Prettier remains a safe choice when teams depend on its ecosystem compatibility.",
    keywords: "biome vs prettier typescript, typescript formatter comparison, private typescript formatter",
    canonicalPath: "/compare/typescript-biome-vs-prettier",
    bestFor: [
      "Biome for speed and integrated lint ambitions.",
      "Prettier for existing editor and plugin workflows.",
      "Browser formatting for quick private snippets.",
    ],
    differences: [
      "Biome is performance-oriented.",
      "Prettier is convention-heavy and widely adopted.",
      "Neither validates TypeScript types.",
    ],
    examples: [
      baseExample(
        "Messy TypeScript",
        "typescript",
        "type User={id:number;name:string}\nconst user:User={id:1,name:'Ada'}",
        "type User = { id: number; name: string };\nconst user: User = { id: 1, name: \"Ada\" };",
        "Formatting clarifies type annotations and object literals.",
      ),
    ],
    faqs: [
      privateFaq("TypeScript formatter"),
      faq(
        "Will formatting type-check my code?",
        "No. Formatting changes layout and style; run TypeScript checks separately.",
      ),
      faq(
        "Should CI use the same formatter?",
        "Yes. Use one project formatter in CI so browser checks match team expectations.",
      ),
    ],
    relatedLinks: [
      related("TypeScript Biome Formatter", "/typescript-biome", "Format TypeScript in the browser."),
      related("TypeScript Minifier", "/minify/typescript", "Minify TypeScript-compatible output."),
      related(
        "JavaScript Biome vs Prettier",
        "/compare/javascript-biome-vs-prettier",
        "Compare JavaScript formatting.",
        "Comparison",
      ),
    ],
  },
  {
    slug: "json-formatter-vs-json-viewer",
    family: "compare",
    left: "JSON Formatter",
    right: "JSON Viewer",
    recommendedToolSlug: "json-viewer",
    title: "Private JSON Formatter vs JSON Viewer - No Upload | HappyFormatter",
    description: "Learn when to use a JSON formatter or JSON viewer, with no-upload browser tools for both workflows.",
    h1: "JSON formatter vs JSON viewer",
    summary:
      "A formatter rewrites JSON for readability. A viewer helps inspect structure, validate syntax, and understand objects or arrays.",
    keywords: "json formatter vs json viewer, private json viewer, no upload json formatter",
    canonicalPath: "/compare/json-formatter-vs-json-viewer",
    bestFor: [
      "Formatter for cleaning pasted JSON.",
      "Viewer for inspecting API responses.",
      "Both for private browser-only JSON checks.",
    ],
    differences: [
      "Formatting changes whitespace.",
      "Viewing adds inspection context.",
      "Both should preserve data values when JSON is valid.",
    ],
    examples: [
      baseExample(
        "Compact JSON",
        "json",
        "{\"id\":1,\"active\":true}",
        "{\n  \"id\": 1,\n  \"active\": true\n}",
        "The formatter expands compact JSON while the viewer helps inspect the structure.",
      ),
    ],
    faqs: [
      privateFaq("JSON tool"),
      faq("Does formatting change JSON values?", "No. Valid formatting changes whitespace, not keys or values."),
      faq(
        "When should I use a viewer?",
        "Use a viewer when you need syntax checks, structure summaries, or easier inspection.",
      ),
    ],
    relatedLinks: [
      related("JSON Formatter", "/json", "Format JSON locally."),
      related("JSON Viewer", "/tools/json-viewer", "Inspect JSON locally."),
      related("JSON Diff", "/tools/json-diff", "Compare JSON documents.", "Tool"),
    ],
  },
  {
    slug: "json-minifier-vs-json-formatter",
    family: "compare",
    left: "JSON Minifier",
    right: "JSON Formatter",
    recommendedToolSlug: "json-viewer",
    title: "Private JSON Minifier vs JSON Formatter - No Upload | HappyFormatter",
    description: "Compare JSON minifying and formatting, then use private browser tools that do not upload your JSON.",
    h1: "JSON minifier vs JSON formatter",
    summary:
      "Minifying removes unnecessary whitespace for transport. Formatting adds whitespace so humans can read and review JSON.",
    keywords: "json minifier vs formatter, private json minifier, no upload json formatter",
    canonicalPath: "/compare/json-minifier-vs-json-formatter",
    bestFor: [
      "Minify for payload size.",
      "Format for review and debugging.",
      "Use both locally when handling sensitive JSON.",
    ],
    differences: ["Minified JSON is compact.", "Formatted JSON is readable.", "Both require valid JSON input."],
    examples: [
      baseExample(
        "Formatted JSON",
        "json",
        "{\n  \"id\": 1,\n  \"active\": true\n}",
        "{\"id\":1,\"active\":true}",
        "Minifying removes whitespace while keeping the same values.",
      ),
    ],
    faqs: [
      privateFaq("JSON minifier"),
      faq(
        "Can minifying break JSON?",
        "A correct minifier preserves valid values but invalid JSON must be fixed first.",
      ),
      faq(
        "Should API payloads be formatted?",
        "For production transport, compact JSON is usually fine; format it for debugging and review.",
      ),
    ],
    relatedLinks: [
      related("JSON Minifier", "/minify/json", "Minify JSON in the browser."),
      related("JSON Formatter", "/json", "Pretty-print JSON locally."),
      related("JSON Trailing Comma Fix", "/errors/json-trailing-comma", "Fix a common parse error.", "Error guide"),
    ],
  },
  {
    slug: "yaml-vs-json",
    family: "compare",
    left: "YAML",
    right: "JSON",
    recommendedToolSlug: "yaml-to-json",
    title: "Private YAML vs JSON Comparison - No Upload | HappyFormatter",
    description:
      "Compare YAML and JSON for config and data exchange, with private browser converters that keep snippets local.",
    h1: "YAML vs JSON",
    summary: "JSON is strict and common for APIs. YAML is more readable for configuration but indentation-sensitive.",
    keywords: "yaml vs json, yaml to json converter private, no upload yaml converter",
    canonicalPath: "/compare/yaml-vs-json",
    bestFor: [
      "JSON for APIs and machine exchange.",
      "YAML for human-edited config.",
      "Converters for quick private migration checks.",
    ],
    differences: [
      "JSON requires quoted keys and no comments.",
      "YAML supports comments but depends on indentation.",
      "JSON parser errors are often clearer.",
    ],
    examples: [
      baseExample(
        "YAML config",
        "yaml",
        "service: api\nreplicas: 2",
        "{\n  \"service\": \"api\",\n  \"replicas\": 2\n}",
        "A converter helps move config snippets into JSON.",
      ),
    ],
    faqs: [
      privateFaq("YAML/JSON converter"),
      faq(
        "Is YAML a superset of JSON?",
        "YAML can represent JSON-like data, but real-world parsers and formatting rules differ.",
      ),
      faq(
        "Why does YAML fail on indentation?",
        "YAML uses indentation to define structure, so inconsistent spaces can change or break parsing.",
      ),
    ],
    relatedLinks: [
      related("YAML to JSON", "/tools/yaml-to-json", "Convert YAML locally."),
      related("JSON to YAML", "/tools/json-to-yaml", "Convert JSON locally."),
      related("YAML Indentation Guide", "/errors/yaml-indentation", "Fix indentation errors.", "Error guide"),
    ],
  },
  {
    slug: "toml-vs-yaml",
    family: "compare",
    left: "TOML",
    right: "YAML",
    recommendedToolSlug: "toml-to-json",
    title: "Private TOML vs YAML Comparison - No Upload | HappyFormatter",
    description:
      "Compare TOML and YAML config formats, then convert TOML or YAML locally in your browser with no upload.",
    h1: "TOML vs YAML",
    summary:
      "TOML favors explicit key-value config. YAML is flexible and widely used, but indentation issues are common.",
    keywords: "toml vs yaml, toml to json private, yaml config comparison",
    canonicalPath: "/compare/toml-vs-yaml",
    bestFor: [
      "TOML for simple app configuration.",
      "YAML for ecosystem-specific config files.",
      "JSON conversion for validation and inspection.",
    ],
    differences: [
      "TOML uses sections and explicit assignment.",
      "YAML uses indentation and nested blocks.",
      "TOML is often easier for flat config files.",
    ],
    examples: [
      baseExample(
        "TOML config",
        "toml",
        "service = \"api\"\nreplicas = 2",
        "{\n  \"service\": \"api\",\n  \"replicas\": 2\n}",
        "Converting to JSON helps inspect TOML values.",
      ),
    ],
    faqs: [
      privateFaq("TOML converter"),
      faq(
        "Is TOML easier than YAML?",
        "For flat config, often yes. For complex nested documents, choose the format your toolchain expects.",
      ),
      faq("Can I convert TOML without uploading it?", "Yes. Use the linked private browser converter."),
    ],
    relatedLinks: [
      related("TOML to JSON", "/tools/toml-to-json", "Convert TOML locally."),
      related("JSON to TOML", "/tools/json-to-toml", "Convert JSON locally."),
      related("YAML vs JSON", "/compare/yaml-vs-json", "Compare adjacent formats.", "Comparison"),
    ],
  },
  {
    slug: "base64-vs-url-encoding",
    family: "compare",
    left: "Base64",
    right: "URL encoding",
    recommendedToolSlug: "base64",
    title: "Private Base64 vs URL Encoding Comparison - No Upload | HappyFormatter",
    description: "Learn when to use Base64 or URL encoding, with private browser encoders that keep text local.",
    h1: "Base64 vs URL encoding",
    summary:
      "Base64 represents binary or text as ASCII. URL encoding escapes characters so values can safely travel in URLs.",
    keywords: "base64 vs url encoding, private base64 decoder, no upload url encoder",
    canonicalPath: "/compare/base64-vs-url-encoding",
    bestFor: [
      "Base64 for compact text/binary representation.",
      "URL encoding for query strings and paths.",
      "Private tools for sensitive tokens and callback URLs.",
    ],
    differences: [
      "Base64 is not encryption.",
      "URL encoding preserves URL syntax.",
      "Both can expose secrets if shared.",
    ],
    examples: [
      baseExample(
        "URL value",
        "plaintext",
        "name=Ada Lovelace",
        "name%3DAda%20Lovelace",
        "URL encoding escapes characters that are unsafe in a query value.",
      ),
    ],
    faqs: [
      privateFaq("encoding tool"),
      faq("Is Base64 secure?", "No. Base64 is reversible encoding, not encryption."),
      faq(
        "Should JWTs be pasted into online decoders?",
        "Use a no-upload local decoder when inspecting tokens, and avoid real secrets unless allowed by policy.",
      ),
    ],
    relatedLinks: [
      related("Base64 Encoder Decoder", "/tools/base64-encode-decode", "Encode or decode Base64 locally."),
      related("URL Encoder Decoder", "/tools/url-encoder-decoder", "Encode or decode URLs locally."),
      related("Invalid Base64 Guide", "/errors/base64-invalid-character", "Fix Base64 parse errors.", "Error guide"),
    ],
  },
];

export const ERROR_GUIDE_PAGES: ErrorGuidePage[] = [
  {
    slug: "json-trailing-comma",
    family: "errors",
    errorName: "JSON trailing comma",
    title: "Fix JSON Trailing Comma Error Privately - No Upload | HappyFormatter",
    description:
      "Fix JSON trailing comma parse errors with examples and a private no-upload JSON formatter that runs in your browser.",
    h1: "Fix JSON trailing comma errors",
    summary:
      "JSON does not allow trailing commas after the final object property or array item. Remove the last comma, then format or validate again.",
    keywords: "json trailing comma error, fix json parse error, private json formatter",
    canonicalPath: "/errors/json-trailing-comma",
    badExample: baseExample(
      "Invalid JSON",
      "json",
      "{\n  \"name\": \"Ada\",\n}",
      "Unexpected token } in JSON",
      "The comma after the last property is invalid JSON.",
    ),
    fixedExample: baseExample(
      "Fixed JSON",
      "json",
      "{\n  \"name\": \"Ada\"\n}",
      "Valid JSON object",
      "Remove the trailing comma after the last property.",
    ),
    examples: [],
    symptoms: [
      "Parser points near a closing brace or bracket.",
      "Input works in JavaScript but fails as JSON.",
      "Formatter refuses to pretty-print the document.",
    ],
    fixSteps: [
      "Find the comma before the closing brace or bracket.",
      "Remove the comma if no property or item follows it.",
      "Run the JSON formatter or viewer to validate the result.",
    ],
    toolSlug: "json",
    faqs: [
      privateFaq("JSON formatter"),
      faq(
        "Why does JavaScript allow this but JSON does not?",
        "JavaScript object literals can allow trailing commas, but JSON is stricter.",
      ),
      faq(
        "Can a formatter fix every invalid JSON file?",
        "No. A formatter can only format valid JSON; syntax errors must be corrected first.",
      ),
    ],
    relatedLinks: [
      related("JSON Formatter", "/json", "Validate and format JSON locally."),
      related("JSON Viewer", "/tools/json-viewer", "Inspect JSON after fixing it."),
      related("Format JSON File", "/guides/format-json-file", "Follow a complete JSON cleanup workflow.", "Guide"),
    ],
  },
  {
    slug: "json-unexpected-token",
    family: "errors",
    errorName: "JSON unexpected token",
    title: "Fix JSON Unexpected Token Error Privately - No Upload | HappyFormatter",
    description: "Troubleshoot JSON unexpected token errors with examples and private browser JSON tools.",
    h1: "Fix JSON unexpected token errors",
    summary:
      "Unexpected token errors usually mean invalid quotes, comments, missing commas, or extra text before or after the JSON value.",
    keywords: "json unexpected token, fix json syntax, private json viewer",
    canonicalPath: "/errors/json-unexpected-token",
    badExample: baseExample(
      "Invalid JSON",
      "json",
      "{ name: \"Ada\" }",
      "Unexpected token n in JSON",
      "JSON keys must be quoted strings.",
    ),
    fixedExample: baseExample(
      "Fixed JSON",
      "json",
      "{ \"name\": \"Ada\" }",
      "Valid JSON object",
      "Quote object keys and keep JSON syntax strict.",
    ),
    examples: [],
    symptoms: [
      "Parser highlights a letter, quote, or punctuation mark.",
      "The document looks like JavaScript instead of JSON.",
      "There may be comments or single-quoted strings.",
    ],
    fixSteps: [
      "Check whether object keys use double quotes.",
      "Remove comments and unsupported JavaScript syntax.",
      "Validate with the private JSON viewer.",
    ],
    toolSlug: "json-viewer",
    faqs: [
      privateFaq("JSON viewer"),
      faq("Are single quotes valid JSON?", "No. JSON strings and keys must use double quotes."),
      faq("Can JSON include comments?", "No. Remove comments before parsing strict JSON."),
    ],
    relatedLinks: [
      related("JSON Viewer", "/tools/json-viewer", "Validate JSON locally."),
      related("JSON Formatter", "/json", "Format valid JSON."),
      related("JSON Trailing Comma", "/errors/json-trailing-comma", "Fix another common JSON error.", "Error guide"),
    ],
  },
  {
    slug: "yaml-indentation",
    family: "errors",
    errorName: "YAML indentation",
    title: "Fix YAML Indentation Errors Privately - No Upload | HappyFormatter",
    description: "Learn how to fix YAML indentation problems and convert YAML privately in the browser with no upload.",
    h1: "Fix YAML indentation errors",
    summary:
      "YAML uses indentation to define structure. Mixing levels, tabs, or misaligned list items can change the document or make it fail.",
    keywords: "yaml indentation error, fix yaml, private yaml formatter",
    canonicalPath: "/errors/yaml-indentation",
    badExample: baseExample(
      "Misaligned YAML",
      "yaml",
      "service:\n name: api\n  port: 8080",
      "Indentation error",
      "The nested keys do not align.",
    ),
    fixedExample: baseExample(
      "Fixed YAML",
      "yaml",
      "service:\n  name: api\n  port: 8080",
      "Aligned YAML",
      "Use the same indentation level for sibling keys.",
    ),
    examples: [],
    symptoms: [
      "A parser complains about block mapping.",
      "Sibling values appear nested incorrectly.",
      "Tabs or inconsistent spaces are present.",
    ],
    fixSteps: [
      "Replace tabs with spaces.",
      "Align sibling keys at the same indentation level.",
      "Convert to JSON to inspect the parsed structure.",
    ],
    toolSlug: "yaml-to-json",
    faqs: [
      privateFaq("YAML converter"),
      faq(
        "How many spaces should YAML use?",
        "Two spaces is common, but consistency within the file is the important part.",
      ),
      faq(
        "Can conversion reveal indentation mistakes?",
        "Yes. Converting YAML to JSON shows the structure your indentation produced.",
      ),
    ],
    relatedLinks: [
      related("YAML to JSON", "/tools/yaml-to-json", "Inspect YAML structure locally."),
      related("YAML Formatter", "/yaml", "Format YAML in the browser."),
      related("YAML vs JSON", "/compare/yaml-vs-json", "Choose the right format.", "Comparison"),
    ],
  },
  {
    slug: "xml-mismatched-tag",
    family: "errors",
    errorName: "XML mismatched tag",
    title: "Fix XML Mismatched Tag Errors Privately - No Upload | HappyFormatter",
    description:
      "Fix XML mismatched closing tags with examples and a private XML formatter/converter that keeps input local.",
    h1: "Fix XML mismatched tag errors",
    summary: "A mismatched tag means an opening element was closed with the wrong name or nesting order.",
    keywords: "xml mismatched tag, fix xml parser error, private xml formatter",
    canonicalPath: "/errors/xml-mismatched-tag",
    badExample: baseExample(
      "Invalid XML",
      "xml",
      "<user><name>Ada</user></name>",
      "Mismatched closing tag",
      "The name element closes after its parent.",
    ),
    fixedExample: baseExample(
      "Fixed XML",
      "xml",
      "<user><name>Ada</name></user>",
      "Valid XML",
      "Close nested elements before closing their parent.",
    ),
    examples: [],
    symptoms: [
      "Parser reports an unexpected closing tag.",
      "Formatted output cannot be produced.",
      "Nested elements close out of order.",
    ],
    fixSteps: [
      "Pair each opening tag with the same closing tag.",
      "Close inner elements before parent elements.",
      "Format XML to reveal nesting.",
    ],
    toolSlug: "xml",
    faqs: [
      privateFaq("XML formatter"),
      faq("Are XML tags case-sensitive?", "Yes. <Name> and </name> do not match."),
      faq(
        "Can XML attributes cause mismatched tags?",
        "Attributes can be invalid separately, but mismatched tag errors are usually element nesting problems.",
      ),
    ],
    relatedLinks: [
      related("XML Formatter", "/xml", "Format XML locally."),
      related("XML to JSON", "/tools/xml-to-json", "Convert XML after it parses."),
      related("XML Minifier", "/minify/xml", "Minify valid XML.", "Tool"),
    ],
  },
  {
    slug: "base64-invalid-character",
    family: "errors",
    errorName: "Base64 invalid character",
    title: "Fix Base64 Invalid Character Errors Privately - No Upload | HappyFormatter",
    description: "Fix Base64 invalid character and padding issues using private browser encoding tools with no upload.",
    h1: "Fix Base64 invalid character errors",
    summary:
      "Base64 decoding fails when the string includes unsupported characters, whitespace in the wrong place, URL-safe variants, or missing padding.",
    keywords: "base64 invalid character, fix base64 decode, private base64 decoder",
    canonicalPath: "/errors/base64-invalid-character",
    badExample: baseExample(
      "Invalid Base64",
      "plaintext",
      "SGVsbG8*",
      "Invalid character",
      "The asterisk is not part of the Base64 alphabet.",
    ),
    fixedExample: baseExample(
      "Fixed Base64",
      "plaintext",
      "SGVsbG8=",
      "Hello",
      "Use valid characters and correct padding.",
    ),
    examples: [],
    symptoms: [
      "Decoder reports invalid character.",
      "Token uses - and _ URL-safe characters.",
      "Padding with = may be missing.",
    ],
    fixSteps: [
      "Remove characters outside the Base64 alphabet.",
      "Convert URL-safe - and _ to + and / if needed.",
      "Add padding so length is divisible by four.",
    ],
    toolSlug: "base64-encode-decode",
    faqs: [
      privateFaq("Base64 decoder"),
      faq("Is Base64 encrypted?", "No. Anyone can decode Base64 text."),
      faq(
        "What is URL-safe Base64?",
        "A variant that replaces + and / with - and _ so encoded text can travel in URLs.",
      ),
    ],
    relatedLinks: [
      related("Base64 Encoder Decoder", "/tools/base64-encode-decode", "Decode Base64 locally."),
      related("Base64 vs URL Encoding", "/compare/base64-vs-url-encoding", "Understand the difference.", "Comparison"),
      related("URL Encoder", "/tools/url-encoder-decoder", "Decode URL-escaped values.", "Tool"),
    ],
  },
  {
    slug: "jwt-invalid-token",
    family: "errors",
    errorName: "JWT invalid token",
    title: "Fix Invalid JWT Token Format Privately - No Upload | HappyFormatter",
    description:
      "Understand invalid JWT format errors and inspect token parts locally with a private no-upload JWT decoder.",
    h1: "Fix invalid JWT token format",
    summary:
      "A JWT should usually contain three dot-separated segments: header, payload, and signature. Decode errors often come from missing segments or malformed Base64URL text.",
    keywords: "invalid jwt token, jwt decode error, private jwt decoder",
    canonicalPath: "/errors/jwt-invalid-token",
    badExample: baseExample(
      "Invalid JWT",
      "plaintext",
      "eyJhbGciOiJIUzI1NiJ9",
      "Missing payload segment",
      "This has only one segment.",
    ),
    fixedExample: baseExample(
      "JWT shape",
      "plaintext",
      "header.payload.signature",
      "Three segments",
      "A signed JWT has header, payload, and signature segments.",
    ),
    examples: [],
    symptoms: [
      "Decoder says token has too few segments.",
      "Header or payload is not valid JSON after decoding.",
      "Copied token includes a Bearer prefix or whitespace.",
    ],
    fixSteps: [
      "Remove the Bearer prefix if present.",
      "Check that the token has dot-separated segments.",
      "Decode header and payload locally; verify signatures server-side.",
    ],
    toolSlug: "jwt-decoder",
    faqs: [
      privateFaq("JWT decoder"),
      faq(
        "Does decoding verify a JWT?",
        "No. Decoding reads the header and payload only; signature verification requires the correct key.",
      ),
      faq(
        "Should I paste production JWTs online?",
        "Prefer a local/no-upload decoder and follow your security policy.",
      ),
    ],
    relatedLinks: [
      related("JWT Decoder", "/tools/jwt-decoder", "Decode JWTs locally."),
      related("Base64 Decoder", "/tools/base64-encode-decode", "Inspect encoded segments.", "Tool"),
      related("Decode JWT Guide", "/guides/decode-jwt-token", "Follow a safe JWT inspection workflow.", "Guide"),
    ],
  },
  {
    slug: "regex-invalid-group",
    family: "errors",
    errorName: "Regex invalid group",
    title: "Fix Regex Invalid Group Errors Privately - No Upload | HappyFormatter",
    description: "Fix JavaScript regex invalid group errors and test patterns locally in your browser with no upload.",
    h1: "Fix regex invalid group errors",
    summary:
      "Invalid group errors usually come from unsupported group syntax, missing parentheses, or lookbehind patterns in environments that do not support them.",
    keywords: "regex invalid group, javascript regex error, private regex tester",
    canonicalPath: "/errors/regex-invalid-group",
    badExample: baseExample(
      "Invalid regex",
      "plaintext",
      "(?<name[A-Z]+)",
      "Invalid capture group name",
      "The named group syntax is incomplete.",
    ),
    fixedExample: baseExample(
      "Fixed regex",
      "plaintext",
      "(?<name>[A-Z]+)",
      "Valid named capture group",
      "Close the group name before the pattern.",
    ),
    examples: [],
    symptoms: [
      "RegExp constructor throws before matching.",
      "Named group syntax is malformed.",
      "Copied pattern uses syntax from another regex engine.",
    ],
    fixSteps: [
      "Check every opening parenthesis has a valid closing parenthesis.",
      "Verify named group syntax like (?<name>...).",
      "Test the pattern with JavaScript-compatible flags.",
    ],
    toolSlug: "regex-tester",
    faqs: [
      privateFaq("regex tester"),
      faq(
        "Are all regex engines the same?",
        "No. JavaScript, PCRE, Ruby, and other engines support different features.",
      ),
      faq("Can I test private log snippets locally?", "Yes, the regex tester runs in the browser."),
    ],
    relatedLinks: [
      related("Regex Tester", "/tools/regex-tester", "Test JavaScript regex locally."),
      related("String Escape Tool", "/tools/string-escape-unescape", "Escape patterns and strings.", "Tool"),
      related("Query String Parser", "/tools/query-string-parser", "Parse query text locally.", "Tool"),
    ],
  },
  {
    slug: "css-missing-brace",
    family: "errors",
    errorName: "CSS missing brace",
    title: "Fix CSS Missing Brace Errors Privately - No Upload | HappyFormatter",
    description: "Find and fix missing CSS braces, then format or minify CSS privately in your browser with no upload.",
    h1: "Fix CSS missing brace errors",
    summary:
      "A missing brace can cause later selectors to be parsed inside the wrong rule. Add the missing closing brace, then format CSS to confirm structure.",
    keywords: "css missing brace, fix css syntax, private css formatter",
    canonicalPath: "/errors/css-missing-brace",
    badExample: baseExample(
      "Invalid CSS",
      "css",
      ".button {\n  color: white;\n.card { padding: 1rem; }",
      "Missing closing brace",
      "The .button rule never closes.",
    ),
    fixedExample: baseExample(
      "Fixed CSS",
      "css",
      ".button {\n  color: white;\n}\n.card { padding: 1rem; }",
      "Valid CSS",
      "Close the first rule before starting the next selector.",
    ),
    examples: [],
    symptoms: [
      "A later selector stops working.",
      "Formatter output nests rules unexpectedly.",
      "Minifier fails or produces surprising CSS.",
    ],
    fixSteps: [
      "Count opening and closing braces near the failing selector.",
      "Close the active rule before the next selector.",
      "Format CSS to verify rule boundaries.",
    ],
    toolSlug: "css",
    faqs: [
      privateFaq("CSS formatter"),
      faq(
        "Can a CSS formatter repair missing braces?",
        "It can reveal structure, but you must add missing syntax when parsing fails.",
      ),
      faq("Should I minify before fixing CSS?", "No. Fix and format first, then minify valid CSS."),
    ],
    relatedLinks: [
      related("CSS Formatter", "/css", "Format CSS locally."),
      related("CSS Minifier", "/minify/css", "Minify valid CSS locally."),
      related("CSS Unit Converter", "/tools/css-unit-converter", "Convert CSS units.", "Tool"),
    ],
  },
].map(page => ({
  ...page,
  examples: [page.badExample, page.fixedExample],
})) as ErrorGuidePage[];

export const GUIDE_PAGES: GuidePage[] = [
  {
    slug: "format-json-file",
    family: "guides",
    task: "Format a JSON file",
    title: "Format JSON File Privately In Browser - No Upload | HappyFormatter",
    description:
      "Format a JSON file or snippet in your browser with no upload, using a private JSON formatter and validation workflow.",
    h1: "Format a JSON file privately",
    summary:
      "Paste JSON, validate syntax, format it with readable indentation, then copy the cleaned file back to your editor.",
    keywords: "format json file, private json formatter, no upload json format",
    canonicalPath: "/guides/format-json-file",
    steps: [
      "Paste the JSON into the private JSON formatter.",
      "Fix parser errors such as trailing commas or unquoted keys.",
      "Click Format code and review the output.",
      "Copy the formatted JSON back to your file.",
    ],
    exampleBefore: baseExample(
      "Before",
      "json",
      "{\"user\":{\"id\":1,\"name\":\"Ada\"},\"active\":true}",
      "{\n  \"user\": {\n    \"id\": 1,\n    \"name\": \"Ada\"\n  },\n  \"active\": true\n}",
      "Compact JSON becomes easier to review.",
    ),
    exampleAfter: baseExample(
      "After",
      "json",
      "{\n  \"user\": {\n    \"id\": 1,\n    \"name\": \"Ada\"\n  },\n  \"active\": true\n}",
      "Readable JSON file",
      "Formatted JSON keeps the same values with clearer whitespace.",
    ),
    examples: [],
    toolSlug: "json",
    faqs: [
      privateFaq("JSON formatter"),
      faq("Does this upload my JSON file?", "No. Paste processing happens in the browser tab."),
      faq("Can I format invalid JSON?", "Fix syntax errors first, then format."),
    ],
    relatedLinks: [
      related("JSON Formatter", "/json", "Open the private JSON formatter."),
      related("JSON Viewer", "/tools/json-viewer", "Validate JSON locally."),
      related("JSON Trailing Comma", "/errors/json-trailing-comma", "Fix a common parse error.", "Error guide"),
    ],
  },
  {
    slug: "format-yaml-file",
    family: "guides",
    task: "Format a YAML file",
    title: "Format YAML File Privately In Browser - No Upload | HappyFormatter",
    description: "Format YAML locally in your browser and keep config snippets private with no upload.",
    h1: "Format a YAML file privately",
    summary:
      "YAML formatting is mostly about indentation, spacing, and readable structure. Validate the shape before committing config changes.",
    keywords: "format yaml file, private yaml formatter, no upload yaml",
    canonicalPath: "/guides/format-yaml-file",
    steps: [
      "Paste YAML into the formatter.",
      "Check indentation levels before formatting.",
      "Format the document and review nested blocks.",
      "Copy the result back to your config file.",
    ],
    exampleBefore: baseExample(
      "Before",
      "yaml",
      "service: api\nports:\n- 80\n- 443",
      "service: api\nports:\n  - 80\n  - 443",
      "List indentation becomes easier to scan.",
    ),
    exampleAfter: baseExample(
      "After",
      "yaml",
      "service: api\nports:\n  - 80\n  - 443",
      "Readable YAML file",
      "Consistent indentation clarifies structure.",
    ),
    examples: [],
    toolSlug: "yaml",
    faqs: [
      privateFaq("YAML formatter"),
      faq("Why does indentation matter?", "YAML uses indentation to define nested structure."),
      faq("Can I inspect YAML as JSON?", "Yes. Use the YAML to JSON tool to check structure."),
    ],
    relatedLinks: [
      related("YAML Formatter", "/yaml", "Format YAML locally."),
      related("YAML to JSON", "/tools/yaml-to-json", "Inspect parsed YAML."),
      related("YAML Indentation", "/errors/yaml-indentation", "Fix indentation issues.", "Error guide"),
    ],
  },
  {
    slug: "format-toml-file",
    family: "guides",
    task: "Format a TOML file",
    title: "Format TOML File Privately In Browser - No Upload | HappyFormatter",
    description:
      "Format TOML config locally in your browser with no upload and inspect values with TOML to JSON conversion.",
    h1: "Format a TOML file privately",
    summary: "TOML files are easier to maintain when sections and key-value pairs are consistently spaced and grouped.",
    keywords: "format toml file, private toml formatter, no upload toml",
    canonicalPath: "/guides/format-toml-file",
    steps: [
      "Paste TOML into the TOML formatter.",
      "Keep related keys in the same section.",
      "Format the document for consistent spacing.",
      "Optionally convert to JSON to inspect parsed values.",
    ],
    exampleBefore: baseExample(
      "Before",
      "toml",
      "name=\"api\"\n[server]\nport=8080",
      "name = \"api\"\n\n[server]\nport = 8080",
      "Spacing improves TOML readability.",
    ),
    exampleAfter: baseExample(
      "After",
      "toml",
      "name = \"api\"\n\n[server]\nport = 8080",
      "Readable TOML file",
      "Sections and assignments are clearer.",
    ),
    examples: [],
    toolSlug: "toml",
    faqs: [
      privateFaq("TOML formatter"),
      faq("Can I convert TOML to JSON?", "Yes. Use the private TOML to JSON utility for simple config inspection."),
      faq("Is TOML indentation-sensitive?", "Not like YAML; sections and assignments define structure."),
    ],
    relatedLinks: [
      related("TOML Formatter", "/toml", "Format TOML locally."),
      related("TOML to JSON", "/tools/toml-to-json", "Convert TOML locally."),
      related("TOML vs YAML", "/compare/toml-vs-yaml", "Compare config formats.", "Comparison"),
    ],
  },
  {
    slug: "format-python-file",
    family: "guides",
    task: "Format a Python file",
    title: "Format Python File With Ruff Privately - No Upload | HappyFormatter",
    description:
      "Format Python code with a private browser Ruff formatter. No upload, no account, and no server-side processing.",
    h1: "Format a Python file with Ruff privately",
    summary: "Use Ruff formatting for quick Python cleanup, then run your project tests and linters before committing.",
    keywords: "format python file ruff, private python formatter, no upload python",
    canonicalPath: "/guides/format-python-file",
    steps: [
      "Paste the Python snippet into the Ruff formatter.",
      "Click Format code.",
      "Review indentation, imports, and string formatting.",
      "Copy the result and run your local test suite.",
    ],
    exampleBefore: baseExample(
      "Before",
      "python",
      "def greet(name):\n print(  f\"Hello, {name}\" )",
      "def greet(name):\n    print(f\"Hello, {name}\")",
      "Ruff fixes indentation and spacing.",
    ),
    exampleAfter: baseExample(
      "After",
      "python",
      "def greet(name):\n    print(f\"Hello, {name}\")",
      "Readable Python file",
      "The result is ready for local tests.",
    ),
    examples: [],
    toolSlug: "python-ruff",
    faqs: [
      privateFaq("Python Ruff formatter"),
      faq("Does formatting run Python code?", "No. Formatting rewrites source text; it does not execute it."),
      faq("Should I still run tests?", "Yes. Formatting is not a behavioral verification step."),
    ],
    relatedLinks: [
      related("Python Ruff Formatter", "/python-ruff", "Format Python with Ruff locally."),
      related("Python Formatter", "/python", "Open the canonical Python formatter."),
      related("Ruff vs Black", "/compare/python-ruff-vs-black", "Compare Python formatters.", "Comparison"),
    ],
  },
  {
    slug: "minify-css-file",
    family: "guides",
    task: "Minify a CSS file",
    title: "Minify CSS File Privately In Browser - No Upload | HappyFormatter",
    description: "Minify CSS locally in your browser and see size savings without uploading source files.",
    h1: "Minify a CSS file privately",
    summary:
      "Minify valid CSS after formatting and checking syntax. The minifier removes extra whitespace for smaller output.",
    keywords: "minify css file, private css minifier, no upload css minify",
    canonicalPath: "/guides/minify-css-file",
    steps: [
      "Paste valid CSS into the minifier.",
      "Fix missing braces or syntax errors first.",
      "Click Minify code.",
      "Review byte savings and copy the compact CSS.",
    ],
    exampleBefore: baseExample(
      "Before",
      "css",
      ".button {\n  color: white;\n  background: black;\n}",
      ".button{color:white;background:black}",
      "Whitespace is removed from valid CSS.",
    ),
    exampleAfter: baseExample(
      "After",
      "css",
      ".button{color:white;background:black}",
      "Compact CSS file",
      "Minified CSS is smaller for transport.",
    ),
    examples: [],
    toolSlug: "css",
    faqs: [
      privateFaq("CSS minifier"),
      faq("Should I format before minifying?", "Yes. Format and validate first, then minify valid CSS."),
      faq(
        "Does minifying change CSS behavior?",
        "A correct minifier should preserve behavior, but review output for complex edge cases.",
      ),
    ],
    relatedLinks: [
      related("CSS Minifier", "/minify/css", "Minify CSS locally."),
      related("CSS Formatter", "/css", "Format CSS before minifying."),
      related("CSS Missing Brace", "/errors/css-missing-brace", "Fix CSS syntax errors.", "Error guide"),
    ],
  },
  {
    slug: "minify-javascript-file",
    family: "guides",
    task: "Minify a JavaScript file",
    title: "Minify JavaScript File Privately In Browser - No Upload | HappyFormatter",
    description: "Minify JavaScript locally in your browser with no upload, then copy compact output for quick checks.",
    h1: "Minify a JavaScript file privately",
    summary:
      "Use the browser JavaScript minifier for snippets and quick output checks. For production bundles, keep using your build pipeline.",
    keywords: "minify javascript file, private javascript minifier, no upload js minifier",
    canonicalPath: "/guides/minify-javascript-file",
    steps: [
      "Paste JavaScript into the private minifier.",
      "Format first if the source is hard to read.",
      "Click Minify code and check size stats.",
      "Copy the minified result for your workflow.",
    ],
    exampleBefore: baseExample(
      "Before",
      "javascript",
      "function add(a, b) {\n  return a + b;\n}",
      "function add(a,b){return a+b}",
      "Whitespace is removed while preserving the simple function.",
    ),
    exampleAfter: baseExample(
      "After",
      "javascript",
      "function add(a,b){return a+b}",
      "Compact JavaScript file",
      "Minified output is smaller.",
    ),
    examples: [],
    toolSlug: "javascript",
    faqs: [
      privateFaq("JavaScript minifier"),
      faq(
        "Is this a replacement for bundling?",
        "No. Use project bundlers for production builds; this tool is for quick browser-side minification.",
      ),
      faq(
        "Can minifying expose secrets?",
        "It does not upload input, but secrets should not be shipped in client JavaScript.",
      ),
    ],
    relatedLinks: [
      related("JavaScript Minifier", "/minify/javascript", "Minify JavaScript locally."),
      related("JavaScript Formatter", "/javascript", "Format JavaScript locally."),
      related("Biome vs Prettier", "/compare/javascript-biome-vs-prettier", "Compare formatter choices.", "Comparison"),
    ],
  },
  {
    slug: "convert-json-to-csv",
    family: "guides",
    task: "Convert JSON to CSV",
    title: "Convert JSON To CSV Privately - No Upload | HappyFormatter",
    description: "Convert JSON arrays to CSV locally in your browser with no upload and spreadsheet-friendly output.",
    h1: "Convert JSON to CSV privately",
    summary:
      "JSON arrays of objects can become CSV rows when keys are converted to headers and values are escaped correctly.",
    keywords: "convert json to csv, private json csv converter, no upload csv",
    canonicalPath: "/guides/convert-json-to-csv",
    steps: [
      "Paste a JSON array of objects.",
      "Validate the JSON before converting.",
      "Click Convert to CSV.",
      "Copy the CSV into a spreadsheet or report.",
    ],
    exampleBefore: baseExample(
      "Before",
      "json",
      "[{\"id\":1,\"name\":\"Ada\"},{\"id\":2,\"name\":\"Linus\"}]",
      "id,name\n1,Ada\n2,Linus",
      "Object keys become the CSV header row.",
    ),
    exampleAfter: baseExample(
      "After",
      "csv",
      "id,name\n1,Ada\n2,Linus",
      "CSV rows",
      "The result is spreadsheet-friendly text.",
    ),
    examples: [],
    toolSlug: "json-to-csv",
    faqs: [
      privateFaq("JSON to CSV converter"),
      faq("What JSON shape works best?", "An array of flat objects produces the cleanest CSV."),
      faq("How are commas handled?", "Values with commas, quotes, or line breaks are CSV-escaped."),
    ],
    relatedLinks: [
      related("JSON to CSV", "/tools/json-to-csv", "Convert JSON arrays locally."),
      related("CSV to JSON", "/tools/csv-to-json", "Convert CSV back to JSON."),
      related("JSON Viewer", "/tools/json-viewer", "Validate input before converting.", "Tool"),
    ],
  },
  {
    slug: "decode-jwt-token",
    family: "guides",
    task: "Decode a JWT token",
    title: "Decode JWT Token Privately - No Upload | HappyFormatter",
    description: "Decode JWT header and payload locally in your browser without uploading the token.",
    h1: "Decode a JWT token privately",
    summary: "Decode JWTs to inspect claims, but remember that decoding is not signature verification.",
    keywords: "decode jwt token, private jwt decoder, no upload jwt",
    canonicalPath: "/guides/decode-jwt-token",
    steps: [
      "Paste the JWT into the private decoder.",
      "Remove a Bearer prefix if present.",
      "Decode the header and payload.",
      "Verify signatures only in a trusted server-side workflow.",
    ],
    exampleBefore: baseExample(
      "Before",
      "plaintext",
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MiJ9.signature",
      "{\n  \"payload\": {\n    \"sub\": \"42\"\n  }\n}",
      "The payload claims become readable JSON.",
    ),
    exampleAfter: baseExample(
      "After",
      "json",
      "{\n  \"payload\": {\n    \"sub\": \"42\"\n  }\n}",
      "Readable JWT claims",
      "Decoded claims are for inspection only.",
    ),
    examples: [],
    toolSlug: "jwt-decoder",
    faqs: [
      privateFaq("JWT decoder"),
      faq("Does decoding prove a JWT is valid?", "No. It only reads the encoded JSON segments."),
      faq("Should I paste real tokens?", "Use a local no-upload tool and follow your organization policy."),
    ],
    relatedLinks: [
      related("JWT Decoder", "/tools/jwt-decoder", "Decode JWTs locally."),
      related("Invalid JWT Guide", "/errors/jwt-invalid-token", "Fix malformed token input.", "Error guide"),
      related("Base64 Decoder", "/tools/base64-encode-decode", "Inspect encoded segments.", "Tool"),
    ],
  },
  {
    slug: "generate-sha256-hash",
    family: "guides",
    task: "Generate a SHA-256 hash",
    title: "Generate SHA-256 Hash Privately - No Upload | HappyFormatter",
    description: "Generate SHA-256 and other hashes locally in your browser with no upload using Web Crypto.",
    h1: "Generate a SHA-256 hash privately",
    summary:
      "Use local browser hashing for checksums, examples, and notes. Hashes are one-way digests, not encryption.",
    keywords: "generate sha256 hash, private hash generator, no upload hash tool",
    canonicalPath: "/guides/generate-sha256-hash",
    steps: [
      "Paste the text you want to hash.",
      "Click Generate Hashes.",
      "Copy the SHA-256 line.",
      "Compare digests only when input encoding is identical.",
    ],
    exampleBefore: baseExample(
      "Input",
      "plaintext",
      "HappyFormatter",
      "SHA-256: 8d...",
      "Text is encoded as UTF-8 before hashing.",
    ),
    exampleAfter: baseExample(
      "Output",
      "plaintext",
      "SHA-256: a browser-generated digest",
      "Digest text",
      "The exact digest depends on the exact input bytes.",
    ),
    examples: [],
    toolSlug: "hash-generator",
    faqs: [
      privateFaq("hash generator"),
      faq("Is SHA-256 encryption?", "No. A hash is a one-way digest, not reversible encryption."),
      faq("Why does whitespace change the hash?", "Hashes are based on exact bytes, so every character matters."),
    ],
    relatedLinks: [
      related("Hash Generator", "/tools/hash-generator", "Generate hashes locally."),
      related("String Escape Tool", "/tools/string-escape-unescape", "Inspect exact text characters.", "Tool"),
      related("Base64 Encoder", "/tools/base64-encode-decode", "Encode text locally.", "Tool"),
    ],
  },
].map(page => ({
  ...page,
  examples: [page.exampleBefore, page.exampleAfter],
})) as GuidePage[];

export const SEO_CONTENT_PAGES: AnySeoContentPage[] = [
  ...COMPARISON_PAGES,
  ...ERROR_GUIDE_PAGES,
  ...GUIDE_PAGES,
];

export const SEO_HUBS = {
  compare: {
    title: "Private Developer Tool Comparisons - No Upload | HappyFormatter",
    description:
      "Compare formatter, encoding, and data-format choices, then open private browser tools that keep snippets local.",
    h1: "Developer tool comparisons",
    canonicalPath: "/compare",
  },
  errors: {
    title: "Private Developer Error Fix Guides - No Upload | HappyFormatter",
    description:
      "Fix common JSON, YAML, XML, Base64, JWT, regex, and CSS errors with examples and no-upload browser tools.",
    h1: "Common developer fixes",
    canonicalPath: "/errors",
  },
  guides: {
    title: "Private Formatter And Converter Guides - No Upload | HappyFormatter",
    description:
      "Step-by-step browser workflows for formatting, minifying, converting, decoding, and hashing without uploading snippets.",
    h1: "Private tool guides",
    canonicalPath: "/guides",
  },
} satisfies Record<SeoContentFamily, {
  title: string;
  description: string;
  h1: string;
  canonicalPath: string;
}>;

export const getSeoContentPagesByFamily = (family: SeoContentFamily) =>
  SEO_CONTENT_PAGES.filter(page => page.family === family);

export const getSeoContentPage = (family: SeoContentFamily, slug: string) =>
  SEO_CONTENT_PAGES.find(page => page.family === family && page.slug === slug);

export const getSeoContentBreadcrumbs = (page: SeoContentPage) => [
  { name: "Home", url: "/" },
  {
    name: page.family === "compare" ? "Compare" : page.family === "errors" ? "Errors" : "Guides",
    url: `/${page.family}`,
  },
  { name: page.h1, url: page.canonicalPath },
];

export const getSeoHubBreadcrumbs = (family: SeoContentFamily) => [
  { name: "Home", url: "/" },
  {
    name: family === "compare" ? "Compare" : family === "errors" ? "Errors" : "Guides",
    url: `/${family}`,
  },
];

export const POPULAR_PRIVATE_LINKS: RelatedLink[] = [
  related("JSON Formatter", "/json", "Pretty-print JSON locally.", "Popular private tool"),
  related("JSON Viewer", "/tools/json-viewer", "Inspect JSON without upload.", "Popular private tool"),
  related("Python Ruff Formatter", "/python-ruff", "Format Python with Ruff in the browser.", "Popular private tool"),
  related("JavaScript Biome Formatter", "/javascript-biome", "Format JavaScript locally.", "Popular private tool"),
  related("JWT Decoder", "/tools/jwt-decoder", "Decode JWT claims locally.", "Popular private tool"),
  related("Hash Generator", "/tools/hash-generator", "Generate SHA hashes in the browser.", "Popular private tool"),
];

export const COMMON_FIX_LINKS: RelatedLink[] = [
  related("Fix JSON trailing comma", "/errors/json-trailing-comma", "Remove invalid trailing commas.", "Common fix"),
  related("Fix JSON unexpected token", "/errors/json-unexpected-token", "Repair strict JSON syntax.", "Common fix"),
  related("Fix YAML indentation", "/errors/yaml-indentation", "Align YAML blocks correctly.", "Common fix"),
  related("Fix invalid JWT token", "/errors/jwt-invalid-token", "Check token shape before decoding.", "Common fix"),
  related("Minify CSS file", "/guides/minify-css-file", "Compress valid CSS locally.", "Common fix"),
  related("Convert JSON to CSV", "/guides/convert-json-to-csv", "Export JSON rows to CSV.", "Common fix"),
];
