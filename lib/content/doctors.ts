import type { Locale } from "@/i18n/routing";

export interface DoctorCopy {
  readonly name: string;
  readonly specialty: string;
  readonly description: string;
  readonly imageAlt: string;
}

export interface ClinicDoctor {
  readonly id: string;
  readonly slug: string;
  readonly image: string;
  readonly imageKind: "portrait" | "clinic-room";
  readonly accent: "blue" | "pink";
  readonly isFounder: boolean;
  readonly featuredOnHomepage: boolean;
  readonly publicationStatus: "demo" | "published";
  readonly clinicalReviewStatus: "needs-review" | "approved";
  readonly content: Readonly<Record<Locale, DoctorCopy>>;
}

export interface DoctorSummary extends DoctorCopy {
  readonly id: string;
  readonly image: string;
  readonly imageKind: ClinicDoctor["imageKind"];
  readonly accent: ClinicDoctor["accent"];
  readonly isFounder: boolean;
}

// Existing demo information only: names, titles, experience and claims need clinic review.
// Room photographs are real clinic rooms, never portraits of the named doctor.
export const clinicDoctors: readonly ClinicDoctor[] = [
  {
    "id": "safaa",
    "slug": "safaa",
    "image": "/baghdad/doctors/Safa.webp",
    "imageKind": "portrait",
    "accent": "blue",
    "isFounder": true,
    "featuredOnHomepage": true,
    "publicationStatus": "demo",
    "clinicalReviewStatus": "needs-review",
    "content": {
      "en": {
        "name": "Dr. Safaa Mohamed Hussein",
        "specialty": "Dermatology Specialist",
        "description": "Founder of Baghdad Medical Center. Specializes in dermatology, hair loss (alopecia), PRP therapy, skin health, diabetes management, and preventive healthcare.",
        "imageAlt": "Dr. Safaa Mohamed Hussein"
      },
      "ar": {
        "name": "د. صفاء محمد حسين",
        "specialty": "أخصائي الأمراض الجلدية والتجميل",
        "description": "مؤسس مركز بغداد الطبي. متخصص في الأمراض الجلدية، علاج تساقط الشعر (الثعلبة)، علاج البلازما PRP، صحة البشرة، متابعة السكري، والرعاية الصحية الوقائية.",
        "imageAlt": "د. صفاء محمد حسين"
      }
    }
  },
  {
    "id": "jawad",
    "slug": "jawad",
    "image": "/baghdad/doctors/Jawad khan.jpg",
    "imageKind": "portrait",
    "accent": "blue",
    "isFounder": false,
    "featuredOnHomepage": true,
    "publicationStatus": "demo",
    "clinicalReviewStatus": "needs-review",
    "content": {
      "en": {
        "name": "Dr. Jawad Khan Jamil",
        "specialty": "General Practitioner (GP)",
        "description": "Provides comprehensive primary healthcare, diagnosis, preventive medicine, chronic disease management, and family healthcare.",
        "imageAlt": "Dr. Jawad Khan Jamil"
      },
      "ar": {
        "name": "د. جواد خان جميل",
        "specialty": "طبيب عام",
        "description": "يقدم رعاية صحية أولية متكاملة، التشخيص الدقيق، الطب الوقائي، إدارة الأمراض المزمنة، والرعاية الصحية الشاملة للعائلة.",
        "imageAlt": "د. جواد خان جميل"
      }
    }
  },
  {
    "id": "abdullah",
    "slug": "abdullah",
    "image": "/baghdad/doctors/Abdullah.webp",
    "imageKind": "portrait",
    "accent": "blue",
    "isFounder": false,
    "featuredOnHomepage": true,
    "publicationStatus": "demo",
    "clinicalReviewStatus": "needs-review",
    "content": {
      "en": {
        "name": "Dr. Abdullah",
        "specialty": "Pediatric Specialist",
        "description": "Provides specialized healthcare for infants, children, vaccinations, growth monitoring, and common childhood illnesses.",
        "imageAlt": "Dr. Abdullah"
      },
      "ar": {
        "name": "د. عبد الله",
        "specialty": "أخصائي طب الأطفال",
        "description": "تقديم رعاية صحية متخصصة للرضع والأطفال، التطعيمات، متابعة النمو، وعلاج الأمراض الشائعة عند الأطفال.",
        "imageAlt": "د. عبد الله"
      }
    }
  },
  {
    "id": "bassam",
    "slug": "bassam",
    "image": "/baghdad/doctors/bassam.webp",
    "imageKind": "portrait",
    "accent": "blue",
    "isFounder": false,
    "featuredOnHomepage": true,
    "publicationStatus": "demo",
    "clinicalReviewStatus": "needs-review",
    "content": {
      "en": {
        "name": "Dr. Bassam Ibraheem",
        "specialty": "Orthodontic Specialist",
        "description": "More than 20 years of experience in braces, bite correction, teeth alignment, and orthodontic treatment.",
        "imageAlt": "Dr. Bassam Ibraheem"
      },
      "ar": {
        "name": "د. بسام إبراهيم",
        "specialty": "أخصائي تقويم الأسنان",
        "description": "خبرة تمتد لأكثر من 20 عاماً في تقويم الأسنان، تصحيح الإطباق، تعديل مظهر الأسنان، والعلاجات التجميلية للأسنان.",
        "imageAlt": "د. بسام إبراهيم"
      }
    }
  },
  {
    "id": "rana",
    "slug": "rana",
    "image": "/baghdad/doctors/dentistry-room.webp",
    "imageKind": "clinic-room",
    "accent": "pink",
    "isFounder": false,
    "featuredOnHomepage": true,
    "publicationStatus": "demo",
    "clinicalReviewStatus": "needs-review",
    "content": {
      "en": {
        "name": "Dr. Rana Maryoosh",
        "specialty": "Dental Implant Specialist",
        "description": "Specialized in dental implants, restorative dentistry, and advanced cosmetic dental procedures.",
        "imageAlt": "Dental treatment room at Baghdad Medical Center with a red dental chair and overhead examination light"
      },
      "ar": {
        "name": "د. رنا مريوش",
        "specialty": "أخصائية زراعة الأسنان",
        "description": "متخصصة في زراعة الأسنان، العلاجات الترميمية، والإجراءات التجميلية المتقدمة للأسنان.",
        "imageAlt": "غرفة علاج الأسنان في مركز بغداد الطبي، مع كرسي أسنان أحمر وضوء فحص علوي"
      }
    }
  },
  {
    "id": "rishika",
    "slug": "rishika",
    "image": "/baghdad/doctors/dentistry-room.webp",
    "imageKind": "clinic-room",
    "accent": "pink",
    "isFounder": false,
    "featuredOnHomepage": true,
    "publicationStatus": "demo",
    "clinicalReviewStatus": "needs-review",
    "content": {
      "en": {
        "name": "Dr. Rishika",
        "specialty": "General Dentist",
        "description": "Provides preventive, restorative, and cosmetic dental care for patients of all ages.",
        "imageAlt": "Dental treatment room at Baghdad Medical Center with a red dental chair and overhead examination light"
      },
      "ar": {
        "name": "د. ريشيكا",
        "specialty": "طبيبة أسنان عامة",
        "description": "تقديم خدمات رعاية الأسنان الوقائية، الترميمية، والتجميلية لكافة الفئات العمرية.",
        "imageAlt": "غرفة علاج الأسنان في مركز بغداد الطبي، مع كرسي أسنان أحمر وضوء فحص علوي"
      }
    }
  }
];

export function getDoctorSummaries(
  locale: Locale,
  { includeWorkingContent = false, featuredOnly = false }: {
    includeWorkingContent?: boolean;
    featuredOnly?: boolean;
  } = {},
): readonly DoctorSummary[] {
  return clinicDoctors
    .filter((doctor) => (!featuredOnly || doctor.featuredOnHomepage) && (
      includeWorkingContent || (
        doctor.publicationStatus === "published" && doctor.clinicalReviewStatus === "approved"
      )
    ))
    .map((doctor) => ({
      id: doctor.id,
      image: doctor.image,
      imageKind: doctor.imageKind,
      accent: doctor.accent,
      isFounder: doctor.isFounder,
      ...doctor.content[locale],
    }));
}
