import { Facebook, Instagram } from "lucide-react";
import type { ContactContent } from "@/components/sections/contact";
import type { FooterContent } from "@/components/sections/footer";

export const contactContent: ContactContent = {
  phone: "06 886 1115",
  phoneHref: "+97168861115",
  mobile: "050 238 8626",
  mobileHref: "+971502388626",
  whatsapp: "971563564165",
  whatsappLabel: "056 356 4165",
  email: "info@baghdadmedicalcenter.ae",
  address: "Al Madam, Sharjah — same building as First Abu Dhabi Bank (FAB), side entrance, First Floor.",
  mapLink: "https://www.google.com/maps/place/BAGHDAD+MEDICAL+CENTRE/@24.9146055,55.7757416,17z",
  workingHours: [
    { days: "Sat – Thu", hours: "8:30 AM – 10:00 PM" },
    { days: "Fri", hours: "8:30 AM – 11:00 AM, 3:00 PM – 10:00 PM" },
  ],
  mapEmbedSrc: "https://www.google.com/maps?q=24.914790376977315,55.77578987975816&hl=en&z=17&output=embed",
};

export const footerContent: FooterContent = {
  logo: { src: "/baghdad/logo.png", alt: "Baghdad Medical Center" },
  phone: "06 886 1115",
  phoneHref: "+97168861115",
  mobile: "050 238 8626",
  mobileHref: "+971502388626",
  whatsapp: "056 356 4165",
  whatsappHref: "https://wa.me/971563564165",
  email: "info@baghdadmedicalcenter.ae",
  addressHref: "https://maps.google.com/?q=Baghdad+Medical+Center+Al+Madam+Sharjah",
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