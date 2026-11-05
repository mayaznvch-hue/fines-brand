import { page, logo, C, TG, TGH, dot } from './core.mjs';
const L = [];

// 06 — Крупная типографика
L.push({ n: 6, title: 'Крупная типографика', idea: 'Огромные слова на весь экран, минимум декора, текст как графика — для бренда, который хочет запомниться с первого скролла', build() {
  const css = `
body{font-family:'Unbounded',sans-serif;background:#fffaf2;color:#16130f;overflow-x:hidden}
.w{padding:0 4vw}
header{display:flex;justify-content:space-between;align-items:center;padding:24px 4vw;position:fixed;inset:0 0 auto;z-index:20;mix-blend-mode:normal;background:linear-gradient(#fffaf2 60%,transparent)}
header a.t{font-family:'Onest';font-weight:700;font-size:15px;border-bottom:2px solid #f2501c;padding-bottom:2px}
.huge{font-size:clamp(56px,15.5vw,250px);font-weight:900;line-height:.86;letter-spacing:-.06em;text-transform:lowercase}
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;padding:120px 4vw 4vw}
.hero .huge span{display:block}
.hero .o{color:#f2501c}
.hero .out{color:#d8cdbb}
.hero .huge{font-size:min(13vw,18.5vh)}
.hero .b{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin-top:4vw;font-family:'Onest';font-size:19px;line-height:1.45}
.hero .b p{max-width:520px}
.circ{width:140px;height:140px;border-radius:50%;background:#f2501c;color:#fff;display:grid;place-items:center;text-align:center;font-family:'Onest';font-weight:700;font-size:15px;flex:none;transition:transform .3s}
.circ:hover{transform:scale(1.08) rotate(-8deg)}
.svc{border-top:2px solid #16130f}
.svc a{display:flex;justify-content:space-between;align-items:baseline;gap:20px;border-bottom:2px solid #16130f;padding:2.2vw 4vw;transition:background .3s,color .3s}
.svc a:hover{background:#16130f;color:#fffaf2}
.svc a:hover em{color:#ffc21a}
.svc b{font-size:clamp(30px,6.4vw,104px);font-weight:800;letter-spacing:-.05em;line-height:1}
.svc em{font-style:normal;font-family:'Onest';font-size:16px;text-align:right;color:#8a8070;max-width:260px}
.lbl{font-family:'Onest';font-size:14px;text-transform:uppercase;letter-spacing:.14em;padding:80px 4vw 22px;color:#8a8070}
.nums{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;border-top:2px solid #16130f}
.nums>div{padding:3vw 4vw;border-right:2px solid #16130f}.nums>div:last-child{border:0}
.nums .v{font-size:clamp(48px,8vw,140px);font-weight:900;letter-spacing:-.06em;line-height:1;color:#f2501c}
.nums h3{font-family:'Onest';font-size:20px;margin:16px 0 6px}
.nums p{font-family:'Onest';color:#5c5447;font-size:15px}
.say{padding:10vw 4vw;font-size:clamp(30px,5vw,80px);font-weight:700;line-height:1.05;letter-spacing:-.04em}
.say span{color:#f2501c}
.say small{display:block;font-family:'Onest';font-weight:500;font-size:16px;letter-spacing:0;margin-top:28px;color:#8a8070}
.steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));border-top:2px solid #16130f}
.steps>div{padding:2vw;border-right:2px solid #16130f;font-family:'Onest'}.steps>div:last-child{border:0}
.steps .n{font-family:'Unbounded';font-size:clamp(50px,6vw,96px);font-weight:900;line-height:1;letter-spacing:-.06em}
.steps h3{font-size:19px;margin:14px 0 6px}.steps p{font-size:14px;color:#5c5447}
.price{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:2px solid #16130f;border-bottom:2px solid #16130f}
.price>div{padding:3vw 4vw;border-right:2px solid #16130f;font-family:'Onest'}.price>div:last-child{border:0}
.price .p{font-family:'Unbounded';font-size:clamp(28px,3.4vw,54px);font-weight:800;letter-spacing:-.05em;margin:12px 0}
.price .hot{background:#ffc21a}
.price li{list-style:none;padding:5px 0;font-size:15px}
.end{padding:8vw 4vw;background:#16130f;color:#fffaf2}
.end .huge{color:#fffaf2}.end .huge span{color:#f2501c}
.end a{display:inline-block;margin-top:3vw;font-size:clamp(22px,3vw,44px);font-weight:700;border-bottom:4px solid #ffc21a;transition:color .2s}
.end a:hover{color:#ffc21a}
footer{background:#16130f;color:#8a8070;font-family:'Onest';font-size:13px;padding:0 4vw 30px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
@media(max-width:900px){.nums,.steps,.price{grid-template-columns:minmax(0,1fr)}.nums>div,.steps>div,.price>div{border-right:0;border-bottom:2px solid #16130f;padding:28px 4vw}.svc a{flex-direction:column;gap:6px}.svc em{text-align:left}.hero .b{flex-direction:column;align-items:flex-start}.circ{width:110px;height:110px}.hero .huge{font-size:15vw}}`;
  const body = `<header>${logo()}<a class="t" href="${TG}">${TGH}</a></header>
<section class="hero"><h1 class="huge"><span class="rv">тонкая</span><span class="rv d1 o">работа</span><span class="rv d2 out">для бизнеса.</span></h1>
<div class="b"><p class="rv d3">Финес Студио делает Telegram-ботов, CRM-системы и веб-сервисы, которые снимают с малого бизнеса ручную рутину.</p><a class="circ" href="${TG}">Обсудить<br>задачу ↗</a></div></section>
<div class="lbl">Что мы делаем</div>
<section class="svc">${C.services.map(s => `<a href="${TG}" class="rv"><b>${s.t.toLowerCase()}</b><em>${s.p}<br>${s.d}</em></a>`).join('')}</section>
<div class="lbl">Результаты клиентов</div>
<section class="nums">${C.cases.slice(0, 3).map((c, i) => `<div class="rv d${i}"><div class="v">${c.m}</div><h3>${c.ml}</h3><p>${c.c}. ${c.r}</p></div>`).join('')}</section>
<section class="say rv">«${C.reviews[2].q.replace('ни одного сорванного срока', '<span>ни одного сорванного срока</span>')}»<small>${C.reviews[2].n}, ${C.reviews[2].r}</small></section>
<div class="lbl">Пять шагов до запуска</div>
<section class="steps">${C.steps.map((s, i) => `<div class="rv d${i}"><div class="n">${i + 1}</div><h3>${s.t}</h3><p>${s.s}</p></div>`).join('')}</section>
<div class="lbl">Цены</div>
<section class="price">${C.plans.map(p => `<div class="rv${p.hot ? ' hot' : ''}"><b>${p.t}</b> · ${p.for}<div class="p">${p.p}</div><ul>${p.f.map(f => `<li>— ${f}</li>`).join('')}</ul></div>`).join('')}</section>
<section class="end"><div class="huge rv">пишите<span>.</span></div><a href="${TG}">${TGH} ↗</a><p style="font-family:Onest;margin-top:20px;color:#b5ab9b">Первый разбор — бесплатно. Ответим за 15 минут.</p></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer>`;
  return page({ n: 6, title: this.title, fonts: ['Unbounded'], css, body });
} });

// 07 — Тёмный премиум
L.push({ n: 7, title: 'Тёмный премиум', idea: 'Глубокий чёрный, тонкие линии, серифные заголовки и медный акцент — для премиального позиционирования и чеков выше среднего', build() {
  const css = `
body{font-family:'Manrope',sans-serif;background:#0b0a09;color:#d9d2c5;line-height:1.6}
.w{max-width:1280px;margin:0 auto;padding:0 40px}
.serif{font-family:'Cormorant Garamond',serif}
header{display:flex;justify-content:space-between;align-items:center;padding:30px 40px;border-bottom:1px solid #26221d}
header .flogo{color:#f4efe6}
header nav{display:flex;gap:36px;font-size:13px;letter-spacing:.14em;text-transform:uppercase}
header nav a{color:#8b8274}header nav a:hover{color:#f4efe6}
.ln{display:inline-flex;gap:12px;align-items:center;border:1px solid #f2501c;color:#f4efe6;padding:14px 26px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;transition:.3s}
.ln:hover{background:#f2501c}
.hero{position:relative;padding:150px 0 130px;overflow:hidden}
.hero::before{content:'';position:absolute;width:760px;height:760px;right:-200px;top:-180px;background:radial-gradient(circle,rgba(242,80,28,.28),transparent 62%);pointer-events:none}
.hero .k{font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:#f2501c}
.hero h1{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:clamp(52px,8vw,132px);line-height:.95;color:#f4efe6;margin:26px 0 34px;letter-spacing:-.01em}
.hero h1 i{color:#ffc21a}
.hero p{max-width:560px;font-size:18px;color:#a69d8e}
.hero .row{display:flex;gap:28px;align-items:center;margin-top:44px;flex-wrap:wrap}
.hero .row span{font-size:14px;color:#8b8274}
.sec{padding:110px 0;border-top:1px solid #26221d}
.hd{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;margin-bottom:64px;align-items:end}
.hd h2{font-family:'Cormorant Garamond';font-weight:400;font-size:clamp(40px,5vw,72px);line-height:1;color:#f4efe6}
.hd h2 i{color:#f2501c}
.hd p{color:#8b8274;max-width:440px;justify-self:end}
.k2{font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:#8b8274;margin-bottom:18px;display:block}
.svc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid #26221d;border-left:1px solid #26221d}
.svc>div{padding:42px 36px;border-right:1px solid #26221d;border-bottom:1px solid #26221d;transition:background .4s}
.svc>div:hover{background:#15130f}
.svc .n{font-family:'Cormorant Garamond';font-size:20px;color:#f2501c;font-style:italic}
.svc h3{font-family:'Cormorant Garamond';font-weight:500;font-size:34px;color:#f4efe6;margin:22px 0 12px;line-height:1.05}
.svc p{font-size:15px;color:#8b8274}
.svc .pr{margin-top:26px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#d9d2c5}
.svc .cta{background:#f2501c;color:#0b0a09;display:flex;flex-direction:column;justify-content:space-between}
.svc .cta h3{color:#0b0a09}.svc .cta:hover{background:#ff6331}
.case{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:64px;padding:48px 0;border-bottom:1px solid #26221d;align-items:center}
.case .vis{aspect-ratio:4/3;background:linear-gradient(160deg,#1c1813,#0f0d0b);border:1px solid #26221d;display:grid;place-items:center;position:relative;overflow:hidden}
.case .vis b{font-family:'Cormorant Garamond';font-weight:300;font-size:clamp(70px,9vw,140px);color:#f4efe6;letter-spacing:-.02em}
.case .vis::after{content:'';position:absolute;inset:auto -30% -60% auto;width:80%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(255,194,26,.18),transparent 65%)}
.case:nth-child(even) .vis{order:2}
.case h3{font-family:'Cormorant Garamond';font-weight:400;font-size:44px;color:#f4efe6;line-height:1.05;margin:8px 0 18px}
.case p{color:#a69d8e}
.case .ml{margin-top:22px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#ffc21a}
.prc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
.prc>div{border:1px solid #26221d;padding:44px 36px}
.prc .hot{border-color:#f2501c;background:linear-gradient(180deg,rgba(242,80,28,.08),transparent)}
.prc h3{font-family:'Cormorant Garamond';font-size:30px;font-weight:500;color:#f4efe6}
.prc .p{font-family:'Cormorant Garamond';font-size:46px;color:#f4efe6;margin:22px 0}
.prc li{list-style:none;padding:12px 0;border-top:1px solid #26221d;font-size:15px}
.rev{text-align:center;max-width:900px;margin:0 auto}
.rev q{font-family:'Cormorant Garamond';font-style:italic;font-size:clamp(30px,3.6vw,48px);line-height:1.2;color:#f4efe6;quotes:'«' '»'}
.rev div{margin-top:28px;font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:#8b8274}
.faq{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 64px}
.faq details{border-top:1px solid #26221d;padding:26px 0}
.faq summary{font-family:'Cormorant Garamond';font-size:26px;color:#f4efe6;cursor:pointer;list-style:none}
.faq p{color:#8b8274;margin-top:10px}
.end{text-align:center;padding:150px 0}
.end h2{font-family:'Cormorant Garamond';font-weight:300;font-size:clamp(48px,7vw,110px);color:#f4efe6;line-height:1}
.end h2 i{color:#f2501c}
.end p{color:#8b8274;margin:24px 0 40px}
footer{border-top:1px solid #26221d;padding:30px 40px;display:flex;justify-content:space-between;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#5d564b;flex-wrap:wrap;gap:12px}
@media(max-width:900px){.w{padding:0 22px}header{padding:22px}header nav{display:none}.hd,.case,.prc,.faq{grid-template-columns:minmax(0,1fr)}.hd p{justify-self:start}.svc{grid-template-columns:minmax(0,1fr)}.case:nth-child(even) .vis{order:0}.case{gap:28px}.hero{padding:90px 0}.sec{padding:72px 0}}`;
  const body = `<header>${logo(true)}<nav><a href="#s">Услуги</a><a href="#c">Работы</a><a href="#p">Стоимость</a><a href="#f">Вопросы</a></nav><a class="ln" href="${TG}">Связаться</a></header>
<div class="w">
<section class="hero"><span class="k rv">Финес Студио · студия разработки</span><h1 class="rv d1">Тонкая работа<br><i>для вашего</i> бизнеса.</h1><p class="rv d2">Создаём Telegram-ботов, CRM-системы и веб-сервисы с вниманием к деталям, которого обычно ждут от ювелиров, а не от разработчиков.</p><div class="row rv d3"><a class="ln" href="${TG}">Обсудить проект →</a><span>Ответ в течение 15 минут · ${TGH}</span></div></section>
<section class="sec" id="s"><div class="hd"><div><span class="k2">Услуги</span><h2>Что мы <i>создаём</i></h2></div><p>Пять направлений, одна команда и один стандарт качества: продумано, протестировано, задокументировано.</p></div>
<div class="svc">${C.services.map((s, i) => `<div class="rv d${i % 3}"><span class="n">— 0${i + 1}</span><h3>${s.t}</h3><p>${s.s}</p><div class="pr">${s.p} · ${s.d}</div></div>`).join('')}<a class="cta rv d2" href="${TG}" style="padding:42px 36px;border-right:1px solid #26221d;border-bottom:1px solid #26221d"><span class="n" style="color:#0b0a09">— индивидуально</span><h3 style="font-family:Cormorant Garamond;font-size:34px;font-weight:500;line-height:1.05">Нестандартная задача? Обсудим →</h3></a></div></section>
<section class="sec" id="c"><div class="hd"><div><span class="k2">Избранные работы</span><h2>Результат, <i>который считают</i></h2></div><p>Каждый проект — измеримый эффект для бизнеса клиента.</p></div>
${C.cases.slice(0, 3).map(c => `<div class="case rv"><div class="vis"><b>${c.m}</b></div><div><span class="k2">${c.tag} · ${c.c}</span><h3>${c.t}</h3><p>${c.r}</p><div class="ml">${c.m} — ${c.ml}</div></div></div>`).join('')}</section>
<section class="sec"><div class="rev rv"><q>${C.reviews[1].q}</q><div>${C.reviews[1].n} · ${C.reviews[1].r}</div></div></section>
<section class="sec" id="p"><div class="hd"><div><span class="k2">Стоимость</span><h2>Прозрачные <i>форматы</i></h2></div><p>Итоговая сумма фиксируется в договоре после бесплатного разбора задачи.</p></div>
<div class="prc">${C.plans.map((p, i) => `<div class="rv d${i}${p.hot ? ' hot' : ''}"><span class="k2">${p.for}</span><h3>${p.t}</h3><div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul></div>`).join('')}</div></section>
<section class="sec" id="f"><div class="hd"><div><span class="k2">Вопросы</span><h2>Прежде чем <i>начать</i></h2></div></div><div class="faq">${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></section>
<section class="end"><h2 class="rv">Начнём с <i>разговора</i>.</h2><p class="rv d1">Первая консультация бесплатна и ни к чему не обязывает.</p><a class="ln rv d2" href="${TG}">${TGH}</a></section>
</div>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer>`;
  return page({ n: 7, title: this.title, fonts: ['Manrope', 'Cormorant Garamond'], css, body });
} });

// 08 — Тёплые градиенты
L.push({ n: 8, title: 'Тёплые градиенты', idea: 'Мягкая анимированная «аврора» в фирменных оранжево-жёлтых тонах и стеклянные карточки — дружелюбно и современно, для широкой аудитории', build() {
  const css = `
body{font-family:'Geologica',sans-serif;background:#fff6ee;color:#2a1a10;overflow-x:hidden}
.bg{position:fixed;inset:0;z-index:-1;overflow:hidden;background:#fff6ee}
.bg i{position:absolute;border-radius:50%;filter:blur(80px);opacity:.75;animation:fl 18s ease-in-out infinite alternate}
.bg i:nth-child(1){width:55vw;height:55vw;background:#ffb08a;left:-12vw;top:-18vw}
.bg i:nth-child(2){width:45vw;height:45vw;background:#ffe08a;right:-10vw;top:10vh;animation-delay:-6s}
.bg i:nth-child(3){width:40vw;height:40vw;background:#ffc6d0;left:30vw;bottom:-20vw;animation-delay:-12s}
@keyframes fl{to{transform:translate(6vw,4vh) scale(1.12)}}
.w{max-width:1200px;margin:0 auto;padding:0 24px}
header{display:flex;justify-content:space-between;align-items:center;padding:20px 24px;margin:16px auto 0;max-width:1200px;background:rgba(255,255,255,.55);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.8);border-radius:22px;position:sticky;top:12px;z-index:10}
header nav{display:flex;gap:26px;font-size:15px;font-weight:500}
header nav a:hover{color:#f2501c}
.btn{background:linear-gradient(135deg,#f2501c,#ff8a3d);color:#fff;padding:13px 22px;border-radius:14px;font-weight:600;box-shadow:0 10px 24px -10px rgba(242,80,28,.7);transition:transform .2s,box-shadow .2s;display:inline-block}
.btn:hover{transform:translateY(-2px);box-shadow:0 14px 30px -10px rgba(242,80,28,.8)}
.btn.s{background:rgba(255,255,255,.7);color:#2a1a10;box-shadow:none;border:1px solid rgba(42,26,16,.1)}
.hero{text-align:center;padding:110px 0 80px}
.tag{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.7);border-radius:99px;padding:8px 16px;font-size:14px;font-weight:500}
.tag b{background:#f2501c;color:#fff;border-radius:99px;padding:2px 8px;font-size:12px}
.hero h1{font-size:clamp(42px,7vw,100px);line-height:1;letter-spacing:-.045em;font-weight:800;margin:26px auto 22px;max-width:1000px}
.hero h1 span{background:linear-gradient(90deg,#f2501c,#ff9a1f,#f2501c);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:sh 6s linear infinite}
@keyframes sh{to{background-position:200% center}}
.hero p{font-size:20px;color:#6b5040;max-width:640px;margin:0 auto 34px;line-height:1.5}
.hero .r{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.glass{background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:28px;box-shadow:0 20px 50px -30px rgba(120,50,10,.35)}
.stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));padding:28px;gap:20px;margin-top:20px}
.stats div{text-align:center}.stats b{display:block;font-size:40px;font-weight:800;letter-spacing:-.04em;color:#f2501c}
.stats span{font-size:14px;color:#6b5040}
.sec{padding:90px 0}
.sec h2{font-size:clamp(34px,4.6vw,60px);letter-spacing:-.04em;line-height:1.02;font-weight:800;text-align:center;margin-bottom:14px}
.sec .sub{text-align:center;color:#6b5040;font-size:18px;margin-bottom:48px}
.svc{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:18px}
.svc .glass{padding:30px;grid-column:span 2;transition:transform .3s}
.svc .glass:nth-child(4),.svc .glass:nth-child(5){grid-column:span 3}
.svc .glass:hover{transform:translateY(-6px)}
.ic{width:52px;height:52px;border-radius:16px;background:linear-gradient(135deg,#f2501c,#ffc21a);margin-bottom:22px;position:relative}
.ic::after{content:'';position:absolute;inset:14px;border-radius:50%;border:3px solid #fff}
.svc h3{font-size:23px;letter-spacing:-.02em;margin-bottom:10px}
.svc p{color:#6b5040;line-height:1.55}
.svc .pr{margin-top:18px;font-weight:700;color:#f2501c}
.cases{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.cases .glass{padding:30px;overflow:hidden;position:relative}
.cases .m{font-size:56px;font-weight:800;letter-spacing:-.05em;line-height:1;background:linear-gradient(135deg,#f2501c,#ff9a1f);-webkit-background-clip:text;background-clip:text;color:transparent}
.cases h3{font-size:20px;margin:16px 0 8px}.cases p{color:#6b5040;font-size:15px;line-height:1.5}
.cases .c{font-size:13px;color:#a07a62;margin-top:4px}
.steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;counter-reset:s}
.steps .glass{padding:24px}
.steps .n{width:36px;height:36px;border-radius:50%;background:#2a1a10;color:#fff;display:grid;place-items:center;font-weight:700;margin-bottom:18px}
.steps h3{font-size:18px;margin-bottom:6px}.steps p{font-size:14px;color:#6b5040}
.prc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;align-items:center}
.prc .glass{padding:36px}
.prc .hot{background:linear-gradient(160deg,#f2501c,#ff8a3d);color:#fff;transform:scale(1.04)}
.prc .p{font-size:40px;font-weight:800;letter-spacing:-.04em;margin:14px 0 20px}
.prc li{list-style:none;padding:7px 0;font-size:15px}.prc li::before{content:'✓';margin-right:10px;font-weight:800}
.faq{max-width:820px;margin:0 auto;padding:12px 30px}
.faq details{border-bottom:1px solid rgba(42,26,16,.1);padding:20px 0}.faq details:last-child{border:0}
.faq summary{font-weight:600;font-size:18px;cursor:pointer}
.faq p{margin-top:10px;color:#6b5040}
.end{padding:70px 40px;text-align:center;margin:20px 0 60px}
.end h2{font-size:clamp(34px,5vw,64px);letter-spacing:-.04em;line-height:1;font-weight:800;margin-bottom:16px}
footer{text-align:center;color:#a07a62;font-size:14px;padding:0 0 40px}
@media(max-width:900px){header nav{display:none}.stats{grid-template-columns:repeat(2,minmax(0,1fr))}.svc{grid-template-columns:minmax(0,1fr)}.svc .glass,.svc .glass:nth-child(4),.svc .glass:nth-child(5){grid-column:auto}.cases,.prc,.steps{grid-template-columns:minmax(0,1fr)}.prc .hot{transform:none}.hero{padding:70px 0 50px}header{margin:10px 12px 0}}`;
  const body = `<div class="bg"><i></i><i></i><i></i></div>
<header>${logo()}<nav><a href="#s">Услуги</a><a href="#c">Кейсы</a><a href="#p">Цены</a><a href="#f">FAQ</a></nav><a class="btn" href="${TG}">Написать</a></header>
<div class="w">
<section class="hero"><span class="tag rv"><b>новое</b> Делаем Mini Apps для Telegram</span><h1 class="rv d1">Тонкая <span>работа</span> для вашего бизнеса.</h1><p class="rv d2">${C.lead}</p><div class="r rv d3"><a class="btn" href="${TG}">Получить оценку бесплатно</a><a class="btn s" href="#c">Посмотреть кейсы</a></div>
<div class="glass stats rv d4">${C.stats.map(s => `<div><b>${s.v}</b><span>${s.l}</span></div>`).join('')}</div></section>
<section class="sec" id="s"><h2 class="rv">Что умеем</h2><p class="sub rv">От небольшого бота до системы, которая связывает весь бизнес</p><div class="svc">${C.services.map((s, i) => `<div class="glass rv d${i % 3}"><div class="ic"></div><h3>${s.t}</h3><p>${s.s}</p><div class="pr">${s.p}</div></div>`).join('')}</div></section>
<section class="sec" id="c"><h2 class="rv">Что получили клиенты</h2><p class="sub rv">Цифры из реальных проектов после запуска</p><div class="cases">${C.cases.map((c, i) => `<div class="glass rv d${i % 3}"><div class="m">${c.m}</div><div class="c">${c.ml}</div><h3>${c.t}</h3><p>${c.r}</p><div class="c" style="margin-top:14px">${c.c}</div></div>`).join('')}</div></section>
<section class="sec"><h2 class="rv">Как работаем</h2><p class="sub rv">Прозрачно на каждом шаге</p><div class="steps">${C.steps.map((s, i) => `<div class="glass rv d${i}"><div class="n">${i + 1}</div><h3>${s.t}</h3><p>${s.s}</p></div>`).join('')}</div></section>
<section class="sec" id="p"><h2 class="rv">Цены</h2><p class="sub rv">Фиксируем в договоре до старта</p><div class="prc">${C.plans.map((p, i) => `<div class="glass rv d${i}${p.hot ? ' hot' : ''}"><b>${p.t}</b> · ${p.for}<div class="p">${p.p}</div><ul>${p.f.map(f => `<li>${f}</li>`).join('')}</ul></div>`).join('')}</div></section>
<section class="sec" id="f"><h2 class="rv">Вопросы</h2><p class="sub rv">Если не нашли ответ — напишите нам</p><div class="glass faq rv">${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></section>
<section class="glass end rv"><h2>Обсудим вашу задачу?</h2><p style="color:#6b5040;margin-bottom:28px">Напишите пару строк — вернёмся с идеей и оценкой</p><a class="btn" href="${TG}">${TGH}</a></section>
</div><footer>© 2026 Финес Студио · ${C.slogan}</footer>`;
  return page({ n: 8, title: this.title, fonts: ['Geologica'], css, body });
} });

// 09 — Портфолио-сетка кейсов
L.push({ n: 9, title: 'Витрина кейсов', idea: 'Главная почти целиком — галерея проектов с фильтром по типу, как у дизайн-студий; для тех, кто выбирает подрядчика по работам', build() {
  const css = `
body{font-family:'Inter Tight',sans-serif;background:#ecebe8;color:#121212}
.w{max-width:1440px;margin:0 auto;padding:0 28px}
header{display:flex;justify-content:space-between;align-items:center;padding:24px 0}
header nav{display:flex;gap:28px;font-size:15px}
header nav a:hover{color:#f2501c}
.hi{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:40px;padding:40px 0 50px;align-items:end}
.hi h1{font-size:clamp(40px,5.4vw,84px);line-height:1;letter-spacing:-.03em;font-weight:600}
.hi h1 span{color:#f2501c}
.hi p{font-size:18px;color:#555;line-height:1.5}
.hi a{display:inline-block;margin-top:18px;font-weight:600;border-bottom:2px solid #f2501c}
.flt{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px}
.flt button{padding:10px 18px;border-radius:99px;border:1px solid #c9c7c2;font-size:14px;font-weight:500;transition:.2s}
.flt button.on,.flt button:hover{background:#121212;color:#fff;border-color:#121212}
.grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:16px}
.card{border-radius:18px;overflow:hidden;position:relative;min-height:380px;display:flex;flex-direction:column;justify-content:flex-end;padding:26px;color:#fff;transition:transform .4s,opacity .3s;cursor:pointer}
.card:hover{transform:scale(.985)}
.card.hide{display:none}
.card .mock{position:absolute;inset:0;display:grid;place-items:center;transition:transform .6s}
.card:hover .mock{transform:scale(1.04)}
.card .mock div{width:62%;max-width:360px;aspect-ratio:9/12;border-radius:20px;background:rgba(255,255,255,.95);box-shadow:0 30px 60px -20px rgba(0,0,0,.4);padding:16px;display:flex;flex-direction:column;gap:8px;transform:translateY(-30px) rotate(-4deg)}
.card .mock i{display:block;height:12px;border-radius:6px;background:#e9e6e0}
.card .mock i.a{background:#f2501c;width:60%}.card .mock i.y{background:#ffc21a;width:40%;height:28px}
.card .mock i.s{width:80%}
.card .info{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:flex-end;gap:16px;background:linear-gradient(transparent,rgba(0,0,0,.72));margin:-26px;padding:90px 26px 26px}
.card h3{font-size:24px;letter-spacing:-.02em;font-weight:600}
.card .c{font-size:14px;opacity:.85;margin-top:4px}
.card .m{font-size:44px;font-weight:700;letter-spacing:-.04em;text-align:right;line-height:1}
.card .m small{display:block;font-size:12px;font-weight:500;letter-spacing:0;opacity:.9;max-width:150px}
.c1{grid-column:span 7;background:#f2501c}.c2{grid-column:span 5;background:#1f1f1f}.c3{grid-column:span 4;background:#ffc21a;color:#121212}.c4{grid-column:span 4;background:#3a5bd9}.c5{grid-column:span 4;background:#2c7a5b}.c6{grid-column:span 12;background:#121212;min-height:300px}
.c3 .info{background:none}
.c6 .mock div{aspect-ratio:16/7;max-width:620px;width:70%;transform:translateY(-30px) rotate(-2deg)}
.sec{padding:100px 0 0}
.sec h2{font-size:clamp(32px,4vw,56px);letter-spacing:-.04em;font-weight:600;line-height:1}
.two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);gap:40px}
.svc li{list-style:none;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.6fr) auto;gap:20px;padding:22px 0;border-top:1px solid #c9c7c2;align-items:baseline}
.svc b{font-size:22px;font-weight:600}.svc p{color:#555}.svc span{font-weight:600;white-space:nowrap}
.revs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:40px}
.revs div{background:#fff;border-radius:18px;padding:28px}
.revs q{font-size:18px;line-height:1.45;quotes:none;display:block;margin-bottom:22px}
.revs b{display:block}.revs span{color:#777;font-size:14px}
.steps{display:flex;gap:0;margin-top:40px;border-top:1px solid #c9c7c2}
.steps div{flex:1;padding:22px 20px 0 0}
.steps b{display:block;font-size:14px;color:#f2501c;margin-bottom:10px}
.steps h3{font-size:18px;margin-bottom:6px}.steps p{font-size:14px;color:#555}
.end{margin:100px 0 0;background:#121212;color:#fff;border-radius:24px;padding:70px 50px;display:flex;justify-content:space-between;align-items:flex-end;gap:30px;flex-wrap:wrap}
.end h2{font-size:clamp(34px,4.6vw,68px);letter-spacing:-.04em;line-height:1;font-weight:600;max-width:800px}
.end a{background:#f2501c;padding:18px 28px;border-radius:99px;font-weight:600;font-size:18px;transition:.2s}
.end a:hover{background:#ffc21a;color:#121212}
footer{display:flex;justify-content:space-between;padding:30px 0;color:#777;font-size:14px;flex-wrap:wrap;gap:12px}
@media(max-width:900px){.hi,.two,.revs{grid-template-columns:minmax(0,1fr)}.grid{grid-template-columns:minmax(0,1fr)}.card{grid-column:auto!important;min-height:340px}.svc li{grid-template-columns:minmax(0,1fr)}.steps{flex-direction:column}header nav{display:none}.end{padding:40px 24px}}`;
  const cls = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  const body = `<div class="w">
<header>${logo()}<nav><a href="#work">Работы</a><a href="#svc">Услуги</a><a href="#rev">Отзывы</a></nav><a href="${TG}" style="font-weight:600">${TGH} ↗</a></header>
<section class="hi"><h1 class="rv">Тонкая <span>работа</span> для вашего бизнеса — <span style="color:#999">вот как она выглядит.</span></h1><div class="rv d2"><p>Мы — небольшая студия: боты, CRM, веб-сервисы и интеграции. Ниже — проекты, которыми гордимся, и цифры, которые получили клиенты.</p><a href="${TG}">Обсудить ваш проект →</a></div></section>
<section id="work"><div class="flt"><button class="on" data-f="all">Все проекты</button><button data-f="Telegram-бот">Боты</button><button data-f="CRM">CRM</button><button data-f="Веб-сервис">Веб-сервисы</button><button data-f="Сайт">Сайты</button><button data-f="Mini App">Mini Apps</button></div>
<div class="grid">${C.cases.map((c, i) => `<article class="card ${cls[i]} rv" data-t="${c.tag}"><div class="mock"><div><i class="a"></i><i class="s"></i><i></i><i class="y"></i><i class="s"></i><i></i></div></div><div class="info"><div><h3>${c.t}</h3><div class="c">${c.c} · ${c.tag}</div></div><div class="m">${c.m}<small>${c.ml}</small></div></div></article>`).join('')}</div></section>
<section class="sec two" id="svc"><h2 class="rv">Что мы делаем</h2><ul class="svc">${C.services.map(s => `<li class="rv"><b>${s.t}</b><p>${s.s}</p><span>${s.p}</span></li>`).join('')}</ul></section>
<section class="sec" id="rev"><h2 class="rv">Клиенты о работе с нами</h2><div class="revs">${C.reviews.map((r, i) => `<div class="rv d${i}"><q>«${r.q}»</q><b>${r.n}</b><span>${r.r}</span></div>`).join('')}</div></section>
<section class="sec"><h2 class="rv">Как проходит проект</h2><div class="steps">${C.steps.map((s, i) => `<div class="rv d${i}"><b>0${i + 1} — ${s.d}</b><h3>${s.t}</h3><p>${s.s}</p></div>`).join('')}</div></section>
<section class="end rv"><h2>Ваш проект может быть следующим в этой витрине.</h2><a href="${TG}">Написать в Telegram</a></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div>`;
  const js = `document.querySelectorAll('.flt button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.flt button').forEach(x=>x.classList.remove('on'));b.classList.add('on');const f=b.dataset.f;document.querySelectorAll('.card').forEach(c=>c.classList.toggle('hide',f!=='all'&&c.dataset.t!==f))});`;
  return page({ n: 9, title: this.title, fonts: ['Inter Tight'], css, body, js });
} });

// 10 — Калькулятор цены
L.push({ n: 10, title: 'Калькулятор цены', idea: 'Первый экран — интерактивный расчёт стоимости: выбираете тип проекта и функции, видите цену и срок; для тех, кому важны деньги и прозрачность', build() {
  const css = `
body{font-family:'Manrope',sans-serif;background:#f6f7f9;color:#14171f}
.w{max-width:1240px;margin:0 auto;padding:0 24px}
header{display:flex;justify-content:space-between;align-items:center;padding:20px 0}
header nav{display:flex;gap:26px;font-size:15px;font-weight:600;color:#5b6170}
header nav a:hover{color:#f2501c}
.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:48px;padding:40px 0 80px;align-items:start}
.hero h1{font-size:clamp(38px,4.8vw,66px);line-height:1.02;letter-spacing:-.04em;font-weight:800;margin-bottom:20px}
.hero h1 span{color:#f2501c}
.hero p{font-size:18px;color:#5b6170;line-height:1.55;margin-bottom:28px}
.ticks li{list-style:none;padding:8px 0;font-weight:600;display:flex;gap:10px}
.ticks li::before{content:'';width:20px;height:20px;border-radius:6px;background:#ffc21a;flex:none;margin-top:1px}
.calc{background:#fff;border-radius:24px;padding:30px;box-shadow:0 30px 60px -30px rgba(20,23,31,.25);border:1px solid #e7e9ee;position:sticky;top:20px}
.calc h3{font-size:14px;text-transform:uppercase;letter-spacing:.1em;color:#8a90a0;margin:4px 0 12px}
.types{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:22px}
.types label{border:2px solid #e7e9ee;border-radius:14px;padding:14px;cursor:pointer;transition:.2s;font-weight:700;font-size:15px}
.types label small{display:block;font-weight:500;color:#8a90a0;font-size:12px;margin-top:4px}
.types input{display:none}
.types label:has(input:checked){border-color:#f2501c;background:#fff4ef}
.opts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-bottom:22px}
.opts label{display:flex;justify-content:flex-start;text-align:left;align-items:center;gap:10px;padding:12px 14px;border-radius:12px;background:#f6f7f9;cursor:pointer;font-size:14px;font-weight:600;transition:.2s}
.opts label span{margin-left:auto;color:#8a90a0;font-weight:500;font-size:13px;white-space:nowrap}
.opts input{accent-color:#f2501c;width:18px;height:18px;flex:none}
.opts label:has(input:checked){background:#fff4ef}
.rng{margin-bottom:24px}
.rng input{width:100%;accent-color:#f2501c}
.rng .lb{display:flex;justify-content:space-between;font-size:14px;font-weight:600}
.tot{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;border-top:1px dashed #d4d7de;padding-top:20px;flex-wrap:wrap}
.tot .p{font-size:44px;font-weight:800;letter-spacing:-.04em;line-height:1}
.tot .d{color:#8a90a0;font-size:14px;margin-top:6px}
.btn{background:#f2501c;color:#fff;padding:16px 24px;border-radius:14px;font-weight:700;transition:.2s;display:inline-block}
.btn:hover{background:#d63f0f}
.note{font-size:12px;color:#8a90a0;margin-top:14px}
.sec{padding:80px 0;border-top:1px solid #e7e9ee}
.sec h2{font-size:clamp(30px,3.6vw,48px);letter-spacing:-.035em;font-weight:800;margin-bottom:34px;line-height:1.05}
.tbl{background:#fff;border-radius:20px;border:1px solid #e7e9ee;overflow:hidden}
.tbl .r{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,2fr) 140px 140px;gap:20px;padding:20px 26px;border-bottom:1px solid #eef0f3;align-items:center}
.tbl .r:last-child{border:0}
.tbl .h{background:#f6f7f9;font-size:13px;font-weight:700;color:#8a90a0;text-transform:uppercase;letter-spacing:.06em}
.tbl b{font-size:17px}.tbl p{color:#5b6170;font-size:15px}.tbl .pr{font-weight:800;color:#f2501c}
.why{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.why div{background:#fff;border-radius:20px;padding:26px;border:1px solid #e7e9ee}
.why b{font-size:18px;display:block;margin-bottom:8px}.why p{color:#5b6170;font-size:15px}
.cases{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.cases div{background:#14171f;color:#fff;border-radius:20px;padding:28px}
.cases .m{font-size:44px;font-weight:800;color:#ffc21a;letter-spacing:-.04em}
.cases .bud{display:inline-block;margin-top:16px;background:rgba(255,255,255,.1);padding:6px 12px;border-radius:99px;font-size:13px}
.cases p{color:#b3b8c4;font-size:15px;margin-top:8px}
.faq{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.faq details{background:#fff;border-radius:16px;padding:20px 22px;border:1px solid #e7e9ee}
.faq summary{font-weight:700;cursor:pointer}.faq p{margin-top:8px;color:#5b6170}
.end{background:#f2501c;color:#fff;border-radius:28px;padding:56px;display:flex;justify-content:space-between;align-items:center;gap:30px;flex-wrap:wrap;margin-bottom:60px}
.end h2{font-size:clamp(30px,3.6vw,48px);letter-spacing:-.035em;margin:0;line-height:1.05;max-width:700px}
.end a{background:#fff;color:#14171f;padding:18px 28px;border-radius:14px;font-weight:800}
footer{color:#8a90a0;font-size:14px;padding:0 0 30px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}
@media(max-width:1000px){.hero{grid-template-columns:minmax(0,1fr)}.calc{position:static}.why,.cases,.faq{grid-template-columns:minmax(0,1fr)}.tbl .r{grid-template-columns:minmax(0,1fr)}.tbl .h{display:none}header nav{display:none}}
@media(max-width:560px){.types,.opts{grid-template-columns:minmax(0,1fr)}.calc{padding:20px}.end{padding:34px 22px}}`;
  const body = `<div class="w">
<header>${logo()}<nav><a href="#calc">Калькулятор</a><a href="#svc">Услуги</a><a href="#c">Кейсы</a><a href="#f">FAQ</a></nav><a class="btn" style="padding:12px 18px" href="${TG}">Написать</a></header>
<section class="hero" id="calc"><div class="rv"><h1>Сколько стоит ваш <span>бот или CRM</span>? Посчитайте за минуту.</h1><p>Финес Студио — тонкая работа для вашего бизнеса. Мы публикуем цены открыто: соберите проект в калькуляторе и получите ориентир по стоимости и срокам.</p><ul class="ticks"><li>Цена фиксируется в договоре</li><li>Оплата частями: 50% на старте</li><li>30 дней гарантии после запуска</li><li>Код и доступы — ваши</li></ul></div>
<form class="calc rv d2" onsubmit="return false"><h3>1. Что делаем</h3><div class="types">
<label><input type="radio" name="t" value="40000" data-w="2" checked>Бот<small>от 40 000 ₽</small></label><label><input type="radio" name="t" value="60000" data-w="3">Сайт<small>от 60 000 ₽</small></label><label><input type="radio" name="t" value="120000" data-w="5">CRM<small>от 120 000 ₽</small></label></div>
<h3>2. Что нужно внутри</h3><div class="opts">
<label><input type="checkbox" value="15000" data-w=".5">Приём оплаты<span>+15 000</span></label><label><input type="checkbox" value="25000" data-w="1">Интеграция с 1С<span>+25 000</span></label><label><input type="checkbox" value="20000" data-w=".5">amoCRM / Битрикс24<span>+20 000</span></label><label><input type="checkbox" value="30000" data-w="1">Mini App в Telegram<span>+30 000</span></label><label><input type="checkbox" value="18000" data-w=".5">Админ-панель<span>+18 000</span></label><label><input type="checkbox" value="12000" data-w=".5">Рассылки и сегменты<span>+12 000</span></label></div>
<div class="rng"><div class="lb"><span>3. Сколько сценариев / экранов</span><span id="sv">8</span></div><input type="range" min="3" max="30" value="8" id="sc"></div>
<div class="tot"><div><div class="p" id="tp">—</div><div class="d" id="td">—</div></div><a class="btn" href="${TG}">Зафиксировать цену →</a></div><p class="note">Это ориентир. Точную смету пришлём после бесплатного 30-минутного разбора.</p></form></section>
<section class="sec" id="svc"><h2 class="rv">Прайс по направлениям</h2><div class="tbl rv"><div class="r h"><span>Услуга</span><span>Что входит</span><span>Срок</span><span>Цена</span></div>${C.services.map(s => `<div class="r"><b>${s.t}</b><p>${s.s}</p><span>${s.d}</span><span class="pr">${s.p}</span></div>`).join('')}</div></section>
<section class="sec" id="c"><h2 class="rv">Сколько стоили реальные проекты</h2><div class="cases">${C.cases.slice(0, 3).map((c, i) => `<div class="rv d${i}"><div class="m">${c.m}</div><b>${c.ml}</b><p>${c.c}: ${c.t.toLowerCase()}. ${c.r}</p><span class="bud">Бюджет: ${['95 000 ₽', '55 000 ₽', '240 000 ₽'][i]} · ${['3 недели', '2 недели', '7 недель'][i]}</span></div>`).join('')}</div></section>
<section class="sec"><h2 class="rv">Почему цена не вырастет по ходу</h2><div class="why">${C.why.map((w, i) => `<div class="rv d${i}"><b>${w.t}</b><p>${w.s}</p></div>`).join('')}</div></section>
<section class="sec" id="f"><h2 class="rv">Вопросы о деньгах и сроках</h2><div class="faq">${C.faq.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></section>
<section class="end rv"><h2>Отправьте расчёт — пришлём точную смету за 1 день.</h2><a href="${TG}">${TGH}</a></section>
<footer><span>© 2026 Финес Студио</span><span>${C.slogan}</span></footer></div>`;
  const js = `const f=document.querySelector('.calc');function upd(){const t=f.querySelector('input[name=t]:checked');let p=+t.value,w=+t.dataset.w;f.querySelectorAll('.opts input:checked').forEach(i=>{p+=+i.value;w+=+i.dataset.w});const sc=+document.getElementById('sc').value;document.getElementById('sv').textContent=sc;p+=Math.max(0,sc-8)*3500;w+=Math.max(0,sc-8)*.15;document.getElementById('tp').textContent=Math.round(p/1000).toLocaleString('ru-RU')+' 000 ₽';const a=Math.max(1,Math.round(w)),b=Math.round(w+1.5);document.getElementById('td').textContent='Срок: '+a+'–'+b+' недели';}f.addEventListener('input',upd);upd();`;
  return page({ n: 10, title: this.title, fonts: ['Manrope'], css, body, js });
} });

export default L;
