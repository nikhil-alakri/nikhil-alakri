import Link from "next/link";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "ITPO Live App | Nikhil Alakri",
  description:
    "Live production deployment of the ITPO Financial Analytics and Market Listings application.",
};

export default function ItpoLivePage() {
  return (
    <div className="flex flex-col h-screen w-full bg-background text-bodytext overflow-hidden">
      {/* Top Bar Navigation */}
      <header className="h-14 bg-background/95 backdrop-blur-md border-b border-surface-border px-4 sm:px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-mutedtext hover:text-headline transition-colors py-1 px-2.5 rounded-lg bg-surface border border-surface-border"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-status animate-status-pulse shrink-0" />
            <h1 className="font-primary text-xs sm:text-sm font-bold text-headline truncate">
              ITPO Platform
            </h1>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-accent bg-surface-elevated px-2 py-0.5 rounded border border-surface-border">
              <ShieldCheck className="w-3 h-3 text-status" />
              nikhilalakri.tech/itpo
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://itpo.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-mutedtext hover:text-headline transition-colors py-1 px-2.5 rounded-lg bg-surface border border-surface-border"
            title="Open direct vercel URL in new window"
          >
            <span className="hidden sm:inline">Direct Link</span>
            <ExternalLink className="w-3.5 h-3.5 text-accent" />
          </a>
        </div>
      </header>

      {/* Embedded Live Application */}
      <main className="flex-grow w-full h-[calc(100vh-3.5rem)] relative bg-background">
        <iframe
          src="https://itpo.vercel.app/"
          title="ITPO Platform Live Application"
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </main>
    </div>
  );
}
