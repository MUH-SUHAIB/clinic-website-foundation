import type { Metadata } from "next";

import {
  Hero,
  About,
  Services,
  Doctors,
  Facilities,
  Testimonials,
  Insurance,
  FAQ,
  Contact,
  Footer,
} from "@/components/sections";

import {
  servicesContent,
  doctorsContent,
  facilitiesContent,
  testimonialsContent,
  insuranceContent,
  faqContent,
  contactContent,
  footerContent,
} from "@/lib/mock-data/homepage";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return {
    title: {
      absolute: isArabic
        ? "مركز بغداد الطبي ـ المدام"
        : "Baghdad Medical Center - Al Madam",
    },
    description: isArabic
      ? "تشخيصات حديثة، استشارات هادئة، وأطباء خبراء في الشارقة. احجز موعدك مع مركز بغداد الطبي اليوم."
      : "Modern diagnostics, calm consultations, and expert doctors in Sharjah. Book your appointment with Baghdad Medical Center today.",
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <main className="min-h-screen pt-20">
      {/* 
        Fully localized sections pulling from messages/ar.json and en.json 
      */}
      <Hero animate />
      <About animate />

      {/* 
        Sections still using mock data (we will update these next) 
      */}
      <Services
        {...servicesContent}
        id="services"
        animate
      />

      <Doctors
        {...doctorsContent}
        id="doctors"
        animate
      />

      <Facilities
        {...facilitiesContent}
        id="facilities"
        animate
      />

      <Testimonials
        {...testimonialsContent}
        id="testimonials"
        animate
      />

      <Insurance
        {...insuranceContent}
        id="insurance"
        animate
      />

      <FAQ
        {...faqContent}
        id="faq"
        animate
      />

      <Contact
        {...contactContent}
        id="contact"
        animate
      />

      <Footer {...footerContent} />
    </main>
  );
}