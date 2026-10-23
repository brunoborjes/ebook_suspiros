document.addEventListener('DOMContentLoaded', () => {

  // accordion do FAQ: clicou, fecha os outros e abre só o que foi clicado
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // fecha tudo primeiro...
      faqItems.forEach(i => i.classList.remove('active'));

      // ...e só reabre se ele não estava aberto antes (senão vira um toggle que nunca fecha)
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // controla a barra fixa de CTA e o encolher do header conforme rola a página
  const stickyBar = document.getElementById('stickyBar');
  const heroSection = document.querySelector('.hero');
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    
    // mostra a sticky bar só depois que a hero sai da tela
    if (stickyBar && heroSection) {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      if (heroBottom < 0) {
        stickyBar.classList.add('visible');
      } else {
        stickyBar.classList.remove('visible');
      }
    }

    // header fica menor depois de 50px de scroll
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // scroll suave pros links internos (âncoras tipo #sobre, #formatos etc)
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

  // anima os elementos .fade-up quando eles entram na tela (usando Intersection Observer)
  const fadeElements = document.querySelectorAll('.fade-up');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target); // só anima uma vez, não precisa ficar repetindo
      }
    });
  }, {
    threshold: 0.15, // dispara quando 15% do elemento já apareceu
    rootMargin: "0px 0px -50px 0px"
  });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // efeito das sementinhas (tipo dente-de-leão) voando pela tela
  function spawnDandelionSeeds() {
    const container = document.getElementById('dandelion-container');
    if (!container) return;

    setInterval(() => {
      // limite de sementes na tela ao mesmo tempo, pra não pesar o navegador
      if(container.childElementCount > 15) return;

      const seed = document.createElement('div');
      seed.classList.add('dandelion-seed');
      
      // nascem em posições aleatórias, na parte de baixo e à esquerda da tela
      seed.style.left = (Math.random() * 30) + 'vw';
      seed.style.top = (60 + Math.random() * 40) + 'vh';
      
      // cada semente tem uma velocidade diferente, fica mais orgânico
      const duration = 12 + (Math.random() * 10);
      seed.style.animationDuration = duration + 's';
      
      container.appendChild(seed);
      
      // remove do DOM depois que a animação acabar, senão vai acumulando lixo
      setTimeout(() => {
        if(seed.parentNode === container) {
          container.removeChild(seed);
        }
      }, duration * 1000);

    }, 3000); // nova semente a cada 3 segundos
  }

  // só roda em telas maiores (desktop) pra não pesar no celular
  if (window.innerWidth > 768) {
    spawnDandelionSeeds();
  }

});