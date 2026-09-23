/**
 * data/b6/cursive-writing.js — the G2-377 `cursive-writing` bank (nt5-F; design
 * docs/worksheet-gen/b6-designs/G2-377-cursive-writing.md §4-§5).
 *
 * TWO exports, in this order (lib/b6-common.js bank() reads the FIRST export as
 * the locale map, so the locale-neutral data rides as the second):
 *
 *   CURSIVE_WRITING[loc]      the per-locale block, read ONLY through
 *                             bank('cursive-writing', loc) — an absent block
 *                             REFUSES (never an en fallback). The EN block is
 *                             hand-authored here; the non-EN blocks are GENERATED
 *                             by tools/apply-b6-locale.js into
 *                             data/b6/locales/cursive-writing.<loc>.json from the
 *                             native panels' drafts after tools/validate-b6-draft.js
 *                             (which runs qa/verify-b6-cursive-writing.js
 *                             validateBank). sv + fi blocks stay ABSENT: the whole
 *                             type is refused there (no national joined script,
 *                             no Playwrite SE / FI).
 *   CURSIVE_WRITING_NEUTRAL   units (15 vendored Playwrite units: family, metric
 *                             key, lift letters), the pinned + excluded pictures
 *                             (F3 / F4), the modes, the level-key -> band table
 *                             and the X floors.
 *
 * Locale block (§5): units / exemplar / unitLabel / scriptName / ruling (kind per
 * level band) / xPx (per mode, or per unit per mode) / levels (per mode) /
 * lessons[unit] (every letter of the alphabet exactly once across a unit's
 * lessons; lesson 0 is the base page) / joins[unit] (F2) / words (F3 / F4,
 * pinned picture key -> literal) / sentences (F5) / strings (keyed by id; the
 * face ids are allocated by the emitter in Phase E).
 */
'use strict';

const CURSIVE_WRITING = {
  en: {
    refused: null,
    units: ['us-trad'],
    exemplar: 'us-trad',
    unitLabel: { 'us-trad': 'cursive' },
    scriptName: { 'us-trad': 'Traditional cursive' },
    ruling: { G1: 'us3', G2: 'us3', G3: 'us3' },
    dashHelpers: false,
    xPx: { base: 18, capitals: 15, joins: 15, words: 18, read: 18, copy: 16 },
    levels: { base: 'grade-2', capitals: 'grade-2', joins: 'grade-2', words: 'grade-2', read: 'grade-2', copy: 'grade-3' },
    lessons: {
      'us-trad': [
        ['i', 't', 'u', 'w'],
        ['e', 'l', 'b', 'h', 'f', 'k'],
        ['r', 's', 'j', 'p'],
        ['a', 'd', 'g', 'o', 'c', 'q'],
        ['n', 'm', 'x', 'y', 'z', 'v'],
      ],
    },
    joins: {
      'us-trad': [
        { pair: 'ol', word: 'doll' },
        { pair: 'on', word: 'moon' },
        { pair: 'br', word: 'bread' },
        { pair: 'wa', word: 'wash' },
        { pair: 'oa', word: 'boat' },
        { pair: 've', word: 'five' },
        { pair: 'ch', word: 'chair' },
        { pair: 'sh', word: 'fish' },
      ],
    },
    words: {
      'animals/cat': 'cat', 'animals/duck': 'duck', 'animals/fish': 'fish', 'animals/owl': 'owl', 'animals/pig': 'pig',
      'animals/sheep': 'sheep', 'fruits/lemon': 'lemon', 'fruits/pear': 'pear', 'fruits/apple': 'apple', 'toys/boat': 'boat',
      'toys/doll': 'doll', 'toys/robot': 'robot', 'toys/train': 'train', 'toys/kite': 'kite', 'around the house/bed': 'bed',
      'around the house/chair': 'chair', 'around the house/cup': 'cup', 'around the house/lamp': 'lamp', 'classroom/book': 'book',
      'zoo animals/lion': 'lion', 'pets/mouse': 'mouse', 'bakery/cake': 'cake', 'weather/sun': 'sun', 'weather/cloud': 'cloud',
      'animals/horse': 'horse', 'animals/zebra': 'zebra', 'animals/tiger': 'tiger',
    },
    sentences: [
      'The cat is on the bed.',
      'I see a red kite.',
      'My dog can run fast.',
      'We like to read books.',
      'The sun is hot today.',
      'Tom has a toy boat.',
    ],
    strings: {
      'G2-377': {
        title: 'Cursive Letters: i, t, u and w',
        instruction: 'Trace the grey letters, then keep writing each letter joined on your own to the end of its line and on the empty line below.',
      },
      // Phase E faces (ids fixed by _records/b6var-id-allocation.json)
      'G2-384': { title: 'Cursive Capital Letters: Write the Names', instruction: 'Trace each grey capital letter and name, then write them on the empty line below.' },
      'G2-385': { title: 'Cursive Connecting Letters: Joining Two Letters', instruction: 'Trace each grey pair of joined letters and the word, then write them on the empty line below.' },
      'G2-386': { title: 'Cursive Words to Write with Pictures', instruction: 'Trace each grey word without lifting your pencil, then write it. Add the dots and crosses last.' },
      'G2-387': { title: 'Reading Cursive: Match Each Word to Its Picture', instruction: 'Read each word in cursive and draw a line to its picture.' },
      'G3-401': { title: 'Cursive Sentences to Copy', instruction: 'Copy each printed sentence in cursive on the two lines below it. Trace the grey sentence first.' },
    },
  },
};

const unit = (id, lift = '') => ({ family: 'LCS Cursive ' + id, metricKey: 'cursive-' + id, lift });

const CURSIVE_WRITING_NEUTRAL = {
  // the 15 vendored units (assets/fonts/cursive-fonts.css). Lifts = the letters after which the unit
  // LIFTS the pen (a pair starting with one renders as two ink pieces, measured by the critic, §3 F2);
  // shipped units per §1: us-trad · de-va + de-la · mx · br · fr-trad · it-trad · nl · dk-uloopet · no
  units: {
    'us-trad': unit('us-trad'), 'us-modern': unit('us-modern'), 'de-va': unit('de-va'), 'de-la': unit('de-la'),
    'de-sas': unit('de-sas'), mx: unit('mx'), br: unit('br'), 'fr-moderne': unit('fr-moderne', 'fgqj'), 'fr-trad': unit('fr-trad'),
    'it-moderna': unit('it-moderna'), 'it-trad': unit('it-trad'), nl: unit('nl'), no: unit('no', 'fgjyz'),
    'dk-loopet': unit('dk-loopet'), 'dk-uloopet': unit('dk-uloopet', 'fgjqy'),
  },
  shipped: ['us-trad', 'de-va', 'de-la', 'mx', 'br', 'fr-trad', 'it-trad', 'nl', 'no', 'dk-uloopet'],
  pictures: ['animals/cat', 'animals/duck', 'animals/fish', 'animals/owl', 'animals/pig', 'animals/sheep', 'fruits/lemon',
    'fruits/pear', 'fruits/apple', 'toys/boat', 'toys/doll', 'toys/robot', 'toys/train', 'toys/kite', 'around the house/bed',
    'around the house/chair', 'around the house/cup', 'around the house/lamp', 'classroom/book', 'zoo animals/lion',
    'pets/mouse', 'bakery/cake', 'weather/sun', 'weather/cloud', 'animals/horse', 'animals/zebra', 'animals/tiger'],
  // opened and excluded (§5): wolf reads as a husky, the zoo bear as a teddy, the cherry as an apple
  excludePictures: ['animals/wolf', 'zoo animals/bear', 'fruits/cherry'],
  modes: ['base', 'capitals', 'joins', 'words', 'read', 'copy'],
  refusedLocales: { sv: 'Lgr22 teaches no joined school script and no Playwrite SE exists', fi: 'OPS 2014 removed kaunokirjoitus and no Playwrite FI exists' },
  // table B: the landing level keys per locale, K / G1 / G2 / G3 (scripts/seo-landing/gen-b6-landings.js LEVEL_KEYS)
  levelKeys: {
    en: ['kindergarten', 'grade-1', 'grade-2', 'grade-3'],
    de: ['vorschule', '1-klasse', '2-klasse', '3-klasse'],
    es: ['preescolar', 'primer-grado', 'segundo-grado', 'tercer-grado'],
    pt: ['educacao-infantil', '1o-ano', '2o-ano', '3o-ano'],
    fr: ['maternelle', 'cp', 'ce1', 'ce2'],
    it: ['infanzia', 'classe-prima', 'classe-seconda', 'classe-terza'],
    nl: ['kleuters', 'groep-3', 'groep-4', 'groep-5'],
    sv: ['forskola', 'ak-1', 'ak-2', 'ak-3'],
    da: ['boernehaveklasse', '1-klasse', '2-klasse', '3-klasse'],
    no: ['1-trinn', '2-trinn', '3-trinn', '4-trinn'],
    fi: ['esikoulu', '1-luokka', '2-luokka', '3-luokka'],
  },
  // the X floor by the page's LOCALE level band (§2): 15 px on a G1-level page, 14 at G2-G3
  xFloor: { K: 15, G1: 15, G2: 14, G3: 14 },
  // Seyès interline by level band (703 px / 186 mm = 3.78 px/mm): 4 mm at CP (G1), 3 mm from CE1
  seyesI: { K: 15.12, G1: 15.12, G2: 11.34, G3: 11.34 },
};

module.exports = { CURSIVE_WRITING, CURSIVE_WRITING_NEUTRAL };
