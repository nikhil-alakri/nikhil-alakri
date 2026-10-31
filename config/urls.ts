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
    hero3d: "/3d-models/tripo_pbr_model_f45a11fd-bba9-4ec5-9179-8b2af812de0a_meshopt.glb",
    heroRigged: "/3d-models/tripo_rigging_aa8a4ad8-f9cd-45eb-b1e3-940e82a8caba_meshopt.glb",
  },

  // 3. Contact & Email (Set to safe domain placeholder)
  contact: {
    email: "contact@nikhilalakri.tech",
    mailto: "mailto:contact@nikhilalakri.tech",
  },

  // 4. Social Profiles (Set to safe placeholders)
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },

  // 5. Projects & Repositories (Set to safe placeholders while work is in progress)
  projects: {
    odinEye: {
      title: "odin-eye",
      route: "/odin-eye",
      github: "https://github.com",
    },
    tryy: {
      title: "Tryy (tryy.in)",
      github: "https://github.com",
      liveApp: "https://tryy.in",
    },
    uiStore: {
      title: "UI-store",
      github: "https://github.com",
    },
    ipo: {
      title: "ipo (ITPO)",
      route: "/itpo",
      github: "https://github.com",
      liveApp: "" as string, // Leave empty to keep private while in progress
    },
    multiLiving: {
      title: "MultiLiving Platform",
      github: "https://github.com",
    },
    adityaBirla: {
      title: "Aditya Birla Calculators",
      github: "https://github.com",
    },
    flightSearch: {
      title: "flight-search",
      github: "https://github.com",
    },
    projectOne: {
      title: "Project One",
      route: "/project-one",
      github: "https://github.com",
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
