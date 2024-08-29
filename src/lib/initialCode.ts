export function getInitialCode(language: string): string {
  switch (language) {
    case "json":
      return `{
  "greeting": "Welcome to HappyFormatter!",
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
      return `// Welcome to HappyFormatter!
function greet() {
  console.log("Welcome to HappyFormatter!");
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
document.body.innerHTML = "<h1>Welcome to HappyFormatter!</h1>";`;
    case "typescript":
      return `// Welcome to HappyFormatter!
function greet(): void {
  console.log("Welcome to HappyFormatter!");
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
document.body.innerHTML = "<h1>Welcome to HappyFormatter!</h1>";`;
    case "css":
      return `/* Welcome to HappyFormatter! */
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 20px;
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
      return `/* Welcome to HappyFormatter! */
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 20px;
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
      return `<!-- Welcome to HappyFormatter! -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HappyFormatter</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      margin: 0;
      padding: 20px;
    }
  </style>
</head>
<body>
  <h1>Welcome to HappyFormatter!</h1>
  <p>Type or paste HTML here, and HappyFormatter will format your code.</p>
  <footer>
    <p>&copy; 2024 HappyFormatter</p>
  </footer>
</body>
</html>`;
    case "xml":
      return `<!-- Welcome to HappyFormatter! -->
<greeting>
  <message>Welcome to HappyFormatter!</message>
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
      return `// Welcome to HappyFormatter!
package main

import ("fmt"
"time"
)

func greet() {
  fmt.Println("Welcome to HappyFormatter!")
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
      return `// Welcome to HappyFormatter!
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
      return `// Welcome to HappyFormatter!
using System;

class Program {
  static void Main() {
    Console.WriteLine("Welcome to HappyFormatter!");
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
      return `// Welcome to HappyFormatter!
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
      return `<!-- Welcome to HappyFormatter! -->

# HappyFormatter

- Type or paste Markdown here

- HappyFormatter will format your code

## Features

1. Formatting
2. Syntax highlighting

      `;
    case "dart":
      return `// Welcome to HappyFormatter!
import 'dart:io';

void main() {
  print('Welcome to HappyFormatter!');
}`;
    case "lua":
      return `-- Welcome to HappyFormatter!
print("Welcome to HappyFormatter!")`;
    case "python":
      return `# Welcome to HappyFormatter!

print("Welcome to HappyFormatter!")`;
    case "sql":
      return `-- Welcome to HappyFormatter!
SELECT * FROM users;`;
    case "rust":
      return `// Welcome to HappyFormatter!
fn main() {
  println!("Welcome to HappyFormatter!");
}`;
    case "csharp":
      return `// Welcome to HappyFormatter!
using System;

class Program {
  static void Main() {
    Console.WriteLine("Welcome to HappyFormatter!");
  }
}`;
    case "c":
      return `// Welcome to HappyFormatter!
#include <stdio.h>

int main() {
  printf("Welcome to HappyFormatter!");
         return 0;
}
`;
    case "cpp":
      return `// Welcome to HappyFormatter!
#include <iostream>

int main() {
  std::cout << "Welcome to HappyFormatter!" << std::endl;
  return 0;
}
`;
    case "php":
      return `<?php
// Welcome to HappyFormatter!
echo "Welcome to HappyFormatter!";
?>`;
    case "zig":
      return `// Welcome to HappyFormatter!
pub fn main() void {
  println!("Welcome to HappyFormatter!");
}
`;
    case "yaml":
      return `# Welcome to HappyFormatter!

greeting: Welcome to HappyFormatter!
instructions:
  - Type or paste YAML here
  - HappyFormatter will format your code

example:
      `;
    case "toml":
      return `# Welcome to HappyFormatter!

greeting = "Welcome to HappyFormatter!"
instructions = [
  "Type or paste TOML code here",
  "HappyFormatter will format your code"
]

      `;
    default:
      return "";
  }
}
