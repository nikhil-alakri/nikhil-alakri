"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MeshoptDecoder } from "meshoptimizer";
import { SITE_URLS } from "@/config/urls";
import { RotateCcw, Sparkles } from "lucide-react";

export default function ThreeHeroModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number;
    let isVisible = true;
    let controls: OrbitControls | null = null;
    let modelGroup: THREE.Group | null = null;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 4.2);

    // 3. Renderer setup
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

    // 4. Studio Lighting Rig (Tuned to #113946 Oceanic Canvas & #cbb594 Warm Brass)
    const ambientLight = new THREE.AmbientLight(0x164655, 1.8);
    scene.add(ambientLight);

    // Key Light (Warm Ivory)
    const keyLight = new THREE.DirectionalLight(0xfff2d8, 2.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Fill Light (Soft Seafoam Teal)
    const fillLight = new THREE.DirectionalLight(0x5eead4, 1.2);
    fillLight.position.set(-4, 2, -1);
    scene.add(fillLight);

    // Rim / Backlight (Warm Brass Accent)
    const rimLight = new THREE.PointLight(0xcbb594, 2.5, 10);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // Top Down Spotlight
    const topLight = new THREE.PointLight(0xffffff, 1.5, 8);
    topLight.position.set(0, 5, 1);
    scene.add(topLight);

    // 5. Controls setup
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Prevent page scroll hijack
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.4;
    controls.maxPolarAngle = Math.PI / 1.7; // Clamp to avoid flipping
    controls.minPolarAngle = Math.PI / 3.2;

    controls.addEventListener("start", () => setIsInteracting(true));
    controls.addEventListener("end", () => setIsInteracting(false));

    // 6. Floating group wrapper for physics bobbing
    const floatingGroup = new THREE.Group();
    scene.add(floatingGroup);

    // 7. Load GLB Model with MeshoptDecoder
    const loader = new GLTFLoader();

    MeshoptDecoder.ready
      .then(() => {
        loader.setMeshoptDecoder(MeshoptDecoder);

        loader.load(
          SITE_URLS.models.hero3d,
          (gltf) => {
            const model = gltf.scene;
            modelGroup = model;

            // Center & Normalize Model Geometry
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            model.position.sub(center);

            // Scale to comfortable viewport fit
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2.45 / (maxDim || 1);
            model.scale.setScalar(scale);

            // Enhance materials for PBR shine
            model.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                if (mesh.material) {
                  const mat = mesh.material as THREE.MeshStandardMaterial;
                  mat.roughness = Math.max(mat.roughness || 0.4, 0.35);
                  mat.metalness = Math.min(mat.metalness || 0.1, 0.5);
                  mat.needsUpdate = true;
                }
              }
            });

            floatingGroup.add(model);
            setLoading(false);
          },
          (xhr) => {
            if (xhr.total > 0) {
              const pct = Math.round((xhr.loaded / xhr.total) * 100);
              setProgress(pct);
            }
          },
          (err) => {
            console.error("ThreeJS GLB Load error:", err);
            setHasError(true);
            setLoading(false);
          }
        );
      })
      .catch((err) => {
        console.error("MeshoptDecoder ready error:", err);
        setHasError(true);
        setLoading(false);
      });

    // 8. Performance: IntersectionObserver pauses rendering when out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 9. Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    // 10. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // 0% CPU consumption when scrolled past hero

      const elapsed = clock.getElapsedTime();

      // Subtle organic vertical floating
      floatingGroup.position.y = Math.sin(elapsed * 1.6) * 0.07;

      if (controls) {
        controls.update();
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      if (controls) controls.dispose();

      // Deep dispose scene
      scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          const mesh = object as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((mat) => mat.dispose());
            } else {
              mesh.material.dispose();
            }
          }
        }
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] lg:h-[520px] rounded-3xl bg-surface/80 border border-surface-border overflow-hidden backdrop-blur-md shadow-2xl flex items-center justify-center group"
    >
      {/* Ambient background glow behind 3D model */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(203,181,148,0.18)_0%,rgba(94,234,212,0.08)_45%,transparent_75%)] pointer-events-none" />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full block cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        aria-label="Interactive 3D Engineering Model"
      />

      {/* Loading Skeleton / Progress */}
      {loading && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
          <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
            <Sparkles className="w-6 h-6 text-accent animate-pulse" />
          </div>
          <span className="font-primary text-sm font-semibold text-headline mb-1">
            Loading Interactive 3D Model
          </span>
          <span className="text-xs font-mono text-bodytext">
            {progress > 0 ? `Streaming assets... ${progress}%` : "Initializing Meshopt engine..."}
          </span>
        </div>
      )}

      {/* Fallback in case of WebGL error */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
          <RotateCcw className="w-8 h-8 text-accent mb-2" />
          <span className="text-xs font-mono text-bodytext">
            Interactive 3D preview initialized
          </span>
        </div>
      )}

      {/* Top Floating Badge */}
      <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-surface/90 border border-surface-border text-accent backdrop-blur-md shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-status animate-status-pulse" />
        <span>Three.js PBR Engine</span>
      </div>

      {/* Bottom Floating Interaction Hint */}
      <div
        className={`absolute bottom-4 inset-x-4 mx-auto max-w-fit z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-surface/90 border border-surface-border text-bodytext backdrop-blur-md shadow-lg transition-all duration-300 pointer-events-none ${
          isInteracting ? "opacity-30 scale-95" : "opacity-90 group-hover:opacity-100"
        }`}
      >
        <span className="text-accent">✦</span>
        <span>Drag to orbit 360° · Hardware accelerated</span>
      </div>
    </div>
  );
}
