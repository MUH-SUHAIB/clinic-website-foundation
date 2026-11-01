import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { getDoctorProfile } from "@/lib/content/doctors";
import { ContactAction } from "@/components/contact/contact-action";
import { Footer } from "@/components/sections/footer";
import { BidiText } from "@/components/ui/bidi-text";
import { Heading, Text } from "@/components/ui/typography";
import { footerContent } from "@/lib/mock-data/homepage";
import { siteSeo } from "@/lib/site-seo";

type ApprovedDoctor = NonNullable<ReturnType<typeof getDoctorProfile>>;
const linkClass = "inline-flex min-h-11 items-center rounded-lg font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-4 dark:text-blue-300";

function ProfileSection({ title, items, id }: { title: string; items?: readonly string[]; id: string }) {
  if (!items?.length) return null;
  return (
    <section aria-labelledby={id} className="rounded-card border border-blue-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-10">
      <Heading level="h3" as="h2" id={id}>{title}</Heading>
      <ul className="mt-4 list-disc space-y-3 ps-5 text-slate-600 dark:text-slate-300">
        {items.map((item, index) => <li key={index}><BidiText>{item}</BidiText></li>)}
      </ul>
    </section>
  );
}

/** Server-rendered approved text; the image alt always comes from the catalogue. */
export async function DoctorProfile({ doctor, locale }: { doctor: ApprovedDoctor; locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "DoctorProfile" });
  const directory = await getTranslations({ locale, namespace: "Doctors" });
  const services = await getTranslations({ locale, namespace: "Services" });
  const navigation = await getTranslations({ locale, namespace: "Navigation" });
  const copy = doctor.profile.content[locale];
  const identity = doctor.content[locale];
  const url = `${siteSeo.origin}/${locale}/doctors/${doctor.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "ProfilePage", "@id": `${url}#webpage`, url, name: copy.metaTitle, description: copy.metaDescription, inLanguage: locale, mainEntity: { "@id": `${url}#person` }, breadcrumb: { "@id": `${url}#breadcrumb` } },
      // Only facts covered by the explicit profile review; never infer services,
      // licences, awards, affiliations or years of experience. A room is not a portrait.
      { "@type": "Person", "@id": `${url}#person`, name: identity.name, jobTitle: identity.specialty, url,
        ...(doctor.imageKind === "portrait" ? { image: new URL(doctor.image, siteSeo.origin).href } : {}),
        ...(copy.languages?.length ? { knowsLanguage: copy.languages } : {}),
      },
      { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
        { "@type": "ListItem", position: 1, name: directory("home"), item: `${siteSeo.origin}/${locale}` },
        { "@type": "ListItem", position: 2, name: directory("eyebrow"), item: `${siteSeo.origin}/${locale}/doctors` },
        { "@type": "ListItem", position: 3, name: identity.name, item: url },
      ] },
    ],
  };
  return (
    <>
      {siteSeo.indexingEnabled && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />}
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-slate-50/50 pt-28 dark:bg-slate-950 md:pt-32">
        <div className="mx-auto max-w-7xl px-md pb-16 md:px-lg md:pb-24">
          <nav aria-label={directory("breadcrumbLabel")} className="mb-10 text-sm text-slate-600 dark:text-slate-300">
            <ol role="list" className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <li><Link href="/" className={linkClass}>{directory("home")}</Link></li>
              <li aria-hidden="true"><ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" /></li>
              <li><Link href="/doctors" className={linkClass}>{directory("eyebrow")}</Link></li>
              <li aria-hidden="true"><ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" /></li>
              <li><span aria-current="page" className="font-semibold text-blue-700 dark:text-blue-300"><BidiText>{identity.name}</BidiText></span></li>
            </ol>
          </nav>
          <article>
            <header className="mb-8 grid overflow-hidden rounded-[32px] border border-blue-100 bg-gradient-to-br from-white via-blue-50/70 to-pink-50/60 dark:border-blue-900 dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 md:grid-cols-2">
              <div className="p-6 py-10 text-start md:p-10 lg:p-12">
                <p className="mb-4 text-sm font-bold text-blue-700 dark:text-blue-300">{directory("eyebrow")}</p>
                <Heading level="h1" className="break-words text-slate-900 dark:text-white">{identity.name}</Heading>
                <Text className="mt-4 font-medium text-blue-700 dark:text-blue-300">{identity.specialty}</Text>
              </div>
              <figure>
                <div className="relative aspect-[4/5] max-h-[36rem] min-h-64 w-full">
                  <Image src={doctor.image} alt={identity.imageAlt} fill sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw" quality={90} preload className="object-cover object-center" />
                </div>
                {doctor.imageKind === "clinic-room" && <figcaption className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{t("roomPhoto")}</figcaption>}
              </figure>
            </header>
            <div className="space-y-8">
              <section aria-labelledby="doctor-biography" className="rounded-card border border-blue-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-10">
                <Heading level="h3" as="h2" id="doctor-biography">{t("biography")}</Heading>
                {copy.biography.map((paragraph, index) => <Text key={index} className="mt-4 text-slate-600 dark:text-slate-300">{paragraph}</Text>)}
              </section>
              <ProfileSection title={t("specialties")} items={copy.specialties} id="doctor-specialties" />
              <ProfileSection title={t("qualifications")} items={copy.qualifications} id="doctor-qualifications" />
              <ProfileSection title={t("languages")} items={copy.languages} id="doctor-languages" />
              <ProfileSection title={t("experience")} items={copy.experience} id="doctor-experience" />
            </div>
          </article>
          <section aria-labelledby="doctor-contact" className="mt-8 rounded-[32px] border border-blue-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-10">
            <Heading level="h3" as="h2" id="doctor-contact">{t("contact")}</Heading>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ContactAction kind="call">{services("callClinic")}</ContactAction>
              <ContactAction kind="whatsapp">{services("whatsapp")}</ContactAction>
            </div>
            <nav aria-label={t("relatedLinks")} className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
              <Link href="/doctors" className={linkClass}>{directory("viewAll")}</Link>
              <Link href="/services" className={linkClass}>{navigation("services")}</Link>
              <Link href="/contact" className={linkClass}>{navigation("contact")}</Link>
            </nav>
          </section>
        </div>
      </main>
      <Footer {...footerContent} />
    </>
  );
}
