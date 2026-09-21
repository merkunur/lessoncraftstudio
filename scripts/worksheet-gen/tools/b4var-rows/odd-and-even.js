'use strict';
/**
 * b4var-rows/odd-and-even.js — the five variation faces of G1-351 `odd-and-even`
 * (design docs/worksheet-gen/b4-designs/G1-351-odd-and-even.md §3; record
 * _work/G1-351-faces.md). Ids are FIXED by _records/b4var-id-allocation.json
 * (F1 / F3 are G2 ids, F4 a G3 id, F2 / F5 G1 ids). Read by
 * tools/gen-b4var-specs.js only.
 *
 * All five are CODE faces on the base's ONE additive `mode` knob
 * (types/g1/G1-351-odd-and-even.js `_buildFace`, dispatched before the base
 * path touches the RNG); the base's own configs carry no `mode`, so the
 * published base deck is byte-identical (tools/b3-baseline.js --check PASS).
 * The base's d2 keys a face ignores (chips 9 / perRow 9 / worked / boxes /
 * splits) ride along in D unread: the proof face reads `dotsPerRow` /
 * `dotPx` / `dotGap`, the picture faces override `perRow` explicitly, and
 * `range` / `split` are re-set on every row.
 *
 *   F1 G2-351  mode:'proof'  8 cards: `n = [a] + [b] + [r]` over n bare dots the child rings two by two (G2, 2.OA.C.3, themeless)
 *   F2 G1-369  mode:'share'  6 lanes: n pictures dealt between two named plates, "each" x2 + "left over" boxes, the parity pill (G1, THEMED)
 *   F3 G2-352  mode:'ones'   the rule strip + 12 numbers 10-99 in tens / ones boxes (the ones box highlighted), tick even / odd (G2, 2.OA.C.3, themeless)
 *   F4 G3-386  mode:'sums'   the parity table + 12 rows `a + b` of three-digit addends (ones digits underlined), tick the sum's parity (G3, 3.OA.D.9, themeless)
 *   F5 G1-370  mode:'count'  6 lanes: 11-18 pictures in rows of 9, the PAIRS box, the parity pill (G1, THEMED)
 *
 * EN title + instruction = the bank's strings.<mode> verbatim
 * (data/b4/odd-and-even.js; the gate asserts the pair is one source). The
 * picture faces carry `themeAxis {applicable:true, minNouns:6, excludeBw:true}`
 * + `assetClass 'icon-placement'` (design §1); the numeral faces inherit the
 * base's themeless axis. `extra.gradeBand` carries the face's band where it
 * differs from the base's G1 (qa/lints.js + emit/manifest.js read it).
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const THEMED = { themeAxis: { applicable: true, minNouns: 6, excludeBw: true }, assetClass: 'icon-placement' };
const ROWS = [
  ['g2', 'G2-351', 'odd-and-even-write-two-equal-addends', 'G1-351-odd-and-even.js', 2,
    { mode: 'proof', range: [3, 20], cards: 8, split: [4, 4], minTwoRow: 2, dotsPerRow: 10, dotPx: 20, dotGap: 9 },
    'Odd or Even? Write Two Equal Addends', 'Circle the dots two by two. Then write the number as two equal parts and write what is left over in the small box.',
    { gradeBand: 'G2' }],
  ['g1', 'G1-369', 'odd-and-even-can-two-friends-share-fairly', 'G1-351-odd-and-even.js', 2,
    { mode: 'share', range: [5, 12], lanes: 6, iconPx: 44, perRow: 6, split: [3, 3], pills: true },
    'Can Two Friends Share Fairly?', 'Share the pictures between the two friends, one each in turn. Write how many each friend gets and how many are left over, then circle odd or even.',
    THEMED],
  ['g2', 'G2-352', 'odd-and-even-under-100-look-at-the-ones-box', 'G1-351-odd-and-even.js', 2,
    { mode: 'ones', range: [10, 99], items: 12, rule: true, onesCover: true, maxOnesRepeat: 2, minEachParity: 4, minHigh: 4, box: 64, digitPx: 34, circle: 60 },
    'Odd and Even Numbers Under 100: Look at the Ones Box', 'Read the rule at the top. Look only at the ones box of each number and tick the circle under even or odd.',
    { gradeBand: 'G2' }],
  ['g3', 'G3-386', 'odd-and-even-sum-decide-without-adding', 'G1-351-odd-and-even.js', 2,
    { mode: 'sums', range: [100, 999], items: 12, terms: 2, table: true, cases: { ee: 3, oo: 3, eo: 3, oe: 3 }, circle: 60, px: 30 },
    'Odd or Even Sum? Decide Without Adding', 'Do not add. Look at the underlined ones digit of each number, use the table, and tick whether the sum is even or odd.',
    { gradeBand: 'G3' }],
  ['g1', 'G1-370', 'odd-and-even-count-the-pictures-in-pairs', 'G1-351-odd-and-even.js', 2,
    { mode: 'count', range: [11, 18], lanes: 6, iconPx: 44, perRow: 9, split: [3, 3], pills: true },
    'Odd or Even? Count the Pictures in Pairs', 'Count the pictures and circle them two by two. Write how many pairs you made, then circle odd or even.',
    THEMED],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
