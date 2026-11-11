
import InteractiveTerminal from "@/components/InteractiveTerminal";
import ScrollReveal from "@/components/ScrollReveal";
import { Terminal } from "lucide-react";

export default function TerminalSection() {
  return (
    <section id="terminal" className="py-12 sm:py-20 relative z-10 border-t border-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal animation="fadeUp" className="mb-6 sm:mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono tracking-widest uppercase text-mint/80 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-mint" />
              <span>02 · Developer Console</span>
            </div>
            <h2 className="font-display font-light text-3xl sm:text-5xl lg:text-6xl text-headline tracking-[-0.04em] leading-[1.08]">
              Interactive CLI <span className="font-serif italic text-amber">Shell</span>
            </h2>
          </div>
          <p className="text-mutedtext text-xs sm:text-sm font-mono">
            Type <span className="text-mint font-medium">help</span> or <span className="text-mint font-medium">resume</span> to trigger live actions
          </p>
        </ScrollReveal>

        <ScrollReveal animation="scaleUp" delay={0.08}>
          <InteractiveTerminal />
        </ScrollReveal>
      </div>
    </section>
  );
}

