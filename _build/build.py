# -*- coding: utf-8 -*-
"""Сборка минималистичных версий alfa и rocket.
Запуск из корня репозитория:  python _build/build.py
Тексты берутся из _brief/content.json, вёрстка и стили из _build/.
"""
import json, re, html, pathlib, shutil

ROOT = pathlib.Path(__file__).resolve().parent.parent
B = ROOT / '_build'
C = json.loads((ROOT / '_brief' / 'content.json').read_text(encoding='utf-8'))
TG = C['brand']['telegram']
BASE = 'https://egm-demo.github.io/fines-brand/sites/'

SHORT = r'(?<![\w-])(в|и|с|к|у|о|а|на|по|за|от|до|из|не|но|под|без|для|или|что|как|50%) '


def t(s):
    """Экранирование + неразрывные пробелы после коротких слов."""
    s = html.escape(s, quote=False)
    s = re.sub(SHORT, lambda m: m.group(1) + '\u00a0', s, flags=re.I)
    s = re.sub(r'(\d) (₽|дн|шаг)', '\\1\u00a0\\2', s)
    s = re.sub(r'\b(веб-сервис\w*|Telegram-бот\w*|онлайн-\w+|IT-\w+|CRM-систем\w*)', r'<span class="nw">\1</span>', s)
    return s.replace(' —', '\u00a0—')


def a(s):
    return html.escape(s, quote=True)


FEARS = [
    ('«Сделают и пропадут»', 'Первый месяц после запуска бесплатно исправляем ошибки. Исходный код, доступы и инструкция остаются у вас.'),
    ('«Цена вырастет в процессе»', 'Стоимость фиксируем в договоре до старта. Новые функции оцениваем отдельно и только с вашего согласия.'),
    ('«У меня нет ТЗ»', 'Оно не нужно. Опишите задачу своими словами, уточняющие вопросы и ТЗ подготовим сами.'),
    ('«Страшно платить вперёд»', '50% перед стартом, 50% после приёмки. Промежуточные результаты показываем по ходу работы.'),
    ('«Привяжут к себе»', 'Бот, CRM или сервис регистрируются на ваш аккаунт. Решение принадлежит вам, а не студии.'),
    ('«Вас двое — это мало?»', 'Зато вы говорите напрямую с тем, кто пишет код: без менеджеров и испорченного телефона.'),
]

QUIZ = [
    ('need', 'Что нужно', 'Что нужно?', [
        ('bot', 'Telegram-бот', 'заявки, запись, оплата'),
        ('crm', 'CRM', 'клиенты, сделки, задачи'),
        ('web', 'Веб-сервис или сайт', 'кабинет, запись, оплата'),
        ('ai', 'Интеграция или автоматизация', 'связать сервисы, отчёты'),
        ('unknown', 'Пока не знаю', 'поможем разобраться'),
    ]),
    ('sphere', 'Сфера', 'Сфера бизнеса', [
        ('s1', 'Услуги с записью', 'салоны, клиники, мастера'),
        ('s2', 'Торговля', 'магазины, доставка'),
        ('s3', 'Обучение', 'курсы, школы'),
        ('s4', 'B2B и производство', 'заявки, склад, отделы'),
        ('s5', 'Другое', 'расскажу в сообщении'),
    ]),
    ('when', 'Срок', 'Когда нужно запустить?', [
        ('w1', 'Как можно скорее', ''),
        ('w2', 'В течение месяца', ''),
        ('w3', 'В течение 2–3 месяцев', ''),
        ('w4', 'Пока присматриваюсь', ''),
    ]),
    ('budget', 'Бюджет', 'Ориентир бюджета', [
        ('b1', '15 000 – 30 000 ₽', 'бот или интеграция'),
        ('b2', '30 000 – 40 000 ₽', 'веб-сервис или сайт'),
        ('b3', 'от 40 000 ₽', 'CRM или крупнее'),
        ('b4', 'Пока не знаю', 'оценка бесплатная'),
    ]),
]

FAQ = [dict(x) for x in C['faq']['items']]
FAQ[0]['a'] = FAQ[0]['a'].replace('«Услуги»', '«Решения»')

NAV = [('Решения', '#services'), ('Отличия', '#compare'), ('Процесс', '#process'), ('Вопросы', '#faq')]
FOOT_NAV = [('Решения', '#services'), ('Отличия', '#compare'), ('Процесс', '#process'), ('Гарантии', '#guarantees'),
            ('Подбор решения', '#pick'), ('Вопросы', '#faq')]
META = [('Первый результат', 'через 2–3 дня'), ('Цена', 'фиксируется в договоре'), ('Код', 'остаётся у вас')]

TGA = 'href="%s" target="_blank" rel="noopener noreferrer"' % a(TG)
LOGO = '<span class="logo-w">финес<i class="dot"></i></span><span class="logo-s">студио</span>'


def fonts_css():
    rng = {
        'cyrillic': 'U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116',
        'latin': 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
        'latin-ext': 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF',
    }
    out = ['/* Onest — SIL Open Font License 1.1, шрифты лежат локально */']
    for w in (400, 500, 600, 800):
        for k, r in rng.items():
            if k == 'latin-ext' and w not in (400, 500):
                continue
            out.append('@font-face{font-family:Onest;font-style:normal;font-weight:%d;font-display:swap;'
                       'src:url(fonts/onest-%s-%d.woff2) format("woff2");unicode-range:%s}' % (w, k, w, r))
    return '\n'.join(out) + '\n'


def jsonld(url):
    org = {'@type': 'Organization', '@id': url + '#org', 'name': C['brand']['name'], 'url': url,
           'description': C['brand']['seoDescription'], 'sameAs': [TG],
           'contactPoint': {'@type': 'ContactPoint', 'contactType': 'customer support', 'url': TG, 'availableLanguage': 'ru'}}
    g = [org]
    for s in C['services']['items']:
        price = int(re.sub(r'\D', '', s['price']))
        g.append({'@type': 'Service', 'name': s['title'], 'description': s['text'], 'provider': {'@id': url + '#org'},
                  'areaServed': 'RU', 'offers': {'@type': 'Offer', 'priceCurrency': 'RUB', 'priceSpecification': {
                      '@type': 'PriceSpecification', 'minPrice': price, 'priceCurrency': 'RUB'}}})
    g.append({'@type': 'FAQPage', 'mainEntity': [
        {'@type': 'Question', 'name': f['q'], 'acceptedAnswer': {'@type': 'Answer', 'text': f['a']}} for f in FAQ]})
    return json.dumps({'@context': 'https://schema.org', '@graph': g}, ensure_ascii=False).replace('</', '<\\/')


def head(slug, title, desc, theme, page='', ld=True):
    site = BASE + slug + '/'
    url = site + page
    ld_tag = f'<script type="application/ld+json">{jsonld(site)}</script>\n' if ld else ''
    return f'''<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; style-src 'self'; font-src 'self'; script-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'none'; object-src 'none'">
<meta name="referrer" content="strict-origin-when-cross-origin">
<title>{a(title)}</title>
<meta name="description" content="{a(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="ru_RU">
<meta property="og:site_name" content="Финес Студио">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{a(title)}">
<meta property="og:description" content="{a(desc)}">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="{theme}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='12' fill='%2314161c'/%3E%3Ccircle cx='24' cy='24' r='8' fill='%23f2501c'/%3E%3C/svg%3E">
<link rel="preload" href="assets/fonts/onest-cyrillic-500.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/onest-cyrillic-400.woff2" as="font" type="font/woff2" crossorigin>
<script src="assets/boot.js"></script>
<link rel="stylesheet" href="assets/style.css">
{ld_tag}</head>
<body>
<a class="skip" href="#main">К содержанию</a>
'''


def header(p=''):
    nav = ''.join(f'<a href="{p}{h}">{t(l)}</a>' for l, h in NAV)
    return f'''<header class="hdr" id="hdr">
  <div class="wrap hdr-in">
    <a class="logo" href="{p}#top" aria-label="Финес Студио — наверх">{LOGO}</a>
    <nav class="nav" aria-label="Разделы">{nav}</nav>
    <div class="hdr-r">
      <a class="btn btn-sm" {TGA}>Обсудить задачу</a>
      <button class="burger" id="burger" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Открыть меню"><span></span><span></span></button>
    </div>
  </div>
</header>
<nav class="mnav" id="mnav" aria-label="Мобильное меню" hidden>
  {nav}<a href="{p}#pick">Подбор решения</a>
  <a class="btn" {TGA}>Написать в Telegram</a>
</nav>
'''


def hero_caption():
    h = C['hero']
    title = t(h['title'].replace('\n', ' ').replace('[', '').replace(']', ''))
    meta = ''.join(f'<div><dt>{t(k)}</dt><dd>{t(v)}</dd></div>' for k, v in META)
    return f'''<div class="cap">
        <p class="eyebrow">{t(h['eyebrow'].split(' · ')[-1])}</p>
        <h1>{title}</h1>
        <p class="lead-t">{t(h['subtitle'])}</p>
        <div class="acts">
          <a class="btn" {TGA}>{t(h['ctaPrimary'])}</a>
          <a class="link" href="#services">{t(h['ctaSecondary'])}</a>
        </div>
        <dl class="meta">{meta}</dl>
      </div>'''


def sec(id_, eyebrow, title, sub, body, foot=''):
    sub = f'\n      <p class="sub">{t(sub)}</p>' if sub else ''
    foot = f'\n      <div class="sec-f">{foot}</div>' if foot else ''
    return f'''
<section class="sec" id="{id_}" aria-labelledby="{id_}-t">
  <div class="wrap">
    <div class="sec-h rv">
      <p class="eyebrow">{t(eyebrow)}</p>
      <h2 id="{id_}-t">{t(title)}</h2>{sub}
    </div>
    <div class="sec-b rv">
{body}{foot}
    </div>
  </div>
</section>
'''


def body_sections():
    out = []
    st = C['statement']['text']
    first, rest = st.split('. ', 1)
    out.append(f'''
<section class="say" aria-label="Как мы работаем">
  <div class="wrap rv">
    <p class="eyebrow">Команда</p>
    <p class="say-t">{t(first)}.</p>
    <p class="sub">{t(rest)}</p>
  </div>
</section>
''')
    s = C['services']
    rows = '\n'.join(f'''      <li class="row">
        <h3>{t(i['title'])}</h3>
        <p>{t(i['text'])}</p>
        <div class="row-m"><span class="price">{t(i['price'])}</span><span class="term">{t(i['term'])}</span></div>
      </li>''' for i in s['items'])
    out.append(sec('services', s['eyebrow'], s['title'], s['subtitle'], f'      <ul class="rows">\n{rows}\n      </ul>',
                   '<a class="btn" href="#pick">Подобрать решение</a>'))

    c = C['compare']
    trs = '\n'.join(f'''          <tr><th scope="row">{t(r['label'])}</th><td data-l="{a(c['colA'])}">{t(r['a'])}</td><td data-l="{a(c['colB'])}">{t(r['b'])}</td></tr>''' for r in c['rows'])
    out.append(sec('compare', c['eyebrow'], c['title'], '', f'''      <table class="cmp">
        <thead><tr><th scope="col"><span class="vh">Параметр</span></th><th scope="col">{t(c['colA'])}</th><th scope="col">{t(c['colB'])}</th></tr></thead>
        <tbody>
{trs}
        </tbody>
      </table>
      <p class="note">{t(c['footnote'])}</p>'''))

    fears = '\n'.join(f'        <div class="fear"><h3>{t(q)}</h3><p>{t(x)}</p></div>' for q, x in FEARS)
    out.append(sec('fears', 'Честные ответы', 'Чего обычно боятся перед заказом.',
                   'Отвечаем фактами, которые потом закрепляем в договоре.', f'      <div class="fears">\n{fears}\n      </div>'))

    p = C['process']
    steps = '\n'.join(f'        <li class="step"><span class="n">{n:02d}</span><h3>{t(x["title"])}</h3><p>{t(x["text"])}</p></li>'
                      for n, x in enumerate(p['steps'], 1))
    out.append(sec('process', p['eyebrow'], p['title'], '', f'      <ol class="steps">\n{steps}\n      </ol>'))

    g = c['guarantees']
    cls = {0: ' c1', 5: ' c2'}
    cards = '\n'.join(f'        <li class="card{cls.get(n, "")}"><h3>{t(x["title"])}</h3><p>{t(x["text"])}</p></li>' for n, x in enumerate(g))
    out.append(sec('guarantees', 'Гарантии', 'Что фиксируем до старта.', 'Цена, срок и порядок оплаты прописаны в договоре.',
                   f'      <ul class="bento">\n{cards}\n      </ul>'))

    qs = []
    for n, (key, short, legend, opts) in enumerate(QUIZ):
        btns = '\n'.join(
            f'            <button class="opt" type="button" aria-pressed="false" data-v="{v}" data-label="{a(l)}">{t(l)}'
            + (f'<small>{t(sm)}</small>' if sm else '') + '</button>' for v, l, sm in opts)
        qs.append(f'''        <fieldset class="q-step" data-key="{key}" data-title="{a(short)}"{' hidden' if n else ''}>
          <legend>{t(legend)}</legend>
          <div class="q-opts">
{btns}
          </div>
        </fieldset>''')
    quiz = f'''      <form class="quiz" id="quiz" novalidate autocomplete="off">
        <div class="q-top"><span id="qCount" aria-live="polite">Шаг 1 из 4</span><button type="button" id="qBack" hidden>← Назад</button></div>
        <div class="q-bar" aria-hidden="true"><i id="qBar"></i></div>
{chr(10).join(qs)}
        <div class="q-res" id="qRes" hidden>
          <p class="eyebrow">Вам подойдёт</p>
          <p class="q-rec" id="qRec"></p>
          <p class="q-price" id="qPrice"></p>
          <ul class="q-sum" id="qSum"></ul>
          <label class="vh" for="qNote">Пара слов о задаче (необязательно)</label>
          <input class="field" id="qNote" name="note" type="text" maxlength="300" placeholder="Пара слов о задаче (необязательно)">
          <input class="hp" name="website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">
          <label class="agree"><input type="checkbox" name="agree"><span>Согласен на <a href="privacy.html#consent" target="_blank" rel="noopener">обработку персональных данных</a> и принимаю <a href="privacy.html" target="_blank" rel="noopener">политику конфиденциальности</a>.</span><span class="agree-e" role="alert"></span></label>
          <div class="q-acts">
            <button class="btn" type="submit" id="qSend">Отправить в Telegram</button>
            <button class="link link-plain" type="button" id="qAgain">Пройти заново</button>
          </div>
          <p class="note">Откроется Telegram с готовым сообщением. Сам сайт заявки не отправляет и не хранит.</p>
        </div>
      </form>'''
    out.append(sec('pick', 'Подбор за 4 шага', 'Не знаете, с чего начать?',
                   'Четыре вопроса кнопками, около минуты. В конце покажем, что подойдёт, и соберём короткое ТЗ.', quiz))

    f = C['faq']
    items = '\n'.join(f'        <details><summary>{t(x["q"])}</summary><p>{t(x["a"])}</p></details>' for x in FAQ)
    out.append(sec('faq', f['eyebrow'], f['title'], '', f'      <div class="faq">\n{items}\n      </div>'))

    k = C['contact']
    out.append(f'''
<section class="cta" id="contact" aria-labelledby="contact-t">
  <div class="wrap rv">
    <p class="eyebrow">{t(k['eyebrow'])}</p>
    <h2 id="contact-t">{t(k['title'])}</h2>
    <p class="sub">Готовое ТЗ не требуется. Оценка стоимости и срока бесплатная, отвечаем в течение рабочего дня.</p>
    <form id="lead" novalidate autocomplete="off">
     <div class="lead">
      <label class="vh" for="leadTask">Задача своими словами</label>
      <input class="field" id="leadTask" name="task" type="text" maxlength="300" placeholder="Задача своими словами">
      <input class="hp" name="website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button class="btn" type="submit">Получить оценку</button>
     </div>
     <label class="agree"><input type="checkbox" name="agree"><span>Согласен на <a href="privacy.html#consent" target="_blank" rel="noopener">обработку персональных данных</a> и принимаю <a href="privacy.html" target="_blank" rel="noopener">политику конфиденциальности</a>.</span><span class="agree-e" role="alert"></span></label>
    </form>
    <a class="link link-plain" {TGA}>или напишите напрямую:&nbsp;<b>{t(k['handle'])}</b></a>
  </div>
</section>
''')
    return ''.join(out)


def footer(p=''):
    nav = ''.join(f'<a href="{p}{h}">{t(l)}</a>' for l, h in FOOT_NAV)
    return f'''</main>
<footer class="ftr">
  <div class="wrap">
    <div class="ftr-top">
      <a class="logo" href="{p}#top" aria-label="Финес Студио — наверх">{LOGO}</a>
      <nav class="ftr-nav" aria-label="Подвал">{nav}<a {TGA}>{t(C['contact']['handle'])}</a></nav>
    </div>
    <div class="ftr-legal">
      <p>{t(C['footer']['text'])}</p>
      <p>{t(FOOT_LEGAL)}</p>
    </div>
    <div class="ftr-links">
      <a href="privacy.html">Политика конфиденциальности</a>
      <a href="privacy.html#consent">Согласие на обработку данных</a>
      <a href="privacy.html#cookies">Cookie</a>
      <button type="button" data-consent-open>Настройки cookie</button>
    </div>
  </div>
</footer>
<div class="ck" id="ck" role="region" aria-label="Cookie и персональные данные" hidden>
  <p class="ck-t">Cookie и персональные данные</p>
  <p>Сайт хранит в браузере только технические данные, без рекламы и слежки. Продолжая, вы соглашаетесь с <a href="privacy.html">политикой конфиденциальности</a> и <a href="privacy.html#consent">обработкой персональных данных</a>.</p>
  <div class="ck-acts">
    <button class="btn btn-sm" type="button" data-consent="all">Принять</button>
    <button class="btn btn-sm btn-soft" type="button" data-consent="necessary">Только необходимые</button>
  </div>
</div>
<script src="assets/app.js"></script>
</body>
</html>
'''


FOOT_LEGAL = ('Информация на сайте, включая цены, носит справочный характер и не является публичной офертой (ст. 437 ГК РФ). '
              'Сайт не использует рекламные и аналитические cookie и счётчики: в браузере хранится только ваш выбор в окне согласия.')

# Реквизиты оператора. Заполнить перед публикацией: ФИО / ИП / самозанятый, ИНН, e-mail.
LEGAL = {'operator': '', 'inn': '', 'email': '', 'date': '12 ноября 2026 г.'}


def privacy():
    op = LEGAL['operator'] or 'Финес Студио'
    req = ''.join(f'<li>{k}: {html.escape(v)}</li>' for k, v in (('ИНН', LEGAL['inn']), ('E-mail', LEGAL['email'])) if v)
    tg = f'<a {TGA}>{t(C["contact"]["handle"])}</a>'

    def ul(*items):
        return '<ul>' + ''.join(f'<li>{t(i)}</li>' for i in items) + '</ul>'

    def p(*items):
        return ''.join(f'<p>{t(i)}</p>' for i in items)

    return f'''<main id="main">
<article class="doc wrap">
  <p class="eyebrow">Документы</p>
  <h1>Политика конфиденциальности</h1>
  <p class="sub">Редакция от {LEGAL['date']}</p>

  <h2 id="operator">1. Кто обрабатывает данные</h2>
  <p>Оператор персональных данных: {html.escape(op)} (далее «Студия»). Связаться по любому вопросу о данных можно в Telegram: {tg}.</p>
  {'<ul>' + req + '</ul>' if req else ''}
  {p('Политика составлена в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и действует для этого сайта.')}

  <h2 id="data">2. Какие данные и откуда</h2>
  {p('На сайте нет регистрации, личного кабинета и форм, которые отправляют данные на сервер Студии. Формы «Подбор решения» и «Получить оценку» собирают текст сообщения прямо в вашем браузере и открывают Telegram с готовым черновиком. Отправляете сообщение вы сами.')}
  {p('Обработка начинается, когда вы написали Студии в Telegram. В этот момент Студия получает:')}
  {ul('имя и имя пользователя в Telegram;', 'номер телефона, если вы сами им поделились;', 'ответы из подбора решения и текст вашего сообщения;', 'другие сведения, которые вы решите сообщить в переписке.')}

  <h2 id="purpose">3. Зачем и на каком основании</h2>
  {ul('ответить на обращение и оценить задачу;', 'подготовить и заключить договор, выполнить работы по нему;', 'поддерживать связь по проекту после запуска.')}
  {p('Основания: ваше согласие (п. 1 ч. 1 ст. 6 Закона № 152-ФЗ), а после заключения договора — его исполнение (п. 5 ч. 1 ст. 6).')}

  <h2 id="consent">4. Согласие на обработку персональных данных</h2>
  {p('Отмечая галочку в форме, нажимая «Принять» в окне при входе или отправляя сообщение Студии, вы свободно, своей волей и в своём интересе даёте согласие на обработку данных из раздела 2 в целях из раздела 3.')}
  {p('Согласие распространяется на сбор, запись, систематизацию, хранение, уточнение, использование, удаление и уничтожение данных, с использованием средств автоматизации и без них.')}
  {p('Согласие действует до достижения целей обработки или до его отзыва. Отозвать согласие можно в любой момент сообщением в Telegram Студии. После отзыва данные удаляются в течение 30 дней, если закон не требует хранить их дольше.')}

  <h2 id="cookies">5. Cookie и данные в браузере</h2>
  {p('Сайт не устанавливает cookie, не подключает счётчики, рекламные пиксели и сторонние скрипты. Шрифты и стили загружаются с того же адреса, что и сайт.')}
  {p('В локальном хранилище браузера (localStorage) сохраняется одна запись: ваш выбор в окне согласия и его дата. Она нужна, чтобы не показывать окно при каждом визите, и не покидает ваше устройство.')}
  <p>Изменить выбор можно в любой момент: <button type="button" class="doc-btn" data-consent-open>открыть настройки cookie</button>. Удалить запись можно очисткой данных сайта в настройках браузера.</p>
  {p('Если на сайте появятся счётчики посещаемости, они будут включаться только после нажатия «Принять», а эта страница будет обновлена.')}

  <h2 id="third">6. Сторонние сервисы</h2>
  {ul('Хостинг сайта — GitHub Pages (GitHub, Inc., США). При открытии страниц хостинг получает технические данные запроса, включая IP-адрес.', 'Переписка идёт в Telegram и подчиняется также политике конфиденциальности Telegram.')}
  {p('Студия не продаёт данные и не передаёт их третьим лицам, кроме случаев, когда этого требует закон.')}

  <h2 id="storage">7. Хранение и защита</h2>
  {p('Данные хранятся в переписке и рабочих документах Студии, пока идёт общение и действует договор, а затем в течение срока, установленного законом для документов по сделке. Доступ к ним есть только у разработчиков Студии.')}

  <h2 id="rights">8. Ваши права</h2>
  {ul('узнать, какие ваши данные обрабатываются;', 'потребовать уточнить, заблокировать или удалить их;', 'отозвать согласие;', 'обжаловать действия оператора в Роскомнадзоре или в суде.')}
  <p>Запрос отправьте в Telegram: {tg}. Ответ придёт в течение 10 рабочих дней.</p>

  <h2 id="changes">9. Изменения</h2>
  {p('Действующая редакция всегда опубликована на этой странице. Дата редакции указана вверху.')}
  <p class="doc-back"><a class="link" href="index.html">На главную</a></p>
</article>
'''


HERO = {
    'alfa': lambda: f'''<main id="main">
<section class="hero" id="top" aria-label="Главное">
  <div class="wall">
    <div class="canvas">
      <div class="art" aria-hidden="true"></div><i class="ring" aria-hidden="true"></i><i class="art-dot" aria-hidden="true"></i>
      {hero_caption()}
    </div>
  </div>
</section>
''',
    'rocket': lambda: f'''<main id="main">
<section class="hero" id="top" aria-label="Главное">
  <i class="sun" aria-hidden="true"></i>
  <div class="wrap">
      {hero_caption()}
  </div>
</section>
''',
}

SITES = {
    'alfa': ('Финес Студио — Telegram-боты, CRM и веб-сервисы',
             'Разрабатываем Telegram-ботов, CRM-системы и веб-сервисы под задачи бизнеса. Первый результат через 2–3 дня, цена фиксируется в договоре.',
             '#ffffff'),
    'rocket': ('Telegram-боты и CRM под заказ — Финес Студио',
               'Разрабатываем Telegram-ботов, CRM и веб-сервисы для бизнеса. Первый результат через 2–3 дня, цена в договоре, код остаётся у вас.',
               '#14161c'),
}
KEEP_FONTS = {f'onest-{k}-{w}.woff2' for w in (400, 500, 600, 800) for k in ('cyrillic', 'latin')} | \
             {f'onest-latin-ext-{w}.woff2' for w in (400, 500)}
FONT_SRC = ROOT / 'sites' / 'rocket' / 'assets' / 'fonts'


def build():
    base = (B / 'base.css').read_text(encoding='utf-8')
    for slug, (title, desc, theme) in SITES.items():
        out = ROOT / 'sites' / slug
        assets = out / 'assets'
        fonts = assets / 'fonts'
        fonts.mkdir(parents=True, exist_ok=True)
        for name in KEEP_FONTS:
            if not (fonts / name).exists():
                shutil.copyfile(FONT_SRC / name, fonts / name)
        for f in fonts.iterdir():
            if f.name not in KEEP_FONTS:
                f.unlink()
        for old in ('fonts.css',):
            if (assets / old).exists():
                (assets / old).unlink()
        css = fonts_css() + base + (B / f'{slug}.css').read_text(encoding='utf-8')
        (assets / 'style.css').write_text(css, encoding='utf-8', newline='\n')
        (assets / 'app.js').write_text((B / 'app.js').read_text(encoding='utf-8'), encoding='utf-8', newline='\n')
        (assets / 'boot.js').write_text("document.documentElement.classList.add('js');\n", encoding='utf-8', newline='\n')
        page = head(slug, title, desc, theme) + header() + HERO[slug]() + body_sections() + footer()
        priv = head(slug, 'Политика конфиденциальности — Финес Студио', 'Как Финес Студио обрабатывает персональные данные и что сайт хранит в браузере.', theme, 'privacy.html', False) \
            + header('index.html') + privacy() + footer('index.html')
        (out / 'privacy.html').write_text(priv, encoding='utf-8', newline='\n')
        (out / 'index.html').write_text(page, encoding='utf-8', newline='\n')
        print(slug, len(page), 'html,', len(css), 'css')


if __name__ == '__main__':
    build()
