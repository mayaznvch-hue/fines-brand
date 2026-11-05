import { page, logo, C, TG, TGH, dot, nn } from './core.mjs';
const L = [];

// 01 — Швейцарский минимализм
L.push({ n: 1, title: 'Швейцарский минимализм', idea: 'Строгая модульная сетка, чёрный текст и один оранжевый акцент — для тех, кто ценит порядок и ясность', build() {
  const css = `
body{font-family:'Inter Tight',sans-serif;background:#fff;color:#111;font-size:16px;line-height:1.5}
.w{max-width:1320px;margin:0 auto;padding:0 32px}
.g{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:24px}
header{position:sticky;top:0;background:rgba(255,255,255,.94);backdrop-filter:blur(8px);z-index:10;border-bottom:1px solid #111}
header .w{display:flex;align-items:center;justify-content:space-between;height:76px}
nav{display:flex;gap:32px;font-size:14px}
nav a:hover{color:#f2501c}
.btn{display:inline-flex;align-items:center;gap:10px;background:#111;color:#fff;padding:14px 22px;font-weight:600;font-size:14px;transition:background .2s}
.btn:hover{background:#f2501c}
.hero{padding:96px 0 64px;border-bottom:1px solid #111}
.hero .idx{grid-column:1/3;font-size:13px;color:#777}
.hero h1{grid-column:3/13;font-size:clamp(44px,7.4vw,118px);line-height:.94;letter-spacing:-.045em;font-weight:700}
.hero h1 em{font-style:normal;color:#f2501c}
.hero .lead{grid-column:3/8;font-size:20px;margin-top:48px;color:#333}
.hero .cta{grid-column:9/13;margin-top:48px;align-self:end;display:flex;flex-direction:column;gap:8px;font-size:13px;color:#777}
.sec{padding:88px 0;border-bottom:1px solid #111}
.sec .lab{grid-column:1/3;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.08em}
.sec .lab span{display:block;color:#f2501c;font-size:44px;font-weight:700;letter-spacing:-.04em;margin-bottom:6px;text-transform:none}
.sec .cont{grid-column:3/13}
.srow{display:grid;grid-template-columns:60px minmax(0,1.2fr) minmax(0,2fr) 140px 120px;gap:24px;padding:26px 0;border-top:1px solid #ddd;align-items:baseline;transition:padding .25s}
.srow:hover{padding-left:12px;color:#f2501c}
.srow:hover p{color:#111}
.srow b{font-size:26px;font-weight:600;letter-spacing:-.02em}
.srow p{color:#555}
.srow i{font-style:normal;font-size:14px;color:#777}
.srow .pr{font-weight:600;text-align:right}
.cases{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
.case{border-top:4px solid #111;padding-top:20px}
.case .m{font-size:64px;font-weight:700;letter-spacing:-.05em;line-height:1;color:#f2501c}
.case .ml{font-size:14px;color:#555;margin:6px 0 22px}
.case h3{font-size:20px;letter-spacing:-.01em}
.case .c{font-size:13px;color:#777;margin-top:4px}
.case p{margin-top:12px;color:#444;font-size:15px}
.steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:24px}
.st .n{font-size:13px;color:#777;border-bottom:1px solid #111;padding-bottom:10px;margin-bottom:16px;display:flex;justify-content:space-between}
.st h3{font-size:19px;margin-bottom:8px}
.st p{font-size:14px;color:#555}
.price{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border:1px solid #111}
.pl{padding:32px;border-right:1px solid #111}
.pl:last-child{border-right:0}
.pl.hot{background:#111;color:#fff}
.pl .t{font-size:14px;text-transform:uppercase;letter-spacing:.08em;font-weight:600}
.pl .p{font-size:40px;font-weight:700;letter-spacing:-.04em;margin:18px 0 4px}
.pl .f{font-size:14px;opacity:.65;margin-bottom:24px}
.pl li{list-style:none;padding:9px 0;border-top:1px solid rgba(128,128,128,.3);font-size:15px}
.pl.hot .p{color:#f2501c}
.faq details{border-top:1px solid #ddd;padding:22px 0}
.faq summary{font-size:22px;font-weight:600;cursor:pointer;list-style:none;display:flex;justify-content:space-between;letter-spacing:-.01em}
.faq summary::after{content:'+';color:#f2501c;font-weight:400}
.faq details[open] summary::after{content:'−'}
.faq p{margin-top:12px;color:#555;max-width:720px}
.contact{padding:120px 0 64px}
.contact h2{grid-column:1/10;font-size:clamp(40px,6vw,96px);line-height:.95;letter-spacing:-.045em}
.contact .side{grid-column:10/13;align-self:end;font-size:15px;color:#555}
.contact .side a.tg{display:block;font-size:28px;font-weight:700;color:#f2501c;margin-bottom:10px;letter-spacing:-.02em}
footer{border-top:1px solid #111;padding:24px 0;font-size:13px;color:#777}
footer .w{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}
@media(max-width:980px){.g{grid-template-columns:minmax(0,1fr)}.hero .idx,.hero h1,.hero .lead,.hero .cta,.sec .lab,.sec .cont,.contact h2,.contact .side{grid-column:1/-1}.sec .lab{margin-bottom:28px}.srow{grid-template-columns:40px minmax(0,1fr);row-gap:6px}.srow p,.srow i,.srow .pr{grid-column:2}.srow .pr{text-align:left}.cases,.steps,.price{grid-template-columns:minmax(0,1fr)}.pl{border-right:0;border-bottom:1px solid #111}nav{display:none}}
@media(max-width:640px){.w{padding:0 18px}.hero{padding:56px 0 40px}.sec{padding:56px 0}.btn{padding:12px 16px}}`;
  const body = `
<header><div class="w">${logo()}<nav><a href="#s">Услуги</a><a href="#c">Кейсы</a><a href="#p">Процесс</a><a href="#pr">Цены</a><a href="#f">Вопросы</a></nav><a class="btn" href="${TG}">Обсудить задачу →</a></div></header>
<section class="hero"><div class="w g">
<div class="idx rv">Студия разработки<br>с 2021 года</div>
<h1 class="rv d1">${C.slogan.replace('работа', '<em>работа</em>')}</h1>
<p class="lead rv d2">${C.lead}</p>
<div class="cta rv d3"><a class="btn" href="${TG}">Написать в Telegram ${TGH}</a><span>Отвечаем в течение 15 минут в рабочее время</span></div>
</div></section>
<section class="sec" id="s"><div class="w g"><div class="lab"><span>01</span>Услуги</div><div class="cont">
${C.services.map((s, i) => `<div class="srow rv"><i>0${i + 1}</i><b>${s.t}</b><p>${s.s}</p><i>${s.d}</i><span class="pr">${s.p}</span></div>`).join('')}
</div></div></section>
<section class="sec" id="c"><div class="w g"><div class="lab"><span>02</span>Кейсы</div><div class="cont cases">
${C.cases.slice(0, 6).map((c, i) => `<article class="case rv d${i % 3}"><div class="m">${c.m}</div><div class="ml">${c.ml}</div><h3>${c.t}</h3><div class="c">${c.c} · ${c.tag}</div><p>${c.r}</p></article>`).join('')}
</div></div></section>
<section class="sec" id="p"><div class="w g"><div class="lab"><span>03</span>Процесс</div><div class="cont steps">
${C.steps.map((s, i) => `<div class="st rv d${i}"><div class="n"><span>0${i + 1}</span><span>${s.d}</span></div><h3>${s.t}</h3><p>${s.s}</p></div>`).join('')}
</div></div></section>
<section class="sec" id="pr"><div class="w g"><div class="lab"><span>04</span>Цены</div><div class="cont price rv">
${C.plans.map(p => `<div class="pl${p.hot ? ' hot' : ''}"><div class="t">${p.t}</div><div class="p">${p.p}</div><div class="f">${p.for}</div><ul>${p.f.map(x => `<li>${x}</li>`).join('')}</ul></div>`).join('')}
</div></div></section>
<section class="sec faq" id="f"><div class="w g"><div class="lab"><span>05</span>Вопросы</div><div class="cont">
${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}
</div></div></section>
<section class="contact"><div class="w g"><h2 class="rv">Расскажите о задаче. Ответим с идеей и оценкой.</h2><div class="side rv d2"><a class="tg" href="${TG}">${TGH}</a>Telegram — самый быстрый способ связаться. Первый разбор бесплатный.</div></div></section>
<footer><div class="w"><span>© 2026 Финес Студио</span><span>Telegram-боты · CRM · веб-сервисы · интеграции</span><a href="${TG}">${TGH}</a></div></footer>`;
  return page({ n: 1, title: this.title, fonts: ['Inter Tight'], css, body });
} });

// 02 — Бенто-сетка
L.push({ n: 2, title: 'Бенто-сетка', idea: 'Вся главная — мозаика карточек разного размера: услуги, цифры, кейсы и отзыв в одном экране; для владельцев, которые сканируют, а не читают', build() {
  const css = `
body{font-family:'Onest',sans-serif;background:#f1efe9;color:#1a1814}
.w{max-width:1280px;margin:0 auto;padding:0 24px}
header{display:flex;align-items:center;justify-content:space-between;padding:22px 0}
header nav{display:flex;gap:6px;background:#fff;border-radius:99px;padding:6px}
header nav a{padding:9px 16px;border-radius:99px;font-size:14px;font-weight:500;transition:background .2s}
header nav a:hover{background:#f1efe9}
.pill{background:#1a1814;color:#fff;padding:12px 20px;border-radius:99px;font-weight:600;font-size:14px;transition:transform .2s}
.pill:hover{transform:translateY(-2px)}
.bento{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:minmax(150px,auto);gap:14px;margin-bottom:14px}
.b{background:#fff;border-radius:28px;padding:28px;position:relative;overflow:hidden;transition:transform .35s cubic-bezier(.2,.7,.2,1),box-shadow .35s}
.b:hover{transform:translateY(-4px);box-shadow:0 18px 40px -20px rgba(0,0,0,.25)}
.b h3{font-size:22px;letter-spacing:-.02em;margin-bottom:8px}
.b p{font-size:15px;color:#5d584f;line-height:1.5}
.b .k{font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:#9a9388;font-weight:600;margin-bottom:14px}
.hero{grid-column:span 3;grid-row:span 2;background:#1a1814;color:#fff;padding:44px;display:flex;flex-direction:column;justify-content:space-between;min-height:440px}
.hero h1{font-size:clamp(38px,5.4vw,78px);line-height:.98;letter-spacing:-.045em;font-weight:800}
.hero h1 span{color:#f2501c}
.hero p{color:#bdb6aa;max-width:520px;font-size:18px;margin-top:20px}
.hero .row{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
.hero .row a{background:#f2501c;color:#fff;padding:15px 24px;border-radius:99px;font-weight:600}
.hero .row a.g{background:rgba(255,255,255,.1)}
.orb{position:absolute;right:-150px;top:-150px;width:340px;height:340px;opacity:.9}
.orb circle{mix-blend-mode:screen}
.stat{background:#ffc21a}
.stat .v{font-size:64px;font-weight:800;letter-spacing:-.05em;line-height:1}
.stat2{background:#f2501c;color:#fff}.stat2 p{color:#ffe1d6}
.stat2 .v{font-size:64px;font-weight:800;letter-spacing:-.05em;line-height:1}
.svc{grid-column:span 1}
.svc{display:flex;flex-direction:column}.svc>div:last-child{margin-top:auto!important;padding-top:16px}
.svc .ic{width:46px;height:46px;border-radius:14px;background:#f1efe9;display:grid;place-items:center;font-weight:800;margin-bottom:28px;color:#f2501c;font-size:18px}
.wide{grid-column:span 2}
.case{grid-column:span 2;background:#e6e1d6;display:flex;flex-direction:column;justify-content:space-between;min-height:260px}
.case .m{font-size:72px;font-weight:800;letter-spacing:-.05em;line-height:1}
.case .t{display:flex;justify-content:space-between;gap:12px;align-items:flex-end}
.chip{display:inline-block;background:#fff;border-radius:99px;padding:6px 12px;font-size:12px;font-weight:600}
.chat{grid-column:span 2;grid-row:span 2;background:#dfe9f5}
.bub{background:#fff;border-radius:18px 18px 18px 4px;padding:12px 16px;font-size:14px;max-width:80%;margin-bottom:10px;box-shadow:0 2px 0 rgba(0,0,0,.04)}
.bub.me{margin-left:auto;background:#2f8be6;color:#fff;border-radius:18px 18px 4px 18px}
.btns{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0 10px}
.btns span{background:#fff;border-radius:10px;padding:8px 12px;font-size:13px;color:#2f8be6;font-weight:600}
.rev{grid-column:span 2;background:#fff}
.rev q{display:block;font-size:20px;line-height:1.4;letter-spacing:-.01em;quotes:none}
.rev .who{margin-top:18px;font-size:14px;color:#9a9388}
.steps{grid-column:span 4;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;background:none;padding:0}
.steps:hover{transform:none;box-shadow:none}
.steps>div{background:#fff;border-radius:22px;padding:22px}
.steps .n{font-size:13px;font-weight:700;color:#f2501c;margin-bottom:24px}
.steps h4{font-size:17px;margin-bottom:6px}
.steps p{font-size:13px}
.price{grid-column:span 4;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;padding:0;background:none}
.price:hover{transform:none;box-shadow:none}
.price>div{background:#fff;border-radius:28px;padding:30px}
.price .hot{background:#1a1814;color:#fff}
.price .p{font-size:36px;font-weight:800;letter-spacing:-.04em;margin:10px 0 18px}
.price li{list-style:none;font-size:14px;padding:6px 0;color:inherit;opacity:.8}
.price li::before{content:'✓  ';color:#f2501c;font-weight:800}
.faq{grid-column:span 2}
.faq details{border-top:1px solid #eee;padding:14px 0}
.faq summary{font-weight:600;cursor:pointer}
.faq details p{margin-top:8px}
.cta{grid-column:span 2;background:#f2501c;color:#fff;display:flex;flex-direction:column;justify-content:space-between}
.cta h2{font-size:44px;letter-spacing:-.04em;line-height:1}
.cta a{background:#fff;color:#1a1814;padding:16px 24px;border-radius:99px;font-weight:700;align-self:flex-start;margin-top:24px}
.h2{font-size:15px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#9a9388;margin:46px 0 16px 8px}
footer{padding:36px 8px;color:#9a9388;font-size:13px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}
@media(max-width:1000px){.bento{grid-template-columns:repeat(2,minmax(0,1fr))}.hero{grid-column:span 2}.steps,.price{grid-column:span 2;grid-template-columns:repeat(2,minmax(0,1fr))}header nav{display:none}}
@media(max-width:640px){.bento{grid-template-columns:minmax(0,1fr)}.hero,.wide,.case,.chat,.rev,.steps,.price,.faq,.cta,.svc{grid-column:span 1}.steps,.price{grid-template-columns:minmax(0,1fr)}.hero{padding:28px;min-height:0;grid-row:auto}.chat{grid-row:auto}.case .m,.stat .v,.stat2 .v{font-size:52px}.cta h2{font-size:34px}}`;
  const ini = ['ТБ', 'CR', 'ВС', 'API', 'WWW'];
  const body = `<div class="w">
<header>${logo()}<nav><a href="#svc">Услуги</a><a href="#cases">Кейсы</a><a href="#steps">Как работаем</a><a href="#price">Цены</a></nav><a class="pill" href="${TG}">Написать</a></header>
<section class="bento" id="svc">
<div class="b hero rv"><svg class="orb" viewBox="0 0 20 20"><g style="transform-origin:10px 10px;animation:fspin 14s linear infinite"><circle cx="7" cy="10" r="6" fill="#f2501c"/><circle cx="13" cy="10" r="6" fill="#ffc21a"/></g></svg><div style="position:relative"><div class="k" style="color:#8a8378">Финес Студио · разработка для малого бизнеса</div><h1>Тонкая <span>работа</span> для вашего бизнеса.</h1><p>${C.lead}</p></div><div class="row"><a href="${TG}">Обсудить проект</a><a class="g" href="#cases">Смотреть кейсы</a></div></div>
<div class="b stat rv d1"><div class="k" style="color:#7a5c00">Запущено</div><div class="v">60+</div><p style="color:#5c4500">проектов для кофеен, салонов, сервисов и B2B</p></div>
<div class="b stat2 rv d2"><div class="k" style="color:#ffd2c2">Средний срок</div><div class="v">2 нед</div><p>от брифа до работающего бота</p></div>
${C.services.slice(0, 4).map((s, i) => `<div class="b svc rv d${i}"><div class="ic">${ini[i]}</div><h3>${s.t}</h3><p>${s.s}</p><div style="margin-top:16px;font-weight:700;font-size:14px">${s.p}</div></div>`).join('')}
</section>
<div class="h2" id="cases">Кейсы и как это выглядит</div>
<section class="bento">
<div class="b chat rv"><div class="k">Так выглядит бот записи</div><div class="bub">Здравствуйте! Я бот студии «Лак» 💅 Выберите услугу:</div><div class="btns"><span>Маникюр</span><span>Педикюр</span><span>Покрытие</span></div><div class="bub me">Маникюр</div><div class="bub">Свободно завтра: 11:00, 14:30, 18:00. Какое время удобно?</div><div class="bub me">14:30</div><div class="bub">Готово! Мастер Оля ждёт вас в 14:30. Напомню за 2 часа 🙌</div></div>
${C.cases.slice(0, 2).map((c, i) => `<div class="b case rv d${i + 1}"><span class="chip">${c.tag}</span><div><div class="m">${c.m}</div><p>${c.ml}</p></div><div class="t"><div><h3 style="margin:0">${c.t}</h3><p>${c.c}</p></div></div></div>`).join('')}
<div class="b rev rv"><div class="k">Отзыв</div><q>${C.reviews[1].q}</q><div class="who">${C.reviews[1].n}, ${C.reviews[1].r}</div></div>
<div class="b wide rv d1" style="background:#1a1814;color:#fff"><div class="k">Стек</div><div style="display:flex;flex-wrap:wrap;gap:8px">${C.stack.map(s => `<span class="chip" style="background:rgba(255,255,255,.1);color:#fff">${s}</span>`).join('')}</div></div>
</section>
<div class="h2" id="steps">Как работаем</div>
<section class="bento"><div class="b steps">${C.steps.map((s, i) => `<div class="rv d${i}"><div class="n">0${i + 1} · ${s.d}</div><h4>${s.t}</h4><p>${s.s}</p></div>`).join('')}</div></section>
<div class="h2" id="price">Цены</div>
<section class="bento"><div class="b price">${C.plans.map((p, i) => `<div class="rv d${i}${p.hot ? ' hot' : ''}"><div class="k">${p.for}</div><h3>${p.t}</h3><div class="p">${p.p}</div><ul>${p.f.map(x => `<li>${x}</li>`).join('')}</ul></div>`).join('')}</div></section>
<section class="bento" style="margin-top:14px">
<div class="b faq rv"><div class="k">Частые вопросы</div>${C.faq.slice(0, 4).map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div>
<div class="b cta rv d1"><div class="k" style="color:#ffd2c2">Первый разбор — бесплатно</div><h2>Расскажите, что болит. Предложим решение.</h2><a href="${TG}">Написать ${TGH} →</a></div>
</section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span><a href="${TG}">${TGH}</a></footer>
</div>`;
  return page({ n: 2, title: this.title, css, body });
} });

// 03 — Терминал
L.push({ n: 3, title: 'Терминал', idea: 'Сайт как сессия в консоли: команды, вывод, мигающий курсор — для технических основателей и тех, кто любит код', build() {
  const css = `
body{font-family:'JetBrains Mono',monospace;background:#0c0d0c;color:#c9d1c8;font-size:15px;line-height:1.65}
.w{max-width:1100px;margin:0 auto;padding:0 24px}
header{display:flex;align-items:center;justify-content:space-between;padding:22px 0;border-bottom:1px dashed #2b2f2b;gap:16px}
header .flogo{color:#f4f1ea}
header nav{display:flex;gap:22px;font-size:13px}
header nav a{color:#7d867c}header nav a:hover{color:#ffc21a}
.win{border:1px solid #2b2f2b;border-radius:10px;background:#111311;margin:40px 0;overflow:hidden}
.bar{display:flex;align-items:center;gap:8px;padding:10px 14px;background:#171a17;border-bottom:1px solid #2b2f2b;font-size:12px;color:#6b736a}
.bar i{width:11px;height:11px;border-radius:50%;background:#3a3f3a;display:inline-block}
.bar i:nth-child(1){background:#f2501c}.bar i:nth-child(2){background:#ffc21a}
.bar span{margin-left:10px}
.body{padding:28px}
.p{color:#ffc21a}.p::before{content:'fines@studio:~$ ';color:#f2501c}
.o{color:#c9d1c8;margin:6px 0 22px}
.dim{color:#6b736a}
.ok{color:#7fd47f}
h1{font-size:clamp(30px,5vw,60px);line-height:1.08;color:#f4f1ea;font-weight:800;letter-spacing:-.03em;margin:12px 0 16px}
h1 b{color:#f2501c}
.cur{display:inline-block;width:.55em;height:1em;background:#f2501c;vertical-align:-.12em;animation:bl 1s steps(1) infinite}
@keyframes bl{50%{opacity:0}}
.btn{display:inline-block;border:1px solid #f2501c;color:#f2501c;padding:10px 18px;margin:6px 10px 0 0;transition:.2s}
.btn:hover{background:#f2501c;color:#0c0d0c}
table{width:100%;border-collapse:collapse;font-size:14px}
td,th{padding:10px 12px;border-bottom:1px dashed #2b2f2b;text-align:left;vertical-align:top}
th{color:#6b736a;font-weight:400}
td:first-child{color:#ffc21a;white-space:nowrap}
.tbl{overflow-x:auto}
.cases{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.case{border:1px solid #2b2f2b;padding:18px;border-radius:6px;transition:border-color .2s}
.case:hover{border-color:#f2501c}
.case .m{font-size:34px;color:#f2501c;font-weight:800}
.case .c{color:#6b736a;font-size:12px}
.case h3{color:#f4f1ea;font-size:15px;margin:8px 0}
.case p{font-size:13px;color:#9aa399}
.log div{display:grid;grid-template-columns:110px minmax(0,1fr);gap:16px;padding:6px 0}
.log span:first-child{color:#7fd47f}
pre{white-space:pre-wrap;font-family:inherit}
.prc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.prc>div{border:1px dashed #3a3f3a;padding:20px}
.prc .hot{border:1px solid #ffc21a}
.prc b{color:#f4f1ea;font-size:22px;display:block;margin:6px 0 12px}
.prc li{list-style:none;font-size:13px;color:#9aa399}.prc li::before{content:'+ ';color:#7fd47f}
details{border-bottom:1px dashed #2b2f2b;padding:12px 0}
summary{cursor:pointer;color:#f4f1ea}
summary::before{content:'? ';color:#ffc21a}
details p{color:#9aa399;margin-top:6px;padding-left:18px}
.big{font-size:clamp(26px,4vw,44px);color:#f4f1ea;font-weight:800;line-height:1.15}
footer{padding:30px 0 60px;color:#6b736a;font-size:12px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}
@media(max-width:800px){.cases,.prc{grid-template-columns:minmax(0,1fr)}header nav{display:none}.body{padding:18px}.log div{grid-template-columns:minmax(0,1fr);gap:0}}`;
  const body = `<div class="w">
<header>${logo(true)}<nav><a href="#ls">./услуги</a><a href="#cases">./кейсы</a><a href="#price">./цены</a><a href="#faq">./faq</a></nav><a class="btn" style="margin:0" href="${TG}">ssh ${TGH}</a></header>
<section class="win rv"><div class="bar"><i></i><i></i><i></i><span>fines — zsh — 120×40</span></div><div class="body">
<div class="p">whoami</div>
<div class="o">Финес Студио — студия разработки. Боты, CRM, веб-сервисы.</div>
<div class="p">cat slogan.txt</div>
<h1>Тонкая <b>работа</b><br>для вашего бизнеса.<span class="cur"></span></h1>
<div class="o">${C.lead}</div>
<a class="btn" href="${TG}">$ написать в telegram</a><a class="btn" href="#cases" style="border-color:#3a3f3a;color:#c9d1c8">$ ls ./кейсы</a>
</div></section>
<section class="win rv" id="ls"><div class="bar"><i></i><i></i><i></i><span>services.json</span></div><div class="body">
<div class="p">fines services --list --verbose</div>
<div class="tbl"><table><tr><th>услуга</th><th>что делаем</th><th>срок</th><th>цена</th></tr>
${C.services.map(s => `<tr><td>${s.t}</td><td>${s.s}</td><td class="dim">${s.d}</td><td style="white-space:nowrap">${s.p}</td></tr>`).join('')}</table></div>
</div></section>
<section class="win rv" id="cases"><div class="bar"><i></i><i></i><i></i><span>git log --cases</span></div><div class="body">
<div class="p">fines cases --sort=impact</div><div class="o dim">найдено 6 проектов</div>
<div class="cases">${C.cases.map(c => `<div class="case"><div class="c">[${c.tag}] ${c.c}</div><div class="m">${c.m}</div><div class="c">${c.ml}</div><h3>${c.t}</h3><p>${c.r}</p></div>`).join('')}</div>
</div></section>
<section class="win rv"><div class="bar"><i></i><i></i><i></i><span>deploy.log</span></div><div class="body">
<div class="p">fines deploy --project=ваш-бизнес</div>
<div class="log">${C.steps.map(s => `<div><span>[ok] ${s.d}</span><span><b style="color:#f4f1ea">${s.t}.</b> ${s.s}</span></div>`).join('')}<div><span class="ok">[done]</span><span class="ok">Проект запущен. Гарантия 30 дней активирована.</span></div></div>
</div></section>
<section class="win rv" id="price"><div class="bar"><i></i><i></i><i></i><span>pricing.yml</span></div><div class="body">
<div class="p">cat pricing.yml</div>
<div class="prc">${C.plans.map(p => `<div class="${p.hot ? 'hot' : ''}"><span class="dim"># ${p.for}</span><b>${p.t}: ${p.p}</b><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul></div>`).join('')}</div>
</div></section>
<section class="win rv" id="faq"><div class="bar"><i></i><i></i><i></i><span>man fines</span></div><div class="body">
<div class="p">man fines | grep -i вопрос</div>
${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}
</div></section>
<section class="win rv"><div class="bar"><i></i><i></i><i></i><span>contact.sh</span></div><div class="body">
<div class="p">./contact.sh</div>
<div class="big" style="margin:10px 0 18px">Опишите задачу в двух строках —<br>ответим с оценкой за день.</div>
<a class="btn" href="${TG}">$ open t.me/fines_studio</a>
<pre class="dim" style="margin-top:18px"># отвечаем в течение 15 минут в рабочее время
# первый разбор бесплатный</pre>
</div></section>
<footer><span>© 2026 Финес Студио</span><span>exit 0</span></footer>
</div>`;
  return page({ n: 3, title: this.title, fonts: ['JetBrains Mono'], css, body });
} });

// 04 — Брутализм
L.push({ n: 4, title: 'Брутализм', idea: 'Грубые рамки, системный шрифт, жёсткие блоки и крик капсом — для смелых брендов, которым надоели «красивые» шаблоны', build() {
  const css = `
body{font-family:'Rubik',sans-serif;background:#fff;color:#000}
.w{border-left:3px solid #000;border-right:3px solid #000;max-width:1400px;margin:0 auto}
header{display:grid;grid-template-columns:auto minmax(0,1fr) auto;border-bottom:3px solid #000}
header>*{padding:18px 22px;display:flex;align-items:center}
header nav{border-left:3px solid #000;gap:0;padding:0}
header nav a{padding:0 22px;height:100%;display:flex;align-items:center;font-weight:700;text-transform:uppercase;border-right:3px solid #000}
header nav a:hover{background:#ffc21a}
header .go{background:#f2501c;color:#000;font-weight:900;text-transform:uppercase;border-left:3px solid #000}
header .go:hover{background:#000;color:#f2501c}
.hero{border-bottom:3px solid #000;padding:40px 22px 0;overflow:hidden}
.hero h1{font-family:'Rubik Mono One',sans-serif;font-size:clamp(34px,8vw,124px);line-height:.95;text-transform:uppercase;letter-spacing:-.04em}
.hero h1 .o{background:#f2501c;padding:0 .08em}
.hero h1 .y{-webkit-text-stroke:2px #000;color:transparent}
.hrow{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:3px solid #000;margin:40px -22px 0}
.hrow>div{padding:22px;border-right:3px solid #000;font-size:18px;font-weight:500}
.hrow>div:last-child{border:0;background:#000;color:#fff}
.hrow a{display:block;font-family:'Rubik Mono One';font-size:22px;color:#ffc21a;margin-top:6px}
.tick{border-bottom:3px solid #000;background:#ffc21a;overflow:hidden;white-space:nowrap;padding:14px 0;font-family:'Rubik Mono One';font-size:22px}
.tick div{display:inline-block;animation:tk 22s linear infinite}
@keyframes tk{to{transform:translateX(-50%)}}
.sh{display:flex;justify-content:space-between;align-items:baseline;border-bottom:3px solid #000;padding:20px 22px}
.sh h2{font-family:'Rubik Mono One';font-size:clamp(28px,4vw,56px);text-transform:uppercase}
.sh span{font-weight:900;font-size:22px}
.svc{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));border-bottom:3px solid #000}
.svc>div{padding:22px;border-right:3px solid #000;min-height:320px;display:flex;flex-direction:column;transition:background .15s}
.svc>div:last-child{border-right:0}
.svc>div:hover{background:#f2501c}
.svc .num{font-family:'Rubik Mono One';font-size:48px;line-height:1}
.svc h3{font-size:24px;font-weight:900;text-transform:uppercase;margin:auto 0 10px}
.svc p{font-size:15px}
.svc .pr{margin-top:14px;font-weight:900;border-top:3px solid #000;padding-top:10px}
.cases>div{display:grid;grid-template-columns:200px minmax(0,1fr) minmax(0,1.3fr) 260px;border-bottom:3px solid #000}
.cases>div>*{padding:22px;border-right:3px solid #000}
.cases>div>*:last-child{border:0}
.cases .m{font-family:'Rubik Mono One';font-size:40px;background:#000;color:#ffc21a}
.cases h3{font-size:22px;font-weight:900;text-transform:uppercase}
.cases>div:hover .m{background:#f2501c;color:#000}
.steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));border-bottom:3px solid #000}
.steps>div{padding:22px;border-right:3px solid #000}.steps>div:last-child{border:0}
.steps b{display:inline-block;background:#000;color:#fff;padding:4px 10px;font-weight:900;margin-bottom:16px}
.steps h3{font-size:20px;font-weight:900;text-transform:uppercase;margin-bottom:8px}
.price{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-bottom:3px solid #000}
.price>div{padding:28px 22px;border-right:3px solid #000}.price>div:last-child{border:0}
.price .hot{background:#ffc21a}
.price .p{font-family:'Rubik Mono One';font-size:34px;margin:12px 0 16px}
.price li{list-style:none;font-weight:500;padding:6px 0;border-top:2px solid #000}
.faq details{border-bottom:3px solid #000;padding:20px 22px}
.faq summary{font-weight:900;font-size:22px;text-transform:uppercase;cursor:pointer}
.faq p{margin-top:10px;font-size:17px;max-width:800px}
.end{background:#f2501c;padding:60px 22px;border-bottom:3px solid #000}
.end h2{font-family:'Rubik Mono One';font-size:clamp(32px,6vw,90px);line-height:.95;text-transform:uppercase}
.end a{display:inline-block;margin-top:26px;background:#000;color:#fff;font-weight:900;font-size:22px;padding:18px 28px;border:3px solid #000;box-shadow:8px 8px 0 #fff;transition:.15s}
.end a:hover{transform:translate(4px,4px);box-shadow:4px 4px 0 #fff}
footer{padding:18px 22px;font-weight:700;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;text-transform:uppercase;font-size:13px}
@media(max-width:1000px){header{grid-template-columns:auto auto}header nav{display:none}.svc,.steps{grid-template-columns:minmax(0,1fr)}.svc>div,.steps>div{border-right:0;border-bottom:3px solid #000;min-height:0}.svc h3{margin-top:20px}.cases>div{grid-template-columns:minmax(0,1fr)}.cases>div>*{border-right:0;border-bottom:3px solid #000}.price,.hrow{grid-template-columns:minmax(0,1fr)}.price>div,.hrow>div{border-right:0;border-bottom:3px solid #000}}
@media(max-width:640px){.hero h1{font-size:34px}.hero h1 .y{-webkit-text-stroke:1.5px #000}.sh span{display:none}}`;
  const t = 'БОТЫ ✦ CRM ✦ ВЕБ-СЕРВИСЫ ✦ ИНТЕГРАЦИИ ✦ САЙТЫ ✦ ';
  const body = `<div class="w">
<header>${logo()}<nav><a href="#s">Услуги</a><a href="#c">Кейсы</a><a href="#p">Цены</a><a href="#f">FAQ</a></nav><a class="go" href="${TG}">Написать →</a></header>
<section class="hero"><h1 class="rv">Тонкая <span class="o">работа</span> <span class="y">для вашего</span> бизнеса.</h1>
<div class="hrow"><div>Боты, CRM и веб-сервисы для малого бизнеса. Без воды и без «сделаем как-нибудь».</div><div>Фиксируем цену в договоре. Показываем результат каждую неделю.</div><div>Пишите прямо сейчас:<a href="${TG}">${TGH}</a></div></div></section>
<div class="tick"><div>${t.repeat(8)}</div></div>
<section id="s"><div class="sh"><h2>Что делаем</h2><span>5 направлений</span></div><div class="svc">
${C.services.map((s, i) => `<div><div class="num">0${i + 1}</div><h3>${s.t}</h3><p>${s.s}</p><div class="pr">${s.p} · ${s.d}</div></div>`).join('')}</div></section>
<section id="c"><div class="sh"><h2>Кейсы</h2><span>цифры, не слова</span></div><div class="cases">
${C.cases.slice(0, 5).map(c => `<div><div class="m">${c.m}</div><div><h3>${c.t}</h3><p style="margin-top:6px">${c.c}</p></div><p>${c.r}</p><p style="font-weight:900">${c.ml.toUpperCase()}</p></div>`).join('')}</div></section>
<section><div class="sh"><h2>Процесс</h2><span>5 шагов</span></div><div class="steps">
${C.steps.map((s, i) => `<div><b>ШАГ ${i + 1} / ${s.d}</b><h3>${s.t}</h3><p>${s.s}</p></div>`).join('')}</div></section>
<section id="p"><div class="sh"><h2>Цены</h2><span>честно</span></div><div class="price">
${C.plans.map(p => `<div class="${p.hot ? 'hot' : ''}"><b style="text-transform:uppercase">${p.t} — ${p.for}</b><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul></div>`).join('')}</div></section>
<section class="faq" id="f"><div class="sh"><h2>Вопросы</h2><span>?</span></div>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</section>
<section class="end"><h2>Хватит терять заявки.</h2><a href="${TG}">${TGH} →</a></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer>
</div>`;
  return page({ n: 4, title: this.title, fonts: ['Rubik', 'Rubik Mono One'], css, body });
} });

// 05 — Редакционный журнал
L.push({ n: 5, title: 'Редакционный журнал', idea: 'Подача как у делового журнала: серифные заголовки, колонки, буквица и кейсы-статьи — для клиентов, которые читают и ценят экспертизу', build() {
  const css = `
body{font-family:'Manrope',sans-serif;background:#f7f4ee;color:#1c1a17;font-size:16px;line-height:1.6}
.w{max-width:1240px;margin:0 auto;padding:0 32px}
.top{display:flex;justify-content:space-between;font-size:12px;letter-spacing:.12em;text-transform:uppercase;padding:14px 0;border-bottom:1px solid #1c1a17;color:#6b655b}
.mast{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:26px 0;border-bottom:4px double #1c1a17}
.mast .flogo{--lg:48px;justify-self:center;align-items:center}
.mast .flogo .fs{padding-left:.34em}
.mast nav{display:flex;gap:22px;font-size:14px;font-weight:600}
.mast nav:last-child{justify-content:flex-end}
.mast a:hover{color:#f2501c}
.ser{font-family:'Playfair Display',serif}
.lead{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:48px;padding:48px 0;border-bottom:1px solid #1c1a17}
.kick{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#f2501c;font-weight:700}
.lead h1{font-family:'Playfair Display',serif;font-size:clamp(44px,6.5vw,96px);line-height:.98;font-weight:900;letter-spacing:-.02em;margin:14px 0 22px}
.lead h1 i{font-weight:400;color:#f2501c}
.lead .dek{font-size:22px;font-family:'Playfair Display',serif;font-style:italic;color:#4a453d;max-width:640px}
.by{margin-top:24px;font-size:13px;color:#6b655b}
.side{border-left:1px solid #1c1a17;padding-left:32px}
.side h3{font-family:'Playfair Display',serif;font-size:24px;margin:8px 0 14px}
.side li{list-style:none;padding:12px 0;border-top:1px solid #d6cfc2;font-size:15px}
.side li b{display:block;font-family:'Playfair Display';font-size:18px}
.btn{display:inline-block;margin-top:22px;background:#1c1a17;color:#f7f4ee;padding:14px 22px;font-weight:700;font-size:14px;transition:.2s}
.btn:hover{background:#f2501c}
.cols{columns:3;column-gap:40px;column-rule:1px solid #d6cfc2;padding:40px 0;border-bottom:1px solid #1c1a17}
.cols p{margin-bottom:14px}
.cols p:first-child::first-letter{font-family:'Playfair Display';float:left;font-size:84px;line-height:.8;padding:6px 10px 0 0;color:#f2501c;font-weight:900}
.cols h4{font-family:'Playfair Display';font-size:22px;break-after:avoid;margin:6px 0}
.sec{padding:56px 0;border-bottom:1px solid #1c1a17}
.sec h2{font-family:'Playfair Display';font-size:clamp(34px,4vw,56px);font-weight:900;line-height:1;margin-bottom:34px;display:flex;justify-content:space-between;align-items:baseline;gap:16px}
.sec h2 small{font-family:'Manrope';font-size:13px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:#6b655b}
.stories{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr) minmax(0,1fr);gap:40px}
.story{border-top:3px solid #1c1a17;padding-top:16px}
.story.big .ph{height:300px}
.ph{height:170px;background:linear-gradient(135deg,#f2501c,#ffc21a);margin:12px 0 16px;position:relative;overflow:hidden}
.ph span{position:absolute;left:18px;bottom:6px;font-family:'Playfair Display';font-size:80px;font-weight:900;color:#fff;line-height:1;letter-spacing:-.03em}
.story:nth-child(2) .ph{background:#1c1a17}.story:nth-child(2) .ph span{color:#ffc21a}
.story:nth-child(3) .ph{background:#e3dccd}.story:nth-child(3) .ph span{color:#f2501c}
.story h3{font-family:'Playfair Display';font-size:26px;line-height:1.15}
.story.big h3{font-size:36px}
.story p{color:#4a453d;margin-top:10px}
.quote{padding:72px 0;border-bottom:1px solid #1c1a17;text-align:center}
.quote q{font-family:'Playfair Display';font-style:italic;font-size:clamp(28px,3.6vw,48px);line-height:1.2;display:block;max-width:980px;margin:0 auto;quotes:'«' '»'}
.quote .who{margin-top:22px;font-size:13px;letter-spacing:.12em;text-transform:uppercase}
.svc{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:28px}
.svc>div{border-top:1px solid #1c1a17;padding-top:14px}
.svc h3{font-family:'Playfair Display';font-size:22px;margin-bottom:8px}
.svc p{font-size:14px;color:#4a453d}
.svc .pr{margin-top:12px;font-weight:700;font-size:14px;color:#f2501c}
.toc{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:0;counter-reset:s}
.toc>div{padding:0 20px;border-left:1px solid #d6cfc2}
.toc>div:first-child{border:0;padding-left:0}
.toc .n{font-family:'Playfair Display';font-size:56px;font-weight:900;color:#f2501c;line-height:1}
.toc h3{font-family:'Playfair Display';font-size:20px;margin:6px 0}
.toc p{font-size:14px;color:#4a453d}
.faq{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 48px}
.faq h4{font-family:'Playfair Display';font-size:21px;margin-bottom:6px}
.faq p{color:#4a453d}
.sub{padding:72px 0;text-align:center}
.sub h2{font-family:'Playfair Display';font-size:clamp(36px,5vw,72px);font-weight:900;line-height:1}
.sub p{font-size:18px;color:#4a453d;margin:16px 0 8px}
footer{border-top:4px double #1c1a17;padding:22px 0 40px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#6b655b;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}
@media(max-width:1000px){.mast{grid-template-columns:minmax(0,1fr)}.mast nav{display:none}.lead,.stories,.faq{grid-template-columns:minmax(0,1fr)}.side{border-left:0;padding-left:0;border-top:1px solid #1c1a17;padding-top:24px}.cols{columns:1}.svc,.toc{grid-template-columns:minmax(0,1fr)}.toc>div{border-left:0;padding:16px 0;border-top:1px solid #d6cfc2}}
@media(max-width:640px){.w{padding:0 18px}.top span:nth-child(2){display:none}.mast .flogo{--lg:40px}}`;
  const body = `<div class="w">
<div class="top"><span>Выпуск № 12 · ноябрь 2026</span><span>Журнал о тонкой разработке</span><span>Москва — онлайн</span></div>
<div class="mast"><nav><a href="#svc">Услуги</a><a href="#stories">Кейсы</a></nav>${logo()}<nav><a href="#how">Процесс</a><a href="${TG}">Контакты</a></nav></div>
<section class="lead"><div class="rv"><div class="kick">Главная тема номера</div><h1>Тонкая работа <i>для вашего</i> бизнеса.</h1><p class="dek">Как небольшая студия делает Telegram-ботов, CRM и веб-сервисы, после которых владельцы перестают жить в Excel и мессенджерах.</p><div class="by">Текст: команда Финес Студио · 6 минут чтения</div><a class="btn" href="${TG}">Обсудить свой проект →</a></div>
<aside class="side rv d2"><div class="kick">В этом номере</div><h3>Что вы узнаете</h3><ul>${C.services.slice(0, 4).map(s => `<li><b>${s.t}</b>${s.s.split('.')[0]}.</li>`).join('')}</ul></aside></section>
<section class="cols rv"><p>Малый бизнес теряет деньги не на рекламе, а на рутине: администратор полдня отвечает в директ, заявки с сайта ложатся в почту и забываются, менеджер переносит заказ из таблицы в 1С вручную. Мы делаем так, чтобы эта рутина исчезала.</p><h4>Начинаем с разговора</h4><p>Первые полчаса — бесплатный разбор. Мы спрашиваем, где теряются время и клиенты, и только потом предлагаем решение: иногда это бот за две недели, иногда — простая интеграция за пять дней.</p><h4>Цена — до старта</h4><p>Смету фиксируем в договоре. Демо — каждую неделю. Код, доступы и документация остаются у вас. Мы считаем, что это нормально, а не «бонус».</p><p>За пять лет студия запустила больше шестидесяти проектов: от бота предзаказа для кофейни до CRM для оптового поставщика с синхронизацией 1С.</p></section>
<section class="sec" id="stories"><h2>Истории клиентов <small>Кейсы</small></h2><div class="stories">
${C.cases.slice(0, 3).map((c, i) => `<article class="story rv d${i}${i === 0 ? ' big' : ''}"><div class="kick">${c.tag} · ${c.c}</div><div class="ph"><span>${c.m}</span></div><h3>${c.t}: ${c.ml}</h3><p>${c.r}</p></article>`).join('')}
</div></section>
<section class="quote rv"><q>${C.reviews[0].q}</q><div class="who">${C.reviews[0].n} — ${C.reviews[0].r}</div></section>
<section class="sec" id="svc"><h2>Рубрики студии <small>Услуги и цены</small></h2><div class="svc">${C.services.map((s, i) => `<div class="rv d${i}"><h3>${s.t}</h3><p>${s.s}</p><div class="pr">${s.p} · ${s.d}</div></div>`).join('')}</div></section>
<section class="sec" id="how"><h2>Как устроена работа <small>Процесс</small></h2><div class="toc">${C.steps.map((s, i) => `<div class="rv d${i}"><div class="n">${i + 1}</div><h3>${s.t}</h3><p>${s.s}</p></div>`).join('')}</div></section>
<section class="sec"><h2>Письма читателей <small>Вопросы</small></h2><div class="faq">${C.faq.map(f => `<div class="rv"><h4>${f.q}</h4><p>${f.a}</p></div>`).join('')}</div></section>
<section class="sub rv"><div class="kick">Подписка на результат</div><h2>Напишите в редакцию.</h2><p>Ответим за 15 минут и предложим решение под вашу задачу.</p><a class="btn" href="${TG}">${TGH}</a></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span><span>${TGH}</span></footer>
</div>`;
  return page({ n: 5, title: this.title, fonts: ['Manrope', 'Playfair Display'], css, body });
} });

export default L;
