#!/usr/bin/env node
/**
 * fd-sheets.js — contact sheets of the Find-the-Differences candidates (nt2-G / b7): per scene one PNG, the base
 * scene first, then every candidate's right-hand panel with its ring, captioned, so a human reads what each
 * difference looks like at print size. Refusals go to data/fd/review.js.
 *   node tools/fd-sheets.js [--only=id,id] [--mode=line|colour] [--out=dir]
 */
'use strict';
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const F = require('../lib/fd-scene.js');
const DIR = path.join(__dirname, '..', 'data', 'fd');
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };
const only = arg('only') ? new Set(arg('only').split(',')) : null;
const mode = arg('mode') || 'line';
const out = arg('out') || path.join(process.env.TEMP || '/tmp', 'spl', 'fd-sheets', mode); fs.mkdirSync(out, { recursive: true });
const CW = 300, CH = 280, PAD = 6, COLS = 4, CAP = 18;

function caption(text, w) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${CAP}"><text x="4" y="13" font-family="Arial" font-size="12" fill="#333">${text.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text></svg>`);
}
(async () => {
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.json')).sort();
  for (const f of files) {
    const sc = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
    if (only && !only.has(sc.id)) continue;
    const cands = sc.cands.filter((c) => mode === 'colour' || c.mode !== 'colour');
    const cells = [{ svg: F.renderPanel(sc, [], { mode, width: CW }), cap: `${sc.id} (${sc.theme}) base` }];
    cands.forEach((c, i) => {
      const ops = [c];
      cells.push({ svg: F.renderPanel(sc, ops, { mode, width: CW, rings: [c.bbox], clipId: 'c' + i }), cap: `${i}: ${c.kind}${c.src ? ' ' + c.src.split('/')[1] : ''}${c.s ? ' x' + c.s : ''}${c.dx ? ' dx' + c.dx : ''}${c.colour ? ' ' + c.colour : ''} item ${c.item} area ${c.area}` });
    });
    const comp = []; const rows = Math.ceil(cells.length / COLS);
    for (let i = 0; i < cells.length; i++) {
      const col = i % COLS, row = Math.floor(i / COLS);
      const png = await sharp(Buffer.from(cells[i].svg)).png().toBuffer();
      comp.push({ input: png, left: col * (CW + PAD), top: row * (CH + CAP + PAD) });
      comp.push({ input: await sharp(caption(cells[i].cap, CW)).png().toBuffer(), left: col * (CW + PAD), top: row * (CH + CAP + PAD) + CH });
    }
    const file = path.join(out, sc.id + '.png');
    await sharp({ create: { width: COLS * (CW + PAD), height: rows * (CH + CAP + PAD), channels: 3, background: '#fff' } }).composite(comp).png().toFile(file);
    console.log(file, cells.length - 1, 'candidates');
  }
})().catch((e) => { console.error(e); process.exit(1); });
