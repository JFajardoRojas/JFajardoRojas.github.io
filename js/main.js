/**
 * J. Fernando Fajardo-Rojas - Personal Academic Website
 * Main JavaScript for interactivity
 */

// ============================================
// DOM Elements
// ============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const filterBtns = document.querySelectorAll('.filter-btn');
const publicationItems = document.querySelectorAll('.publication-item');
const particlesCanvas = document.getElementById('particles-canvas');

// ============================================
// Theme Toggle
// ============================================
function initTheme() {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Reinitialize particles with new colors
    initParticles();
}

themeToggle.addEventListener('click', toggleTheme);
initTheme();

// ============================================
// Navigation
// ============================================
// Sticky navbar on scroll
let lastScrollY = window.scrollY;

function handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
}

window.addEventListener('scroll', handleScroll, { passive: true });

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Active link on scroll
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

// ============================================
// Smooth Scroll
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - navbar.offsetHeight;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Reveal Animations on Scroll
// ============================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal-up, .reveal-scale');
    const windowHeight = window.innerHeight;
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        }
    });
}

// Initial check and scroll listener
window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll, { passive: true });

// ============================================
// Publications Filter
// ============================================
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        publicationItems.forEach(item => {
            const year = item.dataset.year;
            
            if (filter === 'all' || year === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Particles Background
// ============================================
function initParticles() {
    if (!particlesCanvas) return;
    
    const ctx = particlesCanvas.getContext('2d');
    let particles = [];
    let animationId;
    
    // Cancel any existing animation
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    // Set canvas size
    function resizeCanvas() {
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Get theme-aware colors
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const particleColor = isDark ? 'rgba(0, 212, 170, 0.5)' : 'rgba(5, 150, 105, 0.4)';
    const lineColor = isDark ? 'rgba(0, 212, 170, 0.15)' : 'rgba(5, 150, 105, 0.1)';
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * particlesCanvas.width;
            this.y = Math.random() * particlesCanvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Wrap around edges
            if (this.x < 0) this.x = particlesCanvas.width;
            if (this.x > particlesCanvas.width) this.x = 0;
            if (this.y < 0) this.y = particlesCanvas.height;
            if (this.y > particlesCanvas.height) this.y = 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();
        }
    }
    
    // Create particles
    const particleCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000));
    particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Draw connections
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = lineColor;
                    ctx.lineWidth = 1 - distance / 150;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize particles
initParticles();

// ============================================
// Typing Effect for Hero (Optional)
// ============================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ============================================
// Intersection Observer for Advanced Animations
// ============================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            
            // Stagger children animations if present
            const children = entry.target.querySelectorAll('.reveal-child');
            children.forEach((child, index) => {
                child.style.transitionDelay = `${index * 0.1}s`;
                child.classList.add('revealed');
            });
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal-up, .reveal-scale').forEach(el => {
    observer.observe(el);
});

// ============================================
// Performance: Reduce animations on low-end devices
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable particles
    if (particlesCanvas) {
        particlesCanvas.style.display = 'none';
    }
    
    // Remove animation delays
    document.querySelectorAll('[class*="delay-"]').forEach(el => {
        el.style.transitionDelay = '0s';
    });
    
    // Immediately show all reveal elements
    document.querySelectorAll('.reveal-up, .reveal-scale').forEach(el => {
        el.classList.add('revealed');
    });
}

// ============================================
// Console Easter Egg
// ============================================
console.log(`
%c👋 Hello there, curious developer!

%cI'm Fernando Fajardo-Rojas, a computational materials scientist
interested in AI/ML for materials discovery.

Looking to collaborate? Let's connect!

%c🔗 GitHub: github.com/jfajardorojas
📧 Email: your.email@mines.edu
`, 
'font-size: 16px; font-weight: bold;',
'font-size: 12px;',
'font-size: 12px; color: #00d4aa;'
);

// ============================================
// Initialize on DOM Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for initial animations
    document.body.classList.add('loaded');
    
    // Initial reveal check
    revealOnScroll();
    
    // Update active nav link
    updateActiveLink();
});

