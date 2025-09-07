// Estado da aplicação
let isLoggedIn = false;

// Elementos DOM
const loginForm = document.getElementById('loginForm');
const mainWebsite = document.getElementById('mainWebsite');
const loginFormEl = document.getElementById('loginFormEl');
const errorMessage = document.getElementById('errorMessage');
const loginBtn = document.getElementById('loginBtn');
const loginBtnText = document.getElementById('loginBtnText');
const loginSpinner = document.getElementById('loginSpinner');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const eyeOpen = document.getElementById('eyeOpen');
const eyeClosed = document.getElementById('eyeClosed');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');

// Aguardar o DOM estar carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Inicializar aplicação
function initializeApp() {
    setupEventListeners();
    setupObservers();
}

// Configurar event listeners
function setupEventListeners() {
    // Login functionality
    if (loginFormEl) {
        loginFormEl.addEventListener('submit', handleLogin);
    }

    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', handleTogglePassword);
    }

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', handleMobileMenuToggle);
    }

    // Scroll effects
    window.addEventListener('scroll', handleScroll);
}

// Função de login
async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Reset error state
    if (errorMessage) {
        errorMessage.classList.add('hidden');
    }
    
    // Set loading state
    if (loginBtn) loginBtn.disabled = true;
    if (loginBtnText) loginBtnText.textContent = 'Verificando...';
    if (loginSpinner) loginSpinner.classList.remove('hidden');
    
    try {
        // Simular delay de autenticação
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (username === 'antonio' && password === 'bonitao') {
            // Login successful
            handleLoginSuccess();
        } else {
            // Login failed
            handleLoginError('Usuário ou senha incorretos');
        }
    } catch (error) {
        handleLoginError('Erro de conexão. Tente novamente.');
    } finally {
        // Reset loading state
        if (loginBtn) loginBtn.disabled = false;
        if (loginBtnText) loginBtnText.textContent = 'Entrar no Reino Etéreo';
        if (loginSpinner) loginSpinner.classList.add('hidden');
    }
}

// Sucesso no login
function handleLoginSuccess() {
    isLoggedIn = true;
    if (loginForm) loginForm.classList.add('hidden');
    if (mainWebsite) mainWebsite.classList.remove('hidden');
    
    // Inicializar animações do site principal
    setTimeout(initializeMainWebsiteAnimations, 100);
}

// Erro no login
function handleLoginError(message) {
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }
    
    // Shake animation for error feedback
    if (loginFormEl) {
        loginFormEl.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            loginFormEl.style.animation = '';
        }, 500);
    }
}

// Toggle password visibility
function handleTogglePassword() {
    if (!passwordInput || !eyeOpen || !eyeClosed) return;
    
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    eyeOpen.classList.toggle('hidden', !isPassword);
    eyeClosed.classList.toggle('hidden', isPassword);
}

// Mobile menu toggle
function handleMobileMenuToggle() {
    if (!mobileMenu || !menuIcon || !closeIcon) return;
    
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden', isOpen);
    menuIcon.classList.toggle('hidden', !isOpen);
    closeIcon.classList.toggle('hidden', isOpen);
}

// Smooth scrolling function
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            handleMobileMenuToggle();
        }
    }
}

// Handle scroll effects
function handleScroll() {
    const scrolled = window.pageYOffset;
    
    // Parallax effect for hero section
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const heroImage = heroSection.querySelector('img');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
    
    // Navigation background opacity
    const nav = document.querySelector('nav');
    if (nav) {
        const opacity = Math.min(scrolled / 100, 1);
        nav.style.backgroundColor = `rgba(15, 23, 42, ${0.9 * opacity})`;
    }
}

// Setup observers
function setupObservers() {
    setupIntersectionObserver();
    setupMutationObserver();
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Store observer globally for later use
    window.elementObserver = observer;
}

// Mutation Observer for main website
function setupMutationObserver() {
    if (!mainWebsite) return;
    
    const websiteObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target === mainWebsite && !mainWebsite.classList.contains('hidden')) {
                setTimeout(initializeMainWebsiteAnimations, 100);
                websiteObserver.disconnect();
            }
        });
    });

    websiteObserver.observe(mainWebsite, { 
        attributes: true, 
        attributeFilter: ['class'] 
    });
}

// Initialize animations for main website
function initializeMainWebsiteAnimations() {
    if (!window.elementObserver) return;
    
    const animatedElements = document.querySelectorAll('.card-hover, section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        window.elementObserver.observe(el);
    });
}

// Utility functions
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

// Enhanced scroll handling with throttling
const throttledScrollHandler = throttle(handleScroll, 16); // ~60fps
window.addEventListener('scroll', throttledScrollHandler);

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 1024 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        handleMobileMenuToggle();
    }
}, 250));

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        handleMobileMenuToggle();
    }
    
    // Enter key on navigation buttons
    if (e.key === 'Enter' && e.target.classList.contains('nav-button')) {
        e.target.click();
    }
});

// Add CSS for shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart + 'ms');
        }, 0);
    });
}

// Expose global functions for inline event handlers
window.scrollToSection = scrollToSection;