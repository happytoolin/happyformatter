import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as React from "react";
import { themes } from "./themes";

export function ThemeSelector() {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "everforest";
    setValue(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    const mode = document.documentElement.classList.contains("dark") ? "dark" : "light";
    const isDark = mode === "dark";
    const finalTheme = isDark ? `${newTheme}-dark` : newTheme;

    setValue(finalTheme);
    document.documentElement.setAttribute("data-theme", finalTheme);
    localStorage.setItem("theme", finalTheme);
  };

  return (
    <Select value={value} onValueChange={handleThemeChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a theme" />
      </SelectTrigger>
      <SelectContent>
        {themes.map((theme) => (
          <SelectItem key={theme.value} value={theme.value}>
            {theme.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
