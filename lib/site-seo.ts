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
