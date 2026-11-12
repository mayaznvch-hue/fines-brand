/* Финес Студио — общий скрипт минималистичных версий (alfa, rocket). Без зависимостей, без сети. */
(function () {
  'use strict';
  var d = document;
  d.documentElement.classList.add('js');

  var TG = 'https://t.me/fines_studio';
  var MAX = 1500;

  function tgUrl(text) {
    text = String(text || '').replace(/\s+\n/g, '\n').trim().slice(0, MAX);
    return TG + (text ? '?text=' + encodeURIComponent(text) : '');
  }
  function openUrl(url) {
    var a = d.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    d.body.appendChild(a);
    a.click();
    d.body.removeChild(a);
  }
  function clean(v, n) {
    return String(v || '').replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, n);
  }
  // блокировка повторной отправки на 10 секунд
  function guard(btn) {
    if (btn.dataset.lock) return false;
    btn.dataset.lock = '1';
    btn.setAttribute('aria-disabled', 'true');
    setTimeout(function () { delete btn.dataset.lock; btn.removeAttribute('aria-disabled'); }, 10000);
    return true;
  }

  /* согласие: cookie и персональные данные */
  var CK = 'fines-consent';
  function getConsent() {
    try { var c = JSON.parse(localStorage.getItem(CK)); return c && c.v === 1 ? c : null; } catch (e) { return null; }
  }
  function setConsent(choice) {
    try { localStorage.setItem(CK, JSON.stringify({ v: 1, choice: choice, ts: new Date().toISOString() })); } catch (e) {}
  }
  // сюда подключать счётчики: включать только если finesConsent.get().choice === 'all'
  window.finesConsent = { get: getConsent };

  // галочка согласия в форме
  function agreed(form) {
    var c = form.elements.agree;
    if (!c) return true;
    var l = c.closest('.agree'), e = l.querySelector('.agree-e');
    if (c.checked) { e.textContent = ''; c.removeAttribute('aria-invalid'); return true; }
    e.textContent = 'Отметьте согласие, чтобы отправить.';
    c.setAttribute('aria-invalid', 'true');
    c.focus();
    return false;
  }

  function init() {
    var ck = d.getElementById('ck');
    if (ck) {
      if (!getConsent()) ck.hidden = false;
      ck.addEventListener('click', function (e) {
        var b = e.target.closest('[data-consent]');
        if (!b) return;
        setConsent(b.dataset.consent);
        ck.hidden = true;
      });
      d.addEventListener('click', function (e) {
        if (!e.target.closest('[data-consent-open]')) return;
        ck.hidden = false;
        ck.querySelector('button').focus();
      });
    }
    d.addEventListener('change', function (e) {
      if (e.target.name === 'agree' && e.target.checked) agreed(e.target.form);
    });

    /* шапка */
    var hdr = d.getElementById('hdr');
    function onScroll() { hdr.classList.toggle('is-scrolled', window.scrollY > 8); }
    if (hdr) { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); }

    /* мобильное меню */
    var burger = d.getElementById('burger'), mnav = d.getElementById('mnav');
    function setMenu(open) {
      mnav.hidden = !open;
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      d.body.classList.toggle('lock', open);
    }
    if (burger && mnav) {
      burger.addEventListener('click', function () { setMenu(mnav.hidden); });
      mnav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
      d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !mnav.hidden) { setMenu(false); burger.focus(); } });
      window.addEventListener('resize', function () { if (window.innerWidth > 900 && !mnav.hidden) setMenu(false); });
    }

    /* мягкое появление */
    var rv = [].slice.call(d.querySelectorAll('.rv'));
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -8% 0px' });
      rv.forEach(function (el) { io.observe(el); });
    } else {
      rv.forEach(function (el) { el.classList.add('in'); });
    }

    /* квиз */
    var quiz = d.getElementById('quiz');
    if (quiz) {
      var REC = {
        bot: ['Telegram-бот', 'от 15 000 ₽', 'срок от 3 дней'],
        crm: ['CRM под ваш процесс', 'от 40 000 ₽', 'срок от 7 дней'],
        web: ['Веб-сервис или сайт', 'от 30 000 ₽', 'срок от 5 дней'],
        ai: ['Интеграции и автоматизация', 'от 15 000 ₽', 'срок от 2 дней']
      };
      var BY_BUDGET = { b1: 'bot', b2: 'web', b3: 'crm' };
      var steps = [].slice.call(quiz.querySelectorAll('.q-step'));
      var res = d.getElementById('qRes'), count = d.getElementById('qCount'), back = d.getElementById('qBack');
      var bar = d.getElementById('qBar'), recEl = d.getElementById('qRec'), priceEl = d.getElementById('qPrice');
      var sum = d.getElementById('qSum'), note = d.getElementById('qNote'), again = d.getElementById('qAgain');
      var send = d.getElementById('qSend');
      var ans = {}, cur = 0, rec = null;

      var show = function (n, focus) {
        cur = n;
        var done = n >= steps.length;
        steps.forEach(function (s, k) { s.hidden = k !== n; });
        res.hidden = !done;
        count.textContent = done ? 'Готово' : 'Шаг ' + (n + 1) + ' из ' + steps.length;
        bar.style.width = (done ? 100 : ((n + 1) / (steps.length + 1)) * 100) + '%';
        back.hidden = n === 0;
        if (focus) {
          var t = done ? recEl : steps[n].querySelector('legend');
          if (t) { t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); }
        }
      };
      var result = function () {
        var key = ans.need.v;
        if (key === 'unknown') key = BY_BUDGET[ans.budget.v] || null;
        rec = key ? REC[key] : null;
        if (rec) {
          recEl.textContent = rec[0];
          priceEl.textContent = rec[1] + ' · ' + rec[2];
        } else {
          recEl.textContent = 'Начнём с бесплатной оценки';
          priceEl.textContent = 'Разберём задачу, назовём стоимость и срок';
        }
        while (sum.firstChild) sum.removeChild(sum.firstChild);
        steps.forEach(function (s) {
          var li = d.createElement('li'), a = d.createElement('span'), b = d.createElement('span');
          a.textContent = s.dataset.title;
          b.textContent = ans[s.dataset.key].label;
          li.appendChild(a); li.appendChild(b); sum.appendChild(li);
        });
      };
      quiz.addEventListener('click', function (e) {
        var opt = e.target.closest('.opt');
        if (!opt) return;
        var step = opt.closest('.q-step');
        [].forEach.call(step.querySelectorAll('.opt'), function (o) { o.setAttribute('aria-pressed', o === opt ? 'true' : 'false'); });
        ans[step.dataset.key] = { v: opt.dataset.v, label: opt.dataset.label };
        setTimeout(function () {
          if (cur + 1 >= steps.length) result();
          show(cur + 1, true);
        }, 160);
      });
      back.addEventListener('click', function () { show(Math.max(0, cur - 1), true); });
      again.addEventListener('click', function () {
        ans = {}; note.value = '';
        [].forEach.call(quiz.querySelectorAll('.opt'), function (o) { o.setAttribute('aria-pressed', 'false'); });
        show(0, true);
      });
      quiz.addEventListener('submit', function (e) {
        e.preventDefault();
        if (cur < steps.length) return;
        if (quiz.elements.website && quiz.elements.website.value) return; // honeypot
        if (!agreed(quiz)) return;
        if (!guard(send)) return;
        var lines = ['Здравствуйте! Заявка с сайта (подбор решения):'];
        steps.forEach(function (s) { lines.push('• ' + s.dataset.title + ': ' + ans[s.dataset.key].label); });
        if (rec) lines.push('• Сайт рекомендует: ' + rec[0] + ', ' + rec[1]);
        var n = clean(note.value, 300);
        if (n) lines.push('• О задаче: ' + n);
        openUrl(tgUrl(lines.join('\n')));
      });
      show(0, false);
    }

    /* короткая заявка */
    var lead = d.getElementById('lead');
    if (lead) {
      lead.addEventListener('submit', function (e) {
        e.preventDefault();
        if (lead.elements.website && lead.elements.website.value) return; // honeypot
        var btn = lead.querySelector('button[type=submit]');
        if (!agreed(lead)) return;
        if (!guard(btn)) return;
        var t = clean(lead.elements.task.value, 300);
        openUrl(tgUrl(t ? 'Здравствуйте! Хочу получить оценку. Задача: ' + t : 'Здравствуйте! Хочу обсудить задачу и получить оценку.'));
      });
    }
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})();
