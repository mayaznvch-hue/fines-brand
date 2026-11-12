// Снимки и проверки вёрстки: node shots.mjs <outDir>
// Chrome запускается сам (headless), страницы открываются с диска.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const out = path.resolve(process.argv[2] || '.');
mkdirSync(out, { recursive: true });
const root = path.resolve(import.meta.dirname, '..', 'sites');
const CH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const port = 9333;
const chrome = spawn(CH, ['--headless=new', '--disable-gpu', '--no-first-run', `--remote-debugging-port=${port}`,
  `--user-data-dir=${path.join(out, 'prof')}`, '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function target() {
  for (let i = 0; i < 40; i++) {
    try {
      const l = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
      const p = l.find((x) => x.type === 'page');
      if (p) return p.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error('chrome not up');
}
const ws = new WebSocket(await target());
await new Promise((r) => (ws.onopen = r));
let id = 0; const pend = new Map(); const logs = [];
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); }
  if (d.method === 'Runtime.exceptionThrown') logs.push('EXC ' + JSON.stringify(d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text));
  if (d.method === 'Log.entryAdded' && ['error', 'warning'].includes(d.params.entry.level)) logs.push(d.params.entry.level + ' ' + d.params.entry.text + ' ' + (d.params.entry.url || ''));
};
const cdp = (method, params = {}) => new Promise((res) => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expression) => (await cdp('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result?.result?.value;
await cdp('Page.enable'); await cdp('Runtime.enable'); await cdp('Log.enable');

const CHECK = `(() => {
  const de = document.documentElement, vw = de.clientWidth, r = { vw, sw: de.scrollWidth, over: [], small: [], clip: [] };
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const b = el.getBoundingClientRect(); if (!b.width || !b.height) continue;
    if (el.closest('.hp,.vh,.skip,.art,.sun,.ring') || el.name === 'agree') continue;
    if (b.right > vw + 1 || b.left < -1) r.over.push(el.tagName + '.' + el.className + ' ' + Math.round(b.left) + '..' + Math.round(b.right));
    if (el.matches('a,button,summary,input') && (b.height < 44 || b.width < 44)) r.small.push(el.tagName + '.' + el.className + ' "' + el.textContent.trim().slice(0, 24) + '" ' + Math.round(b.width) + 'x' + Math.round(b.height));
    if (el.children.length === 0 && el.scrollWidth > el.clientWidth + 1 && cs.overflow !== 'visible') r.clip.push(el.tagName + '.' + el.className);
  }
  r.over = r.over.slice(0, 8); r.fonts = [...document.fonts].filter(f => f.status === 'loaded').length;
  r.h = de.scrollHeight;
  return JSON.stringify(r);
})()`;

async function shot(name, clip) {
  const p = { format: 'png' };
  if (clip) { p.clip = { ...clip, scale: 1 }; p.captureBeyondViewport = true; }
  const r = await cdp('Page.captureScreenshot', p);
  writeFileSync(path.join(out, name + '.png'), Buffer.from(r.result.data, 'base64'));
}

for (const site of ['alfa', 'rocket']) {
  for (const [w, h, tag] of [[1440, 900, 'd'], [390, 844, 'm'], [1024, 768, 't']]) {
    await cdp('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: tag === 'm' });
    const url = pathToFileURL(path.join(root, site, 'index.html')).href;
    await cdp('Page.navigate', { url });
    await sleep(700);
    await ev(`localStorage.removeItem('fines-consent');1`);
    await cdp('Page.navigate', { url });
    await sleep(1500);
    await ev(`document.fonts.ready.then(()=>1)`);
    await ev(`document.querySelectorAll('.rv').forEach(e=>e.classList.add('in'));1`);
    await sleep(900);
    await shot(`${site}_${tag}_consent`);
    console.log(site, tag, 'consent', await ev(`(async()=>{const k=document.getElementById('ck'),o={shown:!k.hidden};const b=k.getBoundingClientRect();o.box=[Math.round(b.left),Math.round(b.top),Math.round(b.width),Math.round(b.height)];k.querySelector('[data-consent=necessary]').click();o.hiddenAfter=k.hidden;o.saved=JSON.parse(localStorage.getItem('fines-consent')).choice;document.querySelector('.ftr-links [data-consent-open]').click();o.reopened=!k.hidden;k.querySelector('[data-consent=all]').click();o.saved2=window.finesConsent.get().choice;return JSON.stringify(o)})()`));
    await cdp('Page.navigate', { url });
    await sleep(1200);
    await ev(`document.querySelectorAll('.rv').forEach(e=>e.classList.add('in'));1`);
    await sleep(700);
    console.log(site, tag, 'afterReload ckHidden=' + await ev(`document.getElementById('ck').hidden`));
    console.log(site, tag, await ev(CHECK));
    await shot(`${site}_${tag}_hero`);
    if (tag === 't') continue;
    const H = await ev('document.documentElement.scrollHeight');
    const step = tag === 'd' ? 2400 : 2600;
    for (let y = 0, n = 1; y < H; y += step, n++) await shot(`${site}_${tag}_${n}`, { x: 0, y, width: w, height: Math.min(step, H - y) });
    if (tag === 'd' || tag === 'm') {
      // прогон квиза и форм
      const res = await ev(`(async () => {
        const w = ms => new Promise(r => setTimeout(r, ms)); const o = {};
        window.__opened = []; const oc = HTMLAnchorElement.prototype.click;
        HTMLAnchorElement.prototype.click = function () { if (this.target === '_blank') window.__opened.push(this.href); else oc.call(this); };
        for (let i = 0; i < 4; i++) { document.querySelector('.q-step:not([hidden]) .opt').click(); await w(260); }
        o.resVisible = !document.getElementById('qRes').hidden; o.rec = document.getElementById('qRec').textContent + ' | ' + document.getElementById('qPrice').textContent;
        o.sum = document.getElementById('qSum').children.length; o.count = document.getElementById('qCount').textContent;
        document.getElementById('qNote').value = 'тест <b>&?# заявка';
        document.getElementById('qSend').click(); await w(60);
        o.blockedQuiz = window.__opened.length === 0 && document.querySelector('#quiz .agree-e').textContent;
        document.querySelector('#quiz [name=agree]').click();
        document.getElementById('qSend').click(); document.getElementById('qSend').click(); await w(60);
        document.getElementById('leadTask').value = 'нужен бот для записи';
        document.querySelector('#lead button').click(); await w(60);
        o.blockedLead = window.__opened.length === 1 && document.querySelector('#lead .agree-e').textContent;
        window.__shotErr = 1;
        o.opened = window.__opened.map(u => decodeURIComponent(u));
        document.querySelector('.faq summary').click(); o.faqOpen = document.querySelector('.faq details').open;
        const b = document.getElementById('burger'); if (getComputedStyle(b).display !== 'none') { b.click(); o.menu = !document.getElementById('mnav').hidden; }
        return JSON.stringify(o);
      })()`);
      console.log(site, tag, 'flow', res);
      await sleep(300);
      { const c = JSON.parse(await ev(`(()=>{const r=document.getElementById('contact').getBoundingClientRect();return JSON.stringify({y:Math.round(r.top+scrollY),h:Math.round(r.height)})})()`)); await shot(`${site}_${tag}_leaderr`, { x: 0, y: c.y, width: w, height: c.h }); }
      console.log(site, tag, 'leadSend', await ev(`(async()=>{document.querySelector('#lead [name=agree]').click();document.querySelector('#lead button').click();await new Promise(r=>setTimeout(r,60));return window.__opened.length})()`));
      if (tag === 'm') await shot(`${site}_m_menu`);
      const q = await ev(`(()=>{const b=document.getElementById('burger');if(!document.getElementById('mnav').hidden)b.click();const r=document.getElementById('pick').getBoundingClientRect();return JSON.stringify({y:Math.round(r.top+scrollY),h:Math.round(r.height)})})()`);
      const { y, h: qh } = JSON.parse(q);
      await shot(`${site}_${tag}_quizres`, { x: 0, y, width: w, height: qh });
    }
  }
}
for (const site of ['alfa', 'rocket']) for (const [w, h, tag] of [[1440, 900, 'd'], [390, 844, 'm']]) {
  await cdp('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: tag === 'm' });
  await cdp('Page.navigate', { url: pathToFileURL(path.join(root, site, 'privacy.html')).href });
  await sleep(1300);
  console.log(site, tag, 'privacy', await ev(CHECK), 'links', await ev(`[...document.querySelectorAll('.nav a')].map(a=>a.getAttribute('href')).join(',')`));
  const H = await ev('document.documentElement.scrollHeight');
  await shot(`${site}_${tag}_privacy`, { x: 0, y: 0, width: w, height: Math.min(H, 2600) });
}
console.log('LOGS', JSON.stringify(logs.filter(l => !l.includes('CORS'))));
ws.close(); chrome.kill();
