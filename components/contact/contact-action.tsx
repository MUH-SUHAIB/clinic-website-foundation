import { Phone } from "lucide-react";
import { clinicContact } from "@/lib/clinic-contact";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./whatsapp-icon";

export function ContactAction({
  kind,
  appearance = "standard",
  children,
}: {
  kind: "call" | "whatsapp";
  appearance?: "standard" | "header" | "menu" | "floating";
  children: string;
}) {
  const whatsapp = kind === "whatsapp";

  return (
    <a
      href={whatsapp ? clinicContact.whatsappHref : clinicContact.landlineHref}
      target={whatsapp ? "_blank" : undefined}
      rel={whatsapp ? "noopener noreferrer" : undefined}
      className={cn("contact-action", `contact-action--${kind}`, `contact-action--${appearance}`)}
    >
      {whatsapp ? <WhatsAppIcon /> : <Phone aria-hidden="true" focusable="false" />}
      <span className={appearance === "floating" ? "sr-only" : undefined}>{children}</span>
    </a>
  );
}
