'use strict';
/**
 * K-380 `healthy-habits` — the five variation faces (nt5-F Phase E). Contract: design
 * docs/worksheet-gen/b6-designs/K-380-healthy-habits.md §3; record _work/K-380-faces.md.
 * All five are CODE faces on ONE additive knob `mode` read by the base spec
 * types/k/K-380-healthy-habits.js (FACE_BUILD / faceVerify); the base (mode undefined) stays
 * byte-identical. EN strings === data/b6/healthy-habits.js HEALTHY_HABITS.en.strings[<mode>]
 * (the family gate asserts it). Ids FIXED by _records/b6var-id-allocation.json.
 */
const BASE = 'K-380-healthy-habits.js';
const { HEALTHY_HABITS, COMMON } = require('../../data/b6/healthy-habits.js');
const S = HEALTHY_HABITS.en.strings;
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra
const ROWS = [
  ['k', 'K-382', 'hand-washing-steps', BASE, 2, { mode: 'hand-washing-steps', layout: 'steps-write', cards: 5, rowMin: 200 },
    S['hand-washing-steps'].title, S['hand-washing-steps'].instruction],
  ['g1', 'G1-403', 'brushing-teeth-before-during-after', BASE, 2, { mode: 'brushing-teeth', layout: 'phase-chips', cards: 7, rowMin: 136 },
    S['brushing-teeth'].title, S['brushing-teeth'].instruction, { gradeBand: 'G1' }],
  ['g1', 'G1-404', 'stop-the-germs', BASE, 2, { mode: 'stop-the-germs', layout: 'choice-pairs', rows: 4, germPairs: ['cough', 'tissue', 'cup', 'soap'], rowMin: 140 },
    S['stop-the-germs'].title, S['stop-the-germs'].instruction, { gradeBand: 'G1' }],
  ['g2', 'G2-379', 'why-do-we-do-healthy-habits', BASE, 2, { mode: 'why-habits', layout: 'reason-match', pairs: 5, reasonHabits: COMMON.reasonD2, rowMin: 108 },
    S['why-habits'].title, S['why-habits'].instruction, { gradeBand: 'G2' }],
  ['g1', 'G1-405', 'healthy-habits-week-chart', BASE, 2, { mode: 'habit-chart', layout: 'week-chart', rows: 5, days: 7, chartRows: COMMON.chartRows, rowMin: 96 },
    S['habit-chart'].title, S['habit-chart'].instruction, { gradeBand: 'G1' }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
