/* Финес Студио — site runtime */
(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const typo = s => esc(s).replace(/ (—|–)/g,'\u00a0$1').replace(/(^|[\s(«])([а-яёА-ЯЁa-zA-Z]{1,2}) /g,'$1$2\u00a0');
const get = (o, p) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), o);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const THEMES = [
  { id: 'light',   name: 'Светлая', sw: 'linear-gradient(135deg,#fbfaf7 50%,#f2501c 50%)' },
  { id: 'dark',    name: 'Тёмная',  sw: 'linear-gradient(135deg,#0c0b0a 50%,#ff6a33 50%)' }
];

let C = null;

/* ---------- Load content ---------- */
async function load() {
  let data = null;
  
  if (!data) { try { data = await (await fetch('assets/content.json', { cache: 'no-cache' })).json(); } catch {} }
  return data;
}

/* ---------- Theme ---------- */
function applyTheme(id, animate, origin) {
  if (!THEMES.find(t => t.id === id)) id = 'light';
  const set = () => {
    document.documentElement.dataset.theme = id;
    const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
    $('meta[name=theme-color]').setAttribute('content', bg || '#fff');
    $$('[data-theme-id]').forEach(b => b.setAttribute('aria-pressed', b.dataset.themeId === id));
  };
  if (animate && document.startViewTransition && !reduced) {
    const x = origin ? origin.x : innerWidth - 60, y = origin ? origin.y : 28;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(set);
    vt.ready.then(() => document.documentElement.animate(
      { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 700, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' }));
  } else set();
}
function buildThemeUI() {
  const allow = C.settings?.themeSwitcher !== false;
  const saved = allow ? localStorage.getItem('kompas-theme') : null;
  applyTheme(saved || C.settings?.theme || 'light');
  if (!allow) { $('#themeBtn').hidden = true; $('#footThemes').hidden = true; return; }
  $('#themeGrid').innerHTML = THEMES.map(t => `<button class="swatch" data-theme-id="${t.id}"><b style="background:${t.sw}"></b>${t.name}</button>`).join('');
  $('#footThemes').innerHTML = THEMES.map(t => `<button data-theme-id="${t.id}" title="${t.name}" aria-label="Тема: ${t.name}" style="background:${t.sw}"></button>`).join('');
  applyTheme(document.documentElement.dataset.theme);
  const pop = $('#themePop'), btn = $('#themeBtn');
  const toggle = (open) => { pop.classList.toggle('open', open); btn.setAttribute('aria-expanded', open); };
  btn.addEventListener('click', e => { e.stopPropagation(); toggle(!pop.classList.contains('open')); });
  document.addEventListener('click', e => { if (!pop.contains(e.target)) toggle(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });
  $$('[data-theme-id]').forEach(b => b.addEventListener('click', e => {
    const id = b.dataset.themeId; localStorage.setItem('kompas-theme', id);
    applyTheme(id, true, { x: e.clientX, y: e.clientY });
  }));
}

/* ---------- Render ---------- */
function render() {
  document.title = C.brand?.seoTitle || document.title;
  if (C.brand?.seoDescription) $('meta[name=description]').setAttribute('content', C.brand.seoDescription);
  $$('[data-bind]').forEach(el => { const v = get(C, el.dataset.bind); if (v != null) el.innerHTML = typo(v); });
  $$('[data-tg]').forEach(a => { a.href = C.brand?.telegram || '#contact'; a.target = '_blank'; a.rel = 'noopener'; });
  if (C.hero?.ctaSecondaryHref) $('#heroSecondary').href = C.hero.ctaSecondaryHref;

  // nav
  const nav = (C.nav || []).map(n => `<a href="${esc(n.href)}">${esc(n.label)}</a>`).join('');
  $('#navLinks').innerHTML = nav;
  $('#mmenu').innerHTML = nav + `<a href="#contact">Связаться</a>`;

  // hero title: newline = line, [text] = gradient
  let wi = 0;
  $('#heroTitle').innerHTML = String(C.hero?.title || '').split('\n').map(line => {
    const parts = line.split(/(\[[^\]]+\])/).filter(Boolean);
    return '<span class="line">' + parts.map(p => {
      const g = p.startsWith('[') && p.endsWith(']'); const txt = g ? p.slice(1, -1) : p;
      return txt.split(/(\s+)/).map(w => /^\s+$/.test(w) || !w ? w : `<span class="w"><span class="${g ? 'grad' : ''}" style="transition-delay:${0.12 + (wi++) * 0.07}s">${esc(w)}</span></span>`).join('');
    }).join('') + '</span>';
  }).join('');

  // hero background
  const hb = C.settings?.heroBg || {};
  const hero = $('#hero'), bg = $('#heroBg');
  $$('.hero-photo,.hero-dim', bg).forEach(n => n.remove());
  if (hb.type === 'image' && hb.image) {
    hero.classList.add('on-photo');
    bg.querySelector('.aura').style.display = 'none';
    bg.insertAdjacentHTML('afterbegin', `<div class="hero-photo" style="background-image:url('${esc(hb.image)}')"></div><div class="hero-dim" style="opacity:${(Number(hb.dim ?? 45)) / 100}"></div>`);
  } else if (hb.type === 'none') {
    hero.classList.remove('on-photo'); bg.querySelector('.aura').style.display = 'none';
  } else { hero.classList.remove('on-photo'); bg.querySelector('.aura').style.display = ''; }

  // statement
  $('#statement').innerHTML = String(C.statement?.text || '').split(/\s+/).filter(Boolean).map(w => `<span>${esc(w)}</span>`).reduce((a, w, i, arr) => a + w + (i < arr.length - 1 ? (/^<span>[а-яёa-z]{1,2}<\/span>$/i.test(w) || /^<span>[—–]/.test(arr[i + 1]) ? '\u00a0' : ' ') : ''), '');
  if (reduced) $$('#statement span').forEach(s => s.classList.add('lit'));

  // services bento
  $('#bento').innerHTML = (C.services?.items || []).map((s, i) => `
    <article class="tile rv d${i % 2 + 1}" data-kind="${esc(s.kind)}">
      <h3>${typo(s.title)}</h3><p>${typo(s.text)}</p>
      <div class="meta">${s.price ? `<span class="chip acc">${esc(s.price)}</span>` : ''}${s.term ? `<span class="chip">${esc(s.term)}</span>` : ''}</div>
      <div class="mock">${mock(s.kind)}</div>
    </article>`).join('');

  // compare
  const cm = C.compare || {};
  $('#cmp').innerHTML = `<div class="cmp-row cmp-head"><div class="l"></div><div class="a">${esc(cm.colA)}</div><div class="b">${esc(cm.colB)}</div></div>` +
    (cm.rows || []).map(r => `<div class="cmp-row"><div class="l">${esc(r.label)}</div><div class="a">${typo(r.a)}</div><div class="b">${typo(r.b)}</div></div>`).join('');

  // process
  $('#proc').innerHTML = (C.process?.steps || []).map((s, i) => `<div class="pstep" style="--dl:${0.2 + i * 0.5}s"><span class="n">0${i + 1}</span><h4>${typo(s.title)}</h4><p>${typo(s.text)}</p></div>`).join('');

  // guarantees (под сравнением)
  const g = $('#guar'); if (g) g.innerHTML = (cm.guarantees || []).map((x, i) => `<div class="gcard rv d${i % 3 + 1}"><span class="gn">${String(i + 1).padStart(2, '0')}</span><h3>${typo(x.title)}</h3><p>${typo(x.text)}</p></div>`).join('');

  // faq
  $('#faqList').innerHTML = (C.faq?.items || []).map((f, i) => `
    <div class="qa"><button aria-expanded="false" aria-controls="qa${i}"><span class="num">${String(i + 1).padStart(2, '0')}</span><span class="qt">${typo(f.q)}</span><span class="pm" aria-hidden="true"></span></button>
    <div class="ans" id="qa${i}"><div><p>${typo(f.a)}</p></div></div></div>`).join('');
  $$('.qa button').forEach(b => b.addEventListener('click', () => { const q = b.parentElement, o = !q.classList.contains('open'); q.classList.toggle('open', o); b.setAttribute('aria-expanded', o); }));

  // contacts
  $('#tgList').innerHTML = (C.contact?.telegram ? [{ link: C.contact.telegram, handle: C.contact.handle || '@' + C.contact.telegram.split('/').pop(), role: C.contact.note || 'Telegram' }] : []).map(p => `
    <a class="tg tg-one" href="${esc(p.link)}" target="_blank" rel="noopener"><span><strong>${esc(p.handle)}</strong><small>${esc(p.role || 'Telegram')}</small></span>
    <span class="go"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span></a>`).join('');
}

function mock(kind) {
  if (kind === 'bot') return `<div class="m-chat" data-chat></div>`;
  if (kind === 'crm') return `<div class="m-crm" data-crm>
    <div class="m-col"><small>Новые</small><div class="m-card" data-mv>ООО «Вектор»<u>Заявка с сайта</u></div><div class="m-card">Анна К.<u>Telegram</u></div></div>
    <div class="m-col"><small>В работе</small><div class="m-card">Студия «Лофт»<u>КП отправлено</u></div></div>
    <div class="m-col"><small>Сделка</small><div class="m-card">Кофейня «Зерно»<u>Оплачено</u></div></div></div>`;
  if (kind === 'web') return `<div class="m-web"><div class="m-bar"><i></i><i></i><i></i><span>client.ru/booking</span></div>
    <div class="m-page"><b>Онлайн-запись</b><div class="m-days"><span>Пн 4</span><span class="on">Вт 5</span><span>Ср 6</span><span>Чт 7</span></div>
    <div class="m-slots"><span>10:00</span><span class="on">12:30</span><span>15:00</span></div><div class="m-btn">Записаться и оплатить</div></div></div>`;
  if (kind === 'int') return `<div class="m-int"><div class="m-node">Сайт</div><div class="m-wire"><i></i></div><div class="m-node hub">CRM</div><div class="m-wire"><i></i></div><div class="m-node">1С</div>
    <div class="m-log"><span>✓ Заявка №1287 → CRM</span><span>✓ Счёт выставлен в 1С</span><span>✓ Уведомление в Telegram</span></div></div>`;
  if (kind === 'ai') return `<div class="m-ai" data-ai><div class="m-q">Вы работаете в воскресенье?</div><div class="m-a"><span class="orb"><i></i></span><p></p></div></div>`;
  return `<div class="m-cont"><div class="m-post"><div class="ph"></div><i></i><i></i></div><div class="m-post"><div class="ph"></div><i></i><i></i></div><div class="m-post"><div class="ph"></div><i></i><i></i></div></div>`;
}

/* ---------- Mock animations ---------- */
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function runChat(box) {
  const script = [['me', 'Хочу записаться на стрижку'], ['bot', 'Выберите удобное время:'], ['kb'], ['me', 'Завтра, 14:00'], ['bot', 'Готово! Напомню за час до визита ✓']];
  while (true) {
    box.innerHTML = '';
    for (const [who, text] of script) {
      if (who === 'kb') { const k = document.createElement('div'); k.className = 'kb'; k.innerHTML = '<span>12:00</span><span>14:00</span><span>17:30</span>'; box.append(k); await sleep(60); k.classList.add('show'); await sleep(1100); continue; }
      const b = document.createElement('div'); b.className = 'b ' + who;
      if (who === 'bot') { b.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>'; box.append(b); await sleep(40); b.classList.add('show'); await sleep(900); b.textContent = text; }
      else { b.textContent = text; box.append(b); await sleep(40); b.classList.add('show'); }
      await sleep(1000);
    }
    await sleep(3200);
  }
}
async function runCrm(box) {
  const cols = $$('.m-col', box);
  while (true) {
    for (let step = 0; step < 2; step++) {
      await sleep(1700);
      const card = $('[data-mv]', box); if (!card) return;
      const from = card.getBoundingClientRect();
      const target = cols[(cols.indexOf(card.parentElement) + 1) % cols.length];
      target.insertBefore(card, target.children[1]);
      const to = card.getBoundingClientRect();
      card.classList.add('mv');
      card.animate([{ transform: `translate(${from.left - to.left}px,${from.top - to.top}px) rotate(-3deg) scale(1.04)` }, { transform: 'none' }], { duration: 850, easing: 'cubic-bezier(.65,0,.35,1)' });
      await sleep(900); card.classList.remove('mv');
    }
    await sleep(1800);
    const card = $('[data-mv]', box); cols[0].insertBefore(card, cols[0].children[1]);
    card.animate([{ opacity: 0 }, { opacity: 1 }], 400);
  }
}
async function runAi(box) {
  const p = $('p', box); const text = 'Да, в воскресенье с 10 до 18. Записать вас? Свободно в 12:00 и 15:30.';
  while (true) {
    p.innerHTML = '<span class="caret"></span>'; await sleep(900);
    for (let i = 1; i <= text.length; i++) { p.innerHTML = esc(text.slice(0, i)) + '<span class="caret"></span>'; await sleep(28 + Math.random() * 30); }
    await sleep(4200);
  }
}

/* ---------- Motion ---------- */
function motion() {
  // reveal
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
    const k = e.target.dataset.kind;
    if (!reduced && k) {
      if (k === 'bot') runChat($('[data-chat]', e.target));
      if (k === 'crm') runCrm($('[data-crm]', e.target));
      if (k === 'ai') runAi($('[data-ai]', e.target));
    } else if (reduced && k === 'ai') { $('[data-ai] p', e.target).textContent = 'Да, в воскресенье с 10 до 18. Записать вас? Свободно в 12:00 и 15:30.'; }
    else if (reduced && k === 'bot') { $('[data-chat]', e.target).innerHTML = '<div class="b me show">Хочу записаться на стрижку</div><div class="b bot show">Выберите удобное время:</div><div class="kb show"><span>12:00</span><span>14:00</span><span>17:30</span></div><div class="b me show">Завтра, 14:00</div><div class="b bot show">Готово! Напомню за час до визита ✓</div>'; }
  }), { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
  $$('.rv,.tile,.proc').forEach(el => io.observe(el));

  // tile spotlight
  $$('.tile').forEach(t => t.addEventListener('pointermove', e => { const r = t.getBoundingClientRect(); t.style.setProperty('--mx', (e.clientX - r.left) + 'px'); t.style.setProperty('--my', (e.clientY - r.top) + 'px'); }));

  // scroll-linked
  const nav = $('#nav'), prog = $('#progress'), st = $('.statement .pin'), words = $$('#statement span'), heroIn = $('.hero-in');
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const y = scrollY, H = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('scrolled', y > 10);
    prog.style.transform = `scaleX(${H > 0 ? y / H : 0})`;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // anchor smooth (only on clicks; wheel/trackpad stays native)
  document.addEventListener('click', e => { const a = e.target.closest('a[href^="#"]'); if (!a) return; const id = a.getAttribute('href'); const t = id.length > 1 ? $(id) : null; if (!t && id !== '#top') return; e.preventDefault(); const y = id === '#top' ? 0 : t.getBoundingClientRect().top + scrollY - 64; scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' }); });

  // mobile menu
  $('#burger').addEventListener('click', () => document.body.classList.toggle('menu-open'));
  $('#mmenu').addEventListener('click', e => { if (e.target.closest('a')) document.body.classList.remove('menu-open'); });
}


/* ---------- Boot ---------- */
(async () => {
  C = await load();
  if (!C) { document.body.classList.remove('booting'); return; }
  buildThemeUI();
  render();
  motion();
  document.body.classList.remove('booting'); setTimeout(() => document.body.classList.add('ready'), 60);
})();
})();
