import { pageUrl } from "@/lib/seo/eligible-pages";
import { serializeJsonLd } from "@/lib/seo/structured-data";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { getServiceDetail, ServiceDetailSection } from "@/lib/content/services";
import { ContactAction } from "@/components/contact/contact-action";
import { Footer } from "@/components/sections/footer";
import { BidiText } from "@/components/ui/bidi-text";
import { Heading, Text } from "@/components/ui/typography";
import { footerContent } from "@/lib/mock-data/homepage";
import { siteSeo } from "@/lib/site-seo";

type ApprovedService = NonNullable<ReturnType<typeof getServiceDetail>>;
const linkClass = "inline-flex min-h-11 items-center rounded-lg font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-4 dark:text-blue-300";

function DetailSection({ section, id }: { section: ServiceDetailSection; id: string }) {
  return (
    <section aria-labelledby={id} className="rounded-card border border-blue-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-10">
      <Heading level="h3" as="h2" id={id}>{section.heading}</Heading>
      {section.paragraphs.map((paragraph, index) => (
        <Text key={index} className="mt-4 text-slate-600 dark:text-slate-300">{paragraph}</Text>
      ))}
    </section>
  );
}

/** Static, approved text only. No raw HTML or client-side content fetching. */
export async function ServiceDetail({ service, locale }: { service: ApprovedService; locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "ServiceDetail" });
  const services = await getTranslations({ locale, namespace: "Services" });
  const navigation = await getTranslations({ locale, namespace: "Navigation" });
  const copy = service.details.content[locale];
  const title = service.content[locale].title;
  const url = pageUrl(locale, `/services/${service.slug}`);
  // Schema uses visible facts only, never medical claims, ratings or inferred clinicians.
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${url}#webpage`, url, name: copy.metaTitle, description: copy.metaDescription, inLanguage: locale, breadcrumb: { "@id": `${url}#breadcrumb` } },
      { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
        { "@type": "ListItem", position: 1, name: services("home"), item: pageUrl(locale) },
        { "@type": "ListItem", position: 2, name: services("eyebrow"), item: pageUrl(locale, "/services") },
        { "@type": "ListItem", position: 3, name: title, item: url },
      ] },
    ],
  };

  return (
    <>
      {siteSeo.indexingEnabled && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />}
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-slate-50/50 pt-28 dark:bg-slate-950 md:pt-32">
        <div className="mx-auto max-w-7xl px-md pb-16 md:px-lg md:pb-24">
          <nav aria-label={services("breadcrumbLabel")} className="mb-10 text-sm text-slate-600 dark:text-slate-300">
            <ol role="list" className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <li><Link href="/" className={linkClass}>{services("home")}</Link></li>
              <li aria-hidden="true"><ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" /></li>
              <li><Link href="/services" className={linkClass}>{services("eyebrow")}</Link></li>
              <li aria-hidden="true"><ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" /></li>
              <li><span aria-current="page" className="font-semibold text-blue-700 dark:text-blue-300"><BidiText>{title}</BidiText></span></li>
            </ol>
          </nav>
          <article>
            <header className="mb-8 grid overflow-hidden rounded-[32px] border border-blue-100 bg-gradient-to-br from-white via-blue-50/70 to-pink-50/60 dark:border-blue-900 dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 md:grid-cols-2">
              <div className="p-6 py-10 text-start md:p-10 lg:p-12">
                <p className="mb-4 text-sm font-bold text-blue-700 dark:text-blue-300">{services("eyebrow")}</p>
                <Heading level="h1" className="break-words text-slate-900 dark:text-white">{title}</Heading>
                <Text className="mt-6 text-slate-600 dark:text-slate-300 sm:text-lg">{copy.overview}</Text>
              </div>
              <div className="relative min-h-64 md:min-h-80">
                <Image src={service.image} alt={copy.imageAlt} fill sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw" quality={90} preload unoptimized={service.image.endsWith(".avif")} className="object-cover" />
              </div>
            </header>
            <div className="space-y-8">
              <DetailSection section={copy.scope} id="service-scope" />
              {copy.visit && <DetailSection section={copy.visit} id="service-visit" />}
              {!!copy.faqs?.length && (
                <section aria-labelledby="service-questions" className="rounded-card border border-blue-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-10">
                  <Heading level="h3" as="h2" id="service-questions">{t("questions")}</Heading>
                  <dl className="mt-6 space-y-6">
                    {copy.faqs.map(({ question, answer }) => (
                      <div key={question}>
                        <dt className="font-semibold text-slate-900 dark:text-white"><BidiText>{question}</BidiText></dt>
                        <dd><Text className="mt-2 text-slate-600 dark:text-slate-300">{answer}</Text></dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
            </div>
          </article>
          <section aria-labelledby="service-contact" className="mt-8 rounded-[32px] border border-blue-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-10">
            <Heading level="h3" as="h2" id="service-contact">{t("contact")}</Heading>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ContactAction kind="call">{services("callClinic")}</ContactAction>
              <ContactAction kind="whatsapp">{services("whatsapp")}</ContactAction>
            </div>
            <nav aria-label={t("relatedLinks")} className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
              <Link href="/services" className={linkClass}>{services("viewAll")}</Link>
              <Link href="/doctors" className={linkClass}>{navigation("doctors")}</Link>
              <Link href="/contact" className={linkClass}>{navigation("contact")}</Link>
              <Link href={{ pathname: "/", hash: "contact" }} className={linkClass}>{t("homeContact")}</Link>
            </nav>
          </section>
        </div>
      </main>
      <Footer {...footerContent} />
    </>
  );
}
