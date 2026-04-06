"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePageTheme } from "@/providers/theme-context";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import { BadgeCountdown } from "./badge-countdown";
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
  const [isHovering, setIsHovering] = useState(false);

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

  // Play button hover animation
  const handlePlayButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isHovering) return;
    setIsHovering(true);

    const button = e.currentTarget;
    gsap.to(button, {
      scale: 1.15,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => setIsHovering(false),
    });
  };

  const handlePlayButtonUnhover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32"
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Centered content */}
        <div className="flex flex-col items-center text-center gap-8">
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
              "font-sans text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight max-w-5xl",
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
              "text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8",
              isLightTheme
                ? "text-neutral-600"
                : "text-neutral-300"
            )}
          >
            {subtitle}
          </p>

          {/* CTA Buttons */}
          {ctaButtons.length > 0 && (
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
              {ctaButtons.map((btn) => (
                <Button
                  key={btn.href}
                  variant={btn.variant}
                  size="lg"
                  className="rounded-full px-8 text-base font-semibold min-w-fit"
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
            className="w-full max-w-[1280px] mt-12 lg:mt-16 relative"
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
                  onClick={onPlayClick || (() => console.log("Play video"))}
                  onMouseEnter={handlePlayButtonHover}
                  onMouseLeave={handlePlayButtonUnhover}
                  className={cn(
                    "relative z-10 flex h-20 w-20 items-center justify-center rounded-full mb-6",
                    "bg-white/95 hover:bg-white transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2",
                    isLightTheme ? "focus-visible:ring-offset-white" : "focus-visible:ring-offset-black"
                  )}
                  aria-label="Play video"
                  title="Play course preview"
                >
                  <PlayButtonIcon className="w-6 h-7" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}