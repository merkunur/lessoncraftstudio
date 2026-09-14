/**
 * data/b3/picture-word-cards.js — the K-324 `picture-word-cards` bank.
 *
 * EN block HAND-AUTHORED (2026-09-14, K-324 base build); the ten non-EN blocks
 * are GENERATED later by tools/apply-b3-locale.js from i18n/.draft-b3-<loc>.json
 * (native panels author cardCase / articleStyle / bilingual.partnerNames /
 * syllable.mark / exclude / strings). `data/` is gitignored — the reviewer
 * force-adds this module.
 *
 * Shape (design file §5):
 *   PICTURE_WORD_CARDS[loc] = {
 *     cardCase: 'lower'|'keep'|'upper',   // 'keep' = de nouns only; gender-null entries always lower
 *     articleStyle: { enabled, level: 2|3, dots: [codeColors keys] | null,
 *                     elision: 'refuse'|'print', elisionChip: "l'" | null, legend: string | null },
 *     plural:    { enabled, clones: 3 },
 *     bilingual: { partnerExemplar: <another of the 11>, hostName: <this language, in itself>,
 *                  partnerNames: { <10 others> }, legendSep: ' · ' },
 *     syllable:  { enabled, mark: 'arc'|'hyphen'|'colour', hyphen: '-', strictPool: false|true,
 *                  exclude: ['vocabKey'] },   // an APPROVED boundary the panel found wrong (seagull: seag-ull)
 *     twinLayout: { cols: 4, blockRows: 2 },
 *     exclude: ['vocabKey'],
 *     strings: { 'K-324': {title, instruction}, twin: …, article: …, plural: …, bilingual: …, syllable: … }
 *   }
 * The face strings are keyed by the face's MODE string (the face ids K-325+ /
 * G1-311+ are assigned by the emitter, so an id key would be a guess); the
 * emitter maps mode → id when the faces land.
 *
 * The WORDS are never in this bank: render reads `entriesFor(theme, loc)` +
 * `fileUri(theme, noun)` (lib/b2-common.js) and applies the case rule
 * (`e.gender` present → displayWord(w, loc); null → displayWord(w, loc, 'lower')).
 */
'use strict';
const PICTURE_WORD_CARDS = {
  en: {
    cardCase: 'lower',
    articleStyle: { enabled: true, level: 2, dots: null, elision: 'refuse', elisionChip: null, legend: null },
    plural: { enabled: true, clones: 3 },
    bilingual: {
      partnerExemplar: 'es',
      hostName: 'English',
      partnerNames: { de: 'German', es: 'Spanish', pt: 'Portuguese', fr: 'French', it: 'Italian', nl: 'Dutch', sv: 'Swedish', da: 'Danish', no: 'Norwegian', fi: 'Finnish' },
      legendSep: ' · ',
    },
    // exclude: approved-words-en.json carries seagull as seag-ull with 'TeX' in sources_agreed —
    // a wrong boundary (sea-gull, a compound) that the texPool rule cannot see; refused here, and
    // reported for the pipeline (README item 6 territory). Never a filler in its place.
    syllable: { enabled: true, mark: 'arc', hyphen: '-', strictPool: false, exclude: ['seagull'] },
    twinLayout: { cols: 4, blockRows: 2 },
    exclude: [],
    strings: {
      'K-324': {
        title: 'Picture Word Cards',
        instruction: 'Cut along the dotted lines to make the cards. Say the name of each picture, then read its word.',
      },
      twin: {
        title: 'Picture Cards and Word Cards: Matching Pairs',
        instruction: 'Cut out the sixteen cards. Lay the word cards next to the pictures they name, or turn them all face down and play Memory.',
      },
      article: {
        title: 'A or An: Word Cards with the Article',
        instruction: 'Cut out the eight cards. Say each word with its article, just as it is written on the card.',
      },
      plural: {
        title: 'One and Many: Singular and Plural Cards',
        instruction: 'Cut out the cards. Say the word for one and the word for many, then match each pair.',
      },
      bilingual: {
        title: 'Bilingual Picture Cards: English and Spanish',
        instruction: 'Cut out the eight cards. Say the word in English, then in Spanish, and keep the cards for your word wall.',
      },
      syllable: {
        title: 'Syllable Cards: Read the Word in Parts',
        instruction: 'Cut out the eight cards. Read each word one syllable at a time, then say the whole word.',
      },
    },
  },
};
module.exports = { PICTURE_WORD_CARDS };
