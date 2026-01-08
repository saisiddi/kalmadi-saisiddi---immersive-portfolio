import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { PROFILE } from '../constants';

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.1 }
    );

    // Scroll listener for glassmorphism effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
          ? 'py-4 bg-black/60 backdrop-blur-xl border-b border-white/5'
          : 'py-6 md:py-8 bg-transparent'
        }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 flex justify-between items-center">

        {/* Logo / Name */}
        <a
          href="#"
          className="font-mono text-sm tracking-[0.2em] uppercase text-white hover:text-accent transition-colors duration-300 cursor-pointer"
        >
          {PROFILE.name}
        </a>

        {/* Status Indicator */}
        <div className="flex items-center gap-3 font-mono text-xs md:text-sm cursor-pointer group">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-white/60 group-hover:text-white transition-colors duration-300">
            STATUS: <span className="text-accent">{PROFILE.status}</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;