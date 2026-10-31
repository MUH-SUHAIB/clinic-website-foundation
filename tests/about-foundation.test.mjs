import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const base = process.env.TEST_BASE_URL;
for (const locale of ["en", "ar"]) {
  const messages = JSON.parse(await readFile(new URL(`../messages/${locale}.json`, import.meta.url), "utf8"));
  test(`${locale}: About page reuses complete homepage content, founder photo and localized links`, { skip: !base }, async () => {
    const pages = await Promise.all(["", "/about"].map(async (suffix) => {
      const response = await fetch(new URL(`/${locale}${suffix}`, base));
      assert.equal(response.status, 200);
      assert.match(response.headers.get("x-robots-tag"), /noindex/);
      const html = await response.text();
      assert.match(html, /<meta name="robots" content="noindex, follow"/);
      const about = html.match(/<section\b[^>]*id="about"[^>]*>([\s\S]*?)<\/section>/)?.[1];
      assert.ok(about);
      // These strings must already be present in server HTML, including the quote/mission/vision.
      const text = about.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
      for (const key of ["title", "paragraph1", "missionTitle", "missionDesc", "visionTitle", "visionDesc", "quote", "author", "role"]) {
        assert.ok(text.includes(messages.About[key]), key);
      }
      assert.ok(about.includes('about-founder-doctor.webp'));
      assert.ok(about.includes(`alt="${messages.About.author} - ${messages.About.role}"`));
      assert.equal((about.match(/<img\b/g) || []).length, 1);
      assert.match(about, /<blockquote\b/);
      return { html, about };
    }));
    const [{ about: homeAbout }, { html, about }] = pages;
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.match(about, /<h1\b[^>]*id="about-title"/);
    assert.equal((about.match(/<h2\b/g) || []).length, 2);
    assert.match(homeAbout, /<h2\b[^>]*id="about-title"/);
    assert.ok(html.includes(`<title>${messages.About.metaTitle}</title>`));
    assert.ok(html.includes(`content="${messages.About.metaDescription}"`));
    assert.ok(!html.includes('rel="canonical"'));
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
    for (const page of ["services", "doctors", "contact"]) assert.ok(main.includes(`href="/${locale}/${page}"`));
    assert.ok(main.includes('aria-current="page"'));
    assert.ok(html.includes(`href="/${locale === "en" ? "ar" : "en"}/about"`));
  });
}
