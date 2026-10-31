import type { Locale } from "@/i18n/routing";

export interface ServiceCopy {
  readonly title: string;
  readonly description: string;
}

export interface ClinicService {
  readonly id: string;
  readonly slug: string;
  readonly image: string;
  readonly publicationStatus: "demo" | "published";
  readonly clinicalReviewStatus: "needs-review" | "approved";
  readonly content: Readonly<Record<Locale, ServiceCopy>>;
}

export interface ServiceSummary extends ServiceCopy {
  readonly id: string;
  readonly image: string;
}

// Exact existing demo copy and assets, not verified medical claims.
// No individual service routes are published by this catalogue.
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
      ...service.content[locale],
    }));
}
