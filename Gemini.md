<<<<<<< HEAD
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
  - Google Forms (for contact backend)
- **Fonts**: Inter and Fira Code.

## ✍️ Coding Standards
- **CSS**: Use CSS Variables for all theme colors, spacing, and transitions.
- **JS**: Modular event listeners. Do not use inline `onclick` attributes.
- **Animations**:
  - Always use GSAP `fromTo` for scroll reveals to guarantee end-state visibility.
  - Prefer `autoAlpha` over `opacity` for better visibility/performance.
  - Trigger points (`start`) should be flexible (e.g., `95%` or `90%`) to account for slow layout calculation.
  - Always perform a `ScrollTrigger.refresh()` after page load or dynamic content changes.

## 📩 Contact Integration
- **Google Form**: Maintain the embedded iframe structure for the contact form.
- **Styling**: Any changes to the Google Form must preserve the CSS `filter` used for the dark-theme effect.

## 🚀 Performance & SEO
- **Images**: Use lazy loading (`loading="lazy"`) for all image assets.
- **Optimization**: Keep Three.js particle counts optimized for mobile.
- **SEO**: Maintain semantic structure (`header`, `main`, `section`, `footer`) and proper ARIA labels.

---
=======
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
>>>>>>> 21c72bb23b3084d33f50cb3e9b37a4fe2b70e661
**Strict Adherence Required** - These mandates ensure consistency, performance, and the specific architecture requested for this portfolio.