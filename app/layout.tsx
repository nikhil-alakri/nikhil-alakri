import type { Metadata, Viewport } from "next";
import "./globals.scss";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import InteractiveSpotlight from "@/components/InteractiveSpotlight";
import CustomCursor from "@/components/CustomCursor";
import DynamicSceneCanvas from "@/components/three/DynamicSceneCanvas";
import { SITE_URLS } from "@/config/urls";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#113946",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URLS.baseUrl),
  title: {
    default: "Nikhil Alakri | Senior Software Engineer · UI Platforms & Design Systems",
    template: "%s | Nikhil Alakri",
  },
  description:
    "Official portfolio of Nikhil Alakri. Senior Software Engineer with 7+ years of experience specializing in healthcare design systems, Lit & React component libraries, WCAG AA accessibility, and multimodal AI accelerators.",
  keywords: [
    "Nikhil Alakri",
    "nikhil alakri",
    "nikhilalakri",
    "nikhilalakri.tech",
    "Nikhil Alakri portfolio",
    "Senior Software Engineer",
    "CitiusTech",
    "Adventum Student Living",
    "Design Systems Architect",
    "Lit Web Components",
    "React",
    "TypeScript",
    "Next.js 15",
    "WCAG Accessibility",
    "Healthcare UI",
    "Core Web Vitals",
    "odin-eye",
    "Tryy.in",
    "UI-store",
    "Multimodal AI",
    "ChromaDB RAG",
  ],
  authors: [{ name: "Nikhil Alakri", url: SITE_URLS.baseUrl }],
  creator: "Nikhil Alakri",
  publisher: "Nikhil Alakri",
  alternates: {
    canonical: SITE_URLS.baseUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Nikhil Alakri | Senior Software Engineer",
    description:
      "7+ years architecting enterprise design systems, regulated healthtech platforms, and multimodal AI accelerators.",
    url: SITE_URLS.baseUrl,
    siteName: "Nikhil Alakri",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nikhil Alakri - Senior Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikhil Alakri | Senior Software Engineer",
    description:
      "7+ years architecting enterprise design systems, regulated healthtech platforms, and multimodal AI accelerators.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nikhil Alakri",
  alternateName: ["nikhil alakri", "nikhilalakri"],
  url: SITE_URLS.baseUrl,
  image: `${SITE_URLS.baseUrl}/icon-512.png`,
  jobTitle: "Senior Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "CitiusTech Healthcare Technology Private Limited",
  },
  alumniOf: {
    "@type": "Organization",
    name: "Adventum Student Living",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "Maharashtra",
    addressCountry: "India",
  },
  email: SITE_URLS.contact.email,
  sameAs: [
    SITE_URLS.socials.github,
    SITE_URLS.socials.linkedin,
  ],
  description:
    "Senior Software Engineer with 7+ years of experience specializing in healthcare design systems, Lit & React component platforms, WCAG AA accessibility, and multimodal AI accelerators.",
  knowsAbout: [
    "Healthcare Design Systems",
    "Lit Web Components",
    "React (TSX)",
    "TypeScript",
    "Next.js",
    "WCAG AA Accessibility",
    "Core Web Vitals & Lighthouse Optimization",
    "Multimodal AI & Vector RAG",
    "Python",
    "PostgreSQL",
  ],
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Nikhil Alakri",
  url: SITE_URLS.baseUrl,
  description: "Official portfolio of Nikhil Alakri, Full-Stack & AI Engineer.",
  author: {
    "@type": "Person",
    name: "Nikhil Alakri",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Schema.org Structured Data for Top Google Search Ranking & Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdPerson).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdWebsite).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="bg-background text-bodytext font-sans antialiased selection:bg-accent/30 selection:text-headline">
        {/* Accessible Skip to Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-mint focus:text-background focus:rounded-xl focus:font-semibold focus:shadow-2xl"
        >
          Skip to content
        </a>

        {/* Living Ambient Canvas Background (Zero blur compositing cost) */}
        <div className="bg-canvas" aria-hidden="true" />
        <DynamicSceneCanvas />
        <InteractiveSpotlight />
        <CustomCursor />

        <SmoothScroll>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
