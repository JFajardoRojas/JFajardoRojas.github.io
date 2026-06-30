/* ============================================================
   J. Fernando Fajardo-Rojas — site scripts (multi-page "Lab")
   Sidebar toggle · publications filter · blog filter · lightbox
   ============================================================ */

// ---- Respect reduced-motion for the hero video ----
(function () {
  const v = document.querySelector('.hero-video');
  if (v && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    v.removeAttribute('autoplay');
    v.addEventListener('loadeddata', () => v.pause());
    try { v.pause(); } catch (e) {}
  }
})();

// ---- Mobile sidebar toggle ----
(function () {
  const burger = document.getElementById('burger');
  const sidebar = document.getElementById('sidebar');
  if (!burger || !sidebar) return;
  burger.addEventListener('click', () => sidebar.classList.toggle('open'));
  // close when a nav link is tapped
  sidebar.querySelectorAll('.sb-nav a').forEach(a =>
    a.addEventListener('click', () => sidebar.classList.remove('open'))
  );
  // close when tapping outside the sidebar (mobile)
  document.addEventListener('click', e => {
    if (window.innerWidth > 820) return;
    if (sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) && e.target !== burger) {
      sidebar.classList.remove('open');
    }
  });
})();

// ---- Publications year filter ----
(function () {
  const wrap = document.getElementById('pub-filter');
  const items = document.querySelectorAll('#pub-list .pub');
  if (!wrap || items.length === 0) return;
  wrap.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      wrap.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      items.forEach(it => {
        it.classList.toggle('hidden', !(f === 'all' || it.dataset.year === f));
      });
    });
  });
})();

// ---- Blog filter (category + language) ----
(function () {
  const wrap = document.getElementById('blog-filter');
  const cards = document.querySelectorAll('#blog-grid .bcard');
  if (!wrap || cards.length === 0) return;
  const empty = document.getElementById('blog-empty');
  let cat = 'all', lang = 'all';

  function apply() {
    let visible = 0;
    cards.forEach(c => {
      const ok = (cat === 'all' || c.dataset.cat === cat) &&
                 (lang === 'all' || c.dataset.lang === lang);
      c.style.display = ok ? '' : 'none';
      if (ok) visible++;
    });
    if (empty) empty.hidden = visible !== 0;
  }

  wrap.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const isLang = btn.hasAttribute('data-lang-filter');
      if (isLang) {
        if (btn.classList.contains('active')) { btn.classList.remove('active'); lang = 'all'; }
        else {
          wrap.querySelectorAll('[data-lang-filter]').forEach(b => b.classList.remove('active'));
          btn.classList.add('active'); lang = btn.dataset.langFilter;
        }
      } else {
        wrap.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active'); cat = btn.dataset.filter;
      }
      apply();
    });
  });
})();

// ---- Photo lightbox ----
(function () {
  const grid = document.getElementById('photo-grid');
  const lb = document.getElementById('lightbox');
  if (!grid || !lb) return;
  const img = document.getElementById('lb-img');
  const cap = document.getElementById('lb-cap');
  const items = Array.from(grid.querySelectorAll('.ph')).filter(i => !i.classList.contains('photo-missing'));
  let cur = 0;

  function show(i) {
    cur = (i + items.length) % items.length;
    const el = items[cur];
    img.src = el.dataset.full;
    const c = el.dataset.caption || '', l = el.dataset.location || '';
    cap.textContent = [c, l].filter(Boolean).join(' · ');
    img.alt = c;
  }
  function open(i) { show(i); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
  function close() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }

  grid.querySelectorAll('.ph').forEach(el => el.addEventListener('click', () => {
    if (el.classList.contains('photo-missing')) return;
    const idx = items.indexOf(el);
    if (idx > -1) open(idx);
  }));
  document.getElementById('lb-close').addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', () => show(cur - 1));
  document.getElementById('lb-next').addEventListener('click', () => show(cur + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
})();
