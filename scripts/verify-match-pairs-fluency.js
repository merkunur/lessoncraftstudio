#!/usr/bin/env node
/* =====================================================================
   verify-match-pairs-fluency.js — build-time correctness gate for the
   2.OA.B.2 "Match Facts to 20" fluency-within-20 activity.
   ---------------------------------------------------------------------
   Loads the REAL mini tools/match-pairs-core.js (window shim) + the shipped
   manifest row, and proves, MEASURED (not eyeballed):
     1. each task = 6 cards / 3 DISTINCT values / each value exactly 2 cards;
     2. each value's two cards = exactly ONE complete expression "a op b"
        (op ∈ +, −  [U+2212]) that EVALUATES to value, value 0..20, plus the
        number card whose display === String(value);
     3. the pool spans BOTH + and − (fluency both ways);
     4. driving the REAL core (setupTask shuffle → onCardTap to form the 3
        correct pairs) gives allPaired() true AND every formed pair has
        a.value === b.value;
     5. a CROSS-value pairing is rejected by the same predicate;
     6. ≥7 tasks (§A.13.60).
   Headless drive: paint() early-returns w/o _cardEls; _speakCard guards on
   window.LCSAudio. Exit 0 = pass; 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const ROW_ID = 'match-pairs.match-facts-to-20.2-oa-b-2';
const REPO = path.join(__dirname, '..');
const coreSrc = fs.readFileSync(path.join(REPO, 'mini tools', 'match-pairs-core.js'), 'utf8');
const win = {};
new Function('window', coreSrc)(win);
const Core = win.MatchPairsCore;
if (!Core) { console.error('FAIL: match-pairs-core.js did not define window.MatchPairsCore'); process.exit(1); }

const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'match-pairs-activities.json'), 'utf8'));
const row = manifest.find((r) => r.id === ROW_ID);
const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

if (!row) { console.error('FAIL: manifest row ' + ROW_ID + ' not found'); process.exit(1); }
check(row.task_template === 'fluency-within-20', `row task_template ${row.task_template} ≠ fluency-within-20`);
check(row.alignment && row.alignment.code === '2.OA.B.2', `row alignment ${row.alignment && row.alignment.code} ≠ 2.OA.B.2`);

const tasks = (row.params && Array.isArray(row.params.tasks)) ? row.params.tasks : [];
check(tasks.length >= VARIETY_MIN, `${tasks.length} tasks < ${VARIETY_MIN} variety floor (§A.13.60)`);

/* Parse "a + b" or "a − b" (U+2212) → {op, val}; null if not a complete fact. */
function parseFact(s) {
  const m = /^\s*(\d+)\s*([+−])\s*(\d+)\s*$/.exec(String(s));
  if (!m) return null;
  const a = parseInt(m[1], 10), b = parseInt(m[3], 10);
  return { op: m[2] === '+' ? '+' : '-', val: m[2] === '+' ? a + b : a - b };
}

let total = 0;
const opsSeen = new Set();
tasks.forEach((t, ti) => {
  total++;
  const label = `task#${ti}`;
  const cards = (t && Array.isArray(t.cards)) ? t.cards : [];
  check(cards.length === 6, `${label}: ${cards.length} cards (expected 6)`);

  const byVal = {};
  cards.forEach((c, i) => { if (c && typeof c.value === 'number') (byVal[c.value] = byVal[c.value] || []).push(i); });
  const vals = Object.keys(byVal);
  check(vals.length === 3, `${label}: ${vals.length} distinct values (expected 3)`);
  vals.forEach((v) => {
    const idxs = byVal[v];
    check(idxs.length === 2, `${label}: value ${v} appears ${idxs.length}x (expected 2)`);
    if (idxs.length === 2) {
      const A = cards[idxs[0]], B = cards[idxs[1]];
      const fA = parseFact(A.display), fB = parseFact(B.display);
      // exactly one is a complete fact, the other is the bare number === value
      const facts = [fA, fB].filter(Boolean);
      check(facts.length === 1, `${label}: value ${v} should have exactly 1 expression card + 1 number card (got ${facts.length} expressions: "${A.display}" / "${B.display}")`);
      if (facts.length === 1) {
        const fact = facts[0], numCard = fA ? B : A;
        check(fact.val === Number(v), `${label}: expression evaluates to ${fact.val} ≠ value ${v}`);
        check(Number(v) >= 0 && Number(v) <= 20, `${label}: value ${v} out of within-20 scope`);
        check(numCard.display === String(v), `${label}: number card "${numCard.display}" ≠ "${v}"`);
        opsSeen.add(fact.op);
      }
    }
  });

  /* ---- drive the REAL core: form the 3 correct (equal-value) pairs ---- */
  Core.init({ sound: function () {}, lang: 'en' });
  Core.setupTask({ cards: cards.slice() });
  const sVal = {};
  Core.cards.forEach((c, i) => { if (c && typeof c.value === 'number') (sVal[c.value] = sVal[c.value] || []).push(i); });
  Object.keys(sVal).forEach((v) => { const idxs = sVal[v]; if (idxs.length === 2) { Core.onCardTap(idxs[0]); Core.onCardTap(idxs[1]); } });
  check(Core.allPaired() === true, `${label}: correct pairing did not reach allPaired()`);
  let allEq = true;
  Core.pairsFormed.forEach((p) => { const a = Core.cards[p[0]], b = Core.cards[p[1]]; if (!(a && b && typeof a.value === 'number' && a.value === b.value)) allEq = false; });
  check(allEq, `${label}: a formed pair was not equal-value`);

  /* ---- discriminate: a CROSS-value pair must be rejected ---- */
  Core.init({ sound: function () {}, lang: 'en' });
  Core.setupTask({ cards: cards.slice() });
  let i0 = 0, i1 = -1;
  for (let k = 1; k < Core.cards.length; k++) { if (Core.cards[k].value !== Core.cards[i0].value) { i1 = k; break; } }
  check(i1 >= 0, `${label}: could not find a cross-value pair`);
  if (i1 >= 0) {
    Core.onCardTap(i0); Core.onCardTap(i1);
    const a = Core.cards[i0], b = Core.cards[i1];
    check(!(a.value === b.value), `${label}: a cross-value pairing (${a.display}/${b.display}) wrongly graded equal-value`);
  }
});

check(opsSeen.has('+') && opsSeen.has('-'), `pool must span BOTH + and − (saw: ${[...opsSeen].join(',')})`);

if (failures.length) {
  console.error(`FAIL — ${failures.length} violation(s) across ${total} task(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${total} task(s): 6 cards / 3 distinct values / each = one complete fact (a op b ≤20) + its number; pool spans +/−; REAL core forms correct pairing, cross-value rejected; ≥${VARIETY_MIN} tasks.`);
process.exit(0);
