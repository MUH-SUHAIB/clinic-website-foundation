import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";

import {
  NextIntlClientProvider,
  hasLocale,
} from "next-intl";
import {
  getMessages,
  setRequestLocale,
} from "next-intl/server";

import {
  routing,
  getDirection,
  type Locale,
} from "@/i18n/routing";

import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "@/components/sections/header";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Pre-renders /en and /ar at build time
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://baghdadmedicalcenter.ae"),
  title: {
    default: "Baghdad Medical Center | مركز بغداد الطبي",
    template: "%s | Baghdad Medical Center",
  },
  description:
    "Compassionate, multispecialty healthcare for individuals and families in Al Madam, Sharjah. مركز بغداد الطبي - رعاية صحية متكاملة في المدام، الشارقة.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-logo.png", sizes: "any" },
      { url: "/favicon-logo.png", type: "image/png" },
    ],
    shortcut: "/favicon-logo.png",
    apple: "/apple-touch-logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  console.log("AVAILABLE TRANSLATIONS:", Object.keys(messages));
  const dir = getDirection(locale as Locale);

  // Structured JSON-LD Data for Google Sitelinks & Search Knowledge Graph
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": locale === "ar" ? "مركز بغداد الطبي" : "Baghdad Medical Center",
    "alternateName": locale === "ar" ? "Baghdad Medical Center" : "مركز بغداد الطبي",
    "url": `https://baghdadmedicalcenter.ae/${locale}`,
    "logo": "https://baghdadmedicalcenter.ae/favicon-logo.png",
    "image": "https://baghdadmedicalcenter.ae/favicon-logo.png",
    "description":
      locale === "ar"
        ? "مركز طبي متعدد التخصصات يقدم أفضل الخدمات الطبية والرعاية الصحية في المدام، الشارقة."
        : "Multispecialty Medical Center providing compassionate, modern healthcare in Al Madam, Sharjah.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Al Madam",
      "addressRegion": "Sharjah",
      "addressCountry": "AE"
    },
    "telephone": "+971502388626",
    "priceRange": "$$"
  };

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <Header />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}