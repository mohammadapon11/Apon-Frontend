"use client";

import { FullBrandLogoIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePageTheme } from "@/providers/theme-context";
import gsap from "gsap";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { NavbarThemeToggle } from "./navbar-theme-toggle";

const NAV_LINKS = [
  { href: "#overview", label: "Overview" },
  { href: "#curriculum", label: "Curriculum" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
] as const;

/**
 * Tablet navbar: responsive header with hamburger menu and GSAP animations.
 * Menu items animate in with stagger effect.
 */
export function TabletNavbar() {
  const { theme, setTheme } = usePageTheme();
  const isLightBar = theme === "light";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLLIElement[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Animate menu items on open/close
  useEffect(() => {
    const menu = menuRef.current;
    const overlay = overlayRef.current;
    if (!menu || !overlay) return;

    if (isMenuOpen) {
      // Show overlay
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        pointerEvents: "auto",
      });

      // Show menu
      gsap.to(menu, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });

      // Stagger menu items
      gsap.fromTo(
        menuItemsRef.current,
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.15,
        }
      );
    } else {
      // Hide menu items first
      gsap.to(menuItemsRef.current, {
        opacity: 0,
        y: -12,
        duration: 0.2,
        stagger: -0.05,
        ease: "power2.in",
      });

      // Then hide menu
      gsap.to(menu, {
        x: "100%",
        opacity: 0,
        duration: 0.35,
        ease: "power3.in",
        delay: 0.1,
      });

      // Hide overlay
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        pointerEvents: "none",
      });
    }
  }, [isMenuOpen]);

  const handleMenuItemClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      <header
        className={cn(
          "navbar-gradient-border sticky top-0 z-50 hidden w-full transition-colors duration-300 md:block lg:hidden",
          isLightBar
            ? "bg-neutral-0 text-neutral-900"
            : "bg-[#0a0a0a] text-neutral-0",
        )}
      >
        <div className="relative mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "flex items-center transition-opacity hover:opacity-90",
              isLightBar ? "text-neutral-900" : "text-neutral-0",
            )}
          >
            <FullBrandLogoIcon className="block h-6 w-auto shrink-0" />
          </Link>

          {/* Right Section - Theme Toggle & Hamburger */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <NavbarThemeToggle
              theme={theme}
              onThemeChange={setTheme}
              barStyle={isLightBar ? "light" : "dark"}
            />

            {/* Hamburger Menu Button */}
            <button
              type="button"
              onClick={toggleMenu}
              className={cn(
                "relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors",
                isLightBar
                  ? "hover:bg-neutral-100"
                  : "hover:bg-white/10",
              )}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <span
                className={cn(
                  "h-0.5 w-6 rounded-full transition-all duration-300",
                  isLightBar ? "bg-neutral-900" : "bg-neutral-0",
                  isMenuOpen && "translate-y-2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-6 rounded-full transition-all duration-300",
                  isLightBar ? "bg-neutral-900" : "bg-neutral-0",
                  isMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-6 rounded-full transition-all duration-300",
                  isLightBar ? "bg-neutral-900" : "bg-neutral-0",
                  isMenuOpen && "-translate-y-2 -rotate-45"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-300",
          isLightBar ? "bg-black/20" : "bg-black/40",
        )}
        onClick={() => setIsMenuOpen(false)}
        style={{ opacity: 0, pointerEvents: "none" }}
        aria-hidden
      />

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={cn(
          "navbar-gradient-border fixed right-0 top-16 z-40 h-[calc(100vh-4rem)] w-full overflow-y-auto transition-colors duration-300 sm:w-80",
          isLightBar
            ? "bg-neutral-0 text-neutral-900"
            : "bg-[#0a0a0a] text-neutral-0",
        )}
        style={{ transform: "translateX(100%)", opacity: 0 }}
      >
        <nav className="flex flex-col" aria-label="Mobile">
          <ul className="flex flex-col">
            {NAV_LINKS.map(({ href, label }) => (
              <li
                key={href}
                ref={(el) => {
                  if (el) menuItemsRef.current[NAV_LINKS.indexOf(NAV_LINKS.find(link => link.href === href) || NAV_LINKS[0])] = el;
                }}
                className="relative"
              >
                <Link
                  href={href}
                  onClick={handleMenuItemClick}
                  className={cn(
                    "block px-6 py-4 text-lg font-medium transition-colors",
                    isLightBar
                      ? "hover:bg-neutral-50"
                      : "hover:bg-neutral-900/50",
                  )}
                >
                  {label}
                </Link>
                {/* Gradient border */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{
                    backgroundImage: "linear-gradient(90deg, rgba(36, 102, 242, 0) 0%, #2466f2 50%, rgba(36, 102, 242, 0) 100%)",
                  }}
                />
              </li>
            ))}
          </ul>

          {/* Gradient border separator */}
          <div
            className="h-px"
            style={{
              backgroundImage: "linear-gradient(90deg, rgba(36, 102, 242, 0) 0%, #2466f2 50%, rgba(36, 102, 242, 0) 100%)",
            }}
          />

          {/* Enroll Button */}
          <div className="px-6 py-4">
            <Button
              variant="primary"
              size="md"
              className={cn(
                "w-full rounded-full text-body-sm",
                isLightBar
                  ? "focus-visible:ring-offset-white"
                  : "focus-visible:ring-offset-black",
              )}
              asChild
            >
              <Link href="#enroll" onClick={handleMenuItemClick}>Enroll now</Link>
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
