// Ядро генератора брендбуков «Финес Студио», варианты 15–20
import fs from 'fs';
import { HL, SOCIAL_RULE, THREAD, REEL } from './headlines.mjs';
export const TG = 'https://t.me/fines_studio';
export const H = '@fines_studio';
export const ROOT = 'C:/Users/maya/fines-brand/brand/';
const content = JSON.parse(fs.readFileSync('C:/Users/maya/fines-brand/_brief/content.json', 'utf8'));
export const SV = content.services.items; // bot, crm, web, int
const svc = k => SV.find(s => s.kind === k);

export const rgb = h => { const n = parseInt(h.slice(1), 16); return `${n >> 16}, ${(n >> 8) & 255}, ${n & 255}` };
export const f = x => `style="fill:${x}"`;
export const s = (x, w, extra = '') => `style="fill:none;stroke:${x};stroke-width:${w};${extra}"`;
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// ---------- иконки: общая геометрия, разный характер ----------
const IC = {
  bot: { t: 'Telegram-бот', d: '<rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 8V4.5"/><path d="M9 13.5h.01M15 13.5h.01"/>', dot: [12, 3.5] },
  crm: { t: 'CRM', d: '<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 10h16M9 10v9"/>', dot: [14.5, 14.5] },
  web: { t: 'Веб-сервис', d: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18"/><path d="M8 13h8M8 16h5"/>', dot: [6, 7] },
  int: { t: 'Интеграции', d: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H14a4 4 0 0 1 4 4v5.5M15.5 18H10a4 4 0 0 1-4-4V8.5"/>', dot: [12, 12] },
  price: { t: 'Фиксированная цена', d: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>', dot: [17.5, 19.5] },
  time: { t: 'Сроки в договоре', d: '<rect x="4" y="6" width="16" height="14" rx="2"/><path d="M4 10h16M8 4v4M16 4v4"/>', dot: [15, 15] },
  key: { t: 'Код остаётся у вас', d: '<circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l2 2M14 9l2 2"/>', dot: [8, 15] },
  help: { t: 'Поддержка', d: '<path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8l-4 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/><path d="M9 11l2 2 4-4"/>', dot: [19.5, 5.5] },
};
export function icon(k, st) {
  const i = IC[k];
  const [dx, dy] = i.dot;
  let under = '';
  if (st.mode === 'blueprint') under = `<path d="M0 12h24M12 0v24" style="stroke:var(--ic-guide);stroke-width:.35;stroke-dasharray:1 1"/>`;
  if (st.mode === 'blob') under = `<path d="M5 3c5-2 13-1 16 4s1 13-5 15-13 0-15-6 0-11 4-13z" style="fill:var(--ic-blob);stroke:none"/>`;
  if (st.mode === 'ring') under = `<circle cx="12" cy="12" r="11.4" style="fill:none;stroke:var(--ic-guide);stroke-width:.4"/>`;
  const dot = st.dot === false ? '' : `<circle cx="${dx}" cy="${dy}" r="${st.dr || 1.6}" style="fill:var(--acc);stroke:${st.mode === 'sticker' ? 'var(--ink)' : 'none'};stroke-width:${st.mode === 'sticker' ? 1 : 0}"/>`;
  const sh = st.mode === 'sticker' ? `<g transform="translate(1.2 1.2)" style="stroke:var(--ink);opacity:.9" stroke-width="${st.sw}">${i.d}</g>` : '';
  const pad = st.pad || 0;
  return `<svg class="ic ic-${st.mode}" viewBox="${-pad} ${-pad} ${24 + 2 * pad} ${24 + 2 * pad}" aria-hidden="true">${under}${sh}<g style="fill:${st.fill || 'none'};stroke:currentColor;stroke-width:${st.sw};stroke-linecap:${st.cap};stroke-linejoin:${st.join}">${i.d}</g>${dot}</svg>`;
}

// ---------- логотип ----------
export const wm = (cls = '') => `<span class="logo ${cls}"><span class="wm"><span class="w">финес</span><i class="d"></i></span><span class="st">студио</span></span>`;
const pageMark = (V, cls = '') => `<svg class="mk ${cls}" viewBox="0 0 64 64" aria-hidden="true">${V.mark({ bg: 'var(--m-bg)', m1: 'var(--m1)', m2: 'var(--m2)', dot: 'var(--md)' })}</svg>`;
const hLogo = V => `<span class="hl">${pageMark(V)}${wm()}</span>`;
const vLogo = V => `<span class="vl">${pageMark(V)}${wm()}</span>`;

function ctxCss(V) {
  const o = [];
  const d0 = V.markSets.dark; o.push(`body{--m-bg:${d0.bg};--m1:${d0.m1};--m2:${d0.m2};--md:${d0.dot}}`);
  for (const [k, c] of Object.entries(V.markSets)) o.push(`.cx-${k}{--m-bg:${c.bg};--m1:${c.m1};--m2:${c.m2};--md:${c.dot}}`);
  return o.join('\n');
}

// ---------- шрифты ----------
function fontFaces(V) {
  const out = [];
  for (const fnt of V.fonts) for (const w of fnt.w) for (const sub of ['cyrillic', 'latin']) {
    const st = fnt.style || 'normal';
    const range = sub === 'cyrillic' ? 'U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116' : 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD,U+20BD';
    out.push(`@font-face{font-family:'${fnt.fam}';src:url(fonts/${fnt.id}-${sub}-${w}-${st}.woff2) format('woff2');font-weight:${w};font-style:${st};font-display:swap;unicode-range:${range}}`);
  }
  return out.join('\n');
}

const BASE = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{background:var(--bg);color:var(--fg);font-family:var(--bf);font-size:16px;line-height:1.55;overflow-x:hidden;-webkit-font-smoothing:antialiased}
a{color:inherit}
img,svg{display:block;max-width:100%}
h1,h2,h3{text-wrap:balance;font-weight:inherit}
p{text-wrap:pretty}
.wrap{max-width:1240px;margin:0 auto;padding:0 40px}
.skip{position:absolute;left:-999px}
.top{position:sticky;top:0;z-index:30;background:var(--bar,var(--bg));border-bottom:1px solid var(--line)}
.top .wrap{display:flex;align-items:center;gap:28px;height:62px}
.top .logo{font-size:26px;flex:none}
.top .st{font-size:10px}
#concept .g2>.card{align-self:start}
.top nav{display:flex;gap:20px;overflow-x:auto;scrollbar-width:none;font-size:13px;white-space:nowrap;margin-left:auto;min-width:0}
.top nav::-webkit-scrollbar{display:none}
.top nav a{text-decoration:none;color:var(--muted);padding:6px 0}
.top nav a:hover{color:var(--fg)}
.hero{padding:96px 0 80px}
.hero .ey{font-family:var(--cf);font-size:13px;color:var(--muted);letter-spacing:.06em}
.hero h1{font-family:var(--hf);margin:18px 0 22px}
.hero .lead{max-width:640px;font-size:19px;color:var(--fg2,var(--fg))}
.hero .big{margin-top:56px;display:flex;align-items:center;gap:40px;flex-wrap:wrap}
.hero .big .logo{font-size:clamp(64px,11vw,150px)}
.s{padding:96px 0;border-top:1px solid var(--line)}
.sh{display:grid;grid-template-columns:150px minmax(0,1fr);gap:24px;margin-bottom:48px;align-items:start}
.sh .no{font-family:var(--cf);font-size:13px;color:var(--acc-t,var(--acc));letter-spacing:.08em;padding-top:12px}
.sh h2{font-family:var(--hf);font-size:clamp(34px,4.6vw,60px);line-height:1.02}
.sh p{grid-column:2;color:var(--muted);max-width:640px;font-size:17px}
.sub{font-family:var(--cf);font-size:12px;letter-spacing:.08em;color:var(--muted);margin:44px 0 16px;text-transform:uppercase}
.g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
.g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
.g4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:28px;min-width:0}
.cap{font-family:var(--cf);font-size:12px;color:var(--muted);margin-top:12px;line-height:1.4}
.tone{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0 0}
.tone span{border:1px solid var(--line2,var(--line));border-radius:99px;padding:7px 16px;font-size:14px}
.phr{list-style:none;display:grid;gap:12px}
.phr li{padding:14px 18px;background:var(--card2,var(--card));border-radius:var(--r2,var(--r));font-size:16px;border:1px solid var(--line)}
.phr li b{display:block;font-family:var(--cf);font-size:11px;letter-spacing:.08em;color:var(--muted);font-weight:400;margin-bottom:4px;text-transform:uppercase}
.no-say li{opacity:.75;text-decoration:line-through;text-decoration-color:var(--acc)}
/* logo */
.logo{display:inline-flex;flex-direction:column;line-height:.86;font-size:48px}
.wm{display:inline-flex;align-items:baseline;white-space:nowrap}
.wm .w{font-family:var(--wf);font-weight:var(--ww,800);letter-spacing:var(--wls,-.05em)}
.wm .d{display:inline-block;width:.2em;height:.2em;border-radius:50%;background:var(--md,var(--acc));margin-left:.04em;flex:none}
.st{font-family:var(--sf,var(--wf));font-size:max(calc(var(--str,.3) * 1em),10px);letter-spacing:.1em;margin-top:.3em;color:var(--stc,var(--acc));font-weight:600}
.hl{display:inline-flex;align-items:center;gap:.32em;font-size:48px}
.hl .mk{width:1.5em;height:1.5em;flex:none}
.hl .logo{font-size:1em}
.vl{display:inline-flex;flex-direction:column;align-items:center;gap:.3em;font-size:44px}
.vl .mk{width:1.7em;height:1.7em}
.vl .logo{font-size:1em;align-items:center}
.tile{border-radius:var(--r);padding:44px 32px;display:flex;align-items:center;justify-content:center;min-height:220px;border:1px solid var(--line);min-width:0;overflow:hidden}
.tile.L{background:var(--light);color:var(--ink)}
.tile.D{background:var(--dark);color:var(--paper)}
.L .wm .w{color:var(--ink)} .D .wm .w{color:var(--paper)}
.tile .mk.big{width:150px;height:150px}
.sizes{display:flex;align-items:flex-end;gap:28px;flex-wrap:wrap}
.sizes figure{display:flex;flex-direction:column;align-items:center;gap:8px}
.sizes .mk{flex:none}
.tab{display:flex;align-items:center;gap:8px;background:var(--light);color:#333;border-radius:10px 10px 0 0;padding:9px 14px;width:max-content;max-width:100%;font:13px/1 system-ui,sans-serif;box-shadow:0 1px 0 #ddd}
.tab .mk{width:16px;height:16px}
.tgav{display:flex;align-items:center;gap:22px;flex-wrap:wrap}
.tgav .av{width:150px;height:150px;border-radius:50%;overflow:hidden;flex:none}
.tgav .av svg{width:100%;height:100%}
.chat{display:flex;align-items:center;gap:12px;background:#fff;color:#111;border-radius:14px;padding:10px 14px;min-width:0;font:14px/1.3 system-ui,sans-serif;box-shadow:0 1px 3px rgba(0,0,0,.12)}
.chat .av{width:46px;height:46px}
.chat small{color:#8a8a8a;display:block}
.dl{display:flex;gap:14px;flex-wrap:wrap;margin-top:18px;font-family:var(--cf);font-size:13px}
.dl a{color:var(--acc-t,var(--acc))}
.clear{position:relative;display:inline-flex;padding:var(--x,40px);outline:1px dashed var(--acc);background:repeating-linear-gradient(45deg,transparent 0 8px,color-mix(in srgb,var(--acc) 10%,transparent) 8px 9px)}
.clear>.hl{background:var(--light);font-size:44px;color:var(--ink)}
.clear .xl{position:absolute;font-family:var(--cf);font-size:11px;color:var(--acc-t,var(--acc))}
.minrow{display:flex;gap:36px;align-items:flex-end;flex-wrap:wrap}
.dont{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.dont figure{border:1px solid var(--line);border-radius:var(--r);overflow:hidden;background:var(--card);min-width:0}
.dont .pv{height:150px;display:flex;align-items:center;justify-content:center;background:var(--light);color:var(--ink);overflow:hidden;position:relative}
.dont .pv .hl{font-size:30px}
.dont .pv::after{content:'';position:absolute;inset:14px;background:linear-gradient(45deg,transparent calc(50% - 1.5px),#e5332a calc(50% - 1.5px),#e5332a calc(50% + 1.5px),transparent calc(50% + 1.5px));opacity:.85;pointer-events:none}
.dont figcaption{padding:12px 16px;font-size:14px}
.dont figcaption b{color:#e5332a;font-family:var(--cf);font-size:11px;letter-spacing:.06em;display:block;font-weight:600}
.dn1 .hl{transform:scaleX(1.6)}
.dn2 .hl{transform:rotate(-14deg)}
.dn3 .hl{--md:#2f9e44!important}
.dn3 .hl .mk{--md:#2f9e44}
.dn4 .hl{filter:drop-shadow(4px 5px 0 #7a5cff);}
.dn4 .w{background:linear-gradient(90deg,#ff3cac,#2b86c5);-webkit-background-clip:text;background-clip:text;color:transparent!important}
.dn5 .pv{background:repeating-linear-gradient(60deg,#ffcf3f 0 14px,#2b86c5 14px 28px,#ff3cac 28px 42px)!important}
.dn6 .w{color:transparent!important;-webkit-text-stroke:1.5px var(--ink)}
/* colors */
.pal{display:grid;grid-template-columns:repeat(var(--pn,5),minmax(0,1fr));gap:14px}
.sw{border-radius:var(--r);overflow:hidden;border:1px solid var(--line);background:var(--card);min-width:0}
.sw .c{height:150px;padding:14px;display:flex;align-items:flex-end;font-family:var(--cf);font-size:13px;font-weight:600;box-shadow:inset 0 0 0 1px rgba(127,127,127,.35)}
.tile.L .cap{color:#4a4a4a}.tile.D .cap{color:#c9c9c9}
.sw .t{padding:14px 16px;font-size:13px;line-height:1.5}
.sw .t b{display:block;font-size:16px;font-family:var(--hf2,var(--bf))}
.sw .t code{font-family:var(--cf);font-size:12px;color:var(--muted);display:block}
.ratio{display:flex;height:56px;border-radius:var(--r);overflow:hidden;margin-top:24px;border:1px solid var(--line)}
.ratio div{display:flex;align-items:center;padding:0 12px;font-family:var(--cf);font-size:12px;min-width:0;overflow:hidden;white-space:nowrap}
/* type */
.ty{display:grid;gap:0;border-top:1px solid var(--line)}
.ty .r{display:grid;grid-template-columns:230px minmax(0,1fr);gap:24px;padding:22px 0;border-bottom:1px solid var(--line);align-items:baseline}
.ty .m{font-family:var(--cf);font-size:12px;color:var(--muted);line-height:1.5}
.ty .m b{color:var(--fg);font-size:13px;display:block}
.fonts{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;margin-bottom:36px}
.fonts .card .aa{font-size:64px;line-height:1;margin-bottom:12px}
.fonts .card p{font-size:13px;color:var(--muted)}
/* identity */
.pat{height:260px;border-radius:var(--r);border:1px solid var(--line)}
.els{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.els figure{min-width:0}
.els .e{height:180px;border-radius:var(--r);background:var(--card);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;overflow:hidden}
.els .e svg{max-height:150px;width:auto}
.icons{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:12px}
.icons figure{display:flex;flex-direction:column;align-items:center;gap:10px;padding:18px 6px;border-radius:var(--r);background:var(--card);border:1px solid var(--line);min-width:0;text-align:center}
.icons .ic{width:52px;height:52px;color:var(--ic-c,var(--fg))}
.icons figcaption{font-size:12px;line-height:1.25;color:var(--muted)}
.bc{aspect-ratio:90/50;container-type:inline-size;border-radius:calc(var(--r)*.6);position:relative;overflow:hidden;box-shadow:var(--shadow,0 10px 30px rgba(0,0,0,.12))}
.bc .in{position:absolute;inset:0;padding:7cqw;display:flex;flex-direction:column;justify-content:space-between}
.bc .logo{font-size:12cqw}
.bc .hl{font-size:9cqw}
.bc .meta{font-size:3.4cqw;line-height:1.45;font-family:var(--bf)}
.bc .nm{font-family:var(--hf);font-size:5.4cqw;line-height:1.1}
.paper{aspect-ratio:210/297;container-type:inline-size;position:relative;overflow:hidden;box-shadow:var(--shadow,0 10px 30px rgba(0,0,0,.12));border-radius:4px}
.paper .in{position:absolute;inset:0;padding:9cqw 9cqw 7cqw;display:flex;flex-direction:column}
.paper .hl{font-size:6cqw}
.paper .k{font-family:var(--cf);font-size:2.7cqw;letter-spacing:.08em;text-transform:uppercase;opacity:.85}
.paper h4{font-family:var(--hf);font-size:9.5cqw;line-height:1;margin:4cqw 0 3cqw;font-weight:var(--hw,700)}
.paper p,.paper li{font-size:2.9cqw;line-height:1.5}
.paper .ln{height:1px;background:currentColor;opacity:.2;margin:2.6cqw 0}
.paper .ft{margin-top:auto;font-size:2.7cqw;display:flex;justify-content:space-between;gap:4cqw;opacity:.9}
.docs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;align-items:start}
.docs>figure{min-width:0}
.mail{border:1px solid var(--line);border-radius:var(--r);background:#fff;color:#222;padding:26px;font:14px/1.55 system-ui,sans-serif;max-width:620px}
.mail .sig{margin-top:18px;padding-top:16px;border-top:1px solid #e5e5e5;display:flex;gap:16px;align-items:center}
.mail .sig .mk{width:52px;height:52px;flex:none}
.mail .sig .logo{font-size:22px}
.mail .sig small{display:block;color:#777;font-size:12.5px;margin-top:6px;font-family:var(--bf)}
.merch{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.merch figure{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:20px;min-width:0}
.merch svg{width:100%;height:auto}
/* banners */
.bnrs{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:28px 24px;align-items:start}
.bnrs figure{min-width:0}
.f-st{grid-column:1/5;grid-row:1/3}
.f-sq{grid-column:5/10}
.f-mr{grid-column:10/13}
.f-wd{grid-column:5/13}
.f-tg{grid-column:1/9}
.f-lb{grid-column:1/13}
.f-note{grid-column:9/13;align-self:center}
.bn{position:relative;overflow:hidden;container-type:inline-size;border-radius:var(--br,0);background:var(--bnbg,var(--dark));color:var(--bnfg,var(--paper))}
.bn .in{position:absolute;inset:0;display:flex;flex-direction:column;z-index:2}
.bn .deco{position:absolute;z-index:1;pointer-events:none}
.bn .logo{font-size:5cqw}
.bn .ttl{font-family:var(--hf);line-height:.98;font-weight:var(--hw,700)}
.bn .pr{font-family:var(--pf,var(--hf));font-weight:var(--hw,700);white-space:nowrap}
.bn .cta{display:inline-flex;align-items:center;align-self:flex-start;background:var(--acc);color:var(--on-acc,#fff);border-radius:var(--btr,99px);font-weight:600;white-space:nowrap}
.bn .fn{opacity:.85}
.bn-sq{aspect-ratio:1/1}.bn-sq .in{padding:7cqw}.bn-sq .ttl{font-size:9.6cqw;margin-top:auto}.bn-sq .k{font-size:3cqw;margin-top:auto;font-family:var(--cf)}.bn-sq .row{display:flex;align-items:flex-end;justify-content:space-between;gap:3cqw;margin-top:5cqw}.bn-sq .pr{font-size:7.4cqw}.bn-sq .mt{font-size:3cqw;opacity:.8}.bn-sq .cta{font-size:3cqw;padding:2.2cqw 3.6cqw;margin-top:4cqw}.bn-sq .fn{font-size:max(2.2cqw,10.5px);margin-top:3cqw}
.bn-st{aspect-ratio:9/16}.bn-st .in{padding:9cqw 8cqw}.bn-st .logo{font-size:8cqw}.bn-st .ttl{font-size:10cqw;margin-top:10cqw;line-height:1.02}.bn-st ul{list-style:none;margin-top:auto;display:grid;gap:2.4cqw}.bn-st li{display:flex;justify-content:space-between;gap:3cqw;font-size:4.4cqw;padding-bottom:3cqw;border-bottom:1px solid color-mix(in srgb,currentColor 25%,transparent)}.bn-st li b{white-space:nowrap;font-weight:600}.bn-st .cta{font-size:4.6cqw;padding:3.4cqw 6cqw;margin-top:8cqw;align-self:stretch;justify-content:center}.bn-st .fn{font-size:max(2.8cqw,10.5px);margin-top:3cqw;text-align:center}
.bn-wd{aspect-ratio:1200/628}.bn-wd .in{padding:5.5cqw 6cqw;width:64%}.bn-wd .logo{font-size:3.4cqw}.bn-wd .ttl{font-size:5.2cqw;margin-top:auto}.bn-wd .sb{font-size:max(1.9cqw,11px);margin-top:1.6cqw;opacity:.85;max-width:50cqw}.bn-wd .row{display:flex;align-items:center;gap:3cqw;margin-top:2.6cqw}.bn-wd .pr{font-size:3.8cqw}.bn-wd .cta{font-size:2cqw;padding:1.6cqw 2.8cqw}.bn-wd .fn{font-size:max(1.4cqw,10.5px);margin-top:2cqw}
.bn-lb{aspect-ratio:728/90}.bn-lb .in{flex-direction:row;align-items:center;gap:3cqw;padding:0 2.6cqw}.bn-lb .logo{font-size:3.4cqw;flex:none}.bn-lb .ttl{font-size:2.5cqw;line-height:1.15;flex:1;min-width:0}.bn-lb .pr{font-size:3cqw}.bn-lb .cta{font-size:1.75cqw;padding:1.3cqw 2.2cqw;align-self:center}
.bn-mr{aspect-ratio:300/250}.bn-mr .in{padding:7cqw}.bn-mr .logo{font-size:7cqw}.bn-mr .ttl{font-size:10.5cqw;margin-top:auto;padding-top:4cqw}.bn-mr .pr{font-size:8.6cqw;margin-top:3cqw}.bn-mr .mt{font-size:4.4cqw;opacity:.8}.bn-mr .cta{font-size:4.6cqw;padding:2.6cqw 4.6cqw;margin-top:4cqw}
.bn-tg{aspect-ratio:16/9}.bn-tg .in{padding:6cqw;justify-content:center}.bn-tg .logo{font-size:9.6cqw}.bn-tg .tl{font-family:var(--hf);font-size:3.6cqw;margin-top:4cqw;max-width:62cqw;line-height:1.15}.bn-tg .chips{display:flex;gap:1.4cqw;margin-top:4cqw;flex-wrap:wrap}.bn-tg .chips span{font-size:1.8cqw;border:1px solid color-mix(in srgb,currentColor 40%,transparent);border-radius:var(--btr,99px);padding:.9cqw 1.8cqw}.bn-tg .hd{position:absolute;right:6cqw;bottom:5cqw;font-family:var(--cf);font-size:2cqw;z-index:3}
.fc{font-family:var(--cf);font-size:12px;color:var(--muted);margin-top:10px;display:flex;justify-content:space-between;gap:10px}
.fc b{color:var(--fg);font-weight:600}
/* promos */
.promo{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:40px;padding:40px 0;border-top:1px solid var(--line);align-items:start}
.promo:first-of-type{border-top:0}
.promo .pn{font-family:var(--cf);font-size:12px;color:var(--acc-t,var(--acc));letter-spacing:.08em}
.promo h3{font-family:var(--hf);font-size:clamp(28px,3vw,40px);line-height:1.05;margin:10px 0 14px}
.promo .of{font-size:18px;margin-bottom:18px}
.promo ul.cond{list-style:none;display:grid;gap:8px;margin-bottom:22px}
.promo ul.cond li{padding-left:22px;position:relative;font-size:15px}
.promo ul.cond li::before{content:'';position:absolute;left:2px;top:.62em;width:8px;height:8px;border-radius:50%;background:var(--acc)}
.post{background:var(--post-bg,#fff);color:#1b1b1b;border-radius:16px 16px 16px 4px;padding:16px 18px;font:15px/1.5 system-ui,-apple-system,'Segoe UI',sans-serif;box-shadow:0 1px 2px rgba(0,0,0,.15);max-width:560px;white-space:pre-line}
.post .ph{display:flex;align-items:center;gap:10px;margin-bottom:8px;font-weight:600;white-space:normal}
.post .ph svg{width:30px;height:30px;border-radius:50%}
.post .tm{display:block;text-align:right;color:#666;font-size:12px;margin-top:4px}
.postwrap{background:var(--chatbg,#d7e3ec);padding:18px;border-radius:var(--r)}
.note{display:inline-block;margin-top:16px;font-family:var(--cf);font-size:12px;padding:8px 12px;border:1px dashed var(--acc);color:var(--acc-t,var(--acc));border-radius:6px}
/* footer */
.foot{border-top:1px solid var(--line);padding:56px 0 40px;font-size:13px;color:var(--muted)}
.pager{display:grid;grid-template-columns:1fr auto 1fr;gap:16px;align-items:center;margin-bottom:36px;font-family:var(--cf);font-size:14px}
.pager a{text-decoration:none;color:var(--fg);padding:14px 0;display:block}
.pager a:hover{color:var(--acc-t,var(--acc))}
.pager a:last-child{text-align:right}
.pager .all{text-align:center;border:1px solid var(--line2,var(--line));border-radius:99px;padding:12px 22px}
.foot p{margin-top:8px;max-width:860px}
.mono-b .wm .w,.mono-b .st{color:#000!important}.mono-w .wm .w,.mono-w .st{color:#fff!important}
.mono-b .wm .d{background:#000!important;animation:none!important;box-shadow:none!important}.mono-w .wm .d{background:#fff!important;animation:none!important;box-shadow:none!important}
.merch .mt{font-family:var(--wf);font-weight:var(--ww,800);font-size:17px;letter-spacing:-.04em}
.t-h1,.t-h2,.t-h3{font-family:var(--hf);line-height:1.05}
.t-h1{font-size:clamp(40px,5.4vw,72px)}.t-h2{font-size:clamp(30px,3.6vw,46px)}.t-h3{font-size:26px}
.t-lead{font-size:20px;line-height:1.45}.t-body{font-size:16px;line-height:1.6;max-width:640px}.t-cap{font-family:var(--cf);font-size:12px;letter-spacing:.06em;color:var(--muted)}
.srule{margin-top:20px;padding-top:16px;border-top:1px solid var(--line);font-size:15px}
.srule b{display:block;font-family:var(--cf);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--acc-t,var(--acc));margin-bottom:4px}
.soc{margin-top:64px}
.socg{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:32px;align-items:start}
.thr{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
.soc .cap{font-size:15px;color:var(--fg2,var(--fg));max-width:760px;margin-top:10px}
.thr figure{min-width:0}
.bn.th{aspect-ratio:4/5}
.th .in{padding:10cqw 11cqw 9cqw 10cqw}
.th .ttl{overflow-wrap:normal}
.th .logo .st,.reel .logo .st{display:none}
.th .logo{font-size:9cqw}
.th .tn,.th .tf{font-family:var(--cf);font-size:max(6.4cqw,11px);opacity:1;font-weight:600}
.th .tn{margin-top:4cqw}
.th .tf{margin-top:auto}
.thc .ttl{font-size:9.6cqw;margin-top:auto;line-height:1.08}
.thc .tf{margin-top:6cqw}
.ths .tnum{font-family:var(--hf);font-weight:var(--hw,700);font-size:24cqw;line-height:.9;color:var(--tnum,var(--acc))}
.ths .ttl{font-size:8.6cqw;margin-top:auto;line-height:1.1}
.ths .tg{font-size:max(7cqw,12px);margin-top:5cqw;font-weight:600}
.ths .tf{margin-top:6cqw}
.bn.reel{aspect-ratio:9/16}
.reel .in{padding:9cqw 8cqw}
.reel .logo{font-size:8cqw}
.reel .ttl{font-size:11cqw;margin-top:10cqw;line-height:1.05}
.reel .rs{display:block;font-size:.55em;margin-top:4cqw;color:var(--tnum,var(--acc))}
.reel .rl{margin:8cqw 0 auto;padding:5cqw 4cqw 4cqw 11cqw;display:grid;gap:2.4cqw;font-size:5.4cqw;font-weight:600;border-top:1px solid currentColor}
.reel .in::after{content:"зона под интерфейс платформы";font-family:var(--cf);font-size:4.2cqw;opacity:.85;text-align:center;border:1px dashed currentColor;padding:7cqw 0;margin:4cqw -2cqw 0}
.reel .rl .more{list-style:none;margin-left:-7cqw;font-size:4.8cqw;color:var(--tnum,var(--acc))}
@media (max-width:1000px){.socg{grid-template-columns:minmax(0,1fr)}.reelf{max-width:320px}.thr{grid-template-columns:repeat(2,minmax(0,1fr))}}
@keyframes glow{0%,100%{box-shadow:0 0 0 0 rgba(242,80,28,0)}50%{box-shadow:0 0 16px 5px rgba(242,80,28,.8)}}
@media (max-width:1000px){
 .f-st,.f-sq,.f-mr,.f-wd,.f-tg,.f-lb,.f-note{grid-column:1/-1;grid-row:auto}
 .f-st{max-width:380px}
 .f-mr{max-width:380px}
 .icons{grid-template-columns:repeat(4,minmax(0,1fr))}
 .docs{grid-template-columns:repeat(2,minmax(0,1fr))} .docs .f-mail{grid-column:1/-1}
 .promo{grid-template-columns:minmax(0,1fr)}
 .promo .bn{max-width:520px}
 .pal{grid-template-columns:repeat(3,minmax(0,1fr))}
}
@media (max-width:700px){
 .wrap{padding:0 18px}
 .top nav{display:none}
 .hero{padding:56px 0 48px}
 .hero .lead{font-size:17px}
 .s{padding:64px 0}
 .sh{grid-template-columns:minmax(0,1fr);gap:10px;margin-bottom:32px}
 .sh p{grid-column:1}
 .sh .no{padding-top:0}
 .g2,.g3,.g4,.els,.merch,.dont{grid-template-columns:minmax(0,1fr)}
 .dont{grid-template-columns:repeat(2,minmax(0,1fr))}
 .dont .pv{height:110px}.dont .pv .hl{font-size:20px}
 .docs{grid-template-columns:minmax(0,1fr)} .docs .f-mail{grid-column:auto}
 .pal{grid-template-columns:repeat(2,minmax(0,1fr))}
 .ty .r{grid-template-columns:minmax(0,1fr);gap:8px}
 .tile{min-height:170px;padding:30px 18px}
 .tile .hl{font-size:30px}.tile .vl{font-size:30px}
 .tile .mk.big{width:110px;height:110px}
 .clear{--x:22px}.clear>.hl{font-size:26px}
 .pager{grid-template-columns:1fr 1fr}.pager .all{grid-column:1/-1;grid-row:1}
 .ratio div{font-size:10px;padding:0 6px}
 .f-wd,.f-tg,.f-lb{overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:4px}
 .f-wd .bn,.f-tg .bn{min-width:600px}.f-lb .bn{min-width:680px}
 .f-wd .fc,.f-tg .fc,.f-lb .fc{position:sticky;left:0;max-width:calc(100vw - 36px)}
}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}html{scroll-behavior:auto}}
`;

// ---------- секции ----------
const NAV = [['concept', 'Концепция'], ['mark', 'Знак'], ['logo', 'Логотип'], ['color', 'Цвет'], ['type', 'Шрифты'], ['identity', 'Айдентика'], ['banners', 'Баннеры'], ['promo', 'Акции']];

function secHead(V, i, title, p) {
  const no = V.secNo ? V.secNo(i) : String(i).padStart(2, '0');
  return `<div class="sh"><div class="no">${no}</div><div><h2>${title}</h2></div>${p ? `<p>${p}</p>` : ''}</div>`;
}

function concept(V) {
  return `<section class="s" id="concept"><div class="wrap">${secHead(V, 1, 'Концепция', V.idea)}
<div class="g2"><div class="card"><div class="sub" style="margin-top:0">Тон голоса</div><p style="font-size:18px">${V.voice}</p><div class="tone">${V.tone.map(t => `<span>${t}</span>`).join('')}</div><div class="srule"><b>Соцсети</b>${SOCIAL_RULE}</div></div>
<div><ul class="phr">${V.phrases.map(p => `<li><b>${p[0]}</b>${p[1]}</li>`).join('')}</ul>
<div class="sub">Так не говорим</div><ul class="phr no-say">${V.nosay.map(p => `<li>${p}</li>`).join('')}</ul></div></div></div></section>`;
}

function markSec(V) {
  const sz = [16, 32, 64];
  const row = cls => `<div class="sizes">${sz.map(n => `<figure><svg class="mk ${cls}" viewBox="0 0 64 64" width="${n}" height="${n}">${V.mark({ bg: 'var(--m-bg)', m1: 'var(--m1)', m2: 'var(--m2)', dot: 'var(--md)' })}</svg><span class="cap">${n}×${n}</span></figure>`).join('')}</div>`;
  return `<section class="s" id="mark"><div class="wrap">${secHead(V, 2, 'Короткий логотип', V.markIdea)}
<div class="g2"><div class="tile L cx-light">${pageMark(V, 'big')}</div><div class="tile D cx-dark">${pageMark(V, 'big')}</div></div>
<div class="sub">Размеры фавикона</div>
<div class="g2"><div class="tile L cx-light" style="min-height:150px">${row('')}</div><div class="tile D cx-dark" style="min-height:150px">${row('')}</div></div>
<div class="g2" style="margin-top:24px"><div class="card"><div class="sub" style="margin-top:0">Вкладка браузера</div><div class="tab cx-fav"><svg class="mk" viewBox="0 0 64 64">${V.mark({ bg: 'var(--m-bg)', m1: 'var(--m1)', m2: 'var(--m2)', dot: 'var(--md)' })}</svg>Финес Студио — IT-решения</div></div>
<div class="card"><div class="sub" style="margin-top:0">Аватар Telegram-канала</div><div class="tgav"><div class="av">${V.avatar('page')}</div><div class="chat"><div class="av" style="border-radius:50%;overflow:hidden;flex:none">${V.avatar('page')}</div><div><b>Финес Студио</b><small>${H} · ответ в течение рабочего дня</small></div></div></div></div></div>
<div class="dl"><a href="assets/mark-light.svg" download>mark-light.svg</a><a href="assets/mark-dark.svg" download>mark-dark.svg</a><a href="assets/favicon.svg" download>favicon.svg</a><a href="assets/avatar-telegram.svg" download>avatar-telegram.svg</a></div>
</div></section>`;
}

function logoSec(V) {
  const donts = [['dn1', 'Не растягивать и не сжимать'], ['dn2', 'Не поворачивать'], ['dn3', 'Не менять цвет точки'], ['dn4', 'Без теней и градиентов'], ['dn5', 'Не ставить на пёстрый фон'], ['dn6', 'Не превращать в контур']];
  return `<section class="s" id="logo"><div class="wrap">${secHead(V, 3, 'Полный логотип', V.logoIdea)}
<div class="sub" style="margin-top:0">Горизонтальная версия</div>
<div class="g2"><div class="tile L cx-light">${hLogo(V)}</div><div class="tile D cx-dark">${hLogo(V)}</div></div>
<div class="sub">Вертикальная версия</div>
<div class="g2"><div class="tile L cx-light">${vLogo(V)}</div><div class="tile D cx-dark">${vLogo(V)}</div></div>
<div class="sub">Монохром</div>
<div class="g2"><div class="tile L cx-monoB mono-b" style="background:#fff">${hLogo(V)}</div><div class="tile D cx-monoW mono-w" style="background:#000">${hLogo(V)}</div></div>
<div class="g2" style="margin-top:24px"><div class="card"><div class="sub" style="margin-top:0">Охранное поле</div><div style="overflow:hidden;padding:4px"><span class="clear cx-light">${hLogo(V)}<span class="xl" style="top:6px;left:50%">x</span><span class="xl" style="left:8px;top:50%">x</span></span></div><p class="cap">x = высота знака × 0,5. Внутри поля нет текста, краёв макета и других логотипов.</p></div>
<div class="card"><div class="sub" style="margin-top:0">Минимальный размер</div><div class="minrow cx-light"><figure><span class="hl" style="font-size:16px;background:var(--light);color:var(--ink);padding:8px">${pageMark(V)}${wm()}</span><p class="cap">полный — 96 px / 25 мм</p></figure><figure><svg class="mk" viewBox="0 0 64 64" width="16" height="16">${V.mark({ bg: 'var(--m-bg)', m1: 'var(--m1)', m2: 'var(--m2)', dot: 'var(--md)' })}</svg><p class="cap">знак — 16 px / 5 мм</p></figure></div><p class="cap">Меньше минимального размера используем только знак.</p></div></div>
<div class="sub">Так нельзя</div>
<div class="dont">${donts.map(([c, t], i) => `<figure class="${c}"><div class="pv cx-light">${hLogo(V)}</div><figcaption><b>НЕЛЬЗЯ · 0${i + 1}</b>${t}</figcaption></figure>`).join('')}</div>
</div></section>`;
}

function colorSec(V) {
  const pal = V.palette;
  return `<section class="s" id="color"><div class="wrap">${secHead(V, 4, 'Цвета', V.colorIdea)}
<div class="pal" style="--pn:${pal.length}">${pal.map(c => `<div class="sw"><div class="c" style="background:${c.hex};color:${c.on}">${c.p}%</div><div class="t"><b>${c.n}</b><code>HEX ${c.hex.toUpperCase()}</code><code>RGB ${rgb(c.hex)}</code>${c.role}</div></div>`).join('')}</div>
<div class="ratio">${pal.map(c => `<div style="flex:${c.p};background:${c.hex};color:${c.on}">${c.p}%</div>`).join('')}</div>
<p class="cap">Пропорции на типовой площади макета: фон, текст, акцент. ${V.colorNote || ''}</p>
</div></section>`;
}

function typeSec(V) {
  return `<section class="s" id="type"><div class="wrap">${secHead(V, 5, 'Типографика', V.typeIdea)}
<div class="fonts">${V.fonts.filter(x => !x.hide).map(x => `<div class="card"><div class="aa" style="font-family:'${x.fam}';font-weight:${x.w[x.w.length - 1]};font-style:${x.style || 'normal'}">Фф Aa</div><b>${x.fam}</b><p>${x.use}<br>Начертания: ${x.w.join(', ')}${x.style === 'italic' ? ' italic' : ''} · SIL Open Font License 1.1 · файлы woff2 лежат в assets/fonts</p></div>`).join('')}</div>
<div class="ty">${V.type.map(t => `<div class="r"><div class="m"><b>${t[0]}</b>${t[1]}</div><div class="${t[2]}">${t[3]}</div></div>`).join('')}</div>
</div></section>`;
}

const tee = (V, c) => `<svg viewBox="0 0 200 200" aria-label="Футболка"><path d="M62 28l20-8c4 10 32 10 36 0l20 8 34 24-16 30-16-8v104H60V74l-16 8-16-30z" style="fill:${c.tee};stroke:${c.teeS || 'rgba(0,0,0,.15)'};stroke-width:1.5;stroke-linejoin:round"/><path d="M82 20c4 10 32 10 36 0" style="fill:none;stroke:rgba(0,0,0,.18);stroke-width:2"/><svg x="84" y="62" width="32" height="32" viewBox="0 0 64 64">${V.mark(c.mk)}</svg><text x="100" y="116" text-anchor="middle" class="mt" style="fill:${c.txt}">финес</text></svg>`;
const mug = (V, c) => `<svg viewBox="0 0 200 200" aria-label="Кружка"><path d="M140 72h14a22 22 0 0 1 0 44h-14" style="fill:none;stroke:${c.mug};stroke-width:11"/><rect x="46" y="48" width="98" height="118" rx="12" style="fill:${c.mug}"/><rect x="46" y="48" width="98" height="10" rx="5" style="fill:rgba(0,0,0,.12)"/><svg x="71" y="74" width="48" height="48" viewBox="0 0 64 64">${V.mark(c.mk)}</svg><text x="95" y="146" text-anchor="middle" class="mt" style="fill:${c.txt}">финес</text><ellipse cx="95" cy="178" rx="56" ry="5" style="fill:rgba(0,0,0,.12)"/></svg>`;
const sticker = (V, c) => `<svg viewBox="0 0 200 200" aria-label="Стикер"><g transform="rotate(${c.rot || -8} 100 100)"><circle cx="100" cy="100" r="78" style="fill:#fff;filter:drop-shadow(0 4px 6px rgba(0,0,0,.2))"/><svg x="30" y="30" width="140" height="140" viewBox="0 0 64 64">${V.mark(c.mk)}</svg></g></svg>`;

function identity(V) {
  const ICK = Object.keys(IC);
  const ID = V.id;
  return `<section class="s" id="identity"><div class="wrap">${secHead(V, 6, 'Айдентика', V.idIdea)}
<div class="sub" style="margin-top:0">Паттерн</div><div class="pat" style="${V.patternCss}"></div><p class="cap">${V.patternNote}</p>
<div class="sub">Графические элементы</div>
<div class="els">${V.elements.map(e => `<figure><div class="e">${e[0]}</div><p class="cap">${e[1]}</p></figure>`).join('')}</div>
<div class="sub">Иконки · ${V.iconNote}</div>
<div class="icons">${ICK.map(k => `<figure>${icon(k, V.iconStyle)}<figcaption>${IC[k].t}</figcaption></figure>`).join('')}</div>
<div class="sub">Визитка</div>
<div class="g2"><figure><div class="bc bc-f">${ID.cardFront}</div><p class="cap">Лицо · 90×50 мм</p></figure><figure><div class="bc bc-b">${ID.cardBack}</div><p class="cap">Оборот · 90×50 мм</p></figure></div>
<div class="sub">Обложка КП и фирменный бланк</div>
<div class="docs"><figure><div class="paper kp">${ID.kp}</div><p class="cap">Обложка КП · A4</p></figure><figure><div class="paper blank">${ID.blank}</div><p class="cap">Бланк · A4</p></figure><figure class="f-mail"><div class="sub" style="margin-top:0">Подпись в email</div><div class="mail"><p>Добрый день!</p><p>Отправляем оценку по вашей задаче: стоимость и срок зафиксируем в договоре до старта работ.</p><div class="sig cx-light"><svg class="mk" viewBox="0 0 64 64">${V.mark({ bg: 'var(--m-bg)', m1: 'var(--m1)', m2: 'var(--m2)', dot: 'var(--md)' })}</svg><div>${wm('sigl')}<small>Telegram-боты · CRM · веб-сервисы · автоматизация<br><a href="${TG}" style="color:inherit">t.me/fines_studio</a> · ${H}</small></div></div></div></figure></div>
<div class="sub">Мерч</div>
<div class="merch"><figure>${tee(V, V.merch)}<p class="cap">Футболка · печать знака на груди</p></figure><figure>${mug(V, V.merch)}<p class="cap">Кружка · знак и слово</p></figure><figure>${sticker(V, V.merch)}<p class="cap">Стикер · вырубка по контуру</p></figure></div>
</div></section>`;
}

const nf = '<div class="fn">Цены — ориентир, не публичная оферта</div>';
function banners(V) {
  const b = { ...(V.bn || {}), ...(HL[V.n] || {}) };
  const bot = svc('bot'), crm = svc('crm'), web = svc('web'), int = svc('int');
  const d = k => (b.deco && b.deco[k]) || '';
  return `<section class="s" id="banners"><div class="wrap">${secHead(V, 7, 'Баннеры', V.bnIdea)}
<div class="bnrs">
<figure class="f-st"><div class="bn bn-st cx-dark">${d('st')}<div class="in">${wm()}<div class="ttl">${b.stTitle || 'Тонкая работа для вашего бизнеса.'}</div><ul>${SV.map(x => `<li><span>${x.title}</span><b>${x.price}</b></li>`).join('')}</ul><a class="cta" href="${TG}">Обсудить задачу · ${H}</a>${nf.replace('fn', 'fn')}</div></div><div class="fc"><b>1080×1920</b><span>сторис</span></div></figure>
<figure class="f-sq"><div class="bn bn-sq cx-dark">${d('sq')}<div class="in">${wm()}<div class="k">${bot.title} · ${bot.term}</div><div class="ttl">${b.sqTitle || 'Бот принимает заявки, пока вы работаете'}</div><div class="row"><div><div class="pr">${bot.price}</div><div class="mt">${b.sqSub || 'оценка бесплатная'}</div></div></div><a class="cta" href="${TG}">Написать ${H}</a>${nf}</div></div><div class="fc"><b>1080×1080</b><span>пост</span></div></figure>
<figure class="f-mr"><div class="bn bn-mr cx-dark">${d('mr')}<div class="in">${wm()}<div class="ttl">${b.mrTitle || web.title}</div><div class="pr">${web.price}</div><div class="mt">с телефона и компьютера</div><a class="cta" href="${TG}">Обсудить →</a></div></div><div class="fc"><b>300×250</b><span>веб-баннер</span></div></figure>
<figure class="f-wd"><div class="bn bn-wd cx-dark">${d('wd')}<div class="in">${wm()}<div class="ttl">${b.wdTitle || 'CRM под ваш процесс, а не наоборот'}</div><div class="sb">Клиенты, сделки, задачи и напоминания в одной системе. Цена фиксируется в договоре до старта.</div><div class="row"><div class="pr">${crm.price}</div><a class="cta" href="${TG}">Обсудить задачу</a></div>${nf}</div></div><div class="fc"><b>1200×628</b><span>соцсети / РСЯ</span></div></figure>
<figure class="f-tg"><div class="bn bn-tg cx-dark">${d('tg')}<div class="in">${wm()}<div class="tl">${b.tgTitle || 'Telegram-боты, CRM и веб-сервисы под процессы вашей компании'}</div><div class="chips"><span>два разработчика</span><span>без менеджеров</span><span>код остаётся у вас</span></div></div><div class="hd">${H}</div></div><div class="fc"><b>1280×720</b><span>обложка Telegram-канала / Avito</span></div></figure>
<div class="f-note card"><div class="sub" style="margin-top:0">Правила</div><p style="font-size:14px">${V.bnRules}</p></div>
<figure class="f-lb"><div class="bn bn-lb cx-dark">${d('lb')}<div class="in">${wm()}<div class="ttl">${b.lbTitle || int.title + ': сайт, CRM, таблицы, 1С и мессенджеры'}</div><div class="pr">${int.price}</div><a class="cta" href="${TG}">Написать</a></div></div><div class="fc"><b>728×90</b><span>веб-баннер</span></div></figure>
</div>${social(V)}</div></section>`;
}

const PROMO = [
  { id: 'eval', off: 'Опишите задачу своими словами — бесплатно назовём стоимость и срок.', cond: ['Оценка бесплатная и ни к чему не обязывает', 'Готовое ТЗ не нужно: уточняющие вопросы зададим сами', 'Ответ в Telegram в течение рабочего дня'], post: t => `${t}\n\nНапишите в ${H}, что нужно автоматизировать: запись, заявки, CRM, связку с 1С или таблицами. Своими словами, без ТЗ.\n\nРазберём задачу и бесплатно назовём стоимость и срок. Ни к чему не обязывает.` },
  { id: 'fix', off: 'Стоимость фиксируем в договоре до старта. Платите 50% перед началом и 50% после приёмки.', cond: ['Цена и срок закреплены в договоре', 'Новые функции — только с вашего согласия и отдельной оценкой', 'Оплата 50/50, крупные проекты делим на этапы'], post: t => `${t}\n\nСтоимость согласуем до старта и закрепляем в договоре. Доплат по ходу работы не будет.\n\nОплата: 50% перед стартом, 50% после приёмки. Промежуточные результаты показываем по ходу.\n\nОбсудить задачу: ${H}` },
  { id: 'own', off: 'Первый месяц после запуска исправляем ошибки бесплатно. Исходный код, доступы и инструкция — ваши.', cond: ['Месяц бесплатных исправлений после запуска', 'Передаём исходный код, доступы и инструкцию', 'Бот, CRM или сервис регистрируются на ваш аккаунт'], post: t => `${t}\n\nПосле запуска первый месяц бесплатно исправляем ошибки. Обучаем команду и оставляем инструкцию.\n\nИсходный код и доступы передаём вам: решение принадлежит вашей компании, а не студии.\n\nНаписать: ${H}` },
];
function social(V) {
  const T = THREAD, R = REEL;
  const card = (n, inner, cls = '') => `<div class="bn th ${cls} cx-dark">${inner}</div>`;
  return `<div class="soc" id="social"><div class="sub">Контент для соцсетей · концепт контента</div>
<div class="socg"><div><div class="thr">
<figure>${card(0, `<div class="in">${wm()}<div class="tn">ветка · 1/4</div><div class="ttl">${T.cover}</div><div class="tf">листайте →</div></div>`, 'thc')}</figure>
${T.steps.map((st, i) => `<figure>${card(i + 1, `<div class="in"><div class="tnum">${String(i + 1).padStart(2, '0')}</div><div class="ttl">${st[0]}</div><div class="tg">→ ${st[1]}</div><div class="tf">${i + 2}/4 · ${H}</div></div>`, 'ths')}</figure>`).join('')}
</div><div class="fc"><b>Threads · 1080×1350</b><span>обложка + карточки-продолжения</span></div>
<p class="cap">Обложка с числом и выгодой, в каждой карточке номер, шаг и строка «→ что вы получите». Полный список отдаём в комментариях или в Telegram ${H}. Другие темы: «5 страхов перед заказом CRM и честные ответы», «Почему бот не приносит заявок: 7 ошибок».</p></div>
<figure class="reelf"><div class="bn reel cx-dark"><div class="in">${wm()}<div class="ttl">${R.title}<span class="rs">${R.sub}</span></div><ol class="rl">${R.items.map(x => `<li>${x}</li>`).join('')}<li class="more">…ещё 15 — в комментариях</li></ol></div></div><div class="fc"><b>1080×1920</b><span>обложка рилса</span></div><p class="cap">Зона снизу — под список, который растёт по ходу ролика.</p></figure></div>
<span class="note">концепт контента, темы и формулировки согласовать с владельцем</span></div>`;
}

function promos(V) {
  return `<section class="s" id="promo"><div class="wrap">${secHead(V, 8, 'Рекламные акции', 'Три механики на реальных условиях работы студии. Каждая — оффер, условия, баннер и текст поста.')}
${PROMO.map((p, i) => { const m = V.promo[i]; return `<div class="promo"><div class="bn bn-sq cx-dark pb${i + 1}">${(V.bn.promoDeco || (() => ''))(i)}<div class="in">${wm()}<div class="k">${m.tag}</div><div class="ttl">${(HL[V.n] && HL[V.n].promo[i]) || m.head}</div><div class="mt" style="margin-top:3cqw;font-size:3.2cqw;opacity:.85">${m.sub}</div><a class="cta" href="${TG}">${m.cta} · ${H}</a></div></div>
<div><div class="pn">АКЦИЯ 0${i + 1}</div><h3>${m.name}</h3><p class="of">${p.off}</p><ul class="cond">${p.cond.map(c => `<li>${c}</li>`).join('')}</ul><div class="postwrap"><div class="post"><div class="ph">${V.avatar('page')}Финес Студио</div>${esc(p.post(m.postHead))}<span class="tm">канал ${H}</span></div></div><span class="note">концепт, условия согласовать с владельцем</span></div></div>`; }).join('')}
</div></section>`;
}

function footer(V) {
  const p = n => `v${String(n).padStart(2, '0')}`;
  const prev = V.n === 1 ? 20 : V.n - 1, next = V.n === 20 ? 1 : V.n + 1;
  return `<footer class="foot"><div class="wrap"><nav class="pager" aria-label="Варианты"><a href="../${p(prev)}/index.html">← пред. · ${p(prev)}</a><a class="all" href="../index.html">все варианты</a><a href="../${p(next)}/index.html">след. · ${p(next)} →</a></nav>
<p>Брендбук «Финес Студио» · вариант ${V.n} «${V.title}». Цены и сроки в макетах — из текущих материалов студии, ориентир, не публичная оферта (ст. 437 ГК РФ).</p>
<p>Шрифты: ${V.fonts.map(x => x.fam).filter((x, i, a) => a.indexOf(x) === i).join(', ')} — SIL Open Font License. Подключены локально, без внешних запросов.</p></div></footer>`;
}

export function build(V) {
  V.avatar ||= () => `<svg viewBox="0 0 64 64" aria-hidden="true">${V.mark(V.markSets.avatar || V.markSets.dark)}</svg>`;
  V.avatarFile ||= () => V.mark(V.markSets.avatar || V.markSets.dark);
  V.bn ||= {};
  const dir = ROOT + 'v' + V.n + '/';
  fs.mkdirSync(dir + 'assets', { recursive: true });
  const css = fontFaces(V) + '\n' + BASE + '\n' + ctxCss(V) + '\n' + V.css;
  fs.writeFileSync(dir + 'assets/style.css', css);
  const sets = V.markSets;
  const file = (c, size = 64) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">${V.mark(c)}</svg>`;
  fs.writeFileSync(dir + 'assets/mark-light.svg', file(sets.light, 256));
  fs.writeFileSync(dir + 'assets/mark-dark.svg', file(sets.dark, 256));
  fs.writeFileSync(dir + 'assets/favicon.svg', file(sets.fav || sets.dark));
  fs.writeFileSync(dir + 'assets/avatar-telegram.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="512" height="512">${V.avatarFile()}</svg>`);
  const html = `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Брендбук «Финес Студио» · ${V.n} ${V.title}</title>
<meta name="description" content="Вариант фирменного стиля Финес Студио: ${V.title}. Логотип, цвета, шрифты, айдентика, баннеры и акции.">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/style.css">
</head><body class="v${V.n}">
<header class="top"><div class="wrap"><a href="#top" style="text-decoration:none">${wm('cx-dark')}</a><nav>${NAV.map(([h, t]) => `<a href="#${h}">${t}</a>`).join('')}</nav></div></header>
<main id="top">
<section class="hero"><div class="wrap">${V.hero}</div></section>
${concept(V)}${markSec(V)}${logoSec(V)}${colorSec(V)}${typeSec(V)}${identity(V)}${banners(V)}${promos(V)}
</main>
${footer(V)}
</body></html>`;
  fs.writeFileSync(dir + 'index.html', html);
  return dir;
}
export { wm as wordmark, pageMark, hLogo, vLogo };
