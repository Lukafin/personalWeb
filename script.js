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
        'description': 'Curious creature aiming to build systems that would make our everyday lives easier. With extensive experience in mobile development, I bring your mobile vision to life with clean code and stunning design.',
        'view-projects': 'View Projects',
        'get-in-touch': 'Get in Touch',
        'toshl-title': 'Toshl Finance',
        'toshl-desc': 'Working on personal finance management app Toshl for iOS and Android since December 2018. Helping users manage their finances effectively through intuitive mobile interfaces.',
        'carlock-title': 'CarLock',
        'carlock-desc': 'Co-founded and developed CarLock from January 2013 to November 2015. Created Android and iOS apps that displayed driving style and other data from a device in the car, enhancing vehicle security and driver awareness.',
        'taxi-title': 'KjeSiTaksi',
        'taxi-desc': 'Co-founded and developed KjeSiTaksi from September 2011 to June 2012. Planned and built iOS and Android ride-hailing apps, improving urban mobility and transportation services in Slovenia.',
        'ios-dev': 'iOS Development',
        'ios-tech': 'Swift, Objective-C, SwiftUI, UIKit, TestFlight, App Store Connect',
        'android-dev': 'Android Development',
        'android-tech': 'Kotlin, Java, Jetpack Compose, Material Design, Play Console',
        'dev-tools': 'Development Tools',
        'dev-tools-tech': 'Git, Bitrise CI, Zeplin',
        'languages': 'Languages',
        'languages-desc': 'Slovenian (Native), English, German'
    },
    de: {
        'portfolio': 'Projekte',
        'expertise': 'Fachkenntnisse',
        'contact': 'Kontakt',
        'description': 'Ein neugieriges Wesen, das darauf abzielt, Systeme zu entwickeln, die unser tägliches Leben erleichtern. Mit umfangreicher Erfahrung in der mobilen Entwicklung bringe ich Ihre mobile Vision mit sauberem Code und ansprechendem Design zum Leben.',
        'view-projects': 'Projekte ansehen',
        'get-in-touch': 'Kontakt aufnehmen',
        'toshl-title': 'Toshl Finance',
        'toshl-desc': 'Entwicklung der persönlichen Finanzverwaltungs-App Toshl für iOS und Android seit Dezember 2018. Hilft Benutzern, ihre Finanzen durch intuitive mobile Schnittstellen effektiv zu verwalten.',
        'carlock-title': 'CarLock',
        'carlock-desc': 'Mitbegründer und Entwickler von CarLock von Januar 2013 bis November 2015. Entwickelte Android- und iOS-Apps, die Fahrstil und andere Daten von einem Gerät im Auto anzeigen, zur Verbesserung der Fahrzeugsicherheit und des Fahrerbewusstseins.',
        'taxi-title': 'KjeSiTaksi',
        'taxi-desc': 'Mitbegründer und Entwickler von KjeSiTaksi von September 2011 bis Juni 2012. Plante und entwickelte iOS- und Android-Taxi-Apps zur Verbesserung der urbanen Mobilität und Transportdienste in Slowenien.',
        'ios-dev': 'iOS-Entwicklung',
        'ios-tech': 'Swift, Objective-C, SwiftUI, UIKit, TestFlight, App Store Connect',
        'android-dev': 'Android-Entwicklung',
        'android-tech': 'Kotlin, Java, Jetpack Compose, Material Design, Play Console',
        'dev-tools': 'Entwicklungswerkzeuge',
        'dev-tools-tech': 'Git, Bitrise CI, Zeplin',
        'languages': 'Sprachen',
        'languages-desc': 'Slowenisch (Muttersprache), Englisch, Deutsch'
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
    portfolioItems[0].querySelector('h3').textContent = translations[lang]['toshl-title'];
    portfolioItems[0].querySelector('p:first-of-type').textContent = translations[lang]['toshl-desc'];
    
    portfolioItems[1].querySelector('h3').textContent = translations[lang]['carlock-title'];
    portfolioItems[1].querySelector('p:first-of-type').textContent = translations[lang]['carlock-desc'];
    
    portfolioItems[2].querySelector('h3').textContent = translations[lang]['taxi-title'];
    portfolioItems[2].querySelector('p:first-of-type').textContent = translations[lang]['taxi-desc'];

    // Update expertise section
    const expertiseItems = document.querySelectorAll('#expertise .portfolio-item');
    expertiseItems[0].querySelector('h3').textContent = translations[lang]['ios-dev'];
    expertiseItems[0].querySelector('p').textContent = translations[lang]['ios-tech'];
    
    expertiseItems[1].querySelector('h3').textContent = translations[lang]['android-dev'];
    expertiseItems[1].querySelector('p').textContent = translations[lang]['android-tech'];
    
    expertiseItems[2].querySelector('h3').textContent = translations[lang]['dev-tools'];
    expertiseItems[2].querySelector('p').textContent = translations[lang]['dev-tools-tech'];
    
    expertiseItems[3].querySelector('h3').textContent = translations[lang]['languages'];
    expertiseItems[3].querySelector('p').textContent = translations[lang]['languages-desc'];

    // Update section headings
    document.querySelector('#portfolio h2').textContent = translations[lang]['portfolio'];
    document.querySelector('#expertise h2').textContent = translations[lang]['expertise'];
    document.querySelector('#contact h2').textContent = translations[lang]['contact'];

    // Update footer
    //document.querySelector('footer p').textContent = translations[lang]['footer'];
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

    const blogLink = document.querySelector('a[href="/blog"]');
    if (blogLink) {
        blogLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/blog';
        });
    }
});
