import * as THREE from "three";

// ==============================================================================
// 🎨 PALETTE & MATERIAL PALETTE (Matching Reference Clay & Stone Tones)
// ==============================================================================
export const PALETTE = {
  mossGreen: 0x1f4e5b,
  softTeal: 0x2d6a7a,
  ceramicIvory: 0xe8dec8,
  clayParchment: 0xd6c4a8,
  brassAccent: 0xcbb594,
  stoneDark: 0x0c252e,
  pedestalGlow: 0x5eead4,
};

// Tactical matte ceramic/clay material
export function createClayMaterial(color: number, roughness = 0.65): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness: 0.08,
    flatShading: false,
  });
}

// ==============================================================================
// 1. PROCEDURAL ORGANIC PORTAL RING (Hero Stage)
// ==============================================================================
export function createOrganicPortal(): THREE.Group {
  const portalGroup = new THREE.Group();
  portalGroup.name = "organicPortal";

  const clayMat1 = createClayMaterial(PALETTE.softTeal, 0.55);
  const clayMat2 = createClayMaterial(PALETTE.ceramicIvory, 0.6);
  const clayMat3 = createClayMaterial(PALETTE.clayParchment, 0.65);

  // Main undulating sculpted ring
  const ringGeo = new THREE.TorusGeometry(2.35, 0.38, 32, 64);
  const pos = ringGeo.attributes.position;
  // Apply gentle organic noise-like wave to vertices
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const noise = Math.sin(x * 2.5) * Math.cos(y * 2.5) * 0.12;
    pos.setXYZ(i, x + noise, y + noise, z + noise * 0.8);
  }
  ringGeo.computeVertexNormals();

  const mainRing = new THREE.Mesh(ringGeo, clayMat1);
  mainRing.rotation.x = Math.PI * 0.12;
  portalGroup.add(mainRing);

  // Secondary interwoven swirling torus ribbon
  const secondaryGeo = new THREE.TorusGeometry(2.5, 0.22, 24, 48);
  const secondaryRing = new THREE.Mesh(secondaryGeo, clayMat2);
  secondaryRing.rotation.set(Math.PI * 0.2, Math.PI * 0.15, 0.5);
  portalGroup.add(secondaryRing);

  // Sculpted organic swell lobes around the ring (like clay swirls in reference)
  const lobeGeo = new THREE.SphereGeometry(0.5, 24, 24);
  const lobeCoords = [
    { pos: [-2.1, 1.2, 0.2], scale: [1.2, 0.8, 0.9], mat: clayMat1 },
    { pos: [2.0, 1.4, -0.1], scale: [1.3, 0.9, 0.8], mat: clayMat3 },
    { pos: [-1.8, -1.5, 0.3], scale: [1.1, 1.1, 0.85], mat: clayMat2 },
    { pos: [1.9, -1.3, 0.1], scale: [1.2, 0.75, 1.0], mat: clayMat1 },
    { pos: [0.2, 2.45, -0.2], scale: [1.4, 0.8, 0.9], mat: clayMat2 },
    { pos: [-0.3, -2.4, 0.2], scale: [1.3, 0.85, 0.9], mat: clayMat3 },
  ];

  lobeCoords.forEach((l) => {
    const lobe = new THREE.Mesh(lobeGeo, l.mat);
    lobe.position.set(l.pos[0], l.pos[1], l.pos[2]);
    lobe.scale.set(l.scale[0], l.scale[1], l.scale[2]);
    portalGroup.add(lobe);
  });

  return portalGroup;
}

// ==============================================================================
// 2. INSTANCED FLOATING ORBS & PEBBLES (GPU Accelerated Single Draw Call)
// ==============================================================================
export interface FloatingOrbData {
  basePosition: THREE.Vector3;
  velocity: number;
  offset: number;
  scale: number;
  rotationSpeed: number;
}

export function createFloatingOrbs(count = 55): {
  instancedMesh: THREE.InstancedMesh;
  orbsData: FloatingOrbData[];
} {
  const sphereGeo = new THREE.SphereGeometry(1, 20, 20);
  const sphereMat = new THREE.MeshStandardMaterial({
    roughness: 0.6,
    metalness: 0.12,
    vertexColors: true,
  });

  const instancedMesh = new THREE.InstancedMesh(sphereGeo, sphereMat, count);
  instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

  const colors = [
    new THREE.Color(PALETTE.ceramicIvory),
    new THREE.Color(PALETTE.clayParchment),
    new THREE.Color(PALETTE.softTeal),
    new THREE.Color(PALETTE.brassAccent),
    new THREE.Color(PALETTE.mossGreen),
  ];

  const orbsData: FloatingOrbData[] = [];
  const dummy = new THREE.Object3D();

  for (let i = 0; i < count; i++) {
    // Distribute vertically down the page from y = 3.5 to y = -19
    const y = 3.5 - Math.random() * 23;
    // Spread horizontally and in depth
    const radius = 2.2 + Math.random() * 3.8;
    const angle = Math.random() * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = -1.5 + (Math.random() - 0.5) * 5.0;

    const scale = 0.08 + Math.random() * 0.32;
    const velocity = 0.8 + Math.random() * 1.5;
    const offset = Math.random() * Math.PI * 2;
    const rotationSpeed = (Math.random() - 0.5) * 1.2;

    orbsData.push({
      basePosition: new THREE.Vector3(x, y, z),
      velocity,
      offset,
      scale,
      rotationSpeed,
    });

    dummy.position.set(x, y, z);
    dummy.scale.set(scale, scale, scale);
    dummy.updateMatrix();
    instancedMesh.setMatrixAt(i, dummy.matrix);

    const pickedColor = colors[i % colors.length];
    instancedMesh.setColorAt(i, pickedColor);
  }

  instancedMesh.instanceMatrix.needsUpdate = true;
  if (instancedMesh.instanceColor) {
    instancedMesh.instanceColor.needsUpdate = true;
  }

  return { instancedMesh, orbsData };
}

// ==============================================================================
// 3. ARCHITECTURAL PLINTHS & PEDESTALS (Featured Projects & Stages)
// ==============================================================================
export function createStonePlinth(radius = 1.6, height = 0.45): THREE.Group {
  const plinth = new THREE.Group();

  const stoneMat = createClayMaterial(PALETTE.stoneDark, 0.7);
  const trimMat = createClayMaterial(PALETTE.ceramicIvory, 0.5);

  // Main bevelled slab
  const slabGeo = new THREE.CylinderGeometry(radius, radius * 1.08, height, 32);
  const slab = new THREE.Mesh(slabGeo, stoneMat);
  slab.castShadow = true;
  slab.receiveShadow = true;
  plinth.add(slab);

  // Top decorative polished trim ring
  const trimGeo = new THREE.TorusGeometry(radius * 0.96, 0.04, 16, 48);
  const trim = new THREE.Mesh(trimGeo, trimMat);
  trim.rotation.x = Math.PI / 2;
  trim.position.y = height / 2 + 0.02;
  plinth.add(trim);

  // Under-glow rim disc
  const discGeo = new THREE.CircleGeometry(radius * 1.15, 32);
  const discMat = new THREE.MeshBasicMaterial({
    color: PALETTE.softTeal,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
  });
  const glowDisc = new THREE.Mesh(discGeo, discMat);
  glowDisc.rotation.x = -Math.PI / 2;
  glowDisc.position.y = -height / 2 - 0.01;
  plinth.add(glowDisc);

  return plinth;
}

// ==============================================================================
// 4. FLOATING 3D LAPTOP & HEALTHCARE UI STAGE
// ==============================================================================
export function createFloatingLaptop(): {
  laptopGroup: THREE.Group;
  screenTexture: THREE.CanvasTexture;
} {
  const laptopGroup = new THREE.Group();
  laptopGroup.name = "floatingLaptop";

  const chassisMat = new THREE.MeshStandardMaterial({
    color: 0x18242a,
    roughness: 0.35,
    metalness: 0.85,
  });

  const keyboardMat = new THREE.MeshStandardMaterial({
    color: 0x0f181c,
    roughness: 0.7,
    metalness: 0.2,
  });

  // Base chassis
  const baseGeo = new THREE.BoxGeometry(2.2, 0.06, 1.5);
  const baseMesh = new THREE.Mesh(baseGeo, chassisMat);
  laptopGroup.add(baseMesh);

  // Keyboard depression
  const kbGeo = new THREE.PlaneGeometry(1.9, 0.75);
  const kbMesh = new THREE.Mesh(kbGeo, keyboardMat);
  kbMesh.rotation.x = -Math.PI / 2;
  kbMesh.position.set(0, 0.035, -0.15);
  laptopGroup.add(kbMesh);

  // Trackpad
  const trackpadGeo = new THREE.PlaneGeometry(0.65, 0.42);
  const trackpadMat = new THREE.MeshStandardMaterial({ color: 0x1f2e35, roughness: 0.3 });
  const trackpadMesh = new THREE.Mesh(trackpadGeo, trackpadMat);
  trackpadMesh.rotation.x = -Math.PI / 2;
  trackpadMesh.position.set(0, 0.035, 0.45);
  laptopGroup.add(trackpadMesh);

  // Screen Lid Group (Hinged at back)
  const lidGroup = new THREE.Group();
  lidGroup.position.set(0, 0.03, -0.75);
  lidGroup.rotation.x = Math.PI * 0.58; // Open angle (~105 deg)

  const lidChassisGeo = new THREE.BoxGeometry(2.2, 1.45, 0.05);
  lidChassisGeo.translate(0, 0.725, 0);
  const lidChassis = new THREE.Mesh(lidChassisGeo, chassisMat);
  lidGroup.add(lidChassis);

  // Dynamic Procedural Healthcare Dashboard Canvas
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 680;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    // Background
    ctx.fillStyle = "#113946";
    ctx.fillRect(0, 0, 1024, 680);

    // Sidebar
    ctx.fillStyle = "rgba(12, 37, 46, 0.9)";
    ctx.fillRect(0, 0, 220, 680);

    // Sidebar Logo & Navigation lines
    ctx.fillStyle = "#cbb594";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("CITIUSTECH UI", 28, 52);

    ctx.fillStyle = "rgba(234, 215, 187, 0.4)";
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(28, 100 + i * 44, 160, 12);
    }

    // Main header
    ctx.fillStyle = "#FFF2D8";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText("Clinical Design System · Lit + TSX", 260, 60);

    ctx.fillStyle = "#5eead4";
    ctx.font = "16px monospace";
    ctx.fillText("● HIPAA & WCAG AA VALIDATED · 100/100 CWV", 260, 95);

    // Stat cards row
    const statCards = [
      { val: "+20%", lbl: "LCP Boost" },
      { val: "100%", lbl: "WCAG AA" },
      { val: "80%", lbl: "Roadmap Shipped" },
    ];
    statCards.forEach((s, idx) => {
      const cx = 260 + idx * 235;
      ctx.fillStyle = "rgba(45, 106, 122, 0.45)";
      ctx.beginPath();
      ctx.roundRect(cx, 130, 215, 100, 12);
      ctx.fill();

      ctx.fillStyle = "#FFF2D8";
      ctx.font = "bold 32px sans-serif";
      ctx.fillText(s.val, cx + 20, 180);

      ctx.fillStyle = "#EAD7BB";
      ctx.font = "14px sans-serif";
      ctx.fillText(s.lbl, cx + 20, 210);
    });

    // Medical Imaging / Waveform preview graph
    ctx.fillStyle = "rgba(12, 37, 46, 0.75)";
    ctx.beginPath();
    ctx.roundRect(260, 260, 715, 360, 16);
    ctx.fill();

    // Chart curve
    ctx.strokeStyle = "#5eead4";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(280, 520);
    const pts = [
      [340, 480],
      [420, 500],
      [500, 380],
      [580, 410],
      [660, 330],
      [740, 360],
      [820, 300],
      [940, 340],
    ];
    pts.forEach(([px, py]) => ctx.lineTo(px, py));
    ctx.stroke();

    // Chart fill gradient
    ctx.lineTo(940, 580);
    ctx.lineTo(280, 580);
    ctx.closePath();
    ctx.fillStyle = "rgba(94, 234, 212, 0.12)";
    ctx.fill();
  }

  const screenTexture = new THREE.CanvasTexture(canvas);
  screenTexture.generateMipmaps = true;
  screenTexture.minFilter = THREE.LinearMipmapLinearFilter;

  const screenMat = new THREE.MeshBasicMaterial({
    map: screenTexture,
  });

  const screenGeo = new THREE.PlaneGeometry(2.05, 1.32);
  screenGeo.translate(0, 0.725, 0.028);
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  lidGroup.add(screenMesh);

  laptopGroup.add(lidGroup);

  // Position laptop angled toward camera
  laptopGroup.rotation.set(0.35, -0.45, 0.12);
  laptopGroup.scale.set(0.9, 0.9, 0.9);

  return { laptopGroup, screenTexture };
}

// ==============================================================================
// 5. STEPPED CAREER PEDESTALS (Career Timeline Stage)
// ==============================================================================
export function createSteppedCareerPillars(): THREE.Group {
  const group = new THREE.Group();
  group.name = "steppedCareerPillars";

  const pillarMat = createClayMaterial(PALETTE.stoneDark, 0.75);
  const capMat = createClayMaterial(PALETTE.ceramicIvory, 0.5);

  const pillarsData = [
    { height: 1.2, x: -2.0, z: -0.2, yr: "2018" },
    { height: 1.6, x: -1.0, z: 0.1, yr: "2020" },
    { height: 2.1, x: 0.0, z: -0.3, yr: "2021" },
    { height: 2.7, x: 1.0, z: 0.2, yr: "2022" },
    { height: 3.4, x: 2.0, z: -0.1, yr: "2024" }, // Current peak
  ];

  pillarsData.forEach((p) => {
    const colGroup = new THREE.Group();
    colGroup.position.set(p.x, p.height / 2, p.z);

    // Fluted/faceted square pillar
    const colGeo = new THREE.BoxGeometry(0.55, p.height, 0.55);
    const col = new THREE.Mesh(colGeo, pillarMat);
    colGroup.add(col);

    // Stepped capital on top
    const capGeo = new THREE.BoxGeometry(0.7, 0.1, 0.7);
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = p.height / 2 + 0.05;
    colGroup.add(cap);

    // Floating indicator dot above peak
    const dotGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const dotMat = new THREE.MeshBasicMaterial({ color: PALETTE.brassAccent });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.y = p.height / 2 + 0.28;
    colGroup.add(dot);

    group.add(colGroup);
  });

  return group;
}

// ==============================================================================
// 6. ILLUMINATED MONOLITH PLINTH (Footer Stage: "Let's Make It Happen")
// ==============================================================================
export function createIlluminatedMonolith(): THREE.Group {
  const monolithGroup = new THREE.Group();
  monolithGroup.name = "illuminatedMonolith";

  const stoneMat = createClayMaterial(PALETTE.stoneDark, 0.7);
  const glowMat = new THREE.MeshBasicMaterial({
    color: PALETTE.pedestalGlow,
    transparent: true,
    opacity: 0.85,
  });

  // Base stepped pedestal
  const baseStep1 = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.2, 3.2), stoneMat);
  baseStep1.position.y = -0.5;
  monolithGroup.add(baseStep1);

  const baseStep2 = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.25, 2.5), stoneMat);
  baseStep2.position.y = -0.3;
  monolithGroup.add(baseStep2);

  // Central monolith pillar
  const pillar = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 1.8), stoneMat);
  pillar.position.y = 0.4;
  monolithGroup.add(pillar);

  // Glowing upper altar surface
  const altarGlow = new THREE.Mesh(new THREE.PlaneGeometry(1.65, 1.65), glowMat);
  altarGlow.rotation.x = -Math.PI / 2;
  altarGlow.position.y = 1.01;
  monolithGroup.add(altarGlow);

  // Soft atmospheric spotlight on altar
  const altarLight = new THREE.PointLight(PALETTE.pedestalGlow, 2.8, 6.0);
  altarLight.position.set(0, 1.8, 0);
  monolithGroup.add(altarLight);

  return monolithGroup;
}

