/** Readiness plan only: the action resolver is deliberately not called by proxy or Next redirects.
 * Final cutover must approve exact actions AND wire this resolver before locale handling.
 */
type LocalizedPath = `/en${string}` | `/ar${string}`;
type RedirectAction = { kind: "redirect"; destination: LocalizedPath; status: 308 };
type GoneAction = { kind: "gone"; status: 410 };
type Action = RedirectAction | GoneAction;
export type LegacyRule = {
  paths: readonly string[];
  disposition: "replacement-proposed" | "permanently-retired" | "decision-needed";
  action?: Action;
  approval: "pending" | "approved";
};

// Both slash variants are exact aliases, never a wildcard/prefix match.
const variants = (path: string): string[] => [path, `${path}/`];
export const legacyUrlPlan: readonly LegacyRule[] = [
  { paths: ["/"], disposition: "replacement-proposed", action: { kind: "redirect", destination: "/ar", status: 308 }, approval: "pending" },
  { paths: ["/index.html"], disposition: "replacement-proposed", action: { kind: "redirect", destination: "/ar", status: 308 }, approval: "pending" },
  { paths: variants("/page/baghd-medical"), disposition: "replacement-proposed", action: { kind: "redirect", destination: "/ar/contact", status: 308 }, approval: "pending" },
  { paths: [...variants("/page/safaa-medical"), "/page/safaa-medical/index.html", "/page/safaa-medical/privacy-policy.html"], disposition: "permanently-retired", action: { kind: "gone", status: 410 }, approval: "pending" },
  { paths: [...variants("/dashboard"), ...variants("/dashboard/login"), ...variants("/dashboard/password-reset")], disposition: "permanently-retired", action: { kind: "gone", status: 410 }, approval: "pending" },
  // Legal destinations do not exist: no actionable target until entity/content review.
  { paths: ["/privacy-policy.html", ...["privacy-policy", "terms-of-service", "cookie-policy"].flatMap(name => [
    ...variants(`/page/${name}`), ...variants(`/en/${name}`),
    `/page/${name}/index.html`, `/page/${name}/privacy-policy.html`,
    ...(name !== "privacy-policy" ? [`/page/${name}/terms-of-service.html`] : []),
    ...(name === "cookie-policy" ? ["/page/cookie-policy/cookie-policy.html"] : []),
  ]), "/page/baghd-medical/privacy-policy.html"], disposition: "decision-needed", approval: "pending" },
  { paths: ["/page/baghd-medical/index.html", "/sitemap_index.xml"], disposition: "decision-needed", approval: "pending" },
];

export function classifyLegacyPath(pathname: string, rules: readonly LegacyRule[] = legacyUrlPlan) {
  return rules.find(rule => rule.paths.includes(pathname));
}

/** Pure, explicit inputs permit isolated tests; no env/query/cookie can activate it.
 * eligibleDestinations must come from the approved release's actual rendered pages.
 * No query forwarding: legacy auth/next/tracking parameters must not reach patients' pages.
 */
export function legacyResponse(request: Request, options: {
  cutoverApproved: boolean;
  eligibleDestinations: readonly string[];
  rules?: readonly LegacyRule[];
}): Response | undefined {
  const url = new URL(request.url);
  const host = request.headers.get("host")?.toLowerCase();
  if (!options.cutoverApproved || host !== "baghdadmedicalcenter.ae" ||
      !["GET", "HEAD"].includes(request.method)) return;
  const matches = (options.rules ?? legacyUrlPlan).filter(rule => rule.paths.includes(url.pathname));
  // Ambiguous configurations fail closed, rather than choosing an arbitrary rule.
  if (matches.length !== 1) return;
  const rule = matches[0];
  if (rule.approval !== "approved" || !rule.action) return;
  const headers = { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, follow" };
  if (rule.action.kind === "gone") {
    if (rule.disposition !== "permanently-retired") return;
    return new Response(null, { status: 410, headers });
  }
  if (rule.disposition !== "replacement-proposed") return;
  const target = rule.action.destination;
  if (!/^\/(en|ar)(?:\/[a-z0-9-]+)*$/.test(target) ||
      !options.eligibleDestinations.includes(target) ||
      (options.rules ?? legacyUrlPlan).some(candidate => candidate.paths.includes(target))) return;
  return new Response(null, { status: 308, headers: { ...headers, Location: `https://baghdadmedicalcenter.ae${target}` } });
}
