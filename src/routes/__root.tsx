import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/SiteHeader";
import PortfolioAudio from "@/components/PortfolioAudio";
import NotFoundComponent from "@/legacy-pages/NotFound";
import { SITE_URLS } from "@/config/urls";

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nikhil Alakri",
  alternateName: ["nikhil alakri", "nikhilalakri"],
  url: SITE_URLS.baseUrl,
  image: `${SITE_URLS.baseUrl}/icon-512.png`,
  jobTitle: "Senior Software Engineer",
  worksFor: { "@type": "Organization", name: "CitiusTech Healthcare Technology Private Limited" },
  alumniOf: { "@type": "Organization", name: "Adventum Student Living" },
  address: { "@type": "PostalAddress", addressRegion: "Maharashtra", addressCountry: "India" },
  email: SITE_URLS.contact.email,
  sameAs: [SITE_URLS.socials.github, SITE_URLS.socials.linkedin],
  description:
    "Senior Software Engineer with 7+ years of experience specializing in healthcare design systems, Lit & React component platforms, WCAG AA accessibility, and multimodal AI accelerators.",
  knowsAbout: [
    "Healthcare Design Systems", "Lit Web Components", "React (TSX)", "TypeScript", "Next.js",
    "WCAG AA Accessibility", "Core Web Vitals & Lighthouse Optimization", "Multimodal AI & Vector RAG",
    "Python", "PostgreSQL",
  ],
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Nikhil Alakri",
  url: SITE_URLS.baseUrl,
  description: "Official portfolio of Nikhil Alakri, Full-Stack & AI Engineer.",
  author: { "@type": "Person", name: "Nikhil Alakri" },
};

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Replace these placeholders with the app's name and description when first building the app.
    // Each content route, / included, must still set its own head(). Never add og:image or
    // twitter:image here: every page without its own would inherit the root's preview image.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
      { name: "theme-color", content: "#F3F3ED" },
      { title: "Nikhil Alakri | Senior Software Engineer · UI Platforms & Design Systems" },
      { name: "description", content: "Official portfolio of Nikhil Alakri. Senior Software Engineer with 7+ years of experience specializing in healthcare design systems, Lit & React component libraries, WCAG AA accessibility, and multimodal AI accelerators." },
      { name: "author", content: "Nikhil Alakri" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:site_name", content: "Nikhil Alakri" },
      { property: "og:locale", content: "en_US" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap" },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "icon", href: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { rel: "icon", href: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/manifest.json" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(jsonLdPerson).replace(/</g, "\\u003c") },
      { type: "application/ld+json", children: JSON.stringify(jsonLdWebsite).replace(/</g, "\\u003c") },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-bodytext font-sans antialiased selection:bg-accent/30 selection:text-headline">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Smooth-scroll same-page hash links on click only. Initial loads with a
  // hash (e.g. /#work) jump instantly, so the page never appears to scroll by itself.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const hash = href.startsWith("#") ? href : href.startsWith("/#") ? href.slice(1) : null;
      if (!hash) return;
      if (href.startsWith("/#") && window.location.pathname !== "/") return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      event.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      window.history.replaceState(null, "", href.startsWith("/#") ? href : `${window.location.pathname}${hash}`);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-lime focus:text-ink focus:rounded-xl focus:font-semibold focus:shadow-2xl"
      >
        Skip to main content
      </a>
      <div className="bg-canvas" aria-hidden="true" />
      <PortfolioAudio />
      <SmoothScroll>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <Outlet />
        </div>
      </SmoothScroll>
    </QueryClientProvider>
  );
}
