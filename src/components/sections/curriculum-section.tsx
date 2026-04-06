'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePageTheme } from '@/providers/theme-context';

interface Lesson {
  title: string;
  duration: string;
  isPreview?: boolean;
  videoUrl?: string;
}

interface Module {
  title: string;
  duration: string;
  lessons: Lesson[];
}

const CURRICULUM_MODULES: Module[] = [
  {
    title: 'Module 1: Foundations of Deep Work',
    duration: '1.7h of video',
    lessons: [
      { title: 'Understanding Focus & Distraction', duration: '14:23', isPreview: true, videoUrl: 'https://www.youtube.com/embed/oPVte6aMprI?si=u4sRU99qy8yzWDEJ' },
      { title: 'The Science Behind Deep Work', duration: '22:51' },
      { title: 'Identifying Your Productivity Killers', duration: '34:42' },
      { title: 'How to Strengthen Your Attention Span', duration: '27:08' },
    ],
  },
  {
    title: 'Module 2: Building Your Deep Work Routine',
    duration: '1.3h of video',
    lessons: [
      { title: 'Creating Your Perfect Environment', duration: '18:45' },
      { title: 'The 90-Minute Work Block Strategy', duration: '16:22' },
      { title: 'Recovery & Resets Between Sessions', duration: '21:30' },
    ],
  },
  {
    title: 'Module 3: Eliminating Procrastination',
    duration: '1.5h of video',
    lessons: [
      { title: 'Understanding Procrastination Patterns', duration: '12:15' },
      { title: 'The Action First Principle', duration: '19:40' },
      { title: 'Building Unstoppable Momentum', duration: '28:45' },
      { title: 'Accountability Systems That Work', duration: '15:20' },
    ],
  },
  {
    title: 'Module 4: Advanced Focus & Productivity Hacks',
    duration: '1.2h of video',
    lessons: [
      { title: 'Biohacking Focus with Science', duration: '22:10' },
      { title: 'Managing Energy, Not Just Time', duration: '17:35' },
      { title: 'Measuring & Tracking Your Progress', duration: '14:50' },
    ],
  },
];

const FEATURES = [
  '6h of videos - Step-by-step deep work strategies.',
  'Templates & Trackers – Stay on track effortlessly.',
  'Live Q&As – Expert guidance & accountability.',
  'Exclusive Community – Connect with others.',
];

export function CurriculumSection() {
  const { theme } = usePageTheme();
  const isLightTheme = theme === 'light';
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const textColor = isLightTheme ? 'text-gray-900' : 'text-white';
  const mutedColor = isLightTheme ? 'text-gray-600' : 'text-gray-400';
  const badgeColor = isLightTheme ? 'text-blue-700' : 'text-blue-300';
  const bgColor = isLightTheme ? 'bg-gray-50' : 'bg-neutral-900/30';
  const borderColor = isLightTheme ? 'border-gray-200' : 'border-neutral-800';
  const stickyBgColor = isLightTheme ? 'bg-white' : 'bg-neutral-900/50';

  // Open video modal with GSAP animation
  const openVideo = () => {
    setShowVideo(true);
    if (overlayRef.current && modalRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out' }
      );
    }
  };

  // Close video modal with GSAP animation
  const closeVideo = () => {
    if (overlayRef.current && modalRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      });
      gsap.to(
        modalRef.current,
        {
          opacity: 0,
          scale: 0.95,
          y: 20,
          duration: 0.2,
          ease: 'back.in',
          onComplete: () => {
            setShowVideo(false);
          },
        }
      );
    }
  };

  // Handle accordion toggle with GSAP animation
  const toggleAccordion = (index: number) => {
    if (expandedIndex === index) return;

    const contentRef = contentRefs.current[expandedIndex];
    const newContentRef = contentRefs.current[index];

    if (contentRef) {
      gsap.to(contentRef, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          setExpandedIndex(index);
        },
      });
    } else {
      setExpandedIndex(index);
    }
  };

  // Animate new content opening
  useEffect(() => {
    const contentRef = contentRefs.current[expandedIndex];
    if (contentRef) {
      const height = contentRef.scrollHeight;
      gsap.fromTo(
        contentRef,
        { height: 0, opacity: 0 },
        { height, opacity: 1, duration: 0.4, ease: 'power2.inOut' }
      );
    }
  }, [expandedIndex]);

  // Animate on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        accordionRefs.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className={`relative w-full px-6 md:px-12 lg:px-20 py-16 md:py-20 lg:py-24 ${
        isLightTheme ? 'bg-white' : 'bg-[#0a0a0a]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 mb-6 sm:mb-8 ${badgeColor}`}>
          <span className="w-2 h-2 rounded-full bg-current"></span>
          <span className="text-sm font-medium">Course Curriculum</span>
        </div>

        {/* Title */}
        <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-12 sm:mb-16 lg:mb-20 max-w-3xl ${textColor}`}>
          Mastering Deep Work: A Structured Path to Peak Productivity
        </h2>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left - Accordion */}
          <div className="lg:col-span-2">
            <div className="space-y-3">
              {CURRICULUM_MODULES.map((module, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) accordionRefs.current[index] = el;
                  }}
                  className={`border rounded-lg overflow-hidden transition-all ${borderColor} ${
                    expandedIndex === index ? `${bgColor}` : `${bgColor} hover:${bgColor}`
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className={`w-full flex items-start justify-between px-5 py-4 sm:px-6 sm:py-5 transition-colors hover:bg-opacity-70 ${
                      expandedIndex === index ? bgColor : ''
                    }`}
                  >
                    <div className="text-left flex-1">
                      <h3 className={`font-semibold text-base sm:text-lg ${textColor}`}>
                        {module.title}
                      </h3>
                      <p className={`text-xs sm:text-sm mt-1 ${mutedColor}`}>
                        {module.duration}
                      </p>
                    </div>

                    {/* Chevron Icon */}
                    <div
                      className="flex-shrink-0 ml-4 transition-transform duration-400"
                      style={{
                        transform: expandedIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={isLightTheme ? 'text-gray-600' : 'text-gray-400'}
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <div
                    ref={(el) => {
                      if (el) contentRefs.current[index] = el;
                    }}
                    style={{
                      height: expandedIndex === index ? 'auto' : 0,
                      overflow: 'hidden',
                    }}
                    className="overflow-hidden"
                  >
                    <div className={`px-5 py-4 sm:px-6 sm:py-5 border-t ${borderColor} space-y-3`}>
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                            lesson.isPreview ? bgColor : 'hover:bg-opacity-50'
                          }`}
                        >
                          {/* Play Button */}
                          <div
                            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                              lesson.isPreview
                                ? 'bg-blue-500/20'
                                : isLightTheme
                                ? 'bg-gray-300/30'
                                : 'bg-neutral-800/30'
                            }`}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              className={lesson.isPreview ? 'text-blue-500' : isLightTheme ? 'text-gray-500' : 'text-gray-600'}
                            >
                              <path d="M13.5 8L2 14.196V1.804L13.5 8Z" />
                            </svg>
                          </div>

                          {/* Lesson Info */}
                          <div className="flex-1 flex justify-between items-center min-w-0 gap-4">
                            <p className={`font-medium text-sm ${textColor} truncate`}>
                              {lesson.title}
                            </p>
                            {lesson.isPreview && (
                              <button
                                onClick={() => openVideo()}
                                className={`flex-shrink-0 px-3 py-1 text-xs font-medium rounded transition-all transform hover:scale-105 flex items-center gap-1 ${
                                  isLightTheme
                                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                    : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                                }`}
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 16 16"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="inline"
                                >
                                  <path d="M13.5 8L2 14.196V1.804L13.5 8Z" />
                                </svg>
                                Preview
                              </button>
                            )}
                          </div>

                          {/* Duration */}
                          <span className={`text-sm font-medium flex-shrink-0 ${mutedColor}`}>
                            {lesson.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Sticky Features */}
          <div className="lg:col-span-1">
            <div
              className={`sticky top-20 ${stickyBgColor} border ${borderColor} rounded-lg p-6 sm:p-8 space-y-6`}
            >
              <div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${textColor}`}>
                  Not only video lessons!
                </h3>
                <div className="space-y-4">
                  {FEATURES.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 mt-1 flex items-center justify-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10 2.5L4.5 8L2 5.5" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className={`text-sm sm:text-base leading-relaxed ${textColor}`}>
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                Enroll now
              </button>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {showVideo && (
          <>
            {/* Overlay */}
            <div
              ref={overlayRef}
              onClick={closeVideo}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              style={{ opacity: 0 }}
            />
            
            {/* Modal Container */}
            <div
              ref={modalRef}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 touch-none pointer-events-none"
              style={{ opacity: 0 }}
            >
              <div className="w-full max-w-4xl pointer-events-auto">
                {/* Close Button */}
                <button
                  onClick={closeVideo}
                  className="absolute -top-10 right-0 z-10 text-white hover:text-gray-300 transition-colors"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Video Container */}
                <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/oPVte6aMprI?si=u4sRU99qy8yzWDEJ&autoplay=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
