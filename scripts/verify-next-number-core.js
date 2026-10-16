#!/usr/bin/env node
/* =====================================================================
   verify-next-number-core.js — the model gate for ACTIVITY #3, "What number
   comes next?" (K.CC.A.2), the Peek Path. Run: node scripts/verify-next-number-core.js
   Env: NP_CORE_DIR points the mutation harness at a doctored copy.
   NODE ONLY, NO BROWSER. ⭐ The gate implements its own ground truth: the
   verdict table is written out from the design sheet (n+1 ok · n same ·
   < n before · > n+1 far), the typing rules, the lid rules, the
   pools per range and the layout floors from the activity law.
   ===================================================================== */
'use strict';
const path = require('path');
const DIR = process.env.NP_CORE_DIR || path.join(__dirname, '..', 'mini tools');
const C = require(path.join(DIR, 'next-number-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const t0 = Date.now();
const WIDTHS = [160, 240, 272, 288, 328, 360, 384, 420, 480, 560, 569, 570, 620, 648, 700, 760, 820];

/* 1. pools */
{
  const p10 = C.rounds(10, 's'), p20 = C.rounds(20, 's');
  is(p10.map(r => r.n).join() === '1,2,3,4,5,6,7,8,9' && p10.every(r => r.N === 10), 'to 10 → n = 1…9');
  is(p20.map(r => r.n).join() === '9,10,11,12,13,14,15,16,17,18,19' && p20.every(r => r.N === 20), 'to 20 → n = 9…19');
  is(p10.length >= 7 && p20.length >= 7, 'both pools ≥ 7 rounds');
  is(new Set(p10.concat(p20).map(r => r.seed)).size === p10.length + p20.length, 'seeds distinct');
  is(C.rounds('20', 's').length === 11 && C.rounds(undefined, 's').length === 9 && C.rounds(15, 's').length === 9, 'range parses as 20 or falls back to 10');
  is(p10.every(r => r.n + 1 <= r.N) && p20.every(r => r.n + 1 <= r.N), 'the answer is always on the path');
}

/* 2. state, lids, typing and the verdict table — every n of both ranges */
for (const N of [10, 20]) for (const r of C.rounds(N, 's')) {
  const n = r.n;
  /* hidden path: only n is open; shown path: 1…n−1 open too */
  let st = C.newState(r, 'hidden');
  is(st.open.length === 0 && C.isOpen(st, n) && !C.isOpen(st, n + 1) && (n === 1 || !C.isOpen(st, n - 1)), `hidden: only ${n} open`);
  const shown = C.newState(r, 'shown');
  is(shown.open.length === n - 1 && [...Array(n - 1).keys()].every(i => C.isOpen(shown, i + 1)) && !C.isOpen(shown, n + 1), `shown: 1…${n - 1} open, ${n + 1} closed`);
  is(C.target(st) === n + 1, 'target is n+1');
  /* lids */
  is(!C.peek(st, n).ok && C.peek(st, n).reason === 'self', 'the stone you stand on has no lid to peek');
  for (let v = n + 1; v <= N; v++) is(!C.peek(st, v).ok && C.peek(st, v).reason === 'locked' && !C.isOpen(st, v), `stone ${v} is locked before the answer (n=${n})`);
  is(!C.peek(st, 0).ok && !C.peek(st, N + 1).ok, 'off the path refused');
  if (n > 1) {
    const a = C.peek(st, 1); is(a.ok && a.open && C.isOpen(st, 1), 'peek opens stone 1');
    const b = C.peek(st, 1); is(b.ok && !b.open && !C.isOpen(st, 1), 'peek again closes it');
    C.peek(st, 1); C.closeAll(st); is(st.open.length === 0, 'closeAll clears the peeked lids');
  }
  C.revealRunUp(st);
  is(st.open.length === n - 1 && [...Array(n - 1).keys()].every(i => C.isOpen(st, i + 1)) && !C.isOpen(st, n + 1), `revealRunUp opens 1…${n - 1} and nothing after (n=${n})`);
  C.revealRunUp(st); is(st.open.length === n - 1, 'revealRunUp is idempotent');
  /* typing */
  st = C.newState(r, 'hidden');
  is(C.answer(st) === null && C.verdict(st) === 'noAnswer', 'fresh → noAnswer');
  is(!C.type(st, 'x') && !C.type(st, '12') && st.typed === '', 'only single digits type');
  is(C.type(st, '0') && st.typed === '0' && C.answer(st) === 0, 'a lone zero types');
  is(C.type(st, '7') && st.typed === '7', 'a leading zero is dropped');
  is(!C.type(st, '7') || st.typed.length <= 2, 'never more than two digits');
  C.clear(st); is(st.typed === '' && C.answer(st) === null, 'clear empties');
  if (N === 10) { is(C.type(st, '1') && C.type(st, '0') && C.answer(st) === 10, '10 types'); C.clear(st); is(C.type(st, '1') && !C.type(st, '1') && st.typed === '1', '11 is above the path and refused'); C.clear(st); }
  else { is(C.type(st, '2') && C.type(st, '0') && C.answer(st) === 20, '20 types'); C.clear(st); is(C.type(st, '2') && !C.type(st, '1') && st.typed === '2', '21 is above the path and refused'); C.clear(st); }
  is(C.type(st, '5') && C.erase(st) && st.typed === '' && !C.erase(st), 'erase removes the last digit and stops at empty');
  /* the verdict table, every answer 0…N */
  for (let a = 0; a <= N; a++) {
    C.clear(st); for (const d of String(a)) C.type(st, d);
    is(C.answer(st) === a, `typed ${a} reads back (n=${n})`);
    const want = a === n + 1 ? 'ok' : a === n ? 'same' : a < n ? 'before' : 'far';
    is(C.verdict(st) === want, `verdict for ${a} on ${n} is ${want} (got ${C.verdict(st)})`);
    if (want !== 'ok') is(!C.finish(st) && !st.done, `finish refuses ${a} on ${n}`);
  }
  /* finish opens n+1, locks typing, unlocks the lids beyond */
  C.clear(st); for (const d of String(n + 1)) C.type(st, d);
  is(C.finish(st) && st.done && C.isOpen(st, n + 1), `finish on ${n + 1} opens it`);
  is(!C.type(st, '1') && !C.erase(st) && C.answer(st) === n + 1, 'no typing after the round is done');
  { const d = C.newState(r, 'hidden'); for (const ch of String(n + 1)) C.type(d, ch); C.finish(d); C.clear(d); is(!C.type(d, '1') && d.typed === '', 'a cleared done round still refuses typing'); }
  is(!C.peek(st, n + 1).ok && C.peek(st, n + 1).reason === 'self', 'the answered stone has no lid');
  if (n + 2 <= N) { const p = C.peek(st, n + 2); is(p.ok && p.open, `stone ${n + 2} may be peeked once the round is done`); }
}

/* 3. layout: rows of ten at ≥ 570 else five; stones 44…72 wide, 1.15× tall; inside the mat; apart */
for (const W of WIDTHS) for (const N of [10, 20]) {
  const L = C.layout(N, W);
  const pad = W < 400 ? 8 : 12, gap = W < 400 ? 5 : 6, cols = W >= 570 ? 10 : 5;
  is(L.cols === cols && L.rows === Math.ceil(N / cols) && L.points.length === N, `cols ${L.cols} rows ${L.rows} for W=${W} N=${N}`);
  const wantW = Math.max(44, Math.min(72, Math.floor((W - 2 * pad - (cols - 1) * gap) / cols)));
  is(L.w === wantW && L.h === Math.round(wantW * 1.15), `stone ${L.w}×${L.h} (want ${wantW}×${Math.round(wantW * 1.15)}) W=${W}`);
  is(L.w >= 44 && L.h >= 50, `stone floors 44×50 (W=${W})`);
  if (W >= 640) is(L.h >= 60, `stone ≥ 60 tall at a desktop width (W=${W}: ${L.h})`);
  is(L.fits === (Math.floor((W - 2 * pad - (cols - 1) * gap) / cols) >= 44), 'fits reports the floor honestly');
  is(L.puck === Math.round(L.w * 0.5) && L.puck >= 22, 'counter is half a stone');
  const lastRow = L.points[N - 1];
  is(lastRow.y + L.h + 0.38 * L.puck <= L.height && L.bottomPad >= pad + L.puck * 0.4, `the counter on the last row stays inside the mat (W=${W} N=${N})`);
  let out = 0, ov = 0;
  for (let i = 0; i < N; i++) {
    const p = L.points[i];
    if (p.x < 0 || p.y < 0 || p.x + L.w > W || p.y + L.h > L.height) out++;
    for (let j = i + 1; j < N; j++) { const q = L.points[j]; if (Math.abs(p.x - q.x) < L.w && Math.abs(p.y - q.y) < L.h) ov++; }
    if (i > 0 && Math.floor(i / cols) === Math.floor((i - 1) / cols)) is(L.points[i].x > L.points[i - 1].x, 'stones read left to right');
    if (i >= cols) is(L.points[i].y > L.points[i - cols].y, 'rows read top to bottom');
  }
  is((L.fits ? out === 0 : true) && ov === 0, `stones inside the mat and apart (out ${out}, overlap ${ov}, W=${W} N=${N})`);
  const K = C.keypad(W);
  const perRow = 11 * 44 + 50 <= W ? 11 : 6 * 44 + 25 <= W ? 6 : 4;
  is(K.perRow === perRow && K.chip >= 44 && K.chip <= 56 && K.width <= Math.max(W, 4 * 44 + 15), `keys ${K.perRow}/row × ${K.chip} (W=${W})`);
}

console.log(`verify-next-number-core: ${PASS} pass, ${FAIL} fail, ${Date.now() - t0} ms`);
process.exit(FAIL ? 1 : 0);
