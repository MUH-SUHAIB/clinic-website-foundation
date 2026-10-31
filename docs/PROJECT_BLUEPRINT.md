# Baghdad Medical Center — Master Project Blueprint

**Version:** 1.1 (clarified planning document)\
**Status:** Proposed architecture; no website changes authorized by this document\
**Project:** Baghdad Medical Center, Al Madam, Sharjah, UAE\
**Current deployment:** `https://clinic-website-foundation.vercel.app/` (demo)\
**Future official domain:** `https://baghdadmedicalcenter.ae/` (not yet connected to this deployment)

## 1. Mission and success criteria

Make a professional, fast, bilingual medical-clinic website that earns patient trust, is easy to maintain, supports search discovery, and demonstrates strong engineering to prospective clients or employers. Preserve the existing visual design unless a measured usability issue justifies a change.

**Patient outcomes:** Understand the actual services; find the correct doctor; confidently call, WhatsApp, or navigate to the clinic. No appointment system or patient-record collection is planned for the initial release.

**Business outcomes:** Help discovery of the clinic's *verified* services in Al Madam, Sharjah; measure calls, WhatsApp clicks, direction clicks, and search impressions where consent and measurement rules permit. Never guarantee a #1 Google ranking.

**Engineering outcomes:** Clear architecture; typed content; accessible UI; well-defined tests; repeatable deployments; and safe growth as more doctors and services are added.

## 2. Completed baseline and branch status (reviewed 2026-10-31)

- Next.js **16.4.3** with App Router, React **19.3.1**, TypeScript, Tailwind CSS **3**, `next-intl` **4.13.2**, Framer Motion, and Lucide icons.
- Node.js **24.x** specified in `package.json`; npm lockfile; Webpack scripts.
- Vercel demo deployment, English `/en` and Arabic `/ar` locale prefixes, RTL layouts, responsive images, phone/WhatsApp links, Google Maps links.
- Existing homepage sections: hero, about, services, doctors, facilities, testimonials, insurance, FAQs, contact, footer.

**Branch-only work, not live:** `codex/seo-foundation` contains reviewed, tested, committed, and pushed indexing safety changes (`7b49221`). They are not merged into `main` or deployed to production. The live demo must not be described as protected by those changes until an authorized release and live verification occur.

**Roadmap, not completed features:** Multi-page directories and detail pages, typed content approval records, full clinic-data centralization, page-preserving language switching, sitemap/breadcrumbs, and the accessibility improvements below remain planned. The file tree and delivery phases describe targets, not the current repository. Distinguish implementation, local testing, preview testing, and live deployment when reporting completion.

**Keep:** Next.js, `next-intl`, Vercel for now, current design, existing working components.\
**Avoid for now:** VPS migration, database, CMS, microservices, autonomous agents, custom booking backend, unnecessary subscriptions.

## 3. Non-negotiable engineering rules

1. **Plan → Build → Test → Review → Deploy.** Every task must have a narrow scope, acceptance criteria, and rollback approach.
2. **Simplicity and maintainability:** Apply SOLID pragmatically; use small, cohesive components and clear data boundaries. No abstraction for its own sake.
3. **Single source of truth:** Phone, WhatsApp, location, hours, doctors, services, and IDs live in structured data, not duplicated JSX or translation strings. Display text is localized.
4. **Type safety:** TypeScript for data models and page props; avoid `any`, fragile string manipulation, and magic constants where practical.
5. **Stable user experience:** Do not break EN/AR pages, RTL, image handling, links, responsive layouts, or core content.
6. **Content integrity:** Existing demo content is working draft material, **not verified medical or regulatory truth**. Never invent licences, titles, procedures, qualifications, prices, insurance coverage, reviews, or treatment results. Track approvals.
7. **No surprise changes:** Work in a task branch; review diffs; never silently merge, deploy, change DNS, add paid tools, or expose secrets.
8. **Security and privacy:** No patient health information stored on the site. If newsletters are added later, obtain lawful opt-in, publish accurate privacy information, and provide unsubscribe controls.

**Mandatory standards:** Clean code, practical SOLID principles, SEO/AEO/GEO, accessibility, performance, and simplicity apply to all relevant work. Use readable, cohesive modules, evidence-based search practices, accessible interactions, and measured performance; avoid unnecessary abstractions, tools, and dependencies. These standards guide scoped acceptance criteria and roadmap priorities, not unauthorized rewrites or claims that the current baseline already satisfies every target.

## 4. Information architecture: grow without clutter

**Planned homepage evolution:** Showcase selected, approved services and doctors. Add **View all services** and **Meet all doctors** links when their destination directories exist. Keep calls and WhatsApp prominent. Except for `/en` and `/ar`, the routes below are roadmap items.

| English path | Arabic path | Purpose / release rule |
| --- | --- | --- |
| `/en` | `/ar` | Home (existing) |
| `/en/services` | `/ar/services` | All published clinic services |
| `/en/services/[slug]` | `/ar/services/[slug]` | Individual *confirmed* service; shared template |
| `/en/doctors` | `/ar/doctors` | All published clinicians |
| `/en/doctors/[slug]` | `/ar/doctors/[slug]` | Individual *confirmed* clinician profile |
| `/en/about` | `/ar/about` | Clinic, facilities, verified history |
| `/en/contact` | `/ar/contact` | Exact address, hours, call/WhatsApp, directions |
| `/en/insurance` | `/ar/insurance` | Only confirmed networks and coverage disclaimers |
| `/en/privacy` | `/ar/privacy` | Accurate clinic-approved privacy policy |

**Later only if content justifies it:** Patient information, medically reviewed articles, newsletter signup, terms/medical disclaimer. No empty or duplicate SEO doorway pages.

**Existing service categories for content inventory, not automatic publication approval:** General medicine, pediatrics, obstetrics and gynecology, dentistry, dermatology, skin care/aesthetics, and any others shown in the demo. Confirm actual offerings with the clinic before official indexing. The demo may list only part of the service/doctor roster.

**Routing:** Keep locale prefixes. Prefer stable ASCII slugs shared across languages initially. Language switcher must stay on the matching page; missing content should not silently route to an unrelated page. Unknown slugs return 404.

## 5. Suggested incremental file organization

Adapt to the actual repository rather than moving every file at once:

```text
app/
  [locale]/
    page.tsx
    about/page.tsx
    contact/page.tsx
    services/page.tsx
    services/[slug]/page.tsx
    doctors/page.tsx
    doctors/[slug]/page.tsx
    ...
components/
  ui/                 # generic presentational primitives
  sections/           # existing reusable sections
  services/           # service cards and page template
  doctors/            # doctor cards and profile template
lib/
  clinic/             # verified shared business data and validation
  content/            # typed service + clinician records, EN/AR copy
  seo/                # metadata, schema, canonical/alternate helpers
messages/
  en.json             # interface labels only
  ar.json
i18n/                # routing and locale configuration (existing)
tests/                 # unit and smoke/integration checks
docs/                  # this blueprint, decisions, content approval list
```

This is a **target**, not permission to rewrite working code. Favor server components for static content; client components only where interaction requires them. Keep content distinct from presentation. Do not add a CMS until a real clinic editing workflow exists.

## 6. Typed content and approval model

Create reusable data structures, not copy-pasted page code. At minimum:

- **Clinic:** approved public name(s), official address, coordinates, verified Google Maps listing, telephone, WhatsApp, hours, social links, and logo.
- **Service:** stable `id` and `slug`, localized name/summary/details, linked clinician IDs, image, publication status, clinical-review status, review date.
- **Doctor:** stable `id` and approved slug, localized full name, professional title, qualifications/licence evidence reference, photo permission, languages, associated service IDs, publication status.
- **Page SEO:** localized title/description, canonical path, alternate-language path, appropriate structured data derived from the same approved facts.

Use statuses like `draft`, `needs-review`, `approved`, and `published`. This approval model is planned, not implemented. **Only approved records** are eligible for new public service/profile routes or indexable sitemaps. Existing clinic information remains working content for the demo and development baseline; it is not independently verified medical evidence. Before official launch, the owner and appropriate clinical reviewer must verify medical claims, services, clinician credentials, procedures, insurance, prices, and reviews. Do not automatically mark existing copy approved or invent missing facts.

## 7. SEO / AEO / GEO implementation standards

- Unique descriptive titles, descriptions, sensible heading hierarchy, semantic HTML, crawlable text and links, internal linking and breadcrumbs.
- Approved, indexable official-domain EN/AR pages have appropriate self-canonical URLs and reciprocal `hreflang` links. Never canonicalize Arabic pages to English. This rule does not require official-domain canonicals on noindex demo/preview builds: omit premature canonicals there. Aliases serving an approved production build must still receive a host-specific `noindex` response header even if the shared HTML includes an approved official canonical.
- Generate an accurate XML sitemap of *approved indexable URLs* and environment-specific robots/indexing controls.
- Vercel demos/previews must remain `noindex`, including production-build aliases. Keep crawlers able to read the HTML robots tag or `X-Robots-Tag`; do not use robots.txt to block the crawl needed to see `noindex`. Only explicitly approved official-host pages become indexable after domain connection, verification, and launch approval. Keep structured-data website/image URLs aligned with the approved environment; do not identify the demo as the official website. This is the required policy; see section 2 for the unmerged implementation status.
- Structured data may use `MedicalClinic`, `BreadcrumbList`, and verified `Person` descriptions where appropriate; validate it against visible facts. No self-serving aggregate-rating promises or fabricated review markup.
- Local SEO: exact, consistent clinic name/address/telephone/hours on website and Google Business Profile; verified categories/services; patient-friendly directions. One genuine clinic location page, not mass-produced neighborhood pages.
- AI answers: concise, clearly attributed, medically reviewed explanations of actual services, clinic location, and contact process. **No special schema, `llms.txt`, or AI citation guarantee** is required.
- Before switching domains, inventory the existing official site's indexable URLs; preserve valuable paths or write relevant one-to-one permanent redirects. Verify Search Console and Google Business Profile access.

References: Google Search Central AI guidance: https://developers.google.com/search/docs/appearance/ai-features ; people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content ; site moves: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes

## 8. Performance, responsiveness, and accessibility

- Target Core Web Vitals at the 75th percentile: **LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1**; validate with real measurements after launch (not claims based only on local tests).
- Test **320, 390, 768, and 1440 px** widths; EN and AR; keyboard navigation and focus; menus, link targets, contact buttons, and mobile overflow.
- Use optimized responsive images; no 80 MB source icons; proper `sizes`, dimensions, `alt` text, and sensible image loading priorities.
- Remove zoom restrictions; support reduced motion and readable contrast. Aim for WCAG 2.2 AA through testing, not blanket claims of certification.
- Do not add large animation libraries or client-side JS to static content without a demonstrated benefit. Preserve current visual identity.

These are mandatory implementation targets, not completed accessibility or performance certifications. Known roadmap work includes removing the current `maximumScale: 1` zoom restriction and validating reduced-motion support, keyboard behavior, contrast, and the full responsive test matrix. Record measured results rather than assuming compliance.

Performance reference: https://web.dev/articles/vitals

## 9. Quality gates and release discipline

A task is **done** only if: (a) its acceptance criteria pass, (b) both languages and contact actions remain correct, (c) new content has the right review status, (d) relevant tests pass, and (e) the diff is reviewed.

**Minimum checks on every relevant PR:**

```bash
npm ci
npm run typecheck
npm run lint
npm run build
```

Also test routing, locale switches, 404s, hreflang/canonicals, sitemap/robots rules, structured data, external destinations, keyboard access, and mobile snapshots as applicable. Add CI gradually; never weaken checks merely to make a build pass. Review dependency audits, secret hygiene, and Vercel deployment configuration.

**Release flow:** task branch → approved pull request → Vercel preview QA → authorized merge to `main` → verify live demo. Official-domain DNS and indexing changes require a separate explicit clinic-approved launch checklist. Keep a rollback record.

## 10. Delivery phases (in order)

**Phase 0 — Governance:** Adopt this blueprint and concise `AGENTS.md`; inventory current pages and content. The SEO noindex branch has been reviewed and tested but remains separate until an explicitly authorized merge/release and live verification. Keep roadmap items separate from the completed baseline.

**Phase 1 — Foundation:** Shared clinic facts, typed service/doctor models, templates, SEO helpers, navigation language pairing, and automated checks. Avoid major redesign.

**Phase 2 — Directories:** `/services` and `/doctors` in EN/AR; homepage **View all** links. Show only existing approved content; hidden drafts can be added later.

**Phase 3 — Details:** Reusable individual service and doctor pages, validated metadata, breadcrumbs, internal links, and clear CTA to call/WhatsApp.

**Phase 4 — Trust and search:** About/contact/insurance/privacy pages, sitemap, robots, schema, accessibility, performance, local SEO and measurement setup.

**Phase 5 — Clinic approval and official launch:** Verify full roster, services and claims with owner and clinical reviewers; audit old-domain URLs, email DNS, redirects, Search Console and GBP; deploy official domain after written approval.

**Optional paid phases:** blogs, newsletters, content workflow/CMS, analytics reports. Keep them outside the agreed initial fixed-price scope unless the client approves a change order.

## 11. Business scope and portfolio quality

- **AED 2,300** is the original project price. Keep its deliverables tied to the agreed scope; additional multi-page features must not be silently treated as included. This statement does not establish payment status.
- **AED 4,000** is a potential upgrade target for negotiation, **not an agreed fee, payment received, payment due, or guaranteed market rate**. Any expanded scope and revised total require a separate explicit agreement; do not assume this target is an additional AED 4,000 charge. Demonstrate the proposed scope and value (page families, bilingual functionality, SEO baseline, tests, deployment and handover).
- Maintenance and content packages are recurring services priced separately. Hosting, domain, email and paid platforms are client costs unless explicitly contracted otherwise.
- For portfolio presentation: an excellent README, architecture decisions, screenshots, test evidence, Lighthouse/Core Web Vitals measurements, documented deployment, and clear explanation of what the developer built. Do not present AI output as independently reviewed when it was not.

## 12. Known open approvals / risks

- Clinic's exact licensed business details, service catalogue, clinician roster, titles and qualifications, approved photography, medical claims and medical-content reviewer.
- Actual opening hours (including holidays), insurance acceptance, walk-in expectations, patient privacy and newsletter consent.
- Domain registration expiry, registrar/DNS control, prior-site index/redirect inventory and the former Google Workspace email settings.
- Site indexing approval, Google Search Console / Business Profile access, conversion measurement preferences.

**Decision rule:** Unconfirmed details may be listed as internal draft TODOs, but must not become new public medical claims.
