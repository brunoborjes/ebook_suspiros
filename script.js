document.addEventListener('DOMContentLoaded', () => {

  // 1. FAQ Accordion Interativo
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos os itens
      faqItems.forEach(i => i.classList.remove('active'));

      // Se o item clicado não estava ativo, abre ele
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 2. Transições e barras ao rolar a página (Sticky CTA + Cabeçalho Delicado)
  const stickyBar = document.getElementById('stickyBar');
  const heroSection = document.querySelector('.hero');
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    
    // A) Lógica da Barra Fixa Embaixo (CTA)
    if (stickyBar && heroSection) {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      if (heroBottom < 0) {
        stickyBar.classList.add('visible');
      } else {
        stickyBar.classList.remove('visible');
      }
    }

    // B) Lógica do Cabeçalho Delicado (esconde o menu após rolar 50px)
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // 3. Smooth Scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 4. Animação moderna de "Fade Up" ao rolar a tela
  const fadeElements = document.querySelectorAll('.fade-up');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // 5. Efeito Dente-de-Leão (Ativo em Desktop e Mobile)
  function spawnDandelionSeeds() {
    const container = document.getElementById('dandelion-container');
    if (!container) return;

    // Ajusta o limite de sementes ativas: 8 no mobile (para leveza) e 15 no desktop
    const isMobile = window.innerWidth <= 768;
    const maxSeeds = isMobile ? 8 : 15;

    setInterval(() => {
      if (container.childElementCount >= maxSeeds) return;

      const seed = document.createElement('div');
      seed.classList.add('dandelion-seed');
      
      // No mobile espalha melhor pela largura da tela (0 a 70vw)
      const spawnWidth = isMobile ? 70 : 40;
      seed.style.left = (Math.random() * spawnWidth) + 'vw';
      seed.style.top = (60 + Math.random() * 35) + 'vh';
      
      const duration = 10 + (Math.random() * 8);
      seed.style.animationDuration = duration + 's';
      
      container.appendChild(seed);
      
      setTimeout(() => {
        if (seed.parentNode === container) {
          container.removeChild(seed);
        }
      }, duration * 1000);

    }, 2500); // Cria uma nova semente a cada 2,5 segundos
  }

  // Executa o efeito em todos os dispositivos
  spawnDandelionSeeds();

});
