// ==============================================================================
// 🌐 SINGLE SOURCE OF TRUTH: ALL SITE URLS & EXTERNAL LINKS
// ------------------------------------------------------------------------------
// To update ANY URL, social profile, project repo, live app link, or email:
// Simply edit this single file! Everything across the site updates automatically.
// ==============================================================================

export const SITE_URLS = {
  // 1. Core Domain
  baseUrl: "https://nikhilalakri.tech",

  // 2. Documents & Assets
  resume: "/resume/Nikhil_Alakri_Resume_CitiusTech.pdf",
  models: {
    // P3.1 / D-006: compressed (Draco + WebP) are primary — 15.28 MB → 2.85 MB.
    // Originals remain as the fallback chain (see ThreeHeroModel loadModel).
    hero3d: "/3d-models/compressed/hero-pbr.glb",
    heroRigged: "/3d-models/compressed/hero-rigged.glb",
    hero3dOriginal: "/__l5e/assets-v1/648ff537-008f-46cd-a4be-85a9f5a3feba/hero-pbr-original.glb",
    heroRiggedOriginal: "/3d-models/tripo_rigging_aa8a4ad8-f9cd-45eb-b1e3-940e82a8caba_meshopt.glb",
  },

  // 3. Contact & Email (Set to safe domain placeholder)
  contact: {
    email: "nikhilalakri5233@gmail.com",
    mailto: "mailto:nikhilalakri5233@gmail.com",
  },

  // 4. Social Profiles (Set to safe placeholders)
  socials: {
    github: "https://github.com/nikhil-alakri",
    linkedin: "https://www.linkedin.com/in/nikhil-alakri",
  },

  // 5. Projects & Repositories (Set to safe placeholders while work is in progress)
  projects: {
    odinEye: {
      title: "odin-eye",
      route: "/odin-eye",
      github: "https://github.com/nikhil-alakri/odin-eye",
    },
    tryy: {
      title: "Tryy (tryy.in)",
      github: "https://github.com/nikhil-alakri",
      liveApp: "https://tryy.in",
    },
    uiStore: {
      title: "UI-store",
      github: "https://github.com/nikhil-alakri/UI-store",
    },
    ipo: {
      title: "ipo (ITPO)",
      route: "/itpo",
      github: "https://github.com/nikhil-alakri/ipo",
      liveApp: "https://ipo-data.vercel.app/" as string,
    },
    multiLiving: {
      title: "MultiLiving Platform",
      github: "https://github.com/nikhil-alakri",
    },
    adityaBirla: {
      title: "Aditya Birla Calculators",
      github: "https://github.com/nikhil-alakri",
    },
    flightSearch: {
      title: "flight-search",
      github: "https://github.com/nikhil-alakri/flight-search",
    },
    projectOne: {
      title: "Project One",
      route: "/project-one",
      github: "https://github.com/nikhil-alakri",
    },
  },

  // 6. In-Page Navigation Links
  nav: {
    home: "/",
    projects: "#projects",
    experience: "#experience",
    pillars: "#pillars",
    skills: "#skills",
    faq: "#faq",
    contact: "#contact",
  },
} as const;

export default SITE_URLS;
