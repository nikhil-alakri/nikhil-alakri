"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PillarMotif3DProps {
  pillarNum: string;
  isActive: boolean;
}

export default function PillarMotif3D({ pillarNum, isActive }: PillarMotif3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const speed = isActive ? 1.0 : 0.4;

    groupRef.current.rotation.y += delta * 0.6 * speed;
    groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.15;

    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 1.2 * speed;
      const s = 1 + Math.sin(time * 2.0) * 0.08;
      coreRef.current.scale.set(s, s, s);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.8 * speed;
    }
  });

  const mintColor = "#5cf2d6";
  const emeraldColor = "#0b4d3c";
  const glowIntensity = isActive ? 1.2 : 0.4;

  switch (pillarNum) {
    case "01":
      // Pillar 1: Healthcare & Enterprise UI Systems (Precision Glass Cube with Inner Core)
      return (
        <group ref={groupRef}>
          {/* Outer Glass Cube */}
          <mesh>
            <boxGeometry args={[1.1, 1.1, 1.1]} />
            <meshStandardMaterial
              color="#5cf2d6"
              roughness={0.1}
              metalness={0.2}
              transparent
              opacity={0.35}
              wireframe={false}
            />
          </mesh>
          {/* Wireframe Outline */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.105, 1.105, 1.105)]} />
            <lineBasicMaterial color={mintColor} transparent opacity={0.8} />
          </lineSegments>
          {/* Glowing Inner Core */}
          <mesh ref={coreRef}>
            <octahedronGeometry args={[0.42, 0]} />
            <meshStandardMaterial
              color={mintColor}
              emissive={mintColor}
              emissiveIntensity={glowIntensity}
              roughness={0.2}
            />
          </mesh>
        </group>
      );

    case "02":
      // Pillar 2: Multimodal AI & Agentic Accelerators (Neural Node Graph)
      return (
        <group ref={groupRef}>
          {/* Central Hub Sphere */}
          <mesh ref={coreRef}>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshStandardMaterial
              color={mintColor}
              emissive={mintColor}
              emissiveIntensity={glowIntensity * 1.1}
            />
          </mesh>
          {/* Orbiting Satellite Nodes */}
          {[
            [0.65, 0.4, 0.2],
            [-0.6, -0.35, 0.3],
            [0.3, -0.6, -0.4],
            [-0.4, 0.55, -0.3],
          ].map(([x, y, z], idx) => (
            <group key={idx}>
              <mesh position={[x, y, z]}>
                <sphereGeometry args={[0.13, 12, 12]} />
                <meshStandardMaterial
                  color="#a7f3d0"
                  emissive="#5cf2d6"
                  emissiveIntensity={glowIntensity * 0.8}
                />
              </mesh>
              {/* Synaptic Connector Line to Center */}
              <line>
                <bufferGeometry
                  attach="geometry"
                  {...(() => {
                    const geom = new THREE.BufferGeometry();
                    geom.setFromPoints([
                      new THREE.Vector3(0, 0, 0),
                      new THREE.Vector3(x, y, z),
                    ]);
                    return geom;
                  })()}
                />
                <lineBasicMaterial color={mintColor} transparent opacity={0.6} />
              </line>
            </group>
          ))}
        </group>
      );

    case "03":
      // Pillar 3: Web Performance & Lighthouse 100/100 (Speed Ring / Tachometer Arc)
      return (
        <group ref={groupRef}>
          {/* Glowing Tachometer Torus Ring */}
          <mesh ref={ringRef}>
            <torusGeometry args={[0.65, 0.08, 16, 32]} />
            <meshStandardMaterial
              color={mintColor}
              emissive={mintColor}
              emissiveIntensity={glowIntensity * 0.9}
              roughness={0.2}
              metalness={0.4}
            />
          </mesh>
          {/* Outer Thin Gauge Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.82, 0.02, 8, 32]} />
            <meshStandardMaterial
              color="#34d399"
              transparent
              opacity={0.45}
            />
          </mesh>
          {/* Central 100 Velocity Needle Indicator */}
          <mesh ref={coreRef} position={[0, 0, 0]}>
            <coneGeometry args={[0.14, 0.55, 12]} />
            <meshStandardMaterial
              color="#5cf2d6"
              emissive="#5cf2d6"
              emissiveIntensity={glowIntensity}
            />
          </mesh>
        </group>
      );

    case "04":
    default:
      // Pillar 4: Full-Stack Architecture & Cloud APIs (Stacked Levitating Holographic Wafers)
      return (
        <group ref={groupRef}>
          {[-0.38, 0, 0.38].map((y, idx) => (
            <group key={idx} position={[0, y, 0]}>
              <mesh>
                <boxGeometry args={[1.2, 0.08, 0.85]} />
                <meshStandardMaterial
                  color={mintColor}
                  roughness={0.2}
                  metalness={0.3}
                  transparent
                  opacity={0.35 + idx * 0.15}
                />
              </mesh>
              <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(1.205, 0.085, 0.855)]} />
                <lineBasicMaterial color={mintColor} transparent opacity={0.75} />
              </lineSegments>
            </group>
          ))}
          {/* Vertical Data Bus Column */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.95, 8]} />
            <meshStandardMaterial
              color={mintColor}
              emissive={mintColor}
              emissiveIntensity={glowIntensity}
            />
          </mesh>
        </group>
      );
  }
}
