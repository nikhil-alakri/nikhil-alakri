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
      <body className="bg-background text-bodytext font-sans antialiased selection:bg-accent/30 selection:text-headline">
        {/* Living Ambient Aurora Background */}
        <div className="bg-canvas" aria-hidden="true">
          {/* Hardware-accelerated glowing orbs */}
          <div className="aurora-glow-1 absolute -top-32 -left-20 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] rounded-full bg-accent/20 blur-[90px] sm:blur-[140px]" />
          <div className="aurora-glow-2 absolute top-1/3 -right-24 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] rounded-full bg-emerald-500/12 blur-[80px] sm:blur-[130px]" />
        </div>

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
