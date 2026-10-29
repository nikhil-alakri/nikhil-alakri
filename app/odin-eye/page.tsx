import Link from "next/link";
import { ArrowLeft, Activity, Terminal, Shield, Cpu, Github, ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Odin Eye Case Study | Nikhil Alakri",
  description: "Real-time distributed observability and telemetry platform built with Go, eBPF, and ClickHouse.",
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
          <Activity className="w-3.5 h-3.5" />
          Observability Platform
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-headline tracking-tight mb-4">
          Odin Eye
        </h1>

        <p className="text-xl text-bodytext leading-relaxed mb-8">
          A high-throughput distributed telemetry daemon and visualization engine designed to capture
          low-level kernel events, trace request journeys across microservices, and detect anomalies in real time.
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
          <span className="text-xs text-mutedtext font-mono">Path: <code className="text-accent">/odin-eye</code></span>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-headline mb-4">The Challenge</h2>
            <p className="leading-relaxed">
              Traditional application performance monitoring (APM) often incurs significant runtime
              overhead and requires extensive manual code instrumentation. Odin Eye was designed to leverage
              eBPF to safely probe kernel-level TCP/HTTP sockets without requiring application restarts or invasive
              SDK wrappers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-headline mb-6">Key Capabilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-surface border border-surface-border hover:border-accent transition-colors">
                <Terminal className="w-5 h-5 text-accent mb-3" />
                <h3 className="font-semibold text-headline mb-1">eBPF Kernel Probing</h3>
                <p className="text-sm text-bodytext">Zero-overhead request tracing and socket latency inspection at the OS level.</p>
              </div>
              <div className="p-5 rounded-xl bg-surface border border-surface-border hover:border-accent transition-colors">
                <Cpu className="w-5 h-5 text-accent mb-3" />
                <h3 className="font-semibold text-headline mb-1">Sliding-Window Anomaly Scoring</h3>
                <p className="text-sm text-bodytext">Dynamically calculates z-score deviations across latency percentiles (p95, p99).</p>
              </div>
              <div className="p-5 rounded-xl bg-surface border border-surface-border hover:border-accent transition-colors">
                <Activity className="w-5 h-5 text-status mb-3" />
                <h3 className="font-semibold text-headline mb-1">OpenTelemetry Native</h3>
                <p className="text-sm text-bodytext">Seamlessly exports spans and metrics into ClickHouse, Grafana, or Jaeger.</p>
              </div>
              <div className="p-5 rounded-xl bg-surface border border-surface-border hover:border-accent transition-colors">
                <Shield className="w-5 h-5 text-accent mb-3" />
                <h3 className="font-semibold text-headline mb-1">High-Throughput Ingestion</h3>
                <p className="text-sm text-bodytext">Handles 100k+ events/sec per node with bounded memory usage using ring buffers.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-headline mb-4">Architecture & Tech Stack</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Go", "eBPF (C)", "OpenTelemetry", "Apache Kafka", "ClickHouse", "Prometheus"].map((tech) => (
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
