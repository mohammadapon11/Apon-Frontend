"use client";

import { PAGE_THEME_STORAGE_KEY, type PageTheme } from "@/lib/page-theme";
import { runPageThemeTransition } from "@/lib/run-page-theme-transition";
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

type ThemeContextValue = {
  theme: PageTheme;
  setTheme: (theme: PageTheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeToDocument(theme: PageTheme) {
  document.documentElement.dataset.pageTheme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<PageTheme>("dark");
  const themeRef = useRef<PageTheme>("dark");

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  /* Align with ThemeScript + localStorage after paint (avoids sync setState-in-effect lint). */
  useEffect(() => {
    const fromDom = document.documentElement.dataset.pageTheme as PageTheme;
    if (fromDom === "light" || fromDom === "dark") {
      queueMicrotask(() => {
        setThemeState(fromDom);
        themeRef.current = fromDom;
      });
    }
  }, []);

  const setTheme = useCallback((next: PageTheme) => {
    if (next === themeRef.current) return;
    const apply = () => {
      setThemeState(next);
      themeRef.current = next;
      try {
        localStorage.setItem(PAGE_THEME_STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      applyThemeToDocument(next);
    };
    runPageThemeTransition(apply);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function usePageTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("usePageTheme must be used within ThemeProvider");
  }
  return ctx;
}
