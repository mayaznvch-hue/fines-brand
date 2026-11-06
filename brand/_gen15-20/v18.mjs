import { build, wm, H, SV } from './core.mjs';
const R = '#f0401e', R2 = '#c92f12', GR = '#14161c', BG = '#f3f4f6', W = '#ffffff', MU = '#6b7079', PEACH = '#ffe3d9';
// знак: красная плашка, геометрическая «ф» из двух полукругов и оси, точка — белая «кнопка»
const mark = c => `<rect width="64" height="64" rx="15" style="fill:${c.bg}"/>
<path d="M29 20a13 13 0 0 0 0 26z" style="fill:${c.m1}"/><path d="M35 20a13 13 0 0 1 0 26z" style="fill:${c.m1}"/>
<rect x="29" y="12" width="6" height="42" rx="1" style="fill:${c.m1}"/>
<circle cx="49" cy="15" r="4.2" style="fill:${c.dot}"/>`;
const sets = {
  light: { bg: R, m1: W, m2: W, dot: GR },
  dark: { bg: R, m1: W, m2: W, dot: GR },
  fav: { bg: R, m1: W, m2: W, dot: GR },
  avatar: { bg: R, m1: W, m2: W, dot: GR },
  monoB: { bg: '#000', m1: '#fff', m2: '#fff', dot: '#fff' },
  monoW: { bg: '#fff', m1: '#000', m2: '#000', dot: '#000' },
};
const pat = `background-color:${BG};background-image:radial-gradient(circle,rgba(240,64,30,.9) 0 3px,transparent 3.5px),linear-gradient(${W},${W});background-size:48px 48px,100% 100%;background-position:24px 24px,0 0`;
const bot = SV[0], crm = SV[1], web = SV[2], int = SV[3];
build({
  n: 18, title: 'Банк', mark, markSets: sets,
  idea: 'Студия, которой доверяют как надёжному банку: строгая сетка, бенто-карточки, крупные цифры условий и уверенный красно-оранжевый. Каждое обещание — договор, срок и цена — подаётся как банковский продукт с понятными условиями.',
  voice: 'Говорим как хороший банковский продукт: ясно, вежливо, с условиями крупным шрифтом, а не мелким. Сначала выгода для клиента, потом детали.',
  tone: ['надёжно', 'ясно', 'вежливо', 'по делу', 'условия — крупно'],
  phrases: [['Заголовок', 'Разработка с понятными условиями.'], ['Оффер', 'Оплата 50% до старта и 50% после приёмки.'], ['Ответ клиенту', 'Оценка бесплатная. Стоимость и срок — в договоре.'], ['Подпись поста', 'Первый результат — через 2–3 дня.']],
  nosay: ['Возможны дополнительные расходы*', 'Условия уточняйте у менеджера'],
  markIdea: 'Знак — красно-оранжевая плашка с белой геометрической «ф» из двух половин круга и оси. Графитовая точка — как кнопка в приложении. Узнаётся на иконке телефона так же уверенно, как значок банка, но рисунок свой.',
  logoIdea: 'Слово «финес» — Onest 800 в графите, как в логотипе №67, точка после «с» — красно-оранжевая. В горизонтальной версии знак-плашка стоит слева. Подпись «студио» — Golos Text 500.',
  colorIdea: 'Свой красно-оранжевый #F0401E (не банковский красный): уверенный, но теплее. Основа — белый и светло-серый, текст — графит. Красный занимает не больше 15% площади.',
  palette: [
    { n: 'Белый', hex: W, on: GR, p: 40, role: 'карточки' },
    { n: 'Туман', hex: BG, on: GR, p: 30, role: 'фон страницы' },
    { n: 'Графит', hex: GR, on: W, p: 12, role: 'текст, тёмные карточки' },
    { n: 'Финес-красный', hex: R, on: W, p: 13, role: 'знак, CTA, акценты' },
    { n: 'Персик', hex: PEACH, on: GR, p: 5, role: 'плашки условий' },
  ],
  colorNote: 'Белый текст на #F0401E — 3.6:1, только для крупного текста и кнопок от 16px полужирным; мелкий текст на красном не ставим.',
  typeIdea: 'Golos Text — нейтральный гротеск для интерфейса и цифр, Onest 800 — только для логотипа и крупных цифр условий. Таблично-ровные цифры и короткие строки.',
  fonts: [
    { fam: 'Golos Text', id: 'golos-text', w: [400, 500, 700], use: 'Заголовки, текст, интерфейс' },
    { fam: 'Onest', id: 'onest', w: [800], use: 'Логотип, крупные цифры условий' },
  ],
  type: [
    ['H1 · Golos Text 700', '64/1.05 · −0.03em', 't-h1', 'Разработка с понятными условиями'],
    ['H2 · Golos Text 700', '40/1.1', 't-h2', 'Агентство или Финес Студио'],
    ['H3 · Golos Text 700', '24/1.25', 't-h3', 'Оплата по этапам'],
    ['Lead · Golos Text 400', '20/1.5', 't-lead', 'Над вашим проектом работают два разработчика. Менеджеров между нами нет.'],
    ['Body · Golos Text 400', '16/1.6', 't-body', 'Срок сдачи фиксируем письменно. Промежуточные результаты показываем по ходу работы.'],
    ['Caption · Golos Text 500', '13/1.4', 't-cap', 'Информация носит справочный характер и не является публичной офертой'],
  ],
  idIdea: 'Айдентика как интерфейс надёжного приложения: бенто-сетка карточек с радиусом 24, крупные цифры условий, пиктограммы в красных кругах и точечный паттерн-«кнопки».',
  patternCss: pat, patternNote: 'Паттерн «кнопки»: красные точки 6 px с шагом 48 px. Только как фон крупных плашек, никогда под текстом.',
  elements: [
    [`<svg viewBox="0 0 240 130"><rect x="4" y="4" width="232" height="122" rx="20" style="fill:${W};stroke:#e3e5e9"/><text x="22" y="40" style="fill:${MU};font:500 13px 'Golos Text'">Оплата по этапам</text><text x="22" y="98" style="fill:${GR};font:800 52px Onest;letter-spacing:-2px">50/50</text><circle cx="208" cy="32" r="10" style="fill:${R}"/></svg>`, 'Карточка условия — цифра крупно, подпись мелко'],
    [`<svg viewBox="0 0 240 70"><rect x="4" y="10" width="232" height="50" rx="25" style="fill:${R}"/><text x="120" y="41" text-anchor="middle" style="fill:#fff;font:700 16px 'Golos Text'">Обсудить задачу</text></svg>`, 'Кнопка — радиус 25, Golos Text 700'],
    [`<svg viewBox="0 0 240 120"><rect x="4" y="4" width="110" height="112" rx="18" style="fill:${GR}"/><rect x="124" y="4" width="112" height="52" rx="18" style="fill:${PEACH}"/><rect x="124" y="64" width="112" height="52" rx="18" style="fill:${R}"/><circle cx="96" cy="22" r="6" style="fill:${R}"/></svg>`, 'Бенто-модуль — 1 большая + 2 малые карточки'],
  ],
  iconNote: 'линия 2, круглые концы, графит; точка — красная',
  iconStyle: { mode: 'plain', sw: 2, cap: 'round', join: 'round', dr: 2 },
  id: {
    cardFront: `<div class="in" style="background:${R};color:#fff"><svg viewBox="0 0 64 64" style="width:16cqw">${mark({ bg: W, m1: R, m2: R, dot: GR })}</svg><div><div class="nm" style="font-weight:700">Финес Студио</div><div class="meta">Разработка IT-решений для бизнеса</div></div></div>`,
    cardBack: `<div class="in" style="background:${W};color:${GR}"><span class="hl">${wm()}</span><div class="meta" style="display:grid;grid-template-columns:1fr 1fr;gap:2cqw"><span style="background:${BG};border-radius:3cqw;padding:2cqw 3cqw">Telegram<br><b>${H}</b></span><span style="background:${PEACH};border-radius:3cqw;padding:2cqw 3cqw">Ответ<br><b>в рабочий день</b></span></div></div>`,
    kp: `<div class="in" style="background:${BG};color:${GR};padding:7cqw"><span class="hl" style="margin-bottom:5cqw">${wm()}</span><div style="background:${R};color:#fff;border-radius:5cqw;padding:7cqw;"><div class="k">Коммерческое предложение</div><h4>Веб-сервис для онлайн-записи</h4><p>для компании «Название клиента»</p></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:3cqw;margin-top:3cqw"><div style="background:#fff;border-radius:5cqw;padding:5cqw"><div class="k">Стоимость</div><b style="font:800 7cqw Onest">${web.price}</b></div><div style="background:#fff;border-radius:5cqw;padding:5cqw"><div class="k">Срок</div><b style="font:800 7cqw Onest">${web.term}</b></div></div><div class="ft" style="margin-top:auto"><span>Не является публичной офертой</span><span>${H}</span></div></div>`,
    blank: `<div class="in" style="background:#fff;color:${GR}"><div style="display:flex;justify-content:space-between;align-items:center"><span class="hl">${wm()}</span><span style="background:${R};width:9cqw;height:1.6cqw;border-radius:1cqw"></span></div><div style="background:${BG};border-radius:3cqw;padding:3cqw 4cqw;margin-top:7cqw;font-size:2.6cqw">Исх. № ___ · от __.__.2026</div><p style="margin-top:5cqw">Над вашим проектом работают два разработчика. Стоимость согласуем до старта и закрепляем в договоре.</p><p style="opacity:.25;margin-top:3cqw">— — — — — — — — — — — — — — — — —<br>— — — — — — — — — — — — —</p><div class="ft"><span>Финес Студио</span><span>t.me/fines_studio</span></div></div>`,
  },
  merch: { tee: W, teeS: '#d9dbe0', mug: R, txt: GR, mk: sets.light, rot: -4 },
  bnIdea: 'Баннеры собраны как бенто: крупная карточка с выгодой, цифра условия, белая или красная плашка. Цена и срок — крупно и рядом, без звёздочек.',
  bnRules: 'Мелкий текст никогда не ставим на красный. На всех форматах есть цена «от» и подпись «не оферта» — если формат позволяет. Скругление плашек — 4% ширины.',
  bn: {
    stTitle: 'Разработка с понятными условиями', sqTitle: 'Telegram-бот для заявок и записи', wdTitle: 'CRM под вас. Цена — в договоре',
    deco: { st: '', sq: '', mr: '', wd: `<div class="deco bento"><div><small>Срок</small><b>${crm.term}</b></div><div class="r"><small>Оплата</small><b>50/50</b></div></div>`, tg: `<div class="deco bento tgb"><div><small>Боты</small><b>${bot.term}</b></div><div class="r"><small>Оценка</small><b>0 ₽</b></div><div><small>Оплата</small><b>50/50</b></div></div>`, lb: '' },
    promoDeco: () => '',
  },
  promo: [
    { name: 'Оценка за 0 ₽', tag: 'Бесплатная оценка', head: 'Оценка задачи — 0 ₽', sub: 'Стоимость и срок назовём до старта работ.', cta: 'Получить оценку', postHead: 'Оценка задачи — бесплатно.' },
    { name: 'Рассрочка 50/50', tag: 'Фиксированная цена', head: 'Платите 50/50', sub: '50% перед стартом · 50% после приёмки.', cta: 'Обсудить', postHead: 'Оплата по этапам: 50/50.' },
    { name: 'Месяц поддержки 0 ₽', tag: 'После запуска', head: '1 месяц поддержки — 0 ₽', sub: 'Исправляем ошибки бесплатно. Код и доступы — ваши.', cta: 'Написать', postHead: 'Первый месяц поддержки — бесплатно.' },
  ],
  hero: `<div class="b18"><div class="c1"><div class="ey">Брендбук · вариант 18</div><h1>Банк</h1><p class="lead">Строгий, надёжный стиль «Финес Студио»: бенто-карточки, крупные цифры условий и собственный красно-оранжевый.</p></div><div class="c2"><svg viewBox="0 0 64 64">${mark(sets.light)}</svg></div><div class="c3"><small>Оплата</small><b>50/50</b></div><div class="c4"><small>Первый результат</small><b>2–3 дня</b></div><div class="c5">${wm()}</div></div>`,
  css: `
body.v18{--bg:${BG};--fg:${GR};--fg2:#2c3038;--muted:${MU};--line:#e3e5e9;--line2:#d3d6dc;--card:${W};--card2:${W};--acc:${R};--acc-t:${R2};--on-acc:#fff;--light:${W};--dark:${GR};--ink:${GR};--paper:${W};--r:24px;--r2:18px;--bf:'Golos Text',sans-serif;--hf:'Golos Text',sans-serif;--cf:'Golos Text',sans-serif;--wf:'Onest',sans-serif;--ww:800;--wls:-.06em;--sf:'Golos Text',sans-serif;--stc:${R};--bar:rgba(255,255,255,.94);--bnbg:${W};--bnfg:${GR};--br:22px;--btr:99px;--ic-c:${GR};--chatbg:#e7e9ee;--hw:700;--shadow:0 10px 30px rgba(20,22,28,.08);--md:${R}}
.v18 .wm .w{color:${GR}}
.v18 .wm .d{background:${R}}
.v18 .st{font-weight:500;letter-spacing:.08em}
.v18 .D .wm .w,.v18 .bc .in[style*="${R}"] .wm .w{color:#fff}
.v18 .tile.D{background:${GR}}
.v18 .sh h2,.v18 .hero h1{font-weight:700;letter-spacing:-.03em}
.v18 .t-h1,.v18 .t-h2,.v18 .t-h3{font-weight:700;letter-spacing:-.02em}.v18 .t-h1{font-size:clamp(40px,5vw,64px)}.v18 .t-h2{font-size:40px}.v18 .t-h3{font-size:24px}
.v18 .sub{text-transform:none;letter-spacing:0;font-weight:700;font-size:15px;color:${GR}}
.v18 .sh .no{background:${R};color:#fff;border-radius:99px;width:44px;height:44px;display:grid;place-items:center;padding:0;font-weight:700;font-size:15px;letter-spacing:0}
.v18 .sh{grid-template-columns:70px minmax(0,1fr)}
.v18 .top nav a{font-weight:500}
.v18 .card,.v18 .sw,.v18 .icons figure,.v18 .els .e,.v18 .merch figure,.v18 .dont figure{border:0;box-shadow:0 1px 2px rgba(20,22,28,.05)}
.b18{display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:auto auto;gap:16px}
.b18>div{background:#fff;border-radius:28px;padding:32px;min-width:0}
.b18 .c1{grid-row:1/3;padding:48px}
.b18 h1{font-size:clamp(64px,10vw,150px);line-height:.95;font-weight:700;letter-spacing:-.05em;margin:16px 0 20px}
.b18 .c2{background:${R};display:grid;place-items:center}.b18 .c2 svg{width:70%;max-width:170px}
.b18 .c3{background:${GR};color:#fff}.b18 .c4{background:${PEACH}}
.b18 small{display:block;font-size:14px;opacity:.75}
.b18 b{font:800 clamp(36px,4vw,58px)/1 Onest,sans-serif;letter-spacing:-.04em;display:block;margin-top:24px}
.b18 .c5{grid-column:2/4;display:flex;align-items:center;justify-content:center}.b18 .c5 .logo{font-size:clamp(48px,6vw,84px)}
.v18 .icons .ic{width:58px;height:58px;background:${PEACH};border-radius:50%;padding:12px}
.v18 .bn .ttl{letter-spacing:-.03em}
.v18 .bn .wm .w{color:${GR}}
.v18 .bn .pr{font-family:Onest;font-weight:800;letter-spacing:-.04em}
.v18 .bn .cta{font-weight:700}
.v18 .bn-st{--bnbg:${R};--bnfg:#fff}.v18 .bn-st .wm .w{color:#fff}.v18 .bn-st .wm .d{background:${GR}}.v18 .bn-st .st{--stc:#fff}
.v18 .bn-st ul{background:#fff;color:${GR};border-radius:5cqw;padding:5cqw}.v18 .bn-st li{border-bottom:1px solid #eee}.v18 .bn-st li:last-child{border:0;padding-bottom:0}
.v18 .bn-st .cta{background:${GR}}
.v18 .bn-sq .row{background:${PEACH};border-radius:4cqw;padding:4cqw;margin-left:-1cqw;margin-right:-1cqw}
.v18 .bn-sq .k{color:${MU}}
.v18 .bn-mr{--bnbg:${GR};--bnfg:#fff}.v18 .bn-mr .wm .w{color:#fff}.v18 .bn-mr .pr{color:#fff}
.v18 .bn-wd .in{width:58%}
.v18 .deco.bento{right:4%;top:8%;bottom:8%;width:34%;display:grid;gap:2cqw}
.v18 .deco.bento>div{background:${BG};border-radius:3cqw;padding:2.4cqw 3cqw;display:flex;flex-direction:column;justify-content:space-between}
.v18 .deco.bento>div.r{background:${R};color:#fff}
.v18 .deco.bento small{font-size:1.6cqw;opacity:.8}.v18 .deco.bento b{font:800 4.4cqw/1 Onest;letter-spacing:-.04em}
.v18 .deco.tgb{top:auto;bottom:6cqw;right:6cqw;left:auto;width:auto;grid-template-columns:repeat(3,15cqw);height:12cqw}
.v18 .bn-tg{--bnbg:${BG}}.v18 .bn-tg .in{justify-content:flex-start}.v18 .bn-tg .hd{top:6cqw;bottom:auto}
.v18 .bn-lb{--bnbg:${R};--bnfg:#fff;--br:10px}.v18 .bn-lb .wm .w{color:#fff}.v18 .bn-lb .wm .d{background:${GR}}.v18 .bn-lb .st{--stc:#fff}.v18 .bn-lb .cta{background:#fff;color:${R}}
.v18 .pb1 .ttl,.v18 .pb2 .ttl,.v18 .pb3 .ttl{font-family:Onest;font-weight:800;font-size:12cqw;letter-spacing:-.05em}
.v18 .pb2{--bnbg:${R};--bnfg:#fff}.v18 .pb2 .wm .w{color:#fff}.v18 .pb2 .wm .d{background:${GR}}.v18 .pb2 .st{--stc:#fff}.v18 .pb2 .cta{background:${GR}}
.v18 .pb3{--bnbg:${GR};--bnfg:#fff}.v18 .pb3 .wm .w{color:#fff}
.v18 .bn .k{font-family:'Golos Text'}
.v18 .post{border-radius:18px}
.v18 .dont .pv .hl .wm .w{color:${GR}}
.v18 .mono-b .mk{filter:none}
@media (max-width:900px){.b18{grid-template-columns:1fr 1fr}.b18 .c1{grid-column:1/-1;grid-row:auto;padding:32px}.b18 .c5{grid-column:auto;padding:20px}.b18 .c5 .logo{font-size:30px}.v18 .sh{grid-template-columns:1fr}}
`,
});
console.log('v18 ok');
