(() => {
  'use strict';
  const TG = 'https://t.me/fines_studio';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0') + '\u00a0₽';
  const MAX_MSG = 1500;
  const clean = (v, max) => String(v || '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F<>]/g, '').replace(/[ \t]+/g, ' ').trim().slice(0, max);
  const tgLink = text => TG + '?text=' + encodeURIComponent(clean(text, MAX_MSG));
  const openTg = url => { const w = window.open(url, '_blank', 'noopener,noreferrer'); if (!w) window.location.href = url; };
  // anti-spam: 10 s lock between sends (shared by form and quiz)
  let lastSend = 0;
  const canSend = () => Date.now() - lastSend >= 10000;
  const markSent = btn => {
    lastSend = Date.now();
    if (!btn) return;
    btn.disabled = true; btn.setAttribute('aria-disabled', 'true');
    const label = btn.firstChild.textContent;
    let left = 10;
    const tick = () => { if (left <= 0) { btn.disabled = false; btn.removeAttribute('aria-disabled'); btn.firstChild.textContent = label; return; } btn.firstChild.textContent = 'Открыли Telegram · ещё раз через ' + left + ' с '; left--; setTimeout(tick, 1000); };
    tick();
  };

  /* ---------- header: sticky state + burger ---------- */
  const hdr = $('#hdr'), nav = $('#nav'), burger = $('#burger');
  const onScroll = () => hdr.classList.toggle('is-stuck', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  window.addEventListener('scroll', () => { if (window.scrollY < 200) document.querySelectorAll('.nav a.is-active').forEach(a => a.classList.remove('is-active')); }, { passive: true });

  const setMenu = open => {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  };
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  $$('a', nav).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); burger.focus(); } });
  document.addEventListener('click', e => { if (nav.classList.contains('is-open') && !nav.contains(e.target) && !burger.contains(e.target)) setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 1024) setMenu(false); });

  /* ---------- active section in nav ---------- */
  const navLinks = $$('.nav a[href^="#"]');
  const secs = navLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting && window.scrollY > 200) navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(s => io.observe(s));
  }

  /* ---------- Telegram bot chat in phone ---------- */
  const chat = $('#tgChat'), status = $('#tgStatus');
  const script = [
    { me: true, t: '/start' },
    { t: 'Здравствуйте! Я помогу записаться. Выберите услугу:' },
    { kb: ['Стрижка', 'Окрашивание', 'Маникюр', 'Консультация'], pick: 0 },
    { me: true, t: 'Стрижка' },
    { t: 'Свободно завтра:' },
    { kb: ['10:00', '12:30', '15:00', '18:30'], pick: 2 },
    { me: true, t: '15:00' },
    { t: 'Готово ✓ Вы записаны на завтра в 15:00. Напомню за 2\u00a0часа.' },
    { me: true, t: 'Спасибо!' },
    { t: 'Хорошего дня! Если планы изменятся, нажмите «Перенести».' }
  ];
  let clock = 14 * 60 + 2;
  const time = () => { clock += 1; const h = Math.floor(clock / 60) % 24, m = clock % 60; return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0'); };
  const add = el => { chat.appendChild(el); while (chat.children.length > 9) chat.removeChild(chat.firstChild); };
  const bubble = (txt, me) => { const m = document.createElement('div'); m.className = 'msg ' + (me ? 'msg--me' : 'msg--bot'); m.textContent = txt; const s = document.createElement('small'); s.textContent = time() + (me ? ' ✓✓' : ''); m.appendChild(s); return m; };
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  async function runChat() {
    if (reduce) { // static conversation
      script.slice(0, 8).forEach(s => {
        if (s.kb) return;
        add(bubble(s.t, s.me));
      });
      return;
    }
    // eslint-disable-next-line no-constant-condition
    while (true) {
      chat.replaceChildren(); clock = 14 * 60 + 2;
      for (const s of script) {
        if (s.kb) {
          const kb = document.createElement('div'); kb.className = 'msg-kb';
          s.kb.forEach((b, i) => { const sp = document.createElement('span'); sp.textContent = b; sp.dataset.i = i; kb.appendChild(sp); });
          add(kb); await sleep(1100);
          kb.children[s.pick].classList.add('on'); await sleep(450);
          continue;
        }
        if (!s.me) {
          status.textContent = 'печатает…';
          const ty = document.createElement('div'); ty.className = 'typing'; for (let k = 0; k < 3; k++) ty.appendChild(document.createElement('i'));
          add(ty); await sleep(900 + Math.min(s.t.length * 14, 900)); ty.remove();
          status.textContent = 'бот';
        }
        add(bubble(s.t, s.me));
        await sleep(s.me ? 700 : 1300);
      }
      await sleep(3500);
    }
  }
  runChat();

  /* ---------- services filter chips ---------- */
  const bento = $('#bento'), empty = $('#bentoEmpty');
  const cards = $$('.svc', bento);
  $$('.chip[data-filter]').forEach(chip => chip.addEventListener('click', () => {
    const f = chip.dataset.filter;
    $$('.chip[data-filter]').forEach(c => { const on = c === chip; c.classList.toggle('is-on', on); c.setAttribute('aria-pressed', String(on)); });
    let shown = 0;
    cards.forEach(c => {
      const ok = f === 'all' || c.dataset.tags.split(' ').includes(f);
      c.classList.toggle('is-hidden', !ok);
      if (ok) { shown++; c.classList.remove('is-pop'); void c.offsetWidth; c.classList.add('is-pop'); }
    });
    bento.classList.toggle('is-filtered', f !== 'all');
    bento.classList.toggle('one', shown === 1);
    empty.hidden = shown !== 0;
  }));

  /* ---------- "Обсудить" links prefill message ---------- */
  $$('[data-ask]').forEach(a => { a.href = tgLink('Здравствуйте! Интересует: ' + a.dataset.ask + '. Хочу обсудить задачу.'); });
  $$('[data-msg]').forEach(a => { a.href = tgLink(a.dataset.msg); });

  /* ---------- calculator ---------- */
  // Base prices and terms — from content.json (services.items)
  const BASE = {
    bot: { name: 'Telegram-бот', price: 15000, days: 3 },
    crm: { name: 'CRM под вас', price: 40000, days: 7 },
    web: { name: 'Веб-сервис или сайт', price: 30000, days: 5 },
    int: { name: 'Интеграция и автоматизация', price: 15000, days: 2 }
  };
  const SCOPE = [
    { name: 'Базовый', k: 1, d: 0, hint: 'Базовый: основной сценарий без лишнего.' },
    { name: 'Расширенный', k: 1.6, d: 4, hint: 'Расширенный: несколько сценариев, роли пользователей, отчёты.' },
    { name: 'Большой', k: 2.6, d: 10, hint: 'Большой: много сценариев и связей. Делим на этапы и оплату тоже.' }
  ];
  const ADD = {
    pay: { name: 'Приём оплаты', price: 8000, days: 1 },
    admin: { name: 'Админ-панель', price: 12000, days: 2 },
    sync: { name: 'Связка с таблицами, CRM или 1С', price: 10000, days: 2 },
    notify: { name: 'Рассылки и уведомления', price: 5000, days: 1 },
    ai: { name: 'AI-ответы на вопросы', price: 12000, days: 2 }
  };
  const range = $('#calcScope'), outPrice = $('#outPrice'), outTerm = $('#outTerm'), outPre = $('#outPre'), outList = $('#outList'), send = $('#calcSend'), hint = $('#scopeHint');
  const daysWord = n => { const a = n % 10, b = n % 100; return (a === 1 && b !== 11) ? 'дня' : 'дней'; };
  let lastTotal = 0;

  function calc() {
    const type = ($('input[name=type]:checked') || {}).value || 'bot';
    const b = BASE[type], sc = SCOPE[+range.value];
    const adds = $$('#calcAdd input:checked').map(i => ADD[i.value]);
    const base = Math.round(b.price * sc.k / 1000) * 1000;
    const total = base + adds.reduce((s, a) => s + a.price, 0);
    const days = b.days + sc.d + adds.reduce((s, a) => s + a.days, 0);
    range.style.setProperty('--p', (range.value / 2 * 100) + '%');
    range.setAttribute('aria-valuetext', sc.name);
    hint.textContent = sc.hint;
    outPrice.textContent = 'от ' + fmt(total);
    outTerm.textContent = 'от ' + days + ' ' + daysWord(days);
    outPre.textContent = fmt(Math.round(total / 2));
    outList.replaceChildren();
    const rows = [[b.name + ' · ' + sc.name.toLowerCase(), base]].concat(adds.map(a => [a.name, a.price]));
    rows.forEach(([n, p]) => { const li = document.createElement('li'); li.append(document.createElement('span'), document.createElement('span')); li.children[0].textContent = n; li.children[1].textContent = (p === base && n.startsWith(b.name) ? '' : '+ ') + fmt(p); outList.appendChild(li); });
    if (total !== lastTotal && !reduce) { outPrice.classList.remove('bump'); void outPrice.offsetWidth; outPrice.classList.add('bump'); }
    lastTotal = total;
    const msg = 'Здравствуйте! Посчитал на сайте ориентир:\n— ' + b.name + ', объём: ' + sc.name.toLowerCase() +
      (adds.length ? '\n— Дополнительно: ' + adds.map(a => a.name.toLowerCase()).join(', ') : '') +
      '\n— Ориентир: от ' + fmt(total) + ', от ' + days + ' ' + daysWord(days) + '\nХочу обсудить задачу.';
    send.href = tgLink(msg);
  }
  $$('#calc input').forEach(i => i.addEventListener('input', calc));
  $$('#calc input').forEach(i => i.addEventListener('change', calc));
  calc();

  // "Рассчитать" on a service card → preselect type and jump to calc
  const goCalc = type => {
    const r = $('input[name=type][value="' + type + '"]');
    if (r) { r.checked = true; calc(); }
    $('#calc').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };
  $$('[data-calc]').forEach(b => b.addEventListener('click', () => goCalc(b.dataset.calc)));

  // Footer service links → reset filter so card is visible
  $$('[data-jump]').forEach(a => a.addEventListener('click', () => { const all = $('.chip[data-filter="all"]'); if (all && !all.classList.contains('is-on')) all.click(); }));

  /* ---------- FAQ accordion ---------- */
  $$('#acc .acc-i').forEach(item => {
    const btn = $('button', item);
    btn.addEventListener('click', () => {
      const open = !item.classList.contains('is-open');
      $$('#acc .acc-i.is-open').forEach(o => { if (o !== item) { o.classList.remove('is-open'); $('button', o).setAttribute('aria-expanded', 'false'); } });
      item.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ---------- lead form → Telegram link (4 fields, honeypot, validation) ---------- */
  const form = $('#leadForm'), err = $('#formErr');
  const showErr = (el, t) => { el.textContent = t; el.hidden = false; };
  form.addEventListener('submit', e => {
    e.preventDefault();
    if ($('#fHp').value) return;                       // honeypot: silently ignore bots
    const btn = $('button[type=submit]', form);
    if (!canSend()) { showErr(err, 'Сообщение уже собрано. Повторно можно через несколько секунд.'); return; }
    const needs = $$('input[name=need]:checked', form).map(i => clean(i.value, 40));
    const sphere = clean($('#fSphere').value, 80);
    const task = clean($('#fTask').value, 500);
    const when = clean($('#fWhen').value, 40);
    if (!needs.length && task.length < 3) { showErr(err, 'Выберите, что нужно, или опишите задачу — хотя бы пару слов.'); $('#fTask').focus(); return; }
    err.hidden = true;
    const lines = ['Здравствуйте! Пишу с сайта, хочу оценку задачи.'];
    if (needs.length) lines.push('— Нужно: ' + needs.join(', '));
    if (sphere) lines.push('— Сфера: ' + sphere);
    if (when) lines.push('— Сроки: ' + when.toLowerCase());
    if (task) lines.push('— Задача: ' + task);
    openTg(tgLink(lines.join('\n')));
    markSent(btn);
  });
  form.addEventListener('input', () => { err.hidden = true; });

  /* ---------- quiz: 4 steps → recommendation → Telegram ---------- */
  const qForm = $('#quizForm');
  if (qForm) {
    const steps = $$('.qs', qForm), bar = $('#qBar'), stepTxt = $('#qStep'), back = $('#qBack'), reset = $('#qReset');
    const pbar = bar.parentElement, qErr = $('#qErr');
    const LABELS = { need: 'Что нужно', sphere: 'Сфера', when: 'Запуск', budget: 'Бюджет' };
    const REC = { // prices and terms — content.json services.items
      bot: ['Telegram-бот', 15000, 'от 3 дней'],
      crm: ['CRM-система под ваш процесс', 40000, 'от 7 дней'],
      web: ['Веб-сервис или сайт', 30000, 'от 5 дней'],
      int: ['Интеграции и автоматизация', 15000, 'от 2 дней']
    };
    const ans = {}; let rec = null; let cur = 1;
    const show = n => {
      cur = n;
      steps.forEach(st => { const on = +st.dataset.step === n; st.hidden = !on; st.classList.toggle('is-on', on); });
      const pct = n > 4 ? 100 : n * 25;
      bar.style.width = pct + '%';
      pbar.setAttribute('aria-valuenow', String(Math.min(n, 4)));
      stepTxt.textContent = n > 4 ? 'Готово: мини-ТЗ собрано' : 'Шаг ' + n + ' из 4';
      back.hidden = n === 1; reset.hidden = n <= 4;
    };
    const focusStep = n => { const t = n > 4 ? $('#qResTitle') : $('.qs[data-step="' + n + '"] .qopt[aria-pressed=true]') || $('.qs[data-step="' + n + '"] .qopt'); if (t) t.focus({ preventScroll: true }); };
    const result = () => {
      const r = REC[rec];
      $('#qRec').textContent = r ? r[0] + ', от ' + fmt(r[1]) : 'Разберём задачу вместе — оценка бесплатная';
      $('#qRecNote').textContent = r ? 'Срок ' + r[2] + '. Точную цену назовём после бесплатной оценки и зафиксируем в договоре.' : 'Ориентиры: Telegram-бот от 15 000 ₽, CRM от 40 000 ₽, веб-сервис от 30 000 ₽.';
      const list = $('#qList'); list.replaceChildren();
      Object.keys(LABELS).forEach(k => { const li = document.createElement('li'); const a = document.createElement('span'), b = document.createElement('span'); a.textContent = LABELS[k]; b.textContent = ans[k] || '—'; li.append(a, b); list.appendChild(li); });
    };
    steps.forEach(st => {
      const key = st.dataset.key; if (!key) return;
      $$('.qopt', st).forEach(btn => {
        btn.setAttribute('aria-pressed', 'false');
        btn.addEventListener('click', () => {
          $$('.qopt', st).forEach(o => o.setAttribute('aria-pressed', String(o === btn)));
          ans[key] = clean(btn.dataset.v, 60);
          if (btn.dataset.rec) rec = btn.dataset.rec === 'unknown' ? null : btn.dataset.rec;
          const next = +st.dataset.step + 1;
          setTimeout(() => { if (next > 4) result(); show(next); focusStep(next); }, reduce ? 0 : 220);
        });
      });
    });
    back.addEventListener('click', () => { if (cur > 1) { show(cur - 1); focusStep(cur); } });
    reset.addEventListener('click', () => { Object.keys(ans).forEach(k => delete ans[k]); rec = null; $$('.qopt', qForm).forEach(o => o.setAttribute('aria-pressed', 'false')); $('#qNote').value = ''; qErr.hidden = true; show(1); focusStep(1); });
    qForm.addEventListener('submit', e => {
      e.preventDefault();
      if ($('#qHp').value) return;                      // honeypot
      if (Object.keys(LABELS).some(k => !ans[k])) { showErr(qErr, 'Ответьте на все четыре вопроса.'); return; }
      if (!canSend()) { showErr(qErr, 'Сообщение уже собрано. Повторно можно через несколько секунд.'); return; }
      qErr.hidden = true;
      const r = REC[rec];
      const lines = ['Здравствуйте! Прошёл подбор на сайте. Мини-ТЗ:'];
      Object.keys(LABELS).forEach(k => lines.push('— ' + LABELS[k] + ': ' + ans[k]));
      const note = clean($('#qNote').value, 300);
      if (note) lines.push('— Задача: ' + note);
      lines.push(r ? 'Рекомендация сайта: ' + r[0] + ', от ' + fmt(r[1]) + '.' : 'Пока не знаю, что выбрать, нужна консультация.');
      openTg(tgLink(lines.join('\n')));
      markSent($('#qSend'));
    });
    show(1);
  }

  /* ---------- reveal on scroll ---------- */
  if (!reduce && 'IntersectionObserver' in window) {
    const els = $$('.block .card:not(.quiz), .step, .g, .fear, .sec-head');
    els.forEach(el => el.classList.add('rv'));
    const ro = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => ro.observe(el));
  }
})();
