// Only create observer if we have elements to observe
let observer;
if (document.querySelectorAll('.scroll-animation').length > 0) {
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '50px'
    });
}

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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations if they exist
    if (observer) {
        document.querySelectorAll('.scroll-animation').forEach(el => {
            observer.observe(el);
        });
    }

    // Initialize theme
    initTheme();

    // Add theme toggle event listener if the button exists
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Only initialize language switching if we're on the homepage
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        initializeHomepage();
    }
});

// Homepage-specific functionality
function initializeHomepage() {
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
            // ... German translations ...
        }
    };

    const langButtons = {
        en: document.getElementById('en-lang'),
        de: document.getElementById('de-lang')
    };

    function setLanguage(lang) {
        if (!langButtons.en || !langButtons.de) return;

        // Update active button state
        Object.keys(langButtons).forEach(key => {
            langButtons[key].classList.toggle('active', key === lang);
        });

        // Store selected language
        localStorage.setItem('language', lang);

        // Update content only if elements exist
        const elements = {
            navLinks: document.querySelectorAll('.nav-links a'),
            headerDesc: document.querySelector('header p'),
            ctaPrimary: document.querySelector('.cta-primary'),
            ctaSecondary: document.querySelector('.cta-secondary'),
            portfolioItems: document.querySelectorAll('#portfolio .portfolio-item'),
            expertiseItems: document.querySelectorAll('#expertise .portfolio-item'),
            sectionHeadings: {
                portfolio: document.querySelector('#portfolio h2'),
                expertise: document.querySelector('#expertise h2'),
                contact: document.querySelector('#contact h2')
            }
        };

        // Update navigation links
        if (elements.navLinks.length >= 3) {
            elements.navLinks[0].textContent = translations[lang]['portfolio'];
            elements.navLinks[1].textContent = translations[lang]['expertise'];
            elements.navLinks[2].textContent = translations[lang]['contact'];
        }

        // Update other elements if they exist
        if (elements.headerDesc) elements.headerDesc.textContent = translations[lang]['description'];
        if (elements.ctaPrimary) elements.ctaPrimary.textContent = translations[lang]['view-projects'];
        if (elements.ctaSecondary) elements.ctaSecondary.textContent = translations[lang]['get-in-touch'];

        // Update portfolio items
        if (elements.portfolioItems.length >= 3) {
            updatePortfolioItems(elements.portfolioItems, lang, translations);
        }

        // Update expertise items
        if (elements.expertiseItems.length >= 4) {
            updateExpertiseItems(elements.expertiseItems, lang, translations);
        }

        // Update section headings
        if (elements.sectionHeadings.portfolio) elements.sectionHeadings.portfolio.textContent = translations[lang]['portfolio'];
        if (elements.sectionHeadings.expertise) elements.sectionHeadings.expertise.textContent = translations[lang]['expertise'];
        if (elements.sectionHeadings.contact) elements.sectionHeadings.contact.textContent = translations[lang]['contact'];
    }

    // Helper functions for updating content
    function updatePortfolioItems(items, lang, translations) {
        const portfolioContent = [
            ['toshl-title', 'toshl-desc'],
            ['carlock-title', 'carlock-desc'],
            ['taxi-title', 'taxi-desc']
        ];

        items.forEach((item, index) => {
            if (index < portfolioContent.length) {
                const [titleKey, descKey] = portfolioContent[index];
                const titleEl = item.querySelector('h3');
                const descEl = item.querySelector('p:first-of-type');

                if (titleEl) titleEl.textContent = translations[lang][titleKey];
                if (descEl) descEl.textContent = translations[lang][descKey];
            }
        });
    }

    function updateExpertiseItems(items, lang, translations) {
        const expertiseContent = [
            ['ios-dev', 'ios-tech'],
            ['android-dev', 'android-tech'],
            ['dev-tools', 'dev-tools-tech'],
            ['languages', 'languages-desc']
        ];

        items.forEach((item, index) => {
            if (index < expertiseContent.length) {
                const [titleKey, descKey] = expertiseContent[index];
                const titleEl = item.querySelector('h3');
                const descEl = item.querySelector('p');

                if (titleEl) titleEl.textContent = translations[lang][titleKey];
                if (descEl) descEl.textContent = translations[lang][descKey];
            }
        });
    }

    // Add click event listeners to language buttons if they exist
    Object.keys(langButtons).forEach(lang => {
        if (langButtons[lang]) {
            langButtons[lang].addEventListener('click', () => setLanguage(lang));
        }
    });

    // Set initial language
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
}
