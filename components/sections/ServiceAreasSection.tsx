import { siteConfig } from "@/config/siteConfig";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function ServiceAreasSection() {
  return (
    <Section
      id="areas-served"
      eyebrow="Local coverage"
      title="Serving Newport, Carteret & Craven Counties"
      intro="Based in the Newport area, Fox Run Forestry works with homeowners and landowners across Carteret County, Craven County, and select nearby Eastern North Carolina communities."
      tone="sand"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {siteConfig.serviceAreas.map((area) => (
          <article key={area.name} className="rounded-3xl border border-brand-olive/30 bg-brand-dark p-7 sm:p-8">
            <h3 className="font-display text-2xl font-semibold">{area.name}</h3>
            <p className="mt-4 leading-7 text-brand-muted">{area.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 grid gap-8 rounded-3xl border border-brand-olive/30 bg-brand-dark p-7 text-brand-cream sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="max-w-3xl">
          <h3 className="font-display text-2xl font-semibold sm:text-3xl">
            Not sure if your property is within the service area?
          </h3>
          <p className="mt-4 leading-7 text-brand-muted">
            Call, text, or email with the property location and a short
            description of the work. Flexible scheduling is available, and Fox
            Run Forestry can let you know whether a site visit makes sense.
          </p>
        </div>
        <Button href={`tel:${siteConfig.contact.primaryPhoneHref}`}>
          Check Your Location
        </Button>
      </div>
    </Section>
  );
}
