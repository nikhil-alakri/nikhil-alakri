
import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import PORTFOLIO_DATA from "@/data/portfolio";

export interface SkillNodeData {
  id: string;
  name: string;
  category: string;
  position: [number, number, number];
  color: string;
  detail: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  "AI & Vector Engineering": "#5eead4", // Mint
  "Full-Stack & Backend APIs": "#38bdf8", // Sky
  "Databases & ORMs": "#a78bfa", // Purple
  "Cloud & Infrastructure": "#fbbf24", // Amber
  "Frontend & Design Systems": "#34d399", // Emerald
  "Developer Tooling & Automation": "#f472b6", // Rose
};

const SKILL_DETAILS: Record<string, string> = {
  "Multimodal AI": "Vision model inspection & autonomous UI decomposition",
  "ChromaDB RAG": "Local vector database indexing with zero cloud data leakage",
  "Vector DBs": "Embedding search, cosine similarity, high-dimensional indexing",
  "Embeddings": "Contextual semantic chunking for patient data & code blueprints",
  "Python": "FastAPI microservices, Playwright scripts, and AI pipelines",
  "Local RAG": "Private on-device inference and offline context retrieval",
  "TypeScript": "End-to-end type safety across REST contracts & design systems",
  "JavaScript": "Modern ESNext, asynchronous runtimes, DOM APIs",
  "Node.js": "High-concurrency services, event loops, streaming APIs",
  "REST APIs": "Idempotent endpoints, OpenAPI specs, rate-limiting",
  "System Architecture": "Microservice decomposition, RFCs, scalable platforms",
  "PostgreSQL": "Relational schema design, partition tables, indexing",
  "Supabase": "Real-time subscriptions, Row-Level Security, PostgreSQL auth",
  "MongoDB": "Document modeling, aggregation pipelines, flexible schemas",
  "Drizzle ORM": "Type-safe SQL schemas, zero runtime overhead migrations",
  "SQL Schema Design": "Normalized schemas, relational integrity, foreign keys",
  "Google Cloud": "Cloud Run, Container Registry, IAM, Serverless workloads",
  "Railway": "Automated deployments, persistent databases, fast staging",
  "Docker": "Multi-stage container builds, Alpine runtime minimization",
  "Vercel Edge": "Sub-80ms global TTFB edge functions and middleware",
  "Git": "Trunk-based development, semantic commits, PR review rigor",
  "Makefile": "Deterministic build automation and CI linting pipelines",
  "Next.js": "App Router, React Server Components, streaming SSR",
  "React": "Custom hooks, performance memoization, TSX ergonomics",
  "Tailwind CSS": "Token-driven utility styling, zero runtime overhead",
  "SCSS": "Modular architecture, CSS variables, design token compilation",
  "UI-store": "Reusable design system repository & component registry",
  "Responsive Design": "Fluid typography, container queries, mobile ergonomics",
  "Shell / Bash": "Terminal automation, command line scripting, cron utilities",
  "CLI Engineering": "Interactive terminal shells, developer ergonomics",
  "Automated Pipelines": "Sharp & Jimp image optimization, automated tests",
  "Debugging": "Chrome DevTools, heap snapshots, memory leak mitigation",
  "Performance Profiling": "Lighthouse 100/100, Core Web Vitals (LCP/CLS) audits",
};

// Reusable scratch objects to guarantee ZERO per-frame heap allocations
const scratchPos = new THREE.Vector3();

function ConstellationMesh({
  activeFilter,
  onHoverNode,
}: {
  activeFilter: string;
  onHoverNode: (data: SkillNodeData | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const isPointerDown = useRef(false);
  const lastPointerX = useRef(0);
  const rotVelocityY = useRef(0.002);

  // Generate constellation nodes distributed across 3D sphere
  const nodes: SkillNodeData[] = useMemo(() => {
    const list: SkillNodeData[] = [];
    const categories = PORTFOLIO_DATA.skills;
    const catCount = categories.length;

    categories.forEach((cat, catIdx) => {
      const color = CATEGORY_COLORS[cat.title] || "#5eead4";
      const catAngle = (catIdx / catCount) * Math.PI * 2;

      cat.skills.forEach((skill, skillIdx) => {
        // Distribute in clustered 3D sector
        const r = 2.4 + (skillIdx % 2) * 0.4;
        const theta = catAngle + (skillIdx - cat.skills.length / 2) * 0.28;
        const phi = (skillIdx / cat.skills.length - 0.5) * 1.4;

        const x = r * Math.cos(theta) * Math.cos(phi);
        const y = r * Math.sin(phi);
        const z = r * Math.sin(theta) * Math.cos(phi);

        list.push({
          id: `${cat.title}-${skill}`,
          name: skill,
          category: cat.title,
          position: [x, y, z],
          color,
          detail: SKILL_DETAILS[skill] || "Production stack technology",
        });
      });
    });

    return list;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Smooth inertia orbit rotation
    if (!isPointerDown.current) {
      groupRef.current.rotation.y += rotVelocityY.current;
      rotVelocityY.current = THREE.MathUtils.damp(rotVelocityY.current, 0.002, 1.5, delta);
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={(e) => {
        isPointerDown.current = true;
        lastPointerX.current = e.clientX;
      }}
      onPointerMove={(e) => {
        if (!isPointerDown.current || !groupRef.current) return;
        const diff = e.clientX - lastPointerX.current;
        lastPointerX.current = e.clientX;
        groupRef.current.rotation.y += diff * 0.005;
        rotVelocityY.current = diff * 0.003;
      }}
      onPointerUp={() => {
        isPointerDown.current = false;
      }}
      onPointerLeave={() => {
        isPointerDown.current = false;
        onHoverNode(null);
      }}
    >
      {nodes.map((node) => {
        const isMatched = activeFilter === "all" || node.category === activeFilter;
        const opacity = isMatched ? 1 : 0.2;
        const scale = isMatched ? 1 : 0.6;

        return (
          <group key={node.id} position={node.position} scale={scale}>
            <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.2}>
              {/* Outer Glow Halo */}
              <mesh
                onPointerOver={(e) => {
                  e.stopPropagation();
                  onHoverNode(node);
                }}
                onPointerOut={(e) => {
                  e.stopPropagation();
                  onHoverNode(null);
                }}
              >
                <sphereGeometry args={[0.16, 16, 16]} />
                <meshStandardMaterial
                  color={node.color}
                  emissive={node.color}
                  emissiveIntensity={isMatched ? 0.9 : 0.1}
                  roughness={0.2}
                  transparent
                  opacity={opacity}
                />
              </mesh>

              {/* 3D WebGL Native Label Tag (Zero DOM createRoot unmount race conditions) */}
              {isMatched && (
                <Billboard position={[0, -0.28, 0]}>
                  <Text
                    fontSize={0.11}
                    color="#f8fafc"
                    fillOpacity={opacity}
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.015}
                    outlineColor="#0d2731"
                  >
                    {node.name}
                  </Text>
                </Billboard>
              )}
            </Float>
          </group>
        );
      })}
    </group>
  );
}

export default function SkillConstellation3D({
  activeFilter,
  onHoverNode,
}: {
  activeFilter: string;
  onHoverNode: (data: SkillNodeData | null) => void;
}) {
  return (
    <div className="w-full h-[460px] sm:h-[520px] relative cursor-grab active:cursor-grabbing select-none rounded-3xl bg-surface/40 border border-surface-border backdrop-blur-md overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.9} color="#ffffff" />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#5eead4" />
        <directionalLight position={[-5, -5, -5]} intensity={0.8} color="#cbb594" />

        <ConstellationMesh activeFilter={activeFilter} onHoverNode={onHoverNode} />
      </Canvas>

      <div className="absolute bottom-3 inset-x-0 flex justify-center items-center gap-2 pointer-events-none text-[11px] font-mono text-mutedtext">
        <span>Drag to orbit constellation · Hover node to inspect detail</span>
      </div>
    </div>
  );
}

