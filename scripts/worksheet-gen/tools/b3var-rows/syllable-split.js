'use strict';
/**
 * b3var-rows/syllable-split.js — the five variation faces of G1-305
 * `syllable-split` (design docs/worksheet-gen/b3-designs/G1-305-syllable-split.md
 * §3; ids fixed by _records/b3var-id-allocation.json). Read by
 * tools/gen-b3var-specs.js only.
 *
 * All five are CODE faces: each row sets ONE additive knob the base spec's
 * `_buildWith` → `faceOf` reads (`mode:'rewrite'|'cloze'|'scramble'|'sort'`,
 * `kings:true`); the base's own d1-d3 carry none and stay byte-identical
 * (tools/b3-baseline.js). Every row spreads the base's d2 and re-states the
 * whole shape the face needs, so the resolved config differs from the base's
 * d2 on more than the knob (tools/gate-variation-distinct.js --batch=b3
 * --family=syllable-split). Every face ships at G1 in the same band directory
 * as the base (§1: no K face), so no `extra` is needed.
 *
 *   pool:'tex'  — the README texPool ruling: a face that PRINTS a syllable
 *                 boundary (cloze box, scramble tiles, printed arcs) draws only
 *                 TeX-agreed entries; the count-only faces (rewrite, sort) keep
 *                 the full approved pool like the base.
 *   minPool:8   — design §1 minNouns, checked on the FACE pool (never the vocab
 *                 count); a short theme REFUSES, never fills.
 *   Vowel King is REFUSED by the locale bank (`kings:false`) in en and fr — the
 *   row exists so the other nine locales fan it; `render/one.js G1-329 … en`
 *   throws the refusal by design.
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  // Face 2 — copy the printed model onto a hyphen lane, a hyphen at every break (count-only → full pool)
  ['g1', 'G1-325', 'syllable-split-write-the-word-in-syllables', 'G1-305-syllable-split.js', 2,
    { mode: 'rewrite', cards: 6, cols: 1, rows: 6, pic: 64, glyphH: 28, laneH: 64, modelPx: 26, minCount: 2, maxCount: 3, minLongCards: 2, maxLetters: 12, minPool: 8, pool: 'full', dots: false },
    'Write the Word in Syllables',
    'Read the word beside each picture. Copy it on the line and write a small dash between its syllables.'],
  // Face 3 — one syllable is a dashed box exactly 4 cells wide; say the picture, write the missing syllable (texPool)
  ['g1', 'G1-326', 'syllable-split-missing-syllable', 'G1-305-syllable-split.js', 2,
    { mode: 'cloze', cards: 8, cols: 2, rows: 4, pic: 72, cellMax: 28, maxLetters: 10, blankLen: [2, 4], minCount: 2, maxCount: 3, minPool: 8, pool: 'tex', dots: false },
    'Missing Syllable',
    'Say the picture word. One syllable is missing. Write the missing syllable in the box.'],
  // Face 4 — the word's own syllables as shuffled tiles; order them and write the word (texPool, ≥ 2 three-tile rows)
  ['g1', 'G1-327', 'syllable-split-syllable-scramble', 'G1-305-syllable-split.js', 2,
    { mode: 'scramble', cards: 6, cols: 1, rows: 6, pic: 64, tileH: 44, tilePx: 22, glyphH: 28, laneH: 64, minCount: 2, maxCount: 3, min3: 2, maxLetters: 11, minPool: 8, pool: 'tex', dots: false },
    'Syllable Scramble',
    'The syllables of each picture word are mixed up. Read them, put them in order, and write the word on the line.'],
  // Face 5 — an 8-word bank in collation order; write each word split with dashes under 2 or 3 (count-only → full pool)
  ['g1', 'G1-328', 'syllable-split-two-or-three-syllables', 'G1-305-syllable-split.js', 2,
    { mode: 'sort', cards: 8, bank: 8, cols: [2, 3], perCol: 4, wordPx: 18, glyphH: 28, laneH: 64, minCount: 2, maxCount: 3, maxLetters: 10, minPool: 8, pool: 'full', dots: false },
    'Two or Three Syllables? Split and Sort',
    'Clap each word in the bank. Write it with a dash between its syllables in the 2 column or the 3 column.'],
  // Face 6 — arcs PRINTED, a worked example; dot the vowel of every syllable (texPool; REFUSED en + fr by the bank)
  ['g1', 'G1-329', 'syllable-split-vowel-king', 'G1-305-syllable-split.js', 2,
    { kings: true, cards: 6, cols: 2, rows: 3, pic: 72, cellMax: 32, arcH: 32, example: true, minCount: 2, maxCount: 3, maxLetters: 11, minPool: 8, pool: 'tex', dots: false },
    'Vowel King',
    'Every syllable has one vowel. Look at the example, then put a dot on the vowel inside each syllable arc.'],
];
const HANDWRITTEN = []; // [{ id, dir, file, base: 'G1-305' }]
module.exports = { ROWS, HANDWRITTEN };
