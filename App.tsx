import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene from './components/Scene';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import TechMarquee from './components/TechMarquee';
import Footer from './components/Footer';
import CustomCursor from './components/ui/CustomCursor';
import NoiseOverlay from './components/ui/NoiseOverlay';
import DigitalThread from './components/DigitalThread';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const isMobile = useRef(false);

  useEffect(() => {
    // Mobile detection
    isMobile.current = window.matchMedia('(max-width: 768px)').matches ||
      'ontouchstart' in window;

    // Initialize Lenis for smooth scrolling (desktop only for performance)
    if (!isMobile.current) {
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      // Connect Lenis to GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      return () => {
        lenis.destroy();
        gsap.ticker.remove((time) => lenis.raf(time * 1000));
      };
    }
  }, []);

  return (
    <main className="w-full bg-background text-primary selection:bg-accent selection:text-black overflow-x-hidden">
      {/* Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Noise Overlay for Film Grain */}
      <NoiseOverlay />

      {/* Gradient Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-gradient-radial from-accent/10 via-transparent to-transparent blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[60vw] h-[60vh] bg-gradient-radial from-cyan-500/5 via-transparent to-transparent blur-3xl animate-float" />
      </div>

      {/* Digital Thread - Scroll-linked SVG Path */}
      <DigitalThread />

      {/* 3D Particle Background */}
      <Scene />

      {/* Navigation - Glassmorphism Header */}
      <Header />

      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        <TechMarquee />
        <Projects />
        <Footer />
      </div>
    </main>
  );
};

export default App;