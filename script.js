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

// Login functionality
loginFormEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    errorMessage.classList.add('hidden');
    loginBtn.disabled = true;
    loginBtnText.textContent = 'Verificando...';
    loginSpinner.classList.remove('hidden');
    
    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username === 'antonio' && password === 'bonitao') {
        // Login successful
        isLoggedIn = true;
        loginForm.classList.add('hidden');
        mainWebsite.classList.remove('hidden');
    } else {
        // Login failed
        errorMessage.textContent = 'Usuário ou senha incorretos';
        errorMessage.classList.remove('hidden');
    }
    
    loginBtn.disabled = false;
    loginBtnText.textContent = 'Entrar no Reino Etéreo';
    loginSpinner.classList.add('hidden');
});

// Toggle password visibility
togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    eyeOpen.classList.toggle('hidden', !isPassword);
    eyeClosed.classList.toggle('hidden', isPassword);
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden', isOpen);
    menuIcon.classList.toggle('hidden', !isOpen);
    closeIcon.classList.toggle('hidden', isOpen);
});

// Smooth scrolling function
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

// Adicionar efeitos de parallax simples no scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.getElementById('hero');
    
    if (heroSection) {
        const heroImage = heroSection.querySelector('img');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});

// Animação de entrada para elementos quando ficam visíveis
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

// Observar elementos quando o site principal for carregado
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.card-hover, section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Inicializar animações quando o site principal for mostrado
const websiteObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target === mainWebsite && !mainWebsite.classList.contains('hidden')) {
            setTimeout(initializeAnimations, 100);
            websiteObserver.disconnect();
        }
    });
});

websiteObserver.observe(mainWebsite, { attributes: true, attributeFilter: ['class'] });
