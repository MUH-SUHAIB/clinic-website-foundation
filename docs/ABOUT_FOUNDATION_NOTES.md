# About foundation review notes

Reviewed implementation on `codex/about-foundation`, based on released main `03e1c42778a41488a9bf21880b96b923a473bc26`. The About design is accepted; commit and branch backup are authorized after passing final checks. This does not approve clinic claims, a pull request, merging or manual deployment.

The homepage and localized About pages reuse one server-rendered About component and the existing EN/AR translation content. The founder photograph, attribution, quote, introduction, mission and vision are unchanged. Page headings, breadcrumbs and related Services/Doctors/Contact links are semantic and localized. Header/footer About links use the new pages; the homepage `#about` anchor remains available. No new claims, dependencies, contact destinations or indexing settings were added.

## Clinic verification required

Existing demo copy is unverified working content, not approved evidence. Before official launch, confirm:

- Founder identity, name spelling, founder role and permission to publish the existing photograph.
- The quote's exact wording, attribution, translation and publication permission.
- Claims about experienced professionals, advanced medical technology, modern facilities, high-quality care, accessibility/affordability, medical excellence and innovation in both languages.
- Mission/vision wording as the clinic's approved statements. Arabic affordability language is stronger than the English accessibility wording; this existing difference is preserved for owner review.

Do not infer founding dates, credentials, awards, technology inventory or clinical outcomes from this page. Demo noindex remains required. Shared About content is static server HTML; the former section reveal animation is removed while preserving the visual layout, surfaces and image treatment. CSS hover effects respect reduced motion.

## Local validation

TypeScript, production build, lint and all 30 focused tests passed. The two existing image lint warnings and Node module-format test warnings remain. Browser checks covered EN/AR homepage and About at 320/390/768/1440px with no horizontal overflow; verified localized active About navigation, desktop/mobile page-preserving language switching, keyboard menu/skip link/focus, breadcrumbs, footer return navigation and preserved homepage anchors. HTML and X-Robots-Tag noindex were checked on all ten localized pages by the focused suite. Contact destinations, distinct Maps listing/directions, doctor photographs and existing directories passed regression tests. All original About translation values were compared with the main baseline and are unchanged.

## Changed files

- `app/[locale]/about/page.tsx`
- `app/[locale]/page.tsx`
- `components/sections/about.tsx`
- `components/sections/header.tsx`
- `components/sections/footer.tsx`
- `i18n/routing.ts`
- `messages/en.json`
- `messages/ar.json`
- `tests/about-foundation.test.mjs`
- `tests/navigation-contact.test.mjs`
- `docs/ABOUT_FOUNDATION_NOTES.md`
