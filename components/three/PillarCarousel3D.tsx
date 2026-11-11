"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import PORTFOLIO_DATA, { PillarItem } from "@/src/data/portfolio";
import PillarMotif3D from "./PillarMotif3D";
import { soundManager } from "@/lib/audio";

interface PillarCarousel3DProps {
  onSelectPillar: (pillarNum: string) => void;
}

// ==============================================================================
// 1. INDIVIDUAL 3D TILTED CARD IN R3F
// ==============================================================================
interface CardMeshProps {
  pillar: PillarItem;
  index: number;
  activeIndex: number;
  animIndexRef: React.MutableRefObject<number>;
  onSelect: (index: number) => void;
  onExplore: (pillarNum: string) => void;
}

function CardMesh({
  pillar,
  index,
  activeIndex,
  animIndexRef,
  onSelect,
  onExplore,
}: CardMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [btnHovered, setBtnHovered] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);
  const total = 4;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Calculate circular delta from animated index
    let diff = index - animIndexRef.current;
    while (diff < -2) diff += total;
    while (diff > 2) diff -= total;

    const absDiff = Math.abs(diff);
    const isActive = absDiff < 0.45;

    // 3D positioning with depth of field
    const x = diff * 3.4;
    const z = -absDiff * 1.5;
    const scale = Math.max(0.68, 1.0 - absDiff * 0.18);

    // Interactive pointer tilt (active card tilts gently towards pointer)
    const pointerTiltX = isActive ? -state.pointer.y * 0.14 : 0;
    const pointerTiltY = -diff * 0.28 + (isActive ? state.pointer.x * 0.2 : 0);

    groupRef.current.position.x = x;
    groupRef.current.position.y = 0;
    groupRef.current.position.z = z;

    groupRef.current.scale.setScalar(scale);
    groupRef.current.rotation.x = pointerTiltX;
    groupRef.current.rotation.y = pointerTiltY;
  });

  const isActiveCard = index === activeIndex;

  return (
    <group ref={groupRef}>
      {/* 3D Glass Backplate Mesh */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          if (isActiveCard) {
            soundManager.playClickSound();
            onExplore(pillar.num);
          } else {
            onSelect(index);
          }
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setCardHovered(true);
        }}
        onPointerOut={() => {
          setCardHovered(false);
        }}
        position={[0, 0, -0.02]}
      >
        <planeGeometry args={[3.2, 4.4]} />
        <meshStandardMaterial
          color="#04201f"
          roughness={0.15}
          metalness={0.2}
          transparent
          opacity={isActiveCard ? 0.94 : cardHovered ? 0.65 : 0.4}
        />
      </mesh>

      {/* Hairline glowing edge frame */}
      <lineSegments position={[0, 0, -0.01]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(3.22, 4.42)]} />
        <lineBasicMaterial
          color={isActiveCard ? "#5cf2d6" : cardHovered ? "#99f6e4" : "#ffffff"}
          transparent
          opacity={isActiveCard ? 0.8 : cardHovered ? 0.35 : 0.12}
        />
      </lineSegments>

      {/* 3D Floating Geometry Motif in Upper Half */}
      <group position={[0, 1.15, 0.22]} scale={0.76}>
        <PillarMotif3D pillarNum={pillar.num} isActive={isActiveCard} />
      </group>

      {/* Native WebGL 3D Card Content (Zero React DOM createRoot race conditions) */}
      <group position={[0, 0, 0.04]}>
        {/* Pillar Badge Pill & Counter */}
        <mesh position={[-0.82, 0.22, 0.01]}>
          <planeGeometry args={[0.96, 0.26]} />
          <meshBasicMaterial color="#0d3532" transparent opacity={0.85} />
        </mesh>
        <Text
          fontSize={0.095}
          letterSpacing={0.12}
          color="#5cf2d6"
          anchorX="center"
          anchorY="middle"
          position={[-0.82, 0.22, 0.02]}
        >
          {`PILLAR ${pillar.num}`}
        </Text>
        <Text
          fontSize={0.095}
          color="#64748b"
          anchorX="right"
          anchorY="middle"
          position={[1.28, 0.22, 0.02]}
        >
          {`0${index + 1} / 04`}
        </Text>

        {/* Pillar Title */}
        <Text
          fontSize={0.18}
          maxWidth={2.56}
          lineHeight={1.22}
          letterSpacing={-0.02}
          color="#f8fafc"
          anchorX="left"
          anchorY="top"
          position={[-1.28, -0.02, 0.02]}
        >
          {pillar.title}
        </Text>

        {/* Short Summary Description */}
        <Text
          fontSize={0.108}
          maxWidth={2.56}
          lineHeight={1.45}
          color="#94a3b8"
          anchorX="left"
          anchorY="top"
          position={[-1.28, -0.66, 0.02]}
        >
          {pillar.summary}
        </Text>

        {/* Separator Line */}
        <mesh position={[0, -1.35, 0.01]}>
          <planeGeometry args={[2.56, 0.012]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
        </mesh>

        {/* Bottom Action Row: Playbook Label & Interactive Explore Pill */}
        <Text
          fontSize={0.088}
          letterSpacing={0.14}
          color="#64748b"
          anchorX="left"
          anchorY="middle"
          position={[-1.28, -1.68, 0.02]}
        >
          PLAYBOOK
        </Text>

        {/* Interactive Explore Pill Button */}
        <group
          position={[0.78, -1.68, 0.02]}
          onClick={(e) => {
            e.stopPropagation();
            soundManager.playClickSound();
            onExplore(pillar.num);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setBtnHovered(true);
          }}
          onPointerOut={() => {
            setBtnHovered(false);
          }}
        >
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[1.05, 0.34]} />
            <meshBasicMaterial
              color={btnHovered ? "#5cf2d6" : "#0d3532"}
              transparent
              opacity={0.92}
            />
          </mesh>
          <lineSegments position={[0, 0, 0.005]}>
            <edgesGeometry args={[new THREE.PlaneGeometry(1.05, 0.34)]} />
            <lineBasicMaterial
              color={btnHovered ? "#5cf2d6" : "#5cf2d6"}
              transparent
              opacity={btnHovered ? 0.9 : 0.4}
            />
          </lineSegments>
          <Text
            fontSize={0.105}
            color={btnHovered ? "#04201f" : "#5cf2d6"}
            anchorX="center"
            anchorY="middle"
            position={[0, 0, 0.01]}
          >
            Explore →
          </Text>
        </group>
      </group>
    </group>
  );
}

// ==============================================================================
// 2. MAIN 3D PILLAR CAROUSEL COMPONENT
// ==============================================================================
export default function PillarCarousel3D({ onSelectPillar }: PillarCarousel3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartIdx = useRef(0);
  const animIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const pillars = PORTFOLIO_DATA.pillars;
  const total = pillars.length;

  // Circular navigation helpers
  const handlePrev = useCallback(() => {
    soundManager.playClickSound();
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    soundManager.playClickSound();
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // Autoplay (pauses on hover or drag)
  useEffect(() => {
    if (isHovered || isDragging) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHovered, isDragging, total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Mouse wheel navigation
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 20 || Math.abs(e.deltaY) > 40) {
      if (e.deltaX > 20 || e.deltaY > 40) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartIdx.current = activeIndex;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = e.clientX - dragStartX.current;
    if (diff > 45) {
      handlePrev();
    } else if (diff < -45) {
      handleNext();
    }
  };

  return (
    <div
      ref={containerRef}
      data-cursor="drag"
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Architectural Pillars 3D Carousel"
      onWheel={handleWheel}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="pillar-carousel-container relative w-full h-[560px] sm:h-[620px] rounded-3xl overflow-hidden select-none outline-none cursor-grab active:cursor-grabbing"
    >
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, -0.18, 5.25], fov: 44 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} color="#04201f" />
        <directionalLight position={[4, 6, 4]} intensity={2.4} color="#5cf2d6" />
        <directionalLight position={[-4, 3, -2]} intensity={1.5} color="#0b4d3c" />
        <pointLight position={[0, -2, 2]} intensity={1.4} color="#5cf2d6" />

        {/* Dynamic Spring Animation Engine */}
        <SceneController targetIndex={activeIndex} animIndexRef={animIndexRef} />

        {/* 4 Architectural Cards */}
        {pillars.map((pillar, idx) => (
          <CardMesh
            key={pillar.num}
            pillar={pillar}
            index={idx}
            activeIndex={activeIndex}
            animIndexRef={animIndexRef}
            onSelect={(selectedIdx) => {
              soundManager.playClickSound();
              setActiveIndex(selectedIdx);
            }}
            onExplore={onSelectPillar}
          />
        ))}
      </Canvas>

      {/* Floating Circular Prev / Next Controls */}
      <button
        onClick={handlePrev}
        aria-label="Previous Architectural Pillar"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-surface/80 border border-white/[0.1] hover:border-mint text-headline hover:text-mint backdrop-blur-md flex items-center justify-center transition-all shadow-xl cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Architectural Pillar"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-surface/80 border border-white/[0.1] hover:border-mint text-headline hover:text-mint backdrop-blur-md flex items-center justify-center transition-all shadow-xl cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot Pagination Bar */}
      <div className="absolute bottom-5 inset-x-0 z-20 flex items-center justify-center gap-2.5 pointer-events-auto">
        {pillars.map((p, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={p.num}
              onClick={() => {
                soundManager.playClickSound();
                setActiveIndex(idx);
              }}
              aria-label={`Jump to Pillar ${p.num}`}
              className={`transition-all duration-300 rounded-full focus:outline-none ${
                isActive
                  ? "w-8 h-2 bg-mint shadow-[0_0_8px_rgba(92,242,214,0.8)]"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

// Helper to continuously lerp/damp the animated index
function SceneController({
  targetIndex,
  animIndexRef,
}: {
  targetIndex: number;
  animIndexRef: React.MutableRefObject<number>;
}) {
  useFrame((_, delta) => {
    // Shortest-distance circular interpolation between 0 and 3
    let diff = targetIndex - animIndexRef.current;
    while (diff < -2) diff += 4;
    while (diff > 2) diff -= 4;

    animIndexRef.current += diff * Math.min(1, delta * 7.5);
  });

  return null;
}
