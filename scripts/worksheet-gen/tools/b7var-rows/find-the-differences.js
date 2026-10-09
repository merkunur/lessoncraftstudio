'use strict';
/**
 * K-395 `find-the-differences` — the ten variation faces (nt2-G / b7). Contract: docs/worksheet-gen/b7-designs/K-395-find-the-differences.md §3.
 * All ten are CODE faces on ONE additive knob `mode` read by the base spec types/k/K-395-find-the-differences.js; the
 * base (mode 'base') stays byte-identical. EN strings === data/b7/find-the-differences.js FIND_THE_DIFFERENCES.en.strings[<mode>].
 * Ids FIXED by _records/b7var-id-allocation.json. Every pinned unit is PROVISIONAL until the rich copies are re-swept.
 */
const BASE = 'K-395-find-the-differences.js';
const S = require('../../data/b7/find-the-differences.js').FIND_THE_DIFFERENCES.en.strings;
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra
const ROWS = [
  ['k', 'K-397', 'find-3-differences', BASE, 2,
    { mode: 'three-big', count: 3, unit: 'beach-bucket-rich', layout: 'stack', floor: 'K', kinds: ['remove', 'add', 'swap', 'scale'], minArea: 1500, heroProb: 1.0, minSepPx: 27, ledger: { box: 64 } },
    S['three-big'].title, S['three-big'].instruction],
  ['k', 'K-398', 'find-the-differences-in-colour', BASE, 2,
    { mode: 'colour', count: 5, unit: 'pond-frog-rich', layout: 'stack', floor: 'K', render: 'colour', needColour: true, minLumaDelta: 40, kinds: ['remove', 'add', 'swap', 'mirror', 'scale', 'move', 'colour'], heroProb: 0.5, minSepPx: 27, ledger: { box: 56 } },
    S.colour.title, S.colour.instruction],
  ['g1', 'G1-412', 'find-7-differences', BASE, 2,
    { mode: 'seven', count: 7, pairs: 2, perPair: [4, 3], units: ['pond-turtle-rich', 'pond-alligator-rich'], layout: 'columns', floor: 'G1', ppu: 0.5, panelW: 300, kinds: 'line-all', heroFront: 0.5, minSepPx: 27, excludeSrcs: true, ledger: { box: 48 } },
    S.seven.title, S.seven.instruction, { gradeBand: 'G1' }],
  ['g2', 'G2-388', 'find-10-differences', BASE, 2,
    { mode: 'ten-pairs', count: 10, pairs: 2, perPair: [5, 5], units: ['kite-rich', 'ladybug-rich'], layout: 'columns', floor: 'G2', ppu: 0.5, panelW: 300, kinds: 'line-all', heroProb: 1, heroWaived: 'five per pair at the G2 floor: no rebuilt scene composes 5 separated differences without its hero (sweep 2026-10-09, 0 of 831 pairs in the hero band)', minSepPx: 31, excludeSrcs: true, ledger: { box: 44 } },
    S['ten-pairs'].title, S['ten-pairs'].instruction, { gradeBand: 'G2' }],
  ['g1', 'G1-413', 'how-many-differences', BASE, 2,
    { mode: 'how-many', countRange: [3, 6], unit: 'garden-bird-rich', layout: 'stack', floor: 'G1', kinds: ['remove', 'add', 'mirror', 'scale', 'move'], heroProb: 0.5, minSepPx: 31, box: { w: 88, h: 64 } },
    S['how-many'].title, S['how-many'].instruction, { gradeBand: 'G1' }],
  ['g1', 'G1-414', 'what-changed-tick-the-words', BASE, 2,
    { mode: 'what-changed', itemFirst: true, count: 3, unit: 'farm-cow-rich', layout: 'stack', floor: 'G1', kinds: ['remove', 'swap', 'mirror', 'scale', 'move'], noSameKeySwap: true, heroFront: 0.5, minSepPx: 31, box: 28, minUnticked: 1 },
    S['what-changed'].title, S['what-changed'].instruction, { gradeBand: 'G1' }],
  ['g1', 'G1-415', 'mirror-pictures-find-the-differences', BASE, 2,
    { mode: 'mirror-pair', count: 4, unit: 'forest-fox-rich', flip: true, layout: 'side', floor: 'G1', ppu: 0.5, panelW: 300, kinds: ['remove', 'add', 'swap', 'scale'], heroFront: 0.5, minSepPx: 27, fold: true, ledger: { box: 48 } },
    S['mirror-pair'].title, S['mirror-pair'].instruction, { gradeBand: 'G1' }],
  ['k', 'K-399', 'what-is-missing', BASE, 2,
    { mode: 'missing', count: 3, unit: 'night-owl-rich', layout: 'stack', floor: 'K', kinds: ['remove'], noKindCap: true, minSepPx: 27, ledger: { box: 56, dashed: false } },
    S.missing.title, S.missing.instruction],
  ['k', 'K-400', 'picture-pairs-find-the-difference', BASE, 2,
    { mode: 'pairs', count: 3, rows: 3, unit: 'garden-ladybug-rich', layout: 'pairs', window: [260, 200], ppu: 1.0, floor: 'K', kinds: ['remove', 'add', 'swap', 'mirror', 'scale', 'move'], noSameKeySwap: true, spread: 'none', minSepPx: 0 },
    S.pairs.title, S.pairs.instruction],
  ['g2', 'G2-389', 'write-what-is-different', BASE, 2,
    { mode: 'write', itemFirst: true, count: 3, unit: 'elephant-rich', layout: 'side', floor: 'G1', ppu: 0.5, panelW: 280, kinds: ['remove', 'add', 'swap', 'mirror', 'scale', 'move'], distinctKinds: true, noSameKeySwap: true, heroFront: 0.5, minSepPx: 27, rows: 3, glyphH: 20, rowH: 40 },
    S.write.title, S.write.instruction, { gradeBand: 'G2' }],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
