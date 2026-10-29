import type { Metadata, Viewport } from "next";
import "./globals.scss";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#113946",
};

export const metadata: Metadata = {
  title: "Nikhil Alakri | Software Engineer & Open Source Builder",
  description:
    "Personal portfolio of Nikhil Alakri. Specializing in distributed systems, high-performance cloud infrastructure, and developer tooling.",
  metadataBase: new URL("https://nikhilalakri.tech"),
  openGraph: {
    title: "Nikhil Alakri | Software Engineer",
    description:
      "Specializing in distributed systems, high-performance cloud infrastructure, and developer tooling.",
    url: "https://nikhilalakri.tech",
    siteName: "Nikhil Alakri Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikhil Alakri | Software Engineer",
    description:
      "Specializing in distributed systems, high-performance cloud infrastructure, and developer tooling.",
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
