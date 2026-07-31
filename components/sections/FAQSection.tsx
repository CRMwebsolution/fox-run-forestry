import { Section } from "@/components/ui/Section";

const faqs = [
  {
    question: "What areas do you service?",
    answer:
      "Fox Run Forestry is based around Newport, North Carolina and primarily serves Carteret County, Craven County, and nearby Eastern North Carolina communities. Call with the property address to confirm availability.",
  },
  {
    question: "What is forestry mulching?",
    answer:
      "Forestry mulching uses specialized equipment to cut and process brush, saplings, and undergrowth in place. The material is left as a natural mulch layer, which often means less hauling and less soil disturbance than traditional clearing.",
  },
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes. Call, text, or email to describe the project and schedule a free quote or site visit. Photos, acreage, vegetation type, and access details are helpful when discussing the work.",
  },
  {
    question: "Can you clear access roads for hunting property?",
    answer:
      "Yes. Hunting land access roads, trails, shooting lanes, and equipment routes are common uses for forestry mulching. The final approach depends on terrain, width, vegetation density, drainage, and existing road conditions.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Many smaller brush-control projects can be completed in a day, while larger acreage or dense growth may take longer. A site visit provides a more accurate estimate based on access, ground conditions, vegetation, and the desired finish.",
  },
];

export function FAQSection() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Section
      id="faq"
      eyebrow="Good to know"
      title="Forestry Mulching FAQ"
      intro="A few common questions from landowners planning brush clearing and property access work in Carteret and Craven Counties."
      tone="sand"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-4xl divide-y divide-forest-900/15 border-y border-forest-900/15">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-2">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-lg py-5 text-left font-display text-xl font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-700">
              {faq.question}
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-forest-900/20 font-sans text-lg transition group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="max-w-3xl pb-6 pr-12 leading-8 text-stone-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
