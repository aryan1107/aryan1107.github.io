/* ============================================================
   doc.js — renders a markdown file inside an e-ink doc shell.

   Body data-attributes:
     data-app        = "Auto AI Jobs"          (kicker)
     data-type       = "Privacy Policy"        (h1 title)
     data-source     = "privacy.md"            (markdown file)
     data-back       = "../index.html"         (back link target)
     data-back-label = "back to ..."           (optional)
     data-effective  = "Jan 1, 2026"           (optional)
     data-owner      = "Aryan"                 (footer copyright; optional)
   ============================================================ */

(function () {
  'use strict';

  const body = document.body;
  const cfg = {
    app:       body.dataset.app       || 'Aryan',
    type:      body.dataset.type      || 'Document',
    source:    body.dataset.source    || 'index.md',
    back:      body.dataset.back      || '../index.html',
    backLabel: body.dataset.backLabel || 'back to the workshop',
    effective: body.dataset.effective || '',
    owner:     body.dataset.owner     || 'Aryan'
  };

  body.innerHTML = `
    <div class="wrap narrow doc">

      <a class="back-link ink-in ink-in-1" href="${escapeAttr(cfg.back)}">
        <svg viewBox="0 0 20 14" fill="none" stroke="currentColor"
             stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 2 L 2 7 L 8 12"/><path d="M2 7 H 18"/>
        </svg>
        ${escapeHtml(cfg.backLabel)}
      </a>

      <p class="kicker ink-in ink-in-2">
        <span class="crumb">${escapeHtml(cfg.app)}</span> &nbsp;·&nbsp; the small print
      </p>

      <h1 class="ink-in ink-in-3">${escapeHtml(cfg.type)}.</h1>

      <svg class="underline-doodle ink-in ink-in-3" viewBox="0 0 280 14"
           fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round"
           aria-hidden="true">
        <path d="M2 8 Q 40 2, 80 7 T 160 6 T 240 8 L 276 5"/>
      </svg>

      <p class="doc-meta ink-in ink-in-4">
        ${cfg.effective ? `Effective: <strong>${escapeHtml(cfg.effective)}</strong> &nbsp;·&nbsp; ` : ''}
        For: <strong>${escapeHtml(cfg.app)}</strong>
      </p>

      <div class="doc-content ink-in ink-in-5" id="doc-content">
        <div class="doc-loading">~ loading ~</div>
      </div>

      <!-- closing flourish -->
      <div class="flourish ink-in ink-in-6" aria-hidden="true">
        <svg width="80" height="14" viewBox="0 0 80 14" fill="none" stroke="currentColor"
             stroke-width="1.2" stroke-linecap="round">
          <path d="M2 7 Q 20 2, 40 7 T 78 7"/>
        </svg>
        <span class="ast">❦</span>
        <svg width="80" height="14" viewBox="0 0 80 14" fill="none" stroke="currentColor"
             stroke-width="1.2" stroke-linecap="round">
          <path d="M2 7 Q 20 12, 40 7 T 78 7"/>
        </svg>
      </div>

      <footer class="ink-in ink-in-6">
        <div>
          © <span id="year"></span> ${escapeHtml(cfg.owner)}<br>
          <a href="${escapeAttr(cfg.back)}">${escapeHtml(cfg.backLabel)}</a>
        </div>
        <div class="signature">— thank you for reading.</div>
      </footer>

    </div>
  `;

  document.getElementById('year').textContent = new Date().getFullYear();

  document.addEventListener('pointermove', (e) => {
    document.body.style.setProperty('--mx', (e.clientX / window.innerWidth * 100) + '%');
    document.body.style.setProperty('--my', (e.clientY / window.innerHeight * 100) + '%');
  });

  const target = document.getElementById('doc-content');

  if (typeof marked === 'undefined') {
    showError(target, "Markdown renderer didn't load (check your internet — marked.js is loaded from a CDN).");
    return;
  }

  marked.setOptions({ gfm: true, breaks: false });

  fetch(cfg.source, { cache: 'no-cache' })
    .then(res => {
      if (!res.ok) throw new Error(`${res.status} ${res.statusText} — could not load ${cfg.source}`);
      return res.text();
    })
    .then(md => {
      const cleaned = md.replace(/^---[\s\S]*?---\s*/m, '');
      target.innerHTML = marked.parse(cleaned);
    })
    .catch(err => showError(target, err.message));

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => (
      { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]
    ));
  }
  function escapeAttr(s) { return escapeHtml(s); }

  function showError(el, msg) {
    el.innerHTML = `
      <div class="doc-error">
        <strong>Couldn't load this document.</strong><br>
        <code>${escapeHtml(msg)}</code><br><br>
        If you're viewing this locally by double-clicking the HTML file, your
        browser may block <code>fetch()</code>. Run a local server instead:
        <code>python3 -m http.server</code> from the site folder.
      </div>
    `;
  }
})();
