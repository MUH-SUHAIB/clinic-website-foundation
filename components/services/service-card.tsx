import Image from "next/image";
import type { ServiceSummary } from "@/lib/content/services";
import { Heading, Text } from "@/components/ui/typography";

interface ServiceCardProps {
  service: ServiceSummary;
  headingLevel: "h2" | "h3";
}

export function ServiceCard({ service, headingLevel }: ServiceCardProps) {
  return (
    <article
      aria-labelledby={`${service.id}-title`}
      className="flex h-full flex-col overflow-hidden rounded-card border border-blue-100 bg-white shadow-sm motion-safe:transition motion-safe:duration-300 motion-safe:hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1280px) 390px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          quality={90}
          unoptimized={service.image.endsWith(".avif")}
          loading="lazy"
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 text-start">
        <Heading level="h4" as={headingLevel} id={`${service.id}-title`} className="mb-3 text-blue-700 dark:text-blue-400">
          {service.title}
        </Heading>
        <Text variant="small" className="text-slate-600 dark:text-slate-300">
          {service.description}
        </Text>
      </div>
    </article>
  );
}
