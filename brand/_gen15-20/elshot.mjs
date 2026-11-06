// Скриншоты отдельных блоков: node elshot.mjs 15,16 "#social,#banners" 1440
import { spawn } from 'child_process'; import fs from 'fs';
const DIR = 'C:/Users/maya/fines-brand/brand/', SC = 'C:/Users/maya/AppData/Local/hermes/cache/scratch/fines_brand_shots/el/';
fs.mkdirSync(SC, { recursive: true });
const port = 9600 + Math.floor(Math.random() * 90);
const ch = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', `--remote-debugging-port=${port}`, '--user-data-dir=C:/Users/maya/AppData/Local/hermes/cache/scratch/chel' + port, '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms)); let ws;
for (let i = 0; i < 80; i++) { try { const l = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); const p = l.find(x => x.type === 'page'); if (p) { ws = p.webSocketDebuggerUrl; break } } catch { } await sleep(250) }
const s = new WebSocket(ws); await new Promise(r => s.onopen = r); let id = 0; const pend = {};
s.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) pend[m.id](m) };
const cmd = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; s.send(JSON.stringify({ id: i, method, params })) });
await cmd('Page.enable');
const [vs, sels, ww] = [process.argv[2].split(','), process.argv[3].split(','), +(process.argv[4] || 1440)];
for (const v of vs) {
  await cmd('Emulation.setDeviceMetricsOverride', { width: ww, height: 900, deviceScaleFactor: 1, mobile: ww < 500 });
  await cmd('Page.navigate', { url: `file:///${DIR}v${v}/index.html` }); await sleep(1500);
  const H = (await cmd('Runtime.evaluate', { expression: 'document.documentElement.scrollHeight', returnByValue: true })).result.result.value;
  await cmd('Emulation.setDeviceMetricsOverride', { width: ww, height: H, deviceScaleFactor: 1, mobile: ww < 500 }); await sleep(500);
  for (const sel of sels) {
    const r = (await cmd('Runtime.evaluate', { expression: `(()=>{const e=document.querySelector('${sel}');if(!e)return null;const b=e.getBoundingClientRect();return {x:b.x,y:b.y+scrollY,w:b.width,h:b.height}})()`, returnByValue: true })).result.result.value;
    if (!r) { console.log(v, sel, 'missing'); continue }
    const h = Math.min(r.h, 2600);
    const sh = await cmd('Page.captureScreenshot', { format: 'jpeg', quality: 75, captureBeyondViewport: true, clip: { x: 0, y: r.y, width: ww, height: h, scale: 1 } });
    const f = `${SC}v${v}_${ww}_${sel.replace(/\W/g, '')}.jpg`; fs.writeFileSync(f, Buffer.from(sh.result.data, 'base64')); console.log(f, Math.round(h));
  }
}
s.close(); ch.kill(); process.exit(0);
