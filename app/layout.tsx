import type { Metadata } from "next";
import "./globals.scss";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";

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
        {/* Living Ambient Background Scene */}
        <div className="bg-scene" aria-hidden="true">
          {/* Floating glowing orbs */}
          <div className="ambient-orb-1 absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px]" />
          <div className="ambient-orb-2 absolute top-1/4 -right-28 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[140px]" />
          <div className="ambient-orb-1 absolute top-2/3 left-1/3 w-[550px] h-[550px] rounded-full bg-accent/10 blur-[130px]" />
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
