"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";

import { staggerContainer, slideUp } from "@/lib/motion";

// Static image mapping - untouched
const serviceItems = [
  { id: "service1", image: "/baghdad/services/general-practice.jpg" },
  { id: "service2", image: "/baghdad/services/pediatrics.jpg" },
  { id: "service3", image: "/baghdad/services/obstetrics-gynecology.jpg" },
  { id: "service4", image: "/baghdad/services/dentistry.jpg" },
  { id: "service5", image: "/baghdad/services/skincare.jpg" },
  { id: "service6", image: "/baghdad/services/hijama-prp.jpg" },
];

export function Services({ animate = true }: { animate?: boolean }) {
  const t = useTranslations("Services");
  const Container = animate ? motion.div : "div";

  return (
    <Section id="services" className="bg-slate-50/50 py-16 md:py-24 dark:bg-slate-900/50" align="center">
      <Container
        {...(animate
          ? {
              variants: staggerContainer,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true, margin: "-100px" },
            }
          : {})}
        className="flex w-full flex-col items-center gap-12"
      >
        {/* TEXT HEADER */}
        <motion.div {...(animate ? { variants: slideUp } : {})} className="flex max-w-3xl flex-col items-center text-center gap-4">
          <Heading level="h6" className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-sm">
            {t("eyebrow")}
          </Heading>
          <Heading level="h2" className="text-slate-900 dark:text-white">
            {t("title")}
          </Heading>
          <Text variant="body" className="text-slate-600 dark:text-slate-300 sm:text-lg">
            {t("description")}
          </Text>
        </motion.div>

        {/* SERVICES GRID */}
        <motion.div {...(animate ? { variants: slideUp } : {})} className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {serviceItems.map((item) => (
            <Card
              key={item.id}
              interactive
              className="flex flex-col overflow-hidden border-blue-100 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={t(`items.${item.id}.title`)}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 text-start">
                <Heading level="h4" as="h3" className="mb-3 text-blue-700 dark:text-blue-400">
                  {t(`items.${item.id}.title`)}
                </Heading>
                <Text variant="small" className="text-slate-600 dark:text-slate-300">
                  {t(`items.${item.id}.description`)}
                </Text>
              </div>
            </Card>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}