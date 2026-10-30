"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  Navigation,
} from "lucide-react";
import { Section } from "./section-shell";
import { BidiText } from "@/components/ui/bidi-text";
import { Heading, Text } from "@/components/ui/typography";
import { LinkButton } from "@/components/ui/button";

export interface WorkingHoursRow {
  days: string;
  hours: string;
  dayKey?: "satThu" | "fri";
  hoursKey?: "satThuHours" | "friHours";
}

export interface ContactContent {
  id?: string;
  phone: string;
  phoneHref?: string;
  mobile?: string;
  mobileHref?: string;
  whatsapp: string;
  whatsappLabel?: string;
  email?: string;
  address: string;
  mapLink?: string;
  workingHours: WorkingHoursRow[];
  mapEmbedSrc?: string;
  animate?: boolean;
}

function useClinicStatus() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const checkStatus = () => {
      const uaeTime = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Dubai" })
      );
      const day = uaeTime.getDay();
      const hour = uaeTime.getHours();
      const minute = uaeTime.getMinutes();
      const timeValue = hour + minute / 60;

      let open = false;
      if (day === 5) {
        open =
          (timeValue >= 8.5 && timeValue < 11) ||
          (timeValue >= 15 && timeValue < 22);
      } else {
        open = timeValue >= 8.5 && timeValue < 22;
      }
      setIsOpen(open);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return isOpen;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

export function Contact({
  id = "contact",
  phone,
  phoneHref,
  mobile,
  mobileHref,
  whatsapp,
  whatsappLabel,
  email,
  address,
  mapLink,
  workingHours,
  mapEmbedSrc,
  animate = true,
}: ContactContent) {
  const t = useTranslations("Contact");
  const isOpen = useClinicStatus();
  const locale = useLocale();
  const localizedAddress = t("address");

  const landlineTel = `tel:${phoneHref ?? phone.replace(/\s+/g, "")}`;
  const mobileTel = mobile ? `tel:${mobileHref ?? mobile.replace(/\s+/g, "")}` : undefined;
  const whatsappUrl = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`;

  const ContainerWrapper = animate ? motion.div : "div";
  const ItemWrapper = animate ? motion.div : "div";

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-transparent via-blue-50/40 to-pink-50/40 dark:via-blue-950/20 dark:to-pink-950/20 py-8 sm:py-16">
      <div className="pointer-events-none absolute -top-40 left-0 h-[600px] w-[600px] rounded-full bg-blue-300/15 dark:bg-blue-800/15 blur-[120px] mix-blend-multiply dark:mix-blend-overlay" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-pink-300/15 dark:bg-pink-800/15 blur-[120px] mix-blend-multiply dark:mix-blend-overlay" />

      <Section id={id} eyebrow={t("eyebrow")} title={t("title")} description={t("description")} align="center" animate={false}>
        <ContainerWrapper
          {...(animate
            ? {
                variants: containerVariants,
                initial: "hidden",
                whileInView: "visible",
                viewport: { once: true, margin: "-80px" },
              }
            : {})}
          className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch text-start relative z-10"
        >
          <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8">
            <ItemWrapper {...(animate ? { variants: itemVariants } : {})}>
              <div className="group p-7 rounded-[32px] bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-blue-200/60 dark:border-blue-800/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-500">
                <div className="flex items-center gap-2 mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-blue-500 opacity-80" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {t("instantConnect")}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4">
                  <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <LinkButton
                      href={landlineTel}
                      variant="primary"
                      icon={<Phone size={18} className="transition-transform duration-300 group-hover:rotate-12" />}
                      className="rounded-[20px] px-6 py-3.5 shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all duration-300"
                    >
                      <bdi dir="ltr" className="font-medium text-[15px]">{phone}</bdi>
                    </LinkButton>
                  </motion.div>

                  {mobile && mobileTel && (
                    <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <LinkButton
                        href={mobileTel}
                        variant="primary"
                        icon={<Phone size={18} className="transition-transform duration-300 group-hover:rotate-12" />}
                        className="rounded-[20px] px-6 py-3.5 shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all duration-300"
                      >
                        <bdi dir="ltr" className="font-medium text-[15px]">{mobile}</bdi>
                      </LinkButton>
                    </motion.div>
                  )}

                  <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <LinkButton
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      icon={<MessageCircle size={18} className="transition-transform duration-300 group-hover:scale-110 text-[#25D366]" />}
                      className="rounded-[20px] px-6 py-3.5 bg-[#25D366]/5 hover:bg-[#25D366]/10 border-[#25D366]/40 hover:border-[#25D366] text-[#128C7E] dark:text-[#25D366] transition-all duration-300"
                    >
                      <bdi dir="ltr" className="font-medium text-[15px]">{whatsappLabel ?? whatsapp}</bdi>
                    </LinkButton>
                  </motion.div>
                </div>
              </div>
            </ItemWrapper>

            <ItemWrapper {...(animate ? { variants: itemVariants } : {})}>
              <div className="group p-7 rounded-[32px] bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-blue-200/60 dark:border-blue-800/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-500">
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30">
                    <MapPin size={24} />
                  </div>
                  <div className="flex flex-col gap-2 flex-1 pt-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t("location")}</span>
                    {mapLink ? (
                      <a
                        href={mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-start gap-2 text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <span className="text-[15px] font-medium leading-relaxed"><BidiText>{localizedAddress}</BidiText></span>
                        <Navigation size={16} className="mt-0.5 shrink-0 text-blue-500 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 rtl:-scale-x-100" />
                      </a>
                    ) : (
                      <Text variant="body" className="text-[15px] font-medium leading-relaxed text-foreground">
                        {localizedAddress}
                      </Text>
                    )}
                  </div>
                </div>
              </div>
            </ItemWrapper>

            <ItemWrapper {...(animate ? { variants: itemVariants } : {})}>
              <div className="group p-7 rounded-[32px] bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-blue-200/60 dark:border-blue-800/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-500">
                <div className="flex min-w-0 flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30">
                      <Clock size={24} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t("workingHours")}</span>

                      {isOpen === null ? null : isOpen ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50/90 dark:bg-emerald-500/10 border border-emerald-400 dark:border-emerald-500/40 px-3.5 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          {t("openNow")}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-rose-50/90 dark:bg-rose-500/10 border border-rose-400 dark:border-rose-500/40 px-3.5 py-1.5 text-xs font-bold text-rose-700 dark:text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
                          <span className="relative flex h-2 w-2">
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                          </span>
                          {t("closedNow")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="divide-y divide-blue-100/50 dark:divide-blue-900/30">
                    {workingHours.map((row, i) => (
                      <div key={i} className="flex flex-col items-start gap-2 py-3 first:pt-1 last:pb-0 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <span className="shrink-0 font-medium text-slate-700 dark:text-slate-200">{row.dayKey ? t(`days.${row.dayKey}`) : row.days}</span>
                        <span className={`flex max-w-full flex-col items-start gap-1 text-start font-mono leading-loose sm:flex-row sm:flex-wrap sm:justify-end sm:gap-x-3 sm:text-sm sm:leading-loose ${
                          locale === "ar"
                            ? "text-sm font-medium text-slate-700 dark:text-slate-200 sm:font-normal sm:text-slate-500 sm:dark:text-slate-400"
                            : "text-[13px] text-slate-500 dark:text-slate-400"
                        }`}>
                          {row.hoursKey
                            ? React.Children.toArray(t.rich(`hours.${row.hoursKey}`, {
                                range: (chunks) => <bdi dir={locale === "ar" ? "rtl" : "ltr"} className="inline-block whitespace-nowrap">{chunks}</bdi>,
                                timeValue: (chunks) => <bdi dir="ltr" className="inline-block">{chunks}</bdi>,
                              })).filter((part) => typeof part !== "string" || !/^[\s,،]+$/.test(part))
                            : <bdi dir="ltr">{row.hours}</bdi>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ItemWrapper>
          </div>

          <ItemWrapper
            {...(animate ? { variants: itemVariants } : {})}
            className="lg:col-span-5 flex flex-col h-full min-h-[380px]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[34px] p-[1.5px] bg-gradient-to-br from-blue-300 via-purple-200 to-pink-300 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.25)] transition-all duration-500 group">
              <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-background">
                {mapEmbedSrc ? (
                  <>
                    <iframe
                      src={mapEmbedSrc.replace(/([?&])hl=[^&]*/, `$1hl=${locale}`)}
                      title={t("mapTitle")}
                      className="h-full w-full border-0 scale-[1.02] group-hover:scale-100 transition-transform duration-700 ease-out"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    {mapLink && (
                      <div className="absolute bottom-6 inset-x-6 flex justify-center pointer-events-none">
                        <motion.a
                          whileHover={{ scale: 1.05, y: -3 }}
                          whileTap={{ scale: 0.96 }}
                          href={mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pointer-events-auto inline-flex items-center gap-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-3 text-sm font-semibold text-foreground shadow-xl shadow-black/5 border border-slate-200/60 dark:border-slate-700/60 hover:text-blue-600 transition-all duration-300"
                        >
                          <span>{t("getDirections")}</span>
                          <ExternalLink size={16} className="text-blue-500" />
                        </motion.a>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex h-full min-h-[320px] w-full items-center justify-center bg-slate-50 dark:bg-slate-900 p-6 text-center">
                    <Heading level="h6" className="text-slate-400">{t("mapUnavailable")}</Heading>
                  </div>
                )}
              </div>
            </div>
          </ItemWrapper>
        </ContainerWrapper>
      </Section>
    </div>
  );
}