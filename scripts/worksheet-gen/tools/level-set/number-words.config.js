/** Level Set config — Number Words (G1-210 + G1-223/224/225/226/227), 2026-10-13 (walk #60). PDF + interactive + key.
 *  Themeless: a copy = a seed; copies of a level share at most a third of the numbers they ask (levelSetWords = the
 *  numbers). The small-range faces (to 10, the ten round tens, the teens) cannot avoid repeats — up to two thirds.
 *  Level 2 copy 1 is the published page (wave-nt20 / wave-var-core, June; no level-1/3 pages were ever published).
 *  Screens: circle + match = tap the word (tap-choice); write = the printed page, the child TYPES the word (type-word). */
'use strict';
const FACES = ['G1-210', 'G1-223', 'G1-224', 'G1-225', 'G1-226', 'G1-227'];
const SMALL = new Set(['G1-223', 'G1-224', 'G1-227']);
module.exports = {
  prefix: 'nwd',
  themeless: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.34,
  seeds: 80,
  allowFewer: true,
  note: 'Level Set 2026-10-13: Number Words. Level 1 easier (smaller numbers, wrong words that look nothing like the right one), level 2 the published page, level 3 harder (four words with the look-alike traps: the digit swap 27/72, the teen and its ones word 14/four, the teen twin 40/14; six matching pairs with a swap pair and a teen/-ty pair; look-alike extra words in the bank). Visible to teachers, never indexed; PDF + interactive screen version (tap the word, or TYPE it on the write page) + answer key.',
  faces: Object.fromEntries(FACES.map((id) => [id, SMALL.has(id) ? { levels: [2, 1, 3], shareFrac: 0.67 } : { levels: [2, 1, 3] }])),
  include: () => true,
};
