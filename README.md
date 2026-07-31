# Fox Run Forestry LLC

Production-ready single-page marketing website for Fox Run Forestry LLC, built
with Next.js App Router, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Main project structure

- `config/siteConfig.ts`: business details, SEO content, navigation, service
  areas, and services
- `app/layout.tsx`: metadata, canonical URL, Open Graph configuration, and
  LocalBusiness structured data
- `app/page.tsx`: landing-page composition
- `components/layout/`: shared header, footer, and site layout
- `components/sections/`: reusable landing-page sections
- `components/ui/`: shared button and section primitives

The contact form performs client-side validation and opens the visitor's email
application with a prepared quote request. It does not require a database or
third-party form service.

Before launch, confirm the production domain and Facebook URL in
`config/siteConfig.ts`. All business copy, contact information, and local SEO
settings are centralized there.
