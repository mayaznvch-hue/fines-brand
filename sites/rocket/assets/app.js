/* Финес Студио — rocket landing: interactions */
(function () {
  'use strict';
  var TG = 'https://t.me/fines_studio';
  var doc = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- hero intro ---------- */
  requestAnimationFrame(function () { requestAnimationFrame(function () { doc.classList.add('loaded'); }); });

  /* ---------- header + fab + parallax on scroll ---------- */
  var hdr = $('#hdr'), fab = $('.fab'), hero = $('.hero');
  var stickers = $$('.stk[data-speed]');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    hdr.classList.toggle('scrolled', y > 40);
    fab.classList.toggle('show', y > hero.offsetHeight * 0.8 && !isNear('#contact'));
    if (!reduce) {
      var vh = window.innerHeight;
      stickers.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var c = r.top + r.height / 2 - vh / 2;
        el.style.transform = 'translate3d(0,' + (c * parseFloat(el.dataset.speed)).toFixed(1) + 'px,0)';
      });
    }
    ticking = false;
  }
  function isNear(sel) {
    var r = $(sel).getBoundingClientRect();
    return r.top < window.innerHeight * 0.6 && r.bottom > 0;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- burger ---------- */
  var burger = $('#burger'), mnav = $('#mnav');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    mnav.setAttribute('aria-hidden', String(!open));
  }
  burger.addEventListener('click', function () { setMenu(!document.body.classList.contains('menu-open')); });
  $$('a', mnav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 1040) setMenu(false); });

  /* ---------- active nav link ---------- */
  var navLinks = $$('.nav a');
  if ('IntersectionObserver' in window) {
    var secIO = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) secIO.observe(s); });

    /* ---------- reveal on scroll ---------- */
    var revIO = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); revIO.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(function (el) {
      var sib = el.parentElement ? $$(':scope > .reveal', el.parentElement).indexOf(el) : 0;
      el.style.transitionDelay = Math.min(sib, 6) * 70 + 'ms';
      revIO.observe(el);
    });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Telegram chat mockup ---------- */
  var chat = $('#tgChat'), status = $('#tgStatus');
  var script = [
    { who: 'me', text: '/start' },
    { who: 'bot', text: 'Привет! Я бот записи 👋 Что вас интересует?' },
    { kb: ['Стрижка', 'Окрашивание', 'Маникюр'], pick: 0 },
    { who: 'bot', text: 'Выберите удобное время на пятницу:' },
    { kb: ['11:00', '14:30', '18:00'], pick: 1 },
    { who: 'bot', text: 'Записал вас на пятницу, 14:30. Пришлю напоминание за 2 часа ✂️', cls: 'ok' },
    { who: 'me', text: 'Супер, спасибо!' },
    { who: 'bot', text: 'Заявка уже в CRM у администратора 🙌' }
  ];
  var timers = [];
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function clock(i) { var m = 12 + i; return '14:' + (m < 10 ? '0' + m : m); }
  function trim() {
    var top = chat.getBoundingClientRect().top + 6;
    while (chat.children.length > 1 && chat.firstChild.getBoundingClientRect().top < top) chat.removeChild(chat.firstChild);
  }
  function addMsg(step, i) {
    var el = document.createElement('div');
    el.className = 'msg ' + step.who + (step.cls ? ' ' + step.cls : '');
    el.textContent = step.text;
    var t = document.createElement('time'); t.textContent = clock(i) + (step.who === 'me' ? ' ✓✓' : '');
    el.appendChild(t); chat.appendChild(el); trim();
  }
  function addKb(step) {
    var kb = document.createElement('div'); kb.className = 'msg-kb';
    step.kb.forEach(function (k) { var s = document.createElement('span'); s.textContent = k; kb.appendChild(s); });
    chat.appendChild(kb); trim();
    return kb;
  }
  function play() {
    timers.forEach(clearTimeout); timers = []; chat.replaceChildren();
    if (reduce) {
      script.forEach(function (s, i) { if (s.kb) { var kb = addKb(s); kb.children[s.pick].classList.add('pick'); } else addMsg(s, i); });
      return;
    }
    var t = 600;
    script.forEach(function (s, i) {
      if (s.kb) {
        later(function () { var kb = addKb(s); later(function () { kb.children[s.pick].classList.add('pick'); }, 900); later(function () { addMsg({ who: 'me', text: s.kb[s.pick] }, i); }, 1400); }, t);
        t += 2300;
      } else if (s.who === 'bot') {
        later(function () {
          status.textContent = 'печатает…';
          var ty = document.createElement('div'); ty.className = 'typing'; for (var d = 0; d < 3; d++) ty.appendChild(document.createElement('i'));
          chat.appendChild(ty); trim();
          later(function () { ty.remove(); status.textContent = 'бот'; addMsg(s, i); }, 1000);
        }, t);
        t += 1900;
      } else {
        later(function () { addMsg(s, i); }, t);
        t += 1000;
      }
    });
    later(play, t + 4500);
  }
  var phone = $('.phone'), started = false;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting && !started) { started = true; play(); } });
    }, { threshold: 0.3 }).observe(phone);
  } else play();
  $('#tgReplay').addEventListener('click', play);

  /* ---------- calculator ---------- */
  var PRICES = {
    bot: { name: 'Telegram-бот', price: 15000, days: 3 },
    crm: { name: 'CRM под вас', price: 40000, days: 7 },
    web: { name: 'Веб-сервис или сайт', price: 30000, days: 5 },
    int: { name: 'Интеграции и автоматизация', price: 15000, days: 2 }
  };
  var fmt = function (n) { return n.toLocaleString('ru-RU').replace(/\u00a0|,/g, ' ') + ' ₽'; };
  var dayWord = function (n) { var m = n % 10, h = n % 100; return (m === 1 && h !== 11) ? 'дня' : 'дней'; };
  var boxes = $$('.calc-opts input'), sumEl = $('#calcSum'), termEl = $('#calcTerm'), send = $('#calcSend');
  function bump(el) { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
  function calc() {
    var picked = boxes.filter(function (b) { return b.checked; }).map(function (b) { return PRICES[b.value]; });
    $$('.svc-add').forEach(function (btn) {
      var on = boxes.some(function (b) { return b.checked && b.value === btn.dataset.add; });
      btn.classList.toggle('on', on); btn.textContent = on ? '✓ в расчёте' : '+ в расчёт';
      btn.setAttribute('aria-pressed', String(on));
    });
    if (!picked.length) {
      sumEl.textContent = '—'; termEl.textContent = '—';
      send.href = TG + '?text=' + encodeURIComponent('Здравствуйте! Хочу обсудить задачу.');
      return;
    }
    var sum = picked.reduce(function (a, p) { return a + p.price; }, 0);
    var days = Math.max.apply(null, picked.map(function (p) { return p.days; }));
    sumEl.textContent = 'от ' + fmt(sum); termEl.textContent = 'от ' + days + ' ' + dayWord(days);
    bump(sumEl);
    var msg = 'Здравствуйте! Посчитал на сайте ориентир:\n' + picked.map(function (p) { return '• ' + p.name + ' (от ' + fmt(p.price) + ')'; }).join('\n') +
      '\nИтого: от ' + fmt(sum) + '. Хочу точную оценку.';
    send.href = TG + '?text=' + encodeURIComponent(msg);
  }
  boxes.forEach(function (b) { b.addEventListener('change', calc); });
  $$('.svc-add').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var box = boxes.filter(function (b) { return b.value === btn.dataset.add; })[0];
      box.checked = !box.checked; calc();
      if (box.checked) btn.animate && !reduce && btn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.15) rotate(-4deg)' }, { transform: 'scale(1)' }], { duration: 350 });
    });
  });
  calc();

  /* ---------- compare switch ---------- */
  var sw = $('.cmp-switch'), panel = $('#cmpPanel'), tabs = $$('.cmp-switch button');
  var SMILE = 'M32 62q18 16 36 0', MEH = 'M32 68q18 -12 36 0';
  function setCol(col, focus) {
    tabs.forEach(function (t) {
      var on = t.dataset.col === col;
      t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
      if (on) { panel.setAttribute('aria-labelledby', t.id); if (focus) t.focus(); }
    });
    sw.classList.toggle('is-a', col === 'a');
    panel.classList.toggle('is-a', col === 'a'); panel.classList.toggle('is-b', col === 'b');
    $('.cmp-face .mouth').setAttribute('d', col === 'a' ? MEH : SMILE);
    $$('.cmp-v', panel).forEach(function (v, i) {
      v.classList.add('swap');
      setTimeout(function () { v.textContent = v.dataset[col]; v.classList.remove('swap'); }, reduce ? 0 : 180 + i * 40);
    });
  }
  tabs.forEach(function (t) {
    t.addEventListener('click', function () { setCol(t.dataset.col); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); setCol(t.dataset.col === 'a' ? 'b' : 'a', true); }
    });
  });
  setCol('b');

  /* ---------- FAQ accordion ---------- */
  $$('.acc-i').forEach(function (item) {
    var btn = $('button', item);
    if (btn.getAttribute('aria-expanded') === 'true') item.classList.add('open');
    btn.addEventListener('click', function () {
      var open = !item.classList.contains('open');
      $$('.acc-i.open').forEach(function (o) { if (o !== item) { o.classList.remove('open'); $('button', o).setAttribute('aria-expanded', 'false'); } });
      item.classList.toggle('open', open); btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ---------- safe Telegram link builder ---------- */
  var MAX_MSG = 1500;
  function clean(s, max) {
    return String(s == null ? '' : s).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').replace(/[ \t]+/g, ' ').trim().slice(0, max || 400);
  }
  function tgUrl(text) {
    text = clean(text, MAX_MSG);
    return TG + '?text=' + encodeURIComponent(text);
  }
  window.FinesTG = tgUrl; // for tests only, no secrets here
  $$('a.js-tg[data-tg]').forEach(function (a) { a.href = tgUrl(a.dataset.tg); });

  /* anti-spam: 10 s cooldown between sends */
  var lastSend = 0;
  function openTg(url, form) {
    var now = Date.now();
    if (now - lastSend < 10000) return 'cooldown';
    lastSend = now;
    if (form) form.dataset.lastUrl = url;
    var w = window.open(url, '_blank', 'noopener,noreferrer');
    if (!w) window.location.href = url;
    return 'ok';
  }

  /* ---------- brief form -> t.me ---------- */
  var form = $('#briefForm'), err = $('#briefErr'), hp = $('#briefHp');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (hp.value) { form.dataset.status = 'honeypot'; return; } // bot: silently ignore
    var needs = $$('input[name="need"]:checked', form).map(function (c) { return clean(c.value, 60); });
    var text = clean($('#briefText').value, 300), when = clean($('#briefWhen').value, 60), who = clean($('#briefWho').value, 60);
    if (!needs.length && text.length < 3) {
      err.textContent = 'Отметьте, что нужно, или напишите сферу и задачу хотя бы парой слов.';
      $('#briefText').focus(); return;
    }
    var lines = ['Здравствуйте! Заявка с сайта Финес Студио.'];
    if (needs.length) lines.push('Нужно: ' + needs.join(', '));
    if (text) lines.push('Сфера и задача: ' + text);
    if (when) lines.push('Сроки: ' + when);
    if (who) lines.push('Обращаться: ' + who);
    var res = openTg(tgUrl(lines.join('\n')), form);
    form.dataset.status = res;
    err.textContent = res === 'cooldown' ? 'Заявка уже открыта в Telegram. Повторно можно через 10 секунд.' : '';
  });
  ['#briefText', '#briefWho'].forEach(function (s) { $(s).addEventListener('input', function () { if (err.textContent) err.textContent = ''; }); });

  /* ---------- quiz ---------- */
  var qz = $('#quizForm'), steps = $$('.qz-step', qz), cur = 1, TOTAL = 4;
  var REC = {
    bot: { t: 'Telegram-бот', p: 'от 15\u00a0000\u00a0₽', d: 'от 3 дней' },
    crm: { t: 'CRM под вас', p: 'от 40\u00a0000\u00a0₽', d: 'от 7 дней' },
    web: { t: 'Веб-сервис или сайт', p: 'от 30\u00a0000\u00a0₽', d: 'от 5 дней' },
    int: { t: 'Интеграции и автоматизация', p: 'от 15\u00a0000\u00a0₽', d: 'от 2 дней' }
  };
  var LABELS = { need: 'Что нужно', sphere: 'Сфера', when: 'Запуск', budget: 'Бюджет' };
  var back = $('#qzBack'), restart = $('#qzRestart'), bar = $('#qzBar'), cnt = $('#qzCount'), pb = $('.qz-bar', qz);
  function val(name) { var i = $('input[name="' + name + '"]:checked', qz); return i ? i : null; }
  function show(n) {
    cur = n;
    steps.forEach(function (s) { s.classList.toggle('is-on', +s.dataset.step === n); });
    var done = n > TOTAL;
    bar.style.width = (done ? 100 : (n - 1) / TOTAL * 100 + 12) + '%';
    cnt.textContent = done ? 'Готово' : 'Шаг ' + n + ' из ' + TOTAL;
    pb.setAttribute('aria-valuenow', String(done ? TOTAL : n));
    back.hidden = n === 1; restart.hidden = !done;
    if (done) result();
    var target = done ? $('.qz-result', qz) : $('.qz-step.is-on .qz-q', qz);
    if (target && qz.dataset.touched) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
  }
  function result() {
    var need = val('need'), key = need ? need.dataset.key : 'none', r = REC[key];
    var rec = $('#qzRec');
    rec.replaceChildren();
    if (r) {
      rec.append('Вам подойдёт: ');
      var b = document.createElement('b'); b.textContent = r.t + ', ' + r.p; rec.appendChild(b);
      rec.append(' · срок ' + r.d + '. Точную цену назовём после бесплатной оценки.');
    } else {
      rec.textContent = 'Подберём решение вместе: опишите процесс, а мы предложим бота, CRM или автоматизацию и назовём цену после бесплатной оценки.';
    }
    var ul = $('#qzSum'); ul.replaceChildren();
    Object.keys(LABELS).forEach(function (k) {
      var v = val(k); if (!v) return;
      var li = document.createElement('li'); var s = document.createElement('span'); s.textContent = LABELS[k];
      var b2 = document.createElement('b'); b2.textContent = v.value; li.append(s, b2); ul.appendChild(li);
    });
    buildQuizLink();
  }
  function buildQuizLink() {
    var need = val('need'), r = need && REC[need.dataset.key];
    var lines = ['Здравствуйте! Прошёл подбор на сайте Финес Студио.', 'Мини-ТЗ:'];
    Object.keys(LABELS).forEach(function (k) { var v = val(k); if (v) lines.push('• ' + LABELS[k] + ': ' + clean(v.value, 60)); });
    var note = clean($('#qzNote').value, 400);
    if (note) lines.push('• Задача: ' + note);
    if (r) lines.push('Рекомендация сайта: ' + r.t + ', ' + r.p + '.');
    lines.push('Хочу точную оценку.');
    var url = tgUrl(lines.join('\n'));
    $('#qzSend').href = url; qz.dataset.lastUrl = url;
  }
  $$('.q-opt input', qz).forEach(function (inp) {
    inp.addEventListener('change', function () {
      qz.dataset.touched = '1';
      var step = +inp.closest('.qz-step').dataset.step;
      setTimeout(function () { if (cur === step) show(step + 1); }, reduce ? 0 : 280);
    });
  });
  back.addEventListener('click', function () { if (cur > 1) show(Math.min(cur, TOTAL + 1) - 1); });
  restart.addEventListener('click', function () { qz.reset(); show(1); });
  $('#qzNote').addEventListener('input', buildQuizLink);
  $('#qzSend').addEventListener('click', function (e) {
    e.preventDefault(); buildQuizLink();
    var res = openTg($('#qzSend').href, qz); qz.dataset.status = res;
    $('.qz-note', qz).textContent = res === 'cooldown' ? 'Чат уже открыт. Повторно можно через 10 секунд.' : 'Откроется чат @fines_studio с готовым текстом. Оценка бесплатная, отвечаем в течение рабочего дня.';
  });
  qz.addEventListener('submit', function (e) { e.preventDefault(); });
  show(1);
})();
