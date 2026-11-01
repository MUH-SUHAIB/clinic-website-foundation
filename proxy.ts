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
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
