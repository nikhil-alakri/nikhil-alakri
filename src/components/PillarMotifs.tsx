
import { useId } from "react";

// 01. Glass Cube & Token Lattice (Healthcare UI & Design Systems)
export function GlassCubeMotif() {
  const id = useId();
  return (
    <div className="relative w-24 h-24 flex items-center justify-center shrink-0" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(54, 171, 155,0.35)]">
        <defs>
          <linearGradient id={`${id}-cube-top`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#36AB9B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2B8C7F" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id={`${id}-cube-left`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d9488" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#115e59" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id={`${id}-cube-right`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0f766e" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Isometric Cube Faces */}
        {/* Top */}
        <polygon points="50,15 85,32 50,49 15,32" fill={`url(#${id}-cube-top)`} stroke="#36AB9B" strokeWidth="1" />
        {/* Left */}
        <polygon points="15,32 50,49 50,85 15,68" fill={`url(#${id}-cube-left)`} stroke="#36AB9B" strokeWidth="1" strokeOpacity="0.6" />
        {/* Right */}
        <polygon points="50,49 85,32 85,68 50,85" fill={`url(#${id}-cube-right)`} stroke="#36AB9B" strokeWidth="1" strokeOpacity="0.6" />

        {/* Inner Glowing Token Core */}
        <circle cx="50" cy="50" r="7" fill="#36AB9B" className="animate-pulse" />
        <circle cx="50" cy="50" r="14" fill="none" stroke="#36AB9B" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.7" />

        {/* Surrounding Token Lattice Points */}
        <circle cx="28" cy="22" r="2.5" fill="#36AB9B" opacity="0.7" />
        <circle cx="72" cy="22" r="2.5" fill="#36AB9B" opacity="0.7" />
        <circle cx="50" cy="94" r="2.5" fill="#36AB9B" opacity="0.7" />
        <line x1="28" y1="22" x2="50" y2="32" stroke="#36AB9B" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />
        <line x1="72" y1="22" x2="50" y2="32" stroke="#36AB9B" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />
      </svg>
    </div>
  );
}

// 02. Node Graph & Neural Synapses (Multimodal AI & Agentic Accelerators)
export function NodeGraphMotif() {
  const id = useId();
  return (
    <div className="relative w-24 h-24 flex items-center justify-center shrink-0" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(54, 171, 155,0.35)]">
        <defs>
          <radialGradient id={`${id}-node-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#36AB9B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Connection Synapses */}
        <line x1="20" y1="35" x2="50" y2="20" stroke="#36AB9B" strokeWidth="1.2" opacity="0.5" />
        <line x1="20" y1="35" x2="50" y2="52" stroke="#36AB9B" strokeWidth="1.2" opacity="0.7" />
        <line x1="50" y1="20" x2="80" y2="35" stroke="#36AB9B" strokeWidth="1.2" opacity="0.5" />
        <line x1="50" y1="52" x2="80" y2="35" stroke="#36AB9B" strokeWidth="1.2" opacity="0.7" />
        <line x1="50" y1="52" x2="30" y2="78" stroke="#36AB9B" strokeWidth="1.2" opacity="0.6" />
        <line x1="50" y1="52" x2="70" y2="78" stroke="#36AB9B" strokeWidth="1.2" opacity="0.6" />
        <line x1="30" y1="78" x2="70" y2="78" stroke="#36AB9B" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />

        {/* Nodes */}
        <circle cx="50" cy="52" r="8" fill={`url(#${id}-node-glow)`} stroke="#36AB9B" strokeWidth="1.5" className="animate-pulse" />
        <circle cx="20" cy="35" r="4.5" fill="#113946" stroke="#36AB9B" strokeWidth="1.5" />
        <circle cx="50" cy="20" r="4.5" fill="#113946" stroke="#36AB9B" strokeWidth="1.5" />
        <circle cx="80" cy="35" r="4.5" fill="#113946" stroke="#36AB9B" strokeWidth="1.5" />
        <circle cx="30" cy="78" r="4.5" fill="#113946" stroke="#36AB9B" strokeWidth="1.5" />
        <circle cx="70" cy="78" r="4.5" fill="#113946" stroke="#36AB9B" strokeWidth="1.5" />

        {/* Central Pulse Ring */}
        <circle cx="50" cy="52" r="14" fill="none" stroke="#36AB9B" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
      </svg>
    </div>
  );
}

// 03. Speed Ring & Gauge (Web Performance & Lighthouse 100/100)
export function SpeedGaugeMotif() {
  const id = useId();
  return (
    <div className="relative w-24 h-24 flex items-center justify-center shrink-0" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(54, 171, 155,0.35)]">
        <defs>
          <linearGradient id={`${id}-gauge-arc`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2B8C7F" />
            <stop offset="100%" stopColor="#36AB9B" />
          </linearGradient>
        </defs>

        {/* Outer Track Ring */}
        <circle cx="50" cy="50" r="38" fill="none" stroke="#123542" strokeWidth="5" />
        
        {/* Dynamic Speed Arc (approx 280 deg) */}
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke={`url(#${id}-gauge-arc)`}
          strokeWidth="5"
          strokeDasharray="210 240"
          strokeLinecap="round"
          transform="rotate(130 50 50)"
        />

        {/* Inner Dial Hash Marks */}
        <circle cx="50" cy="50" r="28" fill="none" stroke="#36AB9B" strokeWidth="1" strokeDasharray="2 6" opacity="0.5" />

        {/* Core Display: 100 */}
        <text
          x="50"
          y="48"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#36AB9B"
          className="font-mono text-[14px] font-bold"
          letterSpacing="-0.5"
        >
          100
        </text>
        <text
          x="50"
          y="62"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#94a3b8"
          className="font-mono text-[8px] uppercase tracking-wider"
        >
          Score
        </text>
      </svg>
    </div>
  );
}

// 04. Stacked Strata Layers (Full-Stack & Cloud Architecture)
export function StackedLayersMotif() {
  const id = useId();
  return (
    <div className="relative w-24 h-24 flex items-center justify-center shrink-0" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(54, 171, 155,0.35)]">
        <defs>
          <linearGradient id={`${id}-layer-top`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#36AB9B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id={`${id}-layer-mid`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2B8C7F" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#115e59" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id={`${id}-layer-bot`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0f766e" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Layer 1: Cloud & Data (Bottom) */}
        <polygon points="50,60 84,72 50,84 16,72" fill={`url(#${id}-layer-bot)`} stroke="#36AB9B" strokeWidth="0.9" opacity="0.7" />

        {/* Layer 2: API & Services (Middle) */}
        <polygon points="50,42 84,54 50,66 16,54" fill={`url(#${id}-layer-mid)`} stroke="#36AB9B" strokeWidth="0.9" opacity="0.85" />

        {/* Layer 3: Presentation & UI (Top) */}
        <polygon points="50,24 84,36 50,48 16,36" fill={`url(#${id}-layer-top)`} stroke="#36AB9B" strokeWidth="1" />

        {/* Vertical Data Bus Line */}
        <line x1="50" y1="20" x2="50" y2="86" stroke="#36AB9B" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />

        {/* Top Floating Core Pin */}
        <circle cx="50" cy="36" r="3" fill="#36AB9B" className="animate-pulse" />
      </svg>
    </div>
  );
}

export function getPillarMotif(num: string) {
  switch (num) {
    case "01":
      return <GlassCubeMotif />;
    case "02":
      return <NodeGraphMotif />;
    case "03":
      return <SpeedGaugeMotif />;
    case "04":
    default:
      return <StackedLayersMotif />;
  }
}

