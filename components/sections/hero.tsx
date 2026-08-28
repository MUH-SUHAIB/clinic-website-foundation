"use client";

import { ShieldCheck, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { LinkButton } from "@/components/ui/button";

import {
  staggerContainer,
  fadeIn,
  slideUp,
  duration,
  easing,
} from "@/lib/motion";

export function Hero({ animate = true }: { animate?: boolean }) {
  const t = useTranslations("Hero");
  const TextWrapper = animate ? motion.div : "div";

  return (
    <div className="relative overflow-hidden" id="home">
      {/* Soft Gradient Background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-secondary),var(--color-background)_65%)]" />
        <div className="absolute -top-24 -start-24 h-72 w-72 rounded-full bg-primary opacity-10 blur-3xl" />
        <div className="absolute -end-16 top-1/3 h-64 w-64 rounded-full bg-accent opacity-10 blur-3xl" />
      </div>

      <Section className="pt-24 md:pt-32 pb-12" align="start">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:items-stretch">
          {/* TEXT COLUMN */}
          <TextWrapper
            {...(animate
              ? { variants: staggerContainer, initial: "hidden", animate: "visible" }
              : {})}
            className="order-2 flex flex-col items-center gap-4 text-center md:order-1 md:items-start md:text-start md:py-8 lg:py-12"
          >
            <motion.div {...(animate ? { variants: fadeIn } : {})}>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-5 py-2 text-sm font-bold text-blue-700 shadow-sm backdrop-blur-sm">
                <ShieldCheck size={18} className="text-blue-600" aria-hidden="true" />
                {t("badge")}
              </span>
            </motion.div>

            <motion.div {...(animate ? { variants: slideUp } : {})}>
              <Heading level="h1">{t("headline")}</Heading>
            </motion.div>

            <motion.div {...(animate ? { variants: slideUp } : {})}>
              <Text variant="body" className="max-w-md font-medium text-primary">
                {t("subtitle")}
              </Text>
            </motion.div>

            <motion.div {...(animate ? { variants: slideUp } : {})}>
              <Text variant="small" className="max-w-md">
                {t("description")}
              </Text>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              {...(animate ? { variants: slideUp } : {})}
              className="mt-4 flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:justify-start"
            >
              <LinkButton
                href="tel:+971502388626"
                variant="primary"
                size="lg"
                icon={<Phone size={18} />}
                className="min-h-[48px] w-full whitespace-nowrap !rounded-full !bg-blue-700 px-6 py-3.5 !font-semibold !text-sm !text-white !shadow-md !shadow-blue-700/20 !transition-all !duration-300 hover:-translate-y-0.5 hover:!bg-blue-800 hover:!shadow-lg hover:!shadow-blue-700/30 sm:w-auto sm:!text-base"
              >
                {t("primaryCta")}
              </LinkButton>

              <LinkButton
                href="https://wa.me/971563564165"
                variant="outline"
                size="lg"
                icon={<MessageCircle size={18} />}
                className="min-h-[48px] w-full whitespace-nowrap !rounded-full !border !border-transparent !bg-[#25D366] px-6 py-3.5 !font-semibold !text-sm !text-white !shadow-md !shadow-[#25D366]/20 !transition-all !duration-300 hover:-translate-y-0.5 hover:!bg-[#20bd5a] hover:!shadow-lg hover:!shadow-[#25D366]/40 sm:w-auto sm:!text-base"
              >
                {t("secondaryCta")}
              </LinkButton>
            </motion.div>
          </TextWrapper>

          {/* HERO IMAGE */}
          <motion.div
            initial={animate ? { opacity: 0, scale: 1.06, y: 20 } : undefined}
            animate={animate ? { opacity: 1, scale: 1, y: 0 } : undefined}
            transition={{ duration: duration.slow, ease: easing }}
            className="relative order-1 flex h-full w-full items-center justify-center md:order-2"
          >
            <div className="absolute inset-4 -z-10 rounded-[2rem] bg-primary opacity-20 blur-2xl" aria-hidden="true" />
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-full group"
            >
              <img
                src="/baghdad/hero-reception.png"
                alt="Reception area of Baghdad Medical Center"
                className="w-full rounded-[2rem] object-cover shadow-xl transition-transform duration-700 group-hover:scale-[1.02] md:aspect-[4/3] lg:aspect-[1.1/1]"
              />
            </motion.div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}