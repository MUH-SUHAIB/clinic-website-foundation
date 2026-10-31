"use client";

import { useEffect, useState } from "react";
import { isClinicOpen } from "@/lib/clinic";

export function ClinicStatus({ openLabel, closedLabel, note }: {
  openLabel: string;
  closedLabel: string;
  note: string;
}) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const update = () => {
      clearTimeout(timer);
      setOpen(isClinicOpen(new Date()));
      timer = setTimeout(update, 60000 - Date.now() % 60000);
    };
    const onVisibility = () => { if (!document.hidden) update(); };
    update();
    document.addEventListener("visibilitychange", onVisibility);
    return () => { clearTimeout(timer); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  if (open === null) return null;

  return (
    <span role="status" title={note} className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold ${open ? "border-emerald-400 bg-emerald-50/90 text-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.2)] dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-400" : "border-rose-400 bg-rose-50/90 text-rose-700 shadow-[0_0_15px_rgba(244,63,94,0.15)] dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-400"}`}>
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${open ? "bg-emerald-500" : "bg-rose-500"}`} />
      {open ? openLabel : closedLabel}
    </span>
  );
}
