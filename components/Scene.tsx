import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      const r = 15 + Math.random() * 25;

      positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(theta);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 25;
      ref.current.rotation.y -= delta / 30;

      // Subtle mouse interaction
      const { pointer } = state;
      ref.current.rotation.x += pointer.y * 0.0003;
      ref.current.rotation.y += pointer.x * 0.0003;
    }
  });

  return (
    // @ts-ignore
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#22c55e"
          size={0.025}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.4}
        />
      </Points>
      {/* @ts-ignore */}
    </group>
  );
};

const Scene = () => {
  // Check for mobile/reduced motion preference
  const shouldRender = !window.matchMedia('(max-width: 768px)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!shouldRender) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-30">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 40 }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
      >
        <ParticleField />
        {/* @ts-ignore */}
        <ambientLight intensity={0.3} />
      </Canvas>
    </div>
  );
};

export default Scene;