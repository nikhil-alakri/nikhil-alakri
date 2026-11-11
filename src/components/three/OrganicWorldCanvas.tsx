
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  createOrganicPortal,
  createFloatingOrbs,
  createStonePlinth,
  createFloatingLaptop,
  createSteppedCareerPillars,
  createIlluminatedMonolith,
  PALETTE,
} from "./ProceduralAssets";

export default function OrganicWorldCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number;
    let isVisible = true;

    // 1. Scene & Atmospheric Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x113946, 0.052);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      60
    );
    camera.position.set(0, 0, 5.8);

    // 3. Renderer (Hardware Accelerated, Retain Transparency)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(PALETTE.softTeal, 1.4);
    scene.add(ambientLight);

    // Warm Sun Keylight
    const sunLight = new THREE.DirectionalLight(0xfff2d8, 2.4);
    sunLight.position.set(5, 8, 6);
    scene.add(sunLight);

    // Soft Ceramic Rim Light
    const rimLight = new THREE.PointLight(PALETTE.brassAccent, 2.0, 15);
    rimLight.position.set(-6, -4, 4);
    scene.add(rimLight);

    // Bottom Ambient Fill
    const fillLight = new THREE.DirectionalLight(0x1f4e5b, 1.2);
    fillLight.position.set(0, -10, 5);
    scene.add(fillLight);

    // 5. STAGES ACROSS VERTICAL SCENE (Y AXIS)
    // Stage A: Organic Sculpted Portal (Hero)
    const portal = createOrganicPortal();
    portal.position.set(1.4, 0.2, -0.6);
    scene.add(portal);

    // Stage B: Instanced Floating Orbs (Everywhere)
    const { instancedMesh: orbsMesh, orbsData } = createFloatingOrbs(50);
    scene.add(orbsMesh);

    // Stage C: Featured Healthcare Plinth & 3D Laptop
    const laptopStage = new THREE.Group();
    laptopStage.position.set(0.6, -6.2, 0.2);

    const stonePlinth = createStonePlinth(1.8, 0.45);
    stonePlinth.position.set(0, -0.3, 0);
    laptopStage.add(stonePlinth);

    const { laptopGroup, screenTexture } = createFloatingLaptop();
    laptopGroup.position.set(0, 0.35, 0.1);
    laptopStage.add(laptopGroup);
    scene.add(laptopStage);

    // Stage D: Stepped Career Pillars
    const careerPillars = createSteppedCareerPillars();
    careerPillars.position.set(-0.4, -12.4, -0.2);
    scene.add(careerPillars);

    // Stage E: Illuminated Monolith Plinth (Footer)
    const monolith = createIlluminatedMonolith();
    monolith.position.set(0, -18.2, 0);
    scene.add(monolith);

    // 6. Scroll & Mouse Tracking
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };
    let scrollProgress = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      scrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      // Map scroll progress to Three.js Y depth (0 to -18.2)
      targetScrollY = -scrollProgress * 18.2;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Visibility Observer
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // 7. Render Loop with Smooth Spring Physics
    const clock = new THREE.Clock();
    const dummy = new THREE.Object3D();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      // Smooth Camera Flight along Y Axis with subtle Parallax
      camera.position.y += (targetScrollY - camera.position.y) * 0.06;
      camera.position.x = mouse.x * 0.45;
      camera.rotation.y = -mouse.x * 0.05;
      camera.rotation.x = mouse.y * 0.04;

      // Animate Organic Portal (Gentle breathing and subtle twist)
      portal.rotation.z = Math.sin(elapsed * 0.4) * 0.06;
      portal.rotation.x = Math.PI * 0.12 + Math.cos(elapsed * 0.3) * 0.04;
      portal.position.y = 0.2 + Math.sin(elapsed * 0.8) * 0.08;

      // Animate Floating 3D Laptop (Isometric floating hover on plinth)
      laptopGroup.position.y = 0.35 + Math.sin(elapsed * 1.4) * 0.06;
      laptopGroup.rotation.y = -0.45 + mouse.x * 0.15;
      laptopGroup.rotation.x = 0.35 - mouse.y * 0.1;

      // Animate Floating Orbs Instanced Matrix
      for (let i = 0; i < orbsData.length; i++) {
        const orb = orbsData[i];
        const bob = Math.sin(elapsed * orb.velocity + orb.offset) * 0.18;
        const driftX = Math.cos(elapsed * 0.5 * orb.velocity + orb.offset) * 0.12;

        dummy.position.set(
          orb.basePosition.x + driftX,
          orb.basePosition.y + bob,
          orb.basePosition.z
        );
        dummy.scale.set(orb.scale, orb.scale, orb.scale);
        dummy.rotation.y = elapsed * orb.rotationSpeed;
        dummy.updateMatrix();
        orbsMesh.setMatrixAt(i, dummy.matrix);
      }
      orbsMesh.instanceMatrix.needsUpdate = true;

      // Monolith subtle altar glow pulse
      monolith.rotation.y = Math.sin(elapsed * 0.3) * 0.04;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);

      screenTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

