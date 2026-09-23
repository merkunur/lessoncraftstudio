'use strict';
/**
 * b5var-rows/digraphs.js — the five G1-380 `digraphs` faces (nt10-E Phase E; design
 * docs/worksheet-gen/b5-designs/G1-380-digraphs.md §3; record _work/G1-380-faces.md).
 *
 * All five are CODE faces on the base's ONE additive knob `mode` (types/g1/G1-380-digraphs.js
 * FACE_BUILD / faceVerifyInPage); `mode:'base'` stays the base path byte-for-byte
 * (tools/b3-baseline.js --check). The emitter spreads base.difficulty[2] under each override, so
 * the base's keys ride along inert; every face guard keys on the face's own keys.
 * F1 is a K face (K-378, types/k/, gradeBand K: K floors 56 / 30); F5 a G2 face (G2-372, types/g2/).
 * Titles + instructions === data/b5/digraphs.js DIGRAPHS.en.strings[mode] (the family gate asserts it).
 * Refusals: es it sv da no (whole family) + pt F4 (DIGRAPHS_NEUTRAL.FACE_REFUSALS) THROW in build().
 */
const BASE = 'G1-380-digraphs.js';
const S = require('../../data/b5/digraphs.js').DIGRAPHS.en.strings;
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra
const ROWS = [
  ['k', 'K-378', 'digraphs-sort-by-letter-team', BASE, 2,
    { mode: 'sort-two', set: 'k', pictures: 6, bins: 2, split: [3, 3], maxRun: 2, iconPx: 72, iconMax: 104, cardW: 120, cardMinH: 88, rowGap: 12,
      houseW: 190, gutter: 66, houseBead: { w: 150, h: 90, fontPx: 56 } },
    S['sort-two'].title, S['sort-two'].instruction, { gradeBand: 'K' }],
  ['g1', 'G1-392', 'digraphs-write-the-missing-letter-team', BASE, 2,
    { mode: 'gap', set: 'exemplar', rows: 8, bankTeams: 3, perTeam: [2, 3], maxRun: 2, beadW2: 96, beadW3: 116, beadH: 50, wordPx: 32, maxLetters: 12,
      gapInitialCapital: false, capPx: 72, iconPx: 62, rowMin: 72, numW: 22, capGap: 28, laneW: 560, bankBead: { w: 90, h: 52, fontPx: 32 }, bankWireW: 360, bankGap: 12 },
    S.gap.title, S.gap.instruction, { gradeBand: 'G1' }],
  ['g1', 'G1-393', 'digraphs-read-and-match', BASE, 2,
    { mode: 'match', set: 'exemplar', pairs: 6, teams: 3, perPair: 2, maxRun: 2, wordPx: 32, beadH: 42, iconPx: 80, iconMax: 104, itemW: 250, picW: 120, itemMinH: 92,
      maxLetters: 10, wordMaxW: 226 },
    S.match.title, S.match.instruction, { gradeBand: 'G1' }],
  ['g1', 'G1-394', 'digraphs-where-is-the-letter-team', BASE, 2,
    { mode: 'position', set: 'position', cards: 8, cols: 2, posSplit: [2, 3], teamSplit: [2, 3], maxRun: 2, iconPx: 92, cardW: 313, colGap: 13, rowGap: 12, cardMinH: 150,
      colW: 185, teamBead: { w: 70, h: 40, fontPx: 26 }, socket: { w: 56, h: 44 }, sockGap: 8, cue: { h: 22, gap: 6, stroke: 4, dotR: 9, head: 18 } },
    S.position.title, S.position.instruction, { gradeBand: 'G1' }],
  ['g2', 'G2-372', 'digraphs-in-sentences', BASE, 2,
    { mode: 'text', set: 'exemplar', targetIdx: 0, sentences: 4, hitsPerSentence: [1, 4], total: [7, 11], textPx: 26, textMax: 32, textCqh: 4.7, lineH: 52, maxLines: 2,
      headBead: { w: 104, h: 58, fontPx: 36 }, headGap: 16, laneGap: 16, box: { w: 56, h: 52 } },
    S.text.title, S.text.instruction, { gradeBand: 'G2' }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
