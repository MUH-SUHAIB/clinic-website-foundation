import { getTranslations } from "next-intl/server";
import { FloatingContactControls } from "./floating-contact-controls";

/** Render once in the locale layout; only collision visibility needs client state. */
export async function FloatingContact() {
  const t = await getTranslations("ContactActions");

  return (
    <FloatingContactControls label={t("label")} whatsappLabel={t("whatsapp")} callLabel={t("call")} />
  );
}
