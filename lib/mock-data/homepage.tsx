import { Facebook, Instagram } from "lucide-react";
import type { FAQContent as FAQContent } from "@/components/sections/faq";
import type { ContactContent } from "@/components/sections/contact";
import type { FooterContent } from "@/components/sections/footer";

export const faqContent: FAQContent = {
  eyebrow: "FAQ",
  title: "Common Questions",
  description: "Answers to what patients ask us most.",
  items: [
    {
      question: "Do I need an appointment?",
      answer: "Walk-ins are welcome, but booking ahead guarantees your preferred time slot with minimal wait time.",
    },
    {
      question: "What are your working hours?",
      answer: "We are open Saturday through Thursday from 9:00 AM to 9:00 PM, and Friday from 4:00 PM to 9:00 PM.",
    },
    {
      question: "Do you accept insurance?",
      answer: "Yes — we partner with major providers including NextCare, AlMadallah, Al-Buhaira, Neuron, FMC, and Life Line.",
    },
    {
      question: "What should I bring for my first visit?",
      answer: "Please bring a valid Emirates ID and your digital or physical insurance card (if applicable).",
    },
    {
      question: "Does insurance cover laser, cosmetic, or Hijama (cupping) treatments?",
      answer: "No. Insurance covers core consultations and treatments in General Medicine, Dermatology, Dentistry, and Gynecology. Laser, skincare, and Hijama services are direct-pay only.",
    },
    {
      question: "Do you offer Hijama (cupping therapy) and laser treatments?",
      answer: "Yes, we provide professional Hijama (cupping therapy), cosmetic laser treatments, and advanced skincare procedures.",
    },
    {
      question: "What medical specialties do you offer?",
      answer: "We offer General Medicine, Dentistry, Dermatology, Obstetrics & Gynecology, Pediatrics, and internal diagnostics.",
    },
    {
      question: "Do you offer lab testing and diagnostics on-site?",
      answer: "Yes, our facility includes an on-site laboratory for routine blood work and essential diagnostic services.",
    },
  ],
  support: {
    title: "Can't find your answer?",
    description: "Our reception team is ready to help you with anything you need. Reach out to us directly.",
    whatsappLabel: "Chat on WhatsApp",
    whatsappLink: "https://wa.me/971563564165",
    phoneLabel: "Call Clinic",
    phoneLink: "tel:+971502388626",
  }
};

export const contactContent: ContactContent = {
  eyebrow: "Contact Us",
  title: "Get in Touch",
  description:
    "Have a question or need to schedule a visit? Our team is available by phone, WhatsApp, or email to assist you.",
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
  clinicName: "Baghdad Medical Center",
  logo: { src: "/baghdad/logo.png", alt: "Baghdad Medical Center" },
  tagline: "Compassionate, patient-centered healthcare for individuals and families in Al Madam, Sharjah.",

  quickLinks: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Doctors", href: "#doctors" },
    { label: "Facilities", href: "#facilities" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Insurance", href: "#insurance" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],

  phone: "06 886 1115",
  phoneHref: "+97168861115",
  mobile: "050 238 8626",
  mobileHref: "+971502388626",
  whatsapp: "056 356 4165",
  whatsappHref: "https://wa.me/971563564165",
  email: "info@baghdadmedicalcenter.ae",
  
  address: [
    "Al Madam, Sharjah",
    "First Abu Dhabi Bank (FAB) Building",
    "Side Entrance",
    "First Floor",
  ],
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

  copyright: `© ${new Date().getFullYear()} Baghdad Medical Center. All rights reserved.`,
};