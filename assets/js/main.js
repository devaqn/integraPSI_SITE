/* ============================================================
   INTEGRA PSICANÁLISE — A NOVA ESCOLA
   main.js — JavaScript global do site institucional

   Todas as funções são inicializadas no evento DOMContentLoaded
   (final do arquivo). Cada função é independente e comentada.

   ORDEM DE INICIALIZAÇÃO:
   1.  initNavbarScroll()        — navbar transparente → verde ao rolar
   2.  initMobileMenu()          — drawer lateral + overlay + hambúrguer
   3.  initSmoothScroll()        — scroll suave para âncoras com offset
   4.  initRevealOnScroll()      — IntersectionObserver para .reveal*
   5.  initAccordion()           — acordeões dos módulos (1 aberto por vez)
   6.  initActiveNavLink()       — destaca link da seção visível no menu
   7.  initHeroParallax()        — efeito parallax suave no hero
   8.  initWhatsAppCTA()         — todos os botões CTA → WhatsApp
   9.  initNetlifyForm()         — feedback visual no submit do formulário
   10. initBackToTop()           — botão voltar ao topo
   11. initCondicoesDots()       — indicadores (pontos) do scroll horizontal mobile
   12. initCardTiltEffect()      — micro-inclinação 3D nos cards (desktop only)
   13. initPageLoader()          — tela de loading ao navegar para /sede/
   14. initProfessorCards()      — mural de professores: toque mobile revela overlay
   15. initModuloCards()         — cards de módulos: toque mobile revela overlay
   16. initButtonLogoAnimation() — flash da logo Integra em todos os botões
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────────────────────
   NÚMERO DO WHATSAPP — SUBSTITUA ANTES DO DEPLOY
   Formato: código do país + DDD + número, sem espaços ou símbolos
   Exemplo: '5581999999999' para (81) 99999-9999 (Recife)
────────────────────────────────────────────────────────────── */
const WHATSAPP_NUMBER = '5581985761616';

/* ──────────────────────────────────────────────────────────────
   ALTURA DA NAVBAR — usada para deslocamento do smooth scroll
   Será calculada dinamicamente ao inicializar
────────────────────────────────────────────────────────────── */
let navbarHeight = 80;


/* ──────────────────────────────────────────────────────────────
   SÍMBOLO DA INTEGRA — SVG idêntico ao page-loader para animações de botão.
   Usa as mesmas classes CSS (.loader-spin-group, .loader-ring-pulse)
   que já têm as animações de giro e pulso definidas no style.css.
   Usado por triggerBtnFlash() em initPageLoader e initButtonLogoAnimation.
   NOTA: NÃO inclui loader-logo — essa classe tem width:140px no CSS
   e causaria conflito de tamanho dentro dos botões.
────────────────────────────────────────────────────────────── */
const INTEGRA_LOGO_SVG = `<svg class="btn-flash-logo" viewBox="-10 -10 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g class="loader-spin-group">
    <path d="M 44 108 A 58 58 0 1 1 156 108" stroke="#F2E6DF" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <path d="M 100 50 Q 128 50 128 75 Q 128 98 100 100 Q 82 100 82 82 Q 82 66 96 64" stroke="#F2E6DF" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.9"/>
    <circle cx="100" cy="52"  r="3.5" fill="#F2E6DF"/>
    <circle cx="100" cy="135" r="22"  stroke="#F2E6DF" stroke-width="3.5" fill="none"/>
    <circle cx="100" cy="135" r="11"  stroke="#F2E6DF" stroke-width="2.5" fill="none"/>
    <circle cx="100" cy="135" r="4.5" fill="#A8C640"/>
    <circle cx="100" cy="22"  r="3.5" fill="#F2E6DF" opacity="0.7"/>
    <circle cx="178" cy="105" r="3.5" fill="#F2E6DF" opacity="0.7"/>
    <circle cx="100" cy="190" r="4"   fill="#F2E6DF" opacity="0.7"/>
  </g>
  <circle class="loader-ring-pulse" cx="100" cy="100" r="90" stroke="#F2E6DF" stroke-width="1" fill="none" opacity="0.15"/>
</svg>`;

/**
 * Injeta o mini-logo da Integra animado dentro de um botão ou link.
 * Remove qualquer flash anterior antes de criar o novo.
 * @param {Element} btn — o botão ou link alvo
 */
function triggerBtnFlash(btn) {
  if (!btn) return;
  const cs = window.getComputedStyle(btn);
  if (cs.position === 'static') btn.style.position = 'relative';
  if (cs.overflow === 'visible') btn.style.overflow = 'hidden';

  const old = btn.querySelector('.btn-logo-flash');
  if (old) old.remove();

  const flash = document.createElement('span');
  flash.className = 'btn-logo-flash';
  flash.innerHTML = INTEGRA_LOGO_SVG;
  btn.appendChild(flash);

  flash.addEventListener('animationend', () => flash.remove(), { once: true });
}


/* ──────────────────────────────────────────────────────────────
   LOADER DE PÁGINA — CONTROLE GLOBAL
   Expõe o loader de tela cheia para todos os botões do site.
   initPageLoader() inicializa _pageLoader quando o DOM está pronto.
────────────────────────────────────────────────────────────── */
let _pageLoader      = null;   // referência ao #page-loader
let _loaderHideTimer = null;   // timer de cleanup após fade-out

/**
 * Exibe o loader de tela cheia na versão rápida.
 * @param {Function} callback  — executada após a presença do loader
 * @param {boolean}  navigates — true quando o callback navega para outra página.
 *   Nesse caso o fade-out é OMITIDO: a página parte com o loader totalmente
 *   visível, evitando a competição visual entre o fade-out e o carregamento
 *   da nova página (que causaria o efeito "trava").
 */
function _showQuickLoader(callback, navigates) {
  /* Se o loader não foi inicializado ainda, executa a ação diretamente */
  if (!_pageLoader) { if (callback) callback(); return; }

  /* Cancela qualquer fade-out pendente */
  if (_loaderHideTimer) { clearTimeout(_loaderHideTimer); _loaderHideTimer = null; }

  /* Reset instantâneo sem transição.
     removeProperty('display') anula o display:none inline que a seção E
     do initPageLoader aplica em recife.html após a animação de entrada. */
  _pageLoader.style.transition = 'none';
  _pageLoader.style.removeProperty('display');
  _pageLoader.classList.remove('done', 'active', 'loader-quick');

  /* Um único rAF garante que o browser pintou o estado zerado (opacity 0)
     antes de iniciar a transição de entrada. Sem o rAF o browser colapsa
     o reset + active no mesmo frame e pula a animação inteira. */
  requestAnimationFrame(() => {
    /* Entrada rápida: loader-quick define 0.12s → aparece quase no instante do toque */
    _pageLoader.classList.add('loader-quick');
    _pageLoader.style.transition = '';
    _pageLoader.classList.add('active');

    /* Após 550ms (300ms entrada + 250ms de presença com o keyframe girando) */
    setTimeout(() => {
      if (callback) callback();

      /* Se é uma navegação para outra página: NÃO adiciona .done.
         A página parte com o loader totalmente visível (sem fade-out)
         → transição limpa, sem conflito com o carregamento da nova página. */
      if (navigates) return;

      /* Sem navegação (ex: scroll suave): fade-out suave na página atual */
      _pageLoader.style.transition =
        'opacity 0.35s cubic-bezier(0.4,0,0.15,1), transform 0.35s cubic-bezier(0.4,0,0.15,1)';

      _pageLoader.classList.add('done');
      _loaderHideTimer = setTimeout(() => {
        _loaderHideTimer = null;
        _pageLoader.style.transition = '';
        _pageLoader.classList.remove('active', 'done', 'loader-quick');
      }, 500);
    }, 550);
  });
}

/* ============================================================
   1. NAVBAR SCROLL
   Adiciona a classe .scrolled ao #navbar quando o scroll
   ultrapassa 80px, mudando visual de transparente → verde sólido.
   Usa requestAnimationFrame para não bloquear a renderização.
   ============================================================ */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let ticking = false;  // controla o throttle do scroll

  function updateNavbar() {
    const scrollY = window.scrollY;

    if (scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Atualiza a altura da navbar para uso no smooth scroll
    navbarHeight = navbar.offsetHeight;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });  // passive: true melhora performance de scroll

  // Executa imediatamente para o estado inicial da página
  updateNavbar();
}


/* ============================================================
   2. MENU MOBILE
   Controla o drawer lateral, o overlay e o botão hambúrguer.
   - Abre: clique no hambúrguer
   - Fecha: clique no overlay, no botão X ou em qualquer link interno
   - Acessibilidade: gerencia aria-expanded e foco
   ============================================================ */
function initMobileMenu() {
  const hamburger   = document.getElementById('hamburger');
  const drawer      = document.getElementById('menu-drawer');
  const overlay     = document.getElementById('menu-overlay');
  const drawerClose = document.getElementById('drawer-close');

  // Se algum elemento não existir, sai silenciosamente
  if (!hamburger || !drawer || !overlay) return;

  /* Abre o menu */
  function openMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';  // impede scroll da página ao fundo

    // Move foco para o botão fechar (acessibilidade)
    if (drawerClose) drawerClose.focus();
  }

  /* Fecha o menu */
  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';  // restaura scroll da página
    hamburger.focus();  // devolve foco ao hambúrguer
  }

  /* Listeners */
  hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  overlay.addEventListener('click', closeMenu);
  if (drawerClose) drawerClose.addEventListener('click', closeMenu);

  // Fecha ao clicar em qualquer link interno do drawer
  drawer.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha com tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });
}


/* ============================================================
   3. SMOOTH SCROLL
   Intercepta cliques em links de âncora (#section) e rola
   suavemente até a seção, compensando a altura da navbar fixa.
   ============================================================ */
function initSmoothScroll() {
  // Seleciona todos os links que apontam para âncoras internas
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');

      // Ignora links sem hash ou com hash vazio
      if (!hash || hash === '#') return;

      // Nav links, drawer links e footer nav links são tratados pelo initPageLoader (têm transição própria)
      if (link.classList.contains('nav-link') || link.classList.contains('drawer-link') || link.classList.contains('footer-nav-link')) return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();

      // Calcula a posição correta descontando a navbar
      const targetY = target.getBoundingClientRect().top
                      + window.scrollY
                      - navbarHeight
                      - 8;  // 8px de folga visual

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth'
      });

      // Atualiza a URL sem recarregar a página
      history.pushState(null, '', hash);
    });
  });
}


/* ============================================================
   4. REVEAL ON SCROLL (Intersection Observer)
   Observa elementos com classes .reveal, .reveal-left, .reveal-right.
   Quando entram na viewport, adiciona .visible que ativa a animação CSS.
   Mais eficiente que eventos de scroll: executa só quando necessário.
   ============================================================ */
function initRevealOnScroll() {
  // Configura o observador: dispara quando 12% do elemento entra na tela
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Para de observar após revelar (elemento não volta a esconder)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,       // 12% visível para disparar
      rootMargin: '0px 0px -40px 0px'  // trigger um pouco antes do topo do elemento
    }
  );

  // Aplica o observer a todos os elementos de reveal
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}


/* ============================================================
   5. ACCORDION DOS MÓDULOS
   Permite que apenas 1 acordeão fique aberto por vez.
   Usa transição de max-height para animação suave.
   ============================================================ */
function initAccordion() {
  const acordeoes = document.querySelectorAll('.acordeao');
  if (!acordeoes.length) return;

  acordeoes.forEach(acordeao => {
    const header = acordeao.querySelector('.acordeao-header');
    const panel  = acordeao.querySelector('.acordeao-panel');
    const icon   = acordeao.querySelector('.acordeao-icon');

    if (!header || !panel) return;

    // Atributos ARIA para acessibilidade
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.setAttribute('aria-expanded', 'false');

    /* Função de toggle */
    function toggle() {
      const isAberto = acordeao.classList.contains('aberto');

      // Fecha TODOS os acordeões antes de abrir o clicado
      acordeoes.forEach(a => {
        const p = a.querySelector('.acordeao-panel');
        const h = a.querySelector('.acordeao-header');
        if (p) p.style.maxHeight = '0';
        if (h) h.setAttribute('aria-expanded', 'false');
        a.classList.remove('aberto');
      });

      // Se estava fechado, abre agora
      if (!isAberto) {
        acordeao.classList.add('aberto');
        header.setAttribute('aria-expanded', 'true');
        // Define max-height como o scrollHeight real do conteúdo
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    }

    header.addEventListener('click', toggle);

    // Também funciona com teclado (Enter e Espaço)
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  // Abre o primeiro acordeão por padrão
  const primeiro = acordeoes[0];
  if (primeiro) {
    const panel  = primeiro.querySelector('.acordeao-panel');
    const header = primeiro.querySelector('.acordeao-header');
    if (panel && header) {
      primeiro.classList.add('aberto');
      header.setAttribute('aria-expanded', 'true');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }
}


/* ============================================================
   6. LINK DE NAV ATIVO
   Observa as sections principais e destaca o link correspondente
   no menu de navegação conforme a section entra no viewport.
   ============================================================ */
function initActiveNavLink() {
  // Mapeia IDs de section → links no menu
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');
  const drawLinks = document.querySelectorAll('.drawer-link[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;

          // Remove .active de todos os links
          navLinks.forEach(l => l.classList.remove('active'));
          drawLinks.forEach(l => l.classList.remove('active'));

          // Adiciona .active aos links que apontam para esta section
          navLinks.forEach(l => {
            if (l.getAttribute('href') === `#${id}`) {
              l.classList.add('active');
            }
          });
          drawLinks.forEach(l => {
            if (l.getAttribute('href') === `#${id}`) {
              l.classList.add('active');
            }
          });
        }
      });
    },
    {
      // A section é considerada "ativa" quando ocupa o terço central da tela
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    }
  );

  sections.forEach(s => observer.observe(s));
}


/* ============================================================
   7. HERO PARALLAX
   Move o fundo do hero suavemente em sentido contrário ao scroll
   criando profundidade. Usa requestAnimationFrame para performance.
   Desativado em mobile (onde pode causar lentidão).
   ============================================================ */
function initHeroParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  // Verifica se o dispositivo prefere movimento reduzido
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const heroHeight = heroBg.closest('.hero')?.offsetHeight || window.innerHeight;

    // Só aplica parallax enquanto o hero está visível
    if (scrollY < heroHeight) {
      // Fator 0.3 = 30% da velocidade do scroll (suave)
      const offset = scrollY * 0.3;
      heroBg.style.transform = `scale(1.05) translateY(${offset}px)`;
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}


/* ============================================================
   8. WHATSAPP CTA
   Garante que todos os botões de WhatsApp e inscrição abram
   o número correto. Aplica o número em todos os href wa.me/*.
   ============================================================ */
function initWhatsAppCTA() {
  const waUrl = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text&type=phone_number&app_absent=0`;

  // Seleciona todos os botões/links com classe .btn-whatsapp
  // ou href que já começam com wa.me
  document.querySelectorAll(
    '.btn-whatsapp, a[href*="wa.me"], a[href*="whatsapp"]'
  ).forEach(el => {
    // Atualiza o href com o número correto
    el.setAttribute('href', waUrl);
    // Abre em nova aba
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');

  });
}


/* ============================================================
   9. NETLIFY FORM — feedback visual
   Mostra loading no botão e mensagem de sucesso após envio.
   O Netlify processa o POST automaticamente graças ao data-netlify="true".
   ============================================================ */
function initNetlifyForm() {
  const form = document.querySelector('[data-netlify="true"]');
  if (!form) return;

  const submitBtn = form.querySelector('.form-submit-btn');
  const successMsg = form.querySelector('.form-success');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Mostra loading
    if (submitBtn) submitBtn.classList.add('loading');

    try {
      // Codifica os dados do formulário para envio
      const formData = new FormData(form);
      const body = new URLSearchParams(formData).toString();

      const response = await fetch(form.action || '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });

      if (response.ok) {
        // Sucesso: mostra mensagem e esconde formulário
        form.style.display = 'none';
        if (successMsg) successMsg.classList.add('visible');
      } else {
        throw new Error('Resposta não-OK');
      }
    } catch (error) {
      // Erro: avisa o usuário e restaura o botão
      console.error('Erro ao enviar formulário:', error);
      alert('Ocorreu um erro ao enviar. Tente novamente ou entre em contato via WhatsApp.');
      if (submitBtn) submitBtn.classList.remove('loading');
    }
  });
}


/* ============================================================
   10. BACK TO TOP
   Botão "voltar ao topo" aparece após 400px de scroll.
   Faz scroll suave ao topo ao clicar.
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 400) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ============================================================
   11. INDICADORES DE CONDIÇÕES (pontos de scroll)
   Atualiza os pontos indicadores conforme o usuário arrasta
   o scroll horizontal da seção de condições (mobile).
   ============================================================ */
function initCondicoesDots() {
  const row  = document.querySelector('.condicoes-row');
  const dots = document.querySelectorAll('.condicoes-dot');

  if (!row || !dots.length) return;

  /* Se a row não tem overflow-x scrollável (ex: grid empilhado no mobile),
     os dots estão ocultos via CSS e a função não precisa fazer nada. */
  if (getComputedStyle(row).overflowX !== 'auto' &&
      getComputedStyle(row).overflowX !== 'scroll') return;

  // Detecta qual coluna está mais visível
  function updateDots() {
    const colWidth  = row.scrollWidth / 3;
    const scrollPos = row.scrollLeft;
    const index     = Math.round(scrollPos / colWidth);

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  row.addEventListener('scroll', updateDots, { passive: true });
  updateDots(); // estado inicial

  // Clique nos pontos navega para a coluna correspondente
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const colWidth = row.scrollWidth / 3;
      row.scrollTo({ left: colWidth * i, behavior: 'smooth' });
    });
  });
}


/* ============================================================
   12. EFEITO TILT 3D NOS CARDS (desktop apenas)
   Micro-inclinação baseada na posição do mouse dentro do card,
   criando um efeito de profundidade sutil e elegante.
   Desativado em dispositivos de toque.
   ============================================================ */
function initCardTiltEffect() {
  // Aplica somente em dispositivos sem toque (desktop)
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Seleciona todos os cards que terão o efeito
  const cards = document.querySelectorAll(
    '.abordagem-card, .turma-card, .diferencial-card'
  );

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calcula o ângulo proporcional à distância do centro
      // Máximo de ±6 graus
      const rotateY = ((e.clientX - centerX) / (rect.width / 2))  * 6;
      const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -6;

      card.style.transform =
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
    });

    // Restaura ao sair do card
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}


/* ============================================================
   13. LOADING DE NAVEGAÇÃO
   Mostra a tela de loading da Integra em 3 situações:
   A) Clique em "Conhecer a Sede"  → navega para recife.html
   B) Clique em "EU QUERO SER INTEGRA" ou "SOLICITAR MINHA INSCRIÇÃO"
      → flash rápido (1.2s) antes de abrir o WhatsApp
   C) recife.html: aparece ao entrar e some após carregar
   ============================================================ */
function initPageLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  /* Expõe o loader às funções de módulo (_showQuickLoader etc.) */
  _pageLoader = loader;

  /* ── Timer de limpeza — guardamos a referência para poder cancelar
         caso um novo showLoader seja chamado antes do cleanup terminar ── */
  let pendingHideTimer = null;

  /* ── Mostra o loader com requestAnimationFrame para garantir
         que o browser processa o estado inicial antes da transição ── */
  function showLoader(ms, callback) {
    // Cancela qualquer cleanup pendente (evita snap por timer atrasado)
    if (pendingHideTimer) {
      clearTimeout(pendingHideTimer);
      pendingHideTimer = null;
    }

    // Reset INSTANTÂNEO (sem CSS transition) para estado base limpo
    loader.style.transition = 'none';
    loader.classList.remove('done', 'active');

    // rAF duplo: aguarda o browser pintar o reset antes de iniciar a entrada
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Restaura a transição CSS antes de adicionar .active
        loader.style.transition = '';
        loader.classList.add('active');
        if (ms > 0 && callback) {
          setTimeout(callback, ms);
        }
      });
    });
  }

  /* ── Esconde o loader com saída suave — aguarda a transição CSS terminar ── */
  function hideLoader(delay = 0) {
    setTimeout(() => {
      loader.classList.add('done');
      // Remove as classes SÓ após a transição CSS terminar (1.1s + 150ms de margem)
      pendingHideTimer = setTimeout(() => {
        pendingHideTimer = null;
        loader.classList.remove('active', 'done');
      }, 1250);
    }, delay);
  }

  /* ── A) Links de navegação para a sede ── */
  document.querySelectorAll('a[href*="recife.html"], a[href*="/sede/"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const destino = link.href;
      // 1.2 segundos de transição antes de navegar
      showLoader(1200, () => {
        window.location.href = destino;
      });
    });
  });

  /* ── B) Botões WhatsApp / C) PDF / C2) Redes Sociais ──────────────
     Estes links já têm target="_blank" e rel="noopener noreferrer"
     definidos pelo initWhatsAppCTA() e no próprio HTML.
     NÃO interceptamos aqui — deixamos o comportamento nativo do
     browser funcionar, que é o mais confiável em todos os dispositivos
     (iOS Safari, Android Chrome, etc.).
     Interceptar com e.preventDefault() + window.open() causa bloqueio
     de popup em mobile, resultando em abas em branco.
  ─────────────────────────────────────────────────────────────────── */

  /* ── D) Links de navegação (navbar + drawer mobile + footer) ──────────
     Flash no link + loader de tela cheia → rola para a seção destino.
  ────────────────────────────────────────────────────────────── */
  document.querySelectorAll('.nav-link, .drawer-link, .footer-nav-link').forEach(link => {
    const hash = link.getAttribute('href');

    // Só processa links de âncora interna (ex: #sobre, #modulos…)
    if (!hash || !hash.startsWith('#') || hash === '#') return;

    link.addEventListener('click', (e) => {
      e.preventDefault();

      // 1) Flash imediato no link clicado
      triggerBtnFlash(link);

      // 2) Loader de tela cheia → ao pico do loader, rola para a seção
      _showQuickLoader(() => {
        const target = document.querySelector(hash);
        if (!target) return;

        const offset = (navbarHeight || 80) + 8;
        const targetY = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
        history.pushState(null, '', hash);
      });
    });
  });

  /* ── E) recife.html: começa visível (.visible), some após carregar ── */
  if (loader.classList.contains('visible')) {
    // Aguarda 1s de exibição e depois sai com a animação suave
    setTimeout(() => {
      loader.classList.add('done');
      // Esconde após a transição CSS completa (1.1s + 150ms de margem)
      setTimeout(() => {
        loader.style.display = 'none';
      }, 1250);
    }, 1000);
  }

  /* ── F) Bfcache (Back-Forward Cache) — corrige loader travado ao voltar ──
     Quando o navegador restaura a página a partir do cache de histórico
     (bfcache), o DOM é restaurado EXATAMENTE como estava — incluindo o loader
     com classe .active. O evento pageshow com persisted:true detecta isso
     e limpa o loader instantaneamente, sem transição.
  ────────────────────────────────────────────────────────────────────────── */
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      /* Remove transição para não piscar */
      loader.style.transition = 'none';
      loader.classList.remove('active', 'done', 'visible', 'loader-quick');
      loader.style.removeProperty('display');
      /* Força o browser a pintar o estado limpo antes de restaurar transições */
      void loader.offsetHeight;
      loader.style.transition = '';
    }
  });

  /* ── G) Pagehide — limpa o loader ANTES de entrar no bfcache ──
     Garante que ao sair da página o loader está em estado neutro,
     evitando que seja guardado em .active no cache.
  ──────────────────────────────────────────────────────────────── */
  window.addEventListener('pagehide', () => {
    if (pendingHideTimer) {
      clearTimeout(pendingHideTimer);
      pendingHideTimer = null;
    }
    loader.style.transition = 'none';
    loader.classList.remove('active', 'done', 'visible', 'loader-quick');
    loader.style.removeProperty('display');
  });
}


/* ============================================================
   13. MURAL DE PROFESSORES — interação por toque (mobile)
   No desktop o CSS :hover já gerencia o overlay.
   No mobile (touch) um toque no card revela o overlay;
   toque fora fecha. Os botões internos SÓ ficam clicáveis
   DEPOIS que o overlay estiver completamente visível.
   ============================================================ */
function initProfessorCards() {
  const cards = document.querySelectorAll('.prof-card');
  if (!cards.length) return;

  /* Fechar todos os cards */
  function closeAll() {
    cards.forEach(c => {
      c.classList.remove('expanded');
      c.setAttribute('aria-expanded', 'false');
      /* Remove qualquer timer de ativação pendente */
      if (c._btnActivateTimer) {
        clearTimeout(c._btnActivateTimer);
        c._btnActivateTimer = null;
      }
      /* Garante que os botões fiquem desabilitados ao fechar */
      c.querySelectorAll('.prof-actions a').forEach(btn => {
        btn.style.pointerEvents = 'none';
        btn.setAttribute('tabindex', '-1');
      });
    });
  }

  cards.forEach(card => {
    card.setAttribute('aria-expanded', 'false');

    /* Desabilita botões inicialmente (overlay fechado) */
    card.querySelectorAll('.prof-actions a').forEach(btn => {
      btn.style.pointerEvents = 'none';
      btn.setAttribute('tabindex', '-1');
    });

    card.addEventListener('click', (e) => {
      const actionBtn = e.target.closest('.prof-actions a');

      /* Se clicou num botão interno e o card JÁ está expandido: deixa navegar */
      if (actionBtn && card.classList.contains('expanded')) return;

      /* Se clicou num botão mas o card NÃO está expandido ainda:
         intercepta para evitar navegação acidental no primeiro toque */
      if (actionBtn && !card.classList.contains('expanded')) {
        e.preventDefault();
      }

      const isExpanded = card.classList.contains('expanded');
      closeAll();

      if (!isExpanded) {
        card.classList.add('expanded');
        card.setAttribute('aria-expanded', 'true');

        /* Ativa os botões SOMENTE após a transição do overlay terminar (450ms) */
        card._btnActivateTimer = setTimeout(() => {
          card.querySelectorAll('.prof-actions a').forEach(btn => {
            btn.style.pointerEvents = '';
            btn.setAttribute('tabindex', '0');
          });
        }, 450);
      }
    });

    /* Teclado: Enter e Espaço alternam o overlay */
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  /* Clicar fora de qualquer card fecha todos */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.prof-card')) {
      closeAll();
    }
  });
}


/* ============================================================
   14. MÓDULOS EM CARDS — interação por toque (mobile)
   No desktop o CSS :hover já gerencia o overlay.
   No mobile (touch) um toque no card revela o overlay;
   toque fora fecha. Os botões internos ficam clicáveis
   DEPOIS que o overlay estiver completamente visível.
   ============================================================ */
function initModuloCards() {
  const cards = document.querySelectorAll('.modulo-card');
  if (!cards.length) return;

  /* Fecha todos os cards de módulo */
  function closeAll() {
    cards.forEach(c => {
      c.classList.remove('expanded');
      c.setAttribute('aria-expanded', 'false');
      if (c._modBtnTimer) {
        clearTimeout(c._modBtnTimer);
        c._modBtnTimer = null;
      }
      /* Desabilita botões internos ao fechar */
      c.querySelectorAll('.modulo-overlay-inner a').forEach(btn => {
        btn.style.pointerEvents = 'none';
        btn.setAttribute('tabindex', '-1');
      });
    });
  }

  cards.forEach(card => {
    card.setAttribute('aria-expanded', 'false');

    /* Desabilita botões inicialmente */
    card.querySelectorAll('.modulo-overlay-inner a').forEach(btn => {
      btn.style.pointerEvents = 'none';
      btn.setAttribute('tabindex', '-1');
    });

    card.addEventListener('click', (e) => {
      const actionBtn = e.target.closest('.modulo-overlay-inner a');

      /* Se clicou num botão interno e o card JÁ está expandido: navega normalmente */
      if (actionBtn && card.classList.contains('expanded')) return;

      /* Se clicou num botão mas o card NÃO está expandido: bloqueia navegação acidental */
      if (actionBtn && !card.classList.contains('expanded')) {
        e.preventDefault();
      }

      const isExpanded = card.classList.contains('expanded');
      closeAll();

      if (!isExpanded) {
        card.classList.add('expanded');
        card.setAttribute('aria-expanded', 'true');

        /* Ativa os botões SOMENTE após a transição do overlay terminar (480ms) */
        card._modBtnTimer = setTimeout(() => {
          card.querySelectorAll('.modulo-overlay-inner a').forEach(btn => {
            btn.style.pointerEvents = '';
            btn.setAttribute('tabindex', '0');
          });
        }, 480);
      }
    });

    /* Teclado: Enter e Espaço alternam o overlay */
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  /* Clicar fora de qualquer card de módulo fecha todos */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.modulo-card')) {
      closeAll();
    }
  });
}


/* ============================================================
   15. ANIMAÇÃO DA LOGO NOS BOTÕES
   Em TODOS os botões clicáveis do site, dois efeitos simultâneos:
   a) Mini-logo Integra pulsa (bloom 720ms) no centro do botão
   b) Tela de loading completa (fundo terracota + logo girando)
      — versão rápida: 350ms entrada, ~200ms presença, 350ms saída.

   Comportamento por tipo de link:
   • Link externo (WhatsApp, redes): e.preventDefault() → loader toca completo
     → window.location.href direciona o usuário ao destino. location.href evita
     bloqueio de popup do iOS Safari (que ocorreria com window.open em setTimeout).
   • Link âncora interno (#sobre, #modulos…): loader visual enquanto
     initSmoothScroll faz o scroll suave por baixo. Sem preventDefault.
   • Botão sem href (form submit): só o flash, sem loader de navegação.

   Exceções (tratadas em initPageLoader, não interceptadas aqui):
   • Links de sede / recife.html → seção A (loader 1.2s completo)
   • Nav/drawer/footer links → seção D (flash + loader + scroll)
   ============================================================ */
function initButtonLogoAnimation() {

  /* Todos os botões CTA, currículo e de ação do site */
  const botoes = document.querySelectorAll(
    '.btn, .btn-pdf, .contato-cta-btn, .form-submit-btn'
  );

  botoes.forEach(btn => {
    /* Garante position:relative e overflow:hidden para o overlay do flash */
    const cs = window.getComputedStyle(btn);
    if (cs.position === 'static') btn.style.position = 'relative';
    if (cs.overflow === 'visible') btn.style.overflow = 'hidden';

    btn.addEventListener('click', function(e) {
      const href = this.getAttribute('href') || '';

      /* Pula links de sede — já têm o loader 1.2s no initPageLoader seção A */
      if (href.includes('recife.html') || href.includes('/sede/')) return;

      /* 1) Flash imediato do mini-logo no botão (sempre) */
      triggerBtnFlash(this);

      /* Sem href ou só "#": botão sem navegação (ex: form submit) — só flash */
      if (!href || href === '#') return;

      if (href.startsWith('#')) {
        /* ── Âncora interna (ex: #sobre, #condicoes) ──
           Loader visual enquanto o initSmoothScroll faz o scroll suave por baixo.
           Não prevenimos default — initSmoothScroll gerencia o scroll. */
        _showQuickLoader();

      } else {
        /* ── Link externo (WhatsApp, redes sociais) ──
           Previne navegação imediata → loader toca por completo →
           só então direciona o usuário. O flag `true` (navigates) suprime
           o fade-out: a página parte com o loader totalmente visível,
           eliminando o conflito visual com o carregamento da nova página. */
        e.preventDefault();
        _showQuickLoader(() => {
          window.location.href = href;
        }, true);
      }
    });
  });
}


/* ============================================================
   INICIALIZAÇÃO PRINCIPAL
   Aguarda o DOM estar completamente carregado antes de inicializar.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  initNavbarScroll();      // 1. navbar transparente → verde
  initMobileMenu();        // 2. menu hambúrguer + drawer
  initSmoothScroll();      // 3. scroll suave para âncoras
  initRevealOnScroll();    // 4. animação de entrada ao rolar
  initAccordion();         // 5. acordeões dos módulos
  initActiveNavLink();     // 6. link ativo no menu
  initHeroParallax();      // 7. parallax da foto do hero
  initWhatsAppCTA();       // 8. botões CTA → WhatsApp
  initNetlifyForm();       // 9. submit do formulário
  initBackToTop();         // 10. botão voltar ao topo
  initCondicoesDots();     // 11. pontos do scroll horizontal mobile
  initCardTiltEffect();    // 12. efeito tilt 3D nos cards (desktop)
  initPageLoader();              // 13. tela de loading ao navegar para sede
  initProfessorCards();          // 14. mural de professores (toque mobile)
  initModuloCards();             // 15. cards de módulos (toque mobile)
  initButtonLogoAnimation();     // 16. animação da logo nos botões

});