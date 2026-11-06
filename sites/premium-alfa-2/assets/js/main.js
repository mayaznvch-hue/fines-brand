/* Финес Студио · вариант B · без зависимостей, без трекеров */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  root.classList.add('js');
  var TG = 'https://t.me/fines_studio';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var el = function (tag, cls, text) { var e = d.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  var MAX_MSG = 1500;
  var clean = function (v, max) { return String(v || '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').replace(/[ \t]+/g, ' ').trim().slice(0, max || 1000); };
  var tgUrl = function (msg) { return TG + '?text=' + encodeURIComponent(String(msg).replace(/\u00a0/g, ' ').slice(0, MAX_MSG)); };
  /* единая защита от повторной отправки: 10 секунд */
  var lastSend = 0;
  var cooldown = function () { var now = Date.now(); if (now - lastSend < 10000) return Math.ceil((10000 - (now - lastSend)) / 1000); lastSend = now; return 0; };
  var fmt = function (n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0'); };

  /* ---------- hero: построчное появление слов ---------- */
  var title = $('[data-split]');
  if (title) {
    var idx = 0;
    $$('.l300, .l800', title).forEach(function (line) {
      var nodes = Array.prototype.slice.call(line.childNodes);
      line.textContent = '';
      nodes.forEach(function (n) {
        if (n.nodeType === 3) {
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { line.appendChild(d.createTextNode(' ')); return; }
            var w = d.createElement('span'); w.className = 'wd';
            var i = d.createElement('span'); i.className = 'wd__i'; i.style.setProperty('--i', idx++);
            i.textContent = part; w.appendChild(i); line.appendChild(w);
          });
        } else {
          // точка-акцент приклеивается к последнему слову
          var last = line.lastChild && line.lastChild.querySelector ? line.lastChild.querySelector('.wd__i') : null;
          if (last) last.appendChild(n); else line.appendChild(n);
        }
      });
    });
    requestAnimationFrame(function () { requestAnimationFrame(function () { title.classList.add('is-in'); }); });
  }

  /* ---------- statement: подсветка слов при скролле ---------- */
  var st = $('[data-light]');
  var stWords = [];
  if (st && !reduce) {
    var walk = function (el) {
      Array.prototype.slice.call(el.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = d.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(d.createTextNode(p)); return; }
            var s = d.createElement('span'); s.className = 'lw'; s.textContent = p; frag.appendChild(s); stWords.push(s);
          });
          el.replaceChild(frag, n);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(st);
    var paint = function () {
      var r = st.getBoundingClientRect(), vh = innerHeight;
      var p = (vh * 0.85 - r.top) / (r.height + vh * 0.35);
      p = Math.max(0, Math.min(1, p));
      var k = Math.round(p * stWords.length);
      for (var i = 0; i < stWords.length; i++) stWords[i].classList.toggle('on', i < k);
    };
    addEventListener('scroll', paint, { passive: true });
    addEventListener('resize', paint);
    paint();
  }

  /* ---------- reveal ---------- */
  var rv = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px -4% 0px' });
    rv.forEach(function (e) { io.observe(e); });
  } else rv.forEach(function (e) { e.classList.add('in'); });

  /* ---------- бургер ---------- */
  var burger = $('.burger'), mnav = $('#mnav');
  var setMenu = function (open) {
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    d.body.classList.toggle('lock', open);
    if (open) { mnav.hidden = false; requestAnimationFrame(function () { mnav.classList.add('is-open'); }); }
    else { mnav.classList.remove('is-open'); setTimeout(function () { if (burger.getAttribute('aria-expanded') === 'false') mnav.hidden = true; }, 260); }
  };
  if (burger && mnav) {
    burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
    $$('a', mnav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') { setMenu(false); burger.focus(); } });
    addEventListener('resize', function () { if (innerWidth > 1000 && burger.getAttribute('aria-expanded') === 'true') setMenu(false); });
  }

  /* ---------- активный пункт навигации ---------- */
  var navLinks = $$('.nav a');
  var secs = navLinks.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && secs.length) {
    var nio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          var id = '#' + e.target.id;
          navLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(function (s) { nio.observe(s); });
  }

  /* ---------- CRM мини-дашборд ---------- */
  var chart = $('.chart');
  if (chart) {
    var line = $('.chart__line', chart), area = $('.chart__area', chart), pt = $('.chart__pt', chart), halo = $('.chart__halo', chart);
    var W = 600, H = 180, N = 14;
    var data = [12, 15, 13, 18, 17, 21, 19, 23, 22, 26, 24, 28, 27, 31];
    var cur = data.slice();
    var toXY = function (arr) {
      var max = 40, min = 0;
      return arr.map(function (v, i) { return [i * (W / (N - 1)), H - 14 - (v - min) / (max - min) * (H - 34)]; });
    };
    var pathOf = function (p) {
      var s = 'M' + p[0][0].toFixed(1) + ' ' + p[0][1].toFixed(1);
      for (var i = 1; i < p.length; i++) {
        var x0 = p[i - 1][0], y0 = p[i - 1][1], x1 = p[i][0], y1 = p[i][1], cx = (x0 + x1) / 2;
        s += ' C' + cx.toFixed(1) + ' ' + y0.toFixed(1) + ' ' + cx.toFixed(1) + ' ' + y1.toFixed(1) + ' ' + x1.toFixed(1) + ' ' + y1.toFixed(1);
      }
      return s;
    };
    var draw = function (arr) {
      var p = toXY(arr), s = pathOf(p);
      line.setAttribute('d', s);
      area.setAttribute('d', s + ' L' + W + ' ' + H + ' L0 ' + H + ' Z');
      var last = p[p.length - 1];
      pt.setAttribute('cx', last[0]); pt.setAttribute('cy', last[1]);
      halo.setAttribute('cx', last[0]); halo.setAttribute('cy', last[1]);
    };
    // начальная «прорисовка» линии
    var intro = function () {
      if (reduce) { draw(cur); return; }
      var t0 = null, from = cur.map(function () { return 4; });
      var step = function (ts) {
        if (!t0) t0 = ts;
        var k = Math.min(1, (ts - t0) / 1400), e = 1 - Math.pow(1 - k, 3);
        draw(from.map(function (v, i) { return v + (cur[i] - v) * e; }));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    var tween = function (a, b, ms) {
      var t0 = null;
      var step = function (ts) {
        if (!t0) t0 = ts;
        var k = Math.min(1, (ts - t0) / ms), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        draw(a.map(function (v, i) { return v + (b[i] - v) * e; }));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    var kpi = { leads: 24, work: 11, tasks: 7 };
    var st4 = [9, 11, 5, 4];
    var feedEl = $('[data-feed]'), clock = $('[data-clock]');
    var events = [
      ['Новая заявка из Telegram-бота', function () { kpi.leads++; st4[0]++; return 'leads'; }],
      ['Сделка перешла в «В работе»', function () { kpi.work++; st4[0] = Math.max(1, st4[0] - 1); st4[1]++; return 'work'; }],
      ['Напоминание: перезвонить клиенту', function () { kpi.tasks++; return 'tasks'; }],
      ['Счёт отправлен клиенту', function () { st4[1] = Math.max(1, st4[1] - 1); st4[2]++; kpi.work = Math.max(1, kpi.work - 1); return 'work'; }],
      ['Оплата получена · сделка закрыта', function () { st4[2] = Math.max(1, st4[2] - 1); st4[3]++; return null; }],
      ['Задача выполнена', function () { kpi.tasks = Math.max(1, kpi.tasks - 1); return 'tasks'; }],
      ['Новая заявка с сайта', function () { kpi.leads++; st4[0]++; return 'leads'; }]
    ];
    var minutes = 12 * 60;
    var tm = function (m) { var h = Math.floor(m / 60) % 24, mm = m % 60; return (h < 10 ? '0' : '') + h + ':' + (mm < 10 ? '0' : '') + mm; };
    var ei = 0;
    var tickOnce = function () {
      minutes += 3 + Math.floor(Math.random() * 6);
      var ev = events[ei++ % events.length];
      var key = ev[1]();
      if (clock) clock.textContent = tm(minutes);
      // KPI
      Object.keys(kpi).forEach(function (k) {
        var el = $('[data-kpi="' + k + '"]');
        if (el && el.textContent !== String(kpi[k])) {
          el.textContent = kpi[k]; el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick');
        }
      });
      if (key) {
        var dl = $('[data-kpi-d="' + key + '"]');
        if (dl) { dl.textContent = '+1'; dl.classList.add('up'); }
      }
      // воронка
      var mx = Math.max.apply(null, st4) * 1.15;
      st4.forEach(function (v, i) {
        var b = $('[data-st="' + i + '"]'); if (b) b.textContent = v;
        var bar = b && b.parentNode.querySelector('s'); if (bar) bar.style.setProperty('--w', Math.round(v / mx * 100) + '%');
      });
      // график: последний день растёт, иногда сдвиг окна
      var next = cur.slice();
      if (key === 'leads') next[N - 1] = Math.min(38, next[N - 1] + 2);
      else if (ei % 5 === 0) { next.shift(); next.push(Math.max(14, Math.min(36, cur[N - 1] + (Math.random() * 8 - 3)))); }
      else next[N - 1] = Math.max(12, Math.min(38, next[N - 1] + (Math.random() * 3 - 1.2)));
      tween(cur, next, 900); cur = next;
      // лента
      if (feedEl) {
        var li = el('li', 'new'); li.appendChild(el('i')); li.appendChild(d.createTextNode(ev[0])); li.appendChild(el('span', null, tm(minutes)));
        feedEl.insertBefore(li, feedEl.firstChild);
        while (feedEl.children.length > 3) feedEl.removeChild(feedEl.lastChild);
      }
    };
    var timer = null, visible = false;
    var run = function () { if (!timer && !reduce && visible && !d.hidden) timer = setInterval(tickOnce, 2600); };
    var stop = function () { clearInterval(timer); timer = null; };
    draw(cur.map(function () { return 4; }));
    var started = false;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        visible = es[es.length - 1].isIntersecting;
        if (visible && !started) { started = true; intro(); }
        visible ? run() : stop();
      }, { threshold: 0.2 }).observe(chart);
    } else { intro(); visible = true; run(); }
    d.addEventListener('visibilitychange', function () { d.hidden ? stop() : run(); });
    if (clock) clock.textContent = tm(minutes);
  }

  /* ---------- калькулятор ---------- */
  var PRICES = {
    bot: { name: 'Telegram-бот', price: 15000, days: 3 },
    crm: { name: 'CRM под вас', price: 40000, days: 7 },
    web: { name: 'Веб-сервис или сайт', price: 30000, days: 5 },
    int: { name: 'Интеграции и автоматизация', price: 15000, days: 2 }
  };
  var calcChips = $$('[data-calc-chips] .chip');
  var baseSeg = $('[data-seg="base"]');
  var sumEl = $('[data-sum]'), termEl = $('[data-term]'), linesEl = $('[data-calc-lines]');
  var h1 = $('[data-half]'), h2 = $('[data-half2]'), sendEl = $('[data-calc-send]'), sumWrap = $('.calc__sum');
  var shown = 15000;
  var daysWord = function (n) { var m10 = n % 10, m100 = n % 100; return (m10 === 1 && m100 !== 11) ? 'дня' : 'дней'; };
  var animateNum = function (to) {
    if (reduce) { sumEl.textContent = fmt(to); shown = to; return; }
    var from = shown, t0 = null;
    var step = function (ts) {
      if (!t0) t0 = ts;
      var k = Math.min(1, (ts - t0) / 500), e = 1 - Math.pow(1 - k, 3);
      sumEl.textContent = fmt(from + (to - from) * e);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step); shown = to;
  };
  var calcState = function () {
    var picked = calcChips.filter(function (c) { return c.getAttribute('aria-pressed') === 'true'; }).map(function (c) { return c.dataset.k; });
    var base = baseSeg ? ($('[aria-checked="true"]', baseSeg) || {}).dataset : null;
    return { picked: picked, have: base && base.v === 'have' };
  };
  var calc = function () {
    if (!sumEl) return;
    var s = calcState(), sum = 0, days = 0;
    s.picked.forEach(function (k) { sum += PRICES[k].price; days = Math.max(days, PRICES[k].days); });
    linesEl.textContent = '';
    var row = function (a, b, cls) { var li = el('li', cls); li.appendChild(el('span', null, a)); li.appendChild(el('span', null, b)); linesEl.appendChild(li); };
    if (!s.picked.length) {
      row('Выберите хотя бы одно решение', '—', 'empty');
      sumEl.textContent = '0'; shown = 0; termEl.textContent = '—'; h1.textContent = '—'; h2.textContent = '—';
      sendEl.href = TG; return;
    }
    s.picked.forEach(function (k) {
      row(PRICES[k].name, 'от ' + fmt(PRICES[k].price) + ' ₽ · от ' + PRICES[k].days + ' ' + daysWord(PRICES[k].days));
    });
    if (s.have) {
      row('Доработка существующего', 'оценим после разбора');
    }
    animateNum(sum);
    sumWrap.classList.remove('bump'); void sumWrap.offsetWidth; sumWrap.classList.add('bump');
    termEl.textContent = 'от ' + days + ' ' + daysWord(days);
    h1.textContent = fmt(sum / 2) + ' ₽'; h2.textContent = fmt(sum / 2) + ' ₽';
    var msg = 'Здравствуйте! Посчитал(а) на сайте ориентир:\n' +
      s.picked.map(function (k) { return '— ' + PRICES[k].name + ' (от ' + fmt(PRICES[k].price) + ' ₽)'; }).join('\n') +
      '\nИтого: от ' + fmt(sum) + ' ₽, срок от ' + days + ' ' + daysWord(days) + '.' +
      (s.have ? '\nУ нас уже есть решение, нужно доработать.' : '\nНачинаем с нуля.') +
      '\nХочу обсудить задачу.';
    sendEl.href = tgUrl(msg);
  };
  calcChips.forEach(function (c) {
    c.addEventListener('click', function () { c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); calc(); });
  });

  /* сегменты-радио (калькулятор, форма) */
  $$('.seg[role="radiogroup"]').forEach(function (seg) {
    var btns = $$('button', seg);
    var pick = function (b, focus) {
      btns.forEach(function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); x.tabIndex = x === b ? 0 : -1; });
      if (focus) b.focus();
      seg.dispatchEvent(new CustomEvent('segchange', { bubbles: true }));
    };
    var init = btns.filter(function (x) { return x.getAttribute('aria-checked') === 'true'; })[0];
    btns.forEach(function (x) { x.tabIndex = (init ? x === init : x === btns[0]) ? 0 : -1; });
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () {
        // в форме выбор можно снять повторным кликом
        if (seg.dataset.seg === 'when' && b.getAttribute('aria-checked') === 'true') { b.setAttribute('aria-checked', 'false'); seg.dispatchEvent(new CustomEvent('segchange', { bubbles: true })); return; }
        pick(b);
      });
      b.addEventListener('keydown', function (e) {
        var j = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % btns.length;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + btns.length) % btns.length;
        if (j !== null) { e.preventDefault(); pick(btns[j], true); }
      });
    });
  });
  if (baseSeg) baseSeg.addEventListener('segchange', calc);

  /* «Рассчитать» в карточках: выбрать решение в калькуляторе и прокрутить */
  $$('[data-pick]').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.dataset.pick;
      calcChips.forEach(function (c) { c.setAttribute('aria-pressed', c.dataset.k === k ? 'true' : 'false'); });
      calc();
      var t = $('#calc');
      if (t) t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      if (history.replaceState) history.replaceState(null, '', '#calc');
    });
  });
  calc();

  /* ---------- сравнение: переключатель колонок (мобила) ---------- */
  var cmpSeg = $('[data-cmp-seg]'), cmpT = $('[data-cmp]');
  if (cmpSeg && cmpT) {
    var cb = $$('button', cmpSeg);
    cb.forEach(function (b) {
      b.addEventListener('click', function () {
        cb.forEach(function (x) { x.setAttribute('aria-selected', x === b ? 'true' : 'false'); });
        cmpT.dataset.cmp = b.dataset.v;
      });
    });
  }

  /* ---------- процесс: табы-чипсы с автопрокруткой ---------- */
  var proc = $('[data-proc]');
  if (proc) {
    var tabs = $$('[role="tab"]', proc), panels = $$('[role="tabpanel"]', proc);
    var cur2 = 0, auto = !reduce, ptimer = null, DUR = 6000;
    proc.style.setProperty('--dur', DUR + 'ms');
    var show = function (i, focus) {
      cur2 = i;
      tabs.forEach(function (t, j) {
        var on = j === i;
        t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1;
        var s = t.querySelector('s'); if (s) { s.style.animation = 'none'; void s.offsetWidth; s.style.animation = ''; }
      });
      panels.forEach(function (p, j) { p.hidden = j !== i; p.classList.toggle('show', j === i); });
      if (focus) tabs[i].focus();
    };
    var stopAuto = function () { auto = false; clearInterval(ptimer); proc.classList.add('stopped'); };
    var startAuto = function () { if (!auto) return; clearInterval(ptimer); ptimer = setInterval(function () { if (!proc.classList.contains('paused')) show((cur2 + 1) % tabs.length); }, DUR); };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { stopAuto(); show(i); });
      t.addEventListener('keydown', function (e) {
        var j = null;
        if (e.key === 'ArrowRight') j = (i + 1) % tabs.length;
        if (e.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') j = 0;
        if (e.key === 'End') j = tabs.length - 1;
        if (j !== null) { e.preventDefault(); stopAuto(); show(j, true); }
      });
    });
    proc.addEventListener('mouseenter', function () { proc.classList.add('paused'); });
    proc.addEventListener('mouseleave', function () { proc.classList.remove('paused'); });
    if (!auto) proc.classList.add('stopped');
    if ('IntersectionObserver' in window && auto) {
      new IntersectionObserver(function (es) {
        if (es[es.length - 1].isIntersecting) { show(cur2); startAuto(); } else clearInterval(ptimer);
      }, { threshold: 0.35 }).observe(proc);
    }
  }

  /* ---------- FAQ-аккордеон ---------- */
  $$('[data-acc] .acc__i').forEach(function (it, i) {
    var b = $('button', it), a = $('.acc__a', it);
    var id = 'faq-a-' + i; a.id = id; b.setAttribute('aria-controls', id);
    a.setAttribute('role', 'region'); a.setAttribute('aria-labelledby', 'faq-q-' + i); b.id = 'faq-q-' + i;
    b.addEventListener('click', function () {
      var open = !it.classList.contains('open');
      $$('[data-acc] .acc__i.open').forEach(function (o) { if (o !== it) { o.classList.remove('open'); $('button', o).setAttribute('aria-expanded', 'false'); } });
      it.classList.toggle('open', open); b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---------- форма заявки → t.me (валидация, honeypot, антиповтор) ---------- */
  var form = $('[data-form]');
  if (form) {
    var fchips = $$('[data-form-chips] .chip', form), ta = $('textarea', form), sph = $('input[name="sphere"]', form);
    var pre = $('[data-preview]', form), status = $('[data-status]', form), cnt = $('[data-cnt]', form), hp = $('[data-hp]', form);
    var whenSeg = $('[data-seg="when"]', form);
    var TA_MAX = +ta.getAttribute('maxlength') || 1000;
    var build = function () {
      var what = fchips.filter(function (c) { return c.getAttribute('aria-pressed') === 'true'; }).map(function (c) { return c.dataset.v; });
      var w = whenSeg && $('[aria-checked="true"]', whenSeg);
      var task = clean(ta.value, TA_MAX), sphere = clean(sph && sph.value, 80);
      var parts = ['Здравствуйте! Пишу с сайта Финес Студио.'];
      if (what.length) parts.push('Что нужно: ' + what.join(', ') + '.');
      if (sphere) parts.push('Сфера: ' + sphere + '.');
      if (w) parts.push('Сроки: ' + w.dataset.v + '.');
      if (task) parts.push('Задача: ' + task);
      if (!what.length && !task) parts.push('Хочу обсудить задачу.');
      return parts.join('\n').slice(0, MAX_MSG);
    };
    var upd = function () { pre.textContent = build(); if (cnt) cnt.textContent = ta.value.length + ' / ' + TA_MAX; form.classList.remove('err'); };
    fchips.forEach(function (c) { c.addEventListener('click', function () { c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); upd(); }); });
    if (whenSeg) whenSeg.addEventListener('segchange', upd);
    ta.addEventListener('input', upd);
    if (sph) sph.addEventListener('input', upd);
    upd();
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (hp && hp.value) { status.textContent = 'Готово.'; return; } // бот: молча игнорируем
      var what = fchips.some(function (c) { return c.getAttribute('aria-pressed') === 'true'; });
      var task = clean(ta.value, TA_MAX);
      if (!what && task.length < 3) {
        form.classList.add('err');
        status.textContent = 'Отметьте, что нужно, или опишите задачу хотя бы парой слов.';
        (fchips[0] || ta).focus(); return;
      }
      var wait = cooldown();
      if (wait) { status.textContent = 'Чат уже открыт. Повторно можно через ' + wait + ' с.'; return; }
      var url = tgUrl(build());
      status.textContent = 'Открываем чат @fines_studio. Сообщение подставлено, останется нажать «Отправить».';
      var w = window.open(url, '_blank', 'noopener,noreferrer');
      if (!w) location.href = url;
    });
    var copyBtn = $('[data-copy]', form);
    if (copyBtn) copyBtn.addEventListener('click', function () {
      var txt = build();
      var ok = function () { status.textContent = 'Текст скопирован. Его можно вставить в чат @fines_studio.'; };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, function () { status.textContent = 'Не удалось скопировать, выделите текст вручную.'; });
      else { var r = d.createRange(); r.selectNodeContents(pre); var sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); status.textContent = 'Текст выделен: нажмите Ctrl+C.'; }
    });
  }

  /* ---------- квиз: 4 шага → рекомендация → мини-ТЗ в Telegram ---------- */
  var quiz = $('[data-quiz]');
  if (quiz) {
    var steps = $$('.quiz__step', quiz), res = $('[data-q-res]', quiz), back = $('[data-q-back]', quiz);
    var bar = $('[data-q-bar]', quiz), count = $('[data-q-count]', quiz), qsend = $('[data-q-send]', quiz);
    var qstatus = $('[data-q-status]', quiz), qhp = $('[data-hp]', quiz);
    var REC = {
      bot: { name: 'Telegram-бот', price: 'от 15 000 ₽', term: 'от 3 дней', note: 'Запись, приём заявок, оплата, рассылки и ответы на типовые вопросы.' },
      crm: { name: 'CRM под вас', price: 'от 40 000 ₽', term: 'от 7 дней', note: 'Клиенты, сделки, задачи и напоминания в одной системе.' },
      web: { name: 'Веб-сервис или сайт', price: 'от 30 000 ₽', term: 'от 5 дней', note: 'Личные кабинеты, онлайн-запись и оплата, внутренние сервисы.' },
      ai: { name: 'Интеграции и автоматизация', price: 'от 15 000 ₽', term: 'от 2 дней', note: 'Связываем сайт, CRM, таблицы, 1С и мессенджеры, настраиваем отчёты и уведомления.' },
      unknown: { name: 'Начать с Telegram-бота', price: 'от 15 000 ₽', term: 'от 3 дней', note: 'Самый быстрый старт. Точное решение подберём после бесплатной оценки.' }
    };
    var LBL = { what: 'Что нужно', sphere: 'Сфера бизнеса', when: 'Запуск', budget: 'Бюджет' };
    var ans = {}, at = 0, N = steps.length;
    var label = function (step, v) { var b = $('.opt[data-v="' + v + '"]', step); return b ? b.lastChild.textContent.trim() : v; };
    var render = function (focus) {
      steps.forEach(function (st, i) { st.hidden = i !== at; });
      res.hidden = at < N;
      back.hidden = at === 0;
      var done = Math.min(at + 1, N);
      count.textContent = at < N ? ('0' + done + ' / 0' + N) : 'Готово';
      bar.setAttribute('aria-valuenow', String(done));
      $$('i', bar).forEach(function (seg, i) { seg.classList.toggle('on', i < at || (at < N && i === at)); seg.classList.toggle('cur', i === at); });
      steps.forEach(function (st) {
        $$('.opt', st).forEach(function (o) { o.setAttribute('aria-pressed', ans[st.dataset.step] === o.dataset.v ? 'true' : 'false'); });
      });
      if (at >= N) result();
      if (focus) { var t = at < N ? $('.opt', steps[at]) : res; if (t) t.focus({ preventScroll: true }); }
    };
    var buildQ = function () {
      var r = REC[ans.what] || REC.unknown;
      var lines = ['Здравствуйте! Прошёл(ла) подбор на сайте Финес Студио.', 'Мини-ТЗ:'];
      steps.forEach(function (st) { var k = st.dataset.step; if (ans[k]) lines.push('— ' + LBL[k] + ': ' + label(st, ans[k])); });
      lines.push('Рекомендация сайта: ' + r.name + ', ' + r.price + ', ' + r.term + '.');
      lines.push('Хочу получить точную оценку.');
      return lines.join('\n').slice(0, MAX_MSG);
    };
    var result = function () {
      var r = REC[ans.what] || REC.unknown;
      $('[data-q-name]', quiz).textContent = r.name;
      $('[data-q-price]', quiz).textContent = r.price;
      $('[data-q-term]', quiz).textContent = ' · ' + r.term;
      $('[data-q-note]', quiz).textContent = r.note + ' Цена фиксируется в договоре, оценка бесплатная.';
      var dl = $('[data-q-dl]', quiz); dl.textContent = '';
      steps.forEach(function (st) {
        var k = st.dataset.step; if (!ans[k]) return;
        var row = el('div'); row.appendChild(el('dt', 'mono', LBL[k])); row.appendChild(el('dd', null, label(st, ans[k]))); dl.appendChild(row);
      });
      qsend.href = tgUrl(buildQ());
      qstatus.textContent = '';
    };
    steps.forEach(function (st, i) {
      $$('.opt', st).forEach(function (o) {
        o.addEventListener('click', function () {
          ans[st.dataset.step] = o.dataset.v;
          $$('.opt', st).forEach(function (x) { x.setAttribute('aria-pressed', x === o ? 'true' : 'false'); });
          setTimeout(function () { at = i + 1; render(true); }, reduce ? 0 : 180);
        });
      });
    });
    back.addEventListener('click', function () { if (at > 0) { at--; render(true); } });
    $('[data-q-reset]', quiz).addEventListener('click', function () { ans = {}; at = 0; render(true); });
    qsend.addEventListener('click', function (e) {
      if (qhp && qhp.value) { e.preventDefault(); return; }
      var wait = cooldown();
      if (wait) { e.preventDefault(); qstatus.textContent = 'Чат уже открыт. Повторно можно через ' + wait + ' с.'; return; }
      qsend.href = tgUrl(buildQ());
      qstatus.textContent = 'Открываем @fines_studio: мини-ТЗ уже в сообщении.';
    });
    render(false);
  }
})();
