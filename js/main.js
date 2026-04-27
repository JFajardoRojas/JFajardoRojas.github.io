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
const filterBtns = document.querySelectorAll('.filter-btn');
const publicationItems = document.querySelectorAll('.publication-item');

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
'font-size: 12px; color: #1a4480;'
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

