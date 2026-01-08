import React, { useRef } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { PROJECTS } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index }: { project: typeof PROJECTS[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Card entrance animation
    gsap.fromTo(cardRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Image reveal with clip-path mask
    gsap.fromTo(imageRef.current,
      { clipPath: "inset(100% 0% 0% 0%)", scale: 1.2 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="group relative w-full"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md transition-all duration-700 hover:bg-white/[0.05] hover:border-accent/20 hover:shadow-2xl hover:shadow-accent/5">

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 p-6 md:p-10 lg:p-12">

          {/* Text Info */}
          <div className="flex-1 flex flex-col justify-between order-2 lg:order-1">
            <div>
              {/* Index & Title */}
              <div className="flex items-start gap-4 mb-6">
                <span className="font-mono text-accent/60 text-sm mt-2">
                  0{index + 1}
                </span>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white group-hover:text-accent transition-colors duration-500">
                  {project.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-10">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-white/50 bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-accent/30 hover:text-accent transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-6">
              <a
                href={project.links.demo}
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:text-accent transition-colors duration-300 group/link"
              >
                <span className="relative">
                  Live Demo
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover/link:w-full" />
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
              </a>
              <a
                href={project.links.github}
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white hover:text-accent transition-colors duration-300 group/link"
              >
                <span className="relative">
                  GitHub
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover/link:w-full" />
                </span>
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Image with Reveal Animation */}
          <div className="w-full lg:w-[50%] aspect-[16/10] order-1 lg:order-2 rounded-xl overflow-hidden relative">
            <div
              ref={imageRef}
              className="w-full h-full relative"
              style={{ willChange: 'clip-path, transform' }}
            >
              {/* Image Overlay on Hover */}
              <div className="absolute inset-0 bg-accent/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 opacity-60" />

              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20 z-10"
    >
      <div className="max-w-[1600px] mx-auto">

        {/* Section Header */}
        <div className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-4 block">
              // Featured Projects
            </span>
            <h2
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            >
              Selected Work
            </h2>
          </div>
          <div className="h-[2px] w-24 md:w-32 bg-accent" />
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-16 md:gap-24">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;