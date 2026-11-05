// Общее ядро генератора макетов «Финес Студио»
export const TG = 'https://t.me/fines_studio';
export const TGH = '@fines_studio';

export const C = {
  slogan: 'Тонкая работа для вашего бизнеса.',
  lead: 'Делаем Telegram-ботов, CRM-системы и веб-сервисы для малого бизнеса. Убираем ручную рутину, чтобы заявки не терялись, а вы занимались делом.',
  services: [
    { k: 'bots', t: 'Telegram-боты', s: 'Запись, заявки, оплата и рассылки прямо в мессенджере. Бот работает ночью и в выходные и не забывает перезвонить.', p: 'от 40 000 ₽', d: '2–3 недели', tags: ['запись', 'оплата', 'Mini App', 'рассылки'] },
    { k: 'crm', t: 'CRM-системы', s: 'Своя CRM под ваш процесс, а не процесс под чужую CRM. Клиенты, сделки, склад, роли и отчёты в одном окне.', p: 'от 120 000 ₽', d: '4–8 недель', tags: ['сделки', 'роли', 'отчёты', 'склад'] },
    { k: 'web', t: 'Веб-сервисы', s: 'Личные кабинеты, бронирование, внутренние панели. Проектируем, пишем, запускаем и поддерживаем.', p: 'от 150 000 ₽', d: '6–10 недель', tags: ['кабинеты', 'бронирование', 'API'] },
    { k: 'int', t: 'Интеграции', s: 'Связываем 1С, amoCRM, Битрикс24, кассы, телефонию и Google Таблицы — данные больше не переносят руками.', p: 'от 25 000 ₽', d: '1–2 недели', tags: ['1С', 'amoCRM', 'Битрикс24', 'ЮKassa'] },
    { k: 'site', t: 'Сайты для бизнеса', s: 'Быстрые сайты, которые приводят заявки: лендинги, сайты услуг, каталоги. С аналитикой и ботом для заявок.', p: 'от 60 000 ₽', d: '2–4 недели', tags: ['лендинг', 'каталог', 'SEO-база'] },
  ],
  cases: [
    { c: 'Сеть кофеен «Зерно»', t: 'Бот предзаказа с оплатой', m: '31%', ml: 'заказов идёт через бота', r: 'Гости заказывают кофе по дороге и забирают без очереди. Бариста видят заказы на планшете.', tag: 'Telegram-бот' },
    { c: 'Студия маникюра «Лак»', t: 'Бот записи и напоминаний', m: '18 → 6%', ml: 'неявок после запуска', r: 'Клиентки записываются сами, бот напоминает за сутки и за два часа, мастера видят расписание.', tag: 'Telegram-бот' },
    { c: 'Поставщик «СтройДвор»', t: 'CRM для отдела продаж + 1С', m: '15 мин', ml: 'вместо 2 часов на заявку', r: 'Остатки и цены подтягиваются из 1С, менеджер собирает счёт в два клика.', tag: 'CRM' },
    { c: 'Автосервис «Гараж 24»', t: 'Кабинет клиента со статусом ремонта', m: '−70%', ml: 'звонков «ну что там?»', r: 'Клиент видит этапы, фото деталей и согласует допработы в кабинете.', tag: 'Веб-сервис' },
    { c: 'Школа «Speak Up»', t: 'Сайт, квиз и связка с amoCRM', m: '×2,4', ml: 'заявок за три месяца', r: 'Квиз подбирает курс, заявка сразу падает в воронку с тегами и источником.', tag: 'Сайт' },
    { c: 'Доставка «Грядка»', t: 'Mini App каталог и склад', m: '+22%', ml: 'к среднему чеку', r: 'Каталог в Telegram, корзина, оплата и списание остатков без таблиц.', tag: 'Mini App' },
  ],
  steps: [
    { t: 'Разбор задачи', s: 'Созвон на 30 минут, бесплатно. Разбираемся, где теряются деньги и время.', d: '1 день' },
    { t: 'Смета и ТЗ', s: 'Фиксируем объём, цену и сроки в договоре. Без «а это уже доплата».', d: '1–3 дня' },
    { t: 'Прототип', s: 'Показываем кликабельный макет. Правим до того, как написана первая строка кода.', d: '3–5 дней' },
    { t: 'Разработка', s: 'Демо каждую неделю и доступ к тестовой версии. Вы видите прогресс, а не тишину.', d: '1–8 недель' },
    { t: 'Запуск и поддержка', s: 'Запускаем, обучаем команду, 30 дней гарантии. Дальше — поддержка по желанию.', d: 'всегда рядом' },
  ],
  plans: [
    { t: 'Старт', p: 'от 40 000 ₽', for: 'Бот или лендинг', f: ['до 10 сценариев или экранов', 'админ-панель', 'приём оплаты', '30 дней поддержки'] },
    { t: 'Бизнес', p: 'от 120 000 ₽', for: 'CRM или веб-сервис', f: ['роли и права доступа', 'интеграции с 1С, amoCRM', 'отчёты и выгрузки', '60 дней поддержки'], hot: true },
    { t: 'Система', p: 'от 300 000 ₽', for: 'Бот + CRM + сайт', f: ['связка всех каналов', 'выделенная команда', 'SLA и мониторинг', 'развитие по спринтам'] },
  ],
  reviews: [
    { n: 'Ирина Белова', r: 'владелица студии «Лак»', q: 'Раньше администратор полдня отвечала в директ. Теперь бот записывает сам, а неявок стало втрое меньше.' },
    { n: 'Дмитрий Орлов', r: 'коммерческий директор «СтройДвор»', q: 'Сделали CRM ровно под наш процесс. Менеджеры перестали жить в Excel, а я вижу воронку в реальном времени.' },
    { n: 'Алексей Ким', r: 'основатель кофеен «Зерно»', q: 'Запустили бот за три недели. Каждую неделю показывали, что готово, — ни одного сорванного срока.' },
  ],
  faq: [
    { q: 'Сколько стоит бот?', a: 'Простой бот записи или заявок — от 40 000 ₽. Точную цену называем после бесплатного разбора и фиксируем в договоре.' },
    { q: 'Сколько времени займёт разработка?', a: 'Бот — 2–3 недели, сайт — 2–4, CRM — 4–8. Срок прописываем в договоре вместе с этапами.' },
    { q: 'Код и доступы будут нашими?', a: 'Да. Передаём исходники, доступы к серверу и админкам. Права на результат — ваши по договору.' },
    { q: 'Как проходит оплата?', a: 'Работаем по договору, безнал для ИП и ООО. Обычно 50% на старте и 50% после приёмки.' },
    { q: 'Что если после запуска что-то сломается?', a: '30 дней гарантии бесплатно. Дальше — поддержка от 5 000 ₽ в месяц или разовые доработки.' },
    { q: 'Можно доработать то, что уже есть?', a: 'Да. Берём на поддержку существующие боты, сайты и CRM — сначала делаем аудит кода.' },
  ],
  stats: [
    { v: '60+', l: 'запущенных проектов' },
    { v: '2 нед', l: 'средний запуск бота' },
    { v: '15 мин', l: 'отвечаем в Telegram' },
    { v: '30 дней', l: 'гарантии после запуска' },
  ],
  stack: ['Python', 'aiogram', 'Node.js', 'TypeScript', 'React', 'Vue', 'PostgreSQL', 'Redis', 'Docker', '1С', 'amoCRM', 'Битрикс24', 'ЮKassa', 'Telegram Mini Apps'],
  team: [
    { n: 'Максим', r: 'бэкенд и архитектура', s: 'Проектирует системы, которые не падают в пятницу вечером.' },
    { n: 'Алина', r: 'дизайн интерфейсов', s: 'Делает так, чтобы менеджеру не нужна была инструкция.' },
    { n: 'Егор', r: 'боты и интеграции', s: 'Подружит ваш бот с 1С, кассой и чем угодно с API.' },
    { n: 'Софья', r: 'менеджер проектов', s: 'Держит сроки и пишет отчёт каждую пятницу.' },
  ],
  why: [
    { t: 'Фиксированная цена', s: 'Смета в договоре до старта. Никаких сюрпризов в конце.' },
    { t: 'Демо каждую неделю', s: 'Видите работу по ходу, а не через два месяца.' },
    { t: 'Код ваш', s: 'Исходники, доступы и документация — у вас.' },
    { t: 'Говорим по-человечески', s: 'Без «спринтов эпиков». Объясняем на языке бизнеса.' },
  ],
};

export const FONT_URLS = {
  'Onest': 'Onest:wght@300;400;500;600;700;800;900',
  'Unbounded': 'Unbounded:wght@300;400;500;600;700;800;900',
  'Manrope': 'Manrope:wght@300;400;500;600;700;800',
  'Jost': 'Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400',
  'Geologica': 'Geologica:wght@300;400;500;600;700;800',
  'JetBrains Mono': 'JetBrains+Mono:wght@400;500;700;800',
  'Inter Tight': 'Inter+Tight:wght@300;400;500;600;700;800;900',
  'Playfair Display': 'Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700',
  'PT Serif': 'PT+Serif:ital,wght@0,400;0,700;1,400',
  'PT Mono': 'PT+Mono',
  'IBM Plex Mono': 'IBM+Plex+Mono:wght@400;500;700',
  'IBM Plex Sans': 'IBM+Plex+Sans:wght@300;400;500;600;700',
  'Pixelify Sans': 'Pixelify+Sans:wght@400;500;700',
  'Press Start 2P': 'Press+Start+2P',
  'Caveat': 'Caveat:wght@400;600;700',
  'Lora': 'Lora:ital,wght@0,400;0,600;0,700;1,400',
  'Cormorant Garamond': 'Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400',
  'Rubik Mono One': 'Rubik+Mono+One',
  'Rubik': 'Rubik:wght@400;500;700;900',
  'Montserrat': 'Montserrat:wght@300;400;600;800;900',
  'Russo One': 'Russo+One',
  'Oswald': 'Oswald:wght@300;400;500;600;700',
  'Roboto Slab': 'Roboto+Slab:wght@300;400;700;900',
  'Golos Text': 'Golos+Text:wght@400;500;600;700;800',
  'Raleway': 'Raleway:ital,wght@0,300;0,400;0,600;0,800;1,300',
  'Exo 2': 'Exo+2:wght@300;400;600;800',
  'Comfortaa': 'Comfortaa:wght@400;600;700',
  'Literata': 'Literata:ital,wght@0,400;0,600;0,800;1,400',
  'PT Sans Narrow': 'PT+Sans+Narrow:wght@400;700',
  'Tenor Sans': 'Tenor+Sans',
  'Nunito': 'Nunito:wght@400;600;800;900',
  'Fira Code': 'Fira+Code:wght@400;500;700',
  'Spectral': 'Spectral:ital,wght@0,400;0,600;0,800;1,400',
  'Tektur': 'Tektur:wght@400;600;800',
};

export function dot(dark = false) {
  const b = dark ? 'screen' : 'multiply';
  return `<svg class="fdot" viewBox="0 0 20 20" aria-hidden="true"><g style="transform-origin:10px 10px;animation:fspin 3s linear infinite"><circle cx="7" cy="10" r="6" fill="#f2501c" style="mix-blend-mode:${b}"/><circle cx="13" cy="10" r="6" fill="#ffc21a" style="mix-blend-mode:${b}"/></g></svg>`;
}
export function logo(dark = false, extra = '') {
  return `<a class="flogo${extra ? ' ' + extra : ''}" href="#top" aria-label="Финес Студио"><span class="fw">финес${dot(dark)}</span><span class="fs">студио</span></a>`;
}

const BASE = `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{min-height:100vh;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased}
img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
button,input,select,textarea{font:inherit;color:inherit}
button{cursor:pointer;background:none;border:0}
h1,h2,h3,h4{text-wrap:balance}
p{text-wrap:pretty}
@keyframes fspin{to{transform:rotate(360deg)}}
.flogo{display:inline-flex;flex-direction:column;align-items:flex-start;font-family:'Onest',sans-serif;line-height:.82;--lg:30px;flex:none}
.flogo .fw{font-weight:800;letter-spacing:-.05em;font-size:var(--lg);display:inline-flex;align-items:baseline}
.flogo .fdot{width:.32em;height:.32em;margin-left:.03em;display:inline-block}
.flogo .fs{font-size:max(11px,calc(var(--lg)*.4));font-weight:600;letter-spacing:.24em;opacity:.8;margin-top:.32em;padding-left:.05em}
.mkbadge{position:fixed;bottom:10px;left:10px;z-index:9999;font:500 10.5px/1 'Onest',sans-serif;letter-spacing:.02em;padding:5px 10px;border-radius:99px;background:rgba(20,20,20,.78);color:#fff;pointer-events:none;white-space:nowrap;backdrop-filter:blur(6px);box-shadow:0 2px 10px rgba(0,0,0,.15)}
.rv{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}
.rv.in{opacity:1;transform:none}
.rv.d1{transition-delay:.08s}.rv.d2{transition-delay:.16s}.rv.d3{transition-delay:.24s}.rv.d4{transition-delay:.32s}.rv.d5{transition-delay:.4s}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.rv{opacity:1;transform:none}}
@media (max-width:640px){.mkbadge{font-size:10px;bottom:6px;left:6px}}`;

const REVEAL = `(function(){var els=document.querySelectorAll('.rv');if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -5% 0px'});els.forEach(function(e){io.observe(e)})})();`;

export function page({ n, title, fonts = [], css = '', body = '', js = '', lang = 'ru', bodyClass = '' }) {
  const fam = [...new Set(['Onest', ...fonts])].map(f => 'family=' + FONT_URLS[f]).join('&');
  const nn = String(n).padStart(2, '0');
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Финес Студио — ${title} · макет ${nn}</title>
<meta name="description" content="Финес Студио: Telegram-боты, CRM-системы, веб-сервисы и интеграции для малого бизнеса. ${C.slogan}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${fam}&display=swap" rel="stylesheet">
<style>
${BASE}
${css}
</style>
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''} id="top">
<div class="mkbadge">Макет ${nn} · ${title}</div>
${body}
<script>${REVEAL}
${js}</script>
</body>
</html>
`;
}

export const nn = n => String(n).padStart(2, '0');
export const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
