import React, { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import { PROFILE } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Staggered entrance animation
    tl.from(".hero-role", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.3,
    })
      .from(".hero-line-1 .char", {
        y: "110%",
        duration: 1.2,
        stagger: 0.03,
      }, "-=0.7")
      .from(".hero-line-2 .char", {
        y: "110%",
        duration: 1.2,
        stagger: 0.03,
      }, "-=1")
      .from(".hero-bio", {
        y: 40,
        opacity: 0,
        duration: 1,
      }, "-=0.8")
      .from(".hero-cta", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
      }, "-=0.5")
      .from(".hero-scroll-hint", {
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, "-=0.3");

    // Parallax effect on scroll
    gsap.to(".hero-headline", {
      y: 150,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    gsap.to(".hero-bio-container", {
      y: 80,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2,
      }
    });

  }, { scope: containerRef });

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    workSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Split text into characters for animation
  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-28 pb-16 overflow-hidden"
    >
      <div className="max-w-[1600px] w-full mx-auto relative z-10">

        {/* Role Tag */}
        <div className="hero-role flex items-center gap-4 mb-8 md:mb-12">
          <span className="inline-block w-12 h-[1px] bg-accent" />
          <p className="font-mono text-accent text-xs md:text-sm tracking-[0.3em] uppercase">
            {PROFILE.role}
          </p>
        </div>

        {/* Giant Headline with Character Split */}
        <div
          ref={headlineRef}
          className="hero-headline text-[15vw] md:text-[13vw] lg:text-[11vw] leading-[0.85] font-bold tracking-[-0.04em] mb-12 md:mb-20"
        >
          <div className="overflow-hidden">
            <div className="hero-line-1 block will-change-transform">
              {splitText("DIGITAL")}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="hero-line-2 block text-white/30 will-change-transform">
              {splitText("REALITY.")}
            </div>
          </div>
        </div>

        {/* Bio & CTA */}
        <div className="hero-bio-container flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-20">

          <div className="hero-bio max-w-2xl">
            <p className="text-lg md:text-xl lg:text-2xl text-secondary leading-relaxed font-light">
              {PROFILE.bio}
            </p>
          </div>

          <div className="hero-cta flex items-center gap-8">
            <MagneticButton onClick={scrollToWork}>
              <div className="h-36 w-36 md:h-40 md:w-40 rounded-full border border-white/20 flex items-center justify-center bg-white/[0.02] backdrop-blur-sm hover:bg-accent hover:text-black hover:border-transparent transition-all duration-500 group cursor-pointer relative overflow-hidden">
                <span className="font-mono text-sm tracking-wider group-hover:opacity-0 transition-opacity duration-300">View Work</span>
                <ArrowDown className="absolute opacity-0 group-hover:opacity-100 w-8 h-8 transition-all duration-300 animate-bounce" />

                {/* Hover ring effect */}
                <span className="absolute inset-0 rounded-full border border-white/10 scale-100 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700" />
              </div>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;