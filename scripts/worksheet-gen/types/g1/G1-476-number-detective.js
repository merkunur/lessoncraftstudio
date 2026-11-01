/** G1-476 — Number Detective: who am I? (Logic & Math Puzzles T3 — numbers to 20 / 50 / 100, clues even / odd / between / digit sum, one
 * proven answer; 2026-11-01). The riddle engine and its native frames are the place-value maker's (types/_shared/pv-more.js, G2-405). */
'use strict';
const { makePvMoreType } = require('../_shared/pv-more.js');

module.exports = {
  ...makePvMoreType({
    id: 'G1-476', slug: 'number-detective', mode: 'riddleRange', gradeBand: 'G1',
    i18n: { en: { title: 'Number Detective', instruction: 'Each mystery number is from 1 to {MAX}. Read the clues and write the one number that fits them all.' } },
  }),
  // a logic puzzle, in the Logic & Math Puzzles maker (not the place-value family)
  assetClass: 'visual-logic',
  exerciseType: 'visual-logic',
};
