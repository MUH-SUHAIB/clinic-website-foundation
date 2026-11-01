import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const base = process.env.TEST_BASE_URL;
for (const locale of ['en', 'ar']) {
  test(`${locale}: preload only the first directory card; keep homepage cards lazy`, {skip: !base}, async () => {
    for (const directory of ['services', 'doctors']) {
      const response = await fetch(`${base}/${locale}/${directory}`);
      assert.equal(response.status, 200);
      const html = await response.text();
      const cards = [...html.matchAll(/<article\b[\s\S]*?<\/article>/g)].map(match => match[0]);
      assert.equal(cards.length, 6);
      const images = cards.map(card => card.match(/<img\b[^>]*>/)?.[0]);
      assert.ok(images.every(Boolean));
      assert.ok(!images[0].includes('loading="lazy"'));
      assert.match(images[0], /fetchPriority="high"/i);
      assert.ok(images.slice(1).every(image => image.includes('loading="lazy"')));
      assert.ok(images.slice(1).every(image => !/fetchPriority="high"/i.test(image)));
      const firstSource = images[0].match(/src="([^"]+)"/)[1];
      const preloads = [...html.matchAll(/<link\b[^>]*rel="preload"[^>]*>/g)].map(match => match[0]);
      assert.ok(preloads.some(link => link.includes('as="image"') &&
        (link.includes(firstSource) || link.includes(images[0].match(/srcSet="([^"]+)"/)?.[1] ?? '__missing_srcset__'))));
      assert.match(response.headers.get('x-robots-tag'), /noindex/);
    }
    const home = await (await fetch(`${base}/${locale}`)).text();
    const heroPhoto = home.match(/class="relative order-1[^\"]*" style="([^\"]*)"/);
    assert.ok(heroPhoto, 'hero photo wrapper is server rendered');
    assert.match(heroPhoto[1], /opacity:1(?:;|$)/, 'LCP photo is visible before hydration');
    assert.ok(!heroPhoto[1].includes('scale(1.06)'));
    assert.match(home, /<img\b[^>]*fetchPriority="high"[^>]*src="[^\"]*hero-reception/i);
    const cards = [...home.matchAll(/<article\b[\s\S]*?<\/article>/g)].map(match => match[0]);
    assert.equal(cards.length, 9);
    assert.ok(cards.every(card => /<img\b[^>]*loading="lazy"/.test(card)));
    assert.match(home, /rel="icon" href="\/favicon-32.png"[^>]*sizes="32x32"/);
    assert.ok(!/<link\b[^>]*href="\/favicon-logo.png"/.test(home));
    assert.match(home, /rel="apple-touch-icon" href="\/apple-touch-logo.png"/);
  });
}
test('tab favicon is a small 32px PNG; original install icon remains available', async () => {
  const icon = await readFile(new URL('../public/favicon-32.png', import.meta.url));
  assert.equal(icon.readUInt32BE(16), 32);
  assert.equal(icon.readUInt32BE(20), 32);
  assert.ok(icon.length < 8192);
  const manifest = JSON.parse(await readFile(new URL('../public/manifest.json', import.meta.url), 'utf8'));
  assert.equal(manifest.icons[0].src, '/favicon-logo.png');
});
