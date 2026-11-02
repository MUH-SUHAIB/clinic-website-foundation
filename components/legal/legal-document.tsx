import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { getLegalDocument } from "@/lib/content/legal-documents";
import { clinic, clinicContact } from "@/lib/clinic";
import { Footer } from "@/components/sections/footer";
import { footerContent } from "@/lib/mock-data/homepage";
import { BidiText } from "@/components/ui/bidi-text";
import { Heading, Text } from "@/components/ui/typography";

const linkClass = "inline-flex min-h-11 items-center rounded-lg font-semibold text-blue-700 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-4";

/** Plain approved text rendered on the server, never raw HTML or approval evidence. */
export function LegalDocumentPage({ document, locale }: {
  document: NonNullable<ReturnType<typeof getLegalDocument>>; locale: Locale;
}) {
  const copy = document.content[locale];
  const labels = locale === "ar"
    ? { home: "الرئيسية", breadcrumb: "مسار التنقل", sections: "أقسام المستند", contact: "تواصل معنا" }
    : { home: "Home", breadcrumb: "Breadcrumb", sections: "Document sections", contact: "Contact" };
  return <>
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-slate-50/50 pt-28 dark:bg-slate-950 md:pt-32">
      <div className="mx-auto max-w-4xl px-md pb-16 md:px-lg md:pb-24">
        <nav aria-label={labels.breadcrumb} className="mb-8 text-sm">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <li><Link href="/" className={linkClass}>{labels.home}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="min-w-0 break-words"><BidiText>{copy.title}</BidiText></li>
          </ol>
        </nav>
        <article className="min-w-0 break-words rounded-[32px] border border-blue-100 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-10">
          <Heading level="h1">{copy.title}</Heading>
          {copy.introduction.map((paragraph, i) => <Text key={i} className="mt-5 text-slate-600 dark:text-slate-300">{paragraph}</Text>)}
          <nav aria-label={labels.sections} className="my-8 border-y border-blue-100 py-4">
            <ul className="space-y-1">{copy.sections.map((section, i) => <li key={i}><a className={linkClass} href={`#legal-section-${i + 1}`}><BidiText>{section.heading}</BidiText></a></li>)}</ul>
          </nav>
          {copy.sections.map((section, i) => <section key={i} aria-labelledby={`legal-section-${i + 1}`} className="mt-8">
            <Heading as="h2" level="h3" id={`legal-section-${i + 1}`} className="scroll-mt-32">{section.heading}</Heading>
            {section.paragraphs.map((paragraph, j) => <Text key={j} className="mt-4 text-slate-600 dark:text-slate-300">{paragraph}</Text>)}
          </section>)}
        </article>
        <nav aria-label={labels.contact} className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/contact" className={linkClass}>{labels.contact}</Link>
          <a href={clinicContact.emailHref} className={`${linkClass} min-w-0 break-all`}><bdi dir="ltr">{clinic.email}</bdi></a>
        </nav>
      </div>
    </main>
    <Footer {...footerContent} />
  </>;
}
