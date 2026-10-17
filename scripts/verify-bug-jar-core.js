#!/usr/bin/env node
/* =====================================================================
   verify-bug-jar-core.js — the model gate for ACTIVITY #16, the Bug Jar
   (K.CC.B.5: guess against a jar of ten, pour, count to 16, set the
   label). Its OWN ground truth, never read off the core.
   Run: node scripts/verify-bug-jar-core.js
   Mutation: BJ_CORE_DIR=<dir> loads the core from <dir> (mutate-bug-jar.js).
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const DIR = process.env.BJ_CORE_DIR || MINI;
const C = require(path.join(DIR, 'bug-jar-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const TRUTH = {
  to16: { n: [12, 7, 14, 9, 16, 8, 13, 11, 15], arr: ['array', 'scatter', 'rows', 'ring', 'array', 'scatter', 'rows', 'rows', 'rows'], bench: 10, max: 20 },
  to10: { n: [7, 3, 8, 4, 6, 9, 2, 6], arr: ['scatter', 'line', 'array', 'line', 'ring', 'scatter', 'line', 'array'], bench: 5, max: 10 }
};
const REFUSED = ['wasp', 'spider', 'mosquito', 'worm', 'centipede', 'millipede', 'dragonfly', 'slug', 'cricket'];
const make = (n, range, guessOn) => C.newState({ id: 'x-' + n, n, arr: 'scatter', rows: 0, cols: 0, noun: 'bee', bench: TRUTH[range || 'to16'].bench, max: TRUTH[range || 'to16'].max, guessOn: guessOn !== false });
const ready = (st, g) => { C.guess(st, g || 'more'); C.pour(st); return st; };

console.log('[A] the rounds');
const pics = JSON.parse(fs.readFileSync(path.join(MINI, 'pictures', 'insects-and-bugs.json'), 'utf8'));
for (const range of ['to16', 'to10']) {
  const R = C.rounds(range, 'bj'), T = TRUTH[range];
  is(R.length === T.n.length && R.length >= 7, `${range}: ${T.n.length} rounds (≥ 7)`);
  is(R.map(r => r.n).join() === T.n.join() && R.map(r => r.arr).join() === T.arr.join(), `${range}: ${T.n.join(' ')} in ${T.arr.join(' ')}`);
  is(R.every(r => r.n >= 1 && r.n <= 16), `${range}: every count 1..16 — never 0`);
  is(R.every(r => r.bench === T.bench && r.n !== r.bench), `${range}: the yardstick jar holds ${T.bench}, and no round IS ${T.bench} (every guess has an answer)`);
  is(R.some(r => r.n > r.bench) && R.some(r => r.n < r.bench), `${range}: some rounds more than the yardstick, some fewer`);
  is(R.every(r => r.arr !== 'scatter' || r.n <= 10), `${range}: no scatter over ten (K.CC.B.5: scattered up to 10)`);
  is(R.every(r => r.arr !== 'line' || r.n <= 4) && R.every(r => r.arr !== 'ring' || r.n <= 9) && R.every(r => r.arr !== 'array' || (r.rows * r.cols === r.n && r.cols <= 4 && r.rows <= 4)) && R.every(r => r.arr !== 'rows' || r.n <= 16), `${range}: lines ≤ 4, rings ≤ 9, arrays rows × cols ≤ 4 × 4, rows ≤ 16 (the 4 × 4 tray)`);
  is(new Set(R.map(r => r.id)).size === R.length, `${range}: ids distinct`);
  for (let i = 1; i < R.length; i++) is(R[i].noun !== R[i - 1].noun, `${range}: rounds ${i - 1} and ${i} show different bugs`);
  is(C.rounds(range, 'bj', false).every(r => r.guessOn === false), `${range}: the "no guess" setting reaches every round`);
}
is(TRUTH.to16.n.filter(n => n > 10).length >= 5, 'up to 16: most rounds count past ten — the half of K.CC.B.5 the earlier rebuilds left');
is(pics.dir === C.THEME, `the theme is "${C.THEME}"`);
const used = new Set(C.rounds('to16').concat(C.rounds('to10')).map(r => r.noun));
is([...used].sort().join() === [...C.NOUNS].sort().join(), 'the declared bug list (it goes into the manifest) is exactly the bugs the rounds use');
for (const noun of used) {
  const e = pics.nouns[noun];
  is(!!e && LOCALES.every(l => e.labels[l] && e.labels[l][0]) && fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', C.THEME, noun + '@2x.webp')), `${noun}: a labelled library picture on disk`);
  is(!REFUSED.includes(noun), `${noun}: not one the contact sheet ruled out`);
}

console.log('[B] guess and pour');
{
  const st = make(12);
  is(st.phase === 'jar' && st.guess === null && !C.canPour(st), 'the round opens at the jar, no guess, the pour locked');
  is(!C.pour(st) && st.phase === 'jar', 'no pour before a guess');
  is(!C.guess(st, 'same') && !C.guess(st, 'maybe') && st.guess === null, 'only fewer or more');
  is(C.guess(st, 'fewer') && C.guess(st, 'more') && st.guess === 'more', 'the guess can change until the pour');
  is(C.canPour(st) && C.pour(st) && st.phase === 'count', 'a guess unlocks the pour');
  is(!C.guess(st, 'fewer') && st.guess === 'more' && !C.pour(st), 'after the pour the guess is fixed and the jar is empty');
  const free = make(9, 'to16', false);
  is(C.canPour(free) && !C.guess(free, 'more') && C.pour(free), 'no-guess setting: pour straight away, no guess taken');
}

console.log('[C] ticks and the label');
{
  const st = make(6), jar = make(6);
  is(!C.tick(jar, 0) && !C.step(jar, 1), 'nothing to tick or set before the pour');
  ready(st);
  is(C.tick(st, 2) && C.tick(st, 0) && C.tick(st, 5) && st.seq.join() === '2,0,5' && C.unticked(st) === 3, 'ticks keep the order the child gave');
  is(C.tick(st, 0) && st.seq.join() === '2,5' && !st.ticks[0], 'a second tap takes a tick off');
  is(!C.tick(st, 6) && !C.tick(st, -1) && !C.tick(st, 1.5), 'no tick outside the tray');
  is(C.clearTicks(st) && C.unticked(st) === 6 && st.seq.length === 0 && !C.clearTicks(st), 'Clear the ticks clears them (and nothing to clear twice)');
  is(C.shown(st) === 10 && st.answer === null, 'the label starts at the yardstick, untouched');
  is(C.step(st, 1) && C.shown(st) === 11 && C.step(st, -1) && C.step(st, -1) && C.shown(st) === 9, '− and + move the label by one');
  is(!C.step(st, 2) && !C.step(st, 0), 'only − 1 or + 1');
  const lo = ready(make(2, 'to10')); for (let i = 0; i < 9; i++) C.step(lo, -1);
  is(C.shown(lo) === 1 && !C.step(lo, -1), 'the label never goes below 1 (never 0)');
  const hi = ready(make(16)); for (let i = 0; i < 15; i++) C.step(hi, 1);
  is(C.shown(hi) === 20 && !C.step(hi, 1), 'up to 20: the label stops at 20');
  const hi5 = ready(make(9, 'to10')); for (let i = 0; i < 9; i++) C.step(hi5, 1);
  is(C.shown(hi5) === 10, 'up to 10: the label stops at 10');
}

console.log('[D] Check');
for (const n of [2, 7, 11, 16]) {
  const range = n <= 9 ? 'to10' : 'to16', st = make(n, range);
  let r = C.check(st);
  is(r.slip === 'pour' && st.misses === 0 && C.hintKey(st) === 'hintGuess', `${n}: Check at the jar, no guess → "guess first", no miss`);
  C.guess(st, 'fewer'); r = C.check(st);
  is(r.slip === 'pour' && C.hintKey(st) === 'hintPour' && st.misses === 0, `${n}: a guess but no pour → "pour", no miss`);
  C.pour(st); r = C.check(st);
  is(r.slip === 'set' && C.hintKey(st) === 'hintSet' && st.misses === 0, `${n}: an untouched label → "set the label", no miss (the yardstick is never the answer)`);
  while (C.shown(st) < n + 1) C.step(st, 1); while (C.shown(st) > n + 1) C.step(st, -1);
  r = C.check(st);
  is(r.slip === 'more' && st.misses === 1 && C.hintKey(st) === 'hintTicks', `${n}: label ${n + 1} with bugs unticked → a miss, "tick each one"`);
  for (let k = 0; k < n; k++) C.tick(st, k);
  C.step(st, 1); C.step(st, -1); r = C.check(st);
  is(r.slip === 'more' && st.misses === 2 && C.hintKey(st) === 'hintLast', `${n}: again ${n + 1} → second miss, "the last number" help`);
  C.step(st, -1); C.step(st, -1); r = C.check(st);
  is(r.slip === 'fewer' && C.hintKey(st) === 'hintLast', `${n}: ${n - 1} → too few, still the last-number help`);
  C.step(st, 1); r = C.check(st);
  is(r.ok && st.done, `${n}: ${n} → right, done`);
  is(!C.tick(st, 0) && !C.step(st, 1) && !C.clearTicks(st) && C.check(st).ok, `${n}: a finished round cannot change`);
}
{
  const st = ready(make(8, 'to10')); for (let k = 0; k < 8; k++) C.tick(st, k);
  C.step(st, 1); C.step(st, 1); C.check(st);
  is(C.hintKey(st) === 'hintFewer', 'up to 10, all ticked, label 7 for 8 → "more than that"');
  C.step(st, 1); C.step(st, 1); C.check(st);
  is(C.hintKey(st) === 'hintLast', '9 after a miss → the last-number help');
}
{
  const st = ready(make(12)); for (let k = 0; k < 12; k++) C.tick(st, k); C.step(st, 1); C.check(st);
  is(C.hintKey(st) === 'hintFewer' && st.misses === 1, 'all ticked, 11 for 12 → "more than that" (a number hint once every bug is ticked)');
  const st2 = ready(make(12)); for (let k = 0; k < 12; k++) C.tick(st2, k); for (let i = 0; i < 4; i++) C.step(st2, 1); C.check(st2);
  is(C.hintKey(st2) === 'hintMore', 'all ticked, 14 for 12 → "fewer than that"');
}

console.log('[E] the numbers and the verdict');
{
  const spots = [{ x: 200, y: 0 }, { x: 0, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }, { x: 100, y: 0 }];
  is(C.readingOrder(spots).join() === '1,4,0,3,2', 'reading order: rows top to bottom, each left to right');
}
{
  const spots = [{ x: 200, y: 0 }, { x: 0, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }, { x: 100, y: 0 }];
  const st = ready(make(5, 'to16'));
  for (let i = 0; i < 3; i++) C.step(st, -1);   /* 7 */
  C.check(st);
  is(C.bugNums(st, spots).every(x => x === ''), 'miss 1: no numbers');
  C.step(st, 1); C.step(st, -1); C.check(st);
  const m2 = C.bugNums(st, spots);
  is(m2[1] === '1' && m2[4] === '2' && m2[0] === '3' && m2[3] === '4' && m2[2] === '?', 'miss 2: 1..4 in reading order, "?" on the last — the child names the last number');
  C.step(st, 1);
  is(C.bugNums(st, spots).every(x => x === ''), 'a change takes the help numbers away');
  for (let i = 0; i < 3; i++) C.step(st, -1);
  C.tick(st, 2); C.tick(st, 0);
  is(C.check(st).ok, 'done');
  const d = C.bugNums(st, spots);
  is(d[2] === '1' && d[0] === '2' && d[1] === '3' && d[4] === '4' && d[3] === '5', 'done: the ticked bugs first, in the order ticked, then the rest in reading order');
}
{
  const v1 = make(12); C.guess(v1, 'more'); C.pour(v1); C.step(v1, 1); C.step(v1, 1); C.check(v1);
  is(JSON.stringify(C.verdict(v1)) === JSON.stringify({ side: 'more', matched: true, key: 'verdictMoreYes' }), '12, guessed more → "more, just as you guessed"');
  const v2 = make(12); C.guess(v2, 'fewer'); C.pour(v2); C.step(v2, 1); C.step(v2, 1); C.check(v2);
  is(C.verdict(v2).key === 'verdictMoreNo', '12, guessed fewer → "more than you guessed" (never "wrong")');
  const v3 = make(7); C.guess(v3, 'more'); C.pour(v3); for (let i = 0; i < 3; i++) C.step(v3, -1); C.check(v3);
  is(C.verdict(v3).key === 'verdictFewerNo', '7, guessed more → "fewer than you guessed"');
  const v4 = make(7); C.guess(v4, 'fewer'); C.pour(v4); for (let i = 0; i < 3; i++) C.step(v4, -1); C.check(v4);
  is(C.verdict(v4).key === 'verdictFewerYes', '7, guessed fewer → "fewer, just as you guessed"');
  const v5 = make(7); C.guess(v5, 'fewer'); C.pour(v5);
  is(C.verdict(v5) === null, 'no verdict before the round is done');
  const v6 = make(7, 'to16', false); C.pour(v6); for (let i = 0; i < 3; i++) C.step(v6, -1); C.check(v6);
  is(v6.done && C.verdict(v6) === null, 'no guess, no verdict');
}

console.log('[F] the layout and the tray');
for (let W = 240; W <= 1400; W += 9) {
  const L = C.layout(W), wide = W >= 560;
  const ok = L.mode === (wide ? 'wide' : 'stack') && L.cols === 4 && L.rows === 4 && L.trayW <= W && L.trayW === 4 * L.cell + 2 * L.pad
    && L.pic >= 44 && (!wide || L.cell <= 100) && (wide || L.cell <= (W < 300 ? 60 : 66)) && L.tight === (!wide && W < 300) && (W < 648 || L.pic >= 96) && (wide || W < 300 || L.pic >= 64)
    && 2 * L.jarW + 8 <= W && (W < 648 || Math.round(C.PACK.size * L.jarW) >= 96) && (wide || W < 340 || Math.round(C.PACK.size * L.jarW) >= 64);
  if (!ok) is(false, `W ${W}: ${JSON.stringify(L)}`); else PASS++;
}
for (const range of ['to16', 'to10']) for (const r of C.rounds(range, 'bj')) for (const W of [240, 300, 330, 412, 560, 648, 1000]) {
  const st = C.newState(r), L = C.layout(W), sp = C.traySpots(st, L), tag = `${range} ${r.arr} ${r.n} @${W}`;
  let bad = '';
  if (sp.length !== r.n) bad = 'count';
  if (!sp.every(s => s.x >= -0.5 && s.y >= -0.5 && s.x + L.pic <= L.trayW + 0.5 && s.y + L.pic <= L.trayH + 0.5)) bad = 'outside the tray';
  let minD = Infinity; for (let i = 0; i < sp.length; i++) for (let j = i + 1; j < sp.length; j++) minD = Math.min(minD, Math.hypot(sp[i].x - sp[j].x, sp[i].y - sp[j].y));
  if (sp.length > 1 && minD < 0.96 * L.pic) bad = 'crowded ' + (minD / L.pic).toFixed(2);
  const ys = new Set(sp.map(s => Math.round(s.y))).size, xs = new Set(sp.map(s => Math.round(s.x))).size;
  if (r.arr === 'line' && ys !== 1) bad = 'not a line';
  if (r.arr === 'array' && !(ys === r.rows && xs === r.cols)) bad = 'not rows × cols';
  if (r.arr === 'rows' && !(ys === Math.ceil(r.n / 4) && xs === 4)) bad = 'not rows of four';
  if (r.arr === 'ring') { const cx = L.trayW / 2, cy = L.trayH / 2, d = sp.map(s => Math.hypot(s.x + L.pic / 2 - cx, s.y + L.pic / 2 - cy)); if (Math.max(...d) - Math.min(...d) > 0.5) bad = 'not a ring'; }
  if (r.arr === 'scatter' && r.n >= 4 && ys < Math.ceil(r.n * 0.6)) bad = 'not scattered';
  if (JSON.stringify(C.traySpots(C.newState(r), L)) !== JSON.stringify(sp)) bad = 'not fixed per round';
  if (bad) is(false, `${tag}: ${bad}`); else PASS++;
}
{
  /* the jars are honest: one density, so the fill follows the count */
  const top = (c) => Math.min(...C.jarPack(c, 's').map(p => p.fy));
  let mono = true; for (let c = 1; c < 20; c++) if (top(c + 1) > top(c) + 1e-9) mono = false;
  is(mono && top(16) < top(13) && top(13) < top(10) && top(10) < top(7), 'the heap never sinks as bugs are added and rises with every layer of three — the jar of ten is a fair yardstick');
  is(C.jarPack(16, 'a').every(p => p.size === C.jarPack(10, 'b')[0].size), 'every jar packs one bug size');
  is(C.jarPack(16, 'q').every(p => p.fx - p.size / 2 > -0.2 && p.fx + p.size / 2 < 1.2 && p.fy > 0 && p.fy < 1), 'the heap stays in the glass');
  const p16 = C.jarPack(16, 'q'); let close = 0; for (let i = 0; i < 16; i++) for (let j = i + 1; j < 16; j++) if (Math.hypot(p16[i].fx - p16[j].fx, (p16[i].fy - p16[j].fy) * 1.118) < p16[i].size * 0.6) close++;
  is(close >= 10, `a full jar overlaps (cannot be counted at a glance: ${close} close pairs)`);
}

console.log('[G] the strings of the activity');
{
  const S = require(path.join(MINI, 'bug-jar-activity.js')).strings, keys = Object.keys(S);
  for (const k of keys) is(LOCALES.every(l => typeof S[k][l] === 'string' && S[k][l].trim()), `${k}: all 11 locales`);
  is(['guessFewer', 'guessMore', 'chipFewer', 'chipMore', 'benchLabel', 'verdictMoreYes', 'verdictMoreNo', 'verdictFewerYes', 'verdictFewerNo'].every(k => LOCALES.every(l => S[k][l].includes('{b}'))), 'every yardstick string names the yardstick');
  is(LOCALES.every(l => !/\{/.test(S.instruction[l] + S.prompt[l]) && S.celebrate[l].includes('{n}')), 'the shell-filled lines carry no placeholder the shell cannot fill');
  is(['hintGuess', 'hintPour', 'hintSet', 'hintTicks', 'hintMore', 'hintFewer', 'hintLast'].every(k => keys.includes(k)), 'every hint the core can name exists');
  is(['verdictMoreYes', 'verdictMoreNo', 'verdictFewerYes', 'verdictFewerNo'].every(k => keys.includes(k)), 'every verdict the core can name exists');
  is(LOCALES.every(l => !/\b(wrong|falsch|faux|incorrect|errado|sbagliat|fout|fel|forkert|feil|väärin)\b/i.test(S.verdictMoreNo[l] + S.verdictFewerNo[l])), 'a guess the count did not bear out is never called wrong');
}

console.log(`\nverify-bug-jar-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
