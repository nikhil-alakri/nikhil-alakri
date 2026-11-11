// Case-study content shared by the home showcase, /work/$slug pages and the AI project matcher.
// Facts come from Nikhil's resume and public GitHub repositories.
export type PreviewKind = "blueprint" | "tokens" | "market" | "trial" | "rental" | "calculator" | "clinical" | "flight";

export interface CaseStudy {
  slug: string;
  title: string;
  label: string;
  headline: string;
  summary: string;
  preview: PreviewKind;
  period: string;
  organisation: string;
  tags: string[];
  skills: string[];
  goals: string[];
  role: { title: string; points: string[] };
  process: { step: string; detail: string }[];
  outcomes: { value: string; label: string }[];
  retrospective: string;
  repoUrl?: string;
  liveUrl?: string;
}

const GH = "https://github.com/nikhil-alakri";

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "odin-eye",
    title: "odin-eye",
    label: "AI & developer tools",
    headline: "From complex websites to clear system blueprints.",
    summary: "An ethical AI crawler that respects robots.txt and rate limits while deconstructing web apps into database ERDs, REST API contracts, UI design tokens and executive PDF blueprints, using multimodal vision and local ChromaDB RAG.",
    preview: "blueprint",
    period: "2026 · v1.0.0",
    organisation: "Open source · MIT licence",
    tags: ["Python", "Multimodal AI", "ChromaDB"],
    skills: ["Python", "FastAPI", "Playwright", "Multimodal AI", "NVIDIA NIM Vision", "RAG", "ChromaDB", "System architecture"],
    goals: [
      "Turn undocumented web applications into reviewable architecture documentation.",
      "Respect robots.txt and rate limits by default — discovery must be ethical.",
      "Keep captured payloads local with an on-device ChromaDB index.",
    ],
    role: { title: "Creator & sole engineer", points: ["Designed the crawl → understand → map pipeline.", "Built the FastAPI service and dual-engine Playwright crawler.", "Designed the blueprint and PDF report outputs."] },
    process: [
      { step: "Crawl", detail: "A dual-engine Playwright crawler explores routes within robots.txt and rate limits, capturing DOM, network traffic and screenshots." },
      { step: "Understand", detail: "Multimodal vision models (NVIDIA NIM) interpret screenshots alongside the captured structure." },
      { step: "Index", detail: "Findings are embedded into a local ChromaDB store so later questions stay grounded." },
      { step: "Map", detail: "The engine produces ERDs, REST contracts, design tokens and an executive PDF blueprint." },
    ],
    outcomes: [
      { value: "4", label: "artefacts: ERD, API contract, tokens, PDF" },
      { value: "Local", label: "vector store — no hosted index" },
      { value: "v1.0", label: "released under the MIT licence" },
    ],
    retrospective: "Treating the vision model as a reviewer of structured data — not the source of truth — kept the output dependable.",
    repoUrl: `${GH}/odin-eye`,
  },
  {
    slug: "healthcare-ui-platform",
    title: "Healthcare UI Platform",
    label: "Healthcare · Design systems",
    headline: "One accessible component layer for regulated clinical apps.",
    summary: "A reusable UI component library built with Lit and TypeScript, delivering core interface elements across multiple regulated clinical applications at CitiusTech.",
    preview: "clinical",
    period: "Jul 2024 — Present",
    organisation: "CitiusTech Healthcare Technology",
    tags: ["Lit", "TypeScript", "WCAG"],
    skills: ["Lit", "Web Components", "TypeScript", "React", "Design tokens", "WCAG accessibility", "i18n (LTR/RTL)", "Vitest", "Storybook", "Sharp", "Healthcare", "HIPAA"],
    goals: [
      "Give multiple clinical applications one consistent interface foundation.",
      "Bake accessibility, internationalisation and tokens into every component.",
      "Keep releases auditable and secure in a regulated environment.",
    ],
    role: { title: "Senior Software Engineer", points: ["Architected the Lit + TypeScript component library.", "Standardised the Definition of Done: WCAG, i18n (LTR/RTL) and design tokens.", "Owned versioning and unit testing with Vitest for auditability."] },
    process: [
      { step: "Foundation", detail: "Framework-agnostic Lit web components serve several clinical applications from one library." },
      { step: "Standards", detail: "A shared Definition of Done covers WCAG accessibility, LTR/RTL and token usage." },
      { step: "Quality", detail: "End-to-end versioning and consistent Vitest coverage keep releases auditable." },
      { step: "Performance", detail: "Automated image optimisation pipelines with Sharp and Jimp improved Lighthouse scores and SEO." },
    ],
    outcomes: [
      { value: "Multi-app", label: "one library across clinical applications" },
      { value: "LTR/RTL", label: "internationalised, accessible components" },
      { value: "↑", label: "Lighthouse scores from image pipelines" },
    ],
    retrospective: "In regulated products, the most valuable thing a design system does is make the accessible path the easy path.",
  },
  {
    slug: "ui-store",
    title: "UI-store",
    label: "Frontend · Design systems",
    headline: "Reusable components, built to compose.",
    summary: "A collection of reusable components, interactive UI patterns and clean design tokens for faster prototyping.",
    preview: "tokens",
    period: "2026",
    organisation: "Open source",
    tags: ["UI components", "CSS"],
    skills: ["Design systems", "Design tokens", "Web Components", "CSS", "Accessibility"],
    goals: [
      "Give prototypes dependable building blocks from day one.",
      "Make tokens — type, space, colour — the source of visual truth.",
      "Ship accessible defaults for focus, contrast and keyboard behaviour.",
    ],
    role: { title: "Creator & maintainer", points: ["Designed the token structure.", "Built the component and pattern set.", "Documents usage for each pattern."] },
    process: [
      { step: "Collect", detail: "Gathered recurring patterns from real projects to decide what deserves a component." },
      { step: "Tokenise", detail: "Defined type, spacing and colour scales before writing components." },
      { step: "Compose", detail: "Small primitives combine into larger patterns rather than one-off widgets." },
      { step: "Share", detail: "Published openly so the patterns can be reused." },
    ],
    outcomes: [
      { value: "Tokens", label: "first — one visual source of truth" },
      { value: "Open", label: "source on GitHub" },
      { value: "Reusable", label: "patterns for rapid prototyping" },
    ],
    retrospective: "Starting from tokens rather than components keeps a library consistent as it grows.",
    repoUrl: `${GH}/UI-store`,
  },
  {
    slug: "ipo",
    title: "ipo",
    label: "Full-stack · Financial data",
    headline: "A clearer view of IPO listings and details.",
    summary: "An IPO listing and details interface built with Next.js, TypeScript and Tailwind CSS, pulling listing data from configurable APIs.",
    preview: "market",
    period: "Jun 2024",
    organisation: "Personal project",
    tags: ["TypeScript", "Next.js"],
    skills: ["TypeScript", "Next.js", "React", "Tailwind CSS", "REST APIs", "Financial data"],
    goals: [
      "Bring IPO listings and their details into one readable interface.",
      "Keep data sources configurable through environment settings.",
      "Present dense financial details clearly on any screen.",
    ],
    role: { title: "Full-stack developer", points: ["Built the listing and details pages.", "Integrated the IPO data APIs.", "Deployed the live app on Vercel."] },
    process: [
      { step: "Model", detail: "Typed the listing and detail payloads with TypeScript." },
      { step: "List", detail: "A listing page surfaces upcoming and current IPOs at a glance." },
      { step: "Detail", detail: "Detail pages break down each offering's information." },
      { step: "Ship", detail: "Deployed to Vercel at ipo-data.vercel.app." },
    ],
    outcomes: [
      { value: "2", label: "core views: listings and details" },
      { value: "Live", label: "deployed on Vercel" },
      { value: "Typed", label: "TypeScript end to end" },
    ],
    retrospective: "Modelling the data first made each screen simpler to build.",
    liveUrl: "https://ipo-data.vercel.app/",
    repoUrl: `${GH}/ipo`,
  },
  {
    slug: "flight-search",
    title: "flight-search",
    label: "Full-stack · Search",
    headline: "Flight discovery and itinerary comparison.",
    summary: "A Next.js and TypeScript flight search interface with dynamic filters and API integration.",
    preview: "flight",
    period: "Jun 2024",
    organisation: "Personal project",
    tags: ["TypeScript", "API integration"],
    skills: ["TypeScript", "Next.js", "React", "API integration", "Search & filtering"],
    goals: [
      "Let travellers search routes and compare itineraries quickly.",
      "Keep filters responsive as results change.",
      "Integrate external flight data cleanly.",
    ],
    role: { title: "Frontend developer", points: ["Built the search and results interface.", "Implemented dynamic filtering.", "Integrated the flight data API."] },
    process: [
      { step: "Search", detail: "Origin, destination and date inputs drive the query." },
      { step: "Fetch", detail: "Results come from an external flight API." },
      { step: "Filter", detail: "Dynamic filters narrow itineraries without reloading." },
      { step: "Compare", detail: "Results are laid out for side-by-side comparison." },
    ],
    outcomes: [
      { value: "Dynamic", label: "filters over live results" },
      { value: "Next.js", label: "+ TypeScript build" },
      { value: "Open", label: "source on GitHub" },
    ],
    retrospective: "Good search UI is mostly good filtering — that's where the time went.",
    repoUrl: `${GH}/flight-search`,
  },
  {
    slug: "tryy",
    title: "Tryy",
    label: "Consumer platform",
    headline: "Free product trials from brands, straight to consumers.",
    summary: "A platform where brands provide trial samples of their products to consumers for free.",
    preview: "trial",
    period: "2018 — Present",
    organisation: "tryy.in",
    tags: ["React", "Node.js", "Full-stack"],
    skills: ["React", "Node.js", "Full-stack", "Consumer products"],
    goals: [
      "Connect brands with consumers who want to try their products.",
      "Make claiming a free sample simple for consumers.",
      "Give brands a direct channel for product trials.",
    ],
    role: { title: "Engineer", points: ["Builds and maintains the platform since 2018.", "Works across the consumer and brand experience."] },
    process: [
      { step: "Discover", detail: "Consumers browse trial offers from brands." },
      { step: "Claim", detail: "Consumers request free samples." },
      { step: "Deliver", detail: "Brands get products into consumers' hands." },
      { step: "Learn", detail: "Brands gain direct engagement from trial users." },
    ],
    outcomes: [
      { value: "2018", label: "running since" },
      { value: "Live", label: "at tryy.in" },
      { value: "Free", label: "trials for consumers" },
    ],
    retrospective: "A long-running product teaches you to value maintainable code over clever code.",
    liveUrl: "https://tryy.in",
  },
  {
    slug: "multiliving",
    title: "MultiLiving",
    label: "Proptech · Real-time data",
    headline: "Real-time apartment details for renters.",
    summary: "A dynamic flat-rental website where users can check real-time apartment details.",
    preview: "rental",
    period: "Feb 2020 — Sep 2021",
    organisation: "MultiLiving Technologies Pvt. Ltd.",
    tags: ["React", "Unit testing"],
    skills: ["React", "JavaScript", "REST APIs", "Unit testing", "Mobile web", "Proptech"],
    goals: [
      "Show renters accurate, real-time apartment details.",
      "Strengthen mobile capabilities with business teams.",
      "Deliver unit-tested systems within customer timelines.",
    ],
    role: { title: "Software Engineer", points: ["Designed new application systems with business units.", "Wrote the maintainable core framework code.", "Delivered unit-tested features on schedule."] },
    process: [
      { step: "Plan", detail: "Worked with business units to define new application systems." },
      { step: "Build", detail: "Wrote the core framework the rest of the product relied on." },
      { step: "Test", detail: "Unit tests covered the systems before release." },
      { step: "Deliver", detail: "Shipped within customer-prescribed timeframes." },
    ],
    outcomes: [
      { value: "Real-time", label: "apartment details" },
      { value: "Core", label: "framework authored" },
      { value: "On time", label: "unit-tested delivery" },
    ],
    retrospective: "Code other developers praise is code that's easy to change.",
  },
  {
    slug: "aditya-birla",
    title: "Aditya Birla Calculators",
    label: "Fintech · Algorithms",
    headline: "Making long-term financial decisions easier to understand.",
    summary: "Earning Potential, Child Education and Retirement calculators that turn financial formulas into clear, interactive projections.",
    preview: "calculator",
    period: "Client project",
    organisation: "Aditya Birla",
    tags: ["TypeScript", "Data viz"],
    skills: ["TypeScript", "JavaScript", "Algorithms", "Data visualisation", "Financial modelling"],
    goals: [
      "Help users see how today's choices affect future outcomes.",
      "Turn financial formulas into accurate interactive tools.",
      "Keep the calculators simple on any device.",
    ],
    role: { title: "Engineer", points: ["Engineered the Earning Potential calculator.", "Engineered the Child Education calculator.", "Engineered the Retirement calculator."] },
    process: [
      { step: "Translate", detail: "Converted financial formulas into tested functions." },
      { step: "Build", detail: "Created three calculators with shared input patterns." },
      { step: "Visualise", detail: "Projections are shown visually so results are easy to grasp." },
      { step: "Refine", detail: "Inputs are tuned for comfortable use on phones." },
    ],
    outcomes: [
      { value: "3", label: "calculators shipped" },
      { value: "Visual", label: "projections for every result" },
      { value: "Mobile", label: "friendly inputs" },
    ],
    retrospective: "Clarity is a feature: one honest chart beats a page of numbers.",
  },
];

export const getCaseStudy = (slug: string) => CASE_STUDIES.find(c => c.slug === slug);
