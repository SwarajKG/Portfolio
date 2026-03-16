# Project Mandates: Swaraj Gupta 3D Portfolio

This file defines the foundational mandates for AI-assisted development of the Swaraj Gupta 3D Portfolio project. These rules take absolute precedence over standard workflows.

## 📁 Directory Structure
- **FLAT STRUCTURE ONLY**: All project files (HTML, CSS, JS, assets) MUST reside in the root directory. 
- **NO SUBFOLDERS**: Do not create or move files into `src/`, `assets/`, `css/`, or `js/` folders.

## 🎨 Design & Theme
- **Theme**: Dark modern developer theme (`#0f172a` base).
- **UI Elements**: Glassmorphism and Neumorphism only.
- **Responsiveness**: Mobile-first approach is mandatory. All sections must be fully responsive.
- **Visuals**: Use CSS gradients, Three.js particles, and GSAP for all animations.

## 🛠️ Technical Stack
- **Core**: Semantic HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Libraries (CDN Only)**: 
  - Three.js (for 3D backgrounds)
  - GSAP & ScrollTrigger (for scroll animations)
  - Vanilla Tilt (for 3D card effects)
  - FontAwesome (for icons)
- **Fonts**: Inter and Fira Code.

## ✍️ Coding Standards
- **CSS**: Use CSS Variables for all theme colors, spacing, and transitions.
- **JS**: Modular event listeners. Do not use inline `onclick` attributes.
- **Animations**: Prefer `transform` and `opacity` for performance-optimized animations.
- **Comments**: Maintain high-quality, professional comments explaining complex logic (especially Three.js scenes).

## 🚀 Performance & SEO
- **Images**: Use lazy loading (`loading="lazy"`) for all image assets.
- **Optimization**: Minimize DOM manipulation outside of GSAP; keep Three.js particle counts optimized for mobile.
- **SEO**: Maintain semantic structure (`header`, `main`, `section`, `footer`) and proper ARIA labels.

---
**Strict Adherence Required** - These mandates ensure consistency, performance, and the specific architecture requested for this portfolio.