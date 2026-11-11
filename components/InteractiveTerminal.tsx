"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Sparkles, Check, CornerDownLeft, FileDown } from "lucide-react";
import { SITE_URLS } from "@/config/urls";

interface HistoryEntry {
  type: "command" | "output";
  content: string | React.ReactNode;
}

export default function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory: HistoryEntry[] = [
      ...history,
      { type: "command", content: trimmed },
    ];

    switch (trimmed) {
      case "help":
        newHistory.push({
          type: "output",
          content: (
            <div className="space-y-1 text-xs font-mono text-bodytext py-1">
              <div>Available Commands:</div>
              <div><span className="text-accent">whoami</span> — Display engineer identity &amp; background</div>
              <div><span className="text-accent">skills</span> — List technical stack and specializations</div>
              <div><span className="text-accent">experience</span> — View career highlights (CitiusTech, Adventum)</div>
              <div><span className="text-accent">projects</span> — List production platforms (odin-eye, Tryy, ITPO)</div>
              <div><span className="text-accent">cv</span> or <span className="text-accent">resume</span> — Download official resume PDF</div>
              <div><span className="text-accent">clear</span> — Clear terminal output</div>
            </div>
          ),
        });
        break;

      case "whoami":
        newHistory.push({
          type: "output",
          content: (
            <div className="text-xs font-mono text-headline py-1 leading-relaxed">
              <span className="text-status font-bold">Nikhil Alakri</span> · Senior Software Engineer @ CitiusTech
              <div className="text-bodytext mt-0.5">
                7+ years experience architecting healthcare design systems, Lit/React component platforms, and multimodal AI accelerators.
              </div>
            </div>
          ),
        });
        break;

      case "skills":
        newHistory.push({
          type: "output",
          content: (
            <div className="text-xs font-mono space-y-1 text-bodytext py-1">
              <div><span className="text-accent font-semibold">Frontend:</span> Lit Web Components, React (TSX), Next.js 15, Tailwind, SCSS</div>
              <div><span className="text-accent font-semibold">Specialized:</span> Healthcare Design Systems, WCAG AA, i18n, Core Web Vitals (100/100)</div>
              <div><span className="text-accent font-semibold">AI &amp; Backend:</span> Python, Multimodal Vision, ChromaDB RAG, Node.js, PostgreSQL</div>
            </div>
          ),
        });
        break;

      case "experience":
        newHistory.push({
          type: "output",
          content: (
            <div className="text-xs font-mono space-y-1 text-bodytext py-1">
              <div>• <span className="text-headline font-semibold">2024 — Present:</span> Senior Software Engineer @ CitiusTech Healthcare</div>
              <div>• <span className="text-headline font-semibold">2022 — 2024:</span> SDE-2 @ Adventum Student Living (+20% load speed)</div>
              <div>• <span className="text-headline font-semibold">2021 — 2022:</span> Senior Executive Tech @ The House of Abhinandan Lodha</div>
              <div>• <span className="text-headline font-semibold">2020 — 2021:</span> Software Engineer @ MultiLiving Technologies</div>
              <div>• <span className="text-headline font-semibold">2018 — 2020:</span> SDE-I @ Cloudesign Technology Solutions</div>
            </div>
          ),
        });
        break;

      case "projects":
        newHistory.push({
          type: "output",
          content: (
            <div className="text-xs font-mono space-y-1 text-bodytext py-1">
              <div>1. <span className="text-accent font-semibold">odin-eye:</span> Ethical AI crawler &amp; reverse engineering engine (ChromaDB RAG)</div>
              <div>2. <span className="text-accent font-semibold">Tryy (tryy.in):</span> Live consumer product trial platform (2018–Present)</div>
              <div>3. <span className="text-accent font-semibold">UI-store:</span> Modular design system &amp; token repository</div>
              <div>4. <span className="text-accent font-semibold">ITPO:</span> Financial analytics &amp; IPO listings platform</div>
            </div>
          ),
        });
        break;

      case "cv":
      case "resume":
        newHistory.push({
          type: "output",
          content: (
            <div className="text-xs font-mono text-status py-1 flex items-center gap-2">
              <FileDown className="w-4 h-4" />
              <span>Initiating download for Nikhil_Alakri_Resume_CitiusTech.pdf... [OK]</span>
            </div>
          ),
        });
        const link = document.createElement("a");
        link.href = SITE_URLS.resume;
        link.download = "Nikhil_Alakri_Resume_CitiusTech.pdf";
        link.click();
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newHistory.push({
          type: "output",
          content: (
            <div className="text-xs font-mono text-red-300 py-0.5">
              command not found: {trimmed}. Type <span className="text-accent underline cursor-pointer" onClick={() => handleCommand("help")}>help</span> for commands.
            </div>
          ),
        });
        break;
    }

    setHistory(newHistory);
    setInputVal("");
  };

  const handleCopyCode = () => {
    const rawCode = `const nikhil_alakri: SeniorSoftwareEngineer = {
  name: "Nikhil Alakri",
  title: "Senior Software Engineer @ CitiusTech",
  experience: "7+ Years Enterprise & HealthTech UI",
  specialties: ["Healthcare Design Systems (Lit/React)", "WCAG AA & i18n", "Core Web Vitals", "Multimodal AI & RAG"],
  certifications: ["100/100 Lighthouse", "WCAG AA Compliant"],
  mantra: "Architect with rigor, build for performance, delight at scale 🚀"
};`;
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-surface/95 border border-surface-border p-4 sm:p-6 shadow-xl backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-accent/60">
      
      {/* Window Title Bar */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-border/60">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]/90 inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/90 inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]/90 inline-block" />
          <span className="ml-2 text-xs font-mono text-bodytext flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-accent" />
            whoami.ts · Interactive CLI
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCode}
            className="text-xs font-mono text-accent hover:text-headline transition-colors flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-surface-border"
            title="Copy TypeScript snippet"
          >
            {copied ? <Check className="w-3 h-3 text-status" /> : <Sparkles className="w-3 h-3" />}
            <span>{copied ? "Copied" : "Copy Code"}</span>
          </button>
          <span className="text-xs font-mono text-accent hidden sm:inline">bash</span>
        </div>
      </div>

      {/* Code Snippet */}
      <pre className="text-xs sm:text-sm font-mono text-bodytext overflow-x-auto leading-relaxed mb-4 pb-4 border-b border-surface-border/40">
        <code>
          <span className="text-accent">const</span> <span className="text-primary font-semibold">nikhil_alakri</span>: <span className="text-status">SeniorSoftwareEngineer</span> = &#123;{'\n'}
          {'  '}name:         <span className="text-primary">&quot;Nikhil Alakri&quot;</span>,{'\n'}
          {'  '}title:        <span className="text-primary">&quot;Senior Software Engineer @ CitiusTech&quot;</span>,{'\n'}
          {'  '}experience:   <span className="text-accent">&quot;7+ Years Enterprise &amp; HealthTech UI&quot;</span>,{'\n'}
          {'  '}specialties:  [<span className="text-secondary">&quot;Healthcare Design Systems (Lit/React)&quot;</span>, <span className="text-secondary">&quot;WCAG AA &amp; i18n&quot;</span>, <span className="text-secondary">&quot;Core Web Vitals&quot;</span>, <span className="text-secondary">&quot;Multimodal AI &amp; RAG&quot;</span>],{'\n'}
          {'  '}certifications: [<span className="text-secondary">&quot;100/100 Lighthouse&quot;</span>, <span className="text-secondary">&quot;WCAG AA Compliant&quot;</span>],{'\n'}
          {'  '}mantra:       <span className="text-status font-medium">&quot;Architect with rigor, build for performance, delight at scale 🚀&quot;</span>{'\n'}
          &#125;;
        </code>
      </pre>

      {/* Terminal History */}
      {history.length > 0 && (
        <div className="space-y-2 mb-3 max-h-60 overflow-y-auto pr-1">
          {history.map((entry, idx) => (
            <div key={idx} className="font-mono text-xs">
              {entry.type === "command" ? (
                <div className="flex items-center gap-2 text-accent">
                  <span>❯</span>
                  <span className="text-headline font-semibold">{entry.content}</span>
                </div>
              ) : (
                <div className="pl-4">{entry.content}</div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Interactive Command Line Prompt */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(inputVal);
        }}
        className="flex items-center gap-2 pt-1"
      >
        <span className="text-status font-mono text-xs font-bold">nikhil@tech:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type 'help', 'skills', 'experience', 'projects', or 'cv'..."
          className="flex-1 bg-transparent font-mono text-xs text-headline placeholder:text-mutedtext/70 focus:outline-none"
        />
        <button
          type="submit"
          className="p-1 rounded bg-surface border border-surface-border text-accent hover:border-accent transition-colors"
          title="Run Command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Quick Prompt Chips */}
      <div className="flex flex-wrap items-center gap-1.5 pt-3 mt-3 border-t border-surface-border/40 text-[11px] font-mono text-bodytext">
        <span className="text-accent">Try:</span>
        {["help", "whoami", "skills", "experience", "projects", "cv", "clear"].map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => handleCommand(chip)}
            className="px-2 py-0.5 rounded bg-surface/80 hover:bg-surface-elevated hover:text-headline border border-surface-border hover:border-accent transition-all"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}

