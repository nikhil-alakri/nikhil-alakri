import { useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import ProfileAvatar from "@/components/ProfileAvatar";
import SoundToggle from "@/components/SoundToggle";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const LINKS = [
  { name: "Work", href: "/#work" },
  { name: "Projects", href: "/projects" },
  { name: "Expertise", href: "/#expertise" },
  { name: "Experience", href: "/#experience" },
  { name: "Hire me", href: "/#hire" },
  { name: "About", href: "/#about" },
  { name: "Find a fit", href: "/#matcher" },
];

export default function SiteHeader() {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const [open, setOpen] = useState(false);
  if (pathname.startsWith("/itpo")) return null;
  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-background/90 backdrop-blur">
      <div className="site-wrap flex h-16 items-center justify-between gap-4">
        <a href="/" className="hit inline-flex items-center gap-2.5 font-display text-base font-medium text-headline"><ProfileAvatar alt="" size={32} className="size-8 rounded-full object-cover" /><span>nikhil alakri<span className="text-mint">.</span></span></a>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {LINKS.map(l => <a key={l.href} href={l.href} className="hit inline-flex items-center rounded px-3 text-sm text-bodytext transition-colors hover:text-headline">{l.name}</a>)}
        </nav>
        <div className="flex items-center gap-1">
          <SoundToggle />
          <a href="/#contact" className="hit hidden items-center gap-2 rounded-md bg-ink px-4 text-sm text-paper transition-colors hover:bg-ink-soft md:inline-flex">Let's talk <ArrowUpRight className="size-4 text-lime" /></a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="hit inline-flex items-center justify-center rounded-md text-headline md:hidden" aria-label="Open menu" aria-expanded={open}><Menu className="size-5" /></button>
            </SheetTrigger>
            <SheetContent className="w-[88vw] max-w-sm border-surface-border bg-background p-6">
              <SheetTitle className="font-display text-headline">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <nav aria-label="Mobile" className="mt-8 flex flex-col">
                {LINKS.map(l => <SheetClose asChild key={l.href}><a href={l.href} className="flex min-h-12 items-center border-b border-surface-border font-display text-2xl text-headline">{l.name}</a></SheetClose>)}
              </nav>
              <SheetClose asChild><a href="/#contact" className="mt-8 flex min-h-12 items-center justify-between rounded-md bg-lime px-4 font-medium text-ink">Let's talk <ArrowUpRight className="size-4" /></a></SheetClose>
              <div className="mt-6 flex items-center gap-2 text-sm text-bodytext"><SoundToggle /> Sound</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
