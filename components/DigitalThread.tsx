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
                scrub: 2,
            }
        });

        // Draw the glow layer first (wider, more diffuse)
        tl.to(glowPath, {
            strokeDashoffset: 0,
            ease: "none",
            duration: 1,
        }, 0);

        // Draw the trail layer (medium)
        tl.to(trailPath, {
            strokeDashoffset: 0,
            ease: "none",
            duration: 1,
        }, 0.02);

        // Draw the main crisp line
        tl.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            duration: 1,
        }, 0.05);

        // Spark follows the path
        if (spark && path) {
            gsap.set(spark, { opacity: 0, scale: 0 });

            // Reveal spark with entrance animation
            gsap.to(spark, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: 0.5,
                ease: "back.out(1.7)",
            });

            // Pulse animation for the spark
            gsap.to(spark, {
                scale: 1.2,
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            // Follow the path
            ScrollTrigger.create({
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 2,
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
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [isMobile]);

    if (isMobile) return null;

    // Organic, flowing path that weaves through the page
    const pathData = `
    M 50 0
    C 50 30, 25 50, 25 80
    S 75 110, 75 140
    C 75 170, 30 190, 30 220
    S 70 250, 70 280
    C 70 310, 40 330, 40 360
    S 60 390, 60 420
    C 60 450, 35 470, 35 500
    S 65 530, 65 560
    C 65 590, 45 610, 45 640
    S 55 670, 55 700
    C 55 730, 50 750, 50 780
    L 50 800
  `;

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-screen pointer-events-none"
            style={{ zIndex: 1 }}
        >
            <svg
                viewBox="0 0 100 800"
                preserveAspectRatio="none"
                className="w-full"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '400vh',
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

                    {/* Inner glow for the spark */}
                    <filter id="sparkGlow" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
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

                {/* Layer 1: Outer diffuse glow (widest) */}
                <path
                    ref={glowPathRef}
                    d={pathData}
                    fill="none"
                    stroke="url(#glowGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#softGlow)"
                    opacity="0.6"
                    style={{ willChange: 'stroke-dashoffset' }}
                />

                {/* Layer 2: Medium trail */}
                <path
                    ref={trailPathRef}
                    d={pathData}
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.4"
                    style={{ willChange: 'stroke-dashoffset' }}
                />

                {/* Layer 3: Main crisp line */}
                <path
                    ref={pathRef}
                    d={pathData}
                    fill="none"
                    stroke="url(#threadGradient)"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ willChange: 'stroke-dashoffset' }}
                />

                {/* The Spark - A multi-layered glowing orb */}
                <g ref={sparkRef} style={{ willChange: 'transform' }}>
                    {/* Outer glow ring */}
                    <circle
                        r="4"
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
