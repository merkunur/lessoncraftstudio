#!/usr/bin/env node
/* =====================================================================
   apply-pattern-bench-landing.js — rewrite the pattern-bench `howToUse`
   and the last `about` paragraph in all eleven tool-content files.

   ⚠ WHY: the shipped landing copy DOCUMENTED GESTURES THE v4 REBUILD
   INVERTED. It said "Tap a bead in the strip to cover it" — tapping now
   EDITS the pattern; covering is an armed chip. And its final paragraph
   claimed "the bench lets a class test each claim by rebuilding the strip
   from it", which the tool could not do: rebuilding from [b,a] produced a
   strip starting with the OTHER bead, so it looked different and settled
   nothing. Shipping the rebuild without this edit ships a documented lie.

   Every paragraph below is the output of a three-expert native panel
   (linguist + K-1 teacher + B2C marketing) per §A.13.48, handed the
   English as a SOURCE TO AUDIT rather than a target to translate. Five
   panels independently reported that the English was mathematically
   inverted; the English here is the corrected one.

   Usage: node scripts/apply-pattern-bench-landing.js [--dry-run]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIR = path.join(ROOT, 'frontend', 'messages', 'tool-content');
const KEY = 'pattern-bench';
const DRY = process.argv.indexOf('--dry-run') > -1;

const COPY = require('./_pattern-bench-landing-copy.json');
const ORDER = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

let bad = 0;
const err = (m) => { bad++; console.error('  ERROR  ' + m); };

ORDER.forEach((loc) => {
  const c = COPY[loc];
  if (!c) { err(`${loc}: no copy`); return; }
  if (!Array.isArray(c.howToUse) || c.howToUse.length !== 7) err(`${loc}: howToUse must be 7 items, got ${(c.howToUse || []).length}`);
  if (!c.aboutPara4 || c.aboutPara4.length < 120) err(`${loc}: aboutPara4 is missing or too short`);
  (c.howToUse || []).forEach((s, i) => { if (!s || s.length < 30) err(`${loc}.howToUse[${i}] is too short`); });
});
if (bad) { console.error(`\nrefusing to write — ${bad} problem(s)`); process.exit(1); }

let n = 0;
ORDER.forEach((loc) => {
  const f = path.join(DIR, loc + '.json');
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  const e = j[KEY];
  if (!e) { err(`${loc}.json has no "${KEY}" entry`); return; }
  if (!Array.isArray(e.about) || e.about.length < 4) { err(`${loc}: about is not a 4-paragraph array`); return; }
  e.howToUse = COPY[loc].howToUse.slice();
  e.about[e.about.length - 1] = COPY[loc].aboutPara4;
  if (!DRY) fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n', 'utf8');
  n++;
});
if (bad) { console.error(`\n${bad} problem(s)`); process.exit(1); }
console.log((DRY ? 'dry run — would rewrite ' : 'rewrote ') + n + ' locale file(s)');
