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

  const scrambleTargets = document.querySelectorAll('.scramble-text');
  const scrambleAlphabet = '.:';
  const scrambleRadius = 110;
  const scrambleCooldownMs = 240;

  function splitToChars(node) {
    const source = node.textContent || '';
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < source.length; i += 1) {
      const ch = source[i];
      if (ch === ' ') {
        fragment.appendChild(document.createTextNode(' '));
        continue;
      }
      const span = document.createElement('span');
      span.className = 'scramble-char';
      span.textContent = ch;
      span.dataset.original = ch;
      span.dataset.lastRun = '0';
      fragment.appendChild(span);
    }
    node.textContent = '';
    node.appendChild(fragment);
  }

  function scrambleChar(charNode, intensity) {
    if (!charNode || charNode.dataset.animating === '1') return;

    const now = Date.now();
    const last = Number(charNode.dataset.lastRun || '0');
    if (now - last < scrambleCooldownMs) return;

    charNode.dataset.animating = '1';
    charNode.dataset.lastRun = String(now);
    const original = charNode.dataset.original || charNode.textContent || '';
    const duration = 180 + Math.round(intensity * 420);
    const start = performance.now();

    function frame(ts) {
      const progress = Math.min((ts - start) / duration, 1);
      if (progress >= 1) {
        charNode.textContent = original;
        charNode.dataset.animating = '0';
        return;
      }

      const pool = Math.max(1, Math.round(intensity * 4));
      if (Math.random() < 0.7 + intensity * 0.2) {
        const index = Math.floor(Math.random() * pool) % scrambleAlphabet.length;
        charNode.textContent = scrambleAlphabet[index];
      }
      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  scrambleTargets.forEach(function (target) {
    splitToChars(target);
    const chars = target.querySelectorAll('.scramble-char');

    function trigger(x, y) {
      chars.forEach(function (charNode) {
        const rect = charNode.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const distance = Math.hypot(cx - x, cy - y);
        if (distance > scrambleRadius) return;
        const intensity = 1 - distance / scrambleRadius;
        scrambleChar(charNode, intensity);
      });
    }

    target.addEventListener('pointermove', function (event) {
      trigger(event.clientX, event.clientY);
    });
  });
})();
