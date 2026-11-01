import assert from "node:assert/strict";
import test from "node:test";
import http from "node:http";
import { getEligiblePages, pageAlternates, pageUrl } from "../lib/seo/eligible-pages.ts";
import { escapeXml, robotsText, sitemapXml } from "../lib/seo/discovery.ts";
import { clinicSchema, serializeJsonLd } from "../lib/seo/structured-data.ts";
import { requestHostname } from "../lib/site-seo.ts";
import { clinic } from "../lib/clinic.ts";
import { clinicServices } from "../lib/content/services.ts";
import { clinicDoctors } from "../lib/content/doctors.ts";
import { approvedDetailFixture } from "./fixtures/service-detail.mjs";
import { approvedDoctorFixture } from "./fixtures/doctor-profile.mjs";

const officialHost = "baghdadmedicalcenter.ae";
const officialOrigin = `https://${officialHost}`;
const publish = (record) => Object.assign(record, { publicationStatus: "published", clinicalReviewStatus: "approved" });

// Always transport to a local fixture, even while testing an official Host header.
function localRequest(base, path, host, headers = {}) {
  const url = new URL(path, base);
  assert.ok(["127.0.0.1", "localhost"].includes(url.hostname), "isolated host tests must stay local");
  assert.equal(url.protocol, "http:");
  return new Promise((resolve, reject) => {
    http.get(url, { headers: { Host: host, ...headers } }, response => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", chunk => { body += chunk; });
      response.on("end", () => resolve({ status: response.statusCode, headers: response.headers, body }));
    }).on("error", reject);
  });
}
const paths = (catalogues) => getEligiblePages(catalogues).map(page => page.path);

test("eligible routes follow official rendering, not the working demo catalogue", () => {
  assert.deepEqual(paths(), ["", "/about", "/contact"]);
  assert.equal(pageAlternates("en"), undefined);
  for (const locale of ["en", "ar"]) assert.equal(pageUrl(locale, "/about"), `https://clinic-website-foundation.vercel.app/${locale}/about`);
  const services = [publish(structuredClone(clinicServices[0]))];
  const doctors = [publish(structuredClone(clinicDoctors[0]))];
  assert.deepEqual(paths({ services, doctors }), ["", "/about", "/services", "/doctors", "/contact"]);
  assert.equal(getEligiblePages({ services, doctors }).flatMap(page => Object.values(page.languages)).length, 10);
});

test("sitemap candidates use both existing publication/approval gates and immediately exclude stale or revoked details", () => {
  const service = publish(approvedDetailFixture());
  const doctor = publish(approvedDoctorFixture());
  const catalogues = { services: [service], doctors: [doctor] };
  const expected = ["", "/about", "/services", "/doctors", "/contact", `/services/${service.slug}`, `/doctors/${doctor.slug}`];
  assert.deepEqual(paths(catalogues), expected);
  for (const page of getEligiblePages(catalogues)) {
    for (const locale of ["en", "ar"]) assert.ok(page.languages[locale].endsWith(`/${locale}${page.path}`));
  }
  for (const change of [
    s => { s.publicationStatus = "demo"; },
    s => { s.clinicalReviewStatus = "needs-review"; },
    s => { s.details.approval.status = "draft"; },
    s => { delete s.details.content.ar; },
    s => { s.details.content.en.overview += " changed"; },
    s => { delete s.details.approval.owner; },
  ]) {
    const s = publish(approvedDetailFixture()); change(s);
    assert.ok(!paths({ services: [s], doctors: [] }).includes(`/services/${s.slug}`));
  }
  for (const change of [
    d => { d.publicationStatus = "demo"; },
    d => { d.clinicalReviewStatus = "needs-review"; },
    d => { d.profile.approval.status = "draft"; },
    d => { delete d.profile.content.en; },
    d => { d.profile.content.ar.biography.push("تغيير"); },
    d => { delete d.profile.approval.clinical; },
  ]) {
    const d = publish(approvedDoctorFixture()); change(d);
    assert.ok(!paths({ services: [], doctors: [d] }).includes(`/doctors/${d.slug}`));
  }
});

test("request host normalization ignores forwarded authorities and rejects malformed hosts", () => {
  for (const host of ["baghdadmedicalcenter.ae", "BAGHDADMEDICALCENTER.AE:443"]) {
    assert.equal(requestHostname(new Request("http://localhost/sitemap.xml", { headers: { host } })), officialHost);
  }
  for (const host of ["evil@baghdadmedicalcenter.ae", "baghdadmedicalcenter.ae/", "baghdadmedicalcenter.ae,evil", "baghdadmedicalcenter.ae:99999"]) {
    assert.equal(requestHostname(new Request("http://localhost/sitemap.xml", { headers: { host } })), "");
  }
  assert.equal(requestHostname(new Request("http://localhost/sitemap.xml", { headers: { host: "preview.vercel.app", "x-forwarded-host": officialHost } })), "preview.vercel.app");
});

test("ordinary demo discovery never exposes official URLs, even for a requested official hostname", () => {
  for (const host of [officialHost, "localhost", "preview.vercel.app"]) {
    assert.ok(!sitemapXml(host).includes("<url>"));
    assert.ok(!sitemapXml(host).includes(officialHost));
    assert.equal(robotsText(host), "User-agent: *\nAllow: /\n");
  }
  assert.equal(escapeXml('<&>"\''), "&lt;&amp;&gt;&quot;&apos;");
});

test("clinic schema is shared factual identity with no unsupported price, rating or promotional claims; JSON-LD cannot close its script", () => {
  for (const locale of ["en", "ar"]) {
    const schema = clinicSchema(locale);
    assert.equal(schema.name, clinic.content[locale].name);
    assert.equal(schema.telephone, clinic.mobile.international);
    assert.equal(schema.sameAs, clinic.location.listingHref);
    assert.equal(schema.email, clinic.email);
    assert.equal(schema.address.addressLocality, clinic.postalAddress.locality);
    for (const key of ["priceRange", "description", "aggregateRating", "review", "medicalSpecialty", "image"]) assert.ok(!(key in schema));
    assert.ok(!JSON.stringify(schema).includes("needs-review"));
  }
  const malicious = { name: '</script><script>alert("test")</script> العربية & >' };
  const serialized = serializeJsonLd(malicious);
  assert.ok(!serialized.includes("<"));
  assert.deepEqual(JSON.parse(serialized), malicious);
});

const demoBase = process.env.TEST_BASE_URL;
test("demo production build: discovery endpoints bypass proxy safely and do not block noindex crawling", { skip: !demoBase }, async () => {
  for (const path of ["/sitemap.xml", "/robots.txt"]) {
    for (const host of ["localhost", officialHost, "preview.vercel.app"]) {
      const response = await localRequest(demoBase, path, host);
      assert.equal(response.status, 200);
      assert.match(response.headers["cache-control"], /private.*no-store/);
      assert.match(response.headers["x-robots-tag"], /noindex, follow/);
      assert.match(response.headers.vary, /Host/);
      assert.ok(!response.body.includes(officialHost));
      if (path.endsWith("xml")) {
        assert.match(response.headers["content-type"], /application\/xml/);
        assert.ok(!response.body.includes("<url>"));
      } else {
        assert.equal(response.body, "User-agent: *\nAllow: /\n");
      }
    }
  }
});

const officialBase = process.env.TEST_OFFICIAL_FIXTURE_URL;
test("isolated official build: sitemap matches only eligible canonical pages with reciprocal languages, no fabricated dates, no private approval data", { skip: !officialBase }, async () => {
  const response = await localRequest(officialBase, "/sitemap.xml", officialHost);
  assert.equal(response.status, 200);
  const urls = [...response.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  const suffixes = ["", "/about", "/services", "/doctors", "/contact", "/services/layout-fixture", "/doctors/profile-layout-fixture", "/doctors/profile-minimal-fixture"];
  assert.deepEqual(urls, suffixes.flatMap(suffix => ["en", "ar"].map(locale => `${officialOrigin}/${locale}${suffix}`)));
  assert.ok(!response.body.includes("lastmod"));
  assert.ok(!response.body.includes("TEST ONLY"));
  for (const entry of response.body.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = entry[1].match(/<loc>([^<]+)<\/loc>/)[1];
    const path = new URL(loc).pathname;
    const page = await localRequest(officialBase, path, officialHost);
    assert.equal(page.status, 200, path);
    assert.ok(!page.headers["x-robots-tag"]?.includes("noindex"));
    assert.match(page.body, /<meta name="robots" content="index, follow"/);
    assert.ok(page.body.includes(`rel="canonical" href="${loc}"`), path);
    const suffix = path.replace(/^\/(en|ar)/, "");
    for (const locale of ["en", "ar"]) {
      const translated = `${officialOrigin}/${locale}${suffix}`;
      assert.ok(page.body.includes(`hrefLang="${locale}" href="${translated}"`), path);
      assert.ok(entry[1].includes(`hreflang="${locale}" href="${translated}"`));
    }
    const schema = [...page.body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
    assert.ok(schema.some(node => node["@type"] === "MedicalClinic"));
    for (const node of schema) assert.ok(!("priceRange" in node));
    assert.ok(!page.body.includes("Synthetic profile fixture, not clinic approval"));
    assert.ok(!page.body.includes("Synthetic fixture, not real clinic approval"));
  }
  for (const locale of ["en", "ar"]) {
    for (const [family, records] of [["services", clinicServices], ["doctors", clinicDoctors]]) {
      for (const record of records) {
        assert.ok(!urls.includes(`${officialOrigin}/${locale}/${family}/${record.slug}`));
        const denied = await localRequest(officialBase, `/${locale}/${family}/${record.slug}`, officialHost);
        assert.equal(denied.status, 404);
      }
    }
  }
  const robots = await localRequest(officialBase, "/robots.txt", officialHost);
  assert.equal(robots.body, `User-agent: *\nAllow: /\n\nSitemap: ${officialOrigin}/sitemap.xml\n`);
});

test("isolated approved build: alternating official/alias hosts cannot share discovery output; forwarded-host spoofing cannot authorize indexing", { skip: !officialBase }, async () => {
  const aliases = ["clinic-website-foundation.vercel.app", "preview.vercel.app", "localhost", "www.baghdadmedicalcenter.ae", `${officialHost}.example.com`];
  for (const path of ["/sitemap.xml", "/robots.txt"]) {
    for (const alias of aliases) {
      const official = await localRequest(officialBase, path, officialHost);
      assert.ok(official.body.includes(officialOrigin));
      const response = await localRequest(officialBase, path, alias, { "X-Forwarded-Host": officialHost });
      assert.equal(response.status, 200);
      assert.ok(!response.body.includes(officialOrigin), `${path}: ${alias}`);
      assert.match(response.headers["cache-control"], /private.*no-store/);
      assert.match(response.headers.vary, /Host/);
      assert.match(response.headers["x-robots-tag"], /noindex/);
      // Next may consume CDN cache-control headers; enforce browser cache policy too.
      assert.equal(response.headers["cdn-cache-control"], "no-store");
      const again = await localRequest(officialBase, path, officialHost);
      assert.equal(again.body, official.body);
    }
  }
  for (const locale of ["en", "ar"]) {
    for (const suffix of ["", "/about", "/services", "/doctors", "/contact"]) {
      const alias = await localRequest(officialBase, `/${locale}${suffix}`, aliases[0], { "X-Forwarded-Host": officialHost });
      assert.equal(alias.status, 200);
      assert.match(alias.headers["x-robots-tag"], /noindex, follow/);
    }
  }
});
