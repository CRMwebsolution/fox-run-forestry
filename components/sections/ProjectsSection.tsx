import { Section } from "@/components/ui/Section";
import { ImageComparison } from "@/components/ui/ImageComparison";

const storageBaseUrl =
  "https://fhyzsisluszpfhlngiyb.supabase.co/storage/v1/object/public/other_sites/FoxRunForestry";

const projects = [
  {
    folder: "1",
    title: "One-acre underbrush cleanup",
    description:
      "We cleared one acre in Newport, removing the underbrush and dead pines to leave the property cleaner, safer, and easier to use.",
    alt: "one-acre forestry mulching and dead pine removal project in Newport NC",
  },
  {
    folder: "2",
    title: "Making more room on 20 acres",
    description:
      "A repeat client brought us back to open up this 20-acre Newport parcel, creating more usable ground for a future front and back yard.",
    alt: "20-acre repeat-client land clearing project in Newport NC",
  },
  {
    folder: "3",
    title: "More room for the kids to play",
    description:
      "After building their new home in Newport, this family wanted more of the property opened up. We cleared the overgrowth and gave the kids room to enjoy the yard.",
    alt: "residential brush clearing around a newly built home in Newport NC",
  },
  {
    folder: "4",
    title: "Boundary access for an accurate survey",
    description:
      "This newly purchased parcel was packed with small pines. We cut approximate boundary lines so the surveyor could get in and confirm the property lines accurately.",
    alt: "small pine clearing for property boundary surveying in Eastern North Carolina",
  },
];

export function ProjectsSection() {
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
        {projects.map((project, index) => (
          <article
            key={project.folder}
            className="overflow-hidden rounded-3xl border border-brand-olive/30 bg-brand-card text-brand-cream shadow-2xl"
          >
            <ImageComparison
              beforeImage={`${storageBaseUrl}/${project.folder}/before.jpg`}
              afterImage={`${storageBaseUrl}/${project.folder}/after.jpg`}
              altBefore={`Before: ${project.alt}`}
              altAfter={`After: ${project.alt}`}
            />
            <div className="p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                Newport project 0{index + 1}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-4 leading-7 text-brand-muted">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
