(() => {
  'use strict';
  const html = document.documentElement;
  const MOTION = html.classList.contains('motion');
  const isMobile = matchMedia('(max-width: 900px)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const yieldToMain = () => new Promise((r) => setTimeout(r, 0));

  /* ================= A. UI que funciona siempre ================= */
  const toastEl = $('.toast');
  let toastTimer;
  const toast = (msg) => {
    toastEl.textContent = msg; toastEl.classList.add('is-on');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2600);
  };

  // Abierto / cerrado ahora (horario de Garrucha)
  const HOURS = [[8, 21], [7.5, 22], [7.5, 22], [7.5, 22], [7.5, 22], [7.5, 23], [8, 23]]; // domingo..sábado
  const hhmm = (h) => `${Math.floor(h)}:${h % 1 ? '30' : '00'}`;
  const statusEl = $('[data-status]');
  if (statusEl) {
    const now = new Date(), d = now.getDay(), t = now.getHours() + now.getMinutes() / 60, [o, c] = HOURS[d];
    statusEl.textContent = t >= o && t < c ? `Abierto ahora · cerramos a las ${hhmm(c)}`
      : t < o ? `Hoy abrimos a las ${hhmm(o)}` : `Mañana abrimos a las ${hhmm(HOURS[(d + 1) % 7][0])}`;
  }
  $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  // Nav activa con IntersectionObserver
  const navLinks = $$('[data-nav]'), sections = $$('[data-section]'), visible = new Set();
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
    const top = sections.filter((s) => visible.has(s)).pop();
    navLinks.forEach((a) => a.classList.toggle('is-active', !!top && a.dataset.nav === top.dataset.section));
  }, { rootMargin: '-45% 0px -45% 0px' });
  sections.forEach((s) => navIO.observe(s));

  // Marca gigante del footer al ancho exacto
  const wm = $('[data-wordmark] span');
  function fitWordmark() {
    if (!wm) return; const box = wm.parentElement; box.style.fontSize = '';
    const size = parseFloat(getComputedStyle(box).fontSize);
    box.style.fontSize = (size * box.clientWidth / wm.scrollWidth) * 0.98 + 'px';
  }
  fitWordmark(); document.fonts.ready.then(fitWordmark); addEventListener('resize', fitWordmark);

  // Cantidades +/−
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-qty]'); if (!b) return;
    const out = b.parentElement.querySelector('output');
    out.value = clamp(+out.value + +b.dataset.qty, 1, 20);
    out.closest('form')?.dispatchEvent(new Event('input', { bubbles: true }));
  });

  // WhatsApp con mensaje ya escrito (un <a> real: window.open falla en visores embebidos)
  const WA = document.body.dataset.wa;
  const euro = (v) => v.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
  const openWA = (msg) => { const l = document.createElement('a'); l.href = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`; l.target = '_blank'; l.rel = 'noopener'; document.body.append(l); l.click(); l.remove(); };

  // "+ Añadir" en la carta: marca ese café en el configurador y baja hasta él
  $$('[data-add]').forEach((b) => b.addEventListener('click', () => {
    const name = b.dataset.add, radio = $(`input[name="base"][value="${name}"]`);
    if (radio) { radio.checked = true; radio.dispatchEvent(new Event('change', { bubbles: true })); }
    if (radio) toast(`${name} listo para pedir ✓`);
    else { toast(`Te abrimos WhatsApp para pedir: ${name}`); openWA(`Hola, quiero pedir un ${name}.`); }
  }));

  const cfg = $('[data-config]');
  if (cfg) {
    const calc = () => {
      const base = $('input[name="base"]:checked', cfg), extras = $$('input[name="extra"]:checked', cfg);
      const qty = +$('output[name="qty"]', cfg).value;
      const total = (parseFloat(base.dataset.price) + extras.reduce((s, x) => s + parseFloat(x.dataset.price), 0)) * qty;
      $$('[data-total]').forEach((el) => (el.textContent = euro(total)));
      return { base: base.value, extras: extras.map((x) => x.value), qty, total };
    };
    cfg.addEventListener('input', calc); cfg.addEventListener('change', calc);
    cfg.addEventListener('submit', (e) => {
      e.preventDefault(); const o = calc();
      openWA(`Hola, quiero pedir ${o.qty} × ${o.base}${o.extras.length ? ' con ' + o.extras.join(', ') : ''}. Total: ${euro(o.total)}. Lo recojo en barra.`);
    });
    calc();
  }

  // Visor 360
  $$('[data-spin]').forEach((el) => {
    const count = +el.dataset.frames, tpl = el.dataset.src;
    let seq = null, idx = 0, sx = 0, si = 0, drag = false, touched = false, visibleNow = false;
    const go = (i) => { idx = i; seq && seq.at(((Math.round(idx) % count) + count) % count); };
    new IntersectionObserver(([e]) => {
      visibleNow = e.isIntersecting;
      if (visibleNow && !seq) seq = frameSequence($('canvas', el), {
        count, src: (i) => tpl.replace('{n}', String(i + 1).padStart(4, '0')), onFirst: () => el.classList.add('is-ready'),
      });
    }, { rootMargin: '40% 0px' }).observe(el);
    el.addEventListener('pointerdown', (e) => { drag = touched = true; sx = e.clientX; si = idx; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', (e) => { if (drag) go(si - ((e.clientX - sx) / el.clientWidth) * count); });
    const end = () => (drag = false);
    el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); touched = true; go(idx + (e.key === 'ArrowRight' ? 1 : -1)); }
    });
    if (MOTION) { const idle = () => { if (!touched && visibleNow) go(idx + 0.12); requestAnimationFrame(idle); }; requestAnimationFrame(idle); }
  });

  // Modal de reserva
  const dlg = $('#reserva');
  if (dlg && dlg.showModal) {
    const form = $('[data-booking]', dlg), panes = $$('[data-pane]', dlg), lis = $$('.modal__steps li', dlg), msgEl = $('[data-msg]', dlg);
    const st = { step: 0, day: '', time: '' };
    const days = $('[data-days]', dlg), wd = new Intl.DateTimeFormat('es-ES', { weekday: 'short' });
    for (let i = 0; i < 7; i++) {
      const d = new Date(); d.setDate(d.getDate() + i);
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'slot'; b.setAttribute('aria-pressed', 'false');
      b.dataset.label = i === 0 ? 'hoy' : i === 1 ? 'mañana' : 'el ' + d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' });
      b.innerHTML = `<small>${i === 0 ? 'Hoy' : wd.format(d).replace('.', '')}</small>${d.getDate()}`;
      days.append(b);
    }
    const show = (i) => {
      st.step = clamp(i, 0, 2); msgEl.textContent = '';
      panes.forEach((p, k) => (p.hidden = k !== st.step));
      lis.forEach((l, k) => l.classList.toggle('is-on', k <= st.step));
      $('[data-step-num]', dlg).textContent = st.step + 1;
      $('[data-back]', dlg).style.visibility = st.step ? 'visible' : 'hidden';
      $('[data-next]', dlg).textContent = st.step === 2 ? 'Confirmar por WhatsApp' : 'Siguiente';
      if (st.step === 2) $('[data-summary]', dlg).textContent = `${st.day[0].toUpperCase() + st.day.slice(1)} a las ${st.time} · ${$('output[name="people"]', dlg).value} personas`;
    };
    dlg.addEventListener('click', (e) => {
      const s = e.target.closest('.slot');
      if (s) {
        $$('.slot', s.parentElement).forEach((x) => x.setAttribute('aria-pressed', String(x === s)));
        if (s.dataset.time) st.time = s.dataset.time; else st.day = s.dataset.label;
        msgEl.textContent = '';
      }
      if (e.target === dlg || e.target.closest('[data-close]')) dlg.close();
      if (e.target.closest('[data-back]')) show(st.step - 1);
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (st.step === 0 && !st.day) return (msgEl.textContent = 'Elige un día para seguir.');
      if (st.step === 1 && !st.time) return (msgEl.textContent = 'Elige una hora para seguir.');
      if (st.step < 2) return show(st.step + 1);
      if (!form.reportValidity()) return;
      const f = form.elements, people = $('output[name="people"]', dlg).value;
      openWA(`Hola, soy ${f.nombre.value}. Quiero reservar mesa para ${people} personas ${st.day} a las ${st.time}. Mi teléfono: ${f.telefono.value}.`);
      dlg.close(); toast('¡Listo! Te confirmamos la mesa por WhatsApp ✓');
    });
    $$('[data-open="reserva"]').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault(); show(0); dlg.showModal(); window.__lenis?.stop();
    }));
    dlg.addEventListener('close', () => window.__lenis?.start());
  }

  if (!MOTION) return;

  /* ================= B. Motor de animación (después del load) ================= */
  const LIBS = ['vendor/gsap.min.js', 'vendor/ScrollTrigger.min.js', 'vendor/lenis.min.js'];
  const loadLibs = () => Promise.all(LIBS.map((src) => new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = src; s.async = false;
    s.onload = res; s.onerror = rej; document.body.appendChild(s);
  })));
  const start = () => loadLibs().then(initMotion).catch((e) => { console.warn(e); html.classList.remove('motion'); });
  const whenIdle = () => ('requestIdleCallback' in window ? requestIdleCallback(start, { timeout: 2000 }) : setTimeout(start, 200));
  document.readyState === 'complete' ? whenIdle() : addEventListener('load', whenIdle, { once: true });

  function splitWords(el) {
    if (el.dataset.splitDone) return $$('.w > span', el);
    const walk = (node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) return frag.append(p);
          const w = document.createElement('span'); w.className = 'w';
          const i = document.createElement('span'); i.textContent = p; w.append(i); frag.append(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
    });
    walk(el); el.dataset.splitDone = '1';
    return $$('.w > span', el);
  }

  function onApproach(els, prepare, play, { ahead = '0px 0px 25% 0px', enter = '0px 0px -12% 0px' } = {}) {
    const playIO = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { playIO.unobserve(e.target); play(e.target); } }), { rootMargin: enter });
    const prepIO = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return; prepIO.unobserve(e.target);
      if (e.boundingClientRect.top < innerHeight * 0.88) return;
      prepare(e.target); playIO.observe(e.target);
    }), { rootMargin: ahead });
    els.forEach((el) => prepIO.observe(el));
  }

  async function initMotion() {
    const { gsap, ScrollTrigger, Lenis } = window;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    const stacks = $$('[data-stack]');
    const setTops = () => stacks.forEach((el) => (el.style.top = Math.min(0, innerHeight - el.offsetHeight) + 'px'));
    const hs = $('.hscroll'), track = hs && $('.hscroll__track', hs);
    const dist = () => (track ? Math.max(0, track.scrollWidth - innerWidth) : 0);
    const hsSize = () => { if (hs) hs.style.height = dist() + innerHeight + 'px'; };
    ScrollTrigger.addEventListener('refreshInit', () => { html.classList.add('is-measuring'); hsSize(); setTops(); });
    ScrollTrigger.addEventListener('refresh', () => html.classList.remove('is-measuring'));

    const bar = $('.progress'), nav = $('.nav');
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => {
      bar.style.transform = `scaleX(${self.progress})`;
      nav.classList.toggle('is-hidden', self.direction === 1 && self.scroll() > innerHeight * 0.8);
    } });
    await yieldToMain();

    const journey = $('#journey');
    if (journey) initJourney(journey, gsap, ScrollTrigger);
    await yieldToMain();

    if (hs) {
      hsSize();
      gsap.to(track, { x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: hs, start: 'top top', end: () => '+=' + dist(), scrub: true, invalidateOnRefresh: true } });
    }
    setTops();
    await yieldToMain();

    onApproach($$('[data-split]'),
      (el) => gsap.set(splitWords(el), { yPercent: 110 }),
      (el) => gsap.to(splitWords(el), { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.045 }));

    onApproach($$('[data-reveal]'),
      (el) => gsap.set(el, { autoAlpha: 0, y: 28 }),
      (el) => gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out', delay: (+el.dataset.reveal || 0) * 0.08 }));

    const fmt = (v, d) => v.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });
    onApproach($$('[data-count]'), () => {}, (el) => {
      const end = parseFloat(el.dataset.count), d = +(el.dataset.decimals || 0), suf = el.dataset.suffix || '', o = { v: 0 };
      gsap.to(o, { v: end, duration: 1.6, ease: 'power3.out', onUpdate: () => (el.textContent = fmt(o.v, d) + suf) });
    });
    await yieldToMain();

    $$('[data-fill]').forEach((el) => {
      let words = null, on = false;
      const update = () => {
        const r = el.getBoundingClientRect();
        const p = clamp((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35));
        words.forEach((w, i) => (w.style.opacity = 0.2 + 0.8 * clamp(p * words.length - i)));
      };
      new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !words) words = splitWords(el);
        on = e.isIntersecting; if (on) update();
      }, { rootMargin: '10% 0px' }).observe(el);
      lenis.on('scroll', () => on && update());
    });

    $$('[data-echo]').forEach((el) => gsap.fromTo(el, { '--echo': '0.45em' }, { '--echo': '0.07em', ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: el, start: 'top 90%', end: 'center 40%', scrub: true } }));

    $$('[data-float]').forEach((el) => gsap.fromTo(el, { yPercent: 12 * (+el.dataset.float || 1) }, { yPercent: -12 * (+el.dataset.float || 1), ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true } }));

    wm && gsap.fromTo(wm, { yPercent: 100 }, { yPercent: 0, ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: wm.parentElement, start: 'top bottom', end: 'bottom bottom', scrub: true } });

    const rib = $('.ribbon__track');
    if (rib) lenis.on('scroll', ({ velocity }) => gsap.to(rib, { skewX: clamp(-velocity * 0.25, -10, 10), duration: 0.4, overwrite: true }));

    ScrollTrigger.refresh();
  }

  /* ---------- Secuencia de frames en canvas ---------- */
  function frameSequence(canvas, { count, src, onFirst }) {
    const ctx = canvas.getContext('2d');
    const frames = new Array(count);
    let target = 0, drawn = -1;
    const nearest = (i) => { for (let d = 0; d < count; d++) { if (frames[i - d]) return i - d; if (frames[i + d]) return i + d; } return -1; };
    const draw = () => {
      const k = nearest(target); if (k < 0 || k === drawn) return;
      const im = frames[k], cw = canvas.width, ch = canvas.height;
      const s = Math.min(cw / im.naturalWidth, ch / im.naturalHeight);
      const w = im.naturalWidth * s, h = im.naturalHeight * s;
      ctx.clearRect(0, 0, cw, ch); ctx.drawImage(im, (cw - w) / 2, (ch - h) / 2, w, h); drawn = k;
    };
    const fit = () => {
      const r = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr); drawn = -1; draw();
    };
    new ResizeObserver(fit).observe(canvas);
    const order = [count - 1], seen = new Set([0, count - 1]);
    for (let step = 2 ** Math.ceil(Math.log2(count)); step >= 1; step /= 2)
      for (let i = 0; i < count; i += step) if (!seen.has(i)) { seen.add(i); order.push(i); }
    const load = (i) => { const im = new Image(); im.decoding = 'async'; im.src = src(i); return im.decode().then(() => im, () => null); };
    let q = 0, inflight = 0;
    const pump = () => {
      while (inflight < 6 && q < order.length) {
        const i = order[q++]; inflight++;
        load(i).then((im) => { inflight--; if (im) { frames[i] = im; draw(); } pump(); });
      }
    };
    load(0).then((im) => { if (im) { frames[0] = im; fit(); onFirst && onFirst(); } pump(); });
    return { set(p) { target = Math.round(clamp(p) * (count - 1)); draw(); }, at(i) { target = i; draw(); } };
  }

  /* ---------- Recorrido fijado con pasos ---------- */
  function initJourney(journey, gsap, ScrollTrigger) {
    const visual = $('.journey__visual', journey);
    const count = isMobile ? 48 : 96, dir = isMobile ? 'm' : 'd';
    const seq = frameSequence($('canvas', visual), {
      count, src: (i) => `frames/hero/${dir}/${String(i + 1).padStart(4, '0')}.webp`,
      onFirst: () => visual.classList.add('is-ready'),
    });
    const steps = $$('.step', journey), items = $$('.steps-bar__item', journey), annot = $('.annot', journey);
    const cuts = (journey.dataset.cuts ? journey.dataset.cuts.split(',').map(Number) : steps.map((_, k) => k / steps.length)).concat(1.0001);
    const spots = $$('.hotspot', journey).map((el) => { const [a, b] = el.dataset.at.split('-').map(Number); return { el, a, b, dir: el.classList.contains('hotspot--l') ? -1 : 1 }; });
    let current = 0;
    const show = (i) => {
      if (i === current || !steps[i]) return;
      gsap.to(steps[current], { autoAlpha: 0, y: -24, duration: 0.3, ease: 'power2.in', overwrite: true });
      gsap.fromTo(steps[i], { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out', delay: 0.12, overwrite: true });
      current = i;
    };
    ScrollTrigger.create({
      trigger: journey, start: 'top top', end: 'bottom bottom',
      onUpdate: ({ progress: p }) => {
        seq.set(p);
        const i = Math.max(0, cuts.findIndex((c, k) => p >= c && p < cuts[k + 1]));
        show(i);
        items.forEach((el, k) => { el.style.setProperty('--p', clamp((p - cuts[k]) / (cuts[k + 1] - cuts[k]))); el.classList.toggle('is-on', k === i); });
        if (annot) annot.style.opacity = 1 - clamp(p / 0.08);
        spots.forEach(({ el, a, b, dir }) => {
          const o = clamp((p - a) / 0.04) * clamp((b - p) / 0.04);
          el.style.opacity = o; el.style.transform = `translateX(${(1 - o) * dir * 16}px)`;
        });
      },
    });
  }
})();
