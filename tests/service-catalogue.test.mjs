import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { clinicServices, getServiceSummaries } from "../lib/content/services.ts";

test("working medical content is excluded without an explicit demo opt-in", () => {
  assert.deepEqual(getServiceSummaries("en"), []);
  assert.deepEqual(getServiceSummaries("ar"), []);
  for (const service of clinicServices) {
    assert.equal(service.publicationStatus, "demo");
    assert.equal(service.clinicalReviewStatus, "needs-review");
  }
});

test("the demo catalogue has stable unique IDs, bilingual copy, and real assets", () => {
  assert.equal(clinicServices.length, 6);
  assert.equal(new Set(clinicServices.map((service) => service.id)).size, 6);
  assert.equal(new Set(clinicServices.map((service) => service.slug)).size, 6);
  for (const service of clinicServices) {
    assert.ok(existsSync(new URL(`../public${service.image}`, import.meta.url)));
    for (const locale of ["en", "ar"]) {
      assert.ok(service.content[locale].title.trim());
      assert.ok(service.content[locale].description.trim());
    }
  }
  for (const locale of ["en", "ar"]) {
    const summaries = getServiceSummaries(locale, { includeWorkingContent: true });
    assert.equal(summaries.length, 6);
    assert.deepEqual(summaries.map((service) => service.id), clinicServices.map((service) => service.id));
  }
});
