'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePageTheme } from '@/providers/theme-context';

const FOOTER_LINKS = [
  { label: 'Terms & conditions', href: '#' },
  { label: 'Refund policy', href: '#' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Support', href: '#' },
];

const AVATARS = [
  { src: '/images/review/Avatar 1.png', alt: 'Student avatar 1' },
  { src: '/images/review/Avatar 2.png', alt: 'Student avatar 2' },
  { src: '/images/review/Avatar 3.png', alt: 'Student avatar 3' },
];

export function FinalCtaFooterSection() {
  const { theme } = usePageTheme();
  const isLightTheme = theme === 'light';

  const sectionBg = isLightTheme ? 'bg-white' : 'bg-[#06090f]';
  const headingColor = isLightTheme ? 'text-gray-900' : 'text-[#dce2ea]';
  const subtitleColor = isLightTheme ? 'text-gray-600' : 'text-[#9aa3af]';
  const divider = isLightTheme ? 'border-gray-200' : 'border-[#123161]/40';
  const footerText = isLightTheme ? 'text-gray-600' : 'text-[#c0c7d2]';

  return (
    <section className={`w-full px-6 py-14 md:px-12 lg:px-20 ${sectionBg}`}>
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-10 py-4 lg:grid-cols-[1fr_480px] lg:items-center lg:gap-12 lg:py-10 navbar-gradient-border">
          <div className="max-w-[560px]">
            <h2 className={`text-5xl font-medium leading-[1.26] tracking-[-0.03em] sm:text-4xl lg:text-5xl ${headingColor}`}>
              The Deep
              <br />
              Work Blueprint
            </h2>
            <p className={`mt-6 text-xl leading-snug sm:text-lg lg:text-xl ${subtitleColor}`}>
              Master Focus &amp; Get More Done in Less Time
            </p>
          </div>

          <Link
            href="#testimonials"
            className="group block rounded-[34px] bg-[#2f6eff] px-7 pb-6 pt-7 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div className="flex -space-x-2">
                {AVATARS.map((avatar) => (
                  <span
                    key={avatar.src}
                    className="relative inline-block h-16 w-16 overflow-hidden rounded-full border-2 border-[#2f6eff]"
                  >
                    <Image src={avatar.src} alt={avatar.alt} fill className="object-cover" />
                  </span>
                ))}
              </div>
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#2f6eff]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <p className="mt-24 text-4xl font-normal leading-tight text-white sm:text-xl lg:text-2xl">
              Join with 5K other students
            </p>
          </Link>
        </div>

        <div className={`mt-8 pt-8 lg:mt-16 lg:pt-10 ${divider}`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className={`text-xl leading-relaxed ${footerText}`}>
              © Copyright 2024, All Rights Reserved
            </p>

            <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:gap-x-14">
              {FOOTER_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-xl leading-relaxed transition-opacity hover:opacity-80 ${footerText}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
