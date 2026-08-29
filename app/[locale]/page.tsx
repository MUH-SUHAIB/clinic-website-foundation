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
      <Services animate />
      <Doctors animate />
      <Facilities animate />
      <Testimonials animate />
      <Insurance animate />
      <FAQ animate />
      <Contact {...contactContent} animate />
      <Footer {...footerContent} />
    </main>
  );
}