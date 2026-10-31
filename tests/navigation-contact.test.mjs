import assert from "node:assert/strict";
import test from "node:test";

// Run against a production build: TEST_BASE_URL=http://localhost:3100 node --test tests/*.test.mjs
const base = process.env.TEST_BASE_URL;
const sections = ["facilities", "testimonials", "insurance", "faq"];
const pages = new Map();
function getPage(path) {
  if (!pages.has(path)) pages.set(path, fetch(new URL(path, base)).then(async (response) => ({
    status: response.status,
    robots: response.headers.get("x-robots-tag"),
    html: await response.text(),
  })));
  return pages.get(path);
}

for (const locale of ["en", "ar"]) {
  for (const suffix of ["", "/services", "/doctors", "/contact", "/about"]) {
    test(`${locale}${suffix || "/"}: locale navigation, noindex, and a single floating contact pair`, { skip: !base }, async () => {
      const { status, robots, html } = await getPage(`/${locale}${suffix}`);
      assert.equal(status, 200);
      assert.match(robots, /noindex/);
      assert.match(html, /<meta name="robots" content="noindex, follow"/);
      const header = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)?.[1];
      const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1];
      assert.ok(header && footer);
      const homepage = await getPage(`/${locale}`);
      for (const section of sections) {
        for (const navigation of [header, footer]) assert.ok(navigation.includes(`href="/${locale}#${section}"`));
        assert.ok(homepage.html.includes(`id="${section}"`));
      }
      for (const directory of ["services", "doctors", "contact", "about"]) {
        for (const navigation of [header, footer]) assert.ok(navigation.includes(`href="/${locale}/${directory}"`));
        assert.ok(homepage.html.includes(`href="/${locale}/${directory}"`));
      }
      assert.ok(homepage.html.includes('id="doctors"'));
      assert.ok(homepage.html.includes('id="about"'));
      assert.ok(homepage.html.includes('id="contact"'));
      const desktopNav = header.match(/<nav\b[^>]*>([\s\S]*?)<\/nav>/)?.[1];
      assert.ok(desktopNav);
      assert.equal(desktopNav.match(/<a\b[^>]*href="([^"]+)"/)?.[1], `/${locale}`);
      const activeLinks = [...desktopNav.matchAll(/<a\b[^>]*>/g)]
        .map((match) => match[0]).filter((tag) => tag.includes('aria-current="page"'));
      assert.deepEqual(activeLinks.map((tag) => tag.match(/href="([^"]+)"/)?.[1]), [`/${locale}${suffix}`]);
      const otherLocale = locale === "en" ? "ar" : "en";
      assert.ok(header.includes(`href="/${otherLocale}${suffix}"`));
      assert.ok(header.includes(`href="/${locale}"`));
      const floating = [...html.matchAll(/<aside\b[^>]*class="floating-contact"[^>]*>([\s\S]*?)<\/aside>/g)];
      assert.equal(floating.length, 1);
      const links = [...floating[0][1].matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((match) => match[1]);
      assert.deepEqual(links, ["https://wa.me/971563564165", "tel:+97168861115"]);
      assert.equal((floating[0][1].match(/class="sr-only"/g) || []).length, 2);
      assert.ok(!html.includes('rel="canonical"'));
    });
  }
}
