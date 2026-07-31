import { siteConfig } from "@/config/siteConfig";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-forest-950 text-white">
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute -right-24 -top-20 size-[34rem] rounded-full border border-lime-300/30" />
        <div className="absolute -right-10 top-12 size-[28rem] rounded-full border border-lime-300/20" />
        <div className="absolute bottom-0 left-1/2 h-48 w-px rotate-[35deg] bg-white/15" />
      </div>
      <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-24">
        <div className="max-w-4xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-lime-300">
            <span className="size-2 rounded-full bg-lime-300" />
            Newport, North Carolina
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Fox Run Forestry LLC
            <span className="mt-3 block text-sand-100">
              Forestry Mulching &amp; Brush Control in Carteret County NC
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-sand-100/80 sm:text-xl">
            {siteConfig.tagline} Reclaim overgrown ground, improve access, and
            get more use from your property with a low-impact clearing process.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact">Request a Free Quote</Button>
            <Button href={`tel:${siteConfig.contact.primaryPhoneHref}`} variant="light">
              Call {siteConfig.contact.primaryPhone}
            </Button>
          </div>
          <div className="mt-12 grid max-w-2xl grid-cols-2 gap-6 border-t border-white/15 pt-7 sm:grid-cols-3">
            <div>
              <p className="font-display text-2xl font-semibold text-lime-300">Low impact</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-sand-100/60">Less soil disturbance</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-lime-300">Local service</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-sand-100/60">Carteret &amp; Craven</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-display text-2xl font-semibold text-lime-300">Flexible</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-sand-100/60">Site visits by schedule</p>
            </div>
          </div>
        </div>

        <div className="relative hidden min-h-[520px] lg:block" aria-hidden="true">
          <div className="absolute inset-x-10 bottom-0 top-14 rounded-t-[12rem] border border-white/15 bg-gradient-to-b from-moss-700/70 to-forest-900 shadow-2xl">
            <div className="absolute inset-x-0 bottom-0 h-2/3 overflow-hidden rounded-t-[8rem]">
              <span className="absolute bottom-0 left-[18%] h-[88%] w-3 rounded-t-full bg-bark-500" />
              <span className="absolute bottom-0 left-[50%] h-full w-4 rounded-t-full bg-bark-500" />
              <span className="absolute bottom-0 right-[18%] h-[78%] w-3 rounded-t-full bg-bark-500" />
              <span className="absolute left-[8%] top-[8%] size-40 rounded-full bg-forest-700" />
              <span className="absolute left-[34%] top-0 size-48 rounded-full bg-moss-700" />
              <span className="absolute right-[4%] top-[14%] size-36 rounded-full bg-forest-700" />
            </div>
          </div>
          <div className="absolute bottom-8 left-0 max-w-xs rounded-2xl border border-white/15 bg-cream-50 p-5 text-forest-950 shadow-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-moss-700">Property potential</p>
            <p className="mt-2 font-display text-xl font-semibold">Clear the overgrowth. Keep the ground working for you.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
