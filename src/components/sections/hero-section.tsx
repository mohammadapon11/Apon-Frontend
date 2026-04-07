"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePageTheme } from "@/providers/theme-context";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import { PlayButtonIcon } from "./play-button-icon";

/**
 * Reusable Hero Section props
 */
interface HeroSectionProps {
  badge?: ReactNode;
  heading: string;
  subtitle: string;
  ctaButtons?: Array<{ label: string; href: string; variant?: "primary" | "secondary" }>;
  imageSrc: string;
  imageAlt: string;
  backgroundImage?: string;
  previewVideoUrl?: string;
  onPlayClick?: () => void;
  showBadge?: boolean;
}

/**
 * Hero Section: Reusable component with dynamic content and animated border.
 * Supports custom heading, subtitle, CTA buttons, and image with animated gradient border.
 */
export function HeroSection({
  badge,
  heading,
  subtitle,
  ctaButtons = [
    { label: "Enroll now", href: "#enroll", variant: "primary" },
    { label: "Curriculum", href: "#curriculum", variant: "secondary" },
  ],
  imageSrc,
  imageAlt,
  backgroundImage = "url(/images/hero/Bg-Gradient.png)",
  previewVideoUrl = "https://www.youtube.com/embed/oPVte6aMprI?autoplay=1&rel=0",
  onPlayClick,
  showBadge = true,
}: HeroSectionProps) {
  const { theme } = usePageTheme();
  const isLightTheme = theme === "light";
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageBorderRef = useRef<HTMLDivElement>(null);
  const borderGradientRef = useRef<HTMLDivElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Entrance animations
  useEffect(() => {
    if (typeof window === "undefined") return;

    const tl = gsap.timeline();

    if (showBadge && badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0
      );
    }

    if (headingRef.current) {
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        0.1
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.2
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.3
      );
    }

    if (imageBorderRef.current) {
      tl.fromTo(
        imageBorderRef.current,
        { opacity: 0, scale: 0.95, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.4
      );
    }
  }, [showBadge]);

  // Animated border gradient
  useEffect(() => {
    if (!borderGradientRef.current) return;

    gsap.fromTo(
      borderGradientRef.current,
      { backgroundPosition: "0% 50%" },
      {
        backgroundPosition: "100% 50%",
        duration: 6,
        repeat: -1,
        ease: "none",
      }
    );
  }, []);

  useEffect(() => {
    if (!isVideoOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVideoOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isVideoOpen]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden desktop:pt-45 tablet-lg:pt-45 tablet:pt-32 pt-24"
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered content */}
        <div className="flex flex-col items-center text-center gap-6">
          {/* Badge */}
          {showBadge && badge && (
            <div ref={badgeRef} className="w-fit">
              {badge}
            </div>
          )}

          {/* Heading */}
          <h1
            ref={headingRef}
            className={cn(
              "font-sans desktop:text-[52px] tablet-lg:text-[52px] tablet:text-[40px] text-[36px] font-medium tracking-tight max-w-lg",
              isLightTheme
                ? "text-neutral-900"
                : "text-neutral-0"
            )}
          >
            {heading}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className={cn(
              "text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-8",
              isLightTheme
                ? "text-neutral-600"
                : "text-neutral-300"
            )}
          >
            {subtitle}
          </p>

          {/* CTA Buttons */}
          {ctaButtons.length > 0 && (
            <div ref={ctaRef} className="flex gap-4 items-center justify-center">
              {ctaButtons.map((btn) => (
                <Button
                  key={btn.href}
                  variant={btn.variant}
                  size="lg"
                  className={`rounded-full px-6 text-base font-semibold min-w-fit ${btn.variant === "primary" && "text-white"} ${btn.variant === "secondary" && (isLightTheme ? "bg-gray-200 text-gray-900" : "text-neutral-0")}`}
                  asChild
                >
                  <Link href={btn.href}>{btn.label}</Link>
                </Button>
              ))}
            </div>
          )}

          {/* Hero image with animated gradient border */}
          <div
            ref={imageBorderRef}
            className="w-full max-w-7xl mt-12 lg:mt-16 relative"
            style={{
              aspectRatio: "901 / 507.24",
            }}
          >
            {/* Animated gradient border wrapper */}
            <div
              ref={borderGradientRef}
              className="absolute inset-0 rounded-2xl p-1 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, rgba(36, 102, 242, 0.2) 0%, rgba(36, 102, 242, 0.8) 25%, rgba(36, 102, 242, 0.8) 75%, rgba(36, 102, 242, 0.2) 100%)",
                backgroundSize: "200% 200%",
              }}
            >
              <div className="absolute inset-1 rounded-2xl bg-background" />
            </div>

            {/* Inner image container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              {/* Hero image */}
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
              />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                <button
                  type="button"
                  onClick={() => {
                    onPlayClick?.();
                    setIsVideoOpen(true);
                  }}
                  className={cn(
                    "relative z-10 flex desktop:h-24 desktop:w-24 tablet-lg:w-24 tablet-lg:h-24 tablet:h-24 tablet:w-24 w-20 h-20 items-center justify-center cursor-pointer rounded-full mb-6",
                    "bg-white hover:bg-gray-100 transition-colors",
                    "border-6 border-gray-300")}
                  aria-label="Play video"
                  title="Play course preview"
                >
                  <PlayButtonIcon className=" desktop:w-6 desktop:h-7 tablet-lg:w-6 tablet-lg:h-7 tablet:w-6 tablet:h-7 w-4 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 px-4"
          onClick={() => setIsVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Course preview video"
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white transition-opacity hover:opacity-80"
              aria-label="Close video popup"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="relative w-full overflow-hidden rounded-xl bg-black" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={previewVideoUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
