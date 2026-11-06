import { build, wm, H, SV } from './core.mjs';
const A = '#f2501c', K = '#111111', W = '#ffffff', G = '#f2f2f0', M = '#8a8a86', L = '#e4e4e1';
// знак: только точка. Короткий логотип — «ф.» (буква + точка) или просто точка в поле
const mark = c => `<rect width="64" height="64" style="fill:${c.bg}"/><text x="27" y="46" text-anchor="middle" style="fill:${c.m1};font:800 46px Onest,sans-serif;letter-spacing:-2px">ф</text><circle cx="47.5" cy="42.5" r="4.6" style="fill:${c.dot}"/>`;
const sets = {
  light: { bg: W, m1: K, m2: K, dot: A },
  dark: { bg: K, m1: W, m2: W, dot: A },
  fav: { bg: K, m1: W, m2: W, dot: A },
  avatar: { bg: K, m1: W, m2: W, dot: A },
  monoB: { bg: '#fff', m1: '#000', m2: '#000', dot: '#000' },
  monoW: { bg: '#000', m1: '#fff', m2: '#fff', dot: '#fff' },
};
const bot = SV[0], crm = SV[1], web = SV[2], int = SV[3];
build({
  n: 20, title: 'Минимум', mark, markSets: sets,
  idea: 'Ничего лишнего — как и в работе студии: только слово «финес» и точка. Чёрный, белый и один оранжевый акцент. Пустое пространство здесь работает так же, как отсутствие менеджеров в смете: всё, что осталось, — по делу.',
  voice: 'Одна мысль — одно предложение. Без прилагательных, без восклицаний, без эмодзи. Точка в конце фразы — фирменный знак.',
  tone: ['коротко', 'прямо', 'тихо', 'с точкой в конце'],
  phrases: [['Заголовок', 'Код под задачу.'], ['Оффер', 'Бот. От 15 000 ₽. От 3 дней.'], ['Ответ клиенту', 'Опишите задачу. Оценим бесплатно.'], ['Подпись поста', 'Два разработчика. Без менеджеров.']],
  nosay: ['🚀🔥 Крутые решения для вашего бизнеса!!!', 'Комплексный подход к цифровизации процессов'],
  markIdea: 'Короткий логотип — «ф.»: первая буква слова и фирменная точка. Отдельно точка используется как самый маленький знак: в углу документа, в заголовке, как буллет. Больше ничего.',
  logoIdea: 'Логотип — эталон №67 без изменений: «финес» Onest 800, letter-spacing −0.06em, светящаяся точка 0.2em после «с», «студио» Onest 600 оранжевым. Горизонтальная и вертикальная версии отличаются только положением «ф.».',
  colorIdea: 'Монохром плюс один акцент. Оранжевый #F2501C занимает не больше 3% площади: точка, ссылка, одна цифра. Серые — только для служебного текста и линий.',
  palette: [
    { n: 'Белый', hex: W, on: K, p: 62, role: 'фон' },
    { n: 'Бумага', hex: G, on: K, p: 14, role: 'плашки, мерч' },
    { n: 'Чёрный', hex: K, on: W, p: 18, role: 'текст, тёмные поверхности' },
    { n: 'Пыль', hex: M, on: K, p: 3, role: 'подписи, линии' },
    { n: 'Точка', hex: A, on: W, p: 3, role: 'точка — и только' },
  ],
  colorNote: 'Чёрный на белом — 18.9:1. Пыль #8A8A86 на белом — только для подписей 12px+ (3.5:1).',
  typeIdea: 'Один шрифт — Onest, три начертания. Иерархия держится размером и пустотой, а не цветом. Заголовки заканчиваются оранжевой точкой.',
  fonts: [
    { fam: 'Onest', id: 'onest', w: [400, 600, 800], use: 'Всё: логотип, заголовки, текст' },
  ],
  type: [
    ['H1 · Onest 800', '88/0.95 · −0.05em', 't-h1', 'Код под задачу<b class="pt">.</b>'],
    ['H2 · Onest 800', '48/1 · −0.04em', 't-h2', 'Четыре этапа<b class="pt">.</b>'],
    ['H3 · Onest 600', '24/1.2', 't-h3', 'Фиксированная цена'],
    ['Lead · Onest 400', '22/1.45', 't-lead', 'Пишем код под задачу, без посредников и наценок в смете.'],
    ['Body · Onest 400', '16/1.6', 't-body', 'Передаём исходный код, доступы и инструкцию. Решение принадлежит вам.'],
    ['Caption · Onest 400', '12/1.4', 't-cap', 'не является публичной офертой'],
  ],
  idIdea: 'Вся айдентика — это точка и поле вокруг неё. Точка стоит там, где взгляд должен остановиться. Линии 1 px, поля шириной в 1/12 формата.',
  patternCss: `background:${W};background-image:radial-gradient(circle,${K} 0 1.5px,transparent 2px);background-size:40px 40px`,
  patternNote: 'Паттерн — точечная сетка 40 px, 3 px чёрные точки. Одна точка в композиции может стать оранжевой.',
  elements: [
    [`<svg viewBox="0 0 200 120"><circle cx="100" cy="60" r="9" style="fill:${A}"/></svg>`, 'Точка — главный элемент, всегда одна'],
    [`<svg viewBox="0 0 240 120"><path d="M20 60h200" style="stroke:${K};stroke-width:1"/><circle cx="220" cy="60" r="5" style="fill:${A}"/></svg>`, 'Линия до точки — разделитель и стрелка'],
    [`<svg viewBox="0 0 240 120"><text x="20" y="80" style="fill:${K};font:800 54px Onest;letter-spacing:-3px">50/50</text><circle cx="196" cy="74" r="6" style="fill:${A}"/></svg>`, 'Цифра с точкой — для условий'],
  ],
  iconNote: 'линия 1.25, без заливок, точка — только у одной иконки в наборе на макете',
  iconStyle: { mode: 'plain', sw: 1.25, cap: 'butt', join: 'miter', dr: 1.4 },
  id: {
    cardFront: `<div class="in" style="background:${W};color:${K};justify-content:center;align-items:center">${wm()}</div>`,
    cardBack: `<div class="in" style="background:${K};color:${W}"><span style="width:3cqw;height:3cqw;border-radius:50%;background:${A}"></span><div class="meta">${H}<br>t.me/fines_studio</div></div>`,
    kp: `<div class="in" style="background:${W};color:${K}"><div style="display:flex;justify-content:space-between"><span class="k">КП</span><span style="width:2.6cqw;height:2.6cqw;border-radius:50%;background:${A}"></span></div><h4 style="margin-top:auto;font-weight:800;letter-spacing:-.04em">CRM под вас<span style="color:${A}">.</span></h4><p>«Название клиента»</p><div class="ln"></div><div class="ft" style="opacity:1"><span class="cx-light">${wm()}</span><span>${crm.price}</span></div></div>`,
    blank: `<div class="in" style="background:${W};color:${K}"><span class="hl" style="font-size:5cqw">${wm()}</span><p style="margin-top:14cqw">Добрый день.</p><p style="margin-top:2cqw">Стоимость и срок закрепим в договоре до старта работ.</p><p style="opacity:.2;margin-top:3cqw">— — — — — — — — — — — — — — — —<br>— — — — — — — — — — — — —</p><div class="ft"><span>${H}</span><span style="width:1.6cqw;height:1.6cqw;border-radius:50%;background:${A}"></span></div></div>`,
  },
  merch: { tee: W, teeS: '#cfcfcb', mug: K, txt: K, mk: { bg: 'transparent', m1: K, m2: K, dot: A }, rot: 0 },
  bnIdea: 'Баннер — это одна фраза, одна цифра и точка. Пустое поле — не ошибка, а композиция. Кнопка — подчёркнутая ссылка или чёрная плашка.',
  bnRules: 'Белый или чёрный фон, без картинок. Не больше трёх строк текста. Оранжевый — только точка логотипа и точка в конце заголовка.',
  bn: {
    stTitle: 'Код под задачу<span class="pt">.</span>', sqTitle: 'Бот<span class="pt">.</span>', wdTitle: 'CRM под вас<span class="pt">.</span>', tgTitle: 'Telegram-боты, CRM, веб-сервисы, интеграции.',
    deco: {},
    promoDeco: () => '',
  },
  promo: [
    { name: 'Оценка — 0 ₽', tag: 'оценка', head: '0 ₽<span class="pt">.</span>', sub: 'Столько стоит оценка задачи.', cta: 'Описать задачу', postHead: 'Оценка — бесплатно.' },
    { name: 'Одна цена', tag: 'договор', head: '50/50<span class="pt">.</span>', sub: 'До старта и после приёмки. Цена — в договоре.', cta: 'Обсудить', postHead: 'Одна цена. Две части.' },
    { name: 'Ваш код', tag: 'после запуска', head: 'Ваше<span class="pt">.</span>', sub: 'Код, доступы, инструкция. И месяц исправлений бесплатно.', cta: 'Написать', postHead: 'Всё остаётся у вас.' },
  ],
  hero: `<div class="h20"><div class="ey">вариант 20 — минимум</div><div class="hw">${wm()}</div><p class="lead">Только слово и точка. Монохром и один акцент.</p></div>`,
  css: `
body.v20{--bg:${W};--fg:${K};--fg2:#333;--muted:#6f6f6b;--line:${L};--line2:#cfcfcb;--card:${W};--card2:${W};--acc:${A};--acc-t:#c43a0d;--on-acc:#fff;--light:${W};--dark:${K};--ink:${K};--paper:${W};--r:0px;--r2:0px;--bf:'Onest',sans-serif;--hf:'Onest',sans-serif;--cf:'Onest',sans-serif;--wf:'Onest',sans-serif;--ww:800;--wls:-.06em;--sf:'Onest',sans-serif;--stc:${A};--bar:rgba(255,255,255,.96);--bnbg:${W};--bnfg:${K};--btr:0;--ic-c:${K};--chatbg:${G};--hw:800;--shadow:0 0 0 1px ${L}}
.v20 .wm .d{animation:glow 2s ease-in-out infinite}
.v20 .pt{color:${A}}
.v20 .sh h2,.v20 .hero h1{font-weight:800;letter-spacing:-.045em}
.v20 .sh h2::after{content:'.';color:${A}}
.v20 .sh .no{color:${M}}
.v20 .sub{text-transform:none;letter-spacing:0;color:${M}}
.v20 .s{padding:130px 0}
.v20 .t-h1,.v20 .t-h2{font-weight:800;letter-spacing:-.05em}.v20 .t-h1{font-size:clamp(48px,7vw,88px);line-height:.95}.v20 .t-h2{font-size:48px}.v20 .t-h3{font-weight:600;font-size:24px}.v20 .t-lead{font-size:22px}.v20 .t-cap{letter-spacing:0}
.v20 .t-h1 b,.v20 .t-h2 b{font-weight:800}
.v20 .tone span{border:0;padding:0 14px 0 0;font-size:16px}
.v20 .tone span::after{content:'.';color:${A}}
.v20 .phr li{border:0;border-bottom:1px solid ${L};padding:14px 0;background:none}
.v20 .card{border:0;padding:0}
.v20 .tile{border:1px solid ${L}}
.v20 .tile.D{border-color:${K}}
.h20{min-height:62vh;display:flex;flex-direction:column;justify-content:center}
.h20 .hw .logo{font-size:clamp(92px,22vw,330px)}
.h20 .ey{color:${M}}
.h20 .lead{margin-top:40px;color:${M}}
.v20 .sw,.v20 .icons figure,.v20 .els .e,.v20 .merch figure,.v20 .dont figure{border:1px solid ${L}}
.v20 .bn{box-shadow:0 0 0 1px ${L}}
.v20 .bn .ttl{font-weight:800;letter-spacing:-.05em}
.v20 .bn .cta{background:transparent;color:inherit;padding-left:0!important;padding-right:0!important;border-bottom:2px solid currentColor;border-radius:0;font-weight:600}
.v20 .bn-st{--bnbg:${K};--bnfg:${W}}.v20 .bn-st .ttl{font-size:11cqw;line-height:1;margin-top:auto;margin-bottom:10cqw}.v20 .bn-st ul{margin-top:0}.v20 .bn-st li{border-color:#333}.v20 .bn-st .cta{align-self:flex-start;justify-content:flex-start;padding:2cqw 0}.v20 .bn-st .fn{text-align:left}
.v20 .bn-sq .ttl{font-size:34cqw;line-height:.85;margin-top:auto}.v20 .bn-sq .k{margin-top:0;color:${M};order:3}
.v20 .bn-sq .in{justify-content:space-between}
.v20 .bn-mr{--bnbg:${K};--bnfg:${W}}.v20 .bn-mr .ttl{font-size:9cqw}
.v20 .bn-wd .in{width:100%}.v20 .bn-wd .ttl{font-size:10cqw}.v20 .bn-wd .sb{display:none}
.v20 .bn-tg{--bnbg:${W}}.v20 .bn-tg .in{align-items:center;text-align:center}.v20 .bn-tg .logo{font-size:15cqw}.v20 .bn-tg .tl{font-family:Onest;font-weight:400;font-size:2.6cqw;color:${M}}.v20 .bn-tg .chips{display:none}.v20 .bn-tg .hd{color:${M}}
.v20 .bn-lb{--bnbg:${K};--bnfg:${W}}.v20 .bn-lb .ttl{font-weight:400;letter-spacing:0}.v20 .bn-lb .pr{font-weight:800}
.v20 .bn .wm .w{color:currentColor}
.v20 .pb1 .ttl,.v20 .pb2 .ttl,.v20 .pb3 .ttl{font-size:26cqw;line-height:.9}
.v20 .pb2{--bnbg:${K};--bnfg:${W}}
.v20 .pb1 .mt,.v20 .pb2 .mt,.v20 .pb3 .mt{font-size:3.6cqw!important}
.v20 .promo .of{font-size:20px}
.v20 .promo ul.cond li::before{background:${K}}
.v20 .post{border-radius:0;box-shadow:0 0 0 1px ${L}}
.v20 .pager .all{border-radius:0;border:0;border-bottom:1px solid ${K}}
.v20 .note{border-style:solid;border-color:${A}}
.v20 .icons .ic{width:44px;height:44px}
.v20 .icons figure:not(:first-child) .ic circle[style*="var(--acc)"]{display:none}
`,
});
console.log('v20 ok');
