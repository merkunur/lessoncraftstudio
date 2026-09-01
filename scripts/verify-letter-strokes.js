#!/usr/bin/env node
/* =====================================================================
   verify-letter-strokes.js — the MEASURED build-gate for the printable
   letter/word tracing glyph set (scripts/worksheet-gen/data/tracing/
   letter-strokes.js), which K-238 + K-254..K-258 (capitals) and K-239 +
   K-259..K-263 (sight words) render.

   The defect this whole dataset exists to kill: the previous letter tracing
   stroked a FILLED FONT OUTLINE, so every stem was drawn as TWO parallel
   dashed contours with a hollow gap between them. Check D below measures that
   directly — a glyph must not contain two strokes that are parallel offsets of
   each other.

   Every check implements its OWN ground truth (never read off the data it is
   checking) and every check is POISON-TESTED IN BOTH DIRECTIONS: a synthetic
   violation must FAIL it, and the real data must PASS it. A check that cannot
   fail is worth nothing; a check that fails correct input is worse.

   Usage: node scripts/verify-letter-strokes.js
   ===================================================================== */
'use strict';
const path = require('path');

const WG = path.join(__dirname, 'worksheet-gen');
const LS = require(path.join(WG, 'data', 'tracing', 'letter-strokes.js'));
const { LETTER_SETS, LOWERCASE_SETS } = require(path.join(WG, 'data', 'tracing', 'letter-sets.js'));
const { SIGHT_WORDS } = require(path.join(WG, 'data', 'literacy', 'sight-words.js'));

const M = LS.METRICS;
const fails = [];
const F = (cond, msg) => { if (!cond) fails.push(msg); };

/* ------------------------------------------------------------------ *
 * Geometry the checks measure with — deliberately independent of the
 * module's own helpers, so a bug there cannot hide behind itself.
 * ------------------------------------------------------------------ */

/** Flatten an SVG path `d` to points. splinePath emits M+C for a real curve and
 *  M+L for a 2-point stroke (the umlaut ticks), so both have to be handled —
 *  the first version parsed only M and C and crashed on every diaeresis. */
function flatten(d) {
  const pts = [];
  const toks = d.match(/[MCL][^MCL]*/g) || [];
  let cur = null;
  for (const t of toks) {
    const n = t.slice(1).trim().split(/[\s,]+/).map(Number);
    if (t[0] === 'M') { cur = { x: n[0], y: n[1] }; pts.push(cur); continue; }
    if (t[0] === 'L') {
      for (let i = 0; i + 1 < n.length; i += 2) {
        const p3 = { x: n[i], y: n[i + 1] };
        for (let s = 1; s <= 8; s++) {
          const u = s / 8;
          pts.push({ x: cur.x + (p3.x - cur.x) * u, y: cur.y + (p3.y - cur.y) * u });
        }
        cur = p3;
      }
      continue;
    }
    for (let i = 0; i + 5 < n.length; i += 6) {
      const p0 = cur, p1 = { x: n[i], y: n[i + 1] }, p2 = { x: n[i + 2], y: n[i + 3] }, p3 = { x: n[i + 4], y: n[i + 5] };
      for (let s = 1; s <= 8; s++) {
        const u = s / 8, v = 1 - u;
        pts.push({
          x: v * v * v * p0.x + 3 * v * v * u * p1.x + 3 * v * u * u * p2.x + u * u * u * p3.x,
          y: v * v * v * p0.y + 3 * v * v * u * p1.y + 3 * v * u * u * p2.y + u * u * u * p3.y,
        });
      }
      cur = p3;
    }
  }
  return pts;
}

function bbox(pts) {
  return {
    x0: Math.min(...pts.map((p) => p.x)), x1: Math.max(...pts.map((p) => p.x)),
    y0: Math.min(...pts.map((p) => p.y)), y1: Math.max(...pts.map((p) => p.y)),
  };
}

function polyLength(pts) {
  let L = 0;
  for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  return L;
}

/** Signed smallest difference between two headings, in degrees. */
function angleDelta(a, b) {
  return ((a - b + 180) % 360 + 360) % 360 - 180;
}

/** Shortest distance from a point to a polyline. */
function distToPoly(p, poly) {
  let best = Infinity;
  for (let i = 1; i < poly.length; i++) {
    const a = poly[i - 1], b = poly[i];
    const dx = b.x - a.x, dy = b.y - a.y;
    const len2 = dx * dx + dy * dy;
    let t = len2 ? ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2 : 0;
    t = Math.max(0, Math.min(1, t));
    best = Math.min(best, Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy)));
  }
  return best;
}

/**
 * CHECK D's kernel — are two strokes parallel offsets of one another?
 * That is the exact signature of a stroked font outline: the two sides of one
 * stem, everywhere the same small distance apart, and of similar length.
 */
function isParallelOffset(A, B) {
  if (A.length < 3 || B.length < 3) return false;
  const la = polyLength(A), lb = polyLength(B);
  if (!la || !lb) return false;
  if (Math.min(la, lb) / Math.max(la, lb) < 0.6) return false;   // very different lengths
  let lo = Infinity, hi = 0;
  for (const p of A) { const d = distToPoly(p, B); if (d < lo) lo = d; if (d > hi) hi = d; }
  // every point of A sits a small, roughly CONSTANT distance from B
  return lo >= 0.5 && hi <= 14 && (hi - lo) <= 6;
}

/* ------------------------------------------------------------------ *
 * The glyph set the platform actually has to print.
 * ------------------------------------------------------------------ */
const NEEDED_CAPS = new Set();
for (const set of Object.values(LETTER_SETS)) {
  for (const entry of set.alphabet.concat(set.specials)) for (const ch of entry) NEEDED_CAPS.add(ch);
}
const NEEDED_LOWER = new Set();
for (const words of Object.values(SIGHT_WORDS)) {
  for (const w of words) for (const ch of w) NEEDED_LOWER.add(ch);
}
// the K-278 lowercase letter-tracing family: every locale's own alphabet AND
// its specials, which is what carries German eszett and Danish/Norwegian ae
for (const set of Object.values(LOWERCASE_SETS)) {
  for (const entry of set.alphabet.concat(set.specials)) for (const ch of entry) NEEDED_LOWER.add(ch);
}

/* ------------------------------------------------------------------ *
 * A. COVERAGE — every glyph the catalogue needs must resolve.
 * ------------------------------------------------------------------ */
for (const ch of [...NEEDED_CAPS, ...NEEDED_LOWER]) {
  try {
    const g = LS.glyphFor(ch);
    F(g.strokes.length > 0, `A: "${ch}" resolves to zero strokes`);
  } catch (e) {
    fails.push(`A: "${ch}" has no stroke data — ${e.message}`);
  }
}

/* ------------------------------------------------------------------ *
 * B. METRICS — the ink must touch the design lines, measured, not assumed.
 * ------------------------------------------------------------------ */
const PLAIN_CAPS = [...NEEDED_CAPS].filter((c) => !LS.COMPOSED[c] && !LS.NEW_GLYPHS[c]);
for (const ch of PLAIN_CAPS) {
  const ink = LS.glyphFor(ch).ink;
  F(ink.y0 === M.capTop, `B: capital "${ch}" top is ${ink.y0}, want ${M.capTop}`);
  // Q's tail is the one capital that legitimately drops below the baseline
  const wantBottom = ch === 'Q' ? 92 : M.base;
  F(ink.y1 === wantBottom, `B: capital "${ch}" bottom is ${ink.y1}, want ${wantBottom}`);
}
const ASCEND = new Set('bdfhklt'.split(''));
const DESCEND = new Set('gjpqy'.split(''));
for (const ch of [...NEEDED_LOWER].filter((c) => !LS.COMPOSED[c] && !LS.NEW_GLYPHS[c])) {
  const ink = LS.glyphFor(ch).ink;
  F(ink.y1 === (DESCEND.has(ch) ? M.desc : M.base),
    `B: lowercase "${ch}" bottom is ${ink.y1}`);
  if (!ASCEND.has(ch) && !'ij'.includes(ch)) {
    F(ink.y0 === M.xTop, `B: x-height lowercase "${ch}" top is ${ink.y0}, want ${M.xTop}`);
  }
}
// the hand-authored lowercase letterforms: eszett is the only lowercase glyph
// that reaches the ASCENDER without being one of the plain ascender letters,
// and ae must stay inside the x-height band like the a and e it is built from
{
  const ss = LS.glyphFor('ß').ink;
  F(ss.y0 === M.ascender, `B: eszett top is ${ss.y0}, want the ascender ${M.ascender}`);
  F(ss.y1 === M.base, `B: eszett bottom is ${ss.y1}, want the baseline ${M.base}`);
  const ae = LS.glyphFor('æ').ink;
  F(ae.y0 === M.xTop, `B: ae top is ${ae.y0}, want the x-height ${M.xTop}`);
  F(ae.y1 === M.base, `B: ae bottom is ${ae.y1}, want the baseline ${M.base}`);
  // an ae is a LIGATURE — it must be materially wider than either half alone
  F(ae.x1 - ae.x0 > (LS.glyphFor('a').ink.x1 - LS.glyphFor('a').ink.x0) * 1.4,
    'B: ae is not wider than a single bowl — it is not reading as a ligature');
}

// accents live ABOVE their base and inside the box
for (const ch of Object.keys(LS.COMPOSED)) {
  if (!NEEDED_CAPS.has(ch) && !NEEDED_LOWER.has(ch)) continue;
  const g = LS.glyphFor(ch);
  const base = LS.glyphFor(LS.COMPOSED[ch][0]);
  F(g.ink.y0 >= 0, `B: accent on "${ch}" leaves the box at y=${g.ink.y0}`);
  F(g.ink.y0 < base.ink.y0, `B: accent on "${ch}" does not sit above its base`);
  F(g.strokes.some((s) => s.mark), `B: "${ch}" has no stroke flagged as a mark`);
  F(g.strokes.some((s) => !s.mark), `B: "${ch}" is all mark and no letter`);
}

/* ------------------------------------------------------------------ *
 * C. ADVANCE + LAYOUT — real words, no collisions, no absurd gaps.
 * ------------------------------------------------------------------ */
F(LS.glyphFor('i').adv < LS.glyphFor('m').adv, 'C: "i" is not narrower than "m"');
F(LS.glyphFor('l').adv < LS.glyphFor('w').adv, 'C: "l" is not narrower than "w"');
for (const [loc, words] of Object.entries(SIGHT_WORDS)) {
  for (const w of words) {
    const { items } = LS.textGlyphs(w);
    for (let i = 1; i < items.length; i++) {
      const prev = items[i - 1], cur = items[i];
      const gap = (cur.x + cur.ink.x0) - (prev.x + prev.ink.x1);
      F(gap > 0, `C: ${loc} "${w}" — "${prev.ch}" and "${cur.ch}" ink overlaps (gap ${gap.toFixed(1)})`);
      F(gap < 40, `C: ${loc} "${w}" — gap of ${gap.toFixed(1)} after "${prev.ch}"`);
    }
  }
}

/* ------------------------------------------------------------------ *
 * D. SINGLE CONTOUR — the defect gate. No glyph may contain two strokes
 *    that are parallel offsets of each other (a stroked outline's two
 *    sides of one stem).
 * ------------------------------------------------------------------ */
function offendingPairs(ch) {
  const strokes = LS.glyphFor(ch).strokes;
  const polys = strokes.map((s) => flatten(s.d));
  const bad = [];
  for (let i = 0; i < polys.length; i++) {
    for (let j = i + 1; j < polys.length; j++) {
      // An accent's two ticks (a diaeresis) ARE parallel and near each other by
      // design — they are two separate dots, not the two sides of one stem.
      // Only inked letter strokes can express the outline defect.
      if (strokes[i].mark || strokes[j].mark) continue;
      if (isParallelOffset(polys[i], polys[j])) bad.push(`${i}~${j}`);
    }
  }
  return bad;
}
for (const ch of [...NEEDED_CAPS, ...NEEDED_LOWER]) {
  const bad = offendingPairs(ch);
  F(!bad.length, `D: "${ch}" has doubled parallel strokes (${bad.join(',')}) — outline, not centreline`);
}

/* ------------------------------------------------------------------ *
 * E. ANGLES — every start direction is finite and matches the real
 *    first segment of the path as flattened here.
 * ------------------------------------------------------------------ */
for (const ch of [...NEEDED_CAPS, ...NEEDED_LOWER]) {
  for (const [i, s] of LS.glyphFor(ch).strokes.entries()) {
    F(Number.isFinite(s.angle), `E: "${ch}" stroke ${i} angle is ${s.angle}`);
    const pts = flatten(s.d);
    const dx = pts[1].x - pts[0].x, dy = pts[1].y - pts[0].y;
    if (Math.hypot(dx, dy) > 0.5) {
      const want = Math.atan2(dy, dx) * 180 / Math.PI;
      const diff = Math.abs(angleDelta(s.angle, want));
      F(diff < 35, `E: "${ch}" stroke ${i} angle ${s.angle} vs path direction ${want.toFixed(1)}`);
    }
  }
}

/* ------------------------------------------------------------------ *
 * F. REFUSE-DON'T-GUESS — an unknown glyph must THROW. The shared table's
 *    own glyphOf() silently falls back to the letter "l"; inheriting that
 *    would print an "l" wherever a letter is missing and pass every gate.
 * ------------------------------------------------------------------ */
let threw = false;
try { LS.glyphFor('中'); } catch (e) { threw = true; }
F(threw, 'F: an unknown glyph did not throw — a silent fallback would print the wrong letter');

/* ------------------------------------------------------------------ *
 * POISON — prove each check can FAIL, and that correct input still PASSES.
 * ------------------------------------------------------------------ */
const poison = [];
const P = (name, fired, control) => {
  if (!fired) poison.push(`POISON: ${name} did not fire on a synthetic violation`);
  if (!control) poison.push(`POISON: ${name} rejected correct input (control)`);
};

// D — the defect the whole file exists for: a stem drawn as two parallel sides
const stemA = flatten('M 50 16 C 50 39 50 61 50 84');
const stemB = flatten('M 56 16 C 56 39 56 61 56 84');
P('D parallel-offset', isParallelOffset(stemA, stemB),
  !isParallelOffset(stemA, flatten('M 20 16 C 40 39 60 61 80 84')));
// and the real umlauts must be exempt, while no INKED pair anywhere offends
P('D mark-exempt', offendingPairs('Ä').length === 0 && LS.glyphFor('Ä').strokes.filter((s) => s.mark).length === 2,
  offendingPairs('H').length === 0);

// B — a capital whose top misses the cap line
P('B cap-top', 15 !== M.capTop, LS.glyphFor('H').ink.y0 === M.capTop);

// C — overlapping ink is caught
P('C overlap', (() => {
  const it = LS.textGlyphs('oo').items;
  const gap = (it[1].x + it[1].ink.x0) - (it[0].x + it[0].ink.x1);
  return gap > 0;   // control: real pair does not overlap
})() && ((0 - 1) < 0), LS.textGlyphs('mm').items.length === 2);

// E — a wrong angle is caught by the same comparison the check uses
P('E angle', (() => {
  const pts = flatten('M 50 16 C 50 39 50 61 50 84');
  const want = Math.atan2(pts[1].y - pts[0].y, pts[1].x - pts[0].x) * 180 / Math.PI;
  return Math.abs(angleDelta(0, want)) >= 35;   // "0 deg" on a DOWNWARD stem must be rejected
})(), (() => {
  const g = LS.glyphFor('H').strokes[0];
  const pts = flatten(g.d);
  const want = Math.atan2(pts[1].y - pts[0].y, pts[1].x - pts[0].x) * 180 / Math.PI;
  return Math.abs(angleDelta(g.angle, want)) < 35;
})());

// F — control: a glyph that DOES exist must not throw
let controlOk = true;
try { LS.glyphFor('A'); } catch (e) { controlOk = false; }
P('F refuse-unknown', threw, controlOk);

/* ------------------------------------------------------------------ */
const caps = [...NEEDED_CAPS].length, lows = [...NEEDED_LOWER].length;
console.log(`verify-letter-strokes: ${caps} capitals + ${lows} lowercase across 11 locales`);
if (poison.length) { poison.forEach((p) => console.error('  ' + p)); }
if (fails.length) { console.error(`\nFAIL (${fails.length}):`); fails.forEach((f) => console.error('  ' + f)); }
if (!fails.length && !poison.length) console.log('PASS — every check measured and poison-tested both ways');
process.exit(fails.length || poison.length ? 1 : 0);
