"use client";

import { FullBrandLogoIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePageTheme } from "@/providers/theme-context";
import Link from "next/link";
import { NavbarNavLink } from "./navbar-nav-link";
import { NavbarThemeToggle } from "./navbar-theme-toggle";

const NAV_LINKS = [
  { href: "#overview", label: "Overview" },
  { href: "#curriculum", label: "Curriculum" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
] as const;

/**
 * Desktop-only header: follows page theme (dark bar vs light bar).
 * Centered nav links; combined brand SVG (mark + wordmark).
 */
export function DesktopNavbar() {
  const { theme, setTheme } = usePageTheme();
  const isLightBar = theme === "light";

  return (
    <header
      className={cn(
        "navbar-gradient-border sticky top-0 z-50 hidden w-full transition-colors duration-300 lg:block desktop:px-0 tablet-lg:px-7 tablet:px-5 px-4",
        isLightBar
          ? "bg-neutral-0 text-neutral-900"
          : "bg-[#0a0a0a] text-neutral-0",
      )}
    >
      <div className="mx-auto flex lg:py-6 max-w-7xl items-center justify-between">
        <div className="">
          <Link
            href="/"
            className={cn(
              "flex items-center transition-opacity hover:opacity-90",
              isLightBar ? "text-neutral-900" : "text-neutral-0",
            )}
          >
            <FullBrandLogoIcon className="block h-[31px] w-[84px] shrink-0" />
          </Link>
        </div>

        <nav
          className="pointer-events-none absolute inset-x-0 top-1/2 z-[1] flex -translate-y-1/2 justify-center"
          aria-label="Primary"
        >
          <ul className="pointer-events-auto flex items-center gap-10">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <NavbarNavLink
                  href={href}
                  variant={isLightBar ? "light" : "dark"}
                >
                  {label}
                </NavbarNavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex lg:gap-8">
          <NavbarThemeToggle
            theme={theme}
            onThemeChange={setTheme}
            barStyle={isLightBar ? "light" : "dark"}
          />
          <Button
            variant="primary"
            size="md"
            className={cn(
              "rounded-full px-6 text-body-sm !text-white hover:!text-white active:!text-white",
              isLightBar
                ? "focus-visible:ring-offset-white"
                : "focus-visible:ring-offset-black",
            )}
            asChild
          >
            <Link href="#enroll">Enroll now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
