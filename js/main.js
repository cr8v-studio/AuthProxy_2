(function () {
  const PATHS = {
    content: './content/content-source.json',
    nav: './content/nav-map.json',
    cta: './content/cta-map.json',
    siteMap: './content/site-map.json'
  };

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function renderTable(headers, rows, firstColStrong) {
    return `
      <div class="table-wrap">
        <table>
          <thead><tr>${headers.map(function (h) { return `<th>${escapeHtml(h)}</th>`; }).join('')}</tr></thead>
          <tbody>
            ${rows
              .map(function (row) {
                return `<tr>${row
                  .map(function (cell, idx) {
                    const text = escapeHtml(cell);
                    return `<td>${firstColStrong && idx === 0 ? `<strong>${text}</strong>` : text}</td>`;
                  })
                  .join('')}</tr>`;
              })
              .join('')}
          </tbody>
        </table>
      </div>`;
  }

  function renderStrongList(items) {
    return items
      .map(function (item) {
        const parts = item.split(':');
        if (parts.length > 1) {
          const label = parts.shift();
          return `<li><strong>${escapeHtml(label)}:</strong>${escapeHtml(parts.join(':'))}</li>`;
        }
        return `<li>${escapeHtml(item)}</li>`;
      })
      .join('');
  }

  function buildButton(button) {
    const cls = button.priority === 'primary' ? 'btn btn-primary' : 'btn btn-secondary';
    return `<a class="${cls}" href="${escapeHtml(button.href)}">${escapeHtml(button.label)}</a>`;
  }

  function renderSection(key, content, ctas, className, idAttr) {
    const idMarkup = idAttr ? ` id="${escapeHtml(idAttr)}"` : '';

    if (key === 'hero') {
      return `
        <section${idMarkup} class="${className}">
          <div class="container hero-grid">
            <div>
              <h1 class="hero-title-fx">${escapeHtml(content.hero.headline)}</h1>
              <p class="lead">${escapeHtml(content.hero.subheadline)}</p>
              <div class="btn-row">${ctas.hero.map(buildButton).join('')}</div>
            </div>
            <aside class="stats-bar" aria-label="Key product stats">
              ${content.hero.stats
                .map(function (s) {
                  return `<div><strong>${escapeHtml(s.value)}</strong><span>${escapeHtml(s.label)}</span></div>`;
                })
                .join('')}
            </aside>
          </div>
        </section>`;
    }

    if (key === 'problem') {
      return `
        <section id="problem" class="${className}">
          <div class="container">
            <h2>${escapeHtml(content.problem.headline)}</h2>
            <p>${escapeHtml(content.problem.intro)}</p>
            <ul class="list">${content.problem.items.map(function (i) { return `<li>${escapeHtml(i)}</li>`; }).join('')}</ul>
            <p>${escapeHtml(content.problem.outro)} <strong>${escapeHtml(content.problem.highlight)}</strong> ${escapeHtml(content.problem.closing)}</p>
          </div>
        </section>`;
    }

    if (key === 'how') {
      return `
        <section id="how" class="${className}">
          <div class="container">
            <h2>${escapeHtml(content.how.headline)}</h2>
            <pre class="diagram" aria-label="Architecture diagram">${escapeHtml(content.how.diagram)}</pre>
            <p>${escapeHtml(content.how.copy)}</p>
          </div>
        </section>`;
    }

    if (key === 'auth') {
      return `
        <section id="auth" class="${className}">
          <div class="container">
            <h2>${escapeHtml(content.auth.headline)}</h2>
            <div class="card-grid cols-2">
              ${content.auth.groups
                .map(function (group) {
                  return `<article class="card"><h3>${escapeHtml(group.title)}</h3>${renderTable(
                    group.headers,
                    group.rows,
                    true
                  )}</article>`;
                })
                .join('')}
            </div>
            <div class="technical-notes">
              <h3>${escapeHtml(content.auth.technical_title)}</h3>
              <ul class="list-tight">${renderStrongList(content.auth.technical)}</ul>
            </div>
          </div>
        </section>`;
    }

    if (key === 'proxy') {
      return `
        <section id="proxy" class="${className}">
          <div class="container">
            <h2>${escapeHtml(content.proxy.headline)}</h2>
            <p>${escapeHtml(content.proxy.copy)}</p>
            <ul class="list-tight">${renderStrongList(content.proxy.features)}</ul>
            ${renderTable(content.proxy.comparison.headers, content.proxy.comparison.rows, false)}
          </div>
        </section>`;
    }

    if (key === 'files') {
      return `
        <section id="files" class="${className}">
          <div class="container">
            <article class="card">
              <h2>${escapeHtml(content.files.headline)}</h2>
              <ul class="list-tight">${content.files.features.map(function (f) { return `<li>${escapeHtml(f)}</li>`; }).join('')}</ul>
            </article>
          </div>
        </section>`;
    }

    if (key === 'notifications') {
      return `
        <section id="notifications" class="${className}">
          <div class="container">
            <article class="card">
              <h2>${escapeHtml(content.notifications.headline)}</h2>
              <pre class="diagram">${escapeHtml(content.notifications.diagram)}</pre>
              <ul class="list-tight">${renderStrongList(content.notifications.features)}</ul>
            </article>
          </div>
        </section>`;
    }

    if (key === 'admin') {
      return `
        <section id="admin" class="${className}">
          <div class="container">
            <span id="live-demo" aria-hidden="true"></span>
            <h2>${escapeHtml(content.admin.headline)}</h2>
            <p>${escapeHtml(content.admin.copy)}</p>
            ${renderTable(content.admin.pages.headers, content.admin.pages.rows, true)}
            <h3>Tech Stack</h3>
            <ul class="list-tight">${content.admin.tech_stack.map(function (i) { return `<li>${escapeHtml(i)}</li>`; }).join('')}</ul>
          </div>
        </section>`;
    }

    if (key === 'security') {
      return `
        <section id="security" class="${className}">
          <div class="container">
            <h2>${escapeHtml(content.security.headline)}</h2>
            ${renderTable(content.security.grid.headers, content.security.grid.rows, false)}
            <ul class="list-tight">${renderStrongList(content.security.compliance)}</ul>
          </div>
        </section>`;
    }

    if (key === 'pwa') {
      return `
        <section id="pwa-optimization" class="${className}">
          <div class="container">
            <h2>${escapeHtml(content.pwa.headline)}</h2>
            <ol class="list-tight">${content.pwa.stages.map(function (i) { return `<li>${escapeHtml(i)}</li>`; }).join('')}</ol>
            <ul class="list-tight">${content.pwa.features.map(function (i) { return `<li>${escapeHtml(i)}</li>`; }).join('')}</ul>
          </div>
        </section>`;
    }

    if (key === 'mcp') {
      return `
        <section id="mcp" class="${className}">
          <div class="container">
            <article class="card">
              <h2>${escapeHtml(content.mcp.headline)}</h2>
              <p>${escapeHtml(content.mcp.copy)}</p>
              ${renderTable(content.mcp.levels.headers, content.mcp.levels.rows, false)}
              <h3>AuthProxy MCP Tools</h3>
              <p class="tool-list">${escapeHtml(content.mcp.tools)}</p>
            </article>
          </div>
        </section>`;
    }

    if (key === 'federation') {
      return `
        <section id="federation" class="${className}">
          <div class="container">
            <article class="card">
              <h2>${escapeHtml(content.federation.headline)}</h2>
              <ul class="list-tight">${content.federation.features.map(function (i) { return `<li>${escapeHtml(i)}</li>`; }).join('')}</ul>
            </article>
          </div>
        </section>`;
    }

    if (key === 'technical') {
      return `
        <section id="technical-specs" class="${className}">
          <div class="container">
            <article class="card">
              <h2>${escapeHtml(content.technical.headline)}</h2>
              ${renderTable(content.technical.stack.headers, content.technical.stack.rows, false)}
              <h3>Database Tables</h3>
              ${renderTable(content.technical.db_tables.headers, content.technical.db_tables.rows, false)}
              <h3>Configuration Levels</h3>
              ${renderTable(content.technical.config_levels.headers, content.technical.config_levels.rows, false)}
            </article>
          </div>
        </section>`;
    }

    if (key === 'integration') {
      return `
        <section id="integration" class="${className}">
          <div class="container">
            <article class="card">
              <h2>${escapeHtml(content.integration.headline)}</h2>
              <p>${escapeHtml(content.integration.copy)}</p>
              <ul class="list-tight">${renderStrongList(content.integration.items)}</ul>
            </article>
          </div>
        </section>`;
    }

    if (key === 'customization') {
      return `
        <section id="form-customization" class="${className}">
          <div class="container">
            <h2>${escapeHtml(content.customization.headline)}</h2>
            ${renderTable(content.customization.table.headers, content.customization.table.rows, false)}
            <p>Pre-built forms: ${escapeHtml(content.customization.forms)}</p>
          </div>
        </section>`;
    }

    if (key === 'pricing') {
      return `
        <section id="pricing" class="${className}">
          <div class="container">
            <h2>${escapeHtml(content.pricing.headline)}</h2>
            <p>${escapeHtml(content.pricing.copy)}</p>
            ${renderTable(content.pricing.tiers.headers, content.pricing.tiers.rows, false)}
            <h3>${escapeHtml(content.pricing.free_title)}</h3>
            <ul class="list-tight">${content.pricing.free_items.map(function (i) { return `<li>${escapeHtml(i)}</li>`; }).join('')}</ul>
          </div>
        </section>`;
    }

    if (key === 'quickstart') {
      return `
        <section id="quickstart" class="${className}">
          <div class="container">
            <h2>${escapeHtml(content.quickstart.headline)}</h2>
            <ol class="list-tight">${content.quickstart.steps
              .map(function (s) {
                const parts = s.split('→');
                if (parts.length > 1) {
                  return `<li>${escapeHtml(parts[0])}→ <code>${escapeHtml(parts.slice(1).join('→').trim())}</code></li>`;
                }
                return `<li>${escapeHtml(s)}</li>`;
              })
              .join('')}</ol>
          </div>
        </section>`;
    }

    if (key === 'faq') {
      return `
        <section id="faq" class="${className}">
          <div class="container">
            <h2>${escapeHtml(content.faq.headline)}</h2>
            <div class="faq-list" role="list">
              ${content.faq.items
                .map(function (item) {
                  return `<article class="faq-item" role="listitem"><button class="faq-question" aria-expanded="false">${escapeHtml(
                    item.q
                  )}</button><div class="faq-answer"><p>${escapeHtml(item.a)}</p></div></article>`;
                })
                .join('')}
            </div>
          </div>
        </section>`;
    }

    if (key === 'social_proof') {
      return `
        <section id="social-proof" class="${className}">
          <div class="container">
            <h2>${escapeHtml(content.social_proof.headline)}</h2>
            <ul class="list-tight">${content.social_proof.deployments.map(function (d) { return `<li>${escapeHtml(d)}</li>`; }).join('')}</ul>
            <h3>${escapeHtml(content.social_proof.metrics_title)}</h3>
            <ul class="list-tight">${content.social_proof.metrics.map(function (m) { return `<li>${escapeHtml(m)}</li>`; }).join('')}</ul>
          </div>
        </section>`;
    }

    if (key === 'closing_cta') {
      return `
        <section id="closing-cta" class="${className}">
          <div class="container">
            <h2>${escapeHtml(content.closing_cta.headline)}</h2>
            <p>${escapeHtml(content.closing_cta.copy)}</p>
            <div class="btn-row">${ctas.closing_cta.map(buildButton).join('')}</div>
          </div>
        </section>`;
    }

    return '';
  }

  function bindInteractions() {
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
  }

  function initAuthCardGlow() {
    const targets = document.querySelectorAll('#auth .card, #auth .technical-notes');
    if (!targets.length) return;

    const state = { x: -9999, y: -9999 };
    const proximity = 64;

    targets.forEach(function (el) {
      el.classList.add('glow-card');
      el.style.setProperty('--active', '0.34');
      el.style.setProperty('--mx', '50%');
      el.style.setProperty('--my', '50%');
    });

    function updateGlow() {
      targets.forEach(function (el) {
        const rect = el.getBoundingClientRect();
        const active =
          state.x > rect.left - proximity &&
          state.x < rect.right + proximity &&
          state.y > rect.top - proximity &&
          state.y < rect.bottom + proximity;

        el.style.setProperty('--active', active ? '0.95' : '0.34');
        if (!active) return;

        const px = ((state.x - rect.left) / rect.width) * 100;
        const py = ((state.y - rect.top) / rect.height) * 100;
        el.style.setProperty('--mx', `${Math.max(0, Math.min(100, px))}%`);
        el.style.setProperty('--my', `${Math.max(0, Math.min(100, py))}%`);
      });
    }

    document.body.addEventListener(
      'pointermove',
      function (e) {
        state.x = e.clientX;
        state.y = e.clientY;
        updateGlow();
      },
      { passive: true }
    );

    window.addEventListener('scroll', updateGlow, { passive: true });
  }

  function initHeroTitleFx() {
    const heroTitleSelector = '.hero-title-fx';
    const splitTextPlugin = window.SplitText || (window.gsap && window.gsap.plugins && window.gsap.plugins.SplitText);
    if (!(window.gsap && splitTextPlugin && document.querySelector(heroTitleSelector))) return;

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

  function ensureNavTargets(navMap, siteMap) {
    const visibleIds = new Set(
      siteMap
        .filter(function (s) {
          return s.active && s.id;
        })
        .map(function (s) {
          return `#${s.id}`;
        })
    );

    return navMap.filter(function (item) {
      return item.active && visibleIds.has(item.href);
    });
  }

  function renderNavbar(navMap) {
    const nav = document.getElementById('site-nav');
    if (!nav) return;
    nav.innerHTML = navMap
      .map(function (item) {
        return `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`;
      })
      .join('');
  }

  function renderFooter(content) {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    footer.innerHTML = `
      <div class="container footer-grid">
        <p class="brand">${escapeHtml(content.footer.brand)}</p>
        <p>${escapeHtml(content.footer.line1)}</p>
        <p>${escapeHtml(content.footer.line2)}</p>
      </div>`;
  }

  function renderMain(content, siteMap, ctas) {
    const main = document.getElementById('top');
    if (!main) return;

    main.innerHTML = siteMap
      .filter(function (s) {
        return s.active;
      })
      .map(function (s) {
        return renderSection(s.key, content, ctas, s.className, s.id);
      })
      .join('');
  }

  function setMeta(content) {
    document.title = content.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute('content', content.meta.description);
    }
  }

  function fetchJson(url) {
    return window.fetch(url).then(function (r) {
      if (!r.ok) throw new Error(`Failed to load ${url}`);
      return r.json();
    });
  }

  Promise.all([fetchJson(PATHS.content), fetchJson(PATHS.nav), fetchJson(PATHS.cta), fetchJson(PATHS.siteMap)])
    .then(function (result) {
      const content = result[0];
      const navMap = result[1];
      const ctas = result[2];
      const siteMap = result[3];

      setMeta(content);
      renderMain(content, siteMap, ctas);
      renderNavbar(ensureNavTargets(navMap, siteMap));
      renderFooter(content);

      bindInteractions();
      initAuthCardGlow();

      window.addEventListener('load', function () {
        window.setTimeout(initHeroTitleFx, 220);
      });
    })
    .catch(function (error) {
      console.error('Content-layer init failed:', error);
    });
})();
