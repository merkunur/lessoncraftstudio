#!/usr/bin/env node
/**
 * cbn-lineart-sheets.js — contact sheets of every B&W library drawing AS A COLOR BY NUMBER would see it: each closed
 * part filled with its own flat colour (lib/cbn-lineart.js segment), so leaks (a part that ran into the paper) and
 * crumbs show at a glance. Cell caption: theme/noun · numberable parts. Writes $TEMP/spl/la/sheet-NN.png + index.json.
 *   node tools/cbn-lineart-sheets.js [--per=40]
 */
'use strict';
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const L = require('../lib/cbn-lineart.js');
const ROOT = path.join(__dirname, '..', 'cache', 'themes');
const OUT = path.join(process.env.TEMP || '/tmp', 'spl', 'la');
const per = +((process.argv.find((a) => a.startsWith('--per=')) || '--per=40').split('=')[1]);
const COLS = ['#EE4B42', '#FF9A2E', '#FFD93B', '#A6DB7A', '#43A852', '#9ED8F5', '#3D86D9', '#9B6BD3', '#F7A1C4', '#A0673F', '#A8AFB8'];
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const dirs = fs.readdirSync(ROOT).filter((d) => /bw(\s+\d+)?$/i.test(d)).sort();
  const items = [];
  for (const d of dirs) for (const f of fs.readdirSync(path.join(ROOT, d)).filter((x) => x.endsWith('.webp')).sort()) items.push({ theme: d, file: f });
  const index = [];
  const S = 400, cell = 220;
  for (let s = 0; s * per < items.length; s++) {
    const chunk = items.slice(s * per, (s + 1) * per);
    const comps = [];
    for (let i = 0; i < chunk.length; i++) {
      const it = chunk[i];
      const src = await sharp(path.join(ROOT, it.theme, it.file)).resize(S - 20, S - 20, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
      const { data } = await sharp({ create: { width: S, height: S, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } } }).composite([{ input: src, left: 10, top: 10 }]).raw().toBuffer({ resolveWithObject: true });
      const ink = L.inkMask(data, S, S); const block = L.dilate(ink, S, S, 1); const { lab, comps: cs } = L.components(block, S, S);
      const big = cs.filter((c) => !c.edge && c.area >= 300);
      const out = Buffer.alloc(S * S * 3, 255);
      const colOf = new Map(); cs.forEach((c, k) => { if (!c.edge) colOf.set(c.label, COLS[k % COLS.length]); });
      for (let p = 0; p < S * S; p++) {
        let rgb = [255, 255, 255];
        if (ink[p]) rgb = [30, 30, 30];
        else if (lab[p] && colOf.has(lab[p])) { const h = colOf.get(lab[p]); rgb = [1, 3, 5].map((o) => parseInt(h.slice(o, o + 2), 16)); }
        out[p * 3] = rgb[0]; out[p * 3 + 1] = rgb[1]; out[p * 3 + 2] = rgb[2];
      }
      const noun = it.file.replace(/@3x\.webp$/, '');
      const id = `${it.theme}/${noun}`;
      index.push({ sheet: s + 1, cell: i + 1, id, parts: big.length });
      const img = await sharp(out, { raw: { width: S, height: S, channels: 3 } }).resize(cell, cell).png().toBuffer();
      const cap = Buffer.from(`<svg width="${cell}" height="34"><rect width="100%" height="100%" fill="#fff"/><text x="4" y="13" font-size="12" font-family="Arial" font-weight="bold">${i + 1}. ${noun}</text><text x="4" y="29" font-size="11" font-family="Arial">${it.theme} · ${big.length}p</text></svg>`);
      comps.push({ input: img, left: (i % 8) * cell, top: Math.floor(i / 8) * (cell + 34) });
      comps.push({ input: cap, left: (i % 8) * cell, top: Math.floor(i / 8) * (cell + 34) + cell });
    }
    const rows = Math.ceil(chunk.length / 8);
    await sharp({ create: { width: 8 * cell, height: rows * (cell + 34), channels: 3, background: '#fff' } }).composite(comps).png().toFile(path.join(OUT, `sheet-${String(s + 1).padStart(2, '0')}.png`));
    process.stdout.write(`sheet ${s + 1} `);
  }
  fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify(index, null, 1));
  console.log(`\n${items.length} drawings → ${OUT}`);
})();
