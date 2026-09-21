'use strict';
/**
 * b4var-rows/rounding.js — the five variation faces of G2-346 `rounding`
 * (design docs/worksheet-gen/b4-designs/G2-346-rounding.md §3; record
 * _work/G2-346-faces.md). Ids are FIXED by _records/b4var-id-allocation.json:
 * ALL FIVE are G3 ids (3.NBT.A.1 is a Grade 3 code; the base is the locked G2
 * id with G3 content) and live in types/g3/ with `extra {gradeBand:'G3'}`.
 * Read by tools/gen-b4var-specs.js only.
 *
 * Two kinds of face, one emitter:
 *   F2 / F5 are PARAM faces on the base's `steps` ARRAY ([100] = the base path
 *     one place up; [10, 100] = `_buildBoth`, dispatched before resolveBase
 *     because its quotas are per place);
 *   F1 / F3 / F4 are CODE faces on the additive `mode` knob (`_buildFace`),
 *     stamped `data-lcs-mode` only when set. The base's own configs carry no
 *     `mode` and a one-step array, so the published base deck is byte-identical
 *     (tools/b3-baseline.js --check PASS).
 * Every row spreads the base's d2 and re-sets what its face reads; the base's
 * keys a face ignores (cols / rowH / onesTint …) ride along in D. The family is
 * THEMELESS: `coordinate.theme:''`, `coordinate.mode` = the face string.
 *
 *   F1 G3-387  mode:'sort'      12 numeral chips, two DRAWN arrow bins (9 cells each, split 5..7): write each chip into its bin
 *   F2 G3-388  steps:[100]      the base's write move one place up: 14 lines 101..949, the rule box 472 [glyph] 500
 *   F3 G3-389  mode:'estimate'  8 lines `a + b [glyph] [ ] + [ ] = [ ]`: round both, add the rounded (3.NBT.A.1 + 3.OA.D.8)
 *   F4 G3-390  mode:'inverse'   one target pill `[glyph] 50` over a staggered field of 16 pills: circle every member (6)
 *   F5 G3-391  steps:[10,100]   8 lines with TWO boxes under a header of the place words: the ten, then the hundred
 *
 * Geometry (the nt10-D SPARSE rule, measured — every §3 stack sat under the
 * 631 floor that keeps <= 180 px of slack under the 811 one-line chrome, the
 * base's own 12 x 48 -> 14 x 60 lesson): F1 chips 72 + cells 96 x 76 (stack
 * 640), F3 rows 52 / gap 14 (650), F4 pills 108 x 74 at 30 px with 30 / 42 gaps
 * (642), F5 rows 52 / gap 12 (666); every stack <= 677 (the fi four-line
 * chrome) by the spec's own guard.
 *
 * EN title + instruction = data/b4/rounding.js strings.<face> verbatim (the
 * gate asserts the pair is one source). A title naming a place / target names
 * exactly the shipped d2 config ("Nearest 100" = steps [100]; "10 and 100" =
 * steps [10, 100]; "Round to 50" = target 50) — the gate re-derives it.
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const G3 = { gradeBand: 'G3' };
const ROWS = [
  ['g3', 'G3-387', 'rounding-up-or-down-sort-the-numbers', 'G2-346-rounding.js', 2,
    { mode: 'sort', steps: [10], min: 11, max: 994, items: 12, mix: { 2: 6, 3: 6 }, fiveMin: 2, carryMax: 2, splitMin: 5, splitMax: 7, cells: 9, chip: 72, chipGap: 10, chipRowGap: 12, chipCols: 6, chipPx: 28, cellW: 96, cellH: 76, cellGap: 14, cellCols: 3, binW: 330, pillH: 40, pillPx: 18 },
    'Rounding Up or Down? Sort the Numbers', 'Does each number round up or down to the nearest ten? Write it in the right bin.', G3],
  ['g3', 'G3-388', 'rounding-to-the-nearest-100', 'G2-346-rounding.js', 2,
    { steps: [100], min: 101, max: 949, mix: null, items: 14, cols: 2, fiveMin: 2, upMin: 5, downMin: 5, carryMax: null },
    'Rounding to the Nearest 100', 'Round each number to the nearest hundred and write it in the box. Look at the tens digit.', G3],
  ['g3', 'G3-389', 'round-then-estimate-the-sum', 'G2-346-rounding.js', 2,
    { mode: 'estimate', steps: [10], addMin: 11, addMax: 89, sumMax: 100, roundedSumMax: 100, items: 8, fiveMin: 2, upMin: 5, downMin: 5, digitCover: true, digitMax: 3, rowH: 52, rowGap: 14, exprW: 80 },
    'Round, then Estimate the Sum', 'Round both numbers to the nearest ten and write them in the boxes. Then add the rounded numbers.', G3],
  ['g3', 'G3-390', 'which-numbers-round-to-50', 'G2-346-rounding.js', 2,
    { mode: 'inverse', steps: [10], target: 50, pills: 16, members: 6, range: [30, 69], nearMiss: [44, 55], fiveIn: true, digitCover: true, pillW: 108, pillH: 74, gap: 30, rowGap: 42, stagger: 40, perRow: 4, px: 30, targetH: 60, targetPx: 32, fieldGap: 24 },
    'Which Numbers Round to 50?', 'Circle every number that rounds to the ten shown at the top. Look at the ones digit of each number.', G3],
  ['g3', 'G3-391', 'rounding-to-the-nearest-10-and-100', 'G2-346-rounding.js', 2,
    { steps: [10, 100], min: 101, max: 949, items: 8, cols: 1, fiveMin: { 10: 2, 100: 2 }, upMin: 3, downMin: 3, digitMax: 2, digitDistinct: 7, carryMax: 2, rowH: 52, rowGap: 12 },
    'Rounding to the Nearest 10 and 100', 'Round each number twice: to the nearest ten in the first box and to the nearest hundred in the second.', G3],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
