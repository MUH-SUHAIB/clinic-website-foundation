import type { DoctorSummary } from "@/lib/content/doctors";
import { DoctorCard } from "./doctor-card";

export function DoctorGrid({ doctors, founderLabel, headingLevel = "h3", prioritizeFirstImage = false }: {
  doctors: readonly DoctorSummary[];
  founderLabel: string;
  headingLevel?: "h2" | "h3";
  prioritizeFirstImage?: boolean;
}) {
  return (
    <ul role="list" className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {doctors.map((doctor, index) => (
        <li key={doctor.id}>
          <DoctorCard doctor={doctor} headingLevel={headingLevel} founderLabel={founderLabel} priority={prioritizeFirstImage && index === 0} />
        </li>
      ))}
    </ul>
  );
}
