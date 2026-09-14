'use strict';
/**
 * K-317 `letter-of-the-week` — the five nt20-C variation faces (design §3;
 * ids fixed by _records/b3var-id-allocation.json). Read by tools/gen-b3var-specs.js.
 *
 * Every row spreads the base's d2 config (the level every b3 wave ships) and
 * sets the ADDITIVE knob the base's build already reads (types/k/K-317-…js):
 *   K-325  PARAM  hunt.hitPos:'noninitial' + minMedial:2  → scope "anywhere"
 *   K-326  CODE   positions:{…} + the slim zone 1 + no write rows
 *   K-327  CODE   wordHunt:{…}  + the slim zone 1 + no write rows
 *   K-328  CODE   pair:{…}      + the slim zone 1 + no write rows
 *   G1-311 HANDWRITTEN (types/g1/G1-311-sound-of-the-week.js): the unit face
 *          needs its OWN unitAxis (units = bank.units, not bank.letters) —
 *          function values a row cannot carry.
 * Titles carry {U}/{L} for the letter fan (unit-axis tokens); the K-328 pair
 * letter has no token (lib/unit-axis.js resolves {U}{L}{UNIT} only — shared),
 * so its EN title names the exemplar pair literally, as the design's wave
 * panel does ("the wave panel writes the exemplar literally").
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const SLIM = { card: { w: 110, h: 110, glyphH: 38 }, trace: { glyphH: 52, laneH: 80, reps: 5, lanes: 'upper' }, write: null, hunt: null };
const ROWS = [
  ['k', 'K-325', 'letter-of-the-week-words-with', 'K-317-letter-of-the-week.js', 2,
    { hunt: { n: 8, hits: 4, cols: 4, cardW: 156, cardH: 140, iconPx: 100, foilPolicy: 'avoid', hitPos: 'noninitial', minMedial: 2 } },
    'Words with {U}: Hear It Anywhere',
    'Trace the letter, then circle the four pictures that have the {U} sound somewhere inside the word, not at the start.'],
  ['k', 'K-326', 'letter-of-the-week-beginning-middle-end', 'K-317-letter-of-the-week.js', 2,
    { ...SLIM, positions: { cards: 6, cols: 2, split: [2, 2, 2], cardW: 323, cardH: 180, iconPx: 96, boxPx: 44, glyphH: 30, laneH: 42 } },
    'Beginning, Middle or End: Where Is the {U}?',
    'Say each picture. Colour the box that shows where you hear {U}: at the beginning, in the middle or at the end.'],
  ['k', 'K-327', 'letter-of-the-week-circle-and-count', 'K-317-letter-of-the-week.js', 2,
    { ...SLIM, wordHunt: { rows: 6, capsRows: 2, maxLetters: 9, occ: [1, 2], minTotal: 8, iconPx: 72, laneW: 440, laneH: 56, glyphH: 40, boxPx: 56, gap: 10 } },
    'Circle the {U} in the Words and Count',
    'Find every {U} or {L} in each word and circle it. Then write in the box how many you found.'],
  ['k', 'K-328', 'letter-of-the-week-m-or-n', 'K-317-letter-of-the-week.js', 2,
    { ...SLIM, pair: { cards: 8, cols: 4, split: [4, 4], cardW: 156, cardH: 184, iconPx: 100, chipPx: 48 } },
    'M or N? Hear the Difference',
    'Say each picture. Circle the letter it begins with: m or n.'],
];
const HANDWRITTEN = [{ id: 'G1-311', dir: 'g1', file: 'G1-311-sound-of-the-week.js', base: 'K-317' }];
module.exports = { ROWS, HANDWRITTEN };
