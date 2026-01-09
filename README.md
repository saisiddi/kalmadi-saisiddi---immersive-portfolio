<div align="center">

# ✨ Immersive Portfolio V2.0

### A Production-Grade, "Awwwards-Level" Digital Reality Experience

[![Live Demo](https://img.shields.io/badge/LIVE-DEMO-22c55e?style=for-the-badge&logo=vercel&logoColor=white)](https://your-portfolio.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com)
[![Three.js](https://img.shields.io/badge/Three.js-r182-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

<img src="https://raw.githubusercontent.com/KalmadiSaisiddi/immersive-portfolio/main/preview.png" alt="Portfolio Preview" width="800"/>

*An architecturally optimized, interactive sandbox built with cutting-edge WebGL and React choreography.*

</div>

---

## 🎯 Architectural Overview

Engineered for the **60fps "Butter" Factor**, this portfolio is a case study in high-performance creative development. Every interaction—from the scroll-linked digital thread to the custom GLSL holographic portrait—is optimized for zero-jitter and maximum visual impact.

- 💎 **Performance Native** — Built with React.lazy/Suspense and a singleton Lenis architecture for ultra-stable frame rates.
- 🎨 **GLSL Artistry** — Custom vertex and fragment shaders powering the hero interaction.
- 🖱️ **Tactile UX** — Magnetic physics-based buttons and a high-precision custom cursor.
- ⚡ **Optimized Core** — Tailwind 4 implementation for zero-runtime styling overhead.

---

## ✨ Key Features

### 🖼️ Holographic Portrait V3.0
- **GLSL Custom Shader**: Interactive 3D portrait with real-time **Chromatic Aberration** and **Digital Scanlines**.
- **Interactive Parallax**: The portrait physically tilts and shifts its visual depth based on high-precision cursor tracking.
- **Mesh Distortion**: Subtle vertex-wave animations that respond to proximity.

### 🧬 Digital Thread 2.0
- **Organic Pathing**: Redesigned from a "spring" look into elegant, sweeping circuitry curves.
- **Data-Nodes**: Glowing technical nodes at every turn, simulating a physical fiber-optic line.
- **Scroll Sync**: A high-speed trailing spark synchronized with the Lenis smooth-scroll singleton.

### 🎬 Entrance Experience
- **Premium Preloader**: A multi-stage system initialization sequence with "Curtain" reveal effects and real-time asset progress tracking.
- **Asset Optimization**: Transitioned to WebP/AVIF formats for instantaneous first meaningful paints.

### 📱 Performance-First Responsiveness
- **Dynamic Culling**: Heavy WebGL scenes are intelligently culled on mobile devices to save battery and maintain native smoothness.
- **Reduced Motion**: Respects the `prefers-reduced-motion` system setting across all GSAP timelines.

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Core** | React 19, TypeScript, Vite |
| **WebGL** | Three.js, React Three Fiber, GLSL Shaders |
| **Animation** | GSAP 3.12 (ScrollTrigger, Custom Ease), Lenis v1.2 |
| **Styling** | Tailwind CSS v4.0 (Performance Engine), Modern CSS |
| **Assets** | WebP Optimized Imagery, Lucide Icons |

---

## 📂 Project Structure

```
immersive-portfolio/
├── components/
│   ├── 3d/
│   │   └── HolographicPortrait.tsx # Custom Shader Card
│   ├── ui/
│   │   ├── CustomCursor.tsx       # Follower architecture
│   │   ├── MagneticButton.tsx     # Physics-based CTA
│   │   ├── NoiseOverlay.tsx       # SVG Grain filter
│   │   └── Preloader.tsx          # System initialization UI
│   ├── DigitalThread.tsx          # Organic SVG choreography
│   ├── Scene.tsx                  # Performance-tuned particle field
│   ├── Hero.tsx                   # Headlines & Layout
│   └── Projects.tsx               # Reveal-based project cards
├── App.tsx                        # Root with Lenis Singleton
├── index.css                      # Tailwind 4 & Theme Registry
└── constants.ts                   # Data-driven content source
```

---

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/KalmadiSaisiddi/immersive-portfolio.git

# Install dependencies
npm install

# Start development
npm run dev
```

The site will launch at `http://localhost:3000` with HMR (Hot Module Replacement) enabled.

---

## 🎨 Professional Customization

### Theme & Colors
Instead of a CDN or separate config, colors are now registered in the **Tailwind 4 Theme Registry** inside `index.css`:

```css
@theme {
  --color-accent: #22c55e;
  --color-background: #050505;
  --font-sans: "Manrope", "Inter", sans-serif;
}
```

### Data Engine
Update `constants.ts` to swap the profile info, project details, and optimized WebP image paths.

---

## 📜 Inspiration & Credits
Dedicated to the creative developer community and libraries that make modern web magic possible: **GreenSock**, **Poimandres (r3f)**, and the **Awwwards** community.

---

<div align="center">

### Built for the Future by Kalmadi Saisiddi 🚀

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/saisiddi-kalmadi-172672382)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/KalmadiSaisiddi)

</div>
