// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about-card, .topic-card, .speaker-card, .highlight-card, .date-card, .committee-section');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Countdown Timer
function updateCountdown() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 30, 0, 0);
    const conferenceDate = tomorrow.getTime();
    
    const now = new Date().getTime();
    const distance = conferenceDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const headerCountdown = document.getElementById('headerCountdown');
    const popupCountdown = document.getElementById('popupCountdown');
    
    if (distance > 0) {
        const countdownText = `⏰ Inauguration in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        const popupText = `<div style="font-size: 2.5rem; color: #fbbf24; font-weight: 700;">${days}<span style="font-size: 1rem; display: block;">Days</span></div><div style="font-size: 2.5rem; color: #fbbf24; font-weight: 700;">${hours}<span style="font-size: 1rem; display: block;">Hours</span></div><div style="font-size: 2.5rem; color: #fbbf24; font-weight: 700;">${minutes}<span style="font-size: 1rem; display: block;">Minutes</span></div><div style="font-size: 2.5rem; color: #fbbf24; font-weight: 700;">${seconds}<span style="font-size: 1rem; display: block;">Seconds</span></div>`;
        
        if (headerCountdown) headerCountdown.innerHTML = countdownText;
        if (popupCountdown) popupCountdown.innerHTML = popupText;
    } else {
        if (headerCountdown) headerCountdown.innerHTML = '🎉 Conference in Progress!';
        if (popupCountdown) popupCountdown.innerHTML = '<div style="font-size: 2rem; color: #fbbf24;">Conference Started!</div>';
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Show popup on page load
window.addEventListener('load', () => {
    document.getElementById('countdownPopup').style.display = 'block';
});

function closePopup() {
    document.getElementById('countdownPopup').style.display = 'none';
}

// Modal Functions
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImg.src = imageSrc;
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});


// Falling Doodles Animation
const doodleTypes = ['beaker', 'flask', 'molecule', 'atom', 'testtube', 'hexagon'];
const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#818cf8'];

function createDoodle() {
    const container = document.getElementById('fallingDoodles');
    const doodle = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    
    const type = doodleTypes[Math.floor(Math.random() * doodleTypes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 30 + 20;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    
    doodle.setAttribute('class', 'doodle');
    doodle.setAttribute('width', size);
    doodle.setAttribute('height', size);
    doodle.setAttribute('viewBox', '0 0 30 35');
    doodle.style.left = startX + 'px';
    doodle.style.color = color;
    doodle.style.animationDuration = duration + 's';
    doodle.style.animationDelay = delay + 's';
    
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#' + type);
    doodle.appendChild(use);
    container.appendChild(doodle);
    
    setTimeout(() => {
        doodle.remove();
    }, (duration + delay) * 1000);
}

function initDoodles() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createDoodle(), i * 800);
    }
    setInterval(() => createDoodle(), 2000);
}

document.addEventListener('DOMContentLoaded', initDoodles);
