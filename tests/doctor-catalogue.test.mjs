import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { clinicDoctors, getDoctorSummaries } from "../lib/content/doctors.ts";

test("unverified doctors require explicit demo opt-in", () => {
  for (const locale of ["en", "ar"]) assert.deepEqual(getDoctorSummaries(locale), []);
  for (const doctor of clinicDoctors) {
    assert.equal(doctor.publicationStatus, "demo");
    assert.equal(doctor.clinicalReviewStatus, "needs-review");
  }
});

test("six existing doctors have unique identities, bilingual copy and real assets", () => {
  assert.deepEqual(clinicDoctors.map((doctor) => doctor.id), ["safaa", "jawad", "abdullah", "bassam", "rana", "rishika"]);
  assert.equal(new Set(clinicDoctors.map((doctor) => doctor.slug)).size, 6);
  for (const doctor of clinicDoctors) {
    assert.ok(existsSync(new URL(`../public${doctor.image}`, import.meta.url)));
    for (const locale of ["en", "ar"]) {
      for (const value of Object.values(doctor.content[locale])) assert.ok(value.trim());
    }
  }
  for (const locale of ["en", "ar"]) {
    const directory = getDoctorSummaries(locale, { includeWorkingContent: true });
    const featured = getDoctorSummaries(locale, { includeWorkingContent: true, featuredOnly: true });
    assert.equal(directory.length, 6);
    assert.equal(featured.length, 3);
    assert.deepEqual(featured.map((doctor) => doctor.id), ["safaa", "jawad", "rana"]);
  }
});

test("Rana and Rishika retain clinic-room photographs described as rooms", () => {
  const rooms = clinicDoctors.filter((doctor) => doctor.imageKind === "clinic-room");
  assert.deepEqual(rooms.map((doctor) => doctor.id), ["rana", "rishika"]);
  for (const doctor of rooms) {
    assert.equal(doctor.image, "/baghdad/doctors/dentistry-room.webp");
    assert.match(doctor.content.en.imageAlt, /Dental treatment room/);
    assert.match(doctor.content.ar.imageAlt, /غرفة علاج الأسنان/);
    for (const locale of ["en", "ar"]) assert.ok(!doctor.content[locale].imageAlt.includes(doctor.content[locale].name));
  }
});

for (const locale of ["en", "ar"]) {
  test(`${locale}: homepage shows three editorial choices while directory retains six doctors`, { skip: !process.env.TEST_BASE_URL }, async () => {
    const homepage = await fetch(new URL(`/${locale}`, process.env.TEST_BASE_URL));
    assert.equal(homepage.status, 200);
    const html = await homepage.text();
    const preview = html.match(/<section\b[^>]*id="doctors"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.ok(preview);
    assert.equal((preview.match(/<article\b/g) || []).length, 3);
    assert.deepEqual([...preview.matchAll(/<article\b[^>]*aria-labelledby="([^"]+)-title"/g)].map((match) => match[1]), ["safaa", "jawad", "rana"]);
    assert.ok(preview.includes(`href="/${locale}/doctors"`));
    const directory = await fetch(new URL(`/${locale}/doctors`, process.env.TEST_BASE_URL));
    assert.equal(directory.status, 200);
    assert.equal(((await directory.text()).match(/<article\b/g) || []).length, 6);
  });

  test(`${locale}: directory preserves doctor content and room-photo accessibility`, { skip: !process.env.TEST_BASE_URL }, async () => {
    const response = await fetch(new URL(`/${locale}/doctors`, process.env.TEST_BASE_URL));
    assert.equal(response.status, 200);
    const html = await response.text();
    const introduction = html.match(/<main\b[\s\S]*?<header\b[^>]*>([\s\S]*?)<\/header>/)?.[1]
      .replace(/<[^>]+>/g, "");
    assert.ok(introduction?.includes(locale === "en"
      ? "Meet the medical team at Baghdad Medical Center."
      : "تعرّف على فريقنا الطبي في مركز بغداد الطبي."));
    assert.doesNotMatch(introduction, /board-certified|مؤهلون/i);
    assert.equal((html.match(/<article\b/g) || []).length, 6);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.ok(!html.includes(`href="/${locale}/doctors/`));
    for (const doctor of clinicDoctors) {
      assert.ok(html.includes(`id="${doctor.id}-title"`));
      assert.ok(html.includes(`alt="${doctor.content[locale].imageAlt}"`));
    }
    const missing = await fetch(new URL(`/${locale}/doctors/safaa`, process.env.TEST_BASE_URL));
    assert.equal(missing.status, 404);
  });
}
