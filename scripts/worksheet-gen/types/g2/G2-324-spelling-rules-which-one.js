/**
 * G2-324 — Which One? {UNIT}. nt20-C variation of G2-315 (HANDWRITTEN — listed in
 * tools/b3var-rows/spelling-rules.js HANDWRITTEN; not emitted by gen-b3var-specs.js).
 *
 * Face 2 `choice` (design §3): half the cards are the CONTRAST side of the rule's
 * letter pair; two letterChips under every word in ONE fixed order; every gap box
 * max(pair lengths) cells wide; the child circles the right chip and writes it.
 * Handwritten because its EXEMPLAR differs from the base's: the en exemplar magic e
 * has no letter pair (a split rule, `pair:null`), so this face's unit axis resolves
 * the first rule in bank order that carries the face (en: c-k-ck, pair c|k) and
 * `{UNIT}` = `rule.pairHead` ("c or k") — a function-valued `unitAxis` a row cannot
 * carry. A wave's unitsPerType / unitOverrides fan the pair rules only.
 */
'use strict';
const base = require('./G2-315-spelling-rules.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for.
const D = { ...base.difficulty[2], choice: { sides: [4, 4], minSide: 6, rowMax: 246, pic: 48, chipPx: 40, proof: false }, maxLetters: 10, cellMax: 30, models: 0 };
module.exports = {
  ...base,
  id: 'G2-324',
  slug: 'spelling-rules-which-one',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: 'Which One? {UNIT}', instruction: 'Look at the picture and read the word. Circle the right letters under it, then write them in the dashed box.' } },
  unitAxis: base.unitAxisFor('choice'),
};
