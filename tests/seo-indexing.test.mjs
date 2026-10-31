import assert from "node:assert/strict";
import test from "node:test";
import { getSiteSeo } from "../lib/site-seo.ts";

const approved = {
  SEO_SITE_URL: "https://baghdadmedicalcenter.ae",
  SEO_INDEXING_APPROVED: "true",
  VERCEL_ENV: "production",
};

test("indexing requires every official-launch condition", () => {
  for (const env of [
    {},
    { VERCEL_ENV: "production" },
    { ...approved, SEO_INDEXING_APPROVED: undefined },
    { ...approved, SEO_SITE_URL: undefined },
    { ...approved, SEO_SITE_URL: "https://clinic-website-foundation.vercel.app" },
    { ...approved, SEO_SITE_URL: "https://baghdadmedicalcenter.ae.example.com" },
    { ...approved, VERCEL_ENV: "preview" },
    { ...approved, VERCEL_ENV: "development" },
  ]) {
    const seo = getSiteSeo(env);
    assert.equal(seo.indexingEnabled, false);
    assert.equal(seo.origin, "https://clinic-website-foundation.vercel.app");
    assert.equal(seo.canIndexHost("baghdadmedicalcenter.ae"), false);
  }
});

test("approved production only permits the exact official hostname", () => {
  const seo = getSiteSeo(approved);
  assert.equal(seo.indexingEnabled, true);
  assert.equal(seo.origin, approved.SEO_SITE_URL);
  assert.equal(seo.canIndexHost("baghdadmedicalcenter.ae"), true);
  for (const host of [
    "clinic-website-foundation.vercel.app",
    "clinic-website-foundation-git-main-al-hezabr.vercel.app",
    "preview.vercel.app",
    "localhost",
    "baghdadmedicalcenter.ae.example.com",
  ]) assert.equal(seo.canIndexHost(host), false);
});
