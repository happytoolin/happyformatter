export function getInitialCode(language: string): string {
  switch (language) {
    case "json":
      return `{
  "greeting": "Welcome to HAPPYFMT!",
  "instructions": [
    "Type or paste JSON here",
    "HAPPYFMT will format your code"
  ],
  "example": {
    "name": "HAPPYFMT",
    "version": "1.0.0",
    "features": ["formatting", "syntax highlighting", "auto-completion"]
  },
  "metadata": {
    "author": "Happy Dev",
    "license": "MIT"
  }
}`;
    case "javascript":
      return `// Welcome to HAPPYFMT!
function greet() {
  console.log("Welcome to HAPPYFMT!");
}

function showInstructions() {
  const instructions = [
    "Type or paste JavaScript here",
    "HAPPYFMT will format your code"
  ];
  instructions.forEach(instruction => console.log(instruction));
}

greet();
showInstructions();

// DOM Manipulation Example
document.body.innerHTML = "<h1>Welcome to HAPPYFMT!</h1>";`;
    case "typescript":
      return `// Welcome to HAPPYFMT!
function greet(): void {
  console.log("Welcome to HAPPYFMT!");
}

function showInstructions(): void {
  const instructions: string[] = [
    "Type or paste TypeScript here",
    "HAPPYFMT will format your code"
  ];
  instructions.forEach(instruction => console.log(instruction));
}

greet();
showInstructions();

// DOM Manipulation Example
document.body.innerHTML = "<h1>Welcome to HAPPYFMT!</h1>";`;
    case "css":
      return `/* Welcome to HAPPYFMT! */
body {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
      return `/* Welcome to HAPPYFMT! */
body {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
      return `<!-- Welcome to HAPPYFMT! -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HAPPYFMT</title>
  <style>
    body {
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background-color: #f0f0f0;
      margin: 0;
      padding: 20px;
    }
  </style>
</head>
<body>
  <h1>Welcome to HAPPYFMT!</h1>
  <p>Type or paste HTML here, and HAPPYFMT will format your code.</p>
  <footer>
    <p>&copy; 2024 HAPPYFMT</p>
  </footer>
</body>
</html>`;
    case "xml":
      return `<!-- Welcome to HAPPYFMT! -->
<greeting>
  <message>Welcome to HAPPYFMT!</message>
  <instructions>
    <step>Type or paste XML here</step>
    <step>HAPPYFMT will format your code</step>
  </instructions>
  <metadata>
    <author>Happy Dev</author>
    <license>MIT</license>
  </metadata>
</greeting>`;
    case "go":
      return `// Welcome to HAPPYFMT!
package main

import ("fmt"
"time"
)

func greet() {
  fmt.Println("Welcome to HAPPYFMT!")
}

func showInstructions() {
  instructions := []string{
    "Type or paste Go code here",
    "HAPPYFMT will format your code",
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
      return `// Welcome to HAPPYFMT!
import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class HAPPYFMT {
    public static void main(String[] args) {
        JFrame frame = new JFrame("HAPPYFMT");
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
      return `// Welcome to HAPPYFMT!
using System;

class Program {
  static void Main() {
    Console.WriteLine("Welcome to HAPPYFMT!");
    ShowInstructions();
  }

  static void ShowInstructions() {
    string[] instructions = {
      "Type or paste C# code here",
      "HAPPYFMT will format your code"
    };
    foreach (string instruction in instructions) {
      Console.WriteLine(instruction);
    }
  }
}`;
    case "proto":
      return `// Welcome to HAPPYFMT!
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
      return `<!-- Welcome to HAPPYFMT! -->

# HAPPYFMT

- Type or paste Markdown here

- HAPPYFMT will format your code

## Features

1. Formatting
2. Syntax highlighting

      `;
    case "dart":
      return `// Welcome to HAPPYFMT!
import 'dart:io';

void main() {
  print('Welcome to HAPPYFMT!');
}`;
    case "lua":
      return `-- Welcome to HAPPYFMT!
print("Welcome to HAPPYFMT!")`;
    case "python":
      return `# Welcome to HAPPYFMT!

print("Welcome to HAPPYFMT!")`;
    case "sql":
      return `-- Welcome to HAPPYFMT!
SELECT * FROM users;`;
    case "rust":
      return `// Welcome to HAPPYFMT!
fn main() {
  println!("Welcome to HAPPYFMT!");
}`;
    case "csharp":
      return `// Welcome to HAPPYFMT!
using System;

class Program {
  static void Main() {
    Console.WriteLine("Welcome to HAPPYFMT!");
  }
}`;
    case "c":
      return `// Welcome to HAPPYFMT!
#include <stdio.h>

int main() {
  printf("Welcome to HAPPYFMT!");
         return 0;
}
`;
    case "cpp":
      return `// Welcome to HAPPYFMT!
#include <iostream>

int main() {
  std::cout << "Welcome to HAPPYFMT!" << std::endl;
  return 0;
}
`;
    case "php":
      return `<?php
// Welcome to HAPPYFMT!
echo "Welcome to HAPPYFMT!";
?>`;
    case "zig":
      return `// Welcome to HAPPYFMT!
pub fn main() void {
  println!("Welcome to HAPPYFMT!");
}
`;
    case "yaml":
      return `# Welcome to HAPPYFMT!

greeting: Welcome to HAPPYFMT!
instructions:
  - Type or paste YAML here
  - HAPPYFMT will format your code

example:
      `;
    case "toml":
      return `# Welcome to HAPPYFMT!

greeting = "Welcome to HAPPYFMT!"
instructions = [
  "Type or paste TOML code here",
  "HAPPYFMT will format your code"
]

      `;
    case "python-ruff":
      return getInitialCode("python");
    case "javascript-biome":
      return getInitialCode("javascript");
    case "javascript-dprint":
      return getInitialCode("javascript");
    case "typescript-biome":
      return getInitialCode("typescript");
    case "typescript-dprint":
      return getInitialCode("typescript");
    case "jsx":
      return `// Welcome to HAPPYFMT!
import React from 'react';

function Greeting() {
  return (
    <div className="greeting">
      <h1>Welcome to HAPPYFMT!</h1>
      <p>Type or paste JSX here</p>
      <p>HAPPYFMT will format your code</p>
    </div>
  );
}

function InstructionList() {
  const instructions = [
    "Write React components",
    "Format your JSX code",
    "Enjoy clean, readable code"
  ];

  return (
    <ul>
      {instructions.map((instruction, index) => (
        <li key={index}>{instruction}</li>
      ))}
    </ul>
  );
}

export default Greeting;`;
    case "tsx":
      return `// Welcome to HAPPYFMT!
import React from 'react';

interface GreetingProps {
  name?: string;
}

function Greeting({ name = "Developer" }: GreetingProps) {
  return (
    <div className="greeting">
      <h1>Welcome to HAPPYFMT, {name}!</h1>
      <p>Type or paste TSX here</p>
      <p>HAPPYFMT will format your code</p>
    </div>
  );
}

interface Instruction {
  id: number;
  text: string;
}

function InstructionList() {
  const instructions: Instruction[] = [
    { id: 1, text: "Write React components with TypeScript" },
    { id: 2, text: "Format your TSX code" },
    { id: 3, text: "Enjoy type-safe, readable code" }
  ];

  return (
    <ul>
      {instructions.map((instruction) => (
        <li key={instruction.id}>{instruction.text}</li>
      ))}
    </ul>
  );
}

export default Greeting;`;
    case "php-mago":
      return getInitialCode("php");
    case "dockerfile":
      return `# Welcome to HAPPYFMT!
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]`;
    case "graphql":
      return `# Welcome to HAPPYFMT!
type Query {
  greeting: String!
  instructions: [String!]!
  user(id: ID!): User
}

type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

type Mutation {
  createUser(name: String!, email: String!): User!
  createPost(title: String!, content: String!, authorId: ID!): Post!
}`;
    case "jupyter":
      return `{
  "cells": [
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": [
        "# Welcome to HAPPYFMT!\\n",
        "\\n",
        "This is a Jupyter notebook formatter."
      ]
    },
    {
      "cell_type": "code",
      "execution_count": null,
      "metadata": {},
      "outputs": [],
      "source": [
        "# Python code example\\n",
        "print(\\"Welcome to HAPPYFMT!\\")\\n",
        "\\n",
        "def greet(name):\\n",
        "    return f\\"Hello, {name}!\\""
      ]
    }
  ],
  "metadata": {
    "kernelspec": {
      "display_name": "Python 3",
      "language": "python",
      "name": "python3"
    }
  },
  "nbformat": 4,
  "nbformat_minor": 4
}`;
    default:
      return "";
  }
}
