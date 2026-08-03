import type { Metadata, Viewport } from "next";\nimport { Analytics } from "@vercel/analytics/next";
import { Lora, Manrope } from "next/font/google";
import { Layout } from "@/components/layout/Layout";
import { siteConfig } from "@/config/siteConfig";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.name} | Forestry Mulching in Carteret County NC`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | Forestry Mulching & Brush Control`,
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
    url: siteConfig.domain,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.brandAssets.hero,
        alt: "Fox Run Forestry LLC forestry mulching equipment in Eastern North Carolina",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: siteConfig.brandAssets.icon,
    shortcut: siteConfig.brandAssets.icon,
    apple: siteConfig.brandAssets.icon,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e0e0e",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  url: siteConfig.domain,
  description: siteConfig.description,
  telephone: siteConfig.contact.primaryPhone,
  email: siteConfig.contact.email,
  image: siteConfig.brandAssets.hero,
  logo: siteConfig.brandAssets.logo,
  areaServed: siteConfig.serviceAreas.map((area) => ({
    "@type": area.name.includes("County") ? "AdministrativeArea" : "Place",
    name: area.name,
  })),
  serviceType: [
    "Forestry mulching",
    "Brush clearing",
    "Land clearing",
    "Underbrush removal",
    "Access road clearing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className={`${manrope.variable} ${lora.variable} antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
