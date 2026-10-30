// All map destinations share this exact clinic location.
const latitude = 24.9146055;
const longitude = 55.7757416;
const coordinates = `${latitude},${longitude}`;
const encodedCoordinates = encodeURIComponent(coordinates);

export const clinicLocation = {
  latitude,
  longitude,
  coordinates,
  mapHref: `https://www.google.com/maps/search/?api=1&query=${encodedCoordinates}`,
  // Omitting origin lets Google Maps use the visitor's location when available,
  // or ask for a starting point without requesting location access on this site.
  directionsHref: `https://www.google.com/maps/dir/?api=1&destination=${encodedCoordinates}`,
  embedHref: `https://www.google.com/maps?q=${encodedCoordinates}&hl=en&z=17&output=embed`,
  // Keep the existing clinic listing and its reviews tab, with the same map pin.
  reviewsHref: `https://www.google.com/maps/place/BAGHDAD+MEDICAL+CENTRE/@${coordinates},17z/data=!4m14!1m5!8m4!1e1!2s108076981700144378409!3m1!1e1!3m7!1s0x3ef573f609a9bbf7:0x9ebb7b0be900046e!8m2!3d${latitude}!4d${longitude}!9m1!1b1!16s%2Fg%2F11clvpfq2k?hl=en-GB&entry=ttu`,
};
