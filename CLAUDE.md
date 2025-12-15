# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HappyFormatter is a web-based code formatter and minifier supporting 22+ programming languages. It's built with Astro, React, and TypeScript, featuring client-side processing via WebAssembly modules for privacy and performance.

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm typecheck          # TypeScript checking
pnpm check              # Astro checking

# Code formatting
pnpm format             # Format code with dprint

# Preview production build
pnpm preview

# Deploy to Cloudflare Pages
pnpm deploy
```

## Architecture Overview

### Core Components Structure

```
src/
├── components/
│   ├── playground/      # Main formatting interface (CodePlayground, FormatButton)
│   ├── ui/              # Reusable UI components (Button, Accordion, Dropdown)
│   ├── layout/          # Layout components (Header, Footer, ThemeToggle)
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
└── pages/               # Astro routes (24 language-specific pages)
```

### Key Architectural Patterns

1. **Formatter/Minifier Architecture**: All language handlers extend abstract base classes:
   - `Formatter` class with `formatCode()` method
   - `Minifier` class with `minifyCode()` method
   - Each language has dedicated files in `handlers/formatters/` and `handlers/minifiers/`

2. **State Management**: Zustand store for reactive state across components
3. **Code Editor**: CodeMirror 6 with language support, autocomplete, and multiple themes
4. **WASM Integration**: WebAssembly modules for performance-critical formatting engines

### Technology Stack Details

- **Framework**: Astro 5.16.5 (Static Site Generation)
- **Frontend**: React 19.0.3 with TypeScript 5.9.3
- **Styling**: Tailwind CSS v4.1.18 with animations
- **Code Editor**: CodeMirror 6 with Shiki syntax highlighting
- **Formatters**:
  - @wasm-fmt packages for C/C++, Dart, Go, Lua, Python, SQL, Web, YAML, Zig
  - Prettier for JavaScript/TypeScript/JSON
  - dprint for markdown and other formats
  - xml-formatter for XML
- **Deployment**: Cloudflare Pages with edge optimization

## Important Configuration Files

1. **astro.config.mjs**:
   - WASM plugin configuration with exclude list for optimization
   - PartyTown for script offloading
   - Static output configuration

2. **dprint.json**: Multi-language code formatting with WASM plugins

3. **tsconfig.json**: Strict TypeScript settings with path aliases (`@/*`)

## Adding New Language Support

1. Create formatter class in `src/handlers/formatters/[language].ts`
2. Create minifier class in `src/handlers/minifiers/[language].ts` if needed
3. Add CodeMirror language support via `@codemirror/lang-*` packages
4. Update language mappings in relevant components
5. Add default code sample in `src/lib/initialCode.ts`

## Code Style Guidelines

- Use dprint for code formatting (configured via dprint.json)
- Follow React functional component patterns with hooks
- Use TypeScript strict mode - all code must be fully typed
- Prefer composition over inheritance for UI components
- Use Tailwind CSS classes for styling (avoid inline styles)

## Performance Considerations

- All formatting happens client-side via WASM modules
- Lazy load language-specific formatters
- Code splitting implemented in Vite configuration
- WASM modules excluded from optimization to prevent bundling issues

## Testing Notes

Currently no test framework is configured. When adding tests:

- Consider Vitest for unit testing
- Test formatter implementations with various code samples
- Test error handling for invalid code inputs
