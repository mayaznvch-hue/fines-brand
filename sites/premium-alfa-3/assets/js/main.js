/* Финес Студио · вариант C — поведение страницы */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  root.classList.add('js');
  var TG = 'https://t.me/fines_studio';
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var fmt = function (n) { return n.toLocaleString('ru-RU').replace(/\u00a0/g, ' '); };

  /* ---- шапка: фон при прокрутке ---- */
  var hdr = $('.hdr');
  var onScroll = function () { hdr.classList.toggle('is-stuck', window.scrollY > 10); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- бургер ---- */
  var burger = $('#burger'), nav = $('#nav');
  var setMenu = function (open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    nav.classList.toggle('is-open', open);
    d.body.classList.toggle('menu-open', open);
  };
  burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
  $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); burger.focus(); } });
  window.addEventListener('resize', function () { if (window.innerWidth > 900 && nav.classList.contains('is-open')) setMenu(false); });

  /* ---- подсветка текущего раздела ---- */
  var links = $$('.nav a[href^="#"]');
  var secs = links.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('is-cur', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(function (s) { spy.observe(s); });

    /* ---- появление блоков ---- */
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    $$('.rv').forEach(function (el) { io.observe(el); });
  } else {
    $$('.rv').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- универсальные группы чипсов (одиночный выбор) ---- */
  function chipGroup(box, onChange) {
    var btns = $$('.chip', box);
    var attr = btns[0] && btns[0].getAttribute('role') === 'tab' ? 'aria-selected' : 'aria-checked';
    function pick(b) {
      btns.forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute(attr, String(on)); x.tabIndex = on ? 0 : -1; });
      if (onChange) onChange(b);
    }
    btns.forEach(function (b, i) {
      b.tabIndex = b.classList.contains('is-on') ? 0 : -1;
      b.addEventListener('click', function () { pick(b); });
      b.addEventListener('keydown', function (e) {
        var k = e.key, n = null;
        if (k === 'ArrowRight' || k === 'ArrowDown') n = btns[(i + 1) % btns.length];
        if (k === 'ArrowLeft' || k === 'ArrowUp') n = btns[(i - 1 + btns.length) % btns.length];
        if (n) { e.preventDefault(); n.focus(); pick(n); }
      });
    });
    return { value: function () { var on = $('.chip.is-on', box); return on ? on.dataset.v || on.dataset.f : ''; } };
  }

  /* ---- фильтр решений ---- */
  var grid = $('#svcGrid');
  chipGroup($('#svcChips'), function (b) {
    var f = b.dataset.f;
    grid.classList.toggle('is-filtered', f !== 'all');
    $$('.card', grid).forEach(function (c) {
      var show = f === 'all' || c.dataset.k === f || c.dataset.k === 'all';
      c.classList.toggle('is-out', !show);
      if (show) { c.classList.remove('is-pop'); void c.offsetWidth; c.classList.add('is-pop'); c.classList.add('in'); }
    });
  });

  /* ---- переключатель «агентство / студия» ---- */
  var seg = $('#cmpSeg'), cmp = $('#cmpList');
  var segBtns = $$('button', seg);
  seg.dataset.c = 'b';
  function setCmp(c) {
    segBtns.forEach(function (b) { var on = b.dataset.c === c; b.classList.toggle('is-on', on); b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
    seg.dataset.c = c;
    cmp.classList.add('is-swap');
    setTimeout(function () {
      $$('dd', cmp).forEach(function (dd) { dd.textContent = dd.getAttribute('data-' + c); });
      cmp.dataset.c = c;
      cmp.classList.remove('is-swap');
    }, 220);
  }
  segBtns.forEach(function (b) {
    b.addEventListener('click', function () { setCmp(b.dataset.c); });
    b.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); var o = b.dataset.c === 'a' ? 'b' : 'a'; setCmp(o); segBtns.filter(function (x) { return x.dataset.c === o; })[0].focus(); }
    });
  });

  /* ---- FAQ-аккордеон ---- */
  $$('.qa').forEach(function (qa) {
    var btn = $('button', qa), panel = $('.qa__a', qa);
    panel.hidden = false;
    panel.setAttribute('inert', '');
    btn.addEventListener('click', function () {
      var open = !qa.classList.contains('is-open');
      qa.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      if (open) panel.removeAttribute('inert'); else panel.setAttribute('inert', '');
    });
  });

  /* ======================================================================
     Безопасная сборка сообщений в Telegram
     — никакого innerHTML с пользовательским вводом (только textContent);
     — trim + сжатие пробелов, лимиты длины полей и всего сообщения;
     — encodeURIComponent при сборке ссылки;
     — honeypot: если скрытое поле заполнено, молча ничего не делаем;
     — повторная отправка блокируется на 10 секунд.
     ====================================================================== */
  var MAX_MSG = 1500, COOLDOWN = 10000;
  function clean(v, max) {
    v = String(v == null ? '' : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
    return max && v.length > max ? v.slice(0, max).trim() + '…' : v;
  }
  function tgUrl(msg) {
    msg = clean(msg);
    if (msg.length > MAX_MSG) msg = msg.slice(0, MAX_MSG - 1) + '…';
    return TG + '?text=' + encodeURIComponent(msg);
  }
  function openTg(url) {
    var w = window.open(url, '_blank');
    if (w) { try { w.opener = null; } catch (x) {} } else { window.location.href = url; }
  }
  function guard(btn, status, okText) {
    var until = +(btn.dataset.until || 0), now = Date.now();
    if (now < until) {
      status.textContent = 'Сообщение уже открыто в Telegram. Повторно можно через ' + Math.ceil((until - now) / 1000) + ' с.';
      return false;
    }
    btn.dataset.until = String(now + COOLDOWN);
    btn.disabled = true; btn.setAttribute('aria-disabled', 'true');
    status.textContent = okText;
    setTimeout(function () { btn.disabled = false; btn.removeAttribute('aria-disabled'); btn.dataset.until = '0'; }, COOLDOWN);
    return true;
  }

  /* ---- готовые тексты для CTA-ссылок с data-tg ---- */
  $$('a[data-tg]').forEach(function (a) { a.href = tgUrl(a.getAttribute('data-tg')); });

  /* ---- квиз: 4 шага → мини-ТЗ → Telegram ---- */
  (function () {
    var form = $('#quizForm'); if (!form) return;
    var panes = $$('.qz__pane', form), STEPS = 4;
    var stepEl = $('#qzStep'), bar = $('#qzBar'), barWrap = $('#qzBarWrap'), back = $('#qzBack');
    var send = $('#qzSend'), status = $('#qzStatus'), note = $('#qzNote'), hp = $('#qzHp');
    var REC = {
      bot:     { t: 'Telegram-бот', p: 15000, d: 'от 3 дней' },
      crm:     { t: 'CRM-система под ваш процесс', p: 40000, d: 'от 7 дней' },
      web:     { t: 'Веб-сервис или сайт', p: 30000, d: 'от 5 дней' },
      int:     { t: 'Интеграции и автоматизация', p: 15000, d: 'от 2 дней' },
      unknown: { t: 'Начнём с бесплатной оценки', p: 15000, d: 'срок назовём после разбора' }
    };
    var LABEL = { need: 'Что нужно', sphere: 'Сфера', when: 'Запуск', budget: 'Бюджет' };
    var ans = {}, step = 1;

    function show(n) {
      step = n;
      panes.forEach(function (p) { p.hidden = +p.dataset.step !== n; });
      var done = n > STEPS;
      stepEl.textContent = done ? 'Готово · 4 из 4' : 'Шаг ' + n + ' из ' + STEPS;
      var v = done ? STEPS : n - 1;
      bar.style.width = (v / STEPS * 100) + '%';
      barWrap.setAttribute('aria-valuenow', String(v));
      back.hidden = n === 1;
      send.disabled = !done;
      form.classList.toggle('is-done', done);
    }
    function focusPane() {
      var p = panes.filter(function (x) { return !x.hidden; })[0];
      var f = p && (p.querySelector('.qz__o') || p.querySelector('[tabindex="-1"]'));
      if (f) f.focus({ preventScroll: true });
    }
    function render() {
      var r = REC[ans.need] || null;
      $('#qzRec').textContent = r ? r.t : 'Ответьте на вопросы слева';
      var p = r ? r.p : 15000;
      $('#qzPrice').textContent = fmt(p);
      $('#qzTerm').textContent = r ? r.d : 'от 2 дней';
      $('#qzA').textContent = r ? fmt(Math.round(p / 2)) + ' ₽' : '50%';
      $('#qzB').textContent = r ? fmt(p - Math.round(p / 2)) + ' ₽' : '50%';
      var sum = $('#qzSum');
      while (sum.firstChild) sum.removeChild(sum.firstChild);
      ['need', 'sphere', 'when', 'budget'].forEach(function (k) {
        if (!ans[k]) return;
        var row = d.createElement('div'), dt = d.createElement('dt'), dd = d.createElement('dd');
        dt.textContent = LABEL[k];
        dd.textContent = k === 'need' ? ansText.need : ans[k];
        row.appendChild(dt); row.appendChild(dd); sum.appendChild(row);
      });
    }
    var ansText = {};
    $$('.qz__o', form).forEach(function (b) {
      b.addEventListener('click', function () {
        var name = b.dataset.name;
        ans[name] = b.dataset.v;
        if (name === 'need') ansText.need = clean(b.firstChild.textContent, 60);
        $$('.qz__o[data-name="' + name + '"]', form).forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', String(on)); });
        render();
        setTimeout(function () { show(step + 1); focusPane(); }, 180);
      });
      b.setAttribute('aria-pressed', 'false');
    });
    back.addEventListener('click', function () { if (step > 1) { show(step - 1); focusPane(); } });
    $('#qzAgain').addEventListener('click', function () {
      ans = {}; ansText = {}; note.value = ''; status.textContent = '';
      $$('.qz__o', form).forEach(function (x) { x.classList.remove('is-on'); x.setAttribute('aria-pressed', 'false'); });
      render(); show(1); focusPane();
    });
    function message() {
      var r = REC[ans.need];
      var lines = ['Здравствуйте! Мини-ТЗ с сайта Финес Студио:',
        '— Что нужно: ' + (ansText.need || '—'),
        '— Сфера: ' + (ans.sphere || '—'),
        '— Запуск: ' + (ans.when || '—'),
        '— Бюджет: ' + (ans.budget || '—')];
      var t = clean(note.value, 500);
      if (t) lines.push('— Задача: ' + t);
      if (r) lines.push('Ориентир с сайта: ' + r.t + ', от ' + fmt(r.p) + ' ₽.');
      lines.push('Хочу получить оценку.');
      return lines.join('\n');
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (step <= STEPS) return;
      if (hp && hp.value) { status.textContent = 'Готово.'; return; } /* honeypot: тихо игнорируем */
      var url = tgUrl(message());
      form.dataset.url = url;
      if (!guard(send, status, 'Открываем Telegram — проверьте текст и нажмите «Отправить».')) return;
      openTg(url);
    });
    render(); show(1);
  })();

  /* ---- форма заявки → Telegram ---- */
  (function () {
    var form = $('#leadForm'); if (!form) return;
    var kind = chipGroup($('#leadKind')), when = chipGroup($('#leadWhen'));
    var ta = $('#leadText'), sphere = $('#leadSphere'), err = $('#leadErr'), hp = $('#leadHp');
    var btn = $('#leadSend'), status = $('#leadStatus');
    var baseNote = status.textContent;
    ta.addEventListener('input', function () { if (clean(ta.value).length >= 3) { err.hidden = true; ta.classList.remove('is-err'); ta.removeAttribute('aria-invalid'); } });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (hp && hp.value) { status.textContent = 'Готово.'; return; } /* honeypot */
      var t = clean(ta.value, 1000), sp = clean(sphere.value, 80);
      if (t.length < 3) { err.hidden = false; ta.classList.add('is-err'); ta.setAttribute('aria-invalid', 'true'); ta.focus(); return; }
      var msg = 'Здравствуйте! Заявка с сайта Финес Студио.\n' +
        '— Что нужно: ' + kind.value() + '\n' +
        (sp ? '— Сфера: ' + sp + '\n' : '') +
        '— Задача: ' + t + '\n' +
        '— Сроки: ' + when.value() + '\n' +
        'Хочу получить оценку.';
      var url = tgUrl(msg);
      form.dataset.url = url;
      if (!guard(btn, status, 'Открываем Telegram — проверьте текст и нажмите «Отправить».')) return;
      openTg(url);
      setTimeout(function () { status.textContent = baseNote; }, COOLDOWN);
    });
  })();
})();
