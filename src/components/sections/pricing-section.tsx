'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePageTheme } from '@/providers/theme-context';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const VALUE_ITEMS = [
  '6h of videos - Step-by-step deep work strategies.',
  'Templates & Trackers - Stay on track effortlessly.',
  'Live Q&As - Expert guidance & accountability.',
  'Exclusive Community - Connect with others.',
];

const BONUS_ITEMS = [
  'Bonus: 1:1 coaching session to boost focus.',
  'Discount: Save 30% when you enroll now!',
];

const DISCOUNT_PERCENT = 30;
const CURRENT_PRICE = 349;
const ORIGINAL_PRICE = 500;

function SparkIcon() {
  return (
    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-500/35 bg-blue-500/8 shadow-[0_0_28px_rgba(37,99,235,0.4)]">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 3.8L14.08 7.92L18.2 10L14.08 12.08L12 16.2L9.92 12.08L5.8 10L9.92 7.92L12 3.8Z" fill="#F8FAFC" />
        <circle cx="12" cy="10" r="1" fill="#0F172A" />
      </svg>
    </span>
  );
}

export function PricingSection() {
  const { theme } = usePageTheme();
  const isLightTheme = theme === 'light';

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 4,
    hours: 2,
    minutes: 41,
    seconds: 17,
  });

  const endDate = useMemo(() => {
    const end = new Date();
    end.setDate(end.getDate() + 4);
    end.setHours(end.getHours() + 2);
    end.setMinutes(end.getMinutes() + 41);
    end.setSeconds(end.getSeconds() + 17);
    return end;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const distance = endDate.getTime() - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [endDate]);

  const sectionBg = isLightTheme ? 'bg-white' : 'bg-[#05070B]';
  const leftCardBg = isLightTheme ? 'bg-gray-50' : 'bg-[#0A0E16]';
  const rightCardBg = isLightTheme ? 'bg-white' : 'bg-[#090D15]';
  const leftBorder = isLightTheme ? 'border-gray-200' : 'border-transparent';
  const rightBorder = isLightTheme ? 'border-blue-300' : 'border-blue-700/70';
  const titleColor = isLightTheme ? 'text-gray-900' : 'text-[#D7DCE5]';
  const bodyColor = isLightTheme ? 'text-gray-700' : 'text-[#A0A8B5]';
  const mutedColor = isLightTheme ? 'text-gray-500' : 'text-[#8C95A3]';

  return (
    <section id="pricing" className={`relative w-full px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24 ${sectionBg}`}>
      <div id="enroll" className="sr-only" />
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <article className={`min-h-[540px] rounded-[34px] border p-8 sm:p-10 lg:min-h-[640px] lg:p-12 ${leftCardBg} ${leftBorder}`}>
          <div className="inline-flex items-center gap-3 rounded-[18px] border border-blue-500/35 bg-blue-500/8 px-5 py-3 text-sm leading-none text-[#D6DDE6] shadow-[0_0_38px_rgba(37,99,235,0.35)] sm:text-base">
            <span className="h-3 w-3 rounded-full bg-[#2F6EFF]" />
            <span className="text-base">Introducing</span>
          </div>

          <h2 className={`mt-10 max-w-[420px] text-5xl font-semibold leading-[1.06] tracking-[-0.03em] md:text-6xl lg:text-[76px] ${titleColor}`}>
            The Deep Work
            <br />
            Blueprint
          </h2>

          <p className={`mt-8 max-w-[520px] text-2xl leading-tight md:text-3xl lg:text-[40px] ${bodyColor}`}>
            What extra you will get if you enroll now
          </p>

          <ul className="mt-14 space-y-7 lg:mt-16 lg:space-y-9">
            {BONUS_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-5">
                <SparkIcon />
                <p className={`text-xl leading-[1.25] md:text-2xl lg:text-[40px] ${mutedColor}`}>{item}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className={`flex min-h-[540px] flex-col rounded-[34px] border p-8 sm:p-10 lg:min-h-[640px] ${rightCardBg} ${rightBorder}`}>
          <header className="flex items-start justify-between gap-4">
            <div className="flex items-end gap-4">
              <p className={`text-5xl font-semibold leading-none tracking-[-0.03em] sm:text-6xl lg:text-[74px] ${titleColor}`}>${CURRENT_PRICE}</p>
              <p className={`relative mb-1 text-3xl leading-none sm:text-4xl lg:mb-2 lg:text-[56px] ${mutedColor}`}>
                ${ORIGINAL_PRICE}
                <span className="absolute left-0 top-1/2 block h-[4px] w-full -translate-y-1/2 rotate-[-8deg] rounded-full bg-red-500" />
              </p>
            </div>
            <span className="inline-flex items-center justify-center rounded-3xl bg-[#2F6EFF] px-5 py-2 text-lg font-medium leading-none text-white sm:px-6 sm:py-3 sm:text-2xl">
              {DISCOUNT_PERCENT}% off
            </span>
          </header>

          <p className={`mt-8 text-2xl leading-tight md:text-3xl lg:mt-10 lg:text-[40px] ${titleColor}`}>
            30% off until {timeLeft.days}d : {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
          </p>

          <ul className="mt-12 space-y-7 lg:mt-14 lg:space-y-9">
            {VALUE_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-5">
                <SparkIcon />
                <p className={`text-xl leading-[1.25] md:text-2xl lg:text-[40px] ${mutedColor}`}>{item}</p>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="mt-auto h-14 rounded-2xl bg-[#2F6EFF] text-xl font-semibold text-white transition-colors hover:bg-[#2962df] sm:h-16 sm:text-2xl lg:h-[78px] lg:text-[42px]"
          >
            Enroll now
          </button>
        </article>
      </div>
    </section>
  );
}
