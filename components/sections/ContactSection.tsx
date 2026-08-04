import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/siteConfig";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-brand-card py-20 text-brand-cream sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
            Start with a conversation
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Request a Free Quote
          </h2>
          <p className="mt-6 text-lg leading-8 text-brand-muted">
            Tell Fox Run Forestry what is overgrown, where the property is
            located, and what you want to accomplish. Call today for a free
            quote, or text or email to schedule a site visit.
          </p>

          <div className="mt-10 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">Primary phone</p>
              <a className="mt-2 block font-display text-2xl font-semibold hover:text-brand-orange" href={`tel:${siteConfig.contact.primaryPhoneHref}`}>
                {siteConfig.contact.primaryPhone}
              </a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">Email</p>
              <a className="mt-2 block break-all text-lg font-semibold hover:text-brand-orange" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </div>
          </div>

          <p className="mt-10 border-t border-brand-olive/30 pt-6 text-sm leading-7 text-brand-muted">
            Always open to discussing new work. Site visits and projects are
            scheduled flexibly based on location, conditions, and availability.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              Check Us Out on Facebook
            </Button>
            <Button
              href={siteConfig.social.googleBusiness}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Leave Us a Google Review
            </Button>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
