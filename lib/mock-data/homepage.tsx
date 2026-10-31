import { clinic, clinicContact, clinicLocation } from "@/lib/clinic";
import { Facebook, Instagram } from "lucide-react";
import type { FooterContent } from "@/components/sections/footer";

export const footerContent: FooterContent = {
  logo: { src: "/baghdad/logo.png", alt: clinic.content.en.name },
  phone: clinic.landline.display,
  phoneHref: clinic.landline.international,
  mobile: clinic.mobile.display,
  mobileHref: clinic.mobile.international,
  whatsapp: clinic.whatsapp.display,
  whatsappHref: clinicContact.whatsappHref,
  email: clinic.email,
  addressHref: clinicLocation.mapHref,
  socialLinks: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/baghdad__medical_center/",
      icon: <Instagram size={18} />,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/p/Baghdad-Medical-Center-61569953136442/",
      icon: <Facebook size={18} />,
    },
  ],
};