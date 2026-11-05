import { page, logo, C, TG, TGH, dot } from './core.mjs';
const L = [];

// 31 — Прайс-таблица в центре
L.push({ n: 31, title: 'Прайс-лист первым экраном', idea: 'Цена — главный герой: подробная сравнительная таблица пакетов с галочками прямо в hero и переключатель услуги; для клиентов, которые сначала смотрят «сколько стоит»', build() {
  const css = `
body{font-family:'Golos Text',sans-serif;background:#f6f6f3;color:#18181b;font-size:16px}
.w{max-width:1180px;margin:0 auto;padding:0 22px}
header{display:flex;justify-content:space-between;align-items:center;padding:20px 0}
header nav{display:flex;gap:26px;font-size:15px;color:#52525b}
.bt{display:inline-block;background:#18181b;color:#fff;padding:12px 20px;border-radius:12px;font-weight:600;font-size:15px;transition:.2s}
.bt:hover{background:#f2501c}.bt.o{background:#f2501c}.bt.o:hover{background:#18181b}.bt.l{background:#fff;color:#18181b;border:1px solid #e4e4e7}
.hero{text-align:center;padding:40px 0 30px}
.hero .k{display:inline-block;background:#fff1eb;color:#f2501c;font-weight:600;border-radius:99px;padding:6px 14px;font-size:14px}
.hero h1{font-size:clamp(34px,4.6vw,60px);letter-spacing:-.04em;line-height:1.05;margin:18px 0 12px;font-weight:800}
.hero p{color:#52525b;font-size:18px;max-width:640px;margin:0 auto}
.tabs{display:flex;justify-content:center;gap:6px;margin:30px 0 22px;flex-wrap:wrap}
.tabs button{padding:10px 18px;border-radius:99px;font-weight:600;font-size:15px;background:#fff;border:1px solid #e4e4e7;transition:.2s}
.tabs button.on{background:#18181b;color:#fff;border-color:#18181b}
.tbl{background:#fff;border:1px solid #e4e4e7;border-radius:20px;overflow:hidden;box-shadow:0 30px 60px -40px rgba(0,0,0,.25)}
.grid{display:grid;grid-template-columns:minmax(0,1.4fr) repeat(3,minmax(0,1fr))}
.grid>div{padding:14px 18px;border-bottom:1px solid #f0f0f2;font-size:15px;display:flex;align-items:center}
.grid .h{flex-direction:column;align-items:flex-start;padding:36px 18px 24px;border-bottom:1px solid #e4e4e7}
.grid .h b{font-size:19px}.grid .h small{color:#71717a;font-size:13.5px;margin-top:2px}
.grid .h .p{font-size:30px;font-weight:800;letter-spacing:-.03em;margin:12px 0}
.grid .h .bt{padding:10px 16px;font-size:14px}
.grid .c{justify-content:center;text-align:center}
.grid .hot{background:#fff7f3}
.grid .hh{background:#fff7f3;position:relative}
.grid .hh::before{content:'Чаще всего берут';position:absolute;top:0;left:18px;right:18px;background:#f2501c;color:#fff;font-size:12px;font-weight:600;padding:3px 0;text-align:center;border-radius:0 0 8px 8px}
.y{color:#f2501c;font-weight:800;font-size:18px}.n{color:#a1a1aa}
.grid .g{grid-column:1/-1;background:#fafafa;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#71717a}
.note{display:flex;justify-content:center;gap:28px;flex-wrap:wrap;padding:20px 0 0;color:#52525b;font-size:14.5px}
.note span::before{content:'✓ ';color:#f2501c;font-weight:800}
.sec{padding:80px 0}
.sec h2{font-size:clamp(28px,3.6vw,44px);letter-spacing:-.035em;line-height:1.08;margin-bottom:30px;font-weight:800}
.ex{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.ex>div{background:#fff;border:1px solid #e4e4e7;border-radius:18px;padding:24px}
.ex .t{display:flex;justify-content:space-between;gap:10px;font-size:14px;color:#71717a}
.ex h3{font-size:19px;margin:10px 0 6px}.ex p{color:#52525b;font-size:15px}
.ex .sum{display:flex;justify-content:space-between;border-top:1px dashed #d4d4d8;margin-top:16px;padding-top:12px;font-weight:700}
.ex .sum b{color:#f2501c}
.add{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 40px}
.add>div{display:flex;justify-content:space-between;gap:16px;padding:14px 0;border-bottom:1px solid #e4e4e7}
.add b{white-space:nowrap}
.how{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
.how>div{background:#fff;border-radius:16px;padding:20px;border:1px solid #e4e4e7}
.how i{font-style:normal;display:inline-grid;place-items:center;width:30px;height:30px;border-radius:8px;background:#18181b;color:#fff;font-weight:700;font-size:14px;margin-bottom:12px}
.how h3{font-size:16px;margin-bottom:4px}.how p{font-size:14px;color:#52525b}
.faq details{background:#fff;border:1px solid #e4e4e7;border-radius:14px;padding:16px 20px;margin-bottom:10px}.faq summary{font-weight:600;cursor:pointer}.faq p{color:#52525b;margin-top:8px}
.end{background:#18181b;color:#fff;border-radius:24px;padding:50px;display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;margin-bottom:40px}
.end h2{color:#fff;margin:0}
footer{display:flex;justify-content:space-between;color:#71717a;font-size:14px;padding:0 0 40px;flex-wrap:wrap;gap:10px}
@media(max-width:900px){header nav{display:none}.tw{overflow-x:auto}.tbl{min-width:760px}.ex,.add{grid-template-columns:minmax(0,1fr)}.how{grid-template-columns:minmax(0,1fr)}.end{padding:30px}}`;
  const D = {
    'Telegram-бот': { p: ['40 000 ₽', '75 000 ₽', '140 000 ₽'], d: ['2 недели', '3 недели', '5 недель'] },
    'CRM-система': { p: ['120 000 ₽', '190 000 ₽', '320 000 ₽'], d: ['4 недели', '6 недель', '10 недель'] },
    'Веб-сервис': { p: ['150 000 ₽', '240 000 ₽', '400 000 ₽'], d: ['6 недель', '8 недель', '12 недель'] },
  };
  const rows = [['Основное', null], ['Разбор задачи и смета', [1, 1, 1]], ['Прототип интерфейса', [0, 1, 1]], ['Дизайн в фирменном стиле', [0, 1, 1]], ['Интеграции', ['1', 'до 3', 'без лимита']], ['Админ-панель', [1, 1, 1]], ['Сервис', null], ['Оплата (ЮKassa, СБП)', [0, 1, 1]], ['Аналитика и отчёты', [0, 1, 1]], ['Обучение команды', [0, 1, 1]], ['Гарантия', ['30 дней', '30 дней', '90 дней']], ['Поддержка', ['—', '1 мес бесплатно', '3 мес бесплатно']]];
  const k = Object.keys(D)[0];
  const cell = v => v === 1 ? '<span class="y">✓</span>' : v === 0 ? '<span class="n">—</span>' : v;
  const body = `<div class="w"><header>${logo()}<nav><a href="#t">Цены</a><a href="#e">Примеры смет</a><a href="#a">Доп. услуги</a><a href="#f">Вопросы</a></nav><a class="bt" href="${TG}">Написать</a></header>
<section class="hero" id="t"><span class="k rv">Финес Студио · ${C.slogan}</span><h1 class="rv d1">Прозрачные цены на разработку</h1><p class="rv d2">Боты, CRM и веб-сервисы для малого бизнеса. Цена фиксируется в договоре — вот из чего она складывается.</p>
<div class="tabs rv d2">${Object.keys(D).map((x, i) => `<button${i === 0 ? ' class="on"' : ''} data-k="${x}">${x}</button>`).join('')}</div>
<div class="tw rv d3"><div class="tbl"><div class="grid"><div class="h"><b>Что входит</b><small>Сравните пакеты</small></div>${['Старт', 'Бизнес', 'Под ключ'].map((t, i) => `<div class="h${i === 1 ? ' hh' : ''}"><b>${t}</b><small class="dd">${D[k].d[i]}</small><div class="p">от <span class="pp">${D[k].p[i]}</span></div><a class="bt${i === 1 ? ' o' : ' l'}" href="${TG}">Выбрать</a></div>`).join('')}
${rows.map(r => r[1] === null ? `<div class="g">${r[0]}</div>` : `<div>${r[0]}</div>${r[1].map((v, i) => `<div class="c${i === 1 ? ' hot' : ''}">${cell(v)}</div>`).join('')}`).join('')}</div></div></div>
<div class="note"><span>Цена в договоре</span><span>Оплата 50 / 50</span><span>Код и доступы ваши</span><span>Бесплатный разбор</span></div></section>
<section class="sec" id="e"><h2 class="rv">Примеры реальных смет</h2><div class="ex">${C.cases.slice(0, 3).map((c, i) => `<div class="rv d${i}"><div class="t"><span>${c.c}</span><span>${['3 нед.', '2 нед.', '7 нед.'][i]}</span></div><h3>${c.t}</h3><p>${c.r}</p><div class="sum"><span>Итого</span><b>${['85 000 ₽', '48 000 ₽', '210 000 ₽'][i]}</b></div><div style="margin-top:8px;font-size:14px;color:#52525b">Результат: <b style="color:#18181b">${c.m}</b> ${c.ml}</div></div>`).join('')}</div></section>
<section class="sec" id="a" style="padding-top:0"><h2 class="rv">Дополнительные услуги</h2><div class="add rv">${[['Интеграция с 1С / МойСклад', 'от 25 000 ₽'], ['Подключение оплаты', 'от 10 000 ₽'], ['Telegram Mini App', 'от 60 000 ₽'], ['Лендинг для бота', 'от 30 000 ₽'], ['Рассылки и сегментация', 'от 15 000 ₽'], ['Перенос данных из Excel', 'от 8 000 ₽'], ['Поддержка и доработки', 'от 5 000 ₽/мес'], ['Срочный старт (за 3 дня)', '+15%']].map(a => `<div><span>${a[0]}</span><b>${a[1]}</b></div>`).join('')}</div></section>
<section class="sec" style="padding-top:0"><h2 class="rv">Как формируется цена</h2><div class="how">${C.steps.map((s, i) => `<div class="rv d${i}"><i>${i + 1}</i><h3>${s.t}</h3><p>${s.s}</p></div>`).join('')}</div></section>
<section class="sec faq" id="f" style="padding-top:0"><h2 class="rv">Вопросы о деньгах</h2>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</section>
<section class="end rv"><div><h2>Пришлите задачу — посчитаем за день</h2><p style="color:#a1a1aa;margin-top:8px">Бесплатно и без обязательств.</p></div><a class="bt o" href="${TG}">Написать ${TGH}</a></section>
<footer><span>© 2026 Финес Студио</span><span>Цены актуальны на ноябрь 2026</span></footer></div>`;
  const js = `const D=${JSON.stringify(D)};document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('on',x===b));const d=D[b.dataset.k];document.querySelectorAll('.pp').forEach((p,i)=>p.textContent=d.p[i]);document.querySelectorAll('.dd').forEach((p,i)=>p.textContent=d.d[i])});`;
  return page({ n: 31, title: this.title, fonts: ['Golos Text'], css, body, js });
} });

// 32 — Схема метро
L.push({ n: 32, title: 'Схема метро', idea: 'Путь клиента и услуги нарисованы как линии метро со станциями и пересадками; наглядно объясняет процесс и связи услуг, для тех, кто любит схемы', build() {
  const css = `
body{font-family:'Onest',sans-serif;background:#fbfaf7;color:#1c1c1c;font-size:16px}
.w{max-width:1240px;margin:0 auto;padding:0 24px}
header{display:flex;justify-content:space-between;align-items:center;padding:20px 0;border-bottom:1px solid #e8e5dd}
header nav{display:flex;gap:22px;font-size:15px}
header nav a{display:flex;align-items:center;gap:8px}header nav a i{width:12px;height:12px;border-radius:50%;display:block}
.bt{display:inline-flex;align-items:center;gap:8px;background:#1c1c1c;color:#fff;padding:12px 20px;border-radius:99px;font-weight:600;font-size:15px;transition:.2s}
.bt:hover{background:#f2501c}
.bt .m{width:22px;height:22px;border-radius:50%;background:#f2501c;display:grid;place-items:center;font-size:12px;font-weight:800}
.hero{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:40px;padding:50px 0;align-items:center}
.hero .k{display:inline-flex;align-items:center;gap:10px;font-weight:600;font-size:15px}
.hero .k i{width:28px;height:28px;border-radius:50%;background:#f2501c;color:#fff;font-style:normal;display:grid;place-items:center;font-weight:800;font-size:14px}
.hero h1{font-size:clamp(38px,5vw,68px);letter-spacing:-.04em;line-height:1.02;margin:18px 0;font-weight:800}
.hero p{font-size:18px;color:#555;line-height:1.55;margin-bottom:26px;max-width:480px}
.map{background:#fff;border:1px solid #e8e5dd;border-radius:24px;padding:16px;box-shadow:0 30px 60px -40px rgba(0,0,0,.3)}
.map svg{width:100%;height:auto;display:block}
.map text{font-family:'Onest';font-size:12.5px;font-weight:600;fill:#1c1c1c}
.map .ln{fill:none;stroke-width:9;stroke-linecap:round;stroke-linejoin:round;}
.map .ln:nth-of-type(2){animation-delay:.4s}.map .ln:nth-of-type(3){animation-delay:.8s}
@keyframes dr{to{stroke-dashoffset:0}}
.map .st{fill:#fff;stroke:#1c1c1c;stroke-width:3}
.map .x{fill:#fff;stroke:#1c1c1c;stroke-width:3}
.leg{display:flex;gap:18px;flex-wrap:wrap;margin-top:10px;font-size:13.5px;padding:0 6px}
.leg span{display:flex;align-items:center;gap:6px}.leg i{width:18px;height:6px;border-radius:3px;display:block}
.sec{padding:80px 0;border-top:1px solid #e8e5dd}
.sh{display:flex;align-items:center;gap:14px;margin-bottom:34px}
.sh i{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:800;font-style:normal;font-size:18px;flex:none}
.sh h2{font-size:clamp(28px,3.6vw,46px);letter-spacing:-.035em;line-height:1.05}
.line{position:relative;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:16px;padding-top:40px}
.line::before{content:'';position:absolute;top:14px;left:10%;right:10%;height:8px;border-radius:4px;background:var(--c)}
.line>div{position:relative;text-align:center;padding-top:18px}
.line>div::before{content:'';position:absolute;top:-34px;left:50%;transform:translateX(-50%);width:22px;height:22px;border-radius:50%;background:#fff;border:4px solid #1c1c1c;z-index:1}
.line h3{font-size:18px;margin-bottom:6px}.line p{font-size:14.5px;color:#555}.line small{display:inline-block;margin-top:10px;background:var(--c);color:#fff;border-radius:99px;padding:3px 10px;font-weight:600;font-size:12.5px}
.svc{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
.svc>div{border-radius:18px;padding:22px;background:#fff;border:1px solid #e8e5dd;border-top:8px solid var(--c);transition:transform .2s}
.svc>div:hover{transform:translateY(-4px)}
.svc .l{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--c);color:#fff;font-weight:800;font-size:13px;margin-bottom:12px}
.svc h3{font-size:18px;margin-bottom:6px}.svc p{font-size:14.5px;color:#555}.svc b{display:block;margin-top:12px}
.cs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.cs>div{background:#fff;border:1px solid #e8e5dd;border-radius:18px;padding:22px;display:flex;gap:16px;align-items:flex-start}
.cs .m{font-size:30px;font-weight:800;letter-spacing:-.03em;color:#f2501c;min-width:96px}
.cs h3{font-size:16px}.cs p{font-size:14px;color:#555;margin-top:4px}
.tk{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.tk>div{background:#fff;border:1px solid #e8e5dd;border-radius:18px;padding:24px;position:relative;overflow:hidden}
.tk>div::after{content:'';position:absolute;right:-30px;top:50%;width:60px;height:60px;border-radius:50%;background:#fbfaf7;border:1px solid #e8e5dd;transform:translateY(-50%)}
.tk .hot{background:#1c1c1c;color:#fff;border-color:#1c1c1c}
.tk .z{font-size:13px;font-weight:600;color:#f2501c;text-transform:uppercase;letter-spacing:.08em}
.tk .p{font-size:32px;font-weight:800;letter-spacing:-.03em;margin:8px 0}
.tk li{list-style:none;font-size:14.5px;padding:3px 0;opacity:.85}
.faq details{border-bottom:1px solid #e8e5dd;padding:16px 0}.faq summary{font-weight:600;cursor:pointer;font-size:17px}.faq p{color:#555;margin-top:6px}
.end{padding:80px 0;text-align:center;border-top:1px solid #e8e5dd}
.end h2{font-size:clamp(32px,4.6vw,60px);letter-spacing:-.04em;line-height:1.04;margin-bottom:24px}
footer{display:flex;justify-content:space-between;padding:20px 0 40px;color:#777;font-size:14px;flex-wrap:wrap;gap:10px}
@media(max-width:900px){header nav{display:none}.hero{grid-template-columns:minmax(0,1fr)}.line{grid-template-columns:minmax(0,1fr);padding:0 0 0 40px;gap:24px}.line::before{top:0;bottom:0;left:9px;right:auto;width:8px;height:auto}.line>div{text-align:left;padding-top:0}.line>div::before{top:2px;left:-41px;transform:none}.svc,.cs,.tk{grid-template-columns:minmax(0,1fr)}}`;
  const cl = ['#f2501c', '#2f6fdb', '#1fa463', '#a64bd6', '#e8a400'];
  const body = `<div class="w"><header>${logo()}<nav>${[['Маршрут', '#r', cl[0]], ['Линии', '#s', cl[1]], ['Станции', '#c', cl[2]], ['Билеты', '#p', cl[3]]].map(n => `<a href="${n[1]}"><i style="background:${n[2]}"></i>${n[0]}</a>`).join('')}</nav><a class="bt" href="${TG}"><span class="m">Ф</span>Написать</a></header>
<section class="hero"><div><span class="k rv"><i>Ф</i>Линия «Финес Студио»</span><h1 class="rv d1">Тонкая работа для вашего бизнеса.</h1><p class="rv d2">Схема проезда от хаоса в заявках до работающей системы. Пять линий-услуг, удобные пересадки и никаких пробок в сроках.</p><a class="bt rv d3" href="${TG}"><span class="m">→</span>Построить маршрут</a></div>
<div class="map rv d2"><svg viewBox="0 0 600 400"><path class="ln" d="M40 330 L170 330 L250 250 L250 120 L360 60 L560 60" stroke="${cl[0]}"/><path class="ln" d="M40 80 L150 80 L250 180 L420 180 L560 300" stroke="${cl[1]}"/><path class="ln" d="M120 380 L250 250 L420 250 L520 150 L520 40" stroke="${cl[2]}"/>
${[[40, 330, 'Хаос в заявках', -10, 22], [170, 330, 'Разбор', -10, 22], [360, 60, 'Прототип', -20, -14], [560, 60, 'Запуск', -24, 26], [40, 80, 'Excel', -14, -14], [150, 80, 'Смета', -14, -14], [420, 180, 'CRM', -6, -14], [560, 300, 'Рост', -40, 6], [120, 380, 'Мессенджеры', 10, 4], [420, 250, 'Интеграции', -20, 24], [520, 150, '1С', 12, 4], [520, 40, 'Оплата', -58, -8]].map(s => `<circle class="st" cx="${s[0]}" cy="${s[1]}" r="7"/><text x="${s[0] + s[3]}" y="${s[1] + s[4]}">${s[2]}</text>`).join('')}
<circle class="x" cx="250" cy="250" r="13"/><circle class="x" cx="250" cy="180" r="13"/><text x="264" y="275">Бот</text><text x="268" y="166">Разработка</text></svg>
<div class="leg"><span><i style="background:${cl[0]}"></i>Путь проекта</span><span><i style="background:${cl[1]}"></i>Учёт и CRM</span><span><i style="background:${cl[2]}"></i>Боты и интеграции</span></div></div></section>
<section class="sec" id="r"><div class="sh"><i style="background:${cl[0]}">1</i><h2 class="rv">Маршрут проекта</h2></div><div class="line" style="--c:${cl[0]}">${C.steps.map(s => `<div class="rv"><h3>${s.t}</h3><p>${s.s}</p><small>${s.d}</small></div>`).join('')}</div></section>
<section class="sec" id="s"><div class="sh"><i style="background:${cl[1]}">2</i><h2 class="rv">Линии-услуги</h2></div><div class="svc">${C.services.map((s, i) => `<div class="rv d${i}" style="--c:${cl[i]}"><span class="l">${['Б', 'С', 'В', 'И', 'Л'][i]}</span><h3>${s.t}</h3><p>${s.s}</p><b>${s.p}</b></div>`).join('')}</div></section>
<section class="sec" id="c"><div class="sh"><i style="background:${cl[2]}">3</i><h2 class="rv">Станции, где мы уже были</h2></div><div class="cs">${C.cases.map((c, i) => `<div class="rv d${i % 3}"><div class="m">${c.m}</div><div><h3>${c.c}</h3><p>${c.t} — ${c.ml}</p></div></div>`).join('')}</div></section>
<section class="sec" id="p"><div class="sh"><i style="background:${cl[3]}">4</i><h2 class="rv">Билеты</h2></div><div class="tk">${C.plans.map((p, i) => `<div class="rv d${i}${p.hot ? ' hot' : ''}"><div class="z">Зона ${['A', 'B', 'C'][i]} · ${p.t}</div><div class="p">${p.p}</div><div style="opacity:.7;margin-bottom:10px">${p.for}</div><ul>${p.f.map(f => `<li>● ${f}</li>`).join('')}</ul></div>`).join('')}</div></section>
<section class="sec faq"><div class="sh"><i style="background:${cl[4]}">?</i><h2 class="rv">Справочное бюро</h2></div>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</section>
<section class="end"><h2 class="rv">Следующая станция — ваш проект</h2><a class="bt rv d1" href="${TG}"><span class="m">Ф</span>Написать ${TGH}</a></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div>`;
  return page({ n: 32, title: this.title, fonts: [], css, body });
} });

// 33 — Канбан-доска
L.push({ n: 33, title: 'Канбан-доска', idea: 'Весь сайт — доска задач: колонки «Услуги», «В работе», «Готово», карточки с метками, аватарами и чек-листами; близко бизнесу, который сам живёт в задачах', build() {
  const css = `
body{font-family:'Manrope',sans-serif;background:#2a3f6b;color:#172b4d;font-size:15px;min-height:100vh;background:linear-gradient(135deg,#f2501c 0%,#d2442a 30%,#7a3a8c 70%,#2a3f6b 100%) fixed}
.top{display:flex;align-items:center;gap:14px;padding:12px 18px;background:rgba(0,0,0,.25);backdrop-filter:blur(6px);color:#fff;position:sticky;top:0;z-index:20}
.top .flogo{--lg:24px;color:#fff}
.top .bn{font-weight:800;font-size:18px;padding:6px 10px;border-radius:6px;background:rgba(255,255,255,.15)}
.top .sp{flex:1}
.top .av{display:flex}.top .av span{width:30px;height:30px;border-radius:50%;border:2px solid #fff;margin-left:-8px;display:grid;place-items:center;font-size:12px;font-weight:800;color:#fff}
.bt{background:#fff;color:#172b4d;border-radius:6px;padding:8px 14px;font-weight:700;font-size:14px;transition:.2s;display:inline-block}
.bt:hover{background:#ffc21a}
.hero{padding:40px 18px 26px;color:#fff;max-width:1100px}
.hero h1{font-size:clamp(34px,5vw,64px);letter-spacing:-.04em;line-height:1.02;font-weight:800}
.hero p{font-size:18px;opacity:.9;margin:14px 0 20px;max-width:640px}
.board{display:flex;gap:14px;padding:0 18px 30px;-webkit-mask-image:linear-gradient(90deg,#000 92%,transparent);mask-image:linear-gradient(90deg,#000 92%,transparent);overflow-x:auto;align-items:flex-start;scroll-snap-type:x mandatory}
.col{flex:0 0 300px;background:#ebecf0;border-radius:12px;padding:10px;scroll-snap-align:start;max-height:none}
.col h2{font-size:15px;font-weight:800;padding:6px 8px 10px;display:flex;justify-content:space-between}
.col h2 span{color:#5e6c84;font-weight:600}
.card{background:#fff;border-radius:8px;padding:12px;margin-bottom:8px;box-shadow:0 1px 0 rgba(9,30,66,.25);cursor:grab;transition:transform .15s,box-shadow .15s}
.card:hover{transform:rotate(-1deg);box-shadow:0 8px 16px -6px rgba(9,30,66,.4)}
.lbs{display:flex;gap:4px;margin-bottom:8px;flex-wrap:wrap}
.lbs i{font-style:normal;height:18px;padding:0 8px;border-radius:4px;font-size:11px;font-weight:700;color:#fff;display:inline-flex;align-items:center}
.card h3{font-size:15px;font-weight:700;line-height:1.35}
.card p{font-size:13.5px;color:#5e6c84;margin-top:6px;line-height:1.45}
.card .ft{display:flex;justify-content:space-between;align-items:center;margin-top:10px;font-size:12.5px;color:#5e6c84;gap:8px}
.card .ft b{color:#172b4d}
.card .who{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:800;font-size:11px}
.card .m{font-size:34px;font-weight:800;letter-spacing:-.03em;color:#f2501c;line-height:1}
.chk{margin-top:8px}.chk div{font-size:13px;padding:2px 0;color:#172b4d}.chk div::before{content:'☑ ';color:#1fa463}
.prog{height:6px;background:#dfe1e6;border-radius:3px;margin-top:8px;overflow:hidden}.prog i{display:block;height:100%;background:#1fa463}
.add{display:block;padding:8px;border-radius:6px;color:#5e6c84;font-weight:600;font-size:14px}
.add:hover{background:#dfe1e6;color:#172b4d}
.cover{height:90px;border-radius:6px;margin:-4px -4px 10px;background:linear-gradient(135deg,#f2501c,#ffc21a);display:grid;place-items:center}
.cover .flogo{--lg:34px;color:#1a1410}
.cover .flogo .fs{display:none}
.wide{padding:0 18px 40px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;max-width:1300px}
.panel{background:#fff;border-radius:12px;padding:24px}
.panel h2{font-size:22px;letter-spacing:-.02em;margin-bottom:12px}
.panel details{border-bottom:1px solid #ebecf0;padding:10px 0}.panel summary{font-weight:700;cursor:pointer}.panel details p{color:#5e6c84;margin-top:4px}
.act{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid #ebecf0;font-size:14px}
.act .who{flex:none;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:800;font-size:12px}
.act small{display:block;color:#5e6c84}
footer{color:#fff;opacity:.85;padding:0 18px 40px;font-size:14px;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;max-width:1300px}
@media(max-width:700px){.top .av,.top .bn{display:none}.col{flex-basis:84vw}.wide{grid-template-columns:minmax(0,1fr)}}`;
  const tc = ['#f2501c', '#2f6fdb', '#1fa463', '#a64bd6', '#e8a400'];
  const who = (i) => `<span class="who" style="background:${tc[i % 4]}">${C.team[i % 4].n[0]}</span>`;
  const col = (t, n, cards, add = '+ Добавить карточку') => `<section class="col rv"><h2>${t}<span>${n}</span></h2>${cards}<a class="add" href="${TG}">${add}</a></section>`;
  const body = `<div class="top">${logo(true)}<span class="bn">Доска: ваш бизнес</span><span class="sp"></span><span class="av">${C.team.map((t, i) => `<span style="background:${tc[i]}">${t.n[0]}</span>`).join('')}</span><a class="bt" href="${TG}">Пригласить нас</a></div>
<section class="hero"><h1 class="rv">Тонкая работа для вашего бизнеса.</h1><p class="rv d1">Финес Студио ведёт ваш проект как эту доску: каждая задача видна, у каждой есть исполнитель и срок. Боты, CRM, веб-сервисы и интеграции для малого бизнеса.</p><a class="bt rv d2" href="${TG}">+ Создать задачу для студии</a></section>
<div class="board">
${col('📥 Бэклог: ваши боли', 4, ['Заявки теряются в директе и почте', 'Менеджер час в день переносит заказы в 1С', 'Клиенты не приходят на запись', 'Отчёт по продажам собираем в пятницу ночью'].map((x, i) => `<div class="card"><div class="lbs"><i style="background:#eb5a46">боль</i></div><h3>${x}</h3><div class="ft"><span>знакомо?</span></div></div>`).join(''), '+ Добавить свою боль')}
${col('🧰 Услуги', 5, C.services.map((s, i) => `<div class="card">${i === 0 ? `<div class="cover">${logo()}</div>` : ''}<div class="lbs"><i style="background:${tc[i]}">${s.k}</i><i style="background:#5e6c84">${s.d}</i></div><h3>${s.t}</h3><p>${s.s}</p><div class="ft"><b>${s.p}</b>${who(i)}</div></div>`).join(''))}
${col('⚙️ В работе', 2, `<div class="card"><div class="lbs"><i style="background:${tc[1]}">crm</i></div><h3>CRM для оптовой базы «Кровля»</h3><div class="chk"><div>Разбор процессов</div><div>Прототип воронки</div><div>Интеграция с 1С</div></div><div class="prog"><i style="width:60%"></i></div><div class="ft"><span>демо в пятницу</span>${who(0)}</div></div><div class="card"><div class="lbs"><i style="background:${tc[0]}">бот</i></div><h3>Бот записи для барбершопа</h3><div class="prog"><i style="width:85%"></i></div><div class="ft"><span>запуск через 3 дня</span>${who(2)}</div></div>`)}
${col('✅ Готово', C.cases.length, C.cases.map((c, i) => `<div class="card"><div class="lbs"><i style="background:#1fa463">запущено</i><i style="background:#5e6c84">${c.tag}</i></div><div class="m">${c.m}</div><h3>${c.c}</h3><p>${c.ml}</p></div>`).join(''))}
${col('🗓 Как мы ведём проект', 5, C.steps.map((s, i) => `<div class="card"><div class="lbs"><i style="background:#172b4d">шаг ${i + 1}</i><i style="background:#5e6c84">${s.d}</i></div><h3>${s.t}</h3><p>${s.s}</p></div>`).join(''))}
${col('💳 Тарифы', 3, C.plans.map((p, i) => `<div class="card"${p.hot ? ' style="box-shadow:0 0 0 2px #f2501c"' : ''}><div class="lbs"><i style="background:${p.hot ? '#f2501c' : '#5e6c84'}">${p.hot ? 'популярно' : p.t.toLowerCase()}</i></div><h3>${p.t} — ${p.p}</h3><p>${p.f.join(' · ')}</p></div>`).join(''), '+ Обсудить свой формат')}
</div>
<div class="wide"><section class="panel rv"><h2>Комментарии клиентов</h2>${C.reviews.map((r, i) => `<div class="act"><span class="who" style="background:${tc[i + 1]}">${r.n[0]}</span><div><b>${r.n}</b> <small>${r.r}</small>${r.q}</div></div>`).join('')}</section>
<section class="panel rv d1"><h2>Частые вопросы</h2>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}<div style="margin-top:18px"><a class="bt" style="background:#f2501c;color:#fff" href="${TG}">Написать ${TGH}</a></div></section></div>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer>`;
  return page({ n: 33, title: this.title, fonts: ['Manrope'], css, body });
} });

// 34 — Дашборд
L.push({ n: 34, title: 'Дашборд аналитики', idea: 'Сайт как панель метрик: KPI-плитки, графики, таблицы и фильтры — студия показывает себя цифрами; для собственников, которые мыслят показателями', build() {
  const css = `
body{font-family:'Inter Tight',sans-serif;background:#0f1117;color:#e7e9ee;font-size:15px}
.app{display:grid;grid-template-columns:230px minmax(0,1fr);min-height:100vh}
aside{background:#151821;border-right:1px solid #232734;padding:22px 16px;position:sticky;top:0;height:100vh;display:flex;flex-direction:column}
aside .flogo{--lg:28px;color:#fff;margin:0 8px 26px}
aside a{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;color:#9aa1b2;font-size:14.5px;font-weight:500}
aside a:hover{background:#1d2130;color:#fff}
aside a.on{background:rgba(242,80,28,.14);color:#ff8a5c}
aside .cta{margin-top:auto;background:linear-gradient(135deg,#f2501c,#ffc21a);border-radius:12px;padding:16px;color:#1a1410}
aside .cta b{display:block;font-size:15px;margin-bottom:6px}aside .cta p{font-size:13px;margin-bottom:10px}
aside .cta a{background:#1a1410;color:#fff;justify-content:center;font-weight:700}
main{padding:24px 28px 50px;min-width:0}
.tb{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:24px;flex-wrap:wrap}
.tb h1{font-size:clamp(26px,3vw,38px);letter-spacing:-.03em;line-height:1.1}
.tb h1 span{color:#ff8a5c}
.tb p{color:#9aa1b2;margin-top:4px}
.flt{display:flex;gap:6px;background:#151821;border:1px solid #232734;border-radius:10px;padding:4px}
.flt button{padding:7px 12px;border-radius:7px;font-size:13.5px;color:#9aa1b2;font-weight:600}
.flt button.on{background:#232734;color:#fff}
.bt{display:inline-block;background:#f2501c;color:#fff;border-radius:10px;padding:11px 18px;font-weight:700;font-size:14.5px;transition:.2s}
.bt:hover{background:#ff6a3a}
.g{display:grid;gap:16px}
.kpi{grid-template-columns:repeat(4,minmax(0,1fr))}
.pn{background:#151821;border:1px solid #232734;border-radius:16px;padding:20px;min-width:0}
.pn h3{font-size:13.5px;color:#9aa1b2;font-weight:600;display:flex;justify-content:space-between;margin-bottom:10px}
.kpi b{font-size:34px;letter-spacing:-.03em;display:block}
.kpi em{font-style:normal;font-size:13px;color:#3ddc97;font-weight:600}
.spark{height:40px;margin-top:10px}
.spark polyline{fill:none;stroke:#f2501c;stroke-width:2.5}
.r2{grid-template-columns:minmax(0,2fr) minmax(0,1fr);margin-top:16px}
.chart{height:240px;display:flex;align-items:flex-end;gap:10px;padding-top:10px;border-bottom:1px solid #232734}
.chart div{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;height:100%;justify-content:flex-end}
.chart i{width:100%;max-width:40px;border-radius:6px 6px 0 0;background:linear-gradient(#ffc21a,#f2501c);transform-origin:bottom;animation:gr 1.2s cubic-bezier(.2,.7,.2,1) both}
.chart i.b{background:#2a2f40}
@keyframes gr{from{transform:scaleY(0)}}
.chart span{font-size:12px;color:#6b7285}
.donut{display:grid;place-items:center;padding:10px 0}
.donut svg{width:170px;height:170px;transform:rotate(-90deg)}
.lg div{display:flex;justify-content:space-between;font-size:14px;padding:6px 0;border-bottom:1px solid #1d2130}
.lg i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:8px}
.r3{grid-template-columns:repeat(3,minmax(0,1fr));margin-top:16px}
.svc h4{font-size:17px;margin-bottom:4px;color:#fff}.svc p{font-size:13.5px;color:#9aa1b2;line-height:1.5}
.svc .ft{display:flex;justify-content:space-between;margin-top:14px;font-size:13.5px}.svc .ft b{color:#ff8a5c}
.bar{height:6px;background:#232734;border-radius:3px;margin-top:10px;overflow:hidden}.bar i{display:block;height:100%;background:linear-gradient(90deg,#f2501c,#ffc21a)}
.tw{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:14px;min-width:620px}
th{text-align:left;color:#6b7285;font-weight:600;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em;padding:10px 12px;border-bottom:1px solid #232734}
td{padding:12px;border-bottom:1px solid #1d2130}
td .pill{display:inline-block;border-radius:99px;padding:2px 10px;font-size:12px;font-weight:600;background:rgba(61,220,151,.14);color:#3ddc97}
td b{color:#ff8a5c}
.r4{grid-template-columns:repeat(3,minmax(0,1fr));margin-top:16px}
.r4 .hot{border-color:#f2501c;background:linear-gradient(180deg,rgba(242,80,28,.1),#151821)}
.r4 .p{font-size:28px;font-weight:700;letter-spacing:-.03em;margin:6px 0 10px;color:#fff}
.r4 li{list-style:none;font-size:13.5px;color:#9aa1b2;padding:3px 0}.r4 li::before{content:'✓ ';color:#3ddc97}
.r5{grid-template-columns:minmax(0,1fr) minmax(0,1fr);margin-top:16px}
.log div{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #1d2130;font-size:14px}
.log span{color:#6b7285;font-family:'JetBrains Mono';font-size:12.5px;flex:none;width:52px}
details{border-bottom:1px solid #1d2130;padding:10px 0}summary{cursor:pointer;font-weight:600}details p{color:#9aa1b2;margin-top:4px;font-size:14px}
footer{margin-top:30px;color:#6b7285;font-size:13px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px}
@media(max-width:1100px){.kpi{grid-template-columns:repeat(2,minmax(0,1fr))}.r3,.r4{grid-template-columns:minmax(0,1fr)}}
@media(max-width:860px){.app{grid-template-columns:minmax(0,1fr)}aside{position:static;height:auto;flex-direction:row;flex-wrap:wrap;align-items:center;gap:6px;padding:14px}aside a{display:none}aside .flogo{margin:0}aside .cta{display:none}.r2,.r5{grid-template-columns:minmax(0,1fr)}main{padding:18px 14px 40px}}
@media(max-width:480px){.kpi{grid-template-columns:minmax(0,1fr)}}`;
  const sp = (pts) => `<svg class="spark" viewBox="0 0 100 40" preserveAspectRatio="none"><polyline points="${pts.map((v, i) => `${i * (100 / (pts.length - 1))},${40 - v}`).join(' ')}"/></svg>`;
  const months = ['июн', 'июл', 'авг', 'сен', 'окт', 'ноя'];
  const body = `<div class="app"><aside>${logo(true)}<a class="on" href="#top">▦ Обзор</a><a href="#s">◧ Услуги</a><a href="#c">↗ Кейсы</a><a href="#p">₽ Тарифы</a><a href="#f">? Вопросы</a><div class="cta"><b>Ваш проект — следующий</b><p>Бесплатный разбор задачи за 30 минут.</p><a href="${TG}">Написать</a></div></aside>
<main><div class="tb"><div><h1 class="rv">Тонкая работа <span>для вашего бизнеса.</span></h1><p class="rv d1">Финес Студио в цифрах: боты, CRM, веб-сервисы и интеграции для малого бизнеса.</p></div><div style="display:flex;gap:10px;flex-wrap:wrap"><div class="flt"><button>Месяц</button><button>Квартал</button><button class="on">Всё время</button></div><a class="bt" href="${TG}">Обсудить проект</a></div></div>
<section><div class="g kpi">${C.stats.map((s, i) => `<div class="pn rv d${i}"><h3>${s.l}<span>●</span></h3><b>${s.v}</b><em>▲ ${['+12 за год', 'быстрее рынка', 'в рабочее время', 'на каждый проект'][i]}</em>${sp([[8, 12, 10, 18, 22, 20, 30, 34], [30, 26, 22, 24, 18, 16, 14, 12], [20, 22, 18, 24, 20, 26, 22, 28], [14, 18, 22, 22, 26, 28, 30, 32]][i])}</div>`).join('')}</div>
</section><section><div class="g r2"><div class="pn rv"><h3>Запущенные проекты по месяцам<span>2026</span></h3><div class="chart">${[5, 7, 6, 9, 11, 8].map((v, i) => `<div><i style="height:${v * 8}%;animation-delay:${i * .08}s"></i><span>${months[i]}</span></div>`).join('')}</div></div>
<div class="pn rv d1"><h3>Структура проектов</h3><div class="donut"><svg viewBox="0 0 42 42"><circle cx="21" cy="21" r="15.9" fill="none" stroke="#232734" stroke-width="6"/><circle cx="21" cy="21" r="15.9" fill="none" stroke="#f2501c" stroke-width="6" stroke-dasharray="42 58"/><circle cx="21" cy="21" r="15.9" fill="none" stroke="#ffc21a" stroke-width="6" stroke-dasharray="26 74" stroke-dashoffset="-42"/><circle cx="21" cy="21" r="15.9" fill="none" stroke="#8a7bff" stroke-width="6" stroke-dasharray="18 82" stroke-dashoffset="-68"/><circle cx="21" cy="21" r="15.9" fill="none" stroke="#3ddc97" stroke-width="6" stroke-dasharray="14 86" stroke-dashoffset="-86"/></svg></div><div class="lg"><div><span><i style="background:#f2501c"></i>Боты</span>42%</div><div><span><i style="background:#ffc21a"></i>CRM</span>26%</div><div><span><i style="background:#8a7bff"></i>Веб-сервисы</span>18%</div><div><span><i style="background:#3ddc97"></i>Интеграции</span>14%</div></div></div></div>
</section><section><div class="g r3" id="s">${C.services.slice(0, 3).map((s, i) => `<div class="pn svc rv d${i}"><h3>Услуга<span>${s.d}</span></h3><h4>${s.t}</h4><p>${s.s}</p><div class="bar"><i style="width:${[92, 78, 64][i]}%"></i></div><div class="ft"><span>Довольны: ${[98, 96, 95][i]}%</span><b>${s.p}</b></div></div>`).join('')}</div>
</section><section><div class="pn rv" style="margin-top:16px" id="c"><h3>Кейсы клиентов<span>метрика через 1–3 мес</span></h3><div class="tw"><table><tr><th>Клиент</th><th>Решение</th><th>Метрика</th><th>Результат</th><th>Статус</th></tr>${C.cases.map(c => `<tr><td>${c.c}</td><td>${c.t}</td><td>${c.ml}</td><td><b>${c.m}</b></td><td><span class="pill">в работе у клиента</span></td></tr>`).join('')}</table></div></div>
</section><section><div class="g r4" id="p">${C.plans.map((p, i) => `<div class="pn rv d${i}${p.hot ? ' hot' : ''}"><h3>${p.t}<span>${p.for}</span></h3><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul></div>`).join('')}</div>
</section><section><div class="g r5"><div class="pn log rv"><h3>Журнал событий<span>сегодня</span></h3>${[['09:12', 'Бот «Зерно» принял 48-й заказ за утро'], ['10:40', 'CRM «СтройДвор»: счёт отправлен за 2 клика'], ['12:05', 'Демо Mini App для «Грядки» — клиент доволен'], ['14:30', 'Интеграция с 1С: остатки синхронизированы'], ['16:00', 'Новый клиент: написал в ' + TGH]].map(l => `<div><span>${l[0]}</span>${l[1]}</div>`).join('')}</div>
<div class="pn rv d1" id="f"><h3>Вопросы<span>FAQ</span></h3>${C.faq.slice(0, 5).map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}<a class="bt" style="margin-top:16px" href="${TG}">Написать ${TGH}</a></div></div>
</section><footer><span>© 2026 Финес Студио</span><span>Данные обновлены: ноябрь 2026</span></footer></main></div>`;
  const js = `document.querySelectorAll('.flt button').forEach(b=>b.onclick=()=>document.querySelectorAll('.flt button').forEach(x=>x.classList.toggle('on',x===b)));`;
  return page({ n: 34, title: this.title, fonts: ['Inter Tight', 'JetBrains Mono'], css, body, js });
} });

// 35 — Скандинавский мягкий
L.push({ n: 35, title: 'Мягкий скандинавский', idea: 'Пастельные тона, крупные скругления, дружелюбные иллюстрации из простых фигур и спокойный тон; уютно и не страшно — для тех, кто впервые заказывает разработку', build() {
  const css = `
body{font-family:'Nunito',sans-serif;background:#fbf7f2;color:#2d2a32;font-size:17px;line-height:1.6}
.w{max-width:1160px;margin:0 auto;padding:0 24px}
header{display:flex;justify-content:space-between;align-items:center;padding:22px 0}
header nav{display:flex;gap:6px}
header nav a{padding:8px 16px;border-radius:99px;font-weight:700;font-size:15px;color:#5d5866}
header nav a:hover{background:#f1e8de}
.bt{display:inline-block;background:#f2501c;color:#fff;border-radius:99px;padding:14px 26px;font-weight:800;font-size:16px;transition:.25s;box-shadow:0 10px 24px -12px #f2501c}
.bt:hover{transform:translateY(-2px);box-shadow:0 14px 28px -12px #f2501c}
.bt.s{background:#fff;color:#2d2a32;box-shadow:0 6px 18px -10px rgba(0,0,0,.2)}
.hero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:40px;align-items:center;padding:50px 0 70px}
.hero .hi{display:inline-block;background:#ffe9c7;border-radius:99px;padding:6px 16px;font-weight:700;font-size:15px}
.hero h1{font-size:clamp(40px,5.4vw,70px);font-weight:900;letter-spacing:-.03em;line-height:1.04;margin:18px 0}
.hero h1 span{color:#f2501c}
.hero p{font-size:19px;color:#5d5866;max-width:500px;margin-bottom:28px}
.hero .r{display:flex;gap:12px;flex-wrap:wrap}
.ill{position:relative;aspect-ratio:1/1;max-width:480px;justify-self:center;width:100%}
.ill>*{position:absolute;border-radius:50%}
.ill .a{inset:8% 8% 8% 8%;background:#ffe3d4}
.ill .b{width:46%;height:46%;left:12%;top:20%;background:#f2501c;mix-blend-mode:multiply;animation:fl 7s ease-in-out infinite}
.ill .c{width:46%;height:46%;right:12%;top:20%;background:#ffc21a;mix-blend-mode:multiply;animation:fl 7s ease-in-out infinite reverse}
.ill .d{width:24%;height:24%;left:38%;bottom:10%;background:#b9e3d0;border-radius:40% 60% 50% 50%}
.ill .e{width:14%;height:14%;right:6%;top:6%;background:#c9d4ff}
.ill .msg{border-radius:20px 20px 20px 6px;background:#fff;padding:12px 16px;font-weight:700;font-size:15px;box-shadow:0 14px 30px -14px rgba(0,0,0,.25);white-space:nowrap}
.ill .m1{left:-4%;bottom:22%}.ill .m2{right:-2%;bottom:6%;border-radius:20px 20px 6px 20px;background:#2d2a32;color:#fff}
@keyframes fl{50%{transform:translateY(-12px)}}
.sec{padding:70px 0}
.sh{text-align:center;max-width:640px;margin:0 auto 40px}
.sh h2{font-size:clamp(32px,4vw,50px);font-weight:900;letter-spacing:-.03em;line-height:1.08}
.sh p{color:#5d5866;margin-top:10px}
.svc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.svc>div{border-radius:28px;padding:30px;transition:transform .25s}
.svc>div:hover{transform:translateY(-6px)}
.svc .ic{width:64px;height:64px;border-radius:20px;background:rgba(255,255,255,.7);display:grid;place-items:center;font-size:30px;margin-bottom:18px}
.svc h3{font-size:22px;font-weight:900;margin-bottom:8px}
.svc p{font-size:16px;color:#4a4652}
.svc .pr{display:inline-block;margin-top:16px;background:#fff;border-radius:99px;padding:6px 14px;font-weight:800;font-size:14.5px}
.steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
.steps>div{background:#fff;border-radius:24px;padding:24px;text-align:center;box-shadow:0 10px 30px -20px rgba(0,0,0,.2)}
.steps .n{width:52px;height:52px;border-radius:50%;margin:0 auto 14px;display:grid;place-items:center;font-weight:900;font-size:20px}
.steps h3{font-size:18px;font-weight:800;margin-bottom:6px}.steps p{font-size:14.5px;color:#5d5866}
.cs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.cs>div{background:#fff;border-radius:28px;padding:28px;box-shadow:0 10px 30px -20px rgba(0,0,0,.2)}
.cs .m{font-size:46px;font-weight:900;letter-spacing:-.03em;color:#f2501c;line-height:1}
.cs h3{font-size:17px;margin:8px 0 4px}.cs p{font-size:15px;color:#5d5866}
.team{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}
.team>div{text-align:center}
.team .av{width:120px;height:120px;border-radius:50%;margin:0 auto 14px;display:grid;place-items:center;font-size:44px;font-weight:900;color:#fff}
.team h3{font-size:19px;font-weight:900}.team small{display:block;color:#f2501c;font-weight:700}.team p{font-size:14.5px;color:#5d5866;margin-top:6px}
.pl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.pl>div{background:#fff;border-radius:28px;padding:32px;box-shadow:0 10px 30px -20px rgba(0,0,0,.2)}
.pl .hot{background:#2d2a32;color:#fff}
.pl .p{font-size:36px;font-weight:900;letter-spacing:-.03em;margin:8px 0 14px}
.pl li{list-style:none;padding:5px 0}.pl li::before{content:'● ';color:#f2501c}
.faq{max-width:800px;margin:0 auto}
.faq details{background:#fff;border-radius:22px;padding:18px 24px;margin-bottom:12px;box-shadow:0 6px 20px -16px rgba(0,0,0,.2)}.faq summary{font-weight:800;cursor:pointer}.faq p{color:#5d5866;margin-top:8px}
.end{background:#ffe3d4;border-radius:40px;padding:60px 30px;text-align:center;margin:30px 0 40px}
.end h2{font-size:clamp(32px,4.6vw,56px);font-weight:900;letter-spacing:-.03em;line-height:1.06;margin-bottom:12px}
.end p{color:#5d5866;margin-bottom:26px}
footer{display:flex;justify-content:space-between;color:#8a8492;font-size:14.5px;padding:0 0 40px;flex-wrap:wrap;gap:10px}
@media(max-width:900px){header nav{display:none}.hero{grid-template-columns:minmax(0,1fr)}.svc,.cs,.pl{grid-template-columns:minmax(0,1fr)}.steps{grid-template-columns:minmax(0,1fr)}.team{grid-template-columns:repeat(2,minmax(0,1fr))}.ill{max-width:340px}.ill .msg{font-size:13px}.ill .m1{left:0}.ill .m2{right:0}}`;
  const pas = ['#ffe3d4', '#dff1e8', '#e3e8ff', '#fff1c9', '#f6e1f3'];
  const body = `<div class="w"><header>${logo()}<nav><a href="#s">Услуги</a><a href="#h">Как работаем</a><a href="#t">Команда</a><a href="#p">Цены</a></nav><a class="bt" style="padding:11px 20px;font-size:15px" href="${TG}">Написать</a></header>
<section class="hero"><div><span class="hi rv">👋 Привет! Мы Финес Студио</span><h1 class="rv d1">Тонкая работа <span>для вашего бизнеса.</span></h1><p class="rv d2">Делаем ботов, CRM и веб-сервисы для малого бизнеса. Спокойно объясняем, честно считаем и аккуратно доводим до запуска. Даже если вы никогда раньше не заказывали разработку.</p><div class="r rv d3"><a class="bt" href="${TG}">Рассказать о задаче</a><a class="bt s" href="#h">Как всё устроено</a></div></div>
<div class="ill rv d2"><span class="a"></span><span class="b"></span><span class="c"></span><span class="d"></span><span class="e"></span><span class="msg m1">Можно бота для записи? 🙂</span><span class="msg m2">Конечно! Через 2 недели ✨</span></div></section>
<section class="sec" id="s"><div class="sh"><h2 class="rv">Чем можем помочь</h2><p>Выберите, что болит, — подскажем, как вылечить.</p></div><div class="svc">${C.services.map((s, i) => `<div class="rv d${i % 3}" style="background:${pas[i]}"><div class="ic">${['🤖', '📋', '🌐', '🔗', '🏠'][i]}</div><h3>${s.t}</h3><p>${s.s}</p><span class="pr">${s.p}</span></div>`).join('')}<div class="rv" style="background:#fff;border:2px dashed #e5d9cc;border-radius:28px;padding:30px"><div class="ic" style="background:#fbf7f2">💬</div><h3 style="font-size:22px;font-weight:900;margin-bottom:8px">Не знаете, что нужно?</h3><p style="font-size:16px;color:#4a4652">Просто опишите, как сейчас всё работает. Мы предложим решение.</p></div></div></section>
<section class="sec" id="h"><div class="sh"><h2 class="rv">Как мы работаем</h2><p>Пять спокойных шагов без сюрпризов.</p></div><div class="steps">${C.steps.map((s, i) => `<div class="rv d${i}"><div class="n" style="background:${pas[i]}">${i + 1}</div><h3>${s.t}</h3><p>${s.s}</p></div>`).join('')}</div></section>
<section class="sec"><div class="sh"><h2 class="rv">Что получилось у клиентов</h2></div><div class="cs">${C.cases.map((c, i) => `<div class="rv d${i % 3}"><div class="m">${c.m}</div><h3>${c.ml}</h3><p>${c.c} · ${c.t}</p></div>`).join('')}</div></section>
<section class="sec" id="t"><div class="sh"><h2 class="rv">Кто будет с вами работать</h2></div><div class="team">${C.team.map((t, i) => `<div class="rv d${i}"><div class="av" style="background:${['#f2501c', '#ffb01a', '#6ac39c', '#8a9bff'][i]}">${t.n[0]}</div><h3>${t.n}</h3><small>${t.r}</small><p>${t.s}</p></div>`).join('')}</div></section>
<section class="sec" id="p"><div class="sh"><h2 class="rv">Сколько стоит</h2><p>Цена фиксируется в договоре. Платите частями.</p></div><div class="pl">${C.plans.map((p, i) => `<div class="rv d${i}${p.hot ? ' hot' : ''}"><b style="font-size:20px">${p.t}</b><div style="opacity:.75">${p.for}</div><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul></div>`).join('')}</div></section>
<section class="sec faq"><div class="sh"><h2 class="rv">Частые вопросы</h2></div>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</section>
<section class="end rv"><h2>Давайте знакомиться?</h2><p>Напишите нам — ответим тепло и быстро, за 15 минут.</p><a class="bt" href="${TG}">Написать ${TGH}</a></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div>`;
  return page({ n: 35, title: this.title, fonts: ['Nunito'], css, body });
} });

export default L;
