import { pageAlternates } from "@/lib/seo/eligible-pages";
import type { Metadata } from "next";
import { siteSeo } from "@/lib/site-seo";
import { getDoctorSummaries } from "@/lib/content/doctors";
import { getServiceSummaries } from "@/lib/content/services";

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
  footerContent,
} from "@/lib/mock-data/homepage";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return {
    // Official-domain canonicals only belong to the approved launch.
    alternates: pageAlternates(locale === "ar" ? "ar" : "en"),
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
  const services = getServiceSummaries(locale === "ar" ? "ar" : "en", {
    includeWorkingContent: !siteSeo.indexingEnabled,
  });
  const doctors = getDoctorSummaries(locale === "ar" ? "ar" : "en", {
    includeWorkingContent: !siteSeo.indexingEnabled,
    featuredOnly: true,
  });

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-20">
      {/* 
        Fully localized sections pulling from messages/ar.json and en.json 
      */}
      <Hero animate />
      <About />
      <Services services={services} animate />
      <Doctors doctors={doctors} />
      <Facilities animate />
      <Testimonials animate />
      <Insurance animate />
      <FAQ animate />
      <Contact />
      <Footer {...footerContent} />
    </main>
  );
}
