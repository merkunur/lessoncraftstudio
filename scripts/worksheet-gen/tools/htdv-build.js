#!/usr/bin/env node
/**
 * htdv-build.js — compile the drawn How to Draw lessons (data/htdv/src/<key>.js → data/htdv/<key>.json) for the
 * dotted-shape pages, refusing any drawing that breaks a law (lib/htd-vector.js), and write a contact sheet per drawing
 * (out/htdv/<key>.png: every step card, the finished drawing, the dotted shapes over the pale drawing, the dotted shapes
 * alone) to be READ before any page is built from it.
 *   node tools/htdv-build.js [--only=cat,dog] [--no-sheet]
 */
'use strict';
const fs = require('fs'); const path = require('path');
const V = require('../lib/htd-vector.js');
const Hd = require('../lib/htd-steps.js');
const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'data', 'htdv', 'src'), OUT = path.join(ROOT, 'data', 'htdv'), SHEET = path.join(ROOT, 'out', 'htdv');
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=')[1] : null; };
const only = arg('only') ? new Set(arg('only').split(',')) : null;

function guideSvg(S, w, h, { pale = false, onlyMajor = false } = {}) {
  const vb = Hd.panelBox(S, { viewBox: 'bbox' });
  const g = S.shapes.filter((s) => !onlyMajor || s.major).map((s) => `<path d="${s.d}" fill="none" stroke="#5E574E" stroke-width="4" stroke-dasharray="14 10" stroke-linecap="round"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" width="${w}" height="${h}">${pale ? `<path d="${S.full}" fill="#EFE6D6"/>` : ''}${g}</svg>`;
}
async function sheet(key, S) {
  const sharp = require('sharp');
  const P = 260, gap = 14;
  const panels = [];
  for (let k = 0; k < S.steps.length; k++) panels.push(Hd.stepSvg(S, k, { width: P, height: P, viewBox: 'bbox', lastInInk: true }));
  panels.push(Hd.fullSvg(S, { width: P, height: P, viewBox: 'bbox' }));
  panels.push(guideSvg(S, P, P, { pale: true }));
  panels.push(guideSvg(S, P, P));
  panels.push(guideSvg(S, P, P, { onlyMajor: true }));
  const Wt = panels.length * (P + gap) + gap, Ht = P + 2 * gap + 22;
  const body = panels.map((p, i) => `<g transform="translate(${gap + i * (P + gap)} ${gap})"><rect width="${P}" height="${P}" fill="#fff" stroke="#ddd"/>${p.replace('<svg ', '<svg x="0" y="0" ')}</g>`).join('');
  const labels = ['step 1', 'step 2', 'step 3', 'step 4', 'step 5', 'step 6'].slice(0, S.steps.length).concat(['finished', 'dotted on pale', 'dotted', 'L3: 2 biggest']);
  const lab = labels.map((t, i) => `<text x="${gap + i * (P + gap) + 4}" y="${P + gap + 18}" font-family="sans-serif" font-size="14" fill="#555">${t}</text>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${Wt}" height="${Ht}"><rect width="${Wt}" height="${Ht}" fill="#F6F1E7"/>${body}${lab}</svg>`;
  fs.mkdirSync(SHEET, { recursive: true });
  await sharp(Buffer.from(svg)).png().toFile(path.join(SHEET, key + '.png'));
}
(async () => {
  const files = fs.readdirSync(SRC).filter((f) => f.endsWith('.js')).map((f) => f.slice(0, -3)).filter((k) => !only || only.has(k)).sort();
  let bad = 0;
  for (const key of files) {
    delete require.cache[require.resolve(path.join(SRC, key + '.js'))];
    const src = require(path.join(SRC, key + '.js'));
    const S = await V.compile(src, { report: true });
    const L = S.stats.laws;
    const line = `${key.padEnd(18)} steps ${S.steps.length} · guides ${L.guides.map((g) => `${g.id}:${g.shape} ${(g.share * 100).toFixed(0)}%vis ${(g.onInk * 100).toFixed(2)}%ink`).join(' | ')} · erase ${L.erase.join('/')}`;
    if (S.stats.fails.length) { bad++; console.log('FAIL ' + line + '\n     ' + S.stats.fails.join('\n     ')); }
    else { console.log('ok   ' + line); fs.writeFileSync(path.join(OUT, key + '.json'), JSON.stringify(S) + '\n'); }
    if (!process.argv.includes('--no-sheet')) await sheet(key, S);
  }
  console.log(files.length, 'drawings,', bad, 'refused');
  process.exit(bad ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
