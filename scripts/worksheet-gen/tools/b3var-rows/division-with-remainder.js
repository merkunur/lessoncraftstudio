'use strict';
/**
 * b3var-rows/division-with-remainder.js — the five variation faces of G3-377
 * `division-with-remainder` (design docs/worksheet-gen/b3-designs/
 * G3-377-division-with-remainder.md §3; record _work/G3-377-faces.md). Ids are
 * FIXED by _records/b3var-id-allocation.json. Read by tools/gen-b3var-specs.js only.
 *
 * All five are CODE faces on the base's additive `mode` knob (types/g3/
 * G3-377-division-with-remainder.js `buildFace` / `verifyFaceInPage`); every row
 * spreads the base's d2 config (so `divisors:'unit'` — the DIVISOR SET is the
 * unitAxis fan, exemplar 2-5 — rides along) and sets `mode` + the face's own
 * keys; the resolved d2 config differs from the base's and from every sibling
 * (tools/gate-variation-distinct.js --batch=b3 --family=division-with-remainder).
 * `nMax:null` resolves at build to qMax·d + d − 1 over the unit's largest d ("inside
 * the tables": 54 on 2-5, 98 on 6-9 / 2-9). Every sign is divGlyph(locale).
 *
 *   F1 G3-380  mode:'share'     PARTITIVE: a 2-row strip of n pictures over d homes + a dashed
 *                               leftover home; tally one picture per home in turn, the loose
 *                               ones into the leftover home; write q and r. THEMED (the base's
 *                               themeAxis rides along).
 *   F2 G3-381  mode:'practice'  FLUENCY: 2 × 5 notation rows inside the tables, every one with a
 *                               remainder. themeless.
 *   F3 G3-382  mode:'exact'     DECISION: 2 × 4 rows, half exact; circle "exact" / "remainder",
 *                               write q and r (0 when exact). themeless.
 *   F4 G3-383  mode:'error'     CHECK r < d: 2 × 4 worked rows with a WRONG pair printed (6 rBig,
 *                               2 sum); cross out, write the right pair under it. themeless.
 *   F5 G3-384  mode:'line'      MEASUREMENT: 1 × 3 number lines 0..lineEnd with a mark at n and
 *                               NO printed hops; draw hops of d back, write the hops and the
 *                               landing. themeless.
 *
 * The four themeless faces carry `extra {themeAxis:{applicable:false}}` (the
 * design: a picture on a numbers row reads as a clue). EN title + instruction =
 * the bank's strings.F1..F5 verbatim (data/b3/division-with-remainder.js; the
 * gate asserts the pair is one source).
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  ['g3', 'G3-380', 'division-with-remainder-share-it-out', 'G3-377-division-with-remainder.js', 2,
    { mode: 'share', cards: 4, nMin: 7, nMax: 20, minR: 1, iconPx: 36, perRow: 10, gapX: 4, gapY: 4, inset: 20, colGap: 8, slotH: 44, leftoverW: 64, minDistinctD: 3, minQ2Cards: 3, rVaries: true, distinctN: true },
    'Share It Out: What Is Left Over?',
    'Deal the pile into the boxes one at a time. Write how many each box gets and how many cannot be shared.'],
  ['g3', 'G3-381', 'division-with-remainder-practice-rows', 'G3-377-division-with-remainder.js', 2,
    { mode: 'practice', cards: 10, nMin: 7, nMax: null, qMax: 10, minR: 1, maxPerD: 3, minDistinctD: 3, minQ2Cards: 0, rVaries: true, distinctN: true },
    'Division with Remainders: Practice Rows',
    'Every division leaves something over. Write the answer and the remainder in each row.',
    { themeAxis: { applicable: false } }],
  ['g3', 'G3-382', 'division-with-remainder-exact-or-not', 'G3-377-division-with-remainder.js', 2,
    { mode: 'exact', cards: 8, exact: 4, nMin: 6, nMax: null, qMax: 10, minR: 0, maxPerD: 3, minDistinctD: 3, minQ2Cards: 0, rVaries: false, distinctN: true, pillPx: 20, pillPxMin: 18, pillLh: 1.1, rowGap: 6, casitaH: 84 },
    'Exact or Not? Divisions With and Without a Remainder',
    'Decide whether each division comes out exactly. Circle your choice and write the remainder, 0 if there is none.',
    { themeAxis: { applicable: false } }],
  ['g3', 'G3-383', 'division-with-remainder-find-the-error', 'G3-377-division-with-remainder.js', 2,
    { mode: 'error', cards: 8, kinds: { rBig: 6, sum: 2 }, clean: 0, nMin: 7, nMax: null, qMax: 10, minR: 1, maxPerD: 3, minDistinctD: 3, minQ2Cards: 0, rVaries: true, distinctN: true, rowGap: 4 },
    'Find the Error: The Remainder Is Too Big',
    'Every division has been worked out wrongly. Cross out the wrong numbers and write the right answer and remainder in the boxes.',
    { themeAxis: { applicable: false } }],
  ['g3', 'G3-384', 'division-with-remainder-hop-back-on-the-number-line', 'G3-377-division-with-remainder.js', 2,
    { mode: 'line', cards: 3, nMin: 10, nMax: 30, minR: 1, lineMax: 35, lineW: 560, hopMin: 36, hopAir: 20, rowGap: 8, minDistinctD: 2, minQ2Cards: 2, rVaries: true, distinctN: true },
    'Hop Back on the Number Line: What Is Left?',
    'Start at the marked number and draw hops back of the same size until a whole hop no longer fits. Write the hops and where you land.',
    { themeAxis: { applicable: false } }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
