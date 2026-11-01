// Non-medical test data only. Never imported by the application catalogue.
import { clinicServices, getServiceDetailDigest } from "../../lib/content/services.ts";

export function approvedDetailFixture() {
  const service = structuredClone(clinicServices[0]);
  service.id = service.slug = "layout-fixture";
  service.content = {
    en: { title: "Service template layout test", description: "Test-only directory summary." },
    ar: { title: "اختبار تخطيط قالب الخدمة", description: "ملخص دليل للاختبار فقط." },
  };
  service.details = { content: {
    en: {
      metaTitle: "English service template test",
      metaDescription: "Isolated layout fixture, not clinic information or medical advice.",
      imageAlt: "Existing catalogue image used only to test responsive layout",
      overview: "This isolated test checks a bilingual page template. It describes software testing, not a medical service.",
      scope: { heading: "What this test checks", paragraphs: ["The test checks readable paragraphs, navigation links and responsive image layout without making medical claims."] },
      visit: { heading: "Optional section test", paragraphs: ["This optional section verifies spacing when more approved content is supplied."] },
      faqs: [{ question: "Is this clinic content?", answer: "No. This is synthetic software test content and is never published in the clinic catalogue." }],
    },
    ar: {
      metaTitle: "اختبار قالب الخدمة باللغة العربية",
      metaDescription: "بيانات اختبار معزولة، وليست معلومات عن المركز أو نصيحة طبية.",
      imageAlt: "صورة الدليل الحالية مستخدمة لاختبار التخطيط المتجاوب فقط",
      overview: "يختبر هذا المثال المعزول قالب صفحة باللغتين. وهو يصف اختبار البرمجيات ولا يصف خدمة طبية.",
      scope: { heading: "ما الذي يفحصه هذا الاختبار", paragraphs: ["يفحص الاختبار وضوح الفقرات وروابط التنقل وتخطيط الصور المتجاوب دون تقديم ادعاءات طبية."] },
      visit: { heading: "اختبار قسم اختياري", paragraphs: ["يتحقق هذا القسم الاختياري من المسافات عند توفير مزيد من المحتوى المعتمد."] },
      faqs: [{ question: "هل هذه معلومات المركز؟", answer: "لا. هذا محتوى اصطناعي لاختبار البرمجيات ولا ينشر في دليل المركز." }],
    },
  } };
  const review = { reviewer: "TEST ONLY", role: "Software test fixture", reviewedAt: "2026-10-30", evidenceReference: "Synthetic fixture, not real clinic approval" };
  service.details.approval = {
    status: "approved", substantiveBilingualContent: true,
    contentDigest: getServiceDetailDigest(service),
    owner: { ...review }, clinical: { ...review }, editorial: { ...review },
  };
  return service;
}
