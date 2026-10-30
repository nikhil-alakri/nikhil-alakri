import type { Metadata, Viewport } from "next";
import "./globals.scss";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
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
    default: "Nikhil Alakri | Full-Stack & AI Engineer",
    template: "%s | Nikhil Alakri",
  },
  description:
    "Official portfolio of Nikhil Alakri. Full-Stack & AI Engineer based in Maharashtra, India. Specializing in multimodal AI, local ChromaDB RAG, TypeScript, Python, and high-performance cloud architectures.",
  keywords: [
    "Nikhil Alakri",
    "nikhil alakri",
    "nikhilalakri",
    "nikhilalakri.tech",
    "Nikhil Alakri portfolio",
    "Full-Stack & AI Engineer",
    "AI Engineer India",
    "Software Engineer Maharashtra",
    "Multimodal AI",
    "RAG Pipelines",
    "ChromaDB RAG",
    "odin-eye",
    "UI-store",
    "TypeScript",
    "Python",
    "Next.js 15",
    "PostgreSQL",
    "Supabase",
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
    title: "Nikhil Alakri | Full-Stack & AI Engineer",
    description:
      "Building in public & shipping end-to-end applications — from high-craft frontend interfaces to vector-backed AI engines.",
    url: SITE_URLS.baseUrl,
    siteName: "Nikhil Alakri",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nikhil Alakri - Full-Stack & AI Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikhil Alakri | Full-Stack & AI Engineer",
    description:
      "Building in public & shipping end-to-end applications — from high-craft frontend interfaces to vector-backed AI engines.",
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
  jobTitle: "Full-Stack & AI Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Independent / Open Source Builder",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "Maharashtra",
    addressCountry: "India",
  },
  sameAs: [
    SITE_URLS.socials.github,
    SITE_URLS.socials.linkedin,
  ],
  description:
    "Full-Stack & AI Engineer specializing in multimodal AI & RAG pipelines, high-craft web applications, and scalable backend APIs.",
  knowsAbout: [
    "Artificial Intelligence",
    "Multimodal AI",
    "Retrieval-Augmented Generation (RAG)",
    "ChromaDB",
    "TypeScript",
    "Python",
    "Next.js",
    "PostgreSQL",
    "Full-Stack Web Development",
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
          href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
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
        {/* Living Ambient Aurora Background (Zero blur compositing cost) */}
        <div className="bg-canvas" aria-hidden="true" />

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
