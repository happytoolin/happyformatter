# HappyFormatter

A web-based code formatter and minifier supporting 22+ programming languages. Built with Astro, React, and TypeScript, featuring client-side processing via WebAssembly modules for privacy and performance.

## Features

- **22+ Supported Languages**: Format and minify code for popular programming languages
- **Client-Side Processing**: All formatting happens in your browser using WebAssembly
- **Privacy-Focused**: No server required - your code never leaves your device
- **Modern UI**: Clean, responsive interface with syntax highlighting
- **Multiple Themes**: Dark and light mode support
- **Fast Performance**: Optimized WebAssembly modules for quick formatting

## Supported Languages

- Web Technologies: JavaScript, TypeScript, HTML, CSS, JSON, XML, YAML
- Programming Languages: Python, Go, Rust, C++, C#, Java, Dart
- Markup & Data: Markdown, SQL, TOML, GraphQL
- Configuration: Dockerfile, Shell Script
- And more...

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/happyformatter.git
cd happyformatter

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) to view the application.

### Building for Production

```bash
# Build the application
pnpm build

# Preview the production build
pnpm preview

# Deploy to Cloudflare Pages
pnpm deploy
```

## Project Structure

```
src/
├── components/
│   ├── playground/      # Main formatting interface
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components
│   ├── info/            # Feature description sections
│   └── faq/             # FAQ components
├── handlers/            # Business logic for formatting/minifying
│   ├── formatters/      # Language-specific formatter implementations
│   ├── minifiers/       # Language-specific minifier implementations
│   └── interface.ts     # Abstract base classes
├── lib/                 # Utilities and configurations
│   ├── utils.ts         # Helper functions
│   ├── shiki-config.ts  # Syntax highlighting setup
│   ├── highlighter.ts   # Code highlighting utilities
│   └── initialCode.ts   # Default code examples per language
├── icons/               # SVG icon components
└── pages/               # Astro routes
```

## Technology Stack

- **Framework**: Astro 5.16.5 (Static Site Generation)
- **Frontend**: React 19.0.3 with TypeScript 5.9.3
- **Styling**: Tailwind CSS v4.1.18
- **Code Editor**: CodeMirror 6 with Shiki syntax highlighting
- **Formatters**: @wasm-fmt packages, Prettier, dprint, xml-formatter
- **Deployment**: Cloudflare Pages

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and test them
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Open a pull request

## Adding New Language Support

1. Create formatter class in `src/handlers/formatters/[language].ts`
2. Create minifier class in `src/handlers/minifiers/[language].ts` if needed
3. Add CodeMirror language support via `@codemirror/lang-*` packages
4. Update language mappings in relevant components
5. Add default code sample in `src/lib/initialCode.ts`

## Development Commands

```bash
# Start development server
pnpm dev

# Type checking
pnpm typecheck          # TypeScript checking
pnpm check              # Astro checking

# Code formatting
pnpm format             # Format code with dprint

# Preview production build
pnpm preview
```

## License

This project is licensed under the GPL-3.0 License - see the LICENSE file for details.

## Acknowledgments

- Built with [Astro](https://astro.build)
- Uses [CodeMirror](https://codemirror.net) for the code editor
- Formatting powered by various WebAssembly modules and open-source formatters