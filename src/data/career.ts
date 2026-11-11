// Work history from Nikhil's resume.
export interface Role { id: string; period: string; role: string; org: string; location: string; tag?: string; summary: string; highlights: string[] }

export const CAREER: Role[] = [
  { id: "citiustech", period: "Jul 2024 — Present", role: "Senior Software Engineer", org: "CitiusTech Healthcare Technology", location: "Airoli", tag: "Healthcare / Design systems",
    summary: "Lit + TypeScript component libraries, WCAG standards, image optimisation, and healthcare AI accelerators.",
    highlights: [
      "Architected a reusable UI component library with Lit and TypeScript, used across multiple regulated clinical applications.",
      "Standardised a Definition of Done covering WCAG accessibility, i18n (LTR/RTL) and design tokens.",
      "Kept releases auditable and secure through end-to-end versioning and consistent Vitest unit testing.",
      "Built automated image optimisation pipelines with Sharp and Jimp, measurably improving Lighthouse scores.",
      "Led technical accelerators including Agentic SQL Parsers and Patient 360 dashboards to speed up presales.",
      "Designed a medical imaging chat POC with drag-and-drop validation, clinical study sidebars and contextual history.",
    ] },
  { id: "adventum", period: "Apr 2022 — May 2024", role: "SDE-2", org: "Adventum Student Living", location: "Lower Parel, Mumbai", tag: "UniAcco · UniScholars · UniCreds",
    summary: "Improved page load speed by 20% and helped agents handle 15% more calls per day.",
    highlights: [
      "Optimised Core Web Vitals with Next.js image optimisation and a global CDN — 20% faster page loads.",
      "Shortened agent interaction times so the team handled 15% more calls per day.",
      "Delivered features covering 80% of the long-term product roadmap.",
      "Modernised a legacy JavaScript codebase with Next.js, cutting bug resolution time by 20%.",
    ] },
  { id: "lodha", period: "Oct 2021 — Mar 2022", role: "Senior Executive — Technology", org: "The House of Abhinandan Lodha", location: "Lower Parel, Mumbai",
    summary: "Led project setup, architecture, deployment strategy and engineering team delivery.",
    highlights: [
      "Planned design and development decisions with business teams.",
      "Led project setup with stronger architecture and deployment strategies.",
      "Managed team tasks against business needs, focusing on code optimisation and unit testing.",
    ] },
  { id: "multiliving", period: "Feb 2020 — Sep 2021", role: "Software Engineer", org: "MultiLiving Technologies", location: "Lower Parel, Mumbai",
    summary: "Built maintainable, unit-tested systems for a dynamic apartment rental platform.",
    highlights: [
      "Designed new application systems with business units to improve mobile capabilities.",
      "Wrote the maintainable core framework code, earning consistent praise from other developers.",
      "Delivered unit-tested systems within customer timelines.",
    ] },
  { id: "cloudesign", period: "Oct 2018 — Feb 2020", role: "SDE-I", org: "Cloudesign Technology Solutions", location: "Vikhroli, Mumbai",
    summary: "Turned requirements into clear specifications and improved system performance.",
    highlights: [
      "Worked with product managers and QA to resolve technical issues and write clear specifications.",
      "Improved system performance through proactive adjustments and bug fixes.",
    ] },
];
