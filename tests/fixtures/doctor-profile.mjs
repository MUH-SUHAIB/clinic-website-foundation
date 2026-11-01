// Synthetic software-test copy only; never import this module from the app.
import { clinicDoctors, getDoctorProfileDigest } from "../../lib/content/doctors.ts";

export function approvedDoctorFixture({ minimal = false } = {}) {
  const doctor = structuredClone(clinicDoctors.find((record) => record.id === (minimal ? "jawad" : "rana")));
  doctor.id = doctor.slug = minimal ? "profile-minimal-fixture" : "profile-layout-fixture";
  doctor.isFounder = false;
  doctor.featuredOnHomepage = false;
  doctor.content.en.name = "Profile template layout test";
  doctor.content.ar.name = "اختبار تخطيط قالب الملف المهني";
  doctor.content.en.specialty = "Software test label, not a clinical specialty";
  doctor.content.ar.specialty = "عنوان اختبار برمجي، وليس تخصصاً طبياً";
  doctor.content.en.description = "Test-only directory summary.";
  doctor.content.ar.description = "ملخص دليل للاختبار فقط.";
  if (minimal) {
    doctor.content.en.imageAlt = "Existing catalogue portrait used only for a software layout test";
    doctor.content.ar.imageAlt = "الصورة الشخصية الحالية من الدليل مستخدمة لاختبار التخطيط فقط";
  }
  doctor.profile = { content: {
    en: {
      metaTitle: "English profile template test", metaDescription: "Isolated software test layout, not an approved clinician profile.",
      biography: ["This isolated page checks a bilingual software template. It is not a doctor's biography or medical information.", "The fixture checks paragraphs, responsive imagery, navigation and contact components without describing clinical experience."],
      ...(minimal ? {} : {
        specialties: ["Section rendering test, not a specialty claim."],
        qualifications: ["Test field only, not a real qualification."],
        languages: ["Language field test, not a clinician's language claim."],
        experience: ["Experience section test, not a professional history."],
      }),
    },
    ar: {
      metaTitle: "اختبار قالب الملف باللغة العربية", metaDescription: "تخطيط معزول لاختبار البرمجيات، وليس ملفاً طبياً معتمداً.",
      biography: ["تفحص هذه الصفحة المعزولة قالباً برمجياً باللغتين. وهي ليست سيرة طبيب أو معلومات طبية.", "يفحص المثال الفقرات والصور المتجاوبة والتنقل ومكونات التواصل دون وصف خبرة طبية."],
      ...(minimal ? {} : {
        specialties: ["اختبار عرض القسم، وليس ادعاء بتخصص طبي."],
        qualifications: ["حقل اختبار فقط، وليس مؤهلاً حقيقياً."],
        languages: ["اختبار حقل اللغات، وليس وصفاً للغات الطبيب."],
        experience: ["اختبار قسم الخبرة، وليس تاريخاً مهنياً."],
      }),
    },
  } };
  const review = { reviewer: "TEST ONLY", role: "Software fixture", reviewedAt: "2026-10-30", evidenceReference: "Synthetic profile fixture, not clinic approval" };
  doctor.profile.approval = { status: "approved", substantiveBilingualContent: true, contentDigest: getDoctorProfileDigest(doctor), owner: { ...review }, clinical: { ...review }, editorial: { ...review } };
  return doctor;
}
