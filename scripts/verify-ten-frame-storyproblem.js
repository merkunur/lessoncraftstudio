#!/usr/bin/env node
/* =====================================================================
   verify-ten-frame-storyproblem.js — build-time correctness gate for the
   K.OA.A.2 "Solve the Story" word-problem ten-frame activity.
   ---------------------------------------------------------------------
   Loads the REAL mini tools/ten-frame-core.js (window shim) + the shipped
   manifest row, and proves, MEASURED, for EACH locale's rounds:
     1. answer === (op === '+' ? a+b : a−b), op ∈ {+, − [U+2212]};
     2. 0 ≤ answer ≤ 10, a ≥1, b ≥1 (within-10 single frame);
     3. driving the REAL core.setCount(answer) ⇒ count === answer (the answer
        fits the single frame — no clamp distortion);
     4. text is a non-empty string AND contains the digit a AND the digit b
        (the story actually states its quantities, not a bare label);
     5. the locale's pool spans BOTH + and −;
     6. ≥7 rounds per locale (§A.13.60).
   paint() stubbed (DOM-free). Exit 0 = pass; 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const ROW_ID = 'ten-frame.solve-the-story.k-oa-a-2';
const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'ten-frame-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.TenFrameCore;
if (!Core) { console.error('FAIL: ten-frame-core.js did not define window.TenFrameCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'ten-frame-activities.json'), 'utf8'));
const row = manifest.find((r) => r.id === ROW_ID);
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

if (!row) { console.error('FAIL: manifest row ' + ROW_ID + ' not found'); process.exit(1); }
check(row.task_template === 'word-problem', `row task_template ${row.task_template} ≠ word-problem`);
check(row.alignment && row.alignment.code === 'K.OA.A.2', `row alignment ${row.alignment && row.alignment.code} ≠ K.OA.A.2`);
check((row.params && row.params.frames) === 1, `row frames ≠ 1`);

Core.init({ settings: { frames: 1 }, sound: function () {}, track: function () {}, announce: function () {} });
Core.paint = function () {};
check(Core.capacity() === 10, `capacity ${Core.capacity()} ≠ 10`);

const byLoc = (row.params && row.params.byLocale) || {};
const locales = Object.keys(byLoc);
check(locales.length >= 1, 'no byLocale rounds');
let totalRounds = 0;

locales.forEach((loc) => {
  const rounds = (byLoc[loc] && byLoc[loc].rounds) || [];
  check(rounds.length >= VARIETY_MIN, `${loc}: ${rounds.length} rounds < ${VARIETY_MIN}`);
  const ops = new Set();
  rounds.forEach((r, i) => {
    totalRounds++;
    const label = `${loc}#${i}`;
    const isAdd = (r.op === '+'), isSub = (r.op === '−');
    check(isAdd || isSub, `${label}: op "${r.op}" not + or − (U+2212)`);
    if (!(isAdd || isSub)) return;
    ops.add(isAdd ? '+' : '-');
    check(r.a >= 1 && r.b >= 1, `${label}: a/b not ≥1`);
    const expect = isAdd ? (r.a + r.b) : (r.a - r.b);
    check(r.answer === expect, `${label}: answer ${r.answer} ≠ ${r.a}${r.op}${r.b}=${expect}`);
    check(r.answer >= 0 && r.answer <= 10, `${label}: answer ${r.answer} out of 0..10`);
    check(typeof r.text === 'string' && r.text.trim().length > 0, `${label}: empty text`);
    /* the story must state its two quantities */
    if (typeof r.text === 'string') {
      check(r.text.indexOf(String(r.a)) >= 0, `${label}: text missing quantity a=${r.a} ("${r.text}")`);
      check(r.text.indexOf(String(r.b)) >= 0, `${label}: text missing quantity b=${r.b} ("${r.text}")`);
    }
    /* drive the real core: the answer fits the single frame */
    Core.count = 0; Core.setCount(r.answer);
    check(Core.count === r.answer, `${label}: core.setCount(${r.answer}) → ${Core.count}`);
  });
  check(ops.has('+') && ops.has('-'), `${loc}: pool must span + and − (saw ${[...ops].join(',')})`);
});

if (failures.length) {
  console.error(`FAIL — ${failures.length} violation(s) across ${totalRounds} round(s), ${locales.length} locale(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${totalRounds} round(s) across ${locales.length} locale(s): answer===a±b within 0..10, story states both quantities, core.setCount(answer) fits the frame, pool spans +/−, ≥${VARIETY_MIN}/locale.`);
process.exit(0);
