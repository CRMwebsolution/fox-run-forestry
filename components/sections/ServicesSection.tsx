import { siteConfig } from "@/config/siteConfig";
import { Section } from "@/components/ui/Section";

export function ServicesSection() {
  return (
    <Section
      id="services"
      eyebrow="What we do"
      title="Forestry Mulching & Brush Clearing Services"
      intro="From a grown-up residential lot to a long-neglected trail, Fox Run Forestry provides practical brush control and land management solutions for coastal North Carolina properties."
    >
      <div className="mb-14 grid gap-8 text-base leading-8 text-brand-muted lg:grid-cols-2">
        <div>
          <h3 className="font-display text-2xl font-semibold text-brand-cream">
            A cleaner way to reclaim overgrown land
          </h3>
          <p className="mt-4">
            Forestry mulching cuts and processes unwanted vegetation where it
            stands. Instead of pushing material into piles, hauling it away, or
            heavily disturbing the soil, the machine leaves a layer of
            biodegradable mulch across the cleared area.
          </p>
          <p className="mt-4">
            That mulch can help protect exposed ground, return organic material
            to the soil, and leave a more finished surface after the work is
            complete. It is an efficient option for many Newport and Carteret
            County properties where traditional clearing would create more
            disruption than the job requires.
          </p>
        </div>
        <div className="rounded-3xl border border-brand-olive/30 bg-brand-card p-7 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">
            Common projects
          </p>
          <p className="mt-4 text-brand-cream">
            Brush removal, pasture reclamation, hunting property access roads,
            fence lines, utility easements, residential lots, trails, driveway
            edges, and storm-damaged overgrowth.
          </p>
          <p className="mt-4">
            Every property is different. A site visit helps determine the best
            approach, what equipment access is available, and how to meet your
            goals without clearing more than necessary.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {siteConfig.services.map((service, index) => (
          <article
            key={service.slug}
            className="group rounded-3xl border border-brand-olive/30 bg-brand-card p-7 transition hover:-translate-y-1 hover:border-brand-orange/60 hover:shadow-xl sm:p-9"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-xs font-bold tracking-[0.18em] text-brand-orange">
                0{index + 1}
              </span>
              <span className="grid size-10 place-items-center rounded-full bg-brand-dark text-brand-cream transition group-hover:bg-brand-orange" aria-hidden="true">
                ↗
              </span>
            </div>
            <h3 className="mt-8 font-display text-2xl font-semibold">
              {service.title}
            </h3>
            <p className="mt-4 leading-7 text-brand-muted">
              {service.shortDescription}
            </p>
            <ul className="mt-6 space-y-3">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-3 text-sm font-semibold text-brand-cream">
                  <span className="text-brand-orange" aria-hidden="true">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-brand-olive/30 pt-5 text-sm leading-6 text-brand-muted">
              {service.idealClients}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
