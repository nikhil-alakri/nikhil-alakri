
import dynamic from "@/lib/dynamic";
import { Sparkles } from "lucide-react";

// Dynamically import ThreeHeroModel with ssr: false for zero-delay SSR and sub-1.5s LCP
const ThreeHeroModel = dynamic(() => import("./ThreeHeroModel"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] lg:h-[520px] rounded-3xl bg-surface/80 border border-surface-border overflow-hidden backdrop-blur-md shadow-2xl flex flex-col items-center justify-center p-6 text-center">
      <div className="relative w-14 h-14 mb-4 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
        <Sparkles className="w-5 h-5 text-accent animate-pulse" />
      </div>
      <span className="font-primary text-sm font-semibold text-headline mb-1">
        Interactive 3D Stage
      </span>
      <span className="text-xs font-mono text-bodytext">
        Preparing Three.js PBR Engine...
      </span>
    </div>
  ),
});

export default function DynamicThreeModel() {
  return <ThreeHeroModel />;
}

