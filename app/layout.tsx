import type { Metadata } from "next";
import "./globals.css";
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
      <body className="bg-background text-slate-100 font-sans antialiased selection:bg-sky-500/30 selection:text-white">
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
