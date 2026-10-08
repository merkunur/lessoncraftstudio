#!/usr/bin/env node
/**
 * apply-frc-instructions.js — writes tools/level-set/frc-instructions.js (Fractions Level Set 2026-10-08) into:
 *   i18n/strings.<loc>.json            G3-318 / G3-322 instruction (every level — the labels are now equivalent forms)
 *   types/g3/G3-318…, G3-322…          the same instruction in the type's own i18n.en (it must equal strings.en)
 *   i18n/level-instructions.json       G3-321 level 3
 *   i18n/interactive-instructions.json "fractions" (the screen version)
 * Refuses an empty string or a missing locale; idempotent.   node tools/level-set/apply-frc-instructions.js [--check]
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const SRC = require('./frc-instructions.js');
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const bad = [];
const full = (by, what) => { for (const l of LOCS) if (!by[l] || !String(by[l]).trim()) bad.push(`${what} ${l}: empty`); };
full(SRC.equiv, 'equiv'); full(SRC.whole3, 'whole3');
for (const [k, by] of Object.entries(SRC.screen)) full(by, 'screen.' + k);
if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
if (process.argv.includes('--check')) { console.log('ok'); process.exit(0); }

for (const l of LOCS) {
  const f = path.join(ROOT, 'i18n', `strings.${l}.json`);
  const S = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const id of ['G3-318', 'G3-322']) S[id].instruction = SRC.equiv[l];
  for (const [id, by] of Object.entries(SRC.faces)) if (by[l]) S[id].instruction = by[l];
  fs.writeFileSync(f, JSON.stringify(S, null, 2) + '\n');
}
for (const [id, file, en] of [['G3-318', 'G3-318-equivalent-fractions.js', SRC.equiv.en], ['G3-322', 'G3-322-equivalent-matching.js', SRC.equiv.en], ['G3-317', 'G3-317-fractions-on-line.js', SRC.faces['G3-317'].en]]) {
  const p = path.join(ROOT, 'types', 'g3', file);
  const t = fs.readFileSync(p, 'utf8').replace(/(instruction: ')[^']*(')/, `$1${en}$2`);
  fs.writeFileSync(p, t);
}
const LF = path.join(ROOT, 'i18n', 'level-instructions.json');
const L = JSON.parse(fs.readFileSync(LF, 'utf8'));
L['G3-321'] = L['G3-321'] || {};
L['G3-321']['3'] = Object.fromEntries(LOCS.map((l) => [l, SRC.whole3[l]]));
fs.writeFileSync(LF, JSON.stringify(L, null, 1) + '\n');
const IF = path.join(ROOT, 'i18n', 'interactive-instructions.json');
const I = JSON.parse(fs.readFileSync(IF, 'utf8'));
I.fractions = SRC.screen;
fs.writeFileSync(IF, JSON.stringify(I, null, 1) + '\n');
console.log('wrote G3-318/G3-322 instructions ×11, G3-321 level 3 ×11, screen instructions', Object.keys(SRC.screen).length, '×11');
