import { clinicSchema, serializeJsonLd } from "@/lib/seo/structured-data";
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
import { siteSeo } from "@/lib/site-seo";
import { FloatingContact } from "@/components/contact/floating-contact";

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
};

export const metadata: Metadata = {
  metadataBase: new URL(siteSeo.origin),
  title: {
    default: "Baghdad Medical Center | مركز بغداد الطبي",
    template: "%s | Baghdad Medical Center",
  },
  description:
    "Compassionate, multispecialty healthcare for individuals and families in Al Madam, Sharjah. مركز بغداد الطبي - رعاية صحية متكاملة في المدام، الشارقة.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-logo.png", sizes: "512x512" },
      { url: "/favicon-logo.png", type: "image/png" },
    ],
    shortcut: "/favicon-logo.png",
    apple: "/apple-touch-logo.png",
  },
  robots: {
    index: siteSeo.indexingEnabled,
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

  const jsonLd = clinicSchema(locale);

  return (
    <html lang={locale} dir={dir} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <Header />
            {children}
            <FloatingContact />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
