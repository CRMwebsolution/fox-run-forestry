import { siteConfig } from "@/config/siteConfig";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-dark text-brand-cream">
      <div className="absolute inset-0">
        <img
          src={siteConfig.brandAssets.hero}
          alt="Fox Run Forestry LLC forestry mulching equipment serving Carteret and Craven County NC"
          className="size-full object-cover object-[68%_center]"
        />
        <div className="absolute inset-0 bg-brand-dark/55" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/35" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-brand-dark to-transparent" aria-hidden="true" />
      </div>
      <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="max-w-3xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-olive/40 bg-brand-card px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">
            <span className="size-2 rounded-full bg-brand-orange" />
            Newport, North Carolina
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Fox Run Forestry LLC
            <span className="mt-3 block text-brand-cream">
              Forestry Mulching &amp; Brush Control in Carteret County NC
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-muted sm:text-xl">
            {siteConfig.tagline} Reclaim overgrown ground, improve access, and
            get more use from your property with a low-impact clearing process.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact">Request a Free Quote</Button>
            <Button href={`tel:${siteConfig.contact.primaryPhoneHref}`} variant="light">
              Call {siteConfig.contact.primaryPhone}
            </Button>
          </div>
          <div className="mt-12 grid max-w-2xl grid-cols-2 gap-6 border-t border-brand-olive/30 pt-7 sm:grid-cols-3">
            <div>
              <p className="font-display text-2xl font-semibold text-brand-orange">Low impact</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-brand-muted">Less soil disturbance</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-brand-orange">Local service</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-brand-muted">Carteret &amp; Craven</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-display text-2xl font-semibold text-brand-orange">Flexible</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-brand-muted">Site visits by schedule</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
