'use strict';
/**
 * b3var-rows/compound-words.js — the five variation faces of G2-316
 * `compound-words` (design docs/worksheet-gen/b3-designs/G2-316-compound-words.md
 * §3; record _work/G2-316-faces.md). Ids are FIXED by
 * _records/b3var-id-allocation.json. Read by tools/gen-b3var-specs.js only.
 *
 * All five are CODE faces: every row spreads the base's d2 config and sets the
 * additive `mode` knob (types/g2/G2-316-compound-words.js `_buildFace`) plus the
 * face's own keys; the base's keys the face ignores ride along in D. The EN
 * title + instruction = the bank's strings[<id>] verbatim (data/b3/compound-
 * words.js; the gate asserts one source). Every face ships at G2 in the base's
 * band directory (§1: G2 in all 11), so no `extra` is needed; every face is
 * THEMELESS like its base (themeAxis.applicable:false inherited) and fans over
 * the bank's pair SETS through the inherited unitAxis (F3 draws the set; F1 /
 * F2 / F4 draw the set ∪ onePart (∪ opaque for the analysis faces); F5 draws
 * the hubs, which span the sets by nature).
 *   F1 G2-329 CODE mode:'link'    — 8 rows [whole pic][tile a][joint box][tile b][writing row 340-400];
 *                                   REFUSED by the bank in en/it/pt (`refuse.F1`) — `render/one.js
 *                                   G2-329 … en` throws the refusal by design (the G1-329 precedent)
 *   F2 G2-330 CODE mode:'cut'     — 8 rows [whole pic][the whole in 32 px letter cells over a rail]
 *   F3 G2-331 CODE mode:'match'   — 6 rows [writing row 370][first-part pic 72]…[second-part pic, deranged]
 *                                   (pictures 72 / lane 370 / glyphH 26 / cap 12, not the design's 88 / 300 /
 *                                   28 / 14: the school-hand model needs ~1.1·glyphH per glyph × 1.5, see the record)
 *   F4 G2-332 CODE mode:'detect'  — a 12-chip picture bank (6 compounds + 6 foils, mixed) + 6 lanes of
 *                                   two rulings round a `+`
 *   F5 G2-333 CODE mode:'web'     — 2 webs × 4 satellites (hub picture + word, ghost hub in its true
 *                                   position); REFUSES below the floor (en today: fish is the only hub
 *                                   with >= 4 — the panel's `bank.webLanes:3` ruling lifts it); family /
 *                                   alterati banks render the design's size rows (`sizePairs` >= 8)
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  ['g2', 'G2-329', 'compound-words-what-goes-in-the-middle', 'G2-316-compound-words.js', 2,
    { mode: 'link', cards: 8, linkBoxW: 36, minLinked: 3, minEmpty: 3, maxLetters: 12, tileFont: 18, tileH: 36, wholePic: 44, laneW: 400, laneH: 56, glyphH: 24, laneNeedPerGlyph: 1.1, padY: 6, gap: 8, badges: true },
    'What Goes in the Middle?',
    'Both words are printed. Write the letter that joins them in the box, or leave it empty, then write the whole word on the line.'],
  ['g2', 'G2-330', 'compound-words-split-the-compound', 'G2-316-compound-words.js', 2,
    { mode: 'cut', rows: 8, cell: 32, cellFont: 30, cutPic: 56, maxLetters: 14, padY: 6, gap: 8, badges: true },
    'Split the Compound: Find the Two Words',
    'The whole word is printed in letter boxes next to its picture. Draw one line where the second word starts.'],
  ['g2', 'G2-331', 'compound-words-match-the-halves', 'G2-316-compound-words.js', 2,
    { mode: 'match', pairs: 6, pic: 72, laneW: 370, laneH: 60, glyphH: 26, laneNeedPerGlyph: 1.1, derange: true, matchGap: 96, maxLetters: 12, gap: 8 },
    'Match the Halves: Two Pictures, One Word',
    'Draw a line from each first picture to the picture that finishes the word. Then write the new word on the line beside the first picture.'],
  ['g2', 'G2-332', 'compound-words-compound-detective', 'G2-316-compound-words.js', 2,
    { mode: 'detect', bank: 12, compounds: 6, foils: 6, iconPx: 44, wordPx: 18, laneW: 290, laneH: 56, glyphH: 26, maxLetters: 14, laneGap: 6 },
    'Compound Detective',
    'Twelve words, six of them are made of two words. Circle the six compound words and write their two parts on the lines.'],
  ['g2', 'G2-333', 'compound-words-word-web', 'G2-316-compound-words.js', 2,
    { mode: 'web', webs: 2, lanes: 4, hubPx: 96, hubWordPx: 24, pic: 56, ghost: 0.55, laneW: 300, laneH: 64, glyphH: 28, webLaneGap: 8, maxLetters: 13, gap: 8, sizeRows: 6, sizePic: 72, sizeLaneW: 410, minEach: 3 },
    'Word Web: One Word, Many Compounds',
    'One word sits in the middle. Each picture around it makes a new word with it. Write the four new words on the lines.'],
];
const HANDWRITTEN = []; // [{ id, dir, file, base: 'G2-316' }]
module.exports = { ROWS, HANDWRITTEN };
