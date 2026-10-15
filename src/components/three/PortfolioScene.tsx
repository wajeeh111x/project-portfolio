import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

function Core() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.x = state.pointer.y * 0.15;
    group.current.rotation.y = state.pointer.x * 0.25;

    group.current.rotation.z += 0.0015;
  });

  return (
    <group ref={group}>
      {/* Outer wireframe */}
      <mesh>
        <icosahedronGeometry args={[1.55, 2]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Middle structure */}
      <mesh rotation={[0.4, 0.3, 0]}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Inner core */}
      <mesh>
        <icosahedronGeometry args={[0.65, 2]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.7}
          roughness={0.25}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Core point */}
      <mesh>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  );
}

function Particles() {
  const points = useRef<THREE.Points>(null);

  const count = 900;

  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const radius = 3.5 + Math.random() * 3;

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(
      2 * Math.random() - 1
    );

    positions[i * 3] =
      radius * Math.sin(phi) * Math.cos(theta);

    positions[i * 3 + 1] =
      radius * Math.sin(phi) * Math.sin(theta);

    positions[i * 3 + 2] =
      radius * Math.cos(phi);
  }

  useFrame(() => {
    if (!points.current) return;

    points.current.rotation.y += 0.0007;
    points.current.rotation.x += 0.0002;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#ffffff"
        size={0.018}
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />

      <pointLight
        position={[3, 3, 4]}
        intensity={20}
        distance={10}
      />

      <pointLight
        position={[-4, -2, 2]}
        intensity={8}
        distance={8}
      />

      <Float
        speed={1.2}
        rotationIntensity={0.25}
        floatIntensity={0.4}
      >
        <Core />
      </Float>

      <Particles />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </>
  );
}

export default function PortfolioScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 6],
        fov: 45,
      }}
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      <Scene />
    </Canvas>
  );
}