import { build, wm, TG, H } from './core.mjs';
const A = '#f2501c', BP = '#0b2a5b', BP2 = '#123a78', LN = '#7fb0ff', PA = '#eef4ff', INK = '#0a1a38';
const mark = c => `<rect width="64" height="64" style="fill:${c.bg}"/>
<g style="stroke:${c.m2};stroke-width:.6;fill:none"><path d="M0 16h64M0 32h64M0 48h64M16 0v64M32 0v64M48 0v64" style="stroke-dasharray:1.5 1.5"/><circle cx="32" cy="34" r="22"/></g>
<circle cx="32" cy="34" r="14" style="fill:none;stroke:${c.m1};stroke-width:4.5"/>
<path d="M32 18v36" style="stroke:${c.m1};stroke-width:4.5;stroke-linecap:square"/>
<path d="M12 56h8M44 56h8M12 54v4M52 54v4" style="stroke:${c.m2};stroke-width:1"/>
<circle cx="32" cy="10" r="4.6" style="fill:${c.dot}"/>`;
const sets = {
  light: { bg: PA, m1: INK, m2: '#9cb8e6', dot: A },
  dark: { bg: BP, m1: '#ffffff', m2: '#3d68ad', dot: A },
  fav: { bg: BP, m1: '#ffffff', m2: BP, dot: A },
  avatar: { bg: BP, m1: '#ffffff', m2: '#2c5597', dot: A },
  monoB: { bg: '#ffffff', m1: '#000', m2: '#bbb', dot: '#000' },
  monoW: { bg: '#000', m1: '#fff', m2: '#444', dot: '#fff' },
};
const grid = `background-color:${BP};background-image:linear-gradient(rgba(127,176,255,.28) 1px,transparent 1px),linear-gradient(90deg,rgba(127,176,255,.28) 1px,transparent 1px),linear-gradient(rgba(127,176,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(127,176,255,.12) 1px,transparent 1px);background-size:80px 80px,80px 80px,16px 16px,16px 16px`;
const dim = (w = 300) => `<svg viewBox="0 0 ${w} 40" style="width:100%"><path d="M4 20H${w - 4}M4 12v16M${w - 4} 12v16" style="stroke:${LN};stroke-width:1"/><path d="M4 20l8-4v8zM${w - 4} 20l-8-4v8z" style="fill:${LN}"/></svg>`;
build({
  n: 15, title: 'Чертёж', mark, markSets: sets,
  idea: 'Финес как инженерное бюро: каждый проект сначала чертим, потом строим. Синяя калька, тонкие размерные линии и одна оранжевая точка — место, где решение «встаёт» в бизнес. Стиль говорит о точности, прозрачной смете и предсказуемом сроке.',
  voice: 'Говорим как инженер на приёмке: коротко, по пунктам, с цифрами из договора. Ни одного прилагательного без факта за ним.',
  tone: ['точно', 'спокойно', 'по пунктам', 'с цифрами', 'без жаргона'],
  phrases: [['Заголовок', 'Сначала чертёж. Потом код.'], ['Оффер', 'Telegram-бот от 15 000 ₽, срок от 3 дней — фиксируем в договоре.'], ['Ответ клиенту', 'Опишите задачу своими словами. ТЗ подготовим сами.'], ['Подпись поста', 'Спецификация: 2 разработчика, 0 менеджеров.']],
  nosay: ['Инновационные решения мирового уровня', 'Сделаем всё быстро и недорого, не переживайте'],
  markIdea: 'Знак — строчная «ф», построенная циркулем и линейкой: окружность, вертикальная ось и оранжевая точка над осью. Под знаком — сетка и размерные засечки, они исчезают на 16 px, остаётся чистая «ф» с точкой.',
  logoIdea: 'Слово «финес» — Onest 800 с точкой после «с», как в эталонном логотипе №67. В горизонтальной версии знак стоит слева, в вертикальной — над словом. Подпись «студио» набрана JetBrains Mono — как надпись в штампе чертежа.',
  colorIdea: 'База — синька чертежа и белая калька. Оранжевый — только точка, кнопка и важная цифра. Голубой — для линий и сетки, не для текста.',
  palette: [
    { n: 'Синька', hex: BP, on: '#fff', p: 45, role: 'фон, плашки, баннеры' },
    { n: 'Калька', hex: PA, on: INK, p: 25, role: 'светлый фон, документы' },
    { n: 'Линия', hex: LN, on: INK, p: 12, role: 'сетка, размеры, иконки' },
    { n: 'Тушь', hex: INK, on: '#fff', p: 13, role: 'текст на светлом' },
    { n: 'Точка', hex: A, on: '#fff', p: 5, role: 'точка лого, CTA, цена' },
  ],
  colorNote: 'Белый текст на синьке — контраст 13:1.',
  typeIdea: 'Onest отвечает за слово и заголовки, JetBrains Mono — за всё «техническое»: подписи, номера, размеры, цены. Моно-шрифт работает как штамп и не используется для длинного текста.',
  fonts: [
    { fam: 'Onest', id: 'onest', w: [400, 600, 800], use: 'Логотип, заголовки, основной текст' },
    { fam: 'JetBrains Mono', id: 'jetbrains-mono', w: [400, 700], use: 'Подписи, номера, размеры, цены' },
  ],
  type: [
    ['H1 · Onest 800', '72/1.05 · −0.04em', 't-h1', 'Сначала чертёж.'],
    ['H2 · Onest 800', '46/1.05 · −0.03em', 't-h2', 'Четыре этапа от заявки до запуска'],
    ['H3 · Onest 600', '26/1.2', 't-h3', 'Фиксированная цена'],
    ['Lead · Onest 400', '20/1.45', 't-lead', 'Разрабатываем Telegram-ботов, CRM-системы и веб-сервисы под процессы вашей компании.'],
    ['Body · Onest 400', '16/1.6', 't-body', 'Стоимость согласуем до старта и закрепляем в договоре. Доплат по ходу работы не будет.'],
    ['Caption · JetBrains Mono 400', '12/1.4 · +0.06em · UPPER', 't-cap', 'ЛИСТ 03 · ОЦЕНКА БЕСПЛАТНАЯ · ОТ 3 ДНЕЙ'],
  ],
  idIdea: 'Айдентика собирается из элементов чертежа: модульная сетка 16/80, размерные линии, выноски с номерами и штамп. Оранжевая точка — всегда одна на макет.',
  patternCss: grid, patternNote: 'Сетка кальки: крупный шаг 80 px, мелкий 16 px. На светлом фоне — тушь 8%.',
  elements: [
    [dim(260), 'Размерная линия — для сроков и цен: «от 3 дней»'],
    [`<svg viewBox="0 0 200 120"><circle cx="40" cy="60" r="16" style="fill:none;stroke:${LN};stroke-width:1.5"/><text x="40" y="65" text-anchor="middle" style="fill:${LN};font:700 14px 'JetBrains Mono'">01</text><path d="M56 60h60l20-30h50" style="fill:none;stroke:${LN};stroke-width:1"/><circle cx="186" cy="30" r="4" style="fill:${A}"/></svg>`, 'Выноска с номером — для шагов процесса'],
    [`<svg viewBox="0 0 220 110"><rect x="4" y="4" width="212" height="102" style="fill:none;stroke:${LN};stroke-width:1.2"/><path d="M4 40h212M110 40v66M4 74h106" style="stroke:${LN};stroke-width:.8"/><text x="14" y="28" style="fill:#fff;font:800 16px Onest">финес</text><text x="120" y="60" style="fill:${LN};font:400 9px 'JetBrains Mono'">ЛИСТ 1 / 1</text><text x="14" y="62" style="fill:${LN};font:400 9px 'JetBrains Mono'">TELEGRAM-БОТ</text><text x="14" y="94" style="fill:${LN};font:400 9px 'JetBrains Mono'">ОТ 15 000 ₽</text><circle cx="72" cy="24" r="3" style="fill:${A}"/></svg>`, 'Штамп — для обложек КП и счетов'],
  ],
  iconNote: 'линия 1.5, квадратные концы, оси построения, оранжевая точка-узел',
  iconStyle: { mode: 'blueprint', sw: 1.5, cap: 'square', join: 'miter', dr: 1.7 },
  id: {
    cardFront: `<div class="in" style="${grid};background-size:40px 40px,40px 40px,8px 8px,8px 8px;color:#fff"><span class="hl cx-dark"><svg class="mk" viewBox="0 0 64 64">${mark(sets.dark)}</svg>${wm()}</span><div class="meta" style="font-family:'JetBrains Mono'">TELEGRAM-БОТЫ · CRM · ВЕБ-СЕРВИСЫ</div></div>`,
    cardBack: `<div class="in" style="background:${PA};color:${INK}"><div class="nm">Разработчик<br>Финес Студио</div><div class="meta" style="font-family:'JetBrains Mono'">t.me/fines_studio<br>${H}<br><span style="color:${A}">●</span> ответ в течение рабочего дня</div></div>`,
    kp: `<div class="in" style="${grid};background-size:30px 30px,30px 30px,6px 6px,6px 6px;color:#fff"><span class="hl cx-dark"><svg class="mk" viewBox="0 0 64 64">${mark(sets.dark)}</svg>${wm()}</span><div style="margin-top:auto" class="k">Коммерческое предложение · лист 01</div><h4>Telegram-бот для записи клиентов</h4><p>для компании «Название клиента»</p><div class="ln"></div><div class="ft" style="font-family:'JetBrains Mono'"><span>от 15 000 ₽ · от 3 дней</span><span>${H}</span></div></div>`,
    blank: `<div class="in" style="background:#fff;color:${INK}"><div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid ${LN};padding-bottom:3cqw"><span class="hl cx-light"><svg class="mk" viewBox="0 0 64 64">${mark(sets.light)}</svg>${wm()}</span><span class="k" style="font-family:'JetBrains Mono'">№ ___ от __.__.2026</span></div><p style="margin-top:6cqw">Над вашим проектом работают два разработчика. Менеджеров между нами нет: вы обсуждаете задачу с теми, кто её реализует.</p><div class="ln"></div><p style="opacity:.25">— — — — — — — — — — — — — — — — —<br>— — — — — — — — — — — — — —<br>— — — — — — — — — — — — — — — — — —</p><div class="ft" style="font-family:'JetBrains Mono';border-top:1px solid ${LN};padding-top:2cqw"><span>Финес Студио</span><span>t.me/fines_studio</span></div></div>`,
  },
  merch: { tee: BP, teeS: '#06183a', mug: PA, txt: '#fff', mk: sets.dark, rot: -6 },
  bnIdea: 'Баннеры собраны на сетке кальки: заголовок, размерная линия с ценой и сроком, одна оранжевая кнопка. Все цифры — из текущих цен студии.',
  bnRules: 'Синька — фон любого формата. Цена всегда набрана моно-шрифтом рядом со сроком. На 728×90 сетку убираем — остаётся только линия.',
  bn: {
    stTitle: 'Сначала чертёж.<br>Потом код.', sqTitle: 'Бот, который принимает заявки за вас', wdTitle: 'CRM, начерченная под ваш процесс',
    deco: { st: '', sq: '', mr: '', wd: `<svg class="deco" viewBox="0 0 64 64" style="right:5%;top:50%;transform:translateY(-50%);width:28%;opacity:.95">${mark({ bg: 'transparent', m1: '#ffffff', m2: '#3d68ad', dot: A })}</svg>`, tg: '', lb: '' },
    promoDeco: () => '',
  },
  promo: [
    { name: 'Бесплатная оценка задачи', tag: 'АКЦИЯ 01 · ОЦЕНКА', head: 'Начертим задачу бесплатно', sub: 'Стоимость и срок — до старта, без ТЗ.', cta: 'Описать задачу', postHead: 'Чертёж задачи — бесплатно.' },
    { name: 'Цена по договору, оплата 50/50', tag: 'АКЦИЯ 02 · ДОГОВОР', head: 'Цена не двигается после подписи', sub: '50% перед стартом · 50% после приёмки.', cta: 'Обсудить', postHead: 'Смета, которая не растёт.' },
    { name: 'Месяц поддержки и ваш код', tag: 'АКЦИЯ 03 · ПРИЁМКА', head: 'Сдаём с чертежами и ключами', sub: 'Код и доступы — ваши. Месяц правок ошибок бесплатно.', cta: 'Написать', postHead: 'Приёмка без хвостов.' },
  ],
  hero: `<div class="ey">БРЕНДБУК · ВАРИАНТ 15 · ЛИСТ 01/08</div><h1 style="font-size:clamp(54px,9vw,132px);line-height:.95;font-weight:800;letter-spacing:-.045em">Чертёж</h1><p class="lead">Фирменный стиль «Финес Студио» как инженерный документ: синяя калька, размерные линии, одна оранжевая точка. Для студии, которая продаёт точность сроков и сметы.</p><div class="big"><span class="hl cx-dark" style="font-size:clamp(40px,7vw,96px)"><svg class="mk" viewBox="0 0 64 64">${mark(sets.dark)}</svg>${wm()}</span></div>`,
  css: `
body.v15{--bg:${BP};--fg:#fff;--fg2:#dbe7ff;--muted:#9fbbe8;--line:rgba(127,176,255,.32);--line2:rgba(127,176,255,.5);--card:rgba(10,30,70,.55);--card2:rgba(10,30,70,.75);--acc:${A};--acc-t:#ff8a5c;--on-acc:#fff;--light:${PA};--dark:${BP};--ink:${INK};--paper:#fff;--r:2px;--r2:2px;--bf:'Onest',sans-serif;--hf:'Onest',sans-serif;--cf:'JetBrains Mono',monospace;--wf:'Onest',sans-serif;--ww:800;--wls:-.06em;--sf:'JetBrains Mono',monospace;--stc:${A};--bar:rgba(11,42,91,.94);--bnbg:${BP};--bnfg:#fff;--btr:2px;--ic-guide:${LN};--ic-c:#fff;--chatbg:#0e3168;--hw:800;--shadow:0 14px 30px rgba(0,0,0,.35);${grid}}
.v15 .sh h2,.v15 .hero h1{font-weight:800;letter-spacing:-.04em}
.v15 .t-h1,.v15 .t-h2{font-weight:800;letter-spacing:-.04em}.v15 .t-h3{font-weight:600}
.v15 .st{font-weight:400;letter-spacing:.14em}
.v15 .wm .d{animation:glow 2s ease-in-out infinite}
.v15 .card,.v15 .sw,.v15 .icons figure,.v15 .els .e,.v15 .merch figure,.v15 .dont figure{backdrop-filter:none}
.v15 .sh .no::before{content:'ЛИСТ '}
.v15 .bn{${grid};background-size:6cqw 6cqw,6cqw 6cqw,1.2cqw 1.2cqw,1.2cqw 1.2cqw}
.v15 .bn-lb{background-image:none}
.v15 .bn .pr{font-family:'JetBrains Mono';font-weight:700;color:#fff}
.v15 .bn .ttl{letter-spacing:-.035em}
.v15 .bn-sq .row,.v15 .bn-wd .row{border-top:1px solid ${LN};padding-top:3cqw}
.v15 .bn .k{color:${LN}}
.v15 .bn-st li{border-bottom:1px dashed ${LN}}
.v15 .icons .ic{color:#fff}
.v15 .tile.D{${grid}}
.v15 .post{--post-bg:#fff}
.v15 .pager .all{border-radius:2px}
`,
});
console.log('v15 ok');
