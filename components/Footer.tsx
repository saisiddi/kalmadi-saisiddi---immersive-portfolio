import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SOCIALS, PROFILE } from '../constants';
import MagneticButton from './ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Staggered animations for footer elements
    gsap.fromTo(".footer-heading",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(".footer-links a",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Giant name parallax
    gsap.fromTo(".footer-giant-name",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-giant-name",
          start: "top 95%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-black border-t border-white/5 z-10"
    >
      <div className="max-w-[1600px] mx-auto flex flex-col justify-between min-h-[60vh]">

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-20">

          {/* CTA Copy */}
          <div className="footer-heading max-w-xl">
            <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-4 block">
              // Let's Connect
            </span>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Have a project in mind?
            </h3>
            <p className="text-secondary text-lg leading-relaxed">
              Always open to discussing new projects, creative collaborations, or just geeking out over interactive web experiences and animation.
            </p>
          </div>

          {/* Social Links */}
          <div className="footer-links flex flex-wrap gap-6 md:gap-10">
            {SOCIALS.map((social) => (
              <MagneticButton key={social.label} strength={0.3}>
                <a
                  href={social.url}
                  className="font-mono text-sm text-white hover:text-accent transition-colors duration-300 uppercase tracking-[0.2em] relative group py-2"
                >
                  {social.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full" />
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>

        {/* Giant Name */}
        <div className="mt-auto">
          <h2 className="footer-giant-name text-[12vw] md:text-[10vw] font-bold leading-none tracking-[-0.04em] text-white/[0.15] select-none pointer-events-none" style={{ textShadow: '0 0 60px rgba(34, 197, 94, 0.15), 0 0 120px rgba(34, 197, 94, 0.08)' }}>
            KALMADI
          </h2>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-8 pt-8 border-t border-white/5 gap-4">
            <p className="text-xs font-mono text-white/30">
              © {new Date().getFullYear()} Saisiddi Kalmadi. All rights reserved.
            </p>
            <p className="text-xs font-mono text-white/30">
              Crafted with React, GSAP & Three.js
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;