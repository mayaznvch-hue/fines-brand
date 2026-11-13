# -*- coding: utf-8 -*-
"""Витрина из 10 лёгких 3D-моделей про услуги студии: sites/3d-models.
Берёт стили и шрифты из готовой сборки sites/finesstudio, боевой сайт не трогает.
Запуск из корня репозитория: python _build/build_models.py
"""
import shutil, sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'sites' / 'finesstudio'
OUT = ROOT / 'sites' / '3d-models'
V = '4'

MODELS = [
    ('plane', 'Telegram-бот', 'Запись, заявки и оплата в мессенджере, которым клиенты уже пользуются.', 'бумажный самолёт'),
    ('chat', 'Ответы клиентам', 'Бот сам отвечает на типовые вопросы.', 'два объёмных сообщения в диалоге'),
    ('funnel', 'Воронка продаж', 'Видно, сколько заявок дошло до каждого этапа.', 'четыре сужающихся кольца с шариками'),
    ('kanban', 'CRM', 'Каждая сделка на своём этапе, ничего не теряется.', 'доска с карточками сделок'),
    ('hub', 'Интеграции', 'Сайт, CRM, таблицы, 1С и мессенджеры обмениваются данными сами.', 'центральный куб, связанный с пятью узлами'),
    ('lock', 'Защита', 'Защита сайтов и систем от DDoS-⁠атак.', 'замок'),
    ('backup', 'Резервные копии', 'Данные копируются во второе хранилище.', 'два хранилища из дисков'),
    ('site', 'Сайты и веб-сервисы', 'Интерфейс под ваш процесс, а не готовая коробка.', 'окно сайта, разложенное на слои'),
    ('bars', 'Отчёты', 'Цифры по заявкам и продажам в одном окне.', 'растущие столбцы'),
    ('pay', 'Оплата', 'Приём оплаты в боте и на сайте.', 'банковская карта'),
]

CSS = """
/* ---------- витрина 3D-моделей (макет) ---------- */
.mpage{padding-top:56px}
.mgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.mcard{margin:0;background:var(--s1);border:1px solid var(--line);border-radius:var(--r-xl);padding:14px;display:flex;flex-direction:column;gap:16px;min-width:0}
.mstage{position:relative;aspect-ratio:16/10;border-radius:var(--r-lg);background:var(--bg);border:1px solid var(--line);overflow:hidden}
.mstage canvas{position:absolute;inset:0;width:100%;height:100%;display:block;opacity:0;transition:opacity .6s ease}
.mstage canvas.on{opacity:1}
.mcap{display:grid;grid-template-columns:auto minmax(0,1fr);gap:6px 16px;align-items:baseline;padding:2px 12px 12px}
.mcap__n{font-size:12px;letter-spacing:.06em;color:var(--dim);min-width:2ch;font-variant-numeric:tabular-nums}
.mcap__t{font-size:clamp(20px,1.7vw,24px);font-weight:800;letter-spacing:-.03em;line-height:1.12}
.mcap__d{grid-column:2;color:var(--mute);font-size:15px;line-height:1.45}
.mnote{margin-top:28px;color:var(--dim);font-size:14px;line-height:1.5;max-width:720px}
@media (max-width:800px){.mpage{padding-top:32px}.mgrid{grid-template-columns:1fr}.mcard{padding:10px;border-radius:var(--r-lg);gap:12px}.mstage{border-radius:var(--r-md)}.mcap{padding:2px 8px 8px;gap:4px 12px}.mcap__d{font-size:14px}}
@media (prefers-reduced-motion:reduce){.mstage canvas{transition:none}}
/* ---------- палитры ---------- */
html[data-pal=paper] .mstage{background:#e9e7e1;border-color:#e9e7e1}
.pgrid{grid-template-columns:repeat(3,minmax(0,1fr))}
.pnav{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 20px}
.pnav a{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border:1px solid var(--line);border-radius:999px;font-size:14px;color:var(--mute)}
.pnav i{width:10px;height:10px;border-radius:50%;display:block}
.ptitle{display:none}
html[data-pal=blue] .ptitle--blue{display:block}html[data-pal=blue] .pnav a[data-p=blue]{color:var(--fg,#fff);border-color:currentColor}
html[data-pal=brass] .ptitle--brass{display:block}html[data-pal=brass] .pnav a[data-p=brass]{color:var(--fg,#fff);border-color:currentColor}
html[data-pal=emerald] .ptitle--emerald{display:block}html[data-pal=emerald] .pnav a[data-p=emerald]{color:var(--fg,#fff);border-color:currentColor}
html[data-pal=mono] .ptitle--mono{display:block}html[data-pal=mono] .pnav a[data-p=mono]{color:var(--fg,#fff);border-color:currentColor}
html[data-pal=paper] .ptitle--paper{display:block}html[data-pal=paper] .pnav a[data-p=paper]{color:var(--fg,#fff);border-color:currentColor}
html:not([data-pal]) .ptitle--base{display:block}
@media (max-width:1000px){.pgrid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:800px){.pgrid{grid-template-columns:1fr}}
"""

cards = ''
for i, (key, title, desc, alt) in enumerate(MODELS, 1):
    cards += '''      <figure class="mcard">
        <div class="mstage" data-m="%s" role="img" aria-label="3D-модель: %s"></div>
        <figcaption class="mcap">
          <span class="mono mcap__n">%02d</span>
          <span class="mcap__t">%s</span>
          <span class="mcap__d">%s</span>
        </figcaption>
      </figure>
''' % (key, alt, i, title, desc)

HTML = '''<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex,nofollow">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'none'; object-src 'none'">
<meta name="referrer" content="strict-origin-when-cross-origin">
<title>Финес Студио · 10 3D-моделей (макет)</title>
<meta name="format-detection" content="telephone=no">
<meta name="theme-color" content="#0b0b0d">
<link rel="stylesheet" href="assets/css/style.css?v=m%s">
</head>
<body>
<header class="hdr" id="top">
  <div class="wrap hdr__in">
    <a class="logo" href="https://finesstudio.ru/" aria-label="Финес Студио — на главную">
      <span class="logo__word">финес<span class="dot" aria-hidden="true"></span></span>
      <span class="logo__sub">студио</span>
    </a>
    <a class="btn btn--line hdr__cta" href="https://t.me/fines_studio" target="_blank" rel="noopener noreferrer">Оценить задачу<span class="arr" aria-hidden="true">↗</span></a>
  </div>
</header>
<main>
<section class="sec mpage" aria-labelledby="m-title">
  <div class="wrap">
    <div class="sh">
      <p class="label mono"><b>[3D]</b> Модели</p>
      <h2 id="m-title">Десять моделей <span class="w3">про нашу работу.</span></h2>
      <p class="sh__sub">Каждая написана кодом и запускается, только когда вы до неё долистали.</p>
    </div>
    <div class="mgrid">
%s    </div>
  </div>
</section>
</main>
<script src="assets/js/main.js?v=m%s" defer></script>
<script src="assets/js/models.js?v=%s" defer></script>
</body>
</html>
''' % (V, cards, V, V)

if OUT.exists():
    shutil.rmtree(OUT)
shutil.copytree(SRC, OUT)
for junk in ('privacy.html', 'consent.html'):
    f = OUT / junk
    if f.exists():
        f.unlink()
css = OUT / 'assets' / 'css' / 'style.css'
css.write_text(css.read_text(encoding='utf-8') + CSS, encoding='utf-8', newline='\n')
shutil.copy(ROOT / '_build' / '3d' / 'models.js', OUT / 'assets' / 'js' / 'models.js')
(OUT / 'index.html').write_text(HTML, encoding='utf-8', newline='\n')

# ---------- страница палитр: palettes.html?pal=имя ----------
PALS = [('blue', 'Синий', 'Холодный графит и один синий акцент. Самый «айтишный».', '#2966fa'), ('brass', 'Латунь', 'Тёплый графит и латунный акцент. Дороже и спокойнее оранжевого.', '#cc9945'), ('emerald', 'Изумруд', 'Графит с зелёным подтоном и изумрудный акцент.', '#149e70'), ('mono', 'Монохром', 'Только серые, акцент белый. Самый строгий.', '#ffffff'), ('paper', 'Бумага', 'Светлое окно, тёмные формы, оранжевый акцент остаётся.', '#f2501c')]
SHOW = ['chat', 'bars', 'hub', 'kanban', 'lock', 'pay']
byk = {m[0]: m for m in MODELS}
pcards = ''.join('''      <figure class="mcard">
        <div class="mstage" data-m="%s" role="img" aria-label="3D-модель: %s"></div>
        <figcaption class="mcap"><span class="mono mcap__n">%02d</span><span class="mcap__t">%s</span></figcaption>
      </figure>
''' % (k, byk[k][3], i, byk[k][1]) for i, k in enumerate(SHOW, 1))
nav = '<a href="palettes.html" data-p="base"><i style="background:#f2501c"></i>Сейчас</a>' + ''.join('<a href="palettes.html?pal=%s" data-p="%s"><i style="background:%s"></i>%s</a>' % (k, k, c, t) for k, t, d, c in PALS)
titles = '<div class="sh ptitle ptitle--base"><p class="label mono"><b>[0]</b> Раскраска</p><h2>Сейчас <span class="w3">графит и оранжевый.</span></h2></div>' + ''.join('<div class="sh ptitle ptitle--%s"><p class="label mono"><b>[%d]</b> Раскраска</p><h2>%s <span class="w3">%s</span></h2></div>' % (k, i, t, d) for i, (k, t, d, c) in enumerate(PALS, 1))
a, b = HTML.index('    <div class="sh">'), HTML.index('  </div>\n</section>')
PHTML = HTML[:a] + '    ' + titles + '\n    <nav class="pnav" aria-label="Раскраски">' + nav + '</nav>\n    <div class="mgrid pgrid">\n' + pcards + '    </div>\n' + HTML[b:]
PHTML = PHTML.replace('10 3D-моделей (макет)', 'раскраски 3D-моделей (макет)').replace("style-src 'self' 'unsafe-inline'", "style-src 'self' 'unsafe-inline'")
(OUT / 'palettes.html').write_text(PHTML, encoding='utf-8', newline='\n')
print('built', OUT.name, sum(1 for _ in OUT.rglob('*') if _.is_file()), 'files,', (OUT / 'assets' / 'js' / 'models.js').stat().st_size, 'bytes js,', len(MODELS), 'models')
