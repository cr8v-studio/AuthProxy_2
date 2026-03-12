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

  const heroTitle = document.querySelector('.hero-title-fx');
  if (heroTitle && window.gsap && window.SplitText) {
    window.gsap.registerPlugin(window.SplitText);
    const split = new window.SplitText(heroTitle, { type: 'chars,words' });
    const chars = split.chars || [];
    let activeTween = null;

    function playHeroTitleFx() {
      if (!chars.length) return;
      if (activeTween) activeTween.kill();
      activeTween = window.gsap.from(chars, {
        duration: 0.8,
        opacity: 0,
        x: 120,
        ease: 'power1.inOut',
        stagger: 0.04,
        repeat: 1,
        yoyo: true
      });
    }

    playHeroTitleFx();
    heroTitle.addEventListener('pointerenter', playHeroTitleFx);
  }
})();
