
import { useEffect, useState } from "react";
import Link from "@/lib/next-link";
import { usePathname } from "@/lib/next-navigation";
import { FileDown, Menu } from "lucide-react";
import PORTFOLIO_DATA from "@/data/portfolio";
import SoundToggle from "@/components/SoundToggle";
import { soundManager } from "@/lib/audio";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { name: "Work", href: "#projects", sectionId: "projects" },
  { name: "Expertise", href: "#pillars", sectionId: "pillars" },
  { name: "Journey", href: "#experience", sectionId: "career" },
  { name: "Contact", href: "#contact", sectionId: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      const sections = ["hero", "projects", "pillars", "career", "stack", "faq", "contact"];
      const scrollY = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  // Hide on clean routes like /itpo
  if (pathname === "/itpo" || pathname?.startsWith("/itpo/")) {
    return null;
  }

  const handleLinkClick = () => {
    soundManager.playClickSound();
    setMobileMenuOpen(false);
  };

  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/40 border-b border-surface-border/25 transition-all">
        {/* Subtle hairline scroll progress indicator */}
        <div
          className="absolute top-0 left-0 h-[1.5px] bg-mint transition-all duration-75 pointer-events-none opacity-80"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Name Left (Editorial Light Sans) */}
          <Link
            href="/"
            onClick={handleLinkClick}
            className="group flex items-center gap-2 py-1"
          >
            <span className="font-display font-light text-base sm:text-lg tracking-tight text-headline group-hover:text-mint transition-colors">
              {PORTFOLIO_DATA.personal.name}
            </span>
            <span className="text-mint font-serif italic text-sm opacity-80 group-hover:opacity-100 transition-opacity">
              · architect
            </span>
          </Link>

          {/* Desktop Minimal Links (Spread Across, Underline on Active, No Heavy Boxes) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-light">
            {NAV_LINKS.map((item) => {
              const isActive =
                activeSection === item.sectionId ||
                (item.sectionId === "pillars" && activeSection === "hero");

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => soundManager.playClickSound()}
                  className={`relative py-1 tracking-tight transition-colors ${
                    isActive
                      ? "text-mint font-normal"
                      : "text-mutedtext hover:text-headline"
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-mint rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Sound Toggle + Tiny 'Download CV' text link */}
          <div className="hidden md:flex items-center gap-5">
            <SoundToggle />

            <a
              href={PORTFOLIO_DATA.personal.resumeUrl}
              download="Nikhil-Alakri-Resume.pdf"
              onClick={() => soundManager.playClickSound()}
              className="text-xs font-mono text-mutedtext hover:text-mint transition-colors flex items-center gap-1.5 hover:underline py-1"
              title="Download Official Resume PDF"
            >
              <FileDown className="w-3.5 h-3.5 text-mint" />
              <span>Download CV</span>
            </a>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <SoundToggle />
            <SheetTrigger
              aria-label="Open navigation menu"
              className="cursor-pointer rounded-xl p-2 text-headline transition-colors hover:text-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
            >
              <Menu className="size-5" />
            </SheetTrigger>
          </div>
        </div>
      </header>

      <SheetContent className="justify-between px-6 py-16 md:hidden">
        <div className="space-y-6 pt-4 pr-10">
          <div>
            <SheetTitle>{PORTFOLIO_DATA.personal.name}</SheetTitle>
            <SheetDescription className="mt-2 font-mono text-xs uppercase tracking-widest text-mint">
              Navigational Coordinates
            </SheetDescription>
          </div>
          {NAV_LINKS.map((item, idx) => (
            <SheetClose asChild key={item.name}>
              <a
                href={item.href}
                onClick={() => soundManager.playClickSound()}
                className="block rounded-lg py-2 font-display text-4xl font-light text-headline transition-colors hover:text-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
              >
                <span className="mr-4 font-mono text-xs text-mutedtext">0{idx + 1}</span>
                <span>{item.name}</span>
              </a>
            </SheetClose>
          ))}
        </div>

        <div className="space-y-4 border-t border-surface-border/40 pt-8">
          <SheetClose asChild>
            <a
              href={PORTFOLIO_DATA.personal.resumeUrl}
              download="Nikhil-Alakri-Resume.pdf"
              onClick={() => soundManager.playClickSound()}
              className="inline-flex items-center gap-2 py-2 font-mono text-sm font-semibold text-mint"
            >
              <FileDown className="size-4" />
              <span>Download CV (Nikhil-Alakri-Resume.pdf)</span>
            </a>
          </SheetClose>

          <div className="flex items-center gap-5 pt-2 text-xs text-mutedtext">
            <a
              href={PORTFOLIO_DATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-headline"
            >
              GitHub
            </a>
            <a
              href={PORTFOLIO_DATA.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-headline"
            >
              LinkedIn
            </a>
            <a href={PORTFOLIO_DATA.contact.mailto} className="transition-colors hover:text-headline">
              {PORTFOLIO_DATA.contact.email}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
