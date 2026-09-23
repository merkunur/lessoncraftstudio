'use strict';
/**
 * G2-377 `cursive-writing` — the five variation faces (nt5-F Phase E). Contract: design
 * docs/worksheet-gen/b6-designs/G2-377-cursive-writing.md §3; record _work/G2-377-faces.md.
 * All five are CODE faces on ONE additive knob `mode` read by the base spec
 * types/g2/G2-377-cursive-writing.js (_buildWith dispatches a face mode to buildFace BEFORE
 * the base path, so mode 'base' stays byte-identical). EN strings === data/b6/cursive-writing.js
 * CURSIVE_WRITING.en.strings[<id>] (the family gate asserts it). Ids FIXED by
 * _records/b6var-id-allocation.json.
 */
const BASE = 'G2-377-cursive-writing.js';
const S = require('../../data/b6/cursive-writing.js').CURSIVE_WRITING.en.strings;
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra
const ROWS = [
  ['g2', 'G2-384', 'cursive-capitals-with-names', BASE, 2, { mode: 'capitals', capitals: 5, source: 'names' },
    S['G2-384'].title, S['G2-384'].instruction, { gradeBand: 'G2' }],
  ['g2', 'G2-385', 'cursive-letter-connections', BASE, 2, { mode: 'joins', pairs: 5 },
    S['G2-385'].title, S['G2-385'].instruction, { gradeBand: 'G2' }],
  ['g2', 'G2-386', 'cursive-words-with-pictures', BASE, 2, { mode: 'words', words: 4, maxLetters: 8 },
    S['G2-386'].title, S['G2-386'].instruction, { gradeBand: 'G2' }],
  ['g2', 'G2-387', 'reading-cursive', BASE, 2, { mode: 'read', pairs: 6 },
    S['G2-387'].title, S['G2-387'].instruction, { gradeBand: 'G2' }],
  ['g3', 'G3-401', 'copy-a-sentence-in-cursive', BASE, 2, { mode: 'copy', sentences: 3, modelUnder: 'first' },
    S['G3-401'].title, S['G3-401'].instruction, { gradeBand: 'G3' }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
