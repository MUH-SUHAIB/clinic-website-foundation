"use client";

import { ContactAction } from "@/components/contact/contact-action";
import { usePathname } from "@/i18n/navigation";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const locale = useLocale();
  const nextLocale = locale === "en" ? "ar" : "en";
  const pathname = usePathname();
  const languageHref = `/${nextLocale}${pathname === "/" ? "" : pathname}`;
  const homeHref = `/${locale}`;
  const t = useTranslations("Navigation");
  const tServices = useTranslations("Services");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: t("about"), href: `${homeHref}#about` },
    { name: t("services"), href: `${homeHref}/services` },
    { name: t("doctors"), href: `${homeHref}#doctors` },
    { name: t("facilities"), href: `${homeHref}#facilities` },
    { name: t("reviews"), href: `${homeHref}#testimonials` },
    { name: t("insurance"), href: `${homeHref}#insurance` },
    { name: t("faq"), href: `${homeHref}#faq` },
    { name: t("contact"), href: `${homeHref}#contact` },
  ];

  return (
    <>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-5 focus:py-3 focus:text-blue-800 focus:ring-2 focus:ring-blue-700">
      {tServices("skipToContent")}
    </a>
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "top-4 px-4 md:px-6"
          : "top-0 px-0 bg-[var(--color-secondary,#eaf0f6)]"
      }`}
    >
      <div
        className={`container mx-auto flex items-center justify-between gap-4 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl border border-blue-100/60 shadow-[0_8px_30px_-10px_rgba(59,130,246,0.15)] py-2.5 px-4 md:px-5 rounded-[2rem]"
            : "bg-transparent border-transparent shadow-none py-4 md:py-5 px-5 md:px-8 rounded-none"
        }`}
      >
        {/* Logo */}
        <a
          href={`/${locale}`}
          className="flex items-center shrink-0 cursor-pointer"
        >
          <Image
            src="/baghdad/logo.png"
            alt="Baghdad Medical Center"
            width={120}
            height={42}
            className="h-auto w-[100px] md:w-[120px] rounded-xl"
            priority
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === "/services" && link.href === `${homeHref}/services` ? "page" : undefined}
              className="relative text-slate-800 hover:text-blue-700 text-xs xl:text-sm font-semibold transition-colors py-1 group"
            >
              {link.name}

              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-red-400 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out rounded-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
          {/* Language Switcher */}
          <Link
            href={languageHref}
            className="flex items-center gap-1 text-slate-600 hover:text-blue-700 text-xs xl:text-sm font-semibold transition-colors px-1.5 py-1"
          >
            <bdi dir={nextLocale === "ar" ? "rtl" : "ltr"} lang={nextLocale}>
              {nextLocale === "ar" ? "عربي" : "English"}
            </bdi>
            <Globe className="w-3.5 h-3.5" />
          </Link>

          {/* Call */}
          <ContactAction kind="call" appearance="header">{t("callNow")}</ContactAction>

          {/* WhatsApp */}
          <ContactAction kind="whatsapp" appearance="header">{t("whatsapp")}</ContactAction>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden p-2 text-slate-800 hover:text-blue-700 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={t("toggleMenu")}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-panel"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-[calc(100%+0.75rem)] left-4 right-4 bg-white/95 backdrop-blur-2xl border border-blue-100/60 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] py-5 px-4 flex flex-col gap-1.5 lg:hidden rounded-2xl origin-top max-h-[calc(100dvh-8rem)] overflow-y-auto overscroll-contain"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === "/services" && link.href === `${homeHref}/services` ? "page" : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-800 text-base font-semibold p-3 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all"
              >
                {link.name}
              </Link>
            ))}

            <div className="w-full h-px bg-blue-50 my-3" />

            {/* Language Switcher */}
            <Link
              href={languageHref}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 text-slate-700 font-semibold p-3 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"
            >
              <Globe className="w-5 h-5" />

              <bdi dir={nextLocale === "ar" ? "rtl" : "ltr"} lang={nextLocale}>
                {nextLocale === "ar" ? "العربية" : "English"}
              </bdi>
            </Link>

            <div className="flex flex-col gap-3 mt-2">
              {/* Call */}
              <ContactAction kind="call" appearance="menu">{t("callNow")}</ContactAction>

              {/* WhatsApp */}
              <ContactAction kind="whatsapp" appearance="menu">{t("whatsapp")}</ContactAction>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}
