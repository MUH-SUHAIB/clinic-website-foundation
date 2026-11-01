import assert from "node:assert/strict";
import test from "node:test";
import { clinicDoctors, getDoctorSummaries, getDoctorProfile, getDoctorProfileSlugs, getDoctorProfileDigest, hasApprovedDoctorProfile } from "../lib/content/doctors.ts";
import { approvedDoctorFixture } from "./fixtures/doctor-profile.mjs";

const lookup = (doctor, includeWorkingContent = true) => getDoctorProfile(doctor.slug, { doctors: [doctor], includeWorkingContent });
const resign = doctor => { doctor.profile.approval.contentDigest = getDoctorProfileDigest(doctor); };

test("six doctors and three editorial homepage choices remain unchanged with no profile links", () => {
  assert.equal(clinicDoctors.length, 6);
  assert.deepEqual(getDoctorProfileSlugs({ includeWorkingContent: true }), []);
  for (const locale of ["en", "ar"]) {
    const directory = getDoctorSummaries(locale, { includeWorkingContent: true });
    const home = getDoctorSummaries(locale, { includeWorkingContent: true, featuredOnly: true });
    assert.equal(directory.length, 6);
    assert.deepEqual(home.map(d => d.id), ["safaa", "jawad", "rana"]);
    assert.ok([...directory, ...home].every(d => !d.profileSlug));
  }
  for (const doctor of clinicDoctors) assert.equal(lookup(doctor), undefined);
});

test("profile approval does not bypass official catalogue publication requirements", () => {
  const d = approvedDoctorFixture();
  assert.ok(lookup(d)); assert.equal(lookup(d, false), undefined);
  d.publicationStatus = "published"; d.clinicalReviewStatus = "approved";
  assert.ok(lookup(d, false));
  assert.deepEqual(getDoctorProfileSlugs({ doctors: [d] }), [d.slug]);
});

test("drafts, revoked reviews, missing evidence, dates and content changes invalidate profiles", () => {
  const changes = [
    d => { delete d.profile; }, d => { delete d.profile.approval; },
    d => { d.profile.approval.status = "draft"; },
    d => { d.profile.approval.substantiveBilingualContent = false; },
    ...["owner", "clinical", "editorial"].flatMap(kind => [
      d => { delete d.profile.approval[kind]; },
      d => { d.profile.approval[kind].evidenceReference = ""; },
      d => { d.profile.approval[kind].reviewer = ""; },
      d => { d.profile.approval[kind].role = ""; },
      d => { d.profile.approval[kind].reviewedAt = "2026-02-30"; },
      d => { d.profile.approval[kind].reviewedAt = "2999-01-01"; },
    ]),
    d => { d.profile.content.en.biography.push("Changed"); },
    d => { d.profile.content.ar.qualifications.push("تغيير"); },
    d => { d.content.en.name += " Changed"; }, d => { d.content.ar.specialty += " تغيير"; },
    d => { d.content.en.imageAlt = "Mislabelled portrait"; },
    d => { d.image = "/other.jpg"; }, d => { d.imageKind = "portrait"; },
    d => { d.slug = "changed"; }, d => { d.isFounder = true; },
  ];
  for (const change of changes) { const d = approvedDoctorFixture(); change(d); assert.equal(lookup(d), undefined, change.toString()); }
});

test("summary-only biographies, missing translations and empty optional items fail even if resigned", () => {
  for (const locale of ["en", "ar"]) {
    for (const change of [
      d => { delete d.profile.content[locale]; },
      d => { d.profile.content[locale].biography = [d.content[locale].description]; },
      d => { d.profile.content[locale].biography = []; },
      d => { d.profile.content[locale].metaTitle = ""; },
      d => { d.content[locale].name = ""; },
      d => { d.content[locale].imageAlt = ""; },
      d => { d.profile.content[locale].qualifications = [" "]; },
    ]) { const d = approvedDoctorFixture(); change(d); resign(d); assert.equal(hasApprovedDoctorProfile(d), false); }
  }
});

test("optional sections may be absent or empty; room photos and accurate alt remain authoritative", () => {
  const d = approvedDoctorFixture({ minimal: true });
  assert.ok(lookup(d));
  for (const locale of ["en", "ar"]) d.profile.content[locale].languages = [];
  resign(d); assert.ok(lookup(d));
  const room = approvedDoctorFixture();
  assert.equal(room.imageKind, "clinic-room");
  assert.equal(room.image, clinicDoctors.find(d => d.id === "rana").image);
  for (const locale of ["en", "ar"]) assert.equal(room.content[locale].imageAlt, clinicDoctors.find(d => d.id === "rana").content[locale].imageAlt);
  for (const slug of ["unknown", "../profile-layout-fixture", "[slug]", "PROFILE-LAYOUT-FIXTURE"]) assert.equal(getDoctorProfile(slug, { doctors: [room], includeWorkingContent: true }), undefined);
});

const base = process.env.TEST_BASE_URL;
for (const locale of ["en", "ar"]) {
  test(`${locale}: all six unapproved doctor profiles, unknown and fixture slugs return real noindex 404s`, { skip: !base }, async () => {
    for (const slug of [...clinicDoctors.map(d => d.slug), "unknown-doctor", "profile-layout-fixture", "profile-minimal-fixture"]) {
      const response = await fetch(`${base}/${locale}/doctors/${slug}`);
      assert.equal(response.status, 404, slug);
      assert.match(response.headers.get("x-robots-tag"), /noindex/);
      const html = await response.text();
      assert.match(html, /<meta name="robots" content="[^"]*noindex/);
      assert.ok(!html.includes('rel="canonical"'));
      assert.ok(!html.includes("English profile template test"));
      assert.ok(!html.includes("Synthetic profile fixture, not clinic approval"));
    }
    for (const suffix of ["", "/doctors"]) {
      const html = await (await fetch(`${base}/${locale}${suffix}`)).text();
      assert.doesNotMatch(html, /<a\b[^>]*href="\/(?:en|ar)\/doctors\//);
    }
    const source = await fetch(`${base}/tests/fixtures/doctor-profile.mjs`);
    assert.equal(source.status, 404);
  });
}

const fixtureBase = process.env.TEST_DETAIL_FIXTURE_URL;
for (const locale of ["en", "ar"]) {
  for (const minimal of [false, true]) {
    test(`${locale}: isolated ${minimal ? "minimal portrait" : "room-photo"} profile renders approved sections, links and noindex`, { skip: !fixtureBase }, async () => {
      const d = approvedDoctorFixture({ minimal });
      const response = await fetch(`${fixtureBase}/${locale}/doctors/${d.slug}`);
      assert.equal(response.status, 200);
      assert.match(response.headers.get("x-robots-tag"), /noindex/);
      const html = await response.text();
      const copy = d.profile.content[locale];
      assert.ok(html.includes(`<title>${copy.metaTitle}</title>`));
      assert.equal((html.match(/<h1\b/g) || []).length, 1);
      assert.ok(html.includes(`alt="${d.content[locale].imageAlt}"`));
      for (const key of ["specialties", "qualifications", "languages", "experience"]) assert.equal(html.includes(`id="doctor-${key}"`), !minimal);
      assert.equal(html.includes("<figcaption"), !minimal);
      const header = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)[1];
      assert.ok(header.includes(`href="/${locale === "en" ? "ar" : "en"}/doctors/${d.slug}"`));
      assert.ok(header.includes('data-active="true"'));
      assert.ok(!header.includes('aria-current="page"'));
      assert.ok(!header.includes("[slug]"));
      for (const href of [`/${locale}/doctors`, `/${locale}/services`, `/${locale}/contact`, "tel:+97168861115", "https://wa.me/971563564165"]) assert.ok(html.includes(`href="${href}"`));
      assert.match(html, /<meta name="robots" content="noindex, follow"/);
      assert.ok(!html.includes('rel="canonical"'));
      assert.ok(!html.includes("Synthetic profile fixture, not clinic approval"));
      assert.ok(!html.includes("TEST ONLY"));
      const directory = await (await fetch(`${fixtureBase}/${locale}/doctors`)).text();
      assert.ok(directory.includes(`href="/${locale}/doctors/${d.slug}"`));
    });
  }
}


const officialBase = process.env.TEST_OFFICIAL_FIXTURE_URL;
for (const locale of ["en", "ar"]) {
  test(`${locale}: isolated official metadata/schema use approved identities and never use a room as a portrait`, { skip: !officialBase }, async () => {
    for (const [family, slug] of [["services", "layout-fixture"], ["doctors", "profile-layout-fixture"], ["doctors", "profile-minimal-fixture"]]) {
      const response = await fetch(`${officialBase}/${locale}/${family}/${slug}`);
      assert.equal(response.status, 200);
      // The local alias stays protected even when shared official HTML is approved.
      assert.match(response.headers.get("x-robots-tag"), /noindex/);
      const html = await response.text();
      const canonical = `https://baghdadmedicalcenter.ae/${locale}/${family}/${slug}`;
      assert.ok(html.includes(`rel="canonical" href="${canonical}"`));
      for (const language of ["en", "ar"]) assert.ok(html.includes(`hrefLang="${language}" href="https://baghdadmedicalcenter.ae/${language}/${family}/${slug}"`));
      const graphs = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
      const graph = graphs.find(g => g["@graph"]?.some(n => n["@type"] === "BreadcrumbList"))["@graph"];
      if (family === "doctors") {
        const person = graph.find(n => n["@type"] === "Person");
        assert.ok(person);
        assert.equal(!!person.image, slug === "profile-minimal-fixture");
        if (person.image) assert.ok(person.image.endsWith("/baghdad/doctors/Jawad%20khan.jpg"));
        assert.equal(person.url, canonical);
        for (const forbidden of ["hasCredential", "award", "medicalSpecialty", "worksFor"]) assert.ok(!(forbidden in person));
      }
      assert.ok(!html.includes("Synthetic profile fixture, not clinic approval"));
    }
  });
}
