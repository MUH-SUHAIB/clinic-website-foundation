"use client";

import { useState, useEffect, useCallback } from "react";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Play,
  Pause,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "./section-shell";
import { Text } from "@/components/ui/typography";
import type { CTAContent } from "./types";
import { slideUp } from "@/lib/motion";

export interface TestimonialItem {
  name: string;
  review: string;
  date: string;
  rating?: number;
}

export interface TestimonialsContent {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  aggregateScore?: {
    rating: number;
    totalReviews: string;
    platform?: string;
  };
  testimonials?: TestimonialItem[];
  appointmentCta?: CTAContent;
  animate?: boolean;
}

/* Authentic Google "G" Vector Brand Mark */
function GoogleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );
}

/* Elegant Dual-Layer Metallic Quote Icon */
function PremiumQuoteIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4M19 11h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
}

function getRelativeTime(dateString: string): string {
  const then = new Date(dateString).getTime();
  const diffDays = Math.floor((Date.now() - then) / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return diffMonths === 1 ? "1 month ago" : `${diffMonths} months ago`;
  const diffYears = Math.floor(diffMonths / 12);
  return diffYears === 1 ? "1 year ago" : `${diffYears} years ago`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          aria-hidden
          className={i < rating ? "fill-amber-400 text-amber-400 drop-shadow-sm" : "fill-none text-slate-300"}
        />
      ))}
    </div>
  );
}

// RTL-Aware Framer Motion Variants
const slideVariants = {
  enter: ({ direction, isRtl }: { direction: number; isRtl: boolean }) => ({
    x: direction > 0 ? (isRtl ? -60 : 60) : (isRtl ? 60 : -60),
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 28, opacity: { duration: 0.3 } },
  },
  exit: ({ direction, isRtl }: { direction: number; isRtl: boolean }) => ({
    x: direction < 0 ? (isRtl ? -60 : 60) : (isRtl ? 60 : -60),
    opacity: 0,
    scale: 0.98,
    transition: { type: "spring" as const, stiffness: 260, damping: 28, opacity: { duration: 0.2 } },
  }),
};

const defaultTestimonials: TestimonialItem[] = [
  {
    name: "Muna Mohamed",
    review:
      "الدكتورة يارا متميزة جدًا في عملها، لديها خبرة عالية ودقة واضحة في التشخيص والعلاج. أسلوبها راقٍ وتعاملها لطيف جدًا ويمنح المريضة راحة وثقة. تشرح الحالة بشكل واضح وتهتم بكل التفاصيل، وهذا يدل على حرصها وإخلاصها في عملها. بصراحة، من أفضل الطبيبات اللاتي تعاملت معهن، وأنصح بها بشدة.",
    date: "2026-05-10",
    rating: 5,
  },
  {
    name: "جوجو الكعبي",
    review:
      "دكتورة يارا من أروع طبيبات التجميل، دقيقة في عملها وذوقها راقٍ جدًا. تهتم بأدق التفاصيل وتحرص على راحة المراجع. كانت تجربة أكثر من ممتازة، وأنصح الجميع بزيارتها. أسلوبها راقٍ وتعاملها لا يُعلى عليه. شكرًا دكتورة يارا، وإن شاء الله لي زيارات جديدة قادمة ❤️",
    date: "2026-04-02",
    rating: 5,
  },
  {
    name: "Sultan Harib",
    review:
      "أخذت باكيج جلسات عند الدكتورة يارا لعلاج الشعر، وما شاء الله خفّ تساقط الشعر وزادت كثافته، وسعر الجلسات مناسب.",
    date: "2026-01-20",
    rating: 5,
  },
  {
    name: "Ahmed Habib",
    review:
      "تجربتي عند دكتورة الأسنان كانت ممتازة بكل التفاصيل. تعاملها مع الأسنان احترافي ودقيق، وتشرح كل خطوة بطريقة تريح المريض. المكان نظيف جدًا ومرتب ويعطي انطباعًا بالثقة من أول ما تدخل. الموظفون محترمون، وتعاملهم لطيف وسريع، ويسهّلون جميع الإجراءات. بصراحة كانت تجربة رائعة وأنصح بها بكل تأكيد.",
    date: "2025-11-15",
    rating: 5,
  },
  {
    name: "Ahed Saif",
    review:
      "ماشالله المركز بقمه النظافه والي في السربشين اسمها لانا جدا ممتاذه في التعامل والاستقبال والهنديه تبع الليزر اسمها اشنا ماشالله بنصح التجربه",
    date: "2026-08-10",
    rating: 5,
  },
  {
    name: "Waqar Ahmad",
    review: "Good.",
    date: "2025-01-18",
    rating: 4,
  },
  {
    name: 'MOHAMMAD "mmsir"',
    review: "It's ok 👍",
    date: "2024-06-10",
    rating: 3,
  },
];

const defaultAggregateScore = {
  rating: 4.4,
  totalReviews: "80+",
  platform: "Google Reviews",
};

const defaultCta: CTAContent = {
  label: "View More on Google Reviews",
  href: "https://www.google.com/maps/place/BAGHDAD+MEDICAL+CENTRE/@24.9146055,55.7731613,17z/data=!4m14!1m5!8m4!1e1!2s108076981700144378409!3m1!1e1!3m7!1s0x3ef573f609a9bbf7:0x9ebb7b0be900046e!8m2!3d24.9146055!4d55.7757416!9m1!1b1!16s%2Fg%2F11clvpfq2k?hl=en-GB&entry=ttu",
};

export function Testimonials({
  id = "testimonials",
  aggregateScore = defaultAggregateScore,
  testimonials = defaultTestimonials,
  appointmentCta = defaultCta,
  animate = false,
}: TestimonialsContent) {
  const t = useTranslations("Testimonials");
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isRtl, setIsRtl] = useState(false);

  // Detect RTL direction on mount for Framer Motion
  useEffect(() => {
    setIsRtl(document.documentElement.dir === "rtl" || window.getComputedStyle(document.body).direction === "rtl");
  }, []);

  const currentIndex = testimonials.length > 0 
    ? ((page % testimonials.length) + testimonials.length) % testimonials.length 
    : 0;

  const paginate = useCallback(
    (newDirection: number) => {
      if (testimonials.length === 0) return;
      setPage([page + newDirection, newDirection]);
    },
    [page, testimonials.length]
  );

  useEffect(() => {
    if (isHovered || testimonials.length <= 1 || !isAutoPlaying) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 6500);

    return () => clearInterval(timer);
  }, [isHovered, paginate, testimonials.length, isAutoPlaying]);

  if (testimonials.length === 0) return null;

  const activeReview = testimonials[currentIndex];

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(255,241,242,0.7)_0%,rgba(239,246,255,0.6)_40%,rgba(219,234,254,0.4)_100%)] dark:bg-[linear-gradient(to_bottom,rgba(225,29,72,0.03)_0%,rgba(29,78,216,0.03)_40%,transparent_100%)]" aria-hidden="true" />

        <Section id={id} eyebrow={t("eyebrow")} title={t("title")} description={t("description")} animate={animate}>
          {aggregateScore && (
            <m.div
              {...(animate ? { variants: slideUp, initial: "hidden", whileInView: "visible", viewport: { once: true } } : {})}
              className="-mt-3 mb-10 flex justify-center"
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-blue-300 bg-white/80 px-5 py-2 shadow-sm backdrop-blur-md transition-all hover:border-blue-400 hover:bg-white hover:shadow-md dark:border-blue-500/50 dark:bg-slate-800/80">
                <GoogleIcon className="h-4 w-4" />
                <span className="text-sm font-bold tracking-tight text-foreground">{aggregateScore.rating.toFixed(1)}</span>
                <StarRating rating={Math.round(aggregateScore.rating)} />
                <span className="h-3.5 w-px bg-slate-300 dark:bg-slate-600" />
                <span className="text-xs font-medium text-muted-foreground">{aggregateScore.totalReviews} {t("platform")}</span>
              </div>
            </m.div>
          )}

          <div className="relative mx-auto w-full max-w-6xl">
            <m.div
              {...(animate ? { variants: slideUp, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-50px" } } : {})}
              className="relative grid h-[560px] w-full grid-rows-[auto_1fr_auto] overflow-hidden rounded-[2.5rem] border border-blue-200 bg-white/50 px-8 py-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all duration-500 hover:border-blue-300 hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.15)] sm:h-[520px] sm:px-12 sm:py-10 md:h-[500px] md:px-16 md:py-12 dark:border-blue-800/40 dark:bg-slate-900/50"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* PLAY/PAUSE (WCAG 2.2.2) */}
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="absolute top-6 end-6 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-slate-500 transition-colors hover:bg-white hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400 dark:focus-visible:ring-offset-slate-900"
                aria-label={isAutoPlaying ? t("pauseLabel") : t("playLabel")}
              >
                {isAutoPlaying ? <Pause className="h-4 w-4" fill="currentColor" /> : <Play className="h-4 w-4" fill="currentColor" />}
              </button>

              {/* LEFT ARROW */}
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(-1)}
                aria-label={t("prevLabel")}
                className="absolute start-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-blue-200 bg-white/90 text-foreground shadow-md backdrop-blur-md transition-colors hover:border-blue-400 hover:bg-blue-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:start-6 sm:h-12 sm:w-12 dark:border-slate-700 dark:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
              >
                <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
              </m.button>

              {/* RIGHT ARROW */}
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(1)}
                aria-label={t("nextLabel")}
                className="absolute end-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-blue-200 bg-white/90 text-foreground shadow-md backdrop-blur-md transition-colors hover:border-blue-400 hover:bg-blue-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:end-6 sm:h-12 sm:w-12 dark:border-slate-700 dark:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
              >
                <ChevronRight className="h-5 w-5 rtl:rotate-180" />
              </m.button>

              {/* QUOTE ICON */}
              <div className="flex justify-center">
                <PremiumQuoteIcon className="h-9 w-9 text-blue-300/60 sm:h-10 sm:w-10" />
              </div>

              {/* REVIEW CONTENT */}
              <div className="relative flex min-h-0 items-center justify-center px-5 sm:px-12">
                <AnimatePresence initial={false} custom={{ direction, isRtl }} mode="wait">
                  <m.div
                    key={page}
                    custom={{ direction, isRtl }}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex w-full max-w-3xl flex-col items-center justify-center text-center"
                  >
                    <Text variant="body" className="text-foreground/90 text-base font-medium italic leading-relaxed text-balance sm:text-lg md:text-xl md:leading-relaxed" dir="auto">
                      “{activeReview.review}”
                    </Text>
                    <div className="mt-6 flex flex-col items-center gap-3 sm:mt-7">
                      <StarRating rating={activeReview.rating ?? 5} />
                      <div className="mt-1 flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-50 text-sm font-bold text-blue-600 shadow-inner ring-2 ring-white">
                          {initials(activeReview.name)}
                        </div>
                        <div className="text-start" dir="auto">
                          <Text variant="body" className="font-semibold leading-snug text-foreground">
                            {activeReview.name}
                          </Text>
                          <Text variant="caption" className="text-muted-foreground">
                            {getRelativeTime(activeReview.date)}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </m.div>
                </AnimatePresence>
              </div>

              {/* PAGINATION */}
              <div className="flex min-h-[32px] items-center justify-center gap-2.5">
                {testimonials.map((_, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (idx === currentIndex) return;
                        const dir = idx > currentIndex ? 1 : -1;
                        setPage([idx, dir]);
                        setIsAutoPlaying(false);
                      }}
                      className="group relative flex items-center justify-center py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 rounded-full"
                      aria-label={`Go to review ${idx + 1}`}
                      aria-current={isActive ? "true" : "false"}
                    >
                      <span
                        className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
                          isActive ? "w-8 bg-blue-500 shadow-sm" : "w-2.5 bg-slate-300 group-hover:bg-blue-300 dark:bg-slate-700"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </m.div>
          </div>

          {/* View More CTA */}
          <div className="mt-12 flex justify-center">
            <m.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={appointmentCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 rounded-full border border-blue-300 bg-white/70 px-8 py-4 text-sm font-semibold text-foreground shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-blue-800/50 dark:bg-slate-900/70 dark:hover:bg-blue-900/30 dark:focus-visible:ring-offset-slate-900"
            >
              <GoogleIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              <span>{t("ctaLabel")}</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:text-blue-500" />
            </m.a>
          </div>
        </Section>
      </div>
    </LazyMotion>
  );
}