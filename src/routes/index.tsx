import { createFileRoute } from "@tanstack/react-router";
import HomeHero from "@/components/home/HomeHero";
import ProofRibbon from "@/components/home/ProofRibbon";
import WorkShowcase from "@/components/home/WorkShowcase";
import Toolkit from "@/components/home/Toolkit";
import CareerTable from "@/components/home/CareerTable";
import { About, Learning } from "@/components/home/AboutLearning";
import ProjectMatcher from "@/components/home/ProjectMatcher";
import ForRecruiters from "@/components/home/ForRecruiters";
import ScrollFX from "@/components/ScrollFX";
import Reveal from "@/components/Reveal";
import Contact from "@/components/home/Contact";
import { getShareCover } from "@/lib/share.functions";

export const Route = createFileRoute("/")({
  loader: () => getShareCover(),
  head: ({ loaderData }) => ({
    meta: [
      { title: "Nikhil Alakri | Frontend Developer in Maharashtra" },
      { name: "description", content: "Hire Nikhil Alakri, a frontend developer in Badlapur, Maharashtra with 7+ years in React, TypeScript and accessible design systems. View projects, resume and career timeline." },
      { property: "og:title", content: "Nikhil Alakri | Frontend Developer in Maharashtra" },
      { property: "og:description", content: "Senior Software Engineer in Badlapur, Maharashtra. Explore React, TypeScript and design-system projects, GitHub work and a recruiter-ready career timeline." },
      { property: "og:url", content: "/" },
      ...(loaderData?.image.startsWith("https://") ? [{ property: "og:image", content: loaderData.image }, { name: "twitter:image", content: loaderData.image }, { property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" }] : []),
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Nikhil Alakri | Frontend Developer in Maharashtra" },
      { name: "twitter:description", content: "React, TypeScript and accessible design systems. Projects, resume and career timeline for recruiters." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <main id="main-content" className="flex flex-col">
        <ScrollFX />
        <HomeHero />
        <ProofRibbon />
        <Reveal><WorkShowcase /></Reveal>
        <Reveal><Toolkit /></Reveal>
        <Reveal><CareerTable /></Reveal>
        <Reveal><About /></Reveal>
        <Reveal><Learning /></Reveal>
        <Reveal><ForRecruiters /></Reveal>
        <Reveal><ProjectMatcher /></Reveal>
      </main>
      <Contact />
    </>
  );
}
