import { getTranslations } from "next-intl/server";
import { ContactAction } from "./contact-action";

/** One responsive contact pair: mobile dock / desktop circles, without client state. */
export async function FloatingContact() {
  const t = await getTranslations("ContactActions");
  const navigation = await getTranslations("Navigation");

  return (
    <aside aria-label={t("label")} className="floating-contact">
      <ContactAction kind="whatsapp" appearance="floating" mobileLabel={navigation("whatsapp")}>{t("whatsapp")}</ContactAction>
      <ContactAction kind="call" appearance="floating" mobileLabel={navigation("callNow")}>{t("call")}</ContactAction>
    </aside>
  );
}
