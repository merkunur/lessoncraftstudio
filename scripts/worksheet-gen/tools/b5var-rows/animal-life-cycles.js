'use strict';
/**
 * b5var-rows/animal-life-cycles.js — the five variation faces of G1-377 `animal-life-cycles`
 * (design docs/worksheet-gen/b5-designs/G1-377-animal-life-cycles.md §3; record
 * _work/G1-377-faces.md). Ids are FIXED by _records/b5var-id-allocation.json; two faces
 * sit in G2 and one in G3 (types/g2, types/g3). Read by tools/gen-b5var-specs.js only.
 *
 * All five are CODE faces on the base's ONE additive `layout` knob
 * (types/g1/G1-377-butterfly-life-cycle.js `_buildFace`); the base configs carry no
 * `layout`, so the published base deck is byte-identical (tools/b3-baseline.js). The
 * base's d2 keys a face ignores (anchors / loop / boxPx …) ride along in D; each face
 * reads only its own keys (F1 re-sets `anchors`, F2 `lensD`). THEMELESS family:
 * coordinate.mode = the layout.
 *
 *   F1 G1-389  frog-cut-paste  5 lily pads round a pond (frogspawn given), cut 4 squares and glue each on its pad
 *   F2 G2-365  label           the butterfly loop printed in order; write each name on its lane; cross out the tadpole
 *   F3 G2-366  metamorphosis   8 lettered stages into 3 bins crowned by butterfly / frog / ladybird, 4 boxes in EVERY bin
 *   F4 G3-393  compare         8 animal-free statements; check butterfly, frog or both
 *   F5 G1-390  next            6 rows: circle the stage that comes right after (2 ask what follows an adult)
 *
 * EN title + instruction = the bank's strings[<id>] verbatim (data/b5/animal-life-cycles.js;
 * the gate asserts the pair is one source). G2 / G3 rows carry `extra {gradeBand}` so
 * qa/lints.js + emit/manifest.js read the face's own band (floors 36).
 */
const { ANIMAL_LIFE_CYCLES } = require('../../data/b5/animal-life-cycles.js');
const S = ANIMAL_LIFE_CYCLES.en.strings;
const BASE = 'G1-377-butterfly-life-cycle.js';
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  ['g1', 'G1-389', 'frog-life-cycle-cut-and-paste', BASE, 2,
    { layout: 'frog-cut-paste', animal: 'frog', stages: ['spawn', 'tadpole', 'legged', 'froglet', 'adult'], anchors: ['spawn'], padR: 86, ghost: 116, cell: 104, tileLens: 92, padLens: 132, ringMax: 600 },
    S['G1-389'].title, S['G1-389'].instruction],
  ['g2', 'G2-365', 'label-the-butterfly-life-cycle', BASE, 2,
    { layout: 'label', animal: 'butterfly', decoy: 'frog.tadpole', bank: true, lensD: 130, lensMax: 200, loopMax: 650, lane: [260, 56], glyphH: 26, wordPx: 18 },
    S['G2-365'].title, S['G2-365'].instruction, { gradeBand: 'G2' }],
  ['g2', 'G2-366', 'metamorphosis-which-animal-will-it-become', BASE, 2,
    { layout: 'metamorphosis', animals: ['butterfly', 'frog', 'ladybird'], cards: ['butterfly.larva', 'butterfly.pupa', 'frog.spawn', 'frog.tadpole', 'frog.legged', 'frog.froglet', 'ladybird.larva', 'ladybird.pupa'], lensD: 100, lensMax: 128, adultD: 132, adultMax: 164, box: 52, boxMax: 64, binsMax: 420, boxesPerBin: 4 },
    S['G2-366'].title, S['G2-366'].instruction, { gradeBand: 'G2' }],
  ['g3', 'G3-393', 'butterfly-and-frog-life-cycles-compared', BASE, 2,
    { layout: 'compare', rows: 8, mix: { both: 2, butterfly: 3, frog: 3 }, rowMinH: 58, textPx: 17, tick: 40, headD: 110 },
    S['G3-393'].title, S['G3-393'].instruction, { gradeBand: 'G3' }],
  ['g1', 'G1-390', 'what-comes-next-butterfly-frog-and-ladybug', BASE, 2,
    { layout: 'next', animals: ['butterfly', 'frog', 'ladybird'], rows: 6, perAnimal: 2, wrap: 2, promptD: 100, chipD: 92 },
    S['G1-390'].title, S['G1-390'].instruction],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
