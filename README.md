<div align="center">

# ✨ Immersive Portfolio

### A High-End, Award-Worthy Personal Portfolio

[![Live Demo](https://img.shields.io/badge/LIVE-DEMO-22c55e?style=for-the-badge&logo=vercel&logoColor=white)](https://your-portfolio.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com)
[![Three.js](https://img.shields.io/badge/Three.js-r182-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org)

<img src="https://raw.githubusercontent.com/KalmadiSaisiddi/immersive-portfolio/main/preview.png" alt="Portfolio Preview" width="800"/>

*An immersive, interactive portfolio built with cutting-edge web technologies, designed to captivate and impress.*

</div>

---

## 🎯 Overview

This portfolio is engineered to deliver an **Awwwards-level** user experience. Every scroll, hover, and click has been meticulously crafted to feel premium, smooth, and deeply engaging. It showcases my work as a **Creative Front-End Developer** with a focus on:

- 🎨 **Immersive Animations** — GSAP-powered reveals, parallax effects, and scroll-linked storytelling
- 🖱️ **Custom Interactivity** — Magnetic buttons, custom cursor, and hover micro-interactions
- 🌐 **3D Elements** — React Three Fiber particle systems and WebGL backgrounds
- ⚡ **Performance** — Optimized for desktop with graceful mobile fallbacks

---

## ✨ Key Features

### 🚀 Smooth Scrolling & Parallax
- **Lenis** integration for buttery-smooth inertia scrolling
- Parallax effects on headlines and content sections
- Scroll-linked animations synchronized with GSAP ScrollTrigger

### 🎬 High-End Animations (GSAP)
- **Hero Section**: Staggered entrance with split-text character animations
- **Text Reveals**: Headlines animate word-by-word as you scroll
- **Image Reveals**: Project images "unveil" with clip-path mask transitions
- **Digital Thread**: A glowing SVG path that draws itself as you scroll, guiding your journey

### 🖱️ Immersive Interactivity
- **Custom Cursor**: Trailing dot with expanding ring, color shifts on hover
- **Magnetic Buttons**: CTAs that subtly follow your mouse with elastic easing
- **Sophisticated Hovers**: Project cards lift, images zoom, overlays fade in

### 🎨 Visual Aesthetics
- **Dark Mode First**: Deep black backgrounds with neon green accents
- **Glassmorphism**: Frosted glass navigation on scroll
- **Noise Overlay**: Subtle film grain for premium depth
- **Gradient Mesh**: Animated background blobs that pulse and float
- **Swiss Typography**: Massive, bold headlines with intentional negative space

### 📱 Mobile Optimization
- 3D particle effects disabled on mobile for performance
- Default cursor restored for touch devices
- Respects `prefers-reduced-motion` accessibility preference
- Responsive layouts with mobile-first breakpoints

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | React 19, Vite |
| **3D & WebGL** | Three.js, React Three Fiber, Drei |
| **Animation** | GSAP 3.12, ScrollTrigger, Lenis |
| **Styling** | Tailwind CSS (CDN), Custom CSS |
| **Language** | TypeScript |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 📂 Project Structure

```
immersive-portfolio/
├── components/
│   ├── ui/
│   │   ├── CustomCursor.tsx    # Custom trailing cursor
│   │   ├── MagneticButton.tsx  # Magnetic hover effect
│   │   └── NoiseOverlay.tsx    # Film grain texture
│   ├── DigitalThread.tsx       # Scroll-linked SVG animation
│   ├── Footer.tsx              # Footer with giant name
│   ├── Header.tsx              # Glassmorphism navigation
│   ├── Hero.tsx                # Hero with split-text animation
│   ├── Projects.tsx            # Project cards with reveals
│   ├── Scene.tsx               # 3D particle background
│   └── TechMarquee.tsx         # Skills marquee
├── App.tsx                     # Main app with Lenis setup
├── constants.ts                # Profile, projects, socials data
├── types.ts                    # TypeScript interfaces
├── index.html                  # Entry HTML with Tailwind CDN
├── index.css                   # Global styles
└── index.tsx                   # React entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/KalmadiSaisiddi/immersive-portfolio.git

# Navigate to the project
cd immersive-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎨 Customization

### Update Your Information

Edit `constants.ts` to personalize:

```typescript
export const PROFILE = {
  name: "Your Name",
  role: "Your Role",
  bio: "Your bio...",
  email: "your@email.com",
  // ...
};

export const PROJECTS = [
  {
    title: "Project Name",
    description: "Description...",
    stack: ["React", "TypeScript"],
    links: {
      demo: "https://...",
      github: "https://..."
    },
    image: "https://..."
  }
];
```

### Theme Colors

The accent color is defined in `index.html` (Tailwind config):

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        accent: '#22c55e', // Change this to your brand color
      }
    }
  }
}
```

---

## 🖼️ Screenshots

<div align="center">

| Hero Section | Projects Section |
|:---:|:---:|
| ![Hero](https://via.placeholder.com/400x250/050505/22c55e?text=Hero+Section) | ![Projects](https://via.placeholder.com/400x250/050505/22c55e?text=Projects) |

| Digital Thread | Footer |
|:---:|:---:|
| ![Thread](https://via.placeholder.com/400x250/050505/22c55e?text=Digital+Thread) | ![Footer](https://via.placeholder.com/400x250/050505/22c55e?text=Footer) |

</div>

---

## 📜 Credits & Inspiration

- **GSAP** by GreenSock — The gold standard for web animation
- **Lenis** by Studio Freight — Smooth scroll library
- **Three.js** — 3D graphics for the web
- **Awwwards** — Design inspiration and benchmarks

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

### Built with 💚 by Kalmadi Saisiddi

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/saisiddi-kalmadi-172672382)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/KalmadiSaisiddi)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail)](mailto:143saisiddi@gmail.com)

</div>
