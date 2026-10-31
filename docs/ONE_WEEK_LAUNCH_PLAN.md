# One-week bilingual website launch plan

Prepared: **November 1, 2026**, Asia/Dubai. Deadline: **Sunday, November 8, 2026**. Implementation window: November 1–7; November 8 is a release-decision and contingency day, not an extra feature day.

Status: proposed implementation plan only. This task creates documentation, not application features, clinical approval, a release authorization or a domain/indexing change. Planning branch: `codex/one-week-launch-plan`, based on latest fetched main `0c72a859d9b9827f1a31b4a3a4ea64a3ed845b18` (Trust Content PR #8).

Review note: this document preserves the original planning snapshot below. It is included with the service-detail foundation for context; the foundation now implements the service template and gate, but no real service detail is enabled. Doctor profiles and the other future deliverables remain separate work. Commit/push authorization for the current branch does not authorize a release.

## 1. Outcome and realistic scope

Deliver a scalable English/Arabic multi-page foundation with **both individual service-detail and individual doctor-profile architectures in scope this week**. Reuse existing typed catalogues, branding, optimized imagery, contact controls and server-rendered patterns. Aim to demonstrate one genuinely ready bilingual service pair and one genuinely ready bilingual doctor pair, then add other records only when ready and time permits. Pilot selection is based on evidence/readiness, not a medical ranking. There is no promise to publish all six service and all six doctor detail pairs by the deadline.

Assumptions: one developer has roughly 30–40 focused hours across the week; the clinic owner, an appropriate clinical reviewer and a bilingual editor are available for prompt decisions. Their content/review time is a separate dependency, not work the developer can replace with invented text. The schedule is an estimate, not an agreed commercial fee or expanded payment commitment.

Two distinct completion states must be reported:

- **Demo delivery:** tested architecture and existing pages, with only approved substantive detail pairs enabled, remain noindex on Vercel. If no detail pair meets the gate, deliver/test the architecture with all unready detail routes returning 404. This is a content-blocked foundation delivery, not a claim that individual public pages are complete.
- **Official launch:** requires approval of every intended public page, verified domain ownership/destination, a separately authorized domain/redirect/indexing release and successful live checks. November 8 does not override those requirements. If blocked, keep the existing protected demo and give the owner a precise pending-content/release list.

Excluded: blog, CMS, booking, forms collecting patient data, database, new dependencies, major redesign, unrequested domain/DNS/email changes and fabricated medical copy. No promises of rankings, Google indexing dates, rich results or AI citations by November 8.

## 2. Actual starting point and planning reconciliation

Inspected main includes Next.js 16 / React 19 / Node.js 24, `next-intl`, Tailwind and five page types in two locales: Home, Services, Doctors, Contact and About (ten URLs). Shared clinic facts/contact destinations are in `lib/clinic.ts`. Existing Maps listing and directions are separate. About reuses homepage content; phone/WhatsApp, RTL numeric isolation, images and floating controls must remain intact.

- `lib/content/services.ts`: six demo records with IDs/slugs, short EN/AR summaries and images, still `needs-review`; no detailed copy or verified clinician associations. Slugs: `general-practice`, `pediatrics`, `obstetrics-gynecology`, `dentistry`, `skin-care-aesthetics`, `hijama-prp`.
- `lib/content/doctors.ts`: six demo records with IDs/slugs and EN/AR short copy, all `needs-review`; no substantive approved biographies. Slugs: `safaa`, `jawad`, `abdullah`, `bassam`, `rana`, `rishika`. Three homepage selections are editorial, not medical rankings. Actual clinic-room photos must remain room photos with truthful alt text.
- `i18n/routing.ts` contains only the five static page patterns. No service-detail or doctor-profile route, sitemap or robots metadata route currently exists. The header's concatenated locale URL needs parameter-aware handling before dynamic paths are added.
- `lib/site-seo.ts`, locale metadata and `proxy.ts` implement demo noindex and an exact official-host approval gate. The proxy excludes dotted paths; new `/sitemap.xml` and `/robots.txt` behavior must therefore be explicitly tested rather than assumed protected by it.
- Trust Content PR #8 preserves all seven insurer logos and seven original reviews, records stakeholder confirmation dated October 31, 2026, includes Enaya in both FAQs, qualifies plan/service coverage and fixes the accessible 4.4/5 label. Do not reopen authenticity as a fabrication allegation or remove confirmed content. Current policy coverage, aggregate freshness, permissions and clinical endorsement remain distinct review questions.
- The most recent release reported 32 passing focused tests. That is baseline evidence, not a new test run by this planning task.

Follow `AGENTS.md`, `PROJECT_BLUEPRINT.md` and the reviewed `SERVICE_DETAIL_PLAN.md`. Some status lists and contact-anchor examples in those older documents are historical. Use the actual current `/about` and `/contact` pages in main navigation and related links; preserve legacy homepage anchors. This plan does not edit either master document or claim their roadmap is already implemented.

## 3. Small, reusable technical design

### Content and publication boundary

Extend the existing catalogues; do not copy records into page components or create a second CMS-like model. Keep directory-summary visibility separate from detail readiness. A small shared approval type is reasonable if both catalogues need the same fields; keep service and doctor models cohesive rather than forcing their content into a generic page builder.

Proposed detail data: existing stable ID/slug, localized substantive sections, approved image/alt description, confirmed related record IDs, content-version identifier and per-locale readiness/review records. Keep a safe private-evidence reference, reviewer identity/role, review date and approval status; do not put licences, private correspondence or patient/policy information in public data. Content edits invalidate the corresponding approval until reviewed again. Neither today's `demo` nor a future generic `approved` flag alone proves that new detail copy is approved.

Require both EN and AR detail versions to pass before enabling the pair. Eligibility requires useful unique information, complete required identity/scope fields, valid relationships and recorded owner/clinical/editorial approvals for that content version. Optional qualifications/procedures/FAQs are omitted when not confirmed. A one-sentence catalogue summary plus contact CTA never qualifies. Do not use arbitrary word counts, copied generic descriptions, keyword padding, fake credentials or invented review signatures as readiness substitutes.

Use one tested eligibility/lookup boundary per catalogue in page rendering, metadata, static params, card links, related links, schema and sitemap. Unknown locale/slug, missing translation, draft/unapproved or withdrawn content must return a genuine 404 at request time as well as being excluded from static paths. Noindex is not draft access control; inspect hidden content through an authorized private workflow or locally. Do not publish unfinished pages with “coming soon” medical filler.

### Route and component architecture

Proposed implementation locations, not files created by this task:

- `app/[locale]/services/[slug]/page.tsx` and `components/services/service-detail.tsx`: one server-rendered service template for all eligible service records.
- `app/[locale]/doctors/[slug]/page.tsx` and `components/doctors/doctor-profile.tsx`: one server-rendered doctor template for all eligible doctor records.
- Existing `lib/content/services.ts` / `doctors.ts`: optional detail data, typed lookups and readiness. Add only a small adjacent approval/link helper when genuinely shared; no directory reshuffle or abstraction framework.
- Existing cards/grids and homepage previews: expose a descriptive detail link only when eligible. Preserve non-clickable summaries otherwise; no dead buttons, draft links or nested interactive controls. Carry the existing slug into summary props when necessary.
- Existing `i18n/routing.ts`, `i18n/navigation.ts` and header: register both dynamic patterns, generate typed links with actual slug params and preserve the actual page/slug when switching locale. Never emit literal `[slug]` or silently drop the visitor onto Home. Match active parent navigation visually while reserving `aria-current="page"` for exact current pages/breadcrumbs.
- Small shared metadata/JSON-LD helpers using the existing SEO configuration, plus `app/sitemap.ts` or an equally small host-aware sitemap handler and `app/robots.ts` if needed. Route choice must satisfy alias protection and cache isolation, not merely shortest code.

Service template: Home → Services → current service breadcrumbs; one H1; confirmed overview and scope; useful patient-visit information and limitations only when supplied; confirmed clinician links; optional reviewed questions; existing contact actions; all-services and Contact links. Follow the category-specific gaps in `SERVICE_DETAIL_PLAN.md`, including the bundled Hijama/PRP category and dermatology/aesthetics overlap.

Doctor template: Home → Doctors → current clinician breadcrumbs; verified display name/current role; approved substantive biography and patient-relevant areas of practice; qualifications/languages/experience only if evidenced; confirmed service relationships; existing portrait **or actual room photograph**, accurately described; contact and all-doctors links. A room photo does not establish the doctor's identity; retain it without fabricating a portrait. Do not infer a service association from matching specialty words, invent availability/schedules or add Dr. Yara to the catalogue merely because reviews mention her.

Use the existing UI surfaces, typography, colors and contact components. No new client catalogue fetches or animation package. Render static content on the server; keep client JavaScript for real existing interactions.

## 4. SEO, AEO/GEO and indexing deliverables

**Content/search quality:** unique localized titles and descriptions, one descriptive H1, logical headings, crawlable links, clear answers based on clinic-approved facts and consistent clinic name/address/contact/location. Use confirmed service and local context naturally; no duplicate neighborhood/“near me” doorway pages. Strong AEO/GEO here means useful, attributable content and clear entity relationships, not special AI markup or citation guarantees. This follows Google's [people-first guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) and [AI search guidance](https://developers.google.com/search/docs/appearance/ai-features).

**Locale metadata:** each approved official-domain page gets its own self-canonical, never Arabic canonicalized to English. Generate reciprocal absolute EN/AR `hreflang` including the current page from the same eligible route set; match visible language-switch links. Add `x-default` only if a real appropriate default URL is deliberately defined. Ordinary noindex demo builds continue omitting premature official canonicals/SEO alternates while retaining visible switches. Test HTML rather than assuming configuration is correct. See [Google localized-page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions) and [next-intl parameter-aware navigation](https://next-intl.dev/docs/routing/navigation).

**Structured data:** use visible approved facts and stable entity IDs derived from shared clinic/record identity. Reuse one clinic identity rather than creating a clinic per service. `WebPage` / `BreadcrumbList` describe real pages/breadcrumbs; optional `Service` and `Person` nodes describe confirmed services/clinicians only. Do not invent credentials, treatment efficacy, price offers or review attribution. No review/aggregate-rating schema is added by this scope. Omit optional unverified medical schema on the demo. Safe serialization must escape script-breaking content. Validate vocabulary/visible-content consistency; supported rich-result testing is not a guarantee of eligibility or display. See [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

**Sitemap and robots:** build a single publication-aware route list for the five approved static page types plus eligible service/doctor pairs. No drafts, unavailable translations, 404s, aliases, query/hash URLs or unapproved records. Only approved official canonical URLs belong in a production indexable sitemap; use truthful content modification dates, not a fabricated daily freshness date. The ordinary demo sitemap is empty or otherwise excludes all indexable entries; no sitemap submission from the demo. A demo alias serving an approved build must not expose an indexable sitemap under that alias: explicitly handle request host and caching for this metadata route, which the existing proxy does not match. A robots route keeps page crawling open so noindex can be read; it advertises an official sitemap only in the appropriately approved official-host case. See [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) and [noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

**Official-domain safety:** preserve current requirements together: `SEO_INDEXING_APPROVED=true`, exact approved `SEO_SITE_URL`, Vercel Production and exact request hostname. Do not set them this week without a separately authorized official-launch step. Demo/preview aliases retain `X-Robots-Tag: noindex, follow` even when an approved shared build contains official canonical HTML; ordinary demo builds retain noindex in both HTML and headers. Test that alias case explicitly. Connecting a domain, approving content and authorizing indexing are three separate decisions. Noindex is not a permission to publish unapproved clinical content.

## 5. Day-by-day implementation order

All times and cutoffs are Asia/Dubai. Estimates include focused implementation and checks; reserve owner/editor availability separately. Every code task below requires a later explicit implementation authorization. Commits, PRs, merges and deployments require authorization under the normal release process; this document authorizes none of them.

### Day 1 — Sunday, November 1: freeze scope and request clinic content (3 hours)

Developer: capture baseline routes/tests, catalogues and release protections; reconcile historical planning statements; prepare service and doctor briefs and a readiness checklist. Confirm pilot candidates with the owner, not by guessing a specialty's SEO value. Inventory existing official-site URLs and intended release destination as a read-only dependency if access is available, without changing DNS.

Clinic owner/clinical reviewer/editor: nominate decision-makers; identify one service and one clinician with enough verifiable detail; provide original facts, scope, current role, image rights, approved relationships and both-language drafts. Confirm whether November 8 means demo handover or a separately approved official launch.

Exit: agreed pilot/content owners, evidence locations and release target; missing information recorded explicitly. No public detail route enabled.

### Day 2 — Monday, November 2: typed detail records and eligibility (4 hours)

Developer: extend both catalogues with optional detail/review data, implement shared-purpose validation/lookup boundaries and tests, and preserve existing directory behavior. Prepare bilingual route registration and parameter-aware link/switch helpers for both detail types. Add no fake biographies or service descriptions.

Content dependency: usable source material for both pilots by end of day; verify scope and clinician associations independently. The editor can prepare translations while the developer works on the model.

Exit: tests reject missing AR/EN, summary-only, unapproved and stale-version records; current six-service/six-doctor catalogues and three-doctor homepage remain intact.

### Day 3 — Tuesday, November 3: reusable service detail template (5 hours)

Developer: implement the single service server template, route, localized breadcrumb/metadata and eligible-only card/related links. Preserve current `/about`, `/contact`, other directories and homepage anchors. Validate unpublished paths at runtime, not only build-time.

Content decision **by 18:00 November 3**: owner/clinical/editorial review returns substantive bilingual service and doctor pilot material with evidence references and requested corrections. If missing, continue architecture and rejection tests but mark pilot publication blocked. Do not spend the remaining week writing speculative clinical filler.

Exit: service template/gating usable; enable a service pair only if approvals are complete. Evidence incomplete means real 404, no public link or schema/sitemap entry.

### Day 4 — Wednesday, November 4: reusable doctor profile template (5 hours)

Developer: implement the single doctor server template, route, semantic headings, photo handling, localized metadata/breadcrumb and eligible-only directory links. Link a doctor and service only where the relationship is confirmed. Reuse the Day 2 locale/navigation boundary; test repeated switches for both route types.

Owner/reviewer: sign off identity, current role, biography, image permission and any optional credentials/claims in both languages. Do not manufacture missing years of experience or licences.

Exit: doctor architecture is implemented and tested even if the pilot remains blocked. Both architectures stay in the week's deliverables; publication volume is the variable.

### Day 5 — Thursday, November 5: SEO/entity graph and launch-safe sitemap (4 hours)

Developer: complete common metadata/JSON-LD generation, correct page/clinic/person/service relationships, reciprocal official hreflang and approval-aware sitemap/robots behavior. Test environment/exact-host protection, including dotted sitemap paths and alias-cache behavior. Prepare official-host tests with isolated test configuration, never live indexing settings.

Content dependency: final approved content corrections and publication set must be frozen **by 18:00 November 5**. Any late materially changed/unreviewed record stays out of this release; do not reduce review/QA time to force its publication.

Exit: demo/preview remain noindex; generated official metadata/sitemap fixtures include only the approved set and have no dangling links or invented facts.

### Day 6 — Friday, November 6: integrate approved pilots and full bilingual QA (5 hours)

Developer: integrate approved pairs; rerun all existing focused tests and new detail tests. Inspect all enabled details and ten baseline URLs in EN/AR at 320/390/768/1440px. Check actual room-photo descriptions, image sizes/load behavior, keyboard navigation, focus/skip links, zoom, reduced motion, floating contacts and header clearance. Check Maps listing versus directions, phone/WhatsApp/email destinations without sending messages or placing calls.

Owner/editor: review rendered English and Arabic content and optional FAQs; record sign-off on the exact content version. Insurer/review genuineness confirmation remains recorded; other medical/coverage claims need their appropriate review.

Exit: corrected release candidate and concrete issue list, screenshots and test evidence. A failed critical test or missing approval blocks that release candidate. Do not describe static or lab checks as real-user performance certification.

### Day 7 — Saturday, November 7: release candidate, approvals and contingency (4 hours)

Developer: fix P0 defects only; rerun affected checks plus build, TypeScript, lint and regression suite. Review diff/secrets/dependency scope, source/lockfile consistency, route manifest and rollback procedure. Prepare a concrete PR/release description and handover inventory of implemented versus enabled versus blocked records for authorization.

Owner: accept the precise bilingual publication set and decide demo delivery versus official launch readiness. If official launch is requested, independently verify official domain ownership, target project, existing URL/redirect inventory, required notices and content approvals. No late redesign or unreviewed clinical additions.

Exit: signed go/no-go checklist. Keep the tested candidate frozen; leave unresolved items disabled, clearly documented and out of all links/SEO output.

### Deadline day — Sunday, November 8: authorized release verification or blocked handover (2–4 hours reserved)

Only after separate explicit authorization: create/review the PR, merge and verify the automatic Vercel deployment and correct demo destination. Repeat public URL, contact, image, EN/AR switching, 404 and HTML/header noindex checks for the ten baseline pages plus every enabled detail pair. Do not mistake a Preview deployment for the main demo. Save deployment/merge identifiers and rollback instructions.

An official-domain launch is a separate go/no-go operation, not an automatic consequence of this deadline. Without verified domain/content/indexing approvals, do not connect the official domain, alter DNS/email, change indexing environment variables or submit a sitemap. Deliver the protected demo and an honest blocked-content list instead. If the stakeholder's acceptance requires public service/doctor pilots and neither is ready, report the unmet dependency rather than calling that outcome a completed launch.

## 6. Clinic content dependencies and acceptance gate

For every service pilot, the clinic supplies approved EN/AR scope, patient-useful specifics and limits, actual providers/relationships, accurate imagery and any relevant visit information. Preparation, suitability, risks, aftercare, benefits or FAQs are included only when supplied and clinically reviewed; do not create a mandatory unverified medical-advice section.

For every doctor pilot, verify full name/transliteration, current clinic association and role, a useful distinctive bilingual biography, associated services and image/room-photo permissions. Qualifications, licence display, professional memberships, languages, experience and schedules require explicit evidence if shown; omit optional missing fields. Required identity/current authority-to-practise confirmation is a content gate, not permission to invent public credential text.

For the intended official site as a whole, review existing working content too: founder quotation/attribution, promotional claims, facility/service scope, contact/hours, insurance plan/service qualifications and review reuse/freshness. Stakeholder-confirmed genuine logos/reviews stay preserved; that confirmation must not be misrepresented as universal insurance coverage or clinical approval of outcomes. The directory selector currently excludes unapproved records in an approved-indexing build; an accidentally empty official directory is a P0 failure, not an acceptable surprise.

Store a content-version approval record with named responsible roles and safe evidence references. Do not invent approvals or dates. A clinician/service statement only moves to “approved” when the actual required reviewer has approved that scope. Owner confirmation of business facts is not interchangeable with medical review.

## 7. P0 launch blockers and no-go actions

P0 means stop the affected release/publication, not fix every roadmap concern this week.

- **Content:** any enabled detail is summary-only, lacks one translation/current-version approval, misstates identity/credentials, or contains unsupported clinical claims. Keep that pair unavailable; missing one required pilot blocks a promised public pilot delivery, not the underlying architecture work.
- **Routing/data exposure:** drafts accessible by guessed URL, soft-404s, missing dynamic params, `[slug]` links, wrong-language fallback, broken links to unavailable details, lost locale/page switching or wrong clinician/service association. Fail closed before release.
- **Patient contact/trust:** wrong phone/WhatsApp/email/Maps destination, removed/altered original confirmed reviews/logos without authorization, a room misrepresented as a portrait, or newly unqualified coverage/outcome claims. Preserve originals and correct only approved issues.
- **Indexing/domain:** demo/preview indexable; canonical/alternate/sitemap URLs leaking unapproved official URLs in an ordinary demo build; drafts in sitemap/schema; alias-host protection failure; wrong production destination; unapproved domain/indexing change or unknown official-site redirect impact. Keep existing safe settings and stop official launch.
- **Quality/accessibility:** failed build/typecheck/lint errors/new focused tests, critical mobile overflow or unreachable core contact/navigation actions, hidden important content, broken images, unusable keyboard flow or a newly introduced accessibility regression. Stop until resolved. Verify zoom/reduced motion rather than repeat historical assumptions; any severe issue is a blocker.
- **Approval/operations:** no authorization to merge/deploy, no defined publication set/rollback, or official-launch obligations/content/domain ownership unresolved. Hand over a noindex release candidate only; do not silently change the goal to an official launch.

Known baseline warnings remain visible: two image lint warnings, Node module-format test warnings, Vercel npm configuration/install-script warnings and white-on-requested-WhatsApp-green contrast. Record them and seek the appropriate acceptance/remediation decision; do not change colors silently or claim full WCAG compliance. These existing warnings are not permission to ignore a new failure.

## 8. Required implementation acceptance tests

- **Model:** both catalogues enforce substantive approved EN/AR detail pairs and versioned reviews; invalid/duplicate IDs/slugs/relations rejected; existing summaries preserved. An unready detail does not remove its demo directory record.
- **Routes:** all ten baseline URLs plus every enabled service/doctor pair return correct content; unknown/unapproved/missing-translation paths return actual 404s. No draft data/notes leak through HTML, metadata, schema or static params.
- **Links/locales:** Home/directory/detail/breadcrumb/contact return paths work; active parent navigation and exact `aria-current` are correct; repeated locale switching retains actual slugs. Legacy `#about`, `#contact` and other homepage anchors still work from nested pages.
- **Content/images:** compare original reviews/logos/contact facts, three featured versus six directory doctors, current photos/alt text and optimized image behavior. Confirm no invented claims or accidental fake portraits. Manually review all enabled detail pairs, not just one attractive screenshot.
- **SEO:** unique localized metadata; normal demo HTML and headers noindex on every page; crawler access retained; isolated approved-official fixtures have self-canonicals/reciprocal hreflang. Alias headers remain noindex even for an approved build. Sitemap/robots host handling is tested independently of the proxy matcher, with caching isolation and only eligible official URLs. JSON-LD is parseable, safely escaped and consistent with approved visible content.
- **UI/accessibility/performance:** both locales at 320/390/768/1440px, keyboard, focus, skip links, long titles, zoom, reduced motion, floating-button/header clearance and no overflow. Verify no unnecessary client JavaScript/dependencies, image/layout regressions or large new payload. Lab measurements identify issues; they do not prove field Core Web Vitals.
- **Commands/release evidence:** `npm ci`, `npm run typecheck`, `npm run lint`, `npm run build`, focused tests against that production build, `git diff --check`, staged whitespace and secrets/scope review. Record warnings and screenshots. Rerun failures after fixes without weakening assertions. After an authorized release, repeat the public page/host checks and confirm the deployment uses the intended main commit.

## 9. Post-launch deferrals

Defer additional service/doctor records until their own substantive bilingual detail content is ready; **do not defer the two reusable detail architectures themselves**. Other deferrals: optional deeper clinical FAQs/educational content, additional localization, expanded approved staff roster, advanced editorial tooling, analytics/consent features requiring separate scope, automatic Google data integrations and noncritical animation/performance polish. No blog, CMS, booking, database or new dependency is part of this week; any later proposal needs separate authorization.

After a separately approved official launch, Search Console/sitemap submission and business-profile website alignment can follow with appropriate access/authorization. Monitoring content freshness, broken links and real-user performance is ongoing; indexing/ranking improvements cannot be guaranteed by the deadline. Maintain approvals and update content without duplicating templates.

## 10. Documentation validation

This task adds only `docs/ONE_WEEK_LAUNCH_PLAN.md`. Reviewed against current code and the three required project documents; day/date sequence and deadline checked; whitespace and documentation-only Git scope checked. Application checks, new detail routes, sitemap, schema helpers and publication approval models above are planned deliverables, not implemented or tested by this task. No commit, push, merge, deployment, application code, domain/DNS, environment variable or dependency change was performed.
