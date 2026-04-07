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

function BadgeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = usePageTheme();
  const isLightTheme = theme === "light";
  return (
    <div
      className={`px-4 py-2 flex items-center gap-2 rounded-[12px] text-sm font-medium max-w-44 mx-auto ${
        isLightTheme
          ? "bg-blue-100 text-neutral-700 border border-blue-300"
          : "bg-gray-900 text-neutral-100 border border-blue-500/30"
      }`}
    >
      <div className="h-2 w-2 bg-blue-600 rounded-full"></div>{children}
    </div>
  );
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
      id="curriculum"
      className={`relative max-w-5xl mx-auto ${
        isLightTheme ? 'bg-white' : 'bg-[#0a0a0a]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Badge */}
              <BadgeWrapper>
                 Course Curriculam
              </BadgeWrapper>

        {/* Title */}
        <h2 className={`text-center text-2xl tablet-lg:text-4xl desktop:text-4xl font-medium leading-tight mt-5 tablet:mt-6 desktop:mt-8 max-w-xl mx-auto ${textColor}`}>
          Mastering Deep Work: A Structured Path to Peak Productivity
        </h2>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 pt-40">
          {/* Left - Accordion */}
          <div className="lg:col-span-3">
            <div className="space-y-3">
              {CURRICULUM_MODULES.map((module, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) accordionRefs.current[index] = el;
                  }}
                  className={`rounded-lg navbar-gradient-border  overflow-hidden transition-all ${borderColor} ${
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
                      className="shrink-0 ml-4 transition-transform duration-400"
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
                          className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${lessonIndex == module?.lessons?.length - 1 ? '' : 'navbar-gradient-border'} ${
                            lesson.isPreview ? bgColor : 'hover:bg-opacity-50'
                          }`}
                        >
                          {/* Play Button */}
                          <div
                            className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                              lesson.isPreview
                                ? 'bg-neutral-100'
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
                          <span className={`text-sm font-medium shrink-0 ${mutedColor}`}>
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
          <div className="lg:col-span-2 lg:pt-0 pt-30 lg:max-w-full max-w-100 mx-auto">
            <div
              className={`sticky border border-transparent 
                [border-image:radial-gradient(81.27%_74.72%_at_50%_50%,#2466F2_0%,rgba(36,102,242,0)_100%)_1] rounded-3xl 
                 top-20 ${stickyBgColor} ${isLightTheme ? 'bg-' : 'bg-zinc-950'} border ${borderColor} p-6 sm:p-8 space-y-6`}
            >
              <div className=''>
                <h3 className={`text-xl sm:text-2xl font-bold mb-6 ${textColor}`}>
                  Not only video lessons!
                </h3>
                <div className="space-y-6">
                  {FEATURES.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`rounded-full p-2 
                border border-transparent
                
                mask-exclude ${isLightTheme ? 'bg-gray-100' : 'bg-zinc-950 from-zinc-950 to-zinc-950 bg-linear-to-br [background:linear-gradient(#18181b,#18181b)_padding-box,radial-gradient(81.27%_74.72%_at_50%_50%,#2466F2_0%,rgba(36,102,242,0)_100%)_border-box][mask:linear-gradient(#000_0_0)_padding-box,linear-gradient(#000_0_0)]'}`}>
                        {
                          isLightTheme ? (
                            
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"><path fill="#000" fill-rule="evenodd" d="M10.75 0c-.561 0-1.018.236-1.434.554-.39.297-.82.727-1.323 1.23l-.035.035c-.515.515-.964.717-1.656.717q-.132 0-.32-.006c-.317-.01-.727-.02-1.086.01-.525.046-1.18.19-1.679.691-.494.499-.634 1.152-.678 1.673-.03.356-.018.763-.01 1.078q.007.188.007.32c0 .692-.202 1.141-.717 1.656l-.035.035c-.503.503-.933.933-1.23 1.322C.236 9.733 0 10.19 0 10.75s.236 1.018.554 1.434c.297.39.727.82 1.23 1.323l.035.035c.334.334.491.55.58.754.087.2.137.451.137.902q0 .132-.006.32c-.01.317-.02.727.01 1.086.046.525.19 1.18.691 1.679.499.494 1.152.634 1.673.678.356.03.763.018 1.078.01q.188-.007.32-.007c.441 0 .69.044.884.125.195.08.404.224.718.538.067.067.156.162.258.271.23.247.529.567.808.812.424.37 1.032.79 1.78.79.749 0 1.356-.42 1.78-.79.28-.245.578-.565.808-.811.102-.11.19-.204.258-.272.314-.314.522-.458.717-.538.196-.08.444-.125.885-.125.086 0 .196.003.32.006.315.01.722.02 1.078-.01.521-.043 1.174-.183 1.673-.677.502-.498.645-1.154.69-1.68.032-.358.02-.768.011-1.085a12 12 0 0 1-.006-.32c0-.45.05-.703.137-.902.089-.204.246-.42.58-.754l.035-.035c.503-.503.933-.933 1.23-1.323.318-.416.554-.873.554-1.434s-.236-1.018-.554-1.434c-.297-.39-.727-.82-1.23-1.323l-.035-.035c-.334-.334-.491-.55-.58-.754-.087-.2-.137-.451-.137-.902q0-.132.006-.32c.01-.317.02-.727-.01-1.086-.046-.525-.19-1.18-.691-1.679-.498-.494-1.152-.634-1.673-.678a10 10 0 0 0-1.078-.01c-.124.004-.234.007-.32.007-.693 0-1.141-.202-1.656-.717l-.035-.035c-.503-.503-.933-.933-1.323-1.23C11.768.236 11.311 0 10.75 0m3.766 8.893a1 1 0 1 0-1.532-1.286l-3.537 4.21-1.031-.92a1 1 0 0 0-1.332 1.492l1.8 1.607a1 1 0 0 0 1.432-.103z" clip-rule="evenodd"/></svg>
                          ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none"><path fill="#fff" fill-rule="evenodd" d="M7.167 0c-.374 0-.68.157-.957.37-.26.197-.546.484-.881.82l-.024.023c-.343.343-.642.478-1.104.478q-.087 0-.213-.005a7 7 0 0 0-.724.008c-.35.03-.787.126-1.119.46-.33.332-.423.768-.452 1.116-.02.237-.012.508-.007.718q.005.126.005.213c0 .462-.135.761-.478 1.104l-.024.024c-.335.335-.622.622-.82.881-.212.278-.369.583-.369.957s.157.679.37.956c.197.26.484.546.82.882l.023.023c.222.223.327.367.387.503.057.133.09.3.09.6l-.004.214c-.005.212-.013.485.008.724.03.35.126.787.46 1.12.332.329.768.422 1.116.451.237.02.508.013.718.007q.126-.004.213-.005c.295 0 .46.03.59.084.13.053.269.15.478.359.045.045.104.108.172.18.153.165.353.379.539.541.282.247.688.527 1.187.527s.904-.28 1.186-.527c.187-.162.386-.376.54-.54l.17-.181c.21-.21.35-.306.48-.36s.295-.082.589-.082q.088 0 .213.004c.21.006.482.014.719-.007.347-.029.783-.122 1.115-.452.335-.332.43-.769.46-1.119.022-.239.014-.512.008-.724l-.005-.213c0-.3.034-.468.092-.601.06-.136.164-.28.387-.503l.023-.023c.335-.336.622-.622.82-.882.212-.277.37-.582.37-.956s-.158-.68-.37-.957c-.198-.26-.485-.546-.82-.881l-.023-.024c-.223-.222-.328-.366-.387-.503-.058-.132-.091-.3-.091-.6q0-.088.004-.214c.006-.211.014-.485-.007-.724-.03-.35-.126-.787-.46-1.119-.333-.33-.768-.423-1.116-.452a7 7 0 0 0-.719-.007q-.125.005-.213.005c-.462 0-.76-.135-1.104-.478l-.023-.024C8.669.854 8.383.567 8.123.37 7.846.157 7.54 0 7.167 0m2.51 5.929a.667.667 0 1 0-1.02-.858L6.297 7.878l-.687-.613a.667.667 0 0 0-.888.994l1.2 1.072a.667.667 0 0 0 .954-.069z" clip-rule="evenodd"/></svg>
                            )
                        }
                      </div>
                      <p className={`text-sm sm:text-base ${textColor}`}>
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
