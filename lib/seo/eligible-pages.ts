import type { Locale } from "@/i18n/routing";
import { clinicServices, getServiceDetailSlugs, type ClinicService } from "../content/services.ts";
import { clinicDoctors, getDoctorProfileSlugs, type ClinicDoctor } from "../content/doctors.ts";
import { siteSeo } from "../site-seo.ts";

interface Catalogues {
  readonly services?: readonly ClinicService[];
  readonly doctors?: readonly ClinicDoctor[];
}

/** Matches the official rendering gates; working demo content is never eligible. */
export function getEligiblePages({ services = clinicServices, doctors = clinicDoctors }: Catalogues = {}) {
  const published = (record: ClinicService | ClinicDoctor) =>
    record.publicationStatus === "published" && record.clinicalReviewStatus === "approved";
  const paths = [
    "", "/about",
    ...(services.some(published) ? ["/services"] : []),
    ...(doctors.some(published) ? ["/doctors"] : []),
    "/contact",
    ...getServiceDetailSlugs({ services }).map((slug) => `/services/${slug}`),
    ...getDoctorProfileSlugs({ doctors }).map((slug) => `/doctors/${slug}`),
  ];
  return paths.map((path) => ({
    path,
    languages: { en: pageUrl("en", path), ar: pageUrl("ar", path) },
  }));
}

/** The origin is trusted configuration, never derived from request/forwarded headers. */
export function pageUrl(locale: Locale, path = "", origin = siteSeo.origin): string {
  return `${origin}/${locale}${path}`;
}

export function pageAlternates(locale: Locale, path = "") {
  if (!siteSeo.indexingEnabled) return undefined;
  const page = getEligiblePages().find((entry) => entry.path === path);
  return page ? { canonical: page.languages[locale], languages: page.languages } : undefined;
}
