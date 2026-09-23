/**
 * b5var-rows/synonyms.js — the five G2-358 `synonyms` faces (nt10-E Phase E; design
 * docs/worksheet-gen/b5-designs/G2-358-synonyms.md §3; record _work/G2-358-faces.md).
 *
 * All five are CODE faces on the base's ONE additive knob `mode` (types/g2/G2-358-synonyms.js):
 * `mode:'base'` is the base path (byte-identical, tools/b3-baseline.js --check); a face config is
 * read ONLY by the face spec that owns its mode (data/b5/synonyms.js FACES), every guard keys on
 * the face's own keys. The emitter spreads base.difficulty[2] under each override, so the base's
 * keys ride along inert.
 *
 * Bands (allocation): F1 pictures + F3 shades are G1 (extra gradeBand), F2 pairs + F4 say stay
 * G2, F5 fields is G3. Titles + instructions === the bank's SYNONYMS.en.strings[mode] (the gate
 * asserts it). F2 is NOT the sock face: the sock was retired 2026-09-23 (lead ruling), F2 uses
 * design A's half-ring tags and no string mentions socks.
 */
'use strict';
const BASE = 'G2-358-synonyms.js';
const ROWS = [
  ['g1', 'G1-395', 'synonyms-with-pictures', BASE, 2,
    { mode: 'pictures', cards: 6, rows: 3, chips: 4, answers: 2, grid: '2x2', picPx: 74, picMaxW: 220, frameH: 80, chipPx: 19, chipH: 44, maxGlyphs: 11, maxConcept: 2, rowMin: 214, rowGap: 10 },
    'Synonyms with Pictures: Two Words, One Picture', 'Look at each picture and circle the two words under it that mean the same and tell about the picture.', { gradeBand: 'G1' }],
  ['g2', 'G2-373', 'synonym-pairs', BASE, 2,
    { mode: 'pairs', pairs: 8, tagW: 210, tagH: 64, wordPx: 20, maxGlyphs: 14, tiers: [1, 2], posMix: [5, 3], sameDomainMax: 2 },
    'Synonym Pairs: Match the Words That Mean the Same', 'Draw a line to link each word on the left with the word on the right that means the same.'],
  ['g1', 'G1-396', 'shades-of-meaning', BASE, 2,
    { mode: 'shades', rows: 6, perRow: 3, box: [42, 30], chipPx: 20, chipH: 44, maxGlyphs: 12 },
    'Shades of Meaning: From a Little to a Lot', 'Read the three words in each row and write 1, 2 and 3 in the boxes, from the weakest word to the strongest.', { gradeBand: 'G1' }],
  ['g2', 'G2-374', 'synonyms-for-said', BASE, 2,
    { mode: 'say', rows: 6, bank: 6, fontPx: 18, bankPx: 18, maxGlyphs: 12 },
    'Synonyms for Said: Pick the Word That Fits', 'Read each sentence and write the word from the bubble that fits best in the box instead of said.'],
  ['g3', 'G3-397', 'word-fields-go-and-look', BASE, 2,
    { mode: 'fields', words: 10, fields: ['go', 'look'], split: [4, 6], plotRows: 6, rowH: 62, glyphH: 34, pileRowsMax: 3, wordPx: 18, maxGlyphs: 12 },
    'Word Fields: Words for Go and Look', 'Write each word in the field it belongs to.', { gradeBand: 'G3' }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
