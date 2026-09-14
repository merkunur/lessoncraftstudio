'use strict';
/**
 * b3var-rows/days-and-months.js — the five variation faces of K-321 `days-and-months`
 * (design docs/worksheet-gen/b3-designs/K-321-days-and-months.md §3; record
 * _work/K-321-faces.md). Ids are FIXED by _records/b3var-id-allocation.json.
 * Read by tools/gen-b3var-specs.js only.
 *
 * Every row spreads the base's d2 config (unit days · n 7 · cols 1 · given [1] ·
 * strip false · tileW 440 · namePx 26 · boxPx 60) and sets its own keys:
 *   F1 K-337  CODE  layout:'gaps'        the anchored week ladder, 3 gap rungs, a shuffled name bank (K)
 *   F2 G1-319 CODE  layout:'neighbours'  6 given days, write yesterday + tomorrow (mod 7)
 *   F3 G1-320 PARAM unit:'months'        the base numbering act on the 12-month cycle (2 cols; the base build already reads it)
 *   F4 G1-321 PARAM F2's row + unit:'months' + heads:'beforeAfter'   the month before + after (mod 12)
 *   F5 G1-322 CODE  layout:'abbrev'      7 dayAbbr in week order ↔ the 7 names, deranged
 * The four G1 faces carry `extra {gradeBand:'G1'}` (the base is K; the base's own
 * density guard, qa/lints.js and emit/manifest.js read spec.gradeBand — F3's 11
 * written numerals and F2/F4's 12 written names sit in the G1 page rule 6..12).
 * EN title + instruction = the bank's strings[<id>] verbatim (data/b3/days-and-months.js;
 * the gate asserts the pair is one source). No `unitAxis` anywhere: months are
 * faces with landings (design §1), so `unit` is a plain config key — nothing is
 * pinned through `unitOverrides`.
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const F2 = { layout: 'neighbours', unit: 'days', rows: 6, wrap: true, inverse: 0, glyphH: 32 };
const ROWS = [
  ['k', 'K-337', 'days-and-months-missing-days', 'K-321-days-and-months.js', 2,
    { layout: 'gaps', unit: 'days', gaps: 3, adjacentGaps: false, bank: true, namePx: 26, glyphH: 40, rungMin: 72, rungMax: 100 },
    'Missing Days: Write the Week in Order',
    'Some days are already written on the ladder. Copy the missing days from the word bank into the right places.'],
  ['g1', 'G1-319', 'days-and-months-yesterday-today-tomorrow', 'K-321-days-and-months.js', 2,
    { ...F2 },
    'Yesterday, Today, Tomorrow',
    'The day in the middle is today. Write the day that was yesterday and the day that will be tomorrow.',
    { gradeBand: 'G1' }],
  ['g1', 'G1-320', 'days-and-months-months-in-order', 'K-321-days-and-months.js', 2,
    { unit: 'months', n: 12, cols: 2, tileW: 240, boxPx: 52, namePx: 24, given: [1], rowMax: 108 },
    'Months of the Year in Order',
    'January is already marked 1. Number the other months 2 to 12 in the order of the year.',
    { gradeBand: 'G1' }],
  ['g1', 'G1-321', 'days-and-months-month-before-and-after', 'K-321-days-and-months.js', 2,
    { ...F2, unit: 'months', heads: 'beforeAfter' },
    'The Month Before and After',
    'One month is given in the middle. Write the month that comes before it and the month that comes after it.',
    { gradeBand: 'G1' }],
  ['g1', 'G1-322', 'days-and-months-abbreviations', 'K-321-days-and-months.js', 2,
    { layout: 'abbrev', unit: 'days', pairs: 7, namePx: 24, abbrPx: 26, itemH: 78 },
    'Days of the Week: Abbreviations',
    'Read each short form and draw a line to the day it stands for.',
    { gradeBand: 'G1' }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
