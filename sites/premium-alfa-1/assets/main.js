/* Финес Студио · premium-alfa-1
   Без секретов: в коде только публичная ссылка t.me. Пользовательский ввод
   выводится только через textContent и кодируется encodeURIComponent. */
(function () {
  'use strict';
  var TG = 'https://t.me/fines_studio';
  var MAX_MSG = 1500;          // общий лимит длины сообщения
  var COOLDOWN = 10000;        // блокировка повторной отправки, мс
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fmt = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0'); };
  /* очистка пользовательского текста: управляющие символы, лишние пробелы, длина */
  var clean = function (s, max) {
    return String(s || '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u2060]/g, '').replace(/\u00a0/g, ' ')
      .replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim().slice(0, max || 800);
  };
  var tgLink = function (text) {
    var t = String(text);
    if (t.length > MAX_MSG) t = t.slice(0, MAX_MSG - 1) + '…';
    return TG + '?text=' + encodeURIComponent(String(t).replace(/\u2060/g, '').replace(/\u00a0/g, ' '));
  };
  var openTg = function (url) {
    var w = window.open(url, '_blank', 'noopener,noreferrer');
    if (!w) window.location.href = url;
  };

  /* Предзаполненный текст для CTA-ссылок (data-tg) */
  $$('a[data-tg]').forEach(function (a) { a.href = tgLink(a.getAttribute('data-tg')); });

  /* Header shadow + active nav */
  var hdr = $('#hdr');
  var onScroll = function () { hdr.classList.toggle('is-scrolled', window.scrollY > 8); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var navLinks = $$('.nav a');
  if ('IntersectionObserver' in window) {
    var secIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = '#' + e.target.id;
        navLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) secIO.observe(s); });
  }

  /* Burger menu */
  var burger = $('#burger'), mnav = $('#mnav');
  var setMenu = function (open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    mnav.hidden = !open;
    document.body.classList.toggle('lock', open);
  };
  burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
  $$('a', mnav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !mnav.hidden) { setMenu(false); burger.focus(); } });
  window.addEventListener('resize', function () { if (window.innerWidth > 900 && !mnav.hidden) setMenu(false); });

  /* Reveal on scroll */
  var rv = $$('.rv');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    rv.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px -4% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  }

  /* Card inner glow follows pointer */
  $$('.glow').forEach(function (c) {
    c.addEventListener('pointermove', function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* Compare tabs (roving tabindex) */
  var CMP = [
    ['в смете менеджеры, аккаунты, офис', 'платите только за разработку'],
    ['недели и месяцы', 'дни'],
    ['через менеджера', 'напрямую с разработчиком'],
    ['по ТЗ и допсоглашениям', 'в рабочем порядке, без допсоглашений'],
    ['после согласования ТЗ', 'через 2–3 дня']
  ];
  var cA = $('#cmpA'), cB = $('#cmpB');
  var tabs = $$('#cmpTabs .chip');
  var pickTab = function (btn, focus) {
    tabs.forEach(function (b) { var on = b === btn; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
    if (focus) btn.focus();
    var row = CMP[+btn.getAttribute('data-i')];
    [cA, cB].forEach(function (el) { el.classList.add('fade'); });
    setTimeout(function () {
      cA.textContent = row[0]; cB.textContent = row[1];
      [cA, cB].forEach(function (el) { el.classList.remove('fade'); });
    }, reduce ? 0 : 180);
  };
  tabs.forEach(function (b, i) {
    b.addEventListener('click', function () { pickTab(b, false); });
    b.addEventListener('keydown', function (e) {
      var k = e.key, n = null;
      if (k === 'ArrowRight' || k === 'ArrowDown') n = tabs[(i + 1) % tabs.length];
      if (k === 'ArrowLeft' || k === 'ArrowUp') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (k === 'Home') n = tabs[0];
      if (k === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); pickTab(n, true); }
    });
  });

  /* FAQ: one open at a time */
  var qas = $$('#faqList details');
  qas.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) qas.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ───── Quiz: 4 шага → рекомендация → мини-ТЗ в Telegram ───── */
  /* базовые цены и сроки — из content.json */
  var SVC = {
    bot: { name: 'Telegram-бот', price: 15000, term: 'от 3 дней', note: 'Запись, приём заявок, оплата, рассылки и ответы на типовые вопросы в мессенджере, которым уже пользуются ваши клиенты.' },
    crm: { name: 'CRM под вас', price: 40000, term: 'от 7 дней', note: 'Клиенты, сделки, задачи и напоминания в одной системе. Удобно работать с телефона.' },
    web: { name: 'Веб-сервис или сайт', price: 30000, term: 'от 5 дней', note: 'Личные кабинеты, сайты с онлайн-записью и оплатой, внутренние сервисы для сотрудников.' },
    int: { name: 'Интеграции и автоматизация', price: 15000, term: 'от 2 дней', note: 'Связываем сайт, CRM, таблицы, 1С и мессенджеры, чтобы данные переносились сами.' }
  };
  var NEED_LABEL = { bot: 'Telegram-бот', crm: 'CRM-система', web: 'Веб-сервис или сайт', int: 'Автоматизация или AI', unknown: 'Пока не знаю' };
  /* «Пока не знаю»: подсказка по сфере */
  var BY_SPHERE = {
    'Услуги и запись клиентов': 'bot', 'Торговля и доставка': 'bot', 'Обучение и курсы': 'bot',
    'Производство и B2B': 'crm', 'Другая сфера': 'bot'
  };

  var quiz = $('#quizBox');
  if (quiz) {
    var steps = $$('.quiz__step', quiz);
    var res = $('#quizRes'), back = $('#quizBack'), count = $('#quizCount');
    var bar = $('#quizBar'), barWrap = $('#quizBarWrap');
    var recEl = $('#quizRec'), priceEl = $('#quizPrice'), termEl = $('#quizTerm'), noteEl = $('#quizNote');
    var sendEl = $('#quizSend'), resetEl = $('#quizReset'), comment = $('#quizComment'), hp = $('#quizHp'), status = $('#quizStatus');
    var tzVals = {};
    $$('[data-tz]').forEach(function (el) { tzVals[el.getAttribute('data-tz')] = el; });
    var ans = {}, cur = 0, lastSent = 0;

    var labelOf = function (key, v) { return key === 'need' ? NEED_LABEL[v] : v; };

    var recommend = function () {
      var key = ans.need === 'unknown' ? (BY_SPHERE[ans.sphere] || 'bot') : ans.need;
      return SVC[key];
    };

    var buildMsg = function () {
      var s = recommend();
      var lines = [
        'Здравствуйте! Прошёл подбор решения на сайте Финес Студио.',
        '',
        'Мини-ТЗ:',
        '1. Что нужно: ' + labelOf('need', ans.need),
        '2. Сфера бизнеса: ' + ans.sphere,
        '3. Запуск: ' + ans.when,
        '4. Бюджет: ' + ans.budget,
        '',
        'Рекомендация сайта: ' + s.name + ', от ' + fmt(s.price) + ' ₽, ' + s.term
      ];
      var c = clean(comment.value, 300);
      if (c) lines.push('', 'О задаче: ' + c);
      lines.push('', 'Хочу получить бесплатную оценку.');
      return lines.join('\n');
    };

    var render = function (focus) {
      var done = cur >= steps.length;
      steps.forEach(function (st, i) { st.hidden = i !== cur; });
      res.hidden = !done;
      back.hidden = cur === 0;
      var p = Math.min(cur, steps.length);
      bar.style.width = (p / steps.length * 100) + '%';
      barWrap.setAttribute('aria-valuenow', String(p));
      count.textContent = done ? 'Готово · 4 из 4' : 'Шаг ' + (cur + 1) + ' из ' + steps.length;
      Object.keys(tzVals).forEach(function (k) {
        tzVals[k].textContent = ans[k] ? labelOf(k, ans[k]) : '—';
        tzVals[k].classList.toggle('is-set', !!ans[k]);
      });
      steps.forEach(function (st) {
        var k = st.getAttribute('data-key');
        $$('.qopt', st).forEach(function (b) { b.setAttribute('aria-pressed', String(ans[k] === b.getAttribute('data-v'))); });
      });
      if (done) {
        var s = recommend();
        recEl.textContent = s.name;
        priceEl.textContent = fmt(s.price);
        termEl.textContent = s.term;
        var extra = ans.need === 'unknown' ? ' Это подсказка по вашей сфере: точное решение предложим после разговора.' : '';
        noteEl.textContent = s.note + extra + ' Точную стоимость и срок назовём после разбора задачи, оценка бесплатная.';
        sendEl.href = tgLink(buildMsg());
      }
      if (focus) {
        var h = done ? recEl : $('.quiz__q', steps[cur]);
        if (h) h.focus({ preventScroll: true });
      }
    };

    steps.forEach(function (st, i) {
      var key = st.getAttribute('data-key');
      $$('.qopt', st).forEach(function (b) {
        b.addEventListener('click', function () {
          ans[key] = b.getAttribute('data-v');
          cur = i + 1;
          render(true);
        });
      });
    });
    back.addEventListener('click', function () { if (cur > 0) { cur -= 1; render(true); } });
    resetEl.addEventListener('click', function () {
      ans = {}; cur = 0; comment.value = ''; status.textContent = '';
      render(true);
    });
    comment.addEventListener('input', function () { if (cur >= steps.length) sendEl.href = tgLink(buildMsg()); });

    sendEl.addEventListener('click', function (e) {
      e.preventDefault();
      if (hp.value) return;                         // honeypot: молча игнорируем
      var now = Date.now();
      if (now - lastSent < COOLDOWN) {
        status.textContent = 'Сообщение уже открыто в Telegram. Повторно можно через ' + Math.ceil((COOLDOWN - (now - lastSent)) / 1000) + ' с.';
        return;
      }
      lastSent = now;
      var url = tgLink(buildMsg());
      sendEl.href = url;
      status.textContent = 'Открываем Telegram с вашим мини-ТЗ…';
      openTg(url);
    });
    render(false);
  }

  /* ───── Lead form → Telegram link (без бэкенда и без персональных данных) ───── */
  var form = $('#leadForm');
  if (form) {
    var task = $('#formTask'), sphere = $('#formSphere'), err = $('#formErr'), fhp = $('#formHp'), fst = $('#formStatus');
    var fLast = 0;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (fhp.value) return;                        // honeypot
      var kinds = $$('input[name="kind"]:checked', form).map(function (i) { return i.value; });
      var whenI = $('input[name="when"]:checked', form);
      var t = clean(task.value, 800), sp = clean(sphere.value, 80);
      if (!kinds.length && t.length < 5) {
        err.textContent = 'Отметьте, что нужно, или опишите задачу хотя бы парой слов.';
        task.classList.add('err'); task.focus();
        return;
      }
      err.textContent = ''; task.classList.remove('err');
      var now = Date.now();
      if (now - fLast < COOLDOWN) {
        fst.textContent = 'Заявка уже открыта в Telegram. Повторно можно через ' + Math.ceil((COOLDOWN - (now - fLast)) / 1000) + ' с.';
        return;
      }
      fLast = now;
      var msg = 'Здравствуйте! Заявка с сайта Финес Студио.';
      if (kinds.length) msg += '\nНужно: ' + kinds.join(', ');
      if (sp) msg += '\nСфера бизнеса: ' + sp;
      if (whenI) msg += '\nЗапуск: ' + whenI.value;
      if (t) msg += '\nЗадача: ' + t;
      msg += '\nХочу получить бесплатную оценку.';
      fst.textContent = 'Открываем Telegram с текстом заявки…';
      openTg(tgLink(msg));
    });
    task.addEventListener('input', function () { if (err.textContent) { err.textContent = ''; task.classList.remove('err'); } });
  }
})();
