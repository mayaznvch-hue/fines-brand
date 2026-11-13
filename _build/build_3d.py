# -*- coding: utf-8 -*-
"""Макеты с 3D первым экраном: sites/3d-chaos и sites/3d-gyro.
Берёт готовую сборку sites/finesstudio и добавляет холст WebGL в первый экран.
Боевой сайт не трогает. Запуск из корня репозитория: python _build/build_3d.py
"""
import re, shutil, sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'sites' / 'finesstudio'
V = '1'
VARIANTS = {'3d-chaos': 'chaos.js', '3d-gyro': 'gyro.js'}

CSS = """
/* ---------- 3D первый экран (макет) ---------- */
.hero{position:relative;isolation:isolate}
.h3d{position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;opacity:0;transition:opacity 1.4s ease}
.h3d.on{opacity:1}
@media (min-width:1001px){.hero .hero__title{font-size:clamp(50px,6.3vw,104px);max-width:62%}}
@media (max-width:1000px){.hero.has3d .hero__title{margin-top:min(30svh,250px)}}
@media (prefers-reduced-motion:reduce){.h3d{transition:none}}
"""


def sub1(s, a, b, what):
    assert s.count(a) == 1, (what, s.count(a))
    return s.replace(a, b)


for name, js in VARIANTS.items():
    out = ROOT / 'sites' / name
    if out.exists():
        shutil.rmtree(out)
    shutil.copytree(SRC, out)
    css = out / 'assets' / 'css' / 'style.css'
    css.write_text(css.read_text(encoding='utf-8') + CSS, encoding='utf-8', newline='\n')
    shutil.copy(ROOT / '_build' / '3d' / js, out / 'assets' / 'js' / 'hero3d.js')
    for page in ('index.html', 'privacy.html', 'consent.html'):
        p = out / page
        h = p.read_text(encoding='utf-8')
        h, n = re.subn(r'<link rel="canonical"[^>]*>\s*', '', h)
        assert n == 1, (page, 'canonical', n)
        h, n = re.subn(r'<meta name="robots"[^>]*>\s*', '', h)
        h = sub1(h, '<meta name="viewport"', '<meta name="robots" content="noindex,nofollow">\n<meta name="viewport"', page + ' robots')
        h = re.sub(r'(assets/css/style\.css\?v=)[^"]+', r'\g<1>3d' + V, h)
        if page == 'index.html':
            h, n = re.subn(r'(<script src="assets/js/main\.js[^>]*></script>)',
                           r'\1\n<script src="assets/js/hero3d.js?v=' + V + '" defer></script>', h)
            assert n == 1, ('script', n)
        p.write_text(h, encoding='utf-8', newline='\n')
    print('built', name, sum(1 for _ in out.rglob('*') if _.is_file()), 'files')
