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
