import { useTheme } from "./ThemeContext";

interface EditorThemeSelectorProps {
  className?: string;
}

export default function EditorThemeSelector({
  className = "",
}: EditorThemeSelectorProps) {
  const { currentTheme, mode, ready, setTheme, themes } = useTheme();

  if (!ready) {
    return (
      <div
        className={`inline-grid h-9 grid-cols-[auto_minmax(132px,180px)] overflow-hidden rounded-md border border-border bg-background font-mono text-xs ${className}`}
        aria-hidden="true"
      >
        <span className="flex items-center border-r border-border px-2.5 uppercase text-muted-foreground">
          Theme
        </span>
        <span className="flex items-center px-2 text-muted-foreground">
          Loading
        </span>
      </div>
    );
  }

  return (
    <div
      className={`inline-grid h-9 grid-cols-[auto_minmax(132px,180px)] overflow-hidden rounded-md border border-border bg-background font-mono text-xs transition-colors focus-within:border-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background motion-reduce:transition-none ${className}`}
    >
      <label
        htmlFor="editor-theme-select"
        className="flex items-center border-r border-border px-2.5 uppercase text-muted-foreground"
      >
        Theme
      </label>
      <select
        id="editor-theme-select"
        value={currentTheme}
        onChange={(event) => setTheme(event.target.value)}
        className="h-9 min-w-0 cursor-pointer bg-background px-2 text-foreground outline-none transition-colors hover:bg-secondary focus:bg-secondary motion-reduce:transition-none"
        aria-label={`${mode} theme`}
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
