import Hero from "@/components/Hero";
import ServicesPillars from "@/components/ServicesPillars";
import CompanyMarquee from "@/components/CompanyMarquee";
import TerminalSection from "@/components/TerminalSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import BentoProjects from "@/components/BentoProjects";
import ExperienceSkills from "@/components/ExperienceSkills";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import SectionNavigator from "@/components/SectionNavigator";
import ResumeModal from "@/components/ResumeModal";
import ConfettiBurst from "@/components/ConfettiBurst";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col relative">
      <Hero />
      <ServicesPillars />
      <CompanyMarquee />
      <TerminalSection />
      <ExperienceTimeline />
      <BentoProjects />
      <ExperienceSkills />
      <FaqSection />
      <Footer />
      <SectionNavigator />
      <ResumeModal />
      <ConfettiBurst />
    </main>
  );
}
