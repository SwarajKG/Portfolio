# 3D Interactive Developer Portfolio - Swaraj Gupta

A modern, high-performance, and fully responsive 3D portfolio website built for **Swaraj Gupta**, Senior Full Stack .NET Developer. This project features a professional dark theme, smooth animations, and a striking interactive 3D solar system background, including four developer-themed mini-games.

## 🚀 Live Preview Features

- **Interactive 3D Solar System:** A sophisticated 3D background built with **Three.js (r160)** featuring a glowing central Sun, multiple orbiting planets with unique materials, orbital path rings, and a dynamic starfield.
- **Flying Meteor System:** Procedurally generated meteors with glowing heads and trailing tails that fly through the scene, reacting to the 3D space.
- **Developer Mini-Games:** Four interactive games integrated into the portfolio:
    - **Code Invaders:** A "Space Invaders" clone below the About section (shoot down bugs!).
    - **Snake.js:** A "Snake" clone below the Skills section (eat skills to grow your career!).
    - **Whack-a-Bug:** A "Whack-a-Mole" clone below the Experience section (fix production bugs!).
    - **Bug Runner:** An "Endless Runner" clone below the Education section (jump over errors!).
- **Google Form Integration:** Secure and reliable contact method via an embedded Google Form, styled to match the dark theme.
- **Glassmorphism UI:** Modern frosted-glass aesthetic for panels, cards, and game overlays.
- **Robust Scroll Animations:** Powered by **GSAP (GreenSock)** and **ScrollTrigger** using `fromTo` logic for guaranteed visibility and smooth reveal effects.
- **3D Tilt Effects:** Interactive hover states on experience and education cards using **Vanilla Tilt**.
- **Custom Cursor:** A sleek, animated cursor follower for enhanced user interaction.
- **Fully Responsive:** Optimized for Desktop, Tablet, and Mobile devices with a custom mobile navigation menu and touch controls for all games. The 3D solar system scales dynamically to fit any screen.

## 🛠️ Built With

- **HTML5:** Semantic structure and SEO-friendly markup.
- **CSS3:** Custom variables, Flexbox/Grid, and advanced animations.
- **JavaScript (ES6+):** Core logic, game engines, and interactivity.
- **Three.js (r160):** High-end 3D solar system and meteor background rendering.
- **GSAP & ScrollTrigger:** High-performance animation engine and scroll handling.
- **Google Forms:** Reliable backend for contact submissions.
- **FontAwesome:** Professional developer icons.
- **Google Fonts:** Inter and Fira Code for a clean "developer" look.

## 📂 Project Structure

This project follows a flat directory structure for simplicity and ease of deployment:

```text
Portfolio-1/
├── index.html    # Main entry point and structure
├── styles.css    # Modern dark theme, layout, and game styles
├── script.js     # Interactivity, 3D logic, games, and animations
├── programmer.jpg # Asset for developer image features (if enabled)
├── README.md     # Project documentation
├── Codex.md      # Technical breakdown of the project
└── Gemini.md     # Project mandates and development rules
```

## 💻 Getting Started

1. **Clone/Download** this repository to your local machine.
2. Ensure you have an active internet connection (to load the library CDNs).
3. Open `index.html` in any modern web browser via a local server (e.g., VS Code Live Server or `npx serve .`).

## 🔧 Customization

- **Google Form:** To use your own form, replace the `src` attribute of the iframe in `index.html` with your Google Form's "Embed HTML" link.
- **Colors:** Update the CSS variables in the `:root` section of `styles.css`.
- **Mini-Games:** Adjust speed, difficulty, or visual elements in the corresponding sections of `script.js`.
- **3D Solar System:** Fine-tune planet count, orbit speeds, or Sun size in the `planetData` array within `script.js`.

---

**Built with ❤️ by Swaraj Gupta**  
*Senior Full Stack .NET Developer*