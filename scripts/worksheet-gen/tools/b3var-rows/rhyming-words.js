'use strict';
/**
 * b3var-rows/rhyming-words.js — the five variation faces of G1-309
 * `rhyming-words` (design docs/worksheet-gen/b3-designs/G1-309-rhyming-words.md
 * §3; record _work/G1-309-faces.md; ids FIXED by
 * _records/b3var-id-allocation.json). Read by tools/gen-b3var-specs.js only.
 *
 * All five are CODE faces: every row spreads the base's d2 config and sets the
 * additive `mode` knob (types/g1/G1-309-rhyming-words.js `_buildWith` →
 * `_buildFace`) plus the face's own keys; the base's own d1-d3 carry no `mode`
 * and stay byte-identical (tools/b3-baseline.js). The EN title + instruction
 * = the bank's strings[<id>] verbatim (data/b3/rhyming-words.js; the gate
 * asserts one source). Every face is THEMELESS like its base
 * (themeAxis.applicable:false inherited; pictures are pinned per bank member).
 *
 *   F1 K-352  mode:'judge'   K in all 11 (extra {gradeBand:'K'}) — 8 pair
 *             cards, 4 rhyme / 4 do not; the child circles the tick or the
 *             cross. Recognition only: no writing, nothing joined by a line.
 *   F2 G1-343 mode:'sort'    base band (K level key in sv/da/no; the spec
 *             merges its K shape by locale) — a numbered picture bank of 6 over
 *             three bins headed by a picture; write each word under its rhyme.
 *   F3 G1-344 mode:'couplet' G1 in all 11 — six two-line verses, one blank
 *             each, the answer's picture as the cue. extra {unitAxis:
 *             {applicable:false}}: the pool is the bank's couplet list (>= 8),
 *             not the class set — one coordinate per locale, seed-fanned.
 *   F4 G1-345 mode:'string'  base band — a 12-word bank (8 answers + 4 foils
 *             from classes OFF the page) over 4 pictured anchors, two lanes
 *             each; the child reads the bank and rejects the foils.
 *   F5 G1-346 mode:'open'    G1 in all 11 — six cards, a picture + its PRINTED
 *             word over two rulings; invent two rhymes (open-ended, no
 *             verify() of the content — layout lints only).
 *
 * Units (the base's unitAxis rides through on F1/F2/F4/F5): a unit class must
 * be a rhyming pair (judge) / a bin head (sort, needs 3 writable members) /
 * an anchor (string, 3 writable) / an anchor's class (open); a unit the face
 * cannot carry REFUSES (legal — the enumerator's refusal handling), never a
 * page that ignores its unit.
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  ['k', 'K-352', 'rhyming-words-rhyme-or-not', 'G1-309-rhyming-words.js', 2,
    { mode: 'judge', cards: 8, yes: 4, picPx: 72, chipPx: 56, nearMiss: false, sameSpellingOnly: false, maxLetters: 12 },
    'Rhyme or Not?',
    'Say both pictures out loud. If the two words rhyme, circle the tick. If they do not rhyme, circle the cross.',
    { gradeBand: 'K' }],
  ['g1', 'G1-343', 'rhyming-words-sort-the-rhymes', 'G1-309-rhyming-words.js', 2,
    { mode: 'sort', bins: 3, perBin: 2, bankPx: 64, headTile: 120, headPx: 100, laneW: 190, laneH: 64, glyphH: 28, maxLetters: 8, sameSpellingOnly: true },
    'Sort the Rhymes',
    'Say each picture in the bank. Find the big picture it rhymes with and write its word on a line under that picture.'],
  ['g1', 'G1-344', 'rhyming-words-finish-the-rhyme', 'G1-309-rhyming-words.js', 2,
    { mode: 'couplet', rows: 6, fontPx: 18, picTile: 76, picPx: 64, laneW: 170, laneH: 56, glyphH: 26, cueFree: 0, maxLetters: 7, sameSpellingOnly: true },
    'Finish the Rhyme',
    'Read the two lines out loud. Look at the picture, hear the rhyme and write the missing rhyming word on the line.',
    { unitAxis: { applicable: false } }],
  ['g1', 'G1-345', 'rhyming-words-rhyme-strings', 'G1-309-rhyming-words.js', 2,
    { mode: 'string', anchors: 4, per: 2, foils: 4, wordPx: 18, picTile: 100, picPx: 84, laneW: 250, laneH: 64, glyphH: 28, maxLetters: 10, sameSpellingOnly: true },
    'Rhyme Strings',
    'Say each picture. Find the two words in the bank that rhyme with it and write them on its lines. Some words fit nowhere.'],
  ['g1', 'G1-346', 'rhyming-words-write-your-own-rhymes', 'G1-309-rhyming-words.js', 2,
    { mode: 'open', cards: 6, lines: 2, wordPx: 24, picPx: 64, laneH: 56, glyphH: 26, maxLetters: 12, sameSpellingOnly: true },
    'Write Your Own Rhymes',
    'Read the word beside each picture. Think of two words that rhyme with it and write one on each line.'],
];
const HANDWRITTEN = []; // [{ id, dir, file, base: 'G1-309' }]
module.exports = { ROWS, HANDWRITTEN };
