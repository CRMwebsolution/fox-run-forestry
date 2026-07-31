"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/siteConfig";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-forest-900/10 bg-cream-50/95 backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-3 px-5 sm:gap-6 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
          aria-label={`${siteConfig.name} home`}
        >
          <span
            aria-hidden="true"
            className="grid size-10 place-items-center rounded-full bg-forest-900 text-lime-300"
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none">
              <path
                d="M12 3 7 10h3l-4 6h5v5h2v-5h5l-4-6h3l-5-7Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span>
            <span className="block font-display text-lg font-semibold leading-none text-forest-950">
              Fox Run
            </span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.24em] text-moss-700">
              Forestry LLC
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm text-sm font-semibold text-forest-950 transition hover:text-moss-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={`tel:${siteConfig.contact.primaryPhoneHref}`}
          className="inline-flex min-h-10 items-center justify-center rounded-full bg-lime-300 px-4 py-2 text-xs font-bold tracking-wide text-forest-950 transition hover:bg-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 sm:min-h-12 sm:px-6 sm:py-3 sm:text-sm lg:hidden"
          aria-label={`Call Fox Run Forestry at ${siteConfig.contact.primaryPhone}`}
        >
          Call Now
        </a>

        <a
          href={`tel:${siteConfig.contact.primaryPhoneHref}`}
          className="hidden rounded-sm text-sm font-bold text-forest-950 transition hover:text-moss-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 lg:inline-flex"
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
            className="grid size-11 place-items-center rounded-full border border-forest-900/20 text-forest-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
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
              className="absolute right-0 top-14 w-56 rounded-2xl border border-forest-900/10 bg-white p-2 shadow-xl"
              aria-label="Mobile navigation"
            >
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-forest-950 hover:bg-sand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={`tel:${siteConfig.contact.primaryPhoneHref}`}
                onClick={() => setIsMenuOpen(false)}
                className="mt-1 block rounded-xl bg-forest-900 px-4 py-2.5 text-center text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
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
