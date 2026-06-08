import {
  type ColorMode,
  editorThemeModeStorageKey,
  editorThemeStorageKey,
  getEditorThemesForMode,
  getSafeEditorTheme,
  isColorMode,
  isEditorThemeForMode,
  themePreferenceStorageKey,
} from "@/lib/theme";
import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

type ThemeChangeDetail = {
  editorTheme?: string;
  theme?: ColorMode;
};

interface ThemeContextType {
  currentTheme: string;
  mode: ColorMode;
  ready: boolean;
  setTheme: (theme: string) => void;
  themes: ReturnType<typeof getEditorThemesForMode>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function readStorage(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable in private browsing modes.
  }
}

function getDocumentMode(): ColorMode {
  if (typeof document === "undefined") {
    return "light";
  }

  const datasetMode = document.documentElement.dataset.theme;
  if (isColorMode(datasetMode)) {
    return datasetMode;
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getStoredEditorTheme(mode: ColorMode) {
  if (typeof window === "undefined") {
    return getSafeEditorTheme(null, mode);
  }

  const storedForMode = readStorage(editorThemeModeStorageKey(mode));
  if (isEditorThemeForMode(storedForMode, mode)) {
    return storedForMode;
  }

  const current = readStorage(editorThemeStorageKey);
  return getSafeEditorTheme(current, mode);
}

function persistEditorTheme(mode: ColorMode, theme: string) {
  const safeTheme = getSafeEditorTheme(theme, mode);
  writeStorage(editorThemeStorageKey, safeTheme);
  writeStorage(editorThemeModeStorageKey(mode), safeTheme);
  return safeTheme;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ColorMode>("light");
  const [currentTheme, setCurrentTheme] = useState(() => getSafeEditorTheme(null, "light"));
  const [ready, setReady] = useState(false);

  const applyMode = useCallback((nextMode: ColorMode, requestedTheme?: string) => {
    const nextTheme = persistEditorTheme(
      nextMode,
      requestedTheme ?? getStoredEditorTheme(nextMode),
    );

    setMode(nextMode);
    setCurrentTheme(nextTheme);
  }, []);

  useEffect(() => {
    applyMode(getDocumentMode());
    setReady(true);

    const handleThemeChange = (event: Event) => {
      const detail = (event as CustomEvent<ThemeChangeDetail>).detail;
      const nextMode = isColorMode(detail?.theme)
        ? detail.theme
        : getDocumentMode();

      applyMode(nextMode, detail?.editorTheme);
    };

    const handleStorage = (event: StorageEvent) => {
      if (
        event.key === "theme"
        || event.key === themePreferenceStorageKey
        || event.key === editorThemeStorageKey
        || event.key === editorThemeModeStorageKey("light")
        || event.key === editorThemeModeStorageKey("dark")
      ) {
        applyMode(getDocumentMode());
      }
    };

    const observer = new MutationObserver(() => {
      applyMode(getDocumentMode());
    });

    window.addEventListener("happyformatter:theme-change", handleThemeChange);
    window.addEventListener("storage", handleStorage);
    observer.observe(document.documentElement, {
      attributeFilter: ["class", "data-theme"],
      attributes: true,
    });

    return () => {
      window.removeEventListener("happyformatter:theme-change", handleThemeChange);
      window.removeEventListener("storage", handleStorage);
      observer.disconnect();
    };
  }, [applyMode]);

  const setTheme = useCallback((theme: string) => {
    setCurrentTheme((previousTheme) => {
      const nextTheme = getSafeEditorTheme(theme, mode);
      if (nextTheme === previousTheme) {
        persistEditorTheme(mode, nextTheme);
        return previousTheme;
      }

      persistEditorTheme(mode, nextTheme);
      return nextTheme;
    });
  }, [mode]);

  const themes = useMemo(() => getEditorThemesForMode(mode), [mode]);

  const value = useMemo(
    () => ({ currentTheme, mode, ready, setTheme, themes }),
    [currentTheme, mode, ready, setTheme, themes],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
