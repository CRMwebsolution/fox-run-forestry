import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";

export function Footer() {
  return (
    <footer className="bg-brand-dark py-12 text-brand-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-3 lg:px-12">
        <div>
          <div className="relative h-28 w-64 overflow-hidden sm:h-32 sm:w-72">
            <img
              src={siteConfig.brandAssets.logo}
              alt="Fox Run Forestry LLC logo"
              className="absolute left-1/2 top-1/2 w-[430px] max-w-none -translate-x-1/2 -translate-y-1/2 sm:w-[480px]"
            />
          </div>
          <p className="mt-3 max-w-sm text-sm leading-7 text-brand-muted">
            Forestry mulching, brush control, and practical land management for
            Carteret and Craven Counties.
          </p>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
            Contact
          </h2>
          <div className="mt-4 space-y-2 text-sm text-brand-muted">
            <p>
              <a className="hover:text-brand-cream" href={`tel:${siteConfig.contact.primaryPhoneHref}`}>
                {siteConfig.contact.primaryPhone}
              </a>
            </p>
            <p>
              <a className="hover:text-brand-cream" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
            Service Area
          </h2>
          <p className="mt-4 text-sm leading-7 text-brand-muted">
            Newport, Carteret County, Craven County, and nearby Eastern North
            Carolina communities.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-brand-olive/30 px-5 pt-6 text-xs text-brand-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <p>
            Made by{" "}
            <a
              href="https://southernautomate.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-cream transition hover:text-brand-orange"
            >
              SouthernAutomate
            </a>
          </p>
          <Link href="#top" className="hover:text-brand-cream">
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
