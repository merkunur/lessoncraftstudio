/**
 * b5var-rows/word-parts.js — the five G2-359 `word-parts` faces (nt10-E Phase E; design
 * docs/worksheet-gen/b5-designs/G2-359-word-parts.md §3; record _work/G2-359-faces.md).
 *
 * All five are CODE faces on the base's ONE additive knob `mode`
 * (types/g2/G2-359-prefixes-suffixes-and-root-words.js): the base config says mode 'base' and
 * composes byte-identically (tools/b3-baseline.js --check); a face config carries its own keys and
 * every guard keys on them (buildFace need() THROWS on a missing one, never reads the base keys that
 * ride along inert from the row spread).
 *
 * F1 is G1 (G1-397, types/g1/, extra gradeBand G1: bricks 44, picture 72, text 20); F2 F3 stay G2
 * (G2-375 G2-376); F4 F5 are G3 (G3-398 G3-399, types/g3/). Refusals (the spec throws):
 * who-does-it es / fr, prefix-key fi.
 * Titles + instructions === data/b5/word-parts.js WORD_PARTS.en.strings[mode] (the gate asserts it).
 */
'use strict';
const BASE = 'G2-359-prefixes-suffixes-and-root-words.js';
const S = require('../../data/b5/word-parts.js').WORD_PARTS.en.strings;
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra
const ROWS = [
  ['g1', 'G1-397', 'root-words-with-pictures', BASE, 2,
    { mode: 'picture-family', cards: 6, bricks: 3, foils: 2, picPx: 72, brickH: 44, px: 20, cols: 3, rows: 2, stoneMinH: 88, picMax: 150 },
    S['picture-family'].title, S['picture-family'].instruction, { gradeBand: 'G1' }],
  ['g2', 'G2-375', 'find-the-root-word', BASE, 2,
    { mode: 'root-word', cards: 9, worked: 1, members: 3, memberPx: 18, stoneGlyphH: 24, cols: 3, rows: 3, brickH: 36, stoneH: 44 },
    S['root-word'].title, S['root-word'].instruction, { gradeBand: 'G2' }],
  ['g2', 'G2-376', 'prefixes-re-pre-mis', BASE, 2,
    { mode: 'prefix-key', keySize: 3, rows: 8, eachPrefixUsed: 2, rowH: 60, rowGap: 6, keyPx: 24, glossPx: 17, basePx: 20, socketH: 44, glyphH: 24 },
    S['prefix-key'].title, S['prefix-key'].instruction, { gradeBand: 'G2' }],
  ['g3', 'G3-398', 'who-does-it-person-words', BASE, 2,
    { mode: 'who-does-it', cards: 8, cols: 2, rows: 4, picPx: 96, basePx: 18, brickH: 36, socketW: 200, socketH: 52, glyphH: 26 },
    S['who-does-it'].title, S['who-does-it'].instruction, { gradeBand: 'G3' }],
  ['g3', 'G3-399', 'root-words-in-sentences', BASE, 2,
    { mode: 'family-in-sentence', blocks: 2, perBlock: 4, coursePx: 18, brickH: 40, stoneH: 36, stonePx: 22, sentPx: 18, rowH: 48, gapH: 40, glyphH: 24 },
    S['family-in-sentence'].title, S['family-in-sentence'].instruction, { gradeBand: 'G3' }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
