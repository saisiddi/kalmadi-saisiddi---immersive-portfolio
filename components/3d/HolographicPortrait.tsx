import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const HolographicPortrait = ({ imageUrl }: { imageUrl: string }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useTexture(imageUrl);
    const [hovered, setHovered] = useState(false);

    const uniforms = useMemo(() => ({
        uTexture: { value: texture },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uTilt: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color('#22c55e') },
        uOpacity: { value: 0 },
    }), [texture]);

    const vertexShader = `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        uniform vec2 uMouse;
        uniform float uTime;

        void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            
            // Subtle wave distortion based on mouse distance
            vec3 pos = position;
            float dist = distance(uv, uMouse * 0.5 + 0.5);
            pos.z += sin(dist * 8.0 - uTime * 2.0) * 0.05;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `;

    const fragmentShader = `
        uniform sampler2D uTexture;
        uniform vec2 uMouse;
        uniform vec2 uTilt;
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uOpacity;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
            vec2 uv = vUv;
            vec2 centeredUv = vUv - 0.5;
            
            // 1. Interactive Parallax
            vec2 shift = uTilt * 0.08;
            
            // 2. Chromatic Aberration
            float aberration = 0.015 + length(centeredUv) * 0.02;
            vec4 rTex = texture2D(uTexture, uv + shift + vec2(aberration, 0.0));
            vec4 gTex = texture2D(uTexture, uv + shift);
            vec4 bTex = texture2D(uTexture, uv + shift - vec2(aberration, 0.0));
            
            vec3 texColor = vec3(rTex.r, gTex.g, bTex.b);
            
            // 3. Digital Scanlines
            float scanline = sin(vUv.y * 300.0 + uTime * 4.0) * 0.05 + 0.95;
            texColor *= scanline;
            
            // 4. Fresnel / Edge Glow
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = pow(1.0 - dot(normal, viewDir), 2.5);
            
            // 5. Specular highlight based on mouse
            float distToMouse = distance(centeredUv, uMouse * 0.5);
            float spec = pow(smoothstep(0.4, 0.0, distToMouse), 4.0) * 0.5;
            
            // 6. Vignette
            float vignette = smoothstep(0.7, 0.2, length(centeredUv));
            
            vec3 finalColor = texColor;
            finalColor += uColor * fresnel * 0.6;
            finalColor += vec3(spec);
            finalColor *= vignette;

            // Subtle hue shift based on time
            finalColor += uColor * sin(uTime) * 0.05;

            gl_FragColor = vec4(finalColor, uOpacity);
        }
    `;

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.elapsedTime;

            // Entrance fade in
            material.uniforms.uOpacity.value = THREE.MathUtils.lerp(
                material.uniforms.uOpacity.value,
                1.0,
                0.05
            );

            const mx = state.pointer.x;
            const my = state.pointer.y;

            // Smoothly move uniforms
            material.uniforms.uMouse.value.lerp(new THREE.Vector2(mx, my), 0.1);
            material.uniforms.uTilt.value.lerp(new THREE.Vector2(mx, my), 0.05);

            // Mesh Tilt
            meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mx * 0.25, 0.1);
            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -my * 0.25, 0.1);
        }
    });

    return (
        <mesh ref={meshRef} scale={[3.4, 4.4, 1]}>
            <planeGeometry args={[1, 1, 64, 64]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent={true}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

export default HolographicPortrait;
