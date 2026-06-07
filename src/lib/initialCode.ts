export function getInitialCode(language: string): string {
  switch (language) {
    case "json":
      return `{
  "greeting": "Formatter input ready",
  "instructions": [
    "Type or paste JSON here",
    "HappyFormatter will format your code"
  ],
  "example": {
    "name": "HappyFormatter",
    "version": "1.0.0",
    "features": ["formatting", "syntax highlighting", "auto-completion"]
  },
  "metadata": {
    "author": "Happy Dev",
    "license": "MIT"
  }
}`;
    case "javascript":
      return `// Formatter input ready
function greet() {
  console.log("Formatter input ready");
}

function showInstructions() {
  const instructions = [
    "Type or paste JavaScript here",
    "HappyFormatter will format your code"
  ];
  instructions.forEach(instruction => console.log(instruction));
}

greet();
showInstructions();

// DOM Manipulation Example
document.body.innerHTML = "<h1>Formatter input ready</h1>";`;
    case "typescript":
      return `// Formatter input ready
function greet(): void {
  console.log("Formatter input ready");
}

function showInstructions(): void {
  const instructions: string[] = [
    "Type or paste TypeScript here",
    "HappyFormatter will format your code"
  ];
  instructions.forEach(instruction => console.log(instruction));
}

greet();
showInstructions();

// DOM Manipulation Example
document.body.innerHTML = "<h1>Formatter input ready</h1>";`;
    case "css":
      return `/* Formatter input ready */
body {
  font-family: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 20px;
}

code,
pre {
  font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
}

.foo {
  background: yellow;
  border-radius: 2px;
  transition: background 200ms;
}

.foo.bar {
  color: green;
}

@media (color) and (hover) and (width > 1024px) {
  .a {
    color: green;
  }
}

@media (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}`;
    case "scss":
      return `/* Formatter input ready */
body {
  font-family: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 20px;
}

code,
pre {
  font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
}

.foo {
  background: yellow;
  border-radius: 2px;
  transition: background 200ms;
}

.foo.bar {
  color: green;
}`;
    case "html":
      return `<!-- Formatter input ready -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HappyFormatter</title>
  <style>
    body {
      font-family: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background-color: #f0f0f0;
      margin: 0;
      padding: 20px;
    }

    code,
    pre {
      font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
    }
  </style>
</head>
<body>
  <h1>Formatter input ready</h1>
  <p>Type or paste HTML here, and HappyFormatter will format your code.</p>
  <footer>
    <p>&copy; 2024 HappyFormatter</p>
  </footer>
</body>
</html>`;
    case "xml":
      return `<!-- Formatter input ready -->
<greeting>
  <message>Formatter input ready</message>
  <instructions>
    <step>Type or paste XML here</step>
    <step>HappyFormatter will format your code</step>
  </instructions>
  <metadata>
    <author>Happy Dev</author>
    <license>MIT</license>
  </metadata>
</greeting>`;
    case "go":
      return `// Formatter input ready
package main

import ("fmt"
"time"
)

func greet() {
  fmt.Println("Formatter input ready")
}

func showInstructions() {
  instructions := []string{
    "Type or paste Go code here",
    "HappyFormatter will format your code",
  }
  for _, instruction := range instructions {
    fmt.Println(instruction)
  }
}

func main() {
  greet()
  showInstructions()

  // Basic concurrency example
  go func() {
    time.Sleep(2 * time.Second)
    fmt.Println("This message is from a goroutine!")
  }()

  time.Sleep(3 * time.Second)
}`;
    case "java":
      return `// Formatter input ready
import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class HappyFormatter {
    public static void main(String[] args) {
        JFrame frame = new JFrame("HappyFormatter");
        frame.add(label);

        JButton button = new JButton("Click Me");
        button.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
          label.setText("Button Clicked!");
      }
        });
        frame.add(button, "South");

        frame.setVisible(true);
    }
}`;
    case "cs":
      return `// Formatter input ready
using System;

class Program {
  static void Main() {
    Console.WriteLine("Formatter input ready");
    ShowInstructions();
  }

  static void ShowInstructions() {
    string[] instructions = {
      "Type or paste C# code here",
      "HappyFormatter will format your code"
    };
    foreach (string instruction in instructions) {
      Console.WriteLine(instruction);
    }
  }
}`;
    case "proto":
      return `// Formatter input ready
syntax = "proto3";

message Greeting {
  string message = 1;
  repeated string instructions = 2;
}

message Metadata {
  string author = 1;
  string license = 2;
}

message Example {
  string name = 1;
  string version = 2;
  repeated string features = 3;
}`;
    case "markdown":
      return `<!-- Formatter input ready -->

# HappyFormatter

- Type or paste Markdown here

- HappyFormatter will format your code

## Features

1. Formatting
2. Syntax highlighting

      `;
    case "dart":
      return `// Formatter input ready
import 'dart:io';

void main() {
  print('Formatter input ready');
}`;
    case "lua":
      return `-- Formatter input ready
print("Formatter input ready")`;
    case "python":
      return `# Formatter input ready

print("Formatter input ready")`;
    case "sql":
      return `-- Formatter input ready
SELECT * FROM users;`;
    case "rust":
      return `// Formatter input ready
fn main() {
  println!("Formatter input ready");
}`;
    case "csharp":
      return `// Formatter input ready
using System;

class Program {
  static void Main() {
    Console.WriteLine("Formatter input ready");
  }
}`;
    case "c":
      return `// Formatter input ready
#include <stdio.h>

int main() {
  printf("Formatter input ready");
         return 0;
}
`;
    case "cpp":
      return `// Formatter input ready
#include <iostream>

int main() {
  std::cout << "Formatter input ready" << std::endl;
  return 0;
}
`;
    case "objectivec":
      return `// Formatter input ready
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
  @autoreleasepool {
    NSString *message = @"Formatter input ready";
    NSLog(@"%@", message);
  }
  return 0;
}
`;
    case "objectivecpp":
      return `// Formatter input ready
#import <Foundation/Foundation.h>
#include <vector>

int main(int argc, const char * argv[]) {
  @autoreleasepool {
    std::vector<NSString *> messages = {
      @"Type or paste Objective-C++ here",
      @"HappyFormatter will format your code"
    };

    for (NSString *message : messages) {
      NSLog(@"%@", message);
    }
  }
  return 0;
}
`;
    case "php":
      return `<?php
// Formatter input ready
echo "Formatter input ready";
?>`;
    case "zig":
      return `// Formatter input ready
pub fn main() void {
  println!("Formatter input ready");
}
`;
    case "yaml":
      return `# Formatter input ready

greeting: Formatter input ready
instructions:
  - Type or paste YAML here
  - HappyFormatter will format your code

example:
      `;
    case "toml":
      return `# Formatter input ready

greeting = "Formatter input ready"
instructions = [
  "Type or paste TOML code here",
  "HappyFormatter will format your code"
]

      `;
    case "python-ruff":
      return getInitialCode("python");
    case "javascript-biome":
      return getInitialCode("javascript");
    case "typescript-biome":
      return getInitialCode("typescript");
    case "php-mago":
      return getInitialCode("php");
    default:
      return "";
  }
}
