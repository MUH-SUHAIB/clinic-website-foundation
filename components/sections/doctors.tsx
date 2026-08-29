"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "./section-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { staggerContainer, slideUp } from "@/lib/motion";

interface DoctorMeta {
  id: string;
  image: string;
  gender: "male" | "female";
  hasBadge?: boolean;
}

const doctorList: DoctorMeta[] = [
  {
    id: "safaa",
    image: "/baghdad/doctors/Safa.png",
    gender: "male",
    hasBadge: true,
  },
  {
    id: "jawad",
    image: "/baghdad/doctors/Jawad khan.jpg",
    gender: "male",
  },
  {
    id: "abdullah",
    image: "/baghdad/doctors/Abdullah.png",
    gender: "male",
  },
  {
    id: "bassam",
    image: "/baghdad/doctors/bassam.png",
    gender: "male",
  },
  {
    id: "rana",
    image: "/baghdad/doctors/dentistry-room.png",
    gender: "female",
  },
  {
    id: "rishika",
    image: "/baghdad/doctors/dentistry-room.png",
    gender: "female",
  },
];

export function Doctors({ animate = true }: { animate?: boolean }) {
  const t = useTranslations("Doctors");
  const Container = animate ? motion.div : "div";

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-background),var(--color-secondary)_50%,var(--color-background)_100%)]" />
      </div>

      <Section id="doctors" className="py-xl md:py-2xl">
        <Container
          {...(animate
            ? {
                variants: staggerContainer,
                initial: "hidden",
                whileInView: "visible",
                viewport: { once: true, margin: "-50px" },
              }
            : {})}
          className="flex flex-col items-center w-full"
        >
          {/* Animated Header Block */}
          <motion.div
            {...(animate ? { variants: slideUp } : {})}
            className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 md:mb-14 gap-3"
          >
            <Heading level="h6">{t("eyebrow")}</Heading>
            <Heading level="h2" className="text-foreground">
              {t("title")}
            </Heading>
            <Text variant="body" className="text-muted-foreground text-balance">
              {t("description")}
            </Text>
          </motion.div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {doctorList.map((doctor) => {
              const isFemale = doctor.gender === "female";
              const name = t(`items.${doctor.id}.name`);
              const specialization = t(`items.${doctor.id}.specialization`);
              const description = t(`items.${doctor.id}.description`);

              return (
                <motion.div
                  key={doctor.id}
                  {...(animate ? { variants: slideUp } : {})}
                  className="h-full"
                >
                  <Card
                    interactive
                    className={`group relative flex h-full flex-col overflow-hidden rounded-section border border-border bg-background transition-all duration-300 ${
                      isFemale
                        ? "hover:border-pink-300 hover:shadow-[0_8px_30px_rgba(236,72,153,0.12)]"
                        : "hover:border-primary/30 hover:shadow-lg"
                    }`}
                  >
                    {/* Image Slot Container */}
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted">
                      <img
                        src={doctor.image}
                        alt={name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />

                      {/* Glassmorphic Badge */}
                      {doctor.hasBadge && (
                        <span className="absolute start-3 top-3 rounded-full border border-border/80 bg-background/85 backdrop-blur-md px-3 py-1 text-xs font-semibold text-foreground shadow-sm z-10">
                          {t("founderBadge")}
                        </span>
                      )}
                    </div>

                    {/* Content Block */}
                    <CardContent className="flex flex-1 flex-col p-5 sm:p-6 text-start">
                      <Heading
                        level="h5"
                        as="h3"
                        className={`text-foreground transition-colors duration-200 ${
                          isFemale ? "group-hover:text-pink-600" : "group-hover:text-primary"
                        }`}
                      >
                        {name}
                      </Heading>

                      <Text
                        variant="small"
                        className={`mt-1 font-medium ${
                          isFemale ? "text-pink-600" : "text-primary"
                        }`}
                      >
                        {specialization}
                      </Text>

                      <Text variant="small" className="mt-3 text-muted-foreground leading-relaxed flex-1">
                        {description}
                      </Text>
                    </CardContent>
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