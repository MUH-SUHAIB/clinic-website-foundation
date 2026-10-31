# Bilingual Service Detail Pages — Implementation Plan

Status: planning only; no application implementation or publication authorized by this document.

Baseline: latest GitHub `main`, commit `3411a0b07d74ac283e5e09b4292e0996fa56ea2d`, inspected for this task. This file is a local draft on `codex/service-detail-plan`.

## 1. Objective and current facts

Build useful English and Arabic service pages through one reusable template at `/en/services/[slug]` and `/ar/services/[slug]`. Preserve the current premium design, service/doctor directories, homepage previews, contact actions, actual clinic imagery, RTL and demo indexing protection.

The repository currently has six service records in `lib/content/services.ts`. Each has a stable ID/slug, existing image, English/Arabic title and short description, `publicationStatus: demo` and `clinicalReviewStatus: needs-review`. There are no individual service routes, detailed descriptions, service-specific FAQs, approval evidence or explicit doctor-to-service associations. `ServiceSummary` currently omits the slug; cards have no detail links.

Existing reusable foundations include the Services directory, `ServiceCard`/`ServiceGrid`, typography, locale navigation helpers, shared contact actions, floating controls, clinic contact/location helpers and indexing tests. Doctor records are also unverified demo content. A matching specialty label is not sufficient evidence to assign a doctor to a service.

Some status statements in `PROJECT_BLUEPRINT.md` are historical: the directories and indexing foundation are now on the inspected main commit. This plan follows its safety standards while using actual repository state for implementation facts. Updating that document is outside this task.

**Readiness decision:** none of the six records currently provides enough distinct, reviewed information for a substantive detail page. Keep the current summaries in the directories. Do not turn each summary plus a contact button into a new public page. Choose the first pilot by content readiness and clinic approval, not by an assumed medical ranking or search-volume promise.

## 2. Existing content and verification gaps

All wording below describes the existing inventory, not independently confirmed services or new medical advice. Proposed slugs preserve current records; each would have both locale prefixes.

### General Practice / الطب العام

- Slug: `general-practice`; image: `/baghdad/services/general-practice.avif`.
- Existing summary mentions primary care, preventive check-ups, diagnosis/treatment and patients of all ages.
- Confirm the actual scope, age groups, consultations offered, responsible clinicians, appointment arrangements and any limits on testing or treatment. Do not infer that every investigation or age-specific service is available.

### Pediatrics / طب الأطفال

- Slug: `pediatrics`; image: `/baghdad/services/pediatrics.jpg`.
- Existing summary describes care for infants, children and adolescents.
- Confirm age limits, available consultations, clinician assignments and which related services are actually offered. Vaccinations and growth monitoring appear in working doctor copy, but must not automatically become service-page claims.

### Obstetrics & Gynecology / النساء والولادة

- Slug: `obstetrics-gynecology`; image: `/baghdad/services/obstetrics-gynecology.webp`.
- Existing summary mentions women's healthcare, pregnancy care and continuing support.
- Confirm the precise outpatient scope, clinician availability and whether particular examinations, pregnancy follow-up or investigations are offered. Do not imply delivery facilities, emergency obstetric care or procedures absent from confirmed information.

### Dentistry / طب الأسنان

- Slug: `dentistry`; image: `/baghdad/services/dentistry.jpg`.
- Existing summary lists preventive, restorative, cosmetic and implant dentistry.
- Confirm each listed category, which clinicians provide it, and any service limitations. Do not infer procedures, success rates, guarantees, sedation options, prices or insurance coverage from category labels or doctor descriptions.

### Skin Care & Aesthetics / العناية بالبشرة والتجميل

- Slug: `skin-care-aesthetics`; image: `/baghdad/services/skincare.webp`.
- Existing summary mentions skincare, facials, laser procedures and aesthetic services.
- Confirm actual treatments, their licensed scope, qualified providers and any clinical explanations. Do not invent devices, brands, suitability criteria, expected results or treatment schedules. Confirm how this category relates to dermatology rather than creating overlapping pages with nearly identical text.

### Hijama & PRP Therapy / الحجامة وعلاج PRP

- Slug: `hijama-prp`; image: `/baghdad/services/hijama-prp.jpg`.
- Existing summary combines Hijama and PRP, with wellness, skin-rejuvenation and hair-restoration wording.
- These benefit claims require clinical review. Confirm both offerings, the intended scope and whether a combined page is useful to patients. Do not describe the treatments as interchangeable or invent efficacy, safety or eligibility statements. Splitting this category into separate pages requires a later explicit decision and sufficient distinct approved content; do not silently change the current slug.

### Confirmation required for every service

Obtain clinic-owner confirmation of availability and operational facts, appropriate clinical review of medical statements, and bilingual editorial review. Record evidence references, reviewer identity/role, review date and content version internally. Do not invent a reviewer's credentials or display an approval date that does not exist.

Confirm image provenance, permission and what each image actually depicts before expanding its use. Retain existing assets; do not invent portraits or mislabel room images as clinicians. Do not infer service-specific hours, prices, insurance acceptance, outcomes or doctor affiliations from general clinic content. Confirmation requests remain internal and never render as patient-facing placeholders.

## 3. One reusable template and small data boundary

Proposed future implementation locations, not files created by this task:

- `app/[locale]/services/[slug]/page.tsx`: validate locale/slug, resolve one eligible record, generate metadata and render the template. Use the existing Next.js asynchronous route-params convention.
- `components/services/service-detail.tsx`: one server component for page layout and optional sections. Reuse existing typography and contact components rather than building a second design system.
- `lib/content/services.ts`: retain the single service catalogue and extend records with optional typed detail content and readiness/review information. A small adjacent helper is reasonable if eligibility/metadata logic becomes clearer there; no repository framework, CMS or dependency is needed.
- `i18n/routing.ts` and existing navigation helpers: register the dynamic route and resolve actual parameters.
- `tests/`: extend content, routing, publication and indexing coverage alongside existing tests.

Keep concerns separate: records hold clinic facts; an eligibility function decides whether a locale can be served; the template renders eligible data; metadata uses that same eligible record. Reuse the lookup in page rendering, metadata, static generation and internal-link decisions so they cannot disagree.

Suggested detail fields: localized overview and supported scope sections, optional patient-visit information, optional reviewed FAQs, localized image descriptions, confirmed clinician IDs/related-service IDs, and per-locale editorial/clinical approval evidence. Avoid arbitrary rich HTML, generic block builders or speculative medical fields.

Keep detail readiness separate from directory visibility: adding a draft detail record must not remove the existing demo card or make its summary a public detail page. Do not assume the current `published`/`approved` service flags prove the new detail copy is reviewed. Include explicit detail readiness and approval for both language versions. Any material copy change invalidates its previous approval until reviewed again.

## 4. Proposed sections and internal links

The template should preserve directory spacing, rounded panels, blue/pink accents and responsive image treatment. Suggested content order:

1. Breadcrumbs: Home → Services → current service, with localized labels and real locale-aware links.
2. One H1 using the confirmed service name, a useful introductory summary and an existing appropriate image.
3. A substantive overview of what the clinic actually provides, followed by confirmed scope or service categories. This is required detail content, not a repeated card description.
4. Optional practical visit information, such as confirmed booking arrangements. Preparation, suitability, risks or aftercare appear only if needed and supplied/reviewed by the clinic; the template must not generate advice.
5. Optional relevant clinicians, only through explicit confirmed service associations. Link to the existing Doctors directory or a stable card anchor after implementing/testing that anchor; individual doctor pages do not exist and must not be linked.
6. Optional service-specific questions with reviewed answers. Omit the section when there is no approved useful content; do not repeat generic FAQs just to fill space.
7. Existing Call/WhatsApp actions, a link to the locale homepage contact section and a return link to all services. Do not imply an appointment has been booked by opening a contact link.
8. Optional related services with distinct eligible pages and confirmed relevance. Do not create links to drafts, unavailable translations or hypothetical procedures.

Only add a descriptive detail link to a homepage/directory service card when that destination is eligible. Preserve non-clickable cards otherwise, without disabled fake buttons. Avoid nested interactive elements or wrapping a card around its own contact controls.

Keep homepage-section links pointed at `/{locale}#about`, `#facilities`, `#testimonials`, `#insurance`, `#faq` and `#contact`, rather than hashes on a detail page. Header Services should remain visually active for its child routes; use `aria-current="page"` only for the exact current page and breadcrumb, not falsely on the parent directory.

## 5. EN/AR routing and language switching

Retain the same stable ASCII slug in both languages. For example, `/en/services/general-practice` pairs with `/ar/services/general-practice`; this is a proposed URL, not a published route. Register `/services/[slug]` in the existing `next-intl` pathname map and generate typed links with the actual slug parameter.

The current header builds language links by concatenating a locale with `usePathname()`. With configured dynamic pathnames, that hook can return a template containing `[slug]`. Update the existing switcher to use locale navigation and validated actual parameters, following the library's navigation API; do not expose the literal placeholder or maintain two separate hardcoded page lists.

For the initial feature, require both languages to be ready before enabling a service detail pair. A missing/unapproved translation must not silently display English in Arabic or redirect to an unrelated homepage. Unknown locale/slug and ineligible detail content return a genuine 404; unpublished records are excluded from generated paths and links. Static generation alone is not an access/publication gate: request-time lookup must enforce eligibility too.

Keep Arabic `dir="rtl"`, semantic source order and existing bidi isolation for Latin terms, numbers and contacts. Never reverse strings. Preserve locale/slug on repeated language switches; use translated, stable section IDs if retaining an in-page anchor is supported, otherwise omit an invalid anchor deliberately.

## 6. Content, publication and indexing safeguards

Use separate decisions for content eligibility and search indexing:

- A draft is not publicly routable, linked, statically generated or included in structured data/sitemaps. Noindex is not access control or permission to expose an unfinished draft. Any internal draft review needs a separately authorized restricted workflow.
- Existing demo summaries remain working content. A detail pair needs distinct useful content and documented approval for that detail scope before becoming an enabled demo page. No filler, invented clinical information or automatic promotion of current records.
- Approved demo details still receive HTML `noindex, follow` and `X-Robots-Tag: noindex, follow`. Keep crawler access open; do not add a robots.txt block that hides the noindex directive.
- Official publication requires both clinic/content approval and the separately authorized official-domain launch. Preserve the existing environment checks: approved indexing flag, exact official site URL and Vercel production environment. Never alter those settings as part of the first detail-page implementation.
- Preserve the host check in `proxy.ts`. Demo/preview aliases serving an approved production build still require host-specific noindex headers. Shared approved-build HTML may contain an official self-canonical; that does not authorize indexing the alias. Test both ordinary demo builds and this alias case.

Do not create six near-identical pages or location-keyword variants such as repeated “near me” pages. Release only records with enough service-specific information to help a patient understand the offering and next step. There is no arbitrary word-count target. If the content is still just a summary, leave it in the directory.

## 7. SEO metadata, structured data and AEO/GEO

Generate unique localized titles/descriptions from confirmed content. A title pattern may combine the confirmed service name, clinic name and Al Madam location after verification; do not add credentials, superlatives, outcomes or keyword lists. Keep one H1, clear H2s and readable patient-focused explanations. Do not promise rankings or AI citations.

For noindex demo/preview builds, follow the current policy of omitting premature official-domain canonicals and SEO alternate URLs. Visible locale-switch links must still work. At the separately approved official launch, each eligible English/Arabic page gets its own self-canonical, reciprocal absolute `hreflang` links including itself, and matching localized social metadata. Never canonicalize Arabic to English. Include only eligible indexable canonical URLs in a future sitemap; no sitemap route exists in this baseline.

Structured data should describe visible, approved facts:

- `WebPage` and `BreadcrumbList` can describe the page and its real breadcrumb trail.
- Consider Schema.org `Service` for a confirmed offering, with its localized name, description and provider linked to a single consistent clinic identity. Reuse verified clinic data; do not duplicate contact facts or create a new clinic entity per service.
- Do not automatically use treatment/disease schemas simply because the page is medical. Do not invent credentials, reviewer profiles, price offers, ratings, outcomes or unsupported specialties. Do not add self-serving aggregate-rating markup.
- On the noindex demo, omit optional medical/provider schema for unverified facts. If page/breadcrumb schema is included for validation, its URLs must identify the demo environment, not present the demo as the official website. For an approved official build, keep canonical entity URLs consistent and retain alias noindex protection.
- Generate JSON-LD from the same eligible data, safely serialize it, escape script-breaking characters and avoid arbitrary HTML injection. Validate schema syntax and visible-content consistency. Schema validity does not guarantee a Google rich result; generic Service markup is not a ranking feature.

For AEO/GEO, prioritize clear approved answers, accurate clinic context and visible review attribution when it exists. Do not add special “AI schema,” fabricated expertise or citation guarantees. FAQs are optional content, not an assumed entitlement to FAQ rich results.

## 8. Performance, accessibility and maintainability

Use server-rendered/static content and generate only eligible paths. Keep client JavaScript for necessary existing interactions; no new animation library, client-side catalogue fetch, database or dependency. Preserve fixed contact controls and their current colors; the known WhatsApp white-on-green contrast limitation remains documented, not silently changed or described as compliant.

Reuse current optimized images with explicit dimensions/aspect ratio and accurate responsive `sizes`. Preload only a measured above-the-fold candidate; lazy-load lower-page images. Preserve the existing AVIF handling until tested rather than accidentally routing that asset through an incompatible image pipeline. Inspect the actual image before changing alt text; do not imply that a room is a doctor portrait or that an illustrative photo proves a procedure is available.

Use semantic landmarks, one H1, logical heading order, readable text, descriptive links, visible keyboard focus, adequate touch targets and a working skip link. Support zoom, reduced motion and RTL. Avoid horizontal overflow and ensure floating contacts do not make core actions inaccessible on small screens. No autoplay, compulsory sliders, unnecessary accordions or sticky content overlays.

## 9. Implementation sequence and decision points

1. **Clinic content brief:** choose a pilot service; collect the verified scope, useful distinct copy, clinician associations and image permissions. Resolve overlapping/bundled categories. If evidence/content is insufficient, stop at the directory.
2. **Bilingual review:** prepare English and Arabic copy without invented expansion. Obtain owner/clinical/translation approval for the same content version. Confirm this does not authorize official indexing.
3. **Typed detail foundation:** add optional detail records, per-locale readiness and one tested eligibility/lookup boundary. Keep all existing summary records and review states intact until expressly approved.
4. **Pilot implementation:** on a separately authorized feature branch, add the dynamic route and one shared server template, metadata, breadcrumbs, safe contact actions and parameter-aware locale switching. Enable only the approved pilot pair.
5. **QA and scoped review:** run the acceptance checks below, inspect preview output and diff, and obtain explicit authorization before committing, pushing, merging or deploying. Publication can be rolled back by disabling that detail record and its links without removing the directory summary.
6. **Expand by readiness:** reuse the same template for other services only after their own approvals. Leave incomplete sections/pages absent; do not make six-page completion a release requirement.
7. **Separate official launch:** connect/verify the official domain, approve indexing, confirm canonical/alternate/schema URLs and sitemap contents, then verify live behavior through an expressly authorized release. No DNS or production settings changes are included now.

## 10. Acceptance criteria and test plan for future implementation

### Content and model tests

- Existing six IDs/slugs and summary text are preserved unless a specific approved correction exists.
- Every enabled detail locale has distinct substantive content, complete required sections and recorded approval for its current version. Missing details, missing locale, draft status, absent review or revoked approval fail closed.
- Summaries alone never qualify a detail page. English content is not an Arabic fallback. Optional sections disappear cleanly; internal confirmation notes never appear in HTML or metadata.
- All clinician/related-service references resolve and have explicit approved relationships. Actual room images retain truthful localized alt text; existing doctor records remain unverified unless separately reviewed.

### Route and rendered-page tests

- Test every enabled slug in both locales, not just the pilot screenshot. Unknown slugs/locales, unavailable translations and hidden records return 404 without public links or data leakage.
- Check Homepage → Services → detail → all services, breadcrumb Home/Services, header/footer links and homepage-section anchors from nested routes.
- Repeated EN ↔ AR switching preserves the actual slug and never yields `[slug]`, a lost segment or an unrelated page. Services parent highlighting and exact `aria-current` semantics are correct.
- Assert one H1, correctly labeled sections, unique IDs, accurate image alt text and working skip/focus navigation. Check Call/WhatsApp hrefs and verified clinic map actions without placing calls or sending messages.
- Preserve Services and Doctors directories, homepage three-doctor preview, floating controls and contact destinations. No unrelated style or medical-content changes.

### Indexing, metadata and schema tests

- For ordinary noindex builds on localhost, Vercel preview and the production demo, all enabled page responses have noindex in HTML and headers. Crawlers can access the response; no robots.txt disallow is introduced.
- Exercise the existing indexing environment matrix and exact-host check, including approved production HTML served through a demo/preview alias. In that alias case, shared HTML may contain approved official metadata, but the alias must still return a host-specific noindex header. Test official-launch behavior with isolated test configuration; never enable real indexing for QA.
- Assert correct localized title/description, no premature official canonical on a demo build, reciprocal eligible official alternates, and no draft/unapproved URL in any future sitemap or schema.
- Parse generated JSON-LD, check URL origins, data/visible-content consistency and safe escaping. Validate supported rich-result markup with Google's tool and generic schema with Schema.org's validator; report unsupported result types honestly.

### UI, performance and release checks

- English and Arabic at 320, 390, 768 and 1440px: images, long titles, contact controls, menus, breadcrumbs, text wrapping and no horizontal overflow.
- Keyboard-only navigation, visible focus, meaningful accessible names, zoom and reduced motion. Inspect mobile and desktop screenshots and contrast; record known baseline limitations rather than claim full WCAG certification.
- Check image requests/dimensions and client payload; avoid duplicate preloads, unnecessary scripts and layout shifts. Lighthouse is a lab check, not proof of real-user Core Web Vitals.
- Required commands: `npm ci`, `npm run typecheck`, `npm run lint`, `npm run build`, then focused content/routing/indexing tests against the production build. Review logs for missing translations even when the process exits successfully. Compare new failures/warnings with baseline; do not weaken tests.
- Review changed files and secret hygiene. Stop on failed required checks. Any later release must verify that Vercel production still targets only the approved demo, then repeat live route, content, image, contact and noindex tests. Official-domain/DNS changes require separate authorization.

## 11. Planning deliverable and references

This task creates only this plan. It does not create routes, approve medical content, enable indexing, change DNS or authorize a release. Application build/browser tests are acceptance work for a later implementation, not results claimed by this document.

Primary documentation consulted for the plan:

- [Google: helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — usefulness and trustworthy content rather than padded word counts.
- [Google: localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions) — reciprocal language annotations.
- [Google: noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing) — keep crawling available so indexing directives can be read.
- [Google: structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) — structured data must reflect visible content.
- [Google: AI features](https://developers.google.com/search/docs/appearance/ai-features) — existing search fundamentals apply; no special AI markup requirement.
- [next-intl: navigation](https://next-intl.dev/docs/routing/navigation) — dynamic pathname templates require their actual parameters when changing locale.
- [Schema.org: Service](https://schema.org/Service) — vocabulary reference, not a promise of Google search features.
