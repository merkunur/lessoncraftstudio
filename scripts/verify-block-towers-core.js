#!/usr/bin/env node
/* =====================================================================
   verify-block-towers-core.js — the model gate for ACTIVITY #20, the
   Block Towers (K.CC.C.7: which of two written numbers is smaller).
   Its OWN ground truth, never read off the core.
   Run: node scripts/verify-block-towers-core.js
   Mutation: BT_CORE_DIR=<dir> loads the core from <dir> (mutate-block-towers.js).
   ===================================================================== */
'use strict';
const path = require('path');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const DIR = process.env.BT_CORE_DIR || MINI;
const C = require(path.join(DIR, 'block-towers-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const TRUTH = { to10: [[3, 8], [7, 2], [8, 9], [5, 1], [4, 7], [10, 8], [5, 6], [2, 9], [8, 4]], to5: [[2, 3], [4, 1], [3, 5], [5, 4], [1, 3], [4, 2], [2, 5], [3, 1]] };
/* #19 (the Number Elevator, pick-bigger) — the sibling's pairs; this deck must not be the same deck with the question flipped */
const SIBLING = [[6, 9], [4, 3], [8, 2], [5, 7], [10, 9], [1, 6], [7, 8], [3, 5], [9, 4]];
const make = (l, r, strip) => C.newState({ id: 'x-' + l + '-' + r, left: l, right: r, max: Math.max(l, r) > 5 ? 10 : 5, answer: l < r ? 'left' : 'right', strip: strip || 'shown' });

console.log('[A] the rounds');
for (const range of ['to10', 'to5']) {
  const R = C.rounds(range, 'bt'), T = TRUTH[range], max = range === 'to10' ? 10 : 5;
  is(R.length === T.length && R.length >= 7, `${range}: ${R.length} rounds (≥ 7)`);
  is(R.map(r => r.left + '/' + r.right).join() === T.map(p => p.join('/')).join(), `${range}: ${T.map(p => p.join('/')).join(' ')}`);
  is(R.every(r => r.left >= 1 && r.right >= 1 && r.left <= max && r.right <= max && r.max === max), `${range}: every number 1..${max} — never 0`);
  is(R.every(r => r.left !== r.right), `${range}: never the same number`);
  is(R.every(r => r.answer === (r.left < r.right ? 'left' : 'right')), `${range}: the answer is the SMALLER number`);
  const L = R.filter(r => r.answer === 'left').length;
  is(L >= 3 && R.length - L >= 3, `${range}: the smaller number on the left ${L}×, on the right ${R.length - L}× (no side tell)`);
  is(R.filter(r => Math.abs(r.left - r.right) === 1).length >= 2, `${range}: neighbouring numbers at least twice`);
  is(R.some(r => Math.max(r.left, r.right) === max) && R.some(r => Math.min(r.left, r.right) === 1), `${range}: the ends of the range appear (1 and ${max})`);
  is(new Set(R.map(r => r.left + '/' + r.right)).size === R.length, `${range}: no round twice`);
  is(C.rounds(range, 'bt', 'hidden').every(r => r.strip === 'hidden') && R.every(r => r.strip === 'shown'), `${range}: the counting-row setting reaches every round`);
}
{
  const R = C.rounds('to10'), key = (a, b) => Math.min(a, b) + '-' + Math.max(a, b);
  const sib = new Set(SIBLING.map(p => key(p[0], p[1])));
  is(R.filter(r => sib.has(key(r.left, r.right))).length <= 1, 'up to 10: at most one pair shared with the Number Elevator (#19)');
}

console.log('[B] choosing, checking, the growing towers');
for (const [l, r] of [[3, 8], [7, 2], [8, 9], [5, 1], [2, 3]]) {
  const st = make(l, r), ans = l < r ? 'left' : 'right', wrong = ans === 'left' ? 'right' : 'left', tag = `${l}/${r}`;
  const s = Math.min(l, r), b = Math.max(l, r);
  let c = C.check(st);
  is(c.slip === 'none' && st.misses === 0 && C.hintKey(st) === 'hintStart' && !C.built(st), `${tag}: no choice → start hint, no miss, no towers`);
  is(!C.choose(st, 'up') && C.choose(st, wrong), `${tag}: only left or right`);
  c = C.check(st);
  is(c.slip === 'wrong' && st.misses === 1 && C.hintKey(st) === 'hintCount' && !C.built(st), `${tag}: wrong → a miss, "count from 1", no towers yet`);
  c = C.check(st);
  is(st.misses === 2 && C.hintKey(st) === 'hintBuilt' && C.built(st), `${tag}: wrong again → the towers grow`);
  C.choose(st, wrong);
  is(!C.built(st), `${tag}: a new choice takes the towers away until the next Check`);
  C.choose(st, ans); c = C.check(st);
  is(c.ok && st.done && C.built(st), `${tag}: right → done, the towers stand`);
  is(C.smaller(st) === s && C.bigger(st) === b && C.beats(st) === b && C.stopsFirst(st) === ans, `${tag}: smaller ${s}, ${b} beats, the ${ans} tower stops first`);
  /* the growth, beat by beat: both grow together; the smaller stops at its number; the other reaches its own */
  let together = true;
  for (let k = 0; k <= b + 2; k++) {
    const h = C.towersAt(st, k), want = [Math.min(Math.min(k, b), l), Math.min(Math.min(k, b), r)];
    if (h.join() !== want.join()) together = false;
  }
  is(together, `${tag}: at beat k each tower holds min(k, its number) blocks`);
  is(C.towersAt(st, s).join() === [Math.min(s, l), Math.min(s, r)].join() && C.towersAt(st, s + 1)[ans === 'left' ? 0 : 1] === s, `${tag}: after beat ${s} the smaller tower stops growing`);
  is(C.towersAt(st, b).join() === [l, r].join(), `${tag}: at the last beat both towers stand at their numbers`);
  is(!C.choose(st, wrong) && C.check(st).ok, `${tag}: a finished round cannot change`);
}

console.log('[C] the layout');
for (let W = 240; W <= 1400; W += 9) for (const max of [10, 5]) {
  const L = C.layout(W, max), wide = W >= 560;
  const towerW = Math.ceil(L.cube * 2.1), colW = Math.max(L.card, towerW);
  const ok = L.mode === (wide ? 'wide' : 'stack') && L.max === max && L.towerH === max * L.cube && L.cube >= 20
    && (wide ? L.towerH <= 360 : L.towerH <= 240) && 2 * colW + L.gap + 16 <= W
    && L.card >= 44 && (W < 648 || L.card >= 120) && (wide || W < 286 || L.card >= 76);
  if (!ok) is(false, `W ${W}/${max}: ${JSON.stringify(L)}`); else PASS++;
}

console.log('[D] the strings of the activity');
{
  const S = require(path.join(MINI, 'block-towers-activity.js')).strings, keys = Object.keys(S);
  for (const k of keys) is(LOCALES.every(l => typeof S[k][l] === 'string' && S[k][l].trim()), `${k}: all 11 locales`);
  is(['hintStart', 'hintCount', 'hintBuilt'].every(k => keys.includes(k)), 'every hint the core can name exists');
  is(LOCALES.every(l => S.celebrate[l].includes('{s}') && S.celebrate[l].includes('{b}') && S.celebrate[l].indexOf('{s}') < S.celebrate[l].indexOf('{b}')), 'the celebration says the smaller number first');
  is(LOCALES.every(l => S.cardAria[l].includes('{n}')), 'the card label names its number');
  is(LOCALES.every(l => !/\{/.test(S.instruction[l] + S.prompt[l] + S.hintStart[l] + S.hintCount[l] + S.hintBuilt[l])), 'no placeholder in the shell-filled lines');
  is(/ \?| :| !| ;/.test(S.prompt.fr + S.hintCount.fr + S.hintBuilt.fr + S.celebrate.fr + S.instruction.fr) === false, 'fr: narrow no-break spaces before ? : ! ;');
}

console.log(`\nverify-block-towers-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
