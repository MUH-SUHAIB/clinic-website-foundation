// NONLEGAL software-layout fixture. Never a clinic policy or actual approval.
import { legalContentDigest } from '../../lib/content/legal-documents.ts';
export function approvedLegalFixture(kind='privacy') {
  const document={kind,publicationStatus:'published',applicability:'appropriate',justification:'TEST ONLY: exercise a software layout; no legal determination.',content:{
    en:{title:'Document layout test',metaTitle:'English document layout test',metaDescription:'Isolated software test, not a policy or legal advice.',introduction:['This isolated example checks a document layout. It makes no statement about clinic duties or data practices.'],sections:[{heading:'Readable test paragraphs',paragraphs:['This synthetic paragraph checks spacing, headings and navigation. It is not a privacy policy, terms or cookie disclosure.']},{heading:'Mixed content test',paragraphs:['Layout test 08:30 and EN/AR text; no legal obligations or guarantees are supplied.']}]},
    ar:{title:'اختبار تخطيط مستند',metaTitle:'اختبار مستند باللغة العربية',metaDescription:'اختبار برمجي معزول، وليس سياسة أو استشارة قانونية.',introduction:['هذا مثال معزول لاختبار تخطيط مستند. لا يصف التزامات المركز أو ممارسات معالجة البيانات.'],sections:[{heading:'اختبار وضوح الفقرات',paragraphs:['تختبر هذه الفقرة الاصطناعية المسافات والعناوين والتنقل. ليست سياسة خصوصية أو شروط استخدام أو إفصاحًا عن ملفات الارتباط.']},{heading:'اختبار النص المختلط',paragraphs:['اختبار تخطيط 08:30 ونص EN/AR دون تقديم التزامات أو ضمانات قانونية.']}]},
  }};
  const review={reviewer:'TEST ONLY',role:'Software layout reviewer',reviewedAt:'2026-11-02',evidenceReference:'PRIVATE SYNTHETIC LEGAL REVIEW EVIDENCE'};
  document.approval={status:'approved',completeBilingualContent:true,contentDigest:legalContentDigest(document),owner:{...review},legal:{...review},editorial:{...review}};
  return document;
}
