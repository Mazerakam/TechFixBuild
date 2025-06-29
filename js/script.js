// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Animation des statistiques
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateStat = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                setTimeout(updateStat, 20);
            } else {
                stat.textContent = target;
            }
        };
        
        updateStat();
    });
}

// Intersection Observer pour les animations au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animation des stats quand la section est visible
            if (entry.target.classList.contains('stats')) {
                animateStats();
            }
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.service-card, .stats, .section-title');
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// Smooth scrolling pour les liens internes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar transparente au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});
// Animation des statistiques au scroll
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetValue = entry.target.getAttribute('data-target');
                const target = parseInt(targetValue);
                
                // Vérifier si la conversion en nombre a réussi
                if (!isNaN(target) && target > 0) {
                    animateCounter(entry.target, target);
                } else {
                    console.error('Impossible de convertir data-target en nombre:', targetValue);
                }
                
                observer.unobserve(entry.target); // N'animer qu'une seule fois
            }
        });
    }, {
        threshold: 0.5 // Déclenche quand 50% de l'élément est visible
    });

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, target) {
    // Vérifier si target est un nombre valide
    if (isNaN(target) || target <= 0) {
        console.error('Valeur data-target invalide:', element.getAttribute('data-target'));
        return;
    }
    
    let current = 0;
    const increment = target / 50; // Divise l'animation en 50 étapes
    const duration = 2000; // 2 secondes
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM chargé'); // Pour déboguer
    
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) {
        console.error('Bouton scroll-to-top non trouvé');
        return;
    }
    
    console.log('Bouton trouvé'); // Pour déboguer
    
    // Fonction pour afficher/masquer le bouton
    function toggleScrollButton() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }
    
    // Écouter le scroll
    window.addEventListener('scroll', toggleScrollButton);
    
    // Action du clic
    scrollToTopBtn.addEventListener('click', function() {
        console.log('Bouton cliqué'); // Pour déboguer
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Vérifier immédiatement la position
    toggleScrollButton();
});
