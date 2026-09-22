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
    // ⚠ KNOWN PARTIAL ANSWER LEAK, left at 10 DELIBERATELY — every escape costs more than it buys.
    // Found by the pt landing panel reading the render: at an even row width `N = pk + r` makes `pk`
    // even, so the last row always carries the pile's parity. MEASURED over [3,20]: 18 of 18.
    // It is PARTIAL, unlike the total leak closed on G1-369 — this face asks for `n = a + a + r`, so
    // the tell hands over the leftover box and the par/ímpar chip but never the equal addends.
    // Every alternative was measured and each breaks a harder contract:
    //   · perRow 9  → a pile of 20 needs 3 dot rows against the face's cap of 2; all 110 builds
    //                 refused. Narrowing to [3,18] to fit gives a WORSE 7 of 16 and weakens the
    //                 standard claim, since 2.OA.C.3 is itself stated "up to 20".
    //   · perRow 11 → 9 of 18 (chance) and fits the card (310 px in 391 px), but `dotRowCard` caps
    //                 perRow at 5..10, so it is outside the component's own measured contract.
    // 10 is therefore the ONLY legal width for a range reaching 20. Closing this needs a design
    // ruling — raise the component cap, or accept a shorter range — not a unilateral change here.
    { mode: 'proof', range: [3, 20], cards: 8, split: [4, 4], minTwoRow: 2, dotsPerRow: 10, dotPx: 20, dotGap: 9 },
    'Odd or Even? Write Two Equal Addends', 'Circle the dots two by two. Then write the number as two equal parts and write what is left over in the small box.',
    { gradeBand: 'G2' }],
  ['g1', 'G1-369', 'odd-and-even-can-two-friends-share-fairly', 'G1-351-odd-and-even.js', 2,
    // ⚠⚠ perRow and range are LOCKED TOGETHER — changing either alone re-opens an answer leak, and
    // the leak must be measured in BOTH DIRECTIONS. A deterministic INVERSION is a rule too.
    // At an EVEN row width the last row's count always has the SAME parity as the pile (N = pk + r
    // with p even makes pk even, so N ≡ r): the original perRow 6 over [5,12] measured 100.0%.
    // Switching to the ODD perRow 5 over [5,10] did NOT close it — it flipped it: 16.7% same,
    // 83.3% OPPOSITE, because every pile in [6,10] fills exactly one row and leaves N-5 below. My
    // first instrument counted only the same-parity direction, read "1 of 6", and called it closed;
    // the Danish landing panel, reading the render, named the inversion out loud.
    // MEASURED over 792 lanes from real builds (11 locales x 12 seeds), worst-direction tell:
    //     perRow 6 [5,12] 100.0%  ·  perRow 5 [5,10] 83.3%  ·  perRow 5 [4,10] 70.6%
    //     perRow 5 [3,10]  64.3%  ·  perRow 5 [3,9]  60.2%  ·  perRow 5 [3,8]  50.0%  <= SHIPPED
    // [3,8] is exactly 50.0% — the coin flip, not a threshold anyone chose. It works because the
    // range STRADDLES the one-row/two-row boundary: 3,4,5 sit on a single row (last row IS the pile,
    // same parity) while 6,7,8 wrap (last = N-5, opposite), and split [3,3] over six values puts
    // three of each on every page. The picture band is 284 px, so perRow 7 (344) does not fit and
    // the type caps this face at 2 rows; 132 of 132 builds succeed at [3,8], 0 refusals.
    // ⚠ The sibling G1-370 CANNOT be fixed this way — see its own note below.
    { mode: 'share', range: [3, 8], lanes: 6, iconPx: 44, perRow: 5, split: [3, 3], pills: true },
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
    // ⚠ KNOWN FULL PARITY TELL, and unlike G1-369 there is NO legal configuration that closes it.
    // MEASURED over 792 lanes: perRow 9 over [11,18] is 0.0% same / 100.0% OPPOSITE — every pile in
    // [11,18] fills exactly one row of 9 and leaves N-9 below, so the short line always inverts.
    // (An earlier note here read "MEASURES 0 of 8" and treated that as clean; 0% in one direction
    // IS 100% in the other. Same error as G1-369's.) Every narrower width was measured and REFUSED
    // by the builder — perRow 4/5/6/7 over [11,18] and over [11,16] / [12,17] / [13,18] all failed
    // 132 of 132 builds, because this face caps at 2 rows and the picture band is 284 px, so
    // 2 x perRow must reach 18 and perRow >= 9 is forced. A width of 10 would merely swap the
    // inversion for the identity at the same 100%. Closing this needs a DESIGN ruling — raise the
    // two-row cap so the pile count straddles a row boundary (the mechanism that gives G1-369 its
    // 50.0%), or let perRow vary per lane — not a unilateral change here.
    // It is PARTIAL in the same sense as G2-351: the page asks for the number of PAIRS as well, and
    // that still needs the full count; the tell hands over only the odd/even chip.
    { mode: 'count', range: [11, 18], lanes: 6, iconPx: 44, perRow: 9, split: [3, 3], pills: true },
    'Odd or Even? Count the Pictures in Pairs', 'Count the pictures and circle them two by two. Write how many pairs you made, then circle odd or even.',
    THEMED],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
