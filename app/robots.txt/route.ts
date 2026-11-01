import { requestHostname } from "@/lib/site-seo";
import type { NextRequest } from "next/server";
import { discoveryResponse, robotsText } from "@/lib/seo/discovery";

// Host-dependent discovery must never become a static/shared cached response.
export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  return discoveryResponse(robotsText(requestHostname(request)), "text/plain");
}
