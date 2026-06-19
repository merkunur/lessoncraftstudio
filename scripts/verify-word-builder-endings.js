#!/usr/bin/env node
/* =====================================================================
   verify-word-builder-endings.js — build-time correctness gate for the
   RF.1.3.f inflectional-endings "Build Words with Endings" build-endings
   activity (EN-only, word-only, word-builder engine).
   ---------------------------------------------------------------------
   Loads the REAL word-builder-core and proves, MEASURED, per word:
     1. tiles = [base, ending] where ending ∈ {s, ed, ing};
     2. CLEAN concatenation: base + ending === targetWord (no doubling /
        drop-e spelling change — the base tile + ending tile must literally
        spell the target);
     3. distractors = the OTHER two endings (neither equals the correct
        ending) — the ending discrimination is load-bearing;
     4. driving the REAL core (mutePerTile:true; palette = tiles+distractors;
        WORD-ONLY text subject): placing [base, ending] → tileAnswers === tiles
        + answer === targetWord (correct); placing a wrong ending in slot 1 →
        tileAnswers ≠ tiles;
     5. the pool spans all THREE endings (-s, -ed, -ing);
     6. ≥7 words.
   No image / vocab check — word-only by design (verbs are not in the
   nouns-only image library; that is the reason this code is word-only).
   Exit 0 = pass; 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const ROW_ID = 'syllable-builder.build-endings.rf-1-3-f';
const ENDINGS = new Set(['s', 'ed', 'ing']);
const REPO = path.join(__dirname, '..');

const win = {};
new Function('window', fs.readFileSync(path.join(REPO, 'mini tools', 'word-builder-core.js'), 'utf8'))(win);
const Core = win.WordBuilderCore;
if (!Core) { console.error('FAIL: no WordBuilderCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'syllable-builder-activities.json'), 'utf8'));
const row = manifest.find((r) => r.id === ROW_ID);
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };
const tilesEqual = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((x, i) => x === b[i]);

if (!row) { console.error('FAIL: manifest row ' + ROW_ID + ' not found'); process.exit(1); }
check(row.task_template === 'build-endings', `task_template ${row.task_template} ≠ build-endings`);
check(row.alignment && row.alignment.code === 'RF.1.3.F', `alignment ${row.alignment && row.alignment.code} ≠ RF.1.3.F`);

Core.init({ el: () => ({}), sound: () => {}, announce: () => {}, track: () => {}, lang: 'en' });

const words = (row.params && Array.isArray(row.params.words)) ? row.params.words : [];
check(words.length >= VARIETY_MIN, `${words.length} words < ${VARIETY_MIN}`);

const seenEndings = new Set();
words.forEach((w, i) => {
  const label = `word#${i}[${w.targetWord}]`;
  const tiles = w.tiles || [], distractors = w.distractors || [];
  check(tiles.length === 2, `${label}: tiles not [base, ending] (${JSON.stringify(tiles)})`);
  const base = tiles[0], ending = tiles[1];
  check(ENDINGS.has(ending), `${label}: ending tile "${ending}" not in {s,ed,ing}`);
  seenEndings.add(ending);
  check(base + ending === w.targetWord, `${label}: NOT clean concat — "${base}"+"${ending}" ≠ "${w.targetWord}"`);
  check(distractors.length >= 2 && distractors.every((d) => ENDINGS.has(d) && d !== ending), `${label}: distractors must be the other two endings (${JSON.stringify(distractors)})`);

  // drive REAL core — correct
  const palette = tiles.concat(distractors);
  Core.setupTask({ slots: tiles.length, palette: palette, targetWord: w.targetWord, targetTiles: tiles, mutePerTile: true, subject: { type: 'text', text: base }, language: 'en-US' });
  tiles.forEach((t) => Core.selectTile(t));
  check(tilesEqual(Core.tileAnswers, tiles), `${label}: correct base+ending built ${JSON.stringify(Core.tileAnswers)} ≠ ${JSON.stringify(tiles)}`);
  check(Core.answer === w.targetWord, `${label}: answer "${Core.answer}" ≠ "${w.targetWord}"`);
  // wrong — a distractor ending in slot 1
  const wrongEnding = distractors[0];
  Core.setupTask({ slots: tiles.length, palette: palette, targetWord: w.targetWord, targetTiles: tiles, mutePerTile: true, subject: { type: 'text', text: base }, language: 'en-US' });
  Core.selectTile(base); Core.selectTile(wrongEnding);
  check(!tilesEqual(Core.tileAnswers, tiles), `${label}: wrong ending "${wrongEnding}" still matched`);
});

check(seenEndings.has('s') && seenEndings.has('ed') && seenEndings.has('ing'), `pool does not span all three endings (saw ${JSON.stringify([...seenEndings])})`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} violation(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${words.length} words: tiles=[base,ending] (∈{s,ed,ing}), CLEAN concat base+ending=targetWord, distractors = the other two endings, REAL core builds target only on the right ending (mutePerTile, word-only text subject), wrong ending → ≠, pool spans -s/-ed/-ing; ≥${VARIETY_MIN}.`);
process.exit(0);
