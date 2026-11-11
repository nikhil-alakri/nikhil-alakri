// ==============================================================================
// 🏛️ PORTFOLIO DATA & CONTENT MANIFEST
// Single source of truth for all copy, credentials, projects, and career data.
// ==============================================================================

export interface StatItem {
  value: string;
  label: string;
  sub: string;
}

export interface CompanyItem {
  name: string;
  role: string;
  period?: string;
}

export interface TechItem {
  name: string;
  spec: string;
}

export interface PillarItem {
  num: string;
  title: string;
  summary: string;
  deliverables: string[];
}

export interface ExperienceItem {
  id: string;
  year: string;
  role: string;
  company: string;
  location: string;
  tagline: string;
  metrics?: string;
  achievements: string[];
  techStack: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  path: string;
  isExternal: boolean;
  githubUrl: string;
  liveUrl?: string;
  tags: string[];
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
}

export interface ContactInfo {
  email: string;
  mailto: string;
  location: string;
  availability: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    tagline: string;
    oneLiner: string;
    bio: string;
    resumeUrl: string;
    availability: string;
    location: string;
  };
  contact: ContactInfo;
  socials: SocialLinks;
  stats: StatItem[];
  companies: CompanyItem[];
  technologies: TechItem[];
  pillars: PillarItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  faq: FaqItem[];
  navigation: Array<{ name: string; href: string }>;
}

export const PORTFOLIO_DATA: PortfolioData = {
  personal: {
    name: "Nikhil Alakri",
    role: "Senior Software Engineer",
    tagline: "UI Platforms, Enterprise Design Systems & Multimodal AI",
    oneLiner: "Architecting high-craft clinical UI platforms, enterprise design systems, and multimodal AI accelerators with sub-second performance.",
    bio: "7+ years architecting enterprise design systems, high-performance UI platforms, and multimodal AI accelerators. Specializing in Lit & React component libraries, strict WCAG AA accessibility, and sub-second Core Web Vitals in regulated environments.",
    resumeUrl: "/resume/Nikhil_Alakri_Resume_CitiusTech.pdf",
    availability: "Available for Roles & High-Impact Collaborations",
    location: "Maharashtra, India",
  },

  contact: {
    email: "contact@nikhilalakri.tech",
    mailto: "mailto:contact@nikhilalakri.tech",
    location: "Maharashtra, India",
    availability: "Available for Senior Roles & Architecture Consulting",
  },

  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },

  navigation: [
    { name: "About", href: "#hero" },
    { name: "Specializations", href: "#pillars" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Stack", href: "#skills" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ],

  stats: [
    { value: "+7 Yrs", label: "Enterprise Experience", sub: "Clinical & FinTech UI" },
    { value: "100/100", label: "Lighthouse Certified", sub: "WCAG AA Compliant" },
    { value: "+20%", label: "Speed Improvement", sub: "Core Web Vitals Boost" },
    { value: "80%", label: "Roadmap Shipped", sub: "High-Velocity Delivery" },
  ],

  companies: [
    { name: "CitiusTech Healthcare", role: "Senior Software Engineer" },
    { name: "Adventum Student Living", role: "SDE-2 (UniAcco)" },
    { name: "The House of Abhinandan Lodha", role: "Senior Executive Tech" },
    { name: "MultiLiving Technologies", role: "Software Engineer" },
    { name: "Cloudesign Solutions", role: "SDE-1" },
  ],

  technologies: [
    { name: "Lit Components", spec: "Design Systems" },
    { name: "React & Next.js 15", spec: "High-Craft Web Apps" },
    { name: "TypeScript", spec: "Typed Robustness" },
    { name: "WCAG AA & i18n", spec: "Accessibility Standard" },
    { name: "Three.js & PBR", spec: "Interactive 3D" },
    { name: "Python & RAG", spec: "Multimodal AI" },
    { name: "Lighthouse 100/100", spec: "Core Web Vitals" },
  ],

  pillars: [
    {
      num: "01",
      title: "Healthcare & Enterprise Design Systems",
      summary:
        "Architecting reusable Lit and React component libraries delivering core interface elements across regulated clinical and enterprise applications.",
      deliverables: [
        "Lit & React (TSX) Component Libraries",
        "Rigorous Definition of Done (DoD) & WCAG AA Standards",
        "Multi-theme Design Tokens & i18n (LTR/RTL) Support",
        "End-to-end versioning, Storybook & Vitest audits",
      ],
    },
    {
      num: "02",
      title: "Multimodal AI & Agentic Accelerators",
      summary:
        "Designing specialized technical accelerators and AI pipelines to validate feasibility, automate complex data extraction, and drive presales velocity.",
      deliverables: [
        "Autonomous Reverse-Engineering Engine (odin-eye)",
        "Agentic SQL Parsers & Dynamic Query Synthesis",
        "Medical Imaging Chat POCs with drag-and-drop validation",
        "Local ChromaDB Vector RAG & Contextual Patient 360",
      ],
    },
    {
      num: "03",
      title: "Web Performance & Lighthouse 100/100",
      summary:
        "Relentless Core Web Vitals optimization, asset compression pipelines, and zero-CLS architecture delivering measurable speedups in production.",
      deliverables: [
        "Automated image optimization pipelines with Sharp & Jimp",
        "20% improvement in page load speed on high-traffic portals",
        "100/100 Lighthouse Performance & Accessibility compliance",
        "Sub-1.5s Largest Contentful Paint (LCP) engineering",
      ],
    },
    {
      num: "04",
      title: "Full-Stack Architecture & Cloud APIs",
      summary:
        "Building resilient web applications, distributed backend services, and scalable database schemas from initial RFC to edge deployment.",
      deliverables: [
        "Next.js 15 App Router & Server Component Architecture",
        "PostgreSQL, Supabase, MongoDB, and Redis caching",
        "Typed OpenAPI / REST contracts with zero schema drift",
        "Dockerized microservices & automated CI/CD pipelines",
      ],
    },
  ],

  experience: [
    {
      id: "citiustech",
      year: "2024 — Present",
      role: "Senior Software Engineer",
      company: "CitiusTech Healthcare Technology",
      location: "Airoli, India",
      tagline: "Leading clinical UI platform architectures, Lit web components, and Agentic AI accelerators.",
      metrics: "HIPAA Compliant · WCAG AA",
      achievements: [
        "Architected a reusable UI component library using Lit and TypeScript, delivering core interface elements used across multiple regulated clinical applications.",
        "Standardized a rigorous Definition of Done (DoD) incorporating WCAG accessibility, i18n (LTR/RTL), and design tokens to ensure high-fidelity delivery.",
        "Boosted application performance and SEO by engineering automated image optimization pipelines with Sharp and Jimp, resulting in measurably improved Lighthouse scores.",
        "Spearheaded technical accelerators including Agentic SQL Parsers and Patient 360 dashboards to validate feasibility and accelerate presales velocity.",
        "Designed a specialized medical imaging chat POC featuring drag-and-drop validation, clinical study sidebars, and contextual history.",
      ],
      techStack: ["Lit", "TypeScript", "React", "Sharp", "Jimp", "Vitest", "Storybook", "WCAG AA", "i18n"],
    },
    {
      id: "adventum",
      year: "2022 — 2024",
      role: "SDE-2",
      company: "Adventum Student Living",
      location: "Lower Parel, Mumbai",
      tagline: "Engineered scalable web applications for UniAcco, UniScholars, and UniCreds.",
      metrics: "+20% Load Speed · 80% Roadmap",
      achievements: [
        "Optimized websites for Core Web Vitals using Next.js, built-in image optimization, and global CDN, driving a 20% improvement in page load speed.",
        "Modernized legacy JavaScript codebase with Next.js, reducing bug resolution time by 20%.",
        "Shortened agent interaction times, allowing the operations team to handle 15% more calls per day.",
        "Successfully implemented features covering 80% of the long-term product roadmap in high-concurrency environments.",
      ],
      techStack: ["Next.js", "React", "TypeScript", "Node.js", "Vite", "Core Web Vitals", "Lighthouse"],
    },
    {
      id: "lodha",
      year: "2021 — 2022",
      role: "Senior Executive - Technology",
      company: "The House of Abhinandan Lodha",
      location: "Lower Parel, Mumbai",
      tagline: "Led architectural strategy and deployment frameworks for luxury digital real-estate experiences.",
      metrics: "Architecture & Scale",
      achievements: [
        "Collaborated with business teams to architect and deliver high-converting digital product experiences.",
        "Led full project setup with modern architecture patterns, deployment strategies, and CI/CD pipelines.",
        "Managed development pods and code quality standards with focused unit testing and performance tuning.",
      ],
      techStack: ["React", "TypeScript", "Node.js", "Docker", "AWS", "Architecture Design"],
    },
    {
      id: "multiliving",
      year: "2020 — 2021",
      role: "Software Engineer",
      company: "MultiLiving Technologies",
      location: "Lower Parel, Mumbai",
      tagline: "Engineered real-time dynamic flat rental platforms and core mobile computing systems.",
      metrics: "Real-Time Systems",
      achievements: [
        "Built the core framework for a dynamic flat rental portal allowing users to check real-time apartment availability and specifications.",
        "Collaborated with business units to design application systems enhancing mobile computing capabilities.",
        "Consistently delivered unit-tested systems within client-prescribed launch timeframes.",
      ],
      techStack: ["JavaScript", "React", "Node.js", "REST APIs", "Unit Testing"],
    },
    {
      id: "cloudesign",
      year: "2018 — 2020",
      role: "SDE-I",
      company: "Cloudesign Technology Solutions",
      location: "Vikhroli, Mumbai",
      tagline: "Delivered scalable full-stack web solutions and agile client deliverables.",
      metrics: "7+ Yrs Total Exp",
      achievements: [
        "Collaborated with Product Managers and QA engineers to develop clear technical specifications and resolve complex edge cases.",
        "Improved system throughput and user experience by making proactive adjustments and addressing performance bottlenecks.",
      ],
      techStack: ["JavaScript", "HTML5/SCSS", "Python", "MySQL", "Git"],
    },
  ],

  projects: [
    {
      id: "odin-eye",
      title: "odin-eye",
      category: "Multimodal AI & Reverse Engineering",
      description:
        "The all-seeing ethical AI crawler & full-stack reverse-engineering engine. Respects robots.txt while deconstructing modern web apps into relational database ERDs, REST API contracts, UI tokens, and executive boardroom PDF blueprints using multimodal vision and local ChromaDB RAG.",
      path: "/odin-eye",
      isExternal: false,
      githubUrl: "https://github.com",
      tags: ["Python", "Multimodal AI", "ChromaDB RAG", "System Architecture"],
      featured: true,
    },
    {
      id: "tryy",
      title: "Tryy (tryy.in)",
      category: "Consumer Platform & Growth",
      description:
        "A high-traffic platform where global brands provide free trial samples of products directly to consumers. High-volume user redemption workflows, real-time logistics tracking, and verified engagement.",
      path: "https://tryy.in",
      isExternal: true,
      githubUrl: "https://github.com",
      liveUrl: "https://tryy.in",
      tags: ["Full-Stack", "High Traffic", "React", "Node.js", "Production"],
      featured: true,
    },
    {
      id: "multiliving",
      title: "MultiLiving Platform",
      category: "Real Estate & Real-Time Data",
      description:
        "Dynamic apartment rental web platform engineered for real-time inventory inspection, interactive property walkthroughs, and tenant onboarding with strict unit-testing coverage.",
      path: "https://github.com",
      isExternal: true,
      githubUrl: "https://github.com",
      tags: ["React", "Dynamic State", "REST APIs", "Unit Testing"],
    },
    {
      id: "aditya-birla",
      title: "Aditya Birla Calculators",
      category: "Financial Modeling & Algorithms",
      description:
        "Engineered comprehensive financial calculators for Aditya Birla, including Earning Potential, Child Education, and Retirement projection calculators with instant interactive visual graphing.",
      path: "https://github.com",
      isExternal: true,
      githubUrl: "https://github.com",
      tags: ["Algorithms", "Financial Modeling", "Data Viz", "TypeScript"],
    },
    {
      id: "ui-store",
      title: "UI-store",
      category: "Design Systems & Component Library",
      description:
        "A modular collection of reusable frontend components, interactive UI patterns, and clean design tokens engineered for rapid full-stack prototyping, high design fidelity, and seamless developer ergonomics.",
      path: "https://github.com",
      isExternal: true,
      githubUrl: "https://github.com",
      tags: ["Design Systems", "Tokens", "Lit / Web Components", "CSS"],
    },
    {
      id: "itpo",
      title: "ipo (ITPO)",
      category: "Financial Analytics & Market Listings",
      description:
        "TypeScript-powered full-stack application designed for tracking, analyzing, and visualizing Initial Public Offerings (IPOs), market listings, and structured financial data workflows. Deployed to edge production.",
      path: "/itpo",
      isExternal: false,
      githubUrl: "https://github.com",
      tags: ["TypeScript", "Financial Data", "Full-Stack", "Web App"],
    },
  ],

  skills: [
    {
      title: "AI & Vector Engineering",
      skills: ["Multimodal AI", "ChromaDB RAG", "Vector DBs", "Embeddings", "Python", "Local RAG"],
    },
    {
      title: "Full-Stack & Backend APIs",
      skills: ["TypeScript", "Python", "JavaScript", "Node.js", "REST APIs", "System Architecture"],
    },
    {
      title: "Databases & ORMs",
      skills: ["PostgreSQL", "Supabase", "MongoDB", "Drizzle ORM", "SQL Schema Design"],
    },
    {
      title: "Cloud & Infrastructure",
      skills: ["Google Cloud", "Railway", "Docker", "Vercel Edge", "Git", "Makefile"],
    },
    {
      title: "Frontend & Design Systems",
      skills: ["Next.js", "React", "Tailwind CSS", "SCSS", "UI-store", "Responsive Design"],
    },
    {
      title: "Developer Tooling & Automation",
      skills: ["Shell / Bash", "CLI Engineering", "Automated Pipelines", "Debugging", "Performance Profiling"],
    },
  ],

  faq: [
    {
      question: "What is your primary engineering focus and specialization?",
      answer:
        "I am a Senior Software Engineer with 7+ years of experience specializing in healthcare design systems, high-performance UI platforms, and multimodal AI accelerators. I architect token-driven component libraries using Lit and TypeScript, standardize WCAG AA accessibility, and build high-throughput full-stack applications with React, Next.js, and Python.",
    },
    {
      question: "How do you achieve 100/100 Lighthouse and Core Web Vitals scores?",
      answer:
        "Performance is engineered into the system architecture from day one. I implement automated asset optimization pipelines (using Sharp and Jimp), eliminate render-blocking dependencies, utilize Next.js Server Components with streaming, ensure zero Cumulative Layout Shift (CLS), and maintain sub-1.5s Largest Contentful Paint (LCP) benchmarks.",
    },
    {
      question: "What experience do you have with AI, Vector RAG, and Reverse Engineering?",
      answer:
        "I engineered 'odin-eye', an autonomous reverse-engineering engine combining multimodal vision models with local ChromaDB RAG to deconstruct production web applications into relational ERDs, OpenAPI contracts, and design tokens. At CitiusTech, I also spearheaded Agentic SQL Parsers and specialized medical imaging chat POCs to accelerate feasibility validation.",
    },
    {
      question: "What roles and collaboration opportunities are you open to?",
      answer:
        "I am available for Senior Software Engineer, Lead Design Systems Architect, and Full-Stack AI Engineer positions, as well as select architectural consulting for organizations building high-fidelity web platforms or regulated clinical systems.",
    },
    {
      question: "Where can I view or download your complete official resume?",
      answer:
        "You can download my complete CV directly from this website via the header or hero/footer CTAs (/resume/Nikhil_Alakri_Resume_CitiusTech.pdf), or reach out directly at contact@nikhilalakri.tech.",
    },
  ],
};

export default PORTFOLIO_DATA;

