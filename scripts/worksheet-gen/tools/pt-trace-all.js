#!/usr/bin/env node
/**
 * pt-trace-all.js — trace every B&W library drawing (localized B&W theme marker, CLAUDE.md §20.5: the cache uses the
 * EN names, so `bw` closes the theme name, optionally followed by a number) and write the traceability index
 * data/pt/index.json:
 *   { "<theme>/<noun>": { sw, paths, blobs, len, shortShare, density, miss, outside, aspect, band } }
 *     len        total guide length in work px (800 px longer side)
 *     shortShare share of paths shorter than 3 stroke widths (fur, hatching: noise to a child)
 *     density    guide length / ink-box diagonal (how much line there is to trace for the picture's size)
 *     miss       share of the drawing's skeleton left untraced (law b); outside = guide off the ink (law a)
 *     band       'P1' (PreK: few long lines) · 'P2' (K) · 'P3' (G1, detailed) · 'X' (refused: too dense / failed laws)
 * Tracing is fast (~0.2 s), so the generator traces on the fly; only this index is kept (no per-drawing cache).
 *   node tools/pt-trace-all.js [--only=<theme substring>]
 */
'use strict';
const fs = require('fs'); const path = require('path');
const { traceDrawing } = require('../lib/pt-trace.js');
const { coverage } = require('../lib/pt-verify.js');
const LIB = path.join(__dirname, '..', 'cache', 'themes');
const OUT = path.join(__dirname, '..', 'data', 'pt', 'index.json');
const only = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7);

function bandOf(m) {
  if (m.miss > 0.02 || m.outside > 0.02) return 'X';
  if (m.density <= 9 && m.shortShare <= 0.25 && m.paths <= 30) return 'P1';
  if (m.density <= 15 && m.shortShare <= 0.4 && m.paths <= 70) return 'P2';
  if (m.density <= 24 && m.shortShare <= 0.55) return 'P3';
  return 'X';
}

(async () => {
  const themes = fs.readdirSync(LIB).filter((t) => /\bbw(\s+\d+)?$/i.test(t) && (!only || t.includes(only)));
  const idx = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
  const jobs = [];
  for (const t of themes) for (const f of fs.readdirSync(path.join(LIB, t))) if (f.endsWith('@3x.webp')) jobs.push(t + '/' + f.replace('@3x.webp', ''));
  let done = 0;
  const work = async () => {
    for (;;) {
      const key = jobs.shift(); if (!key) return;
      try {
        const tr = await traceDrawing(path.join(LIB, key + '@3x.webp'));
        const c = await coverage(tr);
        const L = tr.paths.reduce((s, p) => s + p.len, 0);
        const b = tr.inkBox, diag = Math.hypot(b.x1 - b.x0, b.y1 - b.y0) || 1;
        const m = {
          sw: +tr.sw.toFixed(1), paths: tr.paths.length, blobs: tr.blobs.length, len: Math.round(L),
          shortShare: +(tr.paths.filter((p) => p.len < 3 * tr.sw).length / Math.max(1, tr.paths.length)).toFixed(3),
          density: +(L / diag).toFixed(2), miss: +c.miss.toFixed(4), outside: +c.outside.toFixed(4),
          aspect: +((b.x1 - b.x0 + 1) / (b.y1 - b.y0 + 1)).toFixed(3),
        };
        m.band = bandOf(m);
        idx[key] = m;
      } catch (e) { idx[key] = { error: String(e.message || e) }; }
      if (++done % 50 === 0) process.stderr.write(done + ' ');
    }
  };
  await Promise.all([work(), work(), work(), work()]);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  const sorted = {}; for (const k of Object.keys(idx).sort()) sorted[k] = idx[k];
  fs.writeFileSync(OUT, JSON.stringify(sorted, null, 0).replace(/},"/g, '},\n"'));
  const bands = {}; for (const v of Object.values(sorted)) bands[v.band || 'ERR'] = (bands[v.band || 'ERR'] || 0) + 1;
  console.log('\ntraced', Object.keys(sorted).length, JSON.stringify(bands));
})().catch((e) => { console.error(e); process.exit(1); });
