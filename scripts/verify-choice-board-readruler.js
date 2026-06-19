#!/usr/bin/env node
/* =====================================================================
   verify-choice-board-readruler.js — build-time correctness gate for the
   2.MD.A.1 "Read the Ruler" read-ruler choice-board activity.
   ---------------------------------------------------------------------
   Loads the REAL mini tools/choice-board-core.js (window shim) + the shipped
   manifest row, and proves, MEASURED, per round { obj, n }:
     1. n is on-scale (3..18) so every tile stays 1..20 (the ruler's range);
     2. the 4 option tiles are EXACTLY the canonical-misread set
        {n-1, n, n+1, n+2} (pairwise-distinct, all ≥1);
     3. the correct value = n;
     4. driving the REAL core (setupTask(options, String(n), null) → set
        answer): answer = n ⇒ true; answer = each of the 3 foils ⇒ false →
        EXACTLY ONE correct (no-two-correct);
     5. each round's object key resolves to a real RULER_OBJECTS builder name
        (so the figure renders);
     6. ≥7 rounds, spanning a range of n (§A.13.60).
   (The to-scale geometry — object right edge === the N-th tick — is asserted
   end-to-end in the puppeteer local-test; this gate proves the tile math.)
   setupTask only sets state (no DOM) → headless-safe. Exit 0 = pass; 1 = fail.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const ROW_ID = 'choice-board.read-ruler.2-md-a-1';
const VALID_OBJECTS = ['pencil', 'crayon', 'marker', 'ribbon', 'worm', 'stick', 'straw', 'eraser'];
const REPO = path.join(__dirname, '..');
const win = {};
new Function('window', fs.readFileSync(path.join(REPO, 'mini tools', 'choice-board-core.js'), 'utf8'))(win);
const Core = win.ChoiceBoardCore;
if (!Core) { console.error('FAIL: choice-board-core.js did not define window.ChoiceBoardCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'choice-board-activities.json'), 'utf8'));
const row = manifest.find((r) => r.id === ROW_ID);
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

if (!row) { console.error('FAIL: manifest row ' + ROW_ID + ' not found'); process.exit(1); }
check(row.task_template === 'read-ruler', `task_template ${row.task_template} ≠ read-ruler`);
check(row.alignment && row.alignment.code === '2.MD.A.1', `alignment ${row.alignment && row.alignment.code} ≠ 2.MD.A.1`);

Core.init({ el: () => ({}), t: () => '', sound: () => {}, announce: () => {}, track: () => {} });

const rounds = (row.params && Array.isArray(row.params.rounds)) ? row.params.rounds : [];
check(rounds.length >= VARIETY_MIN, `${rounds.length} rounds < ${VARIETY_MIN}`);
const ns = new Set();

rounds.forEach((round, i) => {
  const n = round.n, objKey = round.obj;
  const label = `round#${i}[${objKey},n=${n}]`;
  ns.add(n);
  check(n >= 3 && n <= 18, `${label}: n outside 3..18 (a tile would leave the 1..20 ruler)`);
  check(VALID_OBJECTS.indexOf(objKey) >= 0, `${label}: object '${objKey}' is not a RULER_OBJECTS builder`);

  const expectedSet = [n - 1, n, n + 1, n + 2];
  check(new Set(expectedSet).size === 4, `${label}: misread set not 4 distinct values`);
  expectedSet.forEach((v) => check(v >= 1 && v <= 20, `${label}: tile ${v} off the 1..20 ruler`));

  const ordered = expectedSet.slice();
  const options = ordered.map((v) => ({ key: String(v), text: String(v) }));
  check(options.map(o => Number(o.key)).sort((a, b) => a - b).join() === expectedSet.slice().sort((a, b) => a - b).join(),
    `${label}: option keys ≠ {n-1,n,n+1,n+2}`);

  Core.setupTask(options, String(n), null);
  let correctCount = 0;
  options.forEach((o) => {
    Core.answer = o.key;
    const graded = (Core.answer === String(n));   // the wrapper's check predicate
    if (graded) correctCount++;
    if (Number(o.key) === n) check(graded === true, `${label}: correct tile '${o.key}' graded wrong`);
    else check(graded === false, `${label}: foil '${o.key}' graded correct`);
  });
  check(correctCount === 1, `${label}: ${correctCount} correct options (expected EXACTLY 1 — no-two-correct)`);
});
check(ns.size >= 5, `pool should span a range of lengths (saw ${ns.size} distinct n)`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} violation(s) across ${rounds.length} round(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${rounds.length} round(s): n∈3..18 on-scale, tiles = {n-1,n,n+1,n+2} (all 1..20), correct = n, EXACTLY ONE true (no-two-correct, REAL core), valid objects, ${ns.size} distinct lengths; ≥${VARIETY_MIN}.`);
process.exit(0);
