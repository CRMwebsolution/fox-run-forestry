import { Section } from "@/components/ui/Section";

const projects = [
  {
    type: "Hunting property",
    title: "Access road through dense undergrowth",
    description:
      "A practical clearing plan can reopen a route for trucks, equipment, and foot traffic while preserving the surrounding woods and habitat.",
    result: "Better access without clearing the entire property",
    visual: "from-brand-olive to-brand-dark",
  },
  {
    type: "Newport property",
    title: "Repeat-client brush control",
    description:
      "Routine mulching can keep fast coastal growth from taking back fence lines, lot edges, trails, and areas that have already been reclaimed.",
    result: "A maintained property that stays easier to use",
    visual: "from-brand-olive to-brand-card",
  },
  {
    type: "Residential lot",
    title: "Overgrowth removal before improvements",
    description:
      "Removing brush and saplings can expose the shape of the land before fencing, landscaping, surveying, driveway work, or future construction.",
    result: "Clearer boundaries and a cleaner starting point",
    visual: "from-brand-orange to-brand-card",
  },
];

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Work on the ground"
      title="Recent Projects & Transformations"
      intro="The right clearing plan depends on what the property needs to do next. These common Eastern North Carolina project types show how forestry mulching can improve access, visibility, and long-term use."
      tone="dark"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((project, index) => (
          <article key={project.title} className="overflow-hidden rounded-3xl border border-brand-olive/30 bg-brand-card text-brand-cream">
            <div
              className={`relative h-56 overflow-hidden bg-gradient-to-br ${project.visual}`}
              role="img"
              aria-label={`${project.title}, forestry mulching and brush control project in the Newport and Carteret County NC area`}
            >
              <div className="absolute inset-x-0 bottom-0 h-24 bg-brand-dark/40" />
              <div className="absolute bottom-0 left-[16%] h-44 w-3 rounded-t-full bg-brand-orange" />
              <div className="absolute bottom-0 left-[44%] h-52 w-4 rounded-t-full bg-brand-orange" />
              <div className="absolute bottom-0 right-[18%] h-40 w-3 rounded-t-full bg-brand-orange" />
              <div className="absolute -left-10 top-4 size-44 rounded-full bg-brand-olive/90" />
              <div className="absolute left-[28%] -top-10 size-56 rounded-full bg-brand-olive/90" />
              <div className="absolute -right-8 top-5 size-48 rounded-full bg-brand-olive/80" />
              <span className="absolute left-5 top-5 rounded-full bg-brand-dark px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-cream">
                {project.type}
              </span>
              <span className="absolute bottom-5 right-5 font-display text-5xl font-semibold text-brand-cream/25">
                0{index + 1}
              </span>
            </div>
            <div className="p-7">
              <h3 className="font-display text-2xl font-semibold">{project.title}</h3>
              <p className="mt-4 leading-7 text-brand-muted">{project.description}</p>
              <p className="mt-6 border-t border-brand-olive/30 pt-5 text-sm font-bold text-brand-orange">
                {project.result}
              </p>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-8 max-w-3xl text-sm leading-7 text-brand-muted">
        Project descriptions are representative of the types of work Fox Run
        Forestry performs. Site conditions, access, acreage, and results vary by
        property.
      </p>
    </Section>
  );
}
