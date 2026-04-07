"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { MouseEvent } from "react";

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
  const isLight = variant === "light";

  const handleHashScroll = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return;

    const targetId = href.slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", href);
  };

  return (
    <Link
      href={href}
      onClick={handleHashScroll}
      className={cn(
        "inline-flex cursor-pointer font-base items-center font-normal tracking-normal",
        isLight ? "text-neutral-900" : "text-neutral-0/95",
        className,
      )}
    >
      {children}
    </Link>
  );
}
