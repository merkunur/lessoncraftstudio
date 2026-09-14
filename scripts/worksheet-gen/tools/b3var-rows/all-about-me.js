'use strict';
/**
 * b3var-rows/all-about-me.js — the five variation faces of K-323 `all-about-me`
 * (design docs/worksheet-gen/b3-designs/K-323-all-about-me.md §3; ids fixed by
 * _records/b3var-id-allocation.json). Read by tools/gen-b3var-specs.js only.
 *
 * All five are CODE faces: each sets the base's additive `layout` knob
 * (types/k/K-323-all-about-me.js `_buildFace`) plus its own resolved config;
 * every row spreads the base's d2 config, so the face keys below are the ONLY
 * difference from the published base deck (tools/gate-variation-distinct.js
 * --batch=b3 --family=all-about-me). Every face ships at the K level key in
 * all 11 locales (§1); a locale REFUSES a face (throws at build) when its bank
 * lacks a literal, never pads. Row floors are re-budgeted to the MEASURED
 * worst chrome (a 4-line fi title squeezes the body to 700, not the README's
 * 722 — the base record's finding); the slack of a shorter chrome opens
 * inside the rows (minmax / flex), never as a hole at the bottom.
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  // F1 — CHOOSE one of six pictured options per category (animal · food · colour) and COPY its word:
  // 3 x .ws-lane rows minmax(224,1fr) (3 x 224 + 24 = 696 <= 700); tiles 100 x 104 gap 7 (635 <= 639), pic 64, label 16 <= 96 px.
  ['k', 'K-342', 'all-about-me-my-favorite-things', 'K-323-all-about-me.js', 2,
    { layout: 'favourites', categories: ['animal', 'food', 'color'], perRow: 6, tile: 100, tileH: 104, pic: 64, tileGap: 7, copyW: 591, favRowMin: 224, glyphH: 40, headingPx: 18 },
    'My Favorite Things: Circle and Write', 'In each row, circle your favorite picture and copy its word onto the line.'],
  // F2 — REPRESENT a self-known count (0 allowed) on an EMPTY ten-frame and WRITE the numeral (K.CC.A.3):
  // draw box 675 x 220 + 2 x 2 cards minmax(214,1fr) (220 + 12 + 442 = 674 <= 700); cell 56 = the K floor.
  ['k', 'K-343', 'all-about-me-my-family', 'K-323-all-about-me.js', 2,
    { layout: 'family', frames: ['people', 'brothers', 'sisters', 'pets'], cell: 56, box: 56, drawH: 220, frameMin: 214, headingPx: 18 },
    'All About My Family: Draw and Count', 'Draw your family. Then show how many people, brothers, sisters and pets on the ten-frames and write the number.'],
  // F3 — LABEL the printed face from a five-word bank (the verifiable face), then draw your own:
  // bank 59 (+10 margin) + 12 + figure 674 x 360 + 12 + draw box (flex, floor 220) = 453 + draw <= 700.
  ['k', 'K-344', 'all-about-me-label-the-face', 'K-323-all-about-me.js', 2,
    { layout: 'face', parts: ['hair', 'nose', 'eye', 'ear', 'mouth'], icon: 260, laneW: 200, laneH: 64, glyphH: 40, bankPx: 17, drawMin: 220 },
    'This Is Me: Label the Face', 'Copy each word from the bank onto the line that points to that part of the face. Then draw your own face.'],
  // F4 — READ the repeated "I can" frame eight times and TICK it (open-ended self-report), + one "I want to learn" lane:
  // 2 x 4 cards minmax(132,1fr) (570) + 12 + lane 116 = 698 <= 700; tick 56, cue 80, literal 18/22 <= 2 lines in 146.
  ['k', 'K-345', 'all-about-me-i-can', 'K-323-all-about-me.js', 2,
    { layout: 'ican', cards: 8, tick: 56, pic: 80, textW: 146, literalPx: 18, rowMin: 132, glyphH: 40, laneH: 116 },
    'I Can: Tick What You Can Do', 'Read each sentence and tick the things you can do. Then write one thing you want to learn.'],
  // F5 — WRITE the name one letter per box, COUNT the letters, name the FIRST letter, COMPARE with a friend (K.CC.B.5 + K.CC.C.6):
  // 112 + 78 + 110 + 112 + 78 + 100 = 590 + 5 x 12 = 650 <= 700 (space-between opens the slack between blocks).
  ['k', 'K-346', 'all-about-me-my-name', 'K-323-all-about-me.js', 2,
    { layout: 'name', boxes: 10, box: 56, boxGap: 6, glyphH: 40, cardH: 110, countBoxW: 60, countBoxH: 56 },
    'My Name: Write, Count and Compare', 'Write your name with one letter in each box and count the letters. Then do the same for a friend and circle who has more.'],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
