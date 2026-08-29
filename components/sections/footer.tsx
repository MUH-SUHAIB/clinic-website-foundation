"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
  Facebook,
} from "lucide-react";
import { Heading, Text } from "@/components/ui/typography";
import type { ImageContent, IconContent } from "./types";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocialLink {
  label: string;
  href: string;
  icon: IconContent;
}

export interface FooterContent {
  logo?: ImageContent;
  phone?: string;
  phoneHref?: string;
  mobile?: string;
  mobileHref?: string;
  whatsapp?: string;
  whatsappHref?: string;
  email?: string;
  addressHref?: string;
  socialLinks?: FooterSocialLink[];
}

export function Footer({
  logo,
  phone,
  phoneHref,
  mobile,
  mobileHref,
  whatsapp,
  whatsappHref,
  email,
  addressHref,
  socialLinks,
}: FooterContent) {
  const tFooter = useTranslations("Footer");
  const tNav = useTranslations("Navigation");

  const clinicName = tFooter("clinicName");
  const address = tFooter.raw("address") as string[];

  const quickLinks = [
    { label: tNav("about"), href: "#about" },
    { label: tNav("services"), href: "#services" },
    { label: tNav("doctors"), href: "#doctors" },
    { label: tNav("facilities"), href: "#facilities" },
    { label: tNav("reviews"), href: "#testimonials" },
    { label: tNav("insurance"), href: "#insurance" },
    { label: tNav("faq"), href: "#faq" },
    { label: tNav("contact"), href: "#contact" },
  ];

  const whatsappUrl = whatsappHref || (whatsapp ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}` : "");
  const addressUrl = addressHref || "https://maps.google.com/?q=Baghdad+Medical+Center+Al+Madam+Sharjah";

  const socialWithBrand = [
    ...(socialLinks || []).map(social => ({
      ...social,
      isInstagram: social.label.toLowerCase() === "instagram",
    })),
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-pink-50/40 dark:from-slate-950 dark:via-blue-950/20 dark:to-pink-950/20 pt-24 pb-12">
      <div className="pointer-events-none absolute top-10 left-10 h-[500px] w-[500px] rounded-full bg-blue-300/15 dark:bg-blue-800/15 blur-[120px] mix-blend-multiply dark:mix-blend-overlay" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-[500px] w-[500px] rounded-full bg-pink-300/15 dark:bg-pink-800/15 blur-[120px] mix-blend-multiply dark:mix-blend-overlay" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 items-stretch text-start">
          
          {/* 1. Brand & Socials Card */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-blue-200/60 dark:border-blue-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 flex flex-col justify-between group">
            <div className="flex flex-col gap-6">
              {logo && (
                <div className="inline-block p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-900/50 w-fit">
                  <img src={logo.src} alt={logo.alt} loading="lazy" className="h-14 w-auto object-contain" />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Heading level="h5" as="h3" className="font-semibold tracking-tighter text-foreground">
                  {clinicName}
                </Heading>
                <Text variant="small" className="text-muted-foreground leading-relaxed">
                  {tFooter("tagline")}
                </Text>
              </div>
            </div>

            {socialLinks && socialLinks.length > 0 && (
              <div className="flex items-center gap-3 pt-6 border-t border-blue-100/60 dark:border-blue-900/40">
                <Heading level="h6" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 m-0">
                  {tFooter("followUs")}
                </Heading>

                <div className="flex items-center gap-3">
                  {socialWithBrand.map((social, i) => {
                    const isInstagram = social.isInstagram;

                    return (
                      <motion.a
                        key={i}
                        href={social.href}
                        aria-label={social.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.12, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-300 ${
                          isInstagram
                            ? "bg-pink-50 dark:bg-pink-500/15 border-pink-200 dark:border-pink-800/60 text-pink-600 dark:text-pink-400 hover:bg-pink-600 hover:text-white hover:border-pink-600 hover:shadow-xl hover:shadow-pink-500/30"
                            : "bg-blue-50 dark:bg-blue-500/15 border-blue-200 dark:border-blue-800/60 text-[#1877F2] dark:text-blue-400 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-xl hover:shadow-blue-500/30"
                        }`}
                      >
                        <span aria-hidden>{social.icon}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 2. Quick Links Card */}
          <div className="lg:col-span-3 p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-blue-200/60 dark:border-blue-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 opacity-80" />
              <Heading level="h6" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 m-0">
                {tFooter("quickLinks")}
              </Heading>
            </div>
            <nav aria-label="Quick links" className="flex flex-col gap-3">
              {quickLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  className="group flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </nav>
          </div>

          {/* 3. Contact Information Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-blue-200/60 dark:border-blue-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 opacity-80" />
              <Heading level="h6" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 m-0">
                {tFooter("contactInfo")}
              </Heading>
            </div>

            <div className="flex flex-col gap-4">
              {whatsapp && (
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/item flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 transition-all duration-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all duration-300 shadow-sm">
                    <MessageCircle size={18} aria-hidden />
                  </div>
                  <span className="dir-ltr">{whatsapp}</span>
                </motion.a>
              )}

              {phone && (
                <motion.a
                  href={`tel:${phoneHref ?? phone}`}
                  className="group/item flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300">
                    <Phone size={18} aria-hidden />
                  </div>
                  <span className="dir-ltr">{phone}</span>
                </motion.a>
              )}

              {mobile && (
                <motion.a
                  href={`tel:${mobileHref ?? mobile}`}
                  className="group/item flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300">
                    <Phone size={18} aria-hidden />
                  </div>
                  <span className="dir-ltr">{mobile}</span>
                </motion.a>
              )}

              {email && (
                <motion.a
                  href={`mailto:${email}`}
                  className="group/item flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300">
                    <Mail size={18} aria-hidden />
                  </div>
                  <span>{email}</span>
                </motion.a>
              )}

              {address && address.length > 0 && (
                <motion.a
                  href={addressUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/item flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 pt-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300">
                    <MapPin size={18} aria-hidden />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {address.map((line, i) => (
                      <span
                        key={i}
                        className={
                          i === 0
                            ? "font-semibold text-foreground group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors"
                            : "text-xs text-slate-500 dark:text-slate-400"
                        }
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                </motion.a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-blue-200/50 dark:border-blue-900/40 text-center">
          <Text variant="caption" className="text-slate-500 dark:text-slate-400 font-medium">
            {tFooter("copyright", { year: currentYear })}
          </Text>
        </div>
      </div>
    </footer>
  );
}