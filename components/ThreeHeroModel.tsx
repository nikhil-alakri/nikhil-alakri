"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MeshoptDecoder } from "meshoptimizer";
import { SITE_URLS } from "@/config/urls";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SunMedium, 
  Box, 
  Layers, 
  Sparkles, 
  Eye, 
  Keyboard,
  Compass
} from "lucide-react";

type LightingMood = "studio" | "cyber" | "neon" | "clean";

interface ModelOption {
  id: string;
  name: string;
  url: string;
  scaleFactor: number;
}

const AVAILABLE_MODELS: ModelOption[] = [
  {
    id: "pbr",
    name: "PBR Master",
    url: SITE_URLS.models.hero3d,
    scaleFactor: 2.12, // Adjusted for perfect framing without wingtip clipping
  },
  {
    id: "rigged",
    name: "Rigged Character",
    url: SITE_URLS.models.heroRigged,
    scaleFactor: 2.05,
  },
];

export default function ThreeHeroModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Interactive State
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [mood, setMood] = useState<LightingMood>("studio");
  const [isInteracting, setIsInteracting] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

  // Three.js mutable refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const floatingGroupRef = useRef<THREE.Group | null>(null);
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    key: THREE.DirectionalLight;
    fill: THREE.DirectionalLight;
    rim: THREE.PointLight;
    top: THREE.PointLight;
  } | null>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  // 1. Lighting Mood Applicator
  const applyLightingMood = useCallback((selectedMood: LightingMood) => {
    if (!lightsRef.current) return;
    const { ambient, key, fill, rim, top } = lightsRef.current;

    switch (selectedMood) {
      case "studio": // Warm Ivory & Warm Brass (Site Canvas Palette)
        ambient.color.setHex(0x164655);
        ambient.intensity = 1.8;
        key.color.setHex(0xfff2d8);
        key.intensity = 2.8;
        fill.color.setHex(0x5eead4);
        fill.intensity = 1.2;
        rim.color.setHex(0xcbb594);
        rim.intensity = 2.5;
        top.color.setHex(0xffffff);
        top.intensity = 1.4;
        break;

      case "cyber": // High-Contrast Electric Oceanic & Seafoam
        ambient.color.setHex(0x0c2a34);
        ambient.intensity = 1.4;
        key.color.setHex(0x5eead4);
        key.intensity = 3.2;
        fill.color.setHex(0x0284c7);
        fill.intensity = 2.0;
        rim.color.setHex(0x2dd4bf);
        rim.intensity = 3.5;
        top.color.setHex(0x67e8f9);
        top.intensity = 1.8;
        break;

      case "neon": // Avant-Garde Ultraviolet & Warm Coral
        ambient.color.setHex(0x1e1035);
        ambient.intensity = 1.6;
        key.color.setHex(0xf43f5e);
        key.intensity = 3.0;
        fill.color.setHex(0x8b5cf6);
        fill.intensity = 2.4;
        rim.color.setHex(0xf59e0b);
        rim.intensity = 3.2;
        top.color.setHex(0xd946ef);
        top.intensity = 2.0;
        break;

      case "clean": // Pure Editorial Daylight Studio
        ambient.color.setHex(0xffffff);
        ambient.intensity = 2.0;
        key.color.setHex(0xffffff);
        key.intensity = 3.0;
        fill.color.setHex(0xe2e8f0);
        fill.intensity = 1.5;
        rim.color.setHex(0xf8fafc);
        rim.intensity = 1.8;
        top.color.setHex(0xffffff);
        top.intensity = 1.5;
        break;
    }
  }, []);

  // 2. Wireframe Toggle Function
  const applyWireframe = useCallback((isWireframe: boolean) => {
    if (!modelGroupRef.current) return;
    modelGroupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if ("wireframe" in mat) {
                (mat as THREE.MeshStandardMaterial).wireframe = isWireframe;
              }
            });
          } else if ("wireframe" in mesh.material) {
            (mesh.material as THREE.MeshStandardMaterial).wireframe = isWireframe;
          }
        }
      }
    });
  }, []);

  // 3. Model Loader Function
  const loadModel = useCallback((modelIndex: number) => {
    const floatingGroup = floatingGroupRef.current;
    if (!floatingGroup) return;

    setLoading(true);
    setProgress(0);

    // Clean existing model
    if (modelGroupRef.current) {
      floatingGroup.remove(modelGroupRef.current);
      modelGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
        }
      });
      modelGroupRef.current = null;
    }

    const loader = new GLTFLoader();
    MeshoptDecoder.ready
      .then(() => {
        loader.setMeshoptDecoder(MeshoptDecoder);
        const targetModel = AVAILABLE_MODELS[modelIndex];

        loader.load(
          targetModel.url,
          (gltf) => {
            const model = gltf.scene;
            modelGroupRef.current = model;

            // Compute bounding box & center model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            model.position.sub(center);

            // Scale accurately
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = targetModel.scaleFactor / (maxDim || 1);
            model.scale.setScalar(scale);

            // Enhance materials
            model.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                if (mesh.material) {
                  const mat = mesh.material as THREE.MeshStandardMaterial;
                  mat.roughness = Math.max(mat.roughness || 0.4, 0.35);
                  mat.metalness = Math.min(mat.metalness || 0.1, 0.45);
                  mat.wireframe = wireframe;
                  mat.needsUpdate = true;
                }
              }
            });

            floatingGroup.add(model);
            setLoading(false);
          },
          (xhr) => {
            if (xhr.total > 0) {
              setProgress(Math.round((xhr.loaded / xhr.total) * 100));
            }
          },
          (err) => {
            console.error("ThreeJS load error:", err);
            setLoading(false);
          }
        );
      })
      .catch((err) => {
        console.error("Meshopt ready error:", err);
        setLoading(false);
      });
  }, [wireframe]);

  // 4. Reset Camera & Position
  const handleResetCamera = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current || !floatingGroupRef.current) return;
    cameraRef.current.position.set(0, 0.8, 4.2);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.reset();
    floatingGroupRef.current.rotation.set(0, 0, 0);
    targetRotation.current = { x: 0, y: 0 };
  }, []);

  // 5. Spin Trick (Key F or Double Click)
  const handlePerformSpin = useCallback(() => {
    if (!floatingGroupRef.current) return;
    const group = floatingGroupRef.current;
    let spinProgress = 0;
    const spinStep = () => {
      spinProgress += 0.12;
      group.rotation.y += 0.22;
      if (spinProgress < Math.PI * 2) {
        requestAnimationFrame(spinStep);
      }
    };
    spinStep();
  }, []);

  // 6. Keyboard Shortcut Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const key = e.key.toLowerCase();
      setActiveKey(e.key.toUpperCase());
      setTimeout(() => setActiveKey(null), 300);

      switch (key) {
        case " ": // Space: Toggle auto-rotation
          e.preventDefault();
          setAutoRotate((prev) => !prev);
          break;

        case "w": // W: Wireframe toggle
          setWireframe((prev) => {
            const next = !prev;
            applyWireframe(next);
            return next;
          });
          break;

        case "l": // L: Cycle lighting mood
          setMood((prev) => {
            const moods: LightingMood[] = ["studio", "cyber", "neon", "clean"];
            const next = moods[(moods.indexOf(prev) + 1) % moods.length];
            applyLightingMood(next);
            return next;
          });
          break;

        case "r": // R: Reset view
          handleResetCamera();
          break;

        case "f": // F: Spin trick
          handlePerformSpin();
          break;

        case "1": // 1: Model 1 (PBR)
          setCurrentModelIndex(0);
          loadModel(0);
          break;

        case "2": // 2: Model 2 (Rigged)
          setCurrentModelIndex(1);
          loadModel(1);
          break;

        case "arrowleft": // Left: Rotate left
          if (floatingGroupRef.current) floatingGroupRef.current.rotation.y -= 0.15;
          break;

        case "arrowright": // Right: Rotate right
          if (floatingGroupRef.current) floatingGroupRef.current.rotation.y += 0.15;
          break;

        case "arrowup": // Up: Pitch up
          if (floatingGroupRef.current) floatingGroupRef.current.rotation.x -= 0.1;
          break;

        case "arrowdown": // Down: Pitch down
          if (floatingGroupRef.current) floatingGroupRef.current.rotation.x += 0.1;
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [applyWireframe, applyLightingMood, handleResetCamera, handlePerformSpin, loadModel]);

  // 7. Initialize Three.js Viewport
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number;
    let isVisible = true;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 480;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 4.45);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x164655, 1.8);
    const keyLight = new THREE.DirectionalLight(0xfff2d8, 2.8);
    keyLight.position.set(4, 5, 4);
    const fillLight = new THREE.DirectionalLight(0x5eead4, 1.2);
    fillLight.position.set(-4, 2, -1);
    const rimLight = new THREE.PointLight(0xcbb594, 2.5, 10);
    rimLight.position.set(0, 3, -3);
    const topLight = new THREE.PointLight(0xffffff, 1.4, 8);
    topLight.position.set(0, 5, 1);

    scene.add(ambientLight, keyLight, fillLight, rimLight, topLight);
    lightsRef.current = { ambient: ambientLight, key: keyLight, fill: fillLight, rim: rimLight, top: topLight };

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 2.8;
    controls.maxDistance = 6.5;
    controls.enablePan = false;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.4;
    controls.maxPolarAngle = Math.PI / 1.7;
    controls.minPolarAngle = Math.PI / 3.2;

    controls.addEventListener("start", () => setIsInteracting(true));
    controls.addEventListener("end", () => setIsInteracting(false));
    controlsRef.current = controls;

    // Floating Group
    const floatingGroup = new THREE.Group();
    scene.add(floatingGroup);
    floatingGroupRef.current = floatingGroup;

    // 3D Stardust Particle Constellation (Inspired by FLORIA)
    const particleCount = 240;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorIvory = new THREE.Color(0xfff2d8);
    const colorSeafoam = new THREE.Color(0x5eead4);
    const colorBrass = new THREE.Color(0xcbb594);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 2.0 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i3 + 2] = radius * Math.cos(phi);

      const mixedColor = Math.random() > 0.65 ? colorSeafoam : Math.random() > 0.35 ? colorBrass : colorIvory;
      particleColors[i3] = mixedColor.r;
      particleColors[i3 + 1] = mixedColor.g;
      particleColors[i3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Initial Model Load
    loadModel(currentModelIndex);

    // Mouse Move Parallax Tracker (When not dragging)
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current = { x, y };
      targetRotation.current = { x: y * 0.15, y: x * 0.35 };
    };
    container.addEventListener("mousemove", handleMouseMove);

    // Double Click Spin Trick
    container.addEventListener("dblclick", handlePerformSpin);

    // Performance Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    // Scroll Parallax Handler (Passive 60fps)
    let currentScrollY = 0;
    const handleScroll = () => {
      currentScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return; // 0% CPU consumption when scrolled away

      const elapsed = clock.getElapsedTime();

      // Organic subtle vertical bobbing with slight scroll influence
      floatingGroup.position.y = Math.sin(elapsed * 1.5) * 0.06 - Math.min(currentScrollY * 0.0006, 0.3);

      // Particle Constellation slow organic drift
      particleSystem.rotation.y = elapsed * 0.03 + currentScrollY * 0.0003;
      particleSystem.rotation.x = Math.sin(elapsed * 0.02) * 0.04;

      // Dynamic Specular Keylight tracking cursor
      if (lightsRef.current) {
        lightsRef.current.key.position.x = 4 + mousePos.current.x * 2.2;
        lightsRef.current.key.position.y = 5 + mousePos.current.y * 1.8;
      }

      // Gentle cursor-following lerp when not orbiting manually
      if (!isInteracting && floatingGroup) {
        floatingGroup.rotation.y += (targetRotation.current.y - floatingGroup.rotation.y) * 0.04;
        floatingGroup.rotation.x += (targetRotation.current.x - floatingGroup.rotation.x) * 0.04;
      }

      if (controls) {
        controls.autoRotate = autoRotate;
        controls.update();
      }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("dblclick", handlePerformSpin);
      observer.disconnect();

      particleGeometry.dispose();
      particleMaterial.dispose();

      if (controls) controls.dispose();
      renderer.dispose();
    };
  }, []);

  // Update auto-rotate on state change
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] sm:h-[480px] md:h-[520px] lg:h-[560px] rounded-3xl bg-surface/85 border border-surface-border overflow-hidden backdrop-blur-md shadow-2xl flex items-center justify-center group select-none"
    >
      {/* Ambient Radial Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(203,181,148,0.2)_0%,rgba(94,234,212,0.08)_50%,transparent_75%)] pointer-events-none" />

      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full block cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        aria-label="Interactive 3D Stage with Keyboard & Mouse Controls"
      />

      {/* Loading Skeleton */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
          <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
            <Sparkles className="w-6 h-6 text-accent animate-pulse" />
          </div>
          <span className="font-primary text-sm font-semibold text-headline mb-1">
            Loading {AVAILABLE_MODELS[currentModelIndex].name}
          </span>
          <span className="text-xs font-mono text-bodytext">
            {progress > 0 ? `Streaming 3D buffers... ${progress}%` : "Meshopt WASM decoding..."}
          </span>
        </div>
      )}

      {/* Active Key Feedback Pill */}
      {activeKey && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none animate-ping">
          <div className="px-4 py-2 rounded-xl bg-accent text-background font-mono font-bold text-lg shadow-2xl">
            {activeKey}
          </div>
        </div>
      )}

      {/* Top Header Bar: Model Selector + Engine Badge */}
      <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
        
        {/* Model Switcher Pill */}
        <div className="pointer-events-auto inline-flex items-center gap-1 p-1 rounded-2xl bg-surface/90 border border-surface-border backdrop-blur-md shadow-md">
          {AVAILABLE_MODELS.map((model, idx) => (
            <button
              key={model.id}
              onClick={() => {
                setCurrentModelIndex(idx);
                loadModel(idx);
              }}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-semibold transition-all ${
                currentModelIndex === idx
                  ? "bg-accent text-background shadow-sm"
                  : "text-bodytext hover:text-headline hover:bg-surface-elevated"
              }`}
              title={`Switch to ${model.name} (Press Key ${idx + 1})`}
            >
              <span>{idx + 1}: {model.name}</span>
            </button>
          ))}
        </div>

        {/* Keyboard Help Toggle */}
        <button
          onClick={() => setShowKeyboardHelp((prev) => !prev)}
          className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-medium bg-surface/90 border border-surface-border text-accent hover:border-accent hover:bg-surface-elevated transition-all backdrop-blur-md shadow-sm"
          title="Toggle Keyboard Shortcuts HUD"
        >
          <Keyboard className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Keys</span>
        </button>
      </div>

      {/* Keyboard Shortcuts Drawer Overlay */}
      {showKeyboardHelp && (
        <div className="absolute inset-x-4 top-16 z-30 p-4 rounded-2xl bg-surface/95 border border-accent/40 backdrop-blur-lg shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-surface-border">
            <span className="font-mono text-xs font-bold text-headline flex items-center gap-2">
              <Compass className="w-4 h-4 text-accent" />
              Interactive 3D Shortcuts
            </span>
            <button
              onClick={() => setShowKeyboardHelp(false)}
              className="text-xs font-mono text-bodytext hover:text-headline"
            >
              ✕ Close
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
            <div className="flex items-center gap-2 text-bodytext">
              <kbd className="px-2 py-1 rounded bg-background border border-surface-border text-accent">Space</kbd>
              <span>Auto-Rotate</span>
            </div>
            <div className="flex items-center gap-2 text-bodytext">
              <kbd className="px-2 py-1 rounded bg-background border border-surface-border text-accent">W</kbd>
              <span>Wireframe</span>
            </div>
            <div className="flex items-center gap-2 text-bodytext">
              <kbd className="px-2 py-1 rounded bg-background border border-surface-border text-accent">L</kbd>
              <span>Lighting Mood</span>
            </div>
            <div className="flex items-center gap-2 text-bodytext">
              <kbd className="px-2 py-1 rounded bg-background border border-surface-border text-accent">1 / 2</kbd>
              <span>Switch Model</span>
            </div>
            <div className="flex items-center gap-2 text-bodytext">
              <kbd className="px-2 py-1 rounded bg-background border border-surface-border text-accent">R</kbd>
              <span>Reset Camera</span>
            </div>
            <div className="flex items-center gap-2 text-bodytext">
              <kbd className="px-2 py-1 rounded bg-background border border-surface-border text-accent">F</kbd>
              <span>Focus 360 Spin</span>
            </div>
            <div className="flex items-center gap-2 text-bodytext">
              <kbd className="px-2 py-1 rounded bg-background border border-surface-border text-accent">← → ↑ ↓</kbd>
              <span>Nudge Angle</span>
            </div>
            <div className="flex items-center gap-2 text-bodytext">
              <kbd className="px-2 py-1 rounded bg-background border border-surface-border text-accent">Dbl-Click</kbd>
              <span>Dynamic Spin</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Interactive HUD Control Deck */}
      <div className="absolute bottom-4 inset-x-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Left Action Buttons */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-2xl bg-surface/90 border border-surface-border backdrop-blur-md shadow-lg">
          
          {/* Play/Pause Rotation */}
          <button
            onClick={() => setAutoRotate((prev) => !prev)}
            className={`p-2 rounded-xl transition-all ${
              autoRotate ? "bg-accent/20 text-accent" : "text-bodytext hover:text-headline hover:bg-surface-elevated"
            }`}
            title="Toggle Auto-Rotation (Press Space)"
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Wireframe Toggle */}
          <button
            onClick={() => {
              setWireframe((prev) => {
                const next = !prev;
                applyWireframe(next);
                return next;
              });
            }}
            className={`p-2 rounded-xl transition-all ${
              wireframe ? "bg-accent text-background" : "text-bodytext hover:text-headline hover:bg-surface-elevated"
            }`}
            title="Toggle Wireframe Mesh (Press W)"
          >
            <Box className="w-3.5 h-3.5" />
          </button>

          {/* Lighting Mood Switcher */}
          <button
            onClick={() => {
              setMood((prev) => {
                const moods: LightingMood[] = ["studio", "cyber", "neon", "clean"];
                const next = moods[(moods.indexOf(prev) + 1) % moods.length];
                applyLightingMood(next);
                return next;
              });
            }}
            className="p-2 rounded-xl text-bodytext hover:text-headline hover:bg-surface-elevated transition-all flex items-center gap-1"
            title={`Cycle Lighting Mood: ${mood.toUpperCase()} (Press L)`}
          >
            <SunMedium className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] font-mono uppercase font-semibold hidden sm:inline">
              {mood}
            </span>
          </button>

          {/* Reset Camera */}
          <button
            onClick={handleResetCamera}
            className="p-2 rounded-xl text-bodytext hover:text-headline hover:bg-surface-elevated transition-all"
            title="Reset Camera View (Press R)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Spin Trick */}
          <button
            onClick={handlePerformSpin}
            className="p-2 rounded-xl text-bodytext hover:text-headline hover:bg-surface-elevated transition-all"
            title="Spin Trick (Press F or Double-Click)"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
          </button>
        </div>

        {/* Right Interaction Indicator */}
        <div
          className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono bg-surface/90 border border-surface-border text-bodytext backdrop-blur-md shadow-md transition-opacity duration-300 ${
            isInteracting ? "opacity-30" : "opacity-90"
          }`}
        >
          <span className="text-accent">✦</span>
          <span>Drag 360° · Scroll to Zoom</span>
        </div>
      </div>
    </div>
  );
}
