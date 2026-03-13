(function () {
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('#site-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const opened = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(opened));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('.faq-question').forEach(function (button) {
    button.addEventListener('click', function () {
      const item = button.closest('.faq-item');
      if (!item) return;

      const willOpen = !item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        const openButton = openItem.querySelector('.faq-question');
        if (openButton) openButton.setAttribute('aria-expanded', 'false');
      });

      if (willOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    const acceptBtn = banner.querySelector('[data-cookie-action="accept"]');
    const cancelBtn = banner.querySelector('[data-cookie-action="cancel"]');

    // Persisted consent logic:
    // accepted => do not show again on future visits.
    if (localStorage.getItem('cookieConsent') === 'accepted') {
      banner.classList.add('is-hidden');
      return;
    }

    banner.classList.remove('is-hidden');
    requestAnimationFrame(function () {
      banner.classList.add('is-visible');
    });

    function hideBanner() {
      banner.classList.remove('is-visible');
      banner.addEventListener(
        'transitionend',
        function () {
          banner.classList.add('is-hidden');
        },
        { once: true }
      );
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        // Save accepted consent permanently
        localStorage.setItem('cookieConsent', 'accepted');
        hideBanner();
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', function () {
        // Session-only dismissal: no localStorage write
        hideBanner();
      });
    }
  }

  function initUnicornAuthEffect() {
    const layer = document.getElementById('auth-unicorn-layer');
    if (!layer) return;

    const sdkUrl =
      'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.4/dist/unicornStudio.umd.js';

    function start() {
      if (window.UnicornStudio && typeof window.UnicornStudio.init === 'function') {
        window.UnicornStudio.init();
      }
    }

    if (window.UnicornStudio && typeof window.UnicornStudio.init === 'function') {
      start();
      return;
    }

    const existingScript = document.querySelector('script[data-unicorn-sdk="true"]');
    if (existingScript) {
      existingScript.addEventListener('load', start, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = sdkUrl;
    script.async = true;
    script.dataset.unicornSdk = 'true';
    script.onload = start;
    (document.head || document.body).appendChild(script);
  }

  const langButtons = document.querySelectorAll('.lang-btn');
  const trackedNodes = [];
  const trackedSet = new WeakSet();

  function trackNode(node) {
    if (!node || trackedSet.has(node)) return;
    trackedSet.add(node);
    trackedNodes.push({ node: node, html: node.innerHTML, text: node.textContent || '' });
  }

  function setText(selector, value) {
    const node = document.querySelector(selector);
    if (!node) return;
    trackNode(node);
    node.textContent = value;
  }

  function setHTML(selector, value) {
    const node = document.querySelector(selector);
    if (!node) return;
    trackNode(node);
    node.innerHTML = value;
  }

  function setList(selector, values) {
    const nodes = document.querySelectorAll(selector);
    nodes.forEach(function (node, index) {
      if (index >= values.length) return;
      trackNode(node);
      node.textContent = values[index];
    });
  }

  function restoreEnglish() {
    trackedNodes.forEach(function (item) {
      if (!item.node) return;
      item.node.innerHTML = item.html;
    });
    document.documentElement.lang = 'en';
    document.title = 'AuthProxy — Authentication, Routing & Files in One Module';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'AuthProxy is a production-grade edge module for authentication, reverse proxy, file service, notifications, and admin control for PWA apps.'
      );
    }
  }

  function applyRussian() {
    document.documentElement.lang = 'ru';
    document.title = 'AuthProxy — Аутентификация, маршрутизация и файлы в одном модуле';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'AuthProxy — production-grade модуль для аутентификации, reverse proxy, файлового сервиса, уведомлений и администрирования PWA-приложений.'
      );
    }

    setText('.mobile-nav-toggle', 'Меню');
    setList('#site-nav a', ['Проблема', 'Как это работает', 'Методы входа', 'Безопасность', 'Тарифы', 'FAQ']);

    setText('.section-hero .eyebrow', 'AuthProxy для инфраструктурных команд');
    setText('.section-hero h1', 'Аутентификация, маршрутизация и файлы — один модуль, ноль зависимостей');
    setHTML(
      '.section-hero .lead',
      'AuthProxy — production-grade веб-сервер, который объединяет аутентификацию, reverse proxy, управление файлами и real-time уведомления для PWA-приложений. 11 методов входа, in-memory сессии и rate limiting — всё в одном процессе.'
    );
    setList('.section-hero .btn-row a', ['Начать разработку ->', 'Смотреть демо админки ->']);
    setList('.section-hero .stats-bar span', ['Методов входа', 'Страниц админки', 'Юнит-тестов', 'Первая загрузка']);

    setText('#problem h2', 'Вы собираете auth-инфраструктуру из 5 разных сервисов');
    setText('#problem p:nth-of-type(1)', 'Для современного веб-приложения вам нужны:');
    setList('#problem .list li', [
      'Identity provider (Auth0, Keycloak, Firebase)',
      'Reverse proxy (nginx, Traefik)',
      'Файловое хранилище (S3, MinIO)',
      'Система уведомлений (Firebase, OneSignal)',
      'Админ-панель (кастомная или Retool)'
    ]);
    setHTML(
      '#problem p:nth-of-type(2)',
      'Это 5 поставщиков, 5 точек отказа, 5 кривых обучения и недели интеграций. <strong>AuthProxy заменяет все пять.</strong> Один ASP.NET-процесс. Без внешних зависимостей. Готово к продакшену с первого дня.'
    );

    setText('#how h2', 'Один процесс. Пять возможностей.');
    setText(
      '#how .diagram',
      'Internet -> AuthProxy (port 443)\n  ├── Authentication (11 methods)\n  ├── Reverse Proxy (dynamic routing)\n  ├── File Service (upload/download/images)\n  ├── Notifications (SSE, Webhooks, Push)\n  └── Admin Panel (13 pages)\n         ↓\n    Backend Services (your Core, TrexWallet, Chat, CRM)'
    );
    setText(
      '#how p',
      'AuthProxy работает на edge вашего приложения. Каждый запрос проходит через него: проверяется аутентификация, добавляются заголовки (X-Crm, X-Scopes, X-Project), после чего запрос передаётся в backend-сервисы. Сервисы никогда не получают неаутентифицированный трафик.'
    );

    setText('#auth h2', 'Все методы входа, которые нужны вашим пользователям, уже встроены');
    setList('#auth .card h3', ['Криптографические (самые надёжные)', 'Одноразовые пароли', 'Социальные / OAuth', 'AI / Машинный доступ']);
    setList('#auth .technical-notes h3', ['Ключевые технические детали']);

    setText('.section-proxy h2', 'Динамическая маршрутизация. Изменения без даунтайма.');
    setHTML(
      '.section-proxy p',
      'Маршруты хранятся в таблице <code>route_map</code> и перезагружаются каждые 100 секунд.'
    );

    setText('#admin h2', 'Полная операционная видимость. Никакого black box.');
    setText('#admin p', 'Админ-панель включает 13 страниц для операционного контроля:');
    setText('#security h2', 'Корпоративная безопасность без корпоративной сложности');

    setText('.section-performance h2', '3 KB первая загрузка. Работает даже на 3G.');
    setText('.section-ai h2', 'Ваше приложение готово к AI с первого дня');
    setText('.section-tech h2', 'Технические характеристики');
    setText('.section-customization h2', 'Три уровня кастомизации формы логина');
    setText('#pricing h2', 'Тарифы / Доступность');
    setText('#quickstart h2', 'Запуск за 15 минут');
    setText('#faq h2', 'FAQ');
    setText('.section-proof h2', 'Продакшен-развёртывания');
    setText('.final-cta h2', 'Перестаньте строить auth-инфраструктуру. Начните строить продукт.');
    setList('.final-cta .btn-row a', ['Начать бесплатно ->', 'Читать документацию ->', 'Смотреть live demo ->']);

    setText('.site-footer .footer-grid p:nth-child(2)', 'AuthProxy — аутентификация, маршрутизация, файлы, уведомления.');
    setText('.site-footer .footer-grid p:nth-child(3)', 'Создано для PWA и инфраструктурных команд.');
    setText('#cookie-banner-title', 'Политика cookie действует');
    setText(
      '#cookie-banner-text',
      'Наш сайт использует cookie. Цель политики — объяснить, как мы используем cookie и обрабатываем персональные данные.'
    );
    setList('#cookie-banner .cookie-btn', ['ОТМЕНА', 'ПРИНЯТЬ']);
  }

  function setLanguage(lang) {
    if (lang === 'ru') {
      applyRussian();
    } else {
      restoreEnglish();
      lang = 'en';
    }

    localStorage.setItem('authproxy_lang', lang);
    langButtons.forEach(function (button) {
      const active = button.getAttribute('data-lang') === lang;
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  langButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const lang = button.getAttribute('data-lang') || 'en';
      setLanguage(lang);
    });
  });

  const savedLang = localStorage.getItem('authproxy_lang') || 'en';
  setLanguage(savedLang);
  initCookieBanner();
  initUnicornAuthEffect();

  const heroTitleSelector = '.hero-title-fx';
  function initHeroTitleFx(attempt) {
    const heroTitle = document.querySelector(heroTitleSelector);
    if (!heroTitle) return;

    const splitTextPlugin =
      window.SplitText ||
      (window.gsap && window.gsap.plugins && window.gsap.plugins.SplitText);

    if (!(window.gsap && splitTextPlugin)) {
      if (attempt < 40) {
        window.setTimeout(function () {
          initHeroTitleFx(attempt + 1);
        }, 100);
      }
      return;
    }

    window.gsap.registerPlugin(splitTextPlugin);
    const split = splitTextPlugin.create
      ? splitTextPlugin.create(heroTitleSelector, { type: 'chars, words, lines' })
      : new splitTextPlugin(heroTitleSelector, { type: 'chars, words, lines' });

    if (!split || !split.chars || !split.chars.length) return;

    window.gsap.from(split.chars, {
      yPercent: 'random([-100,100])',
      rotation: 'random(-30,30)',
      ease: 'back.out',
      autoAlpha: 0,
      repeat: 4,
      yoyo: true,
      stagger: {
        amount: 0.5,
        from: 'random'
      },
      onComplete: function () {
        if (split.revert) split.revert();
      }
    });
  }

  window.addEventListener('load', function () {
    window.setTimeout(function () {
      initHeroTitleFx(0);
    }, 420);
  });
})();
