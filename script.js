// Loading screen
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    loading.classList.add('hidden');
    setTimeout(() => {
        loading.style.display = 'none';
    }, 500);
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);

        // Only prevent default if target exists
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Header background change on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Scroll to top button
const scrollTop = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

// Enhanced project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.7)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5)';
    });
});

// Enhanced skill tag interactions
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(96, 165, 250, 0.3)';
        this.style.borderColor = 'rgba(96, 165, 250, 0.5)';
        this.style.color = '#ffffff';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.1)';
        this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        this.style.color = '#e5e7eb';
    });
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Start typing animation when page loads
setTimeout(() => {
    const subtitle = document.querySelector('.hero-subtitle');
    // Ensure the subtitle element exists before trying to type into it
    // The original HTML does not have a .hero-subtitle element, so this will not run.
    // If you intend to have a typing effect, you'll need to add a subtitle element.
    if (subtitle) {
        typeWriter(subtitle, '👋 Hello, I\'m', 150);
    }
}, 1000);


// Add active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Adjusted to take into account header height for better active state accuracy
        const headerOffset = header.offsetHeight; 
        if (scrollY >= (sectionTop - headerOffset - 50)) { // -50 for a small buffer
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});


// Smooth reveal animations with stagger
const staggerElements = document.querySelectorAll('.projects-grid .project-card, .timeline-item');
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

staggerElements.forEach(el => {
    staggerObserver.observe(el);
});

// Performance optimization: Throttle scroll events
let ticking = false;
function updateOnScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Place any scroll-dependent animations or updates here
            // Example: Parallax effect can be placed here if it's not already
            // being handled by a direct scroll listener.
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll);

// Add some Easter eggs
let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let userInput = [];
document.addEventListener('keydown', (e) => {
    userInput.push(e.keyCode);
    if (userInput.length > konamiCode.length) {
        userInput.shift();
    }
    if (userInput.join(',') === konamiCode.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = ''; // Remove animation after 10 seconds
        }, 10000);
    }
});
