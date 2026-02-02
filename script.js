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
                const copiedLabel = savedLanguage === 'de' ? 'Kopiert' : 'Copied';
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

    // Update text for all elements with a data-en or data-de attribute
    document.querySelectorAll('[data-en], [data-de]').forEach(el => {
        if (el.getAttribute('data-translate') === 'false') return;
        const translation = el.getAttribute(`data-${lang}`);
        if (translation) {
            el.textContent = translation;
        }
    });

    const aiCopy = document.getElementById('ai-copy');
    if (aiCopy) {
        const label = aiCopy.getAttribute(`data-${lang}`);
        if (label) {
            aiCopy.setAttribute('aria-label', label);
        }
    }

    updateAiMarkdown(lang);
}
