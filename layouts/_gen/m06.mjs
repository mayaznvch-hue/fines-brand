import { page, logo, C, TG, TGH, dot } from './core.mjs';
const L = [];

// 26 — Нео-брутализм
L.push({ n: 26, title: 'Нео-брутализм', idea: 'Жирные чёрные обводки, жёсткие тени, кислотные плашки, наклейки и стикеры; дерзко и весело, для смелых предпринимателей и молодых брендов', build() {
  const css = `
body{font-family:'Onest',sans-serif;background:#fff4e0;color:#111;font-size:17px;}
.mqw{overflow:hidden;padding:20px 0}.mqw .mq{margin:30px -20px}
.w{max-width:1200px;margin:0 auto;padding:0 22px}
.bx{border:3px solid #111;box-shadow:6px 6px 0 #111;border-radius:14px;background:#fff}
header{margin:18px auto 0;display:flex;align-items:center;justify-content:space-between;padding:12px 18px;gap:12px}
header nav{display:flex;gap:6px}
header nav a{padding:8px 14px;border-radius:99px;font-weight:700;font-size:15px;border:2px solid transparent}
header nav a:hover{border-color:#111;background:#ffc21a}
.bt{display:inline-block;background:#f2501c;color:#fff;border:3px solid #111;box-shadow:4px 4px 0 #111;border-radius:12px;padding:12px 20px;font-weight:800;font-size:16px;transition:transform .1s,box-shadow .1s}
.bt:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 #111}
.bt:active{transform:translate(4px,4px);box-shadow:0 0 0 #111}
.bt.y{background:#ffc21a;color:#111}.bt.w{background:#fff;color:#111}
.hero{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:26px;margin-top:30px}
.hero .l{padding:40px;background:#c9f0ff;position:relative}
.hero h1{font-size:clamp(42px,6vw,84px);line-height:.95;font-weight:900;letter-spacing:-.04em}
.hero h1 mark{background:#ffc21a;padding:0 .12em;border:3px solid #111;border-radius:10px;display:inline-block;transform:rotate(-2deg);margin:.08em 0}
.hero p{font-size:19px;margin:22px 0 26px;max-width:520px;font-weight:500}
.hero .r{display:flex;gap:14px;flex-wrap:wrap}
.stk{position:absolute;top:-18px;right:24px;background:#ff8ad8;border:3px solid #111;border-radius:99px;padding:8px 16px;font-weight:800;transform:rotate(6deg);font-size:14px}
.hero .rr{display:grid;gap:18px;grid-template-rows:auto 1fr}
.hero .tg{padding:20px;background:#fff}
.hero .tg p{background:#f1f1f1;border:2px solid #111;border-radius:12px 12px 12px 2px;padding:10px 12px;margin:6px 0;font-size:15px;max-width:88%}
.hero .tg p.u{background:#f2501c;color:#fff;margin-left:auto;border-radius:12px 12px 2px 12px}
.hero .nm{padding:20px;background:#b8ff8a;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;align-content:center}
.hero .nm b{display:block;font-size:40px;font-weight:900;letter-spacing:-.04em;line-height:1}.hero .nm span{font-size:14px;font-weight:600}
.mq{margin:50px 0;background:#111;color:#ffc21a;overflow:hidden;transform:rotate(-1.5deg);border-top:3px solid #111;border-bottom:3px solid #111}
.mq div{display:flex;gap:40px;white-space:nowrap;padding:14px 0;font-weight:900;font-size:26px;animation:mq 30s linear infinite;width:max-content}
@keyframes mq{to{transform:translateX(-50%)}}
h2{font-size:clamp(34px,4.6vw,60px);font-weight:900;letter-spacing:-.04em;line-height:1;margin-bottom:28px}
h2 span{background:#f2501c;color:#fff;padding:0 .15em;border:3px solid #111;border-radius:10px;display:inline-block;transform:rotate(1.5deg)}
.sec{padding:40px 0}
.svc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
.svc .bx{padding:26px;transition:transform .15s}
.svc .bx:hover{transform:rotate(-1deg) translateY(-4px)}
.svc .e{width:58px;height:58px;border:3px solid #111;border-radius:14px;display:grid;place-items:center;font-size:28px;margin-bottom:16px}
.svc h3{font-size:24px;font-weight:900;letter-spacing:-.02em;margin-bottom:8px}
.svc p{font-size:16px;line-height:1.45}
.svc .pr{display:inline-block;margin-top:16px;background:#111;color:#fff;border-radius:8px;padding:5px 10px;font-weight:700;font-size:14px}
.cs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
.cs .bx{padding:24px}
.cs .m{font-size:58px;font-weight:900;letter-spacing:-.05em;line-height:1}
.cs h3{font-size:18px;margin:8px 0 6px}.cs p{font-size:15px}
.steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
.steps .bx{padding:18px;position:relative}
.steps .n{position:absolute;top:-16px;left:14px;width:36px;height:36px;border:3px solid #111;border-radius:50%;background:#ffc21a;display:grid;place-items:center;font-weight:900}
.steps h3{font-size:18px;margin:14px 0 6px}.steps p{font-size:14.5px}.steps small{display:block;margin-top:8px;font-weight:700;color:#f2501c}
.pl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;align-items:start}
.pl .bx{padding:28px}
.pl .hot{background:#ffc21a;transform:rotate(-1.5deg)}
.pl .p{font-size:40px;font-weight:900;letter-spacing:-.04em;margin:8px 0 14px}
.pl li{list-style:none;padding:6px 0;border-bottom:2px dashed #111;font-weight:500}
.pl ul{margin-bottom:20px}
.rv2{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
.rv2 .bx{padding:24px}
.rv2 q{display:block;quotes:none;font-size:17px;font-weight:500;margin-bottom:14px}
.faq{display:grid;gap:14px}
.faq details{padding:16px 20px}.faq summary{font-weight:800;cursor:pointer;font-size:18px}.faq p{margin-top:8px}
.end{margin:50px 0;padding:56px 40px;background:#f2501c;color:#fff;text-align:center}
.end h2{color:#fff}.end h2 span{background:#ffc21a;color:#111}
footer{display:flex;justify-content:space-between;padding:10px 0 40px;font-weight:700;flex-wrap:wrap;gap:10px}
@media(max-width:900px){header nav{display:none}.hero,.svc,.cs,.pl,.rv2{grid-template-columns:minmax(0,1fr)}.steps{grid-template-columns:repeat(2,minmax(0,1fr))}.hero .l{padding:26px}.end{padding:36px 20px}}
@media(max-width:480px){.steps{grid-template-columns:minmax(0,1fr)}}`;
  const em = ['🤖', '📊', '🌐', '🔌', '🛒'], bg = ['#ffe3f4', '#e3f0ff', '#e6ffd9', '#fff1c2', '#ffe1d6'];
  const items = 'БОТЫ ✦ CRM ✦ ВЕБ-СЕРВИСЫ ✦ ИНТЕГРАЦИИ ✦ САЙТЫ ✦ АВТОМАТИЗАЦИЯ ✦ ';
  const body = `<div class="w"><header class="bx">${logo()}<nav><a href="#s">Услуги</a><a href="#c">Кейсы</a><a href="#p">Цены</a><a href="#f">FAQ</a></nav><a class="bt y" href="${TG}">Написать</a></header>
<section class="hero"><div class="l bx rv"><span class="stk">свободно 2 места!</span><h1>Тонкая <mark>работа</mark> для вашего бизнеса.</h1><p>Боты, CRM и веб-сервисы, которые убирают ручную рутину. Без воды, без «нам нужно ещё две недели» и без занудства.</p><div class="r"><a class="bt" href="${TG}">Обсудить проект →</a><a class="bt w" href="#c">Смотреть кейсы</a></div></div>
<div class="rr"><div class="tg bx rv d1"><b>@fines_studio</b><p class="u">Нужен бот для записи в салон</p><p>Сделаем за 2 недели. Запись, напоминания, оплата 🔥</p><p class="u">А сколько?</p><p>От 40 000 ₽, цена фиксируется ✌️</p></div><div class="nm bx rv d2">${C.stats.map(s => `<div><b>${s.v}</b><span>${s.l}</span></div>`).join('')}</div></div></section></div>
<div class="mqw"><div class="mq"><div>${(items + items + items + items)}</div></div></div>
<div class="w"><section class="sec" id="s"><h2 class="rv">Что мы <span>делаем</span></h2><div class="svc">${C.services.map((s, i) => `<div class="bx rv d${i % 3}" style="background:${bg[i]}"><div class="e" style="background:#fff">${em[i]}</div><h3>${s.t}</h3><p>${s.s}</p><span class="pr">${s.p} · ${s.d}</span></div>`).join('')}<div class="bx rv" style="background:#111;color:#fff;padding:26px;display:flex;flex-direction:column;justify-content:space-between"><h3 style="font-size:24px;font-weight:900">Не нашли своё?</h3><p style="margin:10px 0 18px">Опишите задачу — придумаем, как автоматизировать.</p><a class="bt y" href="${TG}">Спросить →</a></div></div></section>
<section class="sec" id="c"><h2 class="rv">Кейсы <span>в цифрах</span></h2><div class="cs">${C.cases.map((c, i) => `<div class="bx rv d${i % 3}" style="background:${bg[i % 5]}"><div class="m">${c.m}</div><h3>${c.ml}</h3><p><b>${c.c}.</b> ${c.r}</p></div>`).join('')}</div></section>
<section class="sec"><h2 class="rv">Как <span>работаем</span></h2><div class="steps">${C.steps.map((s, i) => `<div class="bx rv d${i}"><div class="n">${i + 1}</div><h3>${s.t}</h3><p>${s.s}</p><small>${s.d}</small></div>`).join('')}</div></section>
<section class="sec" id="p"><h2 class="rv">Сколько <span>стоит</span></h2><div class="pl">${C.plans.map((p, i) => `<div class="bx rv d${i}${p.hot ? ' hot' : ''}"><b style="font-size:20px">${p.t}</b><div>${p.for}</div><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>✓ ${f}</li>`).join('')}</ul><a class="bt${p.hot ? '' : ' w'}" href="${TG}">Хочу так</a></div>`).join('')}</div></section>
<section class="sec"><h2 class="rv">Говорят <span>клиенты</span></h2><div class="rv2">${C.reviews.map((r, i) => `<div class="bx rv d${i}"><q>«${r.q}»</q><b>${r.n}</b><div style="font-size:14px">${r.r}</div></div>`).join('')}</div></section>
<section class="sec" id="f"><h2 class="rv">Частые <span>вопросы</span></h2><div class="faq">${C.faq.map(f => `<details class="bx"><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></section>
<section class="end bx rv"><h2>Погнали <span>делать?</span></h2><p style="font-size:19px;margin-bottom:26px">Ответим в Telegram за 15 минут. Разбор бесплатный.</p><a class="bt y" href="${TG}">Написать ${TGH} →</a></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div>`;
  return page({ n: 26, title: this.title, fonts: [], css, body });
} });

// 27 — Глассморфизм
L.push({ n: 27, title: 'Глассморфизм', idea: 'Матовое стекло поверх мягких анимированных цветовых пятен в фирменных цветах; современно и «дорого», для клиентов из сферы услуг и e-commerce', build() {
  const css = `
body{font-family:'Manrope',sans-serif;background:#160f1f;color:#fff;font-size:17px;overflow-x:hidden}
.blobs{position:fixed;inset:0;z-index:-1;overflow:hidden;background:#160f1f}
.blobs i{position:absolute;border-radius:50%;filter:blur(90px);opacity:.75;animation:fl 18s ease-in-out infinite alternate}
.blobs i:nth-child(1){width:560px;height:560px;background:#f2501c;left:-120px;top:-100px}
.blobs i:nth-child(2){width:480px;height:480px;background:#ffc21a;right:-80px;top:20%;animation-duration:22s}
.blobs i:nth-child(3){width:520px;height:520px;background:#8a3ffc;left:30%;bottom:-200px;animation-duration:26s}
.blobs i:nth-child(4){width:360px;height:360px;background:#ff5ca8;right:20%;bottom:10%;animation-duration:20s}
@keyframes fl{to{transform:translate(80px,-60px) scale(1.15)}}
.w{max-width:1180px;margin:0 auto;padding:0 22px}
.gl{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);backdrop-filter:blur(22px) saturate(160%);-webkit-backdrop-filter:blur(22px) saturate(160%);border-radius:24px;box-shadow:0 20px 50px -20px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.25)}
header{position:sticky;top:14px;z-index:20;margin:14px auto 0;display:flex;align-items:center;justify-content:space-between;padding:10px 12px 10px 22px;border-radius:99px}
header .flogo{--lg:26px;color:#fff}
header nav{display:flex;gap:26px;font-size:15px;font-weight:600;opacity:.85}
.bt{display:inline-block;background:#fff;color:#160f1f;border-radius:99px;padding:12px 22px;font-weight:800;font-size:15px;transition:.25s}
.bt:hover{background:#ffc21a}
.bt.g{background:rgba(255,255,255,.14);color:#fff;border:1px solid rgba(255,255,255,.3)}
.hero{padding:100px 0 60px;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:40px;align-items:center}
.hero .tag{display:inline-block;padding:8px 16px;border-radius:99px;font-size:14px;font-weight:600}
.hero h1{font-size:clamp(42px,6vw,82px);letter-spacing:-.045em;line-height:1;font-weight:800;margin:24px 0 22px}
.hero p{font-size:19px;opacity:.85;line-height:1.55;max-width:520px;margin-bottom:30px}
.hero .r{display:flex;gap:12px;flex-wrap:wrap}
.stack{position:relative;height:440px}
.stack .gl{position:absolute;padding:22px}
.c1{left:0;top:0;width:54%}.c2{right:0;top:60px;width:42%}.c3{left:14%;bottom:0;width:58%;background:rgba(40,20,60,.35)}
.c2{background:rgba(40,20,60,.35)}
.c1 h4,.c2 h4,.c3 h4{font-size:13px;opacity:.75;font-weight:600;margin-bottom:8px}
.c1 b{font-size:40px;letter-spacing:-.03em}
.c1 .bar{display:flex;gap:6px;align-items:flex-end;height:70px;margin-top:12px}
.c1 .bar i{flex:1;background:linear-gradient(#ffc21a,#f2501c);border-radius:6px 6px 2px 2px}
.c2 p{font-size:14.5px;background:rgba(255,255,255,.15);border-radius:14px;padding:9px 12px;margin:6px 0}
.c3 .r2{display:flex;justify-content:space-between;font-size:14.5px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.15)}
.sec{padding:70px 0}
.sh{text-align:center;margin-bottom:44px}
.sh h2{font-size:clamp(32px,4.4vw,56px);letter-spacing:-.04em;line-height:1.05;font-weight:800}
.sh p{opacity:.75;margin-top:12px}
.svc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.svc .gl{padding:28px;transition:transform .3s,background .3s}
.svc .gl:hover{transform:translateY(-6px);background:rgba(255,255,255,.16)}
.svc .ic{width:52px;height:52px;border-radius:16px;background:linear-gradient(135deg,#f2501c,#ffc21a);display:grid;place-items:center;font-size:24px;margin-bottom:18px;box-shadow:0 10px 30px -10px #f2501c}
.svc h3{font-size:21px;margin-bottom:8px}.svc p{opacity:.8;font-size:15.5px;line-height:1.5}
.svc .pr{margin-top:16px;font-weight:700;color:#ffc21a}
.cs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.cs .gl{padding:28px}
.cs .m{font-size:54px;font-weight:800;letter-spacing:-.04em;background:linear-gradient(90deg,#fff,#ffc21a);-webkit-background-clip:text;background-clip:text;color:transparent}
.cs p{opacity:.8;font-size:15px;margin-top:6px}
.proc{padding:34px;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:20px}
.proc .n{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.18);display:grid;place-items:center;font-weight:800;margin-bottom:14px}
.proc h3{font-size:18px;margin-bottom:6px}.proc p{font-size:14.5px;opacity:.8}
.pl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.pl .gl{padding:30px;display:flex;flex-direction:column}
.pl .hot{background:rgba(255,255,255,.22);border-color:rgba(255,194,26,.7)}
.pl .p{font-size:40px;font-weight:800;letter-spacing:-.04em;margin:10px 0 16px}
.pl li{list-style:none;padding:7px 0;opacity:.9}.pl li::before{content:'◆ ';color:#ffc21a}
.pl ul{margin-bottom:22px}.pl .bt{margin-top:auto;text-align:center}
.qt{padding:40px;text-align:center}
.qt q{display:block;quotes:none;font-size:clamp(22px,2.6vw,32px);font-weight:700;letter-spacing:-.02em;line-height:1.3;max-width:860px;margin:0 auto 16px}
.faq{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.faq details{padding:20px 22px;border-radius:18px}.faq summary{font-weight:700;cursor:pointer}.faq p{margin-top:8px;opacity:.85}
.end{padding:60px 30px;text-align:center;margin:40px 0}
.end h2{font-size:clamp(34px,5vw,64px);letter-spacing:-.045em;font-weight:800;margin-bottom:16px;line-height:1.02}
footer{display:flex;justify-content:space-between;opacity:.7;font-size:14px;padding:0 0 40px;gap:10px;flex-wrap:wrap}
@media(max-width:900px){header nav{display:none}.hero,.svc,.cs,.pl,.faq{grid-template-columns:minmax(0,1fr)}.proc{grid-template-columns:minmax(0,1fr)}.stack{height:auto;display:grid;gap:14px}.stack .gl{position:static;width:auto!important}.hero{padding:60px 0 40px}}`;
  const body = `<div class="blobs"><i></i><i></i><i></i><i></i></div><div class="w">
<header class="gl">${logo(true)}<nav><a href="#s">Услуги</a><a href="#c">Кейсы</a><a href="#p">Цены</a><a href="#f">Вопросы</a></nav><a class="bt" href="${TG}">Написать</a></header>
<section class="hero"><div><span class="tag gl rv">✦ Студия разработки для малого бизнеса</span><h1 class="rv d1">Тонкая работа для вашего бизнеса.</h1><p class="rv d2">${C.lead}</p><div class="r rv d3"><a class="bt" href="${TG}">Обсудить проект</a><a class="bt g" href="#c">Кейсы</a></div></div>
<div class="stack"><div class="gl c1 rv d1"><h4>Заявки через бота, ноябрь</h4><b>+31%</b><div class="bar">${[30, 42, 38, 55, 48, 66, 72, 80, 76, 92].map(h => `<i style="height:${h}%"></i>`).join('')}</div></div><div class="gl c2 rv d2"><h4>Бот записи · Студия «Лак»</h4><p>Свободно завтра в 14:30 ✨</p><p>Напомню за 2 часа до визита</p></div><div class="gl c3 rv d3"><h4>CRM · сегодня</h4><div class="r2"><span>Новые заявки</span><b>18</b></div><div class="r2"><span>Счета</span><b>7</b></div><div class="r2" style="border:0"><span>Оплачено</span><b>212 400 ₽</b></div></div></div></section>
<section class="sec" id="s"><div class="sh"><h2 class="rv">Услуги</h2><p>Пять направлений, один стандарт качества</p></div><div class="svc">${C.services.map((s, i) => `<div class="gl rv d${i % 3}"><div class="ic">${['🤖', '📊', '🌐', '🔌', '✨'][i]}</div><h3>${s.t}</h3><p>${s.s}</p><div class="pr">${s.p} · ${s.d}</div></div>`).join('')}<div class="gl rv" style="padding:28px"><div class="ic">🛟</div><h3>Поддержка</h3><p style="opacity:.8;font-size:15.5px">Мониторинг, бэкапы и доработки после запуска.</p><div class="pr" style="margin-top:16px;font-weight:700;color:#ffc21a">от 5 000 ₽/мес</div></div></div></section>
<section class="sec" id="c"><div class="sh"><h2 class="rv">Результаты клиентов</h2></div><div class="cs">${C.cases.map((c, i) => `<div class="gl rv d${i % 3}"><div class="m">${c.m}</div><b>${c.ml}</b><p>${c.c} · ${c.t}</p></div>`).join('')}</div></section>
<section class="sec"><div class="sh"><h2 class="rv">Как мы работаем</h2></div><div class="gl proc rv">${C.steps.map((s, i) => `<div><div class="n">${i + 1}</div><h3>${s.t}</h3><p>${s.s}</p></div>`).join('')}</div></section>
<section class="sec" id="p"><div class="sh"><h2 class="rv">Цены</h2><p>Фиксируем в договоре до старта</p></div><div class="pl">${C.plans.map((p, i) => `<div class="gl rv d${i}${p.hot ? ' hot' : ''}"><b style="font-size:20px">${p.t}</b><span style="opacity:.75">${p.for}</span><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul><a class="bt${p.hot ? '' : ' g'}" href="${TG}">Выбрать</a></div>`).join('')}</div></section>
<section class="sec"><div class="gl qt rv"><q>«${C.reviews[0].q}»</q><b>${C.reviews[0].n}</b> <span style="opacity:.7">· ${C.reviews[0].r}</span></div></section>
<section class="sec" id="f"><div class="sh"><h2 class="rv">Вопросы</h2></div><div class="faq">${C.faq.map(f => `<details class="gl"><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></section>
<section class="gl end rv"><h2>Сделаем красиво и надёжно</h2><p style="opacity:.8;margin-bottom:26px">Ответ в Telegram за 15 минут</p><a class="bt" href="${TG}">Написать ${TGH}</a></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div>`;
  return page({ n: 27, title: this.title, fonts: ['Manrope'], css, body });
} });

// 28 — Тёплый крафт
L.push({ n: 28, title: 'Тёплый крафт', idea: 'Крафтовая бумага, штампы, этикетки и рукописные пометки — как у ремесленной мастерской; подчёркивает «тонкую», ручную работу, для кафе, пекарен, салонов', build() {
  const css = `
body{font-family:'Literata',serif;background:#e8d9bf;color:#3b2a1a;font-size:17px;line-height:1.6;background-image:radial-gradient(rgba(120,80,40,.08) 1px,transparent 1.2px);background-size:6px 6px}
.w{max-width:1140px;margin:0 auto;padding:0 24px}
.hand{font-family:'Caveat',cursive}
header{display:flex;justify-content:space-between;align-items:center;padding:24px 0;border-bottom:2px dashed #a8865e}
header .flogo{color:#3b2a1a}
header nav{display:flex;gap:28px;font-size:16px;font-style:italic}
header nav a:hover{color:#c2410c}
.bt{display:inline-block;background:#c2410c;color:#fff6e9;padding:13px 22px;font-weight:600;border-radius:6px;box-shadow:0 3px 0 #7c2a08;transition:.15s;font-family:'Onest';font-size:16px}
.bt:hover{transform:translateY(-2px);box-shadow:0 5px 0 #7c2a08}
.bt.o{background:transparent;color:#3b2a1a;box-shadow:none;border:2px solid #3b2a1a}
.hero{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:50px;padding:70px 0 80px;align-items:center}
.hero .k{font-family:'Caveat';font-size:28px;color:#c2410c;transform:rotate(-2deg);display:inline-block}
.hero h1{font-family:'Literata';font-size:clamp(40px,5.6vw,74px);line-height:1.02;font-weight:800;letter-spacing:-.02em;margin:10px 0 22px}
.hero h1 em{font-style:italic;font-weight:400;color:#c2410c}
.hero p{font-size:19px;max-width:520px;margin-bottom:28px}
.hero .r{display:flex;gap:14px;flex-wrap:wrap;align-items:center}
.label{background:#fff6e9;border-radius:6px;padding:36px 30px;position:relative;box-shadow:0 2px 0 #c9b391,0 20px 40px -20px rgba(80,50,20,.5);transform:rotate(2deg)}
.label::before{content:'';position:absolute;top:-14px;left:50%;width:110px;height:30px;background:rgba(255,230,170,.75);transform:translateX(-50%) rotate(-3deg)}
.label .tt{text-align:center;border-top:2px solid #3b2a1a;border-bottom:2px solid #3b2a1a;padding:10px 0;margin-bottom:18px}
.label .tt .flogo{--lg:50px;color:#3b2a1a}
.label li{list-style:none;display:flex;justify-content:space-between;gap:10px;border-bottom:1px dotted #a8865e;padding:7px 0;font-size:16px}
.label li b{font-family:'Onest';font-weight:700;white-space:nowrap}
.stamp{position:absolute;right:-34px;top:-44px;width:120px;height:120px;border:3px solid #c2410c;border-radius:50%;display:grid;place-items:center;text-align:center;color:#c2410c;font-family:'Onest';font-weight:800;font-size:13px;line-height:1.2;transform:rotate(-14deg);background:rgba(255,246,233,.7);text-transform:uppercase;letter-spacing:.05em}
.sec{padding:70px 0;border-top:2px dashed #a8865e}
.sh{display:flex;align-items:baseline;gap:18px;margin-bottom:34px;flex-wrap:wrap}
.sh h2{font-size:clamp(32px,4vw,52px);font-weight:800;letter-spacing:-.02em;line-height:1.05}
.sh .hand{font-size:28px;color:#c2410c}
.svc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
.card{background:#fff6e9;padding:26px;border-radius:6px;box-shadow:0 2px 0 #c9b391;position:relative;transition:transform .25s}
.card:nth-child(odd){transform:rotate(-.6deg)}.card:nth-child(even){transform:rotate(.6deg)}
.card:hover{transform:rotate(0) translateY(-4px)}
.card .n{font-family:'Caveat';font-size:44px;color:#c2410c;line-height:1}
.card h3{font-size:23px;margin:6px 0 8px;font-weight:800}
.card p{font-size:16px}
.card .pr{margin-top:14px;font-family:'Onest';font-weight:700;font-size:15px;display:inline-block;border:2px solid #3b2a1a;padding:3px 10px;border-radius:4px}
.cs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}
.cs .card{display:grid;grid-template-columns:120px minmax(0,1fr);gap:18px;align-items:center}
.cs .m{font-family:'Onest';font-size:40px;font-weight:800;color:#c2410c;letter-spacing:-.03em;text-align:center;border-right:2px dashed #a8865e;padding-right:12px;line-height:1.1}
.cs h3{font-size:19px;margin:0 0 4px}
.recipe{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;align-items:start}
.recipe ol{counter-reset:r}
.recipe li{list-style:none;counter-increment:r;padding:12px 0 12px 54px;position:relative;border-bottom:1px dotted #a8865e}
.recipe li::before{content:counter(r);position:absolute;left:0;top:8px;width:38px;height:38px;border-radius:50%;background:#3b2a1a;color:#fff6e9;display:grid;place-items:center;font-family:'Onest';font-weight:700}
.note{background:#fff8c4;padding:24px;transform:rotate(-1.5deg);box-shadow:0 10px 24px -12px rgba(80,50,20,.5);font-family:'Caveat';font-size:26px;line-height:1.3}
.note b{color:#c2410c}
.pl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
.pl .card{text-align:center}
.pl .hot{background:#3b2a1a;color:#fff6e9}
.pl .hot .pr{border-color:#fff6e9}
.pl .p{font-family:'Onest';font-size:34px;font-weight:800;margin:10px 0 12px}
.pl li{list-style:none;padding:4px 0;font-size:15.5px}
.revs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
.revs .card q{display:block;quotes:none;font-style:italic;margin-bottom:12px}
.revs .card b{font-family:'Caveat';font-size:24px;color:#c2410c}
.faq details{background:#fff6e9;border-radius:6px;padding:16px 20px;margin-bottom:10px;box-shadow:0 2px 0 #c9b391}.faq summary{font-weight:700;cursor:pointer}
.end{text-align:center;padding:80px 0}
.end h2{font-size:clamp(34px,5vw,64px);font-weight:800;letter-spacing:-.02em;line-height:1.05;margin-bottom:10px}
.end .hand{font-size:30px;color:#c2410c;display:block;margin-bottom:26px}
footer{border-top:2px dashed #a8865e;padding:24px 0 40px;display:flex;justify-content:space-between;font-style:italic;font-size:15px;flex-wrap:wrap;gap:10px}
@media(max-width:900px){header nav{display:none}.hero,.recipe,.cs{grid-template-columns:minmax(0,1fr)}.svc,.pl,.revs{grid-template-columns:minmax(0,1fr)}.stamp{right:-6px;top:-40px;width:96px;height:96px;font-size:11px}.cs .card{grid-template-columns:96px minmax(0,1fr)}.cs .m{font-size:30px}}`;
  const body = `<div class="w"><header>${logo()}<nav><a href="#s">Мастерская</a><a href="#c">Работы</a><a href="#p">Прейскурант</a><a href="#f">Вопросы</a></nav><a class="bt" href="${TG}">Заказать</a></header>
<section class="hero"><div><span class="k rv">ручная работа с 2021 года</span><h1 class="rv d1">Тонкая работа <em>для вашего</em> бизнеса.</h1><p class="rv d2">Мы как мастерская, только вместо мебели делаем Telegram-ботов, CRM и веб-сервисы. Без конвейера: каждый проект собираем вручную под ваш процесс.</p><div class="r rv d3"><a class="bt" href="${TG}">Заказать изделие</a><a class="bt o" href="#c">Посмотреть работы</a></div></div>
<div class="label rv d2"><div class="tt">${logo()}<div class="hand" style="font-size:22px;margin-top:6px">мастерская цифровых изделий</div></div><ul>${C.services.map(s => `<li><span>${s.t}</span><b>${s.p}</b></li>`).join('')}</ul><div class="stamp">сделано<br>с заботой<br>★ 2026 ★</div></div></section>
<section class="sec" id="s"><div class="sh"><h2 class="rv">Что мастерим</h2><span class="hand">— всё вручную, без шаблонов</span></div><div class="svc">${C.services.map((s, i) => `<div class="card rv d${i % 3}"><div class="n">№${i + 1}</div><h3>${s.t}</h3><p>${s.s}</p><span class="pr">${s.p} · ${s.d}</span></div>`).join('')}<div class="card rv"><div class="n">№6</div><h3>Ремонт и уход</h3><p>Поддержка, мониторинг и доработки после запуска. Как гарантийная мастерская.</p><span class="pr">от 5 000 ₽/мес</span></div></div></section>
<section class="sec" id="c"><div class="sh"><h2 class="rv">Готовые работы</h2><span class="hand">— и что они дали хозяевам</span></div><div class="cs">${C.cases.map((c, i) => `<div class="card rv d${i % 2}"><div class="m">${c.m}</div><div><h3>${c.c}</h3><p style="font-size:15.5px">${c.t}: ${c.ml}.</p></div></div>`).join('')}</div></section>
<section class="sec"><div class="sh"><h2 class="rv">Рецепт проекта</h2></div><div class="recipe"><ol>${C.steps.map(s => `<li class="rv"><b>${s.t}</b> <i style="color:#8a6a48">(${s.d})</i><br>${s.s}</li>`).join('')}</ol><div class="note rv d2">Записка от мастеров:<br>цену фиксируем <b>до старта</b>,<br>демо показываем <b>каждую неделю</b>,<br>а после запуска даём <b>30 дней</b> гарантии. Как и положено в хорошей мастерской ✿</div></div></section>
<section class="sec" id="p"><div class="sh"><h2 class="rv">Прейскурант</h2><span class="hand">— цены честные</span></div><div class="pl">${C.plans.map((p, i) => `<div class="card rv d${i}${p.hot ? ' hot' : ''}"><h3>${p.t}</h3><div style="font-style:italic">${p.for}</div><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul><a class="bt" style="margin-top:16px" href="${TG}">Заказать</a></div>`).join('')}</div></section>
<section class="sec"><div class="sh"><h2 class="rv">Книга отзывов</h2></div><div class="revs">${C.reviews.map((r, i) => `<div class="card rv d${i}"><q>«${r.q}»</q><b>${r.n}</b><div style="font-size:14px">${r.r}</div></div>`).join('')}</div></section>
<section class="sec faq" id="f"><div class="sh"><h2 class="rv">Вопросы мастеру</h2></div>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</section>
<section class="end sec"><h2 class="rv">Заходите в мастерскую</h2><span class="hand rv d1">дверь всегда открыта в Telegram</span><a class="bt rv d2" href="${TG}">Написать ${TGH}</a></section>
<footer><span>© 2026 Финес Студио · цифровая мастерская</span><span>${C.slogan}</span></footer></div>`;
  return page({ n: 28, title: this.title, fonts: ['Literata', 'Caveat'], css, body });
} });

// 29 — Корпоративный строгий
L.push({ n: 29, title: 'Корпоративный строгий', idea: 'Строгая сетка, тёмно-синяя палитра с оранжевым акцентом, реквизиты, гарантии, договор и SLA на первом плане; для B2B, производств и консервативных заказчиков', build() {
  const css = `
body{font-family:'IBM Plex Sans',sans-serif;background:#fff;color:#14213d;font-size:16px;line-height:1.6}
.w{max-width:1200px;margin:0 auto;padding:0 24px}
.ub{background:#0d1b33;color:#b6c2d9;font-size:13px}
.ub .w{display:flex;justify-content:space-between;padding:8px 24px;gap:12px;flex-wrap:wrap}
.ub a{color:#fff}
header{border-bottom:1px solid #dde3ec;background:#fff;position:sticky;top:0;z-index:20}
header .w{display:flex;align-items:center;justify-content:space-between;height:76px;gap:20px}
header nav{display:flex;gap:30px;font-size:15px;font-weight:500}
header nav a{padding:26px 0;border-bottom:3px solid transparent}
header nav a:hover{border-color:#f2501c}
.bt{display:inline-block;background:#f2501c;color:#fff;padding:13px 24px;font-weight:600;font-size:15px;border-radius:2px;transition:.2s}
.bt:hover{background:#c93c0e}
.bt.n{background:#14213d}.bt.n:hover{background:#0d1b33}
.bt.o{background:transparent;border:1px solid #fff;color:#fff}
.hero{background:#14213d;color:#fff;position:relative;overflow:hidden}
.hero::after{content:'';position:absolute;right:0;top:0;bottom:0;width:42%;background:repeating-linear-gradient(90deg,rgba(255,255,255,.04) 0 1px,transparent 1px 60px),repeating-linear-gradient(0deg,rgba(255,255,255,.04) 0 1px,transparent 1px 60px)}
.hero .w{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:50px;padding:90px 24px;position:relative;z-index:1}
.hero .k{font-size:13px;text-transform:uppercase;letter-spacing:.14em;color:#ffc21a;font-weight:600}
.hero h1{font-size:clamp(38px,4.8vw,62px);line-height:1.08;font-weight:700;margin:18px 0 20px;letter-spacing:-.02em}
.hero p{color:#c7d0e0;font-size:18px;max-width:560px;margin-bottom:30px}
.hero .r{display:flex;gap:12px;flex-wrap:wrap}
.hero .facts{background:#fff;color:#14213d;padding:30px;border-top:4px solid #f2501c;align-self:center}
.hero .facts h3{font-size:15px;text-transform:uppercase;letter-spacing:.1em;margin-bottom:14px;color:#5b6b85}
.hero .facts li{list-style:none;display:flex;gap:12px;padding:11px 0;border-bottom:1px solid #eef1f6;font-size:15.5px}
.hero .facts li::before{content:'✓';color:#f2501c;font-weight:700}
.kp{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-bottom:1px solid #dde3ec}
.kp>div{padding:34px 24px;border-right:1px solid #dde3ec}
.kp>div:last-child{border-right:0}
.kp b{display:block;font-size:38px;font-weight:700;color:#14213d;letter-spacing:-.02em}
.kp span{color:#5b6b85;font-size:14.5px}
.sec{padding:90px 0}
.sec.g{background:#f4f6fa}
.sh{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;margin-bottom:46px;align-items:end}
.sh .k{font-size:13px;text-transform:uppercase;letter-spacing:.14em;color:#f2501c;font-weight:600;margin-bottom:10px}
.sh h2{font-size:clamp(30px,3.6vw,44px);line-height:1.12;font-weight:700;letter-spacing:-.015em}
.sh p{color:#5b6b85}
.svc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid #dde3ec;border-left:1px solid #dde3ec}
.svc>div{padding:30px;border-right:1px solid #dde3ec;border-bottom:1px solid #dde3ec;background:#fff;transition:.2s}
.svc>div:hover{background:#14213d;color:#fff}.svc>div:hover p{color:#c7d0e0}
.svc .n{font-size:13px;color:#f2501c;font-weight:600;margin-bottom:12px}
.svc h3{font-size:20px;margin-bottom:8px}.svc p{color:#5b6b85;font-size:15px}
.svc .pr{margin-top:16px;font-weight:600;font-size:15px}
.tw{overflow-x:auto}
table{width:100%;border-collapse:collapse;min-width:640px;background:#fff}
th{background:#14213d;color:#fff;text-align:left;font-weight:600;font-size:14px;padding:14px 18px}
td{padding:14px 18px;border-bottom:1px solid #dde3ec;font-size:15px}
td b{color:#f2501c}
.gar{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}
.gar>div{background:#fff;padding:26px;border-left:3px solid #f2501c}
.gar h3{font-size:17px;margin-bottom:8px}.gar p{font-size:14.5px;color:#5b6b85}
.proc{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:0;counter-reset:p}
.proc>div{padding:0 20px 0 0;position:relative}
.proc>div::before{counter-increment:p;content:'0' counter(p);display:block;font-size:13px;font-weight:700;color:#f2501c;padding-bottom:12px;margin-bottom:16px;border-bottom:2px solid #14213d}
.proc h3{font-size:17px;margin-bottom:6px}.proc p{font-size:14.5px;color:#5b6b85}.proc small{display:block;margin-top:8px;font-weight:600;font-size:13px}
.pl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.pl>div{border:1px solid #dde3ec;padding:30px;background:#fff}
.pl .hot{border:2px solid #14213d}
.pl .p{font-size:32px;font-weight:700;margin:10px 0 14px}
.pl li{list-style:none;padding:6px 0;border-bottom:1px solid #eef1f6;font-size:15px}
.pl ul{margin-bottom:22px}
.faq{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 40px}
.faq details{border-bottom:1px solid #dde3ec;padding:16px 0}.faq summary{font-weight:600;cursor:pointer}.faq p{color:#5b6b85;margin-top:6px}
.req{background:#14213d;color:#fff;padding:70px 0}
.req .w{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:50px;align-items:center}
.req h2{font-size:clamp(30px,3.6vw,44px);line-height:1.12;margin-bottom:12px}
.req p{color:#c7d0e0}
.req dl{display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px 18px;font-size:14.5px;background:rgba(255,255,255,.05);padding:24px;border:1px solid rgba(255,255,255,.12)}
.req dt{color:#8fa0bd}
footer{background:#0d1b33;color:#8fa0bd;font-size:13.5px;padding:24px 0}
footer .w{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
@media(max-width:900px){header nav{display:none}.hero .w,.sh,.req .w{grid-template-columns:minmax(0,1fr)}.svc,.pl,.faq{grid-template-columns:minmax(0,1fr)}.gar,.kp{grid-template-columns:repeat(2,minmax(0,1fr))}.proc{grid-template-columns:minmax(0,1fr);gap:24px}.kp>div:nth-child(2){border-right:0}.hero::after{display:none}}
@media(max-width:480px){.gar,.kp{grid-template-columns:minmax(0,1fr)}.kp>div{border-right:0;border-bottom:1px solid #dde3ec}}`;
  const body = `<div class="ub"><div class="w"><span>Разработка программного обеспечения для малого и среднего бизнеса</span><span>Telegram: <a href="${TG}">${TGH}</a> · Пн–Пт 10:00–19:00 МСК</span></div></div>
<header><div class="w">${logo()}<nav><a href="#s">Услуги</a><a href="#c">Проекты</a><a href="#g">Гарантии</a><a href="#p">Стоимость</a><a href="#q">Вопросы</a></nav><a class="bt" href="${TG}">Запросить КП</a></div></header>
<section class="hero"><div class="w"><div><div class="k rv">Финес Студио · разработка под ключ</div><h1 class="rv d1">Тонкая работа для вашего бизнеса. Надёжно, по договору, в срок.</h1><p class="rv d2">Разрабатываем Telegram-ботов, CRM-системы, веб-сервисы и интеграции с 1С. Работаем по договору с фиксированной сметой, передаём исходный код и документацию.</p><div class="r rv d3"><a class="bt" href="${TG}">Получить коммерческое предложение</a><a class="bt o" href="#c">Проекты</a></div></div>
<div class="facts rv d2"><h3>Условия сотрудничества</h3><ul><li>Договор и фиксированная смета до старта</li><li>Оплата этапами: 50% / 50%</li><li>Еженедельная отчётность и демо</li><li>Передача исходного кода и прав</li><li>Гарантия 30 дней, SLA на поддержку</li><li>Работа по ЭДО, закрывающие документы</li></ul></div></div></section>
<div class="w"><div class="kp">${C.stats.map(s => `<div class="rv"><b>${s.v}</b><span>${s.l}</span></div>`).join('')}</div></div>
<section class="sec" id="s"><div class="w"><div class="sh"><div><div class="k">Услуги</div><h2 class="rv">Направления деятельности</h2></div><p class="rv">Комплексная автоматизация бизнес-процессов: от отдельного бота до единой информационной системы предприятия.</p></div><div class="svc">${C.services.map((s, i) => `<div class="rv"><div class="n">0${i + 1}</div><h3>${s.t}</h3><p>${s.s}</p><div class="pr">${s.p} · срок ${s.d}</div></div>`).join('')}<div class="rv"><div class="n">06</div><h3>Техническая поддержка</h3><p>Сопровождение по SLA: мониторинг, резервное копирование, доработки.</p><div class="pr">от 5 000 ₽ / мес</div></div></div></div></section>
<section class="sec g" id="c"><div class="w"><div class="sh"><div><div class="k">Проекты</div><h2 class="rv">Реализованные проекты</h2></div><p class="rv">Показатели зафиксированы через 1–3 месяца после ввода в эксплуатацию.</p></div><div class="tw rv"><table><tr><th>Заказчик</th><th>Решение</th><th>Показатель</th><th>Срок</th></tr>${C.cases.map((c, i) => `<tr><td>${c.c}</td><td>${c.t}</td><td><b>${c.m}</b> ${c.ml}</td><td>${['3 нед.', '2 нед.', '7 нед.', '5 нед.', '4 нед.', '6 нед.'][i]}</td></tr>`).join('')}</table></div></div></section>
<section class="sec" id="g"><div class="w"><div class="sh"><div><div class="k">Гарантии</div><h2 class="rv">Почему с нами безопасно</h2></div></div><div class="gar">${C.why.map(x => `<div class="rv" style="background:#f4f6fa"><h3>${x.t}</h3><p>${x.s}</p></div>`).join('')}</div>
<div class="proc" style="margin-top:70px">${C.steps.map(s => `<div class="rv"><h3>${s.t}</h3><p>${s.s}</p><small>${s.d}</small></div>`).join('')}</div></div></section>
<section class="sec g" id="p"><div class="w"><div class="sh"><div><div class="k">Стоимость</div><h2 class="rv">Форматы работы</h2></div><p class="rv">Итоговая стоимость фиксируется в договоре после бесплатного аудита задачи.</p></div><div class="pl">${C.plans.map(p => `<div class="rv${p.hot ? ' hot' : ''}"><b>${p.t}</b><div style="color:#5b6b85;font-size:14.5px">${p.for}</div><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul><a class="bt${p.hot ? '' : ' n'}" href="${TG}">Запросить КП</a></div>`).join('')}</div></div></section>
<section class="sec" id="q"><div class="w"><div class="sh"><div><div class="k">Вопросы</div><h2 class="rv">Частые вопросы</h2></div></div><div class="faq">${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></div></section>
<section class="req"><div class="w"><div><h2 class="rv">Обсудим ваш проект</h2><p class="rv d1" style="margin-bottom:26px">Направим коммерческое предложение в течение одного рабочего дня.</p><a class="bt rv d2" href="${TG}">Написать в Telegram ${TGH}</a></div><dl class="rv d2"><dt>Компания</dt><dd>Финес Студио</dd><dt>Профиль</dt><dd>Разработка ПО, автоматизация</dd><dt>Связь</dt><dd>Telegram ${TGH}</dd><dt>Регион</dt><dd>Вся Россия, удалённо</dd><dt>Документы</dt><dd>Договор, акты, ЭДО</dd></dl></div></section>
<footer><div class="w"><span>© 2026 Финес Студио. ${C.slogan}</span><span>Политика конфиденциальности</span></div></footer>`;
  return page({ n: 29, title: this.title, fonts: ['IBM Plex Sans'], css, body });
} });

// 30 — Манифест
L.push({ n: 30, title: 'Манифест', idea: 'Сайт как манифест: нумерованные тезисы-принципы крупным шрифтом на чёрном, каждый подкреплён фактом; для клиентов, которые выбирают по ценностям', build() {
  const css = `
body{font-family:'Onest',sans-serif;background:#0c0b0a;color:#f3eee6;font-size:17px}
.w{max-width:1240px;margin:0 auto;padding:0 28px}
header{display:flex;justify-content:space-between;align-items:center;padding:26px 0;position:sticky;top:0;z-index:20;background:linear-gradient(#0c0b0a 70%,transparent)}
header .flogo{color:#f3eee6}
header a.t{font-size:15px;border-bottom:1px solid #f2501c;padding-bottom:2px}
.hero{min-height:88vh;display:flex;flex-direction:column;justify-content:center;padding:40px 0 80px}
.hero .k{font-size:14px;letter-spacing:.3em;text-transform:uppercase;color:#f2501c;margin-bottom:28px}
.hero h1{font-family:'Unbounded';font-size:clamp(40px,7.4vw,112px);line-height:.98;font-weight:800;letter-spacing:-.04em}
.hero h1 span{color:#f2501c}
.hero .sub{display:flex;justify-content:space-between;align-items:flex-end;gap:30px;margin-top:46px;flex-wrap:wrap}
.hero .sub p{max-width:480px;color:#b9b2a6;font-size:19px;line-height:1.55}
.hero .sub .sg{font-family:'Caveat';font-size:34px;color:#ffc21a}
.th{display:grid;grid-template-columns:140px minmax(0,1fr) minmax(0,.7fr);gap:40px;padding:70px 0;border-top:1px solid #2a2724;align-items:start}
.th .n{font-family:'Unbounded';font-size:60px;font-weight:300;color:#f2501c;line-height:1}
.th h2{font-family:'Unbounded';font-size:clamp(26px,3.4vw,46px);font-weight:700;line-height:1.08;letter-spacing:-.03em}
.th .pr p{color:#b9b2a6;line-height:1.6;margin-bottom:16px}
.th .pr .f{border-left:2px solid #ffc21a;padding-left:14px;font-size:15px}
.th .pr .f b{display:block;font-family:'Unbounded';font-size:30px;color:#ffc21a;font-weight:600;letter-spacing:-.02em}
.list{padding:70px 0;border-top:1px solid #2a2724}
.list h3{font-size:14px;letter-spacing:.3em;text-transform:uppercase;color:#f2501c;margin-bottom:30px}
.list .row{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1.6fr) 160px;gap:24px;padding:22px 0;border-bottom:1px solid #2a2724;align-items:baseline;transition:padding .3s,background .3s}
.list .row:hover{padding-left:16px;background:rgba(242,80,28,.06)}
.list .row b{font-family:'Unbounded';font-size:22px;font-weight:600}
.list .row span{color:#b9b2a6;font-size:15.5px}
.list .row i{font-style:normal;text-align:right;font-weight:600;color:#ffc21a}
.notdo{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;padding:70px 0;border-top:1px solid #2a2724}
.notdo>div{border:1px solid #2a2724;padding:30px;border-radius:4px}
.notdo h3{font-family:'Unbounded';font-size:22px;margin-bottom:16px}
.notdo li{list-style:none;padding:8px 0;color:#b9b2a6;border-bottom:1px solid #1d1b19}
.notdo .y li::before{content:'+ ';color:#ffc21a;font-weight:700}
.notdo .x li::before{content:'× ';color:#f2501c;font-weight:700}
.notdo .x li{text-decoration:line-through;text-decoration-color:rgba(242,80,28,.5)}
.price{padding:70px 0;border-top:1px solid #2a2724;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
.price>div b{display:block;font-family:'Unbounded';font-size:34px;font-weight:600;letter-spacing:-.03em;margin:8px 0}
.price>div span{color:#b9b2a6}
.price .hot b{color:#f2501c}
.sign{padding:110px 0 70px;border-top:1px solid #2a2724;text-align:center}
.sign h2{font-family:'Unbounded';font-size:clamp(32px,5.4vw,80px);font-weight:800;letter-spacing:-.04em;line-height:1.02;margin-bottom:30px}
.sign .bt{display:inline-block;background:#f2501c;color:#fff;padding:18px 34px;font-weight:700;font-size:18px;border-radius:99px;transition:.2s}
.sign .bt:hover{background:#ffc21a;color:#0c0b0a}
.sign .names{margin-top:46px;display:flex;justify-content:center;gap:40px;flex-wrap:wrap;font-family:'Caveat';font-size:30px;color:#b9b2a6}
footer{display:flex;justify-content:space-between;padding:24px 0 40px;color:#6f6960;font-size:14px;border-top:1px solid #2a2724;flex-wrap:wrap;gap:10px}
@media(max-width:900px){.th{grid-template-columns:minmax(0,1fr);gap:16px;padding:50px 0}.th .n{font-size:44px}.list .row{grid-template-columns:minmax(0,1fr);gap:4px}.list .row i{text-align:left}.notdo,.price{grid-template-columns:minmax(0,1fr)}}`;
  const theses = [
    ['Бизнес не должен работать руками там, где может работать код.', 'Заявки, напоминания, счета и отчёты — это работа для программы. Человеку остаётся то, что у него получается лучше: общаться и решать.', C.cases[2].m, C.cases[2].ml + ' — ' + C.cases[2].c],
    ['Цена известна до старта. Всегда.', 'Мы не продаём часы. Мы продаём результат, который описан в договоре и стоит фиксированных денег.', '0 ₽', 'доплат «по ходу» за всю историю студии'],
    ['Тишина — худшее, что может сделать подрядчик.', 'Каждую неделю — демо и короткий отчёт. Вы видите, как растёт продукт, и можете поменять курс.', 'каждую пятницу', 'отчёт и демо по проекту'],
    ['Тонкость — в деталях, которые никто не заметит.', 'Обработка ошибок, понятные тексты бота, бэкапы, логирование. Скучно, зато потом ничего не падает.', '30 дней', 'гарантии после запуска'],
    ['Код принадлежит тому, кто за него заплатил.', 'Передаём исходники, доступы и документацию. Хотите — уходите к другой команде. Мы не держим клиентов заложниками.', '100%', 'проектов с переданным кодом'],
  ];
  const body = `<div class="w"><header>${logo(true)}<a class="t" href="${TG}">Подписать вместе с нами →</a></header>
<section class="hero"><div class="k rv">Манифест студии · 2026</div><h1 class="rv d1">Тонкая работа <span>для вашего</span> бизнеса.</h1><div class="sub"><p class="rv d2">Мы — Финес Студио. Делаем Telegram-ботов, CRM-системы и веб-сервисы для малого бизнеса. И вот во что мы верим.</p><div class="sg rv d3">— команда Финес</div></div></section>
${theses.map((t, i) => `<section class="th"><div class="n rv">0${i + 1}</div><h2 class="rv d1">${t[0]}</h2><div class="pr rv d2"><p>${t[1]}</p><div class="f"><b>${t[2]}</b>${t[3]}</div></div></section>`).join('')}
<section class="list"><h3 class="rv">Чем мы подкрепляем слова</h3>${C.services.map(s => `<div class="row rv"><b>${s.t}</b><span>${s.s}</span><i>${s.p}</i></div>`).join('')}</section>
<section class="notdo"><div class="y rv"><h3>Что мы делаем</h3><ul><li>Разбираем задачу бесплатно</li><li>Фиксируем цену в договоре</li><li>Показываем демо каждую неделю</li><li>Передаём код и документацию</li><li>Отвечаем в Telegram за 15 минут</li></ul></div><div class="x rv d1"><h3>Чего не делаем никогда</h3><ul><li>Не берём предоплату 100%</li><li>Не пропадаем на месяц</li><li>Не прячем доступы к серверу</li><li>Не говорим «это не баг, это фича»</li><li>Не делаем то, что вам не нужно</li></ul></div></section>
<section class="price">${C.plans.map((p, i) => `<div class="rv d${i}${p.hot ? ' hot' : ''}"><span>${p.t}</span><b>${p.p}</b><span>${p.for}</span></div>`).join('')}</section>
<section class="sign"><h2 class="rv">Согласны? Тогда давайте работать.</h2><a class="bt rv d1" href="${TG}">Написать ${TGH}</a><div class="names rv d2">${C.team.map(t => `<span>${t.n}</span>`).join('')}</div></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div>`;
  return page({ n: 30, title: this.title, fonts: ['Unbounded', 'Caveat'], css, body });
} });

export default L;
