# Insurance and Google Reviews trust-content audit

Audit date: 2026-10-31 (Asia/Dubai). Baseline: latest fetched `main`, `793cd5bd54d093ac039e8f15c53c0d41431340ab` (About PR #7). Initial audit branch: `codex/trust-content-audit`. Follow-up branch: `codex/trust-content-clarifications`, also based on latest main at that commit.

Status: original inspection retained as a baseline record, followed by stakeholder confirmation and narrow local corrections. This document does not represent formal owner/clinical approval of medical or policy-specific claims. No logos or reviews were removed, and no score, count, quotation, review date, noindex setting, DNS or deployment setting was changed.

## Stakeholder confirmation — October 31, 2026

The project stakeholder personally verified **all seven displayed insurers and all seven stored reviews as genuine**, as explicitly reported in the project conversation on October 31, 2026. This confirmation applies to Al Madallah, Lifeline, FMC, Enaya, Neuron, NextCare and Al Buhaira, and all seven review records inventoried below. They are retained; they must not be described as fabricated or removed because of the earlier repository-evidence gap.

Evidence basis: the stakeholder's confirmation in the conversation. No supporting evidence links, review IDs, contracts, named clinical approver or formal clinical approval were supplied or invented. This confirms genuineness; it does not establish every plan's coverage, the current live Google aggregate/count, exact source-date verification, republication permissions, clinician availability or clinical endorsement of outcomes. Those narrower operational/clinical matters remain separate follow-up items.

Reviews mentioning Dr. Yara remain unchanged. Her absence from the six-doctor directory is a context question, not evidence against their authenticity; no new clinician record, historical explanation or credential is invented.

## Narrow corrections in this follow-up

- Added **Enaya / عناية** to the English and Arabic insurance FAQ list so it matches the seven retained logos.
- Qualified only the insurance description and two insurance FAQ answers in each language: acceptance/coverage depend on the specific plan and service; reception should confirm coverage and direct-pay arrangements. Removed categorical covered/direct-pay promises, without inventing a different coverage policy or changing the logo headings/design.
- The aggregate star group's accessible label now announces **4.4 out of 5** (localized equivalent in Arabic) with an explicit image role. The existing four filled stars, styling, visible 4.4, `80+` count, individual review scores/text/names/dates and Google destination remain unchanged. This is an accessibility correction, not an aggregate update.
- Added focused bilingual tests for all seven FAQ brands, qualified wording, precise aggregate accessible naming, preserved visible badge/contact destination and noindex.

The original findings and source line numbers below describe **the pre-correction baseline**, not the current local wording. Their missing-repository-evidence statements are historical; stakeholder confirmation above supersedes uncertainty about genuineness. They are not instructions to remove or relabel confirmed content. Remaining evidence-maintenance, policy-scope and clinical-review suggestions are future work, not formal approval or an authorization to release.

## Original inspection: highest-priority findings (before confirmation/corrections)

**P1 — Insurance acceptance and coverage are presented as established facts without supporting clinic approval evidence found in the inspected repository.** Patients could interpret the seven logos and accompanying wording as confirmation that their own policy or treatment will be covered. A logo does not establish a specific patient's eligibility, direct-billing entitlement or covered benefits. The strongest statement is in the insurance FAQ, not just the logo section. Obtain the clinic's current, plan-specific evidence and approved bilingual wording before an official launch; do not infer acceptance or exclusions from a brand image.

**P1 — Original repository inspection found no record-level provenance or approval trail for Google-branded ratings and testimonials.** The site displays a hardcoded 4.4 rating, `80+` Google Reviews and seven stored reviews. A general Google Maps reviews link exists, but it does not establish the authenticity, date, wording, permission or current relevance of each stored quotation. This is an evidence gap, not a finding that the reviews are false.

Noindex reduces search exposure; it does not validate the content or prevent visitors from relying on the public demo.

## Scope and evidence limits

Read `AGENTS.md` and `docs/PROJECT_BLUEPRINT.md`. Inspected the two section components, EN/AR interface and insurance FAQ copy, homepage composition, shared Maps destination, six-doctor catalogue, structured data and repository documentation/assets for approval or source records. Related FAQ insurance statements are included because they directly affect the meaning of the insurance section; unrelated medical content was not audited.

Read-only observation of the current English public demo confirmed the seven image elements load, the insurance acceptance heading/description, the 4.4 / `80+` badge, and the first carousel review with a relative date. Code inspection covers all seven carousel records and both languages. This is not a new full responsive/accessibility audit.

No per-review Google page, live Google rating/count, insurer contract, clinic owner correspondence, insurance portal or private evidence was independently verified. No external account access or credentials were requested. Missing evidence here means **not found in the inspected project**, not that evidence cannot exist outside it. Current external Google values and insurance arrangements remain unknown.

Code locations below are repository-relative and refer to the baseline commit. Google URLs stored in code are destinations, not themselves approval documents.

## Insurance: current facts and sources

`app/[locale]/page.tsx:68` renders `<Insurance animate />` on both homepages without an approval flag. `components/sections/insurance.tsx:105` contains the actual local array. The optional `logos` property declared at line 17 is not consumed by the component; changing an outside caller's list would not change these seven defaults.

All seven local assets exist and loaded on the observed demo. Inventory in array order:

- **Al Madallah** — `components/sections/insurance.tsx:106`; `public/baghdad/insurance/al-madallah.svg`. Display mark includes ALMADALLAH / healthcare management wording. Legal entity, relationship and logo-use approval not established by the asset.
- **Lifeline** — line 107; `public/baghdad/insurance/lifeline.png` (140 × 66 PNG). The displayed mark reads Life Line; exact legal identity and network role need confirmation.
- **FMC** — line 108; `public/baghdad/insurance/fmc.svg`. Displayed mark includes FMC / FIRST CARE; do not infer a legal company identity or acceptance scope from that lettering.
- **Enaya** — line 109; `public/baghdad/insurance/enaya.svg`. Present in the seven-logo array, omitted from both insurance-acceptance FAQ lists.
- **Neuron** — line 110; `public/baghdad/insurance/neuron.svg`.
- **NextCare** — line 111; `public/baghdad/insurance/nextcare.svg`.
- **Al Buhaira** — line 112; `public/baghdad/insurance/al-buhaira.svg`.

For **every** logo, no associated contract/network evidence reference, clinic approval, reviewer, review date, effective/expiry date, applicable branch, plan restrictions or brand-use provenance was found in the inspected project. Six are SVGs and one is a PNG; successful rendering and generic SVG export metadata do not prove permission or an active insurance relationship. The display labels must not be treated as a verified classification of all seven organizations as insurers rather than administrators or networks.

`components/sections/insurance.tsx:77` renders the images and falls back to their text label on loading error. Neither successful loading nor that fallback checks whether acceptance remains valid. There is no provider/network verification link on each card.

### Wording and coverage implications

- `messages/en.json:112`: “Insurance Partners”; line 113: “Accepted Insurance Providers”; line 114 says the experience is “smooth, accessible, and covered.” These are affirmative relationship/coverage claims, with no visible qualification in the section.
- `messages/ar.json:111` uses `التأمين الطبي المعتمد`; line 112 describes compatible health insurance companies; line 113 describes a broad network of prominent approved companies and insurance-covered care in Al Madam and Sharjah. The Arabic adds approval/breadth language requiring its own review; do not assume the two versions have identical strength.
- `messages/en.json:137` and `messages/ar.json:136` (`FAQ.items.item3.answer`) affirm partnerships with six named brands: NextCare, AlMadallah, Al-Buhaira, Neuron, FMC and Life Line. **Enaya is absent from both lists**, although a logo is displayed. Naming/spelling differs across the logo labels and FAQ; neither list is evidence of the other being correct.
- `messages/en.json:145` and `messages/ar.json:144` (`FAQ.items.item5.answer`) categorically state that insurance covers core consultations/treatments in General Medicine, Dermatology, Dentistry and Gynecology, while laser, skincare and Hijama are direct-pay only. Both the positive coverage claim and the blanket exclusion require evidence. This audit does not confirm either.
- `components/sections/faq.tsx:235` reads these answers directly from translations; only the hours answer has shared data parameters. Insurance assertions therefore exist in separate content locations and can drift.

### Owner-verification gaps and proposed corrective actions

**P1 — Coverage and acceptance:** Ask the authorized clinic insurance/billing lead for dated evidence per legal entity, network and accepted plan/card tier, including whether the relationship applies to this location. Confirm direct billing versus reimbursement, relevant services/clinicians, restrictions, authorizations, copay/deductible handling and expiry/termination information. These are verification questions, not assertions about this clinic's policies. Keep contracts and patient/policy information in an appropriate private system; store only safe approval references in project records.

In a later authorized implementation, use one reviewed insurer/network record list to drive both section and FAQ. Distinguish brand/network participation from policy-specific coverage. Proposed neutral qualification for clinic approval: “Please contact reception to confirm whether your specific plan and intended service are accepted. Coverage and payment arrangements require confirmation.” Do not present even revised lists as verified until evidence is reviewed. Resolve the Enaya discrepancy based on evidence, not by automatically adding/removing it.

**P2 — Provenance and maintenance:** Confirm correct legal/display names and logo permission/source. Record an accountable approver, evidence reference, effective date and next review date. Have the clinic approve both language versions together. No logo removal, replacement or wording edits were performed in this audit.

## Google Reviews: current facts and sources

- `app/[locale]/page.tsx:67` renders `<Testimonials animate />`, so the section uses component defaults rather than supplied live data.
- `components/sections/testimonials.tsx:114` defines seven stored reviews; line 164 defines the aggregate badge independently: **4.4 / 5**, **`80+`**, platform Google Reviews. The seven ratings are 5, 5, 5, 5, 5, 4 and 3; these selected records do not establish the full Google aggregate. Do not recompute the business rating or total from this seven-review subset.
- The component has no live Google retrieval, source timestamp, refresh job or staleness cutoff. `useNow` at line 184 updates the clock used for relative labels, not Google data. A badge can therefore look current while remaining unchanged indefinitely.
- `Testimonials` interface labels live in `messages/en.json:98` and `messages/ar.json:97`. Names/quotations/dates are instead stored once in the component. Five quotations are Arabic and two are English; the same original-language texts appear on both locale pages. Interface localization does not prove quotation translation or authenticity.
- `components/sections/testimonials.tsx:170` uses `clinicLocation.reviewsHref` (compatibility export in `lib/clinic-location.ts:2`, original destination in `lib/clinic.ts:20`). It targets the existing BAGHDAD MEDICAL CENTRE listing's reviews context at 24.9146055, 55.7757416 with business feature ID `0x3ef573f609a9bbf7:0x9ebb7b0be900046e`. This is not a newly verified per-review source or a newly inferred Google Place ID. The general CTA is rendered at `components/sections/testimonials.tsx:349`.
- `components/sections/testimonials.tsx:21` stores only `name`, `review`, `date` and optional `rating`: no individual review URL/ID, capture date, original source snapshot reference, selection rationale or owner/clinical approval fields. A record with missing rating would display five stars (`:296`), although all seven current records have explicit ratings.

### Stored review inventory

Dates below are exact **code values**, not independently verified Google publication dates. Quotation summaries describe existing text; they are not endorsed medical statements. Full text remains at the cited code locations.

1. **Muna Mohamed** — `components/sections/testimonials.tsx:116`; date **2026-05-10**, rating **5**. Arabic quotation praises Dr. Yara's experience, diagnostic/treatment precision and manner, and strongly recommends her; begins `الدكتورة يارا متميزة جدًا في عملها`. Verify exact attribution, wording, date and clinician context.
2. **جوجو الكعبي** — `:123`; date **2026-04-02**, rating **5**. Arabic quotation calls Dr. Yara an excellent cosmetic doctor, describes a positive visit and intent to return; begins `دكتورة يارا من أروع طبيبات التجميل`. Verify specialty/context rather than infer credentials from a patient's statement.
3. **Sultan Harib** — `:130`; date **2026-01-20**, rating **5**. Arabic quotation reports hair-treatment sessions with Dr. Yara, less shedding, increased density and a suitable price. This is a personal outcome/price claim, not evidence of guaranteed effectiveness or current clinic pricing. Do not infer a particular treatment or device.
4. **Ahmed Habib** — `:137`; date **2025-11-15**, rating **5**. Arabic quotation praises an unnamed female dentist, explanation, cleanliness and staff. It does not identify Rana, Rishika or any other directory doctor; do not attach it to a named clinician without evidence.
5. **Ahed Saif** — `:144`; date **2026-08-10**, rating **5**. Arabic quotation praises cleanliness, reception staff called `لانا` and a laser staff member called `اشنا`, with a nationality descriptor in the original text. Their identities, roles and relevance are unconfirmed. Do not assume either is a doctor or add them to the directory.
6. **Waqar Ahmad** — `:151`; date **2025-01-18**, rating **4**. Exact stored quotation: `Good.` Source identity/date/rating remain unverified despite the short text.
7. **MOHAMMAD "mmsir"** — `:157`; date **2024-06-10**, rating **3**. Exact stored quotation: `It's ok 👍`. Preserve the handle/punctuation when comparing with the source; do not silently convert it into a different identity or recommendation.

No per-record source/approval evidence was found for any of these seven entries. The collection includes mixed ratings, so it is not accurate to describe it as seven five-star reviews. All seven stored dates precede the audit date; there is no evidence here that any is future-dated. The oldest is from 2024. Their age does not establish falsity, but current relevance and exact source dates still need confirmation.

### Dates, presentation and staleness risks

`components/sections/testimonials.tsx:68` calculates relative age from the stored ISO dates, approximating months as 30 days and years as twelve such months. `:306` emits the ISO value as `<time dateTime>` but shows a relative phrase. On the observed English demo, Muna's record displayed “5 months ago.” Relative-age updates are not evidence of refreshed review data; the original Google text/date must be verified before treating these as genuine publication dates. If the clinic originally captured an approximate Google phrase, do not invent an exact calendar date from it.

`components/sections/testimonials.tsx:229` displays numeric **4.4**, while `:230` passes `Math.round(4.4)` to `StarRating`. The visual and accessible star summary therefore say **4 out of 5**, alongside 4.4. **P2:** align numeric, visual and accessible representations in later authorized work, without inventing a new rating.

**P1 — Provenance/medical endorsement:** Several quotations imply diagnosis/treatment quality, cosmetic expertise or hair-treatment outcomes. Public reuse can be read as clinic endorsement of those claims. Request source matching and owner/appropriate clinical review; do not turn individual testimony into general efficacy, credential or pricing copy. Confirm a suitable basis/permission for reuse of reviewer display names and text; this audit does not make a legal determination or claim that permission is absent.

**P2 — Freshness:** The displayed 4.4 and `80+` may be stale, but no live Google comparison was performed and no replacement values are proposed. Capture current listing evidence with a timestamp before approving an aggregate; use a reviewed “as of” date and maintenance responsibility if a static snapshot is retained. Do not label this carousel a live Google feed.

### Clinician-directory mismatch: clarification, not an accusation

`lib/content/doctors.ts:34` contains six demo clinicians: Safaa Mohamed Hussein (`:47`), Jawad Khan Jamil (`:72`), Abdullah (`:97`), Bassam Ibraheem (`:122`), Rana Maryoosh (`:147`) and Rishika (`:172`). Arabic counterparts are in the same records; all retain `clinicalReviewStatus: needs-review`.

Dr. Yara / يارا appears in the first three quotations but not among those six records. This could reflect historical staffing, an incomplete demo directory, a different name or another circumstance; none is confirmed. **P2:** ask the clinic who the reference concerns, the applicable period/location and whether highlighting it could mislead visitors about currently available clinicians. Do not assume reviews are false, rename Yara as another doctor, invent credentials or add a seventh clinician. The unnamed dentist and Lana/Ashna references also must not be automatically mapped to directory records.

### Publication controls and structured data

Insurance/testimonial defaults are rendered unconditionally by the homepage. Unlike the service/doctor catalogue selection, they have no record-level approval gate linked to future official launch. **P1 release safeguard:** approve or explicitly withhold these items before official publication/indexing, with the same content version reviewed in both languages. If evidence remains unavailable, have the owner decide a separately authorized neutral presentation or suppression; do not silently remove anything during this audit.

No `AggregateRating`, `Review`, `ratingValue` or `reviewCount` structured data was found in current application code. The clinic JSON-LD is in `app/[locale]/layout.tsx:88`. Preserve that absence of review/aggregate markup unless a separate evidence-based change is approved; do not add markup to compensate for missing sources. Existing documentation marks medical/review/insurance information for verification; that is a review requirement, not evidence that verification has occurred.

## Original proposed corrective order — superseded where resolved above

1. **P1: Verify insurance and coverage wording first.** Clinic billing lead resolves every brand/network, plan scope and FAQ coverage/exclusion statement; approve EN/AR copy. Record evidence privately with safe references.
2. **P1: Verify review provenance and medical implications.** Match each name/date/rating/quote to its source, confirm reuse and clinic/clinical approval, and document uncertainty rather than invent missing details.
3. **P2: Resolve Yara/staff references and current relevance.** Preserve original source text; separately approve any context label, selection change or clinician-directory correction.
4. **P2: Centralize reviewed trust records and maintenance.** Simple typed insurance/review records with evidence reference, approval status, approver, verification date and review-due date; distinguish original publication date from capture/verification date. No new API, CMS or dependency is assumed necessary. If later considering a Google integration, evaluate authorized access, provider requirements, attribution, cost and fallback behavior separately; no scraping or account access was performed here.
5. **P2: Test approved changes before release.** Check brand/FAQ consistency, permissions/status gating, unchanged verified names/quotes/dates, staleness behavior, rating accessibility, EN/AR rendering and noindex. Existing focused tests validate navigation/contact and directories; they do not establish insurer participation or testimonial authenticity.

## Remaining clinic-owner checklist

- [x] Stakeholder personally confirmed the seven displayed insurers and seven reviews as genuine on October 31, 2026.
- [ ] Retain any available dated network evidence privately; document legal entities, plan/service scope and this location's participation without reopening the confirmed genuineness finding.
- [ ] Approve specific plan/service limitations and both coverage and exclusion statements; confirm logo-use provenance. The Enaya FAQ omission is corrected locally.
- [ ] Supply each review's direct source or traceable original capture, original name/text/rating/date, and confirm reuse/attribution and clinical review where needed.
- [ ] Explain Dr. Yara's historical/current connection and the unnamed dentist/Lana/Ashna references without assuming they belong in the six-doctor directory.
- [ ] Confirm the current Google aggregate/count with dated evidence and assign a review/refresh owner; approve what happens when evidence becomes stale or unavailable.
- [ ] Sign off the same EN/AR content version before official launch. Keep demo/preview noindex and treat official-domain/DNS approval as a separate task.

## Validation and scope

The original audit was documentation-only. This follow-up changes only this document, the testimonial accessible label/role, the two locale files (three insurance strings each) and focused tests. Required validation: TypeScript, lint, production build, focused tests and whitespace review. TypeScript, lint, production build and all 32 focused tests passed. Browser checks at 320/390/768/1440px in both languages found seven logos, no horizontal overflow and the localized 4.4/5 accessible name; keyboard FAQ access passed. All seven stored review records, aggregate score/count and Google destination were compared with main and remain byte-for-byte unchanged. Existing two image lint warnings and Node module-format warnings remain. Whitespace checks passed. No dependencies, assets, review records, numeric aggregate/count, contact destinations, routes, noindex controls, credentials, DNS or environment variables changed. Commit and branch backup are authorized after passing final checks. A pull request, merge or manual deployment is not authorized by this task.
