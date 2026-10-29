import Hero from "@/components/Hero";
import BentoProjects from "@/components/BentoProjects";
import OpenSource from "@/components/OpenSource";
import ExperienceSkills from "@/components/ExperienceSkills";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <BentoProjects />
      <OpenSource />
      <ExperienceSkills />
      <Footer />
    </main>
  );
}

