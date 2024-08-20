export function getInitialCode(language: string): string {
  switch (language) {
    case "json":
      return `{
        "greeting": "Welcome to HappyFormatter!",
        "instructions": [
          "Type or paste JSON here",
          "Or choose a sample above",
          "HappyFormatter will format your code"
        ]
      }`;
    case "js":
      return `console.log("Welcome to HappyFormatter!");`;
    case "ts":
      return `console.log("Welcome to HappyFormatter!");`;
    case "css":
      return `@custom-media --modern (color), (hover);

.foo {
  background: yellow;

  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;

  -webkit-transition: background 200ms;
  -moz-transition: background 200ms;
  transition: background 200ms;

  &.bar {
    color: green;
  }
}

@media (--modern) and (width > 1024px) {
  .a {
    color: green;
  }
}`;
    case "html":
      return `<p>Welcome to HappyFormatter!</p>`;
    case "xml":
      return `<greeting>Welcome to HappyFormatter!</greeting>`;
    case "go":
      return `package main\nimport "fmt"\nfunc main() {\n  fmt.Println("Welcome to HappyFormatter!")\n}`;
    case "java":
      return `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Welcome to HappyFormatter!");\n  }\n}`;
    case "cs":
      return `using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine("Welcome to HappyFormatter!");\n  }\n}`;
    case "proto":
      return `syntax = "proto3";\nmessage Greeting {\n  string message = 1;\n}`;
    default:
      return "";
  }
}
