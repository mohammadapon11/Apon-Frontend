'use client';

import { DistractionsSection, HeroSection, NoWorriesSection, DeepWorkBlueprintSection, CurriculumSection, TestimonialsSection } from "@/components/sections";
import { BadgeCountdown } from "@/components/sections/badge-countdown";
import { usePageTheme } from "@/providers/theme-context";

function BadgeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = usePageTheme();
  const isLightTheme = theme === "light";
  return (
    <div
      className={`px-4 py-2 rounded-full text-sm font-medium ${
        isLightTheme
          ? "bg-blue-100 text-blue-700 border border-blue-300"
          : "bg-blue-900/30 text-blue-300 border border-blue-500/30"
      }`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection
        badge={<BadgeCountdown isLight={false} />}
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
            ● Are Distractions Holding You Back?
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
    </>
  );
}
