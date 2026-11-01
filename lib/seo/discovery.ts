import { getEligiblePages } from "./eligible-pages.ts";
import { siteSeo } from "../site-seo.ts";

export function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
  })[character]!);
}

/** These dotted routes bypass the locale proxy: guard every request independently.
 * Never cache a host-dependent response in Next, a CDN, or the visitor's browser.
 */
export function discoveryResponse(body: string, contentType: string): Response {
  return new Response(body, { headers: {
    "Content-Type": `${contentType}; charset=utf-8`,
    "Cache-Control": "private, no-store, max-age=0",
    "CDN-Cache-Control": "no-store",
    "Vercel-CDN-Cache-Control": "no-store",
    "Vary": "Host",
    // Discovery files themselves do not need to appear in search results.
    "X-Robots-Tag": "noindex, follow",
    "X-Content-Type-Options": "nosniff",
  } });
}

export function sitemapXml(hostname: string): string {
  const pages = siteSeo.canIndexHost(hostname) ? getEligiblePages() : [];
  const entries = pages.flatMap((page) => Object.values(page.languages).map((url) =>
    `<url><loc>${escapeXml(url)}</loc>${Object.entries(page.languages).map(([locale, href]) =>
      `<xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(href)}"/>`,
    ).join("")}</url>`,
  ));
  // No modification dates are supplied because no reviewed dates are available.
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join("")}</urlset>\n`;
}

export function robotsText(hostname: string): string {
  return `User-agent: *\nAllow: /\n${siteSeo.canIndexHost(hostname) ? `\nSitemap: ${siteSeo.origin}/sitemap.xml\n` : ""}`;
}
