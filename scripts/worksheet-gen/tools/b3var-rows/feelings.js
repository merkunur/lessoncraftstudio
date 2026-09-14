'use strict';
/**
 * b3var-rows/feelings.js — the five variation faces of K-319 `feelings`
 * (design docs/worksheet-gen/b3-designs/K-319-emotions.md §3, read with the
 * 2026-09-14 key ruling; ids fixed by _records/b3var-id-allocation.json).
 * Read by tools/gen-b3var-specs.js only.
 *
 * Four CODE faces set the base's additive `layout` knob (types/k/K-319-
 * feelings.js `_buildFace`); every row spreads the base's d2 config, so the
 * face keys below are the ONLY difference from the published base deck
 * (tools/gate-variation-distinct.js --batch=b3 --family=feelings). F3 is a
 * makeScienceCategorySort instance, HANDWRITTEN (a factory instance cannot be
 * a row). Every face ships at the K level key in all 11 locales (§1).
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  // F1 — INFER a feeling from a pictured situation (L.K.5.c): 6 cards, 3 faces each, >= 3 distinct
  // answers, none on more than 2 cards; a syringe veto shrinks the page to 5 (the odd grid).
  ['k', 'K-331', 'feelings-how-do-you-feel-circle-the-face', 'K-319-feelings.js', 2,
    { layout: 'scene', cards: 6, choices: 3, minFeelings: 3, maxPerFeeling: 2, objPx: 88, tilePx: 84, facePx: 72 },
    'How Do You Feel? Circle the Face', 'Look at the picture, think how you would feel, and circle the face that matches.'],
  // F2 — OPEN-ENDED: the feeling word over an empty 220 px circle; four feelings a K hand can draw.
  ['k', 'K-332', 'feelings-draw-the-feeling-face', 'K-319-feelings.js', 2,
    { layout: 'draw', cards: 4, pool: ['happy', 'sad', 'angry', 'scared'], wordPx: 30, d: 220 },
    'Draw the Feeling Face', 'Read the feeling word and draw a face that shows it in the empty circle.'],
  // F4 — RECEPTIVE identification, no elimination: one word + three faces per row, near pair kept apart.
  ['k', 'K-334', 'feelings-which-face-shows-the-feeling', 'K-319-feelings.js', 2,
    { layout: 'choice', rows: 6, choices: 3, confusable: false, wordPx: 26, wordW: 220, tilePx: 84, facePx: 72, minRow: 104 },
    'Which Face Shows the Feeling?', 'Read the feeling word and circle the one face in the row that shows it.'],
  // F5 — OPEN-ENDED self-report: six labelled faces, a blank face, two ruling rows with a "because" starter.
  ['k', 'K-335', 'feelings-how-do-i-feel-today', 'K-319-feelings.js', 2,
    { layout: 'checkin', faces: 6, d: 220, rows: 2, facePx: 72 },
    'How Do I Feel Today?', 'Circle the face that shows how you feel today, then draw your own face.'],
];
// F3 — judge VALENCE on the science-sort factory (two word-labelled bins, a one-row strip of 6 faces).
const HANDWRITTEN = [
  { id: 'K-333', dir: 'k', file: 'K-333-feelings-feels-good-or-feels-bad.js', base: 'K-319' },
];
module.exports = { ROWS, HANDWRITTEN };
