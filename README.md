# Baghdad Medical Center

A modern, bilingual (Arabic / English) web application for Baghdad Medical Center built with Next.js, Tailwind CSS, and `next-intl`.

## Features
- **Bilingual & RTL:** Full support for English and Arabic layouts.
- **Interactive UI:** Dynamic appointment modal, service listings, and staff directory.
- **Responsive:** Optimized for mobile, tablet, and desktop screens.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Localization:** `next-intl`
- **Language:** TypeScript

## Quick Start
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Runtime and checks

Use Node.js 24 LTS (`nvm use` when using nvm), matching the `package.json`
engine used by Vercel. Install the locked dependencies with `npm ci`.

- `npm run build`: production build
- `npm run typecheck`: generate Next.js route types and check TypeScript
- `npm run lint`: run ESLint independently (Next.js 16 no longer runs it during builds)
- `npm start`: serve the production build locally

The project uses Next.js 16.4.3 with React 19.3.1 and the supported Webpack bundler.
Webpack retains the previous build approach and avoids Turbopack's child-process
socket requirement, which is blocked in the local restricted environment.
Image quality levels 75 and 90 are explicitly allowed to preserve the optimized photos.
The locale routing entry point is now `proxy.ts` (formerly `middleware.ts`).

ESLint 9 is retained because the current React ESLint plugin declares support
through version 9. ESLint 9 is upstream end-of-life; moving to ESLint 10 remains
a tooling follow-up once the plugin supports it. Do not force-install it against
incompatible peer dependencies. The upgraded lockfile currently passes `npm audit`.

## Search indexing safety

The demo, previews, and local builds default to `noindex, follow` in HTML
metadata and page response headers. Do not add a robots.txt `Disallow` rule:
crawlers need access to read `noindex`. No official-domain canonical is emitted
while indexing is disabled; clinic JSON-LD website/image URLs identify the demo.
The clinic email address and external Google Maps links are unchanged.

For a future official launch, first connect and verify the approved domain and
obtain clinic approval. Only then set these server-side variables for the Vercel
Production environment and rebuild:

- `SEO_SITE_URL=https://baghdadmedicalcenter.ae`
- `SEO_INDEXING_APPROVED=true`

Both settings and `VERCEL_ENV=production` are required. Other values fail closed.
The request hostname must also be exactly `baghdadmedicalcenter.ae` to avoid a
`noindex` response header. Demo/preview aliases stay excluded even when serving
the same production build. If a different official hostname is approved, review
the allowlist in `lib/site-seo.ts` before launch; changing DNS alone never enables
indexing. Verify rendered metadata and response headers on both languages and
on every Vercel alias after that future release. No hosting, environment, domain,
or DNS settings are changed by this implementation.

Run the indexing safety matrix with `node --test tests/seo-indexing.test.mjs`.
