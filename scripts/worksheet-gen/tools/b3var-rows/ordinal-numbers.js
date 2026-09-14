'use strict';
/**
 * b3var-rows/ordinal-numbers.js — the five variation faces of K-320 `ordinal-numbers`
 * (design docs/worksheet-gen/b3-designs/K-320-ordinal-numbers.md §3; record
 * _work/K-320-faces.md). Ids are FIXED by _records/b3var-id-allocation.json.
 *
 * Every row spreads the base's d2 config and sets ONE knob:
 *   F1 G1-315 CODE  layout:'write'  3 x 8 tiles, 4 given + 4 open numeral cells per strip
 *   F2 G1-316 CODE  layout:'words'  2 x 8 tiles + 5 shuffled ordinal-WORD chips per strip
 *   F3 G1-317 CODE  layout:'where'  3 x 8 tiles + 2 pictured [clone][arrow][box] queries per strip
 *   F4 K-336  PARAM start:'mixed'   the base page; the flag stands at either end (>= 1 of each)
 *   F5 G1-318 CODE  layout:'race'   6 lanes, a runner per lane at a distinct distance from the finish
 *
 * The base's difficulty[2] keys the faces ignore (chips/kMax/actions/...) ride along
 * in D; the face builders read only their own keys. EN title + instruction = the
 * bank's strings.F1..F5 verbatim (data/b3/ordinals.js; the gate asserts the pair
 * is one source). The four G1 faces carry `extra {gradeBand:'G1'}` (the base is
 * K; qa/lints.js + emit/manifest.js read spec.gradeBand) and F5 declares
 * `themeAxis.only` = the racer list (informational for the wave author — the
 * enumerator has no allowlist; the build is the refusal). F5's theme MUST be one of the bank's `racers` — a wave that
 * fans it over fruits/toys is refused at build; `themeOverrides['G1-318']` pins one.
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  ['g1', 'G1-315', 'ordinal-numbers-write', 'K-320-ordinal-numbers.js', 2,
    { layout: 'write', strips: 3, n: 8, tile: 76, pic: 60, gap: 5, given: 4, blank: 4, start: 'left', flagScale: 1.5 },
    'Write the Missing Ordinal Numbers',
    'Some places are already written. Write the missing ordinal numbers in the empty boxes, counting from the flag.',
    { gradeBand: 'G1' }],
  ['g1', 'G1-316', 'ordinal-numbers-words', 'K-320-ordinal-numbers.js', 2,
    { layout: 'words', strips: 2, n: 8, tile: 76, pic: 60, gap: 5, words: 5, start: 'left', flagScale: 1.5 },
    'Ordinal Words: Draw a Line to the Picture',
    'Read each ordinal word and draw a line to the picture standing in that place, counting from the flag.',
    { gradeBand: 'G1' }],
  ['g1', 'G1-317', 'ordinal-numbers-which-place', 'K-320-ordinal-numbers.js', 2,
    { layout: 'where', strips: 3, n: 8, tile: 76, pic: 64, gap: 5, queries: 2, clone: 56, start: 'left', flagScale: 1.5 },
    'Which Place? Write the Ordinal Number',
    'Find each small picture in its line and write which place it stands in, counting from the flag.',
    { gradeBand: 'G1' }],
  ['k', 'K-336', 'ordinal-numbers-either-end', 'K-320-ordinal-numbers.js', 2,
    { start: 'mixed' },
    'Ordinal Numbers from Either End: Start at the Flag',
    'Look for the flag first: it can stand at either end. Start there, count to the number of each chip and make the mark it shows.'],
  ['g1', 'G1-318', 'ordinal-numbers-race', 'K-320-ordinal-numbers.js', 2,
    { layout: 'race', lanes: 6, sep: 44, pic: 64, rowH: 96, laneW: 543, step: 88, jitter: 12, x0: 26 },
    'Who Wins the Race? Write the Place',
    'Look how close each runner is to the finish line. The nearest is 1st. Write 1st, 2nd, 3rd, 4th, 5th and 6th.',
    { gradeBand: 'G1', themeAxis: { applicable: true, minNouns: 10, excludeBw: true, only: ['animals', 'zoo animals', 'farm animals', 'pets', 'vehicles', 'dinosaurs', 'birds 2', 'forest creatures'] } }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
