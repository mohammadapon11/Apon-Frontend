"use client";

import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/run-page-theme-transition";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

export type NavbarNavBarVariant = "dark" | "light";

type NavbarNavLinkProps = {
  href: string;
  children: string;
  variant?: NavbarNavBarVariant;
  className?: string;
};

export function NavbarNavLink({
  href,
  children,
  variant = "dark",
  className,
}: NavbarNavLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    const line = lineRef.current;
    if (!link || !line) return;

    if (prefersReducedMotion()) {
      line.classList.add(
        "origin-center",
        "scale-x-0",
        "transition-transform",
        "duration-300",
      );
      const show = () => line.classList.remove("scale-x-0");
      const hide = () => line.classList.add("scale-x-0");
      link.addEventListener("mouseenter", show);
      link.addEventListener("mouseleave", hide);
      return () => {
        link.removeEventListener("mouseenter", show);
        link.removeEventListener("mouseleave", hide);
      };
    }

    gsap.set(line, { scaleX: 0, transformOrigin: "50% 50%" });

    const onEnter = () => {
      gsap.to(link, { y: -2, duration: 0.28, ease: "power2.out" });
      gsap.to(line, { scaleX: 1, duration: 0.34, ease: "power3.out" });
    };
    const onLeave = () => {
      gsap.to(link, { y: 0, duration: 0.26, ease: "power2.out" });
      gsap.to(line, { scaleX: 0, duration: 0.22, ease: "power2.in" });
    };

    link.addEventListener("mouseenter", onEnter);
    link.addEventListener("mouseleave", onLeave);
    return () => {
      link.removeEventListener("mouseenter", onEnter);
      link.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf([link, line]);
    };
  }, [variant]);

  const isLight = variant === "light";

  return (
    <Link
      ref={linkRef}
      href={href}
      className={cn(
        "relative inline-flex flex-col items-center text-body-sm font-normal leading-[1.35] tracking-normal",
        isLight ? "text-neutral-900" : "text-neutral-0/95",
        className,
      )}
    >
      {children}
      <span
        ref={lineRef}
        className={cn(
          "pointer-events-none mt-0.5 h-px w-full",
          isLight ? "bg-primary-500" : "bg-primary-400",
        )}
        aria-hidden
      />
    </Link>
  );
}
