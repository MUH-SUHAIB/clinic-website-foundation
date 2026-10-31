# Codex Project Instructions — Baghdad Medical Center

Follow `docs/PROJECT_BLUEPRINT.md` as the project's architecture and release plan. Treat the existing demo code as the baseline: improve it incrementally, do not rewrite it without evidence.

## Before working

1. Inspect the relevant files and identify the current Git branch, scope, and dependencies.
2. State the task objective, planned files, acceptance criteria, and tests briefly.
3. If information is missing, distinguish confirmed repository facts from assumptions. For medical claims, do not invent facts.
4. Do not modify unrelated files, create speculative pages, or add dependencies without a clear justification.

## Architecture and coding

- Next.js 16 App Router, TypeScript, React 19, `next-intl` English/Arabic, Tailwind 3; preserve Node.js 24 support.
- Prefer server components for static, indexable content. Use client components for actual interactions only.
- Apply SOLID pragmatically: cohesive modules, typed interfaces, explicit dependencies and reusable service/doctor page templates; avoid overengineering.
- Clean code, practical SOLID, SEO/AEO/GEO, accessibility, performance, and simplicity are mandatory acceptance standards for relevant work, not optional extras. Meet them incrementally within the authorized scope; do not turn them into permission for unrelated rewrites.
- Keep business facts centralized and localize presentation. Do not duplicate phone numbers, hours, location URLs, service records or clinician records across components.
- Keep paths stable, use accessible semantic markup, and preserve RTL handling of Arabic mixed with LTR numbers.
- No database, CMS, background agents or newsletter backend without a separately approved requirement.

## SEO and clinical safety

- Demo and preview websites must remain `noindex`, including aliases serving an approved production build. Keep crawler access open so `noindex` can be read. Do not emit premature official-domain canonicals on the demo or preview build.
- Enable indexing and appropriate self-canonicals only for approved official-domain pages after the domain is connected, verified, and explicitly approved for launch. Keep EN/AR equivalents linked with reciprocal `hreflang`; never canonicalize Arabic to English. DNS changes and indexing approval are separate actions.
- Confirm all generated titles, canonicals, `hreflang`, sitemap entries and structured data against approved source content and the correct hosting environment.
- Existing clinic information is working content and the baseline for incremental development, not independently verified medical evidence. Verify services, medical claims, credentials, treatment descriptions, prices, insurance, and reviews with the appropriate clinic owner/clinical reviewer before official launch. Do not invent new claims or silently treat existing copy as approved.
- Keep call/WhatsApp and the verified Google Maps listing functioning in both languages.
- No fabricated ranking guarantees, artificial review markup, or SEO/AEO/GEO hacks.

## Definition of done

- Changes are limited to the requested task; explain exactly what was changed and why.
- Distinguish completed and deployed work from branch-only changes and roadmap items. Never list unfinished pages, approval workflows, accessibility fixes, or SEO features as completed.
- Run `npm run typecheck`, `npm run lint` and `npm run build`, plus relevant focused tests. Report any failures or warnings without hiding them.
- Test English/Arabic behavior, routing and RTL. For UI changes, check 320, 390, 768 and 1440px and keyboard focus; for SEO changes, verify index/noindex, canonical, alternate-language and structured data behavior.
- Check secrets and unintended file changes before committing.
- Work on a feature branch. Never commit, push, merge, deploy, change DNS or install paid tools unless the current task expressly authorizes the action.
- If a change impacts public medical information or production indexing, request human review before release.

## Commercial scope

- AED 2,300 is the original project price. AED 4,000 is a potential upgrade target, not an agreed fee, payment received, or payment due. Expanded scope and any price change require a separate explicit agreement.

## Response style

Explain results in short, beginner-friendly language: **Changed / Tested / Still needs approval / Next step**. Cite file paths in technical findings. Prefer one safe, reviewable step at a time.
