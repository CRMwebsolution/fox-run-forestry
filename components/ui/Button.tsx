import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

const variants = {
  primary:
    "bg-brand-orange text-brand-cream hover:bg-brand-orange-hover focus-visible:ring-brand-orange",
  secondary:
    "border border-brand-olive/40 bg-brand-card text-brand-cream hover:bg-brand-olive/30 focus-visible:ring-brand-olive",
  light:
    "border border-brand-olive/50 bg-brand-card/70 text-brand-cream hover:bg-brand-olive/30 focus-visible:ring-brand-olive",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-bold tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
