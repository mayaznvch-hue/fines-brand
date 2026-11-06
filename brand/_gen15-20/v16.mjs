import { build, wm, H } from './core.mjs';
const A = '#e8602c', MOSS = '#2f5b45', SAGE = '#a9c5a0', CREAM = '#f4efe3', SAND = '#e6dcc6', INK = '#1f2a22', FOG = '#dfe8d8';
// знак: мягкий лист-камешек, внутри прожилка-«ф», точка как семечко/солнце
const mark = c => `<rect width="64" height="64" rx="18" style="fill:${c.bg}"/>
<path d="M32 9c12 7 19 16 19 26a19 19 0 0 1-38 0c0-10 7-19 19-26z" style="fill:${c.m2}"/>
<path d="M32 22v34" style="fill:none;stroke:${c.m1};stroke-width:4;stroke-linecap:round"/>
<path d="M32 30c-5 0-9 3-9 7s4 7 9 7 9-3 9-7-4-7-9-7z" style="fill:none;stroke:${c.m1};stroke-width:4"/>
<circle cx="44" cy="17" r="5" style="fill:${c.dot}"/>`;
const sets = {
  light: { bg: CREAM, m1: MOSS, m2: SAGE, dot: A },
  dark: { bg: MOSS, m1: CREAM, m2: '#3f7258', dot: A },
  fav: { bg: MOSS, m1: CREAM, m2: '#4a7f63', dot: A },
  avatar: { bg: SAGE, m1: MOSS, m2: CREAM, dot: A },
  monoB: { bg: '#ffffff', m1: '#000', m2: '#d6d6d6', dot: '#000' },
  monoW: { bg: '#000', m1: '#fff', m2: '#333', dot: '#fff' },
};
const blob = (fill, o = 1) => `<path d="M41 5c15 3 27 15 26 31s-14 28-31 27S3 52 4 35 26 2 41 5z" style="fill:${fill};opacity:${o}"/>`;
const pattern = `background-color:${FOG};background-image:radial-gradient(circle at 20px 20px,${SAGE} 0 9px,transparent 10px),radial-gradient(circle at 60px 60px,rgba(47,91,69,.18) 0 18px,transparent 19px),radial-gradient(circle at 62px 18px,${A} 0 3px,transparent 4px);background-size:80px 80px`;
build({
  n: 16, title: 'Органика', mark, markSets: sets,
  idea: 'Автоматизация без стресса: бизнес растёт спокойно, как сад, за которым ухаживают. Мягкие формы-камешки, мох и шалфей, тёплая точка-семечко — то, из чего вырастает решение. Стиль снимает тревогу у владельца, который боится «IT-сложности».',
  voice: 'Говорим тепло и спокойно, как хороший врач: объясняем простыми словами, не торопим и не пугаем. Обещаем только то, что записано в договоре.',
  tone: ['спокойно', 'тепло', 'просто', 'бережно', 'честно'],
  phrases: [['Заголовок', 'Пусть рутина делает себя сама.'], ['Оффер', 'Бот для записи клиентов — от 15 000 ₽, от 3 дней.'], ['Ответ клиенту', 'Расскажите своими словами, как сейчас всё устроено. Дальше мы.'], ['Подпись поста', 'Первый месяц после запуска бесплатно исправляем ошибки.']],
  nosay: ['Срочно! Только сегодня! Успей!', 'Мы внедрим digital-трансформацию вашего бизнеса'],
  markIdea: 'Знак — лист-камешек шалфейного цвета. Прожилка внутри складывается в строчную «ф», а тёплая точка-семечко рядом — тот самый огонёк «финес». Скругление плашки — 18/64, как у гальки.',
  logoIdea: 'Слово набрано Manrope 800 — округлый гротеск мягче Onest, но с тем же плотным ритмом. Точка после «с» сохраняется и плавно дышит. Подпись «студио» — Manrope 500 цвета мха.',
  colorIdea: 'Природная палитра без кислотных цветов: мох для текста и плашек, шалфей и туман для фона, кремовый для документов. Терракотовая точка — единственный тёплый акцент.',
  palette: [
    { n: 'Туман', hex: FOG, on: INK, p: 34, role: 'основной фон' },
    { n: 'Крем', hex: CREAM, on: INK, p: 22, role: 'карточки, документы' },
    { n: 'Шалфей', hex: SAGE, on: INK, p: 14, role: 'формы, иллюстрации' },
    { n: 'Мох', hex: MOSS, on: '#fff', p: 24, role: 'текст, плашки, баннеры' },
    { n: 'Семечко', hex: A, on: '#fff', p: 6, role: 'точка, CTA' },
  ],
  colorNote: 'Мох на тумане — контраст 6.9:1; белый на мху — 7.7:1.',
  typeIdea: 'Одно семейство Manrope на всё: 800 для слова и заголовков, 500 для лида, 400 для текста. Межстрочный интервал щедрый — текст «дышит».',
  fonts: [
    { fam: 'Manrope', id: 'manrope', w: [400, 500, 700, 800], use: 'Логотип, заголовки, текст, подписи' },
  ],
  type: [
    ['H1 · Manrope 800', '72/1.05 · −0.03em', 't-h1', 'Пусть рутина делает себя сама'],
    ['H2 · Manrope 700', '46/1.1', 't-h2', 'Четыре этапа от заявки до запуска'],
    ['H3 · Manrope 700', '26/1.25', 't-h3', 'Поддержка после запуска'],
    ['Lead · Manrope 500', '20/1.55', 't-lead', 'Связываем сайт, CRM, таблицы, 1С и мессенджеры, чтобы данные переносились сами.'],
    ['Body · Manrope 400', '16/1.7', 't-body', 'Показываем вашей команде, как пользоваться системой, и оставляем короткую инструкцию.'],
    ['Caption · Manrope 500', '12/1.4 · +0.04em', 't-cap', 'Оценка бесплатная · ответ в течение рабочего дня'],
  ],
  idIdea: 'Айдентика из «гальки»: мягкие пятна разных размеров, тонкие стебли-линии и точки-семена. Ни одного острого угла, тени не используются.',
  patternCss: pattern, patternNote: 'Паттерн «семена»: шаг 80 px, шалфейные круги, полупрозрачный мох и редкая терракотовая точка.',
  elements: [
    [`<svg viewBox="0 0 70 70">${blob(SAGE)}<circle cx="52" cy="16" r="5" style="fill:${A}"/></svg>`, 'Галька — подложка для иконок и фото'],
    [`<svg viewBox="0 0 240 120"><path d="M10 100C60 100 70 30 120 30s70 60 110 60" style="fill:none;stroke:${MOSS};stroke-width:3;stroke-linecap:round"/><circle cx="120" cy="30" r="7" style="fill:${A}"/><circle cx="10" cy="100" r="5" style="fill:${MOSS}"/><circle cx="230" cy="90" r="5" style="fill:${MOSS}"/></svg>`, 'Стебель — линия процесса от заявки до запуска'],
    [`<svg viewBox="0 0 200 120"><rect x="10" y="30" width="180" height="60" rx="30" style="fill:${MOSS}"/><text x="100" y="67" text-anchor="middle" style="fill:${CREAM};font:700 17px Manrope">от 3 дней</text><circle cx="40" cy="60" r="6" style="fill:${A}"/></svg>`, 'Капсула — для сроков и цен'],
  ],
  iconNote: 'линия 1.8, круглые концы, мягкая галька под пиктограммой',
  iconStyle: { mode: 'blob', sw: 1.8, cap: 'round', join: 'round', dr: 1.8 },
  id: {
    cardFront: `<div class="in" style="background:${MOSS};color:${CREAM}"><svg class="deco" viewBox="0 0 70 70" style="position:absolute;right:-10cqw;bottom:-14cqw;width:58cqw;opacity:.35">${blob('#5d8b6f')}</svg><span class="hl cx-dark" style="position:relative">${wm()}</span><div class="meta" style="position:relative">Telegram-боты · CRM · веб-сервисы<br>автоматизация без лишней суеты</div></div>`,
    cardBack: `<div class="in" style="background:${CREAM};color:${INK}"><svg viewBox="0 0 64 64" style="width:16cqw;height:16cqw">${mark(sets.light)}</svg><div><div class="nm">Финес Студио</div><div class="meta" style="margin-top:2cqw">t.me/fines_studio · ${H}<br>ответ в течение рабочего дня</div></div></div>`,
    kp: `<div class="in" style="background:${FOG};color:${INK}"><svg viewBox="0 0 70 70" style="position:absolute;right:-20cqw;top:18cqw;width:90cqw">${blob(SAGE)}</svg><svg viewBox="0 0 70 70" style="position:absolute;left:-14cqw;bottom:-16cqw;width:60cqw">${blob(MOSS, .9)}</svg><span class="hl cx-light" style="position:relative">${wm()}</span><div style="margin-top:auto;position:relative;margin-bottom:28cqw"><div class="k">Коммерческое предложение</div><h4>CRM, в которой спокойно работать</h4><p>для компании «Название клиента»</p></div></div>`,
    blank: `<div class="in" style="background:#fbf9f3;color:${INK}"><div style="display:flex;justify-content:space-between;align-items:center"><span class="hl cx-light">${wm()}</span><svg viewBox="0 0 70 70" style="width:10cqw">${blob(SAGE)}<circle cx="52" cy="16" r="6" style="fill:${A}"/></svg></div><p style="margin-top:9cqw">Здравствуйте!</p><p style="margin-top:2cqw">Над вашим проектом работают два разработчика. Вы обсуждаете задачу с теми, кто её реализует.</p><p style="opacity:.25;margin-top:3cqw">— — — — — — — — — — — — — — — — —<br>— — — — — — — — — — — — — —</p><div class="ft" style="background:${FOG};margin:0 -9cqw -7cqw;padding:4cqw 9cqw"><span>Финес Студио</span><span>t.me/fines_studio</span></div></div>`,
  },
  merch: { tee: SAGE, teeS: '#7d9c74', mug: MOSS, txt: MOSS, mk: sets.dark, rot: 6 },
  bnIdea: 'Баннеры собраны из мягких пятен и большого спокойного заголовка. Цена в капсуле, кнопка — округлая терракотовая. Никаких восклицательных знаков.',
  bnRules: 'Фон — мох или туман, одна большая галька за текстом. Пятна могут уходить за край, текст — никогда. Радиус кнопки — полный.',
  bn: {
    stTitle: 'Пусть рутина делает себя сама', sqTitle: 'Бот запишет клиента, пока вы заняты делом', wdTitle: 'CRM, в которой спокойно работать', tgTitle: 'Боты, CRM и веб-сервисы, которые снимают с бизнеса ручную рутину',
    deco: {
      st: `<svg class="deco" viewBox="0 0 70 70" style="right:-30%;top:22%;width:110%;opacity:.45">${blob('#4c7d61')}</svg>`,
      sq: `<svg class="deco" viewBox="0 0 70 70" style="right:-22%;top:-20%;width:78%;opacity:.5">${blob('#4c7d61')}</svg><svg class="deco" viewBox="0 0 10 10" style="right:14%;top:14%;width:7%">${'<circle cx="5" cy="5" r="5" style="fill:' + A + '"/>'}</svg>`,
      mr: `<svg class="deco" viewBox="0 0 70 70" style="right:-28%;top:-36%;width:90%;opacity:.45">${blob('#4c7d61')}</svg>`,
      wd: `<svg class="deco" viewBox="0 0 70 70" style="right:-6%;top:-14%;width:46%">${blob(SAGE)}</svg><svg class="deco" viewBox="0 0 64 64" style="right:12%;top:22%;width:20%">${mark({ bg: 'transparent', m1: MOSS, m2: 'transparent', dot: A })}</svg>`,
      tg: `<svg class="deco" viewBox="0 0 70 70" style="right:-8%;top:-24%;width:54%;opacity:.5">${blob('#4c7d61')}</svg><svg class="deco" viewBox="0 0 70 70" style="right:24%;bottom:-30%;width:26%">${blob(SAGE)}</svg>`,
      lb: '',
    },
    promoDeco: i => `<svg class="deco" viewBox="0 0 70 70" style="right:-24%;top:-22%;width:80%;opacity:.5">${blob(i === 1 ? SAGE : '#4c7d61')}</svg>`,
  },
  promo: [
    { name: 'Спокойная оценка', tag: 'Без ТЗ и без обязательств', head: 'Расскажите, как сейчас. Оценим бесплатно', sub: 'Назовём стоимость и срок до старта.', cta: 'Рассказать', postHead: 'Можно без ТЗ и без спешки.' },
    { name: 'Цена, которая не растёт', tag: 'Фиксированная цена', head: 'Сумма из договора — финальная', sub: 'Оплата 50% до старта и 50% после приёмки.', cta: 'Обсудить', postHead: 'Без сюрпризов в смете.' },
    { name: 'Месяц заботы после запуска', tag: 'Поддержка и ваш код', head: 'Месяц исправлений — бесплатно', sub: 'Код, доступы и инструкция остаются у вас.', cta: 'Написать', postHead: 'Запуск — это не конец.' },
  ],
  hero: `<div class="h16"><div><div class="ey">Брендбук · вариант 16</div><h1>Органика</h1><p class="lead">Мягкий, тёплый и спокойный стиль «Финес Студио»: для владельцев, которым нужна автоматизация без суеты и непонятных слов.</p></div><div class="h16art"><svg viewBox="0 0 70 70" class="b1">${blob(SAGE)}</svg><svg viewBox="0 0 70 70" class="b2">${blob(MOSS)}</svg><span class="hl cx-light">${wm()}</span></div></div>`,
  css: `
body.v16{--bg:${FOG};--fg:${INK};--fg2:#34443a;--muted:#55665a;--line:rgba(47,91,69,.16);--line2:rgba(47,91,69,.3);--card:${CREAM};--card2:#fbf8f0;--acc:${A};--acc-t:#b8441a;--on-acc:#fff;--light:${CREAM};--dark:${MOSS};--ink:${INK};--paper:${CREAM};--r:28px;--r2:20px;--bf:'Manrope',sans-serif;--hf:'Manrope',sans-serif;--cf:'Manrope',sans-serif;--wf:'Manrope',sans-serif;--ww:800;--wls:-.055em;--sf:'Manrope',sans-serif;--stc:${MOSS};--bar:rgba(223,232,216,.92);--bnbg:${MOSS};--bnfg:${CREAM};--br:28px;--btr:99px;--ic-blob:${SAGE};--ic-c:${MOSS};--chatbg:#c9d8c4;--hw:800;--shadow:0 18px 40px rgba(47,91,69,.16)}
.v16 .D .st,.v16 .bn .st,.v16 .bc .st{--stc:${SAGE}}
.v16 .st{font-weight:500;letter-spacing:.08em}
.v16 .bn.th,.v16 .bn.reel{--tnum:${SAGE}}
.v16 .wm .d{animation:breathe 3.2s ease-in-out infinite}
@keyframes breathe{0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(232,96,44,0)}50%{transform:scale(1.18);box-shadow:0 0 12px 3px rgba(232,96,44,.45)}}
.v16 .sh h2,.v16 .hero h1{font-weight:800;letter-spacing:-.035em}
.v16 .t-h1{font-weight:800;letter-spacing:-.03em}.v16 .t-h2,.v16 .t-h3{font-weight:700}.v16 .t-lead{font-weight:500}
.v16 .sub{text-transform:none;letter-spacing:.02em;font-weight:700;font-size:14px;color:${MOSS}}
.v16 .sh .no{font-weight:700;font-size:15px}
.v16 .sh .no::before{content:'· '}
.v16 .top nav a{font-weight:500}
.h16{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:40px;align-items:center}
.h16 h1{font-size:clamp(60px,10vw,150px);line-height:.95;font-weight:800;letter-spacing:-.05em;color:${MOSS}}
.h16art{position:relative;aspect-ratio:1/1;max-width:520px;width:100%;justify-self:end}
.h16art .b1{position:absolute;inset:0;width:100%;height:100%}
.h16art .b2{position:absolute;width:38%;right:-2%;bottom:2%}
.h16art .hl{position:absolute;left:14%;top:38%;font-size:clamp(44px,6vw,88px)}
.v16 .dont figure,.v16 .sw,.v16 .icons figure,.v16 .els .e,.v16 .merch figure{border:0}
.v16 .icons .ic{width:58px;height:58px}
.v16 .bn .cta{font-weight:700}
.v16 .bn .ttl{letter-spacing:-.03em}
.v16 .bn .pr{display:inline-block;align-self:flex-start;background:${CREAM};color:${MOSS};border-radius:99px;padding:.15em .55em}
.v16 .bn-lb{--br:14px}.v16 .bn-lb .pr{padding:.1em .5em}
.v16 .bn-st li{border-bottom-color:rgba(169,197,160,.35)}
.v16 .pb2{--bnbg:${CREAM};--bnfg:${MOSS}}.v16 .pb2 .wm .w{color:${MOSS}}.v16 .pb2 .st{--stc:${MOSS}}
.v16 .bn .wm .w,.v16 .D .wm .w{color:${CREAM}}
.v16 .pb2 .wm .w{color:${MOSS}}
.v16 .tile.D{background:${MOSS}}
.v16 .clear{border-radius:8px}
@media (max-width:700px){.h16{grid-template-columns:minmax(0,1fr)}.h16art{max-width:320px;justify-self:center}}
`,
});
console.log('v16 ok');
