import { page, logo, C, TG, TGH, dot } from './core.mjs';
const L = [];

// 11 — Квиз-лендинг
L.push({ n: 11, title: 'Квиз-лендинг', idea: 'Пошаговый квиз из 4 вопросов прямо в первом экране, в конце — оценка и переход в Telegram; для рекламного трафика и холодных клиентов', build() {
  const css = `
body{font-family:'Golos Text',sans-serif;background:#fff;color:#1b1b1f}
.w{max-width:1200px;margin:0 auto;padding:0 24px}
header{display:flex;justify-content:space-between;align-items:center;padding:20px 0;border-bottom:1px solid #eee}
header .ph{font-size:14px;color:#777}header .ph b{color:#1b1b1f}
.btn{background:#f2501c;color:#fff;padding:14px 22px;border-radius:12px;font-weight:600;display:inline-block;transition:.2s;border:0}
.btn:hover{background:#d8410f}
.hero{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:48px;padding:56px 0 80px;align-items:center}
.hero h1{font-size:clamp(34px,4.4vw,58px);line-height:1.05;letter-spacing:-.035em;font-weight:800}
.hero h1 span{background:#ffc21a;padding:0 .12em;border-radius:6px}
.hero p{font-size:18px;color:#555;margin:18px 0 26px;line-height:1.5}
.gift{display:flex;gap:14px;align-items:center;background:#fff6ee;border-radius:16px;padding:16px 18px;font-size:15px;border:1px dashed #f2501c}
.gift b{font-size:26px}
.quiz{background:#1b1b1f;color:#fff;border-radius:28px;padding:34px;min-height:480px;display:flex;flex-direction:column;box-shadow:0 30px 70px -30px rgba(0,0,0,.5)}
.qtop{display:flex;justify-content:space-between;font-size:14px;color:#9a9aa3;margin-bottom:12px}
.bar{height:6px;border-radius:6px;background:#33333a;overflow:hidden;margin-bottom:28px}
.bar i{display:block;height:100%;background:linear-gradient(90deg,#f2501c,#ffc21a);width:25%;transition:width .4s}
.q{display:none;animation:in .4s}
.q.on{display:block}
@keyframes in{from{opacity:0;transform:translateX(20px)}}
.q h3{font-size:26px;letter-spacing:-.02em;margin-bottom:20px}
.ans{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.ans button{background:#26262c;border:2px solid transparent;border-radius:16px;padding:18px;text-align:left;font-size:16px;font-weight:600;transition:.2s;color:#fff}
.ans button small{display:block;font-weight:400;color:#9a9aa3;font-size:13px;margin-top:4px}
.ans button:hover{border-color:#f2501c;background:#2f2f36}
.res{text-align:center;padding-top:10px}
.res .p{font-size:52px;font-weight:800;letter-spacing:-.04em;color:#ffc21a;margin:12px 0}
.res p{color:#bbb;margin-bottom:22px}
.qnav{margin-top:auto;padding-top:20px;display:flex;justify-content:space-between;align-items:center;font-size:14px;color:#9a9aa3}
.qnav button{color:#9a9aa3}
.trust{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;padding:30px 0;border-top:1px solid #eee;border-bottom:1px solid #eee}
.trust b{display:block;font-size:30px;font-weight:800;letter-spacing:-.03em}.trust span{font-size:14px;color:#777}
.sec{padding:80px 0}
.sec h2{font-size:clamp(28px,3.4vw,44px);letter-spacing:-.03em;font-weight:800;margin-bottom:36px;max-width:760px;line-height:1.1}
.pain{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.pain div{border-radius:20px;padding:26px;background:#f6f6f8}
.pain .x{font-size:14px;color:#c0392b;font-weight:700;margin-bottom:8px}
.pain .v{font-size:14px;color:#1a7f4b;font-weight:700;margin:14px 0 6px}
.pain p{font-size:15px;color:#444}
.svc{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
.svc div{border:1px solid #eee;border-radius:18px;padding:22px;transition:.2s}
.svc div:hover{border-color:#f2501c;transform:translateY(-3px)}
.svc h3{font-size:18px;margin-bottom:8px}.svc p{font-size:14px;color:#666}.svc b{display:block;margin-top:12px;color:#f2501c}
.cases{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.cases div{border-radius:20px;padding:26px;background:#1b1b1f;color:#fff}
.cases .m{font-size:40px;font-weight:800;color:#ffc21a}
.cases p{color:#aaa;font-size:14px;margin-top:8px}
.rev{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.rev div{background:#fff6ee;border-radius:20px;padding:24px}
.rev q{display:block;quotes:none;font-size:16px;line-height:1.5;margin-bottom:16px}
.rev span{font-size:13px;color:#777}
.faq details{border-bottom:1px solid #eee;padding:18px 0}.faq summary{font-weight:600;font-size:18px;cursor:pointer}.faq p{margin-top:8px;color:#555}
.end{background:#f2501c;color:#fff;border-radius:28px;padding:50px;text-align:center;margin-bottom:60px}
.end h2{font-size:clamp(28px,3.6vw,46px);letter-spacing:-.03em;margin-bottom:12px}
.end a{background:#fff;color:#1b1b1f;padding:16px 26px;border-radius:12px;font-weight:700;display:inline-block;margin-top:16px}
footer{padding:0 0 30px;color:#999;font-size:14px;text-align:center}
@media(max-width:960px){.hero,.pain,.cases,.rev{grid-template-columns:minmax(0,1fr)}.svc{grid-template-columns:repeat(2,minmax(0,1fr))}.trust{grid-template-columns:repeat(2,minmax(0,1fr))}header .ph{display:none}}
@media(max-width:560px){.ans{grid-template-columns:minmax(0,1fr)}.quiz{padding:22px}.svc{grid-template-columns:minmax(0,1fr)}.end{padding:32px 20px}}`;
  const Q = [
    ['Что хотите автоматизировать?', [['Запись клиентов', 'салон, сервис, клиника'], ['Приём заказов', 'кафе, доставка, магазин'], ['Продажи и сделки', 'отдел продаж, B2B'], ['Пока не знаю', 'поможем разобраться']]],
    ['Где сейчас живут заявки?', [['В директе и WhatsApp', ''], ['В Excel / Таблицах', ''], ['В amoCRM / Битрикс24', ''], ['В голове у менеджера', '']]],
    ['Что нужно подключить?', [['Оплату онлайн', 'ЮKassa, СБП'], ['1С / склад', ''], ['Рассылки', ''], ['Ничего, только старт', '']]],
    ['Когда хотите запуститься?', [['Как можно скорее', 'до 2 недель'], ['В течение месяца', ''], ['В этом квартале', ''], ['Просто узнаю цену', '']]],
  ];
  const body = `<div class="w">
<header>${logo()}<span class="ph">Пн–Пт 10:00–19:00 · отвечаем за <b>15 минут</b></span><a class="btn" href="${TG}">Telegram</a></header>
<section class="hero"><div class="rv"><h1>Узнайте цену бота или CRM <span>за 4 клика</span></h1><p>Ответьте на 4 вопроса — покажем примерную стоимость, срок и похожий кейс. Финес Студио: тонкая работа для вашего бизнеса.</p><div class="gift"><b>🎁</b><div><b style="font-size:16px">Бонус за прохождение</b><br>Бесплатный аудит процесса заявок и схема автоматизации</div></div></div>
<div class="quiz rv d2"><div class="qtop"><span id="qs">Вопрос 1 из 4</span><span>~1 минута</span></div><div class="bar"><i id="qb"></i></div>
${Q.map((q, i) => `<div class="q${i === 0 ? ' on' : ''}"><h3>${q[0]}</h3><div class="ans">${q[1].map(a => `<button type="button">${a[0]}${a[1] ? `<small>${a[1]}</small>` : ''}</button>`).join('')}</div></div>`).join('')}
<div class="q res"><div style="color:#9a9aa3">Ориентир для вашей задачи</div><div class="p">60–120 тыс ₽</div><p>Срок 2–4 недели. Похожий кейс: бот записи для студии «Лак», неявки снизились с 18% до 6%.</p><a class="btn" href="${TG}">Получить точную смету в Telegram</a></div>
<div class="qnav"><button type="button" id="back">← Назад</button><span>Ответы никуда не отправляются</span></div></div></section>
<section class="trust">${C.stats.map(s => `<div class="rv"><b>${s.v}</b><span>${s.l}</span></div>`).join('')}</section>
<section class="sec"><h2 class="rv">Узнаёте себя? Мы это чиним</h2><div class="pain">${[['Администратор полдня отвечает в директ', 'Бот записывает сам, 24/7'], ['Заявки с сайта теряются в почте', 'Каждая заявка — в CRM с источником'], ['Менеджер вручную переносит заказы в 1С', 'Синхронизация за секунды']].map((p, i) => `<div class="rv d${i}"><div class="x">✕ Было</div><p>${p[0]}</p><div class="v">✓ Стало</div><p>${p[1]}</p></div>`).join('')}</div></section>
<section class="sec" style="padding-top:0"><h2 class="rv">Что делаем</h2><div class="svc">${C.services.map((s, i) => `<div class="rv d${i}"><h3>${s.t}</h3><p>${s.s}</p><b>${s.p}</b></div>`).join('')}</div></section>
<section class="sec" style="padding-top:0"><h2 class="rv">Результаты клиентов</h2><div class="cases">${C.cases.slice(0, 3).map((c, i) => `<div class="rv d${i}"><div class="m">${c.m}</div><b>${c.ml}</b><p>${c.c} — ${c.t.toLowerCase()}</p></div>`).join('')}</div></section>
<section class="sec" style="padding-top:0"><h2 class="rv">Отзывы</h2><div class="rev">${C.reviews.map((r, i) => `<div class="rv d${i}"><q>«${r.q}»</q><b>${r.n}</b><br><span>${r.r}</span></div>`).join('')}</div></section>
<section class="sec faq" style="padding-top:0"><h2 class="rv">Вопросы</h2>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</section>
<section class="end rv"><h2>Не хотите проходить квиз?</h2><p>Просто напишите задачу своими словами — разберёмся.</p><a href="${TG}">Написать ${TGH}</a></section>
<footer>© 2026 Финес Студио · ${C.slogan}</footer></div>`;
  const js = `let qi=0;const qs=[...document.querySelectorAll('.q')];function show(){qs.forEach((q,i)=>q.classList.toggle('on',i===qi));document.getElementById('qb').style.width=Math.min(100,(qi+1)*25)+'%';document.getElementById('qs').textContent=qi<4?'Вопрос '+(qi+1)+' из 4':'Готово!';}
document.querySelectorAll('.ans button').forEach(b=>b.onclick=()=>{qi=Math.min(4,qi+1);show()});document.getElementById('back').onclick=()=>{qi=Math.max(0,qi-1);show()};`;
  return page({ n: 11, title: this.title, fonts: ['Golos Text'], css, body, js });
} });

// 12 — Чат как hero
L.push({ n: 12, title: 'Чат-интерфейс в hero', idea: 'Первый экран — живой диалог с ботом студии, который сам «печатает» и отвечает на кнопки; показывает продукт вместо описания', build() {
  const css = `
body{font-family:'Onest',sans-serif;background:#f4f1ec;color:#1d1a16}
.w{max-width:1240px;margin:0 auto;padding:0 24px}
header{display:flex;justify-content:space-between;align-items:center;padding:22px 0}
header nav{display:flex;gap:26px;font-size:15px}header nav a:hover{color:#f2501c}
.btn{background:#1d1a16;color:#fff;padding:13px 20px;border-radius:99px;font-weight:600;font-size:15px;display:inline-block;transition:.2s}
.btn:hover{background:#f2501c}
.hero{display:grid;grid-template-columns:minmax(0,1fr) 440px;gap:60px;align-items:center;padding:40px 0 90px}
.hero h1{font-size:clamp(40px,5.4vw,80px);line-height:.98;letter-spacing:-.05em;font-weight:800}
.hero h1 span{color:#f2501c}
.hero p{font-size:19px;color:#5e574d;margin:24px 0 30px;max-width:520px;line-height:1.5}
.hero .r{display:flex;gap:14px;align-items:center;flex-wrap:wrap}
.hero .r small{color:#8a8274;font-size:14px}
.phone{background:#1d1a16;border-radius:46px;padding:12px;box-shadow:0 40px 80px -30px rgba(29,26,22,.55)}
.scr{background:#e7ebef;border-radius:36px;overflow:hidden;height:600px;display:flex;flex-direction:column}
.tb{background:#fff;padding:16px 18px;display:flex;align-items:center;gap:12px;border-bottom:1px solid #e2e2e2}
.av{width:42px;height:42px;border-radius:50%;background:#1d1a16;display:grid;place-items:center;flex:none}
.av svg{width:24px;height:24px}
.tb b{display:block;font-size:15px}.tb span{font-size:12px;color:#2f8be6}
.msgs{flex:1;padding:16px;display:flex;flex-direction:column;gap:8px;overflow:hidden;justify-content:flex-end}
.m{max-width:82%;padding:10px 14px;border-radius:18px;font-size:14.5px;line-height:1.4;animation:pop .35s cubic-bezier(.2,.8,.3,1.3)}
@keyframes pop{from{opacity:0;transform:translateY(10px) scale(.96)}}
.m.b{background:#fff;border-bottom-left-radius:6px;align-self:flex-start}
.m.u{background:#effdde;border-bottom-right-radius:6px;align-self:flex-end}
.typing{align-self:flex-start;background:#fff;border-radius:18px;padding:12px 16px;display:flex;gap:4px}
.typing i{width:7px;height:7px;border-radius:50%;background:#aaa;animation:ty 1s infinite}
.typing i:nth-child(2){animation-delay:.15s}.typing i:nth-child(3){animation-delay:.3s}
@keyframes ty{50%{transform:translateY(-4px);background:#666}}
.kb{padding:10px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;background:#e7ebef}
.kb button{background:#fff;border-radius:10px;padding:11px 8px;font-size:13.5px;font-weight:600;color:#2f8be6;transition:.15s}
.kb button:hover{background:#f2f8ff}
.sec{padding:90px 0;border-top:1px solid #ddd6cb}
.sec h2{font-size:clamp(32px,4vw,56px);letter-spacing:-.045em;line-height:1;font-weight:800;margin-bottom:44px}
.svc{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
.svc div{background:#fff;border-radius:24px;padding:24px;display:flex;flex-direction:column;min-height:260px;transition:.25s}
.svc div:hover{transform:translateY(-5px);box-shadow:0 20px 40px -25px rgba(0,0,0,.3)}
.svc h3{font-size:20px;letter-spacing:-.02em;margin-bottom:10px}.svc p{font-size:14px;color:#5e574d;line-height:1.5}
.svc b{margin-top:auto;padding-top:16px;font-size:15px}
.dlg{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.dlg>div{background:#fff;border-radius:24px;padding:22px}
.dlg .hd{display:flex;justify-content:space-between;font-size:13px;color:#8a8274;margin-bottom:14px}
.dlg .m{animation:none;font-size:13.5px;margin-bottom:6px}
.dlg .m.b{background:#f4f1ec}
.dlg .res{margin-top:16px;padding-top:14px;border-top:1px solid #eee;display:flex;align-items:baseline;gap:10px}
.dlg .res b{font-size:30px;color:#f2501c;letter-spacing:-.03em}.dlg .res span{font-size:13px;color:#5e574d}
.steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
.steps div{border-top:3px solid #1d1a16;padding-top:16px}
.steps b{color:#f2501c;font-size:14px}.steps h3{font-size:19px;margin:8px 0 6px}.steps p{font-size:14px;color:#5e574d}
.faq{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.faq details{background:#fff;border-radius:18px;padding:20px 22px}.faq summary{font-weight:600;cursor:pointer}.faq p{margin-top:8px;color:#5e574d}
.end{display:flex;justify-content:space-between;align-items:center;gap:30px;flex-wrap:wrap;padding:80px 0}
.end h2{font-size:clamp(32px,4.6vw,64px);letter-spacing:-.045em;line-height:1;margin:0;max-width:760px}
footer{padding:24px 0 40px;font-size:14px;color:#8a8274;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;border-top:1px solid #ddd6cb}
@media(max-width:1000px){.hero{grid-template-columns:minmax(0,1fr)}.phone{max-width:420px;width:100%;margin:0 auto}.svc{grid-template-columns:repeat(2,minmax(0,1fr))}.dlg,.faq{grid-template-columns:minmax(0,1fr)}.steps{grid-template-columns:minmax(0,1fr)}header nav{display:none}}
@media(max-width:560px){.svc{grid-template-columns:minmax(0,1fr)}.scr{height:540px}.phone{border-radius:36px;padding:8px}.scr{border-radius:30px}}`;
  const body = `<div class="w">
<header>${logo()}<nav><a href="#svc">Услуги</a><a href="#dlg">Примеры ботов</a><a href="#steps">Процесс</a><a href="#faq">FAQ</a></nav><a class="btn" href="${TG}">${TGH}</a></header>
<section class="hero"><div><h1 class="rv">Ваш лучший сотрудник <span>отвечает за 0,3 секунды.</span></h1><p class="rv d1">Это бот. Мы делаем таких для кофеен, салонов, сервисов и отделов продаж. Попробуйте справа — так же будет говорить с вашими клиентами ваш бот.</p><div class="r rv d2"><a class="btn" href="${TG}">Хочу такого бота</a><small>Тонкая работа для вашего бизнеса.</small></div></div>
<div class="phone rv d2"><div class="scr"><div class="tb"><div class="av"><svg viewBox="0 0 20 20"><g style="transform-origin:10px 10px;animation:fspin 3s linear infinite"><circle cx="7" cy="10" r="6" fill="#f2501c" style="mix-blend-mode:screen"/><circle cx="13" cy="10" r="6" fill="#ffc21a" style="mix-blend-mode:screen"/></g></svg></div><div><b>Финес · помощник</b><span id="st">бот · онлайн</span></div></div><div class="msgs" id="msgs"></div><div class="kb" id="kb"></div></div></div></section>
<section class="sec" id="svc"><h2 class="rv">Что мы делаем</h2><div class="svc">${C.services.map((s, i) => `<div class="rv d${i}"><h3>${s.t}</h3><p>${s.s}</p><b>${s.p}</b></div>`).join('')}</div></section>
<section class="sec" id="dlg"><h2 class="rv">Боты, которые уже работают</h2><div class="dlg">
${[[C.cases[0], ['Хочу капучино 0,4 на овсяном', 'Принято! Забрать через 7 минут на Пушкина, 12. Оплатить картой или СБП?']], [C.cases[1], ['Хочу записаться на маникюр в субботу', 'В субботу свободно 12:00 и 16:30 у мастера Оли. Какое время?']], [C.cases[5], ['Покажи, что есть из овощей', 'Открываю каталог 🥕 Сегодня свежие томаты, огурцы и зелень. Доставим к 19:00.']]].map(([c, d], i) => `<div class="rv d${i}"><div class="hd"><span>${c.c}</span><span>${c.tag}</span></div><div class="m u">${d[0]}</div><div class="m b">${d[1]}</div><div class="res"><b>${c.m}</b><span>${c.ml}</span></div></div>`).join('')}</div></section>
<section class="sec" id="steps"><h2 class="rv">От идеи до бота — 2 недели</h2><div class="steps">${C.steps.map((s, i) => `<div class="rv d${i}"><b>0${i + 1} · ${s.d}</b><h3>${s.t}</h3><p>${s.s}</p></div>`).join('')}</div></section>
<section class="sec" id="faq"><h2 class="rv">Частые вопросы</h2><div class="faq">${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></section>
<section class="end"><h2 class="rv">Напишите нам — ответит человек, не бот.</h2><a class="btn rv d1" style="padding:18px 28px;font-size:17px" href="${TG}">Открыть Telegram</a></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div>`;
  const js = `const M=document.getElementById('msgs'),K=document.getElementById('kb'),S=document.getElementById('st');
const T={start:{b:['Привет! Я помощник Финес Студио 👋','Мы делаем ботов, CRM и веб-сервисы. Что вас интересует?'],k:['🤖 Бот для бизнеса','📊 CRM-система','💰 Сколько стоит?','⚡ Сроки']},
'🤖 Бот для бизнеса':{b:['Бот может записывать клиентов, принимать заказы и оплату, делать рассылки.','Например, кофейня «Зерно» получает 31% заказов через бота.'],k:['💰 Сколько стоит?','⚡ Сроки','↩ В начало']},
'📊 CRM-система':{b:['Делаем CRM под ваш процесс: сделки, склад, роли, отчёты, связь с 1С.','«СтройДвор» теперь тратит 15 минут на заявку вместо 2 часов.'],k:['💰 Сколько стоит?','⚡ Сроки','↩ В начало']},
'💰 Сколько стоит?':{b:['Бот — от 40 000 ₽, CRM — от 120 000 ₽.','Точную цену фиксируем в договоре после бесплатного разбора.'],k:['✍️ Написать менеджеру','↩ В начало']},
'⚡ Сроки':{b:['Бот — 2–3 недели, сайт — 2–4, CRM — 4–8 недель.','Демо показываем каждую неделю.'],k:['✍️ Написать менеджеру','↩ В начало']}};
function add(t,c){const d=document.createElement('div');d.className='m '+c;d.textContent=t;M.appendChild(d);while(M.children.length>9)M.removeChild(M.firstChild)}
async function say(key){const n=T[key];K.innerHTML='';for(const t of n.b){S.textContent='печатает…';const ty=document.createElement('div');ty.className='typing';ty.innerHTML='<i></i><i></i><i></i>';M.appendChild(ty);await new Promise(r=>setTimeout(r,700));ty.remove();add(t,'b');S.textContent='бот · онлайн';}
n.k.forEach(k=>{const b=document.createElement('button');b.textContent=k;b.onclick=()=>{if(k.startsWith('✍️')){location.href='${TG}';return}add(k,'u');say(k.startsWith('↩')?'start':k)};K.appendChild(b)})}
say('start');`;
  return page({ n: 12, title: this.title, css, body, js });
} });

// 13 — Таймлайн процесса
L.push({ n: 13, title: 'Таймлайн процесса', idea: 'Страница выстроена как вертикальная линия проекта от первого сообщения до запуска, с днями и артефактами; снимает страх «что будет после оплаты»', build() {
  const css = `
body{font-family:'Manrope',sans-serif;background:#fbfaf7;color:#1a1916}
.w{max-width:1100px;margin:0 auto;padding:0 24px}
header{display:flex;justify-content:space-between;align-items:center;padding:22px 0}
.btn{background:#f2501c;color:#fff;padding:13px 22px;border-radius:10px;font-weight:700;display:inline-block;transition:.2s}
.btn:hover{background:#1a1916}
.hero{padding:70px 0 40px;text-align:center}
.hero .k{display:inline-block;font-weight:700;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#f2501c}
.hero h1{font-size:clamp(38px,6vw,82px);letter-spacing:-.045em;line-height:1;font-weight:800;margin:16px auto 20px;max-width:900px}
.hero p{font-size:19px;color:#5f5a50;max-width:620px;margin:0 auto 28px;line-height:1.5}
.sum{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:30px}
.sum span{background:#fff;border:1px solid #e8e4da;border-radius:99px;padding:10px 16px;font-size:14px;font-weight:600}
.tl{position:relative;padding:60px 0 40px}
.tl::before{content:'';position:absolute;left:50%;top:0;bottom:0;width:2px;background:repeating-linear-gradient(#d8d2c4 0 8px,transparent 8px 14px);transform:translateX(-1px)}
.tl .prog{position:absolute;left:50%;top:0;width:2px;background:#f2501c;transform:translateX(-1px);height:0;transition:height .2s linear}
.it{display:grid;grid-template-columns:minmax(0,1fr) 80px minmax(0,1fr);align-items:start;margin-bottom:56px;position:relative}
.it .dot{grid-column:2;justify-self:center;width:52px;height:52px;border-radius:50%;background:#fff;border:2px solid #1a1916;display:grid;place-items:center;font-weight:800;position:relative;z-index:1;transition:.3s}
.it.in .dot{background:#f2501c;border-color:#f2501c;color:#fff}
.it .card{background:#fff;border:1px solid #e8e4da;border-radius:20px;padding:26px;box-shadow:0 14px 30px -24px rgba(0,0,0,.3)}
.it:nth-child(odd) .card{grid-column:1;grid-row:1}
.it:nth-child(even) .card{grid-column:3}
.it .when{grid-row:1;align-self:center;font-weight:800;font-size:15px;color:#9b9486}
.it:nth-child(odd) .when{grid-column:3;padding-left:10px}
.it:nth-child(even) .when{grid-column:1;text-align:right;padding-right:10px}
.card h3{font-size:24px;letter-spacing:-.02em;margin-bottom:8px}
.card p{color:#5f5a50;line-height:1.55}
.card .art{margin-top:16px;display:flex;flex-wrap:wrap;gap:6px}
.card .art span{font-size:12.5px;font-weight:700;background:#fff4e0;color:#8a5a00;padding:6px 10px;border-radius:8px}
.card .you{margin-top:14px;font-size:14px;border-top:1px dashed #e8e4da;padding-top:12px}
.card .you b{color:#f2501c}
.sec{padding:80px 0;border-top:1px solid #e8e4da}
.sec h2{font-size:clamp(30px,4vw,52px);letter-spacing:-.04em;line-height:1.02;font-weight:800;margin-bottom:36px}
.svc{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
.svc div{background:#fff;border:1px solid #e8e4da;border-radius:18px;padding:20px}
.svc h3{font-size:17px;margin-bottom:6px}.svc p{font-size:13.5px;color:#5f5a50;line-height:1.5}
.svc .d{margin-top:12px;font-size:13px;font-weight:800;color:#f2501c}
.cases{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.cases div{padding:26px;border-radius:20px;background:#1a1916;color:#fff}
.cases .m{font-size:42px;font-weight:800;color:#ffc21a;letter-spacing:-.04em}
.cases .t{font-size:13px;color:#a8a194;margin-top:14px}
.cases p{font-size:14px;color:#cfc9bd;margin-top:6px}
.faq details{border-bottom:1px solid #e8e4da;padding:18px 0}.faq summary{font-weight:700;font-size:18px;cursor:pointer}.faq p{margin-top:8px;color:#5f5a50}
.end{padding:90px 0;text-align:center}
.end h2{font-size:clamp(34px,5vw,66px);letter-spacing:-.045em;line-height:1;margin-bottom:24px}
footer{border-top:1px solid #e8e4da;padding:24px 0 40px;color:#9b9486;font-size:14px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}
@media(max-width:860px){.tl::before,.tl .prog{left:26px}.it{grid-template-columns:52px minmax(0,1fr);gap:16px}.it .dot{grid-column:1;grid-row:1/3}.it .card,.it:nth-child(odd) .card,.it:nth-child(even) .card{grid-column:2;grid-row:2}.it .when,.it:nth-child(odd) .when,.it:nth-child(even) .when{grid-column:2;grid-row:1;text-align:left;padding:0}.svc,.cases{grid-template-columns:minmax(0,1fr)}}`;
  const T = [
    ['Вы пишете нам', 'День 0', 'В Telegram, парой строк: что болит и что хотите получить. Отвечаем в течение 15 минут.', ['сообщение в @fines_studio'], 'описать задачу своими словами'],
    ['Бесплатный разбор', 'День 1', 'Созвон на 30 минут. Задаём неудобные вопросы, ищем, где теряются клиенты и время, предлагаем 1–2 варианта решения.', ['схема процесса', 'варианты решения'], '30 минут на звонок'],
    ['Смета и договор', 'День 2–3', 'Фиксируем объём, цену и сроки. Всё, что не вошло, — отдельным списком, чтобы не было сюрпризов.', ['ТЗ на 2–5 страниц', 'смета', 'договор'], 'согласовать и внести 50%'],
    ['Кликабельный прототип', 'День 4–8', 'Показываем, как будет выглядеть бот или интерфейс. Правки на этом этапе стоят ноль рублей.', ['прототип в Figma', 'сценарии бота'], 'посмотреть и прокомментировать'],
    ['Разработка с демо', 'Недели 2–6', 'Каждую пятницу — демо и доступ к тестовой версии. Видно, что сделано и что дальше.', ['тестовый бот', 'еженедельный отчёт'], '20 минут в неделю на демо'],
    ['Запуск', 'Финиш', 'Переносим на боевой сервер, обучаем сотрудников, передаём доступы, код и документацию.', ['исходники', 'инструкция', 'доступы'], 'принять работу'],
    ['Гарантия и развитие', '+30 дней', 'Месяц бесплатно чиним всё, что сломалось. Дальше — поддержка от 5 000 ₽ в месяц или доработки по запросу.', ['мониторинг', 'чат поддержки'], 'пользоваться и богатеть'],
  ];
  const body = `<div class="w">
<header>${logo()}<a class="btn" href="${TG}">Начать с шага 1</a></header>
<section class="hero"><span class="k rv">Финес Студио · как мы работаем</span><h1 class="rv d1">Тонкая работа — это когда каждый шаг понятен заранее.</h1><p class="rv d2">Пролистайте путь вашего проекта: от первого сообщения до запуска бота, CRM или веб-сервиса. Без тишины и сюрпризов.</p><div class="sum rv d3"><span>7 шагов</span><span>2–8 недель</span><span>демо каждую неделю</span><span>30 дней гарантии</span></div></section>
<section class="tl" id="tl"><div class="prog" id="prog"></div>${T.map((t, i) => `<div class="it"><div class="dot">${i + 1}</div><div class="card rv"><h3>${t[0]}</h3><p>${t[2]}</p><div class="art">${t[3].map(a => `<span>📎 ${a}</span>`).join('')}</div><div class="you">От вас: <b>${t[4]}</b></div></div><div class="when">${t[1]}</div></div>`).join('')}</section>
<section class="sec"><h2 class="rv">Что можно провести по этому пути</h2><div class="svc">${C.services.map((s, i) => `<div class="rv d${i}"><h3>${s.t}</h3><p>${s.s}</p><div class="d">${s.d} · ${s.p}</div></div>`).join('')}</div></section>
<section class="sec"><h2 class="rv">Проекты, которые прошли путь до конца</h2><div class="cases">${C.cases.slice(0, 3).map((c, i) => `<div class="rv d${i}"><div class="m">${c.m}</div><b>${c.ml}</b><div class="t">${c.c} · ${c.tag}</div><p>${c.r}</p></div>`).join('')}</div></section>
<section class="sec faq"><h2 class="rv">Вопросы по процессу</h2>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</section>
<section class="end"><h2 class="rv">Шаг 1 занимает две минуты.</h2><a class="btn rv d1" style="font-size:18px;padding:18px 30px" href="${TG}">Написать ${TGH}</a></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div>`;
  const js = `const tl=document.getElementById('tl'),pg=document.getElementById('prog'),its=[...document.querySelectorAll('.it')];function up(){const r=tl.getBoundingClientRect();const h=Math.max(0,Math.min(r.height,innerHeight*.6-r.top));pg.style.height=h+'px';its.forEach(i=>i.classList.toggle('in',i.getBoundingClientRect().top<innerHeight*.6))}addEventListener('scroll',up,{passive:true});up();`;
  return page({ n: 13, title: this.title, fonts: ['Manrope'], css, body, js });
} });

// 14 — Горизонтальный скролл
L.push({ n: 14, title: 'Горизонтальные главы', idea: 'Секции листаются вбок как слайды (на мобильном — свайпом), каждая глава на весь экран; ощущение презентации для инвестора или партнёра', build() {
  const css = `
html,body{height:100%}
body{font-family:'Unbounded',sans-serif;background:#141210;color:#f3eee6;overflow:hidden}
header{position:fixed;top:0;left:0;right:0;z-index:20;display:flex;justify-content:space-between;align-items:center;padding:22px 4vw}
header .flogo{color:#f3eee6}
.nav{display:flex;gap:6px}
.nav button{width:34px;height:6px;border-radius:6px;background:rgba(255,255,255,.2);transition:.3s}
.nav button.on{background:#f2501c;width:60px}
.track{display:flex;height:100vh;height:100dvh;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;scrollbar-width:none}
.track::-webkit-scrollbar{display:none}
.panel{flex:0 0 100vw;width:100vw;height:100%;scroll-snap-align:start;padding:110px 6vw 80px;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden}
.panel .ch{font-family:'Onest';font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:#a49b8c;margin-bottom:22px}
.panel .ch b{color:#f2501c}
.panel h2,.panel h1{font-size:clamp(34px,5.6vw,92px);line-height:.98;letter-spacing:-.05em;font-weight:800;max-width:1200px}
.p1{background:#141210}.p1 h1 span{color:#f2501c}
.p1 p{font-family:'Onest';font-size:20px;color:#bfb6a7;max-width:560px;margin-top:28px;line-height:1.5}
.p1 .big{position:absolute;right:-12vw;bottom:-16vw;width:44vw;max-width:640px;opacity:.95}
.p1 .big circle{mix-blend-mode:screen}
.hint{font-family:'Onest';font-size:14px;color:#a49b8c;margin-top:40px;display:flex;align-items:center;gap:10px}
.hint i{display:inline-block;width:40px;height:2px;background:#f2501c;animation:hn 1.6s ease-in-out infinite}
@keyframes hn{50%{transform:translateX(10px)}}
.p2{background:#f3eee6;color:#141210}
.p2 .ch{color:#8a8274}
.row{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;margin-top:40px;font-family:'Onest'}
.row>div{border-top:2px solid currentColor;padding-top:16px}
.row h3{font-family:'Unbounded';font-size:18px;letter-spacing:-.03em;margin-bottom:10px}
.row p{font-size:14px;line-height:1.5;opacity:.75}
.row b{display:block;margin-top:12px;font-size:14px;color:#f2501c}
.p3{background:#f2501c;color:#141210}
.p3 .ch{color:#5c1a05}.p3 .ch b{color:#fff}
.cs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:40px}
.cs>div{background:#141210;color:#f3eee6;border-radius:22px;padding:26px}
.cs .m{font-size:clamp(34px,3.6vw,56px);font-weight:800;letter-spacing:-.05em;color:#ffc21a}
.cs p{font-family:'Onest';font-size:14px;color:#bfb6a7;margin-top:10px;line-height:1.45}
.cs h3{font-family:'Onest';font-size:16px;margin-top:10px}
.p4{background:#141210}
.p4 .row>div{border-color:#3a342c}
.p4 .row h3{color:#ffc21a}
.p5{background:#ffc21a;color:#141210}.p5 .ch{color:#6a4f00}.p5 .ch b{color:#141210}
.pr{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:40px;font-family:'Onest'}
.pr>div{background:#fff8e1;border-radius:22px;padding:28px}
.pr .hot{background:#141210;color:#f3eee6}
.pr .p{font-family:'Unbounded';font-size:clamp(24px,2.4vw,36px);font-weight:800;letter-spacing:-.04em;margin:10px 0 14px}
.pr li{list-style:none;font-size:14px;padding:4px 0}
.p6{background:#141210}
.p6 h2 span{color:#f2501c}
.p6 a.cta{display:inline-block;margin-top:40px;background:#f2501c;color:#fff;font-family:'Onest';font-weight:700;font-size:20px;padding:20px 32px;border-radius:99px;transition:.2s;align-self:flex-start}
.p6 a.cta:hover{background:#ffc21a;color:#141210}
.p6 .f{font-family:'Onest';font-size:13px;color:#6f675b;position:absolute;bottom:30px;left:6vw}
.arrows{position:fixed;right:4vw;bottom:28px;z-index:20;display:flex;gap:8px}
.arrows button{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.12);color:#fff;font-size:20px;backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);transition:.2s}
.arrows button:hover{background:#f2501c}
@media(max-width:900px){body{overflow:auto}html,body{height:auto}.track{height:auto;flex-direction:column;overflow:visible;scroll-snap-type:none}.panel{flex:none;width:100%;min-height:100vh;padding:100px 22px 60px;height:auto}.row,.cs,.pr{grid-template-columns:minmax(0,1fr)}.nav,.arrows,.hint{display:none}header{position:absolute}.p1 .big{width:80vw}}`;
  const body = `<header>${logo(true)}<div class="nav" id="nav">${[0, 1, 2, 3, 4, 5].map(i => `<button aria-label="глава ${i + 1}"${i === 0 ? ' class="on"' : ''}></button>`).join('')}</div></header>
<main class="track" id="tr">
<section class="panel p1"><div class="ch"><b>01</b> / 06 · Финес Студио</div><h1>Тонкая <span>работа</span><br>для вашего бизнеса.</h1><p>Студия разработки: Telegram-боты, CRM, веб-сервисы и интеграции. Листайте вправо — шесть глав о том, как мы можем помочь.</p><div class="hint"><i></i>листайте → или колесом мыши</div><svg class="big" viewBox="0 0 20 20"><g style="transform-origin:10px 10px;animation:fspin 20s linear infinite"><circle cx="7" cy="10" r="6" fill="#f2501c"/><circle cx="13" cy="10" r="6" fill="#ffc21a"/></g></svg></section>
<section class="panel p2"><div class="ch"><b>02</b> / 06 · Услуги</div><h2>Пять способов убрать рутину.</h2><div class="row">${C.services.map(s => `<div><h3>${s.t}</h3><p>${s.s}</p><b>${s.p}</b></div>`).join('')}</div></section>
<section class="panel p3"><div class="ch"><b>03</b> / 06 · Кейсы</div><h2>Цифры наших клиентов.</h2><div class="cs">${C.cases.slice(0, 3).map(c => `<div><div class="m">${c.m}</div><h3>${c.ml}</h3><p>${c.c} — ${c.t.toLowerCase()}. ${c.r}</p></div>`).join('')}</div></section>
<section class="panel p4"><div class="ch"><b>04</b> / 06 · Процесс</div><h2>Пять шагов. Демо каждую неделю.</h2><div class="row">${C.steps.map((s, i) => `<div><h3>${i + 1}. ${s.t}</h3><p>${s.s}</p><b>${s.d}</b></div>`).join('')}</div></section>
<section class="panel p5"><div class="ch"><b>05</b> / 06 · Цены</div><h2>Цена — до старта, в договоре.</h2><div class="pr">${C.plans.map(p => `<div class="${p.hot ? 'hot' : ''}"><b>${p.t}</b> · ${p.for}<div class="p">${p.p}</div><ul>${p.f.map(f => `<li>— ${f}</li>`).join('')}</ul></div>`).join('')}</div></section>
<section class="panel p6"><div class="ch"><b>06</b> / 06 · Контакт</div><h2>Расскажите задачу —<br><span>ответим за 15 минут.</span></h2><a class="cta" href="${TG}">${TGH} →</a><div class="f">© 2026 Финес Студио · ${C.slogan}</div></section>
</main>
<div class="arrows"><button id="pv" aria-label="назад">←</button><button id="nx" aria-label="вперёд">→</button></div>`;
  const js = `const tr=document.getElementById('tr'),nb=[...document.querySelectorAll('#nav button')];const go=i=>tr.scrollTo({left:i*innerWidth,behavior:'smooth'});const cur=()=>Math.round(tr.scrollLeft/innerWidth);
tr.addEventListener('wheel',e=>{if(innerWidth<=900)return;if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){e.preventDefault();tr.scrollLeft+=e.deltaY}},{passive:false});
tr.addEventListener('scroll',()=>{const c=cur();nb.forEach((b,i)=>b.classList.toggle('on',i===c))},{passive:true});
nb.forEach((b,i)=>b.onclick=()=>go(i));document.getElementById('nx').onclick=()=>go(Math.min(5,cur()+1));document.getElementById('pv').onclick=()=>go(Math.max(0,cur()-1));
addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(Math.min(5,cur()+1));if(e.key==='ArrowLeft')go(Math.max(0,cur()-1))});`;
  return page({ n: 14, title: this.title, fonts: ['Unbounded'], css, body, js });
} });

// 15 — Сплит-экран
L.push({ n: 15, title: 'Сплит-экран', idea: 'Экран разделён пополам: слева закреплён заголовок раздела, справа прокручивается содержание; спокойная двухколоночная подача для B2B', build() {
  const css = `
body{font-family:'Jost',sans-serif;background:#fff;color:#191714;font-size:17px}
.split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);min-height:100vh}
.l{position:sticky;top:0;height:100vh;background:#191714;color:#f5f0e8;padding:40px 4vw;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}
.l .flogo{color:#f5f0e8;--lg:36px}
.l h1{font-size:clamp(40px,5vw,82px);line-height:.98;font-weight:600;letter-spacing:-.03em}
.l h1 span{color:#f2501c}
.l .ttl{font-size:14px;letter-spacing:.2em;text-transform:uppercase;color:#a39a8a;margin-bottom:18px;transition:opacity .3s}
.l .bt{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;font-size:15px;color:#a39a8a;flex-wrap:wrap}
.l .bt a{background:#f2501c;color:#fff;padding:16px 24px;border-radius:99px;font-weight:600;transition:.2s}
.l .bt a:hover{background:#ffc21a;color:#191714}
.l .bg{position:absolute;right:-20%;top:20%;width:80%;opacity:.12}
.r{padding:0 5vw}
.blk{min-height:100vh;padding:110px 0 80px;border-bottom:1px solid #e9e4da;display:flex;flex-direction:column;justify-content:center}
.blk .k{font-size:14px;letter-spacing:.2em;text-transform:uppercase;color:#f2501c;margin-bottom:22px}
.blk h2{font-size:clamp(30px,3.2vw,46px);font-weight:500;letter-spacing:-.02em;line-height:1.1;margin-bottom:30px}
.lead{font-size:22px;line-height:1.5;color:#4b463d}
.svc li{list-style:none;padding:22px 0;border-top:1px solid #e9e4da;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px 20px}
.svc b{font-size:22px;font-weight:600}.svc span{font-weight:600;color:#f2501c;white-space:nowrap}.svc p{grid-column:1/-1;color:#6b6457;font-size:16px}
.case{padding:24px 0;border-top:1px solid #e9e4da;display:grid;grid-template-columns:150px minmax(0,1fr);gap:24px}
.case .m{font-size:40px;font-weight:600;letter-spacing:-.03em;color:#f2501c;line-height:1}
.case h3{font-size:20px;font-weight:600}.case .c{font-size:14px;color:#8d8576}.case p{color:#6b6457;font-size:15.5px;margin-top:6px}
.st{display:grid;grid-template-columns:48px minmax(0,1fr);gap:18px;padding:18px 0;border-top:1px solid #e9e4da}
.st i{font-style:normal;width:48px;height:48px;border-radius:50%;border:1.5px solid #191714;display:grid;place-items:center;font-weight:600}
.st h3{font-size:19px;font-weight:600}.st p{color:#6b6457;font-size:15.5px}
.pl{display:grid;gap:12px}
.pl>div{border:1px solid #e9e4da;border-radius:18px;padding:22px 24px;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 16px;align-items:baseline}
.pl .hot{background:#191714;color:#f5f0e8;border-color:#191714}
.pl b{font-size:20px}.pl .p{font-size:24px;font-weight:600;color:#f2501c;white-space:nowrap}
.pl small{grid-column:1/-1;font-size:14.5px;opacity:.7}
.rv2 q{display:block;font-size:24px;line-height:1.4;quotes:'«' '»';margin-bottom:16px}
.rv2>div{padding:24px 0;border-top:1px solid #e9e4da}
.rv2 span{font-size:14px;color:#8d8576}
.faq details{border-top:1px solid #e9e4da;padding:18px 0}.faq summary{font-size:19px;font-weight:600;cursor:pointer}.faq p{margin-top:8px;color:#6b6457}
.mob{display:none}
@media(max-width:900px){.split{grid-template-columns:minmax(0,1fr)}.l{position:relative;height:auto;min-height:88vh;gap:40px}.blk{min-height:0;padding:64px 0}.case{grid-template-columns:minmax(0,1fr);gap:8px}.l .ttl{display:none}}`;
  const secs = [
    ['О студии', 'Небольшая команда, которая доводит дело до конца.', `<p class="lead">Мы — Финес Студио. Делаем Telegram-ботов, CRM-системы, веб-сервисы и интеграции для малого и среднего бизнеса. Не берём больше проектов, чем можем сделать хорошо: в работе одновременно не больше шести.</p>`],
    ['Услуги', 'Пять направлений, одна ответственность.', `<ul class="svc">${C.services.map(s => `<li><b>${s.t}</b><span>${s.p}</span><p>${s.s}</p></li>`).join('')}</ul>`],
    ['Кейсы', 'Что изменилось у клиентов.', C.cases.slice(0, 5).map(c => `<div class="case"><div class="m">${c.m}</div><div><h3>${c.t}</h3><div class="c">${c.c} · ${c.ml}</div><p>${c.r}</p></div></div>`).join('')],
    ['Процесс', 'Пять шагов без тишины.', C.steps.map((s, i) => `<div class="st"><i>${i + 1}</i><div><h3>${s.t} <span style="color:#8d8576;font-weight:400;font-size:15px">· ${s.d}</span></h3><p>${s.s}</p></div></div>`).join('')],
    ['Стоимость', 'Фиксируем в договоре.', `<div class="pl">${C.plans.map(p => `<div class="${p.hot ? 'hot' : ''}"><b>${p.t} — ${p.for}</b><span class="p">${p.p}</span><small>${p.f.join(' · ')}</small></div>`).join('')}</div>`],
    ['Отзывы', 'Говорят клиенты.', `<div class="rv2">${C.reviews.map(r => `<div><q>${r.q}</q><span>${r.n}, ${r.r}</span></div>`).join('')}</div>`],
    ['Вопросы', 'Коротко о важном.', `<div class="faq">${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div>`],
  ];
  const body = `<div class="split"><aside class="l"><svg class="bg" viewBox="0 0 20 20"><g style="transform-origin:10px 10px;animation:fspin 30s linear infinite"><circle cx="7" cy="10" r="6" fill="#f2501c"/><circle cx="13" cy="10" r="6" fill="#ffc21a"/></g></svg>${logo(true)}<div><div class="ttl" id="ttl">О студии</div><h1>Тонкая <span>работа</span> для вашего бизнеса.</h1></div><div class="bt"><span>Боты · CRM · веб-сервисы<br>Ответ за 15 минут</span><a href="${TG}">${TGH}</a></div></aside>
<main class="r">${secs.map(s => `<section class="blk" data-t="${s[0]}"><div class="k rv">${s[0]}</div><h2 class="rv">${s[1]}</h2><div class="rv d1">${s[2]}</div></section>`).join('')}
<section class="blk" data-t="Контакт"><div class="k">Контакт</div><h2>Напишите нам в Telegram — начнём с бесплатного разбора.</h2><p><a href="${TG}" style="font-size:28px;font-weight:600;color:#f2501c;border-bottom:2px solid">${TGH}</a></p><p style="margin-top:40px;color:#8d8576;font-size:14px">© 2026 Финес Студио</p></section></main></div>`;
  const js = `const tt=document.getElementById('ttl');const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){tt.style.opacity=0;setTimeout(()=>{tt.textContent=e.target.dataset.t;tt.style.opacity=1},200)}}),{threshold:.5});document.querySelectorAll('.blk').forEach(b=>io2.observe(b));`;
  return page({ n: 15, title: this.title, fonts: ['Jost'], css, body, js });
} });

export default L;
