import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getDoctorSummaries } from "@/lib/content/doctors";
import { ContactAction } from "@/components/contact/contact-action";
import { footerContent } from "@/lib/mock-data/homepage";
import { siteSeo } from "@/lib/site-seo";
import { DoctorGrid } from "@/components/doctors/doctor-grid";
import { Footer } from "@/components/sections/footer";
import { Heading, Text } from "@/components/ui/typography";

interface DoctorsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: DoctorsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Doctors" });

  return {
    title: { absolute: t("directoryMetaTitle") },
    description: t("directoryMetaDescription"),
    alternates: siteSeo.indexingEnabled ? {
      canonical: `${siteSeo.origin}/${locale}/doctors`,
      languages: {
        en: `${siteSeo.origin}/en/doctors`,
        ar: `${siteSeo.origin}/ar/doctors`,
      },
    } : undefined,
  };
}

export default async function DoctorsPage({ params }: DoctorsPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  // Existing working content is available on the noindex demo. It must not
  // become an official listing merely because the domain is approved later.
  const doctors = getDoctorSummaries(locale, {
    includeWorkingContent: !siteSeo.indexingEnabled,
  });
  if (doctors.length === 0) notFound();

  const t = await getTranslations("Doctors");
  const tContact = await getTranslations("Contact");
  const tServices = await getTranslations("Services");

  return (
    <>
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-slate-50/50 pt-28 dark:bg-slate-950 md:pt-32">
        <div className="mx-auto max-w-7xl px-md pb-16 md:px-lg md:pb-24">
          <nav aria-label={t("breadcrumbLabel")} className="mb-10 text-sm text-slate-600 dark:text-slate-300">
            <ol role="list" className="flex flex-wrap items-center gap-3">
              <li>
                <Link href="/" className="inline-flex min-h-11 items-center rounded-lg hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-4 dark:hover:text-blue-300">
                  {t("home")}
                </Link>
              </li>
              <li aria-hidden="true"><ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" /></li>
              <li><span aria-current="page" className="font-semibold text-blue-700 dark:text-blue-300">{t("eyebrow")}</span></li>
            </ol>
          </nav>

          <header className="relative mb-12 overflow-hidden rounded-[32px] border border-blue-100 bg-gradient-to-br from-white via-blue-50/70 to-pink-50/60 px-6 py-12 text-center dark:border-blue-900 dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 sm:px-10 md:py-16">
            <p className="mb-4 text-sm font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">{t("eyebrow")}</p>
            <Heading level="h1" className="mx-auto max-w-4xl text-slate-900 dark:text-white">{t("directoryTitle")}</Heading>
            <Text className="mx-auto mt-6 max-w-3xl text-slate-600 dark:text-slate-300 sm:text-lg">{t("description")}</Text>
          </header>

          <section aria-label={t("eyebrow")}>
            <DoctorGrid doctors={doctors} founderLabel={t("founderBadge")} headingLevel="h2" />
          </section>

          <section aria-labelledby="doctors-contact-title" className="mt-12 flex flex-col items-start justify-between gap-8 rounded-[32px] border border-blue-100 bg-white p-7 dark:border-slate-800 dark:bg-slate-900 md:p-10 lg:flex-row lg:items-center">
            <div className="max-w-xl text-start">
              <Heading level="h3" as="h2" id="doctors-contact-title" className="text-slate-900 dark:text-white">{tContact("title")}</Heading>
              <Text className="mt-3 text-slate-600 dark:text-slate-300">{tContact("description")}</Text>
              <Link href="/contact" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-4 dark:text-blue-300">
                {tServices("contactLocation")}<ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
              <ContactAction kind="call">{tServices("callClinic")}</ContactAction>
              <ContactAction kind="whatsapp">{tServices("whatsapp")}</ContactAction>
            </div>
          </section>
        </div>
      </main>
      <Footer {...footerContent} />
    </>
  );
}
