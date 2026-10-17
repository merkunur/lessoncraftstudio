#!/usr/bin/env node
/* =====================================================================
   verify-partner-bows-core.js — the model gate for ACTIVITY #17, the
   Partner Bows (K.CC.C.6: which group has more — by pairing or counting).
   Its OWN ground truth, never read off the core.
   Run: node scripts/verify-partner-bows-core.js
   Mutation: PB_CORE_DIR=<dir> loads the core from <dir> (mutate-partner-bows.js).
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const DIR = process.env.PB_CORE_DIR || MINI;
const C = require(path.join(DIR, 'partner-bows-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const TRUTH = {
  to10: { pairs: [[6, 8], [7, 7], [9, 6], [5, 4], [4, 9], [8, 8], [10, 7], [3, 5], [6, 7]], max: 10, places: 12 },
  to5: { pairs: [[3, 4], [5, 5], [4, 2], [2, 5], [5, 3], [1, 3], [4, 4], [3, 2]], max: 5, places: 8 }
};
const PAIRS_OK = { bee: 'flower', bunny: 'carrot', squirrel: 'acorn', mouse: 'cheese', snail: 'leaf', robin: 'birdhouse' };
const make = (a, b, trick) => C.newState({ id: 'x-' + a + '-' + b, a, b, trick: trick || '', kind: C.KINDS[0], places: 12, answer: a > b ? 'a' : a < b ? 'b' : 'same' });

console.log('[A] the rounds');
for (const range of ['to10', 'to5']) {
  const R = C.rounds(range, 'pb'), T = TRUTH[range];
  is(R.length === T.pairs.length && R.length >= 7, `${range}: ${R.length} rounds (≥ 7)`);
  is(R.map(r => r.a + '/' + r.b).join() === T.pairs.map(p => p.join('/')).join(), `${range}: the groups are ${T.pairs.map(p => p.join('/')).join(' ')}`);
  is(R.every(r => r.a >= 1 && r.b >= 1 && r.a <= T.max && r.b <= T.max), `${range}: every group 1..${T.max} — never 0`);
  is(R.every(r => r.answer === (r.a > r.b ? 'a' : r.a < r.b ? 'b' : 'same')), `${range}: the answer is the bigger group (or "the same")`);
  const n = (x) => R.filter(r => r.answer === x).length;
  is(n('a') >= 2 && n('b') >= 2 && n('same') >= 2, `${range}: top ${n('a')} · bottom ${n('b')} · same ${n('same')} — every answer at least twice`);
  is(R.some(r => Math.abs(r.a - r.b) === 1), `${range}: at least one round one apart (the eye cannot tell, pairing can)`);
  is(R.every(r => r.places === T.places && r.places - 1 >= Math.max(r.a, r.b)), `${range}: ${T.places} places per mat, one kept for "More", room for every group`);
  /* the spacing must never predict the answer: among tricky rounds with a bigger group, "the huddled group has more" is right in
     40–60 % of them — otherwise picking the huddled (or the spread) group would win without matching or counting */
  const tr = R.filter(r => r.trick && r.a !== r.b), huddledMore = tr.filter(r => (r.trick === 'a' ? r.b > r.a : r.a > r.b)).length;
  is(tr.length >= 4 && huddledMore / tr.length >= 0.4 && huddledMore / tr.length <= 0.6, `${range}: the spacing never gives the answer — the huddled group has more in ${huddledMore} of ${tr.length} tricky rounds`);
  is(tr.some(r => (r.trick === 'a' ? r.a < r.b : r.b < r.a)), `${range}: some rounds spread the SMALLER group (the eye is fooled)`);
  is(R.filter(r => r.trick).length >= Math.ceil(R.length / 2), `${range}: most rounds carry the spacing trick`);
  is(R.filter(r => r.answer === 'same').every(r => r.trick), `${range}: every "same" round has one group spread and one huddled (the conservation case)`);
  is(new Set(R.map(r => r.id)).size === R.length, `${range}: ids distinct`);
  for (let i = 1; i < R.length; i++) is(R[i].kind.a !== R[i - 1].kind.a, `${range}: rounds ${i - 1} and ${i} show different partners`);
  is(C.rounds(range, 'pb', 'even').every(r => r.trick === ''), `${range}: "even" spacing takes every trick away`);
}
is(C.KINDS.every(k => PAIRS_OK[k.a] === k.b), 'every pair is one that belongs together (bee–flower, bunny–carrot, squirrel–acorn, mouse–cheese, snail–leaf, robin–birdhouse)');
for (const k of C.KINDS) for (const [noun, dir] of [[k.a, k.aTheme], [k.b, k.bTheme]]) {
  const f = path.join(MINI, 'pictures', dir.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.json');
  const pics = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null, e = pics && pics.nouns[noun];
  is(!!e && LOCALES.every(l => e.labels[l] && e.labels[l][0]) && fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', dir, noun + '@2x.webp')), `${dir}/${noun}: a labelled library picture on disk`);
}

console.log('[B] pairing');
{
  const st = make(5, 3);
  is(C.tap(st, 'a', 2) === 'pick' && st.pick.side === 'a' && st.pick.i === 2, 'a first tap picks');
  is(C.tap(st, 'a', 4) === 'pick' && st.pick.i === 4, 'a tap in the same group moves the pick');
  is(C.tap(st, 'a', 4) === 'unpick' && st.pick === null, 'a tap on the picked one drops the pick');
  is(C.tap(st, 'b', 1) === 'pick' && C.tap(st, 'a', 0) === 'pair' && st.pairs.length === 1 && st.pairs[0].join() === '0,1' && st.pick === null, 'one in each group → a pair (top first in the pair)');
  is(C.pairOf(st, 'a', 0) === 0 && C.pairOf(st, 'b', 1) === 0 && C.pairOf(st, 'a', 1) === -1, 'each knows its pair');
  is(C.tap(st, 'a', 0) === 'unpair' && st.pairs.length === 0, 'a tap on a bowed one takes the pair apart');
  C.tap(st, 'a', 0); C.tap(st, 'b', 0); C.tap(st, 'a', 1); C.tap(st, 'b', 1);
  is(C.tap(st, 'b', 0) === 'unpair' && st.pairs.length === 1 && st.pairs[0].join() === '1,1', 'unpairing from the bottom works too');
  is(!C.tap(st, 'a', 5) && !C.tap(st, 'b', 3) && !C.tap(st, 'c', 0) && !C.tap(st, 'a', 0.5), 'no tap outside the groups');
  is(C.lone(st, 'a').join() === '0,2,3,4' && C.lone(st, 'b').join() === '0,2', 'the ones without a partner');
  C.pairAll(st);
  is(st.pairs.length === 3 && C.lone(st, 'a').join() === '3,4' && C.lone(st, 'b').length === 0 && !C.canPair(st), 'pairing the rest: as many pairs as the smaller group, the extra two alone');
}

console.log('[C] Check and the help');
for (const [a, b] of [[6, 8], [7, 7], [9, 6], [1, 3]]) {
  const ans = a > b ? 'a' : a < b ? 'b' : 'same', wrong = ans === 'same' ? 'a' : 'same', tag = `${a}/${b}`;
  const st = make(a, b, 'a');
  let r = C.check(st);
  is(r.slip === 'none' && st.misses === 0 && C.hintKey(st) === 'hintStart', `${tag}: no answer → start hint, no miss`);
  is(!C.choose(st, 'x') && C.choose(st, wrong), `${tag}: only top / bottom / same can be chosen`);
  r = C.check(st);
  is(r.slip === 'wrong' && st.misses === 1 && C.hintKey(st) === 'hintPair' && st.pairs.length === 0, `${tag}: wrong, nothing paired → miss, "pair them up" (and nothing paired for the child yet)`);
  C.pairAll(st); C.choose(st, wrong); r = C.check(st);
  is(st.misses === 2 && C.hintKey(st) === 'hintTied' && C.showLone(st), `${tag}: wrong again → second miss, the rest paired, the lone ones ringed`);
  C.choose(st, wrong);
  is(!C.showLone(st), `${tag}: a change takes the rings away until the next Check`);
  C.choose(st, ans); r = C.check(st);
  is(r.ok && st.done && C.showLone(st) && st.pairs.length === Math.min(a, b), `${tag}: right → done, every pair bowed`);
  is(!C.tap(st, 'a', 0) && !C.choose(st, wrong) && C.check(st).ok, `${tag}: a finished round cannot change`);
}
{
  const st = make(5, 3); C.pairAll(st); C.choose(st, 'b'); C.check(st);
  is(C.hintKey(st) === 'hintLeft', 'wrong with every pair made → "look who has no partner"');
  const st2 = make(4, 6); C.choose(st2, 'a'); C.check(st2);
  is(st2.helped === false && st2.pairs.length === 0, 'miss 1 never pairs for the child');
  C.check(st2);
  is(st2.helped === true && st2.pairs.length === 4, 'miss 2 pairs for the child');
  const st3 = make(7, 5); C.choose(st3, 'a');
  is(C.check(st3).ok && st3.pairs.length === 5 && C.lone(st3, 'a').length === 2 && C.lone(st3, 'b').length === 0, 'right at the first try, nothing paired → done pairs every one, two left without a partner');
  is(C.celebrateKey({ answer: 'a' }) === 'celebrateMore' && C.celebrateKey({ answer: 'b' }) === 'celebrateFewer' && C.celebrateKey({ answer: 'same' }) === 'celebrateSame', 'the right celebration for each relation');
}

console.log('[D] the layout and the spacing');
for (let W = 240; W <= 1400; W += 9) for (const places of [12, 8]) {
  const L = C.layout(W, places), mode = W >= 560 ? 'wide' : (W >= 300 || W < 280 || places === 8) ? 'stack' : 'narrow';
  const free = (() => { let n = 0; for (let c = 0; c < L.cols; c++) for (let r = 0; r < L.rows; r++) if (!C.reserved(L, c, r)) n++; return n; })();
  const ok = L.mode === mode && L.matW <= W && L.cols * L.rows >= places && free >= (places === 8 ? 5 : 10) && L.pic >= 44 && (mode !== 'wide' || L.cell <= 112) && (mode !== 'stack' || L.cell <= 66)
    && (W < 648 || L.pic >= 96) && (mode !== 'stack' || W < 300 || L.pic >= 64) && C.reserved(L, L.cols - 1, 0) && !C.reserved(L, 0, 0);
  if (!ok) is(false, `W ${W}/${places}: ${JSON.stringify(L)} free ${free}`); else PASS++;
}
let trickWorst = Infinity, where = '';
for (const range of ['to10', 'to5']) for (const r of C.rounds(range, 'pb')) for (const W of [240, 285, 330, 412, 560, 648, 1000]) {
  const st = C.newState(r), L = C.layout(W, r.places), tag = `${range} ${r.a}/${r.b} @${W}`;
  let bad = '';
  for (const side of ['a', 'b']) {
    const sp = C.spots(st, side, L);
    if (sp.length !== r[side]) bad = side + ' count';
    if (!sp.every(p => p.x >= -0.5 && p.y >= -0.5 && p.x + L.pic <= L.matW + 0.5 && p.y + L.pic <= L.matH + 0.5)) bad = side + ' outside the mat';
    if (sp.some(p => { const c = Math.floor((p.x + L.pic / 2 - L.pad) / L.cell), rr = Math.floor((p.y + L.pic / 2 - L.pad) / L.cell); return C.reserved(L, c, rr); })) bad = side + ' in the "More" corner';
    let minD = Infinity; for (let i = 0; i < sp.length; i++) for (let j = i + 1; j < sp.length; j++) minD = Math.min(minD, Math.hypot(sp[i].x - sp[j].x, sp[i].y - sp[j].y));
    if (sp.length > 1 && minD < 0.95 * L.pic) bad = side + ' crowded ' + (minD / L.pic).toFixed(2);
    if (JSON.stringify(C.spots(C.newState(r), side, L)) !== JSON.stringify(sp)) bad = side + ' not fixed per round';
  }
  if (r.trick) {
    const s = C.footprint(C.spots(st, r.trick, L), L), h = C.footprint(C.spots(st, r.trick === 'a' ? 'b' : 'a', L), L);
    const sCount = r[r.trick], hCount = r[r.trick === 'a' ? 'b' : 'a'];
    if (sCount <= hCount && s < h - 1e-9) bad = `the spread group covers less than the huddle (${s.toFixed(2)} < ${h.toFixed(2)})`;
    if (s - h < trickWorst) { trickWorst = s - h; where = tag; }
  }
  if (bad) is(false, `${tag}: ${bad}`); else PASS++;
}
{
  /* at the live width the trick must be real: the smaller group visibly covers more of its mat */
  const L = C.layout(648, 12); let real = 0, total = 0;
  for (const r of C.rounds('to10', 'pb')) if (r.trick && r.a !== r.b && (r.trick === 'a' ? r.a < r.b : r.b < r.a)) { total++; const st = C.newState(r); if (C.footprint(C.spots(st, r.trick, L), L) >= C.footprint(C.spots(st, r.trick === 'a' ? 'b' : 'a', L), L) + 0.15) real++; }
  is(real >= Math.ceil(total * 0.6), `at the live width, where the smaller group is spread, it covers clearly more of its mat (${real} of ${total})`);
}

console.log('[E] the strings of the activity');
{
  const S = require(path.join(MINI, 'partner-bows-activity.js')).strings, keys = Object.keys(S);
  for (const k of keys) is(LOCALES.every(l => typeof S[k][l] === 'string' && S[k][l].trim()), `${k}: all 11 locales`);
  is(['hintStart', 'hintPair', 'hintLeft', 'hintTied', 'hintTiedSame'].every(k => keys.includes(k)), 'every hint the activity can name exists');
  is(LOCALES.every(l => S.celebrateMore[l].includes('{m}') && S.celebrateMore[l].includes('{f}') && (S.celebrateSame[l].match(/\{a\}/g) || []).length === 2), 'the celebrations name the numbers');
  is(LOCALES.every(l => !/\{/.test(S.instruction[l] + S.prompt[l])), 'no placeholder in the shell-filled lines');
  is(LOCALES.every(l => S.prompt[l].includes(S.moreBtn[l]) && S.prompt[l].includes(S.sameBtn[l]) && S.hintStart[l].includes(S.moreBtn[l]) && S.hintStart[l].includes(S.sameBtn[l])), 'the task line and the start hint quote the two buttons exactly as they read');
}

console.log(`\nverify-partner-bows-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
