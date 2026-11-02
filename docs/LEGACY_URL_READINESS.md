# Legacy URL readiness — November 2, 2026

Branch: `codex/legacy-url-readiness`, based on main after PR #14.

`lib/routing/legacy-urls.ts` is an inactive, server-side mapping and HTTP-response resolver. The action resolver is deliberately not connected to proxy.ts, Next redirects or a public test endpoint. Proxy only recognizes audited dotted aliases to return plain noindex 404s, fixing a measured existing static-to-dynamic 500; it does not evaluate or execute proposed actions. There are **zero approved actions**. No environment, request parameter or cookie enables it. Synthetic approvals exist only in tests. Existing locale detection at `/` is unchanged; this does not approve the old Arabic root proposal.

The map derives from `DOMAIN_MIGRATION_AUDIT.md`: proposed Arabic Home and Baghdad Contact replacements; owner-confirmed retired Safaa and ERP paths with pending 410 actions; legal/broken aliases with no destination until reviewed. Unlisted paths remain unknown and fall through to existing routing. Unknown ERP descendants are not blanket-retired. Discovery files and modern localized/detail routes are not mapped. Retirement is confirmed, but exact 410 responses still need final approval.

The resolver requires an explicit cutover authorization, exact official Host, GET/HEAD, one unambiguous rule, and approval of that rule's exact action. Redirect targets must be safe locale-prefixed paths in the caller's approved/available destination set and cannot themselves be legacy sources. It emits direct 308 redirects or empty 410 responses, with no-store and noindex headers. Queries are deliberately dropped, including ERP `next` parameters; approve that policy before activation. Browser fragments are not sent to the server; verify legacy `#contact` in the final browser tests. There is no external redirect target, wildcard retirement, content publication or indexing bypass.

## Decisions and integration still required

1. Approve root language and `/index.html` repair separately; they have separate pending rules. `/ar` is only a proposal, never an accepted default.
2. Approve Baghdad's `/page/baghd-medical{,/}` destination: Contact versus About, based on relevance.
3. Approve the exact retired Safaa/ERP paths and 410 responses. No Baghdad Home fallback. Obtain URL/count-only Search Console/access-log inventory to identify missing valuable paths without patient data.
4. Review entity-appropriate legal disclosures and real bilingual destination pages before assigning legal redirects. No legal pages are invented here.
5. Approve HTTPS/apex/www policy, query policy, release window and rollback. Preserve all Google Workspace DNS records; domain/indexing approval remains separate.
6. In a separately authorized change, connect the approved resolver **before locale handling and automatic trailing-slash normalization**. Next currently normalizes trailing slashes before proxy, and proxy normally excludes dotted paths; the audited file aliases now have explicit literal matchers for safe 404s. The final integration must explicitly cover approved dotted aliases and avoid an extra slash/locale redirect; test both slash forms with `redirect: manual`. Do not broaden matching across assets, API, active discovery files or detail routes. No Next normalization settings are changed by this readiness task.
7. Supply the release's genuinely approved, rendered destination set; verify every target returns 200 under official publication gates. Re-review exact mappings whenever targets change. Keep approvals and operational evidence server-side, never in public assets.
8. Test request-level routing with a local isolated official-host build, including aliases, HTTP/www, caching, 308/410, unknown 404, actual language, and demo noindex. Remove the proxy import/cutover wiring to disable routing on rollback; do not change indexing or email as a shortcut.

This is tested readiness infrastructure, not completed cutover integration. No proposed redirect or retirement response is active on local demo builds or the public website. No commit, push, merge or deployment is authorized by this document.

## Production error and targeted correction

Reproduced before the fix: `GET /unknown-legacy.html` returned HTTP 500. The actual production stack reported `Page changed from static to dynamic at runtime /unknown-legacy.html, reason: headers`, followed by next-intl's `get requestLocale`. The dotted pathname bypasses locale proxy handling and matches the dynamic `[locale]` homepage segment. Only `en`/`ar` were generated, but other locale values were still allowed at request time. Rendering an invalid locale could invoke next-intl's header fallback before layout rejection completed, violating static rendering.

The correction adds `export const dynamicParams = false` to `app/[locale]/layout.tsx`, alongside its existing EN/AR `generateStaticParams`. Next now rejects ungenerated locale segments before page rendering. This is a route constraint, not an exception catch, forced dynamic rendering, wildcard redirect or blanket dotted-file interceptor. Existing assets and Next internals continue through their existing handlers. See [Next's dynamicParams reference](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/dynamicParams) and [next-intl static-rendering guidance](https://next-intl.dev/docs/routing/setup#static-rendering).

The four existing readiness files are preserved; the locale layout is the fifth scoped file needed for the root-cause correction. The prior review blocker is resolved locally, not yet released.

## Local validation

Production build, TypeScript, lint and whitespace checks pass. The full focused suite reports **73 passed, 0 failed, 4 optional isolated official-mode tests skipped (77 total)**. Positive EN/AR service and doctor templates, real slug-preserving language switches and room-image handling pass in an isolated temporary non-medical fixture build on loopback. Real application catalogues remain unchanged and unapproved; fixture routes are not accessible on the actual candidate. No fixture copy is deployed.

New tests simulate exact approved 308/410 actions in memory, revoked/pending approvals, host/cutover gates, safe available targets, ambiguity, language and slash aliases. Production requests confirm all mapped non-root paths finish as 404s, with no proposed redirect/410, while English root locale detection is unchanged. Unknown root HTML/CSS/PNG/JSON, nested dotted and ordinary paths return genuine 404s with HTML noindex. Dotted paths still bypass the locale proxy unless explicitly matched; the unchanged demo header protections are verified on all ten baseline pages and 24 unapproved detail routes. No static-to-dynamic errors recur in the rebuilt server logs.

All 36 non-hidden public files and 32 referenced Next image/JavaScript/CSS/font resources returned 200 without redirects. Existing tests cover contacts/Maps/working email/hours, navigation, schema and demo discovery/noindex. Two existing native-image lint warnings and Node module-format notices remain. No new dependency, DNS, environment-setting, indexing or content-approval change was made. Commit, branch push and PR creation are authorized for review by the current task; merge and manual deployment are not.
