import { getTranslations } from "next-intl/server";
import { ContactAction } from "./contact-action";

/** Fixed contact controls need no scroll listeners or client state. */
export async function FloatingContact() {
  const t = await getTranslations("ContactActions");

  return (
    <aside aria-label={t("label")} className="floating-contact">
      <ContactAction kind="whatsapp" appearance="floating">{t("whatsapp")}</ContactAction>
      <ContactAction kind="call" appearance="floating">{t("call")}</ContactAction>
    </aside>
  );
}
