'use strict';
/**
 * b3var-rows/opposites.js — the five variation faces of G1-307 `opposites`
 * (design docs/worksheet-gen/b3-designs/G1-307-opposites.md §3; record
 * _work/G1-307-faces.md). Ids are FIXED by _records/b3var-id-allocation.json.
 * Read by tools/gen-b3var-specs.js only.
 *
 * All five are CODE faces: every row spreads the base's d2 config and sets the
 * additive `layout` knob (types/g1/G1-307-opposites.js `_buildFace`) plus the
 * face's own keys; the base's keys the face ignores ride along in D. The EN
 * title + instruction = the bank's strings[<id>] verbatim (data/b3/opposites.js;
 * the gate asserts one source). Two faces leave the G1 band and carry `extra
 * {gradeBand}` (qa/lints.js + emit/manifest.js read spec.gradeBand):
 *   F1 K-351  CODE layout:'match'   K  — two worded picture columns, a line per pair
 *   F2 G1-335 CODE layout:'frames'  G1 — a negated frame per lane, the answer on an inline writing row
 *   F3 G1-336 CODE layout:'pairup'  G1 — 12 mixed chips, 6 numbered lanes of two writing rows
 *   F4 G1-337 CODE layout:'choice'  G1 — target over antonym / near-synonym / far word, circle one
 *   F5 G2-320 CODE layout:'prefix'  G2 — a prefix legend + 8 lanes [base][arrow][writing row]
 * Every face is THEMELESS like its base (themeAxis.applicable:false inherited).
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  ['k', 'K-351', 'opposites-with-pictures-match', 'G1-307-opposites.js', 2,
    { layout: 'match', pairs: 6, tiers: [1, 2], wordPx: 26, picPx: 80, scalePx: 56, tileW: 250, itemH: 114, maxScale: 1, maxLetters: 9 },
    'Opposites with Pictures: Match the Opposites',
    'Draw a line from each picture to the picture and word that show its opposite.',
    { gradeBand: 'K' }],
  ['g1', 'G1-335', 'opposites-in-a-sentence', 'G1-307-opposites.js', 2,
    { layout: 'frames', rows: 6, bank: true, glyphH: 28, laneH: 56, laneW: 200, laneMax: 300, fontPx: 19, picPx: 64, textW: 563, maxLine: 45, gap: 4 },
    'Opposites in a Sentence',
    'Read each sentence. Write the opposite of the word after "not" on the line. The word bank helps you.'],
  ['g1', 'G1-336', 'opposites-pair-up', 'G1-307-opposites.js', 2,
    { layout: 'pairup', pairs: 6, tiers: [1, 2], fontPx: 20, tileH: 44, maxLetters: 12, laneW: 260, laneH: 64, glyphH: 28 },
    'Pair Up the Opposites',
    'Find the two words that are opposites. Write each pair on a line, one word on each side of the arrow.'],
  ['g1', 'G1-337', 'opposites-opposite-or-the-same', 'G1-307-opposites.js', 2,
    { layout: 'choice', rows: 6, chips: 3, synonym: true, pillPx: 22, targetPx: 26, maxLetters: 11, tiers: [1, 2] },
    'Opposite or the Same? Circle the Opposite',
    'Read the word. One of the three words under it means the opposite. Circle it, not the one that means the same.'],
  ['g2', 'G2-320', 'antonyms-with-a-prefix', 'G1-307-opposites.js', 2,
    { layout: 'prefix', rows: 8, glyphH: 26, laneH: 56, laneW: 300, wordPx: 24, colW: 220, showLegend: true, legendPx: 22, maxLetters: 14 },
    'Antonyms with un-, dis-, in-',
    'Add the prefix to each word and write the new opposite word on the line.',
    { gradeBand: 'G2' }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
