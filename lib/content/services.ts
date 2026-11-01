import { getContentDigest, hasCurrentApproval, nonempty, type DetailApproval } from "./detail-approval.ts";
export type { ContentReview } from "./detail-approval.ts";
import type { Locale } from "@/i18n/routing";

export interface ServiceCopy {
  readonly title: string;
  readonly description: string;
}

export interface ServiceDetailSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
}

export interface ServiceDetailCopy {
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly imageAlt: string;
  readonly overview: string;
  readonly scope: ServiceDetailSection;
  readonly visit?: ServiceDetailSection;
  readonly faqs?: readonly { readonly question: string; readonly answer: string }[];
}

export interface ServiceDetails {
  readonly content: Readonly<Partial<Record<Locale, ServiceDetailCopy>>>;
  readonly approval?: DetailApproval;
}

export interface ClinicService {
  readonly id: string;
  readonly slug: string;
  readonly image: string;
  readonly publicationStatus: "demo" | "published";
  readonly clinicalReviewStatus: "needs-review" | "approved";
  readonly content: Readonly<Record<Locale, ServiceCopy>>;
  readonly details?: ServiceDetails;
}

export interface ServiceSummary extends ServiceCopy {
  readonly detailSlug?: string;
  readonly id: string;
  readonly image: string;
}

// Exact existing demo copy and assets, not verified medical claims.
// None has approved substantive bilingual details yet; their detail URLs stay 404.
// This module runs on the server; client cards import its types only.
export const clinicServices: readonly ClinicService[] = [
  {
    "id": "general-practice",
    "slug": "general-practice",
    "image": "/baghdad/services/general-practice.avif",
    "publicationStatus": "demo",
    "clinicalReviewStatus": "needs-review",
    "content": {
      "en": {
        "title": "General Practice",
        "description": "Comprehensive primary healthcare, preventive check-ups, diagnosis, and treatment for patients of all ages."
      },
      "ar": {
        "title": "الطب العام",
        "description": "رعاية صحية أولية متكاملة تشمل الفحوصات الوقائية، والتشخيص، والعلاج للمرضى من جميع الأعمار."
      }
    }
  },
  {
    "id": "pediatrics",
    "slug": "pediatrics",
    "image": "/baghdad/services/pediatrics.jpg",
    "publicationStatus": "demo",
    "clinicalReviewStatus": "needs-review",
    "content": {
      "en": {
        "title": "Pediatrics",
        "description": "Compassionate healthcare for infants, children, and adolescents in a safe and welcoming environment."
      },
      "ar": {
        "title": "طب الأطفال",
        "description": "رعاية صحية متخصصة وودودة للرضع والأطفال والمراهقين في بيئة آمنة ومريحة."
      }
    }
  },
  {
    "id": "obstetrics-gynecology",
    "slug": "obstetrics-gynecology",
    "image": "/baghdad/services/obstetrics-gynecology.webp",
    "publicationStatus": "demo",
    "clinicalReviewStatus": "needs-review",
    "content": {
      "en": {
        "title": "Obstetrics & Gynecology",
        "description": "Specialized women's healthcare, pregnancy care, and lifelong medical support."
      },
      "ar": {
        "title": "النساء والولادة",
        "description": "رعاية صحية متخصصة للمرأة تشمل متابعة الحمل، وصحة المرأة، والدعم الطبي المتكامل في مختلف مراحل الحياة."
      }
    }
  },
  {
    "id": "dentistry",
    "slug": "dentistry",
    "image": "/baghdad/services/dentistry.jpg",
    "publicationStatus": "demo",
    "clinicalReviewStatus": "needs-review",
    "content": {
      "en": {
        "title": "Dentistry",
        "description": "Comprehensive dental care including preventive, restorative, cosmetic, and implant dentistry."
      },
      "ar": {
        "title": "طب الأسنان",
        "description": "رعاية شاملة للأسنان تشمل الوقاية، والعلاجات الترميمية، والتجميلية، وزراعة الأسنان."
      }
    }
  },
  {
    "id": "skin-care-aesthetics",
    "slug": "skin-care-aesthetics",
    "image": "/baghdad/services/skincare.webp",
    "publicationStatus": "demo",
    "clinicalReviewStatus": "needs-review",
    "content": {
      "en": {
        "title": "Skin Care & Aesthetics",
        "description": "Professional skincare, facial treatments, laser procedures, and aesthetic services tailored to your needs."
      },
      "ar": {
        "title": "العناية بالبشرة والتجميل",
        "description": "خدمات متخصصة للعناية بالبشرة، والعلاجات التجميلية، وإجراءات الليزر، وخدمات جمالية مصممة وفق احتياجاتك."
      }
    }
  },
  {
    "id": "hijama-prp",
    "slug": "hijama-prp",
    "image": "/baghdad/services/hijama-prp.jpg",
    "publicationStatus": "demo",
    "clinicalReviewStatus": "needs-review",
    "content": {
      "en": {
        "title": "Hijama & PRP Therapy",
        "description": "Traditional Hijama therapy together with advanced PRP treatments for wellness, skin rejuvenation, and hair restoration."
      },
      "ar": {
        "title": "الحجامة وعلاج PRP",
        "description": "العلاج التقليدي بالحجامة إلى جانب علاجات البلازما الغنية بالصفائح الدموية (PRP) لدعم الصحة، وتجديد البشرة، وعلاج تساقط الشعر."
      }
    }
  }
];

export function getServiceSummaries(
  locale: Locale,
  { includeWorkingContent = false }: { includeWorkingContent?: boolean } = {},
): readonly ServiceSummary[] {
  return clinicServices
    .filter((service) => includeWorkingContent || (
      service.publicationStatus === "published" &&
      service.clinicalReviewStatus === "approved"
    ))
    .map((service) => ({
      id: service.id,
      image: service.image,
      ...(hasApprovedServiceDetails(service) ? { detailSlug: service.slug } : {}),
      ...service.content[locale],
    }));
}


/** Approval integrity, not authentication. Human review/evidence must be genuine. */
export function getServiceDetailDigest(service: ClinicService): string {
  return getContentDigest({
    id: service.id,
    slug: service.slug,
    image: service.image,
    content: service.content,
    details: service.details?.content,
  });
}

function validSection(section: ServiceDetailSection): boolean {
  if (!section) return false;
  return nonempty(section.heading) && section.paragraphs.length > 0 &&
    section.paragraphs.every(nonempty);
}

function validCopy(copy: ServiceDetailCopy | undefined, summary: ServiceCopy): boolean {
  if (!copy) return false;
  return [copy.metaTitle, copy.metaDescription, copy.imageAlt, copy.overview].every(nonempty) &&
    copy.overview.trim() !== summary.description.trim() && validSection(copy.scope) &&
    copy.scope.paragraphs.some((paragraph) =>
      paragraph.trim() !== summary.description.trim() && paragraph.trim() !== copy.overview.trim()) &&
    (!copy.visit || validSection(copy.visit)) &&
    (!copy.faqs || copy.faqs.every(({ question, answer }) => nonempty(question) && nonempty(answer)));
}

type ApprovedService = ClinicService & {
  readonly details: ServiceDetails & { readonly content: Readonly<Record<Locale, ServiceDetailCopy>> };
};

export function hasApprovedServiceDetails(service: ClinicService): service is ApprovedService {
  const approval = service.details?.approval;
  // Structural checks cannot establish medical usefulness. That decision requires
  // explicit owner/clinical/bilingual editorial review, bound to this exact copy.
  return hasCurrentApproval(approval, getServiceDetailDigest(service)) &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(service.slug) &&
    validCopy(service.details?.content.en, service.content.en) &&
    validCopy(service.details?.content.ar, service.content.ar);
}

interface DetailOptions {
  readonly includeWorkingContent?: boolean;
  readonly services?: readonly ClinicService[];
}

export function getServiceDetail(
  slug: string,
  { includeWorkingContent = false, services = clinicServices }: DetailOptions = {},
): ApprovedService | undefined {
  return services.find((service): service is ApprovedService =>
    service.slug === slug && hasApprovedServiceDetails(service) &&
    (includeWorkingContent || (
      service.publicationStatus === "published" && service.clinicalReviewStatus === "approved"
    )),
  );
}

export function getServiceDetailSlugs(options: DetailOptions = {}): readonly string[] {
  return (options.services ?? clinicServices)
    .filter((service) => getServiceDetail(service.slug, options))
    .map((service) => service.slug);
}
