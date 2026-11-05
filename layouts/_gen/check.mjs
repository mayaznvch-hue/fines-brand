// Прогон макетов в headless Chrome: ошибки JS, горизонтальный скролл, скриншоты
import { spawn } from 'child_process'; import fs from 'fs';
const DIR = 'C:/Users/maya/fines-brand/layouts/';
const SC = 'C:/Users/maya/AppData/Local/hermes/cache/scratch/fines_shots/';
fs.mkdirSync(SC, { recursive: true });
const port = 9400 + Math.floor(Math.random() * 90);
const ch = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', `--remote-debugging-port=${port}`, '--user-data-dir=C:/Users/maya/AppData/Local/hermes/cache/scratch/chfin' + port, '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms)); let ws;
for (let i = 0; i < 80; i++) { try { const l = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); const p = l.find(x => x.type === 'page'); if (p) { ws = p.webSocketDebuggerUrl; break } } catch { } await sleep(250) }
const s = new WebSocket(ws); await new Promise(r => s.onopen = r); let id = 0; const pend = {}; let errs = [];
s.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) pend[m.id](m); if (m.method === 'Runtime.exceptionThrown') errs.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text); if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error' && !/fonts\.g/.test(m.params.entry.url || '')) errs.push('log:' + m.params.entry.text) };
const cmd = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; s.send(JSON.stringify({ id: i, method, params })) });
const ev = async e => (await cmd('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true })).result.result?.value;
await cmd('Runtime.enable'); await cmd('Page.enable'); await cmd('Log.enable');
const only = process.argv[2] ? process.argv[2].split(',').map(Number) : null;
const mob = process.argv.includes('--mshot');
const files = fs.readdirSync(DIR).filter(f => /^\d\d\.html$/.test(f)).filter(f => !only || only.includes(+f.slice(0, 2))).sort();
const report = [];
const probe = `(()=>{const W=innerWidth;const sw=document.documentElement.scrollWidth;const off=[];if(sw>W){document.querySelectorAll('body *').forEach(el=>{const r=el.getBoundingClientRect();if(r.right>W+1&&r.width>0){let p=el.parentElement,clip=false;while(p&&p!==document.body){const o=getComputedStyle(p).overflowX;if(o!=='visible'){clip=true;break}p=p.parentElement}if(!clip&&off.length<6)off.push((el.className&&el.className.baseVal===undefined?el.tagName+'.'+String(el.className).split(' ')[0]:el.tagName)+':'+Math.round(r.right))}})}return {sw,W,h:document.documentElement.scrollHeight,sec:document.querySelectorAll('section').length,badge:!!document.querySelector('.mkbadge'),logo:!!document.querySelector('.flogo'),lorem:/lorem/i.test(document.body.innerText),finess:/Финесс/.test(document.body.innerText),off}})()`;
for (const f of files) {
  const row = { f };
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    errs = [];
    await cmd('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 500 });
    await cmd('Page.navigate', { url: 'file:///' + DIR + f }); await sleep(w > 500 ? 1700 : 1100);
    await ev(`document.querySelectorAll('.rv').forEach(e=>e.classList.add('in'))`);
    const r = await ev(probe);
    row[w] = { ...r, errs: [...errs] };
    if (w > 500 || mob) { await ev('scrollTo(0,0)'); await sleep(300); const sh = await cmd('Page.captureScreenshot', { format: 'jpeg', quality: 70 }); fs.writeFileSync(SC + f.replace('.html', w > 500 ? '_d.jpg' : '_m.jpg'), Buffer.from(sh.result.data, 'base64')) }
  }
  const prob = [];
  for (const w of [1440, 390]) { const r = row[w]; if (r.sw > r.W) prob.push(`${w}:hscroll ${r.sw} ${r.off.join(',')}`); if (r.errs.length) prob.push(`${w}:js ${r.errs.join(' | ').slice(0, 200)}`); }
  const r = row[1440]; if (!r.badge) prob.push('no badge'); if (!r.logo) prob.push('no logo'); if (r.lorem) prob.push('lorem'); if (r.finess) prob.push('Финесс!'); if (r.sec < 5) prob.push('sections ' + r.sec);
  report.push({ f, sec: r.sec, h: r.h, prob });
  console.log(f, 'sec=' + r.sec, 'h=' + r.h, prob.length ? 'PROBLEMS: ' + prob.join(' ; ') : 'ok');
}
fs.writeFileSync(SC + 'report.json', JSON.stringify(report, null, 1));
console.log('files', report.length, 'with problems', report.filter(x => x.prob.length).length);
s.close(); ch.kill(); process.exit(0);
