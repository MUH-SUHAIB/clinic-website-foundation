import { getLocale, getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin, Clock, ExternalLink, Navigation } from "lucide-react";
import { clinic, clinicContact, clinicLocation } from "@/lib/clinic";
import { BidiText } from "@/components/ui/bidi-text";
import { Heading, Text } from "@/components/ui/typography";
import { WhatsAppIcon } from "@/components/contact/whatsapp-icon";
import { ClinicStatus } from "@/components/contact/clinic-status";
import { ClinicHours } from "@/components/contact/clinic-hours";

/** Shared static contact content; only the live regular-hours badge needs JavaScript. */
export async function Contact({ id = "contact", headingLevel = "h2" }: {
  id?: string;
  headingLevel?: "h1" | "h2";
}) {
  const locale = (await getLocale()) === "ar" ? "ar" : "en";
  const t = await getTranslations("Contact");
  const tActions = await getTranslations("ContactActions");
  const phone = clinic.landline.display;
  const mobile = clinic.mobile.display;
  const landlineTel = clinicContact.landlineHref;
  const mobileTel = clinicContact.mobileHref;
  const whatsappUrl = clinicContact.whatsappHref;
  const localizedAddress = clinic.content[locale].address;
  const mapLink = clinicLocation.listingHref;
  const directionsLink = clinicLocation.listingHref;
  const mapEmbedSrc = clinicLocation.embedHref;

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-transparent via-blue-50/40 to-pink-50/40 dark:via-blue-950/20 dark:to-pink-950/20 py-8 sm:py-16">
      <div className="pointer-events-none absolute -top-40 left-0 h-[600px] w-[600px] rounded-full bg-blue-300/15 dark:bg-blue-800/15 blur-[120px] mix-blend-multiply dark:mix-blend-overlay" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-pink-300/15 dark:bg-pink-800/15 blur-[120px] mix-blend-multiply dark:mix-blend-overlay" />

      <section id={id} className="py-2xl md:py-3xl">
        <div className="mx-auto max-w-7xl px-md md:px-lg text-center">
          <div className="mx-auto mb-xl flex max-w-2xl flex-col items-center gap-3">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">{t("eyebrow")}</p>
            <Heading level={headingLevel} className="text-3xl md:text-4xl">{t("title")}</Heading>
            <Text>{t("description")}</Text>
          </div>
          <div
            className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch text-start relative z-10"
          >
            <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8">
              <div>
                <div className="group p-7 rounded-[32px] bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-blue-200/60 dark:border-blue-800/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-500">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="flex h-2 w-2 rounded-full bg-blue-500 opacity-80" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {t("instantConnect")}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div>
                      <a
                        href={landlineTel}
                        aria-label={`${tActions("call")} ${phone}`}
                        className="contact-action contact-action--call !rounded-[20px] px-6 py-3.5"
                      >
                        <Phone size={18} aria-hidden="true" /><bdi dir="ltr" className="font-medium text-[15px]">{phone}</bdi>
                      </a>
                    </div>

                    {mobile && mobileTel && (
                      <div>
                        <a
                          href={mobileTel}
                          aria-label={`${tActions("call")} ${mobile}`}
                          className="contact-action contact-action--call !rounded-[20px] px-6 py-3.5"
                        >
                          <Phone size={18} aria-hidden="true" /><bdi dir="ltr" className="font-medium text-[15px]">{mobile}</bdi>
                        </a>
                      </div>
                    )}

                    <div>
                      <a
                        href={whatsappUrl}
                        aria-label={`${tActions("whatsapp")} ${clinic.whatsapp.display}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-action contact-action--whatsapp !rounded-[20px] px-6 py-3.5"
                      >
                        <WhatsAppIcon /><bdi dir="ltr" className="font-medium text-[15px]">{clinic.whatsapp.display}</bdi>
                      </a>
                    </div>
                  </div>
                  <a href={clinicContact.emailHref} className="mt-5 inline-flex max-w-full items-center gap-2 rounded-lg text-sm text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-4">
                    <Mail size={18} aria-hidden="true" className="shrink-0" /><bdi dir="ltr" className="min-w-0 break-all">{clinic.email}</bdi>
                  </a>
                </div>
              </div>

              <div>
                <div className="group p-7 rounded-[32px] bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-blue-200/60 dark:border-blue-800/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-500">
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30">
                      <MapPin size={24} aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-2 flex-1 pt-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t("location")}</span>
                      {mapLink ? (
                        <a
                          href={mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-start gap-2 rounded-lg text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-4"
                        >
                          <span className="text-[15px] font-medium leading-relaxed"><BidiText>{localizedAddress}</BidiText></span>
                          <Navigation aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-blue-500 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 rtl:-scale-x-100" />
                        </a>
                      ) : (
                        <Text variant="body" className="text-[15px] font-medium leading-relaxed text-foreground">
                          {localizedAddress}
                        </Text>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="group p-7 rounded-[32px] bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-blue-200/60 dark:border-blue-800/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-500">
                  <div className="flex min-w-0 flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30">
                        <Clock size={24} aria-hidden="true" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t("workingHours")}</span>

                        <ClinicStatus openLabel={t("openNow")} closedLabel={t("closedNow")} note={t("regularHoursNote")} />
                      </div>
                    </div>

                    <div className="divide-y divide-blue-100/50 dark:divide-blue-900/30">
                      <ClinicHours />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="lg:col-span-5 flex flex-col h-full min-h-[380px]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[34px] p-[1.5px] bg-gradient-to-br from-blue-300 via-purple-200 to-pink-300 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.25)] transition-all duration-500 group">
                <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-background">
                  {mapEmbedSrc ? (
                    <>
                      <iframe
                        src={mapEmbedSrc.replace(/([?&])hl=[^&]*/, `$1hl=${locale}`)}
                        title={t("mapTitle")}
                        className="h-full w-full min-h-[380px] border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                      {directionsLink && (
                        <div className="absolute bottom-6 inset-x-6 flex justify-center pointer-events-none">
                          <a
                            href={directionsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-4 pointer-events-auto inline-flex items-center gap-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-3 text-sm font-semibold text-foreground shadow-xl shadow-black/5 border border-slate-200/60 dark:border-slate-700/60 hover:text-blue-600 transition-all duration-300"
                          >
                            <span>{t("getDirections")}</span>
                            <ExternalLink aria-hidden="true" size={16} className="text-blue-500" />
                          </a>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex h-full min-h-[320px] w-full items-center justify-center bg-slate-50 dark:bg-slate-900 p-6 text-center">
                      <Heading level="h6" className="text-slate-400">{t("mapUnavailable")}</Heading>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
