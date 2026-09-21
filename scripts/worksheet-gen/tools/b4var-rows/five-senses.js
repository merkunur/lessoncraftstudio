'use strict';
/**
 * b4var-rows/five-senses.js — the five variation faces of K-355 `five-senses`
 * (design docs/worksheet-gen/b4-designs/K-355-five-senses.md §3; record
 * _work/K-355-faces.md). Ids are FIXED by _records/b4var-id-allocation.json
 * (all five are G1 ids: the base is K). Read by tools/gen-b4var-specs.js only.
 *
 * All five are CODE faces: every row spreads the base's d2 config and sets the
 * base's additive `layout` knob (types/k/K-355-five-senses.js `_buildFace`);
 * the base's own configs carry no `layout`, so the published base deck is
 * byte-identical (tools/b3-baseline.js). The base's d2 keys a face ignores
 * (pairs / itemH / organWords …) ride along in D; each builder reads only its
 * own keys; `pool` and `maxPerSense` are the shared names every face re-sets
 * (maxPerSense 2 = the page rule, the base's 1 was by construction). The
 * family is THEMELESS: `coordinate.theme:''`, `coordinate.mode` = the layout.
 *
 *   F1 G1-357  layout:'sort'   ten pictures into five verb-labelled bins, two per sense, by line
 *   F2 G1-358  layout:'which'  one picture, the five organ chips in a FIXED order beside it, circle one (8 rows)
 *   F3 G1-359  layout:'odd'    four pictures a row, three share a sense, cross out the intruder (5 rows)
 *   F4 G1-360  layout:'label'  copy the sense VERB from a 5-word bank onto the line beside the organ that does it
 *   F5 G1-361  layout:'write'  OPEN-ENDED: a starter on the first ruling row of each organ lane, a second row to finish
 *
 * EN title + instruction = the bank's strings['G1-357'..'G1-361'] verbatim
 * (data/b4/five-senses.js; the gate asserts the pair is one source). Every
 * row carries `extra {gradeBand:'G1'}` (qa/lints.js + emit/manifest.js read
 * spec.gradeBand): the floors are the G1 ones (44).
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const G1 = { gradeBand: 'G1' };
const ROWS = [
  ['g1', 'G1-357', 'five-senses-sort-by-sense', 'K-355-five-senses.js', 2,
    { layout: 'sort', perBin: 2, bins: 5, cols: 5, iconPx: 64, maxPerSense: 2, pool: 'strong', organInBin: true, zone: 260 },
    'Five Senses: Sort by Sense', 'Look at each picture and draw a line from its dot to the box of the sense you use for it.', G1],
  ['g1', 'G1-358', 'five-senses-which-sense', 'K-355-five-senses.js', 2,
    { layout: 'which', items: 8, chipOrder: 'fixed', tile: 60, chipPx: 46, pic: 60, pool: 'strong', maxPerSense: 2, minPerSense: 1 },
    'Five Senses: Which Sense?', 'Which sense do you use for each picture? Circle the body part you use.', G1],
  ['g1', 'G1-359', 'five-senses-which-one-does-not-belong', 'K-355-five-senses.js', 2,
    { layout: 'odd', rows: 5, items: 4, box: 96, pic: 72, boxMax: 120, majorityRows: { hear: 2, taste: 2, see: 1 }, pool: 'strong', maxPerSense: 2 },
    'Five Senses: Which One Does Not Belong?', 'In each row three pictures go with the same sense. Cross out the one that does not.', G1],
  ['g1', 'G1-360', 'sense-organs-write-the-sense-word', 'K-355-five-senses.js', 2,
    { layout: 'label', organs: 5, bank: true, starter: false, laneW: 440, laneH: 62, glyphH: 36, organPx: 72, rowMin: 112, rowMax: 128, pool: 'strong', maxPerSense: 2 },
    'Sense Organs: Write the Sense Word', 'Copy each sense word from the bank onto the line next to the body part that does it.', G1],
  ['g1', 'G1-361', 'five-senses-i-can-hear', 'K-355-five-senses.js', 2,
    { layout: 'write', rowsPerSense: 2, rowH: 46, glyphH: 30, laneW: 560, organPx: 56, draw: null, rowMin: 126, rowMax: 140, pool: 'strong', maxPerSense: 2 },
    'Five Senses: I Can Hear ...', 'Finish each sentence. Write what you can hear, see, smell, taste and touch.', G1],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
