'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePageTheme } from '@/providers/theme-context';
import {
    FocusIconDark,
    BrainIconDark,
    CheckmarkIconDark,
    TransferIconDark,
    FocusIconLight,
    BrainIconLight,
    CheckmarkIconLight,
    TransferIconLight,
} from '@/components/icons/deep-work-icons';

interface DeepWorkItem {
    text: string;
}

const DEEP_WORK_ITEMS: DeepWorkItem[] = [
    { text: 'Develop laser-sharp focus & eliminate distractions.' },
    { text: 'Master deep work techniques for smarter productivity.' },
    { text: 'Overcome procrastination & get more done.' },
    { text: 'Build lasting habits for long-term success.' },
];

const ICON_COMPONENT_DARK = [FocusIconDark, BrainIconDark, CheckmarkIconDark, TransferIconDark];
const ICON_COMPONENT_LIGHT = [FocusIconLight, BrainIconLight, CheckmarkIconLight, TransferIconLight];

export function DeepWorkBlueprintSection() {
    const { theme } = usePageTheme();
    const isLightTheme = theme === 'light';
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                defaults: { ease: 'power3.out', duration: 0.6 },
            });

            // Animate each timeline item
            itemsRef.current.forEach((item, index) => {
                if (item) {
                    timeline.fromTo(
                        item,
                        { opacity: 0, x: -30 },
                        { opacity: 1, x: 0, duration: 0.6 },
                        index * 0.15
                    );
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, [isLightTheme]);

    const textColor = isLightTheme ? 'text-gray-900' : 'text-white';
    const badgeColor = isLightTheme ? 'text-blue-700' : 'text-blue-300';
    const dotColor = isLightTheme ? 'bg-blue-600' : 'bg-blue-500';

    return (
        <section
            ref={containerRef}
            className={`relative w-full px-6 md:px-12 lg:px-20 py-16 md:py-20 lg:py-24 ${isLightTheme ? 'bg-white' : 'bg-[#0a0a0a]'
                }`}
        >
            <div className="">
                {/* Badge */}
                <div
                    className={`max-w-sm mx-auto text-center px-6 py-2 rounded-full text-sm font-medium ${isLightTheme
                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                            : 'bg-blue-900/20 text-blue-300 border border-blue-500/30'
                        }`}
                >
                    ● The Deep Work Blueprint
                </div>

                {/* Heading */}
                <h2 className={`text-center text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mt-5 sm:mt-6 lg:mt-10 ${textColor}`}>
                    A self-paced, results-driven
                </h2>
                <h2 className={`text-center text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-12 sm:mb-16 lg:mb-20 ${textColor}`}>course designed to help you</h2>

                {/* Timeline Items */}
                <div className="flex flex-col items-center">
                    {/* Timeline Items */}
                    <div className='flex flex-col lg:gap-14'>
                        {DEEP_WORK_ITEMS.map((item, index) => {
                            const IconDark = ICON_COMPONENT_DARK[index];
                            const IconLight = ICON_COMPONENT_LIGHT[index];

                            return (
                                <div
                                    key={index}
                                    ref={(el) => {
                                        if (el) itemsRef.current[index] = el;
                                    }}
                                    className="relative  items-start gap-6 sm:gap-8 deep-work-gradient-border space-y-8 sm:space-y-12 md:space-y-14 lg:space-y-16 pl-16 sm:pl-20 md:pl-24"
                                >
                                    {/* Blue dot */}
                                    <div className={`absolute -left-7 sm:-left-20 md:-left-2 -top-7 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full ${dotColor} shadow-lg shadow-blue-500/50`} />

                                    {/* Icon container */}
                                    <div
                                        className={` w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-6 ${isLightTheme ? 'bg-gray-100' : 'bg-[#171B21]'
                                            } border ${isLightTheme ? 'border-gray-200' : 'border-neutral-800'}`}
                                    >
                                        {isLightTheme ? <IconLight /> : <IconDark />}
                                    </div>

                                    {/* Text content */}
                                    <div className="flex-1 pt-1">
                                        <p className={`text-base sm:text-lg w-[300px] leading-relaxed ${textColor}`}>
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
