"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

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

  return (
    <Link
      href={href}
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
