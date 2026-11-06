/* Финес Студио — site logic (no deps, no trackers) */
(function () {
  "use strict";
  var TG = "https://t.me/fines_studio";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fmt = function (n) { return Math.round(n).toLocaleString("ru-RU").replace(/\u202f|,/g, "\u00a0"); };
  function plural(n, a, b, c) { n = Math.abs(n) % 100; var n1 = n % 10; if (n > 10 && n < 20) return c; if (n1 > 1 && n1 < 5) return b; if (n1 === 1) return a; return c; }

  /* ---------- Header: scrolled state + burger ---------- */
  var header = $("#header"), burger = $("#burger"), mmenu = $("#mmenu");
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  function setMenu(open) {
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    mmenu.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", function () { setMenu(burger.getAttribute("aria-expanded") !== "true"); });
  $$("a", mmenu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 1024) setMenu(false); });

  /* ---------- Active menu item on scroll ---------- */
  var menuLinks = $$(".menu a");
  var spyIds = ["services", "calc", "compare", "fears", "process", "guarantees", "quiz", "faq"];
  var spyTick = false;
  function spy() {
    spyTick = false;
    var line = window.innerHeight * 0.4, curId = null;
    spyIds.forEach(function (id) { var el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= line) curId = id; });
    var c = document.getElementById("contact");
    if (c && c.getBoundingClientRect().top <= line) curId = null;
    menuLinks.forEach(function (a) { a.classList.toggle("is-current", a.getAttribute("href") === "#" + curId); });
  }
  window.addEventListener("scroll", function () { if (!spyTick) { spyTick = true; requestAnimationFrame(spy); } }, { passive: true });
  window.addEventListener("resize", spy); spy();

  /* ---------- Carousel ---------- */
  var car = $("#carousel"), track = $("#cTrack"), slides = $$(".slide", track), dotsBox = $("#cDots");
  var cur = 0, timer = null, DUR = 6000, hover = false;
  car.style.setProperty("--dur", DUR / 1000 + "s");
  slides.forEach(function (s, i) {
    var b = document.createElement("button");
    b.className = "c-dot"; b.setAttribute("role", "tab"); b.setAttribute("aria-label", "Слайд " + (i + 1));
    b.appendChild(document.createElement("i"));
    b.addEventListener("click", function () { go(i, true); });
    dotsBox.appendChild(b);
  });
  var dots = $$(".c-dot", dotsBox);
  function go(i, user) {
    cur = (i + slides.length) % slides.length;
    track.style.transform = "translateX(" + (-100 * cur) + "%)";
    slides.forEach(function (s, k) {
      var on = k === cur; s.setAttribute("aria-hidden", String(!on));
      $$("a,button", s).forEach(function (el) { el.tabIndex = on ? 0 : -1; });
    });
    dots.forEach(function (d, k) {
      d.classList.remove("is-active"); d.setAttribute("aria-selected", String(k === cur));
      if (k === cur) { void d.offsetWidth; d.classList.add("is-active"); }
    });
    car.classList.toggle("on-dark", slides[cur].classList.contains("s-dark"));
    restart();
  }
  function restart() {
    clearTimeout(timer);
    if (reduce || hover || document.hidden) return;
    timer = setTimeout(function () { go(cur + 1); }, DUR);
  }
  function pause(p) {
    hover = p; car.classList.toggle("is-paused", p);
    if (p) clearTimeout(timer); else {
      // restart the progress bar for current slide
      var d = dots[cur]; d.classList.remove("is-active"); void d.offsetWidth; d.classList.add("is-active"); restart();
    }
  }
  car.addEventListener("mouseenter", function () { pause(true); });
  car.addEventListener("mouseleave", function () { pause(false); });
  car.addEventListener("focusin", function () { pause(true); });
  car.addEventListener("focusout", function (e) { if (!car.contains(e.relatedTarget)) pause(false); });
  document.addEventListener("visibilitychange", function () { if (!document.hidden) pause(hover); else clearTimeout(timer); });
  $("#cPrev").addEventListener("click", function () { go(cur - 1, true); });
  $("#cNext").addEventListener("click", function () { go(cur + 1, true); });
  car.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") go(cur - 1, true);
    if (e.key === "ArrowRight") go(cur + 1, true);
  });
  // swipe
  var sx = null, sy = null;
  track.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; clearTimeout(timer); }, { passive: true });
  track.addEventListener("touchend", function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(cur + (dx < 0 ? 1 : -1), true); else restart();
    sx = null;
  });
  // segments in top strip switch the promo
  var segs = $$(".seg");
  segs.forEach(function (s) {
    s.addEventListener("click", function () {
      segs.forEach(function (x) { x.classList.toggle("is-active", x === s); x.setAttribute("aria-pressed", String(x === s)); });
      go(+s.getAttribute("data-seg"), true);
      if (window.scrollY > car.offsetTop) window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  });
  go(0);

  /* ---------- Service filter chips ---------- */
  var chips = $$("#chips .chip"), cards = $$("#bento .svc"), empty = $("#empty");
  chips.forEach(function (c) {
    var f = c.getAttribute("data-f");
    var n = f === "all" ? cards.length : cards.filter(function (k) { return k.getAttribute("data-tags").split(" ").indexOf(f) > -1; }).length;
    $(".cnt", c).textContent = n;
  });
  function filter(f) {
    chips.forEach(function (c) { c.setAttribute("aria-selected", String(c.getAttribute("data-f") === f)); });
    var shown = cards.filter(function (k) { return f === "all" || k.getAttribute("data-tags").split(" ").indexOf(f) > -1; });
    cards.forEach(function (k) {
      var on = shown.indexOf(k) > -1;
      k.classList.toggle("is-hidden", !on);
      k.classList.remove("is-wide", "is-full", "is-in");
      if (on) { void k.offsetWidth; k.classList.add("is-in"); }
    });
    // bento rhythm: alternate big (2/3) and small (1/3) cards, single card = full width
    var L = shown.length;
    if (L === 1) shown[0].classList.add("is-full");
    else if (L === 2) shown[0].classList.add("is-wide");
    else if (L === 3) { shown[0].classList.add("is-wide"); shown[2].classList.add("is-full"); }
    else shown.forEach(function (k, i) { if (i % 4 === 0 || i % 4 === 3) k.classList.add("is-wide"); });
    empty.style.display = L ? "none" : "block";
  }
  chips.forEach(function (c) { c.addEventListener("click", function () { filter(c.getAttribute("data-f")); }); });
  $$("[data-filter]").forEach(function (a) { a.addEventListener("click", function () { filter(a.getAttribute("data-filter")); }); });
  filter("all");
  // initial state without animation
  cards.forEach(function (k) { k.classList.remove("is-in"); });

  /* ---------- Calculator ---------- */
  // Base prices & minimal terms from content.json → services.items
  var TYPES = {
    bot: { name: "Telegram-бот", base: 15000, step: 6000, minDays: 3, perUnit: 2, hints: ["приём заявок и\u00a0уведомление в\u00a0чат", "запись с\u00a0выбором времени и\u00a0напоминаниями", "приём оплаты и\u00a0рассылки", "каталог, корзина, личный кабинет в\u00a0боте"] },
    crm: { name: "CRM", base: 40000, step: 12000, minDays: 7, perUnit: 4, hints: ["клиенты, сделки и\u00a0задачи", "воронки, напоминания и\u00a0роли сотрудников", "отчёты, интеграция с\u00a0ботом и\u00a0сайтом", "несколько отделов, сложные права и\u00a0аналитика"] },
    web: { name: "Веб-сервис или сайт", base: 30000, step: 9000, minDays: 5, perUnit: 3, hints: ["сайт с\u00a0формой и\u00a0онлайн-записью", "онлайн-оплата и\u00a0личный кабинет", "внутренний сервис для\u00a0сотрудников", "сервис с\u00a0ролями, API и\u00a0интеграциями"] },
    int: { name: "Интеграция", base: 15000, step: 5000, minDays: 2, perUnit: 1.5, hints: ["одна связка: сайт → таблица или CRM", "несколько систем и\u00a0уведомления", "обмен с\u00a01С и\u00a0регулярные отчёты", "сквозная автоматизация процесса"] }
  };
  var type = "bot", termTouched = false;
  var rScope = $("#rScope"), rTerm = $("#rTerm");
  function paint(r) { var p = (r.value - r.min) / (r.max - r.min) * 100; r.style.setProperty("--p", p + "%"); }
  function days(n) { return n + " " + plural(n, "день", "дня", "дней"); }
  function comfort(t, s) { return Math.round(t.minDays + (s - 1) * t.perUnit); }
  function calc() {
    var t = TYPES[type], s = +rScope.value;
    var cm = comfort(t, s);
    var hardMin = Math.max(t.minDays, Math.ceil(cm * 0.6));
    rTerm.min = t.minDays;
    if (!termTouched) rTerm.value = cm;
    if (+rTerm.value < hardMin) rTerm.value = hardMin;
    var d = +rTerm.value;
    var scopeAdd = (s - 1) * t.step;
    var sub = t.base + scopeAdd;
    var rushK = d < cm ? Math.min(0.3, (cm - d) / cm * 0.75) : 0;
    var rush = Math.round(sub * rushK / 1000) * 1000;
    var total = Math.round((sub + rush) / 1000) * 1000;
    $("#oScope").textContent = s + " " + plural(s, "функция", "функции", "функций");
    $("#oTerm").textContent = days(d);
    $("#tMin").textContent = days(t.minDays);
    $("#hScope").textContent = "Например: " + t.hints[Math.min(3, Math.floor((s - 1) / 2.5))] + ".";
    var hT = $("#hTerm");
    if (d < cm) { hT.textContent = "Быстрее комфортного срока (" + days(cm) + "): +" + Math.round(rushK * 100) + "% за\u00a0ускорение. Минимум для\u00a0этого объёма: " + days(hardMin) + "."; hT.classList.add("warn"); }
    else { hT.textContent = d === cm ? "Комфортный срок для\u00a0этого объёма." : "Без\u00a0спешки: цена не\u00a0меняется, срок с\u00a0запасом."; hT.classList.remove("warn"); }
    $("#tVal").textContent = fmt(total);
    $("#tSub").textContent = t.name + " · " + s + " " + plural(s, "функция", "функции", "функций") + " · " + days(d);
    $("#bBase").textContent = fmt(t.base) + " ₽";
    $("#bScope").textContent = (scopeAdd ? "+" : "") + fmt(scopeAdd) + " ₽";
    $("#bRush").textContent = (rush ? "+" : "") + fmt(rush) + " ₽";
    $("#p1").textContent = fmt(total / 2) + " ₽";
    $("#p2").textContent = fmt(total / 2) + " ₽";
    var msg = "Здравствуйте! Посчитал(а) на сайте: " + t.name + ", объём " + s + " " + plural(s, "функция", "функции", "функций") + ", срок " + days(d) + ", ориентир от " + fmt(total) + " ₽. Хочу обсудить задачу.";
    $("#calcSend").href = TG + "?text=" + encodeURIComponent(msg.replace(/\u00a0/g, " "));
    paint(rScope); paint(rTerm);
  }
  function setType(k) {
    type = k; termTouched = false;
    $$("#types .type").forEach(function (b) { var on = b.getAttribute("data-type") === k; b.setAttribute("aria-checked", String(on)); b.tabIndex = on ? 0 : -1; });
    calc();
  }
  $$("#types .type").forEach(function (b, i, all) {
    b.addEventListener("click", function () { setType(b.getAttribute("data-type")); });
    b.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
      if (!d) return; e.preventDefault();
      var n = all[(i + d + all.length) % all.length]; n.focus(); setType(n.getAttribute("data-type"));
    });
  });
  rScope.addEventListener("input", calc);
  rTerm.addEventListener("input", function () { termTouched = true; calc(); });
  $$("[data-calc]").forEach(function (a) { a.addEventListener("click", function () { setType(a.getAttribute("data-calc")); }); });
  var cf = $("#calcForm"); if (cf) cf.addEventListener("submit", function (e) { e.preventDefault(); });
  setType("bot");

  /* ---------- FAQ accordion ---------- */
  $$("#acc .qa").forEach(function (qa, i) {
    var b = $("button", qa), ans = $(".ans", qa);
    ans.id = "ans" + i; b.setAttribute("aria-controls", ans.id);
    b.addEventListener("click", function () {
      var open = !qa.classList.contains("is-open");
      $$("#acc .qa").forEach(function (o) { o.classList.remove("is-open"); $("button", o).setAttribute("aria-expanded", "false"); });
      if (open) { qa.classList.add("is-open"); b.setAttribute("aria-expanded", "true"); }
    });
  });
  var first = $("#acc .qa"); first.classList.add("is-open"); $("button", first).setAttribute("aria-expanded", "true");

  /* ---------- Safe message helpers (validation, honeypot, cooldown) ---------- */
  var MAX_MSG = 1500, COOLDOWN = 10000, lastSend = 0;
  function clean(v, max) {
    // trim, collapse whitespace, strip control chars, cap length
    return String(v || "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim().slice(0, max);
  }
  function tgUrl(msg) { return TG + "?text=" + encodeURIComponent(msg.slice(0, MAX_MSG)); }
  function openTg(url) {
    var w = window.open(url, "_blank", "noopener,noreferrer");
    if (!w) location.href = url;
  }
  function guard(hp, btn, errEl) {
    if (hp && hp.value) return false;               // bot filled the honeypot: silently ignore
    var now = Date.now();
    if (now - lastSend < COOLDOWN) {
      errEl.textContent = "Сообщение уже собрано. Повторно можно через " + Math.ceil((COOLDOWN - (now - lastSend)) / 1000) + " с.";
      return false;
    }
    lastSend = now;
    if (btn) { btn.disabled = true; setTimeout(function () { btn.disabled = false; }, COOLDOWN); }
    return true;
  }

  /* ---------- Lead form → t.me ---------- */
  var needs = $$("#needs .chip");
  needs.forEach(function (c) {
    c.addEventListener("click", function () { var on = !c.classList.contains("is-on"); c.classList.toggle("is-on", on); c.setAttribute("aria-pressed", String(on)); });
  });
  var form = $("#leadForm"), txt = $("#fText"), err = $("#fErr"), sphere = $("#fSphere");
  txt.addEventListener("input", function () { txt.classList.remove("bad"); err.textContent = ""; });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    err.textContent = "";
    var picked = needs.filter(function (c) { return c.classList.contains("is-on"); }).map(function (c) { return c.getAttribute("data-v"); });
    var t = clean(txt.value, 1000), sp = clean(sphere.value, 80);
    if (t.length < 10) { txt.classList.add("bad"); err.textContent = "Опишите задачу хотя бы\u00a0парой фраз — так оценка будет точнее."; txt.focus(); return; }
    if (!guard($("#fHp"), $("#fSend"), err)) return;
    var msg = "Здравствуйте! Хочу получить оценку (с сайта Финес Студио).\n" +
      "Что нужно: " + (picked.length ? picked.join(", ") : "пока не\u00a0определились") + "\n" +
      (sp ? "Сфера: " + sp + "\n" : "") +
      "Когда: " + $("#fWhen").value + "\n" +
      "Задача: " + t;
    openTg(tgUrl(msg));
  });

  /* ---------- Quiz (4 steps → mini-brief in Telegram) ---------- */
  var REC = {
    bot: { name: "Telegram-бот", price: "от\u00a015 000 ₽", term: "срок от\u00a03 дней" },
    crm: { name: "CRM под\u00a0ваш процесс", price: "от\u00a040 000 ₽", term: "срок от\u00a07 дней" },
    web: { name: "Веб-сервис или сайт", price: "от\u00a030 000 ₽", term: "срок от\u00a05 дней" },
    int: { name: "Интеграции и\u00a0автоматизация", price: "от\u00a015 000 ₽", term: "срок от\u00a02 дней" },
    unknown: { name: "Начнём с\u00a0бесплатной оценки", price: "от\u00a015 000 ₽", term: "подберём решение после разговора" }
  };
  var NEED_LABEL = { bot: "Telegram-бот", crm: "CRM", web: "Веб-сервис или сайт", int: "AI-ассистент или автоматизация", unknown: "Пока не\u00a0знаю" };
  var qSteps = $$("#quizBox .qz"), qRes = $("#qzRes"), qBack = $("#qzBack"), qBar = $("#qzBar"), qStep = $("#qzStep");
  var qi = 0, ans = {};
  var LABELS = { need: "Что нужно", sphere: "Сфера бизнеса", when: "Когда запустить", budget: "Ориентир бюджета" };
  function qShow(i) {
    qi = i;
    qSteps.forEach(function (f, k) { f.hidden = k !== i; f.classList.remove("is-in"); });
    qRes.hidden = i < qSteps.length; qRes.classList.remove("is-in");
    var el = i < qSteps.length ? qSteps[i] : qRes; void el.offsetWidth; el.classList.add("is-in");
    qBack.hidden = i === 0;
    var done = Math.min(i, qSteps.length);
    $("i", qBar).style.width = (Math.min(i + 1, qSteps.length) / qSteps.length * 100) + "%";
    qBar.setAttribute("aria-valuenow", String(done));
    qStep.textContent = i < qSteps.length ? "Шаг " + (i + 1) + " из " + qSteps.length : "Готово: мини-ТЗ собрано";
    if (i < qSteps.length) {
      var key = qSteps[i].getAttribute("data-key");
      $$(".opt", qSteps[i]).forEach(function (o) { var on = ans[key] === o.getAttribute("data-v"); o.classList.toggle("is-on", on); o.setAttribute("aria-pressed", String(on)); });
    } else qResult();
  }
  function qResult() {
    var r = REC[ans.need] || REC.unknown;
    $("#qzRec").textContent = r.name;
    $("#qzPrice").textContent = r.price;
    $("#qzTerm").textContent = r.term;
    var list = $("#qzList"); while (list.firstChild) list.removeChild(list.firstChild);
    ["need", "sphere", "when", "budget"].forEach(function (k) {
      var li = document.createElement("li"), b = document.createElement("b");
      b.textContent = LABELS[k] + ": ";
      li.appendChild(b); li.appendChild(document.createTextNode(k === "need" ? NEED_LABEL[ans[k]] : ans[k]));
      list.appendChild(li);
    });
    $("#qzErr").textContent = "";
  }
  function qBuild() {
    var r = REC[ans.need] || REC.unknown, note = clean($("#qzNote").value, 500);
    var msg = "Здравствуйте! Прошёл(а) подбор на сайте Финес Студио. Мини-ТЗ:\n" +
      "1. Что нужно: " + NEED_LABEL[ans.need] + "\n" +
      "2. Сфера бизнеса: " + ans.sphere + "\n" +
      "3. Когда запустить: " + ans.when + "\n" +
      "4. Бюджет: " + ans.budget + "\n" +
      "Рекомендация сайта: " + r.name + ", " + r.price + "\n" +
      (note ? "Комментарий: " + note : "Детали расскажу в\u00a0переписке.");
    return tgUrl(msg);
  }
  qSteps.forEach(function (f, k) {
    var key = f.getAttribute("data-key");
    $$(".opt", f).forEach(function (o) {
      o.setAttribute("aria-pressed", "false");
      o.addEventListener("click", function () {
        ans[key] = o.getAttribute("data-v");
        $$(".opt", f).forEach(function (x) { x.classList.toggle("is-on", x === o); x.setAttribute("aria-pressed", String(x === o)); });
        setTimeout(function () { qShow(k + 1); var t = qi < qSteps.length ? $(".opt", qSteps[qi]) : $("#qzSend"); if (t && f.contains(document.activeElement)) t.focus({ preventScroll: true }); }, reduce ? 0 : 180);
      });
    });
  });
  qBack.addEventListener("click", function () { if (qi > 0) qShow(qi - 1); });
  $("#qzReset").addEventListener("click", function () { ans = {}; $("#qzNote").value = ""; qShow(0); });
  $("#qzSend").addEventListener("click", function () {
    var e = $("#qzErr"); e.textContent = "";
    if (!ans.need || !ans.sphere || !ans.when || !ans.budget) { e.textContent = "Ответьте на\u00a0все 4 вопроса."; return; }
    if (!guard($("#qzHp"), $("#qzSend"), e)) return;
    openTg(qBuild());
  });
  qShow(0);

  /* ---------- Reveal on scroll ---------- */
  var rv = $$(".rv");
  if (reduce || !("IntersectionObserver" in window)) rv.forEach(function (el) { el.classList.add("is-vis"); });
  else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-vis"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    rv.forEach(function (el) { io.observe(el); });
  }
})();
