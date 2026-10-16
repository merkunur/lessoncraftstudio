#!/usr/bin/env node
/* =====================================================================
   verify-constellation-core.js — the model gate for ACTIVITY #4, "Count the
   Stars Awake" (K.CC.A.2), the Constellation Thread.
   Run: node scripts/verify-constellation-core.js   Env: CS_CORE_DIR → a doctored copy.
   NODE ONLY, NO BROWSER. ⭐ The gate implements its own ground truth: the
   pools and runs are written out from the design sheet, the tap table
   (cur+1 next/done · cur same · lit-or-lower back · higher skip), the extra
   numerals' priority, the distance floor at every width, determinism, and
   the guess measurement (the starry sky never easier than the clear one).
   ===================================================================== */
'use strict';
const path = require('path');
const DIR = process.env.CS_CORE_DIR || path.join(__dirname, '..', 'mini tools');
const C = require(path.join(DIR, 'constellation-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const t0 = Date.now();
const WIDTHS = [288, 296, 312, 330, 352, 376, 400, 440, 479, 480, 520, 560, 600, 640, 660, 700, 820];
const d2 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

/* 1. the pools (the design sheet, written out) */
const WANT = {
  10: [['mountains', 2, 6], ['star', 3, 7], ['house', 4, 8], ['fish', 5, 9], ['cup', 6, 10], ['kite', 3, 8], ['boat', 4, 9], ['bolt', 5, 10], ['crown', 3, 9]],
  20: [['saucepan', 7, 13], ['umbrella', 8, 14], ['wave', 9, 15], ['stairs', 10, 16], ['kite', 11, 16], ['crown', 12, 18], ['boat', 13, 18], ['house', 14, 18], ['star', 15, 19], ['cup', 16, 20]]
};
for (const N of [10, 20]) {
  const p = C.rounds(N, 's');
  is(p.length === WANT[N].length && p.length >= 7, `to ${N}: ${WANT[N].length} rounds (≥ 7)`);
  WANT[N].forEach(([shape, s, e], i) => {
    const r = p[i];
    is(r && r.shape === shape && r.start === s && r.end === e && r.N === N, `to ${N} round ${i}: ${shape} ${s}→${e} (got ${r && r.shape} ${r && r.start}→${r && r.end})`);
    is(r && r.end === r.start + C.SHAPES[shape].pts.length - 1, `the run covers the picture's points (${shape})`);
    is(r && r.start >= 2 && r.end <= N, `never starts at 1, never leaves the range (${shape} ${s}→${e})`);
  });
  is(new Set(p.map(r => r.seed)).size === p.length, 'seeds distinct');
}
is(C.rounds('20', 's').length === 10 && C.rounds(undefined, 's').length === 9 && C.rounds(15, 's').length === 9, 'range parses as 20 or falls back to 10');

/* 2. the pictures: 5–7 points, every pair ≥ DMIN apart, inside the unit square, closing segments valid */
for (const k of Object.keys(C.SHAPES)) {
  const sh = C.SHAPES[k], n = sh.pts.length;
  is(n >= 5 && n <= 7, `${k}: ${n} points (5–7)`);
  let minD = Infinity;
  for (let i = 0; i < n; i++) { is(sh.pts[i][0] >= 0 && sh.pts[i][0] <= 1 && sh.pts[i][1] >= 0 && sh.pts[i][1] <= 1, `${k} point ${i} in the unit square`); for (let j = i + 1; j < n; j++) minD = Math.min(minD, d2(sh.pts[i], sh.pts[j])); }
  is(minD >= C.DMIN - 1e-9, `${k}: points ≥ ${C.DMIN} apart (min ${minD.toFixed(3)})`);
  sh.close.forEach(c => is(c[0] >= 0 && c[0] < n && c[1] >= 0 && c[1] < n && c[0] !== c[1] && Math.abs(c[0] - c[1]) !== 1, `${k}: closing segment ${c} joins two non-adjacent points`));
}
is(C.DMIN === 0.22, 'DMIN is the design value 0.22');

/* 3. extra numerals: priority 1 → start−1 → above (ascending) → below (descending); never a path numeral; count rule */
{
  is(C.extraNumerals(7, 13, 20, 6).join() === '1,6,14,15,16,17', 'priority 7→13 in 20: 1,6,14,15,16,17');
  is(C.extraNumerals(2, 6, 10, 5).join() === '1,7,8,9,10', 'priority 2→6 in 10: 1 then above');
  is(C.extraNumerals(6, 10, 10, 5).join() === '1,5,4,3,2', 'priority 6→10 in 10: 1,5 then the rest below');
  is(C.extraNumerals(16, 20, 20, 5).join() === '1,15,14,13,12', 'priority 16→20: nothing above');
  is(C.extraNumerals(3, 9, 10, 3).join() === '1,2,10', 'priority 3→9 in 10: 1,2,10');
  is(C.extraNumerals(2, 10, 10, 5).join() === '1', 'only 1 when the run fills the rest');
  for (const N of [10, 20]) for (const r of C.rounds(N, 's')) {
    const D = C.extraCount(r.shape, r.start, r.end, r.N), pts = C.SHAPES[r.shape].pts.length;
    const avail = (r.start - 1) + (N - r.end);
    is(D === Math.max(0, Math.min(pts, 13 - pts, avail)), `${r.shape} ${r.start}→${r.end}: ${D} extra stars = min(L+1, 13−pts, available)`);
    const nums = C.extraNumerals(r.start, r.end, N, D);
    is(nums.length === D && nums.every(v => v >= 1 && v <= N && (v < r.start || v > r.end)) && new Set(nums).size === D, `${r.shape}: extras off the run, distinct, ${D} of them`);
    is(nums[0] === 1 && (r.start - 1 === 1 || nums[1] === r.start - 1), `${r.shape}: 1 and start−1 are always in a starry sky`);
  }
}

/* 4. state, both skies: stars, placement, determinism, the tap table, restart, verdict */
for (const N of [10, 20]) for (const r of C.rounds(N, 's')) {
  for (const sky of ['starry', 'clear']) {
    const st = C.newState(r, sky), pts = C.SHAPES[r.shape].pts.length;
    const paths = st.stars.filter(s => s.kind === 'path'), extras = st.stars.filter(s => s.kind === 'extra');
    is(st.placed === true, `${sky} ${r.shape} ${r.start}: every extra star found a place`);
    is(paths.length === pts && paths.every((s, i) => s.v === r.start + i), `${sky} ${r.shape}: path stars ${r.start}…${r.end}`);
    is(extras.length === (sky === 'clear' ? 0 : C.extraCount(r.shape, r.start, r.end, N)), `${sky} ${r.shape}: ${extras.length} extra stars`);
    is(new Set(st.stars.map(s => s.v)).size === st.stars.length, `${sky} ${r.shape}: every numeral once`);
    let minD = Infinity;
    for (let i = 0; i < st.stars.length; i++) for (let j = i + 1; j < st.stars.length; j++) minD = Math.min(minD, d2([st.stars[i].u, st.stars[i].w], [st.stars[j].u, st.stars[j].w]));
    is(minD >= C.DMIN - 1e-9, `${sky} ${r.shape}: all stars ≥ DMIN apart (min ${minD.toFixed(3)})`);
    is(st.stars.every(s => s.u >= 0 && s.u <= 1 && s.w >= 0 && s.w <= 1), `${sky} ${r.shape}: stars inside the unit square`);
    const again = C.newState(r, sky);
    is(JSON.stringify(again.stars) === JSON.stringify(st.stars), `${sky} ${r.shape}: the same seed lays the same sky`);
    is(st.cur === r.start && st.lit.join() === String(r.start) && !st.done && C.verdict(st) === 'unfinished' && C.remaining(st) === r.end - r.start, `${sky} ${r.shape}: opens on ${r.start}, unfinished`);
    /* the tap table at every step */
    for (let step = 0; step < pts - 1; step++) {
      const cur = r.start + step;
      is(st.cur === cur, `on ${cur}`);
      is(C.tap(st, cur).kind === 'same' && st.cur === cur, `tap ${cur} on ${cur} → same`);
      for (const q of st.stars) {
        if (q.v === cur || q.v === cur + 1) continue;
        const k = C.tap(st, q.v).kind;
        const want = q.v < cur || C.isLit(st, q.v) ? 'back' : 'skip';
        is(k === want && st.cur === cur && st.lit.length === step + 1, `tap ${q.v} on ${cur} → ${want} (got ${k}), nothing lit`);
      }
      is(C.tap(st, 0).kind === 'none' && C.tap(st, N + 1).kind === 'none', 'no such star → none');
      const k = C.tap(st, cur + 1).kind;
      is(k === (cur + 1 === r.end ? 'done' : 'next') && st.cur === cur + 1 && C.isLit(st, cur + 1) && st.lit.length === step + 2, `tap ${cur + 1} on ${cur} → ${cur + 1 === r.end ? 'done' : 'next'} (got ${k})`);
    }
    is(st.done && C.verdict(st) === 'done' && C.remaining(st) === 0 && st.lit.join() === paths.map(s => s.v).join(), `${sky} ${r.shape}: done after the run, lit in order`);
    is(C.tap(st, r.start).kind === 'none' && C.tap(st, r.end).kind === 'none', 'no taps after done');
    C.restart(st);
    is(!st.done && st.cur === r.start && st.lit.join() === String(r.start) && st.stars.length === paths.length + extras.length, `${sky} ${r.shape}: restart relights only the start, keeps the sky`);
    /* a wrong tap never advances, the lit set only ever grows by the next */
    if (extras.length) { const e = extras[0]; C.tap(st, e.v); is(st.lit.length === 1 && st.cur === r.start, 'an extra star never lights'); }
  }
  /* the guess measurement: starry never easier than clear, for both guessers */
  const sS = C.newState(r, 'starry'), sC = C.newState(r, 'clear');
  const A = C.proximityBot(sS, 'A'), B = C.proximityBot(sS, 'B'), cA = C.proximityBot(sC, 'A'), cB = C.proximityBot(sC, 'B');
  is(A.steps === C.SHAPES[r.shape].pts.length - 1 && A.rate <= cA.rate + 1e-9 && B.rate <= cB.rate + 1e-9, `${r.shape} ${r.start}→${r.end}: starry guess rates A ${A.rate.toFixed(2)} B ${B.rate.toFixed(2)} ≤ clear ${cA.rate.toFixed(2)}`);
  is(cA.rate === cB.rate, 'in a clear sky the two guessers agree (every sleeping star is bigger)');
}
{ /* the measurement, printed (not asserted against an invented floor) */
  let a = 0, b = 0, c = 0, n = 0;
  for (const N of [10, 20]) for (const r of C.rounds(N, 's')) { const s = C.newState(r, 'starry'), k = C.newState(r, 'clear'); a += C.proximityBot(s, 'A').rate; b += C.proximityBot(s, 'B').rate; c += C.proximityBot(k, 'A').rate; n++; }
  console.log(`   guess rates (mean over ${n} rounds): starry nearest-star ${(a / n).toFixed(2)} · starry nearest-bigger ${(b / n).toFixed(2)} · clear ${(c / n).toFixed(2)}`);
  is(a / n < c / n && b / n < c / n, 'the starry sky is harder to guess than the clear one on average');
  /* RATCHET — measured 2026-10-16 on the shipped pools (0.04 / 0.25); may only shrink, never be raised to pass */
  is(a / n <= 0.05, `starry nearest-star guess mean ≤ 0.05 (measured ratchet; got ${(a / n).toFixed(3)})`);
  is(b / n <= 0.26, `starry nearest-bigger guess mean ≤ 0.26 (measured ratchet; got ${(b / n).toFixed(3)})`);
}

/* 5. layout at every width: stars 44–68, centres ≥ 1.12 × star apart, inside the panel, segments/closing from the model */
for (const W of WIDTHS) for (const N of [10, 20]) for (const r of C.rounds(N, 's')) for (const sky of ['starry', 'clear']) {
  const st = C.newState(r, sky), L = C.layout(st, W);
  const wantH = Math.round(W * (W < 480 ? 1.0 : 0.66));
  const wantStar = Math.max(44, Math.min(68, Math.round(Math.min(W, wantH) / 6.8)));
  is(L.star === wantStar && L.R === wantStar / 2, `star ${L.star} at W=${W} (want ${wantStar})`);
  is(L.H === Math.round(W * (W < 480 ? 1.0 : 0.66)) && L.pad === 10, `sky ${W}×${L.H}`);
  const ps = st.stars.map(s => L.pos[s.v]);
  is(ps.every(p => p && p.x - L.R >= L.pad - 1 && p.x + L.R <= W - L.pad + 1 && p.y - L.R >= L.pad - 1 && p.y + L.R <= L.H - L.pad + 1), `stars inside the frame (W=${W} ${sky} ${r.shape})`);
  let minD = Infinity;
  for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) minD = Math.min(minD, Math.hypot(ps[i].x - ps[j].x, ps[i].y - ps[j].y));
  is(minD >= 1.12 * L.star - 1, `centres ≥ 1.12 × star apart (W=${W} ${sky} ${r.shape}: ${minD.toFixed(0)} vs ${(1.12 * L.star).toFixed(0)})`);
  is(L.segments.length === 0 && L.closing.length === C.SHAPES[r.shape].close.length && L.closing.every(c => c[0] >= r.start && c[0] <= r.end && c[1] >= r.start && c[1] <= r.end), 'no thread yet; closing segments mapped onto the run');
  C.tap(st, r.start + 1); C.tap(st, r.start + 2);
  const L2 = C.layout(st, W);
  is(L2.segments.length === 2 && L2.segments[0].join() === `${r.start},${r.start + 1}` && L2.segments[1].join() === `${r.start + 1},${r.start + 2}`, 'the thread follows the lit stars in order');
}

console.log(`verify-constellation-core: ${PASS} pass, ${FAIL} fail, ${Date.now() - t0} ms`);
process.exit(FAIL ? 1 : 0);
