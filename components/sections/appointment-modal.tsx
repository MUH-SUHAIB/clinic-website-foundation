"use client";

import { clinicContact } from "@/lib/clinic-contact";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MessageCircle, Phone } from "lucide-react";
import { Heading, Text } from "@/components/ui/typography";
import { duration, easing } from "@/lib/motion";

export interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Appointment booking modal triggered by the Hero's primary CTA. Offers two
 * prominent contact actions (WhatsApp, Call) rather than committing the
 * visitor to one channel immediately.
 *
 * ACCESSIBILITY
 * - `role="dialog"` + `aria-modal="true"` + `aria-labelledby` pointing at
 *   the heading.
 * - Escape key closes the modal; clicking the backdrop closes it; a
 *   labeled close button is always present.
 * - Close button receives focus when the modal opens.
 *
 * RTL
 * - Close button uses `end-4` (logical), not `right-4` — sits correctly
 *   in both LTR and RTL. All text uses `text-center`, direction-agnostic.
 */
export function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const t = useTranslations("Appointment");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.fast, ease: easing }}
        >
          {/* Backdrop — clicking it closes the modal */}
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" aria-hidden onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="appointment-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: duration.base, ease: easing }}
            className="relative z-10 w-full max-w-md rounded-section border border-border bg-background p-xl text-center shadow-elevated"
          >
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label={t("close")}
              className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-fast hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X size={20} aria-hidden />
            </button>

            <Heading level="h3" id="appointment-modal-title">
              {t("title")}
            </Heading>
            <Text variant="body" className="mt-2">
              {t("description")}
            </Text>

            <div className="mt-xl flex flex-col gap-4">
              <a
                href={clinicContact.whatsappHref}
                className="flex items-center gap-4 rounded-card border border-border bg-background p-md text-start shadow-subtle transition-shadow duration-fast hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-primary" aria-hidden>
                  <MessageCircle size={24} />
                </span>
                <span className="flex flex-col">
                  <Text variant="body" className="font-semibold">
                    {t("whatsapp")}
                  </Text>
                  <Text variant="small">{t("whatsappDescription")}</Text>
                </span>
              </a>

              <a
                href={clinicContact.mobileHref}
                className="flex items-center gap-4 rounded-card border border-border bg-background p-md text-start shadow-subtle transition-shadow duration-fast hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-primary" aria-hidden>
                  <Phone size={24} />
                </span>
                <span className="flex flex-col">
                  <Text variant="body" className="font-semibold">
                    {t("phone")}
                  </Text>
                  <Text variant="small">{t("phoneDescription")}</Text>
                </span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
