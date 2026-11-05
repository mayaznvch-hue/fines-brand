import { page, logo, C, TG, TGH, dot } from './core.mjs';
const L = [];

// 46 — Баухаус
L.push({ n: 46, title: 'Баухаус', idea: 'Геометрия Баухауса: круги, квадраты и треугольники в основных цветах, строгая сетка и гротеск; дизайнерски и функционально — для клиентов, ценящих форму и порядок', build() {
  const css = `
body{font-family:'Jost',sans-serif;background:#f1ece1;color:#151515;font-size:17px}
.w{max-width:1240px;margin:0 auto;padding:0 24px}
header{display:flex;justify-content:space-between;align-items:center;padding:20px 0;border-bottom:3px solid #151515}
header nav{display:flex;gap:0}
header nav a{padding:6px 16px;font-weight:600;text-transform:uppercase;font-size:14px;letter-spacing:.08em;border-left:3px solid #151515}
header nav a:hover{background:#ffc21a}
.bt{display:inline-block;background:#151515;color:#fff;padding:14px 26px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;font-size:14px;transition:.2s}
.bt:hover{background:#f2501c}
.bt.r{background:#f2501c}.bt.r:hover{background:#2141b8}
.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);border-bottom:3px solid #151515;min-height:600px}
.hero .t{padding:60px 40px 60px 0;border-right:3px solid #151515;display:flex;flex-direction:column;justify-content:space-between;gap:30px}
.hero h1{font-size:clamp(46px,6.4vw,96px);line-height:.92;font-weight:700;letter-spacing:-.03em;text-transform:uppercase}
.hero h1 span{color:#f2501c}
.hero p{font-size:19px;max-width:440px;line-height:1.5}
.comp{position:relative;overflow:hidden;background:#f1ece1;min-height:420px}
.comp div{position:absolute;transition:transform .6s cubic-bezier(.3,1.4,.5,1)}
.comp:hover .c1{transform:translate(-20px,10px)}.comp:hover .s1{transform:rotate(12deg)}.comp:hover .tr{transform:translateY(-16px)}
.c1{width:58%;aspect-ratio:1;border-radius:50%;background:#f2501c;left:8%;top:10%}
.s1{width:38%;aspect-ratio:1;background:#2141b8;right:6%;bottom:8%}
.tr{width:0;height:0;border-left:110px solid transparent;border-right:110px solid transparent;border-bottom:190px solid #ffc21a;right:12%;top:6%}
.ln{height:14px;width:70%;background:#151515;left:0;bottom:30%}
.c2{width:16%;aspect-ratio:1;border-radius:50%;background:#151515;left:12%;bottom:8%}
.sec{border-bottom:3px solid #151515;padding:70px 0}
.sh{display:grid;grid-template-columns:120px minmax(0,1fr);gap:20px;align-items:center;margin-bottom:40px}
.sh .ic{width:90px;height:90px}
.sh h2{font-size:clamp(34px,4.4vw,62px);text-transform:uppercase;letter-spacing:-.02em;line-height:.95}
.svc{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));border:3px solid #151515}
.svc>div{padding:26px 20px;border-right:3px solid #151515;background:#fff;transition:background .2s}
.svc>div:last-child{border:0}
.svc>div:hover{background:#ffc21a}
.svc .g{height:56px;margin-bottom:18px;display:flex;align-items:flex-end}
.svc h3{font-size:20px;text-transform:uppercase;letter-spacing:.02em;margin-bottom:8px;line-height:1.1}.svc p{font-size:15px;line-height:1.5}.svc b{display:block;margin-top:14px;font-size:17px}
.cs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;border:3px solid #151515}
.cs>div{padding:30px 26px;border-right:3px solid #151515;border-bottom:3px solid #151515}
.cs>div:nth-child(3n){border-right:0}.cs>div:nth-child(n+4){border-bottom:0}
.cs>div:nth-child(1){background:#f2501c;color:#fff}.cs>div:nth-child(5){background:#2141b8;color:#fff}.cs>div:nth-child(3){background:#ffc21a}
.cs .m{font-size:clamp(46px,5vw,74px);font-weight:700;letter-spacing:-.04em;line-height:1}
.cs h3{text-transform:uppercase;font-size:16px;letter-spacing:.06em;margin:12px 0 4px}.cs p{font-size:15px}
.steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:24px}
.steps .f{width:64px;height:64px;margin-bottom:16px;display:grid;place-items:center;font-weight:700;font-size:26px;color:#fff}
.steps h3{text-transform:uppercase;font-size:18px;margin-bottom:6px}.steps p{font-size:15px;line-height:1.5}.steps small{display:block;margin-top:8px;font-weight:700}
.pl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border:3px solid #151515}
.pl>div{padding:34px 28px;border-right:3px solid #151515;background:#fff}
.pl>div:last-child{border:0}
.pl .hot{background:#151515;color:#fff}
.pl .p{font-size:40px;font-weight:700;letter-spacing:-.03em;margin:10px 0 16px}
.pl li{list-style:none;padding:7px 0;border-top:1px solid rgba(128,128,128,.3)}
.pl ul{margin-bottom:24px}
.faq{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 40px}
.faq details{border-top:3px solid #151515;padding:16px 0}.faq summary{font-weight:700;cursor:pointer;text-transform:uppercase;font-size:15px;letter-spacing:.04em}.faq p{margin-top:8px}
.end{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:40px;align-items:center;padding:70px 0}
.end h2{font-size:clamp(44px,6vw,92px);text-transform:uppercase;line-height:.92;letter-spacing:-.03em}
.end .geo{height:240px;position:relative}
.end .geo i{position:absolute}
footer{display:flex;justify-content:space-between;padding:20px 0 40px;font-size:14px;text-transform:uppercase;letter-spacing:.08em;border-top:3px solid #151515;flex-wrap:wrap;gap:10px}
@media(max-width:1000px){.svc{grid-template-columns:repeat(2,minmax(0,1fr))}.svc>div{border-right:0;border-bottom:3px solid #151515}.steps{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:860px){header nav{display:none}.hero,.cs,.pl,.faq,.end{grid-template-columns:minmax(0,1fr)}.hero .t{border-right:0;border-bottom:3px solid #151515;padding:40px 0}.comp{min-height:340px}.tr{border-left-width:70px;border-right-width:70px;border-bottom-width:120px}.cs>div{border-right:0!important;border-bottom:3px solid #151515!important}.pl>div{border-right:0;border-bottom:3px solid #151515}.sh{grid-template-columns:70px minmax(0,1fr)}.sh .ic{width:60px;height:60px}.end .geo{display:none}}
@media(max-width:480px){.svc,.steps{grid-template-columns:minmax(0,1fr)}}`;
  const shp = [`<i style="width:52px;height:52px;border-radius:50%;background:#f2501c;display:block"></i>`, `<i style="width:52px;height:52px;background:#2141b8;display:block"></i>`, `<i style="width:0;height:0;border-left:28px solid transparent;border-right:28px solid transparent;border-bottom:52px solid #ffc21a;display:block"></i>`, `<i style="width:60px;height:14px;background:#151515;display:block"></i>`, `<i style="width:52px;height:26px;border-radius:52px 52px 0 0;background:#f2501c;display:block"></i>`];
  const sc = ['#f2501c', '#2141b8', '#151515', '#f2501c', '#2141b8'];
  const ic = (c, t) => t === 'c' ? `<svg class="ic" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="${c}"/></svg>` : t === 's' ? `<svg class="ic" viewBox="0 0 10 10"><rect width="10" height="10" fill="${c}"/></svg>` : `<svg class="ic" viewBox="0 0 10 10"><path d="M5 0L10 10H0z" fill="${c}"/></svg>`;
  const body = `<div class="w"><header>${logo()}<nav><a href="#s">Услуги</a><a href="#c">Кейсы</a><a href="#p">Цены</a><a href="#f">FAQ</a></nav><a class="bt" href="${TG}">Написать</a></header>
<section class="hero"><div class="t"><h1 class="rv">Форма<br>следует<br><span>функции.</span></h1><div><p class="rv d1">Финес Студио — тонкая работа для вашего бизнеса. Боты, CRM и веб-сервисы, где каждый элемент на своём месте и ничего лишнего.</p><div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:24px" class="rv d2"><a class="bt r" href="${TG}">Обсудить проект</a><a class="bt" href="#c">Кейсы</a></div></div></div>
<div class="comp rv d1"><div class="c1"></div><div class="tr"></div><div class="s1"></div><div class="ln"></div><div class="c2"></div></div></section>
<section class="sec" id="s"><div class="sh">${ic('#f2501c', 'c')}<h2 class="rv">Пять функций</h2></div><div class="svc">${C.services.map((s, i) => `<div class="rv d${i}"><div class="g">${shp[i]}</div><h3>${s.t}</h3><p>${s.s}</p><b>${s.p}</b></div>`).join('')}</div></section>
<section class="sec" id="c"><div class="sh">${ic('#2141b8', 's')}<h2 class="rv">Результат в цифрах</h2></div><div class="cs">${C.cases.map((c, i) => `<div class="rv d${i % 3}"><div class="m">${c.m}</div><h3>${c.c}</h3><p>${c.ml}</p></div>`).join('')}</div></section>
<section class="sec"><div class="sh">${ic('#ffc21a', 't')}<h2 class="rv">Порядок работы</h2></div><div class="steps">${C.steps.map((s, i) => `<div class="rv d${i}"><div class="f" style="background:${sc[i]};${i % 2 ? '' : 'border-radius:50%'}">${i + 1}</div><h3>${s.t}</h3><p>${s.s}</p><small>${s.d}</small></div>`).join('')}</div></section>
<section class="sec" id="p"><div class="sh">${ic('#151515', 's')}<h2 class="rv">Стоимость</h2></div><div class="pl">${C.plans.map((p, i) => `<div class="rv d${i}${p.hot ? ' hot' : ''}"><b style="text-transform:uppercase;letter-spacing:.08em">${p.t}</b><div style="opacity:.7">${p.for}</div><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul><a class="bt${p.hot ? ' r' : ''}" href="${TG}">Выбрать</a></div>`).join('')}</div></section>
<section class="sec" id="f"><div class="sh">${ic('#f2501c', 't')}<h2 class="rv">Вопросы</h2></div><div class="faq">${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></section>
<section class="end"><div><h2 class="rv">Соберём<br>ваш проект</h2><a class="bt r rv d1" style="margin-top:26px" href="${TG}">Написать ${TGH}</a></div><div class="geo"><i style="width:180px;height:180px;border-radius:50%;background:#f2501c;left:0;top:0"></i><i style="width:130px;height:130px;background:#2141b8;right:0;bottom:0"></i><i style="width:0;height:0;border-left:60px solid transparent;border-right:60px solid transparent;border-bottom:100px solid #ffc21a;right:20px;top:0"></i></div></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div>`;
  return page({ n: 46, title: this.title, fonts: ['Jost'], css, body });
} });

// 47 — Блокнот / скетч
L.push({ n: 47, title: 'Рабочий блокнот', idea: 'Сайт как страницы блокнота в клетку: рукописные заметки, стрелки, стикеры и маркер; тёплая «живая» подача, будто проект обсуждают за столом — для небольших команд и стартапов', build() {
  const css = `
body{font-family:'Nunito',sans-serif;background:#e9e4da;color:#23262e;font-size:17px}
.pad{max-width:1120px;margin:30px auto;background:#fffdf6;background-image:linear-gradient(#dfe8f2 1px,transparent 1px),linear-gradient(90deg,#dfe8f2 1px,transparent 1px);background-size:26px 26px;border-radius:6px;box-shadow:0 30px 60px -30px rgba(0,0,0,.35),0 0 0 1px rgba(0,0,0,.04);position:relative;padding:0 60px 40px 90px;overflow:hidden}
.pad::before{content:'';position:absolute;left:60px;top:0;bottom:0;width:2px;background:#f4a3a3}
.holes{position:absolute;left:18px;top:30px;bottom:30px;width:22px;background:radial-gradient(circle,#e9e4da 8px,transparent 9px) 0 0/22px 64px repeat-y}
.hw{font-family:'Caveat',cursive}
header{display:flex;justify-content:space-between;align-items:center;padding:28px 0 20px;gap:16px}
header nav{display:flex;gap:22px;font-family:'Caveat';font-size:24px}
header nav a:hover{color:#f2501c;text-decoration:underline wavy}
.bt{display:inline-block;background:#23262e;color:#fff;border-radius:10px;padding:12px 22px;font-weight:800;transition:transform .2s;transform:rotate(-1deg)}
.bt:hover{transform:rotate(1deg) scale(1.04);background:#f2501c}
.mk{background:linear-gradient(transparent 55%,#ffc21a99 55%,#ffc21a99 90%,transparent 90%);padding:0 4px}
.hero{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);gap:30px;padding:40px 0 60px;align-items:center}
.hero .k{font-family:'Caveat';font-size:28px;color:#f2501c;transform:rotate(-2deg);display:inline-block}
.hero h1{font-size:clamp(38px,5vw,66px);font-weight:900;line-height:1.05;letter-spacing:-.03em;margin:10px 0 18px}
.hero p{font-size:19px;line-height:1.6;color:#454a55;max-width:520px;margin-bottom:24px}
.stk{background:#fff27a;padding:22px 22px 26px;transform:rotate(3deg);box-shadow:0 14px 24px -14px rgba(0,0,0,.35);position:relative;font-family:'Caveat';font-size:26px;line-height:1.25}
.stk::before{content:'';position:absolute;top:-12px;left:50%;width:90px;height:26px;background:rgba(255,255,255,.6);transform:translateX(-50%) rotate(-4deg)}
.stk li{list-style:none;padding:2px 0}
.stk li::before{content:'☐ '}.stk li.d{color:#7a6f2a}.stk li.d::before{content:'☑ '}
.arrow{font-family:'Caveat';font-size:24px;color:#2c63c9;margin-top:18px;display:flex;align-items:center;gap:8px;transform:rotate(-2deg)}
.sec{padding:50px 0}
.sec h2{font-size:clamp(30px,3.8vw,46px);font-weight:900;letter-spacing:-.03em;line-height:1.1;margin-bottom:8px}
.sec .note{font-family:'Caveat';font-size:24px;color:#2c63c9;margin-bottom:28px;display:block}
.svc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
.card{background:#fff;border:2px solid #23262e;border-radius:14px 18px 12px 20px/18px 12px 20px 14px;padding:22px;transition:transform .25s;position:relative}
.card:nth-child(2n){transform:rotate(.8deg)}.card:nth-child(2n+1){transform:rotate(-.6deg)}
.card:hover{transform:rotate(0) translateY(-4px)}
.card h3{font-size:20px;font-weight:900;margin-bottom:6px}.card p{font-size:15.5px;color:#454a55;line-height:1.5}
.card .pr{font-family:'Caveat';font-size:26px;color:#f2501c;margin-top:10px}
.card .ic{font-size:32px;margin-bottom:8px}
.cs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
.polo{background:#fff;padding:14px 14px 18px;box-shadow:0 12px 24px -14px rgba(0,0,0,.4)}
.polo:nth-child(odd){transform:rotate(-2deg)}.polo:nth-child(even){transform:rotate(2deg)}
.polo .ph{aspect-ratio:4/3;display:grid;place-items:center;font-size:clamp(36px,4vw,54px);font-weight:900;letter-spacing:-.04em;color:#23262e}
.polo .cap{font-family:'Caveat';font-size:24px;margin-top:10px;line-height:1.15}
.polo small{font-size:14px;color:#6a6f7a}
.steps{display:grid;gap:18px;max-width:780px}
.steps>div{display:grid;grid-template-columns:56px minmax(0,1fr);gap:16px;align-items:start}
.steps .n{width:50px;height:50px;border:2.5px solid #f2501c;border-radius:50% 45% 52% 48%;display:grid;place-items:center;font-family:'Caveat';font-size:30px;color:#f2501c;font-weight:700}
.steps h3{font-size:19px;font-weight:900}.steps p{color:#454a55;font-size:16px}.steps i{font-family:'Caveat';font-style:normal;color:#2c63c9;font-size:21px}
.pl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
.pl .card .p{font-size:32px;font-weight:900;letter-spacing:-.03em;margin:6px 0 10px}
.pl .card li{list-style:none;padding:3px 0;font-size:15.5px}.pl .card li::before{content:'✓ ';color:#2fa36b;font-weight:900}
.pl .hot{border-color:#f2501c;border-width:3px}
.pl .hot::after{content:'берут чаще всего!';position:absolute;top:-18px;right:10px;font-family:'Caveat';font-size:22px;background:#ffc21a;padding:0 10px;transform:rotate(4deg)}
.faq details{border-bottom:2px dashed #b9c4d2;padding:14px 0}.faq summary{font-weight:800;cursor:pointer}.faq p{color:#454a55;margin-top:6px}
.rvw{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
.rvw .stk{font-size:22px;transform:rotate(-2deg)}.rvw .stk:nth-child(2){background:#ffd1dc;transform:rotate(2deg)}.rvw .stk:nth-child(3){background:#c8f0da;transform:rotate(-1deg)}
.rvw .stk b{display:block;font-family:'Nunito';font-size:14px;margin-top:10px}
.end{text-align:center;padding:60px 0 30px}
.end h2{font-size:clamp(34px,5vw,62px);font-weight:900;letter-spacing:-.03em;line-height:1.05}
.end .hw{font-size:28px;color:#2c63c9;margin:10px 0 24px;display:block}
footer{display:flex;justify-content:space-between;padding:20px 0 0;font-size:14px;color:#6a6f7a;border-top:2px dashed #b9c4d2;flex-wrap:wrap;gap:10px}
@media(max-width:900px){.pad{padding:0 20px 30px 46px;margin:0;border-radius:0}.pad::before{left:34px}.holes{left:6px;width:18px}header nav{display:none}.hero,.svc,.cs,.pl,.rvw{grid-template-columns:minmax(0,1fr)}.stk{transform:rotate(1.5deg)}}`;
  const bg = ['#ffe3d4', '#e2ecff', '#dff3e8', '#fff1c7', '#f3e3f7', '#ffd9e2'];
  const body = `<div class="pad"><div class="holes"></div><header>${logo()}<nav><a href="#s">услуги</a><a href="#c">кейсы</a><a href="#p">цены</a><a href="#f">вопросы</a></nav><a class="bt" href="${TG}">Написать</a></header>
<section class="hero"><div><span class="k rv">заметки к встрече ✎</span><h1 class="rv d1">Тонкая работа для <span class="mk">вашего бизнеса.</span></h1><p class="rv d2">Финес Студио — небольшая команда, которая делает Telegram-ботов, CRM и веб-сервисы. Мы садимся с вами за стол (или в Telegram), раскладываем задачу по полочкам и делаем ровно то, что нужно.</p><a class="bt rv d3" href="${TG}">Обсудить задачу</a><div class="arrow rv d3">↖ ответим за 15 минут, честно</div></div>
<div class="stk rv d2"><b>План на месяц:</b><ul><li class="d">созвониться, понять задачу</li><li class="d">прислать смету (бесплатно)</li><li>собрать бота — 2 недели</li><li>показать демо в пятницу</li><li>запустить и выдохнуть</li></ul></div></section>
<section class="sec" id="s"><h2 class="rv">Что мы умеем</h2><span class="note">← цены «от», точная — после разговора</span><div class="svc">${C.services.map((s, i) => `<div class="card rv d${i % 3}"><div class="ic">${['🤖', '📊', '🌐', '🔌', '🏪'][i]}</div><h3>${s.t}</h3><p>${s.s}</p><div class="pr">${s.p} · ${s.d}</div></div>`).join('')}<div class="card rv" style="background:#23262e;color:#fff;border-color:#23262e"><div class="ic">💬</div><h3>Не нашли своё?</h3><p style="color:#c9ccd4">Напишите — разберёмся, можно ли решить задачу проще и дешевле.</p><div class="pr" style="color:#ffc21a">${TGH}</div></div></div></section>
<section class="sec" id="c"><h2 class="rv">Фото с прошлых проектов</h2><span class="note">(шучу, это цифры — но они важнее фото)</span><div class="cs">${C.cases.map((c, i) => `<div class="polo rv d${i % 3}"><div class="ph" style="background:${bg[i]}">${c.m}</div><div class="cap">${c.c} — ${c.ml}</div><small>${c.t}</small></div>`).join('')}</div></section>
<section class="sec"><h2 class="rv">Как всё будет</h2><span class="note">по шагам, без сюрпризов</span><div class="steps">${C.steps.map((s, i) => `<div class="rv"><div class="n">${i + 1}</div><div><h3>${s.t} <i>— ${s.d}</i></h3><p>${s.s}</p></div></div>`).join('')}</div></section>
<section class="sec" id="p"><h2 class="rv">Сколько стоит</h2><span class="note">цена фиксируется в договоре ✓</span><div class="pl">${C.plans.map((p, i) => `<div class="card rv d${i}${p.hot ? ' hot' : ''}"><h3>${p.t}</h3><p>${p.for}</p><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul></div>`).join('')}</div></section>
<section class="sec"><h2 class="rv">Что пишут клиенты</h2><span class="note">стикеры с холодильника</span><div class="rvw">${C.reviews.map((r, i) => `<div class="stk rv d${i}">«${r.q}»<b>${r.n}, ${r.r}</b></div>`).join('')}</div></section>
<section class="sec faq" id="f"><h2 class="rv">Вопросы на полях</h2><span class="note">то, что спрашивают чаще всего</span>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</section>
<section class="end"><h2 class="rv">Откроем новую страницу?</h2><span class="hw">напишите пару строк о задаче — остальное за нами</span><a class="bt" href="${TG}">Написать ${TGH}</a></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div>`;
  return page({ n: 47, title: this.title, fonts: ['Nunito', 'Caveat'], css, body });
} });

// 48 — Рабочий стол ОС
L.push({ n: 48, title: 'Рабочий стол', idea: 'Сайт как рабочий стол операционной системы: окна-разделы, иконки, док и меню-бар; игриво и запоминаемо, демонстрирует умение делать интерфейсы — для технологичных клиентов', build() {
  const css = `
body{font-family:'Inter Tight',sans-serif;background:#2b1f3d;color:#1d1d1f;font-size:16px;min-height:100vh;background:radial-gradient(1200px 700px at 80% 0%,#f2501c 0%,transparent 55%),radial-gradient(900px 600px at 0% 100%,#ffc21a 0%,transparent 50%),linear-gradient(160deg,#5a2a6e,#2b1f3d)}
.mb{position:sticky;top:0;z-index:40;height:34px;background:rgba(255,255,255,.55);backdrop-filter:blur(20px) saturate(1.6);display:flex;align-items:center;gap:22px;padding:0 18px;font-size:14px;font-weight:500}
.mb .flogo{--lg:18px}
.mb .flogo .fs{display:none}
.mb a:hover{color:#f2501c}
.mb .r{margin-left:auto;display:flex;gap:16px;font-variant-numeric:tabular-nums}
.desk{max-width:1320px;margin:0 auto;padding:30px 24px 160px;display:grid;grid-template-columns:110px minmax(0,1fr);gap:26px}
.icons{display:flex;flex-direction:column;gap:22px;position:sticky;top:60px;align-self:start}
.icons a{display:flex;flex-direction:column;align-items:center;gap:6px;color:#fff;font-size:13px;font-weight:500;text-align:center;text-shadow:0 1px 3px rgba(0,0,0,.5)}
.icons i{width:62px;height:62px;border-radius:16px;display:grid;place-items:center;font-size:30px;font-style:normal;box-shadow:0 8px 20px -8px rgba(0,0,0,.5);transition:transform .2s}
.icons a:hover i{transform:scale(1.1)}
.wins{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:24px}
.win{background:rgba(255,255,255,.93);backdrop-filter:blur(20px);border-radius:14px;overflow:hidden;box-shadow:0 30px 60px -20px rgba(0,0,0,.55),0 0 0 .5px rgba(0,0,0,.2)}
.tb{height:38px;background:linear-gradient(#f4f4f6,#e6e6ea);display:flex;align-items:center;padding:0 14px;gap:8px;border-bottom:1px solid #d4d4d8;font-size:13.5px;font-weight:600;color:#55555c}
.tb i{width:12px;height:12px;border-radius:50%;flex:none}
.tb i:nth-child(1){background:#ff5f57}.tb i:nth-child(2){background:#febc2e}.tb i:nth-child(3){background:#28c840}
.tb span{flex:1;text-align:center;margin-right:52px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.wb{padding:26px}
.w-hero{grid-column:1/9}.w-term{grid-column:9/13}.w-svc{grid-column:1/13}.w-cs{grid-column:1/8}.w-cal{grid-column:8/13}.w-pl{grid-column:1/13}.w-faq{grid-column:1/8}.w-msg{grid-column:8/13}
.w-hero h1{font-size:clamp(36px,4.4vw,60px);letter-spacing:-.025em;line-height:1.02;font-weight:800;margin:6px 0 16px}
.w-hero p{color:#55555c;font-size:18px;max-width:560px;margin-bottom:22px;line-height:1.55}
.bt{display:inline-block;background:#f2501c;color:#fff;border-radius:10px;padding:12px 20px;font-weight:700;font-size:15px;transition:.2s}
.bt:hover{background:#1d1d1f}
.bt.g{background:#e9e9ee;color:#1d1d1f}.bt.g:hover{background:#d4d4d8}
.w-term .wb{background:#1d1d1f;color:#d4d4d8;font-family:'JetBrains Mono';font-size:13.5px;line-height:1.7;min-height:100%}
.w-term .tb{background:#2c2c30;border-color:#000;color:#aaa}
.w-term b{color:#ffc21a;font-weight:500}.w-term em{color:#28c840;font-style:normal}
.cur{display:inline-block;width:8px;height:15px;background:#d4d4d8;vertical-align:middle;animation:bl 1s steps(2) infinite}@keyframes bl{50%{opacity:0}}
.fin{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
.fin>div{border-radius:12px;padding:18px;background:#f4f4f6;transition:background .2s}
.fin>div:hover{background:#ffe9e0}
.fin .ic{font-size:40px;margin-bottom:10px}
.fin h3{font-size:16px;margin-bottom:4px}.fin p{font-size:14px;color:#55555c;line-height:1.5}.fin>div{display:flex;flex-direction:column}.fin p{flex:1}.fin b{display:block;margin-top:10px;font-size:14px;color:#f2501c}
.tbl{width:100%;border-collapse:collapse;font-size:14.5px}
.tbl th{text-align:left;font-size:12.5px;color:#88888f;font-weight:600;padding:6px 10px;border-bottom:1px solid #e4e4e8}
.tbl td{padding:10px;border-bottom:1px solid #f0f0f3}
.tbl tr:hover td{background:#fff3ee}
.tbl td.m{font-weight:800;color:#f2501c;white-space:nowrap}
.cal{display:grid;gap:8px}
.cal>div{display:grid;grid-template-columns:76px minmax(0,1fr);gap:12px;align-items:center}
.cal .d{font-size:12.5px;color:#88888f;text-align:right}
.cal .e{border-radius:8px;padding:9px 12px;font-size:14px;font-weight:600;border-left:4px solid}
.pl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.pl>div{border:1px solid #e4e4e8;border-radius:12px;padding:22px}
.pl .hot{border:2px solid #f2501c;background:#fff8f5}
.pl .p{font-size:30px;font-weight:800;letter-spacing:-.03em;margin:8px 0 12px}
.pl li{list-style:none;font-size:14.5px;padding:3px 0}.pl li::before{content:'✓ ';color:#28c840}
.faq details{border-bottom:1px solid #f0f0f3;padding:12px 0}.faq summary{font-weight:600;cursor:pointer}.faq p{font-size:14.5px;color:#55555c;margin-top:6px}
.msg{display:flex;flex-direction:column;gap:8px}
.msg p{max-width:85%;border-radius:16px;padding:9px 13px;font-size:14.5px;background:#e9e9ee}
.msg p.u{align-self:flex-end;background:#0a84ff;color:#fff}
.dock{position:fixed;bottom:14px;left:50%;transform:translate(-50%,calc(100% - 10px));transition:transform .35s;display:flex;gap:10px;padding:10px 12px;background:rgba(255,255,255,.35);backdrop-filter:blur(20px);border-radius:22px;z-index:40;border:1px solid rgba(255,255,255,.4)}
.dock:hover,.dock:focus-within,.dock.sh{transform:translate(-50%,0)}
.dock::before{content:'';position:absolute;left:0;right:0;top:-40px;height:40px}
.dock a{width:52px;height:52px;border-radius:14px;display:grid;place-items:center;font-size:26px;transition:transform .2s}
.dock a:hover{transform:translateY(-10px) scale(1.15)}
footer{grid-column:1/13;color:rgba(255,255,255,.8);font-size:14px;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}
@media(max-width:1000px){.w-hero,.w-term,.w-cs,.w-cal,.w-faq,.w-msg{grid-column:1/13}.fin{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:760px){.desk{grid-template-columns:minmax(0,1fr);padding:16px 12px 120px}.icons{display:none}.mb .hide{display:none}.pl{grid-template-columns:minmax(0,1fr)}.wb{padding:18px}.tbl .x{display:none}.dock a{width:44px;height:44px;font-size:22px}}
@media(max-width:420px){.fin{grid-template-columns:minmax(0,1fr)}}`;
  const ibg = ['#f2501c', '#0a84ff', '#28c840', '#ffc21a', '#af52de'];
  const cal = [['Пн 10:00', 'Созвон: разбор задачи', '#0a84ff', '#e5f1ff'], ['Вт 18:00', 'Смета и план — у вас в Telegram', '#28c840', '#e6f7ea'], ['Пт 16:00', 'Демо: первая версия бота', '#f2501c', '#ffece4'], ['Пт +1 нед.', 'Демо: оплата и админка', '#f2501c', '#ffece4'], ['Пн 12:00', 'Запуск 🚀', '#af52de', '#f5e9fb']];
  const body = `<div class="mb">${logo()}<a href="#s" class="hide">Услуги</a><a href="#c" class="hide">Кейсы</a><a href="#p">Цены</a><a href="${TG}">Telegram</a><span class="r"><span class="hide">🔋 100%</span><span id="clk">9:41</span></span></div>
<div class="desk"><nav class="icons">${[['🤖', 'Боты.app', '#s'], ['📊', 'Кейсы', '#c'], ['🗓', 'План', '#k'], ['💳', 'Цены', '#p'], ['💬', 'Чат', TG]].map((x, i) => `<a href="${x[2]}"><i style="background:${ibg[i]}">${x[0]}</i>${x[1]}</a>`).join('')}</nav>
<div class="wins"><section class="win w-hero rv"><div class="tb"><i></i><i></i><i></i><span>Финес Студио — Добро пожаловать</span></div><div class="wb"><div style="font-size:14px;color:#f2501c;font-weight:700">Версия 2026 · ${C.stats[0].v} проектов</div><h1>Тонкая работа для вашего бизнеса.</h1><p>Делаем Telegram-ботов, CRM-системы и веб-сервисы, которыми удобно пользоваться — как хорошей операционной системой. Запуск бота от 2 недель, цена в договоре.</p><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="bt" href="${TG}">Обсудить проект</a><a class="bt g" href="#c">Открыть кейсы</a></div></div></section>
<section class="win w-term rv d1"><div class="tb"><i></i><i></i><i></i><span>Терминал — zsh</span></div><div class="wb">~ <b>fines</b> status<br><em>✓</em> приём проектов: открыт<br><em>✓</em> ответ: ~15 минут<br><em>✓</em> слотов в декабре: 2<br><br>~ <b>fines</b> estimate bot<br>от 40 000 ₽ · 2–3 недели<br><br>~ <span class="cur"></span></div></section>
<section class="win w-svc rv" id="s"><div class="tb"><i></i><i></i><i></i><span>Услуги — Finder</span></div><div class="wb"><div class="fin">${C.services.map((s, i) => `<div><div class="ic">${['🤖', '📊', '🌐', '🔌', '🏪'][i]}</div><h3>${s.t}</h3><p>${s.s}</p><b>${s.p} · ${s.d}</b></div>`).join('')}</div></div></section>
<section class="win w-cs rv" id="c"><div class="tb"><i></i><i></i><i></i><span>Кейсы.numbers</span></div><div class="wb" style="overflow-x:auto"><table class="tbl"><tr><th>Клиент</th><th class="x">Что сделали</th><th>Результат</th><th></th></tr>${C.cases.map(c => `<tr><td><b>${c.c}</b><br><small style="color:#88888f">${c.tag}</small></td><td class="x">${c.t}</td><td class="m">${c.m}</td><td style="font-size:13.5px;color:#55555c">${c.ml}</td></tr>`).join('')}</table></div></section>
<section class="win w-cal rv d1" id="k"><div class="tb"><i></i><i></i><i></i><span>Календарь — ваш проект</span></div><div class="wb"><div class="cal">${cal.map(x => `<div><span class="d">${x[0]}</span><span class="e" style="border-color:${x[2]};background:${x[3]}">${x[1]}</span></div>`).join('')}</div></div></section>
<section class="win w-pl rv" id="p"><div class="tb"><i></i><i></i><i></i><span>Цены — App Store</span></div><div class="wb"><div class="pl">${C.plans.map(p => `<div class="${p.hot ? 'hot' : ''}"><b>${p.t}</b><div style="font-size:14px;color:#55555c">${p.for}</div><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul><a class="bt${p.hot ? '' : ' g'}" style="margin-top:14px" href="${TG}">Получить</a></div>`).join('')}</div></div></section>
<section class="win w-faq rv"><div class="tb"><i></i><i></i><i></i><span>Справка</span></div><div class="wb faq">${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></section>
<section class="win w-msg rv d1"><div class="tb"><i></i><i></i><i></i><span>Сообщения — ${TGH}</span></div><div class="wb msg"><p class="u">Здравствуйте! Нужен бот для записи в салон</p><p>Добрый день! Сколько мастеров и какие услуги? Пришлём смету сегодня.</p><p class="u">4 мастера, маникюр и педикюр</p><p>Отлично, это пакет «Старт» — от 40 000 ₽, 2 недели. Созвонимся?</p><a class="bt" style="align-self:flex-start;margin-top:8px" href="${TG}">Продолжить в Telegram</a></div></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div></div>
<nav class="dock">${[['🤖', '#s', '#f2501c'], ['📊', '#c', '#0a84ff'], ['🗓', '#k', '#28c840'], ['💳', '#p', '#ffc21a'], ['💬', TG, '#af52de']].map(x => `<a href="${x[1]}" style="background:${x[2]}">${x[0]}</a>`).join('')}</nav>`;
  const js = `const dk=document.querySelector('.dock');addEventListener('scroll',()=>dk.classList.toggle('sh',innerHeight+scrollY>document.documentElement.scrollHeight-80),{passive:true});const k=document.getElementById('clk');const t=()=>{const d=new Date();k.textContent=d.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})};t();setInterval(t,30000);`;
  return page({ n: 48, title: this.title, fonts: ['Inter Tight', 'JetBrains Mono'], css, body, js });
} });

// 49 — Японский минимализм
L.push({ n: 49, title: 'Японский минимализм', idea: 'Много воздуха, вертикальные подписи, тонкие линии, красная «печать» и спокойная антиква; подача «ваби-саби» о точности и тонкости — для клиентов, которым близка эстетика ремесла', build() {
  const css = `
body{font-family:'Manrope',sans-serif;background:#f6f3ee;color:#222;font-size:17px;line-height:1.8}
.w{max-width:1180px;margin:0 auto;padding:0 32px}
header{display:flex;justify-content:space-between;align-items:center;padding:30px 0}
header nav{display:flex;gap:40px;font-size:14px;letter-spacing:.14em}
header nav a{position:relative}header nav a::after{content:'';position:absolute;left:0;bottom:-4px;height:1px;width:0;background:#c8331e;transition:width .3s}header nav a:hover::after{width:100%}
.lnk{display:inline-flex;align-items:center;gap:14px;font-size:15px;letter-spacing:.1em;border-bottom:1px solid #222;padding-bottom:6px;transition:gap .3s,color .3s}
.lnk:hover{gap:24px;color:#c8331e;border-color:#c8331e}
.hero{display:grid;grid-template-columns:80px minmax(0,1fr) minmax(0,.8fr);gap:40px;padding:110px 0 140px;align-items:center;min-height:620px}
.vt{writing-mode:vertical-rl;font-size:13px;letter-spacing:.4em;color:#888;align-self:start}
.hero h1{font-family:'Spectral',serif;font-weight:300;font-size:clamp(40px,5.4vw,78px);line-height:1.15;letter-spacing:-.01em}
.hero h1 em{font-style:italic;color:#c8331e}
.hero p{color:#666;margin:30px 0 40px;max-width:440px}
.enso{position:relative;aspect-ratio:1;max-width:400px;justify-self:end;width:100%}
.enso svg{width:100%;height:100%}
.enso path{fill:none;stroke:#222;stroke-width:9;stroke-linecap:round;stroke-dasharray:1200;stroke-dashoffset:1200;animation:en 2.6s .3s cubic-bezier(.6,.1,.3,1) forwards;opacity:.88}
@keyframes en{to{stroke-dashoffset:60}}
.seal{position:absolute;right:8%;bottom:10%;width:72px;height:72px;background:#c8331e;color:#f6f3ee;display:grid;place-items:center;font-family:'Spectral';font-size:15px;line-height:1.1;text-align:center;letter-spacing:.06em;border-radius:6px;transform:rotate(-4deg)}
.dotw{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:110px;line-height:0}
.sec{padding:110px 0;border-top:1px solid #ddd6cb;display:grid;grid-template-columns:80px minmax(0,1fr);gap:40px}
.sec h2{font-family:'Spectral';font-weight:300;font-size:clamp(32px,3.6vw,48px);line-height:1.2;margin-bottom:50px}
.svc{display:grid;gap:0}
.svc>div{display:grid;grid-template-columns:60px minmax(0,1fr) minmax(0,1.4fr) 160px;gap:30px;padding:30px 0;border-bottom:1px solid #ddd6cb;align-items:baseline;transition:padding .4s}
.svc>div:hover{padding-left:16px}
.svc .n{font-family:'Spectral';color:#c8331e;font-size:18px}
.svc h3{font-family:'Spectral';font-weight:400;font-size:26px}
.svc p{color:#666;font-size:16px}
.svc b{font-weight:500;text-align:right;font-size:15px}
.cs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:60px 50px}
.cs .m{font-family:'Spectral';font-weight:300;font-size:clamp(46px,5vw,72px);line-height:1}
.cs .m::after{content:'';display:block;width:30px;height:1px;background:#c8331e;margin:20px 0}
.cs h3{font-size:14px;letter-spacing:.14em;margin-bottom:6px}.cs p{color:#666;font-size:15.5px}
.steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:30px}
.steps>div{border-top:1px solid #222;padding-top:22px}
.steps .n{font-family:'Spectral';font-size:15px;color:#c8331e;margin-bottom:12px}
.steps h3{font-family:'Spectral';font-weight:400;font-size:22px;margin-bottom:6px}.steps p{color:#666;font-size:15px;line-height:1.6}
.pl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;border-top:1px solid #222}
.pl>div{padding:34px 30px 20px 0;border-right:1px solid #ddd6cb;margin-right:30px}
.pl>div:last-child{border:0;margin:0}
.pl .p{font-family:'Spectral';font-weight:300;font-size:40px;margin:12px 0 20px}
.pl .hot .p{color:#c8331e}
.pl li{list-style:none;color:#555;font-size:15.5px;padding:4px 0}
.quote{font-family:'Spectral';font-weight:300;font-style:italic;font-size:clamp(26px,3vw,40px);line-height:1.45;max-width:880px}
.quote small{display:block;font-family:'Manrope';font-style:normal;font-size:14px;letter-spacing:.14em;color:#888;margin-top:30px}
.faq details{border-bottom:1px solid #ddd6cb;padding:22px 0}.faq summary{cursor:pointer;font-family:'Spectral';font-size:21px;list-style:none;display:flex;justify-content:space-between;gap:20px}.faq summary::after{content:'+';color:#c8331e}.faq details[open] summary::after{content:'−'}.faq p{color:#666;margin-top:10px;max-width:760px}
.end{text-align:center;padding:150px 0;border-top:1px solid #ddd6cb}
.end h2{font-family:'Spectral';font-weight:300;font-size:clamp(38px,5vw,70px);line-height:1.2;margin-bottom:50px}
footer{display:flex;justify-content:space-between;padding:30px 0 50px;border-top:1px solid #ddd6cb;font-size:13px;letter-spacing:.14em;color:#888;flex-wrap:wrap;gap:10px}
@media(max-width:1000px){.steps{grid-template-columns:repeat(2,minmax(0,1fr))}.svc>div{grid-template-columns:40px minmax(0,1fr);gap:6px 20px}.svc p,.svc b{grid-column:2}.svc b{text-align:left}}
@media(max-width:860px){header nav{display:none}.hero{grid-template-columns:minmax(0,1fr);padding:50px 0 80px;min-height:0}.vt{display:none}.enso{justify-self:center;max-width:280px}.sec{grid-template-columns:minmax(0,1fr);padding:70px 0}.cs,.pl{grid-template-columns:minmax(0,1fr)}.pl>div{border-right:0;margin:0;border-bottom:1px solid #ddd6cb}.end{padding:90px 0}.w{padding:0 22px}}
@media(max-width:480px){.steps{grid-template-columns:minmax(0,1fr)}}`;
  const body = `<div class="w"><header>${logo()}<nav><a href="#s">Ремесло</a><a href="#c">Работы</a><a href="#p">Стоимость</a><a href="#f">Вопросы</a></nav><a class="lnk" href="${TG}">Написать →</a></header>
<section class="hero"><span class="vt">Финес Студио · с 2021</span><div><h1 class="rv">Тонкая работа<br>для <em>вашего</em><br>бизнеса.</h1><p class="rv d1">Мы делаем мало, но тщательно. Telegram-боты, CRM и веб-сервисы, в которых нет ни одной лишней кнопки — только то, что действительно нужно вашему делу.</p><a class="lnk rv d2" href="${TG}">Начать разговор <span>→</span></a></div>
<div class="enso"><svg viewBox="0 0 400 400"><path d="M200 46 C 296 40 360 120 354 210 C 348 300 272 360 190 354 C 104 348 44 280 48 196 C 52 120 104 66 168 52"/></svg><div class="seal">финес<br>студио</div></div></section>
<section class="sec" id="s"><span class="vt">Ремесло</span><div><h2 class="rv">Пять дисциплин,<br>одна точность</h2><div class="svc">${C.services.map((s, i) => `<div class="rv"><span class="n">0${i + 1}</span><h3>${s.t}</h3><p>${s.s}</p><b>${s.p}</b></div>`).join('')}</div></div></section>
<section class="sec" id="c"><span class="vt">Работы</span><div><h2 class="rv">Тихие результаты</h2><div class="cs">${C.cases.map((c, i) => `<div class="rv d${i % 3}"><div class="m">${c.m}</div><h3>${c.c}</h3><p>${c.ml}</p></div>`).join('')}</div></div></section>
<section class="sec"><span class="vt">Путь</span><div><h2 class="rv">Путь проекта</h2><div class="steps">${C.steps.map((s, i) => `<div class="rv d${i}"><div class="n">${['一', '二', '三', '四', '五'][i]} · ${s.d}</div><h3>${s.t}</h3><p>${s.s}</p></div>`).join('')}</div></div></section>
<section class="sec" id="p"><span class="vt">Стоимость</span><div><h2 class="rv">Честная цена</h2><div class="pl">${C.plans.map((p, i) => `<div class="rv d${i}${p.hot ? ' hot' : ''}"><div style="font-size:14px;letter-spacing:.14em">${p.t}</div><div style="color:#888;font-size:15px">${p.for}</div><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul></div>`).join('')}</div></div></section>
<section class="sec"><span class="vt">Слово</span><div><p class="quote rv">«${C.reviews[0].q}»<small>${C.reviews[0].n} · ${C.reviews[0].r}</small></p></div></section>
<section class="sec faq" id="f"><span class="vt">Вопросы</span><div><h2 class="rv">Вопросы</h2>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></section>
<section class="end"><h2 class="rv">Сделаем<br>спокойно и точно</h2><a class="lnk rv d1" href="${TG}">Написать ${TGH} →</a></section>
<footer><span>© 2026 ФИНЕС СТУДИО</span><span>${C.slogan}</span></footer></div>`;
  return page({ n: 49, title: this.title, fonts: ['Manrope', 'Spectral'], css, body });
} });

// 50 — Флагман: рекомендованное направление
L.push({ n: 50, title: 'Флагман: всё лучшее из ресерча', idea: 'Рекомендуемая основа для реального сайта: чистый светлый стиль с фирменными кругами, оффер с ценой и сроком в hero, кейсы в цифрах, мини-квиз, прайс, гарантии и CTA в Telegram на каждом экране', build() {
  const css = `
body{font-family:'Onest',sans-serif;background:#fff;color:#16161a;font-size:17px}
.w{max-width:1200px;margin:0 auto;padding:0 24px}
header{position:sticky;top:0;z-index:30;background:rgba(255,255,255,.88);backdrop-filter:blur(14px);border-bottom:1px solid #efeff2}
header .w{display:flex;justify-content:space-between;align-items:center;height:72px;gap:20px}
header nav{display:flex;gap:28px;font-size:15px;color:#55555e}
header nav a:hover{color:#16161a}
.bt{display:inline-flex;align-items:center;gap:8px;background:#f2501c;color:#fff;border-radius:14px;padding:14px 24px;font-weight:700;font-size:16px;transition:transform .2s,box-shadow .2s;box-shadow:0 10px 24px -12px #f2501c}
.bt:hover{transform:translateY(-2px);box-shadow:0 16px 30px -12px #f2501c}
.bt.d{background:#16161a;box-shadow:none}.bt.l{background:#f3f3f5;color:#16161a;box-shadow:none}
.bt.s{padding:10px 18px;font-size:14.5px}
.hero{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:40px;padding:70px 0 80px;align-items:center}
.pill{display:inline-flex;gap:8px;align-items:center;border:1px solid #efeff2;border-radius:99px;padding:6px 14px 6px 8px;font-size:14px;color:#55555e}
.pill b{background:#e7f7ec;color:#1b8a44;border-radius:99px;padding:2px 9px;font-size:12.5px}
.hero h1{font-size:clamp(40px,5.4vw,72px);letter-spacing:-.05em;line-height:1;font-weight:800;margin:20px 0}
.hero h1 span{position:relative;white-space:nowrap}
.hero h1 span svg{position:absolute;left:0;bottom:-10px;width:100%;height:16px}
.hero p{font-size:19px;color:#55555e;line-height:1.55;max-width:540px;margin-bottom:28px}
.hero .r{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:28px}
.trust{display:grid;grid-template-columns:repeat(3,auto);justify-content:start;gap:26px;font-size:14px;color:#55555e}
@media(max-width:520px){.trust{grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;font-size:12.5px}.trust b{font-size:20px}}
.trust b{display:block;font-size:24px;color:#16161a;letter-spacing:-.03em}
.vis{position:relative;aspect-ratio:1/1;max-width:520px;justify-self:end;width:100%}
.ci{position:absolute;border-radius:50%;mix-blend-mode:multiply}
.ci.a{width:64%;aspect-ratio:1;background:#f2501c;left:4%;top:16%;animation:fl 9s ease-in-out infinite}
.ci.b{width:64%;aspect-ratio:1;background:#ffc21a;right:4%;top:16%;animation:fl 9s ease-in-out infinite reverse}
@keyframes fl{50%{transform:translateY(-14px)}}
.fc{position:absolute;background:#fff;border-radius:18px;padding:14px 16px;box-shadow:0 20px 40px -18px rgba(0,0,0,.3);font-size:14px;line-height:1.35}
.fc b{display:block;font-size:22px;letter-spacing:-.03em}
.fc.x{left:0;bottom:12%}.fc.y{right:0;top:6%}.fc.z{right:8%;bottom:2%;display:flex;gap:10px;align-items:center}
.fc.z i{width:34px;height:34px;border-radius:50%;background:#2aabee;display:grid;place-items:center;color:#fff;font-style:normal}
.logos{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;padding:26px 0;border-top:1px solid #efeff2;border-bottom:1px solid #efeff2;color:#6b6b74;font-weight:700;font-size:15.5px}
.sec{padding:96px 0}
.sh{max-width:720px;margin-bottom:44px}
.sh .k{color:#f2501c;font-weight:700;font-size:14px;margin-bottom:10px}
.sh h2{font-size:clamp(32px,4vw,52px);letter-spacing:-.045em;line-height:1.04;font-weight:800}
.sh p{color:#55555e;margin-top:14px;font-size:18px}
.svc{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:16px}
.svc>div{grid-column:span 2;border:1px solid #efeff2;border-radius:24px;padding:26px;transition:border-color .2s,transform .2s;display:flex;flex-direction:column}
.svc>div:nth-child(1),.svc>div:nth-child(2){grid-column:span 3}
.svc>div:hover{border-color:#f2501c;transform:translateY(-4px)}
.svc .ic{width:48px;height:48px;border-radius:14px;background:#fff1eb;display:grid;place-items:center;font-size:24px;margin-bottom:16px}
.svc h3{font-size:21px;letter-spacing:-.02em;margin-bottom:8px}.svc p{color:#55555e;font-size:15.5px;line-height:1.55;flex:1}
.svc .ft{display:flex;justify-content:space-between;margin-top:18px;padding-top:14px;border-top:1px solid #efeff2;font-size:14.5px}
.svc .ft b{color:#f2501c}
.cs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.cs>div{background:#f7f7f9;border-radius:24px;padding:28px;display:flex;flex-direction:column;gap:6px;transition:background .2s}
.cs>div:hover{background:#fff1eb}
.cs .tg{font-size:13px;color:#55555e;font-weight:600}
.cs .m{font-size:52px;font-weight:800;letter-spacing:-.05em;line-height:1;margin-top:8px}
.cs .ml{color:#55555e;font-size:15px}
.cs h3{font-size:17px;margin-top:14px}.cs p{font-size:14.5px;color:#55555e}
.quiz{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:40px;background:#16161a;color:#fff;border-radius:32px;padding:50px;align-items:center}
.quiz h2{font-size:clamp(30px,3.6vw,46px);letter-spacing:-.045em;line-height:1.05;font-weight:800}
.quiz p{color:#b5b5be;margin-top:14px}
.qb{background:#232329;border-radius:22px;padding:26px}
.qb .q{font-weight:700;font-size:18px;margin-bottom:14px}
.qb .o{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.qb button{font:inherit;font-size:15px;background:#2e2e36;color:#fff;border:1px solid #3a3a44;border-radius:14px;padding:14px;text-align:left;cursor:pointer;transition:.2s}
.qb button:hover{border-color:#f2501c}
.qb button.on{background:#f2501c;border-color:#f2501c}
.qb .res{margin-top:18px;padding-top:16px;border-top:1px solid #3a3a44;display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap}
.qb .res b{font-size:26px;letter-spacing:-.03em;color:#ffc21a}
.qb .res span{display:block;font-size:13.5px;color:#b5b5be}
.steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:16px;counter-reset:s}
.steps>div{position:relative;padding-top:20px}
.steps>div::before{counter-increment:s;content:counter(s);width:40px;height:40px;border-radius:50%;background:#16161a;color:#fff;display:grid;place-items:center;font-weight:700;margin-bottom:16px}
.steps>div::after{content:'';position:absolute;top:40px;left:52px;right:-8px;height:2px;background:repeating-linear-gradient(90deg,#d9d9de 0 6px,transparent 6px 12px)}
.steps>div:last-child::after{display:none}
.steps h3{font-size:18px}.steps small{color:#f2501c;font-weight:700;font-size:13.5px}.steps p{color:#55555e;font-size:15px;margin-top:4px}
.pl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;align-items:stretch}
.pl>div{border:1px solid #efeff2;border-radius:28px;padding:32px;display:flex;flex-direction:column}
.pl .hot{border:2px solid #f2501c;position:relative;box-shadow:0 30px 60px -40px #f2501c}
.pl .hot::before{content:'Популярный';position:absolute;top:-13px;left:32px;background:#f2501c;color:#fff;font-size:12.5px;font-weight:700;border-radius:99px;padding:4px 12px}
.pl .p{font-size:40px;font-weight:800;letter-spacing:-.04em;margin:12px 0 4px}
.pl .f{color:#55555e;font-size:14.5px;margin-bottom:18px}
.pl li{list-style:none;padding:7px 0;font-size:15.5px;display:flex;gap:10px}.pl li::before{content:'✓';color:#1b8a44;font-weight:800}
.pl ul{margin-bottom:24px;flex:1}
.gar{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-top:20px}
.gar>div{background:#f7f7f9;border-radius:20px;padding:20px}
.gar b{display:block;margin-bottom:4px}.gar span{font-size:14.5px;color:#55555e}
.rvw{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.rvw>div{border:1px solid #efeff2;border-radius:24px;padding:26px}
.rvw .st{color:#ffb01a;letter-spacing:3px;margin-bottom:10px}
.rvw q{quotes:none;display:block;font-size:16.5px;line-height:1.55;margin-bottom:16px}
.rvw .a{display:flex;gap:12px;align-items:center}.rvw .a i{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#f2501c,#ffc21a);flex:none}.rvw .a span{font-size:13.5px;color:#55555e;display:block}
.faq{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:50px}
.faq details{border-bottom:1px solid #efeff2;padding:18px 0}.faq summary{font-weight:700;cursor:pointer;list-style:none;display:flex;justify-content:space-between;gap:20px}.faq summary::after{content:'+';color:#f2501c;font-size:22px;line-height:1}.faq details[open] summary::after{content:'−'}.faq p{color:#55555e;margin-top:8px}
.end{background:linear-gradient(120deg,#f2501c,#ff7a2e 60%,#ffc21a);color:#fff;border-radius:32px;padding:64px 50px;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:30px;align-items:center;margin-bottom:60px;position:relative;overflow:hidden}
.end h2{font-size:clamp(34px,4.6vw,60px);letter-spacing:-.05em;line-height:1;font-weight:800}
.end p{margin-top:14px;font-size:18px;opacity:.92}
.end .bt{background:#fff;color:#16161a;box-shadow:none}
footer{border-top:1px solid #efeff2;padding:36px 0 50px}
footer .w{display:grid;grid-template-columns:minmax(0,1.4fr) repeat(3,minmax(0,1fr));gap:30px;font-size:15px;color:#55555e}
footer b{display:block;color:#16161a;margin-bottom:10px}
footer a{display:block;padding:3px 0}footer a:hover{color:#f2501c}
.fab{position:fixed;right:20px;bottom:20px;z-index:40;width:58px;height:58px;border-radius:50%;background:#2aabee;color:#fff;display:grid;place-items:center;font-size:24px;box-shadow:0 14px 30px -10px #2aabee;transition:transform .2s}
.fab:hover{transform:scale(1.08)}
@media(max-width:1000px){.svc>div,.svc>div:nth-child(1),.svc>div:nth-child(2){grid-column:span 3}.steps{grid-template-columns:repeat(2,minmax(0,1fr))}.steps>div::after{display:none}.gar{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:860px){header nav{display:none}.hero,.quiz,.faq,.end{grid-template-columns:minmax(0,1fr)}.vis{justify-self:center;max-width:380px}.cs,.pl,.rvw{grid-template-columns:minmax(0,1fr)}.quiz{padding:28px 20px}.end{padding:40px 26px}footer .w{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.sec{padding:70px 0}}
@media(max-width:520px){.svc>div,.svc>div:nth-child(1),.svc>div:nth-child(2){grid-column:span 6}.gar,.steps{grid-template-columns:minmax(0,1fr)}.qb .o{grid-template-columns:minmax(0,1fr)}.fc{font-size:12.5px;padding:10px 12px}.fc b{font-size:18px}}`;
  const ul = `<svg viewBox="0 0 200 16" preserveAspectRatio="none"><path d="M3 11 C 50 3, 120 3, 197 9" stroke="#ffc21a" stroke-width="6" fill="none" stroke-linecap="round"/></svg>`;
  const body = `<header><div class="w">${logo()}<nav><a href="#s">Услуги</a><a href="#c">Кейсы</a><a href="#q">Расчёт</a><a href="#p">Цены</a><a href="#f">FAQ</a></nav><a class="bt s" href="${TG}">Написать в Telegram</a></div></header>
<div class="w"><section class="hero"><div><span class="pill rv"><b>● открыт</b>Берём 2 проекта на декабрь</span><h1 class="rv d1">Тонкая работа для <span>вашего бизнеса.${ul}</span></h1><p class="rv d2">Telegram-боты, CRM и веб-сервисы для малого бизнеса. Запуск бота — от 2 недель и 40 000 ₽. Цена фиксируется в договоре, демо — каждую неделю.</p><div class="r rv d3"><a class="bt" href="${TG}">Обсудить проект →</a><a class="bt l" href="#q">Рассчитать стоимость</a></div><div class="trust rv d3">${C.stats.slice(0, 3).map(s => `<div><b>${s.v}</b>${s.l}</div>`).join('')}</div></div>
<div class="vis rv d2"><div class="ci a"></div><div class="ci b"></div><div class="fc y"><b>${C.cases[1].m}</b>${C.cases[1].ml}</div><div class="fc x"><b>${C.cases[0].m}</b>${C.cases[0].ml}</div><div class="fc z"><i>✈</i><div><b style="font-size:15px">${TGH}</b>ответ за 15 минут</div></div></div></section>
<div class="logos">${C.cases.map(c => `<span>${c.c}</span>`).join('')}</div>
<section class="sec" id="s"><div class="sh"><div class="k">Услуги</div><h2 class="rv">Решаем задачи бизнеса, а не пишем код ради кода</h2><p>Каждая услуга — с ценой «от» и сроком. Точную смету пришлём за 1 день бесплатно.</p></div><div class="svc">${C.services.map((s, i) => `<div class="rv d${i % 3}"><div class="ic">${['🤖', '📊', '🌐', '🔌', '🏪'][i]}</div><h3>${s.t}</h3><p>${s.s}</p><div class="ft"><span>${s.d}</span><b>${s.p}</b></div></div>`).join('')}</div></section>
<section class="sec" id="c" style="padding-top:0"><div class="sh"><div class="k">Кейсы</div><h2 class="rv">Результат в цифрах, а не в обещаниях</h2></div><div class="cs">${C.cases.map((c, i) => `<div class="rv d${i % 3}"><span class="tg">${c.tag}</span><div class="m">${c.m}</div><div class="ml">${c.ml}</div><h3>${c.c}</h3><p>${c.t}. ${c.r}</p></div>`).join('')}</div></section>
<section class="sec" id="q" style="padding-top:0"><div class="quiz rv"><div><div style="color:#ffc21a;font-weight:700;font-size:14px;margin-bottom:10px">Расчёт за 10 секунд</div><h2>Сколько будет стоить ваш проект?</h2><p>Выберите, что нужно, — покажем вилку цены и срок. Точную смету пришлём в Telegram.</p></div>
<div class="qb"><div class="q">Что нужно сделать?</div><div class="o" id="qo">${[['Telegram-бот', 40, 2], ['CRM-система', 120, 6], ['Веб-сервис', 150, 8], ['Интеграция', 25, 1]].map((x, i) => `<button data-p="${x[1]}" data-d="${x[2]}"${i ? '' : ' class="on"'}>${x[0]}</button>`).join('')}</div><div class="res"><div><b id="qp">от 40 000 ₽</b><span id="qd">запуск ≈ 2 недели</span></div><a class="bt" href="${TG}">Получить смету</a></div></div></div></section>
<section class="sec" style="padding-top:0"><div class="sh"><div class="k">Процесс</div><h2 class="rv">Прозрачно на каждом шаге</h2></div><div class="steps">${C.steps.map(s => `<div class="rv"><h3>${s.t}</h3><small>${s.d}</small><p>${s.s}</p></div>`).join('')}</div></section>
<section class="sec" id="p" style="padding-top:0"><div class="sh"><div class="k">Цены</div><h2 class="rv">Три понятных пакета</h2><p>Оплата 50/50: половина на старте, половина после запуска.</p></div><div class="pl">${C.plans.map((p, i) => `<div class="rv d${i}${p.hot ? ' hot' : ''}"><b style="font-size:19px">${p.t}</b><div class="p">${p.p}</div><div class="f">${p.for}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul><a class="bt${p.hot ? '' : ' l'}" href="${TG}">Обсудить</a></div>`).join('')}</div>
<div class="gar">${C.why.slice(0, 4).map(x => `<div class="rv"><b>${x.t}</b><span>${x.s}</span></div>`).join('')}</div></section>
<section class="sec" style="padding-top:0"><div class="sh"><div class="k">Отзывы</div><h2 class="rv">Что говорят клиенты</h2></div><div class="rvw">${C.reviews.map((r, i) => `<div class="rv d${i}"><div class="st">★★★★★</div><q>«${r.q}»</q><div class="a"><i></i><div><b>${r.n}</b><span>${r.r}</span></div></div></div>`).join('')}</div></section>
<section class="sec faq" id="f" style="padding-top:0"><div class="sh"><div class="k">FAQ</div><h2 class="rv">Частые вопросы</h2><p>Не нашли ответ? Спросите в Telegram — ответим за 15 минут.</p></div><div>${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></section>
<section class="end rv"><div><h2>Расскажите о задаче — пришлём смету завтра</h2><p>Бесплатно и без обязательств.</p></div><a class="bt" href="${TG}">Написать ${TGH}</a></section></div>
<footer><div class="w"><div>${logo()}<p style="margin-top:12px">${C.slogan}<br>Telegram-боты, CRM и веб-сервисы для малого бизнеса.</p></div><div><b>Услуги</b>${C.services.slice(0, 4).map(s => `<a href="#s">${s.t}</a>`).join('')}</div><div><b>Студия</b><a href="#c">Кейсы</a><a href="#p">Цены</a><a href="#f">FAQ</a></div><div><b>Связь</b><a href="${TG}">${TGH}</a><span>© 2026 Финес Студио</span></div></div></footer>
<a class="fab" href="${TG}" aria-label="Написать в Telegram">✈</a>`;
  const js = `document.querySelectorAll('#qo button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#qo button').forEach(x=>x.classList.remove('on'));b.classList.add('on');document.getElementById('qp').textContent='от '+(+b.dataset.p).toLocaleString('ru-RU')+' 000 ₽';const d=+b.dataset.d;document.getElementById('qd').textContent='запуск ≈ '+d+' '+(d==1?'неделя':d<5?'недели':'недель')});`;
  return page({ n: 50, title: this.title, fonts: [], css, body, js });
} });

export default L;
