import gsap from "gsap";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let activeTimeline: gsap.core.Timeline | null = null;

export function cancelPageThemeTransition(): void {
  activeTimeline?.kill();
  activeTimeline = null;
}

/**
 * Fades page main content, applies theme at the crossover, then reveals with motion.
 */
export function runPageThemeTransition(
  applyTheme: () => void,
  targetSelector = "#page-main",
): void {
  if (typeof document === "undefined" || prefersReducedMotion()) {
    applyTheme();
    return;
  }

  const el = document.querySelector<HTMLElement>(targetSelector);
  if (!el) {
    applyTheme();
    return;
  }

  activeTimeline?.kill();

  activeTimeline = gsap.timeline({
    onComplete: () => {
      activeTimeline = null;
      gsap.set(el, { clearProps: "opacity,transform" });
    },
  });

  activeTimeline
    .to(el, {
      opacity: 0,
      y: -14,
      duration: 0.26,
      ease: "power3.in",
    })
    .add(applyTheme)
    .fromTo(
      el,
      { opacity: 0, y: 20, scale: 0.992 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.48,
        ease: "power4.out",
      },
    );
}
