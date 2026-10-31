import { getLocale, getTranslations } from "next-intl/server";
import { clinic, clinicTime } from "@/lib/clinic";

export async function ClinicHours() {
  const locale = (await getLocale()) === "ar" ? "ar" : "en";
  const t = await getTranslations("Contact");

  return clinic.hours.map((group) => (
    <div key={group.id} className="flex flex-col items-start gap-2 py-3 first:pt-1 last:pb-0 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <span className="shrink-0 font-medium text-slate-700 dark:text-slate-200">{t(`days.${group.id}`)}</span>
      <span className={`flex max-w-full flex-col items-start text-start sm:flex-row sm:flex-wrap sm:justify-end sm:gap-x-3 sm:text-sm ${locale === "ar" ? "gap-3 font-sans text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-200 sm:gap-y-1 sm:font-mono sm:font-normal sm:leading-5 sm:text-slate-500 sm:dark:text-slate-400" : "gap-1 font-mono text-[13px] leading-loose text-slate-500 dark:text-slate-400 sm:leading-5"}`}>
        {group.ranges.map((range) => {
          const start = clinicTime(range.open, locale);
          const end = clinicTime(range.close, locale);
          return (
            <bdi dir={locale === "ar" ? "rtl" : "ltr"} className="inline-block whitespace-nowrap" key={range.open}>
              {t.rich("timeRange", {
                start: start.value, startPeriod: start.period, end: end.value, endPeriod: end.period,
                timeValue: (chunks) => <bdi dir="ltr" className="inline-block font-mono">{chunks}</bdi>,
              })}
            </bdi>
          );
        })}
      </span>
    </div>
  ));
}
