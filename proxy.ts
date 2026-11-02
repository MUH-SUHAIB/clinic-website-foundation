import { classifyLegacyPath } from "@/lib/routing/legacy-urls";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import type { NextRequest } from "next/server";
import { requestHostname, siteSeo } from "@/lib/site-seo";

// Handles:
// - "/" -> "/en" (default locale redirect)
// - locale detection via Accept-Language header when no cookie is set
// - validating "/en" and "/ar" prefixed routes
// - 404s for any other locale segment (prevents broken routes)
const handleLocale = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // Audited dotted aliases otherwise bypass locale validation and can produce a
  // static-to-dynamic 500. Pending migration decisions remain honest 404s.
  if (request.nextUrl.pathname.includes(".") && classifyLegacyPath(request.nextUrl.pathname)) {
    return new Response(null, { status: 404, headers: {
      "X-Robots-Tag": "noindex, follow", "Cache-Control": "private, no-store",
    } });
  }
  const response = handleLocale(request);

  // Also protect demo/preview aliases serving an approved production build.
  // Crawlers retain access to the pages so they can read this header.
  if (!siteSeo.canIndexHost(requestHostname(request))) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }

  return response;
}

export const config = {
  // Match everything except:
  // - /api routes
  // - Next.js internals (_next)
  // - files with an extension (images, favicon, etc.) served from /public
  matcher: [
    "/((?!api|_next|.*\\..*).*)",
    // Next requires literal matchers. Only audited legacy file aliases are added.
    "/index.html", "/privacy-policy.html", "/sitemap_index.xml",
    "/page/safaa-medical/index.html", "/page/safaa-medical/privacy-policy.html",
    "/page/baghd-medical/index.html", "/page/baghd-medical/privacy-policy.html",
    "/page/privacy-policy/index.html", "/page/privacy-policy/privacy-policy.html",
    "/page/terms-of-service/index.html", "/page/terms-of-service/privacy-policy.html",
    "/page/terms-of-service/terms-of-service.html",
    "/page/cookie-policy/index.html", "/page/cookie-policy/privacy-policy.html",
    "/page/cookie-policy/terms-of-service.html", "/page/cookie-policy/cookie-policy.html",
  ],
};
