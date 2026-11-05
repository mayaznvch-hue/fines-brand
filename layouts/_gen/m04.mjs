import { page, logo, C, TG, TGH, dot } from './core.mjs';
const L = [];

// 16 — Сайт-резюме студии
L.push({ n: 16, title: 'Резюме студии', idea: 'Главная оформлена как аккуратное CV: опыт, навыки, проекты, рекомендации — понятно тем, кто «нанимает» подрядчика как сотрудника', build() {
  const css = `
body{font-family:'IBM Plex Sans',sans-serif;background:#e9e6df;color:#1f1d1a;padding:40px 20px}
.sheet{max-width:1080px;margin:0 auto;background:#fffefb;box-shadow:0 30px 80px -40px rgba(0,0,0,.35);display:grid;grid-template-columns:320px minmax(0,1fr)}
aside{background:#1f1d1a;color:#ece7dd;padding:44px 34px}
aside .flogo{color:#ece7dd;--lg:42px}
aside h4{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#f2501c;margin:36px 0 14px}
aside li{list-style:none;font-size:14.5px;padding:5px 0;color:#cfc8ba}
aside .bar{height:5px;background:#3a3631;border-radius:5px;margin:6px 0 10px;overflow:hidden}
aside .bar i{display:block;height:100%;background:linear-gradient(90deg,#f2501c,#ffc21a);border-radius:5px;transform-origin:left;animation:gr 1.4s cubic-bezier(.2,.7,.2,1) both}
@keyframes gr{from{transform:scaleX(0)}}
aside .ct a{display:block;font-size:15px;padding:4px 0;color:#fff}aside .ct a:hover{color:#ffc21a}
aside .tag{display:inline-block;border:1px solid #4a453e;border-radius:4px;padding:3px 8px;font-size:12.5px;margin:0 4px 6px 0;color:#cfc8ba}
main{padding:44px 48px}
.top{border-bottom:2px solid #1f1d1a;padding-bottom:26px;margin-bottom:10px}
.top .pos{font-family:'IBM Plex Mono';font-size:13px;color:#f2501c;letter-spacing:.06em}
.top h1{font-family:'Lora',serif;font-size:clamp(34px,4.4vw,54px);line-height:1.05;margin:10px 0 14px;font-weight:700}
.top p{font-size:17px;color:#4c4840;line-height:1.55;max-width:600px}
.top .row{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap}
.btn{background:#f2501c;color:#fff;padding:12px 20px;font-weight:600;font-size:15px;border-radius:4px;transition:.2s}
.btn:hover{background:#1f1d1a}
.btn.o{background:none;border:1px solid #1f1d1a;color:#1f1d1a}
section h2{font-family:'IBM Plex Mono';font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#8a8478;margin:34px 0 16px;display:flex;align-items:center;gap:12px}
section h2::after{content:'';flex:1;height:1px;background:#ddd7cb}
.job{display:grid;grid-template-columns:130px minmax(0,1fr);gap:20px;padding:14px 0}
.job .d{font-family:'IBM Plex Mono';font-size:13px;color:#8a8478;padding-top:3px}
.job h3{font-size:18px;font-weight:600}.job h3 span{color:#f2501c}
.job .c{font-size:14px;color:#8a8478;margin:2px 0 6px}
.job p{font-size:15px;color:#4c4840;line-height:1.5}
.job ul{margin-top:6px}.job li{list-style:none;font-size:14.5px;color:#4c4840;padding:2px 0}.job li::before{content:'— ';color:#f2501c}
.sk{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.sk>div{border:1px solid #e6e0d4;padding:16px;border-radius:6px}
.sk b{display:block;font-size:16px;margin-bottom:4px}.sk p{font-size:14px;color:#4c4840}.sk small{display:block;margin-top:8px;font-family:'IBM Plex Mono';font-size:12.5px;color:#f2501c}
.ref{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.ref>div{background:#f6f3ec;padding:16px;border-radius:6px;font-size:14px}
.ref q{display:block;font-family:'Lora';font-style:italic;font-size:15px;line-height:1.45;margin-bottom:10px;quotes:'«' '»'}
.ref b{display:block;font-size:13.5px}.ref span{font-size:12.5px;color:#8a8478}
.cond{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.cond>div{border-top:3px solid #1f1d1a;padding-top:12px}
.cond .hot{border-color:#f2501c}
.cond b{font-size:16px}.cond .p{font-family:'Lora';font-size:24px;font-weight:700;margin:4px 0}.cond small{font-size:13.5px;color:#4c4840}
.faq details{padding:10px 0;border-bottom:1px solid #eee8dc}.faq summary{font-weight:600;cursor:pointer;font-size:15.5px}.faq p{font-size:14.5px;color:#4c4840;margin-top:6px}
.sig{margin-top:36px;padding-top:20px;border-top:2px solid #1f1d1a;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px}
.sig .s{font-family:'Caveat',cursive;font-size:40px;color:#f2501c;line-height:1}
@media(max-width:900px){body{padding:0}.sheet{grid-template-columns:minmax(0,1fr)}main{padding:30px 22px}aside{padding:32px 22px}.job{grid-template-columns:minmax(0,1fr);gap:2px}.sk,.ref,.cond{grid-template-columns:minmax(0,1fr)}}`;
  const sk = [['Python / aiogram', 95], ['Node.js / TypeScript', 88], ['React / Vue', 82], ['PostgreSQL', 90], ['1С, amoCRM, Битрикс24', 85], ['UX интерфейсов', 80]];
  const body = `<div class="sheet"><aside>${logo(true)}
<h4>Контакты</h4><div class="ct"><a href="${TG}">✈ ${TGH}</a><a href="${TG}">t.me/fines_studio</a><span style="font-size:14px;color:#a39d90">Работаем удалённо по всей России</span></div>
<h4>Навыки</h4>${sk.map(s => `<li>${s[0]}</li><div class="bar"><i style="width:${s[1]}%"></i></div>`).join('')}
<h4>Стек</h4><div>${C.stack.map(s => `<span class="tag">${s}</span>`).join('')}</div>
<h4>Команда</h4>${C.team.map(t => `<li><b style="color:#fff">${t.n}</b> — ${t.r}</li>`).join('')}</aside>
<main><section class="top"><div class="pos">ИЩЕМ: интересные задачи · ЗАНЯТОСТЬ: полная, на ваш проект</div><h1>Финес Студио — тонкая работа для вашего бизнеса.</h1><p>Студия разработки с опытом более 60 проектов. Делаем Telegram-ботов, CRM-системы, веб-сервисы и интеграции для малого бизнеса. Ответственные, пунктуальные, без вредных привычек вроде срыва сроков.</p><div class="row"><a class="btn" href="${TG}">Пригласить на собеседование</a><a class="btn o" href="#exp">Посмотреть опыт</a></div></section>
<section id="exp"><h2>Опыт работы</h2>${C.cases.slice(0, 5).map((c, i) => `<div class="job rv"><div class="d">${['2026', '2025', '2025', '2024', '2024'][i]} · ${['3 нед', '2 нед', '7 нед', '5 нед', '4 нед'][i]}</div><div><h3>${c.t} <span>· ${c.m}</span></h3><div class="c">${c.c} · ${c.tag}</div><p>${c.r}</p><ul><li>${c.ml}</li></ul></div></div>`).join('')}</section>
<section><h2>Ключевые компетенции</h2><div class="sk">${C.services.slice(0, 4).map(s => `<div class="rv"><b>${s.t}</b><p>${s.s}</p><small>${s.p} · ${s.d}</small></div>`).join('')}</div></section>
<section><h2>Рекомендации</h2><div class="ref">${C.reviews.map(r => `<div class="rv"><q>${r.q}</q><b>${r.n}</b><span>${r.r}</span></div>`).join('')}</div></section>
<section><h2>Ожидания по оплате</h2><div class="cond">${C.plans.map(p => `<div class="rv${p.hot ? ' hot' : ''}"><b>${p.t}</b><div class="p">${p.p}</div><small>${p.for}. ${p.f.slice(0, 2).join(', ')}.</small></div>`).join('')}</div></section>
<section class="faq"><h2>Вопросы на собеседовании</h2>${C.faq.slice(0, 5).map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</section>
<div class="sig"><div><div style="font-size:14px;color:#8a8478">Готовы приступить с понедельника</div><div class="s">Финес Студио</div></div><a class="btn" href="${TG}">Написать ${TGH}</a></div></main></div>`;
  return page({ n: 16, title: this.title, fonts: ['IBM Plex Sans', 'IBM Plex Mono', 'Lora', 'Caveat'], css, body });
} });

// 17 — Стиль Telegram
L.push({ n: 17, title: 'Telegram Web', idea: 'Сайт выглядит как Telegram: список чатов слева, лента постов-разделов, реакции, опрос и кнопки; родная среда для клиентов, которые заказывают ботов', build() {
  const css = `
body{font-family:'Inter Tight',sans-serif;background:#a8c8b8;color:#0f1419;height:100vh;overflow:hidden}
.app{display:grid;grid-template-columns:340px minmax(0,1fr);height:100vh;max-width:1400px;margin:0 auto;background:#fff;box-shadow:0 0 60px rgba(0,0,0,.15)}
.side{border-right:1px solid #e4e4e4;display:flex;flex-direction:column;min-height:0}
.sh{padding:14px 16px;display:flex;align-items:center;gap:14px;border-bottom:1px solid #eee}
.sh .flogo{--lg:26px}
.sh .srch{flex:1;background:#f1f1f4;border-radius:22px;padding:9px 14px;font-size:14px;color:#888}
.chats{overflow:auto;flex:1}
.ch{display:flex;gap:12px;padding:10px 12px;margin:2px 6px;border-radius:12px;cursor:pointer;transition:background .15s;align-items:center}
.ch:hover{background:#f4f4f5}
.ch.on{background:#3390ec;color:#fff}.ch.on .t,.ch.on .tm{color:#e6f1ff}
.av{width:50px;height:50px;border-radius:50%;display:grid;place-items:center;font-weight:700;color:#fff;flex:none;font-size:17px}
.ch .n{font-weight:600;font-size:15px;display:flex;justify-content:space-between;gap:6px}
.ch .t{font-size:14px;color:#707579;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ch .tm{font-size:12px;color:#999;font-weight:400}
.ch>div:last-child{min-width:0;flex:1}
.bdg{background:#3390ec;color:#fff;border-radius:10px;font-size:12px;padding:1px 7px;font-weight:600}
.ch.on .bdg{background:#fff;color:#3390ec}
.main{display:flex;flex-direction:column;min-height:0;background:linear-gradient(135deg,#c5dfb5,#99c4cf 50%,#d8d3a0)}
.mh{background:#fff;padding:10px 18px;display:flex;align-items:center;gap:12px;border-bottom:1px solid #e4e4e4}
.mh b{display:block;font-size:16px}.mh span{font-size:13px;color:#707579}
.mh a{margin-left:auto;background:#3390ec;color:#fff;padding:9px 18px;border-radius:20px;font-weight:600;font-size:14px}
.feed{flex:1;overflow:auto;padding:20px 20px 30px;display:flex;flex-direction:column;gap:14px;align-items:center}
.feed>*{flex:none}
.date{background:rgba(0,0,0,.2);color:#fff;font-size:13px;font-weight:600;padding:4px 12px;border-radius:14px}
.post{background:#fff;border-radius:16px 16px 16px 4px;max-width:620px;width:100%;box-shadow:0 1px 2px rgba(0,0,0,.12);overflow:hidden}
.post .pc{padding:12px 14px 8px}
.post .from{color:#f2501c;font-weight:600;font-size:14px;margin-bottom:4px}
.post h2{font-size:22px;letter-spacing:-.02em;line-height:1.15;margin-bottom:8px}
.post h1{font-size:34px;letter-spacing:-.03em;line-height:1.05;margin-bottom:10px}
.post p{font-size:15px;line-height:1.45;margin-bottom:8px}
.post .meta{display:flex;justify-content:flex-end;gap:8px;font-size:12px;color:#999;padding:0 14px 8px}
.post .img{height:220px;background:linear-gradient(135deg,#f2501c,#ffc21a);display:grid;place-items:center}
.post .img .flogo{--lg:74px;color:#1a1410}
.reac{display:flex;gap:6px;flex-wrap:wrap;padding:0 14px 10px}
.reac span{background:#e8f2fd;color:#3390ec;border-radius:14px;padding:3px 10px;font-size:13px;font-weight:600;cursor:pointer}
.kbd{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px;max-width:620px;width:100%}
.kbd a{background:rgba(255,255,255,.6);backdrop-filter:blur(6px);color:#0f1419;text-align:center;padding:11px;border-radius:10px;font-size:14px;font-weight:600;transition:.15s}
.kbd a:hover{background:rgba(255,255,255,.9)}
.post ul{margin:4px 0 8px}.post li{list-style:none;font-size:15px;padding:3px 0}
.post .mx{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:6px 0 8px}
.post .mx div{background:#f4f4f5;border-radius:10px;padding:10px}
.post .mx b{display:block;font-size:22px;color:#f2501c;letter-spacing:-.02em}.post .mx span{font-size:12.5px;color:#555}
.poll div{margin:6px 0}.poll .lb{display:flex;justify-content:space-between;font-size:14px;font-weight:500}
.poll .br{height:6px;border-radius:4px;background:#e8f2fd;margin-top:4px;overflow:hidden}.poll .br i{display:block;height:100%;background:#3390ec}
.inp{background:#fff;padding:10px 16px;display:flex;gap:10px;align-items:center;border-top:1px solid #e4e4e4}
.inp div{flex:1;background:#f1f1f4;border-radius:22px;padding:11px 16px;color:#888;font-size:14px}
.inp a{width:44px;height:44px;border-radius:50%;background:#3390ec;color:#fff;display:grid;place-items:center;font-size:18px}
@media(max-width:860px){body{height:auto;overflow:auto}.app{grid-template-columns:minmax(0,1fr);height:auto}.side{display:none}.main{min-height:100vh}.feed{overflow:visible;padding:14px 10px}.mh{position:sticky;top:0;z-index:5}.post h1{font-size:28px}.post .mx{grid-template-columns:minmax(0,1fr)}}`;
  const chats = [['Финес Студио', 'Тонкая работа для вашего бизнеса', '#f2501c', 'ФС', '12:04', 3], ['Бот «Зерно» ☕', 'Заказ №1842 оплачен', '#8b5a2b', 'З', '11:58', 0], ['CRM «СтройДвор»', 'Счёт собран за 2 клика', '#2c7a5b', 'С', '11:40', 0], ['Студия «Лак» 💅', 'Напоминание: завтра 14:30', '#c2185b', 'Л', '10:12', 0], ['Гараж 24', 'Статус: покраска завершена', '#3a5bd9', 'Г', 'вчера', 0], ['Speak Up', 'Новая заявка из квиза', '#7b1fa2', 'S', 'вчера', 0], ['Грядка 🥕', 'Остатки обновлены', '#689f38', 'Г', 'пн', 0]];
  const body = `<div class="app"><aside class="side"><div class="sh">${logo()}<div class="srch">Поиск</div></div><div class="chats">${chats.map((c, i) => `<div class="ch${i === 0 ? ' on' : ''}"><div class="av" style="background:${c[2]}">${c[3]}</div><div><div class="n"><span>${c[0]}</span><span class="tm">${c[4]}</span></div><div class="n" style="font-weight:400"><span class="t">${c[1]}</span>${c[5] ? `<span class="bdg">${c[5]}</span>` : ''}</div></div></div>`).join('')}</div></aside>
<main class="main"><div class="mh"><div class="av" style="background:#f2501c;width:42px;height:42px">ФС</div><div><b>Финес Студио</b><span>канал студии · 2 418 подписчиков</span></div><a href="${TG}">Написать</a></div>
<div class="feed">
<div class="date">Закреплённое</div>
<section class="post rv"><div class="img">${logo()}</div><div class="pc"><div class="from">Финес Студио</div><h1>Тонкая работа для вашего бизнеса.</h1><p>Привет! Мы делаем Telegram-ботов, CRM-системы, веб-сервисы и интеграции для малого бизнеса. Этот сайт — тоже чат, потому что мы любим мессенджеры 🙂</p></div><div class="reac"><span>🔥 214</span><span>👍 160</span><span>❤️ 88</span></div><div class="meta">👁 12,4K · 09:00</div></section>
<div class="kbd"><a href="#svc">🤖 Услуги</a><a href="#cs">📈 Кейсы</a><a href="#pr">💰 Цены</a><a href="${TG}">✍️ Написать</a></div>
<div class="date">Услуги</div>
<section class="post rv" id="svc"><div class="pc"><div class="from">Финес Студио</div><h2>Что мы делаем</h2><ul>${C.services.map(s => `<li><b>${s.t}</b> — <i style="color:#707579">${s.p}, ${s.d}</i></li>`).join('')}</ul></div><div class="reac"><span>👍 96</span><span>🤝 41</span></div><div class="meta">👁 8,1K · 10:15</div></section>
<div class="date">Кейсы</div>
<section class="post rv" id="cs"><div class="pc"><div class="from">Финес Студио</div><h2>Результаты клиентов в цифрах 📈</h2><div class="mx">${C.cases.slice(0, 6).map(c => `<div><b>${c.m}</b><span>${c.ml} · ${c.c}</span></div>`).join('')}</div><p>Подробно про каждый проект расскажем в личке.</p></div><div class="reac"><span>🔥 132</span><span>🤯 54</span></div><div class="meta">👁 9,7K · 11:30</div></section>
<section class="post rv"><div class="pc"><div class="from">Финес Студио · отзыв</div><p style="font-size:16px">«${C.reviews[0].q}»</p><p style="color:#707579;font-size:14px">— ${C.reviews[0].n}, ${C.reviews[0].r}</p></div><div class="meta">👁 6,2K · 12:00</div></section>
<div class="date">Как работаем</div>
<section class="post rv"><div class="pc"><div class="from">Финес Студио</div><h2>5 шагов до запуска</h2><ul>${C.steps.map((s, i) => `<li>${i + 1}. <b>${s.t}</b> — ${s.s} <i style="color:#707579">(${s.d})</i></li>`).join('')}</ul></div><div class="meta">👁 7,3K · 13:20</div></section>
<div class="date">Цены</div>
<section class="post rv" id="pr"><div class="pc"><div class="from">Финес Студио</div><h2>Опрос: что вам нужно?</h2><div class="poll">${[['Бот — от 40 000 ₽', 46], ['CRM — от 120 000 ₽', 27], ['Сайт — от 60 000 ₽', 17], ['Интеграция — от 25 000 ₽', 10]].map(p => `<div><div class="lb"><span>${p[0]}</span><span>${p[1]}%</span></div><div class="br"><i style="width:${p[1]}%"></i></div></div>`).join('')}</div><p style="color:#707579;font-size:13px;margin-top:8px">1 204 голоса · цена фиксируется в договоре</p></div><div class="meta">👁 5,9K · 14:45</div></section>
<div class="date">Вопросы</div>
<section class="post rv"><div class="pc"><div class="from">Финес Студио</div><h2>FAQ</h2>${C.faq.slice(0, 4).map(f => `<p><b>${f.q}</b><br>${f.a}</p>`).join('')}</div><div class="meta">👁 4,8K · 15:10</div></section>
<div class="kbd"><a href="${TG}" style="grid-column:1/-1;background:#3390ec;color:#fff">✈️ Написать в ${TGH}</a></div>
</div><div class="inp"><div>Напишите сообщение…</div><a href="${TG}" aria-label="Отправить">➤</a></div></main></div>`;
  return page({ n: 17, title: this.title, fonts: ['Inter Tight'], css, body });
} });

// 18 — IDE
L.push({ n: 18, title: 'Редактор кода (IDE)', idea: 'Сайт как редактор кода: дерево файлов, вкладки, подсветка синтаксиса, мини-карта, статус-бар; разделы — файлы проекта, для техно-аудитории', build() {
  const css = `
body{font-family:'JetBrains Mono',monospace;background:#1e1e1e;color:#d4d4d4;font-size:14px;height:100vh;overflow:hidden}
.ide{display:grid;grid-template-columns:48px 250px minmax(0,1fr);grid-template-rows:40px minmax(0,1fr) 24px;height:100vh}
.tbar{grid-column:1/-1;background:#2d2d2d;display:flex;align-items:center;gap:14px;padding:0 14px;font-size:12.5px;color:#999;border-bottom:1px solid #1a1a1a}
.tbar .flogo{--lg:22px;color:#fff}.tbar .flogo .fs{display:none}
.tbar .mid{flex:1;text-align:center}
.tbar a{background:#f2501c;color:#fff;padding:4px 12px;border-radius:4px;font-weight:700}
.act{background:#252526;display:flex;flex-direction:column;align-items:center;padding-top:10px;gap:18px;color:#858585;font-size:18px}
.act span:first-child{color:#fff}
.tree{background:#252526;padding:10px 0;overflow:auto;font-size:13px}
.tree .h{font-size:11px;letter-spacing:.1em;color:#bbb;padding:4px 18px 8px}
.tree a{display:block;padding:3px 18px 3px 30px;color:#ccc;white-space:nowrap}
.tree a:hover{background:#2a2d2e}
.tree a.on{background:#37373d;color:#fff}
.tree .f{padding-left:18px;color:#ccc}
.tree i{font-style:normal;color:#e8ab53;margin-right:6px}
.tree i.ts{color:#4fc1ff}.tree i.md{color:#519aba}.tree i.js{color:#cbcb41}.tree i.y{color:#c586c0}
.ed{display:flex;flex-direction:column;min-width:0;min-height:0}
.tabs{display:flex;background:#252526;overflow:auto;scrollbar-width:none;flex:none}
.tabs a{padding:9px 16px;font-size:13px;color:#999;border-right:1px solid #1e1e1e;white-space:nowrap;background:#2d2d2d}
.tabs a.on{background:#1e1e1e;color:#fff;box-shadow:inset 0 1px #f2501c}
.code{flex:1;overflow:auto;display:grid;grid-template-columns:minmax(0,1fr) 90px;scroll-behavior:smooth}
.lines{padding:16px 0 80px;counter-reset:ln}
.ln{display:block;padding:0 24px 0 70px;position:relative;line-height:1.75;white-space:pre-wrap;word-break:break-word;min-height:1.75em}
.ln::before{counter-increment:ln;content:counter(ln);position:absolute;left:0;width:50px;text-align:right;color:#5a5a5a}
.ln:hover{background:#2a2a2a}
.k{color:#569cd6}.s{color:#ce9178}.c{color:#6a9955}.f{color:#dcdcaa}.p{color:#9cdcfe}.t{color:#4ec9b0}.o{color:#f2501c}
.big{font-family:'Onest';font-size:clamp(30px,3.8vw,54px);line-height:1.05;font-weight:800;color:#fff;letter-spacing:-.03em;display:block;padding:10px 0}
.big .o{color:#f2501c}
.cta{display:inline-block;background:#f2501c;color:#fff;padding:8px 16px;border-radius:4px;font-weight:700;margin:6px 0}
.cta:hover{background:#ffc21a;color:#1e1e1e}
.mini{border-left:1px solid #2a2a2a;padding:10px 8px}
.mini i{display:block;height:3px;margin:3px 0;background:#3a3a3a;border-radius:2px}
.mini i:nth-child(3n){background:#4a4a35;width:70%}.mini i:nth-child(4n){background:#5a3326;width:50%}.mini i:nth-child(5n){width:85%}
.stat{grid-column:1/-1;background:#f2501c;color:#fff;font-size:12px;display:flex;gap:18px;align-items:center;padding:0 12px 0 260px;white-space:nowrap;overflow:hidden}
.stat span:last-child{margin-left:auto}
@media(max-width:900px){.stat{padding-left:12px;height:24px}body{height:auto;overflow:auto}.ide{grid-template-columns:minmax(0,1fr);grid-template-rows:auto;height:auto}.act,.tree,.mini{display:none}.code{grid-template-columns:minmax(0,1fr);overflow:visible}.ln{padding:0 12px 0 40px;font-size:12.5px}.ln::before{width:30px}.tbar .mid{display:none}.tabs{position:sticky;top:0;z-index:5}.stat span:nth-child(3){display:none}}`;
  const sections = [
    ['README.md', 'md', 'readme', [
      `<span class="c"># Финес Студио</span>`,
      `<span class="big">Тонкая <span class="o">работа</span><br>для вашего бизнеса.</span>`,
      `<span class="c">&lt;!-- ${C.lead} --&gt;</span>`, ``,
      `<a class="cta" href="${TG}">▶ Run: написать ${TGH}</a>  <span class="c">// ответ за 15 минут</span>`]],
    ['services.ts', 'ts', 'svc', [
      `<span class="k">export const</span> <span class="p">services</span>: <span class="t">Service</span>[] = [`,
      ...C.services.map(s => `  { <span class="p">name</span>: <span class="s">'${s.t}'</span>, <span class="p">price</span>: <span class="s">'${s.p}'</span>, <span class="p">time</span>: <span class="s">'${s.d}'</span> },`),
      `];`]],
    ['cases.json', 'js', 'cases', [`[`,
      ...C.cases.map((c, i) => `  { <span class="p">"client"</span>: <span class="s">"${c.c.replace(/"/g, '')}"</span>, <span class="p">"result"</span>: <span class="o">"${c.m}"</span>, <span class="p">"metric"</span>: <span class="s">"${c.ml}"</span> }${i < 5 ? ',' : ''}`), `]`]],
    ['process.py', 'y', 'proc', [
      `<span class="k">async def</span> <span class="f">build_project</span>(<span class="p">client</span>):`,
      ...C.steps.map((s, i) => `    <span class="k">await</span> <span class="f">${['razbor', 'smeta', 'prototype', 'develop', 'launch'][i]}</span>(<span class="p">client</span>)  <span class="c"># ${s.t} — ${s.d}</span>`),
      `    <span class="k">return</span> <span class="s">"запущено, гарантия 30 дней"</span>`]],
    ['pricing.yml', 'y', 'price', C.plans.flatMap(p => [`<span class="t">${p.t.toLowerCase()}</span>:`, `  <span class="p">price</span>: <span class="o">${p.p}</span>`, `  <span class="p">for</span>: <span class="s">${p.for}</span>`, `  <span class="p">includes</span>: [${p.f.map(f => `<span class="s">${f}</span>`).join(', ')}]`])],
    ['faq.test.ts', 'ts', 'faq', C.faq.flatMap(f => [`<span class="f">test</span>(<span class="s">'${f.q}'</span>, () =&gt; {`, `  <span class="f">expect</span>(answer).<span class="f">toBe</span>(<span class="s">'${f.a}'</span>) <span class="c">// ✓</span>`, `});`])],
    ['contact.sh', 'js', 'contact', [`<span class="c">#!/bin/bash</span>`, `<span class="f">echo</span> <span class="s">"Готовы обсудить ваш проект"</span>`, `<span class="f">open</span> <a class="o" href="${TG}">https://t.me/fines_studio</a>`, `<span class="c"># © 2026 Финес Студио</span>`]],
  ];
  const body = `<div class="ide"><div class="tbar">${logo(true)}<span class="mid">fines-studio — Visual Studio Финес</span><a href="${TG}">Написать</a></div>
<nav class="act"><span>⎘</span><span>⌕</span><span>⑂</span><span>▷</span></nav>
<nav class="tree"><div class="h">ПРОВОДНИК — FINES-STUDIO</div><div class="f"><i>▾</i>src</div>${sections.map((s, i) => `<a href="#${s[2]}"${i === 0 ? ' class="on"' : ''}><i class="${s[1]}">●</i>${s[0]}</a>`).join('')}<div class="f"><i>▸</i>node_modules</div></nav>
<div class="ed"><div class="tabs">${sections.map((s, i) => `<a href="#${s[2]}"${i === 0 ? ' class="on"' : ''}>${s[0]}</a>`).join('')}</div>
<div class="code"><div class="lines">${sections.map(s => `<section id="${s[2]}">${[`<span class="c">/* ─── ${s[0]} ─── */</span>`, ...s[3], ''].map(x => `<span class="ln">${x}</span>`).join('')}</section>`).join('')}</div><div class="mini">${'<i></i>'.repeat(80)}</div></div></div>
<div class="stat"><span>⑂ main</span><span>✓ 0 ошибок</span><span>UTF-8 · TypeScript</span><span>${TGH}</span></div></div>`;
  const js = `document.querySelectorAll('.tree a,.tabs a').forEach(a=>a.addEventListener('click',()=>{const h=a.getAttribute('href');document.querySelectorAll('.tree a,.tabs a').forEach(x=>x.classList.toggle('on',x.getAttribute('href')===h))}));`;
  return page({ n: 18, title: this.title, fonts: ['JetBrains Mono'], css, body, js });
} });

// 19 — Документация
L.push({ n: 19, title: 'Документация', idea: 'Подача как у технической документации: сайдбар-оглавление, хлебные крошки, заметки, таблицы и якоря; для клиентов, которые любят разобраться до звонка', build() {
  const css = `
body{font-family:'Inter Tight',sans-serif;background:#fff;color:#1c1e21;font-size:16px;line-height:1.65}
header{position:sticky;top:0;z-index:10;background:rgba(255,255,255,.95);backdrop-filter:blur(8px);border-bottom:1px solid #e6e8eb;display:flex;align-items:center;gap:28px;padding:0 28px;height:64px}
header .flogo{--lg:26px}
header nav{display:flex;gap:22px;font-size:14.5px;font-weight:500;color:#4b5058}
header nav a:hover,header nav a.on{color:#f2501c}
header .s{margin-left:auto;background:#f4f5f7;border:1px solid #e6e8eb;border-radius:8px;padding:7px 12px;font-size:13.5px;color:#8b9099;display:flex;gap:30px}
header .s kbd{font-family:'JetBrains Mono';font-size:12px;background:#fff;border:1px solid #ddd;border-radius:4px;padding:0 5px}
header a.b{background:#1c1e21;color:#fff;padding:8px 14px;border-radius:8px;font-size:14px;font-weight:600}
.lay{display:grid;grid-template-columns:260px minmax(0,1fr) 220px;max-width:1440px;margin:0 auto}
.sb{position:sticky;top:64px;height:calc(100vh - 64px);overflow:auto;padding:28px 18px 28px 28px;border-right:1px solid #e6e8eb;font-size:14.5px}
.sb h5{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#8b9099;margin:18px 0 6px}
.sb a{display:block;padding:5px 10px;border-radius:6px;color:#4b5058}
.sb a:hover{background:#f4f5f7}
.sb a.on{background:#fff1eb;color:#f2501c;font-weight:600}
main{padding:40px 56px 80px;min-width:0;max-width:880px}
.bc{font-size:13.5px;color:#8b9099;margin-bottom:14px}.bc b{color:#4b5058;font-weight:500}
h1{font-size:44px;letter-spacing:-.035em;line-height:1.08;margin-bottom:16px}
h2{font-size:28px;letter-spacing:-.02em;margin:56px 0 14px;padding-top:12px;scroll-margin-top:80px;display:flex;align-items:center;gap:10px}
h2 a{color:#d0d3d8;font-weight:400;opacity:0;transition:.2s}h2:hover a{opacity:1}
p{margin-bottom:12px;color:#33373d}
.lead{font-size:19px;color:#4b5058}
.note{border:1px solid #ffd9c9;background:#fff6f2;border-radius:10px;padding:14px 18px;margin:18px 0;font-size:15px}
.note b{color:#f2501c}
.tip{border:1px solid #ffe7a3;background:#fffbea;border-radius:10px;padding:14px 18px;margin:18px 0;font-size:15px}
.tw{overflow-x:auto;margin:16px 0}
table{width:100%;border-collapse:collapse;font-size:15px;min-width:520px}
th{text-align:left;font-weight:600;background:#f7f8fa;border-bottom:1px solid #e6e8eb}
th,td{padding:10px 14px;border-bottom:1px solid #eef0f2;vertical-align:top}
code{font-family:'JetBrains Mono';font-size:13px;background:#f4f5f7;border:1px solid #e6e8eb;border-radius:5px;padding:1px 6px}
pre{font-family:'JetBrains Mono';font-size:13.5px;background:#16181c;color:#e6e6e6;border-radius:10px;padding:18px 20px;overflow-x:auto;margin:14px 0;line-height:1.6;white-space:pre-wrap}
pre .c{color:#7d8590}pre .s{color:#ffc21a}pre .k{color:#f2501c}
.cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:18px 0}
.cards a{border:1px solid #e6e8eb;border-radius:12px;padding:18px;transition:.2s;display:block}
.cards a:hover{border-color:#f2501c;box-shadow:0 8px 20px -14px rgba(242,80,28,.6)}
.cards b{display:block;font-size:16.5px;margin-bottom:4px}.cards span{font-size:14.5px;color:#5c616a}
.steps{counter-reset:s;margin:14px 0}
.steps>div{position:relative;padding:0 0 18px 34px;border-left:2px solid #e6e8eb;margin-left:14px}
.steps>div::before{counter-increment:s;content:counter(s);position:absolute;left:-15px;top:0;width:28px;height:28px;border-radius:50%;background:#1c1e21;color:#fff;font-size:13px;font-weight:700;display:grid;place-items:center}
details{border:1px solid #e6e8eb;border-radius:10px;padding:12px 16px;margin:8px 0}
summary{font-weight:600;cursor:pointer}details p{margin:8px 0 0}
.toc{position:sticky;top:64px;padding:40px 20px;font-size:13.5px;height:calc(100vh - 64px)}
.toc h5{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#8b9099;margin-bottom:10px}
.toc a{display:block;padding:4px 0 4px 12px;color:#6b7079;border-left:2px solid #eef0f2}
.toc a.on{color:#f2501c;border-color:#f2501c}
.pn{display:flex;justify-content:space-between;gap:12px;margin-top:56px;padding-top:20px;border-top:1px solid #e6e8eb}
.pn a{border:1px solid #e6e8eb;border-radius:10px;padding:14px 18px;flex:1}.pn a:last-child{text-align:right}
.pn small{display:block;color:#8b9099;font-size:13px}
@media(max-width:1100px){.lay{grid-template-columns:240px minmax(0,1fr)}.toc{display:none}}
@media(max-width:800px){.lay{grid-template-columns:minmax(0,1fr)}.sb{display:none}main{padding:28px 18px 60px}header nav,header .s{display:none}header a.b{margin-left:auto}h1{font-size:34px}.cards{grid-template-columns:minmax(0,1fr)}header{padding:0 16px}}`;
  const S = [['intro', 'Введение'], ['services', 'Услуги'], ['cases', 'Кейсы'], ['process', 'Процесс работы'], ['pricing', 'Стоимость'], ['faq', 'FAQ'], ['contact', 'Связаться']];
  const body = `<header>${logo()}<nav><a class="on" href="#intro">Документация</a><a href="#cases">Кейсы</a><a href="#pricing">Цены</a></nav><div class="s">Поиск по докам… <kbd>Ctrl K</kbd></div><a class="b" href="${TG}">Написать</a></header>
<div class="lay"><aside class="sb"><h5>Начало работы</h5>${S.slice(0, 2).map(s => `<a href="#${s[0]}">${s[1]}</a>`).join('')}<h5>Справочник</h5>${S.slice(2, 5).map(s => `<a href="#${s[0]}">${s[1]}</a>`).join('')}<h5>Поддержка</h5>${S.slice(5).map(s => `<a href="#${s[0]}">${s[1]}</a>`).join('')}</aside>
<main><div class="bc">Документация › <b>Финес Студио</b></div>
<section id="intro"><h1>Тонкая работа для вашего бизнеса</h1><p class="lead">Финес Студио — студия разработки Telegram-ботов, CRM-систем, веб-сервисов и интеграций для малого бизнеса. Эта страница — полное руководство по работе с нами.</p><div class="note"><b>Быстрый старт.</b> Если времени мало — напишите задачу в <a href="${TG}" style="color:#f2501c;font-weight:600">${TGH}</a>. Ответим за 15 минут, разбор бесплатный.</div>
<pre><span class="c"># подключаем студию к вашему бизнесу</span>\n<span class="k">$</span> fines init --business=<span class="s">"ваша компания"</span>\n<span class="c">✓ разбор · ✓ смета · ✓ прототип · ✓ запуск</span></pre></section>
<section id="services"><h2>Услуги <a href="#services">#</a></h2><p>Пять направлений. Каждое можно заказать отдельно или собрать в единую систему.</p><div class="cards">${C.services.map(s => `<a href="${TG}"><b>${s.t} →</b><span>${s.s}</span></a>`).join('')}</div></section>
<section id="cases"><h2>Кейсы <a href="#cases">#</a></h2><div class="tw"><table><tr><th>Клиент</th><th>Решение</th><th>Результат</th></tr>${C.cases.map(c => `<tr><td><b>${c.c}</b></td><td>${c.t}</td><td><b style="color:#f2501c">${c.m}</b> ${c.ml}</td></tr>`).join('')}</table></div><div class="tip">💡 Подробные разборы кейсов с архитектурой и сроками пришлём по запросу.</div></section>
<section id="process"><h2>Процесс работы <a href="#process">#</a></h2><div class="steps">${C.steps.map(s => `<div><b>${s.t}</b> <code>${s.d}</code><p>${s.s}</p></div>`).join('')}</div></section>
<section id="pricing"><h2>Стоимость <a href="#pricing">#</a></h2><div class="tw"><table><tr><th>Услуга</th><th>Срок</th><th>Цена</th></tr>${C.services.map(s => `<tr><td>${s.t}</td><td>${s.d}</td><td><b>${s.p}</b></td></tr>`).join('')}</table></div><div class="note"><b>Важно.</b> Цена фиксируется в договоре. Оплата: 50% на старте, 50% после приёмки. Поддержка — от 5 000 ₽/мес.</div></section>
<section id="faq"><h2>FAQ <a href="#faq">#</a></h2>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</section>
<section id="contact"><h2>Связаться <a href="#contact">#</a></h2><p>Основной канал связи — Telegram. В рабочие часы отвечаем за 15 минут.</p><pre><span class="k">open</span> <span class="s">https://t.me/fines_studio</span></pre></section>
<div class="pn"><a href="#intro"><small>← Назад</small>Введение</a><a href="${TG}"><small>Далее →</small>Обсудить проект</a></div>
<p style="margin-top:30px;font-size:13px;color:#8b9099">© 2026 Финес Студио · обновлено в ноябре 2026</p></main>
<aside class="toc"><h5>На этой странице</h5>${S.map(s => `<a href="#${s[0]}">${s[1]}</a>`).join('')}</aside></div>`;
  const js = `const lk=[...document.querySelectorAll('.toc a,.sb a')];const io3=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){lk.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-20% 0px -70% 0px'});document.querySelectorAll('main section').forEach(s=>io3.observe(s));`;
  return page({ n: 19, title: this.title, fonts: ['Inter Tight', 'JetBrains Mono'], css, body, js });
} });

// 20 — SaaS-лендинг
L.push({ n: 20, title: 'SaaS-лендинг', idea: 'Студия подана как продукт: hero со скриншотом CRM, логотипы клиентов, фичи, интеграции, тарифы с переключателем; язык стартапов и онлайн-бизнеса', build() {
  const css = `
body{font-family:'Geologica',sans-serif;background:#fff;color:#0e1015}
.w{max-width:1200px;margin:0 auto;padding:0 24px}
header{display:flex;justify-content:space-between;align-items:center;padding:18px 0;gap:16px}
header nav{display:flex;gap:28px;font-size:15px;color:#555b66}header nav a:hover{color:#0e1015}
.bt{background:#0e1015;color:#fff;padding:11px 18px;border-radius:10px;font-weight:600;font-size:15px;display:inline-block;transition:.2s}
.bt:hover{background:#f2501c}.bt.o{background:#f2501c}.bt.o:hover{background:#d9400f}.bt.g{background:#f1f2f4;color:#0e1015}
.hero{text-align:center;padding:70px 0 0}
.ann{display:inline-flex;gap:10px;align-items:center;border:1px solid #e6e7ea;border-radius:99px;padding:6px 14px 6px 6px;font-size:14px}
.ann b{background:#fff1eb;color:#f2501c;border-radius:99px;padding:3px 10px;font-size:12.5px}
.hero h1{font-size:clamp(40px,6.4vw,86px);letter-spacing:-.05em;line-height:1;font-weight:700;margin:24px auto 22px;max-width:960px}
.hero h1 span{color:#f2501c}
.hero p{font-size:20px;color:#555b66;max-width:640px;margin:0 auto 30px;line-height:1.5}
.hero .r{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.hero small{display:block;margin-top:14px;color:#8a8f99;font-size:14px}
.shot{margin:56px auto 0;max-width:1100px;border-radius:18px;border:1px solid #e6e7ea;box-shadow:0 50px 100px -40px rgba(14,16,21,.35);overflow:hidden;background:#fafafb;text-align:left;transform:perspective(1600px) rotateX(8deg);transform-origin:top;transition:transform .8s}
.shot:hover{transform:none}
.shot .tb{height:38px;background:#f1f2f4;display:flex;align-items:center;gap:6px;padding:0 14px;border-bottom:1px solid #e6e7ea}
.shot .tb i{width:11px;height:11px;border-radius:50%;background:#d6d8dc}
.shot .bd{display:grid;grid-template-columns:200px minmax(0,1fr);min-height:420px}
.shot .nav{border-right:1px solid #e6e7ea;padding:16px;font-size:13.5px}
.shot .nav .flogo{--lg:22px;margin-bottom:14px}
.shot .nav div{padding:8px 10px;border-radius:8px;color:#555b66}.shot .nav div.on{background:#fff1eb;color:#f2501c;font-weight:600}
.shot .mn{padding:20px}
.kpi{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:14px}
.kpi div{background:#fff;border:1px solid #e6e7ea;border-radius:12px;padding:12px}
.kpi span{font-size:12px;color:#8a8f99}.kpi b{display:block;font-size:22px;letter-spacing:-.02em}
.kpi em{font-style:normal;font-size:12px;color:#1a9c5b}
.pipe{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.pipe>div{background:#f1f2f4;border-radius:12px;padding:10px;min-height:200px}
.pipe h6{font-size:12px;color:#555b66;margin-bottom:8px;font-weight:600}
.pipe p{background:#fff;border-radius:8px;padding:8px;font-size:12px;margin-bottom:6px;box-shadow:0 1px 2px rgba(0,0,0,.06)}
.pipe p b{display:block;font-size:12.5px}
.logos{display:flex;justify-content:center;gap:48px;flex-wrap:wrap;padding:70px 0 20px;color:#a3a7af;font-weight:700;font-size:20px;letter-spacing:-.02em}
.logos p{width:100%;text-align:center;font-size:14px;font-weight:400;letter-spacing:0;margin-bottom:-20px}
.sec{padding:90px 0}
.sh{text-align:center;max-width:700px;margin:0 auto 50px}
.sh .k{color:#f2501c;font-weight:600;font-size:14px}
.sh h2{font-size:clamp(32px,4.4vw,54px);letter-spacing:-.045em;line-height:1.04;margin:10px 0 14px}
.sh p{color:#555b66;font-size:18px}
.feat{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:#e6e7ea;border:1px solid #e6e7ea;border-radius:18px;overflow:hidden}
.feat>div{background:#fff;padding:30px}
.feat .ic{width:38px;height:38px;border-radius:10px;border:1px solid #e6e7ea;display:grid;place-items:center;margin-bottom:18px;color:#f2501c;font-weight:700;font-size:13px}
.feat h3{font-size:18px;margin-bottom:6px}.feat p{color:#555b66;font-size:15px;line-height:1.5}
.int{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.int span{border:1px solid #e6e7ea;border-radius:12px;padding:12px 18px;font-weight:600;font-size:15px;transition:.2s}
.int span:hover{border-color:#f2501c;color:#f2501c}
.tg{display:flex;justify-content:center;margin-bottom:30px}
.tg div{background:#f1f2f4;border-radius:12px;padding:4px;display:flex}
.tg button{padding:9px 18px;border-radius:9px;font-weight:600;font-size:14px;color:#555b66}
.tg button.on{background:#fff;color:#0e1015;box-shadow:0 1px 3px rgba(0,0,0,.1)}
.plans{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.plans>div{border:1px solid #e6e7ea;border-radius:18px;padding:30px;display:flex;flex-direction:column}
.plans .hot{border:2px solid #f2501c;position:relative}
.plans .hot::before{content:'Популярно';position:absolute;top:-12px;left:30px;background:#f2501c;color:#fff;font-size:12px;font-weight:600;padding:3px 10px;border-radius:99px}
.plans .p{font-size:40px;font-weight:700;letter-spacing:-.04em;margin:12px 0 2px}
.plans .u{color:#8a8f99;font-size:14px;margin-bottom:16px}
.plans li{list-style:none;padding:7px 0;font-size:15px;color:#33373e}.plans li::before{content:'✓';color:#f2501c;margin-right:10px;font-weight:700}
.plans .bt{text-align:center;margin-top:auto}
.plans ul{margin-bottom:20px}
.rev{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.rev>div{border:1px solid #e6e7ea;border-radius:18px;padding:26px}
.rev q{display:block;quotes:none;font-size:16px;line-height:1.55;margin-bottom:18px}
.rev span{display:block;font-size:13.5px;color:#8a8f99}
.faq{max-width:780px;margin:0 auto}
.faq details{border-bottom:1px solid #e6e7ea;padding:18px 0}.faq summary{font-weight:600;font-size:17px;cursor:pointer}.faq p{margin-top:8px;color:#555b66}
.end{background:#0e1015;color:#fff;border-radius:24px;padding:70px 30px;text-align:center;margin-bottom:40px}
.end h2{font-size:clamp(32px,4.4vw,56px);letter-spacing:-.045em;line-height:1.04;margin-bottom:14px}
.end p{color:#a3a7af;margin-bottom:26px}
footer{display:flex;justify-content:space-between;padding:24px 0 40px;color:#8a8f99;font-size:14px;flex-wrap:wrap;gap:12px}
@media(max-width:900px){header nav,header .bt.g{display:none}.shot{transform:none}.shot .bd{grid-template-columns:minmax(0,1fr)}.shot .nav{display:none}.kpi,.pipe{grid-template-columns:repeat(2,minmax(0,1fr))}.feat,.plans,.rev{grid-template-columns:minmax(0,1fr)}.logos{gap:24px;font-size:17px}}`;
  const body = `<div class="w">
<header>${logo()}<nav><a href="#f">Возможности</a><a href="#i">Интеграции</a><a href="#p">Тарифы</a><a href="#q">FAQ</a></nav><div style="display:flex;gap:8px"><a class="bt g" href="#p">Цены</a><a class="bt" href="${TG}">Начать</a></div></header>
<section class="hero"><a class="ann rv" href="${TG}"><b>Новое</b>Mini Apps и оплата через СБП →</a><h1 class="rv d1">Тонкая работа<br><span>для вашего бизнеса.</span></h1><p class="rv d2">Боты, CRM и веб-сервисы под ключ. Как SaaS, только сделанный под ваш процесс — и код остаётся вашим.</p><div class="r rv d3"><a class="bt o" href="${TG}" style="padding:15px 24px">Бесплатный разбор задачи</a><a class="bt g" href="#f" style="padding:15px 24px">Как это работает</a></div><small class="rv d3">Разбор бесплатный · ответ за 15 минут</small>
<div class="shot rv d4"><div class="tb"><i></i><i></i><i></i></div><div class="bd"><div class="nav">${logo()}<div class="on">Сделки</div><div>Клиенты</div><div>Склад</div><div>Отчёты</div><div>Бот</div><div>Настройки</div></div><div class="mn"><div class="kpi"><div><span>Выручка, нояб.</span><b>2,84 млн ₽</b><em>▲ 18%</em></div><div><span>Новые заявки</span><b>312</b><em>▲ 24%</em></div><div><span>Конверсия</span><b>27,4%</b><em>▲ 3,1 п.</em></div><div><span>Средний чек</span><b>9 120 ₽</b><em>▲ 6%</em></div></div>
<div class="pipe">${[['Новые · 14', [['ООО «Кровля»', '84 000 ₽'], ['ИП Смирнов', '12 500 ₽']]], ['Счёт выставлен · 8', [['«Дом и сад»', '230 000 ₽'], ['ИП Ахмедов', '41 000 ₽']]], ['Оплачено · 21', [['«СтройДвор»', '156 000 ₽']]], ['Отгружено · 37', [['«Ремонт-Про»', '67 800 ₽'], ['ИП Орлова', '9 900 ₽']]]].map(c => `<div><h6>${c[0]}</h6>${c[1].map(x => `<p><b>${x[0]}</b>${x[1]}</p>`).join('')}</div>`).join('')}</div></div></div></div></section>
<div class="logos"><p>Нам доверяют</p><span>Зерно</span><span>СтройДвор</span><span>Лак</span><span>Гараж 24</span><span>Speak Up</span><span>Грядка</span></div>
<section class="sec" id="f"><div class="sh"><div class="k">Возможности</div><h2 class="rv">Всё, что нужно малому бизнесу</h2><p>Собираем из готовых модулей и дописываем под вас.</p></div>
<div class="feat">${[['TG', 'Telegram-боты', C.services[0].s], ['CRM', 'CRM под процесс', C.services[1].s], ['WEB', 'Веб-сервисы', C.services[2].s], ['⇄', 'Интеграции', C.services[3].s], ['↗', 'Сайты, которые продают', C.services[4].s], ['∞', 'Поддержка и развитие', 'Мониторинг, бэкапы, доработки по спринтам. Отвечаем в чате, а не через тикет-систему.']].map((f, i) => `<div class="rv d${i % 3}"><div class="ic">${f[0]}</div><h3>${f[1]}</h3><p>${f[2]}</p></div>`).join('')}</div></section>
<section class="sec" id="i" style="padding-top:0"><div class="sh"><div class="k">Интеграции</div><h2 class="rv">Дружит с тем, что у вас уже есть</h2></div><div class="int rv">${['1С', 'amoCRM', 'Битрикс24', 'ЮKassa', 'СБП', 'Т-Банк', 'Google Таблицы', 'МойСклад', 'Telegram', 'WhatsApp', 'VK', 'Яндекс Метрика', 'Mango Office'].map(x => `<span>${x}</span>`).join('')}</div></section>
<section class="sec" id="p" style="padding-top:0"><div class="sh"><div class="k">Тарифы</div><h2 class="rv">Прозрачные цены</h2></div><div class="tg"><div><button class="on" data-m="0">Разовый проект</button><button data-m="1">Поддержка / мес</button></div></div>
<div class="plans">${C.plans.map((p, i) => `<div class="rv d${i}${p.hot ? ' hot' : ''}"><b style="font-size:18px">${p.t}</b><div class="u">${p.for}</div><div class="p" data-a="${p.p}" data-b="${['5 000 ₽', '15 000 ₽', '40 000 ₽'][i]}">${p.p}</div><div class="u pu">за проект</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul><a class="bt${p.hot ? ' o' : ''}" href="${TG}">Выбрать</a></div>`).join('')}</div></section>
<section class="sec" style="padding-top:0"><div class="sh"><div class="k">Отзывы</div><h2 class="rv">Что говорят клиенты</h2></div><div class="rev">${C.reviews.map(r => `<div class="rv"><q>«${r.q}»</q><b>${r.n}</b><span>${r.r}</span></div>`).join('')}</div></section>
<section class="sec" id="q" style="padding-top:0"><div class="sh"><h2 class="rv">Вопросы</h2></div><div class="faq">${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></section>
<section class="end rv"><h2>Готовы убрать рутину?</h2><p>Бесплатный разбор задачи за 30 минут.</p><a class="bt o" style="padding:16px 26px" href="${TG}">Написать ${TGH}</a></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div>`;
  const js = `document.querySelectorAll('.tg button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tg button').forEach(x=>x.classList.toggle('on',x===b));const m=b.dataset.m;document.querySelectorAll('.plans .p').forEach(p=>p.textContent=m==='1'?p.dataset.b:p.dataset.a);document.querySelectorAll('.pu').forEach(p=>p.textContent=m==='1'?'в месяц':'за проект')});`;
  return page({ n: 20, title: this.title, fonts: ['Geologica'], css, body, js });
} });

export default L;
