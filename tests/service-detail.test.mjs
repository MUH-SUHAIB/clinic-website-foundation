import assert from "node:assert/strict";
import test from "node:test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { clinicServices, getServiceSummaries, getServiceDetail, getServiceDetailSlugs, getServiceDetailDigest, hasApprovedServiceDetails } from "../lib/content/services.ts";
import { approvedDetailFixture } from "./fixtures/service-detail.mjs";

const lookup = (service, includeWorkingContent = true) => getServiceDetail(service.slug, { services: [service], includeWorkingContent });
function resign(service) { service.details.approval.contentDigest = getServiceDetailDigest(service); }

test("all six working summaries remain visible on demo without detail routes or links", () => {
  assert.equal(clinicServices.length, 6);
  assert.deepEqual(getServiceDetailSlugs({ includeWorkingContent: true }), []);
  for (const locale of ["en", "ar"]) {
    const summaries = getServiceSummaries(locale, { includeWorkingContent: true });
    assert.equal(summaries.length, 6);
    assert.ok(summaries.every((summary) => !summary.detailSlug));
  }
  for (const service of clinicServices) assert.equal(lookup(service), undefined);
});

test("only a reviewed substantive bilingual pair qualifies, independently of official publication", () => {
  const fixture = approvedDetailFixture();
  assert.equal(lookup(fixture)?.slug, fixture.slug);
  assert.equal(lookup(fixture, false), undefined);
  fixture.publicationStatus = "published";
  fixture.clinicalReviewStatus = "approved";
  assert.equal(lookup(fixture, false)?.slug, fixture.slug);
  assert.deepEqual(getServiceDetailSlugs({ services: [fixture] }), [fixture.slug]);
});

test("missing, revoked, incomplete or stale approval fails closed", () => {
  const mutations = [
    (s) => { delete s.details; },
    (s) => { delete s.details.approval; },
    (s) => { s.details.approval.status = "draft"; },
    (s) => { s.details.approval.substantiveBilingualContent = false; },
    ...["owner", "clinical", "editorial"].flatMap((kind) => [
      (s) => { s.details.approval[kind].evidenceReference = ""; },
      (s) => { s.details.approval[kind].reviewer = ""; },
      (s) => { s.details.approval[kind].role = ""; },
      (s) => { s.details.approval[kind].reviewedAt = "2026-02-30"; },
      (s) => { s.details.approval[kind].reviewedAt = "2999-01-01"; },
    ]),
    (s) => { s.details.content.en.overview += " Changed."; },
    (s) => { s.details.content.ar.metaDescription += " تغيير"; },
    (s) => { s.content.en.title += " Changed"; },
    (s) => { s.image = "/different.jpg"; },
    (s) => { s.slug = "changed-url"; },
  ];
  for (const mutate of mutations) {
    const fixture = approvedDetailFixture();
    mutate(fixture);
    assert.equal(lookup(fixture), undefined, mutate.toString());
  }
});

test("summary-only, empty required content and missing translations fail even with matching digest", () => {
  for (const locale of ["en", "ar"]) {
    for (const mutate of [
      (s) => { delete s.details.content[locale]; },
      (s) => { s.details.content[locale].overview = s.content[locale].description; },
      (s) => { delete s.details.content[locale].scope; },
      (s) => { s.details.content[locale].scope.paragraphs = []; },
      (s) => { s.details.content[locale].scope.paragraphs = [s.details.content[locale].overview]; },
      (s) => { s.details.content[locale].imageAlt = " "; },
      (s) => { s.details.content[locale].metaDescription = " "; },
      (s) => { s.details.content[locale].faqs = [{ question: "", answer: "" }]; },
    ]) {
      const fixture = approvedDetailFixture(); mutate(fixture); resign(fixture);
      assert.equal(hasApprovedServiceDetails(fixture), false);
    }
  }
});

test("optional sections may be absent and unknown/unsafe slugs never resolve", () => {
  const fixture = approvedDetailFixture();
  for (const locale of ["en", "ar"]) {
    delete fixture.details.content[locale].visit;
    delete fixture.details.content[locale].faqs;
  }
  resign(fixture);
  assert.ok(lookup(fixture));
  for (const slug of ["unknown", "../layout-fixture", "LAYOUT-FIXTURE", "[slug]", ""]) {
    assert.equal(getServiceDetail(slug, { services: [fixture], includeWorkingContent: true }), undefined);
  }
});

const base = process.env.TEST_BASE_URL;
for (const locale of ["en", "ar"]) {
  test(`${locale}: all six unapproved details and unknown slug return actual noindex 404s`, { skip: !base }, async () => {
    for (const slug of [...clinicServices.map((service) => service.slug), "not-a-service", "layout-fixture"]) {
      const response = await fetch(`${base}/${locale}/services/${slug}`);
      assert.equal(response.status, 404, slug);
      assert.match(response.headers.get("x-robots-tag"), /noindex/);
      const html = await response.text();
      assert.match(html, /<meta name="robots" content="[^"]*noindex/);
      assert.ok(!html.includes('rel="canonical"'));
    }
    const html = await (await fetch(`${base}/${locale}/services`)).text();
    for (const { slug } of clinicServices) assert.ok(!html.includes(`href="/${locale}/services/${slug}"`));
  });
}

const fixtureBase = process.env.TEST_DETAIL_FIXTURE_URL;
for (const locale of ["en", "ar"]) {
  test(`${locale}: isolated approved template renders real links, metadata and noindex`, { skip: !fixtureBase }, async () => {
    const fixture = approvedDetailFixture();
    const response = await fetch(`${fixtureBase}/${locale}/services/${fixture.slug}`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("x-robots-tag"), /noindex/);
    const html = await response.text();
    const copy = fixture.details.content[locale];
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.ok(html.includes(`<title>${copy.metaTitle}</title>`));
    for (const text of [copy.overview, copy.scope.heading, copy.imageAlt, copy.visit.heading, copy.faqs[0].question]) assert.ok(html.replace(/<\/?bdi\b[^>]*>/g, "").includes(text), text);
    assert.ok(html.includes(`dir="${locale === "ar" ? "rtl" : "ltr"}"`));
    const header = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)[1];
    assert.ok(header.includes(`href="/${locale === "en" ? "ar" : "en"}/services/${fixture.slug}"`));
    assert.ok(!header.includes("[slug]"));
    assert.ok(header.includes('data-active="true"'));
    assert.ok(!header.includes('aria-current="page"'));
    assert.ok(html.includes(`href="/${locale}#contact"`));
    for (const href of [`/${locale}/services`, `/${locale}/doctors`, `/${locale}/contact`, "tel:+97168861115", "https://wa.me/971563564165"]) assert.ok(html.includes(`href="${href}"`));
    assert.match(html, /<meta name="robots" content="noindex, follow"/);
    assert.ok(!html.includes('rel="canonical"'));
    assert.ok(!html.includes('hrefLang="'));
    assert.ok(!html.includes("TEST ONLY")); // Internal review evidence never leaks.
    assert.ok(!html.includes("Synthetic fixture, not real clinic approval"));
    const directory = await (await fetch(`${fixtureBase}/${locale}/services`)).text();
    const home = await (await fetch(`${fixtureBase}/${locale}`)).text();
    for (const page of [directory, home]) assert.ok(page.includes(`href="/${locale}/services/${fixture.slug}"`));
  });
}


test("fixture data is absent from application sources and public assets", () => {
  function inspect(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) inspect(path);
      else if (/\.(?:tsx?|m?js|json|html|txt)$/.test(entry.name)) {
        const source = readFileSync(path, "utf8");
        for (const marker of ["layout-fixture", "approvedDetailFixture", "Synthetic fixture, not real clinic approval", "tests/fixtures"]) {
          assert.ok(!source.includes(marker), `${path}: unexpected fixture reference`);
        }
      }
    }
  }
  for (const directory of ["app", "components", "lib", "i18n", "messages", "public"]) inspect(directory);
});

for (const locale of ["en", "ar"]) {
  test(`${locale}: fixture source and guessed fixture routes are not publicly served`, { skip: !base }, async () => {
    for (const path of [
      `/${locale}/services/layout-fixture`,
      "/tests/fixtures/service-detail.mjs",
      "/tests/fixtures/create-service-detail-site.mjs",
      `/${locale}/tests/fixtures/service-detail.mjs`,
      `/${locale}/tests/fixtures/create-service-detail-site.mjs`,
    ]) {
      const response = await fetch(new URL(path, base));
      assert.equal(response.status, 404, path);
      const html = await response.text();
      assert.ok(!html.includes("Synthetic fixture, not real clinic approval"));
      assert.ok(!html.includes("function approvedDetailFixture"));
    }
  });
}
