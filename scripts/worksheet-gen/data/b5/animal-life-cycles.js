/**
 * data/b5/animal-life-cycles.js — the G1-377 `animal-life-cycles` bank (nt10-E; design
 * docs/worksheet-gen/b5-designs/G1-377-animal-life-cycles.md §4-§5).
 *
 * ANIMAL_LIFE_CYCLES[loc] — the per-locale block, read ONLY through
 * lib/b5-common.js bank('animal-life-cycles', loc) (a missing block REFUSES, never an en
 * fallback). The EN block is HAND-AUTHORED here (2026-09-23, the base build); the ten
 * non-EN blocks are GENERATED later by tools/apply-b5-locale.js into
 * data/b5/locales/animal-life-cycles.<loc>.json from the native panels' drafts after
 * tools/validate-b5-draft.js, which runs the gate's validateBank(block, loc)
 * (qa/verify-b5-animal-life-cycles.js, §5 rules 1-12).
 *
 * Block shape (§5 ALC_LOC + two fields the rules need, recorded in _work/G1-377-build.md):
 *   stageWords   { butterfly: {egg, larva, pupa, adult} } bare citation nouns, lower-case
 *                except de; F2's word bank prints them. NEVER a vocab lookup.
 *   decoy        { 'frog.tadpole': '' } F2's cross-out word (a stage of ANOTHER animal)
 *   landingWords { frog: {spawn, tadpole, legged, froglet, adult}, ladybird: {egg, larva, pupa, adult} }
 *                landing prose only; never printed on a page
 *   statements   { egg, change, pupa, wings, sixlegs, nectar, tail, water, nolegs, fourlegs, insects }
 *                F4; subject "It / Its" (or the locale's animal-free equivalent), <= 80 chars (fi 95)
 *   drop         statement ids this locale cannot write animal-free (statementPool subtracts them)
 *   familyName   the species-free hub rail label
 *   spawnForm    'clump' | 'string' (string only pt, a panel ruling)
 *   forbidden    wrong words (the cocoon error of the locale)
 *   genreBare    the bare genre word (life cycle …) that never stands in a title without an animal
 *   pictureWord  the locale's "picture" (rule 10: the base instruction names "the number of the PICTURE")
 *   instructionBans  { <face>: [words] } the locale's apparatus words each face must not name (rule 10;
 *                en is held by the gate's own regexes)
 *   refuse       faces this locale will not ship
 *   strings      { 'G1-377': {title, instruction}, 'frog-cut-paste'|'label'|'metamorphosis'|'compare'|'next': {…} }
 *                keyed by LAYOUT until the emitter allocates the face ids; 'G1-377' === the spec's i18n.en.
 *   The en strings are a SOURCE TO AUDIT (§4): every panel reads them and reports defects.
 *
 * ALC — the locale-neutral facts (§5): the biology (order = the life cycle; the successor of
 * the adult is the FIRST stage, computed (i+1) mod n, never stored), the young pool, the sort
 * exclusions, the four tell-free base arrangements (enumerated over all 24 placements; the gate
 * re-enumerates them), the F4 statement truths, the empty library-picture list.
 *
 * `data/` is gitignored — the reviewer force-adds this module.
 */
'use strict';

const ANIMAL_LIFE_CYCLES = {
  en: {
    stageWords: { butterfly: { egg: 'egg', larva: 'caterpillar', pupa: 'chrysalis', adult: 'butterfly' } },
    decoy: { 'frog.tadpole': 'tadpole' },
    landingWords: {
      frog: { spawn: 'frogspawn', tadpole: 'tadpole', legged: 'tadpole with legs', froglet: 'froglet', adult: 'frog' },
      ladybird: { egg: 'egg', larva: 'larva', pupa: 'pupa', adult: 'ladybug' },
    },
    statements: {
      egg: 'It hatches from an egg.',
      change: 'Its young looks very different from the grown-up.',
      pupa: 'It spends one stage as a chrysalis.',
      wings: 'The grown-up has wings.',
      sixlegs: 'The grown-up has six legs.',
      nectar: 'The grown-up drinks nectar from flowers.',
      tail: 'Its young swims with a tail.',
      water: 'Its young lives in water.',
      nolegs: 'Its young has no legs at first.',
      fourlegs: 'The grown-up has four legs.',
      insects: 'The grown-up catches insects to eat.',
    },
    drop: [],
    familyName: 'Animal Life Cycles',
    spawnForm: 'clump',
    forbidden: ['cocoon', 'cocoons'],
    genreBare: ['life cycle', 'life cycles'],
    pictureWord: 'picture',
    instructionBans: {},
    refuse: [],
    strings: {
      'G1-377': {
        title: 'Butterfly Life Cycle',
        instruction: 'The egg is 1: write 2, 3 and 4 in the boxes as it grows, and in the last box the number of the picture that comes after the butterfly.',
      },
      'frog-cut-paste': {
        title: 'Frog Life Cycle: Cut and Paste',
        instruction: 'Cut out the four squares and glue each one on its lily pad, going round the pond from the frogspawn to the frog.',
      },
      label: {
        title: 'Label the Butterfly Life Cycle',
        instruction: 'Write each name from the word bank on the line under its picture, and cross out the one name that does not belong.',
      },
      metamorphosis: {
        title: 'Metamorphosis: Which Animal Will It Become?',
        instruction: 'Look at each young animal and write its letter in a box under the grown-up animal it will become.',
      },
      compare: {
        title: 'Butterfly and Frog Life Cycles Compared',
        instruction: 'Read each sentence and tick the butterfly, the frog or both when the sentence is true for that animal.',
      },
      next: {
        title: 'What Comes Next? Butterfly, Frog and Ladybug',
        instruction: 'In each row, look at the first picture and circle the picture that comes right after it.',
      },
    },
  },
};

const ALC = {
  STAGES: {
    butterfly: ['egg', 'larva', 'pupa', 'adult'],
    frog: ['spawn', 'tadpole', 'legged', 'froglet', 'adult'],
    ladybird: ['egg', 'larva', 'pupa', 'adult'],
  },
  STAGE_COUNT: { butterfly: 4, frog: 5, ladybird: 4 },
  YOUNG: ['butterfly.larva', 'butterfly.pupa', 'frog.spawn', 'frog.tadpole', 'frog.legged', 'frog.froglet', 'ladybird.larva', 'ladybird.pupa'],
  SORT_EXCLUDE: ['butterfly.egg', 'ladybird.egg'],
  ARRANGEMENTS: [
    { id: 'A0', TL: 'egg', TR: 'adult', BL: 'pupa', BR: 'larva' },
    { id: 'A1', TL: 'larva', TR: 'adult', BL: 'pupa', BR: 'egg' },
    { id: 'A2', TL: 'adult', TR: 'egg', BL: 'larva', BR: 'pupa' },
    { id: 'A3', TL: 'adult', TR: 'larva', BL: 'egg', BR: 'pupa' },
  ],
  COMPARE: [
    { id: 'egg', truth: ['butterfly', 'frog'] }, { id: 'change', truth: ['butterfly', 'frog'] },
    { id: 'pupa', truth: ['butterfly'] }, { id: 'wings', truth: ['butterfly'] }, { id: 'sixlegs', truth: ['butterfly'] }, { id: 'nectar', truth: ['butterfly'] },
    { id: 'tail', truth: ['frog'] }, { id: 'water', truth: ['frog'] }, { id: 'nolegs', truth: ['frog'] }, { id: 'fourlegs', truth: ['frog'] }, { id: 'insects', truth: ['frog'] },
  ],
  COMPARE_EXCLUSIVE_D1: [['tail', 'water']],
  LIBRARY_PICTURES: [],
  SPAWN_FORM: { default: 'clump' },
  FACES: ['frog-cut-paste', 'label', 'metamorphosis', 'compare', 'next'],
};

module.exports = { ANIMAL_LIFE_CYCLES, ALC };
