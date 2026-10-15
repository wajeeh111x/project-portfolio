import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

function Core() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.15;
      coreRef.current.rotation.y = time * 0.25;
      coreRef.current.rotation.z = time * 0.1;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.35;
      ring1Ref.current.rotation.y = time * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.25;
      ring2Ref.current.rotation.z = time * 0.15;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = time * 0.18;
      ring3Ref.current.rotation.z = -time * 0.3;
    }
  });

  return (
    <>
      {/* MAIN CORE */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.25, 4]} />

        <meshStandardMaterial
          color="#3B82F6"
          emissive="#1D4ED8"
          emissiveIntensity={2}
          metalness={0.8}
          roughness={0.18}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* INNER CORE */}
      <mesh>
        <sphereGeometry args={[0.72, 32, 32]} />

        <meshBasicMaterial
          color="#22D3EE"
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* OUTER RING 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.8, 0.018, 16, 120]} />

        <meshBasicMaterial
          color="#22D3EE"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* OUTER RING 2 */}
      <mesh
        ref={ring2Ref}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[2.25, 0.014, 16, 120]} />

        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* OUTER RING 3 */}
      <mesh
        ref={ring3Ref}
        rotation={[0.8, 0.4, 0]}
      >
        <torusGeometry args={[2.7, 0.01, 16, 120]} />

        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* PARTICLES */}
      <Sparkles
        count={120}
        scale={[6, 6, 6]}
        size={2}
        speed={0.4}
        color="#22D3EE"
      />
    </>
  );
}

export default function AICore() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 45,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />

        <pointLight
          position={[3, 3, 4]}
          intensity={8}
          color="#22D3EE"
        />

        <pointLight
          position={[-3, -2, 2]}
          intensity={6}
          color="#8B5CF6"
        />

        <Float
          speed={1.5}
          rotationIntensity={0.3}
          floatIntensity={0.5}
        >
          <Core />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}