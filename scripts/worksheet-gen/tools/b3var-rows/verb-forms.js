'use strict';
/**
 * b3var-rows/verb-forms.js — the five variation faces of G2-317 `verb-forms`
 * (design docs/worksheet-gen/b3-designs/G2-317-verb-forms.md §3; record
 * _work/G2-317-faces.md). Ids are FIXED by _records/b3var-id-allocation.json.
 * Read by tools/gen-b3var-specs.js only.
 *
 * Every row spreads the base's d2 config (the level every b3 wave ships), so
 * the keys below are the ONLY difference from the published base deck
 * (tools/gate-variation-distinct.js --batch=b3 --family=verb-forms). Four CODE
 * faces set an additive knob the base's `_buildWith` dispatches on BEFORE it
 * touches the RNG (types/g2/G2-317-verb-forms.js `_buildMatch` / `_buildSentences`
 * / `_buildChoice` / `_buildHunt`); one PARAM face (F4) re-cuts the base's own
 * table composer over the bank's `irregularCore` (`pool:'irregular'` = one
 * additive pool NAME in `poolFor`; chip-only headers). The EN title +
 * instruction = the bank's strings[F2..F6] verbatim (data/b3/verb-forms.js; the
 * gate asserts one source). All five inherit the base's band per locale (G2;
 * G3 in pt sv fi) and are THEMELESS like their base (themeAxis.applicable:false
 * + the unitAxis inherited). Every stack budgets the base record's MEASURED
 * worst chrome (710 px body — a 3-line title + a 3-line instruction).
 *   F2 G2-334  CODE match     tense: one block, 6 infinitives → 12 forms (past target + present distractor), a derangement
 *                             persons: 2 pictured blocks (pronoun → form) + 2 lanes · stack (nl, < 4 matchPersons): 3 full-width blocks
 *   F3 G2-335  CODE tables:0  6 gap sentences over 6 distinct verbs (>= 4 pictured), the infinitive in a chip, no table
 *   F4 G2-336  PARAM pool     the irregularCore on the base table (tense: 4 rows = be have do go, 6 gaps; persons: 2 tables, 1 given, >= 4 gaps) + 3 lanes
 *   F5 G2-337  CODE choice    8 rows × 3 printed forms of the same paradigm, circle one; the correct index covers every position
 *   F6 G2-338  CODE hunt      8 sentences printed whole, underline the verb, write its base form in a 170×38 box
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  // F2 — RECOGNISE: draw a line to the form. The kind is the BANK's (tense / persons / stack), the row carries all three
  // geometries. tense: left 6 × 106 + 5 × 12 = 696 + 4 = 700 <= 710; right 12 × 46 + 11 × 12 = 684 (space-around).
  // persons: 60 + 6 × 56 + 5 × 12 + 12 + 4 = 472; + 16 + 2 × 96 + 12 = 676. stack: 3 × 224 + 2 × 12 = 696.
  // items [6,16]: the tense page draws 6 lines over 12 candidates (the design's own layout; the base's 8-floor is a table+lanes count).
  ['g2', 'G2-334', 'verb-forms-match-the-past-form', 'G2-317-verb-forms.js', 2,
    {
      match: true, items: [6, 16],
      mTense: { verbs: 6, lanes: 0, pictured: 4, leftW: 250, rightW: 250, leftH: 106, rightH: 46, padY: 0, padX: 30, fontPx: 20, iconPx: 44 },
      mPersons: { verbs: 2, lanes: 2, blockW: 330, headerH: 60, iconPx: 44, itemH: 56, leftW: 110, rightW: 144, padY: 6, padX: 8, fontPx: 18, leftPad: 8 },
      mStack: { minPersons: 4, verbs: 3, lanes: 0, blockW: 675, headerH: 48, iconPx: 36, itemH: 48, leftW: 200, rightW: 300, padY: 2, padX: 30, fontPx: 18, leftPad: 14, gap: 12 },
    },
    'Match the Verb to Its Past Form',
    'Read each verb on the left. Draw a line to its yesterday form on the right — one line for each verb.'],
  // F3 — APPLY: six gap sentences, no table. 6 × 96 + 5 × 12 = 636 <= 710, lanes flex to 132 each under a shorter chrome.
  ['g2', 'G2-335', 'verb-forms-in-sentences', 'G2-317-verb-forms.js', 2,
    { tables: 0, lanes: 6, pictured: 4, hint: true, laneMin: 96, laneMax: 132, items: [6, 16] },
    'Verb Forms in Sentences with Pictures',
    'Look at the picture and read the verb in the chip. Write the form that fits the sentence in the dashed box.'],
  // F4 — the irregular core on the base's own composer: tense 4 rows (be have do go) × 2 = 8 cells, 6 gaps (>= 1/row, >= 3/col)
  // + 3 lanes = 9 items; persons 2 tables (sein/haben), 1 given, >= 4 hard gaps, + 3 lanes. Headers chip-only (no action picture).
  ['g2', 'G2-336', 'verb-forms-helper-verbs', 'G2-317-verb-forms.js', 2,
    { pool: 'irregular', tables: 2, verbsPerPage: 2, given: 1, minHardGaps: 4, tenseRows: 4, tenseGaps: 6, minPerCol: 3 },
    'The Helper Verbs: be, have, do, go',
    'These verbs change a lot. Write the today form and the yesterday form of each one in the dashed boxes.'],
  // F5 — DISCRIMINATE: 8 rows × 3 pills. 8 × 80 + 7 × 8 = 696 <= 710; inner 70 (padding 5) = the sentence line 28 (its INLINE
  // slot box is 26 high — a 38 box lifts the line to 40 and the pills leave the row at the worst chrome, measured) + 4 + pills 36.
  ['g2', 'G2-337', 'verb-forms-choose-the-form', 'G2-317-verb-forms.js', 2,
    { choice: true, rows: 8, candidates: 3, pictured: 3, rowMin: 80, rowMax: 110, rowGap: 8, gapW: 110, gapH: 26, lanePad: '5px 14px', pillPx: 20, pillH: 36, pillPad: 18, hint: false },
    'Choose the Right Verb Form',
    'Read the sentence. Three forms of the verb are printed under it. Circle the one that fits.'],
  // F6 — ANALYSE: the conjugated verb printed inside the sentence, a 170 × 38 box for the infinitive. Inner 68 = 24 + 4 + 38.
  ['g2', 'G2-338', 'verb-forms-find-the-verb', 'G2-317-verb-forms.js', 2,
    { hunt: true, rows: 8, pictured: 4, rowMin: 80, rowMax: 110, rowGap: 8, lanePad: '6px 14px', infBox: { w: 170, h: 38 }, hint: false },
    'Find the Verb, Write Its Base Form',
    'Underline the verb in each sentence. Then write its base form in the dashed box.'],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
