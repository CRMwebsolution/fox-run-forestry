import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ServiceAreasSection } from "@/components/sections/ServiceAreasSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <ServiceAreasSection />
      <WhyChooseSection />
      <ProjectsSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
