import { page, logo, C, TG, TGH, dot } from './core.mjs';
const L = [];

// 41 — Mini App / мобильный экран
L.push({ n: 41, title: 'Mobile-first: сайт как Mini App', idea: 'Весь сайт — экран мобильного приложения в центре с нижним таб-баром; на десктопе вокруг телефона подсказки. Показывает, как будет выглядеть ваш Telegram Mini App', build() {
  const css = `
body{font-family:'Onest',sans-serif;background:#ece7df;color:#17171a;font-size:16px}
.stage{display:grid;grid-template-columns:minmax(0,1fr) 420px minmax(0,1fr);gap:40px;max-width:1360px;margin:0 auto;padding:30px 24px;align-items:start}
.side{position:sticky;top:30px;padding-top:40px}
.side .flogo{--lg:44px;margin-bottom:24px}
.side h1{font-size:clamp(30px,3vw,46px);letter-spacing:-.04em;line-height:1.05;font-weight:800;margin-bottom:16px}
.side p{color:#55524c;line-height:1.6;margin-bottom:22px}
.side .bt{display:inline-block;background:#17171a;color:#fff;border-radius:14px;padding:13px 22px;font-weight:700;transition:.2s}
.side .bt:hover{background:#f2501c}
.notes{display:grid;gap:14px;padding-top:120px}
.note{background:#fff;border-radius:16px;padding:16px 18px;font-size:14.5px;line-height:1.5;box-shadow:0 10px 30px -20px rgba(0,0,0,.3);position:relative}
.note b{display:block;margin-bottom:4px}
.note::before{content:'';position:absolute;left:-26px;top:22px;width:22px;height:2px;background:#f2501c}
.phone{width:400px;max-width:100%;background:#17171a;border-radius:54px;padding:12px;box-shadow:0 60px 100px -40px rgba(0,0,0,.5);position:sticky;top:20px}
.scr{background:#f7f6f3;border-radius:44px;height:min(820px,calc(100vh - 64px));overflow-y:auto;overflow-x:hidden;position:relative;scrollbar-width:none}
.scr::-webkit-scrollbar{display:none}
.sb{position:sticky;top:0;z-index:5;background:rgba(247,246,243,.9);backdrop-filter:blur(10px);padding:12px 22px 10px;display:flex;justify-content:space-between;align-items:center;font-size:13px;font-weight:700}
.isl{width:110px;height:30px;background:#17171a;border-radius:20px}
.ah{padding:6px 20px 12px;display:flex;justify-content:space-between;align-items:center}
.ah .flogo{--lg:26px}
.ah .av{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#f2501c,#ffc21a)}
.sec{padding:10px 18px 18px}
.hi{background:#17171a;color:#fff;border-radius:26px;padding:22px;position:relative;overflow:hidden}
.hi::after{content:'';position:absolute;right:-40px;bottom:-60px;width:180px;height:180px;border-radius:50%;background:#f2501c;opacity:.9}
.hi::before{content:'';position:absolute;right:30px;bottom:-80px;width:160px;height:160px;border-radius:50%;background:#ffc21a;mix-blend-mode:screen;opacity:.9}
.hi small{color:#ffc21a;font-weight:700;font-size:12.5px;position:relative;z-index:1}
.hi h2{font-size:28px;line-height:1.05;letter-spacing:-.03em;margin:8px 0 10px;position:relative;z-index:1}
.hi p{font-size:14px;color:#c9c6c0;position:relative;z-index:1;max-width:210px;line-height:1.45}
.hi a{display:inline-block;margin-top:14px;background:#fff;color:#17171a;border-radius:12px;padding:10px 16px;font-weight:700;font-size:14px;position:relative;z-index:1}
.chips{display:flex;gap:8px;overflow-x:auto;padding:4px 18px 10px;scrollbar-width:none}
.chips span{flex:none;background:#fff;border-radius:99px;padding:8px 14px;font-size:13.5px;font-weight:600;border:1px solid #e6e2db}
.chips span.on{background:#f2501c;color:#fff;border-color:#f2501c}
.h3{display:flex;justify-content:space-between;align-items:baseline;margin:6px 0 10px}
.h3 h3{font-size:19px;letter-spacing:-.02em}.h3 a{font-size:13.5px;color:#f2501c;font-weight:600}
.lst{background:#fff;border-radius:22px;overflow:hidden}
.lst>div{display:flex;gap:12px;align-items:center;padding:13px 14px;border-bottom:1px solid #f0ede8}
.lst>div:last-child{border:0}
.lst i{flex:none;width:42px;height:42px;border-radius:13px;display:grid;place-items:center;font-style:normal;font-size:20px}
.lst b{display:block;font-size:15px}.lst span{font-size:13px;color:#7a766f}
.lst em{margin-left:auto;font-style:normal;font-weight:700;font-size:13.5px;white-space:nowrap}
.hs{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;margin:0 -18px;padding:0 18px 4px;scrollbar-width:none}
.hs>div{flex:0 0 78%;scroll-snap-align:start;background:#fff;border-radius:22px;padding:18px}
.hs .m{font-size:36px;font-weight:800;letter-spacing:-.04em;color:#f2501c;line-height:1}
.hs h4{font-size:15px;margin:8px 0 4px}.hs p{font-size:13px;color:#7a766f;line-height:1.45}
.stp{background:#fff;border-radius:22px;padding:6px 16px}
.stp>div{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid #f0ede8}
.stp>div:last-child{border:0}
.stp b{flex:none;width:28px;height:28px;border-radius:50%;background:#17171a;color:#fff;display:grid;place-items:center;font-size:13px}
.stp h4{font-size:14.5px}.stp p{font-size:13px;color:#7a766f}
.pl{display:grid;gap:10px}
.pl>div{background:#fff;border-radius:22px;padding:18px;display:flex;justify-content:space-between;align-items:center;gap:10px;border:2px solid transparent}
.pl .hot{border-color:#f2501c}
.pl b{display:block;font-size:16px}.pl span{font-size:13px;color:#7a766f}.pl em{font-style:normal;font-weight:800;font-size:16px;white-space:nowrap}
.rv2{background:#fff;border-radius:22px;padding:18px;font-size:14px;line-height:1.5}
.rv2 .st{color:#ffb01a;letter-spacing:2px;margin-bottom:6px}
.qa details{background:#fff;border-radius:16px;padding:13px 16px;margin-bottom:8px;font-size:14px}.qa summary{font-weight:700;cursor:pointer}.qa p{color:#7a766f;margin-top:6px}
.mbtn{display:block;text-align:center;background:#f2501c;color:#fff;border-radius:16px;padding:15px;font-weight:800;font-size:16px;margin:4px 0 6px}
.tabs{position:sticky;bottom:0;background:rgba(255,255,255,.94);backdrop-filter:blur(10px);display:flex;justify-content:space-around;padding:10px 6px 22px;border-top:1px solid #ebe7e0;margin-top:10px}
.tabs a{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:11px;color:#7a766f;font-weight:600}
.tabs a i{font-style:normal;font-size:20px}
.tabs a.on{color:#f2501c}
.sp{height:6px}
@media(max-width:1180px){.stage{grid-template-columns:minmax(0,1fr) 400px}.notes{display:none}}
@media(max-width:820px){.stage{grid-template-columns:minmax(0,1fr);padding:16px}.side{position:static;padding-top:0;text-align:center}.phone{width:100%;max-width:400px;margin:0 auto;position:static;border-radius:44px}.scr{height:760px}}`;
  const em = ['🤖', '📊', '🌐', '🔌', '🏪'], bg = ['#ffe5da', '#e2ecff', '#dff3e8', '#fff1c7', '#f3e3f7'];
  const body = `<div class="stage"><section class="side"><div>${logo()}</div><h1 class="rv">Тонкая работа для вашего бизнеса.</h1><p class="rv d1">Это не просто сайт — так выглядит Telegram Mini App, который мы можем сделать для вас. Пролистайте экран телефона: услуги, кейсы, цены и запись — всё в одном приложении.</p><a class="bt rv d2" href="${TG}">Хочу такое приложение</a></section>
<div class="phone rv"><div class="scr"><div class="sb"><span>9:41</span><span class="isl"></span><span>5G ▮▮▮</span></div>
<div class="ah">${logo()}<span class="av"></span></div>
<section class="sec"><div class="hi"><small>● Принимаем проекты на декабрь</small><h2>Боты, CRM и веб-сервисы</h2><p>Для малого бизнеса. Цена в договоре, запуск бота — 2 недели.</p><a href="${TG}">Обсудить →</a></div></section>
<div class="chips"><span class="on">Все</span>${C.services.map(s => `<span>${s.t}</span>`).join('')}</div>
<section class="sec"><div class="h3"><h3>Услуги</h3><a href="${TG}">Все</a></div><div class="lst">${C.services.map((s, i) => `<div><i style="background:${bg[i]}">${em[i]}</i><div><b>${s.t}</b><span>${s.d}</span></div><em>${s.p}</em></div>`).join('')}</div></section>
<section class="sec"><div class="h3"><h3>Кейсы</h3><a href="${TG}">${C.cases.length}</a></div><div class="hs">${C.cases.map(c => `<div><div class="m">${c.m}</div><h4>${c.c}</h4><p>${c.ml}</p></div>`).join('')}</div></section>
<section class="sec"><div class="h3"><h3>Как работаем</h3></div><div class="stp">${C.steps.map((s, i) => `<div><b>${i + 1}</b><div><h4>${s.t} · ${s.d}</h4><p>${s.s}</p></div></div>`).join('')}</div></section>
<section class="sec"><div class="h3"><h3>Тарифы</h3></div><div class="pl">${C.plans.map(p => `<div class="${p.hot ? 'hot' : ''}"><div><b>${p.t}</b><span>${p.for}</span></div><em>${p.p}</em></div>`).join('')}</div></section>
<section class="sec"><div class="h3"><h3>Отзывы</h3><a href="${TG}">4,9 ★</a></div><div class="rv2"><div class="st">★★★★★</div>«${C.reviews[0].q}»<br><b style="display:block;margin-top:8px">${C.reviews[0].n}</b></div></section>
<section class="sec qa"><div class="h3"><h3>Вопросы</h3></div>${C.faq.slice(0, 4).map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}<a class="mbtn" href="${TG}">Написать ${TGH}</a></section>
<nav class="tabs"><a class="on" href="#top"><i>⌂</i>Главная</a><a href="${TG}"><i>☰</i>Услуги</a><a href="${TG}"><i>★</i>Кейсы</a><a href="${TG}"><i>✉</i>Чат</a></nav></div></div>
<aside class="notes"><div class="note rv"><b>Mini App в Telegram</b>Работает внутри мессенджера — клиенту не нужно ничего скачивать.</div><div class="note rv d1"><b>Оплата за 2 тапа</b>ЮKassa, СБП и Telegram Stars — подключаем любые.</div><div class="note rv d2"><b>Свой дизайн</b>В вашем фирменном стиле, а не шаблон конструктора.</div><div class="note rv d3"><b>Админка для вас</b>Меняйте цены, услуги и смотрите заказы с телефона.</div></aside></div>`;
  return page({ n: 41, title: this.title, fonts: [], css, body });
} });

// 42 — Карта/география (локальный бизнес)
L.push({ n: 42, title: 'Локальный бизнес рядом', idea: 'Подача «мы рядом»: стилизованная карта города с пинами клиентов, районы и отрасли; доверие через соседство — для кафе, салонов, автосервисов и магазинов у дома', build() {
  const css = `
body{font-family:'Golos Text',sans-serif;background:#fffdf8;color:#1f2421;font-size:17px}
.w{max-width:1200px;margin:0 auto;padding:0 24px}
header{display:flex;justify-content:space-between;align-items:center;padding:20px 0}
header nav{display:flex;gap:26px;font-size:15px;color:#4b524d}
.bt{display:inline-block;background:#1f2421;color:#fff;border-radius:12px;padding:13px 22px;font-weight:600;transition:.2s;font-size:15.5px}
.bt:hover{background:#f2501c}.bt.o{background:#f2501c}.bt.o:hover{background:#1f2421}
.hero{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:40px;padding:40px 0 70px;align-items:center}
.hero .k{display:inline-flex;gap:8px;align-items:center;background:#eef6ee;color:#2f7a45;border-radius:99px;padding:6px 14px;font-size:14px;font-weight:600}
.hero h1{font-size:clamp(38px,5vw,66px);letter-spacing:-.04em;line-height:1.03;margin:18px 0;font-weight:800}
.hero p{color:#4b524d;font-size:18.5px;margin-bottom:26px;max-width:500px;line-height:1.55}
.hero .r{display:flex;gap:12px;flex-wrap:wrap}
.map{position:relative;aspect-ratio:1.15/1;border-radius:28px;overflow:hidden;background:#eae6dc;box-shadow:0 30px 60px -40px rgba(0,0,0,.4)}
.map svg{position:absolute;inset:0;width:100%;height:100%}
.pin{position:absolute;transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center;cursor:pointer}
.pin .b{background:#fff;border-radius:12px;padding:6px 10px;font-size:12.5px;font-weight:700;box-shadow:0 8px 20px -8px rgba(0,0,0,.35);white-space:nowrap;display:flex;gap:6px;align-items:center;transition:transform .2s}
.pin .b em{font-style:normal;color:#f2501c}
.pin::after{content:'';width:14px;height:14px;border-radius:50%;background:#f2501c;border:3px solid #fff;margin-top:4px;box-shadow:0 0 0 0 rgba(242,80,28,.5);animation:pu 2s infinite}
@keyframes pu{70%{box-shadow:0 0 0 14px rgba(242,80,28,0)}100%{box-shadow:0 0 0 0 rgba(242,80,28,0)}}
.pin:hover .b{transform:scale(1.08)}
.pin.me .b{background:#1f2421;color:#fff}
.pin.me::after{background:#ffc21a}
.map .card{position:absolute;left:16px;bottom:16px;background:#fff;border-radius:16px;padding:12px 16px;font-size:14px;box-shadow:0 10px 30px -14px rgba(0,0,0,.4)}
.map .card b{font-size:22px;color:#f2501c}
.sec{padding:80px 0}
.sec h2{font-size:clamp(30px,4vw,50px);letter-spacing:-.04em;line-height:1.06;font-weight:800;margin-bottom:12px}
.sec .sub{color:#4b524d;margin-bottom:34px;max-width:620px}
.ind{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.ind>div{border-radius:22px;padding:22px;background:#f6f3ec;transition:transform .2s}
.ind>div:hover{transform:translateY(-4px)}
.ind .e{font-size:36px;margin-bottom:10px}
.ind h3{font-size:18px;margin-bottom:6px}.ind p{font-size:14.5px;color:#4b524d;line-height:1.5}
.ind .t{margin-top:12px;font-size:13px;font-weight:700;color:#f2501c}
.svc{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
.svc>div{background:#fff;border:1px solid #ebe6da;border-radius:20px;padding:20px}
.svc h3{font-size:17px;margin-bottom:6px}.svc p{font-size:14px;color:#4b524d;line-height:1.5}.svc b{display:block;margin-top:12px}
.cs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.cs>div{background:#fff;border:1px solid #ebe6da;border-radius:22px;overflow:hidden}
.cs .top{height:110px;display:flex;align-items:flex-end;padding:16px;font-size:13px;font-weight:700}
.cs .top span{background:#fff;border-radius:99px;padding:4px 10px}
.cs .bd{padding:18px}
.cs .m{font-size:36px;font-weight:800;letter-spacing:-.04em;color:#f2501c;line-height:1}
.cs h3{font-size:16px;margin:8px 0 4px}.cs p{font-size:14px;color:#4b524d}
.meet{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:24px;align-items:center;background:#1f2421;color:#fff;border-radius:28px;padding:40px}
.meet h2{color:#fff}
.meet ul{display:grid;gap:12px}
.meet li{list-style:none;background:rgba(255,255,255,.07);border-radius:14px;padding:14px 16px;display:flex;gap:12px;align-items:flex-start}
.meet li b{color:#ffc21a;flex:none;width:24px}
.pl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.pl>div{background:#f6f3ec;border-radius:22px;padding:26px}
.pl .hot{background:#f2501c;color:#fff}
.pl .p{font-size:32px;font-weight:800;letter-spacing:-.03em;margin:8px 0 12px}
.pl li{list-style:none;padding:4px 0;font-size:15px}.pl li::before{content:'✓ '}
.faq details{border-bottom:1px solid #ebe6da;padding:16px 0}.faq summary{font-weight:600;cursor:pointer}.faq p{color:#4b524d;margin-top:6px}
.end{text-align:center;padding:80px 0}
.end h2{font-size:clamp(32px,4.6vw,58px);letter-spacing:-.04em;line-height:1.05;margin-bottom:12px;font-weight:800}
.end p{color:#4b524d;margin-bottom:26px}
footer{display:flex;justify-content:space-between;color:#7d847f;font-size:14px;padding:20px 0 40px;border-top:1px solid #ebe6da;flex-wrap:wrap;gap:10px}
@media(max-width:1000px){.ind{grid-template-columns:repeat(2,minmax(0,1fr))}.svc{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:860px){header nav{display:none}.hero,.meet{grid-template-columns:minmax(0,1fr)}.cs,.pl{grid-template-columns:minmax(0,1fr)}.meet{padding:26px}.pin .b{font-size:11px;padding:4px 7px}.pin .b em{display:none}}
@media(max-width:480px){.ind,.svc{grid-template-columns:minmax(0,1fr)}}`;
  const pins = [[22, 30, '☕ «Зерно»', '+31%'], [64, 22, '💅 «Лак»', '6% неявок'], [78, 58, '🏗 «СтройДвор»', '15 мин'], [36, 70, '🚗 «Гараж 24»', '−70%'], [52, 48, 'Финес Студио', '', 1], [14, 62, '🥕 «Грядка»', '×2']];
  const roads = `<svg viewBox="0 0 100 87" preserveAspectRatio="none"><rect width="100" height="87" fill="#ece8dd"/>${[[8, 8, 26, 18], [40, 6, 20, 14], [66, 4, 28, 12], [6, 34, 18, 20], [30, 28, 16, 14], [64, 30, 22, 16], [8, 66, 24, 16], [40, 60, 18, 20], [64, 66, 30, 16]].map(b => `<rect x="${b[0]}" y="${b[1]}" width="${b[2]}" height="${b[3]}" rx="2" fill="#e0dbcd"/>`).join('')}<path d="M0 26 L100 22 M0 56 L100 60 M34 0 L30 87 M60 0 L62 87" stroke="#fff" stroke-width="3"/><path d="M0 80 Q30 70 50 74 T100 66" stroke="#fff" stroke-width="2" fill="none"/><path d="M-2 44 Q20 40 40 46 T80 44 T104 40" stroke="#b9d7ee" stroke-width="5" fill="none"/><circle cx="84" cy="80" r="9" fill="#cfe4c4"/><circle cx="18" cy="12" r="6" fill="#cfe4c4"/></svg>`;
  const tb = ['#ffe3d4', '#f6e1f3', '#e2ecff', '#fff1c7', '#dff3e8', '#ece8dd'];
  const body = `<div class="w"><header>${logo()}<nav><a href="#i">Отрасли</a><a href="#s">Услуги</a><a href="#c">Соседи</a><a href="#p">Цены</a></nav><a class="bt" href="${TG}">Написать</a></header>
<section class="hero"><div><span class="k rv">📍 Работаем с бизнесом у дома</span><h1 class="rv d1">Тонкая работа для вашего бизнеса.</h1><p class="rv d2">Финес Студио делает ботов, CRM и веб-сервисы для кафе, салонов, магазинов и сервисов. Возможно, ваши соседи по улице уже принимают заказы через нашего бота.</p><div class="r rv d3"><a class="bt o" href="${TG}">Обсудить задачу</a><a class="bt" href="#c">Кто уже с нами</a></div></div>
<div class="map rv d2">${roads}${pins.map(p => `<div class="pin${p[4] ? ' me' : ''}" style="left:${p[0]}%;top:${p[1]}%"><span class="b">${p[2]}${p[3] ? ` <em>${p[3]}</em>` : ''}</span></div>`).join('')}<div class="card"><b>${C.stats[0].v}</b> бизнесов уже работают с нами</div></div></section>
<section class="sec" id="i"><h2 class="rv">Знаем, как устроен ваш бизнес</h2><p class="sub rv d1">Мы много раз делали решения для этих отраслей — не придётся объяснять с нуля.</p><div class="ind">${[['☕', 'Кафе и кофейни', 'Предзаказ, оплата, программа лояльности, экран для бариста.', 'бот предзаказа'], ['💇', 'Салоны и студии', 'Онлайн-запись, напоминания, расписание мастеров, повторные визиты.', 'бот записи'], ['🔧', 'Сервис и ремонт', 'Статусы заказов, фото работ, согласование цены в мессенджере.', 'CRM + бот'], ['🛒', 'Магазины и опт', 'Каталог, остатки из 1С, счета, кабинет оптового клиента.', 'веб-сервис']].map((x, i) => `<div class="rv d${i}"><div class="e">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p><div class="t">${x[3]}</div></div>`).join('')}</div></section>
<section class="sec" id="s" style="padding-top:0"><h2 class="rv">Что делаем</h2><p class="sub">Цены «от» — точную фиксируем в договоре после разбора.</p><div class="svc">${C.services.map((s, i) => `<div class="rv d${i}"><h3>${s.t}</h3><p>${s.s}</p><b>${s.p}</b></div>`).join('')}</div></section>
<section class="sec" id="c" style="padding-top:0"><h2 class="rv">Наши соседи и их цифры</h2><p class="sub">Небольшие бизнесы, которые выросли после автоматизации.</p><div class="cs">${C.cases.map((c, i) => `<div class="rv d${i % 3}"><div class="top" style="background:${tb[i]}"><span>${c.tag}</span></div><div class="bd"><div class="m">${c.m}</div><h3>${c.c}</h3><p>${c.ml}</p></div></div>`).join('')}</div></section>
<section class="sec" style="padding-top:0"><div class="meet rv"><div><h2>Как начать</h2><p style="color:#c9cfca;margin-top:10px">Без долгих встреч: всё решаем в Telegram и на коротком созвоне.</p><a class="bt o" style="margin-top:22px" href="${TG}">Написать ${TGH}</a></div><ul>${C.steps.map((s, i) => `<li><b>${i + 1}</b><div><b style="color:#fff;width:auto">${s.t}</b> — ${s.s}</div></li>`).join('')}</ul></div></section>
<section class="sec" id="p" style="padding-top:0"><h2 class="rv">Цены</h2><p class="sub">Для малого бизнеса — честно и с оплатой частями.</p><div class="pl">${C.plans.map((p, i) => `<div class="rv d${i}${p.hot ? ' hot' : ''}"><b>${p.t}</b><div style="opacity:.75">${p.for}</div><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul></div>`).join('')}</div></section>
<section class="sec faq" style="padding-top:0"><h2 class="rv">Вопросы</h2>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</section>
<section class="end"><h2 class="rv">Станьте следующей точкой на карте</h2><p>Ответим в Telegram за 15 минут.</p><a class="bt o" href="${TG}">Написать ${TGH}</a></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div>`;
  return page({ n: 42, title: this.title, fonts: ['Golos Text'], css, body });
} });

// 43 — Студия-лаборатория / научный
L.push({ n: 43, title: 'Лаборатория', idea: 'Научная подача: «эксперименты», гипотезы, графики и формулы на миллиметровке; студия как лаборатория, где измеряют результат — для аналитичных клиентов', build() {
  const css = `
body{font-family:'IBM Plex Sans',sans-serif;background:#f7f8f5;color:#1b2a2a;font-size:16.5px;line-height:1.6;background-image:linear-gradient(rgba(20,120,110,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(20,120,110,.07) 1px,transparent 1px),linear-gradient(rgba(20,120,110,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(20,120,110,.035) 1px,transparent 1px);background-size:100px 100px,100px 100px,20px 20px,20px 20px}
.w{max-width:1200px;margin:0 auto;padding:0 24px}
.mono{font-family:'IBM Plex Mono',monospace}
header{display:flex;justify-content:space-between;align-items:center;padding:20px 0;border-bottom:2px solid #1b2a2a}
header nav{display:flex;gap:24px;font-family:'IBM Plex Mono';font-size:14px}
header nav a:hover{color:#f2501c}
.bt{display:inline-block;background:#1b2a2a;color:#fff;padding:12px 20px;font-family:'IBM Plex Mono';font-size:14px;font-weight:500;transition:.2s;border:2px solid #1b2a2a}
.bt:hover{background:#f2501c;border-color:#f2501c}
.bt.o{background:transparent;color:#1b2a2a}.bt.o:hover{color:#fff}
.hero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:40px;padding:60px 0;align-items:center}
.tag{font-family:'IBM Plex Mono';font-size:13px;color:#147a6e;background:#e0f1ee;padding:4px 10px;display:inline-block}
.hero h1{font-size:clamp(38px,5vw,66px);font-weight:700;letter-spacing:-.03em;line-height:1.04;margin:16px 0 18px}
.hero h1 sub{font-size:.35em;color:#147a6e;font-family:'IBM Plex Mono';vertical-align:baseline;letter-spacing:0}
.hero p{font-size:18px;color:#3d4f4f;margin-bottom:24px;max-width:520px}
.hero .r{display:flex;gap:12px;flex-wrap:wrap}
.plot{background:#fff;border:2px solid #1b2a2a;padding:20px;position:relative;box-shadow:8px 8px 0 #147a6e}
.plot h4{font-family:'IBM Plex Mono';font-size:13px;display:flex;justify-content:space-between;margin-bottom:10px;font-weight:500}
.plot svg{width:100%;height:auto}
.plot .ax{stroke:#1b2a2a;stroke-width:1.5}
.plot .gr{stroke:#dde6e3;stroke-width:1}
.plot .a{fill:none;stroke:#9aa8a6;stroke-width:2;stroke-dasharray:5 4}
.plot .b{fill:none;stroke:#f2501c;stroke-width:3;stroke-dasharray:500;stroke-dashoffset:500;animation:dr 2s .4s ease forwards}
@keyframes dr{to{stroke-dashoffset:0}}
.plot text{font-family:'IBM Plex Mono';font-size:10px;fill:#3d4f4f}
.plot .lg{display:flex;gap:16px;font-family:'IBM Plex Mono';font-size:12.5px;margin-top:8px;flex-wrap:wrap}
.plot .lg i{display:inline-block;width:18px;height:3px;vertical-align:middle;margin-right:6px}
.sec{padding:70px 0;border-top:2px solid #1b2a2a}
.sh{display:flex;gap:20px;align-items:baseline;margin-bottom:30px;flex-wrap:wrap}
.sh .mono{color:#147a6e;font-size:14px}
.sh h2{font-size:clamp(28px,3.6vw,46px);letter-spacing:-.03em;line-height:1.08}
.exp{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.exp>div{background:#fff;border:2px solid #1b2a2a;padding:22px;position:relative;transition:transform .2s,box-shadow .2s}
.exp>div:hover{transform:translate(-3px,-3px);box-shadow:6px 6px 0 #f2501c}
.exp .id{font-family:'IBM Plex Mono';font-size:12.5px;color:#147a6e;display:flex;justify-content:space-between}
.exp h3{font-size:18px;margin:10px 0 10px}
.exp dl{display:grid;grid-template-columns:90px minmax(0,1fr);gap:4px 10px;font-size:14px}
.exp dt{font-family:'IBM Plex Mono';color:#7d8e8c;font-size:12.5px;padding-top:2px}
.exp .res{margin-top:14px;padding-top:12px;border-top:1px dashed #9aa8a6;display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.exp .res b{font-size:30px;color:#f2501c;letter-spacing:-.03em}
.exp .res span{font-family:'IBM Plex Mono';font-size:12px;color:#147a6e;text-align:right}
.tools{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:0;border:2px solid #1b2a2a;background:#fff}
.tools>div{padding:22px;border-right:1px solid #c9d3d1}
.tools>div:last-child{border:0}
.tools .f{font-family:'IBM Plex Mono';font-size:30px;color:#147a6e;margin-bottom:8px}
.tools h3{font-size:17px;margin-bottom:6px}.tools p{font-size:14px;color:#3d4f4f;line-height:1.5}.tools b{display:block;margin-top:12px;font-family:'IBM Plex Mono';font-size:14px}
.meth{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
.meth>div{position:relative;padding-top:12px}
.meth .n{font-family:'IBM Plex Mono';font-size:13px;background:#1b2a2a;color:#fff;display:inline-block;padding:2px 8px;margin-bottom:10px}
.meth h3{font-size:17px;margin-bottom:4px}.meth p{font-size:14px;color:#3d4f4f}.meth small{font-family:'IBM Plex Mono';color:#147a6e;font-size:12.5px}
.tw{overflow-x:auto}
table{width:100%;border-collapse:collapse;background:#fff;border:2px solid #1b2a2a;min-width:600px}
th{font-family:'IBM Plex Mono';font-weight:500;font-size:13px;text-align:left;padding:12px 16px;background:#1b2a2a;color:#fff}
td{padding:13px 16px;border-bottom:1px solid #dde6e3;font-size:15px}
td.p{font-weight:700;color:#f2501c;white-space:nowrap}
.faq details{background:#fff;border:2px solid #1b2a2a;margin-bottom:-2px;padding:14px 18px}.faq summary{font-weight:600;cursor:pointer}.faq summary::before{content:'Q: ';font-family:'IBM Plex Mono';color:#147a6e}.faq p{color:#3d4f4f;margin-top:6px}.faq p::before{content:'A: ';font-family:'IBM Plex Mono';color:#f2501c}
.end{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:center;background:#1b2a2a;color:#fff;padding:44px;margin:50px 0}
.end h2{font-size:clamp(28px,3.6vw,46px);letter-spacing:-.03em;line-height:1.08}
.end p{color:#a9bcb9;font-family:'IBM Plex Mono';font-size:14px;margin-top:8px}
.end .bt{background:#f2501c;border-color:#f2501c}
footer{display:flex;justify-content:space-between;font-family:'IBM Plex Mono';font-size:13px;color:#5f716f;padding:0 0 40px;flex-wrap:wrap;gap:10px}
@media(max-width:1000px){.tools{grid-template-columns:repeat(2,minmax(0,1fr))}.tools>div{border-right:0;border-bottom:1px solid #c9d3d1}.meth{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:860px){header nav{display:none}.hero,.end{grid-template-columns:minmax(0,1fr)}.exp{grid-template-columns:minmax(0,1fr)}.end{padding:28px}}
@media(max-width:480px){.tools,.meth{grid-template-columns:minmax(0,1fr)}}`;
  const hyp = ['Если гость сможет заказать кофе заранее, утренняя очередь сократится', 'Если бот будет напоминать о визите, неявок станет меньше', 'Если счёт будет формироваться автоматически, менеджер сэкономит время', 'Если клиент видит статус ремонта онлайн, звонков станет меньше', 'Если остатки синхронизируются с 1С, ошибок в заказах не будет', 'Если фермер получит Mini App, заказов станет больше'];
  const body = `<div class="w"><header>${logo()}<nav><a href="#e">/эксперименты</a><a href="#t">/инструменты</a><a href="#m">/методика</a><a href="#p">/цены</a></nav><a class="bt" href="${TG}">Начать эксперимент</a></header>
<section class="hero"><div><span class="tag rv">lab.fines · протокол №060</span><h1 class="rv d1">Тонкая работа для вашего бизнеса<sub> (p &lt; 0,05)</sub></h1><p class="rv d2">Мы — студия-лаборатория. Формулируем гипотезу, строим бота, CRM или веб-сервис и измеряем результат в цифрах. Если не измерить эффект — это не наш метод.</p><div class="r rv d3"><a class="bt" href="${TG}">Предложить гипотезу</a><a class="bt o" href="#e">Протоколы</a></div></div>
<div class="plot rv d2"><h4><span>Fig. 1 — неявки клиентов, %</span><span>n = 740</span></h4><svg viewBox="0 0 400 220">${[0, 1, 2, 3, 4].map(i => `<line class="gr" x1="40" x2="390" y1="${20 + i * 45}" y2="${20 + i * 45}"/><text x="8" y="${24 + i * 45}">${20 - i * 5}%</text>`).join('')}<line class="ax" x1="40" y1="200" x2="390" y2="200"/><line class="ax" x1="40" y1="10" x2="40" y2="200"/><polyline class="a" points="40,47 110,38 180,52 250,42 320,48 390,40"/><polyline class="b" points="40,47 110,44 180,90 250,140 320,150 390,146"/><line x1="180" y1="10" x2="180" y2="200" stroke="#147a6e" stroke-dasharray="3 3"/><text x="186" y="22" fill="#147a6e">запуск бота</text>${['май', 'июн', 'июл', 'авг', 'сен', 'окт'].map((m, i) => `<text x="${34 + i * 70}" y="215">${m}</text>`).join('')}</svg><div class="lg"><span><i style="background:#9aa8a6"></i>контроль (без бота)</span><span><i style="background:#f2501c"></i>студия «Лак» с ботом</span></div></div></section>
<section class="sec" id="e"><div class="sh"><span class="mono">§1</span><h2 class="rv">Протоколы экспериментов</h2></div><div class="exp">${C.cases.map((c, i) => `<div class="rv d${i % 3}"><div class="id"><span>EXP-${String(i + 14).padStart(3, '0')}</span><span>${c.tag}</span></div><h3>${c.c}</h3><dl><dt>гипотеза</dt><dd>${hyp[i]}</dd><dt>решение</dt><dd>${c.t}</dd></dl><div class="res"><b>${c.m}</b><span>${c.ml}<br>подтверждено ✓</span></div></div>`).join('')}</div></section>
<section class="sec" id="t"><div class="sh"><span class="mono">§2</span><h2 class="rv">Инструменты лаборатории</h2></div><div class="tools rv">${C.services.map((s, i) => `<div><div class="f">${['ƒ(x)', 'Σ', '∫', '⇄', '◎'][i]}</div><h3>${s.t}</h3><p>${s.s}</p><b>${s.p}</b></div>`).join('')}</div></section>
<section class="sec" id="m"><div class="sh"><span class="mono">§3</span><h2 class="rv">Методика</h2></div><div class="meth">${C.steps.map((s, i) => `<div class="rv d${i}"><span class="n">шаг ${i + 1}</span><h3>${s.t}</h3><p>${s.s}</p><small>Δt = ${s.d}</small></div>`).join('')}</div></section>
<section class="sec" id="p"><div class="sh"><span class="mono">§4</span><h2 class="rv">Стоимость исследований</h2></div><div class="tw rv"><table><tr><th>Формат</th><th>Для чего</th><th>Что входит</th><th>Цена</th></tr>${C.plans.map(p => `<tr><td><b>${p.t}</b>${p.hot ? ' ★' : ''}</td><td>${p.for}</td><td>${p.f.join('; ')}</td><td class="p">${p.p}</td></tr>`).join('')}</table></div></section>
<section class="sec faq"><div class="sh"><span class="mono">§5</span><h2 class="rv">Вопросы рецензентов</h2></div>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</section>
<section class="end rv"><div><h2>Есть гипотеза? Проверим.</h2><p>// ответ в Telegram за 15 минут · разбор бесплатный</p></div><a class="bt" href="${TG}">Написать ${TGH}</a></section>
<footer><span>© 2026 Финес Студио · лаборатория автоматизации</span><span>${C.slogan}</span></footer></div>`;
  return page({ n: 43, title: this.title, fonts: ['IBM Plex Sans', 'IBM Plex Mono'], css, body });
} });

// 44 — Цветовые блоки / колор-блокинг
L.push({ n: 44, title: 'Колор-блокинг', idea: 'Каждая секция — сплошной цветной блок своей палитры (оранжевый, жёлтый, синий, мятный, чёрный) с крупной типографикой; ярко и запоминаемо, для молодых брендов и e-com', build() {
  const css = `
body{font-family:'Manrope',sans-serif;color:#141414;font-size:17px}
.w{max-width:1240px;margin:0 auto;padding:0 28px}
.blk{padding:90px 0;position:relative}
.or{background:#f2501c;color:#fff}.ye{background:#ffc21a}.bl{background:#2440d8;color:#fff}.mi{background:#9be3c4}.bk{background:#141414;color:#fff}.pk{background:#ffc7d9}.cr{background:#f5efe4}
header{display:flex;justify-content:space-between;align-items:center;padding:20px 0}
header .flogo{color:#fff}
header nav{display:flex;gap:26px;font-weight:700;font-size:15px}
.bt{display:inline-block;background:#141414;color:#fff;border-radius:99px;padding:15px 28px;font-weight:800;font-size:16px;transition:transform .2s}
.bt:hover{transform:scale(1.05)}
.bt.w{background:#fff;color:#141414}
.hero{padding:40px 0 110px}
.hero h1{font-size:clamp(48px,8.4vw,134px);line-height:.94;letter-spacing:-.045em;font-weight:800;margin:30px 0}
.hero .bot{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:30px;align-items:end}
.hero p{font-size:21px;max-width:560px;line-height:1.45;font-weight:500}
.big{font-size:clamp(40px,6vw,96px);line-height:.92;letter-spacing:-.05em;font-weight:800;margin-bottom:40px}
.svc{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:0;border-top:2px solid #141414}
.svc>div{padding:26px 20px 10px 0;border-right:2px solid #141414;margin-right:20px}
.svc>div:last-child{border:0;margin:0}
.svc .n{font-size:56px;font-weight:800;letter-spacing:-.05em;line-height:1}
.svc h3{font-size:21px;margin:14px 0 8px;letter-spacing:-.02em}
.svc p{font-size:15px;line-height:1.5}
.svc b{display:inline-block;margin-top:14px;background:#141414;color:#ffc21a;border-radius:99px;padding:5px 12px;font-size:14px}
.cs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:2px;background:rgba(255,255,255,.25)}
.cs>div{background:#2440d8;padding:30px 26px 30px 0}
.cs .m{font-size:clamp(50px,5.4vw,84px);font-weight:800;letter-spacing:-.05em;line-height:1;color:#ffc21a}
.cs h3{font-size:18px;margin:10px 0 4px}.cs p{opacity:.85;font-size:15px}
.steps{display:grid;gap:0}
.steps>div{display:grid;grid-template-columns:120px minmax(0,1fr) minmax(0,1.3fr) 140px;gap:24px;padding:24px 0;border-bottom:2px solid #141414;align-items:baseline;transition:padding .25s}
.steps>div:hover{padding-left:16px}
.steps .n{font-size:44px;font-weight:800;letter-spacing:-.05em}
.steps h3{font-size:26px;letter-spacing:-.03em}.steps p{font-size:16px}.steps small{font-weight:800;text-align:right}
.pl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.pl>div{border-radius:28px;padding:32px;background:#fff;color:#141414}
.pl .hot{background:#ffc21a}
.pl .p{font-size:44px;font-weight:800;letter-spacing:-.05em;margin:10px 0 16px}
.pl li{list-style:none;padding:6px 0;border-bottom:1px solid rgba(0,0,0,.1)}
.pl ul{margin-bottom:22px}
.rvw{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px}
.rvw q{display:block;quotes:none;font-size:21px;line-height:1.4;font-weight:600;letter-spacing:-.01em;margin-bottom:16px}
.faq{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 40px}
.faq details{border-bottom:2px solid #141414;padding:18px 0}.faq summary{font-weight:800;cursor:pointer;font-size:18px}.faq p{margin-top:8px}
.end{text-align:center}
.end h2{font-size:clamp(52px,9vw,150px);line-height:.88;letter-spacing:-.06em;font-weight:800;margin-bottom:36px}
footer{background:#141414;color:#999;padding:24px 0;font-size:14px}
footer .w{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}
@media(max-width:1000px){.svc{grid-template-columns:repeat(2,minmax(0,1fr))}.svc>div{border-right:0;margin:0;border-bottom:2px solid #141414}}
@media(max-width:860px){header nav{display:none}.hero .bot,.cs,.pl,.rvw,.faq{grid-template-columns:minmax(0,1fr)}.steps>div{grid-template-columns:60px minmax(0,1fr);gap:8px 16px}.steps p,.steps small{grid-column:2}.steps small{text-align:left}.blk{padding:60px 0}}
@media(max-width:480px){.svc{grid-template-columns:minmax(0,1fr)}}`;
  const body = `<section class="blk or hero"><div class="w"><header>${logo(true)}<nav><a href="#s">Услуги</a><a href="#c">Кейсы</a><a href="#p">Цены</a><a href="#f">FAQ</a></nav><a class="bt" href="${TG}">Написать</a></header><h1 class="rv">Тонкая работа для вашего бизнеса.</h1><div class="bot"><p class="rv d1">Боты, CRM и веб-сервисы для малого бизнеса. Яркие снаружи — аккуратные внутри.</p><a class="bt w rv d2" href="${TG}">Обсудить проект →</a></div></div></section>
<section class="blk ye" id="s"><div class="w"><h2 class="big rv">Пять вещей, которые мы делаем хорошо</h2><div class="svc">${C.services.map((s, i) => `<div class="rv d${i}"><div class="n">0${i + 1}</div><h3>${s.t}</h3><p>${s.s}</p><b>${s.p}</b></div>`).join('')}</div></div></section>
<section class="blk bl" id="c"><div class="w"><h2 class="big rv">Цифры клиентов</h2><div class="cs">${C.cases.map((c, i) => `<div class="rv d${i % 3}"><div class="m">${c.m}</div><h3>${c.c}</h3><p>${c.ml}</p></div>`).join('')}</div></div></section>
<section class="blk mi"><div class="w"><h2 class="big rv">Пять шагов до запуска</h2><div class="steps">${C.steps.map((s, i) => `<div class="rv"><div class="n">0${i + 1}</div><h3>${s.t}</h3><p>${s.s}</p><small>${s.d}</small></div>`).join('')}</div></div></section>
<section class="blk bk" id="p"><div class="w"><h2 class="big rv">Цены <span style="color:#ffc21a">без сюрпризов</span></h2><div class="pl">${C.plans.map((p, i) => `<div class="rv d${i}${p.hot ? ' hot' : ''}"><b style="font-size:20px">${p.t}</b><div>${p.for}</div><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul><a class="bt" href="${TG}">Выбрать</a></div>`).join('')}</div></div></section>
<section class="blk pk"><div class="w"><h2 class="big rv">Говорят клиенты</h2><div class="rvw">${C.reviews.map((r, i) => `<div class="rv d${i}"><q>«${r.q}»</q><b>${r.n}</b><div>${r.r}</div></div>`).join('')}</div></div></section>
<section class="blk cr" id="f"><div class="w"><h2 class="big rv">Вопросы</h2><div class="faq">${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></div></section>
<section class="blk or end"><div class="w"><h2 class="rv">Давайте ярко.</h2><a class="bt w rv d1" href="${TG}">Написать ${TGH}</a></div></section>
<footer><div class="w"><span>© 2026 Финес Студио</span><span>${C.slogan}</span></div></footer>`;
  return page({ n: 44, title: this.title, fonts: ['Manrope'], css, body });
} });

// 45 — Голос / подкаст / аудиоформат
L.push({ n: 45, title: 'Студия как подкаст', idea: 'Подача через голос: hero как аудиоплеер с волной, «выпуски» вместо кейсов, таймкоды вместо этапов; живо и по-человечески — для тех, кто устал от безликих агентств', build() {
  const css = `
body{font-family:'Onest',sans-serif;background:#1d1726;color:#f4eefb;font-size:17px}
.w{max-width:1140px;margin:0 auto;padding:0 24px}
header{display:flex;justify-content:space-between;align-items:center;padding:22px 0}
header .flogo{color:#fff}
header nav{display:flex;gap:26px;font-size:15px;color:#bfb3d1}
.bt{display:inline-flex;align-items:center;gap:10px;background:#f2501c;color:#fff;border-radius:99px;padding:13px 24px;font-weight:700;font-size:15.5px;transition:.2s}
.bt:hover{background:#ffc21a;color:#1d1726}
.bt.g{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15)}
.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:50px;padding:50px 0 80px;align-items:center}
.cover{aspect-ratio:1/1;border-radius:28px;background:linear-gradient(145deg,#f2501c,#ff8a3d 50%,#ffc21a);position:relative;overflow:hidden;box-shadow:0 40px 80px -40px #f2501c;display:flex;flex-direction:column;justify-content:space-between;padding:30px}
.cover .flogo{--lg:64px;color:#1d1726}
.cover svg circle{mix-blend-mode:normal!important}.cover svg circle:first-child{fill:#1d1726}
.cover .flogo .fs{color:#1d1726}
.cover h2{font-family:'Unbounded';font-size:clamp(26px,3vw,40px);line-height:1;color:#1d1726;letter-spacing:-.03em}
.cover .ep{font-family:'JetBrains Mono';font-size:14px;color:#1d1726;opacity:.75}
.cover::after{content:'';position:absolute;right:-60px;top:-60px;width:260px;height:260px;border-radius:50%;border:40px solid rgba(29,23,38,.12)}
.hero .k{font-size:14px;color:#ffc21a;font-weight:600}
.hero h1{font-family:'Unbounded';font-size:clamp(28px,3.5vw,50px);line-height:1.1;overflow-wrap:anywhere;letter-spacing:-.035em;margin:14px 0 16px;font-weight:700}
.hero p{color:#bfb3d1;font-size:18px;line-height:1.55;margin-bottom:24px}
.player{background:#2a2236;border-radius:20px;padding:18px;display:flex;align-items:center;gap:16px;margin-bottom:22px}
.play{flex:none;width:54px;height:54px;border-radius:50%;background:#fff;color:#1d1726;display:grid;place-items:center;font-size:20px;cursor:pointer;transition:transform .2s}
.play:hover{transform:scale(1.08)}
.wave{flex:1;display:flex;align-items:center;gap:3px;height:46px;min-width:0;overflow:hidden}
.wave i{flex:1;min-width:2px;background:#5b4d70;border-radius:2px}
.wave i.p{background:#f2501c}
.player.on .wave i{animation:wv 1s ease-in-out infinite alternate}
@keyframes wv{to{transform:scaleY(.4)}}
.time{font-family:'JetBrains Mono';font-size:13px;color:#bfb3d1;flex:none}
.sec{padding:80px 0;border-top:1px solid #2f2740}
.sh{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:30px;gap:20px;flex-wrap:wrap}
.sh h2{font-family:'Unbounded';font-size:clamp(28px,3.6vw,44px);letter-spacing:-.03em;line-height:1.08}
.sh span{color:#bfb3d1}
.eps{display:grid;gap:10px}
.eps>div{display:grid;grid-template-columns:64px minmax(0,1fr) auto auto;gap:18px;align-items:center;background:#241d2f;border-radius:18px;padding:14px 18px 14px 14px;transition:background .2s}
.eps>div:hover{background:#2f2640}
.eps .th{width:64px;height:64px;border-radius:14px;display:grid;place-items:center;font-family:'Unbounded';font-weight:700;color:#1d1726;font-size:15px}
.eps h3{font-size:17px}.eps p{font-size:14.5px;color:#bfb3d1}
.eps .m{font-family:'Unbounded';font-size:22px;color:#ffc21a;white-space:nowrap}
.eps .d{font-family:'JetBrains Mono';font-size:13px;color:#8d80a3;white-space:nowrap}
.svc{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
.svc>div{background:#241d2f;border-radius:20px;padding:22px}
.svc .ic{width:44px;height:44px;border-radius:50%;background:#f2501c;display:grid;place-items:center;font-size:20px;margin-bottom:14px}
.svc h3{font-size:17px;margin-bottom:6px}.svc p{font-size:14px;color:#bfb3d1;line-height:1.5}.svc b{display:block;margin-top:12px;color:#ffc21a}
.tc{display:grid;gap:0;max-width:820px}
.tc>div{display:grid;grid-template-columns:90px minmax(0,1fr);gap:18px;padding:16px 0;border-bottom:1px solid #2f2740}
.tc span{font-family:'JetBrains Mono';color:#f2501c;font-size:15px;padding-top:2px}
.tc h3{font-size:18px}.tc p{color:#bfb3d1;font-size:15.5px}
.hosts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.hosts>div{background:#241d2f;border-radius:20px;padding:22px;text-align:center}
.hosts .av{width:84px;height:84px;border-radius:50%;margin:0 auto 12px;display:grid;place-items:center;font-family:'Unbounded';font-size:30px;font-weight:700;color:#1d1726;position:relative}
.hosts .av::after{content:'🎙';position:absolute;right:-4px;bottom:-4px;font-size:22px}
.hosts h3{font-size:17px}.hosts small{color:#ffc21a}.hosts p{font-size:14px;color:#bfb3d1;margin-top:6px}
.pl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.pl>div{background:#241d2f;border-radius:22px;padding:26px}
.pl .hot{background:linear-gradient(160deg,#f2501c,#c43c12)}
.pl .p{font-family:'Unbounded';font-size:28px;margin:8px 0 14px}
.pl li{list-style:none;padding:5px 0;font-size:15px;color:#e3d9f0}
.faq details{background:#241d2f;border-radius:16px;padding:16px 20px;margin-bottom:8px}.faq summary{font-weight:600;cursor:pointer}.faq p{color:#bfb3d1;margin-top:8px}
.end{text-align:center;padding:90px 0}
.end h2{font-family:'Unbounded';font-size:clamp(32px,5vw,64px);letter-spacing:-.04em;line-height:1.04;margin-bottom:14px}
.end p{color:#bfb3d1;margin-bottom:28px}
footer{display:flex;justify-content:space-between;padding:20px 0 40px;color:#8d80a3;font-size:14px;border-top:1px solid #2f2740;flex-wrap:wrap;gap:10px}
@media(max-width:1000px){.svc{grid-template-columns:repeat(2,minmax(0,1fr))}.hosts{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:860px){header nav{display:none}.hero,.pl{grid-template-columns:minmax(0,1fr)}.cover{max-width:420px}.eps>div{grid-template-columns:52px minmax(0,1fr);gap:12px}.eps .th{width:52px;height:52px;font-size:13px}.eps .m,.eps .d{grid-column:2}}
@media(max-width:480px){.svc,.hosts{grid-template-columns:minmax(0,1fr)}}`;
  const h = [14, 22, 30, 18, 36, 42, 28, 20, 34, 44, 38, 24, 16, 30, 40, 46, 32, 22, 18, 28, 36, 42, 30, 20, 14, 24, 34, 40, 28, 18, 26, 38, 44, 32, 20, 16, 26, 36, 30, 22];
  const tc = ['#ffc21a', '#ff8ad8', '#8ad8ff', '#9be3c4', '#ffb089', '#c9b6ff'];
  const body = `<div class="w"><header>${logo(true)}<nav><a href="#e">Выпуски</a><a href="#s">Услуги</a><a href="#h">Ведущие</a><a href="#p">Цены</a></nav><a class="bt" href="${TG}">Написать</a></header>
<section class="hero"><div class="cover rv"><div>${logo()}</div><div><div class="ep">Сезон 3 · выпуск 60</div><h2>Тонкая работа<br>для вашего бизнеса</h2></div></div>
<div><div class="k rv">● Новый выпуск каждую неделю</div><h1 class="rv d1">Студия, которая разговаривает по-человечески</h1><p class="rv d2">Финес Студио делает Telegram-ботов, CRM и веб-сервисы для малого бизнеса. Без канцелярита и «синергии» — послушайте, как мы рассказываем о проектах.</p>
<div class="player rv d3" id="pl"><button class="play" id="pb" aria-label="Слушать">▶</button><div class="wave">${h.map((x, i) => `<i class="${i < 14 ? 'p' : ''}" style="height:${x}px;animation-delay:${(i % 8) * .08}s"></i>`).join('')}</div><span class="time">04:12 / 12:30</span></div>
<div style="display:flex;gap:12px;flex-wrap:wrap" class="rv d3"><a class="bt" href="${TG}">Обсудить проект</a><a class="bt g" href="#e">Все выпуски</a></div></div></section>
<section class="sec" id="e"><div class="sh"><h2 class="rv">Выпуски-кейсы</h2><span>Истории клиентов в цифрах</span></div><div class="eps">${C.cases.map((c, i) => `<div class="rv"><div class="th" style="background:${tc[i]}">#${55 + i}</div><div><h3>${c.c}: ${c.t.toLowerCase()}</h3><p>${c.ml}</p></div><div class="m">${c.m}</div><div class="d">${['18:40', '14:05', '22:10', '16:30', '11:55', '19:20'][i]}</div></div>`).join('')}</div></section>
<section class="sec" id="s"><div class="sh"><h2 class="rv">О чём мы говорим (и что делаем)</h2></div><div class="svc">${C.services.map((s, i) => `<div class="rv d${i}"><div class="ic">${['🤖', '📊', '🌐', '🔌', '🏪'][i]}</div><h3>${s.t}</h3><p>${s.s}</p><b>${s.p}</b></div>`).join('')}</div></section>
<section class="sec"><div class="sh"><h2 class="rv">Таймкоды проекта</h2><span>Как проходит работа</span></div><div class="tc">${C.steps.map((s, i) => `<div class="rv"><span>${['00:00', '00:30', '03:00', '07:00', '14:00'][i]}</span><div><h3>${s.t} · ${s.d}</h3><p>${s.s}</p></div></div>`).join('')}</div></section>
<section class="sec" id="h"><div class="sh"><h2 class="rv">Ведущие</h2></div><div class="hosts">${C.team.map((t, i) => `<div class="rv d${i}"><div class="av" style="background:${tc[i]}">${t.n[0]}</div><h3>${t.n}</h3><small>${t.r}</small><p>${t.s}</p></div>`).join('')}</div></section>
<section class="sec" id="p"><div class="sh"><h2 class="rv">Подписки на разработку</h2></div><div class="pl">${C.plans.map((p, i) => `<div class="rv d${i}${p.hot ? ' hot' : ''}"><b>${p.t}</b><div style="opacity:.75">${p.for}</div><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>— ${f}</li>`).join('')}</ul></div>`).join('')}</div></section>
<section class="sec faq"><div class="sh"><h2 class="rv">Вопросы слушателей</h2></div>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</section>
<section class="end"><h2 class="rv">Станьте героем следующего выпуска</h2><p>Расскажите о задаче в Telegram — ответим за 15 минут.</p><a class="bt" href="${TG}">Написать ${TGH}</a></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div>`;
  const js = `const p=document.getElementById('pl'),b=document.getElementById('pb');b.onclick=()=>{p.classList.toggle('on');b.textContent=p.classList.contains('on')?'❚❚':'▶'};`;
  return page({ n: 45, title: this.title, fonts: ['Unbounded', 'JetBrains Mono'], css, body, js });
} });

export default L;
