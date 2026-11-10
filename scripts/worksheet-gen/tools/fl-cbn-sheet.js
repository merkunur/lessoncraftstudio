#!/usr/bin/env node
/**
 * fl-cbn-sheet.js — read the painted library pictures: a contact sheet of the answer keys (docs/makers/FLAGSHIP.md).
 *   node tools/fl-cbn-sheet.js <from> <to> <out.png> [--bad] [--line]
 */
'use strict';
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const { build, clearCache } = require('../data/cbn/designs.js');
const R = require('../lib/cbn-render.js');
const DIR = path.join(__dirname, '..', 'data', 'fl', 'cbn');
const [from, to, out] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const bad = process.argv.includes('--bad'), line = process.argv.includes('--line');
(async () => {
  // --list=<file>: only these pictures (comma separated), in that order
  const listArg = (process.argv.find((a) => a.startsWith('--list=')) || '').slice(7);
  const all = listArg ? fs.readFileSync(listArg, 'utf8').split(',').map((s) => s.trim()).filter(Boolean) : fs.readdirSync(DIR).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5));
  const ids = all.filter((id) => { const d = JSON.parse(fs.readFileSync(path.join(DIR, id + '.json'), 'utf8')); return bad ? !d.ok : d.ok; });
  if (!listArg) ids.sort();
  const pick = ids.slice(+from, +to);
  if (!pick.length) { console.log('nothing in that range of ' + ids.length); return; }
  const opt = (k, d) => +((process.argv.find((a) => a.startsWith('--' + k + '=')) || '').split('=')[1] || d);
  const S = opt('cell', 190), cols = opt('cols', 10), rows = Math.ceil(pick.length / cols), comps = [];
  for (let i = 0; i < pick.length; i++) {
    const id = pick[i]; clearCache();
    const rec = JSON.parse(fs.readFileSync(path.join(DIR, id + '.json'), 'utf8'));
    const art = build({ id, kind: 'picture' });
    let svg = line ? R.toSvg(art, { mode: 'line', labels: (rec.labels || []).map(([x, y, r, n]) => ({ x, y, r, n })), width: S - 6 }) : R.toSvg(art, { mode: 'colour', width: S - 6 });
    const png = await sharp(Buffer.from(svg)).resize(S - 6, S - 6, { fit: 'contain', background: '#fff' }).flatten({ background: '#fff' }).png().toBuffer();
    comps.push({ input: png, left: (i % cols) * S + 3, top: Math.floor(i / cols) * (S + 14) + 2 });
    comps.push({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="13"><text x="${S / 2}" y="11" font-family="Arial" font-size="10" text-anchor="middle" fill="#555">L${rec.level || '?'} ${id.replace(/-bw/, '').slice(0, 30)}</text></svg>`), left: (i % cols) * S, top: Math.floor(i / cols) * (S + 14) + S });
  }
  await sharp({ create: { width: cols * S, height: rows * (S + 14), channels: 3, background: '#fff' } }).composite(comps).png().toFile(out);
  console.log(pick.length + ' of ' + ids.length);
})();
