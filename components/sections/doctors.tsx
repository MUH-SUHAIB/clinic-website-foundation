import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { DoctorSummary } from "@/lib/content/doctors";
import { DoctorGrid } from "@/components/doctors/doctor-grid";
import { Section } from "./section-shell";
import { Heading, Text } from "@/components/ui/typography";

export async function Doctors({ doctors }: { doctors: readonly DoctorSummary[] }) {
  const t = await getTranslations("Doctors");

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-background),var(--color-secondary)_50%,var(--color-background)_100%)]" />
      </div>
      <Section id="doctors" className="py-xl md:py-2xl">
        <div className="flex w-full flex-col items-center">
          <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center gap-3 text-center md:mb-14">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">{t("eyebrow")}</p>
            <Heading level="h2" className="text-foreground">{t("title")}</Heading>
            <Text className="text-balance text-muted-foreground">{t("description")}</Text>
          </div>
          <DoctorGrid doctors={doctors} founderLabel={t("founderBadge")} />
          <Link href="/doctors" className="mt-12 inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-blue-200 bg-white px-7 py-3 font-semibold text-blue-700 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-4 dark:border-blue-800 dark:bg-slate-900 dark:text-blue-300 dark:hover:bg-blue-950">
            {t("viewAll")}
            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 rtl:rotate-180" />
          </Link>
        </div>
      </Section>
    </div>
  );
}
