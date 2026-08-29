"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { staggerContainer, slideUp } from "@/lib/motion";

// Static mapping to preserve precise image paths
const facilityList = [
  { id: "reception", image: "/baghdad/facilities/Receptionist.png" },
  { id: "waitingRoom", image: "/baghdad/facilities/waiting-room.jpg" },
  { id: "dental", image: "/baghdad/facilities/dentist-waiting-room.png" },
  { id: "laser", image: "/baghdad/facilities/GENTLEMAX-PRO-laser.png" },
  { id: "iv", image: "/baghdad/facilities/iv-therapy.png" },
  { id: "pediatric", image: "/baghdad/facilities/children-waiting-area.png" },
  { id: "lounge", image: "/baghdad/facilities/department-lounge.png" },
  { id: "comfort", image: "/baghdad/facilities/relaxing-area.png" },
];

export function Facilities({ animate = true }: { animate?: boolean }) {
  const t = useTranslations("Facilities");
  const Container = animate ? motion.div : "div";

  // Creates a balanced 8-item Editorial Bento Grid
  const getBentoClasses = (index: number) => {
    switch (index) {
      case 0:
        // Main Reception Hero: Spans 2x2 on desktop
        return "col-span-2 row-span-2 md:col-start-3 md:row-start-1";
      case 7:
        // Bottom Banner (Patient Comfort Area): Spans 2 cols on bottom right
        return "col-span-2 md:col-span-2 md:col-start-3 md:row-start-3";
      default:
        // Standard 1x1 cards
        return "col-span-1 row-span-1";
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-background),rgba(239,246,255,0.5)_40%,rgba(255,241,242,0.7)_100%)] dark:bg-[linear-gradient(to_bottom,var(--color-background),rgba(29,78,216,0.03)_40%,rgba(225,29,72,0.03)_100%)]" />
      </div>

      <Section id="facilities" className="py-xl md:py-2xl">
        <Container
          {...(animate
            ? {
                variants: staggerContainer,
                initial: "hidden",
                whileInView: "visible",
                viewport: { once: true, margin: "-50px" },
              }
            : {})}
          className="flex flex-col items-center w-full max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div
            {...(animate ? { variants: slideUp } : {})}
            className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 md:mb-16 gap-3"
          >
            <Heading level="h6">{t("eyebrow")}</Heading>
            <Heading level="h2" className="text-foreground">
              {t("title")}
            </Heading>
            <Text variant="body" className="text-muted-foreground text-balance">
              {t("description")}
            </Text>
          </motion.div>

          {/* Fully Responsive Bento Grid */}
          <div className="grid w-full grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[250px]">
            {facilityList.map((facility, i) => {
              const label = t(`items.${facility.id}.label`);

              return (
                <motion.div
                  key={facility.id}
                  {...(animate ? { variants: slideUp } : {})}
                  className={`h-full w-full ${getBentoClasses(i)}`}
                >
                  <Card className="group relative h-full w-full overflow-hidden border-border/30 rounded-section shadow-sm transition-shadow duration-500 hover:shadow-elevated cursor-pointer">
                    {/* Edge-to-Edge Image */}
                    <img
                      src={facility.image}
                      alt={label}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />

                    {/* Dark Overlay Gradient for High Contrast Text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Label & Accent Line */}
                    <div className="absolute bottom-0 left-0 flex w-full flex-col justify-end p-4 sm:p-5 md:p-6 transform transition-transform duration-500 ease-out group-hover:-translate-y-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white tracking-wide drop-shadow-sm">
                        {label}
                      </h3>
                      
                      {/* Hover Accent Line */}
                      <div className="mt-2 h-[2px] w-6 bg-white/60 transition-all duration-500 ease-out group-hover:w-12 group-hover:bg-white" />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>
    </div>
  );
}