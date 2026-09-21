'use strict';
/**
 * b4var-rows/pronouns.js — the five variation faces of G1-352 `pronouns`
 * (design docs/worksheet-gen/b4-designs/G1-352-pronouns.md §3; record
 * _work/G1-352-faces.md). Ids are FIXED by _records/b4var-id-allocation.json
 * (F1 + F4 are G1 ids like the base; F2 / F3 / F5 are G2 ids in types/g2/).
 * Read by tools/gen-b4var-specs.js only.
 *
 * All five are CODE faces on ONE additive `layout` knob (types/g1/G1-352-
 * pronouns.js `_buildFace`, dispatched before the base path touches the RNG):
 * every row spreads the base's d2 config and sets `layout`; the base's own
 * configs carry no `layout`, so the published base deck is byte-identical
 * (tools/b3-baseline.js --check PASS). The base's d2 keys a face ignores
 * (cards / cols / chipW / plateH / objectCaption / cardPad …) ride along in D;
 * each face reads only its own keys. The per-locale CLASS variants (fr/es/pt
 * `four`, fi `two`, de/nl `objects`, the F3 possessive classes) are resolved
 * in the type from the BANK's shape (chips.length / objectMap / the possessive
 * block), never from the locale code. The family is THEMELESS: every landing
 * carries `coordinate.theme:''`, `coordinate.mode` = the layout string.
 *
 *   F1 G1-371  layout:'replace'     a dashed bank of the sentence-initial forms + 8 two-line lanes: write the
 *                                   pronoun that replaces the subject name in the copy of the sentence (G1)
 *   F2 G2-353  layout:'anaphora'    5 blocks: two named portraits, an intro, two boxed-pronoun sentences: draw a
 *                                   line from each box to the name it stands for (G2)
 *   F3 G2-354  layout:'possessive'  8 owner lanes: a named owner (or two) + a pictured thing, "This is Mia. This
 *                                   is ___ ball.": circle his / her / their (G2; REFUSED es + fi by the bank)
 *   F4 G1-372  layout:'sort'        10 name cards on a shelf, one labelled bin per pronoun with ruled lines:
 *                                   write every name under its pronoun (G1). DEVIATION (measured): the
 *                                   design's split 6 + 2 makes 8 cards, not its ten (a 2 x 5 shelf); 8 + 2
 *                                   (= the 12 names) / four + two 7 + 3 (13 names) / objects 6 + 4 deal ten
 *   F5 G2-355  layout:'rewrite'     8 rows: a printed sentence over a 535 x 48 school-line ruling, no bank, no
 *                                   chips: rewrite the whole sentence with the pronoun (G2; + L.1.1.j)
 *
 * EN title + instruction = the bank's strings.<face> verbatim (data/b4/
 * pronouns.js; the gate asserts the pair is one source). The F4 title LISTS
 * the chips and lists exactly the en d2 chips (he / she / they = bank.chips;
 * asserted by the gate). F2 / F3 / F5 carry `extra {gradeBand:'G2'}`
 * (qa/lints.js + emit/manifest.js read spec.gradeBand): their floors are the
 * G2 ones (portraits >= 36; 44 shipped).
 *
 * Measured stacks (this family's 3-line-title + 3-line-instruction chrome is
 * 710, not the README's 722 — _work/G1-352-build.md deviation 1): F1 704 ·
 * F2 620 · F3 706 · F4 677 (3 bins at binH 395; 4 bins in the 2 x 2 grid at
 * gridBinH 185 = 710; the `.ws-pill` head measures 40, not the design's 26,
 * so 218 + 18 + 46 + 395 = 677; the four-class `maxPerSex: 4` keeps every
 * bin's load <= 4 lines so gapY >= 34 holds in a 185 bin) · F5 668. F2 / F4 / F5 fit the fi four-line 677 stack;
 * F1 + F3 do not (the fi F1 title is validated <= 3 lines; F3 has no fi).
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const G2 = { gradeBand: 'G2' };
const ROWS = [
  ['g1', 'G1-371', 'pronouns-replace-the-name-with-a-pronoun', 'G1-352-pronouns.js', 2,
    { layout: 'replace', rows: 8, bank: true, singles: 5, pairs: 3, pairMix: 'mp,fp,xp', four: { singles: 5, pairs: 3, pairMix: 'mp,fp,xp' }, pic: 52, pairPic: 48, gapW: 96, gapH: 30, fontPx: 18, maxLine: 55, laneMin: 74, laneGap: 6 },
    'Replace the Name with a Pronoun', 'Read the sentence. Write the word from the bank that replaces the name in the second sentence.'],
  ['g2', 'G2-353', 'pronouns-who-is-he-pronouns-in-sentences', 'G1-352-pronouns.js', 2,
    { layout: 'anaphora', pairs: 5, sentencesPerPair: 2, pic: 44, plateFont: 16, zone: 70, namesW: 163, introMax: 42, introMaxTwo: 33, sentenceMax: 36, cardMin: 116, cardGap: 10 },
    'Who Is He? Pronouns in Sentences', 'Read the sentences. Draw a line from each word in a box to the name it stands for.', G2],
  ['g2', 'G2-354', 'pronouns-possessive-pronouns', 'G1-352-pronouns.js', 2,
    { layout: 'possessive', rows: 8, singles: 5, pairs: 3, pairMix: 'mp,fp,xp', four: { singles: 4, pairs: 4, pairMix: 'mp,fp,fp,xp' }, ending: { singles: 8, pairs: 0, pairMix: 'none' }, ownerPx: 44, thingPx: 44, chipH: 44, chipFont: 20, mixFloor: 2, thingGenderMin: 3, maxLine: 43, laneMin: 83, laneGap: 6 },
    'Possessive Pronouns', 'Look at who owns the thing. Circle the word that shows it belongs to that person.', G2],
  ['g1', 'G1-372', 'pronouns-sort-the-names-he-she-or-they', 'G1-352-pronouns.js', 2,
    { layout: 'sort', cards: 10, singles: 8, pairs: 2, pairMix: 'any', four: { singles: 7, pairs: 3, pairMix: 'mp,fp,xp', maxPerSex: 4 }, two: { singles: 7, pairs: 3, pairMix: 'mp,fp,xp' }, obj: { singles: 6, pairs: 0, pairMix: 'none' }, objects: 4, neuterMin: 2, pic: 56, pairPic: 44, cardW: 118, cardH: 92, capFont: 16, binH: 395, gridBinH: 185, lineMin: 4, lineGap: 58 },
    'Sort the Names: He, She or They', 'Read each name card. Write the name under the word we use for that person.'],
  ['g2', 'G2-355', 'pronouns-rewrite-the-sentence-with-a-pronoun', 'G1-352-pronouns.js', 2,
    { layout: 'rewrite', rows: 8, ruling: true, bank: false, glyphH: 24, rowH: 48, w: 535, pic: 56, pairPic: 44, fontPx: 18, singles: 5, pairs: 3, pairMix: 'mp,fp,xp', four: { singles: 5, pairs: 3, pairMix: 'mp,fp,xp' }, maxLine: 56, maxAnswer: 28, rowMin: 77, rowGap: 7 },
    'Rewrite the Sentence with a Pronoun', 'Read the sentence. Write it again on the lines, but use a pronoun instead of the name.', G2],
];
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN };
