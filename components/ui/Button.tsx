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
    "bg-lime-300 text-forest-950 hover:bg-lime-200 focus-visible:ring-lime-300",
  secondary:
    "border border-forest-700 bg-white text-forest-950 hover:bg-sand-100 focus-visible:ring-forest-700",
  light:
    "border border-white/30 bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white",
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
