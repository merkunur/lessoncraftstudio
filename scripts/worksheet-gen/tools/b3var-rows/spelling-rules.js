'use strict';
/**
 * b3var-rows/spelling-rules.js — the five variation faces of G2-315 `spelling-rules`
 * (design docs/worksheet-gen/b3-designs/G2-315-spelling-rules.md §3; record
 * _work/G2-315-faces.md). Ids are FIXED by _records/b3var-id-allocation.json.
 * Read by tools/gen-b3var-specs.js only.
 *
 * All five are CODE faces: an additive knob in the resolved config that
 * types/g2/G2-315-spelling-rules.js `_buildWith` dispatches on (`choice` /
 * `detective` / `bins` / `anchor` / `form:{of:'plural'}`); the base's three
 * configs carry none, so the base path is byte-identical (tools/b3-baseline.js).
 * Every face is THEMELESS like its base and fans by RULE (`unitAxis`).
 *
 * Two faces are ROWS (they share the base's exemplar, en magic e):
 *   F3 G2-325 CODE detective:{foils:0}   — the whole word printed, circle + copy the rule letters
 *   F5 G2-327 CODE anchor:{at:'rule'}    — only the rule letters printed (coral), every other cell a box
 * Three faces are HANDWRITTEN because their EXEMPLAR differs from the base's: en
 * magic e is a split rule with no letter pair (`pair:null`) and no plural form, so
 * `Which One?` / `Sort` resolve to the first pair rule (c-k-ck) and `Plural` to the
 * `gap.kind:'plural'` rule (y-ies-f-ves) via `base.unitAxisFor(face)` — a
 * function-valued `unitAxis` a row cannot carry (_FACE-BRIEF "HANDWRITTEN"):
 *   F2 G2-324 CODE choice:{sides:[4,4],…}  types/g2/G2-324-spelling-rules-which-one.js
 *   F4 G2-326 CODE bins:{n:2,items:8,…}    types/g2/G2-326-spelling-rules-sort-by-rule.js
 *   F6 G2-328 CODE form:{of:'plural',…}    types/g2/G2-328-spelling-rules-plural-spelling.js
 * EN title + instruction = data/b3/spelling-rules.js strings[<id>] verbatim (the
 * gate asserts one source); `{UNIT}` = rule.head (rule.pairHead on the pair faces).
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  ['g2', 'G2-325', 'spelling-rules-rule-detective', 'G2-315-spelling-rules.js', 2,
    { detective: { foils: 0 }, maxLetters: 9, pic: 72 },
    'Rule Detective: {UNIT}',
    'Read each word. Find the rule letters, circle them in the word, then copy them into the small box.'],
  ['g2', 'G2-327', 'spelling-rules-write-the-whole-word', 'G2-315-spelling-rules.js', 2,
    { anchor: { at: 'rule' }, maxLetters: 8, cellMax: 36, pic: 80 },
    'Write the Word: {UNIT}',
    'The rule letters are printed in orange. Say the picture word and write all the other letters in the boxes.'],
];
const HANDWRITTEN = [
  { id: 'G2-324', dir: 'g2', file: 'G2-324-spelling-rules-which-one.js', base: 'G2-315' },
  { id: 'G2-326', dir: 'g2', file: 'G2-326-spelling-rules-sort-by-rule.js', base: 'G2-315' },
  { id: 'G2-328', dir: 'g2', file: 'G2-328-spelling-rules-plural-spelling.js', base: 'G2-315' },
];
module.exports = { ROWS, HANDWRITTEN };
