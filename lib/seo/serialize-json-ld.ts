/** Prevent HTML script termination while retaining valid JSON, including Arabic. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
