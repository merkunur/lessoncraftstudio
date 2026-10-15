#!/usr/bin/env node
/* =====================================================================
   verify-how-many-core.js — the model gate for ACTIVITY #1, "How many?"
   (K.CC.B.5), the Counting Table. Run: node scripts/verify-how-many-core.js
   Env: HM_CORE_DIR points the mutation harness at a doctored copy.
   NODE ONLY, NO BROWSER — a gate that hangs is scored SURVIVED.
   ⭐ THE GATE IMPLEMENTS ITS OWN GROUND TRUTH. The floors, the overlap
   rule, the arrangement rules and the verdict table are written out HERE
   from the design sheet, never read off the core. A mutation to the core
   must therefore disagree with this file.
   ===================================================================== */
'use strict';
const path = require('path');
const DIR = process.env.HM_CORE_DIR || path.join(__dirname, '..', 'mini tools');
const C = require(path.join(DIR, 'how-many-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const t0 = Date.now();

/* ---- the oracle: the activity law's floors, by mat width (LAW.md rule 4) ---- */
const O_FLOOR = (W) => (W >= 480 ? 96 : 64);
const O_MAX = 128;
const WIDTHS = [292, 332, 384, 420, 480, 560, 620, 700, 760];
const ARRS = ['line', 'array', 'circle', 'scatter'];
const boxesOverlap = (a, b, s) => Math.abs(a.x - b.x) < s && Math.abs(a.y - b.y) < s;

/* 1. every (n, W) offers at least one arrangement, and every offered layout is sound */
for (const W of WIDTHS) {
  for (let n = 0; n <= 10; n++) {
    const allowed = C.arrangementsFor(n, W);
    is(allowed.length >= 1, `no arrangement for n=${n} W=${W}`);
    is(allowed.indexOf('scatter') >= 0 || n === 0 || (W < 400 && n > 5), `scatter must be offered (n=${n} W=${W})`);
    /* the standard's rectangular ARRAY must be offered for 2..10 at every width
       (a phone shows ten in rows; scatter alone is not the standard) */
    /* rows: a rectangle count on every mat; on a phone (< 400) any count from 4 (ragged 4+3 is the fold's price); never for 1-3 */
    const rectN = [4, 6, 8, 9, 10].indexOf(n) >= 0;
    is(!(rectN || (W < 400 && n >= 4)) || allowed.indexOf('array') >= 0, `rows must be offered for n=${n} at W=${W}`);
    is((rectN || (W < 400 && n >= 4)) || allowed.indexOf('array') < 0, `rows must NOT be offered (n=${n} W=${W})`);
    /* and a desktop mat offers the ring for 3..8 and the line for 1..5 */
    if (W >= 560) { is(n < 3 || n > 6 || allowed.indexOf('circle') >= 0, `circle must be offered for n=${n} at W=${W}`); is(n < 1 || n > 5 || allowed.indexOf('line') >= 0, `line must be offered for n=${n} at W=${W}`); }
    if (n === 0) is(allowed.length === 1 && allowed[0] === 'line', 'the empty table has exactly one shape');
    for (const arr of ARRS) {
      const L = C.layout(n, arr, W, 'oracle:' + n);
      const offered = allowed.indexOf(arr) >= 0;
      if (!offered) { if (n > 0) is(!L.fits, `${arr} not offered but layout claims it fits (n=${n} W=${W})`); continue; }
      is(L.fits === true, `offered layout must fit (${arr} n=${n} W=${W})`);
      is(L.points.length === n, `point count ${L.points.length} ≠ ${n} (${arr} W=${W})`);
      is(L.size >= O_FLOOR(W), `picture ${L.size} below floor ${O_FLOOR(W)} (${arr} n=${n} W=${W})`);
      is(L.size <= O_MAX, `picture ${L.size} above max (${arr} n=${n} W=${W})`);
      is(Number.isInteger(L.h) && L.h > 0, 'mat height must be a positive integer');
      let out = 0, ov = 0;
      for (let i = 0; i < L.points.length; i++) {
        const p = L.points[i];
        if (!Number.isInteger(p.x) || !Number.isInteger(p.y)) out++;
        if (p.x < 0 || p.y < 0 || p.x + L.size > W || p.y + L.size > L.h) out++;
        for (let j = i + 1; j < L.points.length; j++) if (boxesOverlap(p, L.points[j], L.size)) ov++;
      }
      is(out === 0, `${out} picture(s) outside the mat (${arr} n=${n} W=${W})`);
      is(ov === 0, `${ov} overlapping pair(s) (${arr} n=${n} W=${W})`);
      /* shape truths, written independently */
      if (arr === 'line' && n > 0) {
        is(n <= 5, 'a line never holds more than five');
        is(L.points.every(p => p.y === L.points[0].y), 'a line is one row');
        const xs = L.points.map(p => p.x);
        is(xs.every((x, i) => i === 0 || x > xs[i - 1]), 'a line runs left to right');
      }
      if (arr === 'array' && n > 0) {
        const rows = new Set(L.points.map(p => p.y)).size;
        is(rows >= 2 && rows <= 5, `an array has 2-5 rows (got ${rows}, n=${n} W=${W})`);   // ten as 2×5 on a tablet is a rectangle too
        /* on a wide mat the array is a true rectangle: every row holds the same count */
        if (W >= 400) { const perRow = {}; L.points.forEach(p => { perRow[p.y] = (perRow[p.y] || 0) + 1; }); is(new Set(Object.values(perRow)).size === 1, `rectangular rows (n=${n} W=${W}: ${Object.values(perRow).join('+')})`); }
        is(rows <= 3 || W >= 400, `a phone array keeps to three rows (n=${n} W=${W})`);
      }
      if (arr === 'circle' && n > 0) {
        is(n >= 3 && n <= 6, `a circle holds 3-6 (n=${n})`);
        const cx = W / 2, cy = L.h / 2;
        const rs = L.points.map(p => Math.hypot(p.x + L.size / 2 - cx, p.y + L.size / 2 - cy));
        is(Math.max(...rs) - Math.min(...rs) <= 2.5, `ring points equidistant from the centre (spread ${(Math.max(...rs) - Math.min(...rs)).toFixed(1)}, n=${n} W=${W})`);
        is(rs[0] > L.size * 0.8, 'ring radius is not degenerate');
      }
      if (arr === 'scatter' && n > 0) {
        const L2 = C.layout(n, arr, W, 'oracle:' + n);
        is(JSON.stringify(L2.points) === JSON.stringify(L.points), 'scatter is deterministic for one seed');
        if (n >= 2) {
          const L3 = C.layout(n, arr, W, 'other:' + n);
          is(JSON.stringify(L3.points) !== JSON.stringify(L.points), 'a different seed scatters differently');
        }
      }
    }
  }
}

/* 2. the round pool: every n once, in order, each with an offered arrangement */
for (const W of [292, 620]) {
  for (const [min, max] of [[0, 5], [0, 10]]) {
    const R = C.rounds(min, max, W, 'hm');
    is(R.length === max - min + 1, `pool size ${R.length} ≠ ${max - min + 1}`);
    is(R.every((r, i) => r.n === min + i), 'pool holds every n once, ascending');
    is(R.every(r => C.arrangementsFor(r.n, W).indexOf(r.arr) >= 0), 'every pool round uses an offered arrangement');
    is(new Set(R.map(r => r.seed)).size === R.length, 'pool seeds are distinct');
    const kinds = new Set(R.map(r => r.arr));
    const offeredKinds = new Set(); R.forEach(r => C.arrangementsFor(r.n, W).forEach(a => offeredKinds.add(a)));
    is(kinds.size === offeredKinds.size, `the pool shows every arrangement the width offers (got ${[...kinds].join(',')} of ${[...offeredKinds].join(',')} W=${W} max=${max})`);
    /* a chosen arrangement serves only the counts it can show, and all of them */
    for (const want of ['line', 'array', 'circle', 'scatter']) {
      const Rw = C.rounds(min, max, W, 'hm', want);
      const can = []; for (let n = min; n <= max; n++) if (n === 0 || C.arrangementsFor(n, W).indexOf(want) >= 0) can.push(n);
      is(Rw.map(r => r.n).join() === can.join() && Rw.every(r => r.n === 0 || r.arr === want), `rounds(want=${want}) serves exactly ${can.join(',')} (W=${W}, got ${Rw.map(r => r.n + r.arr[0]).join(',')})`);
    }
  }
}

/* 3. the three counting principles, as the state machine enforces them */
for (let n = 0; n <= 10; n++) {
  const st = C.newState({ n, arr: 'scatter', seed: 's' });
  is(C.verdict(st) === (n === 0 ? 'noAnswer' : 'untagged'), `fresh verdict n=${n}`);
  is(C.untagged(st).length === n, 'all untagged at start');
  /* one-to-one: a second tag on the same thing is refused */
  for (let i = 0; i < n; i++) {
    const r = C.tag(st, i);
    is(r.ok && r.k === i + 1, `tag ${i} → k=${i + 1}`);
    const again = C.tag(st, i);
    is(!again.ok && again.reason === 'again' && st.tags.length === i + 1, 'a second tag is refused and counts nothing');
    is(C.lastTagged(st) === i, 'the last tag is the last thing tapped');
  }
  is(!C.tag(st, n).ok && !C.tag(st, -1).ok, 'out-of-range tags are refused');
  is(C.allTagged(st), 'all tagged after n distinct taps');
  is(C.untagged(st).length === 0, 'nothing untagged');
  /* cardinality: only the last count word is the answer */
  is(C.verdict(st) === 'noAnswer', 'tagged but unanswered → noAnswer');
  for (let v = 0; v <= 10; v++) { C.setAnswer(st, v); is(C.verdict(st) === (v === n ? 'ok' : 'wrong'), `answer ${v} for n=${n}`); }
  C.setAnswer(st, null); is(C.verdict(st) === 'noAnswer', 'clearing the answer');
  /* order-irrelevance: count again from nothing — clears the answer too */
  C.setAnswer(st, n);
  C.untagAll(st);
  is(st.tags.length === 0 && st.answer === null, 'untagAll clears tags and answer');
  if (n > 1) {
    /* a different order gives the same cardinal */
    for (let i = n - 1; i >= 0; i--) C.tag(st, i);
    C.setAnswer(st, n);
    is(C.verdict(st) === 'ok', 'reverse order counts the same');
  }
  /* an untagged thing in the middle blocks the answer */
  if (n >= 2) {
    C.untagAll(st);
    for (let i = 0; i < n; i++) if (i !== 1) C.tag(st, i);
    C.setAnswer(st, n);
    is(C.verdict(st) === 'untagged', 'a skipped thing is reported before a right-looking answer');
    is(C.untagged(st).length === 1 && C.untagged(st)[0] === 1, 'the skipped thing is named');
  }
}

/* 4. conservation move: next arrangement cycles through what is offered */
for (const W of [292, 620]) for (let n = 1; n <= 10; n++) {
  const allowed = C.arrangementsFor(n, W);
  const st = C.newState({ n, arr: allowed[0], seed: 's' });
  const seen = new Set();
  for (let k = 0; k < allowed.length; k++) { seen.add(st.arr); st.arr = C.nextArrangement(st, W); }
  is(seen.size === allowed.length && st.arr === allowed[0], `mix cycles every offered arrangement (n=${n} W=${W})`);
}

/* 5. determinism of the rng + hash (the scatter seeds depend on them) */
is(C.hash('a') !== C.hash('b') && C.hash('a') === C.hash('a'), 'hash is a function');
{ const r1 = C.rng('seed'), r2 = C.rng('seed'); let same = true; for (let i = 0; i < 20; i++) if (r1() !== r2()) same = false; is(same, 'rng is deterministic'); }

console.log(`verify-how-many-core: ${PASS} pass, ${FAIL} fail, ${Date.now() - t0} ms`);
process.exit(FAIL ? 1 : 0);
