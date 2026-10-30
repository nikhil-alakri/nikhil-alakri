// ==============================================================================
// 🌐 SINGLE SOURCE OF TRUTH: ALL SITE URLS & EXTERNAL LINKS
// ------------------------------------------------------------------------------
// To update ANY URL, social profile, project repo, live app link, or email:
// Simply edit this single file! Everything across the site updates automatically.
// ==============================================================================

export const SITE_URLS = {
  // 1. Core Domain
  baseUrl: "https://nikhilalakri.tech",

  // 2. Contact & Email
  contact: {
    email: "nikhilalakri@gmail.com",
    mailto: "mailto:nikhilalakri@gmail.com",
  },

  // 3. Social Profiles
  socials: {
    github: "https://github.com/nikhil-alakri",
    linkedin: "https://www.linkedin.com/in/nikhil-alakri/",
  },

  // 4. Projects & Repositories
  projects: {
    odinEye: {
      title: "odin-eye",
      route: "/odin-eye",
      github: "https://github.com/nikhil-alakri/odin-eye",
    },
    uiStore: {
      title: "UI-store",
      github: "https://github.com/nikhil-alakri/UI-store",
    },
    ipo: {
      title: "ipo (ITPO)",
      route: "/itpo",
      github: "https://github.com/nikhil-alakri/ipo",
      liveApp: "https://itpo.vercel.app/",
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

  // 5. In-Page Navigation Links
  nav: {
    home: "/",
    projects: "#projects",
    openSource: "#opensource",
    skills: "#skills",
    contact: "#contact",
  },
} as const;

export default SITE_URLS;
