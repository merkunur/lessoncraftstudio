'use strict';
/**
 * b3var-rows/read-and-do.js — the five variation faces of G1-308 `read-and-do`
 * (design docs/worksheet-gen/b3-designs/G1-308-read-and-do.md §3; ids fixed by
 * _records/b3var-id-allocation.json). Read by tools/gen-b3var-specs.js only.
 *
 * Every row spreads the base's d2 config (the level every b3 wave ships), so the
 * keys below are the ONLY difference from the published base deck
 * (tools/gate-variation-distinct.js --batch=b3 --family=read-and-do). Two PARAM
 * faces (F1, F3) re-cut the base composer's own knobs; three CODE faces set an
 * additive knob (`steps` / `mode`) the base's `_buildWith` dispatches on
 * (types/g1/G1-308-read-and-do.js `_buildSteps / _buildTruth / _buildDraw`). All
 * five ship at the G1 level key; a locale REFUSES a face at build (throws) when
 * its bank lacks a form or a frame, never pads (design §4 / §7: sv · da · no
 * ship F1 only until `def` is authored; F5 needs no definite form).
 * Every stack is budgeted to the base record's MEASURED worst chrome (710 px
 * body — a 3-line title + a 3-line instruction), not the README's 722.
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  // F1 — the FRAME rung: one verb, the noun phrase alone carries meaning. 6 nouns over 8 tiles
  // ([3,1,1,1,1,1] → 5 unique + 1 all · [2,2,1,1,1,1] → 4 unique + 2 all) = 8 rings over 8 tiles.
  // maxPerPair 6 lifts the base's "(action, cue kind) distinct" rule, under which a one-verb page cannot exist.
  ['g1', 'G1-338', 'read-and-do-read-and-circle', 'G1-308-read-and-do.js', 2,
    { verbs: ['circle'], cues: ['unique', 'all'], minVerbs: 1, maxPerVerb: 6, maxPerCue: 6, maxPerPair: 6, ordMax: 0, nounsMin: 6, nounsMax: 6, maxCount: 3 },
    'Read and Circle', 'Read each sentence. Find the picture or pictures it names in the row and draw a circle around them. Then check the little box.'],
  // F2 — HOLD two actions from one sentence: 4 rows × 2 clauses = 8 items; two different verbs per row,
  // targets disjoint within and across rows. The design's 5 rows (10 clauses over 8 tiles) composed 0/60 under
  // three relaxations (measured, _work/G1-308-faces.md); 4 rows compose 120/120 with maxPerCue 3 (81/120 at the base's 2 —
  // eight steps over seven cue kinds need the third `unique` — and `line` never surfaced).
  // Rows minmax(128) → 146 + 12 + 4×128 + 24 = 694 ≤ 710.
  ['g1', 'G1-339', 'read-and-do-two-step-instructions', 'G1-308-read-and-do.js', 2,
    { steps: 2, rows: 4, rowMin: 128, minVerbs: 4, maxPerCue: 3 },
    'Read and Do: Two-Step Instructions', 'Each sentence tells you two things to do. Read it to the end before you start, then do both steps in the row of pictures.'],
  // F3 — the POSITION cue is the only discriminator (ordinal · first · last · between · right of); tile verbs only
  // (`line` needs the `unique` cue and `write` has no position — either would REFUSE at build).
  ['g1', 'G1-340', 'read-and-do-first-second-between', 'G1-308-read-and-do.js', 2,
    { verbs: ['circle', 'cross', 'underline', 'mark'], minVerbs: 3, cues: ['ordinal', 'first', 'last', 'between', 'rightof'], ordMax: 4, maxPerCue: 2 },
    'Read and Do: First, Second, Between', 'Start at the flag and count along the row. Find the picture by its place, then do what the sentence says with your pencil.'],
  // F4 — VERIFY a declarative against the strip: 3 true / 3 false (false by count or by position, always a noun ON the strip),
  // truth chips (yes | no, 250 px column) replace the done box; statements ≤ 80 chars.
  ['g1', 'G1-341', 'read-and-check-true-or-false', 'G1-308-read-and-do.js', 2,
    { mode: 'truth', rows: 6, cues: ['count', 'first', 'last', 'ordinal'], truePerPage: 3, maxPerCue: 3, maxPerNoun: 2, statementCap: 80, chipsW: 250 },
    'Read and Check: True or False', 'Read each sentence and look at the row of pictures. Is the sentence true or false? Circle the right word.'],
  // F5 — PRODUCE from text: no strip, no picture; 2 × 3 cards of sentence + an empty 300 × ≥140 draw box (flexes taller).
  // n 2..4, not the design's 1..3: every draw frame is PLURAL ({pl} / fi {part}) — n = 1 printed "Draw one small camels" (measured);
  // a singular frame needs an indefinite-singular form per noun the bank does not carry (open item for the panels).
  ['g1', 'G1-342', 'read-and-draw', 'G1-308-read-and-do.js', 2,
    { mode: 'draw', cards: 6, cols: 2, rows: 3, nMin: 2, nMax: 4, drawW: 300, drawH: 140 },
    'Read and Draw', 'Read each sentence carefully. Then draw exactly what it says inside the box.'],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
