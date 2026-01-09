import React, { useEffect, useState, useRef } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';

const Preloader = () => {
    const { progress } = useProgress();
    const [loaded, setLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Entrance animation
        gsap.from(textRef.current, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
        });

        // Safety timeout
        const safetyTimer = setTimeout(() => {
            if (!loaded) dismissPreloader();
        }, 3000);

        if (progress === 100) {
            const timer = setTimeout(() => dismissPreloader(), 500);
            return () => clearTimeout(timer);
        }

        return () => clearTimeout(safetyTimer);
    }, [progress]);

    const dismissPreloader = () => {
        const tl = gsap.timeline({
            onComplete: () => setLoaded(true)
        });

        tl.to([textRef.current, barRef.current], {
            y: -40,
            opacity: 0,
            duration: 0.8,
            ease: "power4.in"
        })
            .to(containerRef.current, {
                clipPath: "inset(0 0 100% 0)",
                duration: 1.2,
                ease: "expo.inOut"
            });
    };

    if (loaded) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white px-10"
            style={{ clipPath: "inset(0 0 0% 0)" }}
        >
            <div ref={textRef} className="flex flex-col items-center gap-6 max-w-sm w-full">
                <div className="flex flex-col items-center gap-2">
                    <span className="font-mono text-accent text-[10px] tracking-[0.5em] uppercase opacity-60">
                        System Initialization
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                        EXPERIENCE<span className="text-accent">.</span>
                    </h1>
                </div>

                <div ref={barRef} className="w-full space-y-4">
                    <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-accent transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between font-mono text-[10px] tracking-widest text-secondary">
                        <span>LOADING ASSETS</span>
                        <span className="text-accent">{Math.round(progress)}%</span>
                    </div>
                </div>
            </div>

            {/* Aesthetic Background Decoration */}
            <div className="absolute bottom-12 left-12 font-mono text-[9px] text-white/20 uppercase tracking-[0.3em]">
                Kalmadi Saisiddi // Portfolio 2026
            </div>
            <div className="absolute top-12 right-12 flex gap-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="w-1 h-1 bg-accent/30 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
            </div>
        </div>
    );
};

export default Preloader;
