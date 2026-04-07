'use client';

import { DistractionsSection, HeroSection, NoWorriesSection, DeepWorkBlueprintSection, CurriculumSection, TestimonialsSection, PricingSection, FinalCtaFooterSection } from "@/components/sections";
import { BadgeCountdown } from "@/components/sections/badge-countdown";
import { usePageTheme } from "@/providers/theme-context";
import '@splidejs/react-splide/css';

function BadgeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = usePageTheme();
  const isLightTheme = theme === "light";
  return (
    <div
      className={`px-4 py-2 flex items-center gap-2 rounded-[12px] text-sm font-medium ${
        isLightTheme
          ? "bg-blue-100 text-neutral-700 border border-blue-300"
          : "bg-gray-900 text-neutral-100 border border-blue-500/30"
      }`}
    >
      <div className="h-2 w-2 bg-blue-600 rounded-full"></div>{children}
    </div>
  );
}

export default function Home() {
  const { theme } = usePageTheme();
  return (
    <div className="flex flex-col desktop:gap-40 tablet-lg:gap-32 tablet:gap-28 mobile:gap-24">
      <HeroSection
        badge={<BadgeCountdown isLight={theme === "light"} />}
        heading="Master Focus & Get More Done in Less Time"
        subtitle="A step-by-step system to eliminate procrastination, train your brain for deep work, and boost productivity effortlessly."
        ctaButtons={[
          { label: "Enroll now", href: "#enroll", variant: "primary" },
          { label: "Curriculum", href: "#curriculum", variant: "secondary" },
        ]}
        imageSrc="/images/hero/phero.png"
        imageAlt="Master Focus course preview"
        backgroundImage="url(/images/hero/Bg-Gradient.png)"
        showBadge={true}
      />
      <DistractionsSection
        badge={
          <BadgeWrapper>
             Are Distractions Holding You Back?
          </BadgeWrapper>
        }
        heading="If you struggle to focus, feel overwhelmed by endless tasks, or procrastinate instead of making progress, you're not alone."
        subtitle="Discover the most common distractions that derail your focus and learn proven strategies to stay on track."
        images={[
          { src: "/images/distruction/1.png", alt: "Person struggling with focus" },
          { src: "/images/distruction/2.png", alt: "Person feeling overwhelmed" },
          { src: "/images/distruction/3.png", alt: "Person procrastinating" },
        ]}
      />
      <NoWorriesSection />
      <DeepWorkBlueprintSection />
      <CurriculumSection />
      <TestimonialsSection />
      <PricingSection />
      <FinalCtaFooterSection />
    </div>
  );
}
