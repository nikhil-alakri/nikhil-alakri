import Link from "@/lib/next-link";
import { Terminal, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden bg-background">
      {/* Ambient background cones */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(54, 171, 155,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[radial-gradient(circle,rgba(242, 183, 95,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full text-center">
        {/* Status Chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-surface/90 border border-mint/40 text-mint mb-6 backdrop-blur-md">
          <Terminal className="w-3.5 h-3.5 animate-pulse" />
          <span>404: STATION_ORBIT_MISALIGNED</span>
        </div>

        {/* 404 Giant Monospace Glitch Tag */}
        <h1 className="font-display text-7xl sm:text-9xl font-bold tracking-tighter text-headline mb-4 select-none">
          4<span className="text-mint">0</span>4
        </h1>

        <h2 className="font-display text-xl sm:text-2xl font-bold text-headline mb-3">
          Coordinates Lost in Vector Space
        </h2>

        <p className="text-bodytext text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
          The requested route does not exist in this sector. Re-align your navigational thrusters to return to station zero.
        </p>

        {/* Mock Terminal Card */}
        <div className="rounded-2xl bg-surface-elevated/90 border border-surface-border text-left p-4 sm:p-5 mb-8 font-mono text-xs shadow-2xl shadow-mint/5 backdrop-blur-md">
          <div className="flex items-center gap-1.5 pb-3 border-b border-surface-border/60 mb-3 text-mutedtext">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 text-[11px]">zsh · navigation-telemetry</span>
          </div>
          <div className="space-y-1.5 text-bodytext">
            <div className="text-mint">$ traceroute --target current_route</div>
            <div className="text-mutedtext">&gt; packet_loss: 100% (Node unmapped)</div>
            <div className="text-headline flex items-center gap-1.5 pt-1">
              <Sparkles className="w-3.5 h-3.5 text-mint" />
              <span>Recommended vector: return to /</span>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="magnetic inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-mint text-background font-semibold hover:bg-mint-dark transition-all text-sm shadow-lg shadow-mint/10"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home Station</span>
          </Link>

        </div>
      </div>
    </div>
  );
}

