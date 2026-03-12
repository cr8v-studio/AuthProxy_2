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
  const scrambleRadius = 145;
  const scrambleFalloffMs = 380;

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
      fragment.appendChild(span);
    }
    node.textContent = '';
    node.appendChild(fragment);
  }

  scrambleTargets.forEach(function (target) {
    splitToChars(target);
    const chars = target.querySelectorAll('.scramble-char');
    let pointerX = -9999;
    let pointerY = -9999;
    let lastPointerAt = 0;
    let rafId = 0;

    function render(now) {
      const alive = Math.max(0, 1 - (now - lastPointerAt) / scrambleFalloffMs);
      let hasActivity = alive > 0.01;

      chars.forEach(function (charNode) {
        const original = charNode.dataset.original || '';
        if (original.trim().length === 0) return;

        const rect = charNode.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const distance = Math.hypot(cx - pointerX, cy - pointerY);
        const local = Math.max(0, 1 - distance / scrambleRadius);
        const intensity = local * alive;

        if (intensity > 0.02) {
          hasActivity = true;
          if (Math.random() < 0.25 + intensity * 0.75) {
            const idx = Math.floor(Math.random() * scrambleAlphabet.length);
            charNode.textContent = scrambleAlphabet[idx];
          } else {
            charNode.textContent = original;
          }
        } else if (charNode.textContent !== original) {
          charNode.textContent = original;
        }
      });

      if (hasActivity) {
        rafId = requestAnimationFrame(render);
      } else {
        rafId = 0;
      }
    }

    target.addEventListener('pointermove', function (event) {
      pointerX = event.clientX;
      pointerY = event.clientY;
      lastPointerAt = performance.now();
      if (!rafId) rafId = requestAnimationFrame(render);
    });

    target.addEventListener('pointerleave', function () {
      lastPointerAt = performance.now() - scrambleFalloffMs;
      pointerX = -9999;
      pointerY = -9999;
      chars.forEach(function (charNode) {
        const original = charNode.dataset.original || '';
        if (charNode.textContent !== original) {
          charNode.textContent = original;
        }
      });
    });
  });
})();
