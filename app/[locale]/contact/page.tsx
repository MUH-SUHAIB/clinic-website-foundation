import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { siteSeo } from "@/lib/site-seo";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { footerContent } from "@/lib/mock-data/homepage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Contact" });
  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: siteSeo.indexingEnabled ? {
      canonical: `${siteSeo.origin}/${locale}/contact`,
      languages: { en: `${siteSeo.origin}/en/contact`, ar: `${siteSeo.origin}/ar/contact` },
    } : undefined,
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <>
      <main id="main-content" tabIndex={-1} className="min-h-screen pt-28 md:pt-32">
        <nav aria-label={t("breadcrumbLabel")} className="mx-auto max-w-7xl px-md text-sm text-slate-600 md:px-lg dark:text-slate-300">
          <ol role="list" className="flex flex-wrap items-center gap-3">
            <li><Link href="/" className="inline-flex min-h-11 items-center rounded-lg hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-4">{t("home")}</Link></li>
            <li aria-hidden="true"><ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" /></li>
            <li><span aria-current="page" className="font-semibold text-blue-700 dark:text-blue-300">{t("eyebrow")}</span></li>
          </ol>
        </nav>
        <Contact headingLevel="h1" />
      </main>
      <Footer {...footerContent} />
    </>
  );
}
