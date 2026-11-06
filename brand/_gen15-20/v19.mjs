import { build, wm, H, SV } from './core.mjs';
const Y = '#ffe14d', P = '#ff4fa3', V = '#6b3cff', O = '#ff5a1f', K = '#111111', CR = '#fff8ec', CY = '#3fd6ff';
// знак: «ф»-ракета: корпус-капсула, иллюминатор-кольцо, огонёк-пламя снизу, точка-звезда
const mark = c => `<rect width="64" height="64" rx="32" style="fill:${c.bg}"/>
<path d="M32 6c7 6 10 14 10 24v14H22V30c0-10 3-18 10-24z" style="fill:${c.m2};stroke:${c.m1};stroke-width:3;stroke-linejoin:round"/>
<circle cx="32" cy="28" r="6.5" style="fill:${c.bg};stroke:${c.m1};stroke-width:3"/>
<path d="M22 36l-7 8v4l7-3zM42 36l7 8v4l-7-3z" style="fill:${c.m1}"/>
<path d="M26 46h12c0 6-3 10-6 13-3-3-6-7-6-13z" style="fill:${c.dot};stroke:${c.m1};stroke-width:2.4;stroke-linejoin:round"/>`;
const sets = {
  light: { bg: Y, m1: K, m2: '#ffffff', dot: O },
  dark: { bg: V, m1: K, m2: Y, dot: O },
  fav: { bg: Y, m1: K, m2: '#fff', dot: O },
  avatar: { bg: P, m1: K, m2: Y, dot: O },
  monoB: { bg: '#fff', m1: '#000', m2: '#fff', dot: '#000' },
  monoW: { bg: '#000', m1: '#fff', m2: '#000', dot: '#fff' },
};
const star = (c, s = 1) => `<path d="M50 0l11 35 37 1-30 22 11 36-29-22-29 22 11-36L2 36l37-1z" style="fill:${c};stroke:${K};stroke-width:${4 / s};stroke-linejoin:round"/>`;
const pat = `background-color:${V};background-image:radial-gradient(circle at 25% 25%,${Y} 0 6px,transparent 7px),radial-gradient(circle at 75% 75%,${P} 0 10px,transparent 11px),repeating-linear-gradient(-45deg,transparent 0 22px,rgba(255,255,255,.08) 22px 30px);background-size:90px 90px,90px 90px,auto`;
build({
  n: 19, title: 'Ракета', mark, markSets: sets,
  idea: 'Финес на форсаже: огромные буквы, кислотные стикеры и ракета, которая взлетает за 3 дня. Стиль для соцсетей и Авито, где нужно остановить палец за полсекунды. Огонёк из логотипа становится пламенем двигателя.',
  voice: 'Говорим дерзко и смешно, но без вранья: громкие заголовки — только на фактах (сроки, договор, код остаётся у вас). Обращаемся на «вы», но как приятель.',
  tone: ['дерзко', 'громко', 'весело', 'коротко', 'на фактах'],
  phrases: [['Заголовок', 'Бот — от 3 дней. Да, это законно.'], ['Оффер', 'Telegram-бот — от 15 000 ₽. Взлёт — от 3 дней.'], ['Ответ клиенту', 'ТЗ нет? Отлично. Расскажите как есть — разберёмся.'], ['Подпись поста', 'Менеджеров нет. Есть два разработчика и ваш проект.']],
  nosay: ['Уважаемые партнёры, рады предложить…', 'Лучшая студия во вселенной (без доказательств)'],
  markIdea: 'Знак — ракета, собранная из «ф»: корпус — ось буквы, иллюминатор — её чаша, оранжевое пламя внизу — огонёк «финес». Жирный чёрный контур, как у стикера, держит знак на любом кислотном фоне.',
  logoIdea: 'Слово «финес» — Unbounded 900, широкое и громкое, с наклоном −4° в стикер-версии. Точка после «с» — оранжевая с чёрной обводкой. «студио» — Geologica 600 на жёлтой ленте.',
  colorIdea: 'Кислотный набор: фиолетовый фон, жёлтый и розовый для стикеров, оранжевый для огонька. Всё скрепляет чёрный контур 3 px — он делает яркие цвета читаемыми.',
  palette: [
    { n: 'Космос', hex: V, on: '#fff', p: 30, role: 'фон, баннеры' },
    { n: 'Лимон', hex: Y, on: K, p: 24, role: 'стикеры, кнопки, плашки' },
    { n: 'Бабл-гам', hex: P, on: K, p: 14, role: 'стикеры, акценты' },
    { n: 'Сажа', hex: K, on: '#fff', p: 22, role: 'контур, текст' },
    { n: 'Пламя', hex: O, on: K, p: 10, role: 'огонёк, цены' },
  ],
  colorNote: 'Текст — только чёрный на жёлтом/розовом/оранжевом или белый на фиолетовом и чёрном.',
  typeIdea: 'Unbounded 900 — огромные заголовки, которые занимают пол-экрана. Geologica — для всего остального: она узкая и читаемая рядом с широким Unbounded.',
  fonts: [
    { fam: 'Unbounded', id: 'unbounded', w: [600, 900], use: 'Логотип, заголовки, цены, стикеры' },
    { fam: 'Geologica', id: 'geologica', w: [400, 600], use: 'Текст, подписи, кнопки' },
  ],
  type: [
    ['H1 · Unbounded 900', '96/0.92 · −0.04em', 't-h1', 'БОТ ОТ 3 ДНЕЙ'],
    ['H2 · Unbounded 900', '52/1', 't-h2', 'Без менеджеров'],
    ['H3 · Unbounded 600', '26/1.15', 't-h3', 'Код остаётся у вас'],
    ['Lead · Geologica 600', '20/1.45', 't-lead', 'Telegram-боты, CRM и веб-сервисы под процессы вашей компании.'],
    ['Body · Geologica 400', '16/1.6', 't-body', 'Опишите задачу в Telegram своими словами. Готовое ТЗ не требуется.'],
    ['Caption · Geologica 600', '13/1.3 · UPPER', 't-cap', 'ЦЕНЫ — ОРИЕНТИР, НЕ ПУБЛИЧНАЯ ОФЕРТА'],
  ],
  idIdea: 'Айдентика-стикерпак: звёзды, ленты, ракеты и плашки с жирным чёрным контуром и жёсткой тенью 6 px. Элементы лепятся под углом и могут перекрывать края, но не текст.',
  patternCss: pat, patternNote: 'Паттерн «космос»: жёлтые и розовые точки-планеты, диагональные полосы скорости на фиолетовом.',
  elements: [
    [`<svg viewBox="0 0 100 100" style="height:140px">${star(Y)}<text x="50" y="60" text-anchor="middle" style="fill:${K};font:900 15px Unbounded">0 ₽</text></svg>`, 'Звезда-стикер — для «бесплатно» и сроков'],
    [`<svg viewBox="0 0 260 90"><g transform="rotate(-5 130 45)"><rect x="12" y="22" width="236" height="48" style="fill:${K}"/><rect x="6" y="16" width="236" height="48" style="fill:${P};stroke:${K};stroke-width:3"/><text x="124" y="48" text-anchor="middle" style="fill:${K};font:900 17px Unbounded">БЕЗ МЕНЕДЖЕРОВ</text></g></svg>`, 'Лента — под наклоном, с жёсткой тенью'],
    [`<svg viewBox="0 0 64 64" style="height:150px;transform:rotate(18deg)">${mark({ bg: 'transparent', m1: K, m2: Y, dot: O })}</svg>`, 'Ракета — летит всегда вправо-вверх'],
  ],
  iconNote: 'линия 2.2, жирный контур, сдвинутая тень, пламя-точка',
  iconStyle: { mode: 'sticker', sw: 2.2, cap: 'round', join: 'round', dr: 2.2, fill: '#fff', pad: 1 },
  id: {
    cardFront: `<div class="in" style="${pat};color:#fff"><span class="stk" style="font-size:10cqw">${wm()}</span><div class="meta" style="font-weight:600">БОТЫ · CRM · СЕРВИСЫ · ВЗЛЁТ ОТ 3 ДНЕЙ</div></div>`,
    cardBack: `<div class="in" style="background:${Y};color:${K}"><div class="nm" style="font-family:Unbounded;font-weight:900;font-size:7cqw">ПИШИТЕ<br>В ТЕЛЕГУ →</div><div class="meta" style="font-weight:600">${H}<br>t.me/fines_studio</div><svg viewBox="0 0 64 64" style="position:absolute;right:5cqw;top:5cqw;width:22cqw;transform:rotate(14deg)">${mark(sets.avatar)}</svg></div>`,
    kp: `<div class="in" style="background:${V};color:#fff"><span class="stk" style="font-size:7cqw;align-self:flex-start">${wm()}</span><div style="margin-top:auto"><div class="k">Коммерческое предложение</div><h4 style="font-family:Unbounded;font-weight:900;font-size:9cqw;text-transform:uppercase">Бот,<br>который<br>продаёт</h4><p style="background:${Y};color:${K};display:inline-block;padding:1cqw 2cqw;border:2px solid ${K};font-weight:600">для «Название клиента»</p></div><svg viewBox="0 0 100 100" style="position:absolute;right:6cqw;top:24cqw;width:34cqw;transform:rotate(12deg)">${star(P)}</svg><div class="ft" style="margin-top:6cqw"><span>${H}</span><span>2026</span></div></div>`,
    blank: `<div class="in" style="background:${CR};color:${K}"><div style="display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid ${K};padding-bottom:3cqw"><span class="hl">${wm()}</span><svg viewBox="0 0 64 64" style="width:11cqw">${mark(sets.light)}</svg></div><p style="margin-top:7cqw;font-weight:600">Привет!</p><p style="margin-top:2cqw">Над вашим проектом работают два разработчика, без менеджеров. Цена — в договоре до старта.</p><p style="opacity:.25;margin-top:3cqw">— — — — — — — — — — — — — — — —<br>— — — — — — — — — — — — —</p><div class="ft" style="background:${Y};margin:0 -9cqw -7cqw;padding:4cqw 9cqw;border-top:3px solid ${K};opacity:1"><span>Финес Студио</span><span>t.me/fines_studio</span></div></div>`,
  },
  merch: { tee: P, teeS: K, mug: Y, txt: K, mk: sets.dark, rot: -12 },
  bnIdea: 'Баннеры кричат, но не врут: огромный заголовок, стикер с фактом (срок, «0 ₽ за оценку», «50/50»), жирный контур и жёсткие тени. Цены — только из прайса студии.',
  bnRules: 'Минимум один стикер под углом на формат. Заголовок — не больше 4 слов, капсом. Чёрный контур 3 px у всех плашек и кнопок. На 728×90 стикер заменяем звездой.',
  bn: {
    stTitle: 'БОТЫ.<br>CRM.<br>СЕРВИСЫ.', sqTitle: 'БОТ ОТ 3 ДНЕЙ', wdTitle: 'CRM БЕЗ ЛИШНЕГО', tgTitle: 'Боты, CRM и веб-сервисы. Взлёт — от 3 дней. Без менеджеров.',
    deco: {
      st: `<svg class="deco" viewBox="0 0 100 100" style="right:6%;top:30%;width:30%;transform:rotate(14deg)">${star(Y)}</svg><svg class="deco" viewBox="0 0 64 64" style="right:-4%;top:6%;width:28%;transform:rotate(24deg)">${mark({ bg: 'transparent', m1: K, m2: '#fff', dot: O })}</svg>`,
      sq: `<svg class="deco" viewBox="0 0 100 100" style="right:6%;top:8%;width:30%;transform:rotate(12deg)">${star(Y)}<text x="50" y="58" text-anchor="middle" style="fill:${K};font:900 9px Unbounded">ОТ 3 ДНЕЙ</text></svg>`,
      mr: `<svg class="deco" viewBox="0 0 64 64" style="right:4%;top:5%;width:30%;transform:rotate(20deg)">${mark({ bg: 'transparent', m1: K, m2: Y, dot: O })}</svg>`,
      wd: `<svg class="deco" viewBox="0 0 64 64" style="right:6%;top:14%;width:28%;transform:rotate(18deg)">${mark({ bg: 'transparent', m1: K, m2: Y, dot: O })}</svg><svg class="deco" viewBox="0 0 100 100" style="right:30%;bottom:8%;width:13%;transform:rotate(-10deg)">${star(P)}</svg>`,
      tg: `<svg class="deco" viewBox="0 0 64 64" style="right:7%;top:12%;width:24%;transform:rotate(22deg)">${mark({ bg: 'transparent', m1: K, m2: Y, dot: O })}</svg>`,
      lb: `<svg class="deco" viewBox="0 0 100 100" style="left:23%;top:12%;height:76%;transform:rotate(10deg)">${star(Y)}</svg>`,
    },
    promoDeco: i => `<svg class="deco" viewBox="0 0 100 100" style="right:5%;top:6%;width:32%;transform:rotate(${[12, -8, 16][i]}deg)">${star([Y, P, Y][i])}<text x="50" y="58" text-anchor="middle" style="fill:${K};font:900 ${[15, 12, 13][i]}px Unbounded">${['0 ₽', '50/50', '1 МЕС'][i]}</text></svg>`,
  },
  promo: [
    { name: '«Нулевая» оценка', tag: 'БЕСПЛАТНАЯ ОЦЕНКА', head: 'ОЦЕНКА ЗА 0 ₽', sub: 'Расскажите задачу как есть — назовём цену и срок.', cta: 'Рассказать', postHead: 'ОЦЕНКА ЗА 0 ₽. Серьёзно.' },
    { name: 'Половинка на старт', tag: 'ОПЛАТА 50/50', head: 'ПОЛОВИНА СЕЙЧАС, ПОЛОВИНА ПОТОМ', sub: 'Цена фиксируется в договоре. Без доплат.', cta: 'Обсудить', postHead: 'Платите половину. Вторую — после приёмки.' },
    { name: 'Месяц на орбите', tag: 'ПОДДЕРЖКА ПОСЛЕ ЗАПУСКА', head: 'МЕСЯЦ ФИКСОВ — БЕСПЛАТНО', sub: 'Код и доступы — ваши. Навсегда.', cta: 'Написать', postHead: 'Запустили — и не бросили.' },
  ],
  hero: `<div class="h19"><div class="ey">БРЕНДБУК · ВАРИАНТ 19</div><h1>РАКЕ<br>ТА<span class="hd">!</span></h1><span class="stk s1">${wm()}</span><span class="stk s2">взлёт от 3 дней</span><svg class="s3" viewBox="0 0 100 100">${star(Y)}</svg><svg class="s4" viewBox="0 0 64 64">${mark({ bg: 'transparent', m1: K, m2: '#fff', dot: O })}</svg><p class="lead">Дерзкий, громкий стиль для соцсетей и Авито: огромные буквы, стикеры, жирный контур и ракета вместо «ф».</p></div>`,
  css: `
body.v19{--bg:${CR};--fg:${K};--fg2:#2a2a2a;--muted:#595350;--line:${K};--line2:${K};--card:#fff;--card2:#fff;--acc:${O};--acc-t:#c73a00;--on-acc:${K};--light:#fff;--dark:${V};--ink:${K};--paper:#fff;--r:14px;--r2:12px;--bf:'Geologica',sans-serif;--hf:'Unbounded',sans-serif;--cf:'Geologica',sans-serif;--wf:'Unbounded',sans-serif;--ww:900;--wls:-.05em;--sf:'Geologica',sans-serif;--stc:${K};--bar:${Y};--bnbg:${V};--bnfg:#fff;--br:16px;--btr:12px;--ic-c:${K};--chatbg:#c9b8ff;--hw:900;--shadow:6px 6px 0 ${K}}
.v19 .wm .d{border:.03em solid ${K};width:.24em;height:.24em}
.v19 .st{background:${Y};color:${K};padding:.15em .4em;align-self:flex-start;font-weight:600;letter-spacing:.06em;border:2px solid ${K};margin-top:.35em;font-size:.26em}
.v19 .top{border-bottom:3px solid ${K}}
.v19 .top nav a{color:${K};font-weight:600}
.v19 .card,.v19 .sw,.v19 .icons figure,.v19 .els .e,.v19 .merch figure,.v19 .dont figure,.v19 .tile,.v19 .phr li{border:3px solid ${K};box-shadow:5px 5px 0 ${K}}
.v19 .tile.D{background:${V}}
.v19 .s{border-top:3px solid ${K}}
.v19 .sh h2{font-weight:900;text-transform:uppercase;letter-spacing:-.04em;font-size:clamp(36px,6vw,84px);line-height:.92}
.v19 .sh .no{font-family:Unbounded;font-weight:900;font-size:22px;background:${P};border:3px solid ${K};width:max-content;padding:4px 12px;transform:rotate(-6deg);color:${K}}
.v19 .sub{font-weight:600;color:${K}}
.v19 .tone span{background:${Y};border:2px solid ${K};font-weight:600}
.v19 .tone span:nth-child(2n){background:${P}}
.v19 .t-h1,.v19 .t-h2{font-weight:900;text-transform:uppercase;letter-spacing:-.04em}.v19 .t-h1{font-size:clamp(46px,7vw,96px);line-height:.92}.v19 .t-h3{font-weight:600}.v19 .t-lead{font-weight:600}.v19 .t-cap{font-weight:600}
.h19{position:relative;padding:10px 0 0}
.h19 h1{font-size:clamp(84px,20vw,300px);line-height:.82;font-weight:900;letter-spacing:-.06em;margin:10px 0 30px}
.h19 h1 .hd{color:${O};-webkit-text-stroke:4px ${K}}
.h19 .lead{max-width:520px;font-weight:600}
.stk{display:inline-flex;background:#fff;border:3px solid ${K};box-shadow:6px 6px 0 ${K};padding:.25em .45em;border-radius:14px}
.h19 .stk{position:absolute}
.h19 .s1{right:4%;top:18%;font-size:clamp(28px,4vw,56px);transform:rotate(6deg);background:${Y}}
.h19 .s2{right:22%;top:52%;font:900 clamp(16px,2vw,26px) Unbounded;background:${P};transform:rotate(-8deg);text-transform:uppercase}
.h19 .s3{position:absolute;right:2%;top:58%;width:clamp(80px,12vw,170px);transform:rotate(14deg)}
.h19 .s4{position:absolute;left:52%;top:0;width:clamp(80px,11vw,160px);transform:rotate(30deg)}
.v19 .stk .wm .w{color:${K}}
.v19 .bn{border:3px solid ${K};box-shadow:6px 6px 0 ${K}}
.v19 .bn .ttl{text-transform:uppercase;letter-spacing:-.04em}
.v19 .bn .cta{background:${Y};color:${K};border:3px solid ${K};box-shadow:4px 4px 0 ${K};font-weight:600}
.v19 .bn .pr{background:${O};color:${K};padding:.1em .35em;border:3px solid ${K};align-self:flex-start;display:inline-block;transform:rotate(-3deg)}
.v19 .bn .st{border-width:1.5px}
.v19 .bn-st .ttl{font-size:11.5cqw;line-height:.92}
.v19 .bn-st li{border-bottom:2px solid rgba(255,255,255,.3)}
.v19 .bn-sq{--bnbg:${P};--bnfg:${K}}.v19 .bn-sq .ttl{font-size:10cqw;line-height:.92;max-width:70%}.v19 .bn-sq .row .mt{font-weight:600}
.v19 .bn-mr{--bnbg:${Y};--bnfg:${K}}.v19 .bn-mr .ttl{font-size:9cqw}
.v19 .bn-wd .ttl{font-size:7.4cqw;line-height:.9}
.v19 .bn-tg{--bnbg:${K};--bnfg:#fff}.v19 .bn-tg .chips span{background:${Y};color:${K};border:2px solid ${Y}}
.v19 .bn-lb{--bnbg:${Y};--bnfg:${K};--br:8px}.v19 .bn-lb .logo{margin-right:7cqw}.v19 .bn-lb .ttl{text-transform:none;font-family:Geologica;font-weight:600}.v19 .bn-lb .cta{background:${V};color:#fff;box-shadow:none}
.v19 .bn .deco svg,.v19 .bn svg.deco{overflow:visible}
.v19 .pb1{--bnbg:${V}}.v19 .pb2{--bnbg:${Y};--bnfg:${K}}.v19 .pb3{--bnbg:${K}}
.v19 .pb1 .ttl,.v19 .pb2 .ttl,.v19 .pb3 .ttl{font-size:10.5cqw;line-height:.92;max-width:88%}
.v19 .icons .ic{width:56px;height:56px}
.v19 .bn.th,.v19 .bn.reel{--tnum:${Y}}.v19 .ths .tg,.v19 .th .tf,.v19 .th .tn{color:#fff}
.v19 .reel .ttl{font-size:10cqw;text-transform:uppercase}.v19 .thc .ttl{font-size:8cqw}.v19 .ths .ttl{font-size:6.6cqw}
.v19 .promo{border-top:3px dashed ${K}}
.v19 .post{border:2px solid ${K}}
.v19 .note{border:2px dashed ${K};color:${K};background:${Y}}
.v19 .pager .all{border:3px solid ${K};background:${Y};box-shadow:4px 4px 0 ${K}}
@media (max-width:700px){.h19 .s1{top:auto;bottom:-10px;right:0}.h19 .s2{display:none}.h19 .s3{top:34%;width:70px}.h19 .s4{left:auto;right:6%;top:4%;width:70px}.h19 .s1{position:static;display:inline-flex;margin:28px 0 10px 4px}}
`,
});
console.log('v19 ok');
