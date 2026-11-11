
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AuroraBackgroundProps {
  stationFloat: number;
}

const AuroraShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uStation: { value: 0 },
    uGrainIntensity: { value: 0.055 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy * 2.0, 0.9999, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uStation;
    uniform float uGrainIntensity;
    varying vec2 vUv;

    // Fast pseudo-random hash for film grain
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      float t = uTime * 0.15;

      // Base Deep Teal Palette (#04201F)
      vec3 cDeepTeal  = vec3(0.015, 0.125, 0.121);
      vec3 cEmerald   = vec3(0.051, 0.290, 0.243);
      vec3 cMint      = vec3(0.361, 0.949, 0.839);
      vec3 cViolet    = vec3(0.180, 0.118, 0.267);
      vec3 cAmber     = vec3(0.280, 0.208, 0.118);

      // Organic drifting blob centroids influenced by scroll station
      float st = uStation * 0.35;
      vec2 p1 = vec2(0.28 + 0.18 * sin(t * 0.6 + st), 0.72 + 0.12 * cos(t * 0.5));
      vec2 p2 = vec2(0.74 + 0.14 * cos(t * 0.45 - st), 0.32 + 0.18 * sin(t * 0.7));
      vec2 p3 = vec2(0.50 + 0.20 * sin(t * 0.8 + 1.2), 0.55 + 0.15 * cos(t * 0.65 + st));
      vec2 p4 = vec2(0.18 + 0.12 * cos(t * 0.35 + 2.4), 0.22 + 0.14 * sin(t * 0.4));

      // Radial distance fields with soft cubic falloff
      float d1 = smoothstep(0.75, 0.05, distance(uv, p1));
      float d2 = smoothstep(0.70, 0.05, distance(uv, p2));
      float d3 = smoothstep(0.65, 0.05, distance(uv, p3));
      float d4 = smoothstep(0.68, 0.05, distance(uv, p4));

      // Layered Aurora Blending
      vec3 col = cDeepTeal;
      col = mix(col, cEmerald, d1 * 0.60);
      col = mix(col, cMint,    d2 * 0.32);
      col = mix(col, cViolet,  d3 * 0.24);
      col = mix(col, cAmber,   d4 * 0.18);

      // Subtle vignette
      float vig = 1.0 - smoothstep(0.4, 1.4, distance(uv, vec2(0.5)));
      col *= (0.85 + 0.15 * vig);

      // Animated Procedural Film Grain (4-6% subtle tactile grain)
      vec2 grainSeed = uv * 950.0 + vec2(fract(uTime * 17.0), fract(uTime * 31.0));
      float grain = (hash(grainSeed) - 0.5) * uGrainIntensity;
      col += grain;

      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

export default function AuroraBackground({ stationFloat }: AuroraBackgroundProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const shaderArgs = useMemo(() => {
    return {
      uniforms: THREE.UniformsUtils.clone(AuroraShaderMaterial.uniforms),
      vertexShader: AuroraShaderMaterial.vertexShader,
      fragmentShader: AuroraShaderMaterial.fragmentShader,
      depthWrite: false,
      depthTest: false,
    };
  }, []);

  useFrame((state, delta) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value += delta;
    // Smooth damp towards target station
    matRef.current.uniforms.uStation.value = THREE.MathUtils.damp(
      matRef.current.uniforms.uStation.value,
      stationFloat,
      2.5,
      delta
    );
  });

  return (
    <mesh renderOrder={-100} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={matRef} {...shaderArgs} />
    </mesh>
  );
}

