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
        const isExpanded = menuIcon.getAttribute('aria-expanded') === 'true';
        menuIcon.setAttribute('aria-expanded', !isExpanded);
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
                menuIcon.setAttribute('aria-expanded', 'false');
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
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Section Animations
        if (document.querySelector('.hero-content')) {
            const tlHero = gsap.timeline();
            tlHero.fromTo(".greeting", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, delay: 0.5 })
                  .fromTo(".name", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, "-=0.6")
                  .fromTo(".title", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, "-=0.6")
                  .fromTo(".tagline", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, "-=0.6")
                  .fromTo(".hero-buttons", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, "-=0.6")
                  .fromTo(".scroll-indicator", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, "-=0.4");
        }

        // General Section Title Fade Up
        const sections = document.querySelectorAll('.section:not(#hero)');
        sections.forEach(section => {
            const title = section.querySelector('.section-title');
            if (title) {
                gsap.fromTo(title, 
                    { y: 30, autoAlpha: 0 },
                    {
                        scrollTrigger: {
                            trigger: section,
                            start: "top 95%",
                            once: true
                        },
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.8
                    }
                );
            }
        });

        // About Section
        if (document.querySelector('.about-content')) {
            gsap.fromTo(".about-content", 
                { y: 40, autoAlpha: 0 },
                {
                    scrollTrigger: {
                        trigger: "#about",
                        start: "top 90%",
                        once: true
                    },
                    y: 0,
                    autoAlpha: 1,
                    duration: 1
                }
            );
        }

        // Skills Section - Progress Bars Animation
        const skillCategories = document.querySelectorAll('.skill-category');
        if (skillCategories.length > 0) {
            skillCategories.forEach(category => {
                gsap.fromTo(category, 
                    { y: 30, autoAlpha: 0 },
                    {
                        scrollTrigger: {
                            trigger: category,
                            start: "top 95%",
                            once: true
                        },
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.6
                    }
                );

                // Animate progress bars within the category
                const progressBars = category.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    gsap.to(bar, {
                        scrollTrigger: {
                            trigger: category,
                            start: "top 95%",
                            once: true
                        },
                        width: bar.getAttribute('data-width'),
                        duration: 1.5,
                        ease: "power2.out",
                        delay: 0.3
                    });
                });
            });
        }

        // Experience Timeline
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (timelineItems.length > 0) {
            timelineItems.forEach(item => {
                gsap.fromTo(item, 
                    { x: -50, autoAlpha: 0 },
                    {
                        scrollTrigger: {
                            trigger: item,
                            start: "top 95%",
                            once: true
                        },
                        x: 0,
                        autoAlpha: 1,
                        duration: 0.8,
                        ease: "back.out(1.7)"
                    }
                );
            });
        }

        // Education Cards
        const eduCards = document.querySelectorAll('.edu-card');
        if (eduCards.length > 0) {
            gsap.fromTo(eduCards, 
                { y: 50, autoAlpha: 0 },
                {
                    scrollTrigger: {
                        trigger: "#education",
                        start: "top 90%",
                        once: true
                    },
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    stagger: 0.2
                }
            );
        }

        // Contact Section
        if (document.querySelector('.contact-info')) {
            gsap.fromTo(".contact-info", 
                { x: -30, autoAlpha: 0 },
                {
                    scrollTrigger: {
                        trigger: "#contact",
                        start: "top 90%",
                        once: true
                    },
                    x: 0,
                    autoAlpha: 1,
                    duration: 0.8
                }
            );
        }

        if (document.querySelector('.contact-form')) {
            gsap.fromTo(".contact-form", 
                { x: 30, autoAlpha: 0 },
                {
                    scrollTrigger: {
                        trigger: "#contact",
                        start: "top 90%",
                        once: true
                    },
                    x: 0,
                    autoAlpha: 1,
                    duration: 0.8
                }
            );
        }

        // Thorough refresh after everything settles
        window.addEventListener('load', () => {
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 500);
        });
    }

    /* ==========================================================================
       Three.js Background Animation (Interactive Neural Network)
       ========================================================================== */
    const canvas = document.getElementById('three-canvas');
    if (canvas && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        
        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;
        scene.add(camera);

        // Developer Image Group (Attached to camera to stay centered)
        const devGroup = new THREE.Group();
        camera.add(devGroup);
        devGroup.position.z = -30;

        const textureLoader = new THREE.TextureLoader();
        textureLoader.setCrossOrigin('anonymous'); // Still good practice, but local paths don't require CORS
        
        // Using local path to avoid CORS issues
        const imageUrl = './programmer.jpg';
        
        // Image Plane
        const imageGeometry = new THREE.PlaneGeometry(20, 20);
        const imageMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load(imageUrl),
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending // Blends nicely with dark background
        });
        const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
        devGroup.add(imageMesh);

        // Glow/Aura Plane behind image
        const glowGeometry = new THREE.PlaneGeometry(22, 22);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });
        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        glowMesh.position.z = -1;
        devGroup.add(glowMesh);

        const updateDevScale = () => {
            const scale = window.innerWidth < 768 ? 0.6 : 1.0;
            devGroup.scale.set(scale, scale, scale);
        };
        updateDevScale();

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Interaction state
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        // Particles & Connections
        const particlesCount = window.innerWidth < 768 ? 50 : 120;
        const maxDistance = 15;
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particlesCount * 3);
        const velocities = [];

        // Initialize particles
        for(let i = 0; i < particlesCount; i++) {
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 100;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            velocities.push({
                x: (Math.random() - 0.5) * 0.1,
                y: (Math.random() - 0.5) * 0.1,
                z: (Math.random() - 0.5) * 0.1
            });
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.7,
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particleSystem);

        // Lines (Connections)
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending
        });

        const lineGeometry = new THREE.BufferGeometry();
        const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lineMesh);

        // Interaction Listeners
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX) * 0.05;
            mouseY = (event.clientY - windowHalfY) * 0.05;
        });

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Update particle positions
            const currentPositions = particleGeometry.attributes.position.array;
            const linePositions = [];

            for(let i = 0; i < particlesCount; i++) {
                // Apply velocity
                currentPositions[i * 3] += velocities[i].x;
                currentPositions[i * 3 + 1] += velocities[i].y;
                currentPositions[i * 3 + 2] += velocities[i].z;

                // Boundary check
                if (currentPositions[i * 3] < -60 || currentPositions[i * 3] > 60) velocities[i].x *= -1;
                if (currentPositions[i * 3 + 1] < -60 || currentPositions[i * 3 + 1] > 60) velocities[i].y *= -1;
                if (currentPositions[i * 3 + 2] < -60 || currentPositions[i * 3 + 2] > 60) velocities[i].z *= -1;

                // Connection logic
                for (let j = i + 1; j < particlesCount; j++) {
                    const dx = currentPositions[i * 3] - currentPositions[j * 3];
                    const dy = currentPositions[i * 3 + 1] - currentPositions[j * 3 + 1];
                    const dz = currentPositions[i * 3 + 2] - currentPositions[j * 3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < maxDistance) {
                        linePositions.push(
                            currentPositions[i * 3], currentPositions[i * 3 + 1], currentPositions[i * 3 + 2],
                            currentPositions[j * 3], currentPositions[j * 3 + 1], currentPositions[j * 3 + 2]
                        );
                    }
                }
            }

            particleGeometry.attributes.position.needsUpdate = true;

            // Update lines
            lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));

            // Smooth camera/scene interaction
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            // Subtle rotation based on scroll
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            scene.rotation.y = targetX * 0.01 + scrollPercent * 2;
            scene.rotation.x = targetY * 0.01;

            // Interactive animation for Developer Image
            const time = Date.now() * 0.001;
            if (typeof devGroup !== 'undefined') {
                devGroup.position.y = Math.sin(time * 1.5) * 0.5;
                devGroup.position.x = Math.cos(time * 1.2) * 0.3;
                // Parallax effect counter to mouse movement
                devGroup.rotation.y = targetX * 0.05;
                devGroup.rotation.x = targetY * 0.05;
                devGroup.rotation.z = Math.sin(time * 0.5) * 0.05;
            }

            renderer.render(scene, camera);
        };

        animate();

        // Handle Window Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            if (typeof updateDevScale === 'function') updateDevScale();
        });
        }

        /* ==========================================================================
        Bug Runner Mini Game Logic
        ========================================================================== */
        const canvasGame = document.getElementById('game-canvas');
        if (canvasGame) {
        const ctx = canvasGame.getContext('2d');
        const startBtn = document.getElementById('start-game-btn');
        const overlay = document.getElementById('game-overlay');
        const scoreEl = document.getElementById('current-score');
        const highScoreEl = document.getElementById('high-score');
        const overlayTitle = document.getElementById('overlay-title');
        const overlayText = document.getElementById('overlay-text');

        let isPlaying = false;
        let score = 0;
        let highScore = localStorage.getItem('bugRunnerHighScore') || 0;
        highScoreEl.textContent = highScore;

        let gameSpeed = 5;
        let frameCount = 0;
        let obstacles = [];

        const player = {
            x: 50,
            y: 0,
            width: 40,
            height: 40,
            color: '#3b82f6',
            dy: 0,
            jumpForce: 12,
            gravity: 0.6,
            grounded: false,

            draw() {
                ctx.fillStyle = this.color;
                ctx.font = 'bold 24px "Fira Code"';
                ctx.textAlign = 'center';
                ctx.fillText('</>', this.x + this.width / 2, this.y + this.height / 1.5);

                // Add a subtle glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
            }
        };

        class Obstacle {
            constructor() {
                this.width = Math.random() * 40 + 60;
                this.height = 30;
                this.x = canvasGame.width;
                this.y = canvasGame.height - this.height - 10;
                this.text = Math.random() > 0.5 ? 'ERROR' : 'BUG';
                this.color = '#ef4444';
            }

            draw() {
                ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
                ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 2;
                ctx.strokeRect(this.x, this.y, this.width, this.height);

                ctx.fillStyle = this.color;
                ctx.font = 'bold 14px "Fira Code"';
                ctx.textAlign = 'center';
                ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 1.5);
                ctx.shadowBlur = 0;
            }

            update() {
                this.x -= gameSpeed;
                this.draw();
            }
        }

        function initGame() {
            canvasGame.width = canvasGame.parentElement.clientWidth;
            canvasGame.height = canvasGame.parentElement.clientHeight;
            player.y = canvasGame.height - player.height - 10;
        }

        function jump() {
            if (player.grounded && isPlaying) {
                player.dy = -player.jumpForce;
                player.grounded = false;
            }
        }

        function spawnObstacle() {
            if (frameCount % Math.max(70, 120 - Math.floor(score / 5)) === 0) {
                obstacles.push(new Obstacle());
            }
        }

        function checkCollision(p, o) {
            return (
                p.x < o.x + o.width &&
                p.x + p.width > o.x &&
                p.y < o.y + o.height &&
                p.y + p.height > o.y
            );
        }

        function gameOver() {
            isPlaying = false;
            overlay.classList.remove('hidden');
            overlayTitle.textContent = 'System Crash!';
            overlayText.textContent = `Score: ${Math.floor(score)} | High Score: ${highScore}`;
            startBtn.textContent = 'Restart Debug';

            if (score > highScore) {
                highScore = Math.floor(score);
                localStorage.setItem('bugRunnerHighScore', highScore);
                highScoreEl.textContent = highScore;
            }
        }

        function update() {
            if (!isPlaying) return;

            ctx.clearRect(0, 0, canvasGame.width, canvasGame.height);

            // Floor line
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.beginPath();
            ctx.moveTo(0, canvasGame.height - 10);
            ctx.lineTo(canvasGame.width, canvasGame.height - 10);
            ctx.stroke();

            // Player physics
            player.draw();
            player.y += player.dy;

            if (player.y + player.height < canvasGame.height - 10) {
                player.dy += player.gravity;
                player.grounded = false;
            } else {
                player.y = canvasGame.height - player.height - 10;
                player.dy = 0;
                player.grounded = true;
            }

            // Obstacles
            spawnObstacle();
            obstacles.forEach((obstacle, index) => {
                obstacle.update();

                if (checkCollision(player, obstacle)) {
                    gameOver();
                }

                if (obstacle.x + obstacle.width < 0) {
                    obstacles.splice(index, 1);
                    score += 1;
                    scoreEl.textContent = Math.floor(score);

                    // Increase speed slowly
                    if (Math.floor(score) % 10 === 0) {
                        gameSpeed += 0.1;
                    }
                }
            });

            frameCount++;
            requestAnimationFrame(update);
        }

        startBtn.addEventListener('click', () => {
            score = 0;
            scoreEl.textContent = '0';
            gameSpeed = 5;
            obstacles = [];
            frameCount = 0;
            isPlaying = true;
            overlay.classList.add('hidden');
            update();
        });

        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                jump();
            }
        });

        canvasGame.addEventListener('touchstart', (e) => {
            e.preventDefault();
            jump();
        });

        canvasGame.addEventListener('mousedown', jump);

        window.addEventListener('resize', initGame);
        initGame();
        }

        /* ==========================================================================
        Code Invaders Mini Game Logic
        ========================================================================== */
        const canvasInvaders = document.getElementById('invaders-canvas');
        if (canvasInvaders) {
            const ctx = canvasInvaders.getContext('2d');
            const startBtn = document.getElementById('start-invaders-btn');
            const overlay = document.getElementById('invaders-overlay');
            const scoreEl = document.getElementById('invaders-score');
            const highScoreEl = document.getElementById('invaders-high-score');
            const overlayTitle = document.getElementById('invaders-title');
            const overlayText = document.getElementById('invaders-text');

            let isPlaying = false;
            let score = 0;
            let highScore = localStorage.getItem('invadersHighScore') || 0;
            highScoreEl.textContent = highScore;

            let player = {
                x: 0,
                y: 0,
                width: 40,
                height: 20,
                color: '#3b82f6',
                speed: 7
            };

            let bullets = [];
            let enemies = [];
            let enemyBullets = [];
            let keys = {};
            let enemyDirection = 1;
            let enemyMoveTimer = 0;
            let enemyMoveInterval = 30;

            function initGame() {
                canvasInvaders.width = canvasInvaders.parentElement.clientWidth;
                canvasInvaders.height = canvasInvaders.parentElement.clientHeight;
                player.x = canvasInvaders.width / 2 - player.width / 2;
                player.y = canvasInvaders.height - player.height - 20;
            }

            function createEnemies() {
                enemies = [];
                const rows = 3;
                const cols = 8;
                const padding = 20;
                const offsetTop = 40;
                const offsetLeft = 40;

                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        enemies.push({
                            x: c * (40 + padding) + offsetLeft,
                            y: r * (30 + padding) + offsetTop,
                            width: 40,
                            height: 25,
                            type: r === 0 ? 'BUG' : 'ERROR',
                            alive: true
                        });
                    }
                }
            }

            function drawPlayer() {
                ctx.fillStyle = player.color;
                ctx.font = 'bold 20px "Fira Code"';
                ctx.textAlign = 'center';
                ctx.fillText('[ ]', player.x + player.width / 2, player.y + player.height);
                ctx.shadowBlur = 10;
                ctx.shadowColor = player.color;
            }

            function drawEnemies() {
                enemies.forEach(enemy => {
                    if (enemy.alive) {
                        ctx.fillStyle = '#ef4444';
                        ctx.font = 'bold 12px "Fira Code"';
                        ctx.textAlign = 'center';
                        ctx.fillText(enemy.type, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
                        ctx.strokeStyle = '#ef4444';
                        ctx.strokeRect(enemy.x, enemy.y - 10, enemy.width, enemy.height);
                    }
                });
                ctx.shadowBlur = 0;
            }

            function drawBullets() {
                ctx.fillStyle = '#10b981';
                bullets.forEach((bullet, index) => {
                    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
                    bullet.y -= 8;
                    if (bullet.y < 0) bullets.splice(index, 1);
                });
            }

            function checkCollisions() {
                bullets.forEach((bullet, bIndex) => {
                    enemies.forEach((enemy, eIndex) => {
                        if (enemy.alive && 
                            bullet.x < enemy.x + enemy.width &&
                            bullet.x + bullet.width > enemy.x &&
                            bullet.y < enemy.y + enemy.height &&
                            bullet.y + bullet.height > enemy.y) {
                            
                            enemy.alive = false;
                            bullets.splice(bIndex, 1);
                            score += 10;
                            scoreEl.textContent = score;
                        }
                    });
                });

                // Win condition
                if (enemies.length > 0 && enemies.every(e => !e.alive)) {
                    createEnemies(); // Next wave
                    enemyMoveInterval = Math.max(5, enemyMoveInterval - 5);
                }

                // Game over condition
                enemies.forEach(enemy => {
                    if (enemy.alive && enemy.y + enemy.height > player.y) {
                        gameOver();
                    }
                });
            }

            function gameOver() {
                isPlaying = false;
                overlay.classList.remove('hidden');
                overlayTitle.textContent = 'Server Breach!';
                overlayText.textContent = `Bugs Patched: ${score} | Record: ${highScore}`;
                startBtn.textContent = 'Reboot Firewall';

                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem('invadersHighScore', highScore);
                    highScoreEl.textContent = highScore;
                }
            }

            function update() {
                if (!isPlaying) return;

                ctx.clearRect(0, 0, canvasInvaders.width, canvasInvaders.height);

                // Movement
                if ((keys['ArrowLeft'] || keys['KeyA']) && player.x > 0) player.x -= player.speed;
                if ((keys['ArrowRight'] || keys['KeyD']) && player.x < canvasInvaders.width - player.width) player.x += player.speed;

                // Enemy movement
                enemyMoveTimer++;
                if (enemyMoveTimer >= enemyMoveInterval) {
                    let hitWall = false;
                    enemies.forEach(enemy => {
                        if (enemy.alive) {
                            enemy.x += 10 * enemyDirection;
                            if (enemy.x + enemy.width > canvasInvaders.width || enemy.x < 0) hitWall = true;
                        }
                    });

                    if (hitWall) {
                        enemyDirection *= -1;
                        enemies.forEach(enemy => {
                            if (enemy.alive) enemy.y += 20;
                        });
                    }
                    enemyMoveTimer = 0;
                }

                drawPlayer();
                drawEnemies();
                drawBullets();
                checkCollisions();

                requestAnimationFrame(update);
            }

            startBtn.addEventListener('click', () => {
                score = 0;
                scoreEl.textContent = '0';
                bullets = [];
                enemyDirection = 1;
                enemyMoveInterval = 30;
                createEnemies();
                isPlaying = true;
                overlay.classList.add('hidden');
                update();
            });

            window.addEventListener('keydown', (e) => {
                keys[e.code] = true;
                if (e.code === 'Space' && isPlaying) {
                    e.preventDefault();
                    if (bullets.length < 3) {
                        bullets.push({
                            x: player.x + player.width / 2 - 2,
                            y: player.y,
                            width: 4,
                            height: 10
                        });
                    }
                }
            });

            window.addEventListener('keyup', (e) => {
                keys[e.code] = false;
            });

            // Mobile controls (simple tap to move and fire)
            canvasInvaders.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const touchX = e.touches[0].clientX - canvasInvaders.getBoundingClientRect().left;
                if (touchX < player.x) player.x -= 20;
                else if (touchX > player.x + player.width) player.x += 20;
                
                if (isPlaying && bullets.length < 3) {
                    bullets.push({
                        x: player.x + player.width / 2 - 2,
                        y: player.y,
                        width: 4,
                        height: 10
                    });
                }
            });

            window.addEventListener('resize', initGame);
            initGame();
        }

        /* ==========================================================================
        Snake.js Mini Game Logic
        ========================================================================== */
        const canvasSnake = document.getElementById('snake-canvas');
        if (canvasSnake) {
            const ctx = canvasSnake.getContext('2d');
            const startBtn = document.getElementById('start-snake-btn');
            const overlay = document.getElementById('snake-overlay');
            const scoreEl = document.getElementById('snake-score');
            const highScoreEl = document.getElementById('snake-high-score');
            const overlayTitle = document.getElementById('snake-title');
            const overlayText = document.getElementById('snake-text');

            let isPlaying = false;
            let score = 0;
            let highScore = localStorage.getItem('snakeHighScore') || 0;
            highScoreEl.textContent = highScore;

            const gridSize = 20;
            let snake = [];
            let food = {};
            let dx = gridSize;
            let dy = 0;
            let gameSpeed = 100;
            let nextDx = gridSize;
            let nextDy = 0;

            const skills = ['.NET', 'C#', 'SQL', 'JS', 'API', 'MVC', 'CORE'];

            function initGame() {
                canvasSnake.width = Math.floor(canvasSnake.parentElement.clientWidth / gridSize) * gridSize;
                canvasSnake.height = Math.floor(canvasSnake.parentElement.clientHeight / gridSize) * gridSize;
                resetSnake();
            }

            function resetSnake() {
                snake = [
                    {x: gridSize * 5, y: gridSize * 5},
                    {x: gridSize * 4, y: gridSize * 5},
                    {x: gridSize * 3, y: gridSize * 5}
                ];
                dx = gridSize;
                dy = 0;
                nextDx = gridSize;
                nextDy = 0;
                spawnFood();
            }

            function spawnFood() {
                food = {
                    x: Math.floor(Math.random() * (canvasSnake.width / gridSize)) * gridSize,
                    y: Math.floor(Math.random() * (canvasSnake.height / gridSize)) * gridSize,
                    text: skills[Math.floor(Math.random() * skills.length)]
                };
                // Ensure food doesn't spawn on snake
                if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
                    spawnFood();
                }
            }

            function draw() {
                if (!isPlaying) return;

                // Move snake
                dx = nextDx;
                dy = nextDy;
                const head = {x: snake[0].x + dx, y: snake[0].y + dy};

                // Check collisions
                if (head.x < 0 || head.x >= canvasSnake.width || head.y < 0 || head.y >= canvasSnake.height ||
                    snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                    gameOver();
                    return;
                }

                snake.unshift(head);

                // Check food
                if (head.x === food.x && head.y === food.y) {
                    score += 1;
                    scoreEl.textContent = score;
                    spawnFood();
                    if (gameSpeed > 50) gameSpeed -= 2;
                } else {
                    snake.pop();
                }

                // Render
                ctx.clearRect(0, 0, canvasSnake.width, canvasSnake.height);

                // Draw Food
                ctx.fillStyle = '#10b981';
                ctx.font = 'bold 12px "Fira Code"';
                ctx.textAlign = 'center';
                ctx.fillText(food.text, food.x + gridSize / 2, food.y + gridSize / 1.5);
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#10b981';

                // Draw Snake
                snake.forEach((segment, index) => {
                    ctx.fillStyle = index === 0 ? '#3b82f6' : 'rgba(59, 130, 246, 0.6)';
                    ctx.fillRect(segment.x + 1, segment.y + 1, gridSize - 2, gridSize - 2);
                });
                ctx.shadowBlur = 0;

                setTimeout(draw, gameSpeed);
            }

            function gameOver() {
                isPlaying = false;
                overlay.classList.remove('hidden');
                overlayTitle.textContent = 'Stack Overflow!';
                overlayText.textContent = `Skills Learnt: ${score} | Best Career: ${highScore}`;
                startBtn.textContent = 'Retry Intern-ship';

                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem('snakeHighScore', highScore);
                    highScoreEl.textContent = highScore;
                }
            }

            startBtn.addEventListener('click', () => {
                score = 0;
                scoreEl.textContent = '0';
                gameSpeed = 100;
                resetSnake();
                isPlaying = true;
                overlay.classList.add('hidden');
                draw();
            });

            window.addEventListener('keydown', (e) => {
                if (e.code === 'ArrowUp' && dy === 0) { nextDx = 0; nextDy = -gridSize; e.preventDefault(); }
                if (e.code === 'ArrowDown' && dy === 0) { nextDx = 0; nextDy = gridSize; e.preventDefault(); }
                if (e.code === 'ArrowLeft' && dx === 0) { nextDx = -gridSize; nextDy = 0; e.preventDefault(); }
                if (e.code === 'ArrowRight' && dx === 0) { nextDx = gridSize; nextDy = 0; e.preventDefault(); }
            });

            // Swipe support
            let touchStartX = 0;
            let touchStartY = 0;
            canvasSnake.addEventListener('touchstart', e => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }, {passive: false});

            canvasSnake.addEventListener('touchmove', e => {
                if (!isPlaying) return;
                e.preventDefault();
                const touchEndX = e.touches[0].clientX;
                const touchEndY = e.touches[0].clientY;
                const diffX = touchEndX - touchStartX;
                const diffY = touchEndY - touchStartY;

                if (Math.abs(diffX) > Math.abs(diffY)) {
                    if (diffX > 0 && dx === 0) { nextDx = gridSize; nextDy = 0; }
                    else if (diffX < 0 && dx === 0) { nextDx = -gridSize; nextDy = 0; }
                } else {
                    if (diffY > 0 && dy === 0) { nextDx = 0; nextDy = gridSize; }
                    else if (diffY < 0 && dy === 0) { nextDx = 0; nextDy = -gridSize; }
                }
            }, {passive: false});

            window.addEventListener('resize', initGame);
            initGame();
        }

        /* ==========================================================================
        Whack-a-Bug Mini Game Logic
        ========================================================================== */
        const whackSection = document.getElementById('whack-section');
        if (whackSection) {
            const holes = document.querySelectorAll('.whack-hole');
            const scoreEl = document.getElementById('whack-score');
            const timerEl = document.getElementById('whack-timer');
            const startBtn = document.getElementById('start-whack-btn');
            const overlay = document.getElementById('whack-overlay');
            const overlayTitle = document.getElementById('whack-title');
            const overlayText = document.getElementById('whack-text');

            let score = 0;
            let timeLeft = 30;
            let isPlaying = false;
            let lastHole;
            let timerId;
            let peepId;

            function randomTime(min, max) {
                return Math.round(Math.random() * (max - min) + min);
            }

            function randomHole(holes) {
                const idx = Math.floor(Math.random() * holes.length);
                const hole = holes[idx];
                if (hole === lastHole) return randomHole(holes);
                lastHole = hole;
                return hole;
            }

            function peep() {
                const time = randomTime(600, 1200);
                const hole = randomHole(holes);
                hole.classList.add('active');
                peepId = setTimeout(() => {
                    hole.classList.remove('active');
                    if (isPlaying) peep();
                }, time);
            }

            function startGame() {
                score = 0;
                timeLeft = 30;
                scoreEl.textContent = '0';
                timerEl.textContent = timeLeft;
                isPlaying = true;
                overlay.classList.add('hidden');
                
                peep();
                timerId = setInterval(() => {
                    timeLeft--;
                    timerEl.textContent = timeLeft;
                    if (timeLeft <= 0) {
                        gameOver();
                    }
                }, 1000);
            }

            function gameOver() {
                isPlaying = false;
                clearInterval(timerId);
                clearTimeout(peepId);
                holes.forEach(h => h.classList.remove('active'));
                overlay.classList.remove('hidden');
                overlayTitle.textContent = 'Sprints Over!';
                overlayText.textContent = `You fixed ${score} bugs in this sprint. Great job!`;
                startBtn.textContent = 'Start New Sprint';
            }

            holes.forEach(hole => {
                hole.addEventListener('click', (e) => {
                    if (!e.isTrusted || !isPlaying || !hole.classList.contains('active')) return;
                    score++;
                    hole.classList.remove('active');
                    scoreEl.textContent = score;
                    
                    // Visual feedback
                    const fixed = document.createElement('span');
                    fixed.textContent = 'FIXED!';
                    fixed.style.position = 'absolute';
                    fixed.style.color = '#10b981';
                    fixed.style.fontWeight = 'bold';
                    fixed.style.pointerEvents = 'none';
                    fixed.style.left = '50%';
                    fixed.style.top = '50%';
                    fixed.style.transform = 'translate(-50%, -50%)';
                    hole.appendChild(fixed);
                    gsap.to(fixed, {y: -40, opacity: 0, duration: 0.6, onComplete: () => fixed.remove()});
                });
            });

            startBtn.addEventListener('click', startGame);
        }
        });

        /* ==========================================================================
           Contact Form Submission to Google Forms
           ========================================================================== */
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(contactForm);
                const data = {};
                for (let [key, value] of formData.entries()) {
                    data[key] = value;
                }
                
                try {
                    const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSefBfJAeCpqiYBQvxqtcWf4rMNviSaHVfDcsRrjm3GIDTVNiQ/formResponse', {
                        method: 'POST',
                        mode: 'no-cors',
                        body: new URLSearchParams(data)
                    });
                    
                    // Since no-cors, we can't check response status, but assume success
                    alert('Thank you for your message!');
                    contactForm.reset();
                } catch (error) {
                    console.error('Error submitting form:', error);
                    alert('There was an error sending your message. Please try again.');
                }
            });
        }