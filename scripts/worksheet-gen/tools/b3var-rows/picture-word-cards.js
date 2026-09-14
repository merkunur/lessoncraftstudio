'use strict';
/**
 * b3var-rows/picture-word-cards.js — the five variation faces of K-324
 * `picture-word-cards` (design docs/worksheet-gen/b3-designs/K-324-picture-
 * word-cards.md §3; ids fixed by _records/b3var-id-allocation.json). Read by
 * tools/gen-b3var-specs.js only.
 *
 * Every row spreads a base config and sets the ADDITIVE `kind` knob the base's
 * `_buildWith` dispatches on (types/k/K-324-picture-word-cards.js); the base's
 * word/twin path is untouched (tools/b3-baseline.js). The waves ship d2 only.
 *   K-347  PARAM  {...base.difficulty[3]} — the 4 x 4 twin sheet (8 picture
 *                 cards + 8 DERANGED word cards) as its own face: Memory /
 *                 "Wort zum Bild legen", a different routine from naming
 *   K-348  CODE   kind:'article' — [dot][chip word] plates, the article a
 *                 LITERAL from ARTICLES[loc]; cap 18 glyphs on one line
 *   K-349  CODE   kind:'plural' — each row one picture + singular beside three
 *                 pictures + plural, equal 80 px pictures (number is the only
 *                 difference)
 *   K-350  HANDWRITTEN (types/k/K-350-picture-word-cards-bilingual-cards.js):
 *                 kind:'bilingual' fans over the PARTNER language, so it needs
 *                 its own unitAxis — function values a row cannot carry
 *   G1-324 CODE   kind:'syllable' — the approved split PRINTED (letter cells +
 *                 arcs, or a hyphenated plate); pool:'tex' (README texPool
 *                 rule); id band G1 (`gradeBand` via extra)
 * The face strings live in data/b3/picture-word-cards.js `strings.<mode>`;
 * the gate asserts each row's EN title/instruction === the bank's.
 */
// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra?
const ROWS = [
  ['k', 'K-347', 'picture-word-cards-twin-set', 'K-324-picture-word-cards.js', 3, {},
    'Picture Cards and Word Cards: Matching Pairs',
    'Cut out the sixteen cards. Lay the word cards next to the pictures they name, or turn them all face down and play Memory.'],
  ['k', 'K-348', 'picture-word-cards-article-cards', 'K-324-picture-word-cards.js', 2, { kind: 'article', cap: 18 },
    'A or An: Word Cards with the Article',
    'Cut out the eight cards. Say each word with its article, just as it is written on the card.'],
  ['k', 'K-349', 'picture-word-cards-one-and-many', 'K-324-picture-word-cards.js', 2, { kind: 'plural', cards: 4, pic: 80, clones: 3 },
    'One and Many: Singular and Plural Cards',
    'Cut out the cards. Say the word for one and the word for many, then match each pair.'],
  ['g1', 'G1-324', 'picture-word-cards-syllable-cards', 'K-324-picture-word-cards.js', 2,
    { kind: 'syllable', pic: 72, hyphenPic: 96, cell: 28, fontPx: 26, arcH: 26, pool: 'tex', minCount: 2, maxCount: 4, maxLetters: 10 },
    'Syllable Cards: Read the Word in Parts',
    'Cut out the eight cards. Read each word one syllable at a time, then say the whole word.',
    { gradeBand: 'G1' }],
];
const HANDWRITTEN = [
  { id: 'K-350', dir: 'k', file: 'K-350-picture-word-cards-bilingual-cards.js', base: 'K-324' },
];
module.exports = { ROWS, HANDWRITTEN };
