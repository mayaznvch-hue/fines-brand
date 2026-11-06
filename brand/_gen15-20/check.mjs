// Проверка брендбуков v15–v20 в headless Chrome: JS-ошибки, гор. скролл, шрифты, скриншоты (1440 и 390, полностраничные куски)
import { spawn } from 'child_process'; import fs from 'fs';
const DIR = 'C:/Users/maya/fines-brand/brand/';
const SC = 'C:/Users/maya/AppData/Local/hermes/cache/scratch/fines_brand_shots/';
fs.mkdirSync(SC, { recursive: true });
const port = 9500 + Math.floor(Math.random() * 90);
const ch = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', `--remote-debugging-port=${port}`, '--user-data-dir=C:/Users/maya/AppData/Local/hermes/cache/scratch/chbr' + port, '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms)); let ws;
for (let i = 0; i < 80; i++) { try { const l = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); const p = l.find(x => x.type === 'page'); if (p) { ws = p.webSocketDebuggerUrl; break } } catch { } await sleep(250) }
const s = new WebSocket(ws); await new Promise(r => s.onopen = r); let id = 0; const pend = {}; let errs = [];
s.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) pend[m.id](m); if (m.method === 'Runtime.exceptionThrown') errs.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text); if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') errs.push('log:' + m.params.entry.text + ' ' + (m.params.entry.url || '')) };
const cmd = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; s.send(JSON.stringify({ id: i, method, params })) });
const ev = async e => (await cmd('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true })).result.result?.value;
await cmd('Runtime.enable'); await cmd('Page.enable'); await cmd('Log.enable');
const vs = (process.argv[2] || '15,16,17,18,19,20').split(',');
const shots = process.argv.includes('--shots');
const probe = `(async()=>{await document.fonts.ready;const W=innerWidth;const sw=document.documentElement.scrollWidth;const off=[];document.querySelectorAll('body *').forEach(el=>{const r=el.getBoundingClientRect();if(r.right>W+1&&r.width>0){let p=el.parentElement,clip=false;while(p&&p!==document.body){const o=getComputedStyle(p).overflowX;if(o!=='visible'){clip=true;break}p=p.parentElement}if(!clip&&off.length<6)off.push(el.tagName+'.'+String(el.className.baseVal??el.className).split(' ')[0]+':'+Math.round(r.right))}});
const fl=[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family.replace(/"/g,'')+' '+f.weight);
const fe=[...document.fonts].filter(f=>f.status==='error').map(f=>f.family+' '+f.weight);
/* текст, вылезающий из своих баннеров/карточек */
const ov=[];document.querySelectorAll('.bn .in>:not(svg), .bc .in>:not(svg), .paper .in>:not(svg)').forEach(el=>{const box=el.closest('.bn,.bc,.paper').getBoundingClientRect();const r=el.getBoundingClientRect();if(r.width&&(r.right>box.right+1||r.bottom>box.bottom+1||r.left<box.left-1)&&ov.length<10)ov.push((el.closest('.bn,.bc,.paper').className)+' > '+el.className+' '+Math.round(r.right-box.right)+'/'+Math.round(r.bottom-box.bottom))});
const sec=document.querySelectorAll('section').length;
return {sw,W,h:document.documentElement.scrollHeight,sec,fl:[...new Set(fl)],fe,ov,off,note:document.querySelectorAll('.note').length}})()`;
for (const v of vs) {
  for (const [w, h] of [[1440, 1000], [390, 844]]) {
    errs = [];
    await cmd('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 500 });
    await cmd('Page.navigate', { url: `file:///${DIR}v${v}/index.html` }); await sleep(1500);
    const r = await ev(probe);
    const prob = [];
    if (r.sw > r.W) prob.push(`hscroll ${r.sw} ${r.off.join(',')}`);
    if (errs.length) prob.push('errs ' + errs.join(' | ').slice(0, 300));
    if (r.fe.length) prob.push('font-errors ' + r.fe.join(','));
    if (r.ov.length) prob.push('overflow ' + r.ov.join(' ; '));
    console.log(`v${v} @${w} h=${r.h} sec=${r.sec} notes=${r.note} fonts=[${r.fl.join(', ')}]`, prob.length ? '\n   PROBLEMS: ' + prob.join('\n   ') : 'ok');
    if (shots) {
      const step = w > 500 ? 2000 : 2400; const n = Math.ceil(r.h / step);
      await cmd('Emulation.setDeviceMetricsOverride', { width: w, height: r.h, deviceScaleFactor: 1, mobile: w < 500 });
      await sleep(400);
      for (let i = 0; i < n; i++) {
        const sh = await cmd('Page.captureScreenshot', { format: 'jpeg', quality: 72, captureBeyondViewport: true, clip: { x: 0, y: i * step, width: w, height: Math.min(step, r.h - i * step), scale: 1 } });
        fs.writeFileSync(`${SC}v${v}_${w}_${String(i).padStart(2, '0')}.jpg`, Buffer.from(sh.result.data, 'base64'));
      }
    }
  }
}
s.close(); ch.kill(); process.exit(0);
