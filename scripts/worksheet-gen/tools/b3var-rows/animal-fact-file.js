'use strict';
/**
 * b3var-rows/animal-fact-file.js — the five variation faces of G2-318
 * `animal-fact-file` (design docs/worksheet-gen/b3-designs/G2-318-animal-fact-file.md
 * §3; ids fixed by _records/b3var-id-allocation.json). Read by
 * tools/gen-b3var-specs.js only.
 *
 * All five are CODE faces: each row spreads the base's d2 config (the level
 * every b3 wave ships) and sets ONE additive knob the base's `_buildWith`
 * dispatches on (types/g2/G2-318-animal-fact-file.js — `cell:'chips'` /
 * `bank:true` / `cell:'printed'+frames` / `mode:'compare'` / `mode:'mystery'`),
 * stamped only when declared; the base's own output is byte-identical
 * (tools/b3-baseline.js). Every face refuses an animal that is not 7/7 in
 * data/b3/animal-facts.json (52 of 54; turtle + frog are base-only) and the
 * `blank` unit; the two theme faces (compare / mystery) carry
 * `unitAxis:{applicable:false}` — they fan by THEME, and a unit is a refusal
 * (a unit title would print the answer). Every stack is budgeted to the base
 * record's MEASURED worst chrome (700 px body — a 4-line fi title), not the
 * README's 722; the slack of a shorter chrome opens inside the rows / lanes
 * (minmax + flex), never as a hole above the footer.
 *
 * Titles: the three unit faces keep `{U}` (one title per unit — the base
 * validator's rule); the two theme faces never name an animal.
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  // F2 — RECOGNISE the true fact of three per row: every lane a choiceRow of `choices` chips
  // (legs = numerals, fly = yes|no 2 chips); the ROW carries data-lcs-correct; over the page the
  // correct index takes all three positions. Chips Baloo 16, padding 4 20, h 40 (3 × ≤ 132 + 16 ≤ 495).
  ['g2', 'G2-339', 'animal-fact-file-tick-the-facts', 'G2-318-animal-fact-file.js', 2,
    { cell: 'chips', choices: 3, chipPx: 16, chipH: 40, chipPadX: 20 },
    '{U} Fact File: Circle the True Facts', 'Read the choices in each row and circle the one that is true for this animal. Then draw where it lives and finish the sentence.'],
  // F3 — SELECT + SPELL: the draw-box slot (417 × 156) holds a bank of the 6 truths + 4 distractors
  // from ≥ 2 fields, shuffled (10 words on ≤ 3 rows at 17 px — the gate measures scrollHeight); lanes stay.
  ['g2', 'G2-340', 'animal-fact-file-with-a-word-bank', 'G2-318-animal-fact-file.js', 2,
    { cell: 'write', bank: true, bankExtra: 4, bankPx: 17 },
    '{U} Fact File with a Word Bank', 'Find each true fact in the word bank and copy it into the right row of the fact file. Then finish the sentence at the bottom.'],
  // F4 — COMPOSE from a printed source: hero 200 (pic 180) + banner 60 + a PRINTED 6-row file (128, rows flex);
  // below, one lane of 3 {def}-filled starter frames ("The hedgehog is / has / eats", ≤ 22 chars) + 1 free frame,
  // each frame TWO writing lines 46 × glyphH 28 (a G2 sentence wraps; the design's single 80-px row left ~40 px dead
  // air above the rule band — measured) spaced by the lane's flex: 200 + 12 + (10+22+6+4×96+18+10) = 662 ≤ 700 (no draw box, no fact lane).
  ['g2', 'G2-341', 'animal-fact-file-write-three-sentences', 'G2-318-animal-fact-file.js', 2,
    { cell: 'printed', frames: 3, free: 1, hero: 200, pic: 180, drawH: 0, lane: false, bannerH: 60, miniRowH: 20, frameH: 46, frameGlyphH: 28, frameLines: 2, namePx: 30 },
    '{U} Fact File: Write Three Sentences', 'Read the fact file. Finish the three sentences with facts from it, then write one more fact of your own on the last line.'],
  // F5 — COMPARE two printed files of the wave theme sharing EXACTLY 2 of the 4 printed fields
  // (class · habitat · diet · covering; legs + fly dropped as trivial): two 330-px cards (hero 120 / pic 100,
  // name 44, rows 34) = 332, a 2 × 2 same|different grid (cells 48, gap 8) = 104, a lane of 2 + 2 starter
  // rows 42 × glyphH 24 (min 234, flexes) → 332 + 12 + 104 + 12 + 234 = 694 ≤ 700.
  ['g2', 'G2-342', 'compare-two-animals-same-and-different', 'G2-318-animal-fact-file.js', 2,
    { mode: 'compare', fields: ['class', 'habitat', 'diet', 'covering'], lanes: [2, 2], cardW: 330, miniHero: 120, miniPic: 100, miniBanner: 44, miniRowH: 34, miniLabelW: 120, miniNamePx: 26, sdCellH: 48, cmpRowH: 42, cmpGlyphH: 24 },
    'Compare Two Animals: Same and Different', 'Read both fact files. For each fact, circle same or different. Then write two things that are the same and two that are different.',
    { unitAxis: { applicable: false } }],
  // F6 — INFER the animal from five first-person clues: a one-row picture bank of 6 animals (names ≤ 9 letters,
  // pairwise distinct in ≥ 1 field; 3 targets + 3 extra) + 3 riddle cards [clues 300][name lane 165][draw box 146 × 140],
  // min 180 each (flex): 100 + 12 + 3 × 180 + 24 = 676 ≤ 700. Every card's clues leave EXACTLY its answer.
  ['g2', 'G2-343', 'who-am-i-mystery-animal', 'G2-318-animal-fact-file.js', 2,
    { mode: 'mystery', puzzles: 3, bankSize: 6, cluesPrinted: 5, bankNameMax: 9, bankPx: 15, cluesW: 300, nameLaneW: 165, riddleDrawW: 146, riddleDrawH: 140, cardMin: 180, nameGlyphH: 26 },
    'Who Am I? Mystery Animal', 'Read the five clues on each card. Find the animal in the picture bank, write its name on the line and draw it in the box.',
    { unitAxis: { applicable: false } }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
