import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "sand" | "dark";
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
  tone = "light",
}: SectionProps) {
  const tones = {
    light: "bg-brand-dark text-brand-cream",
    sand: "bg-brand-card text-brand-cream",
    dark: "bg-brand-dark text-brand-cream",
  };

  return (
    <section
      id={id}
      className={`scroll-mt-24 py-20 sm:py-24 lg:py-28 ${tones[tone]} ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        {(eyebrow || title || intro) && (
          <div className="mb-12 max-w-3xl">
            {eyebrow && (
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-brand-orange">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-5 text-base leading-8 text-brand-muted sm:text-lg">
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
