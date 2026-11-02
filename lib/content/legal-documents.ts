import type { Locale } from "@/i18n/routing";
import { getContentDigest, nonempty, validReview, type ContentReview } from "./detail-approval.ts";

export type LegalKind = "privacy" | "terms" | "cookies";
export interface LegalCopy {
  readonly title: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly introduction: readonly string[];
  readonly sections: readonly { readonly heading: string; readonly paragraphs: readonly string[] }[];
}
export interface LegalDocument {
  readonly kind: LegalKind;
  readonly publicationStatus: "draft" | "published";
  // Whether a separate document is appropriate must be decided by the reviewer.
  readonly applicability: "needs-review" | "appropriate" | "not-required";
  readonly justification?: string;
  readonly content: Readonly<Partial<Record<Locale, LegalCopy>>>;
  readonly approval?: {
    readonly status: "draft" | "approved";
    readonly completeBilingualContent: boolean;
    readonly contentDigest: string;
    readonly owner: ContentReview;
    readonly legal: ContentReview;
    readonly editorial: ContentReview;
  };
}

// Empty private content slots, not policy text or a decision that all three are needed.
export const legalDocuments: readonly LegalDocument[] = [
  { kind: "privacy", publicationStatus: "draft", applicability: "needs-review", content: {} },
  { kind: "terms", publicationStatus: "draft", applicability: "needs-review", content: {} },
  { kind: "cookies", publicationStatus: "draft", applicability: "needs-review", content: {} },
];

export function legalContentDigest(document: LegalDocument): string {
  return getContentDigest({ kind: document.kind, applicability: document.applicability,
    justification: document.justification, content: document.content });
}
function completeCopy(copy: LegalCopy | undefined): copy is LegalCopy {
  return !!copy && [copy.title, copy.metaTitle, copy.metaDescription].every(nonempty) &&
    Array.isArray(copy.introduction) && copy.introduction.length > 0 && copy.introduction.every(nonempty) &&
    Array.isArray(copy.sections) && copy.sections.length > 0 && copy.sections.every(section =>
      !!section && nonempty(section.heading) && Array.isArray(section.paragraphs) &&
      section.paragraphs.length > 0 && section.paragraphs.every(nonempty));
}

/** Integrity gate, not proof of legal adequacy. Approve both languages as one version.
 * No demo opt-in or request flag bypasses approval or explicit publication.
 */
export function getLegalDocument(kind: string, documents: readonly LegalDocument[] = legalDocuments) {
  const matches = documents.filter(document => document.kind === kind);
  if (matches.length !== 1) return undefined;
  const document = matches[0];
  const approval = document.approval;
  if (document.publicationStatus !== "published" || document.applicability !== "appropriate" ||
      !nonempty(document.justification ?? "") || !completeCopy(document.content.en) || !completeCopy(document.content.ar) ||
      !approval || approval.status !== "approved" || !approval.completeBilingualContent ||
      approval.contentDigest !== legalContentDigest(document) ||
      ![approval.owner, approval.legal, approval.editorial].every(validReview)) return undefined;
  return { ...document, content: { en: document.content.en, ar: document.content.ar } };
}
export function getPublishedLegalDocuments(documents: readonly LegalDocument[] = legalDocuments) {
  return documents.flatMap(document => {
    const published = getLegalDocument(document.kind, documents);
    return published ? [published] : [];
  });
}
