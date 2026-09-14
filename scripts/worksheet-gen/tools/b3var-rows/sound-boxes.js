'use strict';
/**
 * K-318 `sound-boxes` — the five variation faces (design §3; ids fixed by
 * docs/worksheet-gen/b3-designs/_records/b3var-id-allocation.json). All five are
 * CODE faces: each row sets ONE additive knob the base spec's `_buildWith` reads
 * (countMode / starter / strip / tiers / mode:'blend'); the base's own d1-d3 carry
 * none of them and stay byte-identical (tools/b3-baseline.js).
 *
 * K faces spread the base's d2 (2×3 cards). G1 faces override the whole shape
 * to six rows (cardGrid 1×6; picture 72 — the design's 80 does not fit the
 * measured row inner of ~78 px under the worst legal chrome; G1 floor 44).
 * `wantWide:0` where the page draws no wide box (Count) or where every box is
 * uniform (Strip): a "wide" preference has no visible meaning there and would
 * only bias the sample. `poolFloor:8` = design §1 minNouns, checked on the FACE
 * pool after segmentation. The G1 rows carry `extra {gradeBand:'G1'}` so the
 * manifest's grade_band (emit/manifest.js) says what the page is.
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  ['k', 'K-329', 'sound-boxes-count-the-sounds', 'K-318-sound-boxes.js', 2,
    { countMode: true, minG: 2, maxG: 5, wantWide: 0, dots: 'never' },
    'Count the Sounds',
    'Say the picture word slowly. Draw one dot in the long box for every sound you hear. Then write how many sounds in the small box.'],
  ['k', 'K-330', 'sound-boxes-first-sound-given', 'K-318-sound-boxes.js', 2,
    { starter: true, minG: 4, maxG: 5 },
    'First Sound Given',
    'The first sound is written for you. Say the picture word slowly and write one sound in each empty box. A wide box holds two letters for one sound.'],
  ['g1', 'G1-312', 'sound-boxes-sound-strip', 'K-318-sound-boxes.js', 2,
    { cards: 6, cols: 1, rows: 6, pic: 72, box: 60, gap: 10, strip: 6, minG: 3, maxG: 6, maxWide: 9, minWideCards: 0, wantWide: 0, dots: 'never', band: 'G1', poolFloor: 8 },
    'Sound Strip: How Many Sounds?',
    'Say the word slowly. Write one sound in each box, starting from the left. Leave the boxes you do not need empty.',
    { gradeBand: 'G1' }],
  ['g1', 'G1-313', 'sound-boxes-syllables-and-sounds', 'K-318-sound-boxes.js', 2,
    { cards: 6, cols: 1, rows: 6, pic: 72, box: 44, gap: 8, interGap: 22, tiers: true, minSyl: 2, maxSyl: 3, minG: 4, maxG: 7, maxWide: 3, minWideCards: 0, wantWide: 0, dots: 'never', band: 'G1', poolFloor: 8 },
    'Syllables and Sounds',
    'Clap the syllables of the picture word. Then say each syllable slowly and write one sound in each box under its arc.',
    { gradeBand: 'G1' }],
  ['g1', 'G1-314', 'sound-boxes-blend-the-sounds', 'K-318-sound-boxes.js', 2,
    { cards: 6, cols: 1, rows: 6, mode: 'blend', choices: 3, box: 44, gap: 8, pic: 72, minG: 3, maxG: 5, maxWide: 1, minWideCards: 0, wantWide: 1, dots: 'never', band: 'G1', poolFloor: 8 },
    'Blend the Sounds',
    'Read the sounds in the boxes and blend them into a word. Circle the picture that matches the word.',
    { gradeBand: 'G1' }],
];
const HANDWRITTEN = []; // [{ id, dir, file, base: 'K-318' }]
module.exports = { ROWS, HANDWRITTEN };
