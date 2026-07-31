import { siteConfig } from "@/config/siteConfig";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-dark text-brand-cream">
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute -right-24 -top-20 size-[34rem] rounded-full border border-brand-orange/30" />
        <div className="absolute -right-10 top-12 size-[28rem] rounded-full border border-brand-olive/40" />
        <div className="absolute bottom-0 left-1/2 h-48 w-px rotate-[35deg] bg-brand-olive/30" />
      </div>
      <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-24">
        <div className="max-w-4xl">
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

        <div className="relative hidden min-h-[520px] lg:block" aria-hidden="true">
          <div className="absolute inset-x-10 bottom-0 top-14 rounded-t-[12rem] border border-brand-olive/40 bg-gradient-to-b from-brand-olive/70 to-brand-card shadow-2xl">
            <div className="absolute inset-x-0 bottom-0 h-2/3 overflow-hidden rounded-t-[8rem]">
              <span className="absolute bottom-0 left-[18%] h-[88%] w-3 rounded-t-full bg-brand-orange" />
              <span className="absolute bottom-0 left-[50%] h-full w-4 rounded-t-full bg-brand-orange" />
              <span className="absolute bottom-0 right-[18%] h-[78%] w-3 rounded-t-full bg-brand-orange" />
              <span className="absolute left-[8%] top-[8%] size-40 rounded-full bg-brand-olive" />
              <span className="absolute left-[34%] top-0 size-48 rounded-full bg-brand-olive" />
              <span className="absolute right-[4%] top-[14%] size-36 rounded-full bg-brand-olive" />
            </div>
          </div>
          <div className="absolute bottom-8 left-0 max-w-xs rounded-2xl border border-brand-olive/40 bg-brand-card p-5 text-brand-cream shadow-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">Property potential</p>
            <p className="mt-2 font-display text-xl font-semibold">Clear the overgrowth. Keep the ground working for you.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
