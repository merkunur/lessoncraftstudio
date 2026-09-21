'use strict';
/**
 * b4var-rows/human-body.js — the five variation faces of K-354 `human-body`
 * (design docs/worksheet-gen/b4-designs/K-354-human-body.md §3; record
 * _work/K-354-faces.md). Ids are FIXED by _records/b4var-id-allocation.json.
 * Read by tools/gen-b4var-specs.js only.
 *
 * All five are CODE faces: every row spreads the base's d2 config and sets the
 * base's additive `layout` knob (types/k/K-354-human-body.js `_buildFace`); the
 * base's own configs carry no `layout`, so the published base deck is
 * byte-identical (tools/b3-baseline.js). The base's d2 keys a face ignores
 * (perSide / laneW / laneH / glyphH / bankPx …) ride along in D; each face
 * builder reads only its own keys and guards them on the RESOLVED config.
 * The family's theme is FIXED (`body parts`; themeAxis non-applicable):
 * `coordinate.theme:''`, `coordinate.mode` = the layout string.
 *
 *   F1 K-360  layout:'count'    a cue picture + "how many X?" + an empty numeral box per card; write 1 / 2 / 10 (K)
 *   F2 K-361  layout:'color'    a swatch + colour word + part word legend (5 rows sharing the stage) beside a WHITE 660 figure; colour the regions (K)
 *   F3 G1-356 layout:'write'    numbered coral markers on the figure, a letter-box row per numeral; write the name (G1)
 *   F4 K-362  layout:'missing'  four small figures each missing ONE part class; circle its picture chip, draw it on (K)
 *   F5 K-363  layout:'pairs'    eight picture + SINGULAR-word cards (5 twos + 3 ones; the neck PICTURE is excluded) beside the figure; circle the twos (K)
 *
 * EN title + instruction = the bank's strings['K-360'..] verbatim
 * (data/b4/human-body.js; the gate asserts the pair is one source). F3 carries
 * `extra {gradeBand:'G1'}` (the base is K; qa/lints.js + emit/manifest.js read
 * spec.gradeBand) — its floors are the G1 ones (letter box + chip 44).
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  ['k', 'K-360', 'human-body-how-many', 'K-354-human-body.js', 2,
    { layout: 'count', cards: 6, cols: 2, rows: 3, mix: { 1: 2, 2: 3, 10: 1 }, pic: 72, box: 56, wordPx: 18, figureH: 540 },
    'Parts of the Body: How Many?', 'How many of each do you have? Count on your own body and write the number in the box.'],
  ['k', 'K-361', 'human-body-color-by-legend', 'K-354-human-body.js', 2,
    { layout: 'color', legend: 5, figureH: 660, regionPool: ['hair', 'head', 'arm', 'hand', 'leg', 'foot'], swatch: 36, wordPx: 22 },
    'Parts of the Body: Color by Legend', 'Read the legend and color each part of the body in the color written next to its name.'],
  ['g1', 'G1-356', 'human-body-write-the-word', 'K-354-human-body.js', 2,
    { layout: 'write', labels: 6, faceMax: 2, leadMin: 4, boxes: true, box: 44, gap: 4, maxLetters: 8, figureH: 520, markerMin: 30 },
    'Parts of the Body: Write the Word', 'Find each numbered part on the figure and write its name, one letter in each box.',
    { gradeBand: 'G1' }],
  ['k', 'K-362', 'human-body-what-is-missing', 'K-354-human-body.js', 2,
    { layout: 'missing', figures: 4, cols: 2, rows: 2, figureH: 300, chips: 3, chip: 80, pic: 64, omitPool: ['arm', 'hand', 'leg', 'foot', 'hair'] },
    'Parts of the Body: What Is Missing?', 'Each body is missing one part: circle the picture of the missing part, then draw it on.'],
  ['k', 'K-363', 'human-body-which-come-in-twos', 'K-354-human-body.js', 2,
    { layout: 'pairs', cards: 8, cols: 2, rows: 4, pairs: 5, singles: 3, pic: 88, wordPx: 18, figureH: 440 },
    'Parts of the Body: Which Come in Twos?', 'Circle every part of the body that you have two of.'],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
