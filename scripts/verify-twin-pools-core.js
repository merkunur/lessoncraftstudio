#!/usr/bin/env node
/* =====================================================================
   verify-twin-pools-core.js — the model gate for ACTIVITY #15, the Twin
   Pools (K.CC.B.5: count how many, then count out that many). Its OWN
   ground truth, written from the standard and the design sheet, never read
   off the core: the rounds, the pools, Check, the help ladder, the strings
   (checked against a brute-force shortest matching of its own), the layout
   floors and where the first pool's creatures lie.
   Run: node scripts/verify-twin-pools-core.js
   Mutation: TW_CORE_DIR=<dir> loads the core from <dir> (mutate-twin-pools.js).
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const DIR = process.env.TW_CORE_DIR || MINI;
const C = require(path.join(DIR, 'twin-pools-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* ---------- the ground truth ---------- */
const TRUTH = {
  to10: { n: [7, 4, 8, 6, 9, 6, 10, 7, 5], arr: ['scatter', 'line', 'array', 'ring', 'scatter', 'array', 'scatter', 'ring', 'scatter'], places: 12, max: 10 },
  to5: { n: [3, 5, 2, 4, 1, 5, 4, 3], arr: ['line', 'ring', 'line', 'scatter', 'scatter', 'scatter', 'array', 'ring'], places: 8, max: 5 }
};
const REFUSED = ['fish', 'tuna', 'oyster', 'seaweed', 'dolphin', 'whale', 'orca', 'shark', 'seal', 'manatee', 'narwhal'];
const make = (n, range, arr) => C.newState({ id: 'x-' + n + '-' + (arr || 'scatter'), n, arr: arr || 'scatter', rows: 0, cols: 0, model: 'crab', twin: 'starfish', places: TRUTH[range || 'to10'].places });
const fill = (st, k) => { for (let p = 0, put = 0; put < k && p < st.places; p++) if (C.place(st, p)) put++; };

console.log('[A] the rounds');
const pics = JSON.parse(fs.readFileSync(path.join(MINI, 'pictures', 'ocean-life.json'), 'utf8'));
for (const range of ['to10', 'to5']) {
  const R = C.rounds(range, 'tw', 'other'), T = TRUTH[range];
  is(R.length === T.n.length && R.length >= 7, `${range}: ${T.n.length} rounds (≥ 7)`);
  is(R.map(r => r.n).join() === T.n.join(), `${range}: the first pools hold ${T.n.join(' ')}`);
  is(R.map(r => r.arr).join() === T.arr.join(), `${range}: the arrangements are ${T.arr.join(' ')}`);
  is(R.every(r => r.n >= 1 && r.n <= T.max), `${range}: every count 1..${T.max} — never 0`);
  is(R.every(r => r.places === T.places && r.places > r.n), `${range}: the twin pool has ${T.places} places every round, more than any count — its size never tells, "too many" is always possible`);
  is(new Set(R.map(r => r.id)).size === R.length, `${range}: ids distinct`);
  is(R.every(r => r.model !== r.twin), `${range}: the twin pool always takes a different creature — only the number can match`);
  is(R.every(r => r.arr !== 'array' || (r.rows * r.cols === r.n && r.rows <= 2 && r.cols <= 4)), `${range}: every array is rows × cols = n, at most 2 × 4 (it fits the wide pool's two rows and the phone's four columns)`);
  is(R.every(r => r.arr !== 'line' || r.n <= 4), `${range}: every line is at most 4 long (a phone pool is four places wide)`);
  is(R.every(r => r.arr !== 'ring' || r.n <= 7), `${range}: every ring is at most 7 (the phone pool's ellipse holds 7 apart)`);
  for (let i = 1; i < R.length; i++) is(R[i].model !== R[i - 1].model, `${range}: rounds ${i - 1} and ${i} start from different creatures`);
  const S = C.rounds(range, 'tw', 'same');
  is(S.every((r, i) => r.twin === r.model && r.model === R[i].model && r.n === R[i].n), `${range}: "the same creatures" keeps every round and puts the first pool's creature in the twin pool`);
}
is(new Set(C.rounds('to10').map(r => r.arr)).size === 4, 'up to 10: all four of K.CC.B.5\'s arrangements — line, ring, array, scatter');
is(C.rounds('nonsense', 'tw').length === 9 && C.rounds('nonsense', 'tw')[0].places === 12, 'an unknown range falls back to up to 10');
is(pics.dir === C.THEME, `the theme is "${C.THEME}" (a colour theme)`);
const used = new Set([].concat(...['to10', 'to5'].map(k => C.rounds(k).map(r => [r.model, r.twin]))).flat());
is(used.size >= 7, `at least seven different creatures (${used.size})`);
is([...used].sort().join() === [...C.NOUNS].sort().join() && C.NOUNS.every(x => !REFUSED.includes(x)), `the declared creature list (it goes into the manifest) is exactly the creatures the rounds use`);
for (const noun of used) {
  const e = pics.nouns[noun];
  is(!!e && LOCALES.every(l => e.labels[l] && e.labels[l][0]) && fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', C.THEME, noun + '@2x.webp')), `${noun}: a labelled library picture on disk`);
  is(!REFUSED.includes(noun), `${noun}: not one the contact sheet ruled out (big animals, generic fish, food, plants)`);
}

console.log('[B] the twin pool and the marks');
{
  const st = make(5);
  is(st.filled.length === 0 && st.marks.length === 5 && st.marks.every(m => !m), 'the round opens with the twin pool empty and nothing marked');
  is(C.place(st, 3) && C.place(st, 0) && C.place(st, 9), 'a tap on an empty place puts a creature there');
  is(st.filled.join() === '0,3,9' && C.isFilled(st, 9) && !C.isFilled(st, 1), 'the pool remembers which places are full (in place order)');
  is(!C.place(st, 3) && st.filled.length === 3, 'a full place cannot take a second creature');
  is(!C.place(st, -1) && !C.place(st, 12) && !C.place(st, 1.5) && st.filled.length === 3, 'no place outside the pool');
  is(C.remove(st, 3) && st.filled.join() === '0,9', 'a tap on a creature takes THAT one out');
  is(!C.remove(st, 5) && st.filled.length === 2, 'no take-out from an empty place');
  is(C.empty(st) && st.filled.length === 0 && !C.empty(st), 'Empty the twin pool clears it (and an empty pool has nothing to empty)');
  is(C.mark(st, 2) && st.marks[2] && C.mark(st, 2) && !st.marks[2], 'a tap on a first-pool creature marks it; a second tap unmarks it');
  is(!C.mark(st, 5) && !C.mark(st, -1) && !C.mark(st, 0.5), 'no mark outside the first pool');
  const small = make(3, 'to5'); fill(small, 12);
  is(small.filled.length === 8 && !C.place(small, 8), 'up to five: the twin pool has eight places and no more');
}

console.log('[C] Check');
for (const n of [1, 4, 7, 10]) {
  const st = make(n);
  let r = C.check(st);
  is(r.slip === 'none' && !r.ok && st.misses === 0 && !st.done, `${n}: an empty Check is a start, not a miss`);
  fill(st, n + 1); r = C.check(st);
  is(r.slip === 'more' && r.a === n + 1 && st.misses === 1, `${n}: ${n + 1} → "too many", one miss`);
  C.remove(st, st.filled[0]); C.remove(st, st.filled[0]);
  r = C.check(st);
  is(r.slip === (n - 1 === 0 ? 'none' : 'fewer') && st.misses === (n - 1 === 0 ? 1 : 2), `${n}: ${n - 1} → ${n - 1 === 0 ? 'start again' : '"too few", a second miss'}`);
  fill(st, 1); r = C.check(st);
  is(r.ok && r.slip === 'right' && st.done, `${n}: ${n} → right, done`);
  is(!C.place(st, 11) && !C.remove(st, st.filled[0]) && !C.empty(st) && !C.mark(st, 0) && st.filled.length === n, `${n}: a finished round cannot change`);
  is(C.check(st).ok, `${n}: Check on a finished round stays right`);
}

console.log('[D] the help ladder');
{
  const st = make(6); fill(st, 8);
  is(C.helpLevel(st) === 0 && C.twinNums(st).every(x => x === '') && !C.showStrings(st), 'before any miss: no numbers, no strings');
  C.check(st);
  is(C.helpLevel(st) === 1 && C.twinNums(st).join() === '1,2,3,4,5,6,7,8' && !C.showStrings(st), 'miss 1: the twin pool numbered 1..8, no strings yet');
  is(C.hintKey(st) === 'hintMore', 'miss 1, too many: "too many" hint');
  C.remove(st, st.filled[7]);
  is(C.twinNums(st).every(x => x === ''), 'a change takes the numbers away — never a running count');
  C.remove(st, st.filled[6]); C.remove(st, st.filled[5]);
  C.check(st);
  is(C.helpLevel(st) === 2 && C.showStrings(st) && C.twinNums(st).join() === '1,2,3,4,5' && C.hintKey(st) === 'hintFewerTied', 'miss 2, too few: strings, numbers, the "tied" hint');
  C.place(st, 11);
  is(!C.showStrings(st) && C.twinNums(st).every(x => x === '') && C.hintKey(st) === 'hintStart', 'a change unties the strings until the next Check');
  C.place(st, 10); C.check(st);
  is(C.helpLevel(st) === 2 && C.hintKey(st) === 'hintMoreTied', 'too many after two misses: the "tied" too-many hint');
  C.remove(st, 10); C.check(st);
  is(st.done && C.helpLevel(st) === 0 && C.showStrings(st) && C.twinNums(st).join() === '1,2,3,4,5,6', 'done: strings and numbers on every pair');
  is(C.modelNums(st, [4, 0, 2, 1, 5, 3]).join() === '1,2,3,4,5,6', 'done: the first pool is numbered in the order given (the wrapper gives its twins\' order)');
  const fresh = make(6);
  is(C.modelNums(fresh, [0, 1, 2]).every(x => x === ''), 'not done: no numbers in the first pool');
  is(C.hintKey(make(3)) === 'hintStart', 'a fresh round: the start hint');
}

console.log('[E] the strings');
{
  const perms = (a) => a.length <= 1 ? [a] : a.flatMap((x, i) => perms(a.slice(0, i).concat(a.slice(i + 1))).map(p => [x].concat(p)));
  const dist = (p, q) => Math.hypot(p.x - q.x, p.y - q.y);
  const cross = (a, b, c, d) => { const o = (p, q, r) => Math.sign((q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x)); return o(a, b, c) * o(a, b, d) < 0 && o(c, d, a) * o(c, d, b) < 0; };
  let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  let optimal = 0, counts = 0, oneEach = 0, noCross = 0, trials = 0;
  for (let t = 0; t < 400; t++) {
    const n = 1 + Math.floor(rnd() * 7), m = 1 + Math.floor(rnd() * 7);
    const A = Array.from({ length: n }, () => ({ x: rnd() * 600, y: rnd() * 200 })), B = Array.from({ length: m }, () => ({ x: rnd() * 600, y: 260 + rnd() * 200 }));
    const pu = C.pairUp(A, B); trials++;
    const tot = pu.pairs.reduce((s, p) => s + dist(A[p[0]], B[p[1]]), 0);
    let best = Infinity;
    if (n <= m) { for (const p of perms([...Array(m).keys()])) { let s = 0; for (let i = 0; i < n; i++) s += dist(A[i], B[p[i]]); best = Math.min(best, s); } }
    else { for (const p of perms([...Array(n).keys()])) { let s = 0; for (let j = 0; j < m; j++) s += dist(A[p[j]], B[j]); best = Math.min(best, s); } }
    if (Math.abs(tot - best) < 1e-6) optimal++;
    if (pu.pairs.length === Math.min(n, m) && pu.loneModel.length === Math.max(0, n - m) && pu.loneTwin.length === Math.max(0, m - n)) counts++;
    const ua = pu.pairs.map(p => p[0]).concat(pu.loneModel), ub = pu.pairs.map(p => p[1]).concat(pu.loneTwin);
    if (new Set(ua).size === n && ua.length === n && new Set(ub).size === m && ub.length === m) oneEach++;
    let c = false; for (let i = 0; i < pu.pairs.length; i++) for (let j = i + 1; j < pu.pairs.length; j++) if (cross(A[pu.pairs[i][0]], B[pu.pairs[i][1]], A[pu.pairs[j][0]], B[pu.pairs[j][1]])) c = true;
    if (!c) noCross++;
  }
  is(optimal === trials, `the strings are the shortest matching (${optimal}/${trials} against brute force)`);
  is(counts === trials, `as many strings as the smaller group; the rest of the bigger group has no twin (${counts}/${trials})`);
  is(oneEach === trials, `every creature is in exactly one string or alone (${oneEach}/${trials})`);
  is(noCross === trials, `no two strings cross (${noCross}/${trials})`);
  const pu = C.pairUp([{ x: 0, y: 0 }, { x: 100, y: 0 }], [{ x: 0, y: 100 }, { x: 100, y: 100 }, { x: 200, y: 100 }]);
  is(pu.pairs.map(p => p.join(':')).join() === '0:0,1:1' && pu.loneTwin.join() === '2' && pu.loneModel.length === 0, 'two over three: straight down, the far one left without a twin');
  is(C.pairUp([], [{ x: 0, y: 0 }]).loneTwin.join() === '0' && C.pairUp([{ x: 0, y: 0 }], []).loneModel.join() === '0', 'an empty side: everything on the other side is alone');
}

console.log('[F] the layout');
for (let W = 240; W <= 1400; W += 7) {
  for (const places of [12, 8]) {
    const L = C.layout(W, places);
    const mode = W >= 560 ? 'wide' : (W >= 300 || W < 280 || places === 8) ? 'stack' : 'narrow';
    if (L.mode !== mode) { is(false, `W ${W}/${places}: mode ${L.mode}, expected ${mode}`); continue; }
    const across = mode === 'wide' ? 2 * L.poolW + L.gap : L.poolW;   /* side by side on the wide bench: two pools and the gap the strings cross */
    if (mode === 'wide' && !(L.gap >= 28 && L.gap <= 56)) { is(false, `W ${W}/${places}: the strings' gap ${L.gap} outside 28..56`); continue; }
    const ok = L.cols * L.rows >= places && across <= W && L.side === (mode === 'wide') && L.poolW === L.cols * L.cell + 2 * L.pad && L.poolH === L.rows * L.cell + 2 * L.pad && L.pic >= 44 && L.pic <= L.cell
      && (mode !== 'wide' || (L.rows === 4 && L.cols === (places === 8 ? 2 : 3) && L.poolH > L.poolW)) && (mode !== 'wide' || W < 648 || L.pic >= 96) && (mode !== 'stack' || W < 300 || L.pic >= 64) && (mode !== 'wide' || L.cell <= 112) && (mode !== 'stack' || L.cell <= 66);
    if (!ok) is(false, `W ${W}/${places}: ${JSON.stringify(L)}`); else PASS++;
  }
}
is(C.layout(648, 12).pic >= 96 && C.layout(648, 12).side && C.layout(648, 12).cols === 3 && C.layout(648, 8).cols === 2, 'at the live width (the 648 px stage of a 704 px page): pictures ≥ 96, the pools side by side, 3 × 4 places (2 × 4 up to five)');
is(C.layout(330, 12).cols === 4 && C.layout(330, 12).rows === 3 && C.layout(330, 8).rows === 2, 'a phone: four across, three rows (two up to five)');
for (let p = 0; p < 12; p++) { const L = C.layout(704, 12), s = C.placeSpot(p, L); if (!(s.x >= L.pad && s.y >= L.pad && s.x + L.pic <= L.poolW - L.pad && s.y + L.pic <= L.poolH - L.pad)) is(false, `place ${p} inside the pool`); else PASS++; }

console.log('[G] the first pool');
for (const range of ['to10', 'to5']) {
  for (const r of C.rounds(range, 'tw')) {
    for (const W of [240, 270, 285, 299, 330, 360, 412, 520, 560, 600, 648, 704, 1000]) {
      const st = C.newState(r), L0 = C.layout(W, r.places), P = C.modelPic(st, L0), L = Object.assign({}, L0, { pic: P }), sp = C.modelSpots(st, L0), tag = `${range} ${r.arr} ${r.n} @${W}`;
      if (P !== L0.pic) { is(false, `${tag}: one picture size for both pools (${P} vs ${L0.pic})`); continue; }
      if (r.arr !== 'ring' && C.ringEllipse(st, L0) !== null) { is(false, `${tag}: a loop drawn under a ${r.arr}`); continue; }
      let bad = '';
      if (sp.length !== r.n) bad = 'count ' + sp.length;
      if (!sp.every(s => s.x >= -0.5 && s.y >= -0.5 && s.x + L.pic <= L.poolW + 0.5 && s.y + L.pic <= L.poolH + 0.5)) bad = 'outside the pool';
      let minD = Infinity; for (let i = 0; i < sp.length; i++) for (let j = i + 1; j < sp.length; j++) minD = Math.min(minD, Math.hypot(sp[i].x - sp[j].x, sp[i].y - sp[j].y));
      if (sp.length > 1 && minD < (r.arr === 'scatter' ? 0.92 : 0.94) * L.pic) bad = 'crowded ' + (minD / L.pic).toFixed(2);   /* a scatter may close to 0.92: the creatures' ink is ≤ 0.96 of the box */
      if (r.arr === 'line' && sp.length > 1) {
        const longX = L.poolW >= L.poolH, a1 = longX ? 'x' : 'y', a2 = longX ? 'y' : 'x', g = sp[1][a1] - sp[0][a1];
        if (!sp.every((s, i) => Math.abs(s[a2] - sp[0][a2]) < 0.5 && (i === 0 || Math.abs(s[a1] - sp[i - 1][a1] - g) < 0.5)) || g <= 0) bad = 'not an even straight line along the pool';
      }
      if (r.arr === 'array') {
        const ys = new Set(sp.map(s => Math.round(s.y))).size, xs = new Set(sp.map(s => Math.round(s.x))).size, longSide = Math.max(r.rows, r.cols), shortSide = Math.min(r.rows, r.cols);
        if (!(ys * xs === r.n && ((L.poolW >= L.poolH) ? (xs === longSide && ys === shortSide) : (ys === longSide && xs === shortSide)))) bad = `not rows × cols along the pool (${ys}×${xs})`;
      }
      if (r.arr === 'ring' && sp.length > 2) {
        const cx = L.poolW / 2, cy = L.poolH / 2, a = (L.poolW - 2 * L.pad - L.pic) / 2, b = (L.poolH - 2 * L.pad - L.pic) / 2, E = C.ringEllipse(st, L0);
        if (!E || Math.abs(E.cx - cx) > 0.5 || Math.abs(E.cy - cy) > 0.5 || Math.abs(E.rx - a) > 0.5 || Math.abs(E.ry - b) > 0.5) bad = 'the drawn loop is not the ring the creatures sit on';
        if (!sp.every(s => { const x = s.x + L.pic / 2 - cx, y = s.y + L.pic / 2 - cy; return Math.abs((x * x) / (a * a) + (y * y) / (b * b) - 1) < 0.03; })) bad = 'not on the ring';
      }
      if (r.arr === 'scatter' && r.n >= 4) {
        /* scattered = not one row, and not a lattice: the creatures of one row never stand in the columns of another */
        const ys = sp.map(s => s.y), rowsOf = {}; sp.forEach(s => { (rowsOf[Math.round(s.y)] = rowsOf[Math.round(s.y)] || []).push(s.x); });
        const rowKeys = Object.keys(rowsOf), cols = rowKeys.map(k => rowsOf[k]);
        let lattice = rowKeys.length >= 2 && cols.every(xs => xs.length >= 2);
        if (lattice) for (let i = 1; i < cols.length; i++) for (const x of cols[i]) if (!cols[i - 1].some(x0 => Math.abs(x0 - x) < 0.15 * L.pic)) lattice = false;
        const levels = new Set(ys.map(y => Math.round(y / (0.25 * L.pic)))).size;
        if (Math.max(...ys) - Math.min(...ys) < 0.3 * L.pic) bad = 'not scattered (one row)';
        else if (L.rows >= 3 && r.n >= 5 && rowKeys.length < Math.ceil(r.n * 0.6)) bad = `not scattered (only ${rowKeys.length} heights for ${r.n} creatures in a pool of ${L.rows} rows)`;
        else if (lattice) bad = 'not scattered (a lattice)';
      }
      const again = C.modelSpots(C.newState(r), L0);
      if (JSON.stringify(again) !== JSON.stringify(sp)) bad = 'not fixed per round';
      if (!sp.every(s => Math.abs(s.tilt) <= 10)) bad = 'tilted over';
      if (bad) is(false, `${tag}: ${bad}`); else PASS++;
    }
  }
}
{
  const L = C.layout(704, 12), R = C.rounds('to10', 'tw');
  const a = C.modelSpots(C.newState(R[0]), L), b = C.modelSpots(C.newState(Object.assign({}, R[0], { id: 'other' })), L);
  is(JSON.stringify(a) !== JSON.stringify(b), 'two rounds of the same count scatter differently');
}

console.log('[H] the strings of the activity');
{
  const A = require(path.join(MINI, 'twin-pools-activity.js'));
  const S = A.strings, keys = Object.keys(S);
  is(keys.length >= 20, `${keys.length} string keys`);
  for (const k of keys) is(LOCALES.every(l => typeof S[k][l] === 'string' && S[k][l].trim()), `${k}: all 11 locales`);
  is(LOCALES.every(l => (S.celebrate[l].match(/\{n\}/g) || []).length === 2), 'celebrate names the number twice ("7 and 7") in every locale');
  is(LOCALES.every(l => !/\{n\}/.test(S.prompt[l])), 'the task line never says the number (the child finds it by counting)');
  is(LOCALES.every(l => !/\d/.test(S.prompt[l] + S.instruction[l] + S.hintStart[l] + S.hintMore[l] + S.hintFewer[l])), 'no digits in the task, the instruction or the hints');
  is(['hintStart', 'hintMore', 'hintFewer', 'hintMoreTied', 'hintFewerTied'].every(k => keys.includes(k)), 'every hint the core can name exists');
}

console.log(`\nverify-twin-pools-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
