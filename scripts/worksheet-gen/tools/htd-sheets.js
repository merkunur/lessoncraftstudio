#!/usr/bin/env node
/**
 * htd-sheets.js — contact sheets of the How-to-Draw lessons (nt2-G / b7): one row per drawing (every step, the full
 * drawing, the simple-shapes guide), 4 drawings per sheet, for the human read that decides refusals + overrides
 * (data/htd/review.js).   node tools/htd-sheets.js [--only=slug,slug] [--out=dir] [--per=4]
 */
'use strict';
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const Hd = require('../lib/htd-steps.js');
const DIR = path.join(__dirname, '..', 'data', 'htd');
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };
const only = arg('only') ? new Set(arg('only').split(',')) : null;
const out = arg('out') || path.join(process.env.TEMP || '/tmp', 'spl', 'htd-sheets'); fs.mkdirSync(out, { recursive: true });
const PER = +(arg('per') || 4), CW = 190, CH = Math.round(CW * 560 / 600), PAD = 6, CAP = 16;
const caption = (t, w) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${CAP}"><text x="2" y="12" font-family="Arial" font-size="11" fill="#333">${t.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text></svg>`);
(async () => {
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.json')).sort().filter((f) => !only || only.has(f.replace(/\.json$/, '')));
  for (let p = 0; p < files.length; p += PER) {
    const batch = files.slice(p, p + PER);
    const comp = []; const cols = 8;
    for (let r = 0; r < batch.length; r++) {
      const S = JSON.parse(fs.readFileSync(path.join(DIR, batch[r]), 'utf8'));
      const cells = [];
      for (let k = 0; k < S.steps.length; k++) cells.push({ svg: Hd.stepSvg(S, k, { width: CW }), cap: `step ${k + 1} ${S.steps[k].kind} ${Math.round(S.steps[k].share * 100)}%` });
      cells.push({ svg: Hd.fullSvg(S, { width: CW }), cap: `${S.slug}${S.refused ? ' REFUSED' : ''}` });
      cells.push({ svg: Hd.stepSvg(S, 0, { width: CW, shapes: true }), cap: 'shapes ' + S.shapes.filter((x) => x.kind).map((x) => x.kind[0] + Math.round(x.coverage * 100)).join(' ') });
      for (let c = 0; c < cells.length && c < cols; c++) {
        comp.push({ input: await sharp(Buffer.from(cells[c].svg)).png().toBuffer(), left: c * (CW + PAD), top: r * (CH + CAP + PAD) });
        comp.push({ input: await sharp(caption(cells[c].cap, CW)).png().toBuffer(), left: c * (CW + PAD), top: r * (CH + CAP + PAD) + CH });
      }
    }
    const file = path.join(out, `sheet-${String(p / PER + 1).padStart(2, '0')}-${batch[0].replace(/\.json$/, '')}.png`);
    await sharp({ create: { width: cols * (CW + PAD), height: batch.length * (CH + CAP + PAD), channels: 3, background: '#fff' } }).composite(comp).png().toFile(file);
    console.log(file);
  }
})().catch((e) => { console.error(e); process.exit(1); });
