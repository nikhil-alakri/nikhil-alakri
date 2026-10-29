"use client";

import { Cpu, Server, Globe, Database, ShieldCheck, Terminal } from "lucide-react";

const skillCategories = [
  {
    title: "Backend & Systems",
    icon: Server,
    skills: ["Go", "Node.js", "TypeScript", "Python", "gRPC", "REST APIs", "Microservices"],
  },
  {
    title: "Distributed Systems & Telemetry",
    icon: Cpu,
    skills: ["eBPF", "OpenTelemetry", "Kafka", "ClickHouse", "Prometheus", "Grafana"],
  },
  {
    title: "Databases & Storage",
    icon: Database,
    skills: ["PostgreSQL", "Redis", "MongoDB", "SQL Optimization", "Data Modeling"],
  },
  {
    title: "Cloud & DevOps",
    icon: ShieldCheck,
    skills: ["Docker", "Kubernetes", "AWS", "Vercel", "CI/CD Pipelines", "Linux"],
  },
  {
    title: "Frontend & Creative UI",
    icon: Globe,
    skills: ["Next.js", "React", "Tailwind CSS", "GSAP", "Lenis Scroll", "Responsive Design"],
  },
  {
    title: "Developer Tooling",
    icon: Terminal,
    skills: ["Git", "CLI Architecture", "System Debugging", "Performance Profiling", "Shell Scripting"],
  },
];

export default function ExperienceSkills() {
  return (
    <section id="skills" className="py-20 border-t border-surface-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Capabilities</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Technical Stack & Domains</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="p-6 rounded-2xl bg-surface border border-surface-border card-hover-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-surface-hover border border-surface-border text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-white">{cat.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2.5 py-1 rounded-md bg-surface-hover text-slate-300 border border-surface-border/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

