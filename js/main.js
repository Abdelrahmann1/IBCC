/* ═══════════════════════════════════════════════════════════════
   IBCC — interactions
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.prototype.slice.call((c || document).querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Preloader ───────────────────────────────────────────── */
  window.addEventListener('load', function () {
    const l = $('#loader');
    if (l) setTimeout(() => l.classList.add('is-done'), 500);
  });

  /* ── Header: stuck state + scroll progress ───────────────── */
  const hdr  = $('#hdr');
  const prog = $('#progress');

  function onScroll() {
    const y = window.scrollY;
    if (hdr) hdr.classList.toggle('is-stuck', y > 40);

    if (prog) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }

    const tt = $('#totop');
    if (tt) tt.classList.toggle('is-on', y > window.innerHeight * 0.8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile navigation ───────────────────────────────────── */
  const burger = $('#burger');
  const nav    = $('#nav');

  function closeNav() {
    if (!nav) return;
    nav.classList.remove('is-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    $$('a', nav).forEach(a => a.addEventListener('click', closeNav));
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ── Scroll reveal ───────────────────────────────────────── */
  const revealables = $$('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(el => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // stagger siblings that share a parent
        const sibs = Array.prototype.filter.call(
          el.parentNode.children, n => n.classList && n.classList.contains('reveal')
        );
        const i = Math.max(0, sibs.indexOf(el));
        el.style.transitionDelay = Math.min(i * 80, 400) + 'ms';
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealables.forEach(el => io.observe(el));
  }

  /* ── Animated counters ───────────────────────────────────── */
  const counters = $$('[data-count]');

  function runCounter(el) {
    const target = parseFloat(el.getAttribute('data-count')) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    if (reduced) { el.textContent = target + suffix; return; }

    const dur = 1500;
    const t0  = performance.now();

    (function step(now) {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        cio.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cio.observe(el));
  } else {
    counters.forEach(runCounter);
  }

  /* ── Project filter ──────────────────────────────────────── */
  const fbtns = $$('.filters__b');
  const cards = $$('#pgrid .card');
  const empty = $('#pempty');

  fbtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const cat = btn.getAttribute('data-filter');

      fbtns.forEach(function (b) {
        const on = b === btn;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-selected', String(on));
      });

      let shown = 0;
      cards.forEach(function (card) {
        const match = cat === 'all' || card.getAttribute('data-cat') === cat;
        card.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });

      if (empty) empty.hidden = shown !== 0;
    });
  });

  /* ── Active nav link on scroll ───────────────────────────── */
  const navLinks = $$('[data-nav]');
  const sections = navLinks
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { threshold: 0.15, rootMargin: '-30% 0px -55% 0px' });

    sections.forEach(s => sio.observe(s));
  }

  /* ── Contact form (front-end demo validation) ────────────── */
  const form = $('#form');
  const msg  = $('#formMsg');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const mail = (data.get('email') || '').toString().trim();
      const body = (data.get('message') || '').toString().trim();

      if (!name || !mail || !body) {
        msg.textContent = 'Please complete name, email and project details.';
        msg.classList.remove('is-ok');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
        msg.textContent = 'Please enter a valid email address.';
        msg.classList.remove('is-ok');
        return;
      }

      msg.textContent = 'Thank you, ' + name.split(' ')[0] + '. Your enquiry has been captured — connect this form to your mail service to receive it.';
      msg.classList.add('is-ok');
      form.reset();
    });
  }

  /* ── Footer year ─────────────────────────────────────────── */
  const yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
