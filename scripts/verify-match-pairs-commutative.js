#!/usr/bin/env node
/* =====================================================================
   verify-match-pairs-commutative.js — build-time correctness gate for the
   1.OA.B.3 "Add It Both Ways" commutative-property activity.
   ---------------------------------------------------------------------
   Loads the REAL mini tools/match-pairs-core.js (window shim) + the shipped
   manifest row, and proves, MEASURED (not eyeballed):
     1. each task = 6 cards / 3 DISTINCT sums / each sum exactly 2 cards;
     2. each sum's two cards are a true COMMUTED pair "a + b" & "b + a"
        (a ≠ b, a + b === value) — i.e. genuinely commutativity, not a
        re-decomposition;
     3. driving the REAL core (setupTask shuffle → onCardTap to form the 3
        correct pairs) gives allPaired() true AND every formed pair has
        a.value === b.value (the wrapper's grade predicate accepts it);
     4. a CROSS-value pairing is rejected by the same predicate (discriminates);
     5. ≥7 tasks (§A.13.60 variety floor).
   The core renders DOM in render()/paint(), but paint() early-returns when
   _cardEls is unset and _speakCard guards on window.LCSAudio — so onCardTap's
   state machine runs headless with a stub api. Exit 0 = pass; 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const VARIETY_MIN = 7;
const ROW_ID = 'match-pairs.add-it-both-ways.1-oa-b-3';
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
check(row.task_template === 'commutative', `row task_template ${row.task_template} ≠ commutative`);
check(row.alignment && row.alignment.code === '1.OA.B.3', `row alignment ${row.alignment && row.alignment.code} ≠ 1.OA.B.3`);

const tasks = (row.params && Array.isArray(row.params.tasks)) ? row.params.tasks : [];
check(tasks.length >= VARIETY_MIN, `${tasks.length} tasks < ${VARIETY_MIN} variety floor (§A.13.60)`);

/* Parse "a + b" → [a,b]; null if not a 2-addend addition. */
function parseAdd(s) {
  const m = /^\s*(\d+)\s*\+\s*(\d+)\s*$/.exec(String(s));
  return m ? [parseInt(m[1], 10), parseInt(m[2], 10)] : null;
}

let total = 0;
tasks.forEach((t, ti) => {
  total++;
  const label = `task#${ti}`;
  const cards = (t && Array.isArray(t.cards)) ? t.cards : [];
  check(cards.length === 6, `${label}: ${cards.length} cards (expected 6)`);

  /* group indices by value */
  const byVal = {};
  cards.forEach((c, i) => {
    if (c && typeof c.value === 'number') (byVal[c.value] = byVal[c.value] || []).push(i);
  });
  const vals = Object.keys(byVal);
  check(vals.length === 3, `${label}: ${vals.length} distinct sums (expected 3)`);
  vals.forEach((v) => {
    const idxs = byVal[v];
    check(idxs.length === 2, `${label}: sum ${v} appears ${idxs.length}x (expected 2)`);
    if (idxs.length === 2) {
      const A = parseAdd(cards[idxs[0]].display), B = parseAdd(cards[idxs[1]].display);
      check(!!A && !!B, `${label}: sum ${v} cards not "a + b" form: "${cards[idxs[0]].display}" / "${cards[idxs[1]].display}"`);
      if (A && B) {
        check(A[0] !== A[1], `${label}: sum ${v} addends equal (not commutative): ${A[0]}+${A[1]}`);
        check(A[0] + A[1] === Number(v) && B[0] + B[1] === Number(v), `${label}: sum ${v} addends don't sum to value`);
        /* commuted: same multiset, swapped order */
        check(A[0] === B[1] && A[1] === B[0], `${label}: sum ${v} pair is not a swap: "${cards[idxs[0]].display}" vs "${cards[idxs[1]].display}"`);
      }
    }
  });

  /* ---- drive the REAL core: form the 3 correct (equal-value) pairs ---- */
  Core.init({ sound: function () {}, lang: 'en' });
  Core.setupTask({ cards: cards.slice() });   // core shuffles into Core.cards
  // re-group by value in the SHUFFLED array
  const sVal = {};
  Core.cards.forEach((c, i) => { if (c && typeof c.value === 'number') (sVal[c.value] = sVal[c.value] || []).push(i); });
  Object.keys(sVal).forEach((v) => {
    const idxs = sVal[v];
    if (idxs.length === 2) { Core.onCardTap(idxs[0]); Core.onCardTap(idxs[1]); }
  });
  check(Core.allPaired() === true, `${label}: correct pairing did not reach allPaired()`);
  let allEq = true;
  Core.pairsFormed.forEach((p) => {
    const a = Core.cards[p[0]], b = Core.cards[p[1]];
    if (!(a && b && typeof a.value === 'number' && a.value === b.value)) allEq = false;
  });
  check(allEq, `${label}: a formed pair was not equal-value (grade predicate rejects correct pairing)`);

  /* ---- discriminate: a CROSS-value pair must be rejected ---- */
  Core.init({ sound: function () {}, lang: 'en' });
  Core.setupTask({ cards: cards.slice() });
  // find two indices of DIFFERENT value, pair them
  let i0 = 0, i1 = -1;
  for (let k = 1; k < Core.cards.length; k++) {
    if (Core.cards[k].value !== Core.cards[i0].value) { i1 = k; break; }
  }
  check(i1 >= 0, `${label}: could not find a cross-value pair to test discrimination`);
  if (i1 >= 0) {
    Core.onCardTap(i0); Core.onCardTap(i1);
    const a = Core.cards[i0], b = Core.cards[i1];
    const accepted = a && b && typeof a.value === 'number' && a.value === b.value;
    check(!accepted, `${label}: a cross-value pairing (${a.display} / ${b.display}) was wrongly graded equal-value`);
  }
});

if (failures.length) {
  console.error(`FAIL — ${failures.length} violation(s) across ${total} task(s):`);
  failures.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`PASS — ${total} task(s): 6 cards / 3 distinct sums / each a true commuted pair (a+b ↔ b+a, a≠b); REAL core forms the correct pairing (allPaired + equal-value), cross-value rejected; ≥${VARIETY_MIN} tasks.`);
process.exit(0);
