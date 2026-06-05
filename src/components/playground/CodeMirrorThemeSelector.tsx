import { useTheme } from "./ThemeContext";

interface CodeMirrorThemeSelectorProps {
  className?: string;
}

export default function CodeMirrorThemeSelector({
  className = "",
}: CodeMirrorThemeSelectorProps) {
  const { currentTheme, mode, ready, setTheme, themes } = useTheme();

  if (!ready) {
    return (
      <div
        className={`inline-grid h-9 grid-cols-[auto_minmax(132px,180px)] overflow-hidden rounded-md border border-border bg-background font-mono text-xs ${className}`}
        aria-hidden="true"
      >
        <span className="flex items-center border-r border-border px-2.5 uppercase text-muted-foreground">
          Editor
        </span>
        <span className="flex items-center px-2 text-muted-foreground">
          Theme
        </span>
      </div>
    );
  }

  return (
    <div
      className={`inline-grid h-9 grid-cols-[auto_minmax(132px,180px)] overflow-hidden rounded-md border border-border bg-background font-mono text-xs ${className}`}
    >
      <label
        htmlFor="codemirror-theme-select"
        className="flex items-center border-r border-border px-2.5 uppercase text-muted-foreground"
      >
        Editor
      </label>
      <select
        id="codemirror-theme-select"
        value={currentTheme}
        onChange={(event) => setTheme(event.target.value)}
        className="h-9 min-w-0 bg-background px-2 text-foreground outline-none transition-colors hover:bg-secondary focus:bg-secondary"
        aria-label={`${mode} editor theme`}
      >
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
}
