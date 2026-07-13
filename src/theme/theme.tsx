import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "gns-theme";
const DARK_THEME_COLOR = "#17110f";
const LIGHT_THEME_COLOR = "#ffffff";

type ThemeContextValue = {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function storageAvailable() {
  try {
    const key = "__gns_theme_test__";
    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function isThemeMode(value: string | null): value is ThemeMode {
  return value === "light" || value === "dark" || value === "system";
}

function getStoredMode(): ThemeMode {
  if (typeof window === "undefined" || !storageAvailable()) return "system";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isThemeMode(stored) ? stored : "system";
}

function resolveSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === "system" ? resolveSystemTheme() : mode;
}

function applyTheme(mode: ThemeMode, resolvedTheme: ResolvedTheme) {
  const root = document.documentElement;
  root.dataset.theme = resolvedTheme;
  root.dataset.themeMode = mode;
  root.style.colorScheme = resolvedTheme;

  const themeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );
  if (themeColor) {
    themeColor.content =
      resolvedTheme === "dark" ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => getStoredMode());
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() =>
    resolveSystemTheme(),
  );

  const resolvedTheme = mode === "system" ? systemTheme : mode;

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => setSystemTheme(media.matches ? "light" : "dark");

    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    applyTheme(mode, resolvedTheme);
  }, [mode, resolvedTheme]);

  const value = useMemo<ThemeContextValue>(() => {
    const setMode = (nextMode: ThemeMode) => {
      setModeState(nextMode);
      if (storageAvailable()) {
        window.localStorage.setItem(STORAGE_KEY, nextMode);
      }
    };

    return {
      mode,
      resolvedTheme,
      setMode,
      toggleTheme() {
        setMode(resolvedTheme === "dark" ? "light" : "dark");
      },
    };
  }, [mode, resolvedTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de ThemeProvider.");
  }
  return context;
}

export const themeStorageKey = STORAGE_KEY;
export const themeModes: ThemeMode[] = ["light", "dark", "system"];
