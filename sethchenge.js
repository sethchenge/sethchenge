// SethChenge Website JavaScript
// Author: SethChenge
// Version: 1.0

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initializeNavigation();
    initializeAnimations();
    initializeTypingEffect();
    initializeCounters();
    initializeScrollEffects();
    initializeBackToTop();
    initializeServiceCards();
    initializeFloatingElements();
    initializeMobileMenu();
    initializeButtons();
});

// Navigation Functions
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(5px)';
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Mobile Menu Functions
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    
    // Open mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileSidebar.classList.add('active');
        mobileSidebar.style.transform = 'translateX(0)';
        document.body.style.overflow = 'hidden';
    });
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileSidebar.classList.remove('active');
        mobileSidebar.style.transform = 'translateX(-100%)';
        document.body.style.overflow = 'auto';
    }
    
    closeSidebar.addEventListener('click', closeMobileMenu);
    sidebarOverlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking on nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-sidebar .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(closeMobileMenu, 300);
        });
    });
}

// Typing Effect
function initializeTypingEffect() {
    const texts = [
        "Your IT Solutions Partner",
        "Expert Windows Installation",
        "Cybersecurity Specialists",
        "Cloud Solutions Provider",
        "Network Setup Experts"
    ];
    
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing effect
    if (typingText) {
        type();
        
        // Cursor blinking animation
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
}

// GSAP Animations
function initializeAnimations() {
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animations
        gsap.from('.hero-content', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-image', {
            duration: 1,
            x: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.3
        });
        
        // Service cards animation
        gsap.from('.service-card', {
            duration: 0.6,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.services-preview',
                start: 'top 80%'
            }
        });
        
        // CEO card animation
        gsap.from('.ceo-card', {
            duration: 0.8,
            y: 40,
            opacity: 0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.ceo-section',
                start: 'top 80%'
            }
        });
        
        // Certification cards animation
        gsap.from('.cert-card', {
            duration: 0.5,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.certifications-section',
                start: 'top 80%'
            }
        });
        
        // Stats animation
        gsap.from('.stat-card', {
            duration: 0.6,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.stats-section',
                start: 'top 80%'
            }
        });
    }
}

// Fallback animations for when GSAP is not available
function initializeFallbackAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .cert-card, .ceo-card, .stat-card').forEach(el => {
        observer.observe(el);
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Scroll Effects
function initializeScrollEffects() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Update active navigation link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Service Card Interactions
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Floating Elements Animation
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-icon');
    
    floatingElements.forEach((element, index) => {
        // Create floating animation
        setInterval(() => {
            const randomY = Math.sin(Date.now() * 0.001 + index) * 10;
            const randomX = Math.cos(Date.now() * 0.001 + index) * 5;
            element.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 50);
    });
}

// Button Interactions
function initializeButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance Optimization
const debouncedScroll = debounce(() => {
    // Scroll-related performance optimizations
    console.log('Scroll event processed');
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Resize Handler
window.addEventListener('resize', debounce(() => {
    // Handle responsive adjustments
    const sidebar = document.querySelector('.mobile-sidebar');
    if (window.innerWidth > 1024 && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        sidebar.style.transform = 'translateX(-100%)';
        document.body.style.overflow = 'auto';
    }
}, 250));

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .service-card {
        transition: all 0.3s ease;
    }
    
    .cert-card {
        transition: all 0.3s ease;
    }
    
    .floating-icon {
        transition: transform 0.1s ease;
    }
    
    .nav-link {
        transition: color 0.3s ease;
    }
    
    .nav-link.active {
        color: #2563eb;
    }
    
    .mobile-sidebar {
        transition: transform 0.3s ease-in-out;
    }
    
    .navbar {
        transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
    }
    
    #backToTop {
        transition: opacity 0.3s ease, visibility 0.3s ease, background-color 0.3s ease;
    }
    
    .btn-primary, .btn-secondary {
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    
    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    
    .btn-secondary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .hero-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .hero-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .ceo-card {
        transition: transform 0.3s ease;
    }
    
    .ceo-card:hover {
        transform: translateY(-5px);
    }
    
    .social-links a {
        transition: background-color 0.3s ease, transform 0.3s ease;
    }
    
    .social-links a:hover {
        transform: translateY(-2px);
    }
    
    .footer a {
        transition: color 0.3s ease;
    }
    
    .stat-card {
        transition: transform 0.3s ease;
    }
    
    .stat-card:hover {
        transform: translateY(-5px);
    }
`;

document.head.appendChild(style);

// Initialize fallback animations if GSAP is not available
if (typeof gsap === 'undefined') {
    initializeFallbackAnimations();
}

// Console welcome message
console.log(`
██████╗ ███████╗████████╗██╗  ██╗ ██████╗██╗  ██╗███████╗███╗   ██╗ ██████╗ ███████╗
██╔════╝ ██╔════╝╚══██╔══╝██║  ██║██╔════╝██║  ██║██╔════╝████╗  ██║██╔════╝ ██╔════╝
███████╗ █████╗     ██║   ███████║██║     ███████║█████╗  ██╔██╗ ██║██║  ███╗█████╗  
╚════██║ ██╔══╝     ██║   ██╔══██║██║     ██╔══██║██╔══╝  ██║╚██╗██║██║   ██║██╔══╝  
███████║ ███████╗   ██║   ██║  ██║╚██████╗██║  ██║███████╗██║ ╚████║╚██████╔╝███████╗
╚══════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝

🚀 SethChenge Website - Your IT Solutions Partner
👨‍💻 Developed by: SethChenge Team
📧 Contact: info@sethchenge.com
🌐 Website: https://sethchenge.com
`);