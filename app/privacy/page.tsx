import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Fox Run Forestry handles quote requests and website analytics.",
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-brand-dark text-brand-cream">
      <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:px-12">
        <Link href="/" className="text-sm font-semibold text-brand-orange hover:text-brand-cream">
          ← Back to home
        </Link>
        <h1 className="mt-8 font-serif text-4xl font-bold sm:text-5xl">Privacy Policy</h1>
        <div className="mt-10 space-y-10 text-brand-muted">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-cream">Quote requests</h2>
            <p>
              When you submit the contact form, Fox Run Forestry receives the name,
              phone number, optional email address, and project details you provide.
              The form sends those details through an automation workflow so the
              business can respond to your request.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-cream">Website analytics</h2>
            <p>
              This site uses Google Analytics to understand visits and interactions.
              Google Analytics uses cookies and similar technology to collect usage
              information such as pages viewed and browser or device details. Vercel
              Analytics also measures website traffic.
            </p>
            <p>
              Read{" "}
              <a
                className="underline hover:text-brand-cream"
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
              >
                how Google uses information from sites that use its services
              </a>
              . You can manage cookies through your browser settings.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-brand-cream">Questions</h2>
            <p>
              Email{" "}
              <a className="underline hover:text-brand-cream" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>{" "}
              with questions about your information.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
