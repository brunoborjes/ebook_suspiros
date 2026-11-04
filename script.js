document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. FAQ ACCORDION ACESSÍVEL (WCAG COMPLIANT)
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      faqItems.forEach(otherItem => {
        const otherTrigger = otherItem.querySelector('.faq-trigger');
        const otherContent = otherItem.querySelector('.faq-content');
        
        otherTrigger.setAttribute('aria-expanded', 'false');
        otherContent.setAttribute('hidden', '');
      });

      if (!isExpanded) {
        trigger.setAttribute('aria-expanded', 'true');
        content.removeAttribute('hidden');
      }
    });
  });

  /* ==========================================================================
     2. HEADER SCROLL & STICKY BAR OBSERVER
     ========================================================================== */
  const header = document.getElementById('header');
  const stickyBar = document.getElementById('stickyBar');
  const heroSection = document.querySelector('.hero');

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        if (header) {
          if (scrollY > 60) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        }

        if (stickyBar && heroSection) {
          const heroBottom = heroSection.getBoundingClientRect().bottom;
          if (heroBottom < 0) {
            stickyBar.classList.add('visible');
          } else {
            stickyBar.classList.remove('visible');
          }
        }

        ticking = false;
      });

      ticking = true;
    }
  }, { passive: true });

  /* ==========================================================================
     3. SCROLL SUAVE PARA LINKS INTERNOS
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* ==========================================================================
     4. INTERSECTION OBSERVER (ANIMAÇÃO FADE-UP SUAVE)
     ========================================================================== */
  const fadeElements = document.querySelectorAll('.fade-up');

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  fadeElements.forEach(el => fadeObserver.observe(el));

  /* ==========================================================================
     5. TILT 3D SUTIL NA CAPA DO LIVRO (INTERAÇÃO DE CURSOR)
     ========================================================================== */
  const bookStage = document.getElementById('bookStage');
  const bookCover = bookStage ? bookStage.querySelector('.book-standalone') : null;

  if (bookStage && bookCover && window.innerWidth > 992) {
    bookStage.addEventListener('mousemove', (e) => {
      const rect = bookStage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (-y / rect.height) * 14;
      const rotateY = (x / rect.width) * 14;

      bookCover.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    bookStage.addEventListener('mouseleave', () => {
      bookCover.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }

  /* ==========================================================================
     6. GERADOR DE PARTÍCULAS DENTE-DE-LEÃO (PÁGINA INTEIRA & CONTÍNUO)
     ========================================================================== */
  function initDandelionParticles() {
    const container = document.getElementById('dandelion-container');
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const SCROLL_THRESHOLD = 60; // Distância rolada necessária para soltar sementes extras
    const MAX_PARTICLES = 25; // Permite mais partículas em tela
    
    const svgSeed = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 14C12 14 11.5 19.5 9 22" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M12 14L6.5 6" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
      <path d="M12 14L9.5 3.5" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
      <path d="M12 14L12 2" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
      <path d="M12 14L14.5 3.5" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
      <path d="M12 14L17.5 6" stroke="currentColor" stroke-width="0.8" stroke-linecap="round"/>
    </svg>`;

    function createParticle() {
      if (container.childElementCount >= MAX_PARTICLES) return;

      const particle = document.createElement('div');
      particle.classList.add('dandelion-particle');
      particle.innerHTML = svgSeed;

      // Posição de origem: Agora espalhadas por TODA a área visível do navegador
      const startX = -10 + (Math.random() * 120); // Pode surgir em qualquer ponto horizontal
      const startY = -10 + (Math.random() * 120); // Pode surgir em qualquer altura
      
      const duration = 15 + Math.random() * 25; // Duração longa para ser lento e relaxante
      const scale = 0.4 + Math.random() * 0.7; 
      
      // Posição final orgânica
      const endX = (Math.random() - 0.5) * 450; // Vento carrega amplamente pela horizontal
      const endY = -15 - Math.random() * 70; // Movimento vertical (sobe em vh)
      const rotation = (Math.random() - 0.5) * 600; // Rotação dinâmica
      const maxOpacity = 0.15 + Math.random() * 0.25;

      particle.style.left = `${startX}vw`;
      particle.style.top = `${startY}vh`;
      particle.style.setProperty('--duration', `${duration}s`);
      particle.style.setProperty('--scale', scale);
      particle.style.setProperty('--end-x', `${endX}px`);
      particle.style.setProperty('--end-y', `${endY}vh`);
      particle.style.setProperty('--rotation', `${rotation}deg`);
      particle.style.setProperty('--max-opacity', maxOpacity);

      container.appendChild(particle);

      particle.addEventListener('animationend', () => {
        particle.remove();
      });
    }

    // 1. Geração contínua base (funciona mesmo com o usuário parado)
    setInterval(() => {
      // Cria sementes se a aba estiver visível e a quantidade for moderada
      if (document.visibilityState === 'visible' && container.childElementCount < 10) {
        createParticle();
      }
    }, 3000);

    // 2. Geração extra reativa à rolagem
    let scrollTicking = false;
    let lastScrollY = window.scrollY;
    let accumulatedScroll = 0;

    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = Math.abs(currentScrollY - lastScrollY);
          
          accumulatedScroll += scrollDelta;
          
          if (accumulatedScroll > SCROLL_THRESHOLD) {
            const particlesToCreate = Math.min(Math.floor(accumulatedScroll / SCROLL_THRESHOLD), 2);
            for(let i = 0; i < particlesToCreate; i++) {
               createParticle();
            }
            accumulatedScroll = accumulatedScroll % SCROLL_THRESHOLD;
          }

          lastScrollY = currentScrollY;
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });
    
    // 3. Inicialização imediata ao carregar o site para não deixar a tela vazia
    for(let i = 0; i < 4; i++) {
      setTimeout(createParticle, i * 600);
    }
  }

  initDandelionParticles();
});