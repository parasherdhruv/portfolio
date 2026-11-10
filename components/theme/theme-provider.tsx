"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  defaultAppearance,
  defaultColorTheme,
  isAppearance,
  isColorTheme,
  resolveMode,
  THEME_STORAGE_KEY,
  type Appearance,
  type ColorTheme,
  type ResolvedMode,
} from "@/lib/theme";

type StoredTheme = {
  appearance: Appearance;
  theme: ColorTheme;
};

type ThemeContextValue = {
  appearance: Appearance;
  theme: ColorTheme;
  resolvedMode: ResolvedMode;
  setAppearance: (appearance: Appearance) => void;
  setTheme: (theme: ColorTheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStored(): StoredTheme {
  if (typeof window === "undefined") {
    return { appearance: defaultAppearance, theme: defaultColorTheme };
  }
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return { appearance: defaultAppearance, theme: defaultColorTheme };
    const parsed = JSON.parse(raw) as Partial<StoredTheme>;
    return {
      appearance: isAppearance(parsed.appearance)
        ? parsed.appearance
        : defaultAppearance,
      theme: isColorTheme(parsed.theme) ? parsed.theme : defaultColorTheme,
    };
  } catch {
    return { appearance: defaultAppearance, theme: defaultColorTheme };
  }
}

function systemPrefersDark() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [appearance, setAppearanceState] = useState<Appearance>(defaultAppearance);
  const [theme, setThemeState] = useState<ColorTheme>(defaultColorTheme);
  const [systemDark, setSystemDark] = useState(true);
  const hydratedRef = useRef(false);

  useEffect(() => {
    const stored = readStored();
    setAppearanceState(stored.appearance);
    setThemeState(stored.theme);
    setSystemDark(systemPrefersDark());
    hydratedRef.current = true;
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const resolvedMode = resolveMode(appearance, systemDark);

  useEffect(() => {
    const root = document.documentElement;
    const previousMode = root.dataset.mode;

    root.dataset.theme = theme;
    root.dataset.mode = resolvedMode;
    root.style.colorScheme = resolvedMode;

    if (hydratedRef.current && previousMode && previousMode !== resolvedMode) {
      root.classList.add("theme-transitioning");
      const timeout = window.setTimeout(
        () => root.classList.remove("theme-transitioning"),
        380,
      );
      return () => window.clearTimeout(timeout);
    }
  }, [theme, resolvedMode]);

  useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      window.localStorage.setItem(
        THEME_STORAGE_KEY,
        JSON.stringify({ appearance, theme }),
      );
    } catch {
      /* storage unavailable — theme still applies for the session */
    }
  }, [appearance, theme]);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    const background = getComputedStyle(document.documentElement)
      .getPropertyValue("--background")
      .trim();
    if (background) meta.setAttribute("content", background);
  }, [theme, resolvedMode]);

  const setAppearance = useCallback((value: Appearance) => {
    setAppearanceState(value);
  }, []);

  const setTheme = useCallback((value: ColorTheme) => {
    setThemeState(value);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ appearance, theme, resolvedMode, setAppearance, setTheme }),
    [appearance, theme, resolvedMode, setAppearance, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
