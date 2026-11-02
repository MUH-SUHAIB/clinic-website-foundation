import assert from "node:assert/strict";
import test from "node:test";
import { clinic, clinicContact, clinicLocation, clinicTime, clinicHoursValues, isClinicOpen } from "../lib/clinic.ts";

const listing = "https://www.google.com/maps/place/BAGHDAD+MEDICAL+CENTRE/@24.9146055,55.7757416,17z/data=!4m6!3m5!1s0x3ef573f609a9bbf7:0x9ebb7b0be900046e!8m2!3d24.9146055!4d55.7757416!16s%2Fg%2F11clvpfq2k";

test("confirmed working email and existing contact details preserve the exact clinic listing", () => {
  assert.equal(clinic.reviewStatus, "needs-review");
  assert.equal(clinic.email, "mail@baghdadmedicalcenter.ae");
  assert.deepEqual(clinicContact, {
    landlineHref: "tel:+97168861115", mobileHref: "tel:+971502388626",
    whatsappHref: "https://wa.me/971563564165", emailHref: "mailto:mail@baghdadmedicalcenter.ae",
  });
  assert.deepEqual([clinic.landline.display, clinic.mobile.display, clinic.whatsapp.display], ["06 886 1115", "050 238 8626", "056 356 4165"]);
  assert.equal(clinicLocation.mapHref, listing);
  const directions = new URL(clinicLocation.directionsHref);
  assert.equal(directions.origin + directions.pathname, "https://www.google.com/maps/dir/");
  assert.equal(directions.searchParams.get("api"), "1");
  assert.equal(directions.searchParams.get("destination"), `${clinic.location.latitude},${clinic.location.longitude}`);
  assert.ok(clinicLocation.directionsHref.endsWith("24.9146055%2C55.7757416"));
  assert.deepEqual([...directions.searchParams.keys()], ["api", "destination"]);
  assert.notEqual(clinicLocation.directionsHref, listing);
  assert.equal(clinicLocation.embedHref, "https://www.google.com/maps?q=24.9146055,55.7757416&hl=en&z=17&output=embed");
  assert.ok(clinicLocation.reviewsHref.includes("0x3ef573f609a9bbf7:0x9ebb7b0be900046e"));
});

test("listed schedule retains the two Friday sessions and every other day's hours", () => {
  assert.deepEqual(clinic.hours, [
    { id: "satThu", days: [6, 0, 1, 2, 3, 4], ranges: [{ open: 510, close: 1320 }] },
    { id: "fri", days: [5], ranges: [{ open: 510, close: 660 }, { open: 900, close: 1320 }] },
  ]);
  assert.equal(new Set(clinic.hours.flatMap((group) => [...group.days])).size, 7);
  assert.deepEqual(clinicHoursValues("en"), { satOpen: "8:30 AM", satClose: "10:00 PM", friOpen: "8:30 AM", friBreak: "11:00 AM", friReturn: "3:00 PM", friClose: "10:00 PM" });
  assert.deepEqual(clinicTime(900, "ar"), { value: "3:00", period: "عصرًا", text: "3:00 عصرًا" });
});

test("Dubai open/closed status respects exact boundaries, Friday break and all weekdays", () => {
  for (const day of [1, 2, 3, 4, 5, 6, 7]) { // November 1, 2026 is Sunday; November 6 is Friday.
    const date = `2026-11-${String(day).padStart(2, "0")}`;
    for (const [clock, expected] of [["00:00:00", false], ["08:29:59", false], ["08:30:00", true], ["10:59:59", true], ["11:00:00", day !== 6], ["14:59:59", day !== 6], ["15:00:00", true], ["21:59:59", true], ["22:00:00", false]]) {
      assert.equal(isClinicOpen(new Date(`${date}T${clock}+04:00`)), expected, `${date} ${clock}`);
    }
  }
  // UTC Thursday evening is already Friday in Dubai; midnight must not become hour 24.
  assert.equal(isClinicOpen(new Date("2026-11-05T20:00:00Z")), false);
  assert.equal(isClinicOpen(new Date("2026-11-06T07:00:00Z")), false); // Friday 11:00 Dubai
  assert.equal(isClinicOpen(new Date("2026-11-06T11:00:00Z")), true); // Friday 15:00 Dubai
});

const base = process.env.TEST_BASE_URL;
for (const locale of ["en", "ar"]) {
  test(`${locale}: confirmed email is displayed, linked and shared with clinic schema on every baseline page`, { skip: !base }, async () => {
    for (const suffix of ["", "/about", "/services", "/doctors", "/contact"]) {
      const response = await fetch(new URL(`/${locale}${suffix}`, base));
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.ok(!html.includes("info@baghdadmedicalcenter.ae"));
      const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1];
      assert.ok(footer?.includes('href="mailto:mail@baghdadmedicalcenter.ae"'));
      assert.match(footer, />mail@baghdadmedicalcenter\.ae</);
      const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
        .map(match => JSON.parse(match[1]));
      assert.equal(schemas.find(schema => schema["@type"] === "MedicalClinic")?.email, "mail@baghdadmedicalcenter.ae");
      assert.match(response.headers.get("x-robots-tag"), /noindex/);
      assert.match(html, /<meta name="robots" content="noindex, follow"/);
    }
  });
  for (const suffix of ["", "/contact"]) {
    test(`${locale}${suffix || "/"}: shared contact details, hours, Maps listing versus directions, email and noindex`, { skip: !base }, async () => {
      const response = await fetch(new URL(`/${locale}${suffix}`, base));
      assert.equal(response.status, 200);
      assert.match(response.headers.get("x-robots-tag"), /noindex/);
      const html = await response.text();
      assert.match(html, /<meta name="robots" content="noindex, follow"/);
      assert.ok(!html.includes('rel="canonical"'));
      assert.equal((html.match(/<h1\b/g) || []).length, 1);
      const contact = html.match(/<section\b[^>]*id="contact"[^>]*>([\s\S]*?)<\/section>/)?.[1];
      assert.ok(contact);
      for (const href of Object.values(clinicContact)) assert.ok(contact.includes(`href="${href}"`), href);
      assert.equal([...contact.matchAll(/<a\b[^>]*href="([^"]+)"/g)].filter((match) => match[1].includes("google.com/maps")).length, 2);
      assert.equal((contact.match(/href="https:\/\/www.google.com\/maps\/place\/BAGHDAD/g) || []).length, 1);
      assert.ok(contact.includes(`href="${listing}"`));
      const directionsHref = clinicLocation.directionsHref.replaceAll("&", "&amp;");
      assert.ok(contact.includes(`href="${directionsHref}"`));
      const directionsAction = [...contact.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].find((match) => match[1] === directionsHref);
      assert.ok(directionsAction?.[2].includes(locale === "en" ? "Get Directions" : "احصل على الاتجاهات"));
      const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1];
      assert.ok(footer?.includes(`href="${listing}"`));
      assert.ok(contact.includes(`hl=${locale}&amp;z=17`));
      const text = contact.replace(/<[^>]+>/g, "");
      for (const time of ["8:30", "10:00", "11:00", "3:00"]) assert.ok(text.includes(time));
      if (locale === "ar") {
        assert.ok(text.includes("من 8:30 صباحًا إلى 10:00 مساءً"));
        assert.ok(text.includes("من 8:30 صباحًا إلى 11:00 صباحًا"));
        assert.ok(text.includes("من 3:00 عصرًا إلى 10:00 مساءً"));
        assert.equal((contact.match(/<bdi dir="rtl" class="inline-block whitespace-nowrap"/g) || []).length, 3);
        assert.equal((contact.match(/<bdi dir="ltr" class="inline-block font-mono"/g) || []).length, 6);
        assert.ok(text.indexOf("من 8:30 صباحًا إلى 11:00 صباحًا") < text.indexOf("من 3:00 عصرًا إلى 10:00 مساءً"));
        assert.match(contact, /<bdi dir="rtl"[^>]*>[\s\S]*?<bdi dir="ltr"/);
      }
      assert.equal((html.match(/class="floating-contact"/g) || []).length, 1);
      assert.ok(html.includes(`href="/${locale}/contact"`));
      assert.ok(html.includes(`href="/${locale}/services"`));
      assert.ok(html.includes(`href="/${locale}/doctors"`));
      if (suffix) assert.ok(html.includes(`href="/${locale === "en" ? "ar" : "en"}/contact"`));
    });
  }
}
