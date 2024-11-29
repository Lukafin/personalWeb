// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Once the animation is triggered, we can stop observing the element
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '50px'
});

// Theme toggle functionality
function initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Language switching functionality
const translations = {
    en: {
        'portfolio': 'Featured Projects',
        'expertise': 'Technical Expertise',
        'contact': "Let's Connect",
        'description': 'With 15 years of experience crafting exceptional iOS and Android applications, I bring your mobile vision to life with clean code and stunning design.',
        'view-projects': 'View Projects',
        'get-in-touch': 'Get in Touch',
        'health-app-title': 'Health & Fitness App',
        'health-app-desc': 'A comprehensive fitness tracking application built with Swift for iOS, featuring real-time workout tracking, nutrition planning, and social features.',
        'ecommerce-title': 'E-commerce Platform',
        'ecommerce-desc': 'A high-performance Android shopping app handling millions of daily transactions with a focus on user experience and security.',
        'social-title': 'Social Media App',
        'social-desc': 'Native mobile application with real-time messaging and media sharing capabilities, optimized for both iOS and Android platforms.',
        'ios-dev': 'iOS Development',
        'ios-tech': 'Swift, Objective-C, SwiftUI, UIKit, TestFlight, App Store Connect',
        'android-dev': 'Android Development',
        'android-tech': 'Kotlin, Java, Jetpack Compose, Material Design, Play Console',
        'mobile-arch': 'Mobile Architecture',
        'mobile-arch-tech': 'System Design, Performance Optimization, Security, CI/CD',
        'kotlin_multiplatform': 'Kotlin Multiplatform',
        'footer': 'Designed & Built by Luka Finžgar'
    },
    de: {
        'portfolio': 'Projekte',
        'expertise': 'Fachkenntnisse',
        'contact': 'Kontakt',
        'description': 'Mit 15 Jahren Erfahrung in der Entwicklung außergewöhnlicher iOS- und Android-Anwendungen bringe ich Ihre mobile Vision mit sauberem Code und ansprechendem Design zum Leben.',
        'view-projects': 'Projekte ansehen',
        'get-in-touch': 'Kontakt aufnehmen',
        'health-app-title': 'Gesundheits- & Fitness-App',
        'health-app-desc': 'Eine umfassende Fitness-Tracking-Anwendung, entwickelt mit Swift für iOS, mit Echtzeit-Workout-Tracking, Ernährungsplanung und sozialen Funktionen.',
        'ecommerce-title': 'E-Commerce-Plattform',
        'ecommerce-desc': 'Eine leistungsstarke Android-Shopping-App, die Millionen von täglichen Transaktionen verarbeitet und sich auf Benutzererfahrung und Sicherheit konzentriert.',
        'social-title': 'Social Media App',
        'social-desc': 'Native mobile Anwendung mit Echtzeit-Messaging und Medienaustausch, optimiert für iOS- und Android-Plattformen.',
        'ios-dev': 'iOS-Entwicklung',
        'ios-tech': 'Swift, Objective-C, SwiftUI, UIKit, TestFlight, App Store Connect',
        'android-dev': 'Android-Entwicklung',
        'android-tech': 'Kotlin, Java, Jetpack Compose, Material Design, Play Console',
        'mobile-arch': 'Mobile Architektur',
        'mobile-arch-tech': 'System Design, Performance-Optimierung, Sicherheit, CI/CD',
        'kotlin_multiplatform': 'Kotlin Multiplatform',
        'footer': 'Designed & Entwickelt von Luka Finžgar'
    }
};

const langButtons = {
    en: document.getElementById('en-lang'),
    de: document.getElementById('de-lang')
};

function setLanguage(lang) {
    // Update active button state
    Object.keys(langButtons).forEach(key => {
        langButtons[key].classList.toggle('active', key === lang);
    });

    // Store selected language
    localStorage.setItem('language', lang);

    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks[0].textContent = translations[lang]['portfolio'];
    navLinks[1].textContent = translations[lang]['expertise'];
    navLinks[2].textContent = translations[lang]['contact'];

    // Update header content
    document.querySelector('header p').textContent = translations[lang]['description'];
    document.querySelector('.cta-primary').textContent = translations[lang]['view-projects'];
    document.querySelector('.cta-secondary').textContent = translations[lang]['get-in-touch'];
    
    // Update portfolio items
    const portfolioItems = document.querySelectorAll('#portfolio .portfolio-item');
    portfolioItems[0].querySelector('h3').textContent = translations[lang]['health-app-title'];
    portfolioItems[0].querySelector('p:first-of-type').textContent = translations[lang]['health-app-desc'];
    
    portfolioItems[1].querySelector('h3').textContent = translations[lang]['ecommerce-title'];
    portfolioItems[1].querySelector('p:first-of-type').textContent = translations[lang]['ecommerce-desc'];
    
    portfolioItems[2].querySelector('h3').textContent = translations[lang]['social-title'];
    portfolioItems[2].querySelector('p:first-of-type').textContent = translations[lang]['social-desc'];

    // Update expertise section
    const expertiseItems = document.querySelectorAll('#expertise .portfolio-item');
    expertiseItems[0].querySelector('h3').textContent = translations[lang]['ios-dev'];
    expertiseItems[0].querySelector('p').textContent = translations[lang]['ios-tech'];
    
    expertiseItems[1].querySelector('h3').textContent = translations[lang]['android-dev'];
    expertiseItems[1].querySelector('p').textContent = translations[lang]['android-tech'];
    
    expertiseItems[2].querySelector('h3').textContent = translations[lang]['mobile-arch'];
    expertiseItems[2].querySelector('p').textContent = translations[lang]['mobile-arch-tech'];

    // Update section headings
    document.querySelector('#portfolio h2').textContent = translations[lang]['portfolio'];
    document.querySelector('#expertise h2').textContent = translations[lang]['expertise'];
    document.querySelector('#contact h2').textContent = translations[lang]['contact'];

    // Update footer
    document.querySelector('footer p').textContent = translations[lang]['footer'];
}

// Add click event listeners to language buttons
Object.keys(langButtons).forEach(lang => {
    langButtons[lang].addEventListener('click', () => setLanguage(lang));
});

// Set initial language
const savedLanguage = localStorage.getItem('language') || 'en';
setLanguage(savedLanguage);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    document.querySelectorAll('.scroll-animation').forEach(el => {
        observer.observe(el);
    });

    // Initialize theme
    initTheme();

    // Add theme toggle event listener
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
});
