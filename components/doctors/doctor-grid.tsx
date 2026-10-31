import type { DoctorSummary } from "@/lib/content/doctors";
import { DoctorCard } from "./doctor-card";

export function DoctorGrid({ doctors, founderLabel, headingLevel = "h3" }: {
  doctors: readonly DoctorSummary[];
  founderLabel: string;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <ul role="list" className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {doctors.map((doctor) => (
        <li key={doctor.id}>
          <DoctorCard doctor={doctor} headingLevel={headingLevel} founderLabel={founderLabel} />
        </li>
      ))}
    </ul>
  );
}
