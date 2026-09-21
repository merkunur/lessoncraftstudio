'use strict';
/**
 * b4var-rows/question-words.js — the five variation faces of G1-353
 * `question-words` (design docs/worksheet-gen/b4-designs/G1-353-question-words.md
 * §3; record _work/G1-353-faces.md). Ids are FIXED by
 * _records/b4var-id-allocation.json (F1-F3 are G1 ids like the base; F4 / F5
 * are G2 ids in types/g2/). Read by tools/gen-b4var-specs.js only.
 *
 * All five are CODE faces on the base's ONE additive `mode` knob
 * (types/g1/G1-353-question-words.js `_buildWith` -> `_buildFace` when
 * d.mode !== 'base', dispatched BEFORE the base path touches the RNG; the
 * base's own configs carry mode:'base', so the published base deck is
 * byte-identical: tools/b3-baseline.js). Every row spreads the base's d2 and
 * sets the face keys the design names; the base's d2 keys a face ignores
 * (chips / picOf / chipPx / chipH / chipPad / rowMin / botMax …) ride along in
 * D and are ignored by the face's resolver, which reads only its own keys.
 * Every face reads its answers through the base's frame helpers (fillFrame /
 * markOf / questionOf / gapOf: the marked span is the substituted literal of
 * ONE declared slot, the question literal is the frame's own `q.<ask>`),
 * never typed. The family is THEMELESS: `coordinate.theme:''`,
 * `coordinate.mode` = the mode string.
 *
 *   F1 G1-373 mode:'match'  five printed questions left (no picture), five deranged short answers right, each with
 *                            its picture (portrait / thing / place / 88 px clock / thing + count badge): draw the line (G1)
 *   F2 G1-374 mode:'fill'   a 5-pill bank (deranged) + 6 lanes: the question with a dashed 170 px box at its head
 *                            over the marked answer sentence + portrait: copy the question word into the box (G1)
 *   F3 G1-375 mode:'sort'   9 word tiles (3 names, 3 bare things, 3 place phrases) on a two-row shelf + three ruled
 *                            bins Who? What? Where? in a FIXED 677 stack: write each tile under its question (G1)
 *   F4 G2-356 mode:'write'  8 lane-less rows: portrait + the marked answer over a 575 x 48 school-line ruling, no
 *                            bank, no gap: write the whole question, the "?" is the child's (G2)
 *   F5 G2-357 mode:'ask'    one four-tile scene (portrait · thing · place · 120 px clock) + six 72 px starter
 *                            rulings Who What Where When Why How: finish six questions (G2, open-ended)
 *
 * EN title + instruction = the bank's strings.<mode> verbatim (data/b4/
 * question-words.js; the gate asserts the pair is one source). The F3 title
 * LISTS the bins and lists exactly the d2 bins (Who, What or Where); the F5
 * title names exactly its two extra starters (Why and How) — both gated by
 * validator rule 9's title-lists-kinds check. F4 + F5 carry
 * `extra {gradeBand:'G2'}` (qa/lints.js + emit/manifest.js read spec.gradeBand):
 * their floors are the G2 ones (portraits >= 36; 48 shipped; writing glyphH >= 24).
 *
 * Measured (the 3-line-title + 3-line-instruction chrome is 710, _work/G1-353-
 * build.md deviation 4): F1 stretch (items 100 -> ~141 at 766) · F2 614
 * intrinsic, stretch · F3 FIXED 677 (shelf 122 + 18 + head 40 + 6 + bins 491)
 * · F4 666 intrinsic, stretch · F5 668 fixed (scene 160 + 12 + rulings 496:
 * the design's h 56 grew to 72 so the six rows fill the 677 budget; the line
 * set + the 29.5 px starter are unchanged). Every face fits the fi four-line
 * 677 chrome.
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const G2 = { gradeBand: 'G2' };
const ROWS = [
  ['g1', 'G1-373', 'question-words-match-the-question-to-the-answer', 'G1-353-question-words.js', 2,
    { mode: 'match', pairs: 5, kinds: ['who', 'what', 'where', 'when', 'howmany'], picPx: 88, itemH: 100, itemMax: 120, leftW: 252, rightW: 248, fontPx: 18, maxChars: 44, maxThings: 4 },
    'Match the Question to the Answer', 'Read each question on the left. Draw a line to the answer on the right that fits it.'],
  ['g1', 'G1-374', 'question-words-fill-in-the-question-word', 'G1-353-question-words.js', 2,
    { mode: 'fill', rows: 6, bank: true, kinds: { who: 1, what: 1, where: 1, when: 1, howmany: 1 }, maxPerKind: 2, picPx: 56, gapH: 40, gapMin: 110, gapMax: 220, fontPx: 18, maxRest: 30, maxChars: 40, maxThings: 4, rowMin: 84, rowGap: 8 },
    'Fill In the Question Word', 'Read the answer and find the highlighted words. Write the question word from the bank in the box.'],
  ['g1', 'G1-375', 'question-words-sort-the-answers-who-what-or-where', 'G1-353-question-words.js', 2,
    { mode: 'sort', tiles: 9, bins: ['who', 'what', 'where'], perBin: 3, tileGuard: 112, binW: 201, lineMin: 5, stack: 677 },
    'Sort the Answers: Who, What or Where', 'Read each word tile. Write it in the bin under the question it answers: Who, What or Where.'],
  ['g2', 'G2-356', 'question-words-write-the-question', 'G1-353-question-words.js', 2,
    { mode: 'write', rows: 8, ruling: true, bank: false, h: 48, glyphH: 24, picPx: 48, fontPx: 18, kinds: { who: 2, what: 2, where: 2, when: 1, howmany: 1 }, maxChars: 31, sentenceMax: 40, maxThings: 4, rowMin: 78, rowGap: 6 },
    'Write the Question', 'Read the answer. Look at the highlighted words. Write the question that asks for them on the line.', G2],
  ['g2', 'G2-357', 'question-words-ask-about-the-picture-why-and-how', 'G1-353-question-words.js', 2,
    { mode: 'ask', starters: ['who', 'what', 'where', 'when', 'why', 'how'], rows: 6, h: 72, glyphH: 26, gap: 8, scene: { tile: 120, clock: 120 } },
    'Ask About the Picture: Why and How', 'Look at the picture. Finish each question. Start with the word already on the line.', G2],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
