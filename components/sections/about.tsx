"use client";

import { Quote, Target, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";

import {
  staggerContainer,
  slideUp,
  duration,
  easing,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export function About({ animate = true }: { animate?: boolean }) {
  const t = useTranslations("About");
  const locale = useLocale();
  const isAr = locale === "ar";
  const TextWrapper = animate ? motion.div : "div";

  return (
    <div className="relative overflow-hidden" id="about">
      {/* Symmetric Background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-background),var(--color-secondary)_50%,var(--color-background)_100%)]" />
      </div>

      <Section className="py-16 md:py-24" align="start">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center lg:gap-20">
          
          {/* IMAGE / QUOTE COLUMN */}
          <div className="order-2 flex w-full md:order-1">
            <motion.div
              initial={animate ? { opacity: 0, y: 24 } : undefined}
              whileInView={animate ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: duration.slow, ease: easing }}
              className={cn(
                "group flex w-full flex-col overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm transition-shadow duration-300 ease-in-out dark:bg-slate-900 dark:border-slate-800",
                "drop-shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:drop-shadow-[0_0_25px_rgba(0,0,0,0.1)]"
              )}
            >
              {/* INCREASED HEIGHT: We expanded min-height significantly to show more of the doctor */}
              <div className="relative min-h-[360px] sm:min-h-[400px] md:min-h-[460px] lg:min-h-[480px] flex-1 w-full overflow-hidden">
                <img
                  src="/baghdad/about-founder-doctor.png"
                  alt={`${t("author")} - ${t("role")}`}
                  loading="lazy"
                  /* CHANGED: Removed object-top so it centers naturally, keeping more of the bottom visible while cropping the top ceiling */
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* TIGHTER PADDING: Saves vertical space */}
              <div className="border-t border-blue-50 bg-blue-50/50 p-4 sm:p-5 text-start dark:border-slate-800 dark:bg-slate-800/50 shrink-0">
                <Quote size={20} className="text-blue-600 opacity-60 mb-2" aria-hidden="true" />
                
                <Text 
                  variant="body" 
                  className={cn(
                    "italic font-medium text-slate-700 dark:text-slate-300",
                    isAr ? "text-lg sm:text-xl leading-relaxed" : "text-base sm:text-lg leading-relaxed"
                  )}
                >
                  “{t("quote")}”
                </Text>
                
                <div className="mt-4 flex flex-wrap items-baseline gap-2">
                  <Text variant="small" className={cn("font-bold text-slate-900 dark:text-white", isAr && "text-base")}>
                    {t("author")}
                  </Text>
                  <span className="text-slate-300 dark:text-slate-700 text-xs hidden sm:inline-block">•</span>
                  <Text variant="caption" className={cn("text-blue-600 dark:text-blue-400 font-medium", isAr && "text-sm")}>
                    {t("role")}
                  </Text>
                </div>
              </div>
            </motion.div>
          </div>

          {/* TEXT COLUMN */}
          <TextWrapper
            {...(animate
              ? {
                  variants: staggerContainer,
                  initial: "hidden",
                  whileInView: "visible",
                  viewport: { once: true, margin: "-100px" },
                }
              : {})}
            className="order-1 flex flex-col items-start gap-8 text-start md:order-2"
          >
            <motion.div {...(animate ? { variants: slideUp } : {})} className="flex flex-col gap-2">
              {/* INCREASED EYEBROW SIZE: Made 'من نحن' text-xl in Arabic to match 'مهمتنا' */}
              <Heading level="h6" className={cn("text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider", isAr ? "text-xl" : "text-sm")}>
                {t("eyebrow")}
              </Heading>
              <Heading level="h2" className={cn("text-slate-900 dark:text-white", isAr && "leading-tight")}>
                {t("title")}
              </Heading>
            </motion.div>

            <motion.div {...(animate ? { variants: slideUp } : {})} className="flex flex-col gap-4">
              <Text 
                variant="body" 
                className={cn(
                  "text-slate-600 dark:text-slate-300", 
                  isAr ? "text-lg sm:text-xl leading-loose font-medium" : "sm:text-lg leading-relaxed"
                )}
              >
                {t("paragraph1")}
              </Text>
            </motion.div>

            {/* Mission & Vision - Stacked Vertically with Icons */}
            <motion.div {...(animate ? { variants: slideUp } : {})} className="w-full grid grid-cols-1 gap-5 mt-2">
              
              {/* Mission Card */}
              <Card interactive className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 border-blue-100 bg-white/60 shadow-sm hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900/60">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-50 text-blue-600 shrink-0 dark:bg-blue-900/30 dark:text-blue-400 mt-1">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1">
                  <Heading level="h5" as="h3" className={cn("text-blue-700 dark:text-blue-400", isAr ? "text-xl font-bold" : "text-lg")}>
                    {t("missionTitle")}
                  </Heading>
                  <Text 
                    variant="body" 
                    className={cn(
                      "mt-2 text-slate-600 dark:text-slate-300", 
                      isAr ? "text-lg leading-relaxed font-medium" : "text-base leading-relaxed"
                    )}
                  >
                    {t("missionDesc")}
                  </Text>
                </div>
              </Card>

              {/* Vision Card */}
              <Card interactive className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 border-blue-100 bg-white/60 shadow-sm hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900/60">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-50 text-blue-600 shrink-0 dark:bg-blue-900/30 dark:text-blue-400 mt-1">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1">
                  <Heading level="h5" as="h3" className={cn("text-blue-700 dark:text-blue-400", isAr ? "text-xl font-bold" : "text-lg")}>
                    {t("visionTitle")}
                  </Heading>
                  <Text 
                    variant="body" 
                    className={cn(
                      "mt-2 text-slate-600 dark:text-slate-300", 
                      isAr ? "text-lg leading-relaxed font-medium" : "text-base leading-relaxed"
                    )}
                  >
                    {t("visionDesc")}
                  </Text>
                </div>
              </Card>

            </motion.div>
          </TextWrapper>
        </div>
      </Section>
    </div>
  );
}