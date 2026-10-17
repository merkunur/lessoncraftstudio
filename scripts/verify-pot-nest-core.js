#!/usr/bin/env node
/* =====================================================================
   verify-pot-nest-core.js — the model gate for ACTIVITY #22, the Nesting
   Pots (K.CC.C.7: put written numerals 1-10 in order, biggest first; a pot
   grows to its number in the nest and only fits inside a bigger one).
   Its OWN ground truth, never read off the core.
   Run: node scripts/verify-pot-nest-core.js
   Mutation: PN_CORE_DIR=<dir> loads the core from <dir> (mutate-pot-nest.js).
   ===================================================================== */
'use strict';
const path = require('path');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const DIR = process.env.PN_CORE_DIR || MINI;
const C = require(path.join(DIR, 'pot-nest-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const TRUTH = {
  to10: [[6, 9, 2, 4], [7, 3, 5, 8], [10, 1, 6, 3], [5, 2, 9, 8], [4, 7, 1, 10], [9, 3, 6, 8], [2, 5, 10, 7], [9, 4, 6, 1], [7, 10, 3, 2]],
  to5: [[2, 5, 3], [4, 1, 3], [3, 1, 5], [1, 4, 2], [5, 2, 4], [2, 3, 1], [4, 3, 5], [1, 5, 4]]
};
const desc = (a) => a.slice().sort((x, y) => y - x);

console.log('[A] the rounds');
for (const range of ['to10', 'to5']) {
  const R = C.rounds(range, 'pn'), T = TRUTH[range], max = range === 'to10' ? 10 : 5, n = range === 'to10' ? 4 : 3;
  is(R.length === T.length && R.length >= 7, `${range}: ${R.length} rounds (≥ 7)`);
  is(R.map(r => r.pots.join('/')).join(' ') === T.map(p => p.join('/')).join(' '), `${range}: the pots`);
  is(R.every(r => r.pots.length === n && r.max === max && r.pots.every(v => v >= 1 && v <= max) && new Set(r.pots).size === n), `${range}: ${n} different pots a round, 1..${max}, never 0`);
  is(R.every(r => r.pots.join() !== desc(r.pots).join() && r.pots.join() !== desc(r.pots).reverse().join()), `${range}: the row is never already in order (either way)`);
  const at = R.map(r => r.pots.indexOf(Math.max(...r.pots)));
  is(new Set(at).size === n && at.every(i => at.filter(x => x === i).length <= Math.ceil(R.length / 2)), `${range}: the biggest pot stands in every place of the row, never mostly one (${at.join('')})`);
  is(R.filter(r => r.pots.some(a => r.pots.includes(a + 1))).length >= 3, `${range}: neighbouring numbers in at least three rounds`);
  is(R.some(r => r.pots.includes(max)) && R.some(r => r.pots.includes(1)), `${range}: 1 and ${max} appear`);
  is(new Set(R.map(r => r.pots.slice().sort().join())).size === R.length, `${range}: no two rounds with the same pots`);
  is(C.rounds(range, 'pn', 'always').every(r => r.dots === 'always') && R.every(r => r.dots === 'help'), `${range}: the dots setting reaches every round`);
}

console.log('[B] dropping, bouncing, lifting, checking');
for (const pots of [[6, 9, 2, 4], [7, 3, 5, 8], [2, 5, 3]]) {
  const r = { id: 'x', max: Math.max(...pots) > 5 ? 10 : 5, pots, dots: 'help' }, D = desc(pots), tag = pots.join('/');
  let st = C.newState(r), c = C.check(st);
  is(c.slip === 'none' && C.hintKey(st) === 'hintStart' && st.bounces === 0, `${tag}: nothing in the nest → start hint`);
  /* a smaller pot first: it fits (the nest is empty) */
  is(C.drop(st, D[1]) === 'fit' && st.nest.join() === String(D[1]), `${tag}: ${D[1]} first fits the empty nest`);
  /* the biggest after it: too big → bounce, nothing moves */
  is(C.drop(st, D[0]) === 'bounce' && st.bounces === 1 && st.nest.join() === String(D[1]) && st.tray.includes(D[0]), `${tag}: ${D[0]} into ${D[1]} bounces back`);
  is(C.drop(st, D[1]) === 'none' && C.drop(st, 99) === 'none', `${tag}: only a waiting pot can be dropped`);
  /* the rest in order fit, then the biggest is left: stuck */
  for (let i = 2; i < D.length; i++) is(C.drop(st, D[i]) === 'fit', `${tag}: ${D[i]} fits inside`);
  is(C.stuck(st) && C.liftCue(st) && st.tray.join() === String(D[0]), `${tag}: only ${D[0]} is left and nothing fits → stuck, the inside pot glows`);
  c = C.check(st);
  is(c.slip === 'stuck' && C.hintKey(st) === 'hintStuck' && !st.done, `${tag}: Check when stuck → "take a pot out"`);
  /* one lift takes the INSIDE pot; then lift the rest back (bounded: a gate loop never depends on the tool) */
  const before = st.nest.slice();
  is(C.lift(st) === before[before.length - 1] && st.nest.join() === before.slice(0, -1).join(), tag + ": a lift takes out the inside pot, " + before[before.length - 1]);
  for (let g = 0; g < 12 && st.nest.length; g++) C.lift(st);
  is(st.tray.join() === pots.join() && st.nest.length === 0 && C.lift(st) === null, `${tag}: lifting every pot back restores the row in its own order`);
  /* one bounce: no dots yet; a second bounce: the dots come */
  is(st.bounces === 1 && C.helpLevel(st) === 1 && !C.dotsOn(st), tag + ": one bounce → no dots yet");
  C.drop(st, D[1]); C.drop(st, D[0]);
  is(st.bounces === 2 && C.dotsOn(st), `${tag}: two bounces → dots on the waiting pots`);
  c = C.check(st);
  is(c.slip === 'incomplete' || c.slip === 'stuck', `${tag}: Check with pots waiting is never right`);
  C.lift(st);
  for (const v of D) is(C.drop(st, v) === 'fit', `${tag}: in order, ${v} fits`);
  c = C.check(st);
  is(c.ok && st.done && st.nest.join() === D.join(), `${tag}: the row empty → right, the nest reads ${D.join(', ')}`);
  is(C.drop(st, D[0]) === 'none' && C.lift(st) === null && C.helpLevel(st) === 0, `${tag}: a finished round cannot change`);
}
{
  const st = C.newState({ id: 'x', max: 10, pots: [6, 9, 2, 4], dots: 'help' });
  C.drop(st, 9); C.drop(st, 2);
  const c = C.check(st);
  is(c.slip === 'stuck', '9 then 2: 6 and 4 cannot go inside 2 → stuck');
  const st2 = C.newState({ id: 'x', max: 10, pots: [6, 9, 2, 4], dots: 'help' });
  C.drop(st2, 9); C.drop(st2, 4);
  is(C.check(st2).slip === 'incomplete' && C.hintKey(st2) === 'hintMore', '9 then 4: 2 still fits → incomplete, "pots still waiting"');
  const st3 = C.newState({ id: 'x', max: 10, pots: [6, 9, 2, 4], dots: 'always' });
  is(C.dotsOn(st3), 'the "always" setting shows the dots from the start');
}

console.log('[C] the layout');
for (let W = 286; W <= 1400; W += 7) for (const max of [10, 5]) {
  const L = C.layout(W, max), wide = W >= 560, n = max === 10 ? 4 : 3;
  const rimsShow = L.band <= L.k && L.band * 0.8 >= 14;
  const nestFits = L.potW(max) <= W - 16 && L.potH(max) + 10 <= L.nestH;
  const trayFits = n * L.tray + (n - 1) * 10 <= W;
  const nested = [...Array(max - 1)].every((_, i) => L.potW(i + 1) < L.potW(i + 2) && L.potH(i + 1) + L.band <= L.potH(i + 2));
  const ok = L.mode === (wide ? 'wide' : 'stack') && rimsShow && nestFits && trayFits && nested && L.tray >= 44 && (wide ? L.nestH <= 340 : L.nestH <= 260) && (W < 648 || L.tray >= 80);
  if (!ok) is(false, `W ${W}/${max}: ${JSON.stringify({ rimsShow, nestFits, trayFits, nested, tray: L.tray, nestH: L.nestH, band: L.band })}`); else PASS++;
}

console.log('[D] the strings of the activity');
{
  const S = require(path.join(MINI, 'pot-nest-activity.js')).strings, keys = Object.keys(S);
  for (const k of keys) is(LOCALES.every(l => typeof S[k][l] === 'string' && S[k][l].trim()), `${k}: all 11 locales`);
  is(['hintStart', 'hintMore', 'hintStuck', 'hintDots'].every(k => keys.includes(k)), 'every hint the core can name exists');
  is(LOCALES.every(l => S.celebrate[l].includes('{list}')), 'the celebration reads the nest out');
  is(LOCALES.every(l => S.potAria[l].includes('{n}') && S.liftAria[l].includes('{n}')), 'the pot labels name the number');
  is(LOCALES.every(l => !/\{/.test(S.instruction[l] + S.prompt[l] + S.hintStart[l] + S.hintMore[l] + S.hintStuck[l] + S.hintDots[l])), 'no placeholder in the shell-filled lines');
  is(!/ [?:!;]/.test(Object.values(S).map(o => o.fr).join(' ')), 'fr: narrow no-break spaces before ? : ! ;');
}

console.log('[E] the page prose cites only rounds the activity shows');
{
  /* (#21's reviewer caught a cited pair that no round had.) Every list of three or four numbers in the English prose must be a real round's pots. */
  const fs = require('fs');
  const en = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', 'en.json'), 'utf8')).prose['nesting-pots.seriate.k-cc-c-7'];
  const sets = new Set([].concat(...['to10', 'to5'].map(r => C.rounds(r, 'pn'))).map(r => r.pots.slice().sort((x, y) => x - y).join()));
  const lists = [...JSON.stringify(en).matchAll(/\d+(?:, \d+)+(?:,? and \d+)?/g)].map(m => m[0].match(/\d+/g).map(Number)).filter(l => l.length >= 3);
  is(lists.length >= 2, `the prose cites example rounds (${lists.map(l => l.join('/')).join(' ')})`);
  for (const l of lists) is(sets.has(l.slice().sort((x, y) => x - y).join()), `"${l.join(', ')}" is a real round`);
}

console.log(`\nverify-pot-nest-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
