document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       Custom Cursor
       ========================================================================== */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Only activate custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Adding a slight delay to the outline for a smooth effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effect on links and buttons
        const hoverElements = document.querySelectorAll('a, button, .tilt-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    /* ==========================================================================
       Navigation & Mobile Menu
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    // Sticky Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuIcon.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuIcon.querySelector('i').classList.remove('fa-times');
                menuIcon.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    /* ==========================================================================
       Vanilla Tilt Initialization
       ========================================================================== */
    // Initialize 3D tilt effect on cards if library is loaded
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }

    /* ==========================================================================
       GSAP Animations
       ========================================================================== */
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    const tlHero = gsap.timeline();
    tlHero.from(".greeting", { y: 20, opacity: 0, duration: 0.8, delay: 0.5 })
          .from(".name", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
          .from(".title", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
          .from(".tagline", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
          .from(".hero-buttons", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
          .from(".scroll-indicator", { opacity: 0, duration: 1 }, "-=0.4");

    // General Section Fade Up
    const sections = document.querySelectorAll('.section:not(#hero)');
    sections.forEach(section => {
        gsap.from(section.querySelector('.section-title'), {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8
        });
    });

    // About Section
    gsap.from(".about-content", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 1
    });

    // Skills Section - Progress Bars Animation
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        gsap.from(category, {
            scrollTrigger: {
                trigger: category,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2
        });

        // Animate progress bars within the category
        const progressBars = category.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            gsap.to(bar, {
                scrollTrigger: {
                    trigger: category,
                    start: "top 85%",
                },
                width: bar.getAttribute('data-width'),
                duration: 1.5,
                ease: "power2.out",
                delay: 0.3
            });
        });
    });

    // Experience Timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        });
    });

    // Education Cards
    gsap.from(".edu-card", {
        scrollTrigger: {
            trigger: "#education",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });

    // Contact Section
    gsap.from(".contact-info", {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 80%",
        },
        x: -30,
        opacity: 0,
        duration: 0.8
    });

    gsap.from(".contact-form", {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 80%",
        },
        x: 30,
        opacity: 0,
        duration: 0.8
    });

    /* ==========================================================================
       Three.js Background Animation (Particles)
       ========================================================================== */
    const canvas = document.getElementById('three-canvas');
    if (canvas && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        
        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = window.innerWidth < 768 ? 400 : 1000; // Less particles on mobile
        
        const posArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 3; i++) {
            // Spread particles across a wide area
            posArray[i] = (Math.random() - 0.5) * 100;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        // Create material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.15,
            color: 0x3b82f6, // Primary modern blue
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        // Create Mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Mouse interaction for particles
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        });

        // Animation Loop
        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Slowly rotate the entire particle system
            particlesMesh.rotation.y = elapsedTime * 0.05;
            particlesMesh.rotation.x = elapsedTime * 0.02;

            // Add subtle interaction with mouse
            if (mouseX > 0) {
                particlesMesh.rotation.x += (mouseY * 0.00005 - particlesMesh.rotation.x) * 0.05;
                particlesMesh.rotation.y += (mouseX * 0.00005 - particlesMesh.rotation.y) * 0.05;
            }

            renderer.render(scene, camera);
        };

        animate();

        // Handle Window Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
});