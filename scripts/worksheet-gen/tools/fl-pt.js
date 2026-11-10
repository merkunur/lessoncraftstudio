#!/usr/bin/env node
/**
 * fl-pt.js — trace the flagship drawings (docs/makers/FLAGSHIP.md) with the library's own tracer: the trace store
 * (data/pt/traces, proved like tools/pt-store-build.js) and their band in data/fl/pt-index.json. data/pt/index.json stays as
 * it is: the published faces' lists are shuffled from it, so a new key there would move every published page.
 *   node tools/fl-pt.js
 */
'use strict';
const fs = require('fs'); const path = require('path');
const { traceDrawing } = require('../lib/pt-trace.js');
const { coverage } = require('../lib/pt-verify.js');
const store = require('../lib/pt-store.js');
const LIB = path.join(__dirname, '..', 'cache', 'themes');
const OUT = path.join(__dirname, '..', 'data', 'fl', 'pt-index.json');
const man = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'cache', 'manifest.json'), 'utf8')).themes;
function bandOf(m) {
  if (m.miss > 0.02 || m.outside > 0.02) return 'X';
  if (m.density <= 9 && m.shortShare <= 0.25 && m.paths <= 30) return 'P1';
  if (m.density <= 15 && m.shortShare <= 0.4 && m.paths <= 70) return 'P2';
  if (m.density <= 24 && m.shortShare <= 0.55) return 'P3';
  return 'X';
}
(async () => {
  const jobs = [];
  for (const t of Object.keys(man)) if (man[t].fl) for (const n of Object.keys(man[t].nouns)) jobs.push(t + '/' + n);
  const idx = {}; let bad = 0;
  const work = async () => {
    for (;;) {
      const key = jobs.shift(); if (!key) return;
      try {
        const tr = await traceDrawing(path.join(LIB, key + '@3x.webp'));
        const c = await coverage(tr);
        const L = tr.paths.reduce((s, p) => s + p.len, 0), b = tr.inkBox, diag = Math.hypot(b.x1 - b.x0, b.y1 - b.y0) || 1;
        const m = { sw: +tr.sw.toFixed(1), paths: tr.paths.length, blobs: tr.blobs.length, len: Math.round(L), shortShare: +(tr.paths.filter((p) => p.len < 3 * tr.sw).length / Math.max(1, tr.paths.length)).toFixed(3), density: +(L / diag).toFixed(2), miss: +c.miss.toFixed(4), outside: +c.outside.toFixed(4), aspect: +((b.x1 - b.x0 + 1) / (b.y1 - b.y0 + 1)).toFixed(3) };
        m.band = bandOf(m); idx[key] = m;
        const json = JSON.stringify(store.pack(tr)), back = store.unpack(JSON.parse(json));
        if (!['W', 'H', 'sw', 'inkBox', 'paths', 'blobs'].every((f) => JSON.stringify(back[f]) === JSON.stringify(tr[f]))) throw new Error('store does not give the trace back');
        fs.writeFileSync(store.fileOf(key), json);
      } catch (e) { bad++; console.log(key, e.message); }
    }
  };
  await Promise.all(Array.from({ length: 12 }, work));
  fs.writeFileSync(OUT, JSON.stringify(idx));
  const bands = {}; for (const v of Object.values(idx)) bands[v.band] = (bands[v.band] || 0) + 1;
  console.log(Object.keys(idx).length + ' traced', bands, 'failed', bad);
})().catch((e) => { console.error(e); process.exit(1); });
