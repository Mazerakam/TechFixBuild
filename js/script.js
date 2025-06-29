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

/// --------------------------------Fonctionnalités du chatbot -------------------------------------
// Ajoutez ceci au début de votre fichier JavaScript
(function() {
  'use strict';
  
  // Attendre que le DOM soit complètement chargé
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChatbot);
  } else {
    initializeChatbot();
  }
})();

// Fonction d'initialisation du chatbot
function initializeChatbot() {
  console.log('Initializing chatbot...');
  
  // Vérifier que tous les éléments nécessaires existent
  const chatbot = document.getElementById('chatbot');
  const chatToggle = document.getElementById('chat-toggle');
  const userInput = document.getElementById('user-input');
  
  if (!chatbot || !chatToggle || !userInput) {
    console.error('Chatbot elements not found in DOM');
    return;
  }
  
  // Ajouter le message de bienvenue automatiquement
  setTimeout(() => {
    addWelcomeMessage();
  }, 1000);
  
  console.log('Chatbot initialized successfully');
}

// Fonction pour ajouter le message de bienvenue
function addWelcomeMessage() {
  addMessage(`
    <div class="menu-separator">
      <p style="text-align: center; color: #667eea; font-weight: bold; margin-bottom: 15px;">
        ─ 🤖 Bienvenue chez TechFixBuild ─
      </p>
      <p>👋 Bonjour ! Comment puis-je vous aider aujourd'hui ?</p>
      <div class="chat-buttons">
        <button onclick="askRepairType()">🛠️ Types de réparations</button>
        <button onclick="askPricing()">💵 Tarifs</button>
        <button onclick="askContact()">✉️ Contact</button>
      </div>
    </div>
  `);
}
// Variables globales
let chatOpen = false;

// Fonction pour ouvrir/fermer le chat
function toggleChat() {
  const chatbot = document.getElementById('chatbot');
  const chatToggle = document.getElementById('chat-toggle');
  
  chatOpen = !chatOpen;
  
  if (chatOpen) {
    chatbot.classList.remove('chat-hidden');
    chatToggle.style.display = 'none';
  } else {
    chatbot.classList.add('chat-hidden');
    chatToggle.style.display = 'flex';
  }
}

// Fonction pour ajouter un message
function addMessage(message, isUser = false) {
  const chatMessages = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = isUser ? 'user-message' : 'bot-message';
  messageDiv.innerHTML = message;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Fonction pour envoyer un message utilisateur
function sendMessage() {
  const userInput = document.getElementById('user-input');
  const message = userInput.value.trim();
  
  if (message) {
    addMessage(`<p>${message}</p>`, true);
    userInput.value = '';
    
    // Simuler une réponse du bot
    setTimeout(() => {
      handleUserMessage(message);
    }, 1000);
  }
}

// Gestion des messages utilisateur
function handleUserMessage(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('prix') || lowerMessage.includes('tarif') || lowerMessage.includes('coût')) {
    askPricing();
  } else if (lowerMessage.includes('réparation') || lowerMessage.includes('service')) {
    askRepairType();
  } else if (lowerMessage.includes('contact') || lowerMessage.includes('téléphone')) {
    askContact();
  } else {
    addMessage(`
      <p>Je ne suis pas sûr de comprendre. Voici comment je peux vous aider :</p>
      <div class="chat-buttons">
        <button onclick="askRepairType()">🛠️ Types de réparations</button>
        <button onclick="askPricing()">💵 Tarifs</button>
        <button onclick="askContact()">✉️ Contact</button>
      </div>
    `);
  }
}

// Fonctions pour les différentes réponses
function askRepairType() {
  addMessage(`
    <p>Nous effectuons plusieurs types de réparations :</p>
    <div class="chat-buttons">
      <button onclick="showSmartphoneRepair()">📱 Smartphones</button>
      <button onclick="showComputerRepair()">💻 Ordinateurs</button>
      <button onclick="showTabletRepair()">📟 Tablettes</button>
      <button onclick="showConsoleRepair()">🎮 Consoles</button>
      <button onclick="backToMenu()">◀️ Retour au menu</button>
    </div>
  `);
}

function showSmartphoneRepair() {
  addMessage(`
    <div class="menu-separator">
      <p style="text-align: center; color: #667eea; font-weight: bold; margin-bottom: 15px;">
        ─ 📱 Réparations Smartphones ─
      </p>
    <p>• Écran cassé/fissuré<br>
    • Batterie défaillante<br>
    • Problèmes de charge<br>
    • Caméra/micro/haut-parleur<br>
    • iCloud verrouillé</p>
    <div class="chat-buttons">
      <button onclick="askPricing()">💵 Voir les tarifs</button>
      <button onclick="askContact()">✉️ Prendre RDV</button>
      <button onclick="backToMenu()">◀️ Menu principal</button>
    </div>
  `);
}

function showComputerRepair() {
  addMessage(`
    <div class="menu-separator">
      <p style="text-align: center; color: #667eea; font-weight: bold; margin-bottom: 15px;">
        ── 💻 Réparations Ordinateurs ──
      </p>
    <p>• Diagnostic et dépannage<br>
    • Remplacement composants<br>
    • Nettoyage virus/malware<br>
    • Installation OS/logiciels<br>
    • Récupération de mot de passe ou de données</p>
    <div class="chat-buttons">
      <button onclick="askPricing()">💵 Voir les tarifs</button>
      <button onclick="askContact()">✉️ Prendre RDV</button>
      <button onclick="backToMenu()">◀️ Menu principal</button>
    </div>
  `);
}

function showTabletRepair() {
  addMessage(`
    <div class="menu-separator">
      <p style="text-align: center; color: #667eea; font-weight: bold; margin-bottom: 15px;">
        ── 📟 Réparations Tablettes ──
      </p>
    <p>• Écran tactile défaillant<br>
    • Problèmes de charge<br>
    • Boutons défectueux<br>
    • Problèmes software<br>
    • Connectique endommagée</p>
    <div class="chat-buttons">
      <button onclick="askPricing()">💵 Voir les tarifs</button>
      <button onclick="askContact()">✉️ Prendre RDV</button>
      <button onclick="backToMenu()">◀️ Menu principal</button>
    </div>
  `);
}

function showConsoleRepair() {
  addMessage(`
    <div class="menu-separator">
      <p style="text-align: center; color: #667eea; font-weight: bold; margin-bottom: 15px;">
        ── 🎮 Réparations Consoles ──
      </p>
    <p>• PlayStation, Xbox, Nintendo<br>
    • Problèmes de lecture<br>
    • Surchauffe/ventilation<br>
    • Manettes défectueuses<br>
    • Connectique HDMI</p>
    <div class="chat-buttons">
      <button onclick="askPricing()">💵 Voir les tarifs</button>
      <button onclick="askContact()">✉️ Prendre RDV</button>
      <button onclick="backToMenu()">◀️ Menu principal</button>
    </div>
  `);
}

function askPricing() {
  addMessage(`
    <div class="menu-separator">
      <p style="text-align: center; color: #667eea; font-weight: bold; margin-bottom: 15px;">
        ──── 💵 Nos tarifs ────
      </p>
    <p>📱 <strong>Smartphones :</strong><br>
    • Diagnostic : Gratuit<br>
    • Écran : 50-150€<br>
    • Batterie : 30-80€</p>
    <p>💻 <strong>Ordinateurs :</strong><br>
    • Diagnostic : Gratuit<br>
    • Nettoyage : 40€<br>
    • Réparation : 60-250€</p>
    <div class="chat-buttons">
      <button onclick="askContact()">✉️ Demander un devis</button>
      <button onclick="backToMenu()">◀️ Menu principal</button>
    </div>
  `);
}

function askContact() {
  addMessage(`
    <div class="menu-separator">
      <p style="text-align: center; color: #667eea; font-weight: bold; margin-bottom: 15px;">
        ──── ✉️ Contactez-nous ────
      </p>
    <p>📧 <strong>Email :</strong> contact@techfixbuild.fr</p>
    <p>🕐 <strong>Horaires :</strong><br>
    Lun-Ven : 9h-22h<br>
    Sam-Dim : 9h-13h</p>
    <div class="chat-buttons">
      <button onclick="window.open('mailto:contact@techfixbuild.fr')">✉️ Envoyez un mail</button>
      <button onclick="backToMenu()">◀️ Menu principal</button>
    </div>
  `);
}

function backToMenu() {
  addMessage(`
    <p>Comment puis-je vous aider ?</p>
    <div class="chat-buttons">
      <button onclick="askRepairType()">🛠️ Types de réparations</button>
      <button onclick="askPricing()">💵 Tarifs</button>
      <button onclick="askContact()">✉️ Contact</button>
    </div>
  `);
}

// Gestion de la touche Entrée
document.addEventListener('DOMContentLoaded', function() {
  const userInput = document.getElementById('user-input');
  if (userInput) {
    userInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
});
// Fonction complète avec scroll et séparation
function backToMenu() {
  const chatMessages = document.getElementById('chat-messages');
  
  // Ajouter le message avec séparation
  addMessage(`
    <div class="menu-separator">
      <p style="text-align: center; color: #667eea; font-weight: bold; margin-bottom: 15px;">
        ──── 🏠 Menu Principal ────
      </p>
      <p>Comment puis-je vous aider ?</p>
      <div class="chat-buttons">
        <button onclick="askRepairType()">🛠️ Types de réparations</button>
        <button onclick="askPricing()">💵 Tarifs</button>
        <button onclick="askContact()">✉️ Contact</button>
      </div>
    </div>
  `);
  
  // Scroll automatique vers le bas après un court délai
  setTimeout(() => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 100);
}
