const demoOrigin = "https://clinic-website-foundation.vercel.app";
const officialOrigin = "https://baghdadmedicalcenter.ae";

// A production build alone must never make the demo indexable.
export function getSiteSeo(env: NodeJS.ProcessEnv = process.env) {
  const indexingEnabled =
    env.SEO_INDEXING_APPROVED === "true" &&
    env.SEO_SITE_URL === officialOrigin &&
    env.VERCEL_ENV === "production";

  return {
    indexingEnabled,
    origin: indexingEnabled ? officialOrigin : demoOrigin,
    canIndexHost: (hostname: string) =>
      indexingEnabled && hostname === new URL(officialOrigin).hostname,
  };
}

export const siteSeo = getSiteSeo();

/** Next can supply a server-internal nextUrl origin. Read the actual
 * HTTP Host authority, never X-Forwarded-Host supplied by a visitor.
 */
export function requestHostname(request: Request): string {
  const host = request.headers.get("host") ?? "";
  if (!/^[a-z0-9.-]+(?::[0-9]+)?$/i.test(host)) return "";
  try { return new URL(`https://${host}`).hostname; } catch { return ""; }
}
