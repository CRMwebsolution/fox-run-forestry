"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { ImageComparison } from "@/components/ui/ImageComparison";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase/client";
import { siteConfig } from "@/config/siteConfig";
import type { GalleryItem } from "@/types/gallery";

const storageBaseUrl =
  "https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/public/other_sites/FoxRunForestry";

const fallbackProjects: GalleryItem[] = [
  {
    id: "fallback-1",
    title: "One-acre underbrush cleanup",
    caption:
      "We cleared one acre in Newport, removing the underbrush and dead pines to leave the property cleaner, safer, and easier to use.",
    image_type: "comparison",
    single_image_url: null,
    before_image_url: `${storageBaseUrl}/1/before.jpg`,
    after_image_url: `${storageBaseUrl}/1/after.jpg`,
    alt_text: "one-acre forestry mulching and dead pine removal project in Newport NC",
    sort_order: 1,
    published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-2",
    title: "Making more room on 20 acres",
    caption:
      "A repeat client brought us back to open up this 20-acre Newport parcel, creating more usable ground for a future front and back yard.",
    image_type: "comparison",
    single_image_url: null,
    before_image_url: `${storageBaseUrl}/2/before.jpg`,
    after_image_url: `${storageBaseUrl}/2/after.jpg`,
    alt_text: "20-acre repeat-client land clearing project in Newport NC",
    sort_order: 2,
    published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-3",
    title: "More room for the kids to play",
    caption:
      "After building their new home in Newport, this family wanted more of the property opened up. We cleared the overgrowth and gave the kids room to enjoy the yard.",
    image_type: "comparison",
    single_image_url: null,
    before_image_url: `${storageBaseUrl}/3/before.jpg`,
    after_image_url: `${storageBaseUrl}/3/after.jpg`,
    alt_text: "residential brush clearing around a newly built home in Newport NC",
    sort_order: 3,
    published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-4",
    title: "Boundary access for an accurate survey",
    caption:
      "This newly purchased parcel was packed with small pines. We cut approximate boundary lines so the surveyor could get in and confirm the property lines accurately.",
    image_type: "comparison",
    single_image_url: null,
    before_image_url: `${storageBaseUrl}/4/before.jpg`,
    after_image_url: `${storageBaseUrl}/4/after.jpg`,
    alt_text: "small pine clearing for property boundary surveying in Eastern North Carolina",
    sort_order: 4,
    published: true,
    created_at: "",
    updated_at: "",
  },
];

export function ProjectsSection() {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    let active = true;

    async function loadGallery() {
      const { data, error } = await supabase
        .from("FoxRunForestry")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (active && !error && data?.length) {
        setProjects(data as GalleryItem[]);
      }
    }

    void loadGallery();
    return () => {
      active = false;
    };
  }, []);

  return (
    <Section
      id="gallery"
      eyebrow="Work on the ground"
      title="Before & After Project Gallery"
      intro="Drag each slider to see what focused forestry mulching and brush control can do for a property. These are real Fox Run Forestry projects completed around Newport and Eastern North Carolina."
      tone="dark"
    >
      <p className="mb-8 text-sm font-semibold text-brand-orange sm:mb-10">
        Drag the handle, tap anywhere on a photo, or use the arrow keys to compare.
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="overflow-hidden rounded-3xl border border-brand-olive/30 bg-brand-card text-brand-cream shadow-2xl"
          >
            {project.image_type === "comparison" &&
            project.before_image_url &&
            project.after_image_url ? (
              <ImageComparison
                beforeImage={project.before_image_url}
                afterImage={project.after_image_url}
                altBefore={`Before: ${project.alt_text}`}
                altAfter={`After: ${project.alt_text}`}
              />
            ) : project.single_image_url ? (
              <div className="aspect-[4/3] overflow-hidden bg-brand-dark sm:aspect-[3/2]">
                <img
                  src={project.single_image_url}
                  alt={project.alt_text}
                  className="size-full object-cover"
                />
              </div>
            ) : null}
            <div className="p-6 sm:p-8">
              <h3 className="font-display text-2xl font-semibold sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-4 leading-7 text-brand-muted">{project.caption}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 text-center sm:mt-12">
        <p className="mb-4 text-sm font-semibold text-brand-muted">
          Follow along for more recent clearing and mulching projects.
        </p>
        <Button
          href={siteConfig.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          Find More Jobs on Facebook
        </Button>
      </div>
    </Section>
  );
}
