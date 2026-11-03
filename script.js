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

      // Fecha todos os outros accordions para manter leitura limpa
      faqItems.forEach(otherItem => {
        const otherTrigger = otherItem.querySelector('.faq-trigger');
        const otherContent = otherItem.querySelector('.faq-content');
        
        otherTrigger.setAttribute('aria-expanded', 'false');
        otherContent.setAttribute('hidden', '');
      });

      // Alterna o estado do item clicado
      if (!isExpanded) {
        trigger.setAttribute('aria-expanded', 'true');
        content.removeAttribute('hidden');
      }
    });
  });

  /* ==========================================================================
     2. HEADER SCROLL & STICKY BAR OBSERVER (PERFORMANTE)
     ========================================================================== */
  const header = document.getElementById('header');
  const stickyBar = document.getElementById('stickyBar');
  const heroSection = document.querySelector('.hero');

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Adiciona classe compacta ao cabeçalho ao rolar
        if (header) {
          if (scrollY > 60) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        }

        // Mostra a barra flutuante inferior apenas após a Hero section
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
     6. GERADOR DE PARTÍCULAS DENTE-DE-LEÃO LEVE (SEM MEMORY LEAK)
     ========================================================================== */
  function initDandelionParticles() {
    const container = document.getElementById('dandelion-container');
    if (!container || window.innerWidth < 768) return;

    // Respeita a preferência do usuário de não movimento
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function createParticle() {
      if (container.childElementCount >= 10) return;

      const particle = document.createElement('div');
      particle.classList.add('dandelion-particle');

      const startX = Math.random() * 40; 
      const startY = 70 + Math.random() * 30; 
      const duration = 14 + Math.random() * 8;

      particle.style.left = `${startX}vw`;
      particle.style.top = `${startY}vh`;
      particle.style.animationDuration = `${duration}s`;

      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, duration * 1000);
    }

    setInterval(createParticle, 4000);
  }

  initDandelionParticles();
});