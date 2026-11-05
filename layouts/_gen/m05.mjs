import { page, logo, C, TG, TGH, dot } from './core.mjs';
const L = [];

// 21 — аля Apple
L.push({ n: 21, title: 'Продуктовая презентация (аля Apple)', idea: 'Центрированные крупные заголовки, много воздуха, чередование светлых и тёмных «витрин» каждой услуги как продукта; ощущение премиального качества', build() {
  const css = `
body{font-family:'Inter Tight',sans-serif;background:#fff;color:#1d1d1f;letter-spacing:-.01em}
.nav{position:sticky;top:0;z-index:20;background:rgba(251,251,253,.8);backdrop-filter:saturate(180%) blur(20px);border-bottom:1px solid rgba(0,0,0,.08)}
.nav .in{max-width:1000px;margin:0 auto;height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 22px;font-size:13px}
.nav .flogo{--lg:22px}.nav .flogo .fs{display:none}
.nav nav{display:flex;gap:30px;color:#424245}.nav nav a:hover{color:#000}
.nav .b{background:#f2501c;color:#fff;border-radius:99px;padding:5px 12px;font-size:12.5px}
.tile{text-align:center;padding:90px 22px 0;overflow:hidden}
.tile h1,.tile h2{font-size:clamp(40px,6vw,80px);font-weight:700;letter-spacing:-.04em;line-height:1.04}
.tile h3{font-size:clamp(22px,2.4vw,28px);font-weight:500;margin:10px 0 18px;color:#424245}
.tile .lk{display:flex;gap:28px;justify-content:center;font-size:19px;flex-wrap:wrap}
.tile .lk a{color:#f2501c}.tile .lk a:hover{text-decoration:underline}
.tile .lk a.p{background:#f2501c;color:#fff;border-radius:99px;padding:10px 22px}.tile .lk a.p:hover{text-decoration:none;background:#d9400f}
.hero{background:#000;color:#f5f5f7;padding-bottom:0}
.hero h3{color:#a1a1a6}
.hero .ey{font-size:20px;font-weight:600;color:#f2501c;margin-bottom:6px}
.orb{width:min(560px,80vw);margin:60px auto 0;aspect-ratio:2/1;overflow:hidden;position:relative}
.orb svg{width:100%;height:auto;position:absolute;top:0}
.orb circle{mix-blend-mode:screen}
.pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;padding:12px}
.pair .tile{background:#f5f5f7;border-radius:4px;padding:60px 30px 0;min-height:580px;display:flex;flex-direction:column}
.pair .tile h2{font-size:clamp(32px,3.4vw,48px)}
.pair .tile h3{font-size:19px}
.pair .dark{background:#000;color:#f5f5f7}.pair .dark h3{color:#a1a1a6}
.dev{margin:auto auto 0;width:78%;max-width:340px;aspect-ratio:9/13;border-radius:34px 34px 0 0;background:#1d1d1f;padding:12px 12px 0;box-shadow:0 30px 60px -20px rgba(0,0,0,.4)}
.dev div{background:#fff;border-radius:24px 24px 0 0;height:100%;padding:18px 14px;display:flex;flex-direction:column;gap:8px;text-align:left}
.dev p{font-size:12.5px;padding:8px 11px;border-radius:14px;max-width:85%;line-height:1.35}
.dev .a{background:#f0f0f2;align-self:flex-start}.dev .u{background:#f2501c;color:#fff;align-self:flex-end}
.dash{margin:auto auto 0;width:90%;aspect-ratio:16/10;border-radius:14px 14px 0 0;background:#2a2a2d;padding:10px 10px 0}
.dash div{background:#111;border-radius:8px 8px 0 0;height:100%;padding:16px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;align-content:start;text-align:left}
.dash span{background:#1d1d1f;border-radius:8px;padding:10px;font-size:11px;color:#a1a1a6}.dash b{display:block;font-size:20px;color:#f5f5f7}
.dash i{grid-column:1/-1;height:90px;border-radius:8px;background:linear-gradient(180deg,rgba(242,80,28,.5),transparent),repeating-linear-gradient(90deg,#1d1d1f 0 30px,#222 30px 31px)}
.big{font-size:clamp(70px,12vw,170px);font-weight:700;letter-spacing:-.06em;line-height:1;background:linear-gradient(180deg,#f2501c,#ffc21a);-webkit-background-clip:text;background-clip:text;color:transparent;margin:auto 0 50px}
.nums{background:#f5f5f7;padding:90px 22px;text-align:center}
.nums h2{font-size:clamp(36px,4.6vw,56px);font-weight:700;letter-spacing:-.04em;margin-bottom:50px}
.nums .g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:40px;max-width:1000px;margin:0 auto}
.nums b{display:block;font-size:clamp(44px,5vw,64px);font-weight:700;letter-spacing:-.04em;color:#1d1d1f}
.nums span{color:#6e6e73;font-size:17px}
.cmp{padding:100px 22px;max-width:1000px;margin:0 auto;text-align:center}
.cmp h2{font-size:clamp(36px,4.6vw,56px);font-weight:700;letter-spacing:-.04em;margin-bottom:50px}
.cmp .g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px}
.cmp .g>div{padding:0 10px}
.cmp .sw{width:56px;height:56px;border-radius:50%;margin:0 auto 18px;background:#f5f5f7;display:grid;place-items:center;font-weight:700;font-size:15px}
.cmp .hot .sw{background:#f2501c;color:#fff}
.cmp h4{font-size:24px;letter-spacing:-.02em}
.cmp .p{font-size:20px;margin:6px 0 18px;color:#424245}
.cmp li{list-style:none;padding:12px 0;border-top:1px solid #e8e8ed;font-size:15px;color:#424245}
.cmp a{display:inline-block;margin-top:16px;background:#f2501c;color:#fff;border-radius:99px;padding:9px 18px;font-size:15px}
.q{background:#000;color:#f5f5f7;padding:110px 22px;text-align:center}
.q p{font-size:clamp(26px,3.4vw,44px);font-weight:600;letter-spacing:-.03em;line-height:1.2;max-width:900px;margin:0 auto}
.q span{display:block;margin-top:24px;color:#a1a1a6;font-size:17px}
.faq{max-width:820px;margin:0 auto;padding:100px 22px}
.faq h2{font-size:clamp(32px,4vw,48px);font-weight:700;letter-spacing:-.04em;margin-bottom:30px;text-align:center}
.faq details{border-bottom:1px solid #d2d2d7;padding:20px 0}.faq summary{font-size:19px;font-weight:600;cursor:pointer;list-style:none;display:flex;justify-content:space-between}.faq summary::after{content:'+';color:#f2501c;font-size:24px;line-height:1}.faq details[open] summary::after{content:'−'}.faq p{margin-top:10px;color:#6e6e73;font-size:17px}
.end{text-align:center;padding:40px 22px 110px}
.end h2{font-size:clamp(40px,6vw,80px);font-weight:700;letter-spacing:-.045em;line-height:1.04}
.end h2 span{color:#f2501c}
footer{background:#f5f5f7;font-size:12px;color:#6e6e73;padding:20px 22px}
footer .in{max-width:1000px;margin:0 auto;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
@media(max-width:820px){.nav nav{display:none}.pair{grid-template-columns:minmax(0,1fr)}.pair .tile{min-height:520px}.nums .g,.cmp .g{grid-template-columns:minmax(0,1fr)}}`;
  const body = `<div class="nav"><div class="in">${logo()}<nav><a href="#bot">Боты</a><a href="#crm">CRM</a><a href="#web">Веб-сервисы</a><a href="#price">Цены</a><a href="#faq">Поддержка</a></nav><a class="b" href="${TG}">Написать</a></div></div>
<section class="tile hero"><div class="ey rv">Финес Студио</div><h1 class="rv d1">Тонкая работа.</h1><h3 class="rv d2">Для вашего бизнеса. Боты, CRM и веб-сервисы, к которым хочется прикасаться.</h3><div class="lk rv d3"><a class="p" href="${TG}">Обсудить проект</a><a href="#bot">Подробнее ›</a></div><div class="orb rv d4"><svg viewBox="0 0 20 20"><g style="transform-origin:10px 10px;animation:fspin 24s linear infinite"><circle cx="7" cy="10" r="6" fill="#f2501c"/><circle cx="13" cy="10" r="6" fill="#ffc21a"/></g></svg></div></section>
<div class="pair"><section class="tile rv" id="bot"><h2>Telegram-бот</h2><h3>Принимает заказы. Пока вы спите.</h3><div class="lk"><a href="${TG}">Заказать ›</a><a href="#price">От 40 000 ₽ ›</a></div><div class="dev"><div><p class="a">Добрый вечер! Что будете заказывать?</p><p class="u">Капучино 0,4 и круассан</p><p class="a">Принято. Готово через 7 минут ☕ Оплатить по СБП?</p><p class="u">Да</p><p class="a">Оплачено ✓ Ждём вас!</p></div></div></section>
<section class="tile dark rv d1" id="crm"><h2>CRM-система</h2><h3>Весь бизнес. На одном экране.</h3><div class="lk"><a href="${TG}">Заказать ›</a><a href="#price">От 120 000 ₽ ›</a></div><div class="dash"><div><span>Выручка<b>2,8 млн</b></span><span>Заявки<b>312</b></span><span>Конверсия<b>27%</b></span><i></i></div></div></section>
<section class="tile rv" id="web"><h2>Веб-сервис</h2><h3>Личный кабинет. Каталог. Запись.</h3><div class="lk"><a href="${TG}">Заказать ›</a></div><div class="big">×2,4</div></section>
<section class="tile dark rv d1"><h2>Интеграции</h2><h3>1С, amoCRM, оплата. Всё связано.</h3><div class="lk"><a href="${TG}">Заказать ›</a></div><div class="big">−70%</div></section></div>
<section class="nums"><h2 class="rv">Результат. В цифрах.</h2><div class="g">${C.cases.slice(0, 3).map((c, i) => `<div class="rv d${i}"><b>${c.m}</b><span>${c.ml}<br>${c.c}</span></div>`).join('')}</div></section>
<section class="cmp" id="price"><h2 class="rv">Какой формат подойдёт вам?</h2><div class="g">${C.plans.map((p, i) => `<div class="rv d${i}${p.hot ? ' hot' : ''}"><div class="sw">${['S', 'M', 'L'][i]}</div><h4>${p.t}</h4><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul><a href="${TG}">Выбрать</a></div>`).join('')}</div></section>
<section class="q"><p class="rv">«${C.reviews[1].q}»</p><span class="rv d1">${C.reviews[1].n}, ${C.reviews[1].r}</span></section>
<section class="faq" id="faq"><h2 class="rv">Вопросы и ответы</h2>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</section>
<section class="end"><h2 class="rv">Ваш проект.<br><span>Наша тонкая работа.</span></h2><div class="lk rv d1" style="display:flex;justify-content:center;margin-top:30px;font-size:19px"><a href="${TG}" style="background:#f2501c;color:#fff;border-radius:99px;padding:12px 26px">Написать в ${TGH}</a></div></section>
<footer><div class="in"><span>© 2026 Финес Студио. Все права защищены.</span><span>Боты · CRM · Веб-сервисы · Интеграции · Сайты</span></div></footer>`;
  return page({ n: 21, title: this.title, fonts: ['Inter Tight'], css, body });
} });

// 22 — аля Linear
L.push({ n: 22, title: 'Тёмный продуктовый (аля Linear)', idea: 'Почти чёрный фон, тонкие серые границы, градиентный текст, свечения и точные микро-детали; для техно-аудитории и стартапов', build() {
  const css = `
body{font-family:'Inter Tight',sans-serif;background:#08090a;color:#f7f8f8;font-size:16px}
.w{max-width:1180px;margin:0 auto;padding:0 24px}
header{position:sticky;top:0;z-index:20;background:rgba(8,9,10,.7);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.06)}
header .w{display:flex;align-items:center;justify-content:space-between;height:64px}
header .flogo{--lg:24px;color:#f7f8f8}
header nav{display:flex;gap:28px;font-size:14px;color:#8a8f98}header nav a:hover{color:#f7f8f8}
.b{display:inline-flex;align-items:center;gap:8px;background:#f7f8f8;color:#08090a;border-radius:8px;padding:9px 16px;font-size:14px;font-weight:600;transition:.2s}
.b:hover{background:#fff;box-shadow:0 0 0 4px rgba(255,255,255,.1)}
.b.g{background:rgba(255,255,255,.06);color:#f7f8f8;border:1px solid rgba(255,255,255,.1)}
.hero{padding:120px 0 70px;position:relative}
.hero::before{content:'';position:absolute;left:50%;top:-200px;width:1100px;height:700px;transform:translateX(-50%);background:radial-gradient(ellipse at center,rgba(242,80,28,.22),transparent 60%);pointer-events:none}
.pill{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);border-radius:99px;padding:6px 14px;font-size:13px;color:#b4bcd0}
.pill i{width:6px;height:6px;border-radius:50%;background:#ffc21a;box-shadow:0 0 10px #ffc21a}
.hero h1{font-size:clamp(46px,7vw,92px);letter-spacing:-.055em;line-height:1;font-weight:600;margin:24px 0 22px;max-width:920px;background:linear-gradient(180deg,#fff 30%,rgba(255,255,255,.45));-webkit-background-clip:text;background-clip:text;color:transparent}
.hero p{font-size:20px;color:#8a8f98;max-width:600px;line-height:1.5;margin-bottom:34px}
.hero p b{color:#f7f8f8;font-weight:500}
.hero .r{display:flex;gap:10px;flex-wrap:wrap}
.app{margin-top:70px;border:1px solid rgba(255,255,255,.08);border-radius:16px;background:linear-gradient(180deg,#121316,#0b0c0e);box-shadow:0 0 0 1px rgba(0,0,0,.5),0 40px 120px -40px rgba(242,80,28,.35);overflow:hidden;position:relative}
.app::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 60%,#08090a);pointer-events:none}
.app .hd{display:flex;gap:12px;padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.06);font-size:13px;color:#8a8f98}
.app .hd b{color:#f7f8f8;font-weight:500}
.row{display:grid;grid-template-columns:90px minmax(0,1fr) 120px 110px;gap:16px;padding:12px 18px;border-bottom:1px solid rgba(255,255,255,.04);font-size:14px;align-items:center}
.row:hover{background:rgba(255,255,255,.02)}
.row .id{color:#5e636b;font-family:'JetBrains Mono';font-size:12.5px}
.row .st{display:inline-flex;gap:6px;align-items:center;color:#8a8f98;font-size:13px}
.row .st i{width:10px;height:10px;border-radius:50%;border:2px solid #5e636b}
.row .st.ip i{border-color:#ffc21a;background:conic-gradient(#ffc21a 50%,transparent 0)}
.row .st.dn i{border-color:#f2501c;background:#f2501c}
.row .tg{font-size:12px;border:1px solid rgba(255,255,255,.1);border-radius:99px;padding:2px 8px;color:#b4bcd0;justify-self:start}
.logos{display:flex;justify-content:space-between;gap:30px;flex-wrap:wrap;padding:40px 0;color:#5e636b;font-weight:600;font-size:19px;border-bottom:1px solid rgba(255,255,255,.06)}
.sec{padding:120px 0;border-bottom:1px solid rgba(255,255,255,.06)}
.sec .k{font-size:14px;color:#f2501c;margin-bottom:16px;display:flex;align-items:center;gap:8px}
.sec h2{font-size:clamp(34px,4.6vw,60px);letter-spacing:-.05em;line-height:1.02;font-weight:600;max-width:760px;margin-bottom:18px}
.sec .sub{font-size:18px;color:#8a8f98;max-width:560px;margin-bottom:56px}
.bent{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.card{border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:28px;background:linear-gradient(180deg,rgba(255,255,255,.03),transparent);position:relative;overflow:hidden;transition:border-color .3s}
.card:hover{border-color:rgba(242,80,28,.5)}
.card::before{content:'';position:absolute;inset:-1px;background:radial-gradient(400px circle at var(--x,50%) var(--y,0%),rgba(242,80,28,.12),transparent 40%);opacity:0;transition:opacity .3s;pointer-events:none}
.card:hover::before{opacity:1}
.card.w2{grid-column:span 2}
.card h3{font-size:20px;font-weight:600;letter-spacing:-.02em;margin-bottom:8px}
.card p{color:#8a8f98;font-size:15px;line-height:1.55}
.card .pr{margin-top:22px;font-family:'JetBrains Mono';font-size:13px;color:#b4bcd0}
.card .vz{height:120px;margin:-6px -6px 22px;border-radius:10px;background:radial-gradient(circle at 30% 50%,rgba(242,80,28,.35),transparent 50%),radial-gradient(circle at 70% 50%,rgba(255,194,26,.25),transparent 50%),#0e0f11;border:1px solid rgba(255,255,255,.05)}
.cs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.06);border-radius:16px;overflow:hidden}
.cs>div{background:#08090a;padding:32px}
.cs .m{font-size:52px;font-weight:600;letter-spacing:-.05em;background:linear-gradient(180deg,#fff,rgba(255,255,255,.5));-webkit-background-clip:text;background-clip:text;color:transparent}
.cs .l{color:#f2501c;font-size:14px;margin:4px 0 14px}
.cs p{color:#8a8f98;font-size:14.5px}
.steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
.steps>div{border-top:1px solid rgba(255,255,255,.12);padding-top:20px}
.steps .n{font-family:'JetBrains Mono';font-size:12.5px;color:#5e636b}
.steps h4{font-size:17px;font-weight:600;margin:10px 0 6px}.steps p{font-size:14px;color:#8a8f98}
.pl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.pl .hot{border-color:rgba(242,80,28,.6);box-shadow:0 0 60px -20px rgba(242,80,28,.5)}
.pl .p{font-size:36px;font-weight:600;letter-spacing:-.04em;margin:14px 0 4px}
.pl li{list-style:none;color:#b4bcd0;font-size:14.5px;padding:7px 0;border-top:1px solid rgba(255,255,255,.05)}
.pl ul{margin:20px 0}
.end{padding:140px 0;text-align:center;position:relative}
.end::before{content:'';position:absolute;left:50%;bottom:0;width:900px;height:500px;transform:translateX(-50%);background:radial-gradient(ellipse at bottom,rgba(255,194,26,.14),transparent 60%);pointer-events:none}
.end h2{font-size:clamp(40px,6vw,80px);letter-spacing:-.055em;line-height:1;font-weight:600;margin-bottom:30px}
footer{border-top:1px solid rgba(255,255,255,.06);padding:30px 0;font-size:13px;color:#5e636b}
footer .w{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
@media(max-width:900px){header nav{display:none}.bent,.cs,.pl{grid-template-columns:minmax(0,1fr)}.card.w2{grid-column:auto}.steps{grid-template-columns:minmax(0,1fr)}.row{grid-template-columns:70px minmax(0,1fr)}.row .tg,.row .st{display:none}.hero{padding:80px 0 50px}.sec{padding:80px 0}}`;
  const tasks = [['FIN-241', 'Бот приёма заказов для «Зерно»', 'dn', 'Готово', 'бот'], ['FIN-238', 'Синхронизация остатков с 1С', 'dn', 'Готово', 'интеграция'], ['FIN-252', 'CRM: воронка оптовых сделок', 'ip', 'В работе', 'crm'], ['FIN-255', 'Mini App каталога «Грядка»', 'ip', 'В работе', 'mini app'], ['FIN-260', 'Личный кабинет ученика Speak Up', '', 'Бэклог', 'веб'], ['FIN-261', 'Ваш проект', '', 'Скоро', 'новое']];
  const body = `<header><div class="w">${logo(true)}<nav><a href="#s">Услуги</a><a href="#c">Кейсы</a><a href="#m">Метод</a><a href="#p">Цены</a></nav><a class="b" href="${TG}">Написать →</a></div></header>
<div class="w"><section class="hero"><span class="pill rv"><i></i>Свободно 2 слота на декабрь</span><h1 class="rv d1">Тонкая работа для вашего бизнеса.</h1><p class="rv d2"><b>Финес Студио</b> проектирует и строит Telegram-ботов, CRM и веб-сервисы для малого бизнеса. Быстро, предсказуемо и с вниманием к каждой детали.</p><div class="r rv d3"><a class="b" href="${TG}">Начать проект</a><a class="b g" href="#c">Смотреть кейсы</a></div>
<div class="app rv d4"><div class="hd"><b>Проекты студии</b><span>· Активные</span><span style="margin-left:auto">${C.cases.length} в этом квартале</span></div>${tasks.map(t => `<div class="row"><span class="id">${t[0]}</span><span>${t[1]}</span><span class="st ${t[2]}"><i></i>${t[3]}</span><span class="tg">${t[4]}</span></div>`).join('')}</div></section>
<div class="logos"><span>Зерно</span><span>СтройДвор</span><span>Лак</span><span>Гараж 24</span><span>Speak Up</span><span>Грядка</span></div>
<section class="sec" id="s"><div class="k rv">● Услуги</div><h2 class="rv">Создано для бизнеса, который ценит своё время.</h2><p class="sub rv">Пять направлений, один стандарт: продумано, протестировано, задокументировано.</p>
<div class="bent">${C.services.map((s, i) => `<div class="card rv d${i % 3}${i === 0 || i === 4 ? ' w2' : ''}">${i === 0 ? '<div class="vz"></div>' : ''}<h3>${s.t}</h3><p>${s.s}</p><div class="pr">${s.p} · ${s.d}</div></div>`).join('')}<div class="card rv"><h3>Поддержка</h3><p>Мониторинг, бэкапы и доработки. Отвечаем в чате в течение часа.</p><div class="pr">от 5 000 ₽ / мес</div></div></div></section>
<section class="sec" id="c"><div class="k rv">● Кейсы</div><h2 class="rv">Измеримый эффект — в каждом проекте.</h2><p class="sub rv">Метрики клиентов через 1–3 месяца после запуска.</p><div class="cs">${C.cases.map(c => `<div class="rv"><div class="m">${c.m}</div><div class="l">${c.ml}</div><p><b style="color:#f7f8f8;font-weight:500">${c.c}.</b> ${c.r}</p></div>`).join('')}</div></section>
<section class="sec" id="m"><div class="k rv">● Метод</div><h2 class="rv">Предсказуемый процесс. Без тишины.</h2><p class="sub rv">Демо каждую неделю, цена фиксируется до старта.</p><div class="steps">${C.steps.map((s, i) => `<div class="rv d${i}"><div class="n">0${i + 1} — ${s.d}</div><h4>${s.t}</h4><p>${s.s}</p></div>`).join('')}</div></section>
<section class="sec" id="p"><div class="k rv">● Цены</div><h2 class="rv">Простые форматы.</h2><p class="sub rv">Точную сумму называем после бесплатного разбора.</p><div class="pl">${C.plans.map((p, i) => `<div class="card rv d${i}${p.hot ? ' hot' : ''}"><h3>${p.t}</h3><p>${p.for}</p><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul><a class="b${p.hot ? '' : ' g'}" href="${TG}">Обсудить</a></div>`).join('')}</div></section>
<section class="end"><h2 class="rv">Готовы начать?</h2><div class="rv d1" style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a class="b" href="${TG}">Написать ${TGH}</a><a class="b g" href="#p">Посмотреть цены</a></div></section></div>
<footer><div class="w"><span>© 2026 Финес Студио</span><span>${C.slogan}</span></div></footer>`;
  const js = `document.querySelectorAll('.card').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--x',(e.clientX-r.left)+'px');c.style.setProperty('--y',(e.clientY-r.top)+'px')}));`;
  return page({ n: 22, title: this.title, fonts: ['Inter Tight', 'JetBrains Mono'], css, body, js });
} });

// 23 — аля Stripe
L.push({ n: 23, title: 'Наклонный градиент (аля Stripe)', idea: 'Яркая наклонная градиентная «лента» в hero, деловая типографика, блоки с кодом и схемами интеграций; солидно и технологично для B2B', build() {
  const css = `
body{font-family:'Manrope',sans-serif;background:#fff;color:#0a2540;font-size:17px}
.w{max-width:1140px;margin:0 auto;padding:0 24px}
.top{position:relative;overflow:hidden;padding-bottom:120px}
.grad{position:absolute;inset:-40% 0 auto 0;height:1350px;transform:skewY(-7deg);transform-origin:0;background:linear-gradient(120deg,#f2501c 0%,#ff7a3d 25%,#ffc21a 50%,#ff9ab0 75%,#a960ee 100%);background-size:200% 200%;animation:gm 14s ease infinite;z-index:-1}
@keyframes gm{50%{background-position:100% 50%}}
header{display:flex;align-items:center;justify-content:space-between;gap:30px;padding:24px 0;color:#fff}
header .flogo{color:#fff}
header nav{display:flex;gap:30px;font-weight:600;font-size:15.5px}
header nav a{opacity:.9}header nav a:hover{opacity:1}
.btn{display:inline-flex;align-items:center;gap:6px;background:#0a2540;color:#fff;border-radius:99px;padding:11px 20px;font-weight:700;font-size:15.5px;transition:.2s}
.btn:hover{background:#1a3a5e}
.btn.w{background:rgba(255,255,255,.85);color:#0a2540}
.btn.w:hover{background:rgba(255,255,255,.4)}
.btn.o{background:#f2501c}.btn.o:hover{background:#d9400f}
.hero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:40px;padding:70px 0 0;align-items:center}
.hero h1{font-size:clamp(44px,6.4vw,88px);letter-spacing:-.045em;line-height:1;font-weight:800;color:#0a2540;mix-blend-mode:multiply}
.hero p{font-size:20px;color:#0a2540;font-weight:500;margin:26px 0 30px;max-width:520px;line-height:1.5}
.hero .r{display:flex;gap:12px;flex-wrap:wrap}
.ph{background:#fff;border-radius:16px;box-shadow:0 50px 100px -20px rgba(50,50,93,.25),0 30px 60px -30px rgba(0,0,0,.3);padding:22px;max-width:420px;justify-self:end;width:100%}
.ph h5{font-size:13px;color:#697386;font-weight:600;margin-bottom:6px}
.ph .amt{font-size:34px;font-weight:800;letter-spacing:-.03em}
.ph .ln{display:flex;justify-content:space-between;padding:10px 0;border-top:1px solid #e6ebf1;font-size:14.5px}
.ph .ln span{color:#697386}
.ph .pay{margin-top:14px;background:#0a2540;color:#fff;border-radius:8px;padding:12px;text-align:center;font-weight:700}
.ph .ok{display:flex;gap:10px;align-items:center;margin-top:12px;font-size:13.5px;color:#1a9c5b;font-weight:600}
.stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:30px;padding:70px 0;border-bottom:1px solid #e6ebf1}
.stats b{display:block;font-size:40px;letter-spacing:-.04em;font-weight:800;border-left:2px solid #f2501c;padding-left:14px}
.stats span{display:block;padding-left:16px;color:#425466;font-size:15px}
.sec{padding:110px 0}
.sec .k{color:#f2501c;font-weight:800;font-size:16px;margin-bottom:12px}
.sec h2{font-size:clamp(32px,4vw,50px);letter-spacing:-.035em;line-height:1.08;font-weight:800;max-width:680px;margin-bottom:18px}
.sec .sub{color:#425466;max-width:600px;margin-bottom:54px;line-height:1.6}
.svc{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:34px}
.svc>div{border-left:1px solid #e6ebf1;padding-left:18px}
.svc .ic{width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#f2501c,#ffc21a);margin-bottom:16px}
.svc h3{font-size:18px;font-weight:800;margin-bottom:8px}.svc p{color:#425466;font-size:15px;line-height:1.55}
.svc a{display:inline-block;margin-top:12px;color:#f2501c;font-weight:700;font-size:15px}
.dark{background:#0a2540;color:#fff;padding:110px 0;position:relative;overflow:hidden}
.dark h2{color:#fff}.dark .sub{color:#adbdcc}
.dark .g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:50px;align-items:center}
.code{background:#1a2c45;border-radius:12px;box-shadow:0 30px 60px -20px rgba(0,0,0,.5);overflow:hidden;font-family:'JetBrains Mono';font-size:13.5px;line-height:1.75}
.code .t{display:flex;gap:16px;padding:10px 16px;background:#152338;font-size:12.5px;color:#7a8ca5}.code .t b{color:#fff;font-weight:500}
.code pre{padding:18px 20px;overflow-x:auto;color:#d8e0ea;white-space:pre-wrap}
.code .k{color:#ff9ab0}.code .s{color:#ffc21a}.code .c{color:#6d84a3}.code .f{color:#7fd3ff}
.flow{display:flex;flex-direction:column;gap:14px}
.flow>div{display:flex;gap:16px;align-items:flex-start}
.flow i{font-style:normal;flex:none;width:34px;height:34px;border-radius:50%;background:rgba(242,80,28,.2);color:#ffc21a;display:grid;place-items:center;font-weight:800;font-size:14px}
.flow b{display:block;font-size:17px}.flow p{color:#adbdcc;font-size:15px}
.cases{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.cases>div{border-radius:14px;padding:28px;background:#f6f9fc;transition:.25s}
.cases>div:hover{transform:translateY(-4px);box-shadow:0 30px 60px -30px rgba(50,50,93,.3)}
.cases .m{font-size:46px;font-weight:800;letter-spacing:-.04em;color:#f2501c}
.cases b{display:block;margin:6px 0 10px}.cases p{color:#425466;font-size:15px}
.pl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.pl>div{border:1px solid #e6ebf1;border-radius:14px;padding:30px}
.pl .hot{background:#0a2540;color:#fff;border-color:#0a2540}
.pl .p{font-size:34px;font-weight:800;letter-spacing:-.03em;margin:12px 0 16px}
.pl li{list-style:none;padding:6px 0;font-size:15px}.pl li::before{content:'✓ ';color:#f2501c;font-weight:800}
.end{padding:110px 0;text-align:left;display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:40px;align-items:center;border-top:1px solid #e6ebf1}
.end h2{font-size:clamp(32px,4vw,50px);letter-spacing:-.035em;line-height:1.08;font-weight:800}
footer{background:#f6f9fc;padding:40px 0;font-size:14px;color:#697386}
footer .w{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
@media(max-width:900px){header nav{display:none}.hero,.dark .g,.end{grid-template-columns:minmax(0,1fr)}.ph{justify-self:start}.svc{grid-template-columns:repeat(2,minmax(0,1fr))}.cases,.pl{grid-template-columns:minmax(0,1fr)}.stats{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:560px){.svc{grid-template-columns:minmax(0,1fr)}}`;
  const body = `<div class="top"><div class="grad"></div><div class="w"><header>${logo()}<nav><a href="#s">Услуги</a><a href="#d">Интеграции</a><a href="#c">Кейсы</a><a href="#p">Цены</a></nav><a class="btn w" href="${TG}">Написать ›</a></header>
<section class="hero"><div><h1 class="rv">Тонкая работа для вашего бизнеса</h1><p class="rv d1">Финес Студио строит ботов, CRM и веб-сервисы, которые принимают заказы, оплаты и заявки без участия менеджера. Для малого бизнеса, который хочет расти без раздутого штата.</p><div class="r rv d2"><a class="btn" href="${TG}">Начать проект ›</a><a class="btn w" href="#c" style="color:#0a2540">Смотреть кейсы ›</a></div></div>
<div class="ph rv d3"><h5>Заказ через бота · Кофейня «Зерно»</h5><div class="amt">640,00 ₽</div><div class="ln"><span>Капучино 0,4 · овсяное</span>390 ₽</div><div class="ln"><span>Круассан миндальный</span>250 ₽</div><div class="ln"><span>Самовывоз</span>через 7 мин</div><div class="pay">Оплатить через СБП</div><div class="ok">✓ Заказ передан бариста и в 1С</div></div></section></div></div>
<div class="w"><div class="stats">${C.stats.map(s => `<div class="rv"><b>${s.v}</b><span>${s.l}</span></div>`).join('')}</div>
<section class="sec" id="s"><div class="k rv">Услуги</div><h2 class="rv">Инфраструктура для роста малого бизнеса</h2><p class="sub rv">Модули, которые можно заказать отдельно и связать между собой: от бота на 40 тысяч до полной CRM.</p><div class="svc">${C.services.slice(0, 4).map((s, i) => `<div class="rv d${i}"><div class="ic"></div><h3>${s.t}</h3><p>${s.s}</p><a href="${TG}">${s.p} ›</a></div>`).join('')}</div></section></div>
<section class="dark" id="d"><div class="w g"><div><div class="k rv" style="color:#ffc21a;font-weight:800;margin-bottom:12px">Интеграции</div><h2 class="rv" style="font-size:clamp(32px,4vw,50px);letter-spacing:-.035em;line-height:1.08;font-weight:800;margin-bottom:18px">Связываем всё, что у вас уже есть</h2><p class="sub rv" style="margin-bottom:30px">1С, amoCRM, Битрикс24, ЮKassa, Google Таблицы, МойСклад. Данные идут сами, менеджер больше ничего не переносит руками.</p><div class="flow">${C.steps.slice(0, 4).map((s, i) => `<div class="rv d${i}"><i>${i + 1}</i><div><b>${s.t}</b><p>${s.s}</p></div></div>`).join('')}</div></div>
<div class="code rv d2"><div class="t"><b>order.webhook.ts</b><span>1c.sync.ts</span></div><pre><span class="c">// заказ из бота сразу уходит в 1С и CRM</span>
<span class="k">bot</span>.<span class="f">on</span>(<span class="s">'order.paid'</span>, <span class="k">async</span> (order) =&gt; {
  <span class="k">await</span> onec.<span class="f">createSale</span>(order);
  <span class="k">await</span> crm.<span class="f">moveDeal</span>(order.dealId, <span class="s">'Оплачено'</span>);
  <span class="k">await</span> notify.<span class="f">barista</span>(<span class="s">\`Заказ №\${order.id}\`</span>);
});
<span class="c">// результат: −70% ручной работы</span></pre></div></div></section>
<div class="w"><section class="sec" id="c"><div class="k rv">Кейсы</div><h2 class="rv">Компании, которые выросли с нами</h2><p class="sub rv">Цифры спустя 1–3 месяца после запуска.</p><div class="cases">${C.cases.slice(0, 6).map((c, i) => `<div class="rv d${i % 3}"><div class="m">${c.m}</div><b>${c.ml}</b><p>${c.c} — ${c.t.toLowerCase()}.</p></div>`).join('')}</div></section>
<section class="sec" id="p" style="padding-top:0"><div class="k rv">Цены</div><h2 class="rv">Прозрачная стоимость</h2><p class="sub rv">Фиксируем в договоре. 50% на старте, 50% после приёмки.</p><div class="pl">${C.plans.map((p, i) => `<div class="rv d${i}${p.hot ? ' hot' : ''}"><b>${p.t}</b><div style="opacity:.7;font-size:15px">${p.for}</div><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul></div>`).join('')}</div></section>
<section class="end"><h2 class="rv">Готовы начать? Расскажите о задаче — пришлём план и смету.</h2><div class="rv d1" style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn o" href="${TG}">Написать ${TGH} ›</a><a class="btn" href="#s">Услуги ›</a></div></section></div>
<footer><div class="w"><span>© 2026 Финес Студио</span><span>${C.slogan}</span></div></footer>`;
  return page({ n: 23, title: this.title, fonts: ['Manrope', 'JetBrains Mono'], css, body });
} });

// 24 — Ретро-пиксель
L.push({ n: 24, title: 'Ретро-пиксель', idea: '8-битная эстетика: пиксельный шрифт, окна в стиле старых ОС, «уровни» вместо этапов и «персонажи» вместо услуг; запоминается и выделяется среди конкурентов', build() {
  const css = `
body{font-family:'Press Start 2P',monospace;background:#1b1036;color:#fff6d5;font-size:12px;line-height:1.8;image-rendering:pixelated}
.sky{position:fixed;inset:0;z-index:-1;background:linear-gradient(#1b1036,#3b1757 60%,#f2501c 100%)}
.sky::after{content:'';position:absolute;inset:0;background-image:radial-gradient(#fff 1px,transparent 1.5px),radial-gradient(#ffc21a 1px,transparent 1.5px);background-size:60px 60px,90px 90px;background-position:0 0,30px 40px;opacity:.5}
.w{max-width:1100px;margin:0 auto;padding:0 20px}
.txt{font-family:'Onest',sans-serif;font-size:16px;line-height:1.55}
header{display:flex;justify-content:space-between;align-items:center;padding:20px 0}
header .flogo{color:#fff6d5}
.px{display:inline-block;background:#f2501c;color:#fff;padding:14px 18px;box-shadow:inset -4px -4px 0 #a8300a,inset 4px 4px 0 #ff8a5c,0 0 0 4px #1b1036,0 0 0 8px #fff6d5;transition:transform .1s;font-size:11px}
.px:hover{transform:translate(2px,2px)}
.px:active{box-shadow:inset 4px 4px 0 #a8300a,0 0 0 4px #1b1036,0 0 0 8px #fff6d5}
.px.y{background:#ffc21a;color:#1b1036;box-shadow:inset -4px -4px 0 #b88700,inset 4px 4px 0 #ffe27a,0 0 0 4px #1b1036,0 0 0 8px #fff6d5}
.hero{text-align:center;padding:60px 0 80px}
.hero .ins{color:#ffc21a;animation:bl 1s steps(2) infinite;margin-bottom:26px;display:block}
@keyframes bl{50%{opacity:0}}
.hero h1{font-size:clamp(22px,4.4vw,52px);line-height:1.35;text-shadow:4px 4px 0 #f2501c,8px 8px 0 #1b1036}
.hero p{max-width:640px;margin:28px auto 36px;color:#e6d9ff}
.hero .r{display:flex;gap:28px;justify-content:center;flex-wrap:wrap}
.sprite{width:96px;height:96px;margin:0 auto 30px;display:grid;grid-template-columns:repeat(8,1fr);animation:bob 1.2s steps(2) infinite}
.sprite i{display:block}
@keyframes bob{50%{transform:translateY(-6px)}}
.win{background:#fff6d5;color:#1b1036;box-shadow:0 0 0 4px #1b1036,8px 8px 0 4px rgba(0,0,0,.4);margin-bottom:50px}
.win .tb{background:#f2501c;color:#fff;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;font-size:11px}
.win .tb span{display:flex;gap:6px}.win .tb span i{width:16px;height:16px;background:#fff6d5;box-shadow:inset -2px -2px 0 #bbb;display:block}
.win .bd{padding:26px}
.win h2{font-size:clamp(16px,2.2vw,24px);line-height:1.4;margin-bottom:20px}
.chars{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
.chars>div{border:4px solid #1b1036;padding:16px 12px;background:#fff;transition:transform .15s}
.chars>div:hover{transform:translateY(-6px);background:#ffe9a8}
.chars .av{height:60px;display:grid;place-items:center;font-size:30px;margin-bottom:12px;background:#1b1036}
.chars h3{font-size:10.5px;line-height:1.5;margin-bottom:10px}
.chars .st{font-size:9px;line-height:2}
.chars .st b{display:inline-block;height:8px;background:#f2501c;vertical-align:middle;margin-left:6px}
.chars .txt{font-size:13.5px;margin-top:8px}
.chars .pr{margin-top:10px;font-size:10px;color:#f2501c}
.lv{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:0}
.lv>div{padding:16px;border-right:4px dashed #1b1036;position:relative}
.lv>div:last-child{border:0}
.lv .n{display:inline-block;background:#1b1036;color:#ffc21a;padding:6px 10px;margin-bottom:12px;font-size:10px}
.lv h3{font-size:11px;line-height:1.5;margin-bottom:8px}
.score{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.score>div{background:#1b1036;color:#fff6d5;padding:20px}
.score .m{font-size:clamp(20px,2.6vw,30px);color:#ffc21a;margin-bottom:10px}
.score h3{font-size:10px;line-height:1.6;color:#ff8a5c}
.shop{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.shop>div{border:4px solid #1b1036;padding:20px;background:#fff}
.shop .hot{background:#ffc21a}
.shop .p{font-size:16px;margin:12px 0;color:#f2501c}
.shop .hot .p{color:#1b1036}
.shop li{list-style:none;font-family:'Onest';font-size:14px;padding:3px 0}.shop li::before{content:'▶ ';color:#f2501c;font-size:10px}
.faq details{border-bottom:4px solid #1b1036;padding:14px 0}.faq summary{cursor:pointer;font-size:11px;line-height:1.6}.faq .txt{margin-top:8px}
.over{text-align:center;padding:40px 0 80px}
.over h2{font-size:clamp(24px,5vw,56px);color:#ffc21a;text-shadow:4px 4px 0 #f2501c;margin-bottom:20px;line-height:1.3}
.over p{margin-bottom:36px}
footer{text-align:center;padding:0 0 40px;font-size:9px;color:#e6d9ff}
@media(max-width:900px){.chars{grid-template-columns:repeat(2,minmax(0,1fr))}.lv{grid-template-columns:minmax(0,1fr)}.lv>div{border-right:0;border-bottom:4px dashed #1b1036}.score,.shop{grid-template-columns:minmax(0,1fr)}.win .bd{padding:18px}}
@media(max-width:480px){.chars{grid-template-columns:minmax(0,1fr)}body{font-size:10px}}`;
  const P = '................' + '..oo....yy......' + '.oooo..yyyy.....' + '.oooooyyyyyy....' + '.ooooyyyyyy.....' + '..oooyyyy.......' + '...ooyy.........' + '................';
  const pix = (() => { const map = ['..oo..yy', '.oooyyyy', 'ooooyyyy', 'oooyyyyy', 'ooooyyyy', '.oooyyyy', '..oo..yy', '........']; return map.map(r => [...r].map(c => `<i style="background:${c === 'o' ? '#f2501c' : c === 'y' ? '#ffc21a' : 'transparent'}"></i>`).join('')).join(''); })();
  const em = ['🤖', '📊', '🌐', '🔌', '🖥️'];
  const body = `<div class="sky"></div><div class="w">
<header>${logo(true)}<a class="px y" href="${TG}">ВОЙТИ</a></header>
<section class="hero"><div class="sprite">${pix}</div><span class="ins">ВСТАВЬТЕ МОНЕТУ ▶</span><h1>ТОНКАЯ РАБОТА<br>ДЛЯ ВАШЕГО БИЗНЕСА</h1><p class="txt">Финес Студио проходит за вас самые скучные уровни бизнеса: заявки, записи, заказы и отчёты. Боты, CRM и веб-сервисы без багов и читов.</p><div class="r"><a class="px" href="${TG}">▶ НАЧАТЬ ИГРУ</a><a class="px y" href="#c">ВЫБРАТЬ ГЕРОЯ</a></div></section>
<section class="win rv" id="c"><div class="tb">ВЫБЕРИТЕ ГЕРОЯ.EXE<span><i></i><i></i></span></div><div class="bd"><h2>5 ГЕРОЕВ ДЛЯ ВАШЕЙ КОМАНДЫ</h2><div class="chars">${C.services.map((s, i) => `<div><div class="av">${em[i]}</div><h3>${s.t.toUpperCase()}</h3><div class="st">СКОР.<b style="width:${[40, 20, 15, 35, 30][i]}px"></b><br>СИЛА<b style="width:${[25, 45, 45, 30, 25][i]}px"></b></div><p class="txt">${s.s.split('.')[0]}.</p><div class="pr">${s.p.toUpperCase()}</div></div>`).join('')}</div></div></section>
<section class="win rv"><div class="tb">УРОВНИ.EXE<span><i></i><i></i></span></div><div class="bd"><h2>5 УРОВНЕЙ ДО ПОБЕДЫ</h2><div class="lv">${C.steps.map((s, i) => `<div><span class="n">LVL ${i + 1}</span><h3>${s.t.toUpperCase()}</h3><p class="txt" style="font-size:14px">${s.s}</p><p style="font-size:9px;margin-top:8px;color:#f2501c">${s.d.toUpperCase()}</p></div>`).join('')}</div></div></section>
<section class="win rv"><div class="tb">HIGH SCORES<span><i></i><i></i></span></div><div class="bd"><h2>РЕКОРДЫ КЛИЕНТОВ</h2><div class="score">${C.cases.map(c => `<div><div class="m">${c.m}</div><h3>${c.ml.toUpperCase()}</h3><p class="txt" style="font-size:14px;margin-top:8px">${c.c}</p></div>`).join('')}</div></div></section>
<section class="win rv"><div class="tb">МАГАЗИН.EXE<span><i></i><i></i></span></div><div class="bd"><h2>КУПИТЬ АПГРЕЙД</h2><div class="shop">${C.plans.map(p => `<div class="${p.hot ? 'hot' : ''}"><h3 style="font-size:12px">${p.t.toUpperCase()}</h3><div class="p">${p.p.toUpperCase()}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul></div>`).join('')}</div></div></section>
<section class="win rv faq"><div class="tb">HELP.TXT<span><i></i><i></i></span></div><div class="bd">${C.faq.map(f => `<details><summary>► ${f.q.toUpperCase()}</summary><p class="txt">${f.a}</p></details>`).join('')}</div></section>
<section class="over"><h2>ПРОДОЛЖИТЬ?</h2><p class="txt">Нажмите кнопку — и мы ответим за 15 минут.</p><a class="px" href="${TG}">▶ ${TGH.toUpperCase()}</a></section>
<footer>© 2026 ФИНЕС СТУДИО · 1 PLAYER · ${C.slogan.toUpperCase()}</footer></div>`;
  return page({ n: 24, title: this.title, fonts: ['Press Start 2P'], css, body });
} });

// 25 — Газета
L.push({ n: 25, title: 'Газета', idea: 'Главная как первая полоса газеты: шапка-«титул», колонки, заголовки-новости о кейсах, объявления-цены и «письма читателей»; солидно и с юмором', build() {
  const css = `
body{font-family:'PT Serif',serif;background:#f4efe3;color:#1a1814;font-size:16px;line-height:1.55}
.pg{max-width:1240px;margin:0 auto;padding:24px 28px 40px;background:#f9f5ea;box-shadow:0 0 0 1px #e2dac6,0 30px 60px -40px rgba(0,0,0,.3)}
.mast{text-align:center;border-bottom:4px double #1a1814;padding-bottom:14px}
.mast .tp{display:flex;justify-content:space-between;font-family:'PT Sans Narrow',sans-serif;font-size:13px;text-transform:uppercase;letter-spacing:.08em;border-bottom:1px solid #1a1814;padding-bottom:8px;margin-bottom:14px;gap:10px;flex-wrap:wrap}
.mast h1{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(48px,9vw,128px);line-height:.9;letter-spacing:-.02em}
.mast h1 .flogo{--lg:clamp(48px,9vw,128px);display:inline-flex;vertical-align:baseline}
.mast h1 .flogo .fs{display:none}
.mast .sl{font-style:italic;font-size:18px;margin-top:22px}
.nav{display:flex;justify-content:center;gap:26px;font-family:'PT Sans Narrow';text-transform:uppercase;letter-spacing:.1em;font-size:14px;border-bottom:1px solid #1a1814;padding:8px 0;flex-wrap:wrap}
.nav a:hover{color:#f2501c}
.front{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:28px;padding:24px 0;border-bottom:1px solid #1a1814}
.lead h2{font-family:'Playfair Display';font-weight:900;font-size:clamp(34px,4.6vw,64px);line-height:1;margin-bottom:12px}
.lead h2 span{color:#f2501c}
.lead .dek{font-size:21px;font-style:italic;line-height:1.4;margin-bottom:16px;color:#3a362e}
.lead .by{font-family:'PT Sans Narrow';font-size:13px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px;color:#6b6456}
.cols{column-count:2;column-gap:28px;column-rule:1px solid #cfc6b2;text-align:justify;hyphens:auto}
.cols p{margin-bottom:10px}
.cols p:first-child::first-letter{font-family:'Playfair Display';font-weight:900;font-size:64px;float:left;line-height:.8;margin:6px 8px 0 0;color:#f2501c}
.ill{border:1px solid #1a1814;height:240px;margin:6px 0 10px;display:grid;place-items:center;background:repeating-linear-gradient(45deg,#efe7d3 0 2px,transparent 2px 7px);position:relative}
.ill svg{width:180px;height:180px}
.ill svg circle{mix-blend-mode:multiply}
.cap{font-family:'PT Sans Narrow';font-size:13px;color:#6b6456;margin-bottom:14px}
.side>div{border-bottom:1px solid #cfc6b2;padding:0 0 16px;margin-bottom:16px}
.side h3{font-family:'Playfair Display';font-weight:700;font-size:23px;line-height:1.1;margin-bottom:6px}
.side .tag{font-family:'PT Sans Narrow';font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.12em;color:#f2501c;margin-bottom:6px}
.side p{font-size:15px}
.side .q{background:#1a1814;color:#f9f5ea;padding:18px}
.side .q b{font-family:'Playfair Display';font-size:40px;color:#ffc21a;display:block;line-height:1}
.rowh{font-family:'PT Sans Narrow';text-transform:uppercase;letter-spacing:.14em;font-size:14px;border-top:3px solid #1a1814;border-bottom:1px solid #1a1814;padding:6px 0;margin:28px 0 18px;display:flex;justify-content:space-between}
.news{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0}
.news>div{padding:0 18px;border-right:1px solid #cfc6b2}
.news>div:first-child{padding-left:0}.news>div:last-child{border:0;padding-right:0}
.news h3{font-family:'Playfair Display';font-weight:900;font-size:26px;line-height:1.05;margin-bottom:8px}
.news .m{font-family:'Playfair Display';font-size:46px;font-weight:900;color:#f2501c;line-height:1}
.news p{font-size:15px;text-align:justify;hyphens:auto}
.ads{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.ads>div{border:2px solid #1a1814;padding:14px;text-align:center}
.ads .hot{background:#ffc21a}
.ads h4{font-family:'Playfair Display';font-weight:900;font-size:20px;text-transform:uppercase}
.ads .p{font-family:'PT Sans Narrow';font-size:26px;font-weight:700;margin:6px 0;color:#f2501c}
.ads .hot .p{color:#1a1814}
.ads p{font-size:14px}
.ads .tear{display:flex;justify-content:space-between;border-top:1px dashed #1a1814;margin-top:12px;padding-top:6px;font-family:'PT Sans Narrow';font-size:12px}
.two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:28px}
.letters>div{border-bottom:1px solid #cfc6b2;padding:10px 0}
.letters p{font-style:italic}.letters b{font-family:'PT Sans Narrow';font-size:14px;text-transform:uppercase;letter-spacing:.06em}
.steps li{list-style:none;padding:8px 0;border-bottom:1px dotted #a89f8b;display:grid;grid-template-columns:34px minmax(0,1fr);gap:8px}
.steps li b{font-family:'Playfair Display';font-size:24px;color:#f2501c;line-height:1}
.faq details{border-bottom:1px solid #cfc6b2;padding:8px 0}.faq summary{font-weight:700;cursor:pointer}
.stop{margin-top:28px;border:3px solid #1a1814;padding:24px;display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;background:#fff}
.stop h2{font-family:'Playfair Display';font-weight:900;font-size:clamp(26px,3.4vw,42px);line-height:1}
.stop a{background:#f2501c;color:#fff;font-family:'PT Sans Narrow';font-size:20px;text-transform:uppercase;letter-spacing:.08em;padding:14px 24px;font-weight:700}
.stop a:hover{background:#1a1814}
footer{font-family:'PT Sans Narrow';text-transform:uppercase;letter-spacing:.08em;font-size:12px;color:#6b6456;margin-top:20px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;border-top:1px solid #1a1814;padding-top:10px}
@media(max-width:900px){.front,.two{grid-template-columns:minmax(0,1fr)}.cols{column-count:1}.news{grid-template-columns:minmax(0,1fr)}.news>div{padding:14px 0;border-right:0;border-bottom:1px solid #cfc6b2}.ads{grid-template-columns:repeat(2,minmax(0,1fr))}.pg{padding:16px}}
@media(max-width:480px){.ads{grid-template-columns:minmax(0,1fr)}}`;
  const body = `<div class="pg"><div class="mast"><div class="tp"><span>Выпуск № 62</span><span>Четверг, 5 ноября 2026</span><span>Цена: бесплатно</span></div><h1>Вестник ${logo()}</h1><div class="sl">«${C.slogan}» — ежедневное издание студии разработки</div></div>
<nav class="nav"><a href="#lead">Главное</a><a href="#news">Происшествия</a><a href="#ads">Объявления</a><a href="#let">Письма</a><a href="${TG}">Редакция</a></nav>
<section class="front" id="lead"><article class="lead"><h2 class="rv">Малый бизнес <span>перестаёт</span> терять заявки</h2><div class="dek rv d1">В Финес Студио рассказали, как Telegram-боты и CRM заменяют администратора, Excel и стикеры на мониторе</div><div class="by">Корреспондент отдела автоматизации · 5 мин чтения</div>
<div class="ill"><svg viewBox="0 0 20 20"><g style="transform-origin:10px 10px;animation:fspin 30s linear infinite"><circle cx="7" cy="10" r="6" fill="#f2501c"/><circle cx="13" cy="10" r="6" fill="#ffc21a"/></g></svg></div><div class="cap">Иллюстрация: знак студии в момент вращения. Архив редакции.</div>
<div class="cols"><p>Финес Студио — небольшая команда разработчиков, которая делает Telegram-ботов, CRM-системы, веб-сервисы и интеграции для кофеен, салонов, автосервисов и оптовых компаний. По словам основателей, главная беда малого бизнеса — не нехватка клиентов, а ручная рутина: заявки теряются в директе, заказы переписываются в 1С, отчёты собираются по ночам.</p><p>«Мы приходим, смотрим, где течёт, и закрываем течь кодом», — поясняют в студии. Первый разбор проводится бесплатно, а цена фиксируется в договоре до начала работ. Демо показывают каждую неделю, после запуска действует месячная гарантия.</p><p>Только за последний квартал студия запустила шесть проектов. Подробности — в разделе происшествий на этой полосе.</p></div></article>
<aside class="side"><div class="rv"><div class="tag">Цифра дня</div><div class="q"><b>${C.stats[0].v}</b>${C.stats[0].l}</div></div>
${C.services.slice(0, 3).map(s => `<div class="rv"><div class="tag">Услуги</div><h3>${s.t}: ${s.p}</h3><p>${s.s}</p></div>`).join('')}<div class="rv"><div class="tag">Срочно</div><h3>Свободны 2 места на декабрь</h3><p>Запись через Telegram ${TGH}.</p></div></aside></section>
<div class="rowh" id="news"><span>Происшествия</span><span>Результаты клиентов</span></div>
<section class="news">${C.cases.slice(0, 3).map(c => `<div class="rv"><div class="m">${c.m}</div><h3>${c.c}: ${c.ml}</h3><p>${c.t}. ${c.r}</p></div>`).join('')}</section>
<div class="rowh" id="ads"><span>Частные объявления</span><span>Цены фиксируются в договоре</span></div>
<section class="ads">${C.services.slice(0, 4).map((s, i) => `<div class="rv${i === 1 ? ' hot' : ''}"><h4>${s.t}</h4><div class="p">${s.p}</div><p>${s.d}. ${s.s.split('.')[0]}.</p><div class="tear"><span>${TGH}</span><span>${TGH}</span></div></div>`).join('')}</section>
<div class="rowh"><span>Письма читателей · Как это делается</span><span>Справочная</span></div>
<section class="two" id="let"><div class="letters">${C.reviews.map(r => `<div class="rv"><p>«${r.q}»</p><b>— ${r.n}, ${r.r}</b></div>`).join('')}</div><div><ol class="steps">${C.steps.map((s, i) => `<li><b>${i + 1}</b><span><b style="font-family:'PT Serif';font-size:16px;color:#1a1814">${s.t}.</b> ${s.s}</span></li>`).join('')}</ol><div class="faq" style="margin-top:16px">${C.faq.slice(0, 4).map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></div></section>
<section class="stop rv"><h2>Стоп-новость: ваш проект может попасть на первую полосу.</h2><a href="${TG}">Написать в редакцию</a></section>
<footer><span>© 2026 Финес Студио</span><span>Тираж: каждому клиенту</span><span>Редакция: ${TGH}</span></footer></div>`;
  return page({ n: 25, title: this.title, fonts: ['PT Serif', 'PT Sans Narrow', 'Playfair Display'], css, body });
} });

export default L;
