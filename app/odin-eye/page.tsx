import Link from "next/link";
import { ArrowLeft, Eye, Terminal, Shield, Sparkles, Github, ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "odin-eye Case Study | Nikhil Alakri",
  description: "The all-seeing ethical AI crawler & full-stack reverse-engineering engine built with Python, Multimodal AI, and local ChromaDB RAG.",
};

export default function OdinEyePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-bodytext">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-20 sm:pb-24 flex-grow">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-mutedtext hover:text-headline transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-surface border border-accent/30 text-accent mb-4">
          <Eye className="w-3.5 h-3.5" />
          Ethical AI Crawler &amp; Reverse-Engineering Engine
        </div>

        <h1 className="font-primary text-4xl sm:text-6xl font-extrabold text-headline tracking-tight mb-4">
          odin-eye
        </h1>

        <p className="text-xl text-bodytext leading-relaxed mb-8">
          The all-seeing ethical AI crawler &amp; full-stack reverse-engineering engine. Respects <code>robots.txt</code> and rate limits by default while deconstructing modern web apps into relational database ERDs, REST API contracts, UI design tokens, and executive boardroom PDF blueprints using multimodal vision and local ChromaDB RAG.
        </p>

        <div className="flex flex-wrap items-center gap-4 pb-10 border-b border-surface-border mb-12">
          <a
            href="https://github.com/nikhil-alakri/odin-eye"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-headline text-sm font-medium hover:border-accent transition-colors"
          >
            <Github className="w-4 h-4" />
            View Repository on GitHub
            <ExternalLink className="w-3.5 h-3.5 text-accent" />
          </a>
          <span className="text-xs text-mutedtext font-mono">Path: <code className="text-accent">/odin-eye</code></span>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="font-primary text-2xl font-bold text-headline mb-4">The Mission</h2>
            <p className="leading-relaxed">
              Modern digital systems are complex and often poorly documented. odin-eye addresses this by autonomously inspecting frontends, network traces, and public interfaces to reconstruct complete software blueprints — empowering engineering teams to understand legacy architectures, generate typed OpenAPI specs, and synthesize clean relational models without invasive codebase access.
            </p>
          </section>

          <section>
            <h2 className="font-primary text-2xl font-bold text-headline mb-6">Key Capabilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-surface border border-surface-border hover:border-accent transition-colors">
                <Sparkles className="w-5 h-5 text-accent mb-3" />
                <h3 className="font-semibold text-headline mb-1">Multimodal Vision Inspection</h3>
                <p className="text-sm text-bodytext">Analyzes visual UI hierarchies, layout flows, and interactive components using advanced vision models.</p>
              </div>
              <div className="p-5 rounded-xl bg-surface border border-surface-border hover:border-accent transition-colors">
                <Terminal className="w-5 h-5 text-accent mb-3" />
                <h3 className="font-semibold text-headline mb-1">Local ChromaDB RAG</h3>
                <p className="text-sm text-bodytext">Embeds and indexes captured DOM structures and API payloads locally for zero-latency semantic querying.</p>
              </div>
              <div className="p-5 rounded-xl bg-surface border border-surface-border hover:border-accent transition-colors">
                <Shield className="w-5 h-5 text-status mb-3" />
                <h3 className="font-semibold text-headline mb-1">Ethical by Design</h3>
                <p className="text-sm text-bodytext">Strictly adheres to robots.txt guidelines, implements intelligent rate-limiting, and minimizes network footprint.</p>
              </div>
              <div className="p-5 rounded-xl bg-surface border border-surface-border hover:border-accent transition-colors">
                <Eye className="w-5 h-5 text-accent mb-3" />
                <h3 className="font-semibold text-headline mb-1">Executive Blueprints &amp; ERDs</h3>
                <p className="text-sm text-bodytext">Compiles reconstructed entity relationships and API contracts into executive boardroom PDF reports.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-primary text-2xl font-bold text-headline mb-4">Architecture &amp; Tech Stack</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Python", "Multimodal AI", "ChromaDB RAG", "System Architecture", "OpenAPI", "PDF Generation"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-surface border border-surface-border text-bodytext text-sm font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
