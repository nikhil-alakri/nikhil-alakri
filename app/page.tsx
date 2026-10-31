import Hero from "@/components/Hero";
import CompanyMarquee from "@/components/CompanyMarquee";
import ServicesPillars from "@/components/ServicesPillars";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import BentoProjects from "@/components/BentoProjects";
import ExperienceSkills from "@/components/ExperienceSkills";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <CompanyMarquee />
      <ServicesPillars />
      <ExperienceTimeline />
      <BentoProjects />
      <ExperienceSkills />
      <FaqSection />
      <Footer />
    </main>
  );
}
