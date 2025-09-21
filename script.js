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

    // Initialize hamburger menu
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
        
        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // Initialize language switching
    const langButtons = {
        en: document.getElementById('en-lang'),
        de: document.getElementById('de-lang')
    };

    if (langButtons.en && langButtons.de) {
        Object.keys(langButtons).forEach(lang => {
            langButtons[lang].addEventListener('click', () => setLanguage(lang));
        });

        // Set initial language
        const savedLanguage = localStorage.getItem('language') || 'en';
        setLanguage(savedLanguage);
    }
});

// Language switching functionality
function setLanguage(lang) {
    const langButtons = {
        en: document.getElementById('en-lang'),
        de: document.getElementById('de-lang')
    };

    if (!langButtons.en || !langButtons.de) return;

    // Update active button state
    Object.keys(langButtons).forEach(key => {
        langButtons[key].classList.toggle('active', key === lang);
    });

    // Store selected language
    localStorage.setItem('language', lang);

    // Update document language attributes
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-language', lang);

    // Update text for all elements with a data-en or data-de attribute
    document.querySelectorAll('[data-en], [data-de]').forEach(el => {
        const translation = el.getAttribute(`data-${lang}`);
        if (translation) {
            el.textContent = translation;
        }
    });

    // Toggle visibility for language-specific elements
    document.querySelectorAll('[data-lang]').forEach(el => {
        const shouldShow = el.getAttribute('data-lang') === lang;
        el.hidden = !shouldShow;
    });
}
