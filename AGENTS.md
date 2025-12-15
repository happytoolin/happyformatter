# AGENTS.md

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm typecheck` - TypeScript checking
- `pnpm check` - Astro checking
- `pnpm format` - Format code with dprint
- `pnpm preview` - Preview production build

## Code Style Guidelines

### Formatting & Types

- Use dprint for all code formatting (configured in dprint.json)
- TypeScript strict mode enabled - all code must be fully typed
- Use `@/*` path alias for internal imports (e.g., `@/components/Button`)
- Organize imports: external libraries first, then internal imports

### Component Patterns

- Use React functional components with hooks only
- Follow existing patterns in `src/components/` for consistency
- Use Tailwind CSS classes for styling (avoid inline styles)
- Implement proper error handling with try-catch blocks

### Architecture

- Formatters extend `Formatter` class from `@/handlers/interface`
- Minifiers extend `Minifier` class from `@/handlers/interface`
- Use Zustand for state management (see `formatterStore.ts`)
- Lazy load CodeMirror language extensions dynamically

### Naming Conventions

- PascalCase for components and classes
- camelCase for functions and variables
- Use descriptive names following existing patterns
