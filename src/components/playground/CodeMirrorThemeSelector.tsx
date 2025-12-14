import React from "react";
import { codeMirrorThemes } from "../layout/themes";
import { useTheme } from "./ThemeContext";

interface CodeMirrorThemeSelectorProps {
  className?: string;
}

export default function CodeMirrorThemeSelector({ className = "" }: CodeMirrorThemeSelectorProps) {
  const { currentTheme, setTheme } = useTheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = event.target.value;
    console.log("ThemeSelector: Changing theme to:", newTheme);
    setTheme(newTheme);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label htmlFor="codemirror-theme-select" className="text-xs font-mono text-muted-foreground whitespace-nowrap">
        THEME:
      </label>
      <select
        id="codemirror-theme-select"
        value={currentTheme}
        onChange={handleThemeChange}
        className="text-xs font-mono bg-secondary border border-foreground px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary hover:border-primary focus:border-primary transition-colors"
      >
        {codeMirrorThemes.map((theme) => (
          <option key={theme.value} value={theme.value}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
}
