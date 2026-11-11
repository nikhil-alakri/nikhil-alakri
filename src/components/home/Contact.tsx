import { ArrowUpRight } from "lucide-react";
import PORTFOLIO_DATA from "@/data/portfolio";
import { SITE_URLS } from "@/config/urls";

const EMAIL = SITE_URLS.contact.email;

export default function Contact() {
  return (
    <footer id="contact" className="bg-sage">
      <div className="site-wrap py-16 md:py-24">
        <div className="flex flex-wrap justify-between gap-2"><p className="mono-label">07 / What's next?</p><p className="mono-label">Good software starts with a conversation.</p></div>
        <div className="mt-6 grid items-end gap-8 md:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="font-display text-4xl font-normal leading-tight text-headline md:text-6xl">Let's build something meaningful.</h2>
            <p className="mt-4 text-sm text-bodytext">Have a challenging problem or an interesting opportunity? Let's talk.</p>
            <a href={`mailto:${EMAIL}`} className="mt-6 inline-flex min-h-12 items-center font-display text-xl text-headline underline-offset-4 hover:underline">{EMAIL}</a>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <a href={`mailto:${EMAIL}`} className="inline-flex min-h-12 w-full items-center justify-between gap-8 rounded-md bg-lime px-5 font-medium text-ink md:w-48">Say hello <ArrowUpRight className="size-4" /></a>
            <div className="flex gap-6 text-sm text-headline">
              <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noopener noreferrer" className="hit inline-flex items-center gap-1">GitHub <ArrowUpRight className="size-3" /></a>
              <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hit inline-flex items-center gap-1">LinkedIn <ArrowUpRight className="size-3" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="site-wrap flex flex-wrap items-center justify-between gap-3 border-t border-surface-border py-5 text-xs text-bodytext">
        <span>© Nikhil Alakri</span><span className="mono-label hidden sm:inline">Thoughtfully built. Always evolving.</span><a href="#hero" className="hit inline-flex items-center">Back to top ↑</a>
      </div>
    </footer>
  );
}
