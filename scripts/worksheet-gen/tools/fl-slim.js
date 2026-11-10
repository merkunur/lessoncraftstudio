#!/usr/bin/env node
/**
 * fl-slim.js — the How to Draw store as the browser fetches it (docs/makers/FLAGSHIP.md): a lesson keeps its steps, one decimal;
 * `full` is the steps joined (data/b7/how-to-draw.js stepsFor) and `keep`, the Level Set's merged pictures, is not needed.
 * 979 MB → about 200 MB. Run after tools/fl-batch.js htd; safe to run again.
 */
'use strict';
const fs = require('fs'); const path = require('path');
const DIR = path.join(__dirname, '..', 'data', 'fl', 'htd');
const round = (d) => d.replace(/-?\d+\.\d+/g, (x) => String(+(+x).toFixed(1)));
let before = 0, after = 0;
for (const f of fs.readdirSync(DIR)) {
  const p = path.join(DIR, f), raw = fs.readFileSync(p, 'utf8'), j = JSON.parse(raw);
  before += raw.length;
  delete j.keep; delete j.full;
  if (j.refused) { j.steps = []; j.shapes = []; }
  for (const s of j.steps || []) if (s.d) s.d = round(s.d);
  const out = JSON.stringify(j); after += out.length;
  fs.writeFileSync(p, out);
}
console.log('htd', Math.round(before / 1e6) + ' MB →', Math.round(after / 1e6) + ' MB');
