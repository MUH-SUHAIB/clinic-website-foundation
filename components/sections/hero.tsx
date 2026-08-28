"use client";

import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { LinkButton } from "@/components/ui/button";
import type { CTAContent, ImageContent } from "./types";
import { staggerContainer, fadeIn, slideUp, duration, easing } from "@/lib/motion";

export interface HeroContent {
  headline: string;
  subtitle: string;
  description?: string;
  primaryCta: CTAContent;
  secondaryCta: CTAContent;
  image: string | ImageContent;
  badge?: string;
  animate?: boolean;
}

function normalizeImage(image: string | ImageContent, fallbackAlt: string): ImageContent {
  return typeof image === "string" ? { src: image, alt: fallbackAlt } : image;
}

export function Hero({
  headline,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  image,
  badge,
  animate = true,
}: HeroContent) {
  const resolvedImage = normalizeImage(image, `${headline} — clinic doctor`);
  const TextWrapper = animate ? motion.div : "div";

  return (
    <div className="relative overflow-hidden">
      {/* Soft Gradient Background */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-secondary),var(--color-background)_65%)]" />
        <div className="absolute -top-24 -start-24 h-72 w-72 rounded-full bg-primary opacity-10 blur-3xl" />
        <div className="absolute -end-16 top-1/3 h-64 w-64 rounded-full bg-accent opacity-10 blur-3xl" />
      </div>

      <Section className="pt-xl md:pt-2xl" align="start">
        <div className="grid grid-cols-1 items-center gap-xl md:grid-cols-2 md:gap-2xl lg:items-stretch">
          <TextWrapper
            {...(animate
              ? { variants: staggerContainer, initial: "hidden", animate: "visible" }
              : {})}
            className="order-2 flex flex-col items-center gap-4 text-center md:order-1 md:items-start md:text-start md:py-8 lg:py-12"
          >
            {/* Trusted Medical Center Badge */}
            {badge && (
              <motion.div {...(animate ? { variants: fadeIn } : {})}>
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-5 py-2 text-sm font-bold text-blue-700 shadow-sm backdrop-blur-sm">
                  <ShieldCheck size={18} className="text-blue-600" aria-hidden />
                  {badge}
                </span>
              </motion.div>
            )}

            {/* Headline & Subtitle */}
            <motion.div {...(animate ? { variants: slideUp } : {})}>
              <Heading level="h1">{headline}</Heading>
            </motion.div>

            <motion.div {...(animate ? { variants: slideUp } : {})}>
              <Text variant="body" className="max-w-md font-medium text-primary">
                {subtitle}
              </Text>
            </motion.div>

            {description && (
              <motion.div {...(animate ? { variants: slideUp } : {})}>
                <Text variant="small" className="max-w-md">
                  {description}
                </Text>
              </motion.div>
            )}

            {/* Responsive & Accessible CTA Buttons */}
            <motion.div
              {...(animate ? { variants: slideUp } : {})}
              className="mt-4 flex w-full flex-col gap-3 sm:flex-row sm:w-auto md:justify-start"
            >
              <LinkButton
                href={primaryCta.href}
                variant={primaryCta.variant ?? "primary"}
                size="lg"
                icon={primaryCta.icon}
                fullWidth
                className="w-full sm:w-auto min-h-[48px] py-3.5 px-6 whitespace-nowrap !rounded-full !font-semibold !text-sm sm:!text-base !shadow-md !shadow-blue-700/20 hover:!shadow-lg hover:!shadow-blue-700/30 !transition-all !duration-300 hover:-translate-y-0.5 !bg-blue-700 hover:!bg-blue-800 !text-white"
              >
                {primaryCta.label}
              </LinkButton>

              <LinkButton
                href={secondaryCta.href}
                variant={secondaryCta.variant ?? "outline"}
                size="lg"
                icon={secondaryCta.icon}
                fullWidth
                className="w-full sm:w-auto min-h-[48px] py-3.5 px-6 whitespace-nowrap !border !border-transparent !bg-[#25D366] !text-white hover:!bg-[#20bd5a] !rounded-full !font-semibold !text-sm sm:!text-base !shadow-md !shadow-[#25D366]/20 hover:!shadow-lg hover:!shadow-[#25D366]/40 !transition-all !duration-300 hover:-translate-y-0.5"
              >
                {secondaryCta.label}
              </LinkButton>
            </motion.div>
          </TextWrapper>

          {/* Responsive Animated Hero Image */}
          <motion.div
            initial={animate ? { opacity: 0, scale: 1.06, y: 20 } : undefined}
            animate={animate ? { opacity: 1, scale: 1, y: 0 } : undefined}
            transition={{ duration: duration.slow, ease: easing }}
            className="relative order-1 md:order-2 flex w-full h-full items-center justify-center"
          >
            <div
              className="absolute inset-4 -z-10 rounded-[2rem] bg-primary opacity-20 blur-2xl"
              aria-hidden
            />
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-full relative group"
            >
              <img
                src={resolvedImage.src}
                alt={resolvedImage.alt}
                className="w-full object-cover rounded-[2rem] shadow-xl md:aspect-[4/3] lg:aspect-[1.1/1] transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </motion.div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}