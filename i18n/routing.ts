import { defineRouting } from "next-intl/routing";

// Single source of truth for i18n routing.
// proxy.ts, i18n/request.ts, and i18n/navigation.ts all read from this
// so locale config never drifts out of sync across the app.
export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",

  // Locale prefix is always present in the URL: /en, /ar
  // Keeps routing unambiguous and avoids default-locale detection edge cases.
  localePrefix: "always",

  // Basic pathnames map — safe to extend per-clinic later for localized
  // SEO-friendly slugs (e.g. "/about" -> "/ar/من-نحن") without touching
  // middleware or layout code.
  pathnames: {
    "/": "/",
    "/services": "/services",
    "/doctors": "/doctors",
  },
});

export type Locale = (typeof routing.locales)[number];

// RTL locales — used by layout logic to set dir="rtl".
// Kept separate from `routing` since text direction is a presentation
// concern, not a routing concern.
export const rtlLocales: Locale[] = ["ar"];

export function getDirection(locale: Locale): "rtl" | "ltr" {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}
