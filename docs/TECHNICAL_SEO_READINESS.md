# Technical SEO foundation — launch handoff

Branch-only implementation, November 1, 2026. No official-domain connection,
indexing authorization, environment change or deployment is part of this work.

## Implemented behavior

- `lib/seo/eligible-pages.ts` supplies the route pairs used by canonical/hreflang
  metadata and sitemap generation. Home, About and Contact follow the existing
  global launch gate. Services and Doctors directories additionally require at
  least one published, clinically approved summary, matching their existing page
  rendering. Details require their existing substantive EN/AR, version-bound
  owner/clinical/editorial approvals **and** catalogue publication/clinical status.
- Current six service and six doctor records remain unchanged and unapproved.
  All 24 localized detail URLs remain real 404s. The demo still shows all six
  directory records and the same three featured doctors.
- All ten baseline URLs are candidates when their existing official rendering
  conditions are satisfied. With today's unapproved catalogue, an official build
  would return 404 for both directories in both languages; those four URLs are
  therefore excluded rather than incorrectly advertised. Approve/publish the
  intended summaries before an official launch. This work does not approve them.
- Ordinary demo/preview builds have HTML and HTTP-header noindex, no canonical or
  SEO language alternates, an empty XML sitemap and crawler-friendly robots.txt.
- An approved build advertises eligible official URLs only when the request Host
  is exactly the approved official hostname (normalized as a URL hostname). Dotted
  routes bypass the locale proxy, so each discovery handler validates HTTP Host
  itself. The proxy uses the same small Host-normalization helper so internal
  server origins cannot override the real request host; forwarded-host headers
  never grant permission. Invalid authorities fail
  closed. URL origins always come from trusted configuration.
- Sitemap/robots handlers are explicitly dynamic. Browser, shared CDN and Vercel
  CDN caching are disabled, with `Vary: Host`. Both files carry noindex themselves;
  this does not prevent crawlers from reading their links/rules. Robots always
  allows crawling; only an approved official host advertises the sitemap.
- Demo aliases of an approved build retain HTTP noindex and cannot expose sitemap
  entries. As in the existing architecture, shared approved-build HTML can contain
  official canonical/hreflang and index metadata on an alias; the alias HTTP
  noindex remains essential. Ordinary demo builds retain both forms of noindex.
- No invented last-modified dates, x-default destination, medical claims, price
  ranges, credentials or aggregate-rating schema. MedicalClinic JSON-LD contains
  existing visible shared business identity only, with one stable clinic ID per
  configured origin. All JSON-LD, including the existing homepage FAQ, escapes `<` to prevent
  script termination. The serializer has no server imports and adds no catalogue
  data or internal review evidence to the FAQ client bundle. FAQ copy remains
  unchanged and still needs the page-content review described below.

## P0: official Services and Doctors directories must not return 404

Do not enable indexing unless `/en/services`, `/ar/services`, `/en/doctors` and
`/ar/doctors` all return **200 with the clinic's intended, genuinely approved
records and bilingual summaries** on the approved official website. Their current
404 behavior in an otherwise approved build is a launch blocker, not an acceptable
launch state. A single synthetic or token record is not a substitute for the
clinic's intended publication set.

Obtain genuine content approval first, then set the intended catalogue records'
`publicationStatus` to `published` and `clinicalReviewStatus` to `approved` through
a separately reviewed content change. Verify all four directories, their visible
records, navigation, canonical/hreflang and sitemap entries before separately
authorizing indexing. Do not fabricate approval, bypass the gates or change any
real publication/indexing flags in this foundation PR. Individual detail pages
still require their own substantive bilingual, version-bound approvals.

## Before official launch — required human decisions and release work

1. Owner confirms clinic identity/address/phone/email/location, business hours and
   image permissions. Clinical and bilingual editorial reviewers approve all
   intended visible page copy, including existing promotional language, founder
   attribution/quote and service/doctor summaries. Preserve confirmed insurer and
   review content; confirm current coverage qualifications and rating freshness.
2. Approve and explicitly publish the intended service/doctor summaries. Supply
   useful substantive bilingual details and version-bound owner, clinical and
   editorial approvals for any individual pages intended for launch. Otherwise
   those details must remain 404 and unlinked. Follow `CLINIC_CONTENT_INTAKE.md`.
3. Separately authorize the official domain destination, ownership verification,
   any redirect plan and indexing release. No DNS or environment action is implied
   by this document. Do not enable the indexing flag before that review. Existing
   exact URL + production environment + explicit approval gates remain unchanged.
4. After authorized integration/deployment, repeat live checks on the actual
   official hostname and every demo/preview alias: status codes, approved content,
   contacts/Maps, canonical/hreflang, schema, sitemap membership, robots crawling
   and alias noindex/cache isolation. Local tests cannot certify a real CDN.
5. Only after the authorized official release, verify Search Console ownership and
   submit the official sitemap. Indexing, rich results and AI citations are not
   guaranteed. No special AI schema or keyword-stuffed pages are needed.

## Validation reference

Run typecheck, lint, build and all `tests/*.test.mjs`. Supply local production URLs
through `TEST_BASE_URL`, `TEST_DETAIL_FIXTURE_URL`, and
`TEST_OFFICIAL_FIXTURE_URL` for full integration coverage. Positive fixtures are
created only in disposable copies by the existing test-copy builder; they never
enter production catalogues or public assets. Official-build settings are scoped
to that disposable local test process, never real project/Vercel configuration.
The tests transport official/alias Host cases only to loopback, and alternate
hosts against identical discovery URLs to catch application cache contamination.

References: [Next.js route handlers](https://nextjs.org/docs/app/getting-started/route-handlers),
[Google localized pages](https://developers.google.com/search/docs/specialty/international/localized-versions),
[Google noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

## Branch validation results

- TypeScript, lint and production build pass. Lint retains two pre-existing
  `@next/next/no-img-element` warnings in insurance and the generic card; native
  Node tests retain the existing module-type warning. No new dependencies.
- All **65 focused tests pass**, zero failures/skips, using the real noindex build
  and two disposable fixture builds. Ten baseline demo pages return 200; all 24
  real unapproved detail routes return 404 and remain unlinked. Existing catalogue,
  featured-doctor, room-photo, contact/Maps and trust-content regressions pass.
- Official fixture sitemap has exactly 16 canonical URLs: ten baseline pages,
  two synthetic service detail URLs and four synthetic doctor profile URLs. Every
  entry returns 200 and has self-canonical and reciprocal EN/AR metadata. The real
  unapproved records remain excluded and 404 in that isolated build too.
- XML parsed successfully with the standard XML parser: demo/preview maps are
  empty; the eligible official fixture map has the correct sitemap namespace.
  JSON-LD parses, and a script-termination payload round-trips safely as JSON.
- Repeated identical sitemap/robots paths with alternating official and alias
  Hosts pass cache-isolation checks. Forwarded-host spoofing cannot authorize
  discovery or strip alias page noindex. Actual Vercel edge behavior still requires
  live verification after a separately authorized release.
- Browser checks cover all ten pages at 320/390/768/1440px: correct language/RTL,
  one H1, no horizontal overflow, demo noindex and no canonical. Mobile keyboard
  skip link, menu navigation, page-preserving locale switch and contact/Maps
  destinations also pass. No UI redesign or visible content changes.
- `git diff --check` and `git diff --cached --check` pass. The foundation is prepared
  for GitHub code review on `codex/technical-seo-foundation`, based on main
  `7a098505046f7e4937ad9e4b94a495d8450ff894`. This validation is not official-launch
  approval; no merge, manual deployment or real indexing change is authorized.

## Changed files (21)

Modified:

- `app/[locale]/page.tsx`
- `app/[locale]/about/page.tsx`
- `app/[locale]/contact/page.tsx`
- `app/[locale]/services/page.tsx`
- `app/[locale]/services/[slug]/page.tsx`
- `app/[locale]/doctors/page.tsx`
- `app/[locale]/doctors/[slug]/page.tsx`
- `app/[locale]/layout.tsx`
- `components/services/service-detail.tsx`
- `components/doctors/doctor-profile.tsx`
- `components/sections/faq.tsx` (safe schema serialization only)
- `lib/site-seo.ts` (shared request-host normalization; approval gates unchanged)
- `proxy.ts` (reuse request-host normalization)

Added:

- `app/sitemap.xml/route.ts`
- `app/robots.txt/route.ts`
- `lib/seo/eligible-pages.ts`
- `lib/seo/discovery.ts`
- `lib/seo/structured-data.ts`
- `lib/seo/serialize-json-ld.ts`
- `tests/technical-seo.test.mjs`
- `docs/TECHNICAL_SEO_READINESS.md`
