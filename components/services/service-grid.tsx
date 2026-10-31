import type { ServiceSummary } from "@/lib/content/services";
import { ServiceCard } from "./service-card";

export function ServiceGrid({
  services,
  headingLevel = "h3",
}: {
  services: readonly ServiceSummary[];
  headingLevel?: "h2" | "h3";
}) {
  return (
    <ul role="list" className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {services.map((service) => (
        <li key={service.id}>
          <ServiceCard service={service} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
