#!/usr/bin/env node
/**
 * htd-text-dump.js — the compact text of the How to Draw Level Set for ONE native + pedagogy reviewer (2026-10-11):
 * per locale, every face × level title template + instruction, every drawing's title form / bare noun / traced word /
 * the three write-face starters, and every resolved title as it prints. Written to <out>/htd-text-<loc>.txt.
 *   node tools/level-set/htd-text-dump.js --out=<dir>
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const B = require(path.join(ROOT, 'data', 'b7', 'how-to-draw.js'));
const { STRINGS } = require(path.join(ROOT, 'data', 'htdx', 'strings.js'));
const { NAMES } = require(path.join(ROOT, 'data', 'htdx', 'names.js'));
const A = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'htdx', 'allocation.json'), 'utf8'));
const out = (process.argv.find((a) => a.startsWith('--out=')) || '--out=out/htl-text').slice(6);
fs.mkdirSync(out, { recursive: true });
const FACE = { 'K-396': 'base', 'K-401': 'shapes', 'K-402': 'trace', 'K-403': 'finish', 'G1-416': 'grid', 'K-404': 'word', 'G1-417': 'scene', 'G1-418': 'order', 'G1-419': 'copy-steps', 'G2-390': 'write', 'G2-391': 'memory' };
const PAGE = {
  base: 'L1: steps down a rail + a big box with pale dotted shapes (ovals) inside · L2: steps + empty big box · L3: steps + two boxes (draw it twice)',
  shapes: 'L1: the whole picture printed PALE in the box with dotted shapes on it · L2: dotted shapes in the box · L3: only the 2 biggest dotted shapes',
  trace: 'L1: one big grey picture to trace (no second box) · L2: grey picture + empty box beside it · L3: only the grey OUTLINE + empty box',
  finish: 'a finished picture (left) + the same picture with lines missing (right, dashed frame) + a big empty box below. L1: one part missing · L2: all middle lines missing · L3: only the outline given',
  grid: 'the picture on a grid + an empty grid + a big empty box. L1 3×3 big squares · L2 4×4 · L3 5×5 small squares',
  word: 'steps + box; under it: the word printed, then L1 two grey dotted copies · L2 one grey copy + one empty line · L3 one empty line',
  scene: 'steps strip + a scene (sun, trees, other things) with an empty space. L1: a dashed ring marks where to draw',
  order: 'the step cards in mixed order, each with an empty numeral box beside it + a big box. L1 4 steps · L2/L3 5 steps',
  'copy-steps': 'step cards in a row, an empty box under each, a big box at the bottom (L1 3 steps, L2 4, L3 5)',
  write: 'steps + box + ruled lines. L1: 2 lines with starters · L2: 3 lines with starters · L3: 3 empty lines',
  memory: 'the picture on a flap, a dotted fold line across the page, a big box below. L1: dotted shapes in the box',
};
for (const loc of ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']) {
  const L = [];
  L.push(`# How to Draw — Level Set text, locale ${loc}. Every page is a black-and-white drawing lesson (steps: first the outline in orange, then each step adds orange lines, the last card all black).`);
  L.push('## Face × level: title template + instruction (and what the page shows)');
  for (const [mode, lvs] of Object.entries(STRINGS)) {
    L.push(`\n### ${mode} — ${PAGE[mode]}`);
    for (const lv of Object.keys(lvs)) L.push(`L${lv} title: ${lvs[lv][loc].title}\nL${lv} instr: ${lvs[lv][loc].instruction}`);
  }
  L.push('\n## Drawings: title form {L} | bare noun {N} | traced word');
  const used = new Set(); for (const lvs of Object.values(A.faces)) for (const list of Object.values(lvs)) for (const c of list) used.add(c.unit);
  const keys = [...new Set([...used].map((u) => B.unitRecord(u).key))].sort();
  for (const k of keys) { const e = NAMES[k][loc]; L.push(`${k}: ${e.t} | ${e.n} | ${e.word || '—'}`); }
  L.push('\n## Write face: the printed starters per drawing');
  for (const c of [].concat(...Object.values(A.faces['G2-390']))) { if (c.copy) L.push(`${B.unitRecord(c.unit).key}: ${B.lsStarters(c.unit, loc).join(' / ')}`); }
  L.push('\n## Every resolved title');
  for (const [id, lvs] of Object.entries(A.faces)) for (const [lv, list] of Object.entries(lvs)) for (const c of list) {
    const t = STRINGS[FACE[id]][lv][loc].title, f = B.formFor({}, c.unit, loc), up = f.t.charAt(0).toLocaleUpperCase(loc) + f.t.slice(1);
    L.push(`${id} L${lv}: ${t.replace('{L}', f.t).replace('{U}', up).replace('{N}', f.n)}`);
  }
  fs.writeFileSync(path.join(out, `htd-text-${loc}.txt`), L.join('\n') + '\n');
}
console.log('written to', out);
