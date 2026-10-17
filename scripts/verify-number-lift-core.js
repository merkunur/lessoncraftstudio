#!/usr/bin/env node
/* =====================================================================
   verify-number-lift-core.js — the model gate for ACTIVITY #19, the
   Number Elevator (K.CC.C.7: which of two written numbers is bigger).
   Its OWN ground truth, never read off the core.
   Run: node scripts/verify-number-lift-core.js
   Mutation: NL_CORE_DIR=<dir> loads the core from <dir> (mutate-number-lift.js).
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const DIR = process.env.NL_CORE_DIR || MINI;
const C = require(path.join(DIR, 'number-lift-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const TRUTH = { to10: [[6, 9], [4, 3], [8, 2], [5, 7], [10, 9], [1, 6], [7, 8], [3, 5], [9, 4]], to5: [[2, 4], [5, 3], [1, 2], [4, 5], [3, 1], [2, 5], [4, 1], [3, 4]] };
const REFUSED = ['chicken', 'hen', 'calf', 'duckling', 'foal', 'owl', 'bee', 'cat_2', 'horse_2'];
const make = (l, r, labels) => C.newState({ id: 'x-' + l + '-' + r, left: l, right: r, floors: Math.max(l, r) > 5 ? 10 : 5, animals: ['pig', 'dog'], answer: l > r ? 'left' : 'right', labels: labels || 'shown' });

console.log('[A] the rounds');
const pics = JSON.parse(fs.readFileSync(path.join(MINI, 'pictures', 'farm-animals.json'), 'utf8'));
for (const range of ['to10', 'to5']) {
  const R = C.rounds(range, 'nl'), T = TRUTH[range], max = range === 'to10' ? 10 : 5;
  is(R.length === T.length && R.length >= 7, `${range}: ${R.length} rounds (≥ 7)`);
  is(R.map(r => r.left + '/' + r.right).join() === T.map(p => p.join('/')).join(), `${range}: ${T.map(p => p.join('/')).join(' ')}`);
  is(R.every(r => r.left >= 1 && r.right >= 1 && r.left <= max && r.right <= max && r.floors === max), `${range}: every number 1..${max} on a building of ${max} floors — never 0`);
  is(R.every(r => r.left !== r.right), `${range}: never the same floor (one bigger number every round)`);
  is(R.every(r => r.answer === (r.left > r.right ? 'left' : 'right')), `${range}: the answer is the passenger with the bigger number`);
  const L = R.filter(r => r.answer === 'left').length;
  is(L >= 3 && R.length - L >= 3, `${range}: the bigger number on the left ${L}×, on the right ${R.length - L}× (no side tell)`);
  is(R.filter(r => Math.abs(r.left - r.right) === 1).length >= 2, `${range}: neighbouring numbers at least twice (the hard comparisons)`);
  is(R.some(r => Math.max(r.left, r.right) === max) && R.some(r => Math.min(r.left, r.right) === 1), `${range}: the ends of the range appear (1 and ${max})`);
  is(R.every(r => r.animals[0] !== r.animals[1]), `${range}: two different passengers every round`);
  for (let i = 1; i < R.length; i++) is(R[i].animals.join() !== R[i - 1].animals.join(), `${range}: rounds ${i - 1} and ${i} bring different passengers`);
  is(C.rounds(range, 'nl', 'hidden').every(r => r.labels === 'hidden') && R.every(r => r.labels === 'shown'), `${range}: the floor-number setting reaches every round`);
}
const used = new Set([].concat(...C.rounds('to10').concat(C.rounds('to5')).map(r => r.animals)));
is([...used].sort().join() === [...C.NOUNS].sort().join(), 'the declared passenger list (it goes into the manifest) is exactly the passengers the rounds use');
for (const noun of used) {
  const e = pics.nouns[noun];
  is(!!e && LOCALES.every(l => e.labels[l] && e.labels[l][0]) && fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', C.THEME, noun + '@2x.webp')), `${noun}: a labelled library picture on disk`);
  is(!REFUSED.includes(noun), `${noun}: not a near-double or an odd passenger`);
}

console.log('[B] choosing and checking');
for (const [l, r] of [[6, 9], [4, 3], [10, 9], [1, 2]]) {
  const st = make(l, r), ans = l > r ? 'left' : 'right', wrong = ans === 'left' ? 'right' : 'left', tag = `${l}/${r}`;
  let c = C.check(st);
  is(c.slip === 'none' && st.misses === 0 && C.hintKey(st) === 'hintStart', `${tag}: no choice → start hint, no miss`);
  is(!C.choose(st, 'middle') && C.choose(st, wrong), `${tag}: only left or right`);
  c = C.check(st);
  is(c.slip === 'wrong' && st.misses === 1 && C.hintKey(st) === 'hintFind' && C.litFloors(st).length === 0, `${tag}: wrong → a miss, "find both numbers", no floor lit yet`);
  c = C.check(st);
  is(st.misses === 2 && C.hintKey(st) === 'hintLit' && C.litFloors(st).sort((a, b) => a - b).join() === [l, r].sort((a, b) => a - b).join(), `${tag}: wrong again → both floors lit`);
  C.choose(st, wrong);
  is(C.litFloors(st).length === 0, `${tag}: a new choice takes the lights away until the next Check`);
  C.choose(st, ans); c = C.check(st);
  is(c.ok && st.done && C.ride(st).join() === [Math.min(l, r), Math.max(l, r)].join(), `${tag}: right → the ride stops at ${Math.min(l, r)} then ${Math.max(l, r)}`);
  is(C.bigger(st) === Math.max(l, r) && C.smaller(st) === Math.min(l, r), `${tag}: bigger ${Math.max(l, r)}, smaller ${Math.min(l, r)}`);
  is(!C.choose(st, wrong) && C.check(st).ok && C.litFloors(st).length === 2, `${tag}: a finished round cannot change; both floors stay lit`);
}
{
  const st = make(3, 7, 'hidden'); C.choose(st, 'left'); C.check(st);
  is(C.hintKey(st) === 'hintCount', 'floor numbers hidden: the first hint says count the floors');
  const st2 = make(3, 7); is(C.ride(st2).length === 0, 'no ride before the right answer');
}

console.log('[C] the layout');
for (let W = 240; W <= 1400; W += 9) for (const floors of [10, 5]) {
  const L = C.layout(W, floors), wide = W >= 560;
  const ok = L.mode === (wide ? 'wide' : 'stack') && L.floors === floors && L.buildH === floors * L.floorH && L.floorH >= 28 && (!wide || L.buildH <= 440) && (wide || L.buildH <= 300)
    && (wide ? L.buildW + 2 * (L.pic + 30) + 46 <= W : L.buildW + 2 * (L.pic + 22) + 18 <= W) && (W < 648 || L.pic >= 96) && (wide || W < 286 || L.pic >= 64) && (wide || L.pic >= 48);
  if (!ok) is(false, `W ${W}/${floors}: ${JSON.stringify(L)}`); else PASS++;
}

console.log('[D] the strings of the activity');
{
  const S = require(path.join(MINI, 'number-lift-activity.js')).strings, keys = Object.keys(S);
  for (const k of keys) is(LOCALES.every(l => typeof S[k][l] === 'string' && S[k][l].trim()), `${k}: all 11 locales`);
  is(['hintStart', 'hintFind', 'hintCount', 'hintLit'].every(k => keys.includes(k)), 'every hint the core can name exists');
  is(LOCALES.every(l => S.celebrate[l].includes('{b}') && S.celebrate[l].includes('{s}') && S.celebrate[l].indexOf('{b}') < S.celebrate[l].indexOf('{s}')), 'the celebration says the bigger number first');
  is(LOCALES.every(l => S.passengerAria[l].includes('{n}') && S.buildingLabel[l].includes('{f}')), 'the labels name the floor');
  is(LOCALES.every(l => !/\{/.test(S.instruction[l] + S.prompt[l])), 'no placeholder in the shell-filled lines');
}

console.log(`\nverify-number-lift-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
