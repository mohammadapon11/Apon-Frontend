"use client";

import { useEffect, useRef } from "react";
import Image, { type ImageLoader } from "next/image";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";
import { usePageTheme } from "@/providers/theme-context";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alex Carter",
    role: "Freelance Designer",
    avatar: "https://i.pravatar.cc/80?img=68",
    quote:
      "As someone who juggles multiple projects, staying focused was always a challenge. This course gave me the tools to cut through distractions and work with absolute clarity. My productivity has never been better!",
  },
  {
    name: "Mark Davidson",
    role: "Software Developer",
    avatar: "https://i.pravatar.cc/80?img=67",
    quote:
      "I never realized how much distractions were holding me back. After applying the deep work techniques, I feel more in control of my time and energy. My efficiency has doubled!",
  },
  {
    name: "Sophia Bennett",
    role: "Marketing Strategist",
    avatar: "https://i.pravatar.cc/80?img=63",
    quote:
      "Deep work used to feel impossible in my routine. The course made everything practical, and now I can consistently finish important tasks without burning out.",
  },
];

const VIDEO_TESTIMONIAL = {
  name: "Daniel Foster",
  role: "Content Creator",
  avatar: "https://i.pravatar.cc/80?img=64",
  thumbnail: "https://images.unsplash.com/photo-1618005182384-7979b4e8a3c3?w=800",
  quote:
    "This course completely transformed how I approach deep work. Highly recommended!",
};

const externalImageLoader: ImageLoader = ({ src }) => src;

const TestimonialsSection = () => {
  const { theme } = usePageTheme();
  const isLightTheme = theme === "light";
  const splideRef = useRef<HTMLDivElement>(null);

  const textColor = isLightTheme ? "text-gray-900" : "text-white";
  const mutedColor = isLightTheme ? "text-gray-600" : "text-gray-400";
  const badgeColor = isLightTheme ? "text-blue-700" : "text-blue-300";
  const sectionBg = isLightTheme ? "bg-white" : "bg-[#0a0a0a]";
  const cardBg = isLightTheme ? "bg-gray-50" : "bg-neutral-900/50";
  const cardBorder = isLightTheme ? "border-gray-200" : "border-neutral-800";
  const arrowBg = isLightTheme ? "bg-white" : "bg-neutral-900";
  const arrowHoverBg = isLightTheme ? "hover:bg-gray-100" : "hover:bg-neutral-800";
  const arrowBorder = isLightTheme ? "border-gray-300" : "border-neutral-700";

  useEffect(() => {
    if (!splideRef.current) return;

    const splide = new Splide(splideRef.current, {
      type: "slide",
      perPage: 3,
      perMove: 1,
      gap: "2rem",
      pagination: false,
      arrows: true,
      breakpoints: {
        1024: { perPage: 2, gap: "1.5rem" },
        768: { perPage: 1, gap: "1rem" },
      },
    });

    splide.mount();

    return () => {
      splide.destroy();
    };
  }, []);

  return (
    <section
      className={`relative w-full px-6 md:px-12 lg:px-20 py-16 md:py-20 lg:py-24 ${sectionBg}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`inline-flex items-center gap-2 mb-6 sm:mb-8 ${badgeColor}`}>
          <span className="w-2 h-2 rounded-full bg-current"></span>
          <span className="text-sm font-medium">Student Testimonials</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-12 lg:mb-16">
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight ${textColor}`}>
            Join with <span className={isLightTheme ? "text-blue-700" : "text-blue-400"}>5K</span> other students
          </h2>

          <div className="hidden md:flex items-center gap-4">
            <button
              className={`splide__arrow splide__arrow--prev w-12 h-12 rounded-full flex items-center justify-center transition-colors border ${arrowBg} ${arrowHoverBg} ${arrowBorder} ${textColor}`}
            >
              ←
            </button>
            <button
              className={`splide__arrow splide__arrow--next w-12 h-12 rounded-full flex items-center justify-center transition-colors border ${arrowBg} ${arrowHoverBg} ${arrowBorder} ${textColor}`}
            >
              →
            </button>
          </div>
        </div>

        {/* Splide Slider */}
        <div ref={splideRef} className="splide">
          <div className="splide__track">
            <ul className="splide__list">
              {TESTIMONIALS.map((item) => (
                <li key={item.name} className="splide__slide">
                  <div className={`rounded-3xl p-8 h-full flex flex-col border ${cardBg} ${cardBorder}`}>
                    <div className="mb-6">
                      <Image
                        loader={externalImageLoader}
                        unoptimized
                        src={item.avatar}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <p className={`text-lg leading-relaxed flex-1 ${mutedColor}`}>{item.quote}</p>
                    <div className="mt-8">
                      <p className={`font-semibold ${textColor}`}>{item.name}</p>
                      <p className={`text-sm ${mutedColor}`}>{item.role}</p>
                    </div>
                  </div>
                </li>
              ))}

              {/* Center Card with Image + Play Button */}
              <li className="splide__slide">
                <div className={`relative rounded-3xl overflow-hidden h-full border ${cardBg} ${cardBorder}`}>
                  <div className="aspect-[16/10] relative">
                    <Image
                      loader={externalImageLoader}
                      unoptimized
                      src={VIDEO_TESTIMONIAL.thumbnail}
                      alt={VIDEO_TESTIMONIAL.name}
                      fill
                      className="object-cover"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        type="button"
                        aria-label="Play testimonial video"
                        className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                      >
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-black border-b-[10px] border-b-transparent ml-1"></div>
                      </button>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <Image
                        loader={externalImageLoader}
                        unoptimized
                        src={VIDEO_TESTIMONIAL.avatar}
                        alt={VIDEO_TESTIMONIAL.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className={`font-semibold ${textColor}`}>{VIDEO_TESTIMONIAL.name}</p>
                        <p className={`text-sm ${mutedColor}`}>{VIDEO_TESTIMONIAL.role}</p>
                      </div>
                    </div>
                    <p className={`italic ${mutedColor}`}>&ldquo;{VIDEO_TESTIMONIAL.quote}&rdquo;</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export { TestimonialsSection };
