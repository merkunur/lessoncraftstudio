'use strict';
/**
 * b3var-rows/syllable-reading.js — the five variation faces of G1-306
 * `syllable-reading` (design docs/worksheet-gen/b3-designs/G1-306-syllable-reading.md
 * §3; ids fixed by _records/b3var-id-allocation.json). Read by
 * tools/gen-b3var-specs.js only.
 *
 * Four CODE faces set an additive knob the base spec reads
 * (types/g1/G1-306-syllable-reading.js `faceOf(d)`): choices / join /
 * colourMode / mode:'syllabified'. Every row spreads the base's d2 config (the
 * level every b3 wave ships), so the keys below are the ONLY difference from
 * the published base deck (tools/gate-variation-distinct.js --batch=b3
 * --family=syllable-reading). G1-333 Complex is `{...d2, structure:'complex'}`
 * — PARAM in mechanism (the base's build() branched on `d.structure` from day
 * one) — but HANDWRITTEN as a file: its unit fan runs over the bank's
 * `complexUnits` (en: blend ladders l1-l4), so it needs its OWN `unitAxis`
 * (units / exemplar / tokens are function values a row cannot carry — the
 * K-317 → G1-311 precedent).
 *
 * Join + Syllabified carry `extra { unitAxis: { applicable: false } }`: they
 * draw from the whole `bank.multi` pool, not from a carpet unit (design §3:
 * "Fan: seed only"), so a wave's unitsPerType must not fan them.
 *
 * EN shape is R (rime families): the Circle pills and the Carpet cells are
 * WORDS (onset ink + rime coral), so the EN titles say "Word Families", never
 * "syllable" — the S / B locales' panels head them per §1.
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  // F2 — recognition before production: picture + 3 stacked pills (the own cell + 2 cells of its row); circle one. No lane.
  ['g1', 'G1-330', 'syllable-reading-read-and-circle', 'G1-306-syllable-reading.js', 2,
    { choices: 3, pic: 72, pillH: 44, pillFont: 26, pillGap: 6 },
    'Word Families: Read and Circle',
    'Read the words on the carpet out loud. Say each picture word, then circle the one word under the picture that names it.'],
  // F3 — two ORDERED syllables printed as tiles; read, say together, write the word joined. No carpet.
  ['g1', 'G1-331', 'syllable-reading-join-the-syllables', 'G1-306-syllable-reading.js', 2,
    { carpetRows: 0, cards: 6, cols: 2, rows: 3, pic: 72, join: true, tileH: 44, tileFont: 26, laneW: 290, laneH: 60, glyphH: 28, minCount: 2, maxCount: 2, poolMin: 8 },
    'Join the Syllables and Write the Word',
    'Read the two syllables on each card in order. Say them together, then write the whole word on the line.',
    { unitAxis: { applicable: false } }],
  // F4 — fluency read of a 5-row carpet, then color each picture's cell in its ring color. No lane; perRowMin 1 (5 rows × 1 ≤ 6 cards, targets from ≥ 3 rows).
  ['g1', 'G1-332', 'syllable-reading-carpet-read-and-colour', 'G1-306-syllable-reading.js', 2,
    { carpetRows: 5, cell: 56, cellFont: 28, pic: 96, colourMode: true, reps: 1, perRowMin: 1 },
    'Word Family Carpet: Read and Color',
    'Read every word on the carpet out loud. Then find each picture\'s word on the carpet and color that word in the picture\'s color.'],
  // F6 — longer words printed PRE-SPLIT over a numbered picture bank (6 targets + 2 distractors); write the picture's number.
  ['g1', 'G1-334', 'syllable-reading-read-the-syllabified-words', 'G1-306-syllable-reading.js', 2,
    { mode: 'syllabified', lines: 6, distractors: 2, bankPic: 64, wordFont: 30, rowH: 92, boxPx: 44, minCount: 2, maxCount: 3, maxLetters: 10, minThree: 1, poolMin: 8 },
    'Read the Syllables, Find the Picture',
    'Read each word syllable by syllable. Find its picture in the bank at the top and write the picture\'s number in the box.',
    { unitAxis: { applicable: false } }],
];
// F5 — the base act over the bank's complexUnits (en: blend ladders); its own unitAxis.
const HANDWRITTEN = [
  { id: 'G1-333', dir: 'g1', file: 'G1-333-syllable-reading-with-blends.js', base: 'G1-306' },
];
module.exports = { ROWS, HANDWRITTEN };
