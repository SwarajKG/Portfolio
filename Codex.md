# Technical Codex: Swaraj Gupta 3D Portfolio

This document provides a detailed technical breakdown of the implementation logic, design patterns, and architectural decisions used in this portfolio.

## 🏛️ Architectural Design
The project utilizes a **Flat File Architecture** to minimize deployment complexity and ensure high-speed asset resolution. All core logic is consolidated into three primary files:
- `index.html`: Semantic structure and CDN management (utilizing Three.js r160).
- `styles.css`: Theming, Glassmorphism UI, game layouts, and responsive design.
- `script.js`: 3D rendering, animation orchestration, DOM interactions, and four distinct game engines.

---

## 🌌 Interactive 3D Solar System Background (Three.js)
The background features a custom-built Solar System that serves as the visual anchor of the portfolio.
- **Central Sun**: A high-detail `IcosahedronGeometry` core with a larger, pulsing `SphereGeometry` corona. It includes a strong `PointLight` to provide dynamic illumination to the rest of the system.
- **Planetary Orbits**: A hierarchical `THREE.Group` system allows planets to rotate independently around the Sun at variable speeds. 
- **Planet Geometries**: Planets use `SphereGeometry` with `MeshStandardMaterial` (varying metalness and roughness) to create distinct visual identities (Inner, Bio, Gas Giant with rings, and Ice).
- **Orbital Paths**: Thin, glowing rings drawn using `TorusGeometry` visualize the planetary paths.
- **Meteor System**: A procedural particle system that launches 8 meteors with `Vector3` velocities. Each meteor is a group containing a glowing head and a `CylinderGeometry` tail oriented towards its velocity vector. Meteors are automatically recycled when they exit the viewport boundaries.
- **Centering Logic**: The entire `solarSystem` group is parented to the `camera` rather than the `scene`. This technical choice ensures the solar system remains perfectly centered in the viewport even as the underlying scene rotates during page scrolling.

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
**Maintenance Note**: All project logic is modular within `script.js`. New solar system bodies or game features should follow the existing `Group` hierarchy pattern and utilize the established `try-catch` safety wrappers.