#!/usr/bin/env node
/**
 * verify-gc-figures.js — the gate for data/b2/figures-levelset.js (Grid Coordinates Level Set,
 * 2026-10-14).
 *
 * Every picture: the size of its class, a cell count inside the class bounds, at least the
 * class's number of colours, ONE 8-connected piece, a key used by no other picture (live ones
 * included), and asymmetric under left-right, top-bottom, 180° AND the diagonal swap — a child
 * who counts letters from the wrong side, or reads the number as the column, then draws a
 * picture that is visibly not the one on the answer key.
 *
 * Poison (every run): a symmetric picture, a two-piece picture, a picture over its class's
 * cell bound and a diagonal-symmetric picture must each FAIL; every real picture must PASS.
 */
'use strict';
const { LS_PIXEL_FIGURES, CLASSES, colorCount } = require('../data/b2/figures-levelset.js');
const { PIXEL_FIGURES } = require('../data/b2/figures.js');

function check(f) {
  const fails = [];
  const C = CLASSES[f.cls];
  if (!C) return [`${f.key}: unknown class`];
  const mono = f.rows.map((r) => r.replace(/[^.]/g, '#'));
  const n = mono.length;
  if (n !== C.size || mono.some((r) => r.length !== n)) fails.push(`${f.key}: not ${C.size}x${C.size}`);
  const cells = mono.join('').split('#').length - 1;
  if (cells < C.min || cells > C.max) fails.push(`${f.key}: ${cells} cells, class ${f.cls} wants ${C.min}-${C.max}`);
  if (colorCount(f) < C.minColors) fails.push(`${f.key}: ${colorCount(f)} colours, class wants ≥${C.minColors}`);
  const eq = (a, b) => a.join('|') === b.join('|');
  const lr = mono.map((r) => [...r].reverse().join(''));
  const tb = mono.slice().reverse();
  const rot = tb.map((r) => [...r].reverse().join(''));
  const tr = mono.map((_, i) => mono.map((r) => r[i]).join(''));
  if (eq(mono, lr)) fails.push(`${f.key}: left-right symmetric`);
  if (eq(mono, tb)) fails.push(`${f.key}: top-bottom symmetric`);
  if (eq(mono, rot)) fails.push(`${f.key}: 180° symmetric`);
  if (eq(mono, tr)) fails.push(`${f.key}: symmetric across the diagonal (a swapped letter/number reads the same)`);
  const seen = new Set(); let comps = 0;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    if (mono[r][c] !== '#' || seen.has(r + ',' + c)) continue;
    comps++; const st = [[r, c]]; seen.add(r + ',' + c);
    while (st.length) {
      const [y, x] = st.pop();
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const ny = y + dy, nx = x + dx;
        if (ny < 0 || nx < 0 || ny >= n || nx >= n) continue;
        if (mono[ny][nx] === '#' && !seen.has(ny + ',' + nx)) { seen.add(ny + ',' + nx); st.push([ny, nx]); }
      }
    }
  }
  if (comps !== 1) fails.push(`${f.key}: ${comps} pieces`);
  return fails;
}

const fails = [];
const keys = new Set(PIXEL_FIGURES.map((f) => f.key));
for (const f of LS_PIXEL_FIGURES) {
  if (keys.has(f.key)) fails.push(`${f.key}: key used twice`);
  keys.add(f.key);
  fails.push(...check(f));
}
const perClass = {};
for (const f of LS_PIXEL_FIGURES) perClass[f.cls] = (perClass[f.cls] || 0) + 1;
for (const cls of Object.keys(CLASSES)) if ((perClass[cls] || 0) < 5) fails.push(`class ${cls}: ${perClass[cls] || 0} pictures, a level needs 5`);

// poison — each must fail
const poisons = [
  { name: 'symmetric', f: { key: 'p1', cls: 'small6', rows: ['..rr..', '.rrrr.', '.rrrr.', '..rr..', '..rr..', '......'] } },
  { name: 'two pieces', f: { key: 'p2', cls: 'small6', rows: ['rr....', 'rrr...', '......', '....bb', '...bbb', '....b.'] } },
  { name: 'too many cells', f: { key: 'p3', cls: 'small6', rows: ['rrrrr.', 'rrrrr.', 'rrrr..', 'rrr...', 'rr....', 'r.....'] } },
  { name: 'diagonal symmetric', f: { key: 'p4', cls: 'small6', rows: ['rrr...', 'rrr...', 'rrrb..', '..b...', '......', '......'] } },
];
const poisonFails = poisons.filter((p) => check(p.f).length === 0).map((p) => `poison NOT caught: ${p.name}`);
// control — a clean picture passes
const control = check({ key: 'c1', cls: 'small6', rows: ['.rr...', 'rrrr..', 'rrrr..', '.rr...', '..n...', '...n..'] });

const all = [...fails, ...poisonFails, ...control.map((x) => 'control: ' + x)];
console.log(`${LS_PIXEL_FIGURES.length} pictures, ${JSON.stringify(perClass)} · poisons ${poisons.length - poisonFails.length}/${poisons.length} caught · control ${control.length ? 'FAILED' : 'passes'}`);
if (all.length) { console.log(all.join('\n')); process.exit(1); }
console.log('PASS');
