'use strict';
/**
 * b4var-rows/weather-symbols.js — the five variation faces of K-356
 * `weather-symbols` (design docs/worksheet-gen/b4-designs/K-356-weather.md §3;
 * the family KEY is `weather-symbols`, the THEME axis owns `weather`; record
 * _work/K-356-faces.md). Ids are FIXED by _records/b4var-id-allocation.json.
 * Read by tools/gen-b4var-specs.js only.
 *
 * All five are CODE faces: every row spreads the base's d2 config and sets the
 * base's additive `layout` knob (types/k/K-356-weather-symbols.js `_buildFace`);
 * the base's own configs carry no `layout`, so the published base deck is
 * byte-identical (tools/b3-baseline.js --check PASS). The base's d2 keys a face
 * ignores (pairs / keys / distractors / tileH / wordPx …) ride along in D; each
 * face reads only its own keys (`badge` / `iconPx` are shared names the F1 row
 * re-sets to the spell-row size and the F3 row to the chip icon). The theme is
 * FIXED (`withFixedTheme(type, 'weather')`): `coordinate.theme:''`,
 * `coordinate.mode` = the layout string.
 *
 *   F1 G1-362  layout:'write'        a word bank + six spell rows (letter boxes per hyphen group): write the word (G1)
 *   F2 K-364   layout:'diary'        seven day cells + the symbol key: draw the day's weather all week (K, open-ended)
 *   F3 K-365   layout:'thermometer'  a band key + four band thermometers: ring the gear chip for cold / warm / hot (K)
 *   F4 G3-385  layout:'water-cycle'  the line diagram, markers 1-4 in cycle order, four numbered lanes: label it (G3)
 *   F5 G1-363  layout:'forecast'     a Mon-Fri symbol strip + three questions with day chips: ring the day (G1)
 *
 * EN title + instruction = the bank's strings['G1-362'..] verbatim
 * (data/b4/weather-symbols.js; the gate asserts the pair is one source). The
 * titles are the design's §3 face titles (a title that LISTS options lists
 * exactly the shipped d2 config: F3's three band words = d.bands, F2's
 * Monday..Sunday = the diary's first and last day at start:'mon'; both are
 * asserted by the gate against the config). F1 / F5 carry `extra
 * {gradeBand:'G1'}` and F4 `{gradeBand:'G3'}` (the base is K; qa/lints.js +
 * emit/manifest.js read spec.gradeBand).
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  ['g1', 'G1-362', 'weather-symbols-write-the-weather-word', 'K-356-weather-symbols.js', 2,
    { layout: 'write', rows: 6, bank: true, box: 44, boxMax: 60, gap: 4, maxLetters: 11, hyphenGiven: true, badge: 72, iconPx: 56 },
    'Write the Weather Word', 'Find each weather symbol\'s word in the bank and write it, one letter in each box.',
    { gradeBand: 'G1' }],
  ['k', 'K-364', 'weather-symbols-weather-chart-monday-to-sunday', 'K-356-weather-symbols.js', 2,
    { layout: 'diary', days: 7, start: 'mon', box: 'rect', legend: 6, legendPx: 56 },
    'Weather Chart, Monday to Sunday', 'Every day this week, look outside and draw the weather symbol for that day in its box.'],
  ['k', 'K-365', 'weather-symbols-how-warm-is-it', 'K-356-weather-symbols.js', 2,
    { layout: 'thermometer', items: 4, cols: 2, rows: 2, bands: ['cold', 'warm', 'hot'], chips: ['scarf', 't-shirt', 'sunglasses'], thermH: 220, keyH: 120, chip: 64, iconPx: 56, min: -10, max: 40, step: 5, edges: [10, 25] },
    'How Warm Is It? Cold, Warm or Hot', 'Look at each thermometer, use the key to see if it is cold, warm or hot, and circle the picture that fits.'],
  ['g3', 'G3-385', 'weather-symbols-water-cycle-label-the-diagram', 'K-356-weather-symbols.js', 2,
    { layout: 'water-cycle', stages: 4, given: 0, bank: true, w: 675, laneW: 270, laneH: 52, glyphH: 26 },
    'The Water Cycle: Label the Diagram', 'Read the four words in the bank and write each one on the line that has the same number as on the diagram.',
    { gradeBand: 'G3' }],
  ['g1', 'G1-363', 'weather-symbols-read-the-weekly-forecast', 'K-356-weather-symbols.js', 2,
    { layout: 'forecast', days: 5, asks: 3, askBy: 'word', symbolPx: 88, chipH: 44, chipMax: 64, distinctStrip: true },
    'Read the Weekly Forecast', 'Look at the weather for the week, read each question and circle the right day.',
    { gradeBand: 'G1' }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
