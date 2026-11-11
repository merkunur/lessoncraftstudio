#!/usr/bin/env node
/**
 * Contact sheets of the unit checks for the reviewer and for my own reading (a word review cannot see a picture):
 * per check ONE picture with the key pages of form A in the top row and of form B in the bottom row. The key shows
 * the task and its answer, so one picture carries both.
 *
 *   node scripts/assessments/build-checks.js --loc=en … --png     first (it writes the page pictures)
 *   node scripts/assessments/contact-sheets.js --loc=en            → out/assessments/<loc>/_sheets/<unit id>.png
 */
'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const root = path.join(REPO, 'out', 'assessments', loc);
const W = 620, H = Math.round(W * 945 / 703), PAD = 12;
(async () => {
  const checks = JSON.parse(fs.readFileSync(path.join(root, 'checks.json'), 'utf8')).checks;
  fs.mkdirSync(path.join(root, '_sheets'), { recursive: true });
  for (const c of checks) {
    const rows = ['a', 'b'].map((f) => Array.from({ length: c.forms[f.toUpperCase()].pages }, (_, i) => path.join(root, c.unit, 'key-' + f + '-' + (i + 1) + '.png')));
    const cols = Math.max(...rows.map((r) => r.length));
    const tiles = [];
    for (let r = 0; r < rows.length; r++) for (let i = 0; i < rows[r].length; i++) {
      if (!fs.existsSync(rows[r][i])) throw new Error('no page picture ' + rows[r][i] + ' (run build-checks.js with --png)');
      tiles.push({ input: await sharp(rows[r][i]).resize(W, H, { fit: 'contain', background: '#fff' }).png().toBuffer(), left: PAD + i * (W + PAD), top: PAD + r * (H + PAD) });
    }
    const out = path.join(root, '_sheets', c.unit + '.png');
    await sharp({ create: { width: PAD + cols * (W + PAD), height: PAD + 2 * (H + PAD), channels: 3, background: '#8A8276' } }).composite(tiles).png().toFile(out);
    console.log(path.relative(REPO, out) + '  ' + cols + ' page(s) per form');
  }
})().catch((e) => { console.error(String(e)); process.exit(1); });
