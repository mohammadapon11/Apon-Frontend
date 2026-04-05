"use client";

import {
  ThemeMoonIcon,
  ThemeMoonIconLightBar,
  ThemeSunIcon,
  ThemeSunIconLightBar,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/run-page-theme-transition";
import type { PageTheme } from "@/lib/page-theme";
import gsap from "gsap";
import { useCallback, useLayoutEffect, useRef } from "react";

const THUMB_SHIFT_PX = 32;

export type NavbarBarStyle = "dark" | "light";

type NavbarThemeToggleProps = {
  theme: PageTheme;
  onThemeChange: (t: PageTheme) => void;
  /** Visual style of the navbar (matches page theme). */
  barStyle: NavbarBarStyle;
};

export function NavbarThemeToggle({
  theme,
  onThemeChange,
  barStyle,
}: NavbarThemeToggleProps) {
  const thumbRef = useRef<HTMLSpanElement>(null);
  const thumbReadyRef = useRef(false);

  useLayoutEffect(() => {
    const thumb = thumbRef.current;
    if (!thumb) return;
    const x = theme === "dark" ? 0 : THUMB_SHIFT_PX;
    if (!thumbReadyRef.current) {
      gsap.set(thumb, { x });
      thumbReadyRef.current = true;
      return;
    }
    if (prefersReducedMotion()) {
      gsap.set(thumb, { x });
      return;
    }
    gsap.to(thumb, {
      x,
      duration: 0.55,
      ease: "back.out(1.35)",
    });
  }, [theme]);

  const pulseIcon = useCallback((btn: HTMLButtonElement | null) => {
    if (!btn || prefersReducedMotion()) return;
    const svg = btn.querySelector("svg");
    if (!svg) return;
    gsap.set(svg, { transformOrigin: "50% 50%" });
    gsap.fromTo(
      svg,
      { scale: 0.82, opacity: 0.75 },
      { scale: 1, opacity: 1, duration: 0.45, ease: "elastic.out(1, 0.55)" },
    );
  }, []);

  const isLightBar = barStyle === "light";

  return (
    <div
      className={cn(
        "relative flex h-10 w-[4.5rem] shrink-0 items-center rounded-pill p-1",
        isLightBar ? "bg-neutral-200" : "bg-[#1a1a1a]",
      )}
      role="group"
      aria-label="Page theme"
    >
      <span
        ref={thumbRef}
        className={cn(
          "pointer-events-none absolute left-1 top-1 size-8 rounded-full shadow-md",
          isLightBar
            ? "bg-neutral-0 shadow-neutral-400/25"
            : "bg-[#363636] shadow-[0_1px_8px_rgba(0,0,0,0.35)]",
        )}
        aria-hidden
      />
      <button
        type="button"
        aria-pressed={theme === "dark"}
        aria-label="Use dark page theme"
        onClick={(e) => {
          onThemeChange("dark");
          pulseIcon(e.currentTarget);
        }}
        className={cn(
          "relative z-10 flex size-8 cursor-pointer items-center justify-center rounded-full outline-none",
          "transition-colors active:scale-95",
          "focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2",
          isLightBar
            ? "text-neutral-900 hover:bg-black/[0.06] focus-visible:ring-offset-white"
            : "text-neutral-0 hover:bg-white/5 focus-visible:ring-offset-black",
        )}
      >
        {isLightBar ? (
          <ThemeMoonIconLightBar className="size-4" />
        ) : (
          <ThemeMoonIcon className="size-3.5" />
        )}
      </button>
      <button
        type="button"
        aria-pressed={theme === "light"}
        aria-label="Use light page theme"
        onClick={(e) => {
          onThemeChange("light");
          pulseIcon(e.currentTarget);
        }}
        className={cn(
          "relative z-10 flex size-8 cursor-pointer items-center justify-center rounded-full outline-none",
          "transition-colors active:scale-95",
          "focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2",
          isLightBar
            ? "text-neutral-900 hover:bg-black/[0.06] focus-visible:ring-offset-white"
            : "text-neutral-0 hover:bg-white/5 focus-visible:ring-offset-black",
        )}
      >
        {isLightBar ? (
          <ThemeSunIconLightBar className="size-5" />
        ) : (
          <ThemeSunIcon className="size-[17px]" />
        )}
      </button>
    </div>
  );
}
