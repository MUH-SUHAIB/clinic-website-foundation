import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const base = process.env.TEST_BASE_URL;
for (const locale of ["en", "ar"]) {
  const messages = JSON.parse(await readFile(new URL(`../messages/${locale}.json`, import.meta.url), "utf8"));
  test(`${locale}: confirmed insurer list and precise aggregate accessible label preserve badge and noindex`, { skip: !base }, async () => {
    const response = await fetch(new URL(`/${locale}`, base));
    assert.equal(response.status, 200);
    assert.match(response.headers.get("x-robots-tag"), /noindex/);
    const html = await response.text();
    assert.match(html, /<meta name="robots" content="noindex, follow"/);
    const text = html.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&");
    const faq = messages.FAQ.items.item3.answer;
    const brands = locale === "en" ? ["NextCare", "AlMadallah", "Al-Buhaira", "Neuron", "FMC", "Life Line", "Enaya"] : ["نيكست كير", "المظلة", "البحيرة", "نيرون", "أف إم سي", "لايف لاين", "عناية"];
    for (const brand of brands) assert.ok(faq.includes(brand), brand);
    const qualifier = locale === "en" ? "your plan and service" : "خطتك التأمينية والخدمة المطلوبة";
    for (const copy of [messages.Insurance.description, faq, messages.FAQ.items.item5.answer]) {
      assert.ok(copy.includes(qualifier));
      assert.ok(text.includes(copy));
    }
    const reviews = html.match(/<section\b[^>]*id="testimonials"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.ok(reviews);
    const precise = messages.Testimonials.ratingLabel.replace("{rating}", "4.4");
    const rounded = messages.Testimonials.ratingLabel.replace("{rating}", "4");
    const aggregateStars = reviews.match(/<div role="img"[^>]*aria-label="([^"]+)"[^>]*>([\s\S]*?)<\/div>/);
    assert.equal(aggregateStars?.[1], precise);
    assert.equal((aggregateStars[2].match(/fill-amber-400/g) || []).length, 4);
    assert.ok(!reviews.includes(`aria-label="${rounded}"`));
    assert.ok(reviews.includes('dir="ltr">4.4</bdi>'));
    assert.ok(reviews.includes('dir="ltr">80+</bdi>'));
    assert.ok(reviews.includes("Muna Mohamed"));
    assert.ok(reviews.includes("الدكتورة يارا"));
    const insurance = html.match(/<section\b[^>]*id="insurance"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.equal((insurance.match(/<img\b/g) || []).length, 7);
    for (const asset of ["al-madallah.svg", "lifeline.png", "fmc.svg", "enaya.svg", "neuron.svg", "nextcare.svg", "al-buhaira.svg"]) assert.ok(insurance.includes(`/baghdad/insurance/${asset}`));
  });
}
