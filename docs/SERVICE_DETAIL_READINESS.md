# Service detail foundation — content readiness

Target completion: November 8, 2026. This foundation does not approve clinic content or authorize release.

## Current state

The six existing bilingual directory/homepage summaries and images remain unchanged working content. None has substantive, approved detail content. All twelve corresponding EN/AR detail URLs therefore return 404 and their cards have no detail links. There are no patient-facing placeholders.

One shared server-rendered template supports an overview, required confirmed service scope, optional practical visit information and optional service-specific questions. It reuses the existing image, typography, footer, navigation and Call/WhatsApp destinations. Generic Doctors/Contact links do not imply any doctor-to-service association.

## What the clinic must provide

For **every service**, supply useful English and Arabic copy: a distinct overview, confirmed scope with explanatory paragraphs, localized metadata title/description and an accurate description of the existing image. Optional practical visit information and FAQs must be service-specific, useful and reviewed; omit unavailable sections. There is no word-count target and no permission to pad summaries into SEO pages.

Confirm image subject/provenance and permission for detail-page use. Do not infer service-specific hours, prices, insurance eligibility, treatments or clinician assignments from general clinic information or matching specialty names.

Record real clinic-owner approval of availability/operational facts, appropriate clinical review of medical statements, and bilingual editorial review of the **complete pair**, including names, existing summaries, image descriptions and metadata. Each review requires reviewer identity, role, actual review date (YYYY-MM-DD in UTC) and an internal evidence reference. These references need not be public URLs and must not be invented. Reviews are internal and never rendered on the page. The `substantiveBilingualContent` decision is a human assessment of usefulness, not an automatic medical fact check.

### General Practice — `general-practice`

Confirm the actual consultations offered, patient age groups and scope/limits of preventive check-ups, diagnosis, treatment and investigations. Clarify operational next steps and clinician availability if mentioned. Do not assume every age group or test is supported from the existing broad summary.

### Pediatrics — `pediatrics`

Confirm age limits, available consultations, scope and limitations. Explicitly verify vaccinations, growth monitoring or any other related offering before including it; existing doctor descriptions are not approval evidence. Confirm clinician associations separately if later requested.

### Obstetrics & Gynecology — `obstetrics-gynecology`

Confirm exact outpatient services, examinations/investigations, pregnancy follow-up scope and availability. Establish clear service limits. Do not imply delivery facilities, emergency obstetric care or procedures from the category name.

### Dentistry — `dentistry`

Confirm each existing category: preventive, restorative, cosmetic and implant dentistry. Supply a useful explanation of the actually available offering and limitations. Any procedures, provider assignments, sedation, prices, outcomes or insurance statements need specific confirmation; no guarantees may be inferred.

### Skin Care & Aesthetics — `skin-care-aesthetics`

Confirm actual treatments, licensed scope, qualified provider information if included, and the current facial/laser/aesthetic wording. Any devices, brands, suitability criteria, schedules or expected results need clinical evidence and approval. Clarify the relationship to dermatology before proposing overlapping pages.

### Hijama & PRP — `hijama-prp`

Confirm whether both are currently available, the distinct scope of each, and whether one combined page genuinely helps patients. Review existing wellness, skin-rejuvenation and hair-restoration benefit claims. Do not invent efficacy, safety or eligibility statements or describe these offerings as interchangeable. Splitting the catalogue/slug is outside this task.

## How reviewed content can be enabled later

1. Add optional `details.content.en` and `.ar` to the existing typed record. Keep drafts unapproved and out of routes/cards.
2. Obtain the actual reviews above. Complete metadata, image alt text, overview and meaningful scope. A copied directory summary alone fails the structural gate, even with an approval marker.
3. After review, use `getServiceDetailDigest(record)` to bind approval to the exact current bilingual content, asset, ID and URL; record the genuine reviews and explicit approved/substantive decision. A digest is an integrity check, not authentication or proof that a reviewer exists. No runtime approval UI is introduced.
4. Re-run route, language-switch, metadata, noindex and visual tests. Any content/asset/URL edit invalidates the digest and disables the pair until reviewed again.
5. Keep official publication separate: approved detail content may be shown on the noindex demo, but an indexable official build also requires the catalogue's existing `published` / `approved` flags and the separately authorized domain/indexing settings. Those settings are unchanged by this foundation.

Static generation, page resolution, metadata and card linking share the approval policy. Unknown, unapproved or incomplete detail pairs fail closed. The demo omits detail canonicals/hreflang and detail JSON-LD; an authorized official build can emit localized self-canonicals, reciprocal language alternates, WebPage and BreadcrumbList schema using visible approved text. No new clinical schema, doctor associations or sitemap route is introduced. A future sitemap must use the same eligibility gate.

## Reproducible checks without approving real services

Run `npm run typecheck`, `npm run lint`, `npm run build`; start the real production build locally. Run `TEST_BASE_URL=http://127.0.0.1:3101 node --test tests/*.test.mjs` to check the real catalogue, existing pages and unapproved 404s.

Positive route/rendering tests use `tests/fixtures/service-detail.mjs`, explicitly non-medical software-test text. It is never imported by application code. `node tests/fixtures/create-service-detail-site.mjs` prints an isolated temporary copy location, excluding credentials, environment files and Git history. Existing dependencies are symlinked, not installed. Build/start that copy on a separate local port. Then run the suite with both `TEST_BASE_URL` and `TEST_DETAIL_FIXTURE_URL` set. No fixture, approval bypass or draft-preview environment flag is added to the real site.

Check the isolated template in EN/AR at 320, 390, 768 and 1440px, including real directory links, repeated desktop/mobile language switches, keyboard skip/focus navigation, responsive images, contacts and header clearance. Fixture screenshots are layout evidence, not approved clinic content or released pages.

## Remaining release limitations

- No real detail page is enabled until the required bilingual content and reviews arrive; November 8 cannot override this gate.
- Baseline WhatsApp green/white contrast limitations remain; the requested colors are unchanged. Existing fixed floating controls can temporarily overlap text at some mobile scroll positions; scrolling exposes the text. Their shared placement is unchanged. This is not a full WCAG certification.
- Existing lint warnings for native images in Insurance and the generic UI card, and Node's native-TypeScript module-format warning, are unrelated to this foundation.
- No dependencies, DNS, environment variables, official-domain controls, medical claims or contact facts are changed. The current review authorizes committing and pushing this branch only; no PR, merge or deployment is authorized.


## Verification performed on this branch

- Production build, TypeScript and lint passed; lint has the two existing native-image warnings noted above.
- All 44 tests passed against the real production build plus the isolated non-medical fixture, with no failures or skipped tests. This includes twelve unapproved real detail URLs, unknown/fixture slugs, fixture-source exposure, missing/revoked/stale reviews, required content and translation gaps, positive bilingual template rendering, card links, metadata, noindex and existing page regressions.
- Browser checks covered EN/AR template, real homepage and directory at 320/390/768/1440px: no horizontal overflow. Responsive images loaded; contact actions retained their destinations. Desktop/mobile locale switches preserved the actual slug; keyboard skip navigation and mobile Escape-close worked. Existing header clearance was checked.
- HTML and X-Robots-Tag noindex passed on all ten existing localized pages and the isolated eligible detail pair. Existing official-domain environment/host matrix tests passed; official indexing configuration, proxy, dependencies and environment files were unchanged.
- Compared all six raw catalogue records with latest main: names, descriptions, images, IDs, slugs and review/publication flags are unchanged. The pre-existing uncommitted launch plan was preserved.
- Whitespace checks passed. The final code review authorizes a commit and branch backup push only; no PR, merge or manual deployment.


## Task file inventory

- `app/[locale]/services/[slug]/page.tsx` — shared route validation, static paths and localized metadata.
- `components/services/service-detail.tsx` — server-rendered template and conditional official WebPage/breadcrumb schema.
- `lib/content/services.ts` — optional typed details and content-bound approval gate; original six records unchanged.
- `components/services/service-card.tsx` — descriptive link only when details qualify.
- `components/sections/header.tsx` — actual slug-preserving switch and parent Services highlighting.
- `i18n/routing.ts` — dynamic pathname registration.
- `messages/en.json`, `messages/ar.json` — generic localized template labels only.
- `tests/service-detail.test.mjs` — eligibility and production-route/rendering coverage.
- `tests/fixtures/service-detail.mjs` — isolated non-medical positive fixture.
- `tests/fixtures/create-service-detail-site.mjs` — reproducible temporary test-copy builder.
- `docs/SERVICE_DETAIL_READINESS.md` — clinic dependencies, enablement instructions, limitations and verification.

The pre-existing `docs/ONE_WEEK_LAUNCH_PLAN.md` is preserved with its original planning content and a review-status note, and is included in this branch commit.


## Final code-review findings

The 13-file scope (including the preserved launch plan) contains no unrelated application changes or new dependencies. Existing cards, imagery, contact destinations and indexing safeguards remain unchanged. Detail rendering is shared, and clinical copy is not duplicated into components. Plain text is React-escaped; conditional JSON-LD escapes `<` before script insertion. Review evidence is not passed to client cards or rendered publicly. Secret-pattern review found no matches in changed files; environment/credential files are excluded.

Fixture data has no imports from production application code, is outside `public` and routes, and is absent from built browser assets. Direct fixture-slug and fixture-source HTTP requests return 404 on the actual site. The positive fixture exists only in an explicitly generated temporary copy and is served on loopback for tests, then stopped. There is no production environment flag or route to enable it. Test sources will be versioned in GitHub; that is distinct from a publicly accessible website endpoint. Do not deploy the generated temporary fixture copy.

No blocking security, duplication or scope issue was found in this review. Human review remains essential: a digest binds content to a recorded approval but does not authenticate reviewers or establish medical accuracy. No real service details are eligible until the outstanding bilingual content and genuine approvals are supplied.
