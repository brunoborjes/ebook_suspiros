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

    // B) Lógica do Cabeçalho Delicado (encolhe após rolar 50px)
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

  // 4. Animação moderna de "Fade Up" ao rolar a tela (Intersection Observer)
  const fadeElements = document.querySelectorAll('.fade-up');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target); // Anima apenas 1 vez
      }
    });
  }, {
    threshold: 0.15, // Aciona quando 15% do elemento estiver visível
    rootMargin: "0px 0px -50px 0px"
  });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // 5. Efeito Dente-de-Leão (Sementes voando pela tela de forma não intrusiva)
  function spawnDandelionSeeds() {
    const container = document.getElementById('dandelion-container');
    if (!container) return;

    setInterval(() => {
      // Limita a quantidade de sementes ativas na tela para evitar travamentos
      if(container.childElementCount > 15) return;

      const seed = document.createElement('div');
      seed.classList.add('dandelion-seed');
      
      // Nasce em posições aleatórias na metade inferior da tela do lado esquerdo
      seed.style.left = (Math.random() * 30) + 'vw';
      seed.style.top = (60 + Math.random() * 40) + 'vh';
      
      // Velocidades variadas (entre 12 e 22 segundos)
      const duration = 12 + (Math.random() * 10);
      seed.style.animationDuration = duration + 's';
      
      container.appendChild(seed);
      
      // Remove a semente depois que a animação terminar
      setTimeout(() => {
        if(seed.parentNode === container) {
          container.removeChild(seed);
        }
      }, duration * 1000);

    }, 3000); // Cria uma nova semente a cada 3 segundos
  }

  // Inicia o efeito apenas em telas não-mobile (para poupar bateria/desempenho em celulares)
  if (window.innerWidth > 768) {
    spawnDandelionSeeds();
  }

});