import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getLegalDocument, type LegalKind } from "@/lib/content/legal-documents";
import { pageAlternates } from "@/lib/seo/eligible-pages";
import { LegalDocumentPage } from "./legal-document";

type Props = { params: Promise<{ locale: string }> };
export function createLegalRoute(kind: LegalKind) {
  async function resolve(params: Props["params"]) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) notFound();
    const document = getLegalDocument(kind);
    if (!document) notFound();
    return { locale, document };
  }
  return {
    async generateMetadata({ params }: Props): Promise<Metadata> {
      const { locale, document } = await resolve(params);
      return { title: { absolute: document.content[locale].metaTitle },
        description: document.content[locale].metaDescription,
        alternates: pageAlternates(locale, `/${kind}`) };
    },
    async Page({ params }: Props) {
      const { locale, document } = await resolve(params);
      setRequestLocale(locale);
      return <LegalDocumentPage document={document} locale={locale} />;
    },
  };
}
