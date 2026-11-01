#!/usr/bin/env node
/**
 * logic-puzzles.bench.js — generation time of the four logic engines per level, p50 / p95 / max over N seeds, plus the
 * full page build (runtime.js makePage: engine + markup + shell, no browser) of each new Logic & Math Puzzles template.
 *
 *   node scripts/worksheet-gen/lib/logic-puzzles.bench.js [--seeds=300] [--json]
 *
 * Numbers are Node on this PC at 1×; the browser build of the same code is measured by scripts/makers/gates/live-gate.js
 * (per-page timing in headless Chrome) — the engines are pure JS, so the browser cost is the same arithmetic.
 */
'use strict';
const path = require('path');
const { makeRng } = require('./rng.js');
const S = require('./logic-sudoku.js');
const C = require('./logic-cages.js');
const K = require('./logic-code.js');
const B = require('./logic-balance.js');

const SEEDS = Number((process.argv.find((a) => a.startsWith('--seeds=')) || '--seeds=300').slice(8));
const q = (a, f) => { const b = a.slice().sort((x, y) => x - y); return b[Math.min(b.length - 1, Math.floor(f * b.length))]; };
const ms = () => Number(process.hrtime.bigint()) / 1e6;
const rows = [];
function bench(name, fn) {
  const t = [];
  for (let s = 0; s < SEEDS; s++) { const rng = makeRng(name + '|' + s); const t0 = ms(); fn(rng); t.push(ms() - t0); }
  rows.push({ name, seeds: SEEDS, p50: +q(t, 0.5).toFixed(2), p95: +q(t, 0.95).toFixed(2), max: +Math.max(...t).toFixed(2) });
}
for (const n of [4, 6]) for (const level of [1, 2, 3]) bench(`sudoku ${n}x${n} L${level}`, (rng) => S.generate({ n, level, rng }));
for (const n of [3, 4]) for (const level of [1, 2, 3]) bench(`cages ${n}x${n} L${level}`, (rng) => C.generate({ n, level, rng }));
for (const level of [1, 2, 3]) bench(`code L${level}`, (rng) => K.generate({ level, rng }));
for (const level of [1, 2, 3]) bench(`balance L${level}`, (rng) => B.generate({ level, rng }));

// the full page build of every new template (Node; the same code the maker bundle runs)
const { makePage } = require('../../makers/runtime.js');
const { resolveStrings } = require('../i18n/strings.js');
const TYPES = ['g1/G1-470-number-sudoku-4x4', 'g1/G1-471-picture-sudoku-puzzles-4x4', 'g3/G3-470-number-sudoku-6x6', 'g3/G3-471-picture-sudoku-puzzles-6x6', 'g2/G2-470-cage-puzzles-3x3', 'g3/G3-472-cage-puzzles-4x4', 'g1/G1-472-picture-code-addition', 'g3/G3-473-shape-balance-puzzles'];
const PAGE_SEEDS = Math.max(20, Math.floor(SEEDS / 5));
for (const f of TYPES) {
  const type = require(path.join(__dirname, '..', 'types', f + '.js'));
  const strings = resolveStrings(type.id, 'en', type);
  for (const level of [1, 2, 3]) {
    const t = [];
    for (let v = 1; v <= PAGE_SEEDS; v++) { const t0 = ms(); makePage({ type, strings, locale: 'en', difficulty: level, theme: type.themeAxis.applicable ? 'animals' : null, variant: v, answerKey: true, answerKeySuffix: 'Answer Key', screen: true }); t.push(ms() - t0); }
    rows.push({ name: `page ${type.id} L${level} (+key +screen)`, seeds: PAGE_SEEDS, p50: +q(t, 0.5).toFixed(2), p95: +q(t, 0.95).toFixed(2), max: +Math.max(...t).toFixed(2) });
  }
}
if (process.argv.includes('--json')) console.log(JSON.stringify(rows, null, 1));
else { console.log('engine / page'.padEnd(40) + 'seeds   p50 ms   p95 ms   max ms'); for (const r of rows) console.log(r.name.padEnd(40) + String(r.seeds).padEnd(8) + String(r.p50).padEnd(9) + String(r.p95).padEnd(9) + r.max); }
