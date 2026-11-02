const latitude = 24.9146055;
const longitude = 55.7757416;
const coordinates = `${latitude},${longitude}`;

/** Existing demo business facts. Owner confirmation is still required before official launch. */
export const clinic = {
  reviewStatus: "needs-review",
  timeZone: "Asia/Dubai",
  postalAddress: { locality: "Al Madam", region: "Sharjah", country: "AE" },
  email: "mail@baghdadmedicalcenter.ae",
  landline: { display: "06 886 1115", international: "+97168861115" },
  mobile: { display: "050 238 8626", international: "+971502388626" },
  whatsapp: { display: "056 356 4165", number: "971563564165" },
  location: {
    latitude,
    longitude,
    listingHref: `https://www.google.com/maps/place/BAGHDAD+MEDICAL+CENTRE/@${coordinates},17z/data=!4m6!3m5!1s0x3ef573f609a9bbf7:0x9ebb7b0be900046e!8m2!3d${latitude}!4d${longitude}!16s%2Fg%2F11clvpfq2k`,
    // Preserve the existing embedded map; external actions use the verified listing.
    embedHref: `https://www.google.com/maps?q=${coordinates}&hl=en&z=17&output=embed`,
    reviewsHref: `https://www.google.com/maps/place/BAGHDAD+MEDICAL+CENTRE/@${coordinates},17z/data=!4m14!1m5!8m4!1e1!2s108076981700144378409!3m1!1e1!3m7!1s0x3ef573f609a9bbf7:0x9ebb7b0be900046e!8m2!3d${latitude}!4d${longitude}!9m1!1b1!16s%2Fg%2F11clvpfq2k?hl=en-GB&entry=ttu`,
  },
  content: {
    "en": {
      "name": "Baghdad Medical Center",
      "address": "Al Madam, Sharjah — same building as First Abu Dhabi Bank (FAB), side entrance, First Floor.",
      "addressLines": [
        "Al Madam, Sharjah",
        "First Abu Dhabi Bank (FAB) Building",
        "Side Entrance",
        "First Floor"
      ]
    },
    "ar": {
      "name": "مركز بغداد الطبي",
      "address": "المدام، الشارقة — مبنى بنك أبوظبي الأول (FAB)، المدخل الجانبي، الطابق الأول.",
      "addressLines": [
        "المدام، الشارقة",
        "مبنى بنك أبوظبي الأول (FAB)",
        "المدخل الجانبي",
        "الطابق الأول"
      ]
    }
  },

  // Minutes since midnight. Opening is inclusive; closing is exclusive.
  hours: [
    { id: "satThu", days: [6, 0, 1, 2, 3, 4], ranges: [{ open: 510, close: 1320 }] },
    { id: "fri", days: [5], ranges: [{ open: 510, close: 660 }, { open: 900, close: 1320 }] },
  ],
} as const;

export const clinicContact = {
  landlineHref: `tel:${clinic.landline.international}`,
  mobileHref: `tel:${clinic.mobile.international}`,
  whatsappHref: `https://wa.me/${clinic.whatsapp.number}`,
  emailHref: `mailto:${clinic.email}`,
};

export const clinicLocation = {
  ...clinic.location,
  coordinates: `${clinic.location.latitude},${clinic.location.longitude}`,
  mapHref: clinic.location.listingHref,
  // Leave origin unspecified so Maps can use the visitor’s location when available.
  directionsHref: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(coordinates)}`,
};

const dubaiClock = new Intl.DateTimeFormat("en-US", {
  timeZone: clinic.timeZone, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
});
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Regular listed hours only; no holiday or exceptional-closure data is supplied. */
export function isClinicOpen(at: Date): boolean {
  const parts = dubaiClock.formatToParts(at);
  const day = weekdays.indexOf(parts.find((part) => part.type === "weekday")!.value);
  const minute = Number(parts.find((part) => part.type === "hour")!.value) * 60 +
    Number(parts.find((part) => part.type === "minute")!.value);
  return clinic.hours.some((group) => group.days.some((value) => value === day) &&
    group.ranges.some((range) => minute >= range.open && minute < range.close));
}

export function clinicTime(minutes: number, locale: "en" | "ar") {
  const hour = Math.floor(minutes / 60);
  const value = `${hour % 12 || 12}:${String(minutes % 60).padStart(2, "0")}`;
  const period = locale === "en" ? (hour < 12 ? "AM" : "PM") :
    hour < 12 ? "صباحًا" : hour < 18 ? "عصرًا" : "مساءً";
  return { value, period, text: `${value} ${period}` };
}

/** Parameters for the existing FAQ wording, derived from the same displayed schedule. */
export function clinicHoursValues(locale: "en" | "ar") {
  const regular = clinic.hours[0].ranges[0];
  const [morning, evening] = clinic.hours[1].ranges;
  return {
    satOpen: clinicTime(regular.open, locale).text, satClose: clinicTime(regular.close, locale).text,
    friOpen: clinicTime(morning.open, locale).text, friBreak: clinicTime(morning.close, locale).text,
    friReturn: clinicTime(evening.open, locale).text, friClose: clinicTime(evening.close, locale).text,
  };
}
