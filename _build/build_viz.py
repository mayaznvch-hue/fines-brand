# -*- coding: utf-8 -*-
"""Макеты с лёгкой визуализацией в первом экране и блоком «3D и анимация для сайтов».
sites/viz-layers, viz-code, viz-flow, viz-scheme. Берёт готовую сборку sites/finesstudio,
боевой сайт не трогает. Запуск из корня репозитория: python _build/build_viz.py
Первый экран: только HTML и CSS (без WebGL). WebGL работает только в двух примерах
внутри карточки 3D и только пока карточка на экране.
"""
import re, shutil, sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'sites' / 'finesstudio'
V = '1'


def sub1(s, a, b, what):
    assert s.count(a) == 1, (what, s.count(a))
    return s.replace(a, b)


# ---------------------------------------------------------------- keyframes
def kf_show(name, a, b):
    return ('@keyframes %s{0%%,%s%%{opacity:0;transform:translateY(8px)}%s%%,92%%{opacity:1;transform:none}'
            '97%%,100%%{opacity:0;transform:none}}\n' % (name, a, b))


def kf_type(name, a, b):
    return ('@keyframes %s{0%%,%s%%{opacity:1;clip-path:inset(0 100%% 0 0);animation-timing-function:steps(20,end)}'
            '%s%%,92%%{opacity:1;clip-path:inset(0 0 0 0)}97%%,100%%{opacity:0;clip-path:inset(0 0 0 0)}}\n' % (name, a, b))


def kf_route(name, pts, t0, t1):
    """Точка едет по ломаной pts (в процентах блока) между t0 и t1 процентами цикла."""
    seg = [abs(pts[i + 1][0] - pts[i][0]) + abs(pts[i + 1][1] - pts[i][1]) for i in range(len(pts) - 1)]
    tot = float(sum(seg))
    out = '@keyframes %s{0%%,%s%%{left:%s%%;top:%s%%;opacity:0}' % (name, t0 - 2, pts[0][0], pts[0][1])
    acc = 0.0
    out += '%s%%{left:%s%%;top:%s%%;opacity:1}' % (t0, pts[0][0], pts[0][1])
    for i, s in enumerate(seg):
        acc += s
        t = round(t0 + (t1 - t0) * acc / tot, 2)
        out += '%s%%{left:%s%%;top:%s%%;opacity:1}' % (t, pts[i + 1][0], pts[i + 1][1])
    out += '%s%%,100%%{left:%s%%;top:%s%%;opacity:0}}\n' % (t1 + 3, pts[-1][0], pts[-1][1])
    return out


KF = ''
for n in range(6):
    KF += kf_type('vzt%d' % n, 4 + n * 9, 11 + n * 9)
for n in range(5):
    KF += kf_show('vzu%d' % n, 9 + n * 9, 13 + n * 9)
# заявка: 3 реплики, связь, карточка, смена статуса
for n, (a, b) in enumerate([(4, 8), (16, 20), (28, 32), (44, 48)]):
    KF += kf_show('vzf%d' % n, a, b)
KF += '@keyframes vzfn{0%,44%{opacity:0}48%,64%{opacity:1}68%,100%{opacity:0}}\n'
KF += '@keyframes vzfp{0%,66%{opacity:0;transform:scale(.9)}70%,92%{opacity:1;transform:none}97%,100%{opacity:0;transform:none}}\n'
KF += '@keyframes vzfy{0%,34%{top:0;opacity:0}36%{top:0;opacity:1}44%{top:100%;opacity:1}46%,100%{top:100%;opacity:0}}\n'
KF += '@keyframes vzfx{0%,34%{left:0;opacity:0}36%{left:0;opacity:1}44%{left:100%;opacity:1}46%,100%{left:100%;opacity:0}}\n'
KF += kf_route('vzsa', [(18, 20), (50, 20), (50, 50), (50, 80), (82, 80)], 6, 40)
KF += kf_route('vzsb', [(82, 20), (50, 20), (50, 50), (50, 80), (18, 80)], 54, 88)

CSS = """
/* ---------- макет: визуализация в первом экране + блок 3D ---------- */
@property --g{syntax:'<length>';inherits:true;initial-value:46px}
.hero{position:relative}
@media (min-width:1001px){.hero .hero__title{font-size:clamp(50px,6.3vw,104px);max-width:62%}}
.viz{position:absolute;right:max(var(--pad),env(safe-area-inset-right));top:clamp(96px,15vh,150px);width:min(33%,440px);height:clamp(330px,46vh,400px);pointer-events:none;font-family:var(--sans)}
.viz.is-off *{animation-play-state:paused!important}
.vz-pn{background:var(--s1);border:1px solid var(--line);border-radius:var(--r-md);min-width:0}
.vz-bar{display:flex;align-items:center;gap:8px;padding:9px 12px;border-bottom:1px solid var(--line);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--dim);white-space:nowrap}
.vz-bar::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--acc);flex:none}

/* 1 · разрез системы */
.vz-l{--pw:190px;--g0:40px;--g1:62px;--g:50px;animation:vzg 7s ease-in-out infinite alternate}
@keyframes vzg{from{--g:var(--g0)}to{--g:var(--g1)}}
.vz-l__st{position:absolute;left:38%;top:57%;width:0;height:0;transform-style:preserve-3d;transform:rotateX(60deg) rotateZ(-40deg)}
.vz-l__p{position:absolute;width:var(--pw);height:var(--pw);left:calc(var(--pw)/-2);top:calc(var(--pw)/-2);transform:translateZ(calc((var(--i) - 1.5)*var(--g)));border:1px solid rgba(255,255,255,.24);border-radius:14px;background:rgba(30,30,36,.95)}
.vz-l__p--ui{border-color:rgba(255,255,255,.42);padding:9%;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto 1fr 1.3fr;gap:7%}
.vz-l__p--ui b{grid-column:1/-1;height:5px;width:46%;border-radius:3px;background:var(--ink)}
.vz-l__p--ui span{border:1px solid var(--line-2);border-radius:7px}
.vz-l__p--ui em{grid-column:1/-1;display:flex;align-items:flex-end;gap:6%}
.vz-l__p--ui em i{flex:1;border-radius:3px 3px 0 0;background:rgba(255,255,255,.2);height:var(--h)}
.vz-l__p--ui em i.a{background:var(--acc)}
.vz-l__ic{position:absolute;left:9%;bottom:9%;width:26%;height:26%}
.vz-l__p--3d .vz-l__ic{border:1.5px solid var(--ink-2);border-radius:50%}
.vz-l__p--3d .vz-l__ic::before{content:'';position:absolute;inset:22%;border:1.5px solid var(--ink-2);border-radius:50%}
.vz-l__p--3d .vz-l__ic::after{content:'';position:absolute;left:50%;top:50%;width:18%;height:18%;margin:-9% 0 0 -9%;border-radius:50%;background:var(--acc)}
.vz-l__p--code .vz-l__ic{width:44%;display:flex;flex-direction:column;justify-content:flex-end;gap:14%}
.vz-l__p--code .vz-l__ic i{height:3px;border-radius:2px;background:var(--ink-2);width:var(--w)}
.vz-l__p--sec{border-style:dashed;border-color:rgba(242,80,28,.55)}
.vz-l__p--sec .vz-l__ic{color:var(--acc)}
.vz-l__p--sec svg{width:100%;height:100%;display:block}
.vz-l__lb{position:absolute;left:calc(38% + var(--pw)*.74);top:calc(57% + (1.5 - var(--i))*var(--g)*.866 - 9px);display:flex;align-items:center;gap:8px;font-size:13px;line-height:18px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink);white-space:nowrap}
.vz-l__lb::before{content:'';width:18px;height:1px;background:var(--line-2)}
.vz-l__lb b{font-weight:400;color:var(--dim)}

/* 2 · код собирает интерфейс */
.vz-c{display:grid;grid-template-rows:auto auto;align-content:center;gap:14px}
.vz-c__code pre{margin:0;padding:12px 14px;font:12.5px/1.65 ui-monospace,Consolas,Menlo,monospace;color:var(--ink-2);overflow:hidden}
.vz-c__code pre i{display:block;font-style:normal;white-space:pre;animation:var(--k) 11s linear infinite}
.vz-c__code pre i u{text-decoration:none;color:var(--acc)}
.vz-c__ui{padding:14px;display:grid;grid-template-columns:1fr auto;gap:10px 12px;align-items:center;justify-self:end;width:78%;animation:vzu0 11s linear infinite}
.vz-c__ui>*{animation:var(--k) 11s linear infinite}
.vz-c__who{display:flex;align-items:center;gap:9px;font-size:14px;font-weight:500;min-width:0}
.vz-c__who::before{content:'А';width:26px;height:26px;border-radius:50%;background:var(--s3);display:grid;place-items:center;font-size:12px;flex:none}
.vz-c__st{display:inline-flex;align-items:center;gap:6px;font-size:11px;padding:4px 9px;border:1px solid var(--line-2);border-radius:999px;color:var(--ink-2);white-space:nowrap}
.vz-c__st::before{content:'';width:5px;height:5px;border-radius:50%;background:var(--acc)}
.vz-c__tm{grid-column:1/-1;font-size:20px;font-weight:800;letter-spacing:-.03em;line-height:1.1}
.vz-c__bt{grid-column:1/-1;height:34px;border-radius:999px;background:var(--ink);color:#0b0b0d;font-size:13px;font-weight:500;display:grid;place-items:center}

/* 3 · живая заявка */
.vz-f{display:grid;grid-template-rows:auto 34px auto;align-content:center}
.vz-f__chat{display:flex;flex-direction:column}
.vz-f__msgs{padding:12px;display:flex;flex-direction:column;gap:7px}
.vz-f__m{max-width:82%;padding:7px 11px;border-radius:13px 13px 13px 4px;background:var(--s3);font-size:13px;line-height:1.3;color:var(--ink);animation:var(--k) 12s linear infinite}
.vz-f__m--me{align-self:flex-end;border-radius:13px 13px 4px 13px;background:var(--ink);color:#0b0b0d}
.vz-f__ln{position:relative;justify-self:center;width:1px;height:100%;background:var(--line-2)}
.vz-f__ln i{position:absolute;left:0;top:0;width:7px;height:7px;margin:-3px 0 0 -3px;border-radius:50%;background:var(--acc);opacity:0;animation:vzfy 12s linear infinite}
.vz-f__card{animation:vzf3 12s linear infinite}
.vz-f__body{padding:12px 14px;display:grid;grid-template-columns:1fr auto;gap:4px 12px;align-items:center}
.vz-f__t{font-size:15px;font-weight:800;letter-spacing:-.02em}
.vz-f__s{grid-column:1;font-size:12px;color:var(--mute)}
.vz-f__pills{grid-column:2;grid-row:1/3;display:grid}
.vz-f__pill{grid-area:1/1;justify-self:end;font-size:11px;padding:4px 10px;border-radius:999px;border:1px solid var(--line-2);color:var(--ink-2);white-space:nowrap}
.vz-f__pill--n{opacity:0;animation:vzfn 12s linear infinite}
.vz-f__pill--p{border-color:var(--acc);color:var(--acc);animation:vzfp 12s linear infinite}

/* 4 · схема */
.vz-s__ln{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.vz-s__ln path{fill:none;stroke:rgba(255,255,255,.24);stroke-width:1;vector-effect:non-scaling-stroke}
.vz-s__n{position:absolute;left:var(--x);top:var(--y);transform:translate(-50%,-50%);display:flex;align-items:center;gap:7px;padding:8px 13px;border:1px solid var(--line-2);border-radius:10px;background:var(--bg);font-size:12px;line-height:16px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-2);white-space:nowrap;z-index:2}
.vz-s__n--c{padding:13px 20px;border-color:rgba(255,255,255,.34);color:var(--ink);font-weight:500;background:var(--s2)}
.vz-s__n--c::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--acc)}
.vz-s__n--db::after{content:'';position:absolute;inset:-6px;border:1px dashed rgba(242,80,28,.6);border-radius:14px}
.vz-s__n svg{width:11px;height:13px;flex:none;color:var(--acc)}
.vz-s__d{position:absolute;width:7px;height:7px;margin:-3.5px 0 0 -3.5px;border-radius:50%;background:var(--acc);opacity:0;z-index:1}
.vz-s__d--a{animation:vzsa 10s linear infinite}
.vz-s__d--b{animation:vzsb 10s linear infinite}

@media (max-width:1180px){.vz-l{--pw:160px;--g0:34px;--g1:52px;--g:43px}.vz-l__st,.vz-l__lb{--x:0}}
@media (max-width:1000px){
  .viz{position:relative;right:auto;top:auto;width:100%;height:250px;margin-top:22px}
  .hero .hero__title{margin-top:26px}
  .vz-l{--pw:150px;--g0:32px;--g1:46px;--g:39px}
  .vz-l__st{left:34%}
  .vz-l__lb{left:calc(34% + var(--pw)*.74)}
  .vz-c{grid-template-rows:none;grid-template-columns:1.25fr 1fr;align-items:center;gap:10px}
  .vz-c__ui{width:100%}
  .vz-f{grid-template-rows:none;grid-template-columns:1.25fr 26px 1fr;align-items:center}
  .vz-f__ln{width:100%;height:1px;align-self:center}
  .vz-f__ln i{animation-name:vzfx}
}
@media (max-width:700px){
  .viz{height:196px;margin-top:18px}
  .hero .hero__title{margin-top:22px}
  .vz-bar{padding:7px 10px;font-size:10px}
  .vz-l{--pw:112px;--g0:24px;--g1:36px;--g:30px}
  .vz-l__lb{font-size:11px}
  .vz-c__code pre{padding:9px 10px;font-size:9.5px}
  .vz-c__ui{padding:10px;gap:7px 8px}
  .vz-c__who{font-size:12px;gap:7px}
  .vz-c__who::before{width:22px;height:22px;font-size:11px}
  .vz-c__st{font-size:10px;padding:3px 7px}
  .vz-c__tm{font-size:15px}
  .vz-c__bt{height:28px;font-size:12px}
  .vz-f__msgs{padding:9px;gap:5px}
  .vz-f__m{font-size:11px;padding:5px 9px;max-width:90%}
  .vz-f__body{padding:9px 10px;grid-template-columns:1fr}
  .vz-f__t{font-size:13px}
  .vz-f__s{font-size:11px}
  .vz-f__pills{grid-column:1;grid-row:auto;margin-top:5px}
  .vz-f__pill{justify-self:start;font-size:10px;padding:3px 8px}
  .vz-s__n{padding:6px 10px;font-size:11px}
  .vz-s__n--c{padding:9px 15px}
}
@media (prefers-reduced-motion:reduce){.viz,.viz *{animation:none!important}}

/* карточки: защита и 3D */
.bento--v .card--sec{grid-column:8/-1}
.bento--v .card--3d{grid-column:1/-1;padding:24px}
.bento--v .card--int ~ .card--cta{grid-column:1/-1;min-height:200px}
.secl{list-style:none;display:flex;flex-direction:column;font-size:15px;color:var(--ink-2)}
.secl li{display:flex;align-items:center;gap:12px;padding:11px 0;border-top:1px solid var(--line)}
.secl li:last-child{border-bottom:1px solid var(--line)}
.secl li::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--acc);flex:none}
.stages{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.stage{position:relative;isolation:isolate;overflow:hidden;aspect-ratio:16/10;border:1px solid var(--line);border-radius:var(--r-lg);background:var(--bg)}
.stage .h3d{position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;opacity:0;transition:opacity 1.2s ease}
.stage .h3d.on{opacity:1}
.stage__cap{position:absolute;left:16px;bottom:14px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute)}
@media (max-width:1000px){.bento--v .card--sec{grid-column:span 6}.bento--v .card--int ~ .card--cta{min-height:0}}
@media (max-width:700px){.bento--v .card--sec{grid-column:1/-1}.bento--v .card--3d{padding:14px}.stages{grid-template-columns:1fr}.stage__cap{left:12px;bottom:10px;font-size:11px}}
@media (prefers-reduced-motion:reduce){.stage .h3d{transition:none}}
"""

SHIELD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M12 3l8 3v6c0 4.6-3.2 7.9-8 9-4.800-1.100-8-4.400-8-9V6l8-3z"/><path d="M8.500 12l2.500 2.500 4.500-5"/></svg>'
LOCK = '<svg viewBox="0 0 11 13" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="1" y="5.500" width="9" height="6.500" rx="1.500"/><path d="M3 5.500V3.800a2.500 2.500 0 0 1 5 0v1.700"/></svg>'

VIZ = {
    'viz-layers': '''<div class="viz vz-l" aria-hidden="true">
      <div class="vz-l__st">
        <div class="vz-l__p vz-l__p--sec" style="--i:0"><div class="vz-l__ic">''' + SHIELD + '''</div></div>
        <div class="vz-l__p vz-l__p--code" style="--i:1"><div class="vz-l__ic"><i style="--w:62%"></i><i style="--w:100%"></i><i style="--w:78%"></i><i style="--w:40%"></i></div></div>
        <div class="vz-l__p vz-l__p--3d" style="--i:2"><div class="vz-l__ic"></div></div>
        <div class="vz-l__p vz-l__p--ui" style="--i:3"><b></b><span></span><span></span><em><i style="--h:38%"></i><i style="--h:62%"></i><i style="--h:48%"></i><i class="a" style="--h:100%"></i><i style="--h:70%"></i></em></div>
      </div>
      <span class="vz-l__lb" style="--i:3"><b>01</b>Дизайн</span>
      <span class="vz-l__lb" style="--i:2"><b>02</b>3D</span>
      <span class="vz-l__lb" style="--i:1"><b>03</b>Код</span>
      <span class="vz-l__lb" style="--i:0"><b>04</b>Защита</span>
    </div>
    ''',
    'viz-code': '''<div class="viz vz-c" aria-hidden="true">
      <div class="vz-pn vz-c__code">
        <div class="vz-bar">card.tsx</div>
        <pre><i style="--k:vzt0">&lt;<u>Card</u>&gt;</i><i style="--k:vzt1">  &lt;<u>Client</u> name="Анна" /&gt;</i><i style="--k:vzt2">  &lt;<u>Status</u> paid /&gt;</i><i style="--k:vzt3">  &lt;<u>Time</u>&gt;завтра, 14:30&lt;/<u>Time</u>&gt;</i><i style="--k:vzt4">  &lt;<u>Button</u>&gt;Принять&lt;/<u>Button</u>&gt;</i><i style="--k:vzt5">&lt;/<u>Card</u>&gt;</i></pre>
      </div>
      <div class="vz-pn vz-c__ui">
        <span class="vz-c__who" style="--k:vzu1">Анна</span>
        <span class="vz-c__st" style="--k:vzu2">Оплачено</span>
        <span class="vz-c__tm" style="--k:vzu3">завтра, 14:30</span>
        <span class="vz-c__bt" style="--k:vzu4">Принять</span>
      </div>
    </div>
    ''',
    'viz-flow': '''<div class="viz vz-f" aria-hidden="true">
      <div class="vz-pn vz-f__chat">
        <div class="vz-bar">Telegram-бот</div>
        <div class="vz-f__msgs">
          <span class="vz-f__m vz-f__m--me" style="--k:vzf0">Хочу записаться на завтра</span>
          <span class="vz-f__m" style="--k:vzf1">Есть 14:30. Записать?</span>
          <span class="vz-f__m vz-f__m--me" style="--k:vzf2">Да</span>
        </div>
      </div>
      <div class="vz-f__ln"><i></i></div>
      <div class="vz-pn vz-f__card">
        <div class="vz-bar">CRM / сделки</div>
        <div class="vz-f__body">
          <span class="vz-f__t">Анна</span>
          <span class="vz-f__s">завтра, 14:30</span>
          <span class="vz-f__pills"><span class="vz-f__pill vz-f__pill--n">Новая</span><span class="vz-f__pill vz-f__pill--p">Оплачено</span></span>
        </div>
      </div>
    </div>
    ''',
    'viz-scheme': '''<div class="viz vz-s" aria-hidden="true">
      <svg class="vz-s__ln" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M18 20H82M18 80H82M50 20V80"/></svg>
      <i class="vz-s__d vz-s__d--a"></i><i class="vz-s__d vz-s__d--b"></i>
      <span class="vz-s__n" style="--x:18%;--y:20%">Бот</span>
      <span class="vz-s__n" style="--x:82%;--y:20%">Сайт</span>
      <span class="vz-s__n vz-s__n--c" style="--x:50%;--y:50%">CRM</span>
      <span class="vz-s__n" style="--x:82%;--y:80%">Оплата</span>
      <span class="vz-s__n vz-s__n--db" style="--x:18%;--y:80%">''' + LOCK + '''База</span>
    </div>
    ''',
}

CARDS = '''<article class="card card--svc card--sec reveal" id="security">
        <div class="card__top"><span class="mono tag">05 / SEC</span></div>
        <ul class="secl">
          <li>Защита от DDoS-⁠атак</li>
          <li>Резервное копирование</li>
          <li>Соответствие законодательству</li>
        </ul>
        <div>
          <h3 class="card__h">Защита и соответствие</h3>
          <p class="card__p">Закрываем сайты и системы от DDoS-⁠атак, настраиваем резервные копии и приводим в&nbsp;соответствие с&nbsp;требованиями законодательства.</p>
        </div>
      </article>

      <article class="card card--3d reveal" id="web3d">
        <div class="card__top">
          <span class="mono tag">06 / 3D</span>
          <span class="mono tag tag--live"><i></i>живые примеры, написаны кодом</span>
        </div>
        <div class="stages">
          <div class="stage" data-3d="chaos" role="img" aria-label="Пример 3D-графики: точки собираются в ровную сетку"><span class="mono stage__cap">Сборка из точек</span></div>
          <div class="stage" data-3d="gyro" role="img" aria-label="Пример 3D-графики: металлический гироскоп"><span class="mono stage__cap">Гироскоп</span></div>
        </div>
        <div class="card__foot">
          <div>
            <h3 class="card__h">3D и анимация для сайтов</h3>
            <p class="card__p">Объёмная графика и движение прямо в&nbsp;браузере: первый экран, показ товара, визуализация данных. Пишем кодом, без тяжёлых библиотек.</p>
          </div>
          <div class="price">
            <span class="mono price__v">от 15 000 ₽</span>
          </div>
        </div>
      </article>

      '''


def stage_js(name, key):
    """Сцена из первого экрана -> сцена внутри блока .stage[data-3d]."""
    s = (ROOT / '_build' / '3d' / name).read_text(encoding='utf-8')
    s = sub1(s, "var hero = document.querySelector('.hero');", "var hero = document.querySelector('[data-3d=\"%s\"]');" % key, 'host')
    if key == 'gyro':
        s = sub1(s, "    if (W <= 1000) {", "    if (true) { px = W * 0.5; py = H * 0.5; R = Math.min(W * 0.3, H * 0.37); } else if (W <= 1000) {", 'layout')
        s = sub1(s, "window.addEventListener('scroll', function () { scT =", "window.addEventListener('scroll', function () { return; scT =", 'scroll')
    else:
        s = sub1(s, "    if (W <= 1000) {", "    if (true) { px = W * 0.5; py = H * 0.5; Rpx = Math.min(W * 0.36, H * 0.44); } else if (W <= 1000) {", 'layout')
        s = sub1(s, "window.addEventListener('scroll', function () { St =", "window.addEventListener('scroll', function () { return; St =", 'scroll')
        # сборка играет заново каждый раз, когда блок появляется на экране
        s = sub1(s, "new IntersectionObserver(function (en) { vis = en[0].isIntersecting; kick(); }).observe(hero);",
                 "new IntersectionObserver(function (en) { vis = en[0].isIntersecting; if (vis) t0 = performance.now(); kick(); }, { threshold: 0.35 }).observe(hero);", 'replay')
    return s


EXTRA = """/* Финес Студио · макет: пауза визуализации вне экрана + два примера 3D в блоке услуг */
(function () {
  'use strict';
  var v = document.querySelector('.viz');
  if (v && 'IntersectionObserver' in window) new IntersectionObserver(function (en) { v.classList.toggle('is-off', !en[0].isIntersecting); }).observe(v);
})();
"""

js_all = EXTRA + stage_js('chaos.js', 'chaos') + '\n' + stage_js('gyro.js', 'gyro') + '\n'

for name, viz in VIZ.items():
    out = ROOT / 'sites' / name
    if out.exists():
        shutil.rmtree(out)
    shutil.copytree(SRC, out)
    css = out / 'assets' / 'css' / 'style.css'
    css.write_text(css.read_text(encoding='utf-8') + CSS + KF, encoding='utf-8', newline='\n')
    (out / 'assets' / 'js' / 'extra.js').write_text(js_all, encoding='utf-8', newline='\n')
    for page in ('index.html', 'privacy.html', 'consent.html'):
        p = out / page
        h = p.read_text(encoding='utf-8')
        h, n = re.subn(r'<link rel="canonical"[^>]*>\s*', '', h)
        assert n == 1, (page, 'canonical', n)
        h, n = re.subn(r'<meta name="robots"[^>]*>\s*', '', h)
        h = sub1(h, '<meta name="viewport"', '<meta name="robots" content="noindex,nofollow">\n<meta name="viewport"', page + ' robots')
        h = re.sub(r'(assets/css/style\.css\?v=)[^"]+', r'\g<1>viz' + V, h)
        if page == 'index.html':
            h = sub1(h, '<h1 class="hero__title"', viz + '<h1 class="hero__title"', 'viz')
            h = sub1(h, '<div class="bento">', '<div class="bento bento--v">', 'bento')
            h = sub1(h, '<a class="card card--cta reveal"', CARDS + '<a class="card card--cta reveal"', 'cards')
            h, n = re.subn(r'(<script src="assets/js/main\.js[^>]*></script>)',
                           r'\1\n<script src="assets/js/extra.js?v=' + V + '" defer></script>', h)
            assert n == 1, ('script', n)
        p.write_text(h, encoding='utf-8', newline='\n')
    print('built', name, sum(1 for _ in out.rglob('*') if _.is_file()), 'files', (out / 'assets' / 'js' / 'extra.js').stat().st_size, 'bytes js')
