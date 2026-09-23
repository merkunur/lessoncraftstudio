'use strict';
/**
 * K-379 `story-sequencing` — the five variation faces (nt5-F Phase E). Contract: design
 * docs/worksheet-gen/b6-designs/K-379-story-sequencing.md §3; record _work/K-379-faces.md.
 * All five are CODE faces on ONE additive knob `mode` read by the base spec
 * types/k/K-379-story-sequencing.js (FACE_BUILD / faceVerify); the base (mode 'base') stays
 * byte-identical. EN strings === data/b6/story-sequencing.js STORY_SEQUENCING.en.strings[<mode>]
 * (the family gate asserts it). Ids FIXED by _records/b6var-id-allocation.json.
 */
const BASE = 'K-379-story-sequencing.js';
const S = require('../../data/b6/story-sequencing.js').STORY_SEQUENCING.en.strings;
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra
const ROWS = [
  ['k', 'K-381', 'story-sequencing-cut-and-paste-first-next-last', BASE, 2,
    { mode: 'first-next-last-cut', stories: 2, panels: 3, sub: 'sub3', answer: 'glue', words: 3, strips: 2, tile: 128, frame: 136, frameH: 104, gap: 40, grow: 60 },
    S['first-next-last-cut'].title, S['first-next-last-cut'].instruction],
  ['g1', 'G1-400', 'story-sequencing-what-happens-next', BASE, 2,
    { mode: 'what-happens-next', stories: 3, shown: 3, order: 'given', answer: 'choice', choices: 3, foils: ['regress', 'other'], panels: 4, sub: 'sub4', panelW: 108, grow: 40 },
    S['what-happens-next'].title, S['what-happens-next'].instruction, { gradeBand: 'G1' }],
  ['g1', 'G1-401', 'beginning-middle-and-end-of-a-story', BASE, 2,
    { mode: 'beginning-middle-end', stories: 2, show: 'ends', answer: 'draw', labels: 'bme', panels: 3, sub: 'sub3', endW: 172, endVh: 200, midW: 240, grow: 100 },
    S['beginning-middle-end'].title, S['beginning-middle-end'].instruction, { gradeBand: 'G1' }],
  ['g1', 'G1-402', 'story-sequencing-sentences-match-the-pictures', BASE, 2,
    { mode: 'sequencing-sentences', stories: 2, panels: 4, sub: 'sub4', order: 'scrambled', answer: 'line', sentences: true, openers: 'openers4', panelW: 100, textW: 420 },
    S['sequencing-sentences'].title, S['sequencing-sentences'].instruction, { gradeBand: 'G1' }],
  ['g2', 'G2-378', 'retell-the-story-with-starters', BASE, 2,
    { mode: 'retell-with-starters', stories: 1, panels: 4, sub: 'sub4', order: 'given', answer: 'write', rows: 2, glyphH: 24, lineH: 52, starters: 'starters4', helpWords: true, cardW: 150, cardVh: 140, rulingW: 440, grow: 70 },
    S['retell-with-starters'].title, S['retell-with-starters'].instruction, { gradeBand: 'G2' }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
