import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/siteConfig";

const reasons = [
  {
    title: "Direct, local communication",
    description:
      "Talk directly with a small local business that understands rural property, coastal growth, and the communities it serves.",
  },
  {
    title: "A practical plan for your land",
    description:
      "The goal is not to clear everything. It is to understand what you need, protect what should stay, and make the property work better.",
  },
  {
    title: "Efficient, low-impact work",
    description:
      "Forestry mulching handles vegetation in place, which can reduce hauling, burn piles, repeated machine passes, and unnecessary ground disturbance.",
  },
];

export function WhyChooseSection() {
  return (
    <Section
      eyebrow="A better working property"
      title="Why Choose Fox Run Forestry"
      intro="Reliable land work starts with clear communication and a realistic plan. Fox Run Forestry brings an owner-operated approach to projects large enough to need serious equipment and personal enough to deserve careful attention."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {reasons.map((reason, index) => (
          <article key={reason.title} className="border-t-2 border-brand-olive pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
              Reason 0{index + 1}
            </p>
            <h3 className="mt-4 font-display text-2xl font-semibold">{reason.title}</h3>
            <p className="mt-4 leading-7 text-brand-muted">{reason.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-16 grid gap-8 border-t border-brand-olive/30 pt-12 text-base leading-8 text-brand-muted lg:grid-cols-2">
        <div>
          <h3 className="font-display text-2xl font-semibold text-brand-cream">
            Built around local relationships
          </h3>
          <p className="mt-4">
            In Carteret and Craven Counties, a good reputation travels through
            neighbors, repeat customers, and community connections. Fox Run
            Forestry values the local events and organizations that bring the
            area together and approaches each job with the same straightforward
            service expected from a company whose name stays attached to the work.
          </p>
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold text-brand-cream">
            Flexible scheduling, honest expectations
          </h3>
          <p className="mt-4">
            The business is always open to discussing a new project and offers
            flexible scheduling for site visits and planned work. Timing depends
            on acreage, vegetation density, access, ground conditions, and the
            finished result you want.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center sm:mt-12">
        <Button
          href={siteConfig.social.googleBusiness}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          className="w-full sm:w-auto"
        >
          Read the Reviews or Leave Us One
        </Button>
      </div>
    </Section>
  );
}
