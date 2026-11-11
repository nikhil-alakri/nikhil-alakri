"use client";

import React, { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import {
  Billboard,
  ContactShadows,
  Environment,
  Float,
  Text,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";
import { STATIONS } from "@/lib/scrollStation";
import { getCurrentTheme, THEME_PRESETS } from "@/lib/theme";
import AuroraBackground from "./AuroraBackground";

// Preload compressed model safely with local Draco decoder
if (typeof window !== "undefined") {
  try {
    useGLTF.preload("/3d-models/compressed/hero-pbr.glb", "/draco/");
  } catch {
    // Ignore preload errors on unsupported environments
  }
}

// ==============================================================================
// 1. WEBGL ERROR BOUNDARY (Zero Crash Guarantee)
// ==============================================================================
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("WebGL initialization unavailable, gracefully rendering 2D fallback:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

// ==============================================================================
// 2. BRANDED PRELOADER HUD
// ==============================================================================
export function BrandedPreloader() {
  const { active, progress } = useProgress();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
    }
  }, [active, progress]);

  if (!visible) return null;

  return (
    <div
      className="absolute bottom-4 right-4 z-20 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface/90 border border-mint/30 backdrop-blur-md shadow-lg transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
      role="status"
      aria-live="polite"
    >
      <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
      <span className="font-mono text-xs text-headline font-medium">
        Booting 3D engine… {Math.round(progress)}%
      </span>
    </div>
  );
}

// ==============================================================================
// 3. 3D STATION CONFIGURATIONS & CHOREOGRAPHY
// ==============================================================================
interface StationState {
  camPos: [number, number, number];
  camLookAt: [number, number, number];
  robotPosDesktop: [number, number, number];
  robotPosMobile: [number, number, number];
  robotRot: [number, number, number];
  robotScaleDesktop: number;
  robotScaleMobile: number;
  keyColor: string;
  fillColor: string;
  ambientColor: string;
  keyIntensity: number;
  particlesCenter: [number, number, number];
}

const STATION_STATES: StationState[] = [
  // 0: Hero
  {
    camPos: [0, 0, 5.2],
    camLookAt: [0.35, 0, 0],
    robotPosDesktop: [1.35, -0.25, 0],
    robotPosMobile: [0, -0.9, 0],
    robotRot: [0, -0.28, 0],
    robotScaleDesktop: 1.6,
    robotScaleMobile: 0.9,
    keyColor: "#5eead4",
    fillColor: "#1f4e5b",
    ambientColor: "#113946",
    keyIntensity: 2.3,
    particlesCenter: [1.2, 0, -1],
  },
  // 1: Pillars (Pushed to background right so 3D carousel has clean focal stage)
  {
    camPos: [-0.2, 0.1, 5.1],
    camLookAt: [0, 0, 0],
    robotPosDesktop: [2.45, -0.45, -1.8],
    robotPosMobile: [0, -2.5, -1.8],
    robotRot: [-0.05, -0.55, 0.05],
    robotScaleDesktop: 0.9,
    robotScaleMobile: 0.55,
    keyColor: "#a5f3fc",
    fillColor: "#0e7490",
    ambientColor: "#0d2731",
    keyIntensity: 2.1,
    particlesCenter: [0.5, 0.3, -0.5],
  },
  // 2: Terminal
  {
    camPos: [0.4, 0.1, 4.9],
    camLookAt: [-0.1, 0, 0],
    robotPosDesktop: [-1.4, -0.25, 0],
    robotPosMobile: [0, -1.3, -0.6],
    robotRot: [0.05, 0.45, 0],
    robotScaleDesktop: 1.45,
    robotScaleMobile: 0.75,
    keyColor: "#34d399",
    fillColor: "#064e3b",
    ambientColor: "#062e36",
    keyIntensity: 2.5,
    particlesCenter: [-0.8, 0.2, 0],
  },
  // 3: Career (Pushed far to the side and scaled down so it NEVER overlaps timeline text)
  {
    camPos: [0.3, -0.15, 5.0],
    camLookAt: [-0.1, -0.1, 0],
    robotPosDesktop: [2.15, -0.5, -0.8],
    robotPosMobile: [0, -3.2, -2.0],
    robotRot: [0.05, -0.4, 0],
    robotScaleDesktop: 1.15,
    robotScaleMobile: 0.6,
    keyColor: "#5cf2d6",
    fillColor: "#04201f",
    ambientColor: "#021413",
    keyIntensity: 2.2,
    particlesCenter: [1.8, -0.3, 0],
  },
  // 4: Projects (Off to the right side of the project cards)
  {
    camPos: [-0.35, 0.1, 4.9],
    camLookAt: [0.15, 0, 0],
    robotPosDesktop: [2.05, -0.3, -0.5],
    robotPosMobile: [0, -3.0, -2.0],
    robotRot: [0, -0.35, 0],
    robotScaleDesktop: 1.35,
    robotScaleMobile: 0.7,
    keyColor: "#5cf2d6",
    fillColor: "#0d4a3e",
    ambientColor: "#04201f",
    keyIntensity: 2.5,
    particlesCenter: [1.5, 0.1, 0],
  },
  // 5: Stack & FAQ (Pushed to background depth and side so FAQ text is 100% unobstructed)
  {
    camPos: [0, 0.2, 5.1],
    camLookAt: [0, 0.05, 0],
    robotPosDesktop: [2.2, 0.0, -1.6],
    robotPosMobile: [0, -3.2, -2.0],
    robotRot: [0, -0.3, 0],
    robotScaleDesktop: 0.95,
    robotScaleMobile: 0.5,
    keyColor: "#5cf2d6",
    fillColor: "#1e1b4b",
    ambientColor: "#04201f",
    keyIntensity: 2.2,
    particlesCenter: [1.5, 0.4, -1],
  },
  // 6: Contact
  {
    camPos: [0, -0.1, 4.5],
    camLookAt: [0, 0.1, 0],
    robotPosDesktop: [0, -0.45, 0.2],
    robotPosMobile: [0, -0.9, 0],
    robotRot: [-0.05, 0, 0],
    robotScaleDesktop: 1.6,
    robotScaleMobile: 1.0,
    keyColor: "#fef3c7",
    fillColor: "#5eead4",
    ambientColor: "#113946",
    keyIntensity: 2.8,
    particlesCenter: [0, 0, 0],
  },
];

// Helper to interpolate between two values
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpVec3(
  out: [number, number, number],
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  out[0] = lerp(a[0], b[0], t);
  out[1] = lerp(a[1], b[1], t);
  out[2] = lerp(a[2], b[2], t);
  return out;
}

// ==============================================================================
// 4. FLOATING AMBIENT PARTICLES
// ==============================================================================
function AmbientParticles({ stationFloat }: { stationFloat: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 35;

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const initialPositions = useMemo(() => {
    const pos: Array<[number, number, number]> = [];
    for (let i = 0; i < count; i++) {
      pos.push([
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 - 0.5,
      ]);
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const [x, y, z] = initialPositions[i];
      // Subtle organic float
      dummy.position.set(
        x + Math.sin(time * 0.4 + i) * 0.25,
        y + Math.cos(time * 0.3 + i * 2) * 0.25 - stationFloat * 0.1,
        z + Math.sin(time * 0.2 + i * 3) * 0.15
      );
      dummy.scale.setScalar(0.045 + Math.sin(time * 0.8 + i) * 0.015);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color="#5eead4"
        emissive="#2dd4bf"
        emissiveIntensity={0.6}
        roughness={0.3}
        metalness={0.2}
        transparent
        opacity={0.65}
      />
    </instancedMesh>
  );
}

// ==============================================================================
// 5. ROBOT MODEL & SCENE CHOREOGRAPHY
// ==============================================================================
interface SceneChoreographyProps {
  isMobile: boolean;
  stationFloat: number;
  prefersReducedMotion: boolean;
}

function SceneChoreography({
  isMobile,
  stationFloat,
  prefersReducedMotion,
}: SceneChoreographyProps) {
  const robotGroupRef = useRef<THREE.Group>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const { scene } = useGLTF("/3d-models/compressed/hero-pbr.glb", "/draco/");
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const m = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (m) {
          m.metalness = Math.min(m.metalness ?? 0.5, 0.35);
          m.roughness = Math.max(m.roughness ?? 0.4, 0.4);
          m.envMapIntensity = 1.4;
          m.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  // Micro-interaction reactive offsets for robot (nod, wave, celebrate)
  const reactionOffset = useRef({ rotX: 0, rotY: 0, rotZ: 0, posY: 0 });
  const customAccentColor = useRef<THREE.Color | null>(null);

  // Listen for robot micro-interactions and theme updates
  useEffect(() => {
    // Initialize theme color
    const initialTheme = getCurrentTheme();
    if (THEME_PRESETS[initialTheme]) {
      customAccentColor.current = new THREE.Color(THEME_PRESETS[initialTheme].accent);
    }

    const handleRobotReact = (e: Event) => {
      const detail = (e as CustomEvent<{ type: string }>).detail;
      if (!detail?.type) return;

      if (detail.type === "nod") {
        gsap.to(reactionOffset.current, {
          rotX: 0.28,
          duration: 0.18,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        });
      } else if (detail.type === "wave") {
        gsap.to(reactionOffset.current, {
          rotZ: 0.22,
          rotY: -0.25,
          duration: 0.2,
          yoyo: true,
          repeat: 3,
          ease: "sine.inOut",
          onComplete: () => {
            gsap.to(reactionOffset.current, { rotZ: 0, rotY: 0, duration: 0.3 });
          },
        });
      } else if (detail.type === "celebrate") {
        gsap.to(reactionOffset.current, {
          posY: 0.45,
          rotY: Math.PI * 2,
          duration: 1.2,
          ease: "power2.out",
          onComplete: () => {
            reactionOffset.current.posY = 0;
            reactionOffset.current.rotY = 0;
          },
        });
      }
    };

    const handleThemeChange = (e: Event) => {
      const detail = (e as CustomEvent<{ theme: string; accentHex: string }>).detail;
      if (detail?.accentHex) {
        customAccentColor.current = new THREE.Color(detail.accentHex);
      }
    };

    window.addEventListener("portfolio:robot-react", handleRobotReact);
    window.addEventListener("portfolio:theme-change", handleThemeChange);

    return () => {
      window.removeEventListener("portfolio:robot-react", handleRobotReact);
      window.removeEventListener("portfolio:theme-change", handleThemeChange);
    };
  }, []);

  // Compute interpolated target state
  const targetState = useMemo(() => {
    const maxIdx = STATION_STATES.length - 1;
    const clamped = Math.max(0, Math.min(maxIdx, stationFloat));
    const baseIdx = Math.floor(clamped);
    const nextIdx = Math.min(maxIdx, baseIdx + 1);
    const frac = clamped - baseIdx;

    const sA = STATION_STATES[baseIdx];
    const sB = STATION_STATES[nextIdx];

    const camPos: [number, number, number] = [0, 0, 0];
    lerpVec3(camPos, sA.camPos, sB.camPos, frac);

    const camLookAt: [number, number, number] = [0, 0, 0];
    if (isMobile) {
      lerpVec3(camLookAt, [0, sA.camLookAt[1], 0], [0, sB.camLookAt[1], 0], frac);
    } else {
      lerpVec3(camLookAt, sA.camLookAt, sB.camLookAt, frac);
    }

    const robotPos: [number, number, number] = [0, 0, 0];
    const posA = isMobile ? sA.robotPosMobile : sA.robotPosDesktop;
    const posB = isMobile ? sB.robotPosMobile : sB.robotPosDesktop;
    lerpVec3(robotPos, posA, posB, frac);

    const robotRot: [number, number, number] = [0, 0, 0];
    lerpVec3(robotRot, sA.robotRot, sB.robotRot, frac);

    const scaleA = isMobile ? sA.robotScaleMobile : sA.robotScaleDesktop;
    const scaleB = isMobile ? sB.robotScaleMobile : sB.robotScaleDesktop;
    const robotScale = lerp(scaleA, scaleB, frac);

    const colKeyA = new THREE.Color(sA.keyColor);
    const colKeyB = new THREE.Color(sB.keyColor);
    colKeyA.lerp(colKeyB, frac);

    const colFillA = new THREE.Color(sA.fillColor);
    const colFillB = new THREE.Color(sB.fillColor);
    colFillA.lerp(colFillB, frac);

    const colAmbA = new THREE.Color(sA.ambientColor);
    const colAmbB = new THREE.Color(sB.ambientColor);
    colAmbA.lerp(colAmbB, frac);

    const keyIntensity = lerp(sA.keyIntensity, sB.keyIntensity, frac);

    return {
      camPos,
      camLookAt,
      robotPos,
      robotRot,
      robotScale,
      keyColor: colKeyA,
      fillColor: colFillA,
      ambientColor: colAmbA,
      keyIntensity,
    };
  }, [stationFloat, isMobile]);

  useFrame((state, delta) => {
    // 1. Smooth Camera Transition
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetState.camPos[0], 2.8, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetState.camPos[1], 2.8, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetState.camPos[2], 2.8, delta);
    state.camera.lookAt(
      targetState.camLookAt[0],
      targetState.camLookAt[1],
      targetState.camLookAt[2]
    );

    // 2. Smooth Robot Model Transition with Pointer Follow
    if (robotGroupRef.current) {
      const pointerRotY = state.pointer.x * 0.25;
      const pointerRotX = -state.pointer.y * 0.15;

      robotGroupRef.current.position.x = THREE.MathUtils.damp(
        robotGroupRef.current.position.x,
        targetState.robotPos[0],
        3.0,
        delta
      );
      robotGroupRef.current.position.y = THREE.MathUtils.damp(
        robotGroupRef.current.position.y,
        targetState.robotPos[1],
        3.0,
        delta
      );
      robotGroupRef.current.position.z = THREE.MathUtils.damp(
        robotGroupRef.current.position.z,
        targetState.robotPos[2],
        3.0,
        delta
      );

      robotGroupRef.current.rotation.x = THREE.MathUtils.damp(
        robotGroupRef.current.rotation.x,
        targetState.robotRot[0] + pointerRotX,
        3.0,
        delta
      );
      robotGroupRef.current.rotation.y = THREE.MathUtils.damp(
        robotGroupRef.current.rotation.y,
        targetState.robotRot[1] + pointerRotY,
        3.0,
        delta
      );
      robotGroupRef.current.rotation.z = THREE.MathUtils.damp(
        robotGroupRef.current.rotation.z,
        targetState.robotRot[2],
        3.0,
        delta
      );

      // Incorporate reactive micro-interaction offsets
      robotGroupRef.current.position.y += reactionOffset.current.posY;
      robotGroupRef.current.rotation.x += reactionOffset.current.rotX;
      robotGroupRef.current.rotation.y += reactionOffset.current.rotY;
      robotGroupRef.current.rotation.z += reactionOffset.current.rotZ;

      const currentScale = robotGroupRef.current.scale.x;
      const nextScale = THREE.MathUtils.damp(currentScale, targetState.robotScale, 3.0, delta);
      robotGroupRef.current.scale.setScalar(nextScale);
    }

    // 3. Smooth Lighting Color & Intensity Shift (Synced with dynamic Theme Switcher)
    if (keyLightRef.current) {
      const activeColor = customAccentColor.current || targetState.keyColor;
      keyLightRef.current.color.lerp(activeColor, delta * 3.0);
      keyLightRef.current.intensity = THREE.MathUtils.damp(
        keyLightRef.current.intensity,
        targetState.keyIntensity,
        2.5,
        delta
      );
    }
    if (fillLightRef.current) {
      fillLightRef.current.color.lerp(targetState.fillColor, delta * 2.5);
    }
    if (ambientLightRef.current) {
      ambientLightRef.current.color.lerp(targetState.ambientColor, delta * 2.5);
    }
  });

  return (
    <>
      {/* Dynamic Station Lighting Rig (Self-contained, Zero external CDN network lag) */}
      <ambientLight ref={ambientLightRef} intensity={1.2} color="#113946" />
      <directionalLight ref={keyLightRef} position={[5, 8, 5]} intensity={2.6} color="#5eead4" />
      <directionalLight ref={fillLightRef} position={[-5, 3, -2]} intensity={1.5} color="#1f4e5b" />
      <directionalLight position={[-2, -3, -4]} intensity={1.2} color="#0d4a3e" />
      <directionalLight position={[0, 4, -5]} intensity={1.8} color="#5cf2d6" />
      <pointLight position={[0, -1, 3]} intensity={1.8} color="#cbb594" />
      <hemisphereLight intensity={0.9} color="#5cf2d6" groundColor="#04201f" />

      {/* Procedural Local In-Memory Environment Reflection (Zero external network requests) */}
      <Environment>
        <mesh scale={100}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#04201f" side={THREE.BackSide} />
        </mesh>
        <mesh position={[6, 12, 6]} scale={14}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#5cf2d6" />
        </mesh>
        <mesh position={[-6, 6, -6]} scale={12}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#0b4d3c" />
        </mesh>
      </Environment>

      {/* Floating Ambient Particles shifting across stations */}
      <AmbientParticles stationFloat={stationFloat} />

      {/* Main 3D Robot Actor */}
      <group ref={robotGroupRef} position={isMobile ? [0, -0.9, 0] : [1.35, -0.3, 0]} scale={isMobile ? 0.9 : 1.55}>
        <Float
          speed={prefersReducedMotion ? 0 : 1.6}
          rotationIntensity={prefersReducedMotion ? 0 : 0.15}
          floatIntensity={prefersReducedMotion ? 0 : 0.25}
          floatingRange={[-0.05, 0.05]}
        >
          <primitive object={scene} />

          {/* Hotspot 1: Chest Core (Visible on Hero Station) */}
          {stationFloat < 0.6 && !isMobile && (
            <group position={[0, 0.9, 0.45]}>
              <mesh
                onPointerOver={() => setHoveredHotspot("core")}
                onPointerOut={() => setHoveredHotspot(null)}
              >
                <sphereGeometry args={[0.045, 16, 16]} />
                <meshStandardMaterial
                  color="#5eead4"
                  emissive="#5eead4"
                  emissiveIntensity={hoveredHotspot === "core" ? 2.5 : 1.2}
                />
              </mesh>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.065, 0.08, 24]} />
                <meshBasicMaterial
                  color="#5eead4"
                  transparent
                  opacity={hoveredHotspot === "core" ? 0.9 : 0.4}
                  side={THREE.DoubleSide}
                />
              </mesh>

              {hoveredHotspot === "core" && (
                <Billboard position={[0.7, 0.1, 0]}>
                  <mesh position={[0, 0, -0.01]}>
                    <planeGeometry args={[1.65, 0.52]} />
                    <meshBasicMaterial color="#04201f" transparent opacity={0.92} />
                  </mesh>
                  <lineSegments position={[0, 0, -0.005]}>
                    <edgesGeometry args={[new THREE.PlaneGeometry(1.65, 0.52)]} />
                    <lineBasicMaterial color="#5eead4" transparent opacity={0.6} />
                  </lineSegments>
                  <Text
                    fontSize={0.062}
                    letterSpacing={0.08}
                    color="#5cf2d6"
                    position={[-0.72, 0.11, 0]}
                    anchorX="left"
                    anchorY="middle"
                  >
                    DESIGN SYSTEM ENGINE
                  </Text>
                  <Text
                    fontSize={0.048}
                    color="#e2e8f0"
                    position={[-0.72, -0.09, 0]}
                    anchorX="left"
                    anchorY="middle"
                    maxWidth={1.4}
                  >
                    Lit & React Web Components · WCAG AA
                  </Text>
                </Billboard>
              )}
            </group>
          )}

          {/* Hotspot 2: Primary Arm Armament */}
          {stationFloat < 0.6 && !isMobile && (
            <group position={[0.7, 0.4, 0.4]}>
              <mesh
                onPointerOver={() => setHoveredHotspot("weapon")}
                onPointerOut={() => setHoveredHotspot(null)}
              >
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial
                  color="#cbb594"
                  emissive="#cbb594"
                  emissiveIntensity={hoveredHotspot === "weapon" ? 2.2 : 1.0}
                />
              </mesh>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.06, 0.075, 24]} />
                <meshBasicMaterial
                  color="#cbb594"
                  transparent
                  opacity={hoveredHotspot === "weapon" ? 0.9 : 0.4}
                  side={THREE.DoubleSide}
                />
              </mesh>

              {hoveredHotspot === "weapon" && (
                <Billboard position={[0.65, 0.05, 0]}>
                  <mesh position={[0, 0, -0.01]}>
                    <planeGeometry args={[1.65, 0.52]} />
                    <meshBasicMaterial color="#04201f" transparent opacity={0.92} />
                  </mesh>
                  <lineSegments position={[0, 0, -0.005]}>
                    <edgesGeometry args={[new THREE.PlaneGeometry(1.65, 0.52)]} />
                    <lineBasicMaterial color="#cbb594" transparent opacity={0.6} />
                  </lineSegments>
                  <Text
                    fontSize={0.062}
                    letterSpacing={0.08}
                    color="#cbb594"
                    position={[-0.72, 0.11, 0]}
                    anchorX="left"
                    anchorY="middle"
                  >
                    MULTIMODAL AI RAG
                  </Text>
                  <Text
                    fontSize={0.048}
                    color="#e2e8f0"
                    position={[-0.72, -0.09, 0]}
                    anchorX="left"
                    anchorY="middle"
                    maxWidth={1.4}
                  >
                    odin-eye Reverse Engineering · ChromaDB
                  </Text>
                </Billboard>
              )}
            </group>
          )}
        </Float>
      </group>

      {/* Dynamic Soft Contact Shadows */}
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.6}
        scale={8}
        blur={2.5}
        far={5}
        color="#081c23"
      />
    </>
  );
}

// ==============================================================================
// 6. PERSISTENT FIXED CANVAS WRAPPER
// ==============================================================================
export default function SceneCanvas() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [stationFloat, setStationFloat] = useState(0);

  useEffect(() => {
    setHasWebGL(checkWebGLSupport());

    const checkViewport = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkViewport();

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleMotion = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotion);
    window.addEventListener("resize", checkViewport);

    // Continuous scroll progress tracker across the 8 stations
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;

      // Find section offsets
      const positions = STATIONS.map((st) => {
        const el = document.getElementById(st.id);
        return el ? el.offsetTop : 0;
      });

      // Find which section range we are currently within
      const scrollTarget = scrollY + windowH * 0.3;
      let calculatedStation = 0;

      for (let i = 0; i < positions.length - 1; i++) {
        const currentTop = positions[i];
        const nextTop = positions[i + 1];

        if (scrollTarget >= currentTop && scrollTarget <= nextTop) {
          const progressInRange = (scrollTarget - currentTop) / Math.max(1, nextTop - currentTop);
          calculatedStation = i + progressInRange;
          break;
        } else if (scrollTarget > nextTop && i === positions.length - 2) {
          calculatedStation = positions.length - 1;
        }
      }

      setStationFloat(calculatedStation);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("resize", checkViewport);
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleMotion);
    };
  }, []);

  if (hasWebGL === false) {
    return null;
  }

  return (
    <WebGLErrorBoundary>
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full"
        aria-hidden="true"
      >
        <Canvas
          style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          camera={{ position: [0, 0, 5.2], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          onCreated={({ gl }) => {
            const canvasEl = gl.domElement;
            canvasEl.addEventListener("webglcontextlost", (event) => {
              event.preventDefault();
              console.warn("WebGL Context Lost on Safari/iOS. Pausing renderer.");
            });
            canvasEl.addEventListener("webglcontextrestored", () => {
              console.log("WebGL Context Restored. Resuming 3D scene.");
            });
          }}
        >
          {/* Subtle atmospheric scene fog matching the deep teal canvas */}
          <fog attach="fog" args={["#04201f", 7, 26]} />

          {/* Animated Fullscreen Aurora & Procedural Film Grain Shader */}
          <AuroraBackground stationFloat={stationFloat} />

          <Suspense fallback={null}>
            <SceneChoreography
              isMobile={isMobile}
              stationFloat={stationFloat}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Suspense>
        </Canvas>

        {/* Non-blocking Preloader HUD */}
        <BrandedPreloader />
      </div>
    </WebGLErrorBoundary>
  );
}
