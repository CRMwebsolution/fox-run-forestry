import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";

export function Footer() {
  return (
    <footer className="bg-forest-950 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-3 lg:px-12">
        <div>
          <p className="font-display text-2xl font-semibold">{siteConfig.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-sand-100/70">
            Forestry mulching, brush control, and practical land management for
            Carteret and Craven Counties.
          </p>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">
            Contact
          </h2>
          <div className="mt-4 space-y-2 text-sm text-sand-100/80">
            <p>
              <a className="hover:text-white" href={`tel:${siteConfig.contact.primaryPhoneHref}`}>
                {siteConfig.contact.primaryPhone}
              </a>
            </p>
            <p>
              <a className="hover:text-white" href={`tel:${siteConfig.contact.secondaryPhoneHref}`}>
                {siteConfig.contact.secondaryPhone}
              </a>
            </p>
            <p>
              <a className="hover:text-white" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">
            Service Area
          </h2>
          <p className="mt-4 text-sm leading-7 text-sand-100/80">
            Newport, Carteret County, Craven County, and nearby Eastern North
            Carolina communities.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 px-5 pt-6 text-xs text-sand-100/60 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <Link href="#top" className="hover:text-white">Back to top ↑</Link>
      </div>
    </footer>
  );
}
