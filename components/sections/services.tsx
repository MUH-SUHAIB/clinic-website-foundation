"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ServiceSummary } from "@/lib/content/services";
import { ServiceGrid } from "@/components/services/service-grid";
import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { staggerContainer, slideUp } from "@/lib/motion";

export function Services({
  services,
  animate = true,
}: {
  services: readonly ServiceSummary[];
  animate?: boolean;
}) {
  const t = useTranslations("Services");
  const reducedMotion = useReducedMotion();
  const shouldAnimate = animate && !reducedMotion;
  const Container = shouldAnimate ? motion.div : "div";

  return (
    <Section id="services" className="bg-slate-50/50 py-16 md:py-24 dark:bg-slate-900/50" align="center">
      <Container
        {...(shouldAnimate
          ? {
              variants: staggerContainer,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true, margin: "-100px" },
            }
          : {})}
        className="flex w-full flex-col items-center gap-12"
      >
        <motion.div {...(shouldAnimate ? { variants: slideUp } : {})} className="flex max-w-3xl flex-col items-center text-center gap-4">
          <p className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-sm">
            {t("eyebrow")}
          </p>
          <Heading level="h2" className="text-slate-900 dark:text-white">
            {t("title")}
          </Heading>
          <Text variant="body" className="text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("description")}
          </Text>
        </motion.div>

        <motion.div {...(shouldAnimate ? { variants: slideUp } : {})} className="w-full">
          <ServiceGrid services={services} />
        </motion.div>

        <Link
          href="/services"
          className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-blue-200 bg-white px-7 py-3 font-semibold text-blue-700 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-4 dark:border-blue-800 dark:bg-slate-900 dark:text-blue-300 dark:hover:bg-blue-950"
        >
          {t("viewAll")}
          <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 rtl:rotate-180" />
        </Link>
      </Container>
    </Section>
  );
}
