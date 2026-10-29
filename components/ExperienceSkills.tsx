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
    skills: ["Next.js", "React", "SCSS", "Tailwind CSS", "GSAP", "Lenis Scroll"],
  },
  {
    title: "Developer Tooling",
    icon: Terminal,
    skills: ["Git", "CLI Architecture", "System Debugging", "Performance Profiling", "Shell Scripting"],
  },
];

export default function ExperienceSkills() {
  return (
    <section id="skills" className="py-14 sm:py-20 border-t border-surface-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1.5 sm:mb-2">Capabilities</p>
          <h2 className="font-primary text-2xl sm:text-4xl font-bold text-headline tracking-tight">Technical Stack & Domains</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="p-5 sm:p-6 rounded-2xl bg-surface border border-surface-border hover:border-accent hover:bg-surface-elevated transition-all"
              >
                <div className="flex items-center gap-3 mb-3.5 sm:mb-4">
                  <div className="p-2 rounded-lg bg-surface-elevated border border-surface-border text-accent">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-primary font-bold text-headline text-base sm:text-lg">{cat.title}</h3>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2.5 py-1 rounded-md bg-background/70 text-bodytext border border-surface-border font-mono"
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
