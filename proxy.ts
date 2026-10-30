import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Handles:
// - "/" -> "/en" (default locale redirect)
// - locale detection via Accept-Language header when no cookie is set
// - validating "/en" and "/ar" prefixed routes
// - 404s for any other locale segment (prevents broken routes)
export default createMiddleware(routing);

export const config = {
  // Match everything except:
  // - /api routes
  // - Next.js internals (_next)
  // - files with an extension (images, favicon, etc.) served from /public
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
