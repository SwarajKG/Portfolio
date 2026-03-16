# Technical Codex: Swaraj Gupta 3D Portfolio

This document provides a detailed technical breakdown of the implementation logic, design patterns, and architectural decisions used in this portfolio.

## 🏛️ Architectural Design
The project utilizes a **Flat File Architecture** to minimize deployment complexity and ensure high-speed asset resolution. All core logic is consolidated into three primary files:
- `index.html`: Semantic structure and CDN management.
- `styles.css`: Theming, Glassmorphism UI, game layouts, and responsive design.
- `script.js`: 3D rendering, animation orchestration, DOM interactions, and four distinct game engines.

---

## 🌌 Interactive Neural Network Background (Three.js)
Replacing a simple particle system, the background now features a "Neural Network" node-and-link system.
- **Node Geometry**: `THREE.BufferGeometry` with `THREE.Points` is used for high-performance rendering of nodes.
- **Dynamic Links**: `THREE.LineSegments` are used to draw connections between nodes that fall within a 15-unit radius. This distance check is calculated in every frame, creating a dynamic, flowing mesh.
- **Physics & Motion**: Nodes have constant velocities but bounce off invisible boundaries (-60 to 60) to stay within the scene's view.
- **Parallax Logic**: Mouse coordinates are mapped to the scene's rotation. Additionally, a `scrollPercent` variable links the page's vertical position to the scene's rotation, creating a deep 3D sense of movement during navigation.

---

## 🕹️ Developer Mini-Games (2D Canvas & DOM)
The portfolio includes four mini-games, each tailored to a specific section of the career history:
1. **Code Invaders (About Section)**: A Space Invaders clone where the player (`[ ]`) shoots green patches to clear "BUG" and "ERROR" waves.
2. **Snake.js (Skills Section)**: A classic Snake clone where the player eats tech keywords (C#, .NET, JS) to grow their "career length."
3. **Whack-a-Bug (Experience Section)**: A time-limited challenge (30s) where the player clicks randomly appearing bugs on a 3x3 server grid. Uses GSAP for "FIXED!" popup animations.
4. **Bug Runner (Education Section)**: An endless runner where the player (`</>`) jumps over red "ERROR" text blocks. Features gravity physics and increasing speed.

All games use a shared `game-overlay` class for consistent start/restart UI and `localStorage` to persist high scores between sessions.

---

## 🎭 Animation Engine (GSAP & ScrollTrigger)
The animation system is built for **reliability** and **guaranteed visibility**.
- **Visibility Pattern**: We use the `fromTo` pattern instead of `from`. This explicitly defines the starting state (hidden, offset) and the ending state (visible, centered), preventing elements from getting stuck in an invisible state.
- **Performance**: GSAP animations prioritize hardware-accelerated properties (`transform` and `opacity/autoAlpha`) to ensure 60FPS performance.
- **Synchronization**: `ScrollTrigger.refresh()` is called after page load to ensure trigger points are accurately calculated after the 3D canvas and iframes have finished their initial layout.

---

## 📱 Responsive & Interactive Enhancements
- **Custom Cursor**: A two-part follower (dot and outline). The outline uses `gsap.animate` with a slight duration for a smooth, elastic effect. It is automatically disabled on touch devices.
- **3D Tilt Effects**: Powered by **Vanilla Tilt**, giving physical depth to experience cards when hovered.
- **Favicon & PDF Branding**: The site includes a custom `fav.ico` and a direct-download `resume.pdf` link, ensuring a professional, fully-branded experience.

---
**Maintenance Note**: All project logic is modular within `script.js`. New games or features should follow the `DOMContentLoaded` wrapper pattern and use existing CSS variables for theme consistency.