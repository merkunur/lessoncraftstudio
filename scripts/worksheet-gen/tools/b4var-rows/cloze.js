'use strict';
/**
 * b4var-rows/cloze.js — the five variation faces of G1-350 `cloze`
 * (design docs/worksheet-gen/b4-designs/G1-350-cloze.md §3; record
 * _work/G1-350-faces.md). Ids are FIXED by _records/b4var-id-allocation.json.
 * Read by tools/gen-b4var-specs.js only.
 *
 * All five are CODE faces on the base's ONE additive `mode` knob
 * (types/g1/G1-350-cloze.js `_buildWith` -> `_buildFace` when d.mode !== 'base';
 * the base's own configs carry no `mode`, so the published base deck is
 * byte-identical: tools/b3-baseline.js). Every row spreads the base's d2 and
 * sets the face keys the design names; the base's d2 keys a face ignores
 * (extra / gapH / rowMin …) ride along in D and are re-set where the face's
 * own number differs. Every face reads its answers through the base's
 * `answerFor` (never typed) and deals its frames through the base composer
 * (bank ∩ fits === {answer}, twins, confusable, <= 2 per theme). The family
 * is THEMELESS: `coordinate.theme:''`, `coordinate.mode` = the mode string.
 *
 *   F1 G1-366 mode:'letters'  7 lanes, no bank: the gap is a run of dashed 44 px letter boxes (one per grapheme) INSIDE the sentence; spell (G1)
 *                              (the design's 26 px box is under the G1 element floor 44: 11 boxes of 44 = 526 <= 531, the box line wraps the frame to two lines = 84 px, so 7 rows: 7 x 84 + 48 = 636 <= 677)
 *   F2 G1-367 mode:'choice'   6 lanes: two chips under the sentence (the answer + a same-gender frame-valid foil); circle, then copy into the box (G1)
 *   F3 G2-349 mode:'plural'   8 lanes, no bank, no hint: the picture cloned 2-3 times; write the PLURAL from the picture alone (G2)
 *   F4 G2-350 mode:'story'    a 9-word bank + three 3-sentence stories, each with a SHUFFLED three-picture strip; read across, write (G2)
 *   F5 G1-368 mode:'match'    six gap sentences left (no picture), six deranged pictures right; draw a line (G1, no writing)
 *
 * EN title + instruction = the bank's strings.<mode> verbatim
 * (data/b4/cloze.js; the gate asserts the pair is one source). F3 + F4 carry
 * `extra {gradeBand:'G2'}` (the base is G1; qa/lints.js + emit/manifest.js
 * read spec.gradeBand): their floors are the G2 ones (36).
 *
 * da REFUSES F3 (`refuse.plural:true` — the `singular-plural` head "Ental og
 * flertal" owns the only honest da title): the face is BUILT (every other
 * locale keeps it); the da block throws at build, no filler, and the hub
 * expectation for da is 5 (design §7).
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const G2 = { gradeBand: 'G2' };
const ROWS = [
  ['g1', 'G1-366', 'fill-in-the-blank-letter-boxes', 'G1-350-cloze.js', 2,
    { mode: 'letters', rows: 7, bank: false, extra: 0, boxes: true, box: 44, gap: 4, starter: false, picPx: 56, fontPx: 18, maxLetters: 11, minLetters: 2, maxChars: 48, rowMin: 84, rowGap: 8 },
    'Fill in the Blank: Letter Boxes', 'Look at the picture. Write the missing word in the boxes. One letter in each box.'],
  ['g1', 'G1-367', 'fill-in-the-blank-choose-the-word', 'G1-350-cloze.js', 2,
    { mode: 'choice', rows: 6, bank: false, extra: 0, chips: 2, foilKind: 'near', write: true, gapH: 36, chipPx: 20, chipH: 44, picPx: 56, fontPx: 18, maxGlyphs: 9, maxChars: { long: 38, short: 40 }, rowMin: 100, rowGap: 8 },
    'Fill in the Blank: Choose the Word', 'Look at the picture and read the sentence. Circle the word that fits and write it in the box.'],
  ['g2', 'G2-349', 'fill-in-the-blank-plural-nouns', 'G1-350-cloze.js', 2,
    { mode: 'plural', rows: 8, bank: false, extra: 0, hint: false, clones: [2, 3], clonePx: 48, cloneGap: 6, colW: 156, fontPx: 18, textW: 431, form: 'pl', maxChars: 40, maxGlyphs: 12, gapH: 40, rowMin: 78, rowGap: 8 },
    'Fill in the Blank: Plural Nouns', 'Look at the pictures. There is more than one. Write the word for more than one in the box.', G2],
  ['g2', 'G2-350', 'fill-in-the-blank-story', 'G1-350-cloze.js', 2,
    { mode: 'story', stories: 3, sentences: 3, bank: true, extra: 0, shuffleStrip: true, picPx: 44, gapH: 36, fontPx: 18, maxChars: 42, maxGlyphs: 9, blockMin: 188, blockGap: 10 },
    'Fill in the Blank Story', 'Read the whole story. The three pictures show the missing words. Write each word from the bank in its box.', G2],
  ['g1', 'G1-368', 'match-the-sentence-to-the-picture', 'G1-350-cloze.js', 2,
    { mode: 'match', pairs: 6, bank: false, extra: 0, itemH: 92, itemMax: 108, leftW: 330, rightW: 100, picPx: 64, blankW: 90, fontPx: 18, maxChars: 50, maxGlyphs: 14 },
    'Match the Sentence to the Picture', 'Read each sentence. Which picture fills the gap? Draw a line from the sentence to that picture.'],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
