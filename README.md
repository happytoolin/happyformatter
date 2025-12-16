# HappyFormatter

![HappyFormatter Preview](./public/images/og.png)

**HappyFormatter** is a modern, privacy-focused web application for formatting and minifying code across 22 programming languages. All processing happens entirely in your browser using WebAssembly modules, ensuring your code never leaves your device.

## Features

- **22 Programming Languages**: Comprehensive support for popular languages and formats
- **Code Minification**: Minify JavaScript, TypeScript, CSS, SCSS, JSON, HTML, and XML
- **Zero Data Transmission**: All formatting and minification happens client-side via WebAssembly
- **Advanced Code Editor**: Powered by CodeMirror 6 with syntax highlighting, autocomplete, and bracket matching
- **Multiple Editor Themes**: 16+ editor themes including Dracula, Nord, Material, One Dark, and more
- **Keyboard Shortcuts**: Quick formatting with `Ctrl+Shift+F` and minification with `Ctrl+Shift+M`
- **Responsive Design**: Fully responsive interface optimized for desktop and mobile devices
- **Accessibility**: Built with ARIA labels, keyboard navigation, and screen reader support
- **Fast Performance**: Optimized WebAssembly modules for near-instant formatting

## Supported Languages

### Formatting Support (22 languages)

**Web Technologies**

- JavaScript (with minification)
- TypeScript (with minification)
- HTML
- CSS (with minification)
- SCSS (with minification)
- JSON (with minification)
- XML (with minification)
- YAML

**Programming Languages**

- Python
- Go
- Rust
- C
- C++
- C#
- Java
- Dart
- Lua
- Zig
- PHP

**Markup & Data Formats**

- Markdown
- SQL
- Protocol Buffers (.proto)

### Minification Support

The following languages support code minification:

- JavaScript
- TypeScript
- CSS
- SCSS
- JSON
- HTML
- XML

## Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher
- **Package Manager**: pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/happyformatter.git
cd happyformatter
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:4321](http://localhost:4321) in your browser.

### Building for Production

```bash
# Build the application
pnpm build

# Preview the production build locally
pnpm preview

# Deploy to Cloudflare Pages
pnpm deploy
```

## Development

### Available Commands

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm preview          # Preview production build

# Code Quality
pnpm typecheck        # TypeScript type checking
pnpm check            # Astro configuration checking
pnpm format           # Format code with dprint

# Deployment
pnpm deploy           # Deploy to Cloudflare Pages
```

### Project Structure

```
src/
├── components/
│   ├── playground/      # Main formatting interface components
│   ├── ui/              # Reusable UI components (buttons, dropdowns, etc.)
│   ├── layout/          # Layout components (header, footer, head)
│   ├── info/            # Feature description sections
│   └── faq/             # FAQ components
├── handlers/
│   ├── formatters/      # Language-specific formatter implementations
│   ├── minifiers/       # Language-specific minifier implementations
│   ├── utils/           # Utility functions for handlers
│   └── interface.ts     # Abstract base classes for formatters/minifiers
├── lib/
│   ├── languages.ts     # Language configuration and metadata
│   ├── languageLoader.ts # Dynamic language extension loading
│   ├── initialCode.ts   # Default code examples per language
│   ├── shiki-config.ts  # Syntax highlighting configuration
│   └── utils.ts         # General utility functions
├── icons/               # SVG icon components
├── pages/               # Astro route pages
└── styles/              # Global CSS styles

public/
└── images/
    └── og.png           # Open Graph image (1200x630 PNG)
```

## Technology Stack

- **Framework**: [Astro](https://astro.build) 5.16.5 (Static Site Generation)
- **Frontend**: React 19.0.3 with TypeScript 5.9.3
- **Styling**: Tailwind CSS v4.1.18
- **Code Editor**: CodeMirror 6 with Shiki syntax highlighting
- **State Management**: Zustand
- **Formatters**:
  - `@wasm-fmt/*` packages for C/C++, Dart, Go, Lua, Python, SQL, Web, YAML, Zig
  - Prettier for JavaScript, TypeScript, JSON, PHP
  - dprint for Markdown
  - xml-formatter for XML
- **Minifiers**:
  - `@swc/wasm-web` for JavaScript/TypeScript
  - `lightningcss-wasm` for CSS/SCSS
  - `@minify-html/wasm` for HTML
- **Deployment**: Cloudflare Pages with edge optimization

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and test thoroughly
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Adding New Language Support

To add support for a new programming language:

1. Create a formatter class in `src/handlers/formatters/[language].ts` extending the `Formatter` base class
2. Create a minifier class in `src/handlers/minifiers/[language].ts` (if minification is supported) extending the `Minifier` base class
3. Add the language configuration to `src/lib/languages.ts`
4. Add CodeMirror language support via `@codemirror/lang-*` packages
5. Add a default code sample in `src/lib/initialCode.ts`
6. Update the formatter/minifier index in `src/handlers/index.ts`
7. Create a language-specific page route if needed

## License

This project is licensed under the **GPL-3.0 License** - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Astro](https://astro.build) - The web framework for content-driven websites
- [CodeMirror](https://codemirror.net) - The code editor component
- WebAssembly formatters and minifiers from the open-source community
- All contributors and users of HappyFormatter

---

**HappyFormatter** - Format your code, keep it private.
