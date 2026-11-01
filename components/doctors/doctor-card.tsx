import { Link } from "@/i18n/navigation";
import { BidiText } from "@/components/ui/bidi-text";
import Image from "next/image";
import type { DoctorSummary } from "@/lib/content/doctors";
import { Heading, Text } from "@/components/ui/typography";

export function DoctorCard({ doctor, headingLevel, founderLabel, priority = false }: {
  doctor: DoctorSummary;
  headingLevel: "h2" | "h3";
  founderLabel: string;
  priority?: boolean;
}) {
  const pink = doctor.accent === "pink";

  return (
    <article aria-labelledby={`${doctor.id}-title`} className={`group flex h-full flex-col overflow-hidden rounded-section border border-border bg-background shadow-sm motion-safe:transition-shadow motion-safe:duration-300 ${pink ? "hover:border-pink-300 hover:shadow-[0_8px_30px_rgba(236,72,153,0.12)]" : "hover:border-primary/30 hover:shadow-lg"}`}>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        <Image
          src={doctor.image}
          alt={doctor.imageAlt}
          fill
          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          quality={90}
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          loading={priority ? undefined : "lazy"}
          className="object-cover object-center motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.02]"
        />
        {doctor.isFounder && (
          <span className="absolute start-3 top-3 rounded-full border border-border/80 bg-background/85 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur-md">
            {founderLabel}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 text-start sm:p-6">
        <Heading level="h5" as={headingLevel} id={`${doctor.id}-title`} className={pink ? "group-hover:text-pink-600" : "group-hover:text-primary"}>
          {doctor.profileSlug ? (
            <Link href={{ pathname: "/doctors/[slug]", params: { slug: doctor.profileSlug } }} className="rounded-sm underline decoration-blue-200 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-4">
              <BidiText>{doctor.name}</BidiText>
            </Link>
          ) : doctor.name}
        </Heading>
        <Text variant="small" className={`mt-1 font-medium ${pink ? "text-pink-600" : "text-primary"}`}>
          {doctor.specialty}
        </Text>
        <Text variant="small" className="mt-3 flex-1 leading-relaxed text-muted-foreground">
          {doctor.description}
        </Text>
      </div>
    </article>
  );
}
