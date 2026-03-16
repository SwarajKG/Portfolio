# Technical Codex: Swaraj Gupta 3D Portfolio

This document provides a detailed technical breakdown of the implementation logic, design patterns, and architectural decisions used in this portfolio.

## 🏛️ Architectural Design
The project utilizes a **Flat File Architecture** to minimize deployment complexity and ensure high-speed asset resolution. All core logic is consolidated into three primary files:
- `index.html`: Semantic structure and CDN management.
- `styles.css`: Theming, Glassmorphism UI, and responsive layout.
- `script.js`: 3D rendering, animation orchestration, and DOM interactions.

---

## 🌌 3D Hero Background (Three.js)
The background is rendered on a dedicated `<canvas>` using **Three.js**.
- **Geometry**: `THREE.BufferGeometry` is used for performance, as it manages large arrays of point data more efficiently than standard geometry.
- **Material**: `THREE.PointsMaterial` with `THREE.AdditiveBlending` creates a "glow" effect where particles overlap.
- **Logic**:
  - The particle system rotates slowly on its X and Y axes (`clock.getElapsedTime()`).
  - **Interaction**: Mouse coordinates are tracked and mapped to a subtle rotation multiplier, creating a parallax effect that follows the user.
  - **Optimization**: Particle count is dynamically adjusted based on viewport width to preserve battery life on mobile devices.

---

## 🎭 Animation Engine (GSAP & ScrollTrigger)
The animation system is built for **reliability** and **guaranteed visibility**.
- **Visibility Pattern**: We use the `fromTo` pattern instead of `from`. This explicitly defines the starting state (hidden, offset) and the ending state (visible, centered), preventing elements from getting stuck in an invisible state if a scroll trigger is interrupted.
- **Visibility Property**: `autoAlpha` is used instead of `opacity`. `autoAlpha` toggles `visibility: hidden` when the opacity is 0, improving performance by removing the element from the browser's render tree until needed.
- **Synchronization**: `ScrollTrigger.refresh()` is called with a 500ms delay after the `window.load` event. This ensures that the height of the page (and thus the trigger points) is accurately measured after the Google Form iframe and Three.js canvas have finished their layout calculations.

---

## 💎 UI & Styling (Glassmorphism)
The design follows a **Dark Modern Developer** aesthetic.
- **Glassmorphism**: Achieved using `backdrop-filter: blur()`. It provides a translucent "frosted glass" effect that allows the 3D particles to be subtly visible behind the content panels.
- **Variables**: The entire theme is centralized in CSS `:root` variables, allowing for global color or typography changes with a single edit.
- **Timeline UI**: Built using CSS pseudo-elements (`::before` and `::after`) to create the vertical line and connection dots without extra HTML bloat.

---

## 📩 Contact Integration (Google Form Hack)
To maintain the dark theme while using a standard Google Form:
- **CSS Filter**: An `invert(90%) hue-rotate(180deg)` filter is applied to the iframe. This mathematically flips the white background of the Google Form to a dark grey and preserves the relative colors of the inputs and text.
- **Iframe Embedding**: The form is embedded with `embedded=true` to strip standard Google headers and footers, resulting in a cleaner integration.

---

## 📱 Mobile Strategy
- **Cursor Logic**: The custom cursor is automatically disabled on devices where `(pointer: fine)` is false (touchscreens) to avoid erratic behavior.
- **Layout**: Flexbox and CSS Grid are used with `repeat(auto-fit)` to ensure that skill cards and project sections stack naturally without hardcoded breakpoints where possible.
- **Performance**: GSAP animations use hardware-accelerated properties (`transform` and `opacity`) to ensure 60FPS performance even on mid-range mobile devices.

---
**Maintenance Note**: When adding new sections, always wrap them in a `.section` container to ensure they are automatically picked up by the global GSAP reveal logic in `script.js`.