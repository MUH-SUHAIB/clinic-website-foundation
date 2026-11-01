import { pageAlternates } from "@/lib/seo/eligible-pages";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { About } from "@/components/sections/about";
import { Footer } from "@/components/sections/footer";
import { footerContent } from "@/lib/mock-data/homepage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "About" });
  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: pageAlternates(locale, "/about"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Contact");
  const tNav = await getTranslations("Navigation");
  const tFooter = await getTranslations("Footer");

  return (
    <>
      <main id="main-content" tabIndex={-1} className="min-h-screen pt-28 md:pt-32">
        <nav aria-label={t("breadcrumbLabel")} className="mx-auto max-w-7xl px-md text-sm text-slate-600 md:px-lg dark:text-slate-300">
          <ol role="list" className="flex flex-wrap items-center gap-3">
            <li><Link href="/" className="inline-flex min-h-11 items-center rounded-lg hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-4">{t("home")}</Link></li>
            <li aria-hidden="true"><ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" /></li>
            <li><span aria-current="page" className="font-semibold text-blue-700 dark:text-blue-300">{tNav("about")}</span></li>
          </ol>
        </nav>
        <About headingLevel="h1" />
        <nav aria-label={tFooter("quickLinks")} className="mx-auto mb-16 flex max-w-7xl flex-wrap gap-4 px-md md:px-lg">
          {(["services", "doctors", "contact"] as const).map((page) => (
            <Link key={page} href={`/${page}`} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-blue-100 bg-white px-5 py-3 font-semibold text-blue-700 shadow-sm transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-4 dark:border-slate-800 dark:bg-slate-900 dark:text-blue-300">
              {tNav(page)}<ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
            </Link>
          ))}
        </nav>
      </main>
      <Footer {...footerContent} />
    </>
  );
}
