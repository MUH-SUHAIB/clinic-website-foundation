# Baghdad Medical Center — domain migration readiness audit

**Audit date:** November 1, 2026 (Asia/Dubai). **Target:** November 8, 2026.\
**Owner clarification / review date:** November 2, 2026 (Asia/Dubai). Public website and DNS observations below remain dated November 1; they have not been revalidated as current records.\
**Branch:** `codex/email-and-domain-readiness`, from main `0feaff3c4936ddc9a2c8a91273eb0f713b742559`.\
**Decision:** email correction is ready for review locally; **official-domain cutover is NO-GO until the decisions and gates below are satisfied**. This document authorizes no release, redirect, DNS, Workspace or indexing change.

## 1. Confirmed information and scope

The stakeholder confirms `baghdadmedicalcenter.ae` is the official domain, `mail@baghdadmedicalcenter.ae` works, `info@baghdadmedicalcenter.ae` does not work, Google Workspace is the email provider, and historical emails have been recovered. These are stakeholder confirmations, not results of mailbox inspection or a send/receive test. No recovered messages, mailbox exports, credentials or Google Admin settings were accessed.

### Owner-confirmed decisions — November 2, 2026

- The active mailbox is `mail@baghdadmedicalcenter.ae` on Google Workspace; `info@baghdadmedicalcenter.ae` does not work.
- Safaa Medical Complex is no longer active. The old ERP is no longer active and does not need operational continuity.
- The old Baghdad website's 24/7 statement is outdated. The owner personally verified the **new** regular hours against Google Maps: **Saturday–Thursday 8:30 AM–10:00 PM; Friday 8:30 AM–11:00 AM and 3:00 PM–10:00 PM**, Asia/Dubai. These application hours remain unchanged.
- Safaa/ERP continuity and confirmation of these regular hours are **resolved, not launch blockers**. This confirmation is owner evidence, not an independently inspected Maps record or formal approval of other medical claims. It does not verify an emergency department, holiday exceptions or other clinical content.
- Retired URLs still need an approved cutover response map. Recommend **410 Gone** for known permanently removed Safaa/ERP content without a relevant replacement; do not send it to Baghdad Home simply to avoid errors. No redirect or 410 response is implemented here.

The current official website is hosted separately from `https://clinic-website-foundation.vercel.app`. Only the shared email in `lib/clinic.ts` is changed in application code. Contact/footer displays, `mailto:` destinations and MedicalClinic JSON-LD inherit that value. Existing phone numbers, WhatsApp, Maps, hours, content/publication approvals, images, design and SEO controls remain unchanged. `docs/CONTACT_FOUNDATION_NOTES.md` retains its historical `info@` evidence.

Public website checks used unauthenticated GET requests, linked-page discovery, conventional robots/sitemap checks and public DNS queries. No form, newsletter, password-reset or login submission was made. The navigation crawl was bounded at 35 requests; administrative links are separated from patient-facing URLs. Search-engine discovery returned no additional results in this session; this does **not** prove that the site has no indexed URLs or traffic. A later default-client follow-up to the root returned HTTP 403, so access varies by request/client; no access-control bypass was attempted. Earlier successful 200 observations are a dated snapshot, not proof that all crawlers are allowed. Owner verification of crawler/WAF behavior, Search Console, old-server URL logs, the DNS control panel and the actual origin configuration remain dependencies.

## 2. Highest-priority risks

1. **Relevant redirects and honest retirement responses:** Safaa and ERP are owner-confirmed inactive. Do not redirect their obsolete URLs to Baghdad Home or transfer Safaa claims. Approve the final relevant Baghdad redirect map and retired-path 410 list before cutover.
2. **Rollback information is incomplete:** public A/AAAA answers and HTTP headers indicate Cloudflare proxying, not the private configured origin target. Public anycast IPs are **not** a usable origin backup. An authorized owner must save the real configuration privately and test a safe web rollback that does not reactivate Safaa/ERP or restore outdated 24/7 claims.
3. **Legal pages identify a different named entity:** current privacy, terms and cookie pages identify Safaa/Hatta and describe processing that cannot simply be assumed true for the new website. Owner/adviser approval is needed before replacing or redirecting them.
4. **Official content gates are not ready:** unapproved service/doctor details must remain 404. Services and Doctors directories must be useful 200 pages on the approved official build; genuine summary/record approvals and correct publication flags are required before indexing. Do not fake approvals to meet the deadline. Regular hours are confirmed; other unverified medical/promotional claims remain subject to review.

## 3. Existing URL inventory

Observed public results on November 1; not a complete historical/backlink inventory. No canonical link or `X-Robots-Tag` was observed on the six successful content pages inspected. That is not proof of Google indexing. The inspected root content is Arabic; its CTA includes `#contact`. Service “details” and article links point to `#`, so no real individual service/blog URL was discovered from those links.

| Existing URL/path | Observed result | Content / migration significance |
| --- | --- | --- |
| `https://baghdadmedicalcenter.ae/` | 200 | Arabic clinic/group landing page; still displays the nonworking `info@` address. It is not updated by this local branch. |
| `http://baghdadmedicalcenter.ae/` | 200, no redirect in checked response | HTTP-to-HTTPS consolidation is needed in the future approved plan. |
| `https://www.baghdadmedicalcenter.ae/` | 200, no redirect | Both hostnames currently serve content; choose one canonical host. |
| `http://www.baghdadmedicalcenter.ae/` | 200, no redirect | Include HTTP and www handling in redirect/HTTPS tests. |
| `/page/baghd-medical` | 301 to `/page/baghd-medical/`, then 200 | Baghdad Medical Center, Al Madam; matches the existing landline; old 24/7 wording is owner-confirmed outdated and emergency claims are not validated by this audit. |
| `/page/safaa-medical` | 301 to `/page/safaa-medical/`, then 200 | Safaa/Safa medical complex in Hatta; owner confirms this separate location is no longer active. |
| `/page/privacy-policy` → `/page/privacy-policy/` | Final slash URL 200 | Privacy policy identifies Safaa/Hatta; visible update label January 2026. |
| `/page/terms-of-service` → `/page/terms-of-service/` | Final slash URL 200 | Terms identify Safaa/Hatta; not approved new Baghdad terms. |
| `/page/cookie-policy` → `/page/cookie-policy/` | Final slash URL 200 | Cookie/tracking policy identifies Safaa; claims about analytics/advertising need verification. |
| `/robots.txt` | 200 text | Comment-only content-signal notice in this response; no active User-agent, Disallow or Sitemap directive observed. |
| `/sitemap.xml` | Real 404 | No existing sitemap inventory obtained. |
| `/sitemap_index.xml` | Real 404 | Conventional fallback also unavailable. |
| `/index.html` | Real 404 | Broken relative home link discovered in the old templates. |
| `/privacy-policy.html` | Real 404 | Broken relative privacy link discovered in the old templates. |
| `/en/privacy-policy`, `/en/terms-of-service`, `/en/cookie-policy` | Real 404 | Linked English legal paths do not currently provide equivalent policies. |
| `/dashboard/` | Redirects to `/dashboard/login/?next=/dashboard/`, final 200 login page | Operational/admin path, not a public clinical page. No Baghdad-page redirect proposal; owner confirms ERP retirement; no operational continuity required. Plan an approved retirement response. |
| `/dashboard/login/`, `/dashboard/login/?next=/dashboard/`, `/dashboard/password-reset/` | Public unauthenticated pages returned 200 | Discovered login/recovery links only; no submission, account access or migration of this backend. |

Additional **linked but already 404** relative aliases were observed:

- `/page/safaa-medical/index.html`, `/page/safaa-medical/privacy-policy.html`.
- `/page/baghd-medical/index.html`, `/page/baghd-medical/privacy-policy.html`.
- `/page/privacy-policy/index.html`, `/page/privacy-policy/privacy-policy.html`.
- `/page/terms-of-service/index.html`, `/page/terms-of-service/privacy-policy.html`, `/page/terms-of-service/terms-of-service.html`.
- `/page/cookie-policy/index.html`, `/page/cookie-policy/privacy-policy.html`, `/page/cookie-policy/terms-of-service.html`, `/page/cookie-policy/cookie-policy.html`.

The old host also uses external image/CDN assets and a shortened Maps link for Baghdad. Preserve the new project's already verified business listing and separate directions URL; do not replace either based on old template text. The [Safaa Maps link](https://www.google.com/maps/place/SAFA+POLY+CLINIC,+HATTA+,+مجمع+صفاء+الطبي+حتا%E2%80%AD/@24.803021,56.1197573,1013m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3ef51f0009fc016b:0x26a7ea1dd73c0eb4!8m2!3d24.803021!4d56.1197573!16s%2Fg%2F11whlwc5mt) points to the Hatta area; this observation is not proof of its legal ownership or relationship to Baghdad.

### Hours comparison — regular hours resolved by owner

| Source | Displayed schedule | Decision |
| --- | --- | --- |
| Old Baghdad `/page/baghd-medical/` | 24 hours, seven days; emergency wording | 24/7 statement confirmed outdated on November 2. Do not carry it forward; no emergency-service claim is approved by the hours confirmation. |
| Old Safaa `/page/safaa-medical/` | Saturday–Thursday 08:00–22:00; Friday 16:00–22:00 | Inactive clinic; do not import into Baghdad. |
| New Baghdad `lib/clinic.ts` | Saturday–Thursday 08:30–22:00; Friday 08:30–11:00 and 15:00–22:00 | Owner personally verified these regular hours against Google Maps on November 2. Preserve unchanged. Holiday/Ramadan exceptions were not supplied; do not invent them. |

## 4. Proposed redirects — documentation only

**“Verified” means the old content identity/language and existing demo destination were inspected. It does not mean the clinic has approved the redirect or official publication.** All destinations below refer to the future official host, never to a Vercel demo URL. Permanent server-side 301/308 redirects should be direct, not chained; do not blanket-redirect unrelated or unknown URLs to Home. See [Google redirect guidance](https://developers.google.com/search/docs/crawling-indexing/301-redirects).

| Old URL/path | Proposed future destination / treatment | Evidence / approval status |
| --- | --- | --- |
| `/` | `/ar` if the owner chooses Arabic as the legacy landing language | Verified Arabic source and existing Arabic Home; default-language policy still needs owner approval. Preserve `#contact`, which the new homepage already supports. |
| `/page/baghd-medical` and `/page/baghd-medical/` | `/ar/contact` | Verified Al Madam clinic identity and existing contact page; proposed closest location/contact destination. Owner must approve this choice versus `/ar/about`, regular hours are already confirmed. |
| `/page/safaa-medical` and `/page/safaa-medical/` | **Recommend 410 Gone if no relevant replacement exists**, subject to final cutover approval | Owner confirms Safaa is inactive. No Baghdad-home redirect or invented replacement; review URL/traffic inventory before finalizing the retirement list. |
| `/page/privacy-policy{,/}` | Candidate `/ar/privacy`, only after a real, approved page exists | New route does not exist now. Legal entity, data practices, text and route require owner/adviser approval. |
| `/page/terms-of-service{,/}` | Candidate `/ar/terms`, only after approval and implementation | No new terms route/content is authorized by this audit. |
| `/page/cookie-policy{,/}` | Candidate `/ar/cookies`, only after approval and implementation | Verify actual cookies, Maps, hosting/logs and any analytics/consent behavior first. |
| `/en/privacy-policy`, `/en/terms-of-service`, `/en/cookie-policy` | Candidate `/en/privacy`, `/en/terms`, `/en/cookies`, conditional on real approved English equivalents | Existing source paths are already broken; do not redirect to new 404s or force Arabic as an English equivalent. |
| `/index.html` | Optional `/ar` repair after root-language decision | Already 404, not evidence of a formerly substantive home page. |
| `/privacy-policy.html` and legal relative aliases above | Conditional approved entity-specific legal equivalent; otherwise retain honest 404 pending decision | Do not send Safaa-context aliases to Baghdad legal pages merely because their filenames match. |
| Other relative `index.html` aliases above | Decide per clinic context; do not create a blanket rule | Already broken; map relevant Baghdad content only. Known permanently removed Safaa aliases may receive approved 410s; unknown paths remain 404. |
| HTTP/www variants | One-hop HTTPS canonical-host version of the chosen destination | Propose apex `https://baghdadmedicalcenter.ae`, matching the project's exact-host guard; owner confirmation required. Test mappings and host normalization together to avoid chains. |
| `/robots.txt`, `/sitemap.xml` | Serve the existing host-aware discovery infrastructure, not an HTML redirect | Official eligible sitemap only after authorized approval; demo/preview protections remain. |
| `/dashboard/…` | **Recommend 410 Gone** for retired ERP/login/recovery paths without a relevant replacement, subject to final cutover approval | Owner confirms ERP is inactive and need not remain operational. Do not redirect authentication paths to Baghdad Home or Contact. |
| Unknown URLs / unapproved service and doctor detail paths | Genuine 404 unless there is a reviewed relevant replacement | No soft 404, invented page, guessed clinician association or unapproved medical publication. |

Before implementation, obtain a Search Console/top-landing-page and old access-log URL inventory from the authorized owner (URLs/counts only; exclude patient data, credentials and message contents). Add important unseen URLs and downloads to this map. A hosting move with changed paths needs both [hosting-move preparation](https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes) and [URL-mapping checks](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes). Moving this same domain from its old host to Vercel is not a domain-name change and does not call for a Search Console Change of Address submission just for the hosting/path change.

## 5. Public DNS and HTTPS snapshot

Authoritative snapshot: **November 1, 2026, 18:38 UTC / 22:38 Asia/Dubai**. Queried `nina.ns.cloudflare.com`; DMARC, Google DKIM and apex CAA were independently checked on both published nameservers. TTLs are observed values, not proposed edits. DNS can change after this audit; recheck before any approved release.

| Name | Type | Public answer / observed state | TTL (seconds) |
| --- | --- | --- | --- |
| `baghdadmedicalcenter.ae` | A | `104.21.16.131`, `172.67.212.184` | 300 |
| `baghdadmedicalcenter.ae` | AAAA | `2606:4700:3037::6815:1083`, `2606:4700:3031::ac43:d4b8` | 300 |
| `www.baghdadmedicalcenter.ae` | A / AAAA | Same two IPv4 and two IPv6 answers | 300 |
| Apex and `www` | CNAME | No public CNAME answer (authoritative NOERROR/NODATA); underlying flattened/proxied target is not disclosed | — |
| Apex | NS | `nina.ns.cloudflare.com`, `skip.ns.cloudflare.com` | 86400 authoritative; an initial recursive lookup reported 3600 |
| Apex | MX priority 1 | `aspmx.l.google.com.` | 3600 |
| Apex | MX priority 5 | `alt1.aspmx.l.google.com.`, `alt2.aspmx.l.google.com.` | 3600 |
| Apex | MX priority 10 | `alt3.aspmx.l.google.com.`, `alt4.aspmx.l.google.com.` | 3600 |
| Apex | TXT / SPF | `v=spf1 include:_spf.google.com ~all` | 3600 |
| Apex | TXT / Google verification | Existing `google-site-verification=` value present; retain the exact existing value in the owner's zone backup, not a newly invented token | 3600 |
| `google._domainkey` | TXT / DKIM | `v=DKIM1; k=rsa; p=…` public key present; multi-string DNS answer must be preserved as the same complete key | 300 |
| `default._domainkey` | TXT | No record returned for this queried selector | — |
| `_dmarc` | TXT | Neither authoritative server returned a DMARC RRset (NOERROR/NODATA) | — |
| Apex | CAA | Neither authoritative server returned an apex CAA RRset; initial recursive timeout was resolved by authoritative checks | — |
| Apex | SOA | Primary `nina.ns.cloudflare.com`, serial `2418693863`; refresh/retry/expire/minimum `10000/2400/604800/1800` | 1800 |

These web answers and `Server: cloudflare` are consistent with Cloudflare proxying. They do not identify the configured old hosting origin, a conventional apex CNAME, every subdomain, every DKIM selector or the full account configuration. Public IPv6 answers may be generated by Cloudflare rather than correspond to editable AAAA records. Do not “restore” anycast answers as an origin or blindly delete records inferred from those answers. [Cloudflare explains proxy answers and CNAME flattening](https://developers.cloudflare.com/dns/proxy-status/).

HTTPS requests to apex and www validated successfully with the system trust store. The observed certificate covers the apex and wildcard, is issued by Let's Encrypt (YE2), and is valid September 23–December 22, 2026. This verifies current public TLS only; the new Vercel destination must obtain and validate its own certificate. Check effective/inherited CAA policy when planning issuance; absence of an apex CAA answer is not a full certificate-policy audit.

### Google Workspace preservation checklist

- [ ] **Keep Cloudflare nameservers and registrar delegation unchanged.** A website-hosting move does not require transferring the DNS zone to Vercel. Keep Google Workspace subscriptions, users, aliases, routing, recovered mail and storage untouched.
- [ ] Preserve **all five currently working Google MX records and their priorities** above. Google explicitly supports these legacy `aspmx` records; a web migration is not a reason to replace them with the newer single `smtp.google.com` setup. See [Google's MX guidance](https://knowledge.workspace.google.com/admin/domains/set-up-mx-records-for-google-workspace).
- [ ] Preserve the existing **single SPF TXT record**, Google DKIM key/selector and verification TXT verbatim. Do not add Vercel web IPs as email senders: this website uses `mailto:` and has no new mail-sending backend. Any future authorized sender review is separate. See [SPF](https://knowledge.workspace.google.com/admin/security/set-up-spf) and [DKIM](https://knowledge.workspace.google.com/admin/security/set-up-dkim).
- [ ] Ask the Workspace administrator to confirm that the published DKIM selector is actually used and signing is enabled. A public key alone does not prove active signing, mailbox health or recovered-message completeness. Discoverable selector checks are not exhaustive.
- [ ] Record the **DMARC gap** for an admin-owned hardening decision. Do not invent a report mailbox or publish an enforcement policy during cutover; staged monitoring, alignment checks and eventual enforcement need separate authorization. This gap is not proof that current email is nonworking. See [Google DMARC guidance](https://knowledge.workspace.google.com/admin/security/set-up-dmarc).
- [ ] Before the maintenance window, have an authorized owner save a complete zone export including real web targets, MX/TXT, proxy flags, verification records, TTLs, applicable Cloudflare redirect/cache/SSL rules and any other mail/service subdomains. Keep sensitive operational backups outside the public repository. Public lookups are not a substitute for this export.
- [ ] Change only the explicitly approved web-host records during a future authorized cutover. Use the exact per-project values then provided by Vercel; do not guess an IP/CNAME now. A conventional apex CNAME must not replace/coexist incorrectly with root MX/TXT; use only the provider's supported apex configuration. Decide DNS-only versus a supported proxy configuration explicitly. [Vercel custom-domain instructions](https://vercel.com/docs/domains/set-up-custom-domain).
- [ ] Verify both IPv4 and IPv6 paths reach the intended website; avoid stale configured targets. Preserve mail/verification records independently of web proxy/caching choices. MX/TXT are not HTTP-proxied records.
- [ ] The owner/admin should perform fresh, non-patient inbound/outbound test messages for `mail@` before and after the future change, and record only pass/fail and authentication results. No recovered emails need to be read or exported. No test message was sent in this audit. Do not create/reactivate `info@` or change aliases without separate authorization.

## 6. Owner decisions required

1. **Web rollback:** identify the old host/operator and privately save real web targets, configuration and a tested rollback plan. No Safaa/ERP continuity is required; rollback must not revive retired services or outdated hours.
2. **URL and language policy:** approve apex versus www, the legacy Arabic root destination, `/page/baghd-medical/` mapping and exact 410 list for retired Safaa/ERP paths. Supply important missing URLs from owner-controlled traffic/search reports. The retirement decision itself is resolved.
3. **Legal pages and actual data practices:** identify the actual data controller/licensed entity and approve appropriate bilingual privacy, terms/medical-information and cookie/third-party disclosures with an adviser. Do not copy Safaa policies or invent retention periods or guarantees. Decide real routes and handling of old legal URLs. The new site has no booking/contact submission system, database or newsletter backend; do not revive old ERP/forms. Review hosting logs, Maps and outbound links rather than copying old analytics claims.
4. **Email stewardship:** name the Workspace administrator and fresh mail-test plan; separately decide how/when to address missing DMARC without risking legitimate senders. The active mailbox/provider and historical recovery are confirmed; no recovered messages need inspection.
5. **Publication approvals:** approve intended EN/AR summaries, doctor/service records, founder/medical/promotional claims and image permissions. Enable detail routes only with genuine substantive bilingual content and version-bound owner/clinical/editorial approvals. Services/Doctors directories must return 200 in the approved official build. Confirmed regular hours need no further confirmation; do not invent holiday exceptions or emergency capabilities.
6. **Release authority:** name the DNS operator, tester and rollback owner; approve a maintenance window, rollback triggers, publication set and indexing decision separately. November 8 is a target, not permission to bypass approvals.

## 7. Future cutover checklist — NOT executed

These are instructions for a **separately authorized release**, not actions performed or authorized now.

### Prepare and obtain GO

1. Resolve every P0 decision above; approve the exact content/URL/host publication set and legal-page outcome. Keep missing/unapproved detail pairs unavailable. Do not connect a noindex-only demo as the final official release.
2. Owner/operator backs up the old website configuration and real DNS/routing targets; verifies safe web hosting/certificates through rollback and propagation. Rollback must preserve confirmed hours and the Safaa/ERP retirement policy, not reactivate those systems or restore outdated 24/7 claims. Do not copy recovered emails, patient records or credentials into this project.
3. Implement the reviewed relevant redirects, approved 410 retirement responses and any approved legal pages in a later scoped branch. Test one-hop permanent redirects, unknown-path 404s, slash variants, query handling and legacy `#contact`; URL fragments are handled by the browser and are not sent to the redirect server.
4. Prepare/test the intended official release in an isolated environment using the existing exact-host/indexing checks. Validate nonempty Services/Doctors directories, eligible-only sitemap, EN/AR self-canonicals/reciprocal hreflang and safe schema. Demonstrate demo/preview noindex and alias/cache isolation. Do not edit live flags as a test.
5. Record the exact approved Vercel project/commit, intended apex and www behavior, required project-specific web DNS targets, certificate-validation method, rollback values and mail baseline. Agree how to preserve any existing Search Console verification files/meta records as well as DNS verification.

### Authorized execution window

6. Only after explicit domain-operation approval, connect the intended host(s) to the verified Vercel project and follow its current verification instructions. Keep Cloudflare delegation and all Workspace records. A nameserver migration is outside this plan. Do not accidentally replace a whole DNS zone, disable protective services indiscriminately or change email configuration.
7. Operator applies only the approved web-record/proxy/routing changes. Coordinate separately approved official indexing configuration with the launch so the public official site is not accidentally left noindex. Do not enable indexing on the demo; aliases must still be protected by the existing host-specific headers. Ordinary demo builds retain HTML and header noindex.
8. Verify fresh DNS from multiple resolvers, both IP families, HTTPS apex/www, no mixed content, redirects, all intended bilingual pages, contacts/Maps/email display, mobile dock, footer, language switching and approval 404s. Verify official canonical/hreflang/sitemap output only for approved content and demo/alias protection independently, including through Cloudflare caching. Robots must allow crawling so noindex can be read where required.
9. Owner/admin repeats fresh non-patient email tests and compares MX/SPF/DKIM/verification records with the baseline. Confirm approved Safaa/ERP retirement responses, not operational continuity; verify the owner-confirmed regular hours. Any wrong clinic, mail routing change, invalid TLS, unexpected official-directory 404 or exposed draft/fixture triggers rollback/NO-GO.
10. With separate authorization, submit only the approved official sitemap and monitor Search Console/crawl errors, old/new hosting traffic and contact/email operation. Retain relevant redirects for at least a year; keep old-host rollback capability for an agreed stabilization period. Do not assume immediate indexing/ranking or retire the old host on launch day. [Google migration guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

### Rollback checklist

1. Stop further cutover changes, notify the named owner/operator, and record the failure and affected host/paths. Preserve diagnostics without patient/message contents.
2. For the first official cutover, restore the **real pre-change web targets and proxy/routing settings** from the owner's backup, leaving nameservers and Workspace MX/TXT untouched. Do not use the observed Cloudflare anycast IPs as origin values. Reverting to a previous noindex-only demo build is not a substitute for restoring the existing official website.
3. Restore affected web redirect/cache rules as necessary; ensure apex/www and both IP families return to the intended old website while DNS caches expire. Keep both destinations safe during propagation. Certificate validity must hold on whichever endpoint answers.
4. If a later approved official deployment alone is defective, the operator may restore a previously verified **official** deployment/configuration under the agreed release process. Do not improvise indexing/approval flag changes to hide a failure or roll email back to another provider.
5. Verify safe public pages, approved Safaa/ERP retirement responses, confirmed hours/contact information and fresh owner-run mail checks; compare public MX/SPF/DKIM/TXT with the saved baseline. Schedule a new GO decision after fixing the actual cause. No rollback was executed in this task.

## 8. GO / NO-GO and current validation

**NO-GO for official cutover now:** entity-appropriate legal content, a tested real-origin web rollback backup, final URL inventory/redirect/410 and host/language decisions, and genuine official publication/indexing approvals are not settled. Safaa/ERP operational continuity and regular-hours confirmation are resolved and are not blockers. Missing DMARC requires an explicit admin-owned decision, not an unapproved DNS fix. The original official site remains separate.

**GO requires all of the following:** named authorized operators; working rollback; complete approved URL/content set; real 200 official directories and only approved detail routes; correct clinic identity/hours; valid apex/www HTTPS; unchanged and owner-tested Google Workspace; accurate official metadata/discovery with demo/alias protections; passing build/typecheck/lint/focused tests and bilingual responsive/contact checks. Any required failure is NO-GO. Email correction can be reviewed independently without connecting the domain.

Local validation for this narrow email change:

- `npm run build`, `npm run typecheck`, `npm run lint` and `git diff --check` pass.
- All focused production tests: **60 passed, 0 failed, 10 intentionally skipped (70 total)**. Skips are optional isolated positive service/doctor/official fixture builds; ordinary demo approval/404/noindex/discovery checks ran.
- New tests verify visible and linked `mail@baghdadmedicalcenter.ae` plus MedicalClinic JSON-LD on all ten EN/AR baseline pages, with no `info@` in their HTML and noindex intact. Existing contacts, Maps, hours, six-record directories, featured doctors and approval gates remain covered.
- Browser checks: sixteen EN/AR Home/Contact combinations at 320/390/768/1440px show the corrected visible mailto links with LTR email isolation inside RTL Arabic, working keyboard focus and no horizontal overflow. No mail client was launched.
- Existing warnings remain: two native-image lint warnings and Node module-format notices; previously recorded WhatsApp contrast, heading-order and mobile LCP concerns are not changed by an email correction.
- Remaining `info@` references are intentional negative-test assertions and historical audit evidence, plus this document's description of the old/nonworking address; no active application/email configuration still uses it. Browser verification checks the local candidate, not an already-deployed correction. No email delivery or recovered-email inspection was performed.

**Code-review scope:** application change `lib/clinic.ts`, affected tests `tests/contact-foundation.test.mjs`, and this audit. No redirect implementation, dependency, DNS, nameserver, MX/TXT, Workspace, official-domain connection, Vercel environment, indexing, merge or manual deployment change. Commit, branch push and PR creation are authorized for review only; official launch remains separately gated.

**Repository safety review:** this audit contains public URL/DNS observations only. Full verification tokens, DKIM key material, private origin targets, zone exports, credentials, patient information and recovered messages are not included. Keep real operational backups outside Git. No DNS or email configuration was changed.
