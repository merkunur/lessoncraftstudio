#!/usr/bin/env node
/* =====================================================================
   verify-creek-map-core.js — the model gate for ACTIVITY #21, the Creek
   Map (K.CC.C.7: compare written numerals 1-10 by a rule — follow the
   bigger, or the smaller, number at each fork).
   Its OWN ground truth, never read off the core.
   Run: node scripts/verify-creek-map-core.js
   Mutation: CM_CORE_DIR=<dir> loads the core from <dir> (mutate-creek-map.js).
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const DIR = process.env.CM_CORE_DIR || MINI;
const C = require(path.join(DIR, 'creek-map-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const TRUTH = {
  to10: [['B', [7, 6], [5, 3]], ['S', [4, 8], [10, 9]], ['B', [2, 3], [8, 5]], ['S', [9, 6], [7, 8]], ['B', [5, 9], [4, 6]], ['S', [2, 1], [4, 5]], ['B', [10, 7], [8, 9]], ['S', [6, 10], [3, 7]], ['B', [4, 1], [2, 7]]],
  to5: [['B', [3, 2], [1, 4]], ['S', [2, 5], [4, 3]], ['B', [4, 5], [2, 1]], ['S', [5, 3], [1, 2]], ['B', [3, 1], [5, 2]], ['S', [4, 2], [3, 5]], ['B', [2, 4], [3, 4]], ['S', [3, 1], [2, 4]]]
};
const want = (rule, [l, r]) => (rule === 'bigger' ? (l > r ? 'left' : 'right') : (l < r ? 'left' : 'right'));
const ruleOf = (c) => (c === 'B' ? 'bigger' : 'smaller');

console.log('[A] the rounds');
for (const range of ['to10', 'to5']) {
  const max = range === 'to10' ? 10 : 5, T = TRUTH[range];
  const R = C.rounds(range, 'cm', 'mixed');
  is(R.length === T.length && R.length >= 7, `${range}: ${R.length} rounds (≥ 7)`);
  is(R.map(r => r.rule[0] + r.forks.map(p => p.join('/')).join(',')).join(' ') === T.map(t => ruleOf(t[0])[0] + t.slice(1).map(p => p.join('/')).join(',')).join(' '), `${range}: the authored rules and forks`);
  is(R.every(r => r.forks.length === 2 && r.forks.every(([l, rr]) => l >= 1 && rr >= 1 && l <= max && rr <= max && l !== rr) && r.max === max), `${range}: two forks a round, numbers 1..${max}, never 0, never equal`);
  is(R.filter(r => r.rule === 'bigger').length >= 3 && R.filter(r => r.rule === 'smaller').length >= 3, `${range}: "mixed" holds both rules`);
  is(R.every((r, i) => i === 0 || r.rule !== R[i - 1].rule), `${range}: "mixed" changes the rule every round (the child must read the sign)`);
  for (const setting of ['mixed', 'bigger', 'smaller']) {
    const RR = C.rounds(range, 'cm', setting);
    const ans = RR.map(r => C.answers(C.newState(r)));
    is(RR.every((r, i) => ans[i].join() === r.forks.map(p => want(r.rule, p)).join()), `${range}/${setting}: every answer is the ${setting === 'mixed' ? 'rule' : setting} number`);
    if (setting !== 'mixed') is(RR.every(r => r.rule === setting), `${range}/${setting}: the setting fixes the rule`);
    const flat = [].concat(...ans), L = flat.filter(s => s === 'left').length;
    is(L >= flat.length * 0.35 && L <= flat.length * 0.65, `${range}/${setting}: the answer on the left ${L} of ${flat.length} (no side tell)`);
    const same = ans.filter(a => a[0] === a[1]).length;
    is(same >= 2 && same <= ans.length - 2, `${range}/${setting}: both forks the same way in ${same} rounds (neither always nor never)`);
    /* a child who ignores the rule and always takes the bigger (or smaller) number must not get through a mixed deck */
    if (setting === 'mixed') for (const blind of ['bigger', 'smaller']) is(RR.some(r => r.forks.some(p => want(blind, p) !== want(r.rule, p))), `${range}: always "${blind}" fails somewhere in the mixed deck`);
  }
  is(R.filter(r => r.forks.some(([l, rr]) => Math.abs(l - rr) === 1)).length >= 3, `${range}: neighbouring numbers in at least three rounds`);
  is(R.some(r => r.forks.some(p => Math.max(...p) === max)) && R.some(r => r.forks.some(p => Math.min(...p) === 1)), `${range}: the ends of the range appear`);
  is(new Set(R.map(r => r.friend)).size === R.length, `${range}: a different friend waits at the pond every round`);
}
const pics = JSON.parse(fs.readFileSync(path.join(MINI, 'pictures', 'forest-creatures.json'), 'utf8'));
const veh = JSON.parse(fs.readFileSync(path.join(MINI, 'pictures', 'vehicles.json'), 'utf8'));
for (const f of C.FRIENDS) is(!!pics.nouns[f] && LOCALES.every(l => pics.nouns[f].labels[l] && pics.nouns[f].labels[l][0]) && fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', C.FRIEND_THEME, f + '@2x.webp')), `${f}: a labelled library picture on disk`);
is(!C.FRIENDS.includes('toad') && C.FRIEND_THEME === 'forest creatures', 'no toad (the frog\'s near-double)');
is(!!veh.nouns[C.BOAT.noun] && fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', C.BOAT.theme, C.BOAT.noun + '@2x.webp')), 'the boat is a library picture on disk');

console.log('[B] planning, checking, the voyage');
for (const [code, f1, f2] of [['B', [7, 6], [5, 3]], ['S', [4, 8], [10, 9]], ['B', [2, 3], [8, 5]], ['S', [9, 6], [7, 8]]]) {
  const rule = ruleOf(code), r = { id: 'x', max: 10, rule, forks: [f1, f2], friend: 'frog' };
  const st = C.newState(r), a0 = want(rule, f1), a1 = want(rule, f2), o = (s) => (s === 'left' ? 'right' : 'left'), tag = `${rule} ${f1.join('/')} ${f2.join('/')}`;
  const R = rule === 'bigger' ? 'Big' : 'Small';
  let c = C.check(st);
  is(c.slip === 'none' && st.misses === 0 && C.hintKey(st) === 'hintStart' && C.sail(st).forks === 0, `${tag}: nothing planned → start hint, no miss, no voyage`);
  is(!C.choose(st, 2, 'left') && !C.choose(st, 0, 'up') && C.choose(st, 0, a0), `${tag}: only fork 1 or 2, left or right`);
  c = C.check(st);
  is(c.slip === 'incomplete' && st.misses === 0 && C.hintKey(st) === 'hintEvery' && C.sail(st).forks === 0, `${tag}: one fork planned → "choose at both forks", no miss, no voyage`);
  C.choose(st, 1, o(a1)); c = C.check(st);
  is(c.slip === 'wrong' && st.misses === 1 && C.stuckAt(st) === 1 && C.hintKey(st) === 'hintFork' + R && C.dotsAt(st) === -1, `${tag}: second fork wrong → stuck at fork 2, "${'hintFork' + R}", no dots yet`);
  is(C.sail(st).forks === 2 && !C.sail(st).pond, `${tag}: the boat sails through fork 1 and stops in fork 2`);
  C.choose(st, 0, o(a0)); c = C.check(st);
  is(st.misses === 2 && C.stuckAt(st) === 0 && C.hintKey(st) === 'hintDots' + R && C.dotsAt(st) === 0 && C.sail(st).forks === 1, `${tag}: both wrong → stuck at the FIRST wrong fork, dots there`);
  C.choose(st, 0, a0);
  is(C.stuckAt(st) === -1 && C.dotsAt(st) === -1 && C.sail(st).forks === 0, `${tag}: a new choice takes the reeds and the dots away until the next Check`);
  C.choose(st, 1, a1); c = C.check(st);
  is(c.ok && st.done && C.sail(st).forks === 2 && C.sail(st).pond, `${tag}: right → the boat sails all the way to the pond`);
  const fol = [a0 === 'left' ? f1[0] : f1[1], a1 === 'left' ? f2[0] : f2[1]];
  is(C.followed(st).join() === fol.join(), `${tag}: the numbers followed are ${fol.join(' and ')}`);
  is(!C.choose(st, 0, o(a0)) && C.check(st).ok, `${tag}: a finished round cannot change`);
}

console.log('[C] the layout');
/* the smallest real stage is 288 px (a 320 phone); the sweep starts just below it */
for (let W = 286; W <= 1400; W += 7) {
  const L = C.layout(W), wide = W >= 560;
  const sepOk = ['left', 'right'].every(s => Math.abs(L.boatX[s] - L.buoyX[s]) >= (L.boat + L.buoy) / 2);
  const inside = ['left', 'right'].every(s => L.buoyX[s] - L.buoy / 2 >= L.m && L.buoyX[s] + L.buoy / 2 <= W - L.m);
  const island = 2 * L.d - L.chanW;
  const boatInChan = ['left', 'right'].every(s => Math.abs(L.boatX[s] - L.chanX[s]) + L.boat / 2 <= L.chanW / 2 + 1);
  const friendIn = L.cx + Math.round(W * 0.3) + L.friend - 6 <= W;
  const ok = L.mode === (wide ? 'wide' : 'stack') && sepOk && inside && island >= 30 && boatInChan && friendIn && L.buoy >= 44
    && (W < 648 || L.boat >= 96) && (wide || W < 328 || L.boat >= 64) && (wide ? L.H <= 620 : L.H <= 400) && L.buoyY.every((y, k) => y < L.stuckY[k]);
  if (!ok) is(false, `W ${W}: ${JSON.stringify({ sepOk, inside, island, boatInChan, friendIn, boat: L.boat, H: L.H })}`); else PASS++;
}

console.log('[D] the strings of the activity');
{
  const S = require(path.join(MINI, 'creek-map-activity.js')).strings, keys = Object.keys(S);
  for (const k of keys) is(LOCALES.every(l => typeof S[k][l] === 'string' && S[k][l].trim()), `${k}: all 11 locales`);
  is(['hintStart', 'hintEvery', 'hintForkBig', 'hintForkSmall', 'hintDotsBig', 'hintDotsSmall', 'promptBig', 'promptSmall', 'celebrateBig', 'celebrateSmall', 'signBig', 'signSmall'].every(k => keys.includes(k)), 'every key the core and the wrapper can name exists');
  is(['celebrateBig', 'celebrateSmall'].every(k => LOCALES.every(l => S[k][l].includes('{a}') && S[k][l].includes('{b}') && S[k][l].indexOf('{a}') < S[k][l].indexOf('{b}'))), 'the celebration names both numbers followed, in order');
  is(LOCALES.every(l => S.buoyAria[l].includes('{f}') && S.buoyAria[l].includes('{n}')), 'the buoy label names its fork and its number');
  is(LOCALES.every(l => S.promptBig[l] !== S.promptSmall[l] && S.hintForkBig[l] !== S.hintForkSmall[l] && S.hintDotsBig[l] !== S.hintDotsSmall[l] && S.celebrateBig[l] !== S.celebrateSmall[l] && S.signBig[l] !== S.signSmall[l]), 'the bigger and smaller strings differ in every locale');
  is(LOCALES.every(l => !/\{/.test(S.instruction[l] + S.promptBig[l] + S.promptSmall[l] + S.hintStart[l] + S.hintEvery[l] + S.hintForkBig[l] + S.hintForkSmall[l] + S.hintDotsBig[l] + S.hintDotsSmall[l])), 'no placeholder in the shell-filled lines');
  is(!/ [?:!;]/.test(Object.values(S).map(o => o.fr).join(' ')), 'fr: narrow no-break spaces before ? : ! ;');
}

console.log('[E] the page prose cites only pairs the activity shows');
{
  /* the reviewer caught "far apart, like 9 and 2" — no fork is 9/2. Every "N and M" in the English prose must be a real fork (either order) or the two numbers followed in a real round. */
  const en = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', 'en.json'), 'utf8')).prose['comparison-creek.river-steer.k-cc-c-7'];
  const all = [].concat(...['to10', 'to5'].map(r => C.rounds(r, 'cm', 'mixed')));
  const real = new Set();
  for (const r of all) { r.forks.forEach(p => { real.add(p.join('/')); real.add(p.slice().reverse().join('/')); }); real.add(C.followed(C.newState(r)).join('/')); }
  const cited = [...JSON.stringify(en).matchAll(/(?<!between )(\d+) and (\d+)/g)].map(m => m[1] + '/' + m[2]);
  is(cited.length >= 3, `the prose cites example pairs (${cited.join(' ')})`);
  for (const c of cited) is(real.has(c), `"${c.replace('/', ' and ')}" is a real fork or a real route`);
}

console.log(`\nverify-creek-map-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
