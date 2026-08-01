export type NavigationItem = {
  label: string;
  href: string;
  isAnchor?: boolean;
};

export type ServiceArea = {
  name: string;
  description: string;
};

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  benefits: string[];
  idealClients: string;
};

export type SiteConfig = {
  name: string;
  domain: string;
  description: string;
  tagline: string;
  brandAssets: {
    hero: string;
    logo: string;
    icon: string;
  };
  keywords: string[];
  contact: {
    primaryPhone: string;
    primaryPhoneHref: string;
    email: string;
    serviceArea: string;
  };
  social: {
    facebook: string;
  };
  navigation: NavigationItem[];
  serviceAreas: ServiceArea[];
  services: Service[];
};

export const siteConfig: SiteConfig = {
  name: "Fox Run Forestry LLC",
  domain: "https://foxrunforestry.com",
  description:
    "Fox Run Forestry LLC provides professional forestry mulching, brush clearing, and land management services in Newport, Carteret County, and Craven County, North Carolina.",
  tagline:
    "Specializing in forestry mulching and brush control, serving Carteret County and surrounding areas.",
  brandAssets: {
    hero:
      "https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/public/other_sites/FoxRunForestry/hero.jpg",
    logo:
      "https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/public/other_sites/FoxRunForestry/Logo.jpg",
    icon:
      "https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/public/other_sites/FoxRunForestry/icon.jpg",
  },
  keywords: [
    "forestry mulching",
    "brush clearing",
    "land clearing",
    "underbrush removal",
    "access road clearing",
    "hunting land access roads",
    "storm cleanup",
    "Carteret County NC forestry mulching",
    "Craven County NC brush control",
    "Newport NC land clearing",
  ],
  contact: {
    primaryPhone: "(252) 241-6969",
    primaryPhoneHref: "+12522416969",
    email: "foxrunforestry@gmail.com",
    serviceArea:
      "Newport, Carteret County, Craven County, and surrounding Eastern North Carolina communities",
  },
  social: {
    facebook: "https://www.facebook.com/foxrunforestryllc",
  },
  navigation: [
    { label: "Services", href: "#services", isAnchor: true },
    { label: "Areas Served", href: "#areas-served", isAnchor: true },
    { label: "Gallery", href: "#gallery", isAnchor: true },
    { label: "FAQ", href: "#faq", isAnchor: true },
    { label: "Free Quote", href: "#contact", isAnchor: true },
  ],
  serviceAreas: [
    {
      name: "Newport, NC",
      description:
        "Home-base service for residential lots, rural acreage, fence lines, trails, and property access.",
    },
    {
      name: "Carteret County, NC",
      description:
        "Brush control and forestry mulching for coastal properties from the mainland to nearby communities.",
    },
    {
      name: "Craven County, NC",
      description:
        "Land management, hunting property access, and overgrowth removal throughout neighboring Craven County.",
    },
    {
      name: "Eastern North Carolina",
      description:
        "Flexible scheduling for select projects across coastal North Carolina and surrounding areas.",
    },
  ],
  services: [
    {
      slug: "forestry-mulching",
      title: "Forestry Mulching",
      shortDescription:
        "Turn standing brush, saplings, and dense undergrowth into a natural mulch layer in one efficient process.",
      benefits: [
        "Less soil disturbance",
        "No burn piles to manage",
        "Organic ground cover left in place",
      ],
      idealClients:
        "Ideal for wooded lots, acreage, pasture edges, and long-term property improvement.",
    },
    {
      slug: "brush-control",
      title: "Brush Control & Undergrowth Removal",
      shortDescription:
        "Reclaim overgrown ground, improve visibility, and make neglected sections of your property usable again.",
      benefits: [
        "Clear thick vines and brush",
        "Open fence lines and boundaries",
        "Improve routine property access",
      ],
      idealClients:
        "A practical fit for homeowners, landowners, farms, and repeat maintenance clients.",
    },
    {
      slug: "access-roads",
      title: "Trails & Access Roads",
      shortDescription:
        "Open or restore routes for hunting land, equipment access, driveways, walking trails, and rural properties.",
      benefits: [
        "Reach hard-to-access acreage",
        "Create cleaner travel corridors",
        "Support future property work",
      ],
      idealClients:
        "Built for hunters, recreational landowners, farmers, and rural property managers.",
    },
    {
      slug: "site-preparation",
      title: "Property & Site Preparation",
      shortDescription:
        "Clear brush around residential lots, utility easements, pasture areas, and planned improvement sites.",
      benefits: [
        "Prepare for the next contractor",
        "Expose terrain and boundaries",
        "Reduce unwanted overgrowth",
      ],
      idealClients:
        "Useful before fencing, surveying, landscaping, construction planning, or property listing.",
    },
  ],
};
