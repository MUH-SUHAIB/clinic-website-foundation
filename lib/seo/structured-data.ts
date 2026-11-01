import type { Locale } from "@/i18n/routing";
import { clinic } from "../clinic.ts";
import { siteSeo } from "../site-seo.ts";
import { pageUrl } from "./eligible-pages.ts";

export { serializeJsonLd } from "./serialize-json-ld.ts";

/** Existing visible business identity only; owner confirmation remains a launch prerequisite.
 * No promotional descriptions, prices, medical credentials, services or review markup.
 */
export function clinicSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${siteSeo.origin}/#clinic`,
    name: clinic.content[locale].name,
    alternateName: clinic.content[locale === "ar" ? "en" : "ar"].name,
    url: pageUrl(locale),
    logo: `${siteSeo.origin}/favicon-logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: clinic.postalAddress.locality,
      addressRegion: clinic.postalAddress.region,
      addressCountry: clinic.postalAddress.country,
    },
    telephone: clinic.mobile.international,
    email: clinic.email,
    sameAs: clinic.location.listingHref,
  };
}
