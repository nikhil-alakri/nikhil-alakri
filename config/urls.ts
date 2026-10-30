// ==============================================================================
// 🌐 SINGLE SOURCE OF TRUTH: ALL SITE URLS & EXTERNAL LINKS
// ------------------------------------------------------------------------------
// To update ANY URL, social profile, project repo, live app link, or email:
// Simply edit this single file! Everything across the site updates automatically.
// ==============================================================================

export const SITE_URLS = {
  // 1. Core Domain
  baseUrl: "https://nikhilalakri.tech",

  // 2. Contact & Email (Set to safe domain placeholder)
  contact: {
    email: "contact@nikhilalakri.tech",
    mailto: "mailto:contact@nikhilalakri.tech",
  },

  // 3. Social Profiles (Set to generic placeholders)
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },

  // 4. Projects & Repositories (Set to safe placeholders while work is in progress)
  projects: {
    odinEye: {
      title: "odin-eye",
      route: "/odin-eye",
      github: "https://github.com",
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
