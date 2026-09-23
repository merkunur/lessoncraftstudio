'use strict';
/**
 * b5var-rows/family.js — the five variation faces of K-370 `family`
 * (design docs/worksheet-gen/b5-designs/K-370-family.md §3; record
 * _work/K-370-faces.md). Ids are FIXED by _records/b5var-id-allocation.json.
 * Read by tools/gen-b5var-specs.js only.
 *
 * All five are CODE faces on the base's ONE `mode` knob
 * (types/k/K-370-family.js `_buildWith` -> `_buildFace` when d.mode !== 'base';
 * the base's configs say mode 'base', so the published base deck is
 * byte-identical: tools/b3-baseline.js). Every row spreads the base's d2 and
 * sets the face keys; the base keys a face ignores (grand / baby / chipPx 22 …)
 * ride along in D. THEMELESS (`coordinate.theme:''`); `coordinate.mode` = the
 * mode string. Lead ruling (binding): every CLOSED face draws the ONE
 * conventional invented family; F5 is the open template and presumes no shape.
 *
 *   F1 G1-385 mode:'generations'       a picture legend (1 grandparents / 2 parents / 3 children, one f + one m per frame)
 *                                      + 6 rows x 3 kin words; write 1 2 3 by generation from what the word MEANS (G1)
 *   F2 K-375  mode:'trace-words'       a small tree, four numbered people; trace each person's family word, write it once alone (K)
 *   F3 G1-386 mode:'tree-clues'        a tree of 7 with name plates (3 given, 4 empty incl. a same-(age, sex) pair) + 4 clues (G1)
 *   F4 G2-362 mode:'relation-riddles'  the ego's frame + a word bank + 8 two-step riddles ("Mia's mom's sister is Mia's ___.") (G2)
 *   F5 G1-387 mode:'tree-template'     an empty frame tree + shelf: draw the people who matter, write their names (G1, open)
 *
 * EN title + instruction = the bank's strings.<mode> verbatim (data/b5/family.js;
 * the gate asserts one source). F1 / F3 / F5 carry `extra {gradeBand:'G1'}`, F4
 * `{gradeBand:'G2'}` (qa/lints.js + emit/manifest.js read spec.gradeBand).
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const G1 = { gradeBand: 'G1' };
const G2 = { gradeBand: 'G2' };
const ROWS = [
  ['g1', 'G1-385', 'family-generations-oldest-to-youngest', 'K-370-family.js', 2,
    { mode: 'generations', rows: 6, perRow: 3, minSideline: 4, maxPerSlot: 3, legend: [170, 110], legendPx: 88, rowH: 60, rowMax: 76, rowGap: 8, chipPx: 20, box: [52, 48] },
    'Family Generations: Oldest to Youngest',
    'In each row, write 1, 2 and 3 in the boxes to put the family words in order from the oldest generation to the youngest.', G1],
  ['k', 'K-375', 'family-words-trace-and-write', 'K-370-family.js', 2,
    { mode: 'trace-words', people: 6, badged: 4, frame: [80, 96], stageW: 300, laneW: 321, trioH: 72, glyphH: 44, rowGap: 16, rowGapMax: 40, colGap: 16 },
    'Family Words: Trace and Write',
    'Find the person with the same number on the tree, trace their family word and write it again on the line.'],
  ['g1', 'G1-386', 'family-tree-read-the-clues', 'K-370-family.js', 2,
    { mode: 'tree-clues', people: 7, sideline: true, given: 3, clues: 4, frame: [80, 98], plate: [130, 44], plateGap: 6, rowGap: 28, gap: 14, gapMax: 40, clueH: 34, clueMax: 40 },
    'Family Tree: Read the Clues',
    'Read the clues and write each name in the right name box on the family tree.', G1],
  ['g2', 'G2-362', 'family-relationships-riddles', 'K-370-family.js', 2,
    { mode: 'relation-riddles', rows: 8, depth: 2, frame: [96, 116], bankPx: 18, bankH: 40, slot: [150, 36], rowH: 52, rowMax: 64, rowGap: 8 },
    'Family Relationships: Riddles',
    'Read each riddle and write the right family word from the box on the line; one word can fit more than one riddle.', G2],
  ['g1', 'G1-387', 'family-tree-template', 'K-370-family.js', 2,
    { mode: 'tree-template', mats: 9, shelf: 4, meWord: true, links: 0, gap: 16, gapMax: 40 },
    'Family Tree Template',
    'Draw the people who are important to you in the frames and write their names on the lines.', G1],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
