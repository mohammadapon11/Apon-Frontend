"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";
import { usePageTheme } from "@/providers/theme-context";

const TestimonialsSection = () => {
  const { theme } = usePageTheme();
  const isLightTheme = theme === "light";
  const splideRef = useRef<HTMLDivElement>(null);
  const splideInstanceRef = useRef<Splide | null>(null);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  useEffect(() => {
    if (!splideRef.current) return;

    const splide = new Splide(splideRef.current, {
      type: "slide",
      perPage: 3,
      perMove: 1,
      gap: "1.5rem",
      pagination: false,
      arrows: false,
      drag: true,
      breakpoints: {
        1200: { perPage: 2, gap: "1rem" },
        980: { perPage: 1, gap: "1rem" },
      },
    });

    const updateArrowState = () => {
      const end = splide.Components.Controller.getEnd();
      setCanGoPrev(splide.index > 0);
      setCanGoNext(splide.index < end);
    };

    splide.mount();
    splideInstanceRef.current = splide;
    updateArrowState();

    splide.on("moved", updateArrowState);
    splide.on("updated", updateArrowState);

    return () => {
      splideInstanceRef.current = null;
      splide.destroy();
    };
  }, []);

  const sectionBg = isLightTheme ? "bg-white" : "bg-[#05070B]";
  const headingColor = isLightTheme ? "text-gray-900" : "text-[#D7DCE5]";
  const cardBg = isLightTheme ? "bg-gray-50" : "bg-[#0B1018]";
  const cardBorder = isLightTheme ? "border-blue-200" : "border-[#11347C]/85";
  const bodyColor = isLightTheme ? "text-gray-700" : "text-[#A3ACB8]";
  const nameColor = isLightTheme ? "text-gray-900" : "text-[#D7DCE5]";
  const roleColor = isLightTheme ? "text-gray-600" : "text-[#A3ACB8]";
  const arrowBg = isLightTheme ? "bg-gray-200 hover:bg-gray-300" : "bg-[#121B2A] hover:bg-[#182438]";
  const arrowIcon = isLightTheme ? "text-gray-800" : "text-[#E8EDF5]";

  return (
    <section
      id="testimonials"
      className={`relative w-full overflow-hidden px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24 ${sectionBg}`}
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="relative mb-10 flex items-center justify-between lg:mb-12">
          <h2 className={`text-[38px] font-medium leading-[1.12] tracking-[-0.02em] sm:text-5xl ${headingColor}`}>
            Join with 5K other students
          </h2>

          <div className="splide__arrows hidden items-center gap-3 md:flex">
            <button
              className={`splide__arrow splide__arrow--prev !static !left-auto !right-auto !top-auto !translate-y-0 h-[92px] w-[92px] rounded-full border-0 p-0 ${arrowBg} ${arrowIcon}`}
              type="button"
              onClick={() => splideInstanceRef.current?.go("<")}
              disabled={!canGoPrev}
              aria-label="Previous slide"
              aria-controls="splide01-track"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                width="40"
                height="40"
                focusable="false"
                className="mx-auto rotate-0"
              >
                <path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"></path>
              </svg>
            </button>

            <button
              className={`splide__arrow splide__arrow--next !static !left-auto !right-auto !top-auto !translate-y-0 h-[92px] w-[92px] rounded-full border-0 p-0 ${arrowBg} ${arrowIcon}`}
              type="button"
              onClick={() => splideInstanceRef.current?.go(">")}
              disabled={!canGoNext}
              aria-label="Next slide"
              aria-controls="splide01-track"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                width="40"
                height="40"
                focusable="false"
                className="mx-auto"
              >
                <path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div id="splide01" ref={splideRef} className="splide">
          <div id="splide01-track" className="splide__track">
            <ul className="splide__list">
              <li className="splide__slide">
                <article className={`flex h-full min-h-[520px] flex-col rounded-[34px] border p-9 ${cardBg} ${cardBorder}`}>
                  <Image
                    src="/images/testimonials/Avatar 1.png"
                    alt="Alex Carter"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <p className={`mt-10 text-xl leading-[1.28] ${bodyColor}`}>
                    As someone who juggles multiple projects, staying focused was always a challenge. This course
                    gave me the tools to cut through distractions and work with absolute clarity. My productivity has
                    never been better!
                  </p>

                  <div className="mt-auto">
                    <p className={`text-3xl font-medium leading-[1.08] ${nameColor}`}>Alex Carter</p>
                    <p className={`mt-3 text-2xl leading-[1.2] ${roleColor}`}>Freelance Designer</p>
                  </div>
                </article>
              </li>

              <li className="splide__slide">
                <article className={`relative h-full min-h-[520px] overflow-hidden rounded-[34px] border ${cardBorder}`}>
                  <Image
                    src="/images/testimonials/max.png"
                    alt="Daniel Foster"
                    fill
                    className="object-cover"
                  />

                  <Image
                    src="/images/testimonials/Avatar 2.png"
                    alt="Daniel Foster avatar"
                    width={64}
                    height={64}
                    className="absolute left-9 top-9 h-16 w-16 rounded-full object-cover"
                  />

                  <button
                    type="button"
                    aria-label="Play testimonial video"
                    className="absolute left-1/2 top-1/2 flex h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[6px] border-[#CDCED1] bg-[#ECEDEE] transition-transform hover:scale-105"
                  >
                    <div className="ml-1 h-0 w-0 border-b-[15px] border-l-[24px] border-t-[15px] border-b-transparent border-l-[#2F6EFF] border-t-transparent" />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-9">
                    <p className="text-3xl font-medium leading-[1.08] text-white">Daniel Foster</p>
                    <p className="mt-3 text-2xl leading-[1.2] text-[#E0E4EB]">Content creator</p>
                  </div>
                </article>
              </li>

              <li className="splide__slide">
                <article className={`flex h-full min-h-[520px] flex-col rounded-[34px] border p-9 ${cardBg} ${cardBorder}`}>
                  <Image
                    src="/images/testimonials/Avatar 1.png"
                    alt="Alex Carter"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <p className={`mt-10 text-xl leading-[1.28] ${bodyColor}`}>
                    As someone who juggles multiple projects, staying focused was always a challenge. This course
                    gave me the tools to cut through distractions and work with absolute clarity. My productivity has
                    never been better!
                  </p>

                  <div className="mt-auto">
                    <p className={`text-3xl font-medium leading-[1.08] ${nameColor}`}>Alex Carter</p>
                    <p className={`mt-3 text-2xl leading-[1.2] ${roleColor}`}>Freelance Designer</p>
                  </div>
                </article>
              </li>

              <li className="splide__slide">
                <article className={`relative h-full min-h-[520px] overflow-hidden rounded-[34px] border ${cardBorder}`}>
                  <Image
                    src="/images/testimonials/man.png"
                    alt="Daniel Foster"
                    fill
                    className="object-cover"
                  />

                  <Image
                    src="/images/testimonials/Avatar 2.png"
                    alt="Daniel Foster avatar"
                    width={64}
                    height={64}
                    className="absolute left-9 top-9 h-16 w-16 rounded-full object-cover"
                  />

                  <button
                    type="button"
                    aria-label="Play testimonial video"
                    className="absolute left-1/2 top-1/2 flex h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[6px] border-[#CDCED1] bg-[#ECEDEE] transition-transform hover:scale-105"
                  >
                    <div className="ml-1 h-0 w-0 border-b-[15px] border-l-[24px] border-t-[15px] border-b-transparent border-l-[#2F6EFF] border-t-transparent" />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-9">
                    <p className="text-3xl font-medium leading-[1.08] text-white">Daniel Foster</p>
                    <p className="mt-3 text-2xl leading-[1.2] text-[#E0E4EB]">Content creator</p>
                  </div>
                </article>
              </li>

              <li className="splide__slide">
                <article className={`flex h-full min-h-[520px] flex-col rounded-[34px] border p-9 ${cardBg} ${cardBorder}`}>
                  <Image
                    src="/images/testimonials/Avatar 3.png"
                    alt="Mark Davidson"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <p className={`mt-10 text-xl leading-[1.28] ${bodyColor}`}>
                    I never realized how much distractions were holding me back. After applying the deep work
                    techniques, I feel more in control of my time and energy. My efficiency has doubled!
                  </p>

                  <div className="mt-auto">
                    <p className={`text-3xl font-medium leading-[1.08] ${nameColor}`}>Mark Davidson</p>
                    <p className={`mt-3 text-2xl leading-[1.2] ${roleColor}`}>Software Developer</p>
                  </div>
                </article>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export { TestimonialsSection };
