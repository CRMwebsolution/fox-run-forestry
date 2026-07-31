"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/siteConfig";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-olive/30 bg-brand-dark/95 backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-3 px-5 sm:gap-6 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="group shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-olive"
          aria-label={`${siteConfig.name} home`}
        >
          <span className="relative block h-12 w-[112px] overflow-hidden sm:h-14 sm:w-[150px] lg:h-16 lg:w-[190px]">
            <img
              src={siteConfig.brandAssets.logo}
              alt="Fox Run Forestry LLC logo"
              className="absolute left-1/2 top-1/2 w-[430px] max-w-none -translate-x-1/2 -translate-y-1/2 scale-[0.85] sm:w-[480px]"
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm text-sm font-semibold text-brand-cream transition hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-olive"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={`tel:${siteConfig.contact.primaryPhoneHref}`}
          className="inline-flex min-h-10 items-center justify-center rounded-full bg-brand-orange px-4 py-2 text-xs font-bold tracking-wide text-brand-cream transition hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark sm:min-h-12 sm:px-6 sm:py-3 sm:text-sm lg:hidden"
          aria-label={`Call Fox Run Forestry at ${siteConfig.contact.primaryPhone}`}
        >
          Call Now
        </a>

        <a
          href={`tel:${siteConfig.contact.primaryPhoneHref}`}
          className="hidden rounded-sm text-sm font-bold text-brand-cream transition hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-olive lg:inline-flex"
          aria-label={`Call Fox Run Forestry at ${siteConfig.contact.primaryPhone}`}
        >
          Call {siteConfig.contact.primaryPhone}
        </a>

        <div
          className="relative lg:hidden"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsMenuOpen(false);
            }
          }}
        >
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="grid size-11 place-items-center rounded-full border border-brand-olive/40 text-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-olive"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              {isMenuOpen ? (
                <path d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
          {isMenuOpen && (
            <nav
              id="mobile-navigation"
              className="absolute right-0 top-14 w-56 rounded-2xl border border-brand-olive/30 bg-brand-card p-2 shadow-xl"
              aria-label="Mobile navigation"
            >
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-cream hover:bg-brand-olive/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-olive"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={`tel:${siteConfig.contact.primaryPhoneHref}`}
                onClick={() => setIsMenuOpen(false)}
                className="mt-1 block rounded-xl bg-brand-orange px-4 py-2.5 text-center text-sm font-bold text-brand-cream hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                Call {siteConfig.contact.primaryPhone}
              </a>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
