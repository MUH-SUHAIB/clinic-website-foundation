import Image from "next/image";

import { Quote, Target, Eye } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";

import { Heading, Text } from "@/components/ui/typography";

import { cn } from "@/lib/utils";

/** Existing demo copy is shared across both pages; clinic verification is still required. */
export async function About({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const t = await getTranslations("About");
  const locale = await getLocale();
  const isAr = locale === "ar";

  return (
    <section className="relative overflow-hidden" id="about" aria-labelledby="about-title">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-background),var(--color-secondary)_50%,var(--color-background)_100%)]" />
      </div>

      <div className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-md md:px-lg">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center lg:gap-20">
            <div className="order-2 flex w-full md:order-1">
              <div
                className={cn(
                  "group flex w-full flex-col overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm transition-shadow duration-300 ease-in-out dark:bg-slate-900 dark:border-slate-800",
                  "drop-shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:drop-shadow-[0_0_25px_rgba(0,0,0,0.1)]"
                )}
              >
                <div className="relative min-h-[360px] sm:min-h-[400px] md:min-h-[460px] lg:min-h-[480px] flex-1 w-full overflow-hidden">
                  <Image
                    src="/baghdad/about-founder-doctor.webp"
                    alt={`${t("author")} - ${t("role")}`}
                    fill
                    sizes="(min-width: 1280px) 584px, (min-width: 768px) 50vw, 100vw"
                    quality={90}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </div>
                <div className="border-t border-blue-50 bg-blue-50/50 p-4 sm:p-5 text-start dark:border-slate-800 dark:bg-slate-800/50 shrink-0">
                  <Quote size={20} className="text-blue-600 opacity-60 mb-2" aria-hidden="true" />

                  <Text
                    variant="body"
                    as="blockquote"
                    className={cn(
                      "italic font-medium text-slate-700 dark:text-slate-300",
                      isAr ? "text-lg sm:text-xl leading-relaxed" : "text-base sm:text-lg leading-relaxed"
                    )}
                  >
                    “{t("quote")}”
                  </Text>

                  <div className="mt-4 flex flex-wrap items-baseline gap-2">
                    <Text variant="small" className={cn("font-bold text-slate-900 dark:text-white", isAr && "text-base")}>
                      {t("author")}
                    </Text>
                    <span className="text-slate-300 dark:text-slate-700 text-xs hidden sm:inline-block">•</span>
                    <Text variant="caption" className={cn("text-blue-600 dark:text-blue-400 font-medium", isAr && "text-sm")}>
                      {t("role")}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="order-1 flex flex-col items-start gap-8 text-start md:order-2"
            >
              <div className="flex flex-col gap-2">
                <p className={cn("text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider", isAr ? "text-xl" : "text-sm")}>
                  {t("eyebrow")}
                </p>
                <Heading level="h2" as={headingLevel} id="about-title" className={cn("text-slate-900 dark:text-white", isAr && "leading-tight")}>
                  {t("title")}
                </Heading>
              </div>

              <div className="flex flex-col gap-4">
                <Text
                  variant="body"
                  className={cn(
                    "text-slate-600 dark:text-slate-300",
                    isAr ? "text-lg sm:text-xl leading-loose font-medium" : "sm:text-lg leading-relaxed"
                  )}
                >
                  {t("paragraph1")}
                </Text>
              </div>
              <div className="w-full grid grid-cols-1 gap-5 mt-2">
                <div className="rounded-card border border-border overflow-hidden hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none flex items-start gap-4 sm:gap-5 p-4 sm:p-5 border-blue-100 bg-white/60 shadow-sm hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900/60">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-50 text-blue-600 shrink-0 dark:bg-blue-900/30 dark:text-blue-400 mt-1">
                    <Target aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1">
                    <Heading level="h5" as={headingLevel === "h1" ? "h2" : "h3"} className={cn("text-blue-700 dark:text-blue-400", isAr ? "text-xl font-bold" : "text-lg")}>
                      {t("missionTitle")}
                    </Heading>
                    <Text
                      variant="body"
                      className={cn(
                        "mt-2 text-slate-600 dark:text-slate-300",
                        isAr ? "text-lg leading-relaxed font-medium" : "text-base leading-relaxed"
                      )}
                    >
                      {t("missionDesc")}
                    </Text>
                  </div>
                </div>
                <div className="rounded-card border border-border overflow-hidden hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none flex items-start gap-4 sm:gap-5 p-4 sm:p-5 border-blue-100 bg-white/60 shadow-sm hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900/60">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-50 text-blue-600 shrink-0 dark:bg-blue-900/30 dark:text-blue-400 mt-1">
                    <Eye aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1">
                    <Heading level="h5" as={headingLevel === "h1" ? "h2" : "h3"} className={cn("text-blue-700 dark:text-blue-400", isAr ? "text-xl font-bold" : "text-lg")}>
                      {t("visionTitle")}
                    </Heading>
                    <Text
                      variant="body"
                      className={cn(
                        "mt-2 text-slate-600 dark:text-slate-300",
                        isAr ? "text-lg leading-relaxed font-medium" : "text-base leading-relaxed"
                      )}
                    >
                      {t("visionDesc")}
                    </Text>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
