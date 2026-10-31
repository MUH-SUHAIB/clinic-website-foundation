# Contact foundation review notes

Branch implementation; authorization to commit and push for backup does not authorize merging or manual deployment.

## Preserved working facts

- Landline: 06 886 1115 / +97168861115.
- Mobile: 050 238 8626 / +971502388626.
- WhatsApp: 056 356 4165 / 971563564165.
- Email: info@baghdadmedicalcenter.ae.
- Existing English/Arabic clinic names and addresses, including the FAB building, side entrance and first floor, are unchanged.
- External address/directions actions now share the existing verified BAGHDAD MEDICAL CENTRE place-specific URL and business ID `0x3ef573f609a9bbf7:0x9ebb7b0be900046e`. The embedded map and review destination are preserved. The former footer coordinates-only search is replaced by the same listing used by the Contact section.
- All business facts and the regular weekly schedule live in `lib/clinic.ts`. Existing contact/location modules are compatibility exports rather than separate records.

## Regular-hours audit

The previous open/closed logic agreed with the displayed regular schedule: Saturday–Thursday 08:30–22:00; Friday 08:30–11:00 and 15:00–22:00. No regular-hours discrepancy was found.

Previously the calculation and the displayed numbers were separately hardcoded. The code also reparsed a Dubai-formatted date string in the browser's local time zone. The new calculation uses explicit Asia/Dubai date parts and the same minute ranges used by the contact cards and FAQ. Opening boundaries are inclusive and closing boundaries exclusive. The badge updates at minute boundaries and when a hidden tab becomes visible; it does not assert actual live clinic availability.

Arabic mobile hours use the normal site font for connected Arabic text, isolated monospace numeric times, and separate lines with additional spacing between Friday sessions. English and desktop hours retain their previous presentation. The wording and schedule are unchanged.

## Owner-verification gaps

These remain existing demo facts marked `needs-review`, not newly verified information. Before official launch, confirm the business display/legal names, full address and entrance instructions, phone ownership/routing, WhatsApp operation, email monitoring, listing ownership, regular hours and holiday/exceptional closures with the clinic owner. No holiday exceptions or live-availability source have been provided. No new medical claims, forms, booking system or patient-data collection were added.

The existing requested WhatsApp green (#25D366, hover #20bd5a) and white content remain unchanged. Their known contrast limitation remains: approximately 1.98:1 normal and 2.47:1 hover, below WCAG AA contrast targets. No accessibility certification is claimed.

## Files in this local implementation

- Pages and shared layout: `app/[locale]/contact/page.tsx`, `app/[locale]/page.tsx`, `app/[locale]/layout.tsx`, `app/[locale]/services/page.tsx`, `app/[locale]/doctors/page.tsx`.
- Contact presentation: `components/sections/contact.tsx`, `components/contact/clinic-hours.tsx`, `components/contact/clinic-status.tsx`.
- Existing consumers/navigation: `components/sections/header.tsx`, `components/sections/footer.tsx`, `components/sections/hero.tsx`, `components/sections/faq.tsx`, `i18n/routing.ts`.
- Shared business facts/adapters: `lib/clinic.ts`, `lib/clinic-contact.ts`, `lib/clinic-location.ts`, `lib/mock-data/homepage.tsx`.
- Localized labels and numeric placeholders: `messages/en.json`, `messages/ar.json`.
- Focused coverage: `tests/contact-foundation.test.mjs`, `tests/navigation-contact.test.mjs`.
- Review record: `docs/CONTACT_FOUNDATION_NOTES.md`.

Final local validation: production build, TypeScript, lint and all 26 focused tests passed. Lint retains the two existing image warnings; the Node test runner retains module-format warnings. Browser checks covered 32 locale/page/viewport combinations across homepage, Services, Doctors and Contact at 320/390/768/1440px. No horizontal overflow or browser console errors were recorded. Keyboard focus, skip link, mobile menu, language switching, old homepage contact anchor, contact destinations and embedded map were checked. No application dependencies or image assets changed.
