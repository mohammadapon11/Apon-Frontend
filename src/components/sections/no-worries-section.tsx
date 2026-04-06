'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { usePageTheme } from '@/providers/theme-context';

interface NoWorriesSectionProps {}

export function NoWorriesSection({}: NoWorriesSectionProps) {
  const { theme } = usePageTheme();
  const isLightTheme = theme === 'light';
  const containerRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const avatarsRef = useRef<HTMLDivElement>(null);
  const middleTextRef = useRef<HTMLDivElement>(null);
  const bottomHeadingRef = useRef<HTMLDivElement>(null);
  const rightImagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.6 },
      });

      // Left image entrance
      timeline.fromTo(
        leftImageRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8 },
        0
      );

      // Badge entrance
      timeline.fromTo(
        badgeRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.2
      );

      // Avatars entrance
      timeline.fromTo(
        avatarsRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.3
      );

      // Middle text entrance
      timeline.fromTo(
        middleTextRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.4
      );

      // Bottom heading entrance (character by character)
      const heading = bottomHeadingRef.current;
      if (heading) {
        const text = heading.textContent || '';
        heading.innerHTML = text
          .split('')
          .map((char) => `<span style="display: inline-block; opacity: 0;">${char}</span>`)
          .join('');

        const chars = heading.querySelectorAll('span');
        timeline.fromTo(
          chars,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.03, duration: 0.4 },
          0.5
        );
      }

      // Right images staggered entrance
      const rightImages = rightImagesRef.current?.querySelectorAll('div');
      if (rightImages) {
        timeline.fromTo(
          rightImages,
          { opacity: 0, scale: 0.8, y: 20 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.15, duration: 0.6 },
          0.3
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isLightTheme]);

  const textColor = isLightTheme ? 'text-gray-900' : 'text-white';
  const mutedTextColor = isLightTheme ? 'text-gray-600' : 'text-gray-400';

  return (
    <section
      ref={containerRef}
      className={`relative w-full px-6 md:px-12 lg:px-20 ${
        isLightTheme ? 'bg-white' : 'bg-[#0a0a0a]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          {/* Left - Large Image (Full Height) */}
          <div
            ref={leftImageRef}
            className="lg:w-[40%] flex-shrink-0 h-96 lg:h-auto"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-500">
              <Image
                src="/images/noWorries/left.png"
                alt="No worries - person focused on work"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Content Column */}
          <div className="lg:w-[60%] flex flex-col justify-between gap-8 py-0 lg:py-12">
            {/* Top: Badge + Avatars */}
            <div className="flex justify-between items-center">
              {/* Badge */}
              <div
                ref={badgeRef}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  isLightTheme
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-blue-900/20 text-blue-300 border border-blue-500/30'
                }`}
              >
                ● No worries
              </div>

              {/* Avatars with text */}
              <div ref={avatarsRef} className="flex flex-col gap-4">
                <div className="flex -space-x-3 justify-end">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 ${
                        isLightTheme ? 'border-white' : 'border-gray-900'
                      }`}
                    >
                      <Image
                        src={`/images/noWorries/Avatar ${i}.png`}
                        alt={`Student ${i}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className={`text-sm font-medium ${textColor}`}>Join with 5K other students</p>
              </div>
            </div>

            {/* Middle: Content with Images on Right */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              <div className="flex-1">
                {/* Middle descriptive text */}
                <div ref={middleTextRef} className={`space-y-4 text-base sm:text-lg leading-relaxed max-w-2xl text-neutral-400 mb-8 ${mutedTextColor}`}>
                  <p>
                    The ability to concentrate
                  </p>
                  <p> deeply is the ultimate</p>
                  <p>productivity hack</p>
                </div>

                {/* Bottom heading with character animation */}
                <div
                  ref={bottomHeadingRef}
                  className={`text-4xl md:text-5xl font-bold leading-tight ${textColor}`}
                >
                  <h1>And fortunately it’s</h1>
                  <h1> a skill you can train</h1>
                  <h1>& develop.</h1>
                </div>
              </div>

              {/* Right - Stacked Images */}
              <div ref={rightImagesRef} className="hidden lg:flex flex-col gap-4 w-32 flex-shrink-0">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg"
                  >
                    <Image
                      src={`/images/noWorries/right ${i}.png`}
                      alt={`Student working - image ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
