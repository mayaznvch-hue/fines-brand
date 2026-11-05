import { page, logo, C, TG, TGH, dot } from './core.mjs';
const L = [];

// 36 — История одного клиента (скролл-сторителлинг)
L.push({ n: 36, title: 'История одного бизнеса', idea: 'Сторителлинг: страница рассказывает историю кофейни «Зерно» от хаоса до автоматизации по главам, услуги встроены в сюжет; для тех, кто покупает эмоцией и примером', build() {
  const css = `
body{font-family:'Lora',serif;background:#fffaf3;color:#2a211b;font-size:19px;line-height:1.7}
.w{max-width:1100px;margin:0 auto;padding:0 24px}
.nr{max-width:680px;margin:0 auto}
header{display:flex;justify-content:space-between;align-items:center;padding:22px 24px;position:sticky;top:0;background:rgba(255,250,243,.92);backdrop-filter:blur(8px);z-index:20;border-bottom:1px solid #eee2d2}
header .pg{font-family:'Onest';font-size:14px;color:#8a7766}
.prog{position:fixed;top:0;left:0;height:3px;background:#f2501c;width:0;z-index:30}
.bt{display:inline-block;font-family:'Onest';background:#f2501c;color:#fff;border-radius:99px;padding:13px 24px;font-weight:700;font-size:16px;transition:.2s}
.bt:hover{background:#2a211b}
.hero{text-align:center;padding:110px 0 90px}
.hero .k{font-family:'Onest';font-size:14px;letter-spacing:.24em;text-transform:uppercase;color:#f2501c}
.hero h1{font-family:'Playfair Display';font-size:clamp(42px,6.4vw,92px);line-height:1.02;font-weight:800;margin:20px auto 24px;max-width:960px;letter-spacing:-.02em}
.hero h1 i{color:#f2501c}
.hero p{font-size:21px;color:#5f5145;max-width:620px;margin:0 auto}
.hero .sc{margin-top:46px;font-family:'Onest';font-size:14px;color:#8a7766;animation:bob 2s ease-in-out infinite}
@keyframes bob{50%{transform:translateY(6px)}}
.ch{padding:90px 0;border-top:1px solid #eee2d2}
.ch .lb{font-family:'Onest';font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:#f2501c;margin-bottom:12px}
.ch h2{font-family:'Playfair Display';font-size:clamp(32px,4.4vw,56px);line-height:1.08;margin-bottom:26px;font-weight:700}
.ch p{margin-bottom:18px}
.ch p:first-of-type::first-letter{font-family:'Playfair Display';float:left;font-size:4.2em;line-height:.82;padding:6px 10px 0 0;color:#f2501c;font-weight:800}
.qb{font-family:'Playfair Display';font-style:italic;font-size:clamp(24px,2.8vw,34px);line-height:1.3;border-left:4px solid #f2501c;padding-left:24px;margin:34px 0}
.scene{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;align-items:center;margin:40px 0}
.pic{border-radius:20px;aspect-ratio:4/3;position:relative;overflow:hidden;display:grid;place-items:center;font-family:'Onest'}
.chaos{background:#f3e3d0}
.chaos span{position:absolute;background:#fff;border-radius:10px;padding:8px 12px;font-size:14px;box-shadow:0 8px 20px -10px rgba(0,0,0,.3);white-space:nowrap}
.chaos span:nth-child(1){left:6%;top:10%;transform:rotate(-6deg)}.chaos span:nth-child(2){right:6%;top:22%;transform:rotate(5deg);background:#ffe1d6}.chaos span:nth-child(3){left:12%;top:44%;transform:rotate(3deg)}.chaos span:nth-child(4){right:10%;top:58%;transform:rotate(-4deg);background:#fff3c4}.chaos span:nth-child(5){left:8%;bottom:10%;transform:rotate(-2deg)}
.phone{background:linear-gradient(135deg,#ffe3d4,#fff3c4)}
.phone .sc2{width:62%;background:#fff;border-radius:22px;padding:14px;box-shadow:0 20px 40px -20px rgba(0,0,0,.35);font-size:14px;line-height:1.4}
.phone .sc2 b{display:block;margin-bottom:8px;font-size:14px}
.phone .sc2 p{background:#f2efe9;border-radius:12px;padding:7px 10px;margin:5px 0!important;font-size:13.5px}
.phone .sc2 p::first-letter{all:unset}
.phone .sc2 p.u{background:#f2501c;color:#fff;margin-left:20%!important}
.phone .sc2 .kb{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:8px}.phone .sc2 .kb span{border:1px solid #e3d9cc;border-radius:8px;text-align:center;padding:5px;font-size:12.5px}
.num{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin:40px 0}
.num div{background:#fff;border-radius:18px;padding:24px;border:1px solid #eee2d2;font-family:'Onest'}
.num b{display:block;font-size:44px;letter-spacing:-.03em;color:#f2501c;line-height:1.05;font-weight:800}
.num span{font-size:15px;color:#5f5145}
.more{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;font-family:'Onest'}
.more>div{background:#fff;border:1px solid #eee2d2;border-radius:18px;padding:22px;transition:transform .2s}
.more>div:hover{transform:translateY(-4px)}
.more .m{font-size:30px;font-weight:800;color:#f2501c;letter-spacing:-.03em}
.more h3{font-size:16px;margin:4px 0}.more p{font-size:14.5px;color:#5f5145;line-height:1.5}
.svc{font-family:'Onest'}
.svc .row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.5fr) auto;gap:24px;padding:20px 0;border-bottom:1px solid #eee2d2;align-items:baseline}
.svc h3{font-family:'Playfair Display';font-size:24px}.svc p{font-size:16px;color:#5f5145;line-height:1.5}.svc b{white-space:nowrap}
.faq{font-family:'Onest'}
.faq details{border-bottom:1px solid #eee2d2;padding:16px 0;font-size:17px}.faq summary{font-weight:600;cursor:pointer}.faq p{color:#5f5145;margin-top:6px;font-size:16px}
.end{text-align:center;padding:100px 0;border-top:1px solid #eee2d2}
.end h2{font-family:'Playfair Display';font-size:clamp(36px,5.4vw,72px);line-height:1.04;margin-bottom:18px}
.end p{color:#5f5145;margin-bottom:30px}
footer{font-family:'Onest';font-size:14px;color:#8a7766;display:flex;justify-content:space-between;padding:20px 0 40px;flex-wrap:wrap;gap:10px}
@media(max-width:860px){header .pg{display:none}.scene,.num,.more{grid-template-columns:minmax(0,1fr)}.svc .row{grid-template-columns:minmax(0,1fr);gap:6px}.chaos span{font-size:12.5px}.hero{padding:70px 0 60px}.phone .sc2{width:84%}}`;
  const c0 = C.cases[0];
  const body = `<div class="prog" id="pg"></div><header>${logo()}<span class="pg">История о том, как кофейня перестала терять заказы · 6 минут чтения</span><a class="bt" style="padding:10px 18px;font-size:14px" href="${TG}">Написать</a></header>
<div class="w"><section class="hero"><div class="k rv">Финес Студио рассказывает</div><h1 class="rv d1">Как сеть кофеен перестала <i>терять</i> утренние заказы</h1><p class="rv d2">История одного бизнеса — и того, что мы называем тонкой работой для вашего бизнеса.</p><div class="sc">↓ листайте</div></section>
<section class="ch"><div class="nr"><div class="lb rv">Глава 1 · Утро понедельника</div><h2 class="rv">8:40. Очередь до двери, телефон разрывается</h2><p class="rv">Анна открыла третью кофейню «Зерно» и поняла, что утро стало лотереей. Гости хотели забрать кофе по дороге на работу, писали в директ, звонили, а бариста в это время варил капучино для очереди. Сообщения терялись, заказы путались, часть гостей просто уходила.</p><p class="rv">«Мы теряли не деньги — мы теряли постоянных гостей», — говорит Анна.</p></div>
<div class="scene"><div class="pic chaos rv"><span>«Можно латте на 8:50?»</span><span>Пропущенный звонок (4)</span><span>«Вы ещё работаете?»</span><span>Директ: 23 непрочитанных</span><span>«Я уже 10 минут жду…»</span></div><div class="nr rv d1"><p class="qb">Знакомо? Почти каждый наш проект начинается с этой картины.</p></div></div></section>
<section class="ch"><div class="nr"><div class="lb rv">Глава 2 · Разбор</div><h2 class="rv">30 минут созвона вместо месяца совещаний</h2><p class="rv">Мы созвонились с Анной и прошли путь одного заказа: где гость пишет, кто видит, когда начинают готовить. Оказалось, что проблема не в бариста, а в том, что у заказов нет одного входа.</p><p class="rv">На следующий день Анна получила смету: бот предзаказа с оплатой, экран заказов для бариста, три недели работы. Цена — в договоре, без звёздочек.</p></div></section>
<section class="ch"><div class="nr"><div class="lb rv">Глава 3 · Решение</div><h2 class="rv">Бот, который принимает заказ за 20 секунд</h2></div>
<div class="scene"><div class="nr rv"><p>Гость открывает бота, выбирает напиток, кофейню и время. Оплачивает через СБП. Бариста видит заказ на планшете с таймером. Когда кофе готов — бот пишет гостю.</p><p>Каждую пятницу мы показывали Анне, что готово. На второй неделе она попросила добавить «как в прошлый раз» — и это стало самой популярной кнопкой.</p></div><div class="pic phone rv d1"><div class="sc2"><b>☕ Зерно · предзаказ</b><p class="u">Как в прошлый раз</p><p>Флэт уайт 0,3 на овсяном, к 8:50 на Ленина, 12. Оплатить 290 ₽?</p><div class="kb"><span>Оплатить СБП</span><span>Изменить</span></div></div></div></div></section>
<section class="ch"><div class="nr"><div class="lb rv">Глава 4 · Через месяц</div><h2 class="rv">Что изменилось</h2></div><div class="num">${[[c0.m, c0.ml], ['−9 мин', 'среднее ожидание утром'], ['+14%', 'выручки в часы пик']].map((x, i) => `<div class="rv d${i}"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div><div class="nr"><p class="qb rv">«Утро снова стало спокойным. А гости пишут, что это самый удобный кофе в городе».<br><small style="font-family:Onest;font-size:15px;font-style:normal;color:#8a7766">— Анна, основательница «Зерна»</small></p></div></section>
<section class="ch"><div class="nr"><div class="lb rv">Глава 5 · Другие истории</div><h2 class="rv">Похожие финалы у других</h2></div><div class="more">${C.cases.slice(1).map((c, i) => `<div class="rv d${i % 3}"><div class="m">${c.m}</div><h3>${c.c}</h3><p>${c.ml}. ${c.r}</p></div>`).join('')}</div></section>
<section class="ch svc"><div class="nr" style="max-width:none"><div class="lb rv">Эпилог · Что мы делаем</div><h2 class="rv">Ваша история может быть следующей</h2>${C.services.map(s => `<div class="row rv"><h3>${s.t}</h3><p>${s.s}</p><b>${s.p}</b></div>`).join('')}</div></section>
<section class="ch faq"><div class="nr"><div class="lb rv">Примечания</div><h2 class="rv">Частые вопросы</h2>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></section>
<section class="end"><h2 class="rv">Расскажите свою историю</h2><p class="rv d1">Напишите, где у вас «утро понедельника». Ответим за 15 минут.</p><a class="bt rv d2" href="${TG}">Написать ${TGH}</a></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div>`;
  const js = `const pg=document.getElementById('pg');addEventListener('scroll',()=>{const h=document.documentElement;pg.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'},{passive:true});`;
  return page({ n: 36, title: this.title, fonts: ['Lora', 'Playfair Display'], css, body, js });
} });

// 37 — README / plain text
L.push({ n: 37, title: 'README.md', idea: 'Сайт как файл README в моноширинном шрифте: заголовки с #, списки, таблицы и бейджи; честно и по-инженерному — для технических основателей и IT-команд', build() {
  const css = `
body{font-family:'JetBrains Mono',monospace;background:#fdfdfc;color:#24292f;font-size:15px;line-height:1.7}
.w{max-width:900px;margin:0 auto;padding:0 22px}
.bar{border-bottom:1px solid #d0d7de;background:#f6f8fa}
.bar .w{display:flex;justify-content:space-between;align-items:center;padding:12px 22px;gap:12px;flex-wrap:wrap}
.bar .path{font-size:14px;color:#57606a}.bar .path b{color:#0969da;font-weight:600}
.bar .flogo{--lg:22px}
.file{border:1px solid #d0d7de;border-radius:8px;margin:30px 0;overflow:hidden;background:#fff}
.fh{background:#f6f8fa;border-bottom:1px solid #d0d7de;padding:10px 16px;font-size:13.5px;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}
.fh span{color:#57606a}
.md{padding:34px 40px}
.md h1{font-size:clamp(26px,3.6vw,38px);line-height:1.2;padding-bottom:10px;border-bottom:1px solid #d8dee4;margin-bottom:16px;letter-spacing:-.02em}
.md h1::before,.md h2::before{color:#f2501c;margin-right:.4em}
.md h1::before{content:'#'}.md h2::before{content:'##'}
.md h2{font-size:22px;margin:40px 0 14px;padding-bottom:8px;border-bottom:1px solid #d8dee4}
.md h3{font-size:16px;margin:20px 0 6px}
.md p{margin-bottom:14px}
.md blockquote{border-left:4px solid #f2501c;padding:4px 16px;color:#57606a;margin:16px 0;background:#fff7f3}
.badges{display:flex;gap:6px;flex-wrap:wrap;margin:14px 0 20px}
.badges span{display:inline-flex;font-size:12px;border-radius:4px;overflow:hidden}
.badges span i{font-style:normal;background:#555;color:#fff;padding:2px 7px}.badges span b{padding:2px 7px;color:#fff;font-weight:500}
.md ul{padding-left:24px;margin-bottom:14px}.md li{margin:4px 0}
.md li::marker{color:#f2501c}
.md code{background:rgba(175,184,193,.2);padding:2px 6px;border-radius:6px;font-size:.92em}
pre{background:#161b22;color:#e6edf3;border-radius:8px;padding:18px 20px;overflow-x:auto;font-size:14px;margin:16px 0;line-height:1.6}
pre .c{color:#8b949e}pre .s{color:#a5d6ff}pre .k{color:#ff7b72}pre .f{color:#d2a8ff}pre .o{color:#ffa657}
.tw{overflow-x:auto;margin:16px 0}
table{border-collapse:collapse;width:100%;font-size:14px;min-width:560px}
th,td{border:1px solid #d0d7de;padding:8px 13px;text-align:left}
th{background:#f6f8fa;font-weight:600}
tr:nth-child(2n) td{background:#fafbfc}
td.r{text-align:right;white-space:nowrap}
.md a{color:#0969da}.md a:hover{text-decoration:underline}
.task li{list-style:none;margin-left:-20px}
.task li::before{content:'☑ ';color:#1a7f37}
.task li.o::before{content:'☐ ';color:#57606a}
.md details{border:1px solid #d0d7de;border-radius:6px;padding:10px 14px;margin:8px 0}.md summary{cursor:pointer;font-weight:600}.md details p{margin:8px 0 0}
.btn{display:inline-block;background:#1f883d;color:#fff!important;border-radius:6px;padding:8px 18px;font-weight:600;font-size:14px;border:1px solid rgba(31,35,40,.15);text-decoration:none!important;transition:.2s}
.btn:hover{background:#1a7f37}
.btn.o{background:#f2501c}
.side{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:16px 0}
.side div{border:1px solid #d0d7de;border-radius:6px;padding:12px 14px}.side b{display:block;font-size:22px;color:#f2501c}.side span{font-size:13px;color:#57606a}
footer{color:#57606a;font-size:13px;padding:0 0 40px;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}
@media(max-width:700px){.md{padding:22px 18px}.side{grid-template-columns:minmax(0,1fr)}.bar .path{display:none}}`;
  const bd = [['услуги', 'боты · CRM · веб', '#f2501c'], ['ответ', '15 мин', '#1a7f37'], ['цена', 'фикс', '#0969da'], ['гарантия', '30 дней', '#8250df'], ['license', 'код ваш', '#bf8700']];
  const body = `<div class="bar"><div class="w">${logo()}<span class="path">fines-studio / <b>studio</b> / README.md</span><a class="btn o" href="${TG}">★ Написать</a></div></div>
<div class="w"><div class="file rv"><div class="fh"><b>README.md</b><span>${C.stats[0].v} проектов · обновлено в ноябре 2026</span></div><div class="md">
<h1>Финес Студио</h1><div class="badges">${bd.map(b => `<span><i>${b[0]}</i><b style="background:${b[2]}">${b[1]}</b></span>`).join('')}</div>
<blockquote><b>${C.slogan}</b><br>${C.lead}</blockquote>
<div class="side">${C.stats.slice(0, 3).map(s => `<div><b>${s.v}</b><span>${s.l}</span></div>`).join('')}</div>
<h2>Быстрый старт</h2><pre><span class="c"># 1. опишите задачу</span>
<span class="f">telegram</span> <span class="o">--to</span> <span class="s">${TGH}</span> <span class="s">"Хочу бота для записи клиентов"</span>
<span class="c"># 2. получите смету за 1 день (бесплатно)</span>
<span class="k">&gt;</span> estimate: <span class="s">от 40 000 ₽</span>, срок: <span class="s">2–3 недели</span>, цена: <span class="s">фиксированная</span>
<span class="c"># 3. запуск</span>
<span class="k">&gt;</span> deployed ✓  бот работает 24/7</pre>
<a class="btn o" href="${TG}">Начать разговор в Telegram →</a>
<h2>Возможности</h2><div class="tw"><table><tr><th>Модуль</th><th>Что делает</th><th>Срок</th><th>Цена</th></tr>${C.services.map(s => `<tr><td><code>${s.k}</code> ${s.t}</td><td>${s.s}</td><td>${s.d}</td><td class="r">${s.p}</td></tr>`).join('')}</table></div>
<h2>Примеры использования</h2>${C.cases.map(c => `<h3>${c.c} — <code>${c.m}</code></h3><p>${c.t}. ${c.r} Итог: ${c.ml}.</p>`).join('')}
<h2>Как устроен процесс</h2><ul class="task">${C.steps.map(s => `<li><b>${s.t}</b> (${s.d}) — ${s.s}</li>`).join('')}<li class="o">Ваш проект — <a href="${TG}">открыть задачу</a></li></ul>
<h2>Тарифы</h2><div class="tw"><table><tr><th>План</th><th>Для чего</th><th>Включено</th><th>Цена</th></tr>${C.plans.map(p => `<tr><td><b>${p.t}</b>${p.hot ? ' ⭐' : ''}</td><td>${p.for}</td><td>${p.f.join(', ')}</td><td class="r">${p.p}</td></tr>`).join('')}</table></div>
<h2>Почему мы</h2><ul>${C.why.map(x => `<li><b>${x.t}.</b> ${x.s}</li>`).join('')}</ul>
<h2>Отзывы (issues закрыты ✓)</h2>${C.reviews.map(r => `<blockquote>«${r.q}»<br>— <b>${r.n}</b>, ${r.r}</blockquote>`).join('')}
<h2>FAQ</h2>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}
<h2>Контрибьюторы</h2><ul>${C.team.map(t => `<li><b>${t.n}</b> — ${t.r}. ${t.s}</li>`).join('')}</ul>
<h2>Контакты</h2><p>Telegram: <a href="${TG}">${TGH}</a> · отвечаем за 15 минут в рабочее время.</p><a class="btn" href="${TG}">Обсудить проект</a>
</div></div><footer><span>© 2026 Финес Студио · MIT-подход: код принадлежит клиенту</span><span>README.md · 1 файл</span></footer></div>`;
  const b2 = body.replace('<h1>', '<section><h1>').replace(/<h2>/g, '</section><section><h2>').replace('</div></div><footer>', '</section></div></div><footer>');
  return page({ n: 37, title: this.title, fonts: ['JetBrains Mono'], css, body: b2 });
} });

// 38 — Ар-деко премиум
L.push({ n: 38, title: 'Ар-деко', idea: 'Чёрный и золото, геометрические орнаменты, симметрия и антиква; ощущение «дорогого ателье» — для премиальных салонов, ресторанов, ювелирных и бутиков', build() {
  const css = `
body{font-family:'Jost',sans-serif;background:#0d0d0f;color:#efe6d2;font-size:17px;line-height:1.65}
.w{max-width:1160px;margin:0 auto;padding:0 24px}
.gold{color:#d9b35b}
.orn{height:22px;background:linear-gradient(90deg,transparent,#d9b35b 20%,#d9b35b 80%,transparent) center/100% 1px no-repeat;position:relative;margin:0 auto;max-width:520px}
.orn::after{content:'';position:absolute;left:50%;top:50%;width:12px;height:12px;border:1px solid #d9b35b;background:#0d0d0f;transform:translate(-50%,-50%) rotate(45deg)}
header{display:flex;justify-content:space-between;align-items:center;padding:24px 0;border-bottom:1px solid #2a2618}
header .flogo{color:#efe6d2}
header nav{display:flex;gap:34px;font-size:13px;letter-spacing:.24em;text-transform:uppercase}
header nav a:hover{color:#d9b35b}
.bt{display:inline-block;border:1px solid #d9b35b;color:#d9b35b;padding:13px 26px;font-size:13px;letter-spacing:.2em;text-transform:uppercase;transition:.3s}
.bt:hover{background:#d9b35b;color:#0d0d0f}
.bt.f{background:#d9b35b;color:#0d0d0f}.bt.f:hover{background:transparent;color:#d9b35b}
.hero{text-align:center;padding:90px 0 100px;position:relative}
.fan{width:min(560px,90%);margin:0 auto 10px;display:block}
.hero .k{font-size:13px;letter-spacing:.4em;text-transform:uppercase;color:#d9b35b}
.hero h1{font-family:'Cormorant Garamond';font-weight:600;font-size:clamp(44px,7vw,104px);line-height:.98;margin:20px 0 22px;letter-spacing:.01em}
.hero h1 i{color:#d9b35b}
.hero p{max-width:600px;margin:0 auto 34px;color:#bdb39c}
.hero .r{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.sec{padding:90px 0}
.sh{text-align:center;margin-bottom:50px}
.sh .k{font-size:12.5px;letter-spacing:.4em;text-transform:uppercase;color:#d9b35b;margin-bottom:12px}
.sh h2{font-family:'Cormorant Garamond';font-size:clamp(36px,4.6vw,62px);font-weight:600;line-height:1.05;margin-bottom:18px}
.svc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:#2a2618;border:1px solid #2a2618}
.svc>div{background:#0d0d0f;padding:40px 30px;text-align:center;position:relative;transition:background .3s}
.svc>div:hover{background:#15140f}
.svc>div::before{content:'';position:absolute;inset:10px;border:1px solid transparent;transition:border-color .3s}
.svc>div:hover::before{border-color:#d9b35b55}
.svc .n{font-family:'Cormorant Garamond';font-size:46px;color:#d9b35b;line-height:1}
.svc h3{font-family:'Cormorant Garamond';font-size:28px;font-weight:600;margin:10px 0}
.svc p{color:#bdb39c;font-size:15.5px}
.svc .pr{margin-top:18px;font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:#d9b35b}
.cs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
.cs>div{border:1px solid #2a2618;padding:34px 28px;text-align:center;position:relative}
.cs>div::before,.cs>div::after{content:'';position:absolute;width:18px;height:18px;border:1px solid #d9b35b}
.cs>div::before{top:-1px;left:-1px;border-right:0;border-bottom:0}.cs>div::after{bottom:-1px;right:-1px;border-left:0;border-top:0}
.cs .m{font-family:'Cormorant Garamond';font-size:58px;color:#d9b35b;line-height:1;font-weight:600}
.cs h3{font-size:13px;letter-spacing:.2em;text-transform:uppercase;margin:12px 0 8px}
.cs p{color:#bdb39c;font-size:15px}
.steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:20px;text-align:center}
.steps .d{width:64px;height:64px;margin:0 auto 18px;border:1px solid #d9b35b;transform:rotate(45deg);display:grid;place-items:center}
.steps .d span{transform:rotate(-45deg);font-family:'Cormorant Garamond';font-size:28px;color:#d9b35b}
.steps h3{font-family:'Cormorant Garamond';font-size:23px;font-weight:600}.steps p{color:#bdb39c;font-size:14.5px}
.pl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;align-items:stretch}
.pl>div{border:1px solid #2a2618;padding:40px 30px;text-align:center;display:flex;flex-direction:column}
.pl .hot{border-color:#d9b35b;background:linear-gradient(180deg,#1a170e,#0d0d0f)}
.pl .p{font-family:'Cormorant Garamond';font-size:42px;color:#d9b35b;margin:10px 0 18px;font-weight:600}
.pl li{list-style:none;padding:8px 0;border-bottom:1px solid #2a2618;color:#bdb39c;font-size:15.5px}
.pl ul{margin-bottom:26px}.pl .bt{margin-top:auto}
.qt{text-align:center;max-width:860px;margin:0 auto}
.qt q{font-family:'Cormorant Garamond';font-style:italic;font-size:clamp(26px,3vw,38px);line-height:1.3;quotes:none;display:block;margin-bottom:20px}
.qt span{font-size:13px;letter-spacing:.24em;text-transform:uppercase;color:#d9b35b}
.faq{max-width:820px;margin:0 auto}
.faq details{border-bottom:1px solid #2a2618;padding:18px 0}.faq summary{cursor:pointer;font-family:'Cormorant Garamond';font-size:23px;font-weight:600}.faq p{color:#bdb39c;margin-top:8px}
.end{text-align:center;padding:100px 0;border-top:1px solid #2a2618}
.end h2{font-family:'Cormorant Garamond';font-size:clamp(40px,6vw,82px);font-weight:600;line-height:1;margin:24px 0 30px}
footer{display:flex;justify-content:space-between;padding:22px 0 40px;font-size:12.5px;letter-spacing:.2em;text-transform:uppercase;color:#7d7462;border-top:1px solid #2a2618;flex-wrap:wrap;gap:10px}
@media(max-width:900px){header nav{display:none}.svc,.cs,.pl{grid-template-columns:minmax(0,1fr)}.steps{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:480px){.steps{grid-template-columns:minmax(0,1fr)}}`;
  const fan = `<svg class="fan rv" viewBox="0 0 560 120" fill="none" stroke="#d9b35b" stroke-width="1">${Array.from({ length: 13 }, (_, i) => { const a = Math.PI * (i / 12); return `<line x1="280" y1="118" x2="${280 - Math.cos(a) * 260}" y2="${118 - Math.sin(a) * 110}"/>`; }).join('')}<path d="M20 118 A260 110 0 0 1 540 118"/><path d="M110 118 A170 72 0 0 1 450 118"/><path d="M200 118 A80 34 0 0 1 360 118"/></svg>`;
  const body = `<div class="w"><header>${logo(true)}<nav><a href="#s">Услуги</a><a href="#c">Работы</a><a href="#p">Цены</a><a href="#f">Вопросы</a></nav><a class="bt" href="${TG}">Связаться</a></header>
<section class="hero">${fan}<div class="k rv d1">Финес Студио · ателье разработки</div><h1 class="rv d2">Тонкая работа <i>для вашего</i> бизнеса.</h1><p class="rv d3">Создаём Telegram-ботов, CRM и веб-сервисы с вниманием к каждой детали — как ателье, которое шьёт по меркам, а не продаёт готовое.</p><div class="r rv d3"><a class="bt f" href="${TG}">Записаться на разбор</a><a class="bt" href="#c">Портфолио</a></div></section>
<div class="orn"></div>
<section class="sec" id="s"><div class="sh"><div class="k">Коллекция услуг</div><h2 class="rv">Сделано по меркам</h2></div><div class="svc">${C.services.map((s, i) => `<div class="rv d${i % 3}"><div class="n">${['I', 'II', 'III', 'IV', 'V'][i]}</div><h3>${s.t}</h3><p>${s.s}</p><div class="pr">${s.p}</div></div>`).join('')}<div class="rv"><div class="n">VI</div><h3>Сопровождение</h3><p>Поддержка, мониторинг и доработки. Мы рядом после запуска.</p><div class="pr">от 5 000 ₽ / мес</div></div></div></section>
<div class="orn"></div>
<section class="sec" id="c"><div class="sh"><div class="k">Избранные работы</div><h2 class="rv">Результаты наших клиентов</h2></div><div class="cs">${C.cases.slice(0, 6).map((c, i) => `<div class="rv d${i % 3}"><div class="m">${c.m}</div><h3>${c.c}</h3><p>${c.ml}</p></div>`).join('')}</div></section>
<div class="orn"></div>
<section class="sec"><div class="sh"><div class="k">Церемониал</div><h2 class="rv">Как мы работаем</h2></div><div class="steps">${C.steps.map((s, i) => `<div class="rv d${i}"><div class="d"><span>${i + 1}</span></div><h3>${s.t}</h3><p>${s.s}</p></div>`).join('')}</div></section>
<div class="orn"></div>
<section class="sec" id="p"><div class="sh"><div class="k">Стоимость</div><h2 class="rv">Три формата</h2></div><div class="pl">${C.plans.map((p, i) => `<div class="rv d${i}${p.hot ? ' hot' : ''}"><div class="k gold" style="font-size:13px;letter-spacing:.3em;text-transform:uppercase">${p.t}</div><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul><a class="bt${p.hot ? ' f' : ''}" href="${TG}">Выбрать</a></div>`).join('')}</div></section>
<div class="orn"></div>
<section class="sec"><div class="qt rv"><q>«${C.reviews[1].q}»</q><span>${C.reviews[1].n} · ${C.reviews[1].r}</span></div></section>
<section class="sec faq" id="f" style="padding-top:0"><div class="sh"><div class="k">Вопросы</div><h2 class="rv">Детали</h2></div>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</section>
<section class="end"><div class="orn"></div><h2 class="rv">Начнём с примерки</h2><a class="bt f rv d1" href="${TG}">Написать ${TGH}</a></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div>`;
  return page({ n: 38, title: this.title, fonts: ['Jost', 'Cormorant Garamond'], css, body });
} });

// 39 — Спорт/энергия
L.push({ n: 39, title: 'Спортивный драйв', idea: 'Энергия и скорость: узкий капслок-шрифт, диагонали, бегущие полосы, таймеры и «результаты матча»; для фитнеса, доставки и бизнесов, где важна скорость', build() {
  const css = `
body{font-family:'Onest',sans-serif;background:#111;color:#fff;font-size:17px;overflow-x:hidden}
.w{max-width:1240px;margin:0 auto;padding:0 24px}
.cd{font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.01em}
header{display:flex;justify-content:space-between;align-items:center;padding:18px 0}
header nav{display:flex;gap:26px}header nav a{font-family:'Oswald';text-transform:uppercase;font-size:16px;letter-spacing:.06em}
header nav a:hover{color:#ffc21a}
.bt{display:inline-block;font-family:'Oswald';text-transform:uppercase;letter-spacing:.06em;background:#f2501c;color:#fff;padding:14px 28px;font-size:18px;clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%);transition:.2s}
.bt:hover{background:#ffc21a;color:#111}
.bt.y{background:#ffc21a;color:#111}.bt.y:hover{background:#fff}
.hero{position:relative;padding:60px 0 120px;overflow:hidden}
.hero::before{content:'';position:absolute;right:-14%;top:0;bottom:0;width:54%;background:#f2501c;transform:skewX(-14deg);z-index:0}
.hero::after{content:'';position:absolute;right:-14%;top:0;bottom:0;width:52%;background:repeating-linear-gradient(-76deg,transparent 0 22px,rgba(0,0,0,.1) 22px 24px);transform:skewX(-14deg)}
.hero .w{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:30px;align-items:center}
.hero .k{font-family:'Oswald';color:#ffc21a;font-size:18px;letter-spacing:.2em;text-transform:uppercase}
.hero h1{font-family:'Oswald';text-transform:uppercase;font-size:clamp(52px,7.6vw,124px);line-height:.96;font-weight:700;margin:14px 0 26px;letter-spacing:-.01em}
.hero h1 span{-webkit-text-stroke:2px #fff;color:transparent}
.hero p{font-size:19px;color:#ccc;max-width:500px;margin-bottom:28px}
.hero .r{display:flex;gap:14px;flex-wrap:wrap}
.score{background:#111;border:3px solid #fff;padding:24px;transform:rotate(-3deg);box-shadow:12px 12px 0 #ffc21a}
.score .t{display:flex;justify-content:space-between;font-family:'Oswald';text-transform:uppercase;font-size:14px;letter-spacing:.14em;color:#999;margin-bottom:10px}
.score .t b{color:#f2501c;animation:bl 1s steps(2) infinite}@keyframes bl{50%{opacity:0}}
.score .vs{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:12px;text-align:center}
.score .vs div{font-family:'Oswald';text-transform:uppercase;font-size:17px;line-height:1.2}
.score .vs strong{font-family:'Oswald';font-size:72px;line-height:1;display:block}
.score .vs em{font-family:'Oswald';font-size:44px;font-style:normal;color:#666}
.score ul{margin-top:16px;border-top:1px solid #333;padding-top:12px}
.score li{list-style:none;display:flex;justify-content:space-between;padding:4px 0;font-size:15px;color:#ccc}.score li b{color:#ffc21a;font-family:'Oswald'}
.tick{background:#ffc21a;color:#111;overflow:hidden;transform:skewY(-2deg);margin:-30px 0 40px}
.tick div{display:flex;gap:46px;white-space:nowrap;font-family:'Oswald';text-transform:uppercase;font-size:28px;font-weight:700;padding:12px 0;animation:mq 22s linear infinite;width:max-content}
@keyframes mq{to{transform:translateX(-50%)}}
.sec{padding:80px 0}
.sh{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:36px;gap:20px;flex-wrap:wrap}
.sh h2{font-family:'Oswald';text-transform:uppercase;font-size:clamp(44px,6vw,90px);line-height:.9;font-weight:700}
.sh h2 span{color:#f2501c}
.sh p{color:#999;max-width:380px}
.svc{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:4px}
.svc>div{background:#1c1c1c;padding:26px 20px 30px;position:relative;transition:background .2s,transform .2s;min-height:300px;display:flex;flex-direction:column}
.svc>div:hover{background:#f2501c;transform:translateY(-8px)}
.svc .n{font-family:'Oswald';font-size:64px;line-height:1;color:#333;font-weight:700;transition:color .2s}
.svc>div:hover .n{color:#ffc21a}
.svc h3{font-family:'Oswald';text-transform:uppercase;font-size:24px;margin:10px 0 8px;line-height:1.05}
.svc p{font-size:14.5px;color:#bbb;line-height:1.5}.svc>div:hover p{color:#fff}
.svc .pr{margin-top:auto;padding-top:14px;font-family:'Oswald';font-size:20px;color:#ffc21a}
.stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px}
.stats>div{background:#1c1c1c;padding:30px;border-left:6px solid #f2501c}
.stats .m{font-family:'Oswald';font-size:clamp(46px,5vw,76px);line-height:1;font-weight:700}
.stats h3{font-family:'Oswald';text-transform:uppercase;font-size:18px;color:#ffc21a;margin:8px 0 4px;letter-spacing:.04em}
.stats p{color:#aaa;font-size:15px}
.plan{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:0;position:relative}
.plan>div{padding:20px 18px 0 0;border-top:4px solid #333;position:relative}
.plan>div::before{content:'';position:absolute;top:-12px;left:0;width:20px;height:20px;background:#f2501c;transform:rotate(45deg)}
.plan .d{font-family:'Oswald';font-size:15px;color:#ffc21a;text-transform:uppercase;letter-spacing:.1em}
.plan h3{font-family:'Oswald';text-transform:uppercase;font-size:24px;margin:4px 0 6px}.plan p{color:#aaa;font-size:14.5px}
.pl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px}
.pl>div{background:#1c1c1c;padding:34px 28px}
.pl .hot{background:#f2501c}
.pl .p{font-family:'Oswald';font-size:52px;line-height:1;margin:10px 0 18px}
.pl li{list-style:none;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.12);font-size:15.5px}
.pl ul{margin-bottom:24px}
.faq details{background:#1c1c1c;margin-bottom:4px;padding:18px 22px}.faq summary{cursor:pointer;font-family:'Oswald';text-transform:uppercase;font-size:20px;letter-spacing:.02em}.faq p{color:#bbb;margin-top:8px}
.end{background:#f2501c;padding:80px 0;position:relative;overflow:hidden;margin-top:40px}
.end .w{display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap}
.end h2{font-family:'Oswald';text-transform:uppercase;font-size:clamp(46px,7vw,110px);line-height:.88;font-weight:700}
footer{padding:22px 0 40px;display:flex;justify-content:space-between;color:#777;font-size:14px;flex-wrap:wrap;gap:10px}
@media(max-width:1000px){.svc{grid-template-columns:repeat(2,minmax(0,1fr))}.plan{grid-template-columns:minmax(0,1fr);gap:28px}}
@media(max-width:860px){header nav{display:none}.hero .w,.stats,.pl{grid-template-columns:minmax(0,1fr)}.hero::before,.hero::after{width:100%;top:auto;height:44%;right:-30%}.score{transform:rotate(-1.5deg)}}
@media(max-width:480px){.svc{grid-template-columns:minmax(0,1fr)}.svc>div{min-height:0}}`;
  const tk = 'Быстрый старт ● Цена в договоре ● Демо каждую неделю ● Ответ за 15 минут ● ';
  const body = `<div class="w"><header>${logo(true)}<nav><a href="#s">Услуги</a><a href="#c">Результаты</a><a href="#g">План игры</a><a href="#p">Цены</a></nav><a class="bt y" href="${TG}">В игру</a></header></div>
<section class="hero"><div class="w"><div><div class="k rv">Финес Студио · сезон 2026</div><h1 class="rv d1">Тонкая работа.<br><span>Быстрый</span> результат.</h1><p class="rv d2">Telegram-боты, CRM и веб-сервисы для бизнеса, который не любит ждать. Бот — за 2 недели. Ответ — за 15 минут. Цена — сразу.</p><div class="r rv d3"><a class="bt" href="${TG}">Стартуем</a><a class="bt y" href="#c">Результаты</a></div></div>
<div class="score rv d2"><div class="t"><span>Итоги матча · Лак vs Неявки</span><b>● LIVE</b></div><div class="vs"><div>До<strong>18%</strong></div><em>:</em><div>После<strong style="color:#f2501c">6%</strong></div></div><ul><li>Время запуска <b>2 недели</b></li><li>Автозаписей в месяц <b>740</b></li><li>Окупаемость <b>5 недель</b></li></ul></div></div></section>
<div class="tick"><div>${tk + tk + tk + tk}</div></div>
<div class="w"><section class="sec" id="s"><div class="sh"><h2 class="rv">Состав <span>услуг</span></h2><p>Пять позиций на поле. Каждая решает свою задачу.</p></div><div class="svc">${C.services.map((s, i) => `<div class="rv d${i}"><div class="n">0${i + 1}</div><h3>${s.t}</h3><p>${s.s}</p><div class="pr">${s.p}</div></div>`).join('')}</div></section>
<section class="sec" id="c"><div class="sh"><h2 class="rv">Табло <span>результатов</span></h2><p>Цифры наших клиентов через 1–3 месяца после запуска.</p></div><div class="stats">${C.cases.map((c, i) => `<div class="rv d${i % 3}"><div class="m">${c.m}</div><h3>${c.c}</h3><p>${c.ml}</p></div>`).join('')}</div></section>
<section class="sec" id="g"><div class="sh"><h2 class="rv">План <span>игры</span></h2></div><div class="plan">${C.steps.map((s, i) => `<div class="rv d${i}"><div class="d">${s.d}</div><h3>${s.t}</h3><p>${s.s}</p></div>`).join('')}</div></section>
<section class="sec" id="p"><div class="sh"><h2 class="rv">Абонементы</h2><p>Фиксированная цена. Оплата 50/50.</p></div><div class="pl">${C.plans.map((p, i) => `<div class="rv d${i}${p.hot ? ' hot' : ''}"><div class="cd" style="font-size:20px">${p.t}</div><div style="opacity:.75">${p.for}</div><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul><a class="bt${p.hot ? ' y' : ''}" href="${TG}">Выбрать</a></div>`).join('')}</div></section>
<section class="sec faq"><div class="sh"><h2 class="rv">Вопросы <span>тренеру</span></h2></div>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</section></div>
<section class="end"><div class="w"><h2 class="rv">Ваш ход.</h2><a class="bt y rv d1" href="${TG}">Написать ${TGH}</a></div></section>
<div class="w"><footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div>`;
  return page({ n: 39, title: this.title, fonts: ['Oswald'], css, body });
} });

// 40 — До/после
L.push({ n: 40, title: 'До и после', idea: 'Каждая секция — сравнение «как было / как стало» с интерактивным слайдером-шторкой и парными колонками; убеждает наглядной разницей, для практичных владельцев бизнеса', build() {
  const css = `
body{font-family:'Geologica',sans-serif;background:#f4f3f0;color:#1b1b1b;font-size:17px}
.w{max-width:1200px;margin:0 auto;padding:0 24px}
header{display:flex;justify-content:space-between;align-items:center;padding:20px 0}
header nav{display:flex;gap:26px;font-size:15px}
.bt{display:inline-block;background:#1b1b1b;color:#fff;border-radius:12px;padding:13px 22px;font-weight:600;font-size:15.5px;transition:.2s}
.bt:hover{background:#f2501c}.bt.o{background:#f2501c}.bt.o:hover{background:#1b1b1b}
.hero{text-align:center;padding:50px 0 30px}
.hero h1{font-size:clamp(38px,5.4vw,74px);letter-spacing:-.045em;line-height:1.02;font-weight:800;max-width:960px;margin:0 auto}
.hero h1 s{color:#9b9b9b;text-decoration-thickness:4px;text-decoration-color:#f2501c;font-weight:500}
.hero p{color:#555;max-width:620px;margin:20px auto 26px;font-size:19px}
.cmp{position:relative;max-width:1000px;margin:40px auto 0;border-radius:24px;overflow:hidden;aspect-ratio:16/8;user-select:none;box-shadow:0 40px 80px -50px rgba(0,0,0,.5);--x:50%}
.cmp .pn{position:absolute;inset:0;padding:30px;display:flex;flex-direction:column}
.bef{background:#e3e0da;color:#444}
.aft{background:#1b1b1b;color:#fff;clip-path:inset(0 0 0 var(--x))}
.cmp .lb{font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:16px}
.bef .lb{color:#777}.aft .lb{color:#ffc21a;text-align:right}
.xl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;flex:1}
.cmp .pn{padding:30px 40px}
.xl div{background:#fff;border:1px solid #ccc;font-size:12.5px;padding:8px;font-family:'JetBrains Mono';color:#666;line-height:1.5;overflow:hidden}
.xl div:nth-child(2){transform:rotate(1.5deg);background:#fff8c9}.xl div:nth-child(4){transform:rotate(-2deg)}
.dash{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;flex:1}
.dash div{background:#2a2a2a;border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between}
.dash b{font-size:clamp(26px,3vw,40px);letter-spacing:-.03em;color:#ffc21a}.dash span{font-size:14px;color:#bbb}
.hd{position:absolute;top:0;bottom:0;left:var(--x);width:4px;background:#f2501c;transform:translateX(-2px);pointer-events:none}
.hd::after{content:'⟷';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:48px;height:48px;border-radius:50%;background:#f2501c;color:#fff;display:grid;place-items:center;font-size:20px;box-shadow:0 6px 16px rgba(0,0,0,.3)}
.cmp input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:ew-resize;margin:0}
.hint{text-align:center;color:#777;font-size:14px;margin-top:12px}
.sec{padding:90px 0}
.sec h2{font-size:clamp(32px,4.4vw,56px);letter-spacing:-.04em;line-height:1.04;font-weight:800;margin-bottom:34px}
.pair{display:grid;grid-template-columns:minmax(0,1fr) 60px minmax(0,1fr);gap:0;align-items:stretch;margin-bottom:14px}
.pair>div{border-radius:18px;padding:22px 24px}
.pair .b{background:#e6e3dd;color:#555}
.pair .a{background:#fff;box-shadow:0 10px 30px -20px rgba(0,0,0,.3)}
.pair .ar{display:grid;place-items:center;color:#f2501c;font-size:28px;font-weight:800}
.pair h3{font-size:13px;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px}
.pair .b h3{color:#888}.pair .a h3{color:#f2501c}
.pair p{font-size:17px;line-height:1.45}
.pair .a b{font-weight:700}
.svc{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
.svc>div{background:#fff;border-radius:18px;padding:22px}
.svc h3{font-size:18px;margin-bottom:6px}.svc p{font-size:14.5px;color:#555;line-height:1.5}.svc b{display:block;margin-top:12px;color:#f2501c}
.cs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.cs>div{background:#fff;border-radius:20px;padding:24px}
.cs .ba{display:flex;align-items:baseline;gap:10px;margin:10px 0}
.cs .ba s{color:#999;font-size:22px}.cs .ba b{font-size:40px;letter-spacing:-.04em;color:#f2501c}
.cs h3{font-size:16px}.cs p{font-size:14.5px;color:#555}
.steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;counter-reset:s}
.steps>div{border-top:3px solid #1b1b1b;padding-top:14px}
.steps>div::before{counter-increment:s;content:counter(s);font-size:40px;font-weight:800;color:#f2501c;letter-spacing:-.04em;display:block;line-height:1;margin-bottom:8px}
.steps h3{font-size:17px}.steps p{font-size:14.5px;color:#555}
.pl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.pl>div{background:#fff;border-radius:20px;padding:28px}
.pl .hot{background:#1b1b1b;color:#fff}
.pl .p{font-size:34px;font-weight:800;letter-spacing:-.03em;margin:8px 0 14px}
.pl li{list-style:none;padding:5px 0;font-size:15.5px}.pl li::before{content:'→ ';color:#f2501c}
.faq details{background:#fff;border-radius:14px;padding:16px 20px;margin-bottom:10px}.faq summary{font-weight:600;cursor:pointer}.faq p{color:#555;margin-top:8px}
.end{background:#1b1b1b;color:#fff;border-radius:28px;padding:60px 40px;text-align:center;margin-bottom:40px}
.end h2{color:#fff;margin-bottom:12px}.end p{color:#aaa;margin-bottom:26px}
footer{display:flex;justify-content:space-between;color:#777;font-size:14px;padding:0 0 40px;flex-wrap:wrap;gap:10px}
@media(max-width:900px){header nav{display:none}.cmp{aspect-ratio:auto;height:440px}.xl,.dash{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.xl div:nth-child(n+5),.dash div:nth-child(n+5){display:none}.pair{grid-template-columns:minmax(0,1fr)}.pair .ar{transform:rotate(90deg);height:40px}.svc,.cs,.pl{grid-template-columns:minmax(0,1fr)}.steps{grid-template-columns:repeat(2,minmax(0,1fr))}.end{padding:40px 20px}}`;
  const pairs = [['Заявки приходят в директ, WhatsApp, почту и звонками. Половина теряется.', 'Все заявки падают в <b>одну CRM</b>, у каждой есть ответственный и статус.'], ['Администратор полдня отвечает «а есть окошко на завтра?»', '<b>Бот записывает сам</b>, 24/7, и напоминает клиенту за 2 часа.'], ['Счёт делается 15 минут: Excel, Word, копировать реквизиты.', 'Счёт формируется <b>в 2 клика</b> и уходит клиенту автоматически.'], ['Отчёт по продажам собирается в пятницу вечером руками.', 'Отчёт <b>обновляется сам</b>, собственник смотрит его с телефона.'], ['Остатки в 1С и на сайте не совпадают, клиенты злятся.', '<b>Синхронизация с 1С</b> каждые 5 минут, ошибок нет.']];
  const body = `<div class="w"><header>${logo()}<nav><a href="#d">До и после</a><a href="#s">Услуги</a><a href="#c">Кейсы</a><a href="#p">Цены</a></nav><a class="bt" href="${TG}">Написать</a></header>
<section class="hero"><h1 class="rv"><s>Ручная рутина.</s> Тонкая работа для вашего бизнеса.</h1><p class="rv d1">Финес Студио убирает хаос из процессов малого бизнеса: боты, CRM, веб-сервисы и интеграции. Потяните шторку — посмотрите, как это выглядит.</p><a class="bt o rv d2" href="${TG}">Хочу «после»</a>
<div class="cmp rv d2" id="cmp"><div class="pn bef"><div class="lb">До</div><div class="xl"><div>заявки_ноябрь_ФИНАЛ_2.xlsx<br>Иванова — перезвонить??<br>Петров 89… (не дозв)</div><div>Стикер:<br>оплатили или нет?? уточнить у Маши</div><div>Директ: 23 непрочитанных<br>«вы работаете?»</div><div>счёт_шаблон_старый.docx<br>реквизиты — где?</div><div>Отчёт: собрать в пятницу</div><div>Пропущенный звонок (4)</div></div></div>
<div class="pn aft"><div class="lb">После</div><div class="dash"><div><span>Заявки сегодня</span><b>18</b></div><div><span>Без ответа</span><b>0</b></div><div><span>Оплачено</span><b>212 400 ₽</b></div><div><span>Записей через бота</span><b>74%</b></div><div><span>Счёт</span><b>2 клика</b></div><div><span>Отчёт</span><b>онлайн</b></div></div></div>
<div class="hd"></div><input type="range" min="0" max="100" value="50" aria-label="Сравнить до и после"></div><div class="hint">← потяните шторку →</div></section>
<section class="sec" id="d"><h2 class="rv">Пять «до и после», которые мы делаем чаще всего</h2>${pairs.map(p => `<div class="pair rv"><div class="b"><h3>Было</h3><p>${p[0]}</p></div><div class="ar">→</div><div class="a"><h3>Стало</h3><p>${p[1]}</p></div></div>`).join('')}</section>
<section class="sec" id="s" style="padding-top:0"><h2 class="rv">Инструменты, которые делают «после»</h2><div class="svc">${C.services.map((s, i) => `<div class="rv d${i}"><h3>${s.t}</h3><p>${s.s}</p><b>${s.p}</b></div>`).join('')}</div></section>
<section class="sec" id="c" style="padding-top:0"><h2 class="rv">Кейсы: было → стало</h2><div class="cs">${C.cases.map((c, i) => `<div class="rv d${i % 3}"><h3>${c.c}</h3><div class="ba"><s>${['0%', '18%', '15 мин', '4 часа', '3 дня', 'вручную'][i] || ''}</s><b>${c.m}</b></div><p>${c.ml}. ${c.t}.</p></div>`).join('')}</div></section>
<section class="sec" style="padding-top:0"><h2 class="rv">Как добраться до «после»</h2><div class="steps">${C.steps.map(s => `<div class="rv"><h3>${s.t}</h3><p>${s.s}</p></div>`).join('')}</div></section>
<section class="sec" id="p" style="padding-top:0"><h2 class="rv">Цены</h2><div class="pl">${C.plans.map((p, i) => `<div class="rv d${i}${p.hot ? ' hot' : ''}"><b>${p.t}</b><div style="opacity:.7">${p.for}</div><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul></div>`).join('')}</div></section>
<section class="sec faq" style="padding-top:0"><h2 class="rv">Вопросы</h2>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</section>
<section class="end rv"><h2>Пора переходить к «после»</h2><p>Бесплатный разбор задачи — ответим за 15 минут.</p><a class="bt o" href="${TG}">Написать ${TGH}</a></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div>`;
  const js = `const c=document.getElementById('cmp'),r=c.querySelector('input');r.addEventListener('input',()=>c.style.setProperty('--x',r.value+'%'));`;
  return page({ n: 40, title: this.title, fonts: ['Geologica', 'JetBrains Mono'], css, body, js });
} });

export default L;
