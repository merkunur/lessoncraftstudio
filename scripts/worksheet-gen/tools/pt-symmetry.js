#!/usr/bin/env node
/**
 * pt-symmetry.js — how mirror-symmetric is each traceable drawing (face #12 "the other half": the pedagogy contract
 * refuses a drawing whose two halves differ by more than the G1 gap anywhere — a symmetry claim on an un-symmetric
 * drawing teaches the wrong thing).
 *   For the best vertical axis (searched ±6 % of the ink width around the ink-box centre): every SKELETON pixel of each
 *   half is mirrored; its distance to the nearest skeleton pixel of the other half is measured (chamfer). Reported:
 *   p95 and max of that distance in work px and as a share of the ink width, at the axis that minimises p95.
 *   → data/pt/symmetry.json { key: { axis, p95, max, p95w } } and the 40 most symmetric printed.
 *   node tools/pt-symmetry.js [--only=<theme substring>]
 */
'use strict';
const fs = require('fs'); const path = require('path');
const { traceDrawing, chamfer } = require('../lib/pt-trace.js');
const LIB = path.join(__dirname, '..', 'cache', 'themes');
const idx = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'pt', 'index.json'), 'utf8'));
const only = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7);
(async () => {
  const out = {};
  const keys = Object.keys(idx).filter((k) => idx[k].band && idx[k].band !== 'X' && (!only || k.includes(only)));
  for (const k of keys) {
    const tr = await traceDrawing(path.join(LIB, k + '@3x.webp'));
    const { W, H, inkBox: b } = tr; const sk = tr.skeleton;
    const d = chamfer(sk.map((v) => (v ? 0 : 1)), W, H);   // distance to the nearest skeleton pixel
    const iw = b.x1 - b.x0;
    let best = null;
    for (let t = -0.06; t <= 0.0601; t += 0.01) {
      const ax = (b.x0 + b.x1) / 2 + t * iw; const ds = [];
      for (let y = b.y0; y <= b.y1; y++) for (let x = b.x0; x <= b.x1; x++) {
        if (!sk[y * W + x]) continue; const mx = Math.round(2 * ax - x); if (mx < 0 || mx >= W) { ds.push(99); continue; }
        ds.push(d[y * W + mx]);
      }
      ds.sort((p, q) => p - q);
      const p95 = ds[(ds.length * 0.95) | 0], mx = ds[ds.length - 1];
      if (!best || p95 < best.p95) best = { axis: +(ax).toFixed(1), p95: +p95.toFixed(1), max: +mx.toFixed(1), p95w: +(p95 / iw).toFixed(3) };
    }
    out[k] = best;
  }
  const prev = fs.existsSync(path.join(__dirname, '..', 'data', 'pt', 'symmetry.json')) ? JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'pt', 'symmetry.json'))) : {};
  Object.assign(prev, out);
  fs.writeFileSync(path.join(__dirname, '..', 'data', 'pt', 'symmetry.json'), JSON.stringify(prev, null, 0).replace(/},"/g, '},\n"'));
  const top = Object.entries(prev).sort((p, q) => p[1].p95w - q[1].p95w).slice(0, 40);
  for (const [k, v] of top) console.log(k.padEnd(36), 'p95w', v.p95w, 'max', v.max);
})().catch((e) => { console.error(e); process.exit(1); });
