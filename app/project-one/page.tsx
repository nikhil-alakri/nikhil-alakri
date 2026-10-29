import Link from "next/link";
import { ArrowLeft, Cpu, Server, Database, ShieldAlert, Github, ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Project One Case Study | Nikhil Alakri",
  description: "High-scale resilient cloud architecture and data processing workflows.",
};

export default function ProjectOnePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-bodytext">
      <main className="max-w-4xl mx-auto px-6 pt-16 pb-24 flex-grow">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-mutedtext hover:text-headline transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-surface border border-accent/30 text-accent mb-4">
          <Cpu className="w-3.5 h-3.5" />
          Distributed Architecture
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-headline tracking-tight mb-4">
          Project One
        </h1>

        <p className="text-xl text-bodytext leading-relaxed mb-8">
          A fault-tolerant cloud platform built to orchestrate high-concurrency event workflows,
          providing automated failover, intelligent rate throttling, and distributed transactional consistency.
        </p>

        <div className="flex flex-wrap items-center gap-4 pb-10 border-b border-surface-border mb-12">
          <a
            href="https://github.com/nikhil-alakri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-headline text-sm font-medium hover:border-accent transition-colors"
          >
            <Github className="w-4 h-4" />
            View Repository
            <ExternalLink className="w-3.5 h-3.5 text-accent" />
          </a>
          <span className="text-xs text-mutedtext font-mono">Path: <code className="text-accent">nikhilalakri.tech/project-one</code></span>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-headline mb-4">System Design Goals</h2>
            <p className="leading-relaxed">
              When orchestrating multi-step async operations, transient failures can lead to duplicate executions
              and state drift. Project One incorporates distributed idempotency keys, write-ahead event journaling,
              and hierarchical retry queues to ensure reliable delivery even under adverse network partitioning.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-headline mb-6">Core Engineering Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-surface border border-surface-border hover:border-accent transition-colors">
                <Server className="w-5 h-5 text-accent mb-3" />
                <h3 className="font-semibold text-headline mb-1">Idempotent Event Handlers</h3>
                <p className="text-sm text-bodytext">Atomic lock validation guarantees single execution semantics across replicated workers.</p>
              </div>
              <div className="p-5 rounded-xl bg-surface border border-surface-border hover:border-accent transition-colors">
                <Database className="w-5 h-5 text-accent mb-3" />
                <h3 className="font-semibold text-headline mb-1">Multi-Tier Caching</h3>
                <p className="text-sm text-bodytext">Local in-memory LRU combined with Redis cluster caching to cut database load by 80%.</p>
              </div>
              <div className="p-5 rounded-xl bg-surface border border-surface-border hover:border-accent transition-colors">
                <ShieldAlert className="w-5 h-5 text-accent mb-3" />
                <h3 className="font-semibold text-headline mb-1">Dead-Letter Isolation</h3>
                <p className="text-sm text-bodytext">Unrecoverable payloads are safely cordoned into dead-letter sinks with replay tooling.</p>
              </div>
              <div className="p-5 rounded-xl bg-surface border border-surface-border hover:border-accent transition-colors">
                <Cpu className="w-5 h-5 text-status mb-3" />
                <h3 className="font-semibold text-headline mb-1">Adaptive Throttling</h3>
                <p className="text-sm text-bodytext">Sliding token bucket rate limiter protects upstream services from traffic spikes.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-headline mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {["TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS", "GitHub Actions"].map((tech) => (
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
