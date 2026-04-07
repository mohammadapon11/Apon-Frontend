'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePageTheme } from '@/providers/theme-context';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function BadgeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = usePageTheme();
  const isLightTheme = theme === "light";
  return (
    <div
      className={`px-4 py-2 flex items-center gap-2 rounded-[12px] text-sm font-medium max-w-33 ${isLightTheme
          ? "bg-blue-100 text-neutral-700 border border-blue-300"
          : "bg-gray-900 text-neutral-100 border border-blue-500/30"
        }`}
    >
      <div className="h-2 w-2 bg-blue-600 rounded-full"></div>{children}
    </div>
  );
}

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
const { theme } = usePageTheme();
const isLightTheme = theme === 'light';
  return (
    <span className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-500/35 bg-blue-500/8 shadow-[0_0_28px_rgba(37,99,235,0.4)] ${isLightTheme ? 'bg-gray-950' : ''}`}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_3495_302)">
          <path d="M9.11065 0.952731L13.6106 3.60606L13.6746 3.64806L13.7366 3.70006L13.8073 3.7494C14.0573 3.9367 14.2635 4.17631 14.4113 4.45151C14.5592 4.72671 14.6452 5.03086 14.6633 5.34273L14.6666 5.47873V10.3347C14.6666 11.1181 14.238 11.8387 13.5846 12.1967L9.04865 15.0647C8.39531 15.4234 7.60465 15.4234 6.91531 15.0434L2.45198 12.2187C2.11398 12.0335 1.83188 11.761 1.63511 11.4297C1.43834 11.0983 1.33411 10.7201 1.33331 10.3347V5.47806C1.33331 4.74073 1.71331 4.0594 2.31731 3.67473L6.95065 0.942731C7.61731 0.574731 8.42665 0.574731 9.11065 0.952731ZM7.99998 5.3334C7.82317 5.3334 7.6536 5.40364 7.52857 5.52866C7.40355 5.65368 7.33331 5.82325 7.33331 6.00006V7.3334H5.99998C5.83669 7.33342 5.67909 7.39337 5.55706 7.50188C5.43504 7.61038 5.35708 7.7599 5.33798 7.92207L5.33331 8.00007C5.33331 8.17688 5.40355 8.34645 5.52858 8.47147C5.6536 8.59649 5.82317 8.66673 5.99998 8.66673H7.33331V10.0001C7.33333 10.1634 7.39328 10.321 7.50179 10.443C7.6103 10.565 7.75981 10.643 7.92198 10.6621L7.99998 10.6667C8.17679 10.6667 8.34636 10.5965 8.47138 10.4715C8.59641 10.3464 8.66665 10.1769 8.66665 10.0001V8.66673H9.99998C10.1633 8.66671 10.3209 8.60676 10.4429 8.49826C10.5649 8.38975 10.6429 8.24023 10.662 8.07806L10.6666 8.00007C10.6666 7.82325 10.5964 7.65368 10.4714 7.52866C10.3464 7.40364 10.1768 7.3334 9.99998 7.3334H8.66665V6.00006C8.66662 5.83678 8.60668 5.67917 8.49817 5.55715C8.38966 5.43513 8.24015 5.35717 8.07798 5.33806L7.99998 5.3334Z" fill="white" />
        </g>
        <defs>
          <clipPath id="clip0_3495_302">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
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
        <article className={`flex justify-center flex-col rounded-[34px] border p-8 sm:p-10 lg:min-h-[640px] lg:px-20 ${leftCardBg} ${leftBorder}`}>
          {/* Badge */}
          <BadgeWrapper>
            Introducing
          </BadgeWrapper>

          <h2 className={`mt-10 max-w-105 text-5xl font-medium leading-[1.06] tracking-[-0.03em] md:text-6xl lg:text-5xl ${titleColor}`}>
            The Deep Work
            <br />
            Blueprint
          </h2>

          <p className={`mt-8 text-neutral-200 leading-tight text-2xl ${bodyColor}`}>
            What extra you will get if you enroll now
          </p>

          <ul className="mt-14 space-y-7 lg:mt-16 lg:space-y-9">
            {BONUS_ITEMS.map((item) => (
              <li key={item} className={`flex items-center gap-5`}>
                <SparkIcon />
                <p className={`text-xl leading-[1.25] text-xl ${mutedColor}`}>{item}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className={`flex flex-col rounded-[34px] border p-8 sm:p-10 ${rightCardBg} ${rightBorder}`}>
          <header className="flex items-start justify-between gap-4">
            <div className="flex items-end gap-4">
              <p className={`text-5xl font-semibold leading-none tracking-[-0.03em] sm:text-5xl lg:text-[64px] ${titleColor}`}>${CURRENT_PRICE}</p>
              <p className={`relative mb-1 text-3xl leading-none sm:text-4xl lg:mb-2 lg:text-[56px] ${mutedColor}`}>
                ${ORIGINAL_PRICE}
                <span className="absolute left-0 top-1/2 block h-1 w-full -translate-y-1/2 rotate-[-8deg] rounded-full bg-red-500" />
              </p>
            </div>
            <span className="inline-flex items-center justify-center rounded-3xl bg-[#2F6EFF] px-5 py-2 text-lg font-medium leading-none text-white sm:px-6 sm:py-3 sm:text-2xl">
              {DISCOUNT_PERCENT}% off
            </span>
          </header>

          <p className={`mt-8 text-lg leading-tight md:text-xl lg:mt-10 lg:text-[30px] ${titleColor}`}>
            30% off until {timeLeft.days}d : {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
          </p>

          <ul className="mt-12 space-y-7 lg:mt-14 lg:space-y-9">
            {VALUE_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-5">
                <SparkIcon />
                <p className={`text-xl leading-[1.25] md:text-xl lg:text-[24px] ${mutedColor}`}>{item}</p>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className=" mt-8 h-14 rounded-2xl bg-[#2F6EFF] text-xl font-semibold text-white transition-colors hover:bg-[#2962df] sm:h-16 sm:text-2xl lg:text-xl cursor-pointer"
          >
            Enroll now
          </button>
        </article>
      </div>
    </section>
  );
}
