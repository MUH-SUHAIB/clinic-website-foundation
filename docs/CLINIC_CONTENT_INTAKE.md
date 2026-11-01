# One-visit clinic content intake

Purpose: collect the facts and approvals needed to enable useful bilingual service details and doctor profiles before the November 8, 2026 target. This checklist does not approve content, credentials, indexing or a release. Existing demo descriptions are prompts to verify, not evidence. No real detail/profile pair is currently approved.

## Bring / agree at the start

- [ ] Bring the current EN/AR website, six doctor/service records and exact outstanding copy to review together.
- [ ] Name a clinic-owner decision-maker, appropriate clinical reviewer and bilingual editor. Record each person's actual name, role and responsibility.
- [ ] Choose one content-ready doctor and service pilot; no ranking or promise to publish all twelve records. Agree when corrections/translations will be returned.
- [ ] Use a safe internal evidence reference for each decision; keep private correspondence, licence documents and patient/policy information out of the public repository. Do not collect patient information for website content.

## Doctors — review each with its owner/clinician

For every doctor: confirm full public name and English transliteration/Arabic spelling, current role and clinic association, exact approved title/specialty, a useful distinctive bilingual biography and permitted image/alt text. Confirm current authority to practise through the clinic's appropriate reviewer; publish licence details only if specifically approved. Record no guessed credentials, medical-service associations or years of experience.

Optional sections appear only when supplied and reviewed in both languages: confirmed specialties, precise qualifications, spoken languages and relevant professional experience. Omit pending sections from the approved profile rather than insert placeholders. No service-to-doctor link is inferred from a specialty label.

- [ ] **Safaa (`safaa`):** verify full name, specialty/title, founder attribution and scope of the existing dermatology/hair/PRP/diabetes/preventive wording. Collect an actual biography; verify each additional claim separately.
- [ ] **Jawad (`jawad`):** verify full name, GP title/current role and actual primary/chronic/family-care scope; collect biography and optional confirmed languages/qualifications/experience.
- [ ] **Abdullah (`abdullah`):** obtain full approved public name; verify pediatric title, patient ages, vaccinations/growth-monitoring claims and current clinic role.
- [ ] **Bassam (`bassam`):** verify full name/orthodontic title and evidence for existing “more than 20 years” wording, including the Arabic description; collect a factual biography without extrapolating dates.
- [ ] **Rana (`rana`):** verify full name, implant title and actual scope. Preserve the existing real dental-room photograph; obtain permission and confirm the room description. It is not her portrait.
- [ ] **Rishika (`rishika`):** obtain full approved name, verify general-dentist title and age/scope claims. Preserve the real dental-room photograph and truthful room alt text, not a portrait label.

Keep the current homepage Safaa/Jawad/Rana selection as a temporary editorial choice; it is not a medical ranking. Directory/homepage working content is unchanged by profile approval alone.

## Services — collect useful patient-facing specifics

For each: a distinct EN/AR overview, confirmed scope with explanations/limits, accurate existing-image description/permission, descriptive metadata and optional genuinely useful visit information/questions. A short directory summary plus contact buttons is insufficient. Do not invent treatments, advice, benefits, contraindications, prices, insurance, outcomes, equipment or clinicians.

- [ ] **General Practice (`general-practice`):** consultations, age groups, available investigations and limits; verify the broad preventive/diagnosis/treatment summary.
- [ ] **Pediatrics (`pediatrics`):** ages, actual consultations and limits; explicitly verify any vaccinations/growth monitoring rather than copying doctor text.
- [ ] **Obstetrics & Gynecology (`obstetrics-gynecology`):** exact outpatient scope, follow-up/investigations and limits; do not imply delivery or emergency facilities.
- [ ] **Dentistry (`dentistry`):** confirm preventive, restorative, cosmetic and implant categories separately; verify any specific procedure/provider statement.
- [ ] **Skin Care & Aesthetics (`skin-care-aesthetics`):** actual treatments, licensed scope and confirmed devices/benefit claims if mentioned; clarify relationship to dermatology without duplicate pages.
- [ ] **Hijama & PRP (`hijama-prp`):** verify both offerings, distinct scope, benefit claims and usefulness of one combined page; no invented efficacy/safety/eligibility statements or automatic split.

## Clinic details and images

- [ ] Verify public EN/AR trading/licensed names, Al Madam/Sharjah address, floor/side entrance and map pin against the current centralized clinic record. Keep the exact Maps business listing separate from directions; do not alter the pin by guesswork.
- [ ] Verify landline, mobile, WhatsApp, email and social destinations with reception. Confirm phone/WhatsApp actions reach the intended recipient without booking promises.
- [ ] Confirm **Saturday–Thursday 8:30 AM–10:00 PM; Friday 8:30 AM–11:00 AM and 3:00 PM–10:00 PM**, Asia/Dubai. Record any holiday/Ramadan changes separately; do not silently overwrite the current schedule.
- [ ] Confirm walk-in/contact arrangements only if included; no form, booking system or doctor-specific availability is implied.
- [ ] Record permission, subject and credit requirements for every retained portrait, founder/service image and room photograph. Rana/Rishika room photos stay; no replacement portraits or illustrations are authorized.
- [ ] Preserve stakeholder-confirmed seven insurers and seven reviews. Separately confirm plan/service coverage, rating freshness and reuse permissions; no universal coverage promise. Review founder quote/attribution and promotional claims before official launch.

## Sign-off before enabling each pair

- [ ] Owner confirms identity, current clinic association, availability, image permissions and operational facts.
- [ ] Appropriate clinical reviewer confirms titles, qualifications and every medical statement within the actual scope; owner confirmation alone is insufficient.
- [ ] Bilingual editor checks the complete EN/AR pair for accurate equivalent meaning, metadata, alt text and RTL/numeric presentation.
- [ ] Record genuine reviewer identity/role, actual review date (YYYY-MM-DD UTC) and safe evidence reference. Mark the complete content version approved and substantive only after review. Optional unapproved material remains absent.
- [ ] Developer binds approval to the reviewed copy/assets/URL using the catalogue digest, then tests both languages, links, metadata and noindex. Any material edit invalidates approval until re-reviewed. A digest does not authenticate a reviewer or prove medical accuracy.
- [ ] Missing substantive content, a translation or review means **404 and no detail link**. Keep existing demo cards; never publish thin pages to meet the deadline.
- [ ] Keep demo/preview HTML and headers noindex. Official domain/DNS, indexing, release and any confirmed service/doctor associations require their own explicit approval; this visit does not authorize them.

## Developer handover state

This branch implements an optional, version-bound profile model and one server-rendered template. All six original doctor records and service records, three featured doctors, images and contact destinations remain working content. New profile fields contain no invented clinician information. Optional empty sections are omitted; any present optional copy belongs to the complete approved bilingual version. No separate draft-preview route exists.

Positive test layouts use clearly labelled synthetic software copy only in a temporary local checkout, outside production records. They demonstrate architecture, not clinic sign-off. Doctor-profile JSON-LD is omitted on the demo; a separately approved official build can describe approved visible identity using ProfilePage/Person/BreadcrumbList. A clinic-room image is never emitted as a Person's portrait. No licence, qualification, experience or service association is generated automatically.


## Local verification / repeatable layout tests

Required commands: `npm run typecheck`, `npm run lint`, `npm run build`, then all `tests/*.test.mjs` against the production build via `TEST_BASE_URL`. The existing isolated-copy builder `node tests/fixtures/create-service-detail-site.mjs` now supplies both detail families and prints its temporary directory. Build/start that copy separately and supply `TEST_DETAIL_FIXTURE_URL` for positive route/layout tests. No test fixture is imported into application content or served by a production route.

For official metadata tests only, generate a second isolated copy with `--official-fixture`; set the three existing indexing variables only for that temporary build/start process, on a separate loopback port, and provide `TEST_OFFICIAL_FIXTURE_URL`. Do not edit environment files, change Vercel settings or deploy either temporary copy. Tests check approved self-canonicals/reciprocal hreflang, safely parsed schema, room-photo exclusion from Person.image and localhost-alias noindex. All real records remain unapproved.

The small shared `detail-approval.ts` module preserves the service digest/review policy and is used by both catalogues. TypeScript's `allowImportingTsExtensions` is enabled with the existing `noEmit` so native Node TypeScript tests and Next.js can import that one helper without adding a dependency or duplicating validation. Catalogue summaries remain server-selected; client cards import types only.


## Verification recorded for this foundation

- Latest main base: `a6d258a9530cec981bf839e9c9ff7b966b0f836a`; branch `codex/doctor-detail-foundation`. Branch-only implementation, not a release.
- TypeScript, lint, production build and whitespace checks pass. All 57 focused tests pass with no skipped tests, including isolated official metadata/schema and alias noindex checks.
- All twelve unapproved doctor-profile URLs and twelve unapproved service-detail URLs return real 404s on the actual local production build. Fixture slugs/source files are unavailable there; synthetic profile copy/review evidence is absent from built production assets. Cached negative-test 404s may contain the requested slug in routing state, which is not fixture-content exposure.
- All six doctor and six service data records compare unchanged with main. Homepage still selects Safaa/Jawad/Rana; directories retain six. Rana/Rishika room images and accurate localized alt text remain unchanged.
- Browser checks: both detail families, EN/AR, 320/390/768/1440px, no overflow, loaded responsive images, header clearance, 48px contact controls and one floating-contact pair. Repeated desktop/mobile switches retain actual slugs; directory links, skip-to-content, visible keyboard focus and mobile Escape-close work.
- Existing warnings: two native-image lint warnings, Node module-format notices, requested WhatsApp green/white contrast and possible fixed-contact overlap during mobile scrolling. No claim of full WCAG certification or real-user Core Web Vitals.
- No dependency, official-domain/indexing configuration, contact fact or medical-content change. The initial implementation was uncommitted. Final code-review authorization covers a commit, branch push and PR only; no merge or manual deployment. Real service/profile publication remains blocked on substantive bilingual content and actual approvals.

Implementation file inventory (16 files):

- `app/[locale]/doctors/[slug]/page.tsx`
- `components/doctors/doctor-profile.tsx`, `components/doctors/doctor-card.tsx`
- `lib/content/doctors.ts`, `lib/content/detail-approval.ts`, `lib/content/services.ts`
- `components/sections/header.tsx`, `i18n/routing.ts`
- `messages/en.json`, `messages/ar.json`, `tsconfig.json`
- `tests/doctor-profile.test.mjs`, `tests/fixtures/doctor-profile.mjs`
- `tests/fixtures/create-service-detail-site.mjs`, `tests/service-detail.test.mjs`
- `docs/CLINIC_CONTENT_INTAKE.md`
