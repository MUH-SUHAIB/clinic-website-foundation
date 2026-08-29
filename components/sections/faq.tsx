"use client";

import { useState, useId, memo } from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown, MessageCircle, PhoneCall } from "lucide-react";
import { Section } from "./section-shell";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { staggerContainer, slideUp, duration, easing } from "@/lib/motion";

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

export interface FAQSupport {
  title: string;
  description: string;
  phoneLabel: string;
  phoneLink: string;
  whatsappLabel: string;
  whatsappLink: string;
}

export interface FAQContent {
  id?: string;
  allowMultiple?: boolean;
  animate?: boolean;
  className?: string;
}

interface AccordionCardProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
  animate: boolean;
  baseId: string;
}

const FAQAccordionCard = memo(function FAQAccordionCard({
  item,
  index,
  isOpen,
  onToggle,
  animate,
  baseId,
}: AccordionCardProps) {
  const panelId = `${baseId}-panel-${index}`;
  const buttonId = `${baseId}-button-${index}`;

  const motionProps = animate
    ? {
        variants: slideUp as Variants,
        whileHover: { y: -2 },
        transition: { duration: duration.base, ease: easing },
      }
    : {};

  return (
    <motion.div {...motionProps} className="group relative h-fit">
      <div
        className={cn(
          "pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-400/40 via-indigo-300/30 to-rose-300/40 blur-md transition-opacity duration-300 dark:from-blue-600/30 dark:to-indigo-600/30",
          isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border bg-white/90 backdrop-blur-md transition-all duration-300 dark:bg-slate-900/90",
          isOpen
            ? "border-blue-400 shadow-[0_10px_30px_-10px_rgba(59,130,246,0.18)] dark:border-blue-500/80"
            : "border-blue-200/80 hover:border-blue-300 hover:shadow-[0_8px_25px_-8px_rgba(59,130,246,0.12)] dark:border-blue-900/50 dark:hover:border-blue-700"
        )}
      >
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
          className="flex w-full items-center justify-between gap-4 p-5 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset sm:p-6"
        >
          <Text
            variant="body"
            as="span"
            className={cn(
              "min-w-0 pe-2 font-semibold leading-relaxed transition-colors duration-200",
              isOpen
                ? "text-blue-700 dark:text-blue-400"
                : "text-slate-900 group-hover:text-blue-700 dark:text-slate-100 dark:group-hover:text-blue-400"
            )}
          >
            {item.question}
          </Text>

          <span
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
              isOpen
                ? "bg-blue-100/80 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300"
                : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-blue-950 dark:group-hover:text-blue-400"
            )}
          >
            <ChevronDown
              size={18}
              aria-hidden="true"
              className={cn(
                "transition-transform duration-300 ease-out",
                isOpen && "rotate-180"
              )}
            />
          </span>
        </button>

        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="border-t border-slate-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 dark:border-slate-800/60">
              <Text
                variant="small"
                className="leading-relaxed text-slate-600 dark:text-slate-300"
              >
                {item.answer}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

interface FAQSupportCTAProps {
  support: {
    title: string;
    description: string;
    phoneLabel: string;
    phoneLink: string;
    whatsappLabel: string;
    whatsappLink: string;
  };
  animate: boolean;
}

const FAQSupportCTA = memo(function FAQSupportCTA({
  support,
  animate,
}: FAQSupportCTAProps) {
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: 0.2 },
      }
    : {};

  return (
    <motion.div
      {...motionProps}
      className="relative mt-10 overflow-hidden rounded-2xl border border-blue-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-md sm:mt-12 sm:p-8 dark:border-blue-900/50 dark:bg-slate-900/80"
    >
      <div
        className="pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full bg-blue-400/10 blur-2xl dark:bg-blue-600/10"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-start">
        <div className="max-w-xl">
          <Text
            variant="body"
            className="font-semibold text-slate-900 dark:text-slate-100"
          >
            {support.title}
          </Text>

          <Text
            variant="small"
            className="mt-1.5 leading-relaxed text-slate-600 dark:text-slate-300"
          >
            {support.description}
          </Text>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:shrink-0 sm:flex-row">
          <a
            href={support.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-[#25D366]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <MessageCircle size={18} aria-hidden="true" />
            <span>{support.whatsappLabel}</span>
          </a>

          <a
            href={support.phoneLink}
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <PhoneCall size={18} aria-hidden="true" />
            <span>{support.phoneLabel}</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
});

export function FAQ({
  id = "faq",
  allowMultiple = false,
  animate = false,
  className,
}: FAQContent) {
  const t = useTranslations("FAQ");
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());
  const baseId = useId();

  // Load items dynamically from next-intl
  const itemKeys = ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8"];
  const items: FAQItem[] = itemKeys.map((key) => ({
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }));

  const support = {
    title: t("support.title"),
    description: t("support.description"),
    phoneLabel: t("support.phoneLabel"),
    phoneLink: "tel:+971502388626",
    whatsappLabel: t("support.whatsappLabel"),
    whatsappLink: "https://wa.me/971563564165",
  };

  const handleToggle = (index: number) => {
    setOpenIndexes((prev) => {
      const next = allowMultiple ? new Set(prev) : new Set<number>();
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const gridAnimationProps = animate
    ? {
        variants: staggerContainer as Variants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-60px" },
      }
    : {};

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,241,242,0.5)_15%,rgba(239,246,255,0.6)_45%,rgba(219,234,254,0.3)_80%,transparent_100%)] dark:bg-[linear-gradient(to_bottom,transparent_0%,rgba(30,64,175,0.03)_20%,rgba(30,64,175,0.05)_50%,transparent_100%)]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute top-4 start-1/4 -z-10 h-72 w-72 rounded-full bg-rose-200/20 blur-3xl dark:bg-rose-900/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 end-1/4 -z-10 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-900/10"
        aria-hidden="true"
      />

      <Section
        id={id}
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        animate={animate}
        className="border-none bg-transparent"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />

        <div className="mx-auto w-full max-w-5xl">
          <motion.div
            {...gridAnimationProps}
            className="grid gap-4 md:grid-cols-2 lg:gap-5"
          >
            {items.map((item, index) => (
              <FAQAccordionCard
                key={`${item.question}-${index}`}
                item={item}
                index={index}
                isOpen={openIndexes.has(index)}
                onToggle={handleToggle}
                animate={animate}
                baseId={baseId}
              />
            ))}
          </motion.div>

          <FAQSupportCTA support={support} animate={animate} />
        </div>
      </Section>
    </div>
  );
}