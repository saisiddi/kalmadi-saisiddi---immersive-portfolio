import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 1500; // Optimized count
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
      ref.current.rotation.x -= delta / 30;
      ref.current.rotation.y -= delta / 35;

      const { pointer } = state;
      ref.current.rotation.x += pointer.y * 0.0002;
      ref.current.rotation.y += pointer.x * 0.0002;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#22c55e"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.3}
        />
      </Points>
    </group>
  );
};

const Scene = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const checkVisible = () => {
      const isDesktop = !window.matchMedia('(max-width: 1024px)').matches;
      const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setShouldRender(isDesktop && motionOK);
    };

    checkVisible();
    window.addEventListener('resize', checkVisible);
    return () => window.removeEventListener('resize', checkVisible);
  }, []);

  if (!shouldRender) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      className="w-full h-full opacity-30"
    >
      <ambientLight intensity={0.5} />
      <ParticleField />
    </Canvas>
  );
};

export default Scene;