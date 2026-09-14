/**
 * data/b3/seasons.js — the K-322 `seasons` bank (family key `seasons`,
 * design docs/worksheet-gen/b3-designs/K-322-seasons.md §5).
 *
 * `neutral` = the LOCALE-NEUTRAL data (the four marker pools, the north
 * month tuple, the K-207 boundary file); a locale block may only `veto` a
 * neutral marker or `override` a whole pool (pt-BR, no snow). The EN block
 * is HAND-AUTHORED (2026-09-14, K-322 base build); the ten non-EN blocks are
 * GENERATED later by tools/apply-b3-locale.js from i18n/.draft-b3-<loc>.json
 * (native panels author names / alt / veto / override / legend / faces /
 * strings / strand). `data/` is gitignored — the reviewer force-adds this.
 *
 * Pools (every picture OPENED 2026-09-14 on the build's contact sheets
 * k322-sheet-{winter,spring,summer,autumn}.png — what each shows is in the
 * build record; `opened:true` is asserted by the gate):
 *   winter  8: all snow markers (pt-BR replaces the whole pool)
 *   spring  7: tulip · bud · chick · duckling · lamb · nest · birdhouse (weak)
 *   summer 10: sandcastle · popsicle · watermelon · swimming · beach ·
 *              flip-flops · pool · seashell · surfboard · tent
 *   autumn  8: acorn · maple (a whole red-orange TREE, vocabKey null → alt) ·
 *              harvest · pumpkin (thanksgivinng, never vegetables) · apple
 *              (a basket) · mushroom (fly agaric) · scarecrow · hedgehog
 *   `weak:true` = pale in a mono print (icicle, ice) or a reading risk
 *   (birdhouse): d3 only.
 * The 12 K-207 nouns (summer-vs-winter-clothes.json) never enter a neutral
 * pool — the gate reads that file at validate time (rule 2).
 *
 * EN block: names = the US K-chart words (Fall; the vocab's "Autumn" in
 * `alt` — OPEN 1 for the en panel), model temperate-north, cycle from
 * winter, en-US vetoes hedgehog + mushroom (design §1 / §4).
 * Phase 2 (2026-09-14): `strings` also carries the five faces' title +
 * instruction under their ids (K-338 which · K-339 wheel · K-340 odd ·
 * G1-323 months · K-341 tree); `faces.tree.figure` is the F5 re-target knob
 * ('frame' for pt-BR) and `legend` + `monthSeason` drive F4.
 */
'use strict';
const SEASONS = {
  neutral: {
    keys: ['winter', 'spring', 'summer', 'autumn'],
    icons: 'glyph',
    pools: {
      winter: [
        { theme: 'winter', noun: 'snowman', opened: true },
        { theme: 'winter', noun: 'sled', opened: true },
        { theme: 'winter', noun: 'sledding', opened: true },
        { theme: 'winter', noun: 'skiing', opened: true },
        { theme: 'winter', noun: 'skating', opened: true },
        { theme: 'winter', noun: 'snowboarding', opened: true },
        { theme: 'winter', noun: 'icicle', opened: true, weak: true },
        { theme: 'winter', noun: 'ice', opened: true, weak: true },
      ],
      spring: [
        { theme: 'spring', noun: 'tulip', opened: true },
        { theme: 'spring', noun: 'bud', opened: true },
        { theme: 'spring', noun: 'chick', opened: true },
        { theme: 'spring', noun: 'duckling', opened: true },
        { theme: 'spring', noun: 'lamb', opened: true },
        { theme: 'spring', noun: 'nest', opened: true },
        { theme: 'spring', noun: 'birdhouse', opened: true, weak: true },
      ],
      summer: [
        { theme: 'summer', noun: 'sandcastle', opened: true },
        { theme: 'summer', noun: 'popsicle', opened: true },
        { theme: 'summer', noun: 'watermelon', opened: true },
        { theme: 'summer', noun: 'swimming', opened: true },
        { theme: 'summer', noun: 'beach', opened: true },
        { theme: 'summer', noun: 'flip-flops', opened: true },
        { theme: 'summer', noun: 'pool', opened: true },
        { theme: 'summer', noun: 'seashell', opened: true },
        { theme: 'summer', noun: 'surfboard', opened: true },
        { theme: 'summer', noun: 'tent', opened: true },
      ],
      autumn: [
        { theme: 'thanksgivinng', noun: 'acorn', opened: true },
        {
          theme: 'tree', noun: 'maple', opened: true, vocabKey: null,
          alt: {
            en: 'a tree with red and orange leaves', de: 'ein Baum mit roten und orangen Blättern',
            es: 'un árbol con hojas rojas y naranjas', pt: 'uma árvore com folhas vermelhas e laranja',
            fr: 'un arbre aux feuilles rouges et orange', it: 'un albero con foglie rosse e arancioni',
            nl: 'een boom met rode en oranje bladeren', sv: 'ett träd med röda och orangea löv',
            da: 'et træ med røde og orange blade', no: 'et tre med røde og oransje blader',
            fi: 'puu, jossa on punaisia ja oransseja lehtiä',
          },
        },
        { theme: 'thanksgivinng', noun: 'harvest', opened: true },
        { theme: 'thanksgivinng', noun: 'pumpkin', opened: true },
        { theme: 'thanksgivinng', noun: 'apple', opened: true },
        { theme: 'vegetables', noun: 'mushroom', opened: true },
        { theme: 'thanksgivinng', noun: 'scarecrow', opened: true },
        { theme: 'forest creatures', noun: 'hedgehog', opened: true },
      ],
    },
    monthSeasonNorth: ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'],
    k207: 'summer-vs-winter-clothes.json',
  },
  en: {
    names: { winter: 'Winter', spring: 'Spring', summer: 'Summer', autumn: 'Fall' },
    alt: { autumn: 'Autumn' },
    model: 'temperate-north',
    cycleStart: 'winter',
    cycle: ['winter', 'spring', 'summer', 'autumn'],
    monthSeason: ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'],
    veto: [
      { theme: 'forest creatures', noun: 'hedgehog', reason: 'not a US fall marker (en-US)' },
      { theme: 'vegetables', noun: 'mushroom', reason: 'not a US fall marker (en-US)' },
    ],
    override: {},
    legend: { winter: 'codeBlue', spring: 'codeGreen', summer: 'codeYellow', autumn: 'codeOrange' },
    faces: { tree: { figure: 'tree', captions: null } },
    strings: {
      'K-322': {
        title: 'Four Seasons Sort',
        instruction: 'Draw a line from the dot on each picture to the season box it belongs to.',
      },
      // Phase 2 faces (2026-09-14): the EN pair of each face = tools/b3var-rows/seasons.js verbatim
      // (the gate asserts the two are one source); the ten non-EN panels fill the same keys.
      'K-338': {
        title: 'Which Season Is It?',
        instruction: 'Look at the three pictures on each card and circle the season sign they belong to.',
      },
      'K-339': {
        title: 'Season Wheel: Seasons in Order',
        instruction: 'One season is already on the wheel. Draw the other three signs in the empty circles in the right order.',
      },
      'K-340': {
        title: 'Seasons: What Does Not Belong?',
        instruction: 'Cross out the one picture in each row that belongs to a different season.',
      },
      'G1-323': {
        title: 'Months and Seasons: Color the Season',
        instruction: 'Color the circle next to each month in the color of its season.',
      },
      'K-341': {
        title: 'Draw the Tree in Four Seasons',
        instruction: 'Draw what the tree looks like in each of the four seasons.',
      },
    },
    strand: 'Science: weather and seasons (readiness)',
  },
};
module.exports = { SEASONS };
