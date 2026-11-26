#!/usr/bin/env node
/**
 * Reads a Search Console Performance export made AFTER the change (Pages.csv of a folder exported with a date range that
 * starts on the deploy day, e.g. 27 Nov – 24 Dec) and compares the 25 changed pages with the 25 control pages.
 *
 * The verdict is the difference in differences of the click rate (CTR): (changed after − changed before) minus
 * (control after − control before). The control group absorbs what moved for everyone (season, holidays, Google
 * updates). Position is reported too: a CTR change with a position change is not a snippet effect.
 *
 *   node docs/SEO/ctr-test-2026-11/compare.js "<path to the export folder>"
 */
'use strict';
const fs = require('fs');
const path = require('path');
const dir = process.argv[2];
if (!dir) { console.log('usage: compare.js <export folder with Pages.csv>'); process.exit(2); }
const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'pages.json'), 'utf8'));
const rows = fs.readFileSync(path.join(dir, 'Pages.csv'), 'utf8').replace(/^﻿/, '').trim().split(/\r?\n/).slice(1).map((l) => {
  const o = []; let c = '', q = false;
  for (const ch of l) { if (ch === '"') q = !q; else if (ch === ',' && !q) { o.push(c); c = ''; } else c += ch; }
  o.push(c);
  return { url: o[0], clicks: +o[1], impressions: +o[2], position: +o[4] };
});
const after = new Map(rows.map((r) => [r.url.replace(/\/$/, ''), r]));

function group(role) {
  let bc = 0, bi = 0, bp = 0, ac = 0, ai = 0, ap = 0, missing = 0;
  for (const p of pages.pairs) {
    const x = p[role];
    const a = after.get(x.url.replace(/\/$/, ''));
    bc += x.clicks; bi += x.impressions; bp += x.position * x.impressions;
    if (!a) { missing++; continue; }
    ac += a.clicks; ai += a.impressions; ap += a.position * a.impressions;
  }
  return { before: { ctr: bc / bi, pos: bp / bi, clicks: bc, impressions: bi }, after: { ctr: ai ? ac / ai : NaN, pos: ai ? ap / ai : NaN, clicks: ac, impressions: ai }, missing };
}
const C = group('change'), K = group('control');
const pct = (x) => (100 * x).toFixed(2) + ' %';
for (const [name, g] of [['changed', C], ['control', K]]) {
  console.log(`${name.padEnd(8)} before CTR ${pct(g.before.ctr)} pos ${g.before.pos.toFixed(1)} (${g.before.clicks}/${g.before.impressions})` +
    ` | after CTR ${pct(g.after.ctr)} pos ${g.after.pos.toFixed(1)} (${g.after.clicks}/${g.after.impressions})` +
    (g.missing ? ` | ${g.missing} page(s) missing from the export (a Pages export lists the top 1000 only)` : ''));
}
const did = (C.after.ctr - C.before.ctr) - (K.after.ctr - K.before.ctr);
console.log(`\ndifference in differences of CTR: ${did >= 0 ? '+' : ''}${(100 * did).toFixed(2)} percentage points`);
console.log(`position change: changed ${(C.after.pos - C.before.pos).toFixed(1)}, control ${(K.after.pos - K.before.pos).toFixed(1)}`);
let wins = 0;
for (const p of pages.pairs) {
  const a = after.get(p.change.url.replace(/\/$/, '')), b = after.get(p.control.url.replace(/\/$/, ''));
  if (!a || !b || !a.impressions || !b.impressions) continue;
  if (a.clicks / a.impressions - p.change.ctr > b.clicks / b.impressions - p.control.ctr) wins++;
}
console.log(`pairs where the changed page gained more CTR than its control: ${wins} of ${pages.pairs.length}`);
console.log('Scale to the other pages only if the difference is clearly positive and most pairs agree.');
