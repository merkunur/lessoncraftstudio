/* =====================================================================
   verify-cold-line.js — the model gate for TOOL #43
   ---------------------------------------------------------------------
   Run:  node scripts/verify-cold-line.js

   ⚠ NODE ONLY. ZERO BROWSER WORK. `mutate-cold-line.js` runs this file
   once per mutation under a 30s cap, and a gate that HANGS is scored as
   SURVIVED — so nothing here may launch a browser, read the network, or
   loop on a condition the tool controls.

   ⭐ EVERY EXPECTED VALUE IS COMPUTED BY A DIFFERENT ALGORITHM THAN THE
   TOOL'S. The tool multiplies; the oracle divides. The tool subtracts;
   the oracle counts. The tool swaps coordinates; the oracle measures
   squared distance. A gate that reuses the tool's own expression is
   marking its own homework — that let 19 of 51 mutations survive once.

   ⚠ AND EVERY SWEEP WALKS THE WHOLE BAND. A gate that samples ONE POINT
   of a band is not testing the band; #42 shipped a clipped numeral
   because its containment check only ever ran the opening state.
   ===================================================================== */

'use strict';
const path = require('path');
const DIR = process.env.CLD_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const T = require(path.join(DIR, 'cold-line.js'));

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const die = (m) => { console.error('  FATAL ' + m); process.exit(1); };

/* =====================================================================
   V0 — NON-VACUITY. Nothing below means anything if these are wrong,
   and a sweep over an empty range reports a confident green.
   ===================================================================== */
console.log('\n[V0] non-vacuity — the sweep must actually sweep');
const DOMAIN = [];
for (let v = T.DMIN; v <= T.DMAX; v++) DOMAIN.push(v);
const LOS = [];
for (let lo = T.DMIN; lo <= T.loMax(); lo++) LOS.push(lo);

is(DOMAIN.length === 61, `the domain has ${DOMAIN.length} values`);
is(LOS.length === 41, `there are ${LOS.length} reachable window positions`);
is(DOMAIN.some((v) => v < 0), 'the domain contains negatives — or every claim below is about a non-negative line');
const NEG_LOS = LOS.filter((lo) => lo < 0 && lo + T.WINDOW - 1 > 0);
is(NEG_LOS.length > 0, `${NEG_LOS.length} window positions STRADDLE zero — the squash bug lives only here`);
if (DOMAIN.length < 2 || LOS.length < 2) die('the sweep is degenerate; refusing to report a green');

/* the four declared state fields, read from ONE place. A completeness
   check that lists a SUBSET of the fields is worse than none (#42). */
/* ⚠ captured BEFORE any assertion mutates it — a test that resets the
   value it is testing masks its own mutation. */
const DECLARED_FREE = T.FREE_SETTINGS;
const FIELDS = Object.keys(T.newState());
is(FIELDS.length === 4, `the state declares ${FIELDS.length} fields: ${FIELDS.join(', ')}`);
if (FIELDS.length < 4) die('fewer than 4 state fields parsed — this gate would be hollow');

/* =====================================================================
   V1 — THE BAND, DERIVED AND PRINTED (never preferred)
   ===================================================================== */
console.log('\n[V1] the band, derived from the MEASURED bench');
/* ⭐ MEASURED, WITH PROVENANCE — and it moved once already.
   The first value here was 226px, ESTIMATED from comparison-planks'
   chrome (two hint lines, three chips). This tool has one hint line
   and four chips, so its real bench is larger. local-test- L1
   measured 296px across the whole viewport sweep and the two gates
   disagreed — which is what they exist to do. The MEASUREMENT wins;
   the record is updated to it, never the other way round.
     296px · narrowest of 6 viewports × dpr 1,2 · local-test L1 · 2026-08-01 */
const S_PX = 296;
const LBL_W = 31, LBL_H = 21, STROKE = 2;
const A = T.BOT - T.TOP, G = T.WINDOW - 1, U = A / G, sigma = S_PX / T.W;
const M = T.TOP;           /* the end margin, in model units */
console.log(`      axis ${A} model units over ${G} gaps -> U = ${U}`);
console.log(`      at the narrowest measured bench (${S_PX}px): pitch = ${(U * sigma).toFixed(2)}px`);
console.log(`      label pitch = ${(U * sigma * T.LABEL_EVERY).toFixed(1)}px   end margin = ${(M * sigma).toFixed(1)}px`);
is(Number.isInteger(U), `U is an INTEGER (${U}) — a float here puts a decimal in an SVG attribute`);
is(T.W === T.H, `the arena is SQUARE (${T.W}x${T.H}) — this is what makes "same span in both poses" structural`);
is(U * sigma >= 2 * STROKE + 1, `minor-tick floor: ${(U * sigma).toFixed(2)}px >= ${2 * STROKE + 1}px`);
is(U * sigma * T.LABEL_EVERY >= LBL_W + 6, `TIPPED label pitch (the binding floor): ${(U * sigma * T.LABEL_EVERY).toFixed(1)}px >= ${LBL_W + 6}px`);
is(U * sigma * T.LABEL_EVERY >= LBL_H + 4, `upright label pitch: ${(U * sigma * T.LABEL_EVERY).toFixed(1)}px >= ${LBL_H + 4}px`);
is(M * sigma >= LBL_W / 2 + 4, `end margin clears the widest half-label: ${(M * sigma).toFixed(1)}px >= ${(LBL_W / 2 + 4).toFixed(1)}px`);
console.log('      ⚠ the CANVAS floor (>=34px) does not apply: there are no cells. Stated, not skipped.');

/* =====================================================================
   V2 — LINEARITY ACROSS ZERO. Three oracles, none of them the tool's.
   ===================================================================== */
console.log('\n[V2] linearity — three independent oracles, full domain x all 41 windows');
let a1 = 0, a2 = 0, a3 = 0, a4 = 0, cells = 0, negCells = 0;
for (const lo of LOS) {
  const st = { lo: lo, a: 0, b: 1, tipped: false };
  /* A1: two-point extrapolation. DIVIDES where the tool multiplies. */
  const yMin = T.yFor(st, T.DMIN), yMax = T.yFor(st, T.DMAX);
  /* A2: accumulation. ADDITION ONLY — catches a float U. */
  let acc = yMin;
  let prev = null;
  for (const v of DOMAIN) {
    cells++;
    if (lo < 0 && lo + T.WINDOW - 1 > 0) negCells++;
    const y = T.yFor(st, v);
    const fhat = yMin + (v - T.DMIN) * (yMax - yMin) / (T.DMAX - T.DMIN);
    if (y !== fhat) a1++;
    if (y !== acc) a2++;
    acc -= U;
    /* A4: strict monotonic decrease in y as v rises */
    if (prev !== null && !(y < prev)) a4++;
    prev = y;
  }
  /* A3: second difference is exactly zero, everywhere */
  for (let i = 1; i < DOMAIN.length - 1; i++) {
    const d2 = T.yFor(st, DOMAIN[i + 1]) - 2 * T.yFor(st, DOMAIN[i]) + T.yFor(st, DOMAIN[i - 1]);
    if (d2 !== 0) a3++;
  }
}
console.log(`      swept ${cells} (value x window) cells, of which ${negCells} sit in a zero-straddling window`);
is(negCells > 0, 'the sweep actually visited zero-straddling windows (vacuity guard)');
/* ⭐⭐ AND THE ANCHOR, WHICH THE EXTRAPOLATION CANNOT SEE. A1 derives its
   two reference points FROM the tool, so a mutation that ignores the
   window shifts BOTH endpoints consistently and stays perfectly linear —
   it survived the first version of this gate. The window's position is a
   separate claim and needs a separate, absolute assertion. */
let anchorBad = 0;
for (const lo of LOS) {
  const st = { lo: lo, a: 0, b: 1, tipped: false };
  if (T.yFor(st, lo) !== T.BOT) anchorBad++;
  if (T.yFor(st, lo + T.WINDOW - 1) !== T.TOP) anchorBad++;
}
is(anchorBad === 0, `⭐ the window ANCHOR: bottom tick === BOT and top tick === TOP for all ${LOS.length} positions: ${anchorBad} faults`);

is(a1 === 0, `A1 two-point extrapolation (division): ${a1} mismatches`);
is(a2 === 0, `A2 accumulation (addition only): ${a2} mismatches`);
is(a3 === 0, `A3 second difference === 0 everywhere: ${a3} nonzero`);
is(a4 === 0, `A4 strictly monotonic — catches a reflection that A1 would miss: ${a4} breaks`);

/* A5 — THE LIQUID. A tick-only linearity test passes a build whose
   LIQUID is squashed near zero, so its geometry must live in the model
   and be checked against the same affine map. */
console.log('\n[V2b] the liquid — the one thing tick linearity cannot see');
let a5 = 0, segs = 0, clipped = 0;
for (const lo of LOS) {
  for (const av of DOMAIN) {
    const st = { lo: lo, a: av, b: 0, tipped: false };
    const seg = T.liquidSeg(st);
    if (!seg) continue;
    segs++;
    /* ⚠ a non-null segment must be a REAL one — dropping the
       nothing-to-draw guard survived the first gate, because both
       ends of an empty segment still lie on the affine map. */
    if (!(seg.to > seg.from)) a5++;
    const hiV = lo + T.WINDOW - 1;
    if (av > hiV) clipped++;
    /* the oracle: the ends must be the SAME affine map as the ticks */
    const yMin = T.yFor(st, T.DMIN), yMax = T.yFor(st, T.DMAX);
    const f = (v) => yMin + (v - T.DMIN) * (yMax - yMin) / (T.DMAX - T.DMIN);
    if (T.yFor(st, seg.from) !== f(seg.from) || T.yFor(st, seg.to) !== f(seg.to)) a5++;
    if (seg.from < lo || seg.to > hiV) a5++;      /* clipped in VALUE space */
  }
}
is(segs > 0, `${segs} liquid segments to check (vacuity guard)`);
is(clipped > 0, `${clipped} of them required clipping — the clip path is exercised`);
is(a5 === 0, `A5 the liquid's ends lie on the same affine map, and are clipped in VALUE space: ${a5} faults`);

/* =====================================================================
   V3 — THE SPAN. The oracle COUNTS; it never subtracts.
   ===================================================================== */
console.log('\n[V3] span — a counting oracle, exhaustive over every pair');
const oCount = (a, b) => {          /* |{v : min < v <= max}| — no subtraction */
  const lo = Math.min(a, b), hi = Math.max(a, b);
  let n = 0;
  for (let v = lo + 1; v <= hi; v++) n++;
  return n;
};
let ordered = 0, unordered = 0, crossing = 0, sBad = 0;
for (const x of DOMAIN) {
  for (const y of DOMAIN) {
    ordered++;
    if (T.spanOf({ lo: -12, a: x, b: y, tipped: false }) !== oCount(x, y)) sBad++;
    if (y > x) {
      unordered++;
      if (x < 0 && y > 0) crossing++;
    }
  }
}
/* ⚠ the cardinalities are COMPUTED and printed, never quoted. The
   catalog's "1,500 crossing pairs" does not reconstruct under any
   reading — for 81 values strict crossings are 1,600. */
console.log(`      ordered pairs ${ordered} · unordered ${unordered} · strictly crossing zero ${crossing}`);
is(ordered === DOMAIN.length * DOMAIN.length, 'every ordered pair was visited');
is(crossing > 0, 'zero-crossing pairs were actually visited (vacuity guard)');
is(sBad === 0, `A6/A7 span === counting oracle across all ${ordered} ordered pairs: ${sBad} mismatches`);
is(T.spanOf({ lo: 0, a: 7, b: 7, tipped: false }) === 0, 'span 0 is a legal, meaningful state');
is(T.hiOf({ lo: 0, a: 7, b: 7, tipped: false }) === null, 'hiOf is three-valued at equality');

/* =====================================================================
   V4 — THE TIP. An integer identity, plus the sense a matrix cannot see.
   ===================================================================== */
console.log('\n[V4] the tip');
const up = { lo: -12, a: -5, b: 3, tipped: false };
const tp = { lo: -12, a: -5, b: 3, tipped: true };
let iso = 0, isoN = 0, rt = 0;
for (let x = 0; x <= T.W; x += 25) {
  for (let y = 0; y <= T.H; y += 25) {
    const p = T.toScreen(tp, x, y);
    const q = T.toInstrument(tp, p.x, p.y);
    if (q.x !== x || q.y !== y) rt++;
    for (let x2 = 0; x2 <= T.W; x2 += 200) {
      for (let y2 = 0; y2 <= T.H; y2 += 200) {
        const r = T.toScreen(tp, x2, y2);
        isoN++;
        /* squared distance: integers only, no sqrt, no tolerance */
        if ((x - x2) ** 2 + (y - y2) ** 2 !== (p.x - r.x) ** 2 + (p.y - r.y) ** 2) iso++;
      }
    }
  }
}
is(isoN > 1000, `${isoN} integer distance pairs compared (vacuity guard)`);
is(iso === 0, `A8 the tip is an EXACT ISOMETRY — dist² preserved, no float: ${iso} mismatches`);
is(rt === 0, `toInstrument ∘ toScreen === identity: ${rt} faults`);

/* A9 — THE SENSE. rotate(-90) is equally a rotation and runs the line
   right-to-left; A8 cannot see it. number-line.js:13 fixes the
   platform's reading order as "L→R, smallest→largest". */
const pLo = T.toScreen(tp, T.AXIS_X, T.yFor(tp, tp.lo));
const pHi = T.toScreen(tp, T.AXIS_X, T.yFor(tp, tp.lo + T.WINDOW - 1));
is(pLo.x < pHi.x, `A9 tipped, the line runs L→R smallest→largest (${pLo.x} < ${pHi.x})`);
is(T.toScreen(up, T.AXIS_X, T.TOP).y < T.toScreen(up, T.AXIS_X, T.BOT).y,
  'standing, the largest value is at the TOP');
/* labels sit to the +x side, which must land BELOW the tipped line */
is(T.toScreen(tp, T.AXIS_X + 200, 500).y > T.toScreen(tp, T.AXIS_X, 500).y,
  'the label side lands BELOW the tipped line, per number-line convention');

/* A10 — the tip round-trips on ALL FOUR fields, over every reachable state */
let tipBad = 0, tipN = 0;
for (const lo of LOS) {
  for (const av of [T.DMIN, -1, 0, 1, T.DMAX]) {
    const s0 = T._st({ lo: lo, a: av, b: 0, tipped: false });
    const s2 = T._st(T.tip(T.tip(s0)));
    tipN++;
    for (const f of FIELDS) if (s0[f] !== s2[f]) tipBad++;
  }
}
is(tipN > 100, `${tipN} reachable states round-tripped (vacuity guard)`);
is(tipBad === 0, `A10 tip(tip(s)) === s on all ${FIELDS.length} fields: ${tipBad} field faults`);
is(T.tip(up).tipped === true && T.tip(tp).tipped === false, 'tip is never a no-op');

/* =====================================================================
   V5 — THE CONTROLS DO WHAT THEIR LABELS SAY
   ===================================================================== */
console.log('\n[V5] reducers, refusals, and controls that are actually live');
let slideBad = 0, markBad = 0;
for (const lo of LOS) {
  const s0 = { lo: lo, a: -5, b: 3, tipped: false };
  for (const to of LOS) {
    const n = T.slideTo(s0, to);
    if (n === null) continue;
    /* A12: sliding the SCALE must never move a MARK. If it did, |a−b|
       would change as a side effect of a viewing control, and the whole
       routine ("is −5→3 the same jump as 10→18?") would be a lie. */
    if (n.a !== s0.a || n.b !== s0.b || n.tipped !== s0.tipped) slideBad++;
  }
  const m = T.setMark(s0, 'a', 9);
  if (m && m.lo !== s0.lo) markBad++;      /* and setting a mark never moves the window */
}
is(slideBad === 0, `A12 sliding the scale leaves both marks and the pose byte-identical: ${slideBad} faults`);
is(markBad === 0, `and setting a mark never moves the window: ${markBad} faults`);

is(T.setMark(up, 'c', 3) === null, 'setMark refuses an unknown mark');
is(T.setMark(up, 'a', T.DMAX + 1) === null, 'setMark refuses out of domain (a refusal, not a clamp)');
is(T.setMark(up, 'a', -5) === null, 'setMark refuses a no-op');
is(T.setMark(up, 'a', NaN) === null, 'setMark refuses NaN');
is(T.slideTo(up, T.loMax() + 1) === null, 'slideTo refuses past the last window');
is(T.slideTo(up, up.lo) === null, 'slideTo refuses a no-op');
/* ⚠ slideBy is a COMPOSITION of slideTo, so there is ONE band rule. */
is(T.slideBy({ lo: T.loMax(), a: 0, b: 1, tipped: false }, 99) === null,
  'slideBy saturates at the band edge and then refuses — one band rule, not two');
is(T.slideBy(up, 2) !== null, 'slideBy moves inside the band');

/* ⭐ A DEAD CONTROL IS A DEFECT, NOT A DETAIL. findZero returning null
   in the opening state would score dead in all three entitlement
   states — #41's flag, and this build shipped it once already. */
is(T.findZero(T.newState()) !== null, '⭐ findZero is LIVE in the opening state');
const z = T.findZero(T.newState());
is(z !== null && T.inView(z, 0), 'and it brings zero into view');

/* A13 — inView, both branches exercised */
let seen = { in: 0, out: 0 };
for (const lo of LOS) for (const v of DOMAIN) (T.inView({ lo: lo, a: 0, b: 1, tipped: false }, v) ? seen.in++ : seen.out++);
is(seen.in > 0 && seen.out > 0, `A13 inView exercised BOTH branches (${seen.in} in / ${seen.out} out)`);
let ivBad = 0;
for (const lo of LOS) for (const v of DOMAIN) {
  /* the oracle ENUMERATES the window; it never does bound arithmetic */
  const win = []; for (let k = 0; k < T.WINDOW; k++) win.push(lo + k);
  if (T.inView({ lo: lo, a: 0, b: 1, tipped: false }, v) !== (win.indexOf(v) >= 0)) ivBad++;
}
is(ivBad === 0, `inView matches an ENUMERATED window everywhere: ${ivBad} faults`);

/* =====================================================================
   V6 — TOTALITY + THE REFUSALS THAT ARE CONTENT
   ===================================================================== */
console.log('\n[V6] totality and the refuse-list');
for (const junk of [null, undefined, 0, '', [], { lo: 'x' }, { a: Infinity }, { tipped: 'yes' }]) {
  const s = T._st(junk);
  const ok = FIELDS.every((f) => s[f] !== undefined) &&
    Number.isInteger(s.lo) && Number.isInteger(s.a) && Number.isInteger(s.b) && typeof s.tipped === 'boolean';
  if (!ok) { FAIL++; console.error('  FAIL _st is not total for ' + JSON.stringify(junk)); }
}
is(Number.isInteger(T._st({ lo: 1.7, a: -3.2, b: 4.6, tipped: false }).lo), '_st ROUNDS a fractional lo');
is(T._st({ lo: 1.7, a: -3.2, b: 4.6, tipped: false }).a === -3, 'and rounds a fractional mark');
is(T._st({ lo: NaN, a: Infinity, b: -Infinity, tipped: false }).lo === T.newState().lo, '_st falls back on NaN and Infinity');
is(T._st({}).tipped === false, '_st defaults tipped to FALSE, not to truthy-undefined');
is(T._st({ tipped: 'yes' }).tipped === false, "_st does not trust a truthy 'tipped'");
is(T._int(NaN, 7) === 7 && T._int(Infinity, 7) === 7, '_int rejects NaN and Infinity');
is(true, '_st is TOTAL — every input maps to a canonical, legal, all-integer state');
is(T._st({ lo: 99, a: 0, b: 0, tipped: false }).lo === T.loMax(), '_st clamps lo into the band');
/* ⚠ _st must NOT clamp a mark into the WINDOW — posOf has to stay total
   over the domain, or the linearity sweep above cannot run. */
const far = T._st({ lo: T.DMIN, a: T.DMAX, b: 0, tipped: false });
is(far.a === T.DMAX, '_st does NOT clamp a mark into the window — posOf stays total over the domain');

const src = require('fs').readFileSync(path.join(DIR, 'cold-line.js'), 'utf8');
const strings = JSON.stringify(T.strings);
is(!/[°]/.test(strings), 'refuse 4: no degree sign in any authored string');
is(!/\b(celsius|fahrenheit)\b/i.test(strings), 'refuse 4: no unit named');
is(!/[+=↔Δ]/.test(strings), 'refuse 3: no arithmetic glyph in any authored string');
is(!/\d/.test(strings), 'no digit in any authored string');
is(!/\?/.test(strings), 'refuse 1: no question mark — the tool SHOWS, it never ASKS');
is(!/\b(sun|cloud|rain|snow|wind|storm)\b/i.test(strings), 'refuse 7: no weather vocabulary (calendar-wall owns the enum)');
is(!/\btasks\b\s*:/.test(src), 'declares no `tasks` — the shell renders zero activity chrome');
is(!/(score|streak|timer|correct|wrong)\s*:/.test(src), 'no score, streak, timer or verdict field');

/* A15 — the minus sign. U+2212, never a hyphen, for every value. */
console.log('\n[V7] typography');
let mBad = 0;
for (const v of DOMAIN) {
  const s = (v < 0 ? '−' : '') + Math.abs(v);
  if (!/^−?\d+$/.test(s)) mBad++;
  if (s.indexOf('-') >= 0) mBad++;          /* a HYPHEN-MINUS must never appear */
}
is(mBad === 0, `A15 every one of the ${DOMAIN.length} labels is U+2212 + digits, never a hyphen: ${mBad} faults`);
is(src.indexOf("'−'") >= 0, 'the source carries a real U+2212, not a hyphen');

/* the repertoire */
console.log('\n[V8] the repertoire');
const book = require(path.join(DIR, 'cold-line-sets.json'));
is(book.sets.length >= 12, `${book.sets.length} settings`);
is(book.freeCount >= 3 && book.freeCount < book.sets.length, `${book.freeCount} free, ${book.sets.length - book.freeCount} paid`);
let bBad = 0;
for (const e of book.sets) {
  const c = T._st({ lo: e.lo, a: e.a, b: e.b, tipped: false });
  if (c.lo !== e.lo || c.a !== e.a || c.b !== e.b) bBad++;    /* survives canonicalisation */
  if (!T.inView(c, c.a) || !T.inView(c, c.b)) bBad++;         /* both marks visible */
}
is(bBad === 0, `every setting survives canonicalisation with both marks in view: ${bBad} faults`);
/* ⭐ THE ENTITLEMENT FILTER, ACTUALLY CALLED. The first version of this
   gate never invoked `_sets()`, so a mutation that handed every paid
   setting to a free user — and one that degraded the offline fallback to
   NOTHING — both sailed through. An offline fallback must degrade to the
   FREE TIER, not to nothing (#38). */
T._book = book;
T.FREE_SETTINGS = book.freeCount;
T.premium = false;
const freeList = T._sets();
T.premium = true;
const paidList = T._sets();
T.premium = false;
is(freeList.length === book.freeCount, `a free user is offered exactly ${freeList.length} settings, not ${book.sets.length}`);
is(paidList.length === book.sets.length, `an entitled user is offered all ${paidList.length}`);
is(paidList.length > freeList.length, 'the paid tier actually adds something');
/* and with no book at all, the fallback must still serve the free tier */
T._book = null;
T.FREE_SETTINGS = DECLARED_FREE;
const offline = T._sets();
T._book = book;
is(DECLARED_FREE > 0, `the DECLARED free tier is ${DECLARED_FREE} settings, not zero`);
is(offline.length > 0, `offline, the fallback still serves ${offline.length} settings — it degrades to the FREE TIER, not to nothing`);

const freeSpans = book.sets.slice(0, 3).map((e) => T.spanOf({ lo: e.lo, a: e.a, b: e.b, tipped: false }));
is(new Set(freeSpans).size === 1,
  `⭐ the first three FREE settings share one span (${freeSpans.join(',')}) — span is independent of position, and that is free`);

console.log('');
if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL}`); process.exit(1); }
console.log(`PASS — ${PASS} assertions`);
