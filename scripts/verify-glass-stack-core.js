#!/usr/bin/env node
/* =====================================================================
   verify-glass-stack-core.js — the build gate for ACTIVITY #148, The
   Glass Stack ("Comet's Big Leaps", 2.NBT.B.8), all 11 locales.
   ---------------------------------------------------------------------
   It does NOT trust the core. Its own ground truth:
     · its own copy of the design's three tables, re-solved by arithmetic:
       1 and 10 (57 45 53 81 30 59 79 63; two row wraps), 10 and 100 (257
       352 515 583 548 261 426 654 499 306 592; two sheet wraps; +10 ×4,
       −10 ×3, +100 ×2, −100 ×2), arrow trails (55 56 43 58 246; mysteries
       48 72 25; how-far ↓3→4, ↓2→2, ↓6→2, ↓3→1); landings distinct;
     · the old activity's nine rounds (read from git) are kept;
     · the geometry: addr round-trips 0–999; a step's arithmetic equals its
       geometry for every cell and direction (incl. every edge); every
       non-wrap leap changes exactly one of sheet/row/column, every wrap
       two; every mystery has exactly ONE square both arrows reach;
     · the diagnosis: offset names the axis and the direction of a miss;
     · Check plants the flag and leaps once; miss 2 sends Comet home and
       only the arrows / sheet buttons move her, never off the stack;
     · the bots of §6 (always +10, always +1, copy the start, change one
       digit never carry) at their measured scores, and the core marks
       each a miss;
     · the plan: banded, never the same order twice, two wraps never back
       to back, a wrap in every pass;
     · the picture on disk (colour), strings ×11 (never "free", no digit
       in a hint, every placeholder, every key reached), prose ×11 and
       the manifest.
   Usage: node scripts/verify-glass-stack-core.js   (GK_CORE / GK_ACT / GK_MANIFEST override the files)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.GK_CORE || path.join(MINI, 'glass-stack-core.js');
const ACTF = process.env.GK_ACT || path.join(MINI, 'glass-stack-activity.js');
const MAN = process.env.GK_MANIFEST || path.join(MINI, 'comet-kangaroo-activities.json');
const ID = 'comet-kangaroo.tens-hundreds.2-nbt-b-8', BEFORE = '7210d5f7';
const C = require(CORE);
const ACT = (() => { const ctx = { window: {}, GlassStackCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(ACTF, 'utf8') + '\n;this.__A = window.GlassStackActivity;', ctx); return ctx.__A; })();
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 80) console.error('  FAIL: ' + m); } };
let rng = 17; const rnd = () => { rng = (rng * 1103515245 + 12345) % 2147483648; return rng / 2147483648; };
const headRows = JSON.parse(execSync(`git show ${BEFORE}:"mini tools/comet-kangaroo-activities.json"`, { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })), head = headRows.find(x => x.id === ID);
const typeIn = (st, s) => { while (st.typed) C.type(st, 'del'); String(s).split('').forEach(d => C.type(st, d)); };
/* my own geometry: sheet = hundreds, row = tens, column = ones */
const geo = (n) => [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];
const changed = (a, b) => { const A = geo(a), B = geo(b); return A.filter((x, i) => x !== B[i]).length; };

/* ---------- 1. my own tables ---------- */
const MY = {
  small: [[47, 10, 57], [35, 10, 45], [63, -10, 53], [91, -10, 81], [29, 1, 30], [58, 1, 59], [80, -1, 79], [64, -1, 63]],
  big: [[247, 10, 257], [362, -10, 352], [415, 100, 515], [683, -100, 583], [538, 10, 548], [271, -10, 261], [326, 100, 426], [754, -100, 654], [489, 10, 499], [296, 10, 306], [602, -10, 592]]
};
for (const face of ['small', 'big']) {
  const R = C.rounds(face);
  ok(R.length === MY[face].length, `${face}: ${MY[face].length} rounds`);
  R.forEach((r, i) => {
    const [a, leap, land] = MY[face][i];
    ok(r.kind === 'leap' && r.a === a && r.leap === leap && r.answer === land && a + leap === land, `${face} ${i}: ${a} ${leap > 0 ? '+' : ''}${leap} = ${land}`);
    ok(a >= 10, `${face} ${i}: no start below 10 (never 0)`);
    const wrap = changed(a, land) === 2;
    ok(C.isWrap(r) === wrap, `${face} ${i}: wrap ${wrap}`);
    ok(changed(a, land) === (wrap ? 2 : 1), `${face} ${i}: a leap changes ${wrap ? 'two' : 'exactly one'} of sheet/row/column`);
  });
  ok(new Set(MY[face].map(x => x[2])).size === MY[face].length, `${face}: every landing different`);
}
ok(MY.small.filter(x => changed(x[0], x[2]) === 2).length === 2 && MY.big.filter(x => changed(x[0], x[2]) === 2).length === 2, 'two wraps in each leap table');
{ const t = {}; MY.big.forEach(x => { t[x[1]] = (t[x[1]] || 0) + 1; }); ok(t[10] === 4 && t[-10] === 3 && t[100] === 2 && t[-100] === 2, `10 and 100: +10 ×4, −10 ×3, +100 ×2, −100 ×2 (${JSON.stringify(t)})`); }
ok(head && head.params.rounds.every(o => C.rounds('big').some(r => r.a === o.start && r.leap === o.delta)), `the old activity's nine rounds (git ${BEFORE}) are all kept`);
/* trails: re-solved by my own walking */
const W = { R: 1, L: -1, D: 10, U: -10, DIVE: 100, RISE: -100 };
const MYT = [[34, 'DDR', 55], [68, 'ULL', 56], [21, 'DRRD', 43], [79, 'LUU', 58]];
{
  const R = C.rounds('trails');
  ok(R.length === 12 && R.filter(r => r.kind === 'follow').length === 5 && R.filter(r => r.kind === 'mystery').length === 3 && R.filter(r => r.kind === 'far').length === 4, 'trails: five follows, three mysteries, four how-fars');
  MYT.forEach(([a, chips, end], i) => { const r = R[i]; let n = a; chips.split('').forEach(c => { n += W[c]; }); ok(r.kind === 'follow' && r.a === a && r.answer === end && n === end, `follow ${i}: ${a} ${chips} → ${end}`); });
  ok(R[4].a === 145 && R[4].answer === 246 && R[4].chips.join() === 'DIVE,R', 'follow 4: 145, a dive, then right → 246');
  /* every mystery: exactly one square both arrows reach — my own search over the sheet */
  R.filter(r => r.kind === 'mystery').forEach(r => {
    const hits = []; for (let n = 0; n < 1000; n++) if (n === r.a + W[r.ca] && n === r.b + W[r.cb]) hits.push(n);
    ok(hits.length === 1 && hits[0] === r.answer, `mystery ${r.a}${r.ca}/${r.b}${r.cb}: exactly one square (${hits.join()})`);
  });
  const MYF = [[23, 57, 3, 4], [36, 58, 2, 2], [14, 76, 6, 2], [52, 83, 3, 1]];
  MYF.forEach(([a, b, d, rr]) => { const r = R.find(x => x.kind === 'far' && x.a === a); ok(r && r.b === b && r.answer.down === d && r.answer.right === rr && a + 10 * d + rr === b && d >= 1 && d <= 6 && rr >= 1 && rr <= 6, `how far ${a} → ${b}: ↓${d} →${rr} (inside 1–6, never 0)`); });
  ok(new Set(MYF.map(x => x[2] + '/' + x[3])).size === 4, 'how-far pairs all different');
}
/* ---------- 2. the geometry ---------- */
{
  let bad = 0;
  for (let n = 0; n < 1000; n++) { const a = C.addr(n); if (a.sheet * 100 + a.row * 10 + a.col !== n || a.sheet !== geo(n)[0] || a.row !== geo(n)[1] || a.col !== geo(n)[2]) bad++; }
  ok(bad === 0, `addr round-trips and matches sheet/row/column for 0–999 (${bad} wrong)`);
  let sb = 0, edges = 0;
  for (let n = 0; n < 1000; n++) for (const d of Object.keys(W)) {
    const m = C.step(n, d); if (m !== n + W[d]) sb++;
    const g = geo(n), h = geo(m);
    if (d === 'D' && g[1] === 9 && n + 10 < 1000) { edges++; if (!(h[0] === g[0] + 1 && h[1] === 0 && h[2] === g[2])) sb++; }
    if (d === 'R' && g[2] === 9 && n + 1 < 1000) { if (!(h[2] === 0 && (h[1] === (g[1] + 1) % 10))) sb++; }
    if (d === 'DIVE' && n + 100 < 1000) { if (!(h[0] === g[0] + 1 && h[1] === g[1] && h[2] === g[2])) sb++; }
  }
  ok(sb === 0 && edges > 80, `every step equals its geometry, every bottom edge falls to the next sheet's top row (${sb} wrong, ${edges} edges)`);
  const o = C.offset(248, 257); ok(o.dSheet === 0 && o.dRow === -1 && o.dCol === 1, '248 for 257: one row up, one column right');
  const o2 = C.offset(206, 306); ok(o2.dSheet === -1 && o2.dRow === 0 && o2.dCol === 0, '206 for 306: one sheet up (the never-carry slip)');
}
/* ---------- 3. the check, the flag, the move pad ---------- */
{
  const st = C.newState('big', 0);
  ok(C.check(st).key === 'hintType' && !st.leapt && st.misses === 0, 'Check with nothing typed → hintType, no leap, no miss');
  typeIn(st, '248'); let r = C.check(st);
  ok(r.result === 'miss' && st.flag === 248 && st.token === 257 && st.leapt && C.hint(st) === 'hintAxis' && !st.help, '248 → the flag on 248, Comet on 257, hintAxis');
  C.type(st, 'del'); ok(st.flag === null && st.verdict === null && C.hint(st) === null, 'a keystroke takes the flag and the help away');
  typeIn(st, '2470'); r = C.check(st);
  ok(r.result === 'miss' && r.outside && st.help && C.hint(st) === 'hintMove' && st.token === 247, '2470 (a fourth digit) → miss 2: Comet goes home, hintMove');
  ok(!C.move(C.newState('big', 0), 'D'), 'the move pad is asleep before miss 2');
  ok(C.move(st, 'D') && st.token === 257 && st.visited.indexOf(257) >= 0, 'miss 2: the down arrow moves Comet one row (+10)');
  ok(C.dive(st, 3) && st.token === 357 && !C.dive(st, 3), 'miss 2: one sheet deeper keeps the square (357); the same sheet is refused');
  const top = C.newState('big', 0); typeIn(top, '1'); C.check(top); typeIn(top, '2'); C.check(top);
  top.token = 995; ok(!C.move(top, 'D') && top.token === 995, 'from 995 the down arrow is refused (no 1005)');
  top.token = 999; ok(!C.move(top, 'R') && top.token === 999, 'from 999 the right arrow is refused');
  top.token = 5; ok(!C.move(top, 'U') && top.token === 5, 'from 5 the up arrow is refused (no −5)');
  top.token = 950; ok(!C.move(top, 'DIVE') && top.token === 950, 'from the last sheet a dive is refused');
  const sm = C.newState('small', 0); typeIn(sm, '1'); C.check(sm); typeIn(sm, '2'); C.check(sm); sm.token = 93;
  ok(!C.move(sm, 'D') && sm.token === 93, '1 and 10: Comet never leaves the one sheet');
  /* a near miss (±1) is a miss on every leap round */
  for (const face of ['small', 'big']) C.rounds(face).forEach(r => [r.answer - 1, r.answer + 1].forEach(v => { const s = C.newState(face, r.k); typeIn(s, v); ok(C.check(s).result === 'miss' && !s.done, `${face} ${r.a}${r.leap > 0 ? '+' : ''}${r.leap}: ${v} is a miss`); }));
  typeIn(st, '257'); ok(C.check(st).result === 'ok' && st.done, '257 → solved');
  const s1 = C.newState('big', 0); typeIn(s1, '1'); C.check(s1); ok(C.hint(s1) === 'hintAxis', 'a non-wrap miss → hintAxis');
  const s2 = C.newState('big', 9); typeIn(s2, '206'); C.check(s2); ok(C.hint(s2) === 'hintEdge', '296 + 10 typed 206 → hintEdge (over the edge)');
  const s3 = C.newState('small', 4); typeIn(s3, '20'); C.check(s3); ok(C.hint(s3) === 'hintRowEnd', '29 + 1 typed 20 → hintRowEnd');
  const s4 = C.newState('trails', 0); typeIn(s4, '45'); C.check(s4); ok(C.hint(s4) === 'hintTrail', 'a follow miss → hintTrail');
  const s5 = C.newState('trails', 5); typeIn(s5, '48'); ok(C.check(s5).result === 'ok', 'mystery 38↓ / 47→ → 48 solved');
  const s6 = C.newState('trails', 7);
  ok(C.check(s6).key === 'hintTypeFar', 'how far with an empty box → hintTypeFar');
  C.type(s6, '3'); ok(!C.type(s6, '3') && C.setBox(s6, 2) && C.type(s6, '5'), 'one digit per how-far box; the second box takes its own');
  let r6 = C.check(s6); ok(r6.result === 'miss' && s6.verdict.downOk && !s6.verdict.rightOk && C.hint(s6) === 'hintFar', '↓3 →5 for ↓3 →4 → the right box is the wrong one, hintFar');
  C.type(s6, 'del'); C.type(s6, '3'); C.check(s6); ok(s6.verdict.downOk && !s6.verdict.rightOk, '↓3 →3 (both boxes the same) → the right box is still the wrong one');
  const s7 = C.newState('trails', 7); C.type(s7, '4'); C.setBox(s7, 2); C.type(s7, '3'); C.check(s7); ok(!s7.verdict.downOk && !s7.verdict.rightOk, '↓4 →3 (swapped) → both boxes wrong');
  C.type(s6, 'del'); C.type(s6, '4'); ok(C.check(s6).result === 'ok', '↓3 →4 → solved');
  ok(!C.type(C.newState('big', 0), '0'), 'no leading 0');
}
/* ---------- 4. the bots of §6, measured ---------- */
{
  const bigR = C.rounds('big'), smallR = C.rounds('small');
  const score = (R, f) => R.filter(r => f(r) === r.answer).length;
  const plus10 = r => r.a + 10, plus1 = r => r.a + 1, copy = r => r.a;
  const oneDigit = r => { const d = Math.abs(r.leap), pos = d === 1 ? 2 : d === 10 ? 1 : 0, g = geo(r.a); g[pos] = (g[pos] + Math.sign(r.leap) + 10) % 10; return g[0] * 100 + g[1] * 10 + g[2]; };
  ok(score(smallR, plus10) === 2 && score(bigR, plus10) === 4, `always +10: ${score(smallR, plus10)}/8 and ${score(bigR, plus10)}/11 (2/8, 4/11)`);
  ok(score(smallR, plus1) === 2 && score(bigR, plus1) === 0, `always +1: ${score(smallR, plus1)}/8 and ${score(bigR, plus1)}/11 (2/8, 0/11)`);
  ok(score(smallR, copy) === 0 && score(bigR, copy) === 0, 'copy the start: 0/all');
  ok(score(smallR, oneDigit) === 6 && score(bigR, oneDigit) === 9, `change one digit, never carry: ${score(smallR, oneDigit)}/8 and ${score(bigR, oneDigit)}/11 (6/8, 9/11 — it fails exactly the wraps)`);
  bigR.concat(smallR).filter(r => C.isWrap(r)).forEach(r => { const st = C.newState(r.a > 99 ? 'big' : 'small', r.k); typeIn(st, oneDigit(r)); ok(C.check(st).result === 'miss', `the never-carry bot's ${oneDigit(r)} for ${r.a} is a miss`); });
}
/* ---------- 5. the plan ---------- */
const seeded = (s) => () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
for (const face of ['small', 'big', 'trails']) for (let seed = 1; seed <= 60; seed++) {
  /* the same random stream twice: the second plan must not hand back the first plan's order */
  const p1 = C.plan(face, seeded(seed)), p2 = C.plan(face, seeded(seed), p1.order);
  ok(p2.order.join() !== p1.order.join(), `plan ${face} seed ${seed}: a replayed stream still gives a new order`);
}
for (const face of ['small', 'big', 'trails']) {
  let prev = null; const R = C.rounds(face);
  for (let t = 0; t < 400; t++) {
    const p = C.plan(face, rnd, prev), o = p.order;
    ok(o.slice().sort((a, b) => a - b).join() === R.map(r => r.k).join() && (!prev || o.join() !== prev.join()), `plan ${face}: every round once, never the previous order`);
    ok(!o.some((k, i) => i > 0 && C.isWrap(R[k]) && C.isWrap(R[o[i - 1]])), `plan ${face}: two wraps never back to back`);
    if (face === 'big') ok(o.map(k => R[k].band).join() === R.map(r => r.band).slice().sort().join(), 'plan big: bands stay in order');
    if (face !== 'trails') ok(o.some(k => C.isWrap(R[k])), `plan ${face}: a wrap in every pass`);
    prev = o;
  }
}
ok(C.faceOf('small') === 'small' && C.faceOf('trails') === 'trails' && C.faceOf(undefined) === 'big' && C.faceOf('x') === 'big', 'the setting picks the face');
ok(C.band(560).wide && !C.band(559).wide && C.band(309).cramp && !C.band(310).cramp, 'the width bands');

/* ---------- 6. picture + strings ---------- */
const BW = /(^|\/)[^/]*\b(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?\//i;
ok(fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', C.COMET + '@2x.webp')) && !BW.test(C.COMET + '/') && /kangaroo$/.test(C.COMET), `picture ${C.COMET}: on disk, in colour`);
const S = ACT.strings, src = fs.readFileSync(ACTF, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '') + fs.readFileSync(CORE, 'utf8');
const KEYS = Object.keys(S); ok(KEYS.length >= 44, `strings: the set is there (${KEYS.length})`);
const NODIGIT = ['instruction', 'hintType', 'hintTypeFar', 'hintEdge', 'hintRowEnd', 'hintTrail', 'hintFar', 'hintMove', 'hintNoSheet', 'qMystery'];
const NEED = { hintAxis: ['leap'], okOnes: ['start', 'leap', 'land'], okTens: ['start', 'leap', 'land'], okHundreds: ['start', 'leap', 'land'], okEdge: ['start', 'leap', 'land'], okRow: ['start', 'leap', 'land'], okTrail: ['land'], okFar: ['a', 'b', 'd', 'r'], qFollow: ['n'], qFar: ['a', 'b'], aLanded: ['f'], aToken: ['n'], aTyped: ['v'], aBoxDown: ['v'], aBoxRight: ['v'] };
['qMore1', 'qLess1', 'qMore10', 'qLess10', 'qMore100', 'qLess100'].forEach(k => { NEED[k] = ['n']; });
const FREE = /(?<!\p{L})(free|kostenlos\w*|gratis|gratuit\w*|grátis|ilmai\w*|maksuton\w*|kostnadsfri\w*|vederlagsfri\w*|gratuito|gratuita)(?!\p{L})/iu;
for (const k of KEYS) for (const l of LOCS) {
  const v = S[k][l]; ok(typeof v === 'string' && v.length > 0, `strings.${k}.${l} present`); if (typeof v !== 'string') continue;
  ok(!FREE.test(v), `strings.${k}.${l} never says free`);
  if (NODIGIT.indexOf(k) >= 0 && k !== 'instruction') ok(!/\d/.test(v.replace(/\{\w+\}/g, '')), `strings.${k}.${l}: no digit`);
  if (NEED[k]) ok(NEED[k].every(x => v.split('{' + x + '}').length - 1 === 1), `strings.${k}.${l}: carries ${NEED[k].join(', ')} once each`);
  ok(!/\{(?!(start|leap|land|a|b|d|r|n|f|v|msg)\})/.test(v), `strings.${k}.${l}: no unknown placeholder`);
  if (l === 'fr' || l === 'it') ok(v.indexOf("'") < 0, `strings.${k}.${l}: typographic apostrophe`);
  if (l === 'fr') ok(!/ [:!?;»]/.test(v) && !/« /.test(v), `strings.${k}.fr: a narrow space before : ! ? ; and inside « »`);
  if (l === 'es' && /[!?]/.test(v)) ok(/[¡¿]/.test(v), `strings.${k}.es: opens its ¡ ¿`);
}
['qMore1', 'qMore10', 'qMore100'].forEach((k, i) => LOCS.forEach(l => ok(S[k][l].indexOf(String([1, 10, 100][i])) >= 0, `strings.${k}.${l}: the leap's number is in the sentence`)));
for (const l of LOCS) ok(/Komet|Comet|Cometa|Comète|Komeet|Komeetan/.test(S.title[l]), `${l}: Comet in the title`);
for (const l of LOCS) {
  ACT.api = { t: k => S[k][l] }; ACT._view = {};
  const fill = (k, a) => S[k][l].replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m));
  ACT.st = C.newState('big', 0); ok(ACT._okLine() === fill('okTens', { start: 247, leap: '+ 10', land: 257 }), `${l}: «${ACT._okLine()}»`);
  ACT.st = C.newState('big', 2); ok(ACT._okLine() === fill('okHundreds', { start: 415, leap: '+ 100', land: 515 }), `${l}: hundreds line`);
  ACT.st = C.newState('big', 9); ok(ACT._okLine() === fill('okEdge', { start: 296, leap: '+ 10', land: 306 }), `${l}: edge line`);
  ACT.st = C.newState('small', 4); ok(ACT._okLine() === fill('okRow', { start: 29, leap: '+ 1', land: 30 }), `${l}: row line`);
  ACT.st = C.newState('small', 5); ok(ACT._okLine() === fill('okOnes', { start: 58, leap: '+ 1', land: 59 }), `${l}: ones line`);
  ACT.st = C.newState('small', 2); ok(ACT._taskLine() === fill('qLess10', { n: 63 }), `${l}: the 63 − 10 question`);
  ACT.st = C.newState('trails', 7); ok(ACT._okLine() === fill('okFar', { a: 23, b: 57, d: 3, r: 4 }), `${l}: how-far line`);
  { const m = C.newState('big', 0); typeIn(m, '248'); C.check(m); ACT.st = m; const lab = ACT._sheetLabel(); ok(lab.indexOf('257') < 0 && lab.indexOf('248') >= 0 && S.aLanded[l].indexOf('{n}') < 0, `${l}: after a miss the sheet names the flag, never the landing («${lab}»)`); }
  { const h = C.newState('big', 0); typeIn(h, '1'); C.check(h); typeIn(h, '2'); C.check(h); C.move(h, 'D'); ACT.st = h; ok(ACT._sheetLabel() === S.aToken[l].replace('{n}', '257'), `${l}: at miss 2 the sheet names where the child moved Comet`); }
  ok(ACT._leapText(-100) === '− 100', `${l}: the leap uses U+2212`);
}
ACT.api = null; ACT.st = null;
const BYSHELL = ['title', 'instruction', 'instrBubble', 'okBubble'], BYSETTING = ['setLeaps', 'lSmall', 'lBig', 'lTrails', 'setGlass', 'gFrost', 'gClear'];
const DYN = ['qMore1', 'qLess1', 'qMore10', 'qLess10', 'qMore100', 'qLess100', 'okOnes', 'okTens', 'okHundreds', 'aUp', 'aDown', 'aLeft', 'aRight', 'aDive', 'aRise', 'aBoxDown', 'aBoxRight'];
ok(/'qMore' : 'qLess'\) \+ Math\.abs\(r\.leap\)/.test(src) && /'okOnes' : p === 'tens' \? 'okTens' : 'okHundreds'/.test(src) && /\['U', 'aUp'\]/.test(src) && /'aDive'\], \['RISE', -1, 'aRise'\]/.test(src) && /'aBoxDown' : 'aBoxRight'/.test(src), 'the keys built in code are built where the gate expects them');
for (const k of KEYS) ok(BYSHELL.concat(BYSETTING, DYN).indexOf(k) >= 0 || new RegExp("'" + k + "'").test(src), `strings.${k} is reached`);
ok(!/role', 'img'|role="img"/.test(src), 'no role="img" anywhere');

/* ---------- 7. prose + manifest ---------- */
for (const l of LOCS) {
  const j = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', l + '.json'), 'utf8')), p = j.prose[ID];
  ok(p && p.about && p.about.length === 3 && p.practices.length === 4 && p.howToPlay.length === 3 && p.learningGoals.length === 3, `prose.${l}: the whole entry`);
  if (!p) continue;
  const all = [].concat(p.about, p.practices, p.howToPlay, p.learningGoals).join(' ');
  ok(!FREE.test(all), `prose.${l}: never says free`);
  ok(l === 'en' ? /Common Core/.test(all) : !/Common Core|2\.NBT/.test(all), `prose.${l}: the framework name`);
  ok(['247', '257', '258', '296', '306', '206'].every(x => all.indexOf(x) >= 0), `prose.${l}: quotes what the activity shows`);
  ok(/Komet|Comet|Cometa|Comète|Komeet|Komeetta/.test(all), `prose.${l}: names Comet`);
  if (l === 'fr' || l === 'it') ok(all.indexOf("'") < 0, `prose.${l}: typographic apostrophes`);
}
const rows = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = rows.find(x => x.id === ID);
ok(rows.length === headRows.length && row && row.tool === 'glass-stack-activity', 'manifest: the row, tool glass-stack-activity');
ok(row && row.params.leaps.join() === 'small,big,trails' && row.params.glass.join() === 'frost,clear' && row.params.rounds.big.map(r => r.start + '/' + r.leap).join() === C.BIG.map(r => r[0] + '/' + r[1]).join() && row.params.rounds.small.length === 8 && row.params.rounds.trails.length === 12, 'manifest: params match the core');
['id', 'alignment', 'task_template', 'kid_prompt_template', 'theme'].forEach(k => ok(JSON.stringify(row[k]) === JSON.stringify(head[k]), `manifest: ${k} frozen`));
['slug', 'page_title', 'page_intro'].forEach(k => Object.keys(head[k]).forEach(l => ok(row[k][l] === head[k][l], `manifest: ${k}.${l} frozen`)));
['sv', 'da', 'no', 'fi'].forEach(l => ok(!head.slug[l] && /^[a-z0-9-]+$/.test(row.slug[l] || '') && row.page_title[l] && row.page_intro[l] && !FREE.test(row.page_title[l] + row.page_intro[l]) && !/Common Core|2\.NBT/.test(row.page_title[l] + row.page_intro[l]), `manifest: ${l} gets a new slug, title and intro`));
ok(LOCS.every(l => row.slug[l]), 'manifest: the row ships in all 11 locales');

console.log(`\nverify-glass-stack-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
