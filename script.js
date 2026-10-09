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
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        const labels = {
            en: ['Switch to dark mode', 'Switch to light mode'],
            de: ['Zum dunklen Modus wechseln', 'Zum hellen Modus wechseln'],
            sl: ['Preklopi na temni način', 'Preklopi na svetli način']
        };
        const lang = document.documentElement.lang;
        themeToggle.setAttribute('aria-label', (labels[lang] || labels.en)[theme === 'dark' ? 1 : 0]);
    }
}

function initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

function setAiMode(enabled) {
    document.body.classList.toggle('ai-mode', enabled);
    localStorage.setItem('aiMode', enabled ? 'on' : 'off');

    const aiToggle = document.getElementById('ai-toggle');
    if (aiToggle) {
        aiToggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    }
}

function initAiMode() {
    const savedAiMode = localStorage.getItem('aiMode');
    setAiMode(savedAiMode === 'on');
}

function toggleAiMode() {
    const enabled = !document.body.classList.contains('ai-mode');
    setAiMode(enabled);
}

function updateAiMarkdown(lang) {
    const markdownTarget = document.getElementById('ai-markdown');
    if (!markdownTarget) return;

    const template = document.getElementById(`ai-markdown-${lang}`);
    if (!template) return;

    const content = template.content ? template.content.textContent : template.textContent;
    markdownTarget.textContent = content.trim();
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

    // Initialize AI mode
    initAiMode();

    // Add theme toggle event listener if the button exists
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    const aiToggle = document.getElementById('ai-toggle');
    if (aiToggle) {
        aiToggle.addEventListener('click', toggleAiMode);
    }

    const aiCopy = document.getElementById('ai-copy');
    if (aiCopy) {
        aiCopy.addEventListener('click', async () => {
            const markdownTarget = document.getElementById('ai-markdown');
            if (!markdownTarget) return;

            const text = markdownTarget.textContent;
            try {
                if (navigator.clipboard?.writeText) {
                    await navigator.clipboard.writeText(text);
                } else {
                    const textarea = document.createElement('textarea');
                    textarea.value = text;
                    textarea.setAttribute('readonly', '');
                    textarea.style.position = 'absolute';
                    textarea.style.left = '-9999px';
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    textarea.remove();
                }
                const savedLanguage = localStorage.getItem('language') || 'en';
                const copiedLabel = {en: 'Copied', de: 'Kopiert', sl: 'Kopirano'}[savedLanguage] || 'Copied';
                const copiedText = aiCopy.querySelector('.ai-copy-label');
                if (copiedText) {
                    copiedText.textContent = copiedLabel;
                }
                aiCopy.setAttribute('aria-label', copiedLabel);
                aiCopy.classList.add('copied');
                setTimeout(() => {
                    const label = aiCopy.getAttribute(`data-${savedLanguage}`);
                    if (label) {
                        aiCopy.setAttribute('aria-label', label);
                    }
                    aiCopy.classList.remove('copied');
                }, 1500);
            } catch (error) {
                console.error('Failed to copy AI markdown.', error);
            }
        });
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
    ['en', 'de', 'sl'].forEach(lang => {
        document.getElementById(`${lang}-lang`)?.addEventListener('click', () => setLanguage(lang));
    });
    setLanguage(localStorage.getItem('language') || 'en');
});

// Language switching functionality
function setLanguage(lang) {
    const supportedLanguages = ['en', 'de', 'sl'];
    if (!supportedLanguages.includes(lang)) {
        lang = 'en';
    }

    const langButtons = {
        en: document.getElementById('en-lang'),
        de: document.getElementById('de-lang'),
        sl: document.getElementById('sl-lang')
    };

    document.documentElement.setAttribute('lang', lang);

    // Update active button state
    Object.keys(langButtons).forEach(key => {
        if (!langButtons[key]) return;
        const isActive = key === lang;
        langButtons[key].classList.toggle('active', isActive);
        langButtons[key].setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Store selected language
    localStorage.setItem('language', lang);

    // Text translations stay on leaf elements so icons and nested markup survive.
    document.querySelectorAll('[data-en], [data-de], [data-sl]').forEach(el => {
        if (el.getAttribute('data-translate') === 'false') return;
        const translation = el.getAttribute(`data-${lang}`);
        if (translation) {
            el.textContent = translation;
        }
    });

    // Translate attributes without replacing the element's contents.
    ['aria-label', 'content', 'href', 'download'].forEach(attribute => {
        document.querySelectorAll(`[data-${attribute}-${lang}]`).forEach(el => {
            el.setAttribute(attribute, el.getAttribute(`data-${attribute}-${lang}`));
        });
    });

    const locale = {en: 'en-GB', de: 'de-DE', sl: 'sl-SI'}[lang];
    document.querySelectorAll('[data-localized-date]').forEach(el => {
        const date = new Date(el.getAttribute('datetime'));
        if (!Number.isNaN(date.getTime())) {
            el.textContent = new Intl.DateTimeFormat(locale, {
                day: 'numeric', month: 'short', year: 'numeric'
            }).format(date);
        }
    });
    applyTheme(document.documentElement.getAttribute('data-theme') || 'light');

    const aiCopy = document.getElementById('ai-copy');
    if (aiCopy) {
        const label = aiCopy.getAttribute(`data-${lang}`);
        if (label) {
            aiCopy.setAttribute('aria-label', label);
        }
    }

    updateAiMarkdown(lang);
}
