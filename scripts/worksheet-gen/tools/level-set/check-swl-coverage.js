#!/usr/bin/env node
/**
 * check-swl-coverage.js — the Sight Words Level Set covers EVERYTHING a teacher looks for (operator 2026-09-30):
 *   - every sight word of every locale has a page in each one-word variation (K-388..K-392) at every level;
 *   - K-239's word sets cover the whole list at every level (sets x words >= list, no set missing);
 *   - each "Set N" face (K-259..K-263) has its easier (1) and harder (3) level.
 * Reads waves/wave-swl-<loc>.json. --poison drops one entry per rule in memory and requires each to be caught.
 *   node tools/level-set/check-swl-coverage.js [--strict] [--poison]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const SW = require('../../lib/sight-words-levelset.js');
const K239 = require('../../types/k/K-239-sight-words.js');

const LOCALES = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const ONE_WORD = ['K-388', 'K-389', 'K-390', 'K-391', 'K-392'];
const SETS = ['K-259', 'K-260', 'K-261', 'K-262', 'K-263'];

function check(loc, w) {
  const f = [];
  const ids = SW.unitIds(loc);
  for (const id of ONE_WORD) for (const lv of ['1', '2', '3']) {
    const have = new Set(((w.levels[id] || {})[lv] || []).map((c) => c.unit));
    const miss = ids.filter((u) => !have.has(u));
    if (miss.length) f.push(`${loc} ${id} L${lv}: no page for ${miss.slice(0, 5).join(', ')}${miss.length > 5 ? ` (+${miss.length - 5})` : ''}`);
  }
  for (const lv of ['1', '2', '3']) {
    const per = K239.difficulty[lv].words;
    const need = Math.ceil(ids.length / per);
    const svs = new Set(((w.levels['K-239'] || {})[lv] || []).map((c) => c.seedVariant || 1));
    for (let s = 1; s <= need; s++) if (!svs.has(s)) f.push(`${loc} K-239 L${lv}: word set ${s} missing`);
  }
  for (const id of SETS) for (const lv of ['1', '3']) {
    if (!((w.levels[id] || {})[lv] || []).length) f.push(`${loc} ${id} L${lv}: missing`);
  }
  return f;
}

const waves = Object.fromEntries(LOCALES.map((l) => [l, JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'waves', `wave-swl-${l}.json`), 'utf8'))]));

if (process.argv.includes('--poison')) {
  const clone = (x) => JSON.parse(JSON.stringify(x));
  const cases = [
    ['a one-word page removed', (w) => { w.levels['K-390']['2'].pop(); }],
    ['a K-239 word set removed', (w) => { w.levels['K-239']['3'].splice(4, 1); }],
    ['a set-face level removed', (w) => { delete w.levels['K-261']['1']; }],
  ];
  let missed = 0;
  for (const [name, mut] of cases) {
    const w = clone(waves.de); mut(w);
    if (!check('de', w).length) { missed++; console.log('POISON MISSED: ' + name); } else console.log('poison caught: ' + name);
  }
  if (!check('de', waves.de).length) console.log('control: the real wave passes');
  if (missed) process.exit(1);
}

let total = 0;
for (const l of LOCALES) { const f = check(l, waves[l]); f.forEach((x) => console.log('FAIL ' + x)); total += f.length; }
console.log(total ? `${total} coverage gaps` : 'coverage complete: every word, every variation, every level, all 11 locales');
if (total && process.argv.includes('--strict')) process.exit(1);
