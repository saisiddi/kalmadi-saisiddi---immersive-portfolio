import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DigitalThread = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const glowPathRef = useRef<SVGPathElement>(null);
    const trailPathRef = useRef<SVGPathElement>(null);
    const sparkRef = useRef<SVGGElement>(null);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 1024px)').matches);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile || !pathRef.current) return;

        const path = pathRef.current;
        const glowPath = glowPathRef.current;
        const trailPath = trailPathRef.current;
        const spark = sparkRef.current;

        const pathLength = path.getTotalLength();

        // Set up all paths with dash properties
        [path, glowPath, trailPath].forEach((p) => {
            if (p) {
                gsap.set(p, {
                    strokeDasharray: pathLength,
                    strokeDashoffset: pathLength,
                });
            }
        });

        // Main timeline - staggered drawing of multiple layers
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
            }
        });

        // Safe animation sequence
        if (glowPath) {
            tl.to(glowPath, {
                strokeDashoffset: 0,
                ease: "none",
                duration: 1,
            }, 0);
        }

        if (path) {
            tl.to(path, {
                strokeDashoffset: 0,
                ease: "none",
                duration: 1,
            }, 0.05);
        }

        // Spark follows the path
        if (spark && path) {
            gsap.set(spark, { opacity: 0, scale: 0 });

            gsap.to(spark, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: 0.5,
                ease: "back.out(1.7)",
            });

            gsap.to(spark, {
                scale: 1.2,
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            ScrollTrigger.create({
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                onUpdate: (self) => {
                    if (!path || !spark) return;
                    const progress = self.progress;
                    const point = path.getPointAtLength(progress * pathLength);
                    gsap.set(spark, {
                        x: point.x,
                        y: point.y,
                    });
                }
            });
        }

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [isMobile]);

    // Generate a more elegant, organic "Circuitry" path
    const { pathData, nodes } = React.useMemo(() => {
        let d = "M 50 0";
        const nodesList: { x: number, y: number }[] = [];
        const totalHeight = 4000;
        const steps = 14; // Much fewer steps = smoother, larger curves
        const amplitude = 35;

        for (let i = 1; i <= steps; i++) {
            const yPrev = ((i - 1) / steps) * totalHeight;
            const yCurr = (i / steps) * totalHeight;
            const xCurr = i % 2 === 0 ? 50 - amplitude : 50 + amplitude;
            const xPrev = i % 2 === 0 ? 50 + amplitude : 50 - amplitude;

            // Deep, elegant bezier curves
            d += ` C ${xPrev} ${yPrev + 150}, ${xCurr} ${yCurr - 150}, ${xCurr} ${yCurr}`;

            // Add a node at each major turn
            nodesList.push({ x: xCurr, y: yCurr });
        }
        return { pathData: d, nodes: nodesList };
    }, []);

    if (isMobile) return null;

    return (
        <div
            ref={containerRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        >
            <svg
                viewBox="0 0 100 4000"
                preserveAspectRatio="none"
                className="w-full h-full"
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                }}
            >
                <defs>
                    {/* Soft Gaussian Blur for outer glow */}
                    <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="4" result="blur1" />
                        <feGaussianBlur stdDeviation="8" result="blur2" />
                        <feMerge>
                            <feMergeNode in="blur2" />
                            <feMergeNode in="blur1" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Gradient that pulses with green shades only */}
                    <linearGradient id="threadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
                        <stop offset="10%" stopColor="#22c55e" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#4ade80" stopOpacity="1" />
                        <stop offset="90%" stopColor="#22c55e" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                    </linearGradient>

                    {/* Outer glow gradient (more diffuse) */}
                    <linearGradient id="glowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
                        <stop offset="20%" stopColor="#22c55e" stopOpacity="0.15" />
                        <stop offset="50%" stopColor="#22c55e" stopOpacity="0.25" />
                        <stop offset="80%" stopColor="#22c55e" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                    </linearGradient>

                    {/* Radial gradient for the spark */}
                    <radialGradient id="sparkRadial" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                        <stop offset="30%" stopColor="#4ade80" stopOpacity="0.9" />
                        <stop offset="70%" stopColor="#22c55e" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Layer 1: Diffuse Glow */}
                <path
                    ref={glowPathRef}
                    d={pathData}
                    fill="none"
                    stroke="url(#glowGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    filter="url(#softGlow)"
                    opacity="0.4"
                />

                {/* Layer 2: Core Thread */}
                <path
                    ref={pathRef}
                    d={pathData}
                    fill="none"
                    stroke="url(#threadGradient)"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                />

                {/* Layer 3: Digital Nodes (Added for "Good Details") */}
                {nodes.map((node, i) => (
                    <g key={i} transform={`translate(${node.x}, ${node.y})`}>
                        <circle r="1.5" fill="#22c55e" opacity="0.2" filter="url(#softGlow)" />
                        <circle r="0.6" fill="#4ade80" />
                    </g>
                ))}

                {/* The Spark - A multi-layered glowing orb */}
                <g ref={sparkRef} style={{ willChange: 'transform' }}>
                    {/* Outer glow ring */}
                    <circle
                        r="5"
                        fill="url(#sparkRadial)"
                        opacity="0.6"
                    />
                    {/* Middle ring */}
                    <circle
                        r="2"
                        fill="#4ade80"
                        opacity="0.8"
                    />
                    {/* Core bright dot */}
                    <circle
                        r="0.8"
                        fill="#ffffff"
                    />
                </g>
            </svg>
        </div>
    );
};

export default DigitalThread;
