"use client";

import { cn } from "@/lib/utils";
import { usePageTheme } from "@/providers/theme-context";
import gsap from "gsap";
import Image from "next/image";
import { ReactNode, useEffect, useRef } from "react";

/**
 * Distractions Section props
 */
interface DistractionsSectionProps {
  badge?: ReactNode;
  heading: string;
  subtitle: string;
  images?: Array<{ src: string; alt: string }>;
  backgroundColor?: string;
  headingClassName?: string;
}

/**
 * Distractions Section: Reusable component for challenge/problem statement sections.
 * Features animated heading entrance and image grid showcase.
 */
export function DistractionsSection({
  badge,
  heading,
  subtitle,
  images = [
    { src: "/images/distraction/1.jpg", alt: "Person struggling with focus" },
    { src: "/images/distraction/2.jpg", alt: "Person feeling overwhelmed" },
    { src: "/images/distraction/3.jpg", alt: "Person procrastinating" },
  ],
  backgroundColor,
  headingClassName,
}: DistractionsSectionProps) {
  const { theme } = usePageTheme();
  const isLightTheme = theme === "light";
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Entrance animations
  useEffect(() => {
    if (typeof window === "undefined") return;

    const tl = gsap.timeline();

    const textColor = isLightTheme ? "rgb(8, 10, 13)" : "rgb(255, 255, 255)";
    const textColorDim = isLightTheme ? "rgba(8, 10, 13, 0.3)" : "rgba(255, 255, 255, 0.3)";

    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0
      );
    }

    if (headingRef.current) {
      // Split heading text into characters for letter-by-letter animation with color change
      const headingText = headingRef.current.textContent || "";
      const chars = headingText.split("").map((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.opacity = "1";
        span.style.color = textColor; // Theme-aware color
        span.style.display = "inline";
        return span;
      });

      headingRef.current.innerHTML = "";
      chars.forEach((span) => headingRef.current?.appendChild(span));

      // Animate each character: fade in with position + color fade (theme-aware)
      tl.fromTo(
        chars,
        { 
          opacity: 0, 
          y: 20,
          color: textColor
        },
        { 
          opacity: 0.3, // Characters fade to 30% opacity
          y: 0,
          color: textColorDim, // Fade to light text
          duration: 0.04, 
          stagger: 0.02, 
          ease: "power2.out" 
        },
        0.2
      );

      // Add infinite looping animation after entrance (30% → 100% → repeat)
      const loopTimeline = gsap.timeline({ delay: 2.5, repeat: -1 });
      
      loopTimeline.fromTo(
        chars,
        {
          opacity: 0.3,
          color: textColorDim,
        },
        {
          opacity: 1,
          color: textColor,
          duration: 2,
          ease: "sine.inOut",
          stagger: 0.05,
        }
      );
      
      // Reset back to 30% for next loop
      loopTimeline.fromTo(
        chars,
        {
          opacity: 1,
          color: textColor,
        },
        {
          opacity: 0.3,
          color: textColorDim,
          duration: 0.1,
          ease: "power1.in",
          stagger: 0.05,
        }
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.4
      );
    }

    // Animate images in sequence
    const visibleImageRefs = imageRefs.current.filter((ref) => ref !== null);
    if (visibleImageRefs.length > 0) {
      tl.fromTo(
        visibleImageRefs,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out" },
        0.5
      );
    }
  }, [isLightTheme]);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden",
        backgroundColor || (isLightTheme ? "bg-neutral-0" : "bg-background")
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered content */}
        <div className="flex flex-col items-center text-center gap-10">
          {/* Badge */}
          {badge && (
            <div ref={badgeRef} className="w-fit">
              {badge}
            </div>
          )}

          {/* Animated Heading */}
          <h2
            ref={headingRef}
            className={cn(
              "font-sans desktop:text-[56px] tablet-lg:text-5xl tablet:text-4xl mobile:text-4xl font-normal leading-tight tracking-tight desktop:max-w-4xl tablet-lg:max-w-xl",
              headingClassName ||
                (isLightTheme
                  ? "text-neutral-900"
                  : "text-neutral-0")
            )}
          >
            {heading}
          </h2>

          {/* Images Grid */}
          {images.length > 0 && (
            <div
              ref={imagesContainerRef}
              className="flex flex-wrap justify-center gap-2 pt-8"
            >
              {images.map((img, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    if (el) imageRefs.current[idx] = el;
                  }}
                  className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 128px, 160px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
