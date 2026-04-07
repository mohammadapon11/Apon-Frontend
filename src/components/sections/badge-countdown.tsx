"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type BadgeCountdownProps = {
  daysFromNow?: number;
  isLight?: boolean;
  className?: string;
};

export function BadgeCountdown({
  daysFromNow = 15,
  isLight = false,
  className,
}: BadgeCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: daysFromNow,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Calculate end date based on daysFromNow
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + daysFromNow);

    const timer = setInterval(() => {
      const now = new Date().getTime();
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

    return () => clearInterval(timer);
  }, [daysFromNow]);

  // Show placeholder until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-3 border border-primary-500/30 bg-primary-500/10 px-4 py-2 backdrop-blur-sm",
          className
        )}
      >
        <span className="h-2 w-2 rounded-3 bg-primary-500 animate-pulse" />
        <span className={cn("text-sm font-medium", isLight ? "text-neutral-900" : "text-neutral-0")}>
          30% off until {daysFromNow}d: 00h : 00m : 00s
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-[12px] border border-primary-500/30  px-4 py-2 backdrop-blur-sm",
        className, isLight
          ? "bg-primary-500/10 text-neutral-900"
          : "bg-gray-900 text-neutral-100"
      )}
    >
      <span className="h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
      <span className={cn("text-sm font-medium", isLight ? "text-neutral-900" : "text-neutral-100")}>
        30% off until {timeLeft.days}d: {String(timeLeft.hours).padStart(2, "0")}h : {String(timeLeft.minutes).padStart(2, "0")}m : {String(timeLeft.seconds).padStart(2, "0")}s
      </span>
    </div>
  );
}
