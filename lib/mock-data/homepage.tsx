import { Facebook, Instagram } from "lucide-react";
import type { TestimonialsContent } from "@/components/sections/testimonials";
import type { InsuranceContent } from "@/components/sections/insurance";
import type { FAQContent as FAQContent } from "@/components/sections/faq";
import type { ContactContent } from "@/components/sections/contact";
import type { FooterContent } from "@/components/sections/footer";

export const testimonialsContent: TestimonialsContent = {
  eyebrow: "Patient Stories",
  title: "What Our Patients Say",
  aggregateScore: {
    rating: 4.4,
    totalReviews: "80+",
    platform: "Google Reviews",
  },
  testimonials: [
    {
      name: "Muna Mohamed",
      review:
        "الدكتورة يارا متميزة جدًا في عملها، لديها خبرة عالية ودقة واضحة في التشخيص والعلاج. أسلوبها راقٍ وتعاملها لطيف جدًا ويمنح المريضة راحة وثقة. تشرح الحالة بشكل واضح وتهتم بكل التفاصيل، وهذا يدل على حرصها وإخلاصها في عملها. بصراحة، من أفضل الطبيبات اللاتي تعاملت معهن، وأنصح بها بشدة.",
      date: "2026-05-10",
      rating: 5,
    },
    {
      name: "جوجو الكعبي",
      review:
        "دكتورة يارا من أروع طبيبات التجميل، دقيقة في عملها وذوقها راقٍ جدًا. تهتم بأدق التفاصيل وتحرص على راحة المراجع. كانت تجربة أكثر من ممتازة، وأنصح الجميع بزيارتها. أسلوبها راقٍ وتعاملها لا يُعلى عليه. شكرًا دكتورة يارا، وإن شاء الله لي زيارات جديدة قادمة ❤️",
      date: "2026-04-02",
      rating: 5,
    },
    {
      name: "Sultan Harib",
      review:
        "أخذت باكيج جلسات عند الدكتورة يارا لعلاج الشعر، وما شاء الله خفّ تساقط الشعر وزادت كثافته، وسعر الجلسات مناسب.",
      date: "2026-01-20",
      rating: 5,
    },
    {
      name: "Ahmed Habib",
      review:
        "تجربتي عند دكتورة الأسنان كانت ممتازة بكل التفاصيل. تعاملها مع الأسنان احترافي ودقيق، وتشرح كل خطوة بطريقة تريح المريض. المكان نظيف جدًا ومرتب ويعطي انطباعًا بالثقة من أول ما تدخل. الموظفون محترمون، وتعاملهم لطيف وسريع، ويسهّلون جميع الإجراءات. بصراحة كانت تجربة رائعة وأنصح بها بكل تأكيد.",
      date: "2025-11-15",
      rating: 5,
    },
    {
      name: "Ahed Saif",
      review:
        "ماشالله المركز بقمه النظافه والي في السربشين اسمها لانا جدا ممتاذه في التعامل والاستقبال والهنديه تبع الليزر اسمها اشنا ماشالله بنصح التجربه",
      date: "2026-08-10",
      rating: 5,
    },
    {
      name: "Waqar Ahmad",
      review: "Good.",
      date: "2025-01-18",
      rating: 4,
    },
    {
      name: 'MOHAMMAD "mmsir"',
      review: "It's ok 👍",
      date: "2024-06-10",
      rating: 3,
    },
  ],
  appointmentCta: {
    label: "View More on Google Reviews",
    href: "https://www.google.com/maps/place/BAGHDAD+MEDICAL+CENTRE/@24.9146055,55.7731613,17z/data=!4m14!1m5!8m4!1e1!2s108076981700144378409!3m1!1e1!3m7!1s0x3ef573f609a9bbf7:0x9ebb7b0be900046e!8m2!3d24.9146055!4d55.7757416!9m1!1b1!16s%2Fg%2F11clvpfq2k?hl=en-GB&entry=ttu",
  },
};

export const insuranceContent: InsuranceContent = {
  eyebrow: "Insurance",
  title: "Accepted Insurance Providers",
  description:
    "We work with a range of trusted health insurance providers to help make your healthcare experience as convenient as possible.",
  logos: [
    { src: "/baghdad/insurance/al-madallah.svg", alt: "Al Madallah" },
    { src: "/baghdad/insurance/lifeline.png", alt: "Lifeline" },
    { src: "/baghdad/insurance/fmc.svg", alt: "FMC" },
    { src: "/baghdad/insurance/enaya.svg", alt: "Enaya" },
    { src: "/baghdad/insurance/neuron.svg", alt: "Neuron" },
    { src: "/baghdad/insurance/nextcare.svg", alt: "NextCare" },
    { src: "/baghdad/insurance/al-buhaira.svg", alt: "Al Buhaira" },
  ],
};

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