import { build, wm, H } from './core.mjs';
const A = '#f2501c', CU = '#c4865a', CU2 = '#e0b48a', BK = '#0b0a09', BK2 = '#15130f', IV = '#f4efe6', TX = '#d9d2c5', MU = '#8b8274';
// знак: антиква «ф» с контрастной чашей и засечками, медная рамка-кольцо, огонёк над осью
const phi = col => `<path fill-rule="evenodd" d="M32 21c-9.5 0-15 5.2-15 12s5.5 12 15 12 15-5.2 15-12-5.5-12-15-12zm0 2.4c-4.2 0-6.3 4.3-6.3 9.6s2.1 9.6 6.3 9.6 6.3-4.3 6.3-9.6-2.1-9.6-6.3-9.6z" style="fill:${col}"/><path d="M30.4 15.5h3.2v35h-3.2z M26.5 50.5h11v1.8h-11z M28 15.5h5.6v1.6H28z" style="fill:${col}"/>`;
const mark = c => `<rect width="64" height="64" style="fill:${c.bg}"/><circle cx="32" cy="33" r="27" style="fill:none;stroke:${c.m2};stroke-width:.9"/><circle cx="32" cy="33" r="24.6" style="fill:none;stroke:${c.m2};stroke-width:.4"/>${phi(c.m1)}<circle cx="32" cy="9.4" r="3.4" style="fill:${c.dot}"/>`;
const sets = {
  light: { bg: IV, m1: BK, m2: '#a26a42', dot: A },
  dark: { bg: BK, m1: IV, m2: CU, dot: A },
  fav: { bg: BK, m1: IV, m2: BK, dot: A },
  avatar: { bg: BK2, m1: CU2, m2: CU, dot: A },
  monoB: { bg: '#fff', m1: '#000', m2: '#000', dot: '#000' },
  monoW: { bg: '#000', m1: '#fff', m2: '#fff', dot: '#fff' },
};
const guill = `background-color:${BK};background-image:repeating-radial-gradient(circle at 0 100%,transparent 0 13px,rgba(196,134,90,.22) 13px 14px),repeating-radial-gradient(circle at 100% 0,transparent 0 13px,rgba(196,134,90,.12) 13px 14px)`;
build({
  n: 17, title: 'Тёмный премиум', mark, markSets: sets,
  idea: 'Ювелирная мастерская кода: чёрный бархат, медь и антиква. Продолжение макета 07, который понравился клиенту, — «тонкая работа» прочитана буквально, как работа ювелира. Огонёк над «ф» — искра под лупой мастера.',
  voice: 'Говорим сдержанно и с достоинством, как мастер, а не продавец. Короткие фразы, никакой спешки, никаких скидок. Внимание к детали — главный аргумент.',
  tone: ['сдержанно', 'точно', 'с достоинством', 'лично', 'без суеты'],
  phrases: [['Заголовок', 'Тонкая работа для вашего бизнеса.'], ['Оффер', 'CRM под вас — от 40 000 ₽. Стоимость закрепляем в договоре.'], ['Ответ клиенту', 'Над вашим проектом работают два разработчика. Без посредников.'], ['Подпись поста', 'Исходный код, доступы и инструкция — ваши.']],
  nosay: ['Супер-скидка 50% только до пятницы!!!', 'Делаем ботов дёшево и быстро'],
  markIdea: 'Монограмма — строчная антиквенная «ф» с контрастной чашей и засечками в двойном медном кольце, как клеймо мастера. Огонёк над осью сохраняет точку «финес». На 16 px кольцо убирается.',
  logoIdea: 'Слово «финес» набрано Cormorant Garamond 600 — антиква с ювелирным контрастом штрихов. Огонёк после «с» светится медно-оранжевым. Подпись «студио» — Manrope 600 разрядкой, медью.',
  colorIdea: 'Почти чёрный фон с тёплым подтоном, слоновая кость для текста, медь для линий и деталей. Оранжевый огонёк остаётся из логотипа №67 и появляется только в точке и ключевой кнопке.',
  palette: [
    { n: 'Бархат', hex: BK, on: IV, p: 58, role: 'основной фон' },
    { n: 'Графит', hex: BK2, on: IV, p: 14, role: 'карточки, плашки' },
    { n: 'Слоновая кость', hex: IV, on: BK, p: 15, role: 'заголовки, документы' },
    { n: 'Медь', hex: CU, on: BK, p: 9, role: 'линии, кольца, подписи' },
    { n: 'Огонёк', hex: A, on: '#fff', p: 4, role: 'точка лого, ключевая кнопка' },
  ],
  colorNote: 'Кость на бархате — 17:1; медь на бархате — 6.9:1, подходит для подписей.',
  typeIdea: 'Пара «антиква + гротеск»: Cormorant Garamond задаёт голос в заголовках и цифрах, Manrope держит длинный текст и интерфейс. Курсив Cormorant — для акцентных слов.',
  fonts: [
    { fam: 'Cormorant Garamond', id: 'cormorant-garamond', w: [500, 600], use: 'Логотип, заголовки, цены' },
    { fam: 'Cormorant Garamond', id: 'cormorant-garamond', w: [500], style: 'italic', use: 'Акцентные слова', hide: true },
    { fam: 'Manrope', id: 'manrope', w: [400, 600], use: 'Текст, подписи, кнопки' },
  ],
  type: [
    ['H1 · Cormorant 500', '80/0.98', 't-h1', 'Тонкая работа <i>для вашего</i> бизнеса'],
    ['H2 · Cormorant 500', '50/1.05', 't-h2', 'Что мы <i>разрабатываем</i>'],
    ['H3 · Cormorant 600', '28/1.15', 't-h3', 'Всё остаётся у вас'],
    ['Lead · Manrope 400', '20/1.55', 't-lead', 'Пишем код под задачу, без посредников и наценок в смете.'],
    ['Body · Manrope 400', '16/1.7', 't-body', 'Передаём исходный код, доступы и инструкцию. Решение принадлежит вам, а не студии.'],
    ['Caption · Manrope 600', '12/1.4 · +0.24em · UPPER', 't-cap', 'ФИНЕС СТУДИО · СТУДИЯ РАЗРАБОТКИ'],
  ],
  idIdea: 'Айдентика ювелирной витрины: гильош из медных дуг, тонкие рамки-паспарту, клеймо-монограмма и номер изделия курсивом. Много воздуха, мало элементов.',
  patternCss: guill, patternNote: 'Гильош: концентрические медные дуги из двух углов, шаг 14 px. Только на тёмном фоне, не больше одного блока на макет.',
  elements: [
    [`<svg viewBox="0 0 220 120"><rect x="10" y="10" width="200" height="100" style="fill:none;stroke:${CU};stroke-width:1"/><rect x="18" y="18" width="184" height="84" style="fill:none;stroke:${CU};stroke-width:.5"/><text x="110" y="70" text-anchor="middle" style="fill:${IV};font:italic 500 26px 'Cormorant Garamond'">— № 01</text></svg>`, 'Паспарту — двойная медная рамка для обложек'],
    [`<svg viewBox="0 0 64 64" style="height:140px">${mark({ bg: 'transparent', m1: CU2, m2: CU, dot: A })}</svg>`, 'Клеймо — монограмма в медной гравировке'],
    [`<svg viewBox="0 0 240 60"><path d="M10 30h90M140 30h90" style="stroke:${CU};stroke-width:.8"/><circle cx="120" cy="30" r="5" style="fill:${A}"/><circle cx="120" cy="30" r="11" style="fill:none;stroke:${CU};stroke-width:.8"/></svg>`, 'Разделитель с огоньком — между разделами'],
  ],
  iconNote: 'линия 1, медь, тонкое кольцо, огонёк-узел',
  iconStyle: { mode: 'ring', sw: 1, cap: 'round', join: 'round', dr: 1.3, pad: 0 },
  id: {
    cardFront: `<div class="in" style="background:${BK};color:${IV};outline:1px solid ${CU};outline-offset:-4cqw"><div style="margin:auto;text-align:center">${wm()}</div></div>`,
    cardBack: `<div class="in" style="${guill};color:${IV};padding:8cqw"><div class="nm" style="font-family:'Cormorant Garamond'">Тонкая работа<br><i style="color:${CU2}">для вашего бизнеса</i></div><div class="meta" style="color:${TX};letter-spacing:.06em">t.me/fines_studio · ${H}</div></div>`,
    kp: `<div class="in" style="background:${BK};color:${IV};outline:1px solid ${CU};outline-offset:-5cqw;padding:13cqw"><div style="text-align:center">${wm()}</div><div style="margin:auto 0;text-align:center"><div class="k" style="color:${CU}">Коммерческое предложение · № 01</div><h4 style="font-weight:500">Telegram-бот <i style="color:${CU2}">для записи</i></h4><p style="color:${TX}">для компании «Название клиента»</p></div><div class="ft" style="justify-content:center;color:${CU}"><span>${H}</span></div></div>`,
    blank: `<div class="in" style="background:${IV};color:${BK}"><div style="text-align:center;border-bottom:1px solid ${CU};padding-bottom:4cqw"><span class="cx-light">${wm()}</span></div><p style="margin-top:4cqw;font-family:'Cormorant Garamond';font-size:4.6cqw;font-style:italic">Добрый день,</p><p style="margin-top:2cqw">стоимость и срок закрепим в договоре.</p><div class="ft" style="border-top:1px solid ${CU};padding-top:2cqw"><span>Финес Студио</span><span>t.me/fines_studio</span></div></div>`,
  },
  merch: { tee: '#141210', teeS: '#000', mug: '#141210', txt: CU2, mk: { bg: 'transparent', m1: CU2, m2: CU, dot: A }, rot: 0 },
  bnIdea: 'Баннеры как витрина: чёрный бархат, медная рамка, крупная антиква и одна оранжевая искра. Цена набирается антиквой, «от» — курсивом.',
  bnRules: 'Медная рамка-паспарту на всех форматах кроме 728×90. Не больше одной кнопки. Курсив — только для одного слова в заголовке.',
  bn: {
    stTitle: 'Тонкая работа <i>для вашего</i> бизнеса', sqTitle: 'Бот, который <i>не забывает</i> про клиента', wdTitle: 'CRM, сделанная <i>по мерке</i>', tgTitle: 'Telegram-боты, CRM и веб-сервисы ручной работы для вашего бизнеса',
    deco: { st: `<div class="deco frame"></div>`, sq: `<div class="deco frame"></div>`, mr: `<div class="deco frame"></div>`, wd: `<div class="deco frame"></div><svg class="deco" viewBox="0 0 64 64" style="right:7%;top:50%;transform:translateY(-50%);width:26%">${mark({ bg: 'transparent', m1: CU2, m2: CU, dot: A })}</svg>`, tg: `<div class="deco gl"></div><div class="deco frame"></div>`, lb: '' },
    promoDeco: () => `<div class="deco frame"></div>`,
  },
  promo: [
    { name: 'Примерка задачи', tag: 'Бесплатная оценка', head: 'Сначала <i>примерка</i>. Оценка бесплатно', sub: 'Стоимость и срок назовём до старта.', cta: 'Описать задачу', postHead: 'Примерка задачи — бесплатно.' },
    { name: 'Цена по мерке', tag: 'Фиксированная цена · 50/50', head: 'Цена <i>не меняется</i> после договора', sub: '50% перед стартом, 50% после приёмки.', cta: 'Обсудить', postHead: 'Смета без наценок и доплат.' },
    { name: 'Изделие с гарантией', tag: 'Поддержка и ваш код', head: 'Месяц <i>заботы</i> после запуска', sub: 'Исправляем ошибки бесплатно. Код и доступы — ваши.', cta: 'Написать', postHead: 'Работа, которую отдаём целиком.' },
  ],
  hero: `<div class="ey">БРЕНДБУК · ВАРИАНТ 17 · ПО МОТИВАМ МАКЕТА 07</div><h1>Тёмный <i>премиум</i></h1><p class="lead">Ювелирная мастерская кода: чёрный бархат, медь и антиква. Для студии, которая продаёт внимание к деталям.</p><div class="big"><span class="hl">${`<svg class="mk" viewBox="0 0 64 64">${mark({ bg: 'transparent', m1: IV, m2: CU, dot: A })}</svg>`}${wm()}</span></div>`,
  css: `
body.v17{--bg:${BK};--fg:${IV};--fg2:${TX};--muted:${MU};--line:#26221d;--line2:#3a332b;--card:${BK2};--card2:#191612;--acc:${A};--acc-t:${CU2};--on-acc:#fff;--light:${IV};--dark:${BK};--ink:${BK};--paper:${IV};--r:0px;--r2:0px;--bf:'Manrope',sans-serif;--hf:'Cormorant Garamond',serif;--cf:'Manrope',sans-serif;--wf:'Cormorant Garamond',serif;--ww:600;--wls:-.02em;--sf:'Manrope',sans-serif;--stc:${CU};--bar:rgba(11,10,9,.92);--bnbg:${BK};--bnfg:${IV};--btr:0;--ic-guide:${CU};--ic-c:${CU2};--chatbg:#1d1a16;--hw:500;--shadow:0 20px 50px rgba(0,0,0,.6)}
.v17 .st{letter-spacing:.32em;font-size:.24em;text-transform:uppercase;margin-top:.5em;font-weight:600}
.v17 .wm .d{background:radial-gradient(circle at 35% 35%,#ffb27a,${A} 60%);animation:glow 2.4s ease-in-out infinite}
.v17 .L .st{--stc:#8d5a35}
.v17 .hero h1{font-size:clamp(60px,10vw,150px);line-height:.92;font-weight:500;letter-spacing:-.01em}
.v17 .hero h1 i,.v17 .sh h2 i,.v17 i{font-style:italic;color:${CU2}}
.v17 .L i,.v17 .paper.blank i{color:#8d5a35}
.v17 .hero .ey,.v17 .sub,.v17 .sh .no{letter-spacing:.3em;font-size:11px;text-transform:uppercase}
.v17 .sh .no::before{content:'— '}
.v17 .sh h2{font-weight:500}
.v17 .t-h1,.v17 .t-h2{font-weight:500}.v17 .t-h1{font-size:clamp(44px,6vw,80px)}.v17 .t-h3{font-weight:600;font-size:28px}.v17 .t-cap{letter-spacing:.24em;font-weight:600}
.v17 .top nav a{letter-spacing:.14em;text-transform:uppercase;font-size:11px}
.v17 .tone span{border-color:${CU};border-radius:0;color:${CU2}}
.v17 .phr li{border-left:0;border-right:0;border-top:0;background:transparent;padding-left:0}
.v17 .card{border-color:#2c2721}
.v17 .tile.D{background:${BK};border-color:${CU}}
.v17 .bn .deco.frame{inset:3.4cqw;border:1px solid ${CU}}
.v17 .bn .deco.gl{inset:0;${guill};opacity:.7;-webkit-mask:linear-gradient(90deg,transparent 35%,#000);mask:linear-gradient(90deg,transparent 35%,#000)}
.v17 .bn .ttl{font-weight:500}
.v17 .bn .ttl i{color:${CU2}}
.v17 .bn .pr{color:${CU2};font-weight:500}
.v17 .bn .cta{background:transparent;border:1px solid ${A};color:${IV};text-transform:uppercase;letter-spacing:.14em;font-weight:600}
.v17 .bn-st .cta{background:${A};border-color:${A}}
.v17 .bn .k{letter-spacing:.22em;text-transform:uppercase;color:${CU}}
.v17 .bn-sq .in,.v17 .bn-mr .in{padding:10cqw}.v17 .bn-st .in{padding:12cqw 11cqw}.v17 .bn-wd .in{padding:7cqw 8cqw}
.v17 .bn-mr .ttl{font-size:9.4cqw}.v17 .bn-mr .in{padding:9cqw}.v17 .bn-st .cta{letter-spacing:.06em;font-size:3.6cqw;padding:3.4cqw 2cqw}
.v17 .bn-sq .ttl{font-size:8.6cqw}
.v17 .bn-st li{border-bottom:1px solid #2c2721}
.v17 .bn-st li b{color:${CU2};font-family:'Cormorant Garamond';font-size:1.15em;font-weight:600}
.v17 .bn-tg .tl{font-style:italic;color:${TX}}
.v17 .bn-tg .chips span{border-color:${CU};border-radius:0;color:${CU2}}
.v17 .bn-lb{border:1px solid ${CU}}
.v17 .icons .ic{color:${CU2}}
.v17 .sw .t b{font-family:'Cormorant Garamond';font-size:20px;font-weight:600}
.v17 .promo ul.cond li::before{border-radius:0;transform:rotate(45deg);width:6px;height:6px;background:${CU}}
.v17 .pager .all{border-radius:0;border-color:${CU}}
.v17 .post{--post-bg:#1f1c18;color:${TX}}.v17 .post .tm{color:${MU}}
.v17 .note{border-color:${CU}}
.v17 .dont .pv{background:${IV}}
`,
});
console.log('v17 ok');
