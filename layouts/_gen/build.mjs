import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
const DIR = 'C:/Users/maya/fines-brand/layouts/';
const GEN = DIR + '_gen/';
const mods = fs.readdirSync(GEN).filter(f => /^m\d+\.mjs$/.test(f)).sort();
let all = [];
for (const m of mods) {
  const mod = await import(pathToFileURL(GEN + m).href + '?t=' + Date.now());
  all.push(...mod.default);
}
all.sort((a, b) => a.n - b.n);
const only = process.argv[2] ? process.argv[2].split(',').map(Number) : null;
for (const L of all) {
  if (only && !only.includes(L.n)) continue;
  const f = String(L.n).padStart(2, '0') + '.html';
  fs.writeFileSync(DIR + f, L.build(), 'utf8');
}
const list = all.map(L => ({ n: L.n, file: String(L.n).padStart(2, '0') + '.html', title: L.title, idea: L.idea }));
fs.writeFileSync(DIR + 'list.json', JSON.stringify(list, null, 2), 'utf8');
console.log('built', only ? only.join(',') : all.length, 'layouts; list has', list.length);
