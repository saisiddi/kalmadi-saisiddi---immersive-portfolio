import { Project, SocialLink } from './types';

export const PROFILE = {
  name: "Kalmadi Saisiddi",
  role: "Creative Front-End Developer",
  tagline: "I don't just build websites; I build experiences.",
  bio: "I am a passionate Front-End Developer specializing in building immersive, interactive web experiences. With expertise in React, Three.js, and modern animation libraries, I transform creative visions into pixel-perfect reality. A serial hackathon competitor with top-10 finishes at major institutions, I thrive at the intersection of design and development.",
  status: "Open for opportunities",
  email: "143saisiddi@gmail.com",
  image: "/profile.webp",
};

export const PROJECTS: Project[] = [
  {
    title: "MedInsight AI",
    description: "AI-powered diagnostic assistant featuring medical image analysis (X-ray, OCR), multilingual text-to-speech, and an intuitive React-based dashboard for healthcare professionals.",
    stack: ["React", "AI Integration", "Tailwind CSS", "Vite"],
    links: {
      demo: "https://medinsightai.vercel.app/",
      github: "https://github.com/saisiddi/medinsightai"
    },
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop"
  },
  {
    title: "SmartSplit",
    description: "Elegant expense splitting platform with real-time tracking, automated debt simplification algorithms, and a polished UI built with modern React patterns.",
    stack: ["React", "Firebase", "Tailwind CSS", "Framer Motion"],
    links: {
      demo: "https://smart-split-rosy.vercel.app/",
      github: "https://github.com/KalmadiSaisiddi/SmartSplit"
    },
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop"
  }
];

export const SKILLS = [
  "React", "Three.js", "GSAP", "Tailwind CSS", "TypeScript", "Framer Motion", "Next.js", "Vite", "JavaScript", "CSS Animation"
];

export const SOCIALS: SocialLink[] = [
  { label: "LinkedIn", url: "https://linkedin.com/in/saisiddi-kalmadi-172672382" },
  { label: "GitHub", url: "https://github.com/KalmadiSaisiddi" },
  { label: "Email", url: "mailto:143saisiddi@gmail.com", email: true }
];