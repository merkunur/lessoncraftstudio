'use strict';
/**
 * G1-398 `habitats` — the five variation faces (nt5-F Phase E). Contract: design
 * docs/worksheet-gen/b6-designs/G1-398-habitats.md §3; record _work/G1-398-faces.md.
 * All five are CODE faces on ONE additive knob `layout` read by the base spec
 * types/g1/G1-398-animal-habitats.js (_buildFace / _verifyFace); the base (layout undefined)
 * stays byte-identical. EN strings === data/b6/habitats.js HABITATS_LOC.en.strings[<id>]
 * (the family gate asserts it). Ids FIXED by _records/b6var-id-allocation.json.
 */
const BASE = 'G1-398-animal-habitats.js';
const S = require('../../data/b6/habitats.js').HABITATS_LOC.en.strings;
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra
const ROWS = [
  ['k', 'K-383', 'animal-homes', BASE, 2, { layout: 'homes', pairs: 6, pic: 80, homePx: 88 },
    S['K-383'].title, S['K-383'].instruction, { gradeBand: 'K' }],
  ['g1', 'G1-406', 'who-does-not-live-here', BASE, 2, { layout: 'odd', rows: 4, perRow: 4, winW: 196, pic: 76, nearPairs: 1 },
    S['G1-406'].title, S['G1-406'].instruction, { gradeBand: 'G1' }],
  ['g2', 'G2-380', 'how-animals-adapt', BASE, 2, { layout: 'adapt', items: 6, bank: 7, pic: 64, textPx: 17, maxLines: 3 },
    S['G2-380'].title, S['G2-380'].instruction, { gradeBand: 'G2' }],
  ['g1', 'G1-407', 'what-animals-need', BASE, 2, { layout: 'needs', rows: 4, foodPair: true, homePair: true, pic: 84, chip: 96 },
    S['G1-407'].title, S['G1-407'].instruction, { gradeBand: 'G1' }],
  ['g2', 'G2-381', 'my-habitat-report', BASE, 2, { layout: 'report', animalRows: 3, plantRows: 1, chipPairs: 2 },
    S['G2-381'].title, S['G2-381'].instruction, { gradeBand: 'G2' }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
