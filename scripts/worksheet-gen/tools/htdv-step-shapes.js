#!/usr/bin/env node
/**
 * htdv-step-shapes.js — data/htdv/step-shapes.json: for every drawn lesson (data/htdv/src/<key>.js), the SHAPES each step
 * adds — the labels of How to Draw "Draw with Shapes" (K-493, makers 2026-11-02): "step 1: a circle and an oval".
 *
 * A part's shape is read from the path its helper wrote (lib/htd-vector.js): ellipse() = M + 4 C → a circle when the
 * radii agree within 8 %, else an oval; rpoly() with 3 corners (3 Q) → a triangle; rrect() (4 L + 4 C) → a rectangle
 * (a square when its sides agree within 8 %); dome() (3 C) → a half circle. Lines, solids, shines and free paths (a
 * tail, a mane) are not shapes and carry no label. A part's declared `shape` wins (the guides record theirs).
 *   { <key>: [ [ { shape, n } … ] per step ] }
 *   node tools/htdv-step-shapes.js [--check]
 */
'use strict';
const fs = require('fs'), path = require('path');
const DIR = path.join(__dirname, '..', 'data', 'htdv');
const OUT = path.join(DIR, 'step-shapes.json');

function pts(d) { return (d.match(/-?\d+(?:\.\d+)?/g) || []).map(Number); }
function classify(p) {
  if (p.kind && p.kind !== 'shape') return null;
  if (p.shape) return p.shape === 'oval' || p.shape === 'circle' || p.shape === 'triangle' || p.shape === 'rectangle' || p.shape === 'half-circle' || p.shape === 'square' ? p.shape : null;
  const d = p.d, cmds = (d.match(/[MLCQZ]/g) || []).join('');
  const nC = (cmds.match(/C/g) || []).length, nL = (cmds.match(/L/g) || []).length, nQ = (cmds.match(/Q/g) || []).length;
  const v = pts(d), xs = v.filter((_, i) => i % 2 === 0), ys = v.filter((_, i) => i % 2 === 1);
  const w = Math.max(...xs) - Math.min(...xs), h = Math.max(...ys) - Math.min(...ys);
  const even = Math.abs(w - h) / Math.max(w, h) < 0.08;
  if (/^MCCCCZ$/.test(cmds)) return even ? 'circle' : 'oval';
  if (nQ === 3 && nC === 0 && /^MQ(LQ){2}Z$/.test(cmds)) return 'triangle';
  if (nC === 4 && nL === 4 && nQ === 0) return even ? 'square' : 'rectangle';
  if (/^MCCCZ$/.test(cmds)) return 'half-circle';
  return null;
}
const out = {};
for (const f of fs.readdirSync(path.join(DIR, 'src')).filter((x) => x.endsWith('.js')).sort()) {
  const src = require(path.join(DIR, 'src', f));
  const n = Math.max(...src.parts.map((p) => p.step));
  const steps = Array.from({ length: n }, () => ({}));
  for (const p of src.parts) { const s = classify(p); if (s) steps[p.step - 1][s] = (steps[p.step - 1][s] || 0) + 1; }
  out[src.key] = steps.map((m) => Object.entries(m).map(([shape, k]) => ({ shape, n: k })));
}
const text = JSON.stringify(out, null, 1) + '\n';
if (process.argv.includes('--check')) { if ((fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '') !== text) { console.error('step-shapes.json is STALE'); process.exit(1); } console.log('step-shapes: current'); }
else { fs.writeFileSync(OUT, text); for (const [k, st] of Object.entries(out)) console.log(k.padEnd(12), st.map((s) => s.map((x) => x.n + ' ' + x.shape).join(' + ') || '—').join(' | ')); }
