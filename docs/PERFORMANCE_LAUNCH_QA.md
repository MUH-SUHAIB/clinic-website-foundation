# Performance launch QA — November 1, 2026

Status: measured, tested and reviewed on `codex/performance-launch-qa`, based on main `71c07c2abaacdd4a88819892deb4192089ebfaf9`. Accepted for GitHub code review; commit/push and a pull request do not authorize merge or manual deployment. No official-domain, DNS, environment, indexing or content-approval changes. Deadline remains November 8, 2026. This is not an official-launch approval.

## Measurement method and limitations

- Lighthouse 13.6.0, isolated headless Chromium 155 via the installed Brave binary, run sequentially. The CLI was obtained through npm’s temporary cache; no project dependency or lockfile change.
- All ten existing pages (Home, About, Services, Doctors, Contact, EN/AR), each mobile and desktop: 20 public-demo baseline runs, 20 local-production baseline runs, 20 final local-production runs. The public demo was not changed or remeasured as an after-fix deployment.
- Mobile: Lighthouse simulated slow 4G (1,638.4 Kbps, 150 ms RTT, 4× CPU), 412×823, DPR 1.75. Desktop: simulated 10,240 Kbps, 40 ms RTT, 1× CPU, 1350×940. Separately checked actual layouts at 320/390/768/1440px.
- One navigation per URL/device/phase, not a median, confidence interval or field percentile. Browser profiles are isolated; image/server/CDN caches were not deliberately purged. Local and Vercel results are different environments and must not be treated as a controlled before/after pair. Machine load, cache state and network variability affect scores.
- LCP and TBT reported below are Lighthouse’s simulated lab metrics derived from traces; CLS is the navigation lab result. Raw observed trace subpart timings are labelled separately. No real-user Core Web Vitals, CrUX, Search Console or INP measurement was collected. TBT does not establish INP.
- Exact individual scores, LCP, CLS, TBT, transfer bytes and timestamps are in `PERFORMANCE_LAUNCH_MEASUREMENTS.csv`. Raw JSON reports remain locally under `/private/tmp/clinic-performance/{baseline,after}`; intermediate exploratory reports are separate in `interim-after` and excluded from the final CSV.

## Actual final measurements

- Baseline, public demo, mobile, ten pages: performance 85–100; accessibility 95–98; best practices 100; SEO 66. LCP 1007.587–4060.963 ms; CLS 0.000000000; TBT 11.500–76.000 ms.
- Baseline, public demo, desktop, ten pages: performance 99–100; accessibility 95–98; best practices 100; SEO 66. LCP 420.579–912.393 ms; CLS 0.000000000–0.000122990; TBT 0.000 ms.
- Baseline, local production, mobile, ten pages: performance 82–100; accessibility 95–98; best practices 100; SEO 66. LCP 903.460–4965.036 ms; CLS 0.000000000; TBT 4.000–35.000 ms.
- Baseline, local production, desktop, ten pages: performance 98–100; accessibility 95–98; best practices 100; SEO 66. LCP 246.062–1146.823 ms; CLS 0.000000000–0.000122990; TBT 0.000 ms.
- After, local production, mobile, ten pages: performance 93–100; accessibility 95–98; best practices 100; SEO 66. LCP 904.101–3242.484 ms; CLS 0.000000000; TBT 4.000–23.500 ms.
- After, local production, desktop, ten pages: performance 100; accessibility 95–98; best practices 100; SEO 66. LCP 245.216–666.393 ms; CLS 0.000000000–0.000122990; TBT 0.000 ms.

Matched local mobile examples (baseline → final; scores out of 100):

- `/en`: performance 82 → 94; LCP 4.965 → 3.078 s; CLS 0 → 0; TBT 35 → 9 ms.
- `/en/services`: performance 82 → 94; LCP 4.879 → 3.140 s; CLS 0 → 0; TBT 7 → 4.0 ms.
- `/en/doctors`: performance 94 → 93; LCP 3.142 → 3.242 s; CLS 0 → 0; TBT 4.5 → 17 ms.
- `/ar`: performance 82 → 93; LCP 4.880 → 3.172 s; CLS 0 → 0; TBT 12 → 19.5 ms.
- `/ar/services`: performance 94 → 94; LCP 3.149 → 3.144 s; CLS 0 → 0; TBT 8.5 → 5.5 ms.
- `/ar/doctors`: performance 94 → 93; LCP 3.141 → 3.218 s; CLS 0 → 0; TBT 5 → 6.5 ms.

## Verified problems and narrow changes

1. **LCP photo hidden until hydration.** The public Arabic Home baseline trace’s raw LCP breakdown recorded 2,583.683 ms of element render delay after the photo resource loaded. The hero wrapper initially had opacity 0 and an entrance transform. It now renders the photograph visibly in the initial HTML (`initial={false}`), retaining its dimensions, styling, crop, hover and gentle floating motion. Hero text and other section animation architecture were not rewritten.
2. **Late/under-prioritized LCP discovery.** Lighthouse selected the first Services/Doctors directory image as mobile LCP while those images were lazy-loaded. The public Arabic Services raw trace recorded 1,285.361 ms of resource discovery delay. Directory grids now opt into preloading only the first card image; homepage grid images remain lazy. Lighthouse also explicitly flagged the missing high fetch-priority hint on the hero preload. The hero and opted-in first card now use high fetch priority. No other gallery/card images were promoted.
3. **Oversized tab favicon.** The browser icon metadata pointed at a 328,507-byte 512×512 PNG. The new 32×32 PNG is 2,455 bytes, derived from that same logo with preserved alpha. Tab/shortcut metadata now selects the small image. The original install icon, manifest and Apple touch icon remain byte-for-byte unchanged. Lighthouse still records the unchanged large manifest icon, so this is not a claim of a 326 KB total Lighthouse-transfer reduction or an isolated proven score gain from the favicon.

## Images and JavaScript findings

- The hero’s 1.1 MB source is already served responsively through Next Image: the local mobile baseline delivered roughly 17 KB for the selected 750px optimized photo. Lighthouse’s image-delivery audit reported no additional image-byte saving for the investigated Home/Services/Doctors LCP images. Do not re-compress source photographs or lower quality based only on original-file size. Real clinic-room photographs and their alt descriptions are untouched.
- The local Home baseline’s three largest shared script chunks transferred about 62–68 KB each. Lighthouse flagged roughly 85 KB of unused JavaScript for that single navigation; that does not prove the code is unused by other pages or interactions. Measured blocking was low, so no speculative client/server migration, animation-library removal, new package or unrelated refactor was made.
- Some mobile LCP results still exceed the 2.5 s target. These are remaining lab optimization/validation concerns, not passing field Core Web Vitals. Desktop and mobile results should not be collapsed into one guaranteed speed claim.

## Acceptance checks

- Final `npm run build`, `npm run typecheck`, `npm run lint`, and `git diff --check` pass. Lint retains two existing `no-img-element` warnings in `components/sections/insurance.tsx` and `components/ui/card.tsx`. Existing Node module-format warnings remain visible.
- `TEST_BASE_URL=http://127.0.0.1:3200 node --test tests/*.test.mjs`: 58 pass, zero fail, ten skipped (68 total). Skips are the positive isolated doctor/service/official-build fixture suites, whose optional fixture servers were not launched for this performance task. Production approval rejection/404, metadata, discovery and safety unit/integration checks did run. No approval or indexing code changed.
- New production-response tests confirm first-card preload/high priority, lazy remaining cards and all homepage cards, initially visible hero photograph, small tab icon and preserved install/Apple icons.
- Local production: 40 page/locale/width checks pass at 320/390/768/1440; one H1, correct LTR/RTL, no horizontal overflow, no detected broken loaded images, correct noindex, and one contact pair with original destinations and touch targets.
- Twenty mobile footer/keyboard checks pass after waiting for smooth scrolling to reach the actual document end: footer bottom remains about 16px above the opaque dock, and keyboard focus reaches both contacts with the 3px focus outline. Twenty mobile menu checks pass: opening hides the dock and Escape restores it.
- Exercised keyboard desktop navigation to all five pages and page-preserving EN/AR switching; also exercised mobile Services locale switching and Doctors navigation. Existing Call/WhatsApp, email, Maps listing/directions, directories, featured doctors, real room-image descriptions, insurer logos and reviews pass existing regression assertions.
- Public read-only check: all ten baseline pages return 200 with HTML and X-Robots-Tag noindex and no canonical; all 24 unapproved detail routes return real 404s. Sitemap remains valid empty XML; robots allows crawling. Local focused checks also cover these gates, unknown/fixture rejection, and host-isolated discovery behavior.
- Physical phones/iPhone Safari and real safe-area hardware were not tested. There is no active public modal opener; modal-hiding code is unchanged, not claimed as a fresh interactive live modal test. Browser screenshots and UI evidence remain under `/private/tmp/clinic-performance/`.

## Remaining warnings and official-launch blockers

- Requested white-on-WhatsApp-green remains approximately 1.98:1 and fails normal text contrast. Exact colors and destinations were preserved. Lighthouse also reports pre-existing heading-order issues (decorative h6 eyebrow/footer headings); no claim of full WCAG conformance is made.
- SEO 66 is expected on this protected demo because indexing is intentionally blocked by noindex. Do not remove noindex or invent canonical/hreflang output to raise that score.
- Obtain genuine bilingual owner/clinical/editorial approvals and correct publication flags before enabling detail routes or official indexing. Services and Doctors directories must not return 404 on the intended approved official website; this remains a P0 launch gate. No approval was fabricated or changed.
- Before any separately authorized official release: settle intended content, official-domain/redirect/notice approvals, repeat deployed mobile/desktop QA and controlled performance runs, and perform physical iPhone safe-area testing. Collect field Core Web Vitals/INP only with a legitimate post-launch data source. November 8 does not override those gates.

## Final code-review verification — November 1, 2026

- Exactly the twelve files listed below are in scope; no dependency, contact styling/destination, clinic content, approval-gate or indexing-policy change. The complete 60-row measurement CSV is retained unchanged, including results that did not improve. The measurements above are the original single-run lab evidence, not a new run or real-user claim.
- Verified EN/AR Home at 320/390/768/1440px through an isolated loopback-only proxy with `Content-Security-Policy: script-src 'none'`. After CSS and the image loaded, each page had exactly one visible hero photograph, opacity 1, no overflow and the same reserved wrapper dimensions as the hydrated production response. Hydration does not introduce a second photograph or an opacity-zero entrance. The existing gentle vertical movement is a transform, not a layout-size change. Original Home lab CLS was zero in both phases; this does not guarantee zero shifts under every device/network condition.
- Verified all sixteen locale/directory/width combinations at 900px viewport height. Only the first card is preloaded/high priority; its top was 474–701px and intersected the initial viewport. The remaining five cards retain lazy loading and no high-priority hint, even on desktop. Homepage cards remain lazy. The first-card choice is a bounded server-rendered LCP heuristic: on shorter viewports it can be just below the fold, rather than being guaranteed visible on every screen.
- Reran production build, TypeScript, lint, all focused production tests and whitespace checks for code review. Results remain 58 passing, zero failing and ten intentionally skipped isolated positive-fixture tests; the same two existing image lint warnings and Node module-format warnings remain. Scripts-blocked verification is local QA only and adds no application route, fixture asset or deployed CSP setting.

## Changed files

- `app/[locale]/layout.tsx`: small tab/shortcut favicon metadata.
- `app/[locale]/services/page.tsx`, `app/[locale]/doctors/page.tsx`: opt into first-image priority on directory pages only.
- `components/services/service-grid.tsx`, `components/services/service-card.tsx`, `components/doctors/doctor-grid.tsx`, `components/doctors/doctor-card.tsx`: optional first-image priority passed through existing components.
- `components/sections/hero.tsx`: initial photograph visibility and high fetch-priority hint.
- `public/favicon-32.png`: small logo variant; existing images retained.
- `tests/performance-launch.test.mjs`: three focused regression tests.
- `docs/PERFORMANCE_LAUNCH_QA.md`, `docs/PERFORMANCE_LAUNCH_MEASUREMENTS.csv`: measured evidence and limitations.
