/**
 * data/b4/tangram.js — the K-353 `tangram` locale bank.
 *
 * The family is WORDLESS: no noun, no label, no `{slot}`, no picture lives in
 * this bank, and the figures are GLOBAL (data/b4/tangram-figures.js). The only
 * localized text of the type is its titles + instructions, one pair per face,
 * keyed by the face's MODE string (base = the base id): the emitter maps mode
 * → id when the faces land (K-358 compose · G1-354 silhouette · G1-355 missing
 * · G2-347 match · K-359 count, per _records/b4var-id-allocation.json).
 *
 * EN block HAND-AUTHORED (2026-09-21, the base build); the ten non-EN blocks
 * are GENERATED later by tools/apply-b4-locale.js from i18n/.draft-b4-<loc>.json
 * (native panels rebuild the 12 strings under the §4 traps: never "with
 * answers", never the locale's true-size phrase on a d2 string, es "ficha"
 * never beside "tangram", sv never "grupp", no visible free-word). `data/` is
 * gitignored — the reviewer force-adds this module.
 *
 * Shape (design §5):
 *   TANGRAM[loc] = {
 *     strings: { 'K-353': {title, instruction}, compose: …, silhouette: …, missing: …, match: …, count: … }
 *   }
 * Titles <= 70, no worksheet-word (the engine appends it); instructions <= 150;
 * only the base and the silhouette face may name an off-page thing (the
 * child's tangram set is the recorded F2 exception); every page reads without
 * a word on the body.
 */
'use strict';
const TANGRAM = {
  en: {
    strings: {
      'K-353': {
        title: 'Tangram Puzzles: Cut Out the Pieces and Build Two Figures',
        instruction: 'Color each piece like the legend, cut out the seven pieces along the lines, then lay them on the two figures below, line for line.',
      },
      compose: {
        title: 'Easy Tangram Puzzles: Draw the Lines for 2 and 3 Pieces',
        instruction: 'Look at the pieces above each shape. Draw the lines inside the shape to show where those pieces meet.',
      },
      silhouette: {
        title: 'Tangram Puzzles: Four Shadows to Build',
        instruction: 'Build each dark figure with the seven pieces of your tangram. Use all seven pieces every time.',
      },
      missing: {
        title: 'Tangram Puzzles: Which Piece Is Missing?',
        instruction: 'One piece is missing from each figure. Circle the piece that fits the empty space exactly.',
      },
      match: {
        title: 'Tangram Puzzles: Which Solution Matches the Shadow?',
        instruction: 'Look at each shadow. Circle the solution that stands exactly like the shadow. Turned or flipped ones do not match.',
      },
      count: {
        title: 'Tangram Puzzles: Count the Triangles and Squares',
        instruction: 'Count the triangles in each picture and write the number in the first box. Then count the squares for the second box.',
      },
    },
  },
};
module.exports = { TANGRAM };
