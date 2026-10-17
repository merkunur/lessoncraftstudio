#!/usr/bin/env node
/* =====================================================================
   verify-fair-share-core.js — the model gate for ACTIVITY #18, the
   Friendship Bridge (K.CC.C.6: which plate has more, then make them the
   same by sending toys across the bridge). Its OWN ground truth.
   Run: node scripts/verify-fair-share-core.js
   Mutation: FS_CORE_DIR=<dir> loads the core from <dir> (mutate-fair-share.js).
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const DIR = process.env.FS_CORE_DIR || MINI;
const C = require(path.join(DIR, 'fair-share-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const TRUTH = { to10: [[7, 3], [2, 8], [6, 6], [4, 6], [9, 5], [5, 5], [3, 7], [8, 4], [6, 2]], to5: [[4, 2], [1, 5], [3, 3], [5, 3], [2, 4], [4, 4], [5, 1], [3, 5]] };
const REFUSED = ['crayons', 'blocks', 'cards', 'domino', 'doll', 'girl', 'baby', 'baby_girl', 'teddy_bear', 'lego'];
const make = (a, b, arr) => C.newState({ id: 'x-' + a + '-' + b, a, b, noun: 'ball', arr: arr || 'scatter', answer: a > b ? 'a' : a < b ? 'b' : 'same', fair: (a + b) / 2 });
const fairUp = (st) => { let g = 0; while (C.count(st, 'a') !== C.count(st, 'b') && g++ < 30) { const side = C.count(st, 'a') > C.count(st, 'b') ? 'a' : 'b'; C.move(st, side, st.plates[side][0]); } };

console.log('[A] the rounds');
const pics = JSON.parse(fs.readFileSync(path.join(MINI, 'pictures', 'toys.json'), 'utf8'));
for (const range of ['to10', 'to5']) {
  const R = C.rounds(range, 'fs'), T = TRUTH[range], max = range === 'to10' ? 10 : 5;
  is(R.length === T.length && R.length >= 7, `${range}: ${R.length} rounds (≥ 7)`);
  is(R.map(r => r.a + '/' + r.b).join() === T.map(p => p.join('/')).join(), `${range}: ${T.map(p => p.join('/')).join(' ')}`);
  is(R.every(r => r.a >= 1 && r.b >= 1 && r.a <= max && r.b <= max), `${range}: every plate 1..${max} — never 0`);
  is(R.every(r => (r.a + r.b) % 2 === 0 && r.fair === (r.a + r.b) / 2), `${range}: every total is even, so fair is always possible`);
  is(R.every(r => r.answer === (r.a > r.b ? 'a' : r.a < r.b ? 'b' : 'same')), `${range}: the answer is the plate with more (or the same)`);
  const n = (x) => R.filter(r => r.answer === x).length;
  is(n('a') >= 2 && n('b') >= 2 && n('same') >= 2, `${range}: top ${n('a')} · bottom ${n('b')} · same ${n('same')}`);
  is(R.filter(r => r.answer !== 'same').some(r => Math.abs(r.a - r.b) === 2), `${range}: some rounds need just one toy across (the eye cannot tell, counting can)`);
  is(R.every(r => r.a + r.b <= 2 * C.PLACES - 2), `${range}: the plates (12 places) can hold any move the child tries`);
  for (let i = 1; i < R.length; i++) is(R[i].noun !== R[i - 1].noun, `${range}: rounds ${i - 1} and ${i} use different toys`);
  is(C.rounds(range, 'fs', 'rows').every(r => r.arr === 'rows') && C.rounds(range, 'fs').every(r => r.arr === 'scatter'), `${range}: the layout setting reaches every round`);
}
const used = new Set(C.rounds('to10').concat(C.rounds('to5')).map(r => r.noun));
is([...used].sort().join() === [...C.NOUNS].sort().join(), 'the declared toy list (it goes into the manifest) is exactly the toys the rounds use');
for (const noun of used) {
  const e = pics.nouns[noun];
  is(!!e && LOCALES.every(l => e.labels[l] && e.labels[l][0]) && fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', C.THEME, noun + '@2x.webp')), `${noun}: a labelled library picture on disk`);
  is(!REFUSED.includes(noun), `${noun}: a single toy (not a set, not a person)`);
}

console.log('[B] judging and sharing');
{
  const st = make(7, 3);
  is(st.phase === 'judge' && C.count(st, 'a') === 7 && C.count(st, 'b') === 3, 'the round opens at the judging step with 7 and 3');
  is(C.move(st, 'a', st.plates.a[0]) === -1, 'no toy moves before the judgment');
  is(C.judge(st, 'same') === 'wrong' && C.judge(st, 'b') === 'wrong' && st.judgeMisses === 2 && st.phase === 'judge' && st.misses === 0, 'a wrong judgment stays at step 1 and is never a miss');
  is(!C.judge(st, 'x'), 'only top, bottom or the same');
  is(C.judge(st, 'a') === 'right' && st.phase === 'share' && st.judged === 'a', 'the right judgment opens step 2');
  is(!C.judge(st, 'b'), 'the judgment is fixed after that');
  const p0 = st.plates.a[0], d = C.move(st, 'a', p0);
  is(d >= 0 && C.count(st, 'a') === 6 && C.count(st, 'b') === 4 && st.plates.a.indexOf(p0) < 0 && st.plates.b.indexOf(d) >= 0, 'a tap sends one toy across: 6 and 4');
  is(C.move(st, 'a', 99) === -1 && C.move(st, 'c', 0) === -1, 'no move of a toy that is not there');
  C.move(st, 'b', d);
  is(C.count(st, 'a') === 7 && C.count(st, 'b') === 3, 'toys can go back the other way');
  const full = make(10, 10); C.judge(full, 'same');
  for (let i = 0; i < 10; i++) C.move(full, 'a', full.plates.a[0]);
  is(C.count(full, 'b') === 12 && C.count(full, 'a') === 8, 'a plate takes 12 and no more');
  is(new Set(full.plates.b).size === 12 && full.plates.b.every(p => p >= 0 && p < 12), 'every toy has its own place');
}

console.log('[C] Check and the help');
for (const [a, b] of [[7, 3], [2, 8], [6, 6], [9, 5]]) {
  const st = make(a, b), ans = a > b ? 'a' : a < b ? 'b' : 'same', tag = `${a}/${b}`;
  let r = C.check(st);
  is(r.slip === 'judge' && st.misses === 0 && C.hintKey(st) === 'hintJudge', `${tag}: Check before judging → "which has more first", no miss`);
  C.judge(st, ans);
  if (a !== b) {
    r = C.check(st);
    const more = a > b ? 'Top' : 'Bottom';
    is(r.slip === (a > b ? 'moreA' : 'moreB') && st.misses === 1 && C.hintKey(st) === 'hintMore' + more && C.showNums(st) && !C.suggest(st), `${tag}: not the same yet → a miss, "the ${more.toLowerCase()} plate has more", both plates numbered`);
    const side = a > b ? 'a' : 'b'; C.move(st, side, st.plates[side][0]);
    is(!C.showNums(st), `${tag}: a move takes the numbers away`);
    if (Math.abs(a - b) > 2) {
      r = C.check(st);
      const sg = C.suggest(st);
      is(st.misses === 2 && C.hintKey(st) === 'hintOne' + more && sg && sg.side === side && st.plates[side].indexOf(sg.place) >= 0, `${tag}: still not the same → second miss, one toy on the plate with more lights up`);
    }
    fairUp(st);
  }
  r = C.check(st);
  is(r.ok && st.done && C.count(st, 'a') === C.count(st, 'b') && C.count(st, 'a') === (a + b) / 2, `${tag}: the same → done, ${(a + b) / 2} and ${(a + b) / 2}`);
  is(C.move(st, 'a', st.plates.a[0]) === -1 && C.check(st).ok && C.showNums(st), `${tag}: a finished round cannot change; both plates numbered`);
}
{
  const st = make(5, 5); C.judge(st, 'same'); C.move(st, 'a', st.plates.a[0]);
  is(!C.check(st).ok && st.misses === 1, '5/5 judged the same, then a toy moved: no longer the same → a miss');
  C.move(st, 'b', st.plates.b[st.plates.b.length - 1]);
  is(C.check(st).ok, 'moved back → the same again → done');
}

console.log('[D] the layout and the plates');
for (let W = 240; W <= 1400; W += 9) {
  const L = C.layout(W), mode = W >= 560 ? 'wide' : (W >= 300 || W < 280) ? 'stack' : 'narrow';
  const ok = L.mode === mode && L.cols * L.rows === C.PLACES && L.plateW <= W && L.pic >= 44 && (mode !== 'wide' || L.cell <= 112) && (mode !== 'stack' || L.cell <= 66) && (W < 648 || L.pic >= 96) && (mode !== 'stack' || W < 300 || L.pic >= 64);
  if (!ok) is(false, `W ${W}: ${JSON.stringify(L)}`); else PASS++;
}
for (const arr of ['scatter', 'rows']) for (const r of C.rounds('to10', 'fs', arr)) for (const W of [240, 285, 330, 648, 1000]) {
  const st = C.newState(r), L = C.layout(W), tag = `${arr} ${r.a}/${r.b} @${W}`;
  let bad = '';
  for (const side of ['a', 'b']) {
    const sp = st.plates[side].map(p => C.placeSpot(st, side, p, L));
    if (!sp.every(p => p.x >= -0.5 && p.y >= -0.5 && p.x + L.pic <= L.plateW + 0.5 && p.y + L.pic <= L.plateH + 0.5)) bad = 'outside the plate';
    let minD = Infinity; for (let i = 0; i < sp.length; i++) for (let j = i + 1; j < sp.length; j++) minD = Math.min(minD, Math.hypot(sp[i].x - sp[j].x, sp[i].y - sp[j].y));
    if (sp.length > 1 && minD < 0.94 * L.pic) bad = 'crowded';
    if (arr === 'rows' && st.plates[side].join() !== Array.from({ length: r[side] }, (_, i) => i).join()) bad = 'rows not in reading order';
    if (arr === 'rows' && sp.some(p => p.tilt !== 0)) bad = 'rows tilted';
  }
  if (arr === 'scatter' && r.a >= 4 && st.plates.a.join() === Array.from({ length: r.a }, (_, i) => i).join()) bad = 'scatter fills in reading order (rows to match by eye)';
  if (JSON.stringify(C.newState(r).plates) !== JSON.stringify(st.plates)) bad = 'not fixed per round';
  if (bad) is(false, `${tag}: ${bad}`); else PASS++;
}
{
  const L = C.layout(648), st = make(7, 3);
  const s1 = C.newState({ id: 'one', a: 6, b: 6, noun: 'ball', arr: 'scatter', answer: 'same', fair: 6 }), s2 = C.newState({ id: 'two', a: 6, b: 6, noun: 'ball', arr: 'scatter', answer: 'same', fair: 6 });
  is(s1.plates.a.join() !== s2.plates.a.join() && s1.plates.a.join() !== s1.plates.b.join(), 'two rounds of the same count scatter differently, and so do the two plates of one round');
  is(C.readOrder(st, 'a', L).length === 7 && C.readOrder(st, 'a', L).every((p, i, a) => i === 0 || Math.floor(a[i - 1] / L.cols) < Math.floor(p / L.cols) || (Math.floor(a[i - 1] / L.cols) === Math.floor(p / L.cols) && a[i - 1] % L.cols < p % L.cols)), 'the numbers follow reading order');
}

console.log('[E] the strings of the activity');
{
  const S = require(path.join(MINI, 'fair-share-activity.js')).strings, keys = Object.keys(S);
  for (const k of keys) is(LOCALES.every(l => typeof S[k][l] === 'string' && S[k][l].trim()), `${k}: all 11 locales`);
  is(['hintJudge', 'hintShare', 'hintMoreTop', 'hintMoreBottom', 'hintOneTop', 'hintOneBottom'].every(k => keys.includes(k)), 'every hint the core can name exists');
  is(LOCALES.every(l => (S.celebrate[l].match(/\{n\}/g) || []).length === 2), 'celebrate names the fair share twice');
  is(LOCALES.every(l => !/\{/.test(S.instruction[l] + S.prompt[l])), 'no placeholder in the shell-filled lines');
  is(LOCALES.every(l => S.prompt[l].includes(S.sameBtn[l]) && S.hintJudge[l].includes(S.sameBtn[l]) && S.instruction[l].includes(S.sameBtn[l])), 'the task line, the instruction and the first hint quote "The same" exactly as the button reads');
}

console.log(`\nverify-fair-share-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
