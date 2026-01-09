import React, { useEffect, useRef, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Immediate Load
import Header from './components/Header';
import Hero from './components/Hero';
import CustomCursor from './components/ui/CustomCursor';
import NoiseOverlay from './components/ui/NoiseOverlay';
import Preloader from './components/ui/Preloader';
import DigitalThread from './components/DigitalThread';

// Lazy Load (Heavy / Below Fold)
const Scene = lazy(() => import('./components/Scene'));
const Projects = lazy(() => import('./components/Projects'));
const TechMarquee = lazy(() => import('./components/TechMarquee'));
const Footer = lazy(() => import('./components/Footer'));

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.matchMedia('(max-width: 1024px)').matches ||
      'ontouchstart' in window;

    let lenis: Lenis | null = null;

    if (!isMobile.current) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const raf = (time: number) => {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    return () => {
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
    };
  }, []);

  return (
    <main className="relative w-full bg-background text-primary selection:bg-accent selection:text-black overflow-x-hidden font-sans">
      <Preloader />
      <CustomCursor />
      <NoiseOverlay />

      {/* Background Layers */}
      <DigitalThread />

      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-gradient-radial from-accent/10 via-transparent to-transparent blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[60vw] h-[60vh] bg-gradient-radial from-cyan-500/5 via-transparent to-transparent blur-3xl animate-float" />

        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      {/* Page Sections */}
      <Header />
      <div className="relative z-10">
        <Hero />

        <Suspense fallback={<div className="h-screen bg-transparent" />}>
          <TechMarquee />
          <Projects />
          <Footer />
        </Suspense>
      </div>
    </main>
  );
};

export default App;