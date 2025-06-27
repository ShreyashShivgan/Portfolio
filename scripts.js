
// Particle System
function createParticles() {
    const particlesContainer = document.querySelector(".particles");
    if (!particlesContainer) return;

    const particleCount = 40;
    particlesContainer.innerHTML = "";

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";

        // Random positioning
        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 8 + "s";
        particle.style.animationDuration = Math.random() * 4 + 6 + "s";

        // Different particle types
        if (i % 3 === 0) {
            particle.style.width = "3px";
            particle.style.height = "3px";
            particle.style.background = "#daa520";
            particle.style.boxShadow = "0 0 6px #daa520";
        } else if (i % 3 === 1) {
            particle.style.width = "2px";
            particle.style.height = "2px";
            particle.style.background = "#d2b48c";
            particle.style.boxShadow = "0 0 4px #d2b48c";
        } else {
            particle.style.width = "4px";
            particle.style.height = "4px";
            particle.style.background = "#8b7355";
            particle.style.boxShadow = "0 0 8px #8b7355";
        }

        particlesContainer.appendChild(particle);
    }
}

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.getElementById("typing-text");
    if (!typingElement) return;

    const texts = ["Backend Developer", "Full-Stack Developer", "Problem Solver", "Tech Enthusiast"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(typeText, typingSpeed);
    }

    typeText();
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    document.querySelectorAll(".fade-in").forEach((el) => {
        observer.observe(el);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

                const mobileMenu = document.getElementById("mobile-menu");
                if (mobileMenu.classList.contains("mobile-menu-visible")) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    const menuBtn = document.getElementById("mobile-menu-btn");

    if (mobileMenu.classList.contains("mobile-menu-visible")) {
        mobileMenu.classList.remove("mobile-menu-visible");
        mobileMenu.classList.add("mobile-menu-hidden");
        menuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
    } else {
        mobileMenu.classList.remove("mobile-menu-hidden");
        mobileMenu.classList.add("mobile-menu-visible");
        menuBtn.innerHTML = '<i class="fas fa-times text-xl"></i>';
    }
}

// Navigation Scroll Effect
function initNavScrollEffect() {
    const nav = document.querySelector("nav");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            nav.style.background = "rgba(255, 255, 255, 0.4)";
            nav.style.backdropFilter = "blur(25px) saturate(200%)";
        } else {
            nav.style.background = "rgba(255, 255, 255, 0.25)";
            nav.style.backdropFilter = "blur(20px) saturate(180%)";
        }

        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = "translateY(-100%)";
        } else {
            nav.style.transform = "translateY(0)";
        }

        lastScrollY = currentScrollY;
    });
}

// Skill Cards Effect
function initSkillCardsEffect() {
    const skillCards = document.querySelectorAll(".skill-category");

    skillCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-15px) rotateX(10deg) rotateY(5deg)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
        });
    });
}

// Parallax Effect
function initParallaxEffect() {
    const geometricShapes = document.querySelectorAll(".geometric-shape");

    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        geometricShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.3;
            shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Initialize everything
document.addEventListener("DOMContentLoaded", function() {
    console.log("Initializing portfolio animations...");

    // Create particles
    createParticles();

    // Start typing animation
    setTimeout(initTypingAnimation, 1000);

    // Initialize other features
    initScrollAnimations();
    initSmoothScrolling();
    initNavScrollEffect();
    initSkillCardsEffect();
    initParallaxEffect();

    // Mobile menu
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", toggleMobileMenu);
    }

    // Add ripple effect to buttons
    document.querySelectorAll(".cta-button, .social-button").forEach((button) => {
        button.addEventListener("click", function (e) {
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + "px";
            ripple.style.left = x + "px";
            ripple.style.top = y + "px";
            ripple.classList.add("ripple");

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Force fade-in animations to trigger
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }, 500);
});

// Backup initialization
window.addEventListener("load", function() {
    if (document.querySelectorAll(".particle").length === 0) {
        createParticles();
    }

    const typingElement = document.getElementById("typing-text");
    if (typingElement && typingElement.textContent === "") {
        initTypingAnimation();
    }
});
