"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { Terminal as TerminalIcon, Sparkles, Check, FileDown, CornerDownLeft, Volume2, Palette, Trophy } from "lucide-react";
import { SITE_URLS } from "@/config/urls";
import PORTFOLIO_DATA from "@/src/data/portfolio";
import { applyTheme, THEME_PRESETS, getCurrentTheme } from "@/lib/theme";
import { soundManager } from "@/lib/audio";

const AVAILABLE_COMMANDS = [
  "help",
  "about",
  "skills",
  "experience",
  "projects",
  "resume",
  "view-resume",
  "contact",
  "theme",
  "sound",
  "wave",
  "nod",
  "sudo hire-nikhil",
  "clear",
];

interface HistoryEntry {
  id: string;
  type: "command" | "output";
  content: React.ReactNode;
  rawText?: string;
  isTyping?: boolean;
}

export default function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      id: "init-1",
      type: "output",
      content: (
        <div className="text-xs font-mono text-mutedtext leading-relaxed">
          Welcome to <span className="text-mint font-semibold">Nikhil Alakri</span> CLI Shell (v2.4.0).
          Type <span className="text-mint underline cursor-pointer font-bold">help</span> to view commands, or press <span className="text-headline font-semibold">Tab</span> to autocomplete.
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const historyContainerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (history.length > 1 && historyContainerRef.current) {
      historyContainerRef.current.scrollTop = historyContainerRef.current.scrollHeight;
    }
  }, [history]);

  const triggerResumeDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = PORTFOLIO_DATA.personal.resumeUrl;
    link.download = "Nikhil-Alakri-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      if (!trimmed) return;

      // Add to command history list
      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);

      const cmdEntry: HistoryEntry = {
        id: `cmd-${Date.now()}-${Math.random()}`,
        type: "command",
        content: trimmed,
      };

      soundManager.playClickSound();

      let outputContent: React.ReactNode = null;

      // Check for theme parameter e.g. "theme emerald"
      if (trimmed.startsWith("theme ")) {
        const themeArg = trimmed.replace("theme ", "").trim();
        const applied = applyTheme(themeArg);
        if (applied) {
          window.dispatchEvent(
            new CustomEvent("portfolio:robot-react", { detail: { type: "nod" } })
          );
          outputContent = (
            <div className="text-xs font-mono text-mint py-1.5 space-y-1">
              <div>[OK] Switched theme accent to: <span className="font-bold">{applied.name}</span> ({applied.accent})</div>
              <div className="text-bodytext">Synchronized CSS tokens and 3D WebGL scene lighting.</div>
            </div>
          );
        } else {
          outputContent = (
            <div className="text-xs font-mono text-amber-300 py-1.5 space-y-1">
              <div>Theme &apos;{themeArg}&apos; not found. Available presets:</div>
              <div className="text-bodytext flex flex-wrap gap-2 pt-1">
                {Object.keys(THEME_PRESETS).map((key) => (
                  <span
                    key={key}
                    onClick={() => executeCommand(`theme ${key}`)}
                    className="underline text-mint cursor-pointer font-bold"
                  >
                    {key}
                  </span>
                ))}
              </div>
            </div>
          );
        }
      } else {
        switch (trimmed) {
          case "help":
          case "ls":
            outputContent = (
              <div className="space-y-1.5 text-xs font-mono text-bodytext py-1">
                <div className="text-mint font-semibold">Available Shell Commands:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                  <div><span className="text-mint font-bold">about</span> — Bio &amp; senior engineer summary</div>
                  <div><span className="text-mint font-bold">skills</span> — Design systems &amp; AI stack</div>
                  <div><span className="text-mint font-bold">experience</span> — 7+ year company career track</div>
                  <div><span className="text-mint font-bold">projects</span> — Production apps &amp; AI engines</div>
                  <div><span className="text-mint font-bold">resume</span> — Download official resume PDF</div>
                  <div><span className="text-mint font-bold">view-resume</span> — Open in-page modal viewer</div>
                  <div><span className="text-mint font-bold">theme [name]</span> — Switch accent color (mint, emerald, cyan, gold, violet)</div>
                  <div><span className="text-mint font-bold">sound</span> — Toggle subtle micro-interaction audio</div>
                  <div><span className="text-mint font-bold">wave</span> / <span className="text-mint font-bold">nod</span> — Interactive 3D robot reactions</div>
                  <div><span className="text-mint font-bold">sudo hire-nikhil</span> — Trigger candidate interview pipeline 🚀</div>
                  <div><span className="text-mint font-bold">contact</span> — Email, LinkedIn, GitHub</div>
                  <div><span className="text-mint font-bold">clear</span> — Clear terminal output history</div>
                </div>
              </div>
            );
            break;

          case "about":
          case "whoami":
            window.dispatchEvent(
              new CustomEvent("portfolio:robot-react", { detail: { type: "nod" } })
            );
            outputContent = (
              <div className="text-xs font-mono text-headline py-1.5 leading-relaxed space-y-1">
                <div>
                  <span className="text-mint font-bold">{PORTFOLIO_DATA.personal.name}</span> · {PORTFOLIO_DATA.personal.role}
                </div>
                <p className="text-bodytext leading-normal">
                  {PORTFOLIO_DATA.personal.bio}
                </p>
                <div className="text-mutedtext pt-1">
                  📍 {PORTFOLIO_DATA.personal.location} · {PORTFOLIO_DATA.personal.availability}
                </div>
              </div>
            );
            break;

          case "skills":
            window.dispatchEvent(
              new CustomEvent("portfolio:robot-react", { detail: { type: "nod" } })
            );
            outputContent = (
              <div className="text-xs font-mono space-y-1.5 text-bodytext py-1.5">
                <div><span className="text-mint font-semibold">UI &amp; Design Systems:</span> Lit Web Components, React, Next.js 15, TypeScript, WCAG AA, i18n</div>
                <div><span className="text-mint font-semibold">AI &amp; Automation:</span> Python, Multimodal Vision, Local ChromaDB RAG, Agentic Workflows</div>
                <div><span className="text-mint font-semibold">Performance:</span> Lighthouse 100/100, Core Web Vitals (LCP/CLS), Sharp asset pipelines</div>
                <div><span className="text-mint font-semibold">Data &amp; Infra:</span> PostgreSQL, Node.js, Docker, Google Cloud, Vitest, Storybook</div>
              </div>
            );
            break;

          case "experience":
            window.dispatchEvent(
              new CustomEvent("portfolio:robot-react", { detail: { type: "nod" } })
            );
            outputContent = (
              <div className="text-xs font-mono space-y-1.5 text-bodytext py-1.5">
                <div>• <span className="text-headline font-semibold">2024 — Present:</span> Senior Software Engineer @ CitiusTech Healthcare</div>
                <div>• <span className="text-headline font-semibold">2022 — 2024:</span> SDE-2 @ Adventum Student Living (+20% speedup)</div>
                <div>• <span className="text-headline font-semibold">2021 — 2022:</span> Senior Executive Tech @ The House of Abhinandan Lodha</div>
                <div>• <span className="text-headline font-semibold">2020 — 2021:</span> Software Engineer @ MultiLiving Technologies</div>
                <div>• <span className="text-headline font-semibold">2018 — 2020:</span> SDE-1 @ Cloudesign Technology Solutions</div>
              </div>
            );
            break;

          case "projects":
            window.dispatchEvent(
              new CustomEvent("portfolio:robot-react", { detail: { type: "nod" } })
            );
            outputContent = (
              <div className="text-xs font-mono space-y-1.5 text-bodytext py-1.5">
                <div>1. <span className="text-mint font-semibold">odin-eye:</span> Ethical AI crawler &amp; reverse engineering engine (ChromaDB RAG)</div>
                <div>2. <span className="text-mint font-semibold">Tryy (tryy.in):</span> Live consumer product trial &amp; sample redemption platform</div>
                <div>3. <span className="text-mint font-semibold">Healthcare UI Platform:</span> Reusable Lit component library for clinical apps</div>
                <div>4. <span className="text-mint font-semibold">ITPO:</span> Real-time IPO listing analytics &amp; financial tracking platform</div>
              </div>
            );
            break;

          case "resume":
          case "cv":
            triggerResumeDownload();
            window.dispatchEvent(
              new CustomEvent("portfolio:robot-react", { detail: { type: "wave" } })
            );
            outputContent = (
              <div className="text-xs font-mono py-1.5 space-y-2">
                <div className="text-mint flex items-center gap-2">
                  <FileDown className="w-4 h-4 shrink-0 animate-bounce" />
                  <span>Initiated download for Nikhil-Alakri-Resume.pdf... [OK]</span>
                </div>
                <div className="flex items-center gap-2 text-bodytext">
                  <span>Want to view in-page?</span>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent("portfolio:open-resume"))}
                    className="px-2 py-0.5 rounded bg-surface border border-mint/40 text-mint hover:bg-mint hover:text-background transition-colors text-[11px] cursor-pointer"
                  >
                    Open Resume Viewer
                  </button>
                </div>
              </div>
            );
            break;

          case "view-resume":
          case "view resume":
          case "view cv":
            window.dispatchEvent(new CustomEvent("portfolio:open-resume"));
            outputContent = (
              <div className="text-xs font-mono text-mint py-1.5 flex items-center gap-2">
                <span>Opening in-page resume viewer modal... [OK]</span>
              </div>
            );
            break;

          case "wave":
            window.dispatchEvent(
              new CustomEvent("portfolio:robot-react", { detail: { type: "wave" } })
            );
            outputContent = (
              <div className="text-xs font-mono text-mint py-1.5">
                [OK] Robot is waving back at you! 👋
              </div>
            );
            break;

          case "nod":
            window.dispatchEvent(
              new CustomEvent("portfolio:robot-react", { detail: { type: "nod" } })
            );
            outputContent = (
              <div className="text-xs font-mono text-mint py-1.5">
                [OK] Robot acknowledged with an affirmative nod.
              </div>
            );
            break;

          case "sound":
          case "audio": {
            const nextMuted = soundManager.toggleMute();
            outputContent = (
              <div className="text-xs font-mono text-mint py-1.5 flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio micro-interactions are now: {nextMuted ? "MUTED" : "UNMUTED (Active)"}</span>
              </div>
            );
            break;
          }

          case "sudo hire-nikhil":
          case "hire-nikhil":
          case "hire":
          case "konami":
            window.dispatchEvent(
              new CustomEvent("portfolio:confetti", {
                detail: { source: "Terminal Command: sudo hire-nikhil" },
              })
            );
            outputContent = (
              <div className="text-xs font-mono py-2 space-y-2 text-mint border-l-2 border-mint pl-3">
                <div className="flex items-center gap-2 font-bold text-headline">
                  <Trophy className="w-4 h-4 text-mint" />
                  <span>[EXCELLENT CHOICE] Scheduling Interview Pipeline...</span>
                </div>
                <div className="text-bodytext space-y-1">
                  <div>● Candidate: <span className="text-mint font-semibold">Nikhil Alakri</span> (Senior Software Engineer)</div>
                  <div>● Sudo authorization: <span className="text-mint font-semibold">GRANTED (Exit code 0)</span></div>
                  <div>● Next step: Let&apos;s build high-impact platforms together!</div>
                </div>
                <div className="pt-1 flex items-center gap-3">
                  <a
                    href={PORTFOLIO_DATA.contact.mailto}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-mint text-background font-semibold text-xs hover:bg-mint-dark transition-colors"
                  >
                    <span>Email Nikhil Directly</span>
                  </a>
                  <a
                    href="#contact"
                    className="text-xs underline text-bodytext hover:text-headline"
                  >
                    Jump to Contact Section
                  </a>
                </div>
              </div>
            );
            break;

          case "contact":
            outputContent = (
              <div className="text-xs font-mono space-y-1 text-bodytext py-1.5">
                <div>Email: <a href={`mailto:${PORTFOLIO_DATA.contact.email}`} className="text-mint underline">{PORTFOLIO_DATA.contact.email}</a></div>
                <div>GitHub: <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noopener noreferrer" className="text-mint underline">{PORTFOLIO_DATA.socials.github}</a></div>
                <div>LinkedIn: <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-mint underline">{PORTFOLIO_DATA.socials.linkedin}</a></div>
              </div>
            );
            break;

          case "theme": {
            const current = getCurrentTheme();
            outputContent = (
              <div className="text-xs font-mono text-bodytext py-1.5 space-y-2">
                <div>
                  Current accent theme: <span className="text-mint font-bold uppercase">{current}</span>
                </div>
                <div>Click a preset below or type <span className="text-mint font-semibold">theme &lt;name&gt;</span> to switch:</div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {Object.entries(THEME_PRESETS).map(([key, p]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => executeCommand(`theme ${key}`)}
                      className="px-2.5 py-1 rounded-lg bg-surface border border-surface-border hover:border-mint text-headline text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.accent }} />
                      <span>{p.name.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
            break;
          }

          case "clear":
            setHistory([]);
            setInputVal("");
            return;

          default:
            outputContent = (
              <div className="text-xs font-mono text-amber-300/90 py-1">
                zsh: command not found: <span className="font-bold">{trimmed}</span>. Type <span className="text-mint underline cursor-pointer" onClick={() => executeCommand("help")}>help</span> for commands.
              </div>
            );
            break;
        }
      }

      const outEntry: HistoryEntry = {
        id: `out-${Date.now()}-${Math.random()}`,
        type: "output",
        content: outputContent,
      };

      setHistory((prev) => [...prev, cmdEntry, outEntry]);
      setInputVal("");
    },
    [triggerResumeDownload]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 1. Tab Autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;

      const matches = AVAILABLE_COMMANDS.filter((cmd) => cmd.startsWith(current));
      if (matches.length === 1) {
        setInputVal(matches[0]);
      } else if (matches.length > 1) {
        setHistory((prev) => [
          ...prev,
          {
            id: `tab-${Date.now()}`,
            type: "output",
            content: (
              <div className="text-xs font-mono text-mutedtext py-0.5">
                Suggestions: {matches.map((m) => <span key={m} className="text-mint mr-2">{m}</span>)}
              </div>
            ),
          },
        ]);
      }
      return;
    }

    // 2. Command History Up / Down Arrow
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
      return;
    }

    // 3. Enter Command
    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(inputVal);
    }
  };

  const handleCopyCode = () => {
    const rawCode = `const nikhil_alakri: SeniorSoftwareEngineer = {
  name: "Nikhil Alakri",
  title: "Senior Software Engineer @ CitiusTech",
  specialties: ["Healthcare Design Systems (Lit/React)", "WCAG AA & i18n", "Core Web Vitals", "Multimodal AI RAG"],
  status: "Available for Senior Roles & Impact Collaborations"
};`;
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={terminalRef}
      onClick={() => inputRef.current?.focus()}
      className="rounded-2xl bg-surface/90 border border-surface-border p-4 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-mint/60 cursor-text"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-border/60 select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]/90 inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/90 inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]/90 inline-block" />
          <span className="ml-2 text-xs font-mono text-bodytext flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-mint" />
            nikhil@mbp: ~ (interactive zsh)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopyCode();
            }}
            className="text-xs font-mono text-mint hover:text-headline transition-colors flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-elevated border border-surface-border"
            title="Copy TypeScript snippet"
          >
            {copied ? <Check className="w-3 h-3 text-mint" /> : <Sparkles className="w-3 h-3" />}
            <span>{copied ? "Copied" : "Copy Code"}</span>
          </button>
          <span className="text-xs font-mono text-mutedtext hidden sm:inline">Tab to complete</span>
        </div>
      </div>

      {/* Code Snippet Box */}
      <pre className="text-xs sm:text-sm font-mono text-bodytext overflow-x-auto leading-relaxed mb-4 pb-4 border-b border-surface-border/40 select-all">
        <code>
          <span className="text-mint">const</span> <span className="text-headline font-semibold">nikhil_alakri</span>: <span className="text-mint">SeniorSoftwareEngineer</span> = &#123;{'\n'}
          {'  '}name:        <span className="text-headline">&quot;Nikhil Alakri&quot;</span>,{'\n'}
          {'  '}role:        <span className="text-headline">&quot;Senior Software Engineer @ CitiusTech&quot;</span>,{'\n'}
          {'  '}track:       <span className="text-mint">&quot;7+ Years Enterprise UI &amp; HealthTech Platforms&quot;</span>,{'\n'}
          {'  '}specialties: [<span className="text-mutedtext">&quot;Lit &amp; React Components&quot;</span>, <span className="text-mutedtext">&quot;WCAG AA&quot;</span>, <span className="text-mutedtext">&quot;Core Web Vitals&quot;</span>, <span className="text-mutedtext">&quot;Multimodal AI RAG&quot;</span>],{'\n'}
          {'  '}mantra:      <span className="text-mint">&quot;Architect with rigor, build for performance, delight at scale 🚀&quot;</span>{'\n'}
          &#125;;
        </code>
      </pre>

      {/* Terminal History */}
      <div
        ref={historyContainerRef}
        className="space-y-2 mb-3 max-h-[280px] overflow-y-auto pr-1"
      >
        {history.map((entry) => (
          <div key={entry.id}>
            {entry.type === "command" ? (
              <div className="flex items-center gap-2 text-xs font-mono text-headline">
                <span className="text-mint font-bold">❯</span>
                <span className="font-semibold">{entry.content}</span>
              </div>
            ) : (
              <div className="pl-4">{entry.content}</div>
            )}
          </div>
        ))}
      </div>

      {/* Active Command Input Line */}
      <div className="flex items-center gap-2 pt-2 border-t border-surface-border/40">
        <span className="text-mint font-bold text-xs font-mono shrink-0">❯</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command (try 'help', 'resume', 'skills', or 'projects')..."
          className="w-full bg-transparent text-xs font-mono text-headline placeholder:text-mutedtext/70 focus:outline-none"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        <button
          onClick={() => executeCommand(inputVal)}
          className="p-1 rounded text-mutedtext hover:text-mint transition-colors shrink-0"
          title="Execute Command (Enter)"
          aria-label="Execute Command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
