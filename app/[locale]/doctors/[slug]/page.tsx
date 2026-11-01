import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getDoctorProfile, getDoctorProfileSlugs } from "@/lib/content/doctors";
import { siteSeo } from "@/lib/site-seo";
import { DoctorProfile } from "@/components/doctors/doctor-profile";

interface DoctorProfilePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Static paths are an optimization, not permission to expose draft content.
export function generateStaticParams() {
  return getDoctorProfileSlugs({ includeWorkingContent: !siteSeo.indexingEnabled })
    .map((slug) => ({ slug }));
}

async function resolveDetail(params: DoctorProfilePageProps["params"]) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const doctor = getDoctorProfile(slug, { includeWorkingContent: !siteSeo.indexingEnabled });
  if (!doctor) notFound();
  return { locale, doctor };
}

export async function generateMetadata({ params }: DoctorProfilePageProps): Promise<Metadata> {
  const { locale, doctor } = await resolveDetail(params);
  const copy = doctor.profile.content[locale];
  const url = `${siteSeo.origin}/${locale}/doctors/${doctor.slug}`;
  return {
    title: { absolute: copy.metaTitle },
    description: copy.metaDescription,
    alternates: siteSeo.indexingEnabled ? {
      canonical: url,
      languages: {
        en: `${siteSeo.origin}/en/doctors/${doctor.slug}`,
        ar: `${siteSeo.origin}/ar/doctors/${doctor.slug}`,
      },
    } : undefined,
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      locale: locale === "ar" ? "ar_AE" : "en_US",
      ...(siteSeo.indexingEnabled ? { url } : {}),
    },
  };
}

export default async function DoctorProfilePage({ params }: DoctorProfilePageProps) {
  const { locale, doctor } = await resolveDetail(params);
  setRequestLocale(locale);
  return <DoctorProfile doctor={doctor} locale={locale} />;
}
