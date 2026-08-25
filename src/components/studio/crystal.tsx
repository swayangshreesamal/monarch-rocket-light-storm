import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

export function Crystal({
  position = [0, 0, 0],
  scale = 1,
  speed = 0.35,
}: {
  position?: [number, number, number];
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    const d = Math.min(delta, 0.1);
    const g = ref.current;
    if (!g) return;
    g.rotation.y += d * speed;
    g.rotation.x += d * speed * 0.28;
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#7dcea0"
          emissive="#7dcea0"
          emissiveIntensity={0.28}
          metalness={0.45}
          roughness={0.22}
        />
      </mesh>
      <mesh scale={1.04}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#7dcea0" wireframe transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

export function Ring({
  position = [0, 0, 0],
  scale = 1,
  speed = 0.2,
}: {
  position?: [number, number, number];
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    const d = Math.min(delta, 0.1);
    const g = ref.current;
    if (!g) return;
    g.rotation.z += d * speed;
    g.rotation.y -= d * speed * 0.4;
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.15, 0.035, 12, 64]} />
        <meshStandardMaterial
          color="#ececec"
          emissive="#7dcea0"
          emissiveIntensity={0.12}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}
