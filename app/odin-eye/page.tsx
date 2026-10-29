import Link from "next/link";
import { ArrowLeft, Activity, Terminal, Shield, Cpu, Github, ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Odin Eye Case Study | Nikhil Alakri",
  description: "Real-time distributed observability and telemetry platform built with Go, eBPF, and ClickHouse.",
};

export default function OdinEyePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="max-w-4xl mx-auto px-6 pt-16 pb-24 flex-grow">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-sky-500/10 border border-sky-500/30 text-sky-400 mb-4">
          <Activity className="w-3.5 h-3.5" />
          Observability Platform
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
          Odin Eye
        </h1>

        <p className="text-xl text-slate-300 leading-relaxed mb-8">
          A high-throughput distributed telemetry daemon and visualization engine designed to capture
          low-level kernel events, trace request journeys across microservices, and detect anomalies in real time.
        </p>

        <div className="flex flex-wrap items-center gap-4 pb-10 border-b border-surface-border mb-12">
          <a
            href="https://github.com/nikhil-alakri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-surface-border text-white text-sm font-medium hover:border-slate-500 transition-colors"
          >
            <Github className="w-4 h-4" />
            View Repository
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
          <span className="text-xs text-slate-400">Path: <code className="text-primary">nikhilalakri.tech/odin-eye</code></span>
        </div>

        <div className="space-y-12 text-slate-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">The Challenge</h2>
            <p className="leading-relaxed">
              Traditional application performance monitoring (APM) often incurs significant runtime
              overhead and requires extensive manual code instrumentation. Odin Eye was designed to leverage
              eBPF to safely probe kernel-level TCP/HTTP sockets without requiring application restarts or invasive
              SDK wrappers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Key Capabilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-surface border border-surface-border">
                <Terminal className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold text-white mb-1">eBPF Kernel Probing</h3>
                <p className="text-sm text-slate-400">Zero-overhead request tracing and socket latency inspection at the OS level.</p>
              </div>
              <div className="p-5 rounded-xl bg-surface border border-surface-border">
                <Cpu className="w-5 h-5 text-accent mb-3" />
                <h3 className="font-semibold text-white mb-1">Sliding-Window Anomaly Scoring</h3>
                <p className="text-sm text-slate-400">Dynamically calculates z-score deviations across latency percentiles (p95, p99).</p>
              </div>
              <div className="p-5 rounded-xl bg-surface border border-surface-border">
                <Activity className="w-5 h-5 text-emerald-400 mb-3" />
                <h3 className="font-semibold text-white mb-1">OpenTelemetry Native</h3>
                <p className="text-sm text-slate-400">Seamlessly exports spans and metrics into ClickHouse, Grafana, or Jaeger.</p>
              </div>
              <div className="p-5 rounded-xl bg-surface border border-surface-border">
                <Shield className="w-5 h-5 text-rose-400 mb-3" />
                <h3 className="font-semibold text-white mb-1">High-Throughput Ingestion</h3>
                <p className="text-sm text-slate-400">Handles 100k+ events/sec per node with bounded memory usage using ring buffers.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Architecture & Tech Stack</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Go", "eBPF (C)", "OpenTelemetry", "Apache Kafka", "ClickHouse", "Prometheus"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-surface border border-surface-border text-slate-300 text-sm font-medium"
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

