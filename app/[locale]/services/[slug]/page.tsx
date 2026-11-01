import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getServiceDetail, getServiceDetailSlugs } from "@/lib/content/services";
import { siteSeo } from "@/lib/site-seo";
import { ServiceDetail } from "@/components/services/service-detail";

interface ServiceDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Static paths are an optimization, not permission to expose draft content.
export function generateStaticParams() {
  return getServiceDetailSlugs({ includeWorkingContent: !siteSeo.indexingEnabled })
    .map((slug) => ({ slug }));
}

async function resolveDetail(params: ServiceDetailPageProps["params"]) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const service = getServiceDetail(slug, { includeWorkingContent: !siteSeo.indexingEnabled });
  if (!service) notFound();
  return { locale, service };
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { locale, service } = await resolveDetail(params);
  const copy = service.details.content[locale];
  const url = `${siteSeo.origin}/${locale}/services/${service.slug}`;
  return {
    title: { absolute: copy.metaTitle },
    description: copy.metaDescription,
    alternates: siteSeo.indexingEnabled ? {
      canonical: url,
      languages: {
        en: `${siteSeo.origin}/en/services/${service.slug}`,
        ar: `${siteSeo.origin}/ar/services/${service.slug}`,
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

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { locale, service } = await resolveDetail(params);
  setRequestLocale(locale);
  return <ServiceDetail service={service} locale={locale} />;
}
